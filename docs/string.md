# 字符串的扩展

ES6加强了对Unicode的支持，并且扩展了字符串对象。

## codePointAt()

JavaScript内部，字符以UTF-16的格式储存，每个字符固定为2个字节。对于那些需要4个字节储存的字符（Unicode码点大于0xFFFF的字符），JavaScript会认为它们是两个字符。

```javascript
var s = "𠮷";

s.length // 2
s.charAt(0) // ''
s.charAt(1) // ''
s.charCodeAt(0) // 55362
s.charCodeAt(1) // 57271
```

上面代码中，汉字“𠮷”的码点是0x20BB7，UTF-16编码为0xD842 0xDFB7（十进制为55362 57271），需要4个字节储存。对于这种4个字节的字符，JavaScript不能正确处理，字符串长度会误判为2，而且charAt方法无法读取字符，charCodeAt方法只能分别返回前两个字节和后两个字节的值。

ES6提供了codePointAt方法，能够正确处理4个字节储存的字符，返回一个字符的码点。

```javascript
var s = "𠮷a";

s.codePointAt(0) // 134071
s.codePointAt(1) // 57271

s.charCodeAt(2) // 97
```

codePointAt方法的参数，是字符在字符串中的位置（从0开始）。上面代码中，JavaScript将“𠮷a”视为三个字符，codePointAt方法在第一个字符上，正确地识别了“𠮷”，返回了它的十进制码点134071（即十六进制的20BB7）。在第二个字符（即“𠮷”的后两个字节）和第三个字符“a”上，codePointAt方法的结果与charCodeAt方法相同。

总之，codePointAt方法会正确返回四字节的UTF-16字符的码点。对于那些两个字节储存的常规字符，它的返回结果与charCodeAt方法相同。

codePointAt方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。

```javascript
function is32Bit(c) {
    return c.codePointAt(0) > 0xFFFF;
}

is32Bit("𠮷") // true
is32Bit("a") // false
```

## String.fromCodePoint()

ES5提供String.fromCharCode方法，用于从码点返回对应字符，但是这个方法不能识别辅助平面的字符（编号大于0xFFFF）。

```javascript

String.fromCharCode(0x20BB7)
// "ஷ"

```

上面代码中，最后返回码点U+0BB7对应的字符，而不是码点U+20BB7对应的字符。

ES6提供了String.fromCodePoint方法，可以识别0xFFFF的字符，弥补了String.fromCharCode方法的不足。在作用上，正好与codePointAt方法相反。

```javascript

String.fromCodePoint(0x20BB7)
// "𠮷"

```

注意，fromCodePoint方法定义在String对象上，而codePointAt方法定义在字符串的实例对象上。

## at()

ES5提供String.prototype.charAt方法，返回字符串给定位置的字符。该方法不能识别码点大于0xFFFF的字符。

```javascript

'𠮷'.charAt(0)
// '\uD842'

```

上面代码中，charAt方法返回的是UTF-16编码的第一个字节，实际上是无法显示的。

ES7提供了at方法，可以识别Unicode编号大于0xFFFF的字符，返回正确的字符。

```javascript

'𠮷'.at(0)
// '𠮷'

```

## 字符的Unicode表示法

JavaScript允许采用“\uxxxx”形式表示一个字符，其中“xxxx”表示字符的码点。

```javascript

"\u0061"
// "a"

```

但是，这种表示法只限于\u0000——\uFFFF之间的字符。超出这个范围的字符，必须用两个双字节的形式表达。

```javascript

"\uD842\uDFB7"
// "𠮷"

"\u20BB7"
// " 7"

```

上面代码表示，如果直接在“\u”后面跟上超过0xFFFF的数值（比如\u20BB7），JavaScript会理解成“\u20BB+7”。由于\u20BB是一个不可打印字符，所以只会显示一个空格，后面跟着一个7。

ES6对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符。

```javascript

"\u{20BB7}"
// "𠮷"

"\u{41}\u{42}\u{43}"
// "ABC"

```

## 正则表达式的u修饰符

ES6对正则表达式添加了u修饰符，用来正确处理大于\uFFFF的Unicode字符。

**（1）点字符**

点（.）字符在正则表达式中，解释为除了换行以外的任意单个字符。对于码点大于0xFFFF的Unicode字符，点字符不能识别，必须加上u修饰符。

```javascript

var s = "𠮷";

/^.$/.test(s) // false
/^.$/u.test(s) // true

```

上面代码表示，如果不添加u修饰符，正则表达式就会认为字符串为两个字符，从而匹配失败。

**（2）Unicode字符表示法**

ES6新增了使用大括号表示Unicode字符，这种表示法在正则表达式中必须加上u修饰符，才能识别。

```javascript

/\u{61}/.test('a') // false
/\u{61}/u.test('a') // true
/\u{20BB7}/u.test('𠮷') // true

```

