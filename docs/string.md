# 字符串的扩展

ES6加强了对Unicode的支持，并且扩展了字符串对象。

## codePointAt方法

JavaScript内部，字符以UTF-16的格式储存，每个字符固定为2个字节。对于那些需要4个字节储存的字符（Unicode编号大于0xFFFF的字符），JavaScript会认为它们是两个字符。

```javascript

var s = "𠮷";

s.length // 2
s.charAt(0) // ''
s.charAt(1)	// ''
s.charCodeAt(0) // 55362		
s.charCodeAt(1) // 57271
		
```

上面代码中，汉字“𠮷”的Unicode编号是0x20BB7，UTF-16编码为0xD842 0xDFB7（十进制为55362 57271），需要4个字节储存。对于这种4个字节的字符，JavaScript不能正确处理，字符串长度会误判为2，而且charAt方法无法读取字符，charCodeAt方法只能分别返回前两个字节和后两个字节的值。

ES6提供了codePointAt方法，能够正确处理4个字节储存的字符，返回一个字符的Unicode编号。

```javascript

var s = "𠮷a";

s.codePointAt(0) // 134071
s.codePointAt(1) // 57271
		
s.charCodeAt(2) // 97

```

codePointAt方法的参数，是字符在字符串中的位置（从0开始）。上面代码中，JavaScript将“𠮷a”视为三个字符，codePointAt方法在第一个字符上，正确地识别了“𠮷”，返回了它的十进制Unicode编号134071（即十六进制的20BB7）。在第二个字符（即“𠮷”的后两个字节）和第三个字符“a”上，codePointAt方法的结果与charCodeAt方法相同。

总之，codePointAt方法会正确返回四字节的UTF-16字符的Unicode编号。对于那些两个字节储存的常规字符，它的返回结果与charCodeAt方法相同。

codePointAt方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。

```javascript

String.fromCodePoint(134071) // "𠮷"

```

注意，fromCodePoint方法定义在String对象上，而codePointAt方法定义在字符串的实例对象上。

## 字符的Unicode表示法

JavaScript允许采用“\uxxxx”形式表示一个字符，其中“xxxx”表示字符的Unicode编号。

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

ES6对这一点做出了改进，只要将超过0xFFFF的编号放入大括号，就能正确解读该字符。

```javascript

"\u{20BB7}"
// "𠮷"

```

## 正则表达式的u修饰符

ES6对正则表达式添加了u修饰符，用来正确处理大于\uFFFF的Unicode字符。

**（1）点字符**

点（.）字符在正则表达式中，解释为除了换行以外的任意单个字符。对于大于\uFFFF的Unicode字符，点字符不能识别，必须加上u修饰符。

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

上面代码表示，如果不加u修饰符，正则表达式无法识别\u{61}这种表示法，只会认为这匹配属61个连续的u。

**（3）量词**

使用u修饰符后，所有量词都会正确识别大于\uFFFF的Unicode字符。

```javascript

/a{2}/.test('aa') // true
/a{2}/u.test('aa') // true
/𠮷{2}/.test('𠮷𠮷') // false
/𠮷{2}/u.test('𠮷𠮷') // true

```

**（4）预定义模式**

u修饰符也影响到预定义模式，正确识别大于\uFFFF的Unicode字符。

```javascript

/^\S$/.test('𠮷') // false
/^\S$/u.test('𠮷')

```

上面代码的`\S`是预定义模式，匹配所有不是空格的字符。只有加了u修饰符，它才能正确匹配大于\uFFFF的Unicode字符。

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

上面代码中，不加u修饰符，就无法识别非正规的K字符。

## contains(), startsWith(), endsWith()

传统上，JavaScript只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6又提供了三种新方法。

- **contains()**：返回布尔值，表示是否找到了参数字符串。
- **startsWith()**：返回布尔值，表示参数字符串是否在源字符串的头部。
- **endsWith()**：返回布尔值，表示参数字符串是否在源字符串的尾部。

```javascript

var s = "Hello world!";

s.startsWith("Hello") // true
s.endsWith("!") // true
s.contains("o") // true

```

这三个方法都支持第二个参数，表示开始搜索的位置。

```javascript

var s = "Hello world!";

s.startsWith("o", 4) // true
s.endsWith("o", 8) // true
s.contains("o", 8) // false

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

## 模板字符串

模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

```javascript

// 普通字符串
`In JavaScript '\n' is a line-feed.`

// 多行字符串
`In JavaScript this is
 not legal.`

// 字符串中嵌入变量
var name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`

var x = 1;
var y = 2;
console.log(`${ x } + ${ y } = ${ x + y}`) 
// "1 + 2 = 3"
		
```

上面代码表示，在模板字符串中嵌入变量，需要将变量名写在${}之中。

模板字符串使得字符串与变量的结合，变得容易。下面是一个例子。

```javascript

if (x > MAX) {
	throw new Error(`Most ${MAX} allowed: ${x}!`);
	// 传统写法为'Most '+MAX+' allowed: '+x+'!'
}

```
