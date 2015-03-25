# 数值的扩展

## 二进制和八进制表示法

ES6提供了二进制和八进制数值的新的写法，分别用前缀0b和0o表示。

```javascript

0b111110111 === 503 // true
0o767 === 503 // true

```

八进制用0o前缀表示的方法，将要取代已经在ES5中被逐步淘汰的加前缀0的写法。

## Number.isFinite(), Number.isNaN()

ES6在Number对象上，新提供了Number.isFinite()和Number.isNaN()两个方法，用来检查Infinite和NaN这两个特殊值。

Number.isFinite()用来检查一个数值是否非无穷（infinity）。

```javascript

Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite("foo"); // false
Number.isFinite("15"); // false
Number.isFinite(true); // false

```

ES5通过下面的代码，部署Number.isFinite方法。

```javascript

(function (global) {
  var global_isFinite = global.isFinite;

  Object.defineProperty(Number, 'isFinite', {
    value: function isFinite(value) {
      return typeof value === 'number' && global_isFinite(value);
    },
    configurable: true,
    enumerable: false,
    writable: true
  });
})(this);

```

Number.isNaN()用来检查一个值是否为NaN。

```javascript

Number.isNaN(NaN); // true
Number.isNaN(15); // false
Number.isNaN("15"); // false
Number.isNaN(true); // false

```

ES5通过下面的代码，部署Number.isNaN()。

```javascript

(function (global) {
  var global_isNaN = global.isNaN;

  Object.defineProperty(Number, 'isNaN', {
    value: function isNaN(value) {
      return typeof value === 'number' && global_isNaN(value);
    },
    configurable: true,
    enumerable: false,
    writable: true
  });
})(this);

```

它们与传统的全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，非数值一律返回false。

```javascript

isFinite(25) // true
isFinite("25") // true
Number.isFinite(25) // true
Number.isFinite("25") // false

isNaN(NaN) // true
isNaN("NaN") // true
Number.isNaN(NaN) // true
Number.isNaN("NaN") // false

```

## Number.parseInt(), Number.parseFloat()

ES6将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。

```javascript

// ES5的写法
parseInt("12.34") // 12
parseFloat('123.45#') // 123.45

// ES6的写法
Number.parseInt("12.34") // 12
Number.parseFloat('123.45#') // 123.45

```

这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。

## Number.isInteger()和安全整数

Number.isInteger()用来判断一个值是否为整数。需要注意的是，在JavaScript内部，整数和浮点数是同样的储存方法，所以3和3.0被视为同一个值。

```javascript

Number.isInteger(25) // true
Number.isInteger(25.0) // true
Number.isInteger(25.1) // false
Number.isInteger("15") // false
Number.isInteger(true) // false

```

ES5通过下面的代码，部署Number.isInteger()。

```javascript

(function (global) {
  var floor = Math.floor,
    isFinite = global.isFinite;

  Object.defineProperty(Number, 'isInteger', {
    value: function isInteger(value) {
      return typeof value === 'number' && isFinite(value) &&
        value > -9007199254740992 && value < 9007199254740992 &&
        floor(value) === value;
    },
    configurable: true,
    enumerable: false,
    writable: true
  });
})(this);

```

JavaScript能够准确表示的整数范围在-2&#710;53 and 2&#710;53之间。ES6引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限。Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内。

```javascript

var inside = Number.MAX_SAFE_INTEGER;
var outside = inside + 1;

Number.isInteger(inside) // true
Number.isSafeInteger(inside) // true

Number.isInteger(outside) // true
Number.isSafeInteger(outside) // false

```

## Math对象的扩展

**（1）Math.trunc()**

Math.trunc方法用于去除一个数的小数部分，返回整数部分。

```javascript

Math.trunc(4.1) // 4
Math.trunc(4.9) // 4
Math.trunc(-4.1) // -4
Math.trunc(-4.9) // -4

```

**（2）Math.sign()**

Math.sign方法用来判断一个数到底是正数、负数、还是零。如果参数为正数，返回+1；参数为负数，返回-1；参数为0，返回0；参数为NaN，返回NaN。

```javascript

Math.sign(-5) // -1
Math.sign(5) // +1
Math.sign(0) // +0
Math.sign(-) // -0
Math.sign(NaN) // NaN

```

ES5通过下面的代码，可以部署Math.sign()。

```javascript

(function (global) {
  var isNaN = Number.isNaN;

  Object.defineProperty(Math, 'sign', {
    value: function sign(value) {
      var n = +value;
      if (isNaN(n))
        return n /* NaN */;

      if (n === 0)
        return n; // Keep the sign of the zero.

      return (n < 0) ? -1 : 1;
    },
    configurable: true,
    enumerable: false,
    writable: true
  });
})(this);

```

**（3）数学方法**

ES6在Math对象上还提供了许多新的数学方法。

- Math.acosh(x)	返回x的反双曲余弦（inverse hyperbolic cosine）
- Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
- Math.atanh(x)	返回x的反双曲正切（inverse hyperbolic tangent）
- Math.cbrt(x)	返回x的立方根
- Math.clz32(x)	返回x的32位二进制整数表示形式的前导0的个数
- Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
- Math.expm1(x)	返回e&#710;x - 1
- Math.fround(x) 返回x的单精度浮点数形式
- Math.hypot(...values)	返回所有参数的平方和的平方根
- Math.imul(x, y) 返回两个参数以32位整数形式相乘的结果
- Math.log1p(x)	返回1 + x的自然对数
- Math.log10(x) 返回以10为底的x的对数
- Math.log2(x) 返回以2为底的x的对数
- Math.tanh(x)	返回x的双曲正切（hyperbolic tangent）