上面代码表示，如果不加u修饰符，正则表达式无法识别`\u{61}`这种表示法，只会认为这匹配61个连续的u。

**（3）量词**

使用u修饰符后，所有量词都会正确识别大于码点大于0xFFFF的Unicode字符。

```javascript

/a{2}/.test('aa') // true
/a{2}/u.test('aa') // true
/𠮷{2}/.test('𠮷𠮷') // false
/𠮷{2}/u.test('𠮷𠮷') // true

```

**（4）预定义模式**

u修饰符也影响到预定义模式，能否正确识别码点大于0xFFFF的Unicode字符。

```javascript

/^\S$/.test('𠮷') // false
/^\S$/u.test('𠮷')

```

上面代码的`\S`是预定义模式，匹配所有不是空格的字符。只有加了u修饰符，它才能正确匹配码点大于0xFFFF的Unicode字符。

利用这一点，可以写出一个正确返回字符串长度的函数。

```javascript

function codePointLength(text) {
    var result = text.match(/[\s\S]/gu);
    return result ? result.length : 0;
}

var s = "𠮷𠮷";

s.length // 4
codePointLength(s) // 2

```

**（5）i修饰符**

有些Unicode字符的编码不同，但是字型很相近，比如，\u004B与\u212A都是大写的K。

```javascript

/[a-z]/i.test('\u212A') // false
/[a-z]/iu.test('\u212A') // true

```

上面代码中，不加u修饰符，就无法识别非规范的K字符。

## normalize()

为了表示语调和重音符号，Unicode提供了两种方法。一种是直接提供带重音符号的字符，比如Ǒ（\u01D1）。另一种是提供合成符号（combining character），即原字符与重音符号的合成，两个字符合成一个字符，比如O（\u004F）和ˇ（\u030C）合成Ǒ（\u004F\u030C）。

这两种表示方法，在视觉和语义上都等价，但是JavaScript不能识别。

```javascript

'\u01D1'==='\u004F\u030C' //false

'\u01D1'.length // 1
'\u004F\u030C'.length // 2

```

上面代码表示，JavaScript将合成字符视为两个字符，导致两种表示方法不相等。

ES6提供String.prototype.normalize()方法，用来将字符的不同表示方法统一为同样的形式，这称为Unicode正规化。

```javascript

'\u01D1'.normalize() === '\u004F\u030C'.normalize()
// true

```

normalize方法可以接受四个参数。

- NFC，默认参数，表示“标准等价合成”（Normalization Form Canonical Composition），返回多个简单字符的合成字符。所谓“标准等价”指的是视觉和语义上的等价。
- NFD，表示“标准等价分解”（Normalization Form Canonical Decomposition），即在标准等价的前提下，返回合成字符分解的多个简单字符。
- NFKC，表示“兼容等价合成”（Normalization Form Compatibility Composition），返回合成字符。所谓“兼容等价”指的是语义上存在等价，但视觉上不等价，比如“囍”和“喜喜”。
- NFKD，表示“兼容等价分解”（Normalization Form Compatibility Decomposition），即在兼容等价的前提下，返回合成字符分解的多个简单字符。

```javascript

'\u004F\u030C'.normalize('NFC').length // 1
'\u004F\u030C'.normalize('NFD').length // 2

```

上面代码表示，NFC参数返回字符的合成形式，NFD参数返回字符的分解形式。

不过，normalize方法目前不能识别三个或三个以上字符的合成。这种情况下，还是只能使用正则表达式，通过Unicode编号区间判断。

## includes(), startsWith(), endsWith()

传统上，JavaScript只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6又提供了三种新方法。

- **includes()**：返回布尔值，表示是否找到了参数字符串。
- **startsWith()**：返回布尔值，表示参数字符串是否在源字符串的头部。
- **endsWith()**：返回布尔值，表示参数字符串是否在源字符串的尾部。

```javascript

var s = "Hello world!";

s.startsWith("Hello") // true
s.endsWith("!") // true
s.includes("o") // true

```

这三个方法都支持第二个参数，表示开始搜索的位置。

```javascript

var s = "Hello world!";

s.startsWith("world", 6) // true
s.endsWith("Hello", 5) // true
s.includes("Hello", 6) // false

```

上面代码表示，使用第二个参数n时，endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。

## repeat()

repeat()返回一个新字符串，表示将原字符串重复n次。

```javascript

"x".repeat(3) // "xxx"
"hello".repeat(2) // "hellohello"

```

## 正则表达式的y修饰符

除了u修饰符，ES6还为正则表达式添加了y修饰符，叫做“粘连”（sticky）修饰符。它的作用与g修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始，不同之处在于，g修饰符只确保剩余位置中存在匹配，而y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。

