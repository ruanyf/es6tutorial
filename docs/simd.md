# SIMD 的用法

## 概述

SIMD是“Single Instruction/Multiple Data”的缩写，意为“单指令，多数据”。它是JavaScript操作CPU对应指令的接口，你可以看做这是一种不同的运算执行模式。与它相对的是SISD（“Single Instruction/Single Data”），即“单指令，单数据”。

SIMD的含义是使用一个指令，完成多个数据的运算；SISD的含义是使用一个指令，完成单个数据的运算，这是JavaScript的默认运算模式。显而易见，SIMD的执行效率要高于SISD，所以被广泛用于3D图形运算、物理模拟等运算量超大的项目之中。

为了理解SIMD，请看下面的例子。

```javascript
var a = [1, 2, 3, 4];
var b = [5, 6, 7, 8];
var c = [];

c[0] = a[0] + b[0];
c[1] = a[1] + b[1];
c[2] = a[2] + b[2];
c[3] = a[3] + b[3];
c; // Array[6, 8, 10, 12]
```

上面代码中，数组`a`和`b`的对应成员相加，结果放入数组`c`。它的运算模式是依次处理每个数组成员，一共有四个数组成员，所以需要运算4次。

如果采用SIMD模式，只要运算一次就够了。

```javascript
var a = SIMD.Float32x4(1, 2, 3, 4);
var b = SIMD.Float32x4(5, 6, 7, 8);
var c = SIMD.Float32x4.add(a, b); // Float32x4[6, 8, 10, 12]
```

上面代码之中，数组`a`和`b`的四个成员的各自相加，只用一条指令就完成了。因此，速度比上一种写法提高了4倍。

一次SIMD运算，可以处理多个数据，这些数据被称为“通道”（lane）。上面代码中，一次运算了四个数据，因此就是四个通道。

SIMD通常用于矢量运算。

```javascript
v + w	= 〈v1, …, vn〉+ 〈w1, …, wn〉
      = 〈v1+w1, …, vn+wn〉
```

上面代码中，`v`和`w`是两个多元矢量。它们的加运算，在SIMD下是一个指令、而不是n个指令完成的，这就大大提高了效率。这对于3D动画、图像处理、信号处理、数值处理、加密等运算是非常重要的。

总得来说，SIMD是数据并行处理（parallelism）的一种手段。

## 数据类型

SIMD提供多种数据类型。

- Float32x4：四个32位浮点数
- Float64x2：两个64位浮点数
- Int32x4：四个32位整数
- Int16x8：八个16位整数
- Int8x16：十六个8位整数
- Uint32x4：四个无符号的32位整数
- Uint16x8：八个无符号的16位整数
- Uint8x16：十六个无符号的8位整数
- Bool32x4：四个32位布尔值
- Bool16x8：八个16位布尔值
- Bool8x16：十六个8位布尔值
- Bool64x2：两个64位布尔值

每种数据类型都是一个方法，可以传入参数，生成对应的值。

```javascript
var a = SIMD.Float32x4(1.0, 2.0, 3.0, 4.0);
```

上面代码中，变量`a`就是一个128位、包含四个32位浮点数的值。

注意，这些数据类型方法都不是构造函数，前面不能加`new`，否则会报错。

```javascript
var v = new SIMD.Float32x4(0,1,2,3);
// TypeError: SIMD.Float32x4 is not a constructor
```

每种数据类型都有一系列运算符，下面是其中的一些。

- float32x4.abs(v)：返回`v`的绝对值
- float32x4.neg(v)：返回`v`的绝对值的负值
- float32x4.sqrt(v)：返回`v`的平方根
- float32x4.add(v, w)：`v`和`w`对应项的相加
- float32x4.mul(v, w)：`v`和`w`对应项的相乘
- float32x4.equal(v, w)：比较`v`和`w`对应项是否相等，返回的布尔值组成一个`uint32x4`的值

下面是一个`add`运算符的例子。

```javascript
c[i] = SIMD.float32x4.add(a[i], b[i]);

// 或者

var tmp0 = a[i];
var tmp1 = b[i];
var tmp2 = SIMD.float32x4.add(tmp0, tmp1);
c[i] = tmp2;
```

此外，每种数据类型还有操作方法。

`getAt`方法返回指定位置的值。

```javascript
var a = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
var b = a.getAt(0); // 1.0
```

`zero`方法可以将SIMD值清零。

```javascript
var b = SIMD.float32x4.zero();
```

上面代码中，变量`b`包含的四个32位浮点数全部是0.0。

`shuffle`方法根据指定模式，重新生成一个SIMD值。

```javascript
var a = SIMD.float32x4(1.0, 2.0, 3.0, 4.0);
var b = SIMD.float32x4.shuffle(a, SIMD.float32x4.XXYY);
// [1.0, 1.0, 2.0, 2.0]

var c = SIMD.float32x4.shuffle(a, SIMD.float32x4.WWWW);
// [4.0, 4.0, 4.0, 4.0]

var d = SIMD.float32x4.shuffle(a, SIMD.float32x4.WZYX);
// [4.0, 3.0, 2.0, 1.0]
```

下面是一个求平均值的例子。

```javascript
function average(f32x4list) {
  var n = f32x4list.length;
  var sum = SIMD.float32x4.zero();
  for (int i = 0; i < n; i++) {
    sum = SIMD.float32x4.add(sum, f32x4list.getAt(i));
  }
  var total = sum.x + sum.y + sum.z + sum.w;
  return total / (n * 4);
}
```

## 二进制数组

SIMD可以与二进制数组结合，生成数组实例。

```javascript
var _f64x2 = new Float64Array(_f32x4.buffer);
var _i32x4 = new Int32Array(_f32x4.buffer);
var _i16x8 = new Int16Array(_f32x4.buffer);
var _i8x16 = new Int8Array(_f32x4.buffer);
var _ui32x4 = new Uint32Array(_f32x4.buffer);
var _ui16x8 = new Uint16Array(_f32x4.buffer);
var _ui8x16 = new Uint8Array(_f32x4.buffer);
```

下面是一些应用的例子。

```javascript
// a 和 b 是float32x4数组实例
function addArrays(a, b) {
  var c = new Float32x4Array(a.length);
  for (var i = 0; i < a.length; i++) {
    c[i] = SIMD.float32x4.add(a[i], b[i]);
  }
  return c;
}
```

## 参考链接

- MDN, [SIMD](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SIMD)
- TC39, [ECMAScript SIMD](https://github.com/tc39/ecmascript_simd)
- Axel Rauschmayer, [JavaScript gains support for SIMD](http://www.2ality.com/2013/12/simd-js.html)
