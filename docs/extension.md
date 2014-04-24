# 原生对象的扩展

ES6为String、Math、Number、String这几个原生对象，添加了新的属性和方法。

## 字符串

### codePointAt方法

JavaScript内部，字符以UTF-16的格式储存，每个字符固定为16字节。对于那些需要4个字节储存的字符（Unicode编号大于0xFFFF的字符），JavaScript会认为它们是两个字符。

```javascript

var s = "𠮷";

s.length // 2
s.charAt(0) // ''
s.charAt(1)	// ''
s.charCodeAt(0) // 55362		
s.charCodeAt(1) // 57271
		
```

上面代码说明，对于4个字节储存的字符，JavaScript不能正确处理。

ES6提供了codePointAt方法，能够正确处理4个字节储存的字符，返回一个字符的Unicode编号。，

```javascript

var s = "𠮷a";

s.codePointAt(0) // 134071
s.codePointAt(1) // 97
		
s.charCodeAt(2) // 97

```

上面代码说明，codePointAt方法的参数是，字符在字符串中的位置。对于两个字节储存的字符，它的返回结果与charCodeAt方法相同。

该方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。

```javascript

function is32Bit(c) {
    return c.codePointAt(0) > 0xFFFF;
}

is32Bit("𠮷") // true
is32Bit("a") // false

```

### String.fromCodePoint方法

该方法用于从Unicode编号返回对应的字符串，作用与codePointAt正好相反。

```javascript

String.fromCodePoint(134071) // "𠮷"

```

注意，fromCodePoint方法定义在String对象上，而codePointAt方法定义在字符串的实例对象上。

### 字符的Unicode表示法

JavaScript允许采用“\uxxxx”表示一个字符，其中“xxxx”表示字符的Unicode编号。

```javascript

"\u0061"
// "a"

```

但是，这种表示法只限于\u0000——\uFFFF之间的字符。超出这个范围的字符，必须写成两个字节的形式。

```javascript

"\uD842\uDFB7"
// "𠮷"

"\u20BB7"
// " 7"

```

上面代码表示，如果直接在“\u”后面跟上超过0xFFFF的数值，JavaScript会理解成“\u20BB+7”。

ES6对这一点做出了改进，只要将超过0xFFFF的编号放入大括号，就能正确解读该字符。

```javascript

"\u{20BB7}"
// " 7"

```

### 正则表达式的u修饰符

ES6对正则表达式添加了u修饰符，用来正确处理大于\uFFFF的Unicode字符。

```javascript

var s = "𠮷";

/^.$/.test(s) // false
/^.$/u.test(s) // true

```

上面代码表示，如果不添加u修饰符，正则表达式就会认为字符串为两个字符，从而匹配失败。

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

### contains(), startsWith(), endsWith()

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

### repeat()

repeat()返回一个新字符串，表示将原字符串重复n次。

```javascript

"x".repeat(3) // "xxx"
"hello".repeat(2) // "hellohello"

```

## 数值

### 二进制和八进制表示法

ES6提供了二进制和八进制数值的新的写法，分别用前缀0b和0o表示。

```javascript

0b111110111 === 503 // true
0o767 === 503 // true

```