```javascript

var s = "aaa_aa_a";
var r1 = /a+/g;
var r2 = /a+/y;

r1.exec(s) // ["aaa"]
r2.exec(s) // ["aaa"]

r1.exec(s) // ["aa"]
r2.exec(s) // null

```

上面代码有两个正则表达式，一个使用g修饰符，另一个使用y修饰符。这两个正则表达式各执行了两次，第一次执行的时候，两者行为相同，剩余字符串都是“_aa_a”。由于g修饰没有位置要求，所以第二次执行会返回结果，而y修饰符要求匹配必须从头部开始，所以返回null。

如果改一下正则表达式，保证每次都能头部匹配，y修饰符就会返回结果了。

```javascript

var s = "aaa_aa_a";
var r = /a+_/y;

r.exec(s) // ["aaa_"]
r.exec(s) // ["aa_"]

```

上面代码每次匹配，都是从剩余字符串的头部开始。

进一步说，y修饰符号隐含了头部匹配的标志&#710;。

```javascript

/b/y.exec("aba")
// null

```

上面代码由于不能保证头部匹配，所以返回null。y修饰符的设计本意，就是让头部匹配的标志&#710;在全局匹配中都有效。

与y修饰符相匹配，ES6的正则对象多了sticky属性，表示是否设置了y修饰符。

```javascript

var r = /hello\d/y;
r.sticky // true

```

## Regexp.escape()

字符串必须转义，才能作为正则模式。

```javascript
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

let str = '/path/to/resource.html?search=query';
escapeRegExp(str)
// "\/path\/to\/resource\.html\?search=query"
```

上面代码中，str是一个正常字符串，必须使用反斜杠对其中的特殊字符转义，才能用来作为一个正则匹配的模式。

