# 原生对象的扩展

ES6为String、Math、Number、String这几个原生对象，添加了新的属性和方法。

## 字符串的codePointAt方法

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

## String.fromCodePoint方法

该方法用于从Unicode编号返回对应的字符串，作用与codePointAt正好相反。

```javascript

String.fromCodePoint(134071) // "𠮷"

```

注意，fromCodePoint方法定义在String对象上，而codePointAt方法定义在字符串的实例对象上。

## 二进制和八进制表示法

ES6提供了二进制和八进制数值的新的写法，分别用前缀0b和0o表示。

```javascript

0b111110111 === 503 // true
0o767 === 503 // true

```