已经有[提议](https://esdiscuss.org/topic/regexp-escape)将这个需求标准化，作为[`Regexp.escape()`](https://github.com/benjamingr/RexExp.escape)，放入ES7。

```javascript
RegExp.escape("The Quick Brown Fox");
// "The Quick Brown Fox"

RegExp.escape("Buy it. use it. break it. fix it.")
// "Buy it\. use it\. break it\. fix it\."

RegExp.escape("(*.*)");
// "\(\*\.\*\)"
```

字符串转义以后，可以使用RegExp构造函数生成正则模式。

```javascript
var str = 'hello. how are you?';
var regex = new RegExp(RegExp.escape(str), 'g');
assert.equal(String(regex), '/hello\. how are you\?/g');
```

目前，该方法可以用上文的escapeRegExp函数或者垫片模块[`regexp.escape`](https://github.com/ljharb/regexp.escape)实现。

```javascript
var escape = require('regexp.escape');
escape('hi. how are you?')
"hi\\. how are you\\?"
```

## 模板字符串

以前的JavaScript语言，输出模板通常是这样写的。

```javascript
$("#result").append(
  "There are <b>" + basket.count + "</b> " +
  "items in your basket, " +
  "<em>" + basket.onSale +
  "</em> are on sale!"
);
```

上面这种写法相当繁琐不方便，ES6引入了模板字符串解决这个问题。

```javascript
$("#result").append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);
```

模板字符串（template string）是增强版的字符串，用反引号（&#96;）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

```javascript

// 普通字符串
`In JavaScript '\n' is a line-feed.`

// 多行字符串
`In JavaScript this is
 not legal.`

console.log(`string text line 1
string text line 2`);

// 字符串中嵌入变量
var name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`

```

上面代码中的字符串，都是用反引号表示。如果在模板字符串中需要使用反引号，则前面要用反斜杠转义。

```javascript
var greeting = `\`Yo\` World!`;
```

如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中。

```javascript
$("#warning").html(`
  <h1>Watch out!</h1>
  <p>Unauthorized hockeying can result in penalties
  of up to ${maxPenalty} minutes.</p>
`);
```

模板字符串中嵌入变量，需要将变量名写在`${}`之中。

```javascript
function authorize(user, action) {
  if (!user.hasPrivilege(action)) {
    throw new Error(
      // 传统写法为
      // 'User '
      // + user.name
      // + ' is not authorized to do '
      // + action
      // + '.'
      `User ${user.name} is not authorized to do ${action}.`);
  }
}
```

大括号内部可以放入任意的JavaScript表达式，可以进行运算，以及引用对象属性。

```javascript

var x = 1;
var y = 2;

console.log(`${x} + ${y} = ${x+y}`)
// "1 + 2 = 3"

console.log(`${x} + ${y*2} = ${x+y*2}`)
// "1 + 4 = 5"

var obj = {x: 1, y: 2};
console.log(`${obj.x + obj.y}`)
// 3

```

模板字符串之中还能调用函数。

```javascript

function fn() {
  return "Hello World";
}

console.log(`foo ${fn()} bar`);
// foo Hello World bar

```

如果大括号中的值不是字符串，将按照一般的规则转为字符串。比如，默认会调用对象的toString方法。

如果模板字符串中的变量没有声明，将报错。

```javascript
var msg = `Hello, ${place}`;
// throws error
```

## 标签模板

模板字符串的功能，不仅仅是上面这些。它可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。这被称为“标签模板”功能（tagged template）。

```javascript

var a = 5;
var b = 10;

tag`Hello ${ a + b } world ${ a * b }`;

```

上面代码中，模板字符串前面有一个函数tag，整个表达式将返回tag处理模板字符串后的返回值。

函数tag依次接受三个参数。第一个参数是一个数组，该数组的成员是模板字符串中那些没有变量替换的部分，也就是说，变量替换只发生在数组的第一个成员与第二个成员之间、第二个成员与第三个成员之间，以此类推。第一个参数之后的参数，都是模板字符串各个变量被替换后的值。

- 第一个参数：['Hello ', ' world ']
- 第二个参数: 15
- 第三个参数：50

也就是说，tag函数实际的参数如下。

```javascript

tag(['Hello ', ' world '], 15, 50)

```

下面是tag函数的代码，以及运行结果。

```javascript

var a = 5;
var b = 10;

function tag(s, v1, v2) {
  console.log(s[0]);
  console.log(s[1]);
  console.log(v1);
  console.log(v2);

  return "OK";
}

tag`Hello ${ a + b } world ${ a * b}`;
// "Hello "
// " world "
// 15
// 50
// "OK"

```

下面是一个更复杂的例子。

```javascript

var total = 30;
var msg = passthru`The total is ${total} (${total*1.05} with tax)`;

function passthru(literals) {
  var result = "";
  var i = 0;

  while (i < literals.length) {
    result += literals[i++];
    if (i < arguments.length) {
      result += arguments[i];
    }
  }

  return result;

}

msg
// "The total is 30 (31.5 with tax)"

```

上面这个例子展示了，如何将各个参数按照原来的位置拼合回去。

“标签模板”的一个重要应用，就是过滤HTML字符串，防止用户输入恶意内容。

```javascript
var message =
  SaferHTML`<p>${sender} has sent you a message.</p>`;

function SaferHTML(templateData) {
  var s = templateData[0];
  for (var i = 1; i < arguments.length; i++) {
    var arg = String(arguments[i]);

    // Escape special characters in the substitution.
    s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

    // Don't escape special characters in the template.
    s += templateData[i];
  }
  return s;
}
```

上面代码中，经过SaferHTML函数处理，HTML字符串的特殊字符都会被转义。

标签模板的另一个应用，就是多语言转换（国际化处理）。

```javascript
i18n`Hello ${name}, you have ${amount}:c(CAD) in your bank account.`
// Hallo Bob, Sie haben 1.234,56 $CA auf Ihrem Bankkonto.
```

模板字符串并不能取代Mustache之类的模板函数，因为没有条件判断和循环处理功能，但是通过标签函数，你可以自己添加这些功能。

```javascript
// 下面的hashTemplate函数
// 是一个自定义的模板处理函数
var libraryHtml = hashTemplate`
  <ul>
    #for book in ${myBooks}
      <li><i>#{book.title}</i> by #{book.author}</li>
    #end
  </ul>
`;
```

除此之外，你甚至可以使用标签模板，在JavaScript语言之中嵌入其他语言。

```javascript
java`
class HelloWorldApp {
  public static void main(String[] args) {
    System.out.println(“Hello World!”); // Display the string.
  }
}
`
HelloWorldApp.main();
```

模板处理函数的第一个参数，还有一个raw属性。它也是一个数组，成员与处理函数的第一个参数完全一致，唯一的区别是字符串被转义前的原始格式，这是为了模板函数处理的方便而提供的。

```javascript

tag`First line\nSecond line`

```

上面代码中，tag函数的第一个参数是一个数组`["First line\nSecond line"]`，这个数组有一个raw属性，等于`["First line\\nSecond line"]`，两者唯一的区别就是斜杠被转义了。

```javascript

function tag(strings) {
  console.log(strings.raw[0]);
  // "First line\\nSecond line"
}

```

## String.raw()

String.raw方法，往往用来充当模板字符串的处理函数，返回字符串被转义前的原始格式。

```javascript

String.raw`Hi\n${2+3}!`;
// "Hi\\n5!"

String.raw`Hi\u000A!`;
// 'Hi\\u000A!'

```

String.raw方法也可以正常的函数形式使用。这时，它的第一个参数，应该是一个具有raw属性的对象，且raw属性的值应该是一个数组。

```javascript

String.raw({ raw: 'test' }, 0, 1, 2);
// 't0e1s2t'


// 等同于
String.raw({ raw: ['t','e','s','t'] }, 0, 1, 2);

```
