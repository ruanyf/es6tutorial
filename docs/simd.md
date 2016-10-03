# SIMD 的用法

## 概述

SIMD（发音`/sim-dee/`）是“Single Instruction/Multiple Data”的缩写，意为“单指令，多数据”。它是JavaScript操作CPU对应指令的接口，你可以看做这是一种不同的运算执行模式。与它相对的是SISD（“Single Instruction/Single Data”），即“单指令，单数据”。

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
c // Array[6, 8, 10, 12]
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

上面代码中，`v`和`w`是两个多元矢量。它们的加运算，在SIMD下是一个指令、而不是n个指令完成的，这就大大提高了效率。这对于3D动画、图像处理、信号处理、数值处理、加密等运算是非常重要的。比如，Canvas的`getImageData()`会将图像文件读成一个二进制数组，SIMD就很适合对于这种数组的处理。

总得来说，SIMD是数据并行处理（parallelism）的一种手段，可以加速一些运算密集型操作的速度。

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

每种数据类型被`x`号分隔成两部分，后面的部分表示通道数，前面的部分表示每个通道的宽度和类型。比如，`Float32x4`就表示这个值有4个通道，每个通道是一个32位浮点数。

每种数据类型都是一个方法，可以传入参数，生成对应的值。

```javascript
var a = SIMD.Float32x4(1.0, 2.0, 3.0, 4.0);
```

上面代码中，变量`a`就是一个128位、包含四个32位浮点数（即四个通道）的值。

注意，这些数据类型方法都不是构造函数，前面不能加`new`，否则会报错。

```javascript
var v = new SIMD.Float32x4(0, 1, 2, 3);
// TypeError: SIMD.Float32x4 is not a constructor
```

如果所有数据通道都是同样的值，可以使用`splat`方法生成值。

```javascript
var v = SIMD.Float32x4.splat(0.0);
```

上面代码中，`v`的四个通道都是`0.0`。

如果要取出单个通道的值，可以使用`extractLane`方法。

```javascript
var a = SIMD.Float32x4(1.0, 2.0, 3.0, 4.0);
var b = SIMD.Float32x4.extractLane(a, 0); // 1.0
```

上面代码中，`extractLane`方法的第一个参数是一个SIMD值，第二个参数是通道的编号（从0开始）。

如果要修改某个通道的值，可以使用`replaceLane`方法。

```javascript
var a = SIMD.Float32x4(1.0, 2.0, 3.0, 4.0);
var c = SIMD.Float32x4.replaceLane(a, 0, 5.0);
```

上面代码中，经过替换后，得到一个新的SIMD值：`(5.0, 2.0, 3.0, 4.0)`。可以看到，`replaceLane`接受三个参数：SIMD值、通道的编号（从0开始）、新的值。

## 方法：数学运算

每种数据类型都有一系列运算符，下面是其中的一些。

- float32x4.abs(v)：返回`v`的绝对值
- float32x4.neg(v)：返回`v`的绝对值的负值
- float32x4.sqrt(v)：返回`v`的平方根
- float32x4.add(v, w)：`v`和`w`对应项的相加
- float32x4.mul(v, w)：`v`和`w`对应项的相乘
- float32x4.equal(v, w)：比较`v`和`w`对应项是否相等，返回的布尔值组成一个`uint32x4`的值

### SIMD.%type%.add()

`add`方法接受两个SIMD值作为参数，将它们的每个通道相加，返回一个新的SIMD值。

```javascript
var a = SIMD.Float32x4(1.0, 2.0, 3.0, 4.0);
var b = SIMD.Float32x4(5.0, 10.0, 15.0, 20.0);
var c = SIMD.Float32x4.add(a, b);
```

上面代码中，经过加法运算，新的SIMD值为`(6.0, 12.0, 18.0. 24.0)`。

### SIMD.%type%.mul()

`mul`方法接受两个SIMD值作为参数，将它们的每个通道相乘，返回一个新的SIMD值。

```javascript
var a = SIMD.Float32x4(-1, -2, 3, 4);
var b = SIMD.Float32x4(3, 3, 3, 3);
SIMD.Float32x4.mul(a, b);
// Float32x4[-3, -6, 9, 12]
```

### SIMD.%type%.shiftLeftByScalar()

`shiftLeftByScalar`方法接受一个SIMD值作为参数，然后将每个通道的值左移指定的位数，返回一个新的SIMD值。

```javascript
var a = SIMD.Int32x4(1, 2, 4, 8);
SIMD.Int32x4.shiftLeftByScalar(a, 1);
// Int32x4[2, 4, 8, 16]
```

如果左移后，新的值超出了当前数据类型的位数，溢出的部分会被丢弃。

```javascript
var ix4 = SIMD.Int32x4(1, 2, 3, 4);
var jx4 = SIMD.Int32x4.shiftLeftByScalar(ix4, 32);
// Int32x4[0, 0, 0, 0]
```

### SIMD.%type%.shiftRightByScalar()

`shiftRightByScalar`方法接受一个SIMD值作为参数，然后将每个通道的值右移指定的位数，返回一个新的SIMD值。

```javascript
var a = SIMD.Int32x4(1, 2, 4, -8);
SIMD.Int32x4.shiftRightByScalar(a, 1);
// Int32x4[0, 1, 2, -4]
```

如果原来通道的值是带符号的值，则符号位保持不变，不受右移影响。如果是不带符号位的值，则右移后头部会补`0`。

```javascript
var a = SIMD.Uint32x4(1, 2, 4, -8);
SIMD.Uint32x4.shiftRightByScalar(a, 1);
// Uint32x4[0, 1, 2, 2147483644]
```

上面代码中，`-8`右移一位变成了`2147483644`，是因为对于32位无符号整数来说，`-8`的二进制形式是`11111111111111111111111111111000`，右移一位就变成了`01111111111111111111111111111100`，相当于`2147483644`。

## 方法：通道处理

### SIMD.%type%.load()

`load`方法用于从二进制数组读入数据，生成一个新的SIMD值。

```javascript
var a = new Int32Array([1,2,3,4,5,6,7,8]);
SIMD.Int32x4.load(a, 0);
// Int32x4[1, 2, 3, 4]

var b = new Int32Array([1,2,3,4,5,6,7,8]);
SIMD.Int32x4.load(a, 2);
// Int32x4[3, 4, 5, 6]
```

`load`方法接受两个参数：一个二进制数组和开始读取的位置（从0开始）。如果位置不合法（比如`-1`或者超出二进制数组的大小），就会抛出一个错误。

这个方法还有三个变种`load1()`、`load2()`、`load3()`，表示从指定位置开始，只加载一个通道、二个通道、三个通道的值。

```javascript
// 格式
SIMD.Int32x4.load(tarray, index)
SIMD.Int32x4.load1(tarray, index)
SIMD.Int32x4.load2(tarray, index)
SIMD.Int32x4.load3(tarray, index)

// 实例
var a = new Int32Array([1,2,3,4,5,6,7,8]);
SIMD.Int32x4.load1(a, 0);
// Int32x4[1, 0, 0, 0]
SIMD.Int32x4.load2(a, 0);
// Int32x4[1, 2, 0, 0]
SIMD.Int32x4.load3(a, 0);
// Int32x4[1, 2, 3,0]
```

### SIMD.%type%.splat()

`splat`方法返回一个新的SIMD值，该值的所有通道都会设成同一个预先给定的值。

```javascript
SIMD.Float32x4.splat(3);
// Float32x4[3, 3, 3, 3]
SIMD.Float64x2.splat(3);
// Float64x2[3, 3]
```

如果省略参数，所有整数型的SIMD值都会设定`0`，浮点型的SIMD值都会设成`NaN`。

### SIMD.%type%.swizzle()

`swizzle`方法返回一个新的SIMD值，重新排列原有的SIMD值的通道顺序。

```javascript
var t = SIMD.Float32x4(1, 2, 3, 4);
SIMD.Float32x4.swizzle(t, 1, 2, 0, 3);
// Float32x4[2,3,1,4]
```

上面代码中，`swizzle`方法的第一个参数是原有的SIMD值，后面的参数对应将要返回的SIMD值的四个通道。它的意思是新的SIMD的四个通道，依次是原来SIMD值的1号通道、2号通道、0号通道、3号通道。由于SIMD值最多可以有16个通道，所以`swizzle`方法除了第一个参数以外，最多还可以接受16个参数。

下面是另一个例子。

```javascript
var a = SIMD.Float32x4(1.0, 2.0, 3.0, 4.0);
// Float32x4[1.0, 2.0, 3.0, 4.0]

var b = SIMD.Float32x4.swizzle(a, 0, 0, 1, 1);
// Float32x4[1.0, 1.0, 2.0, 2.0]

var c = SIMD.Float32x4.swizzle(a, 3, 3, 3, 3);
// Float32x4[4.0, 4.0, 4.0, 4.0]

var d = SIMD.Float32x4.swizzle(a, 3, 2, 1, 0);
// Float32x4[4.0, 3.0, 2.0, 1.0]
```

### SIMD.%type%.shuffle()

`shuffle`方法从两个SIMD值之中取出指定通道，返回一个新的SIMD值。

```javascript
var a = SIMD.Float32x4(1, 2, 3, 4);
var b = SIMD.Float32x4(5, 6, 7, 8);

SIMD.Float32x4.shuffle(a, b, 1, 5, 7, 2);
// Float32x4[2, 6, 8, 3]
```

上面代码中，`a`和`b`一共有8个通道，依次编号为0到7。`shuffle`根据编号，取出相应的通道，返回一个新的SIMD值。

## 方法：比较运算

### SIMD.%type%.greaterThan()

`greatThan`方法用来比较两个SIMD值`a`和`b`的每一个通道，如果在该通道中，`a`较大就得到`true`，否则得到`false`。最后，所有通道的比较结果，会组成一个新的SIMD值，作为掩码返回。

```javascript
var a = SIMD.Float32x4(1, 6, 3, 11);
var b = SIMD.Float32x4(1, 4, 7, 9);

var mask = SIMD.Float32x4.greaterThan(a,b);
// Bool32x4[false, true, false, true]
```

### SIMD.%type%.lessThan()

`lessThan`方法用来比较两个SIMD值`a`和`b`的每一个通道，如果在该通道中，`a`较小就得到`true`，否则得到`false`。最后，所有通道的比较结果，会组成一个新的SIMD值，作为掩码返回。

```javascript
var a = SIMD.Float32x4(1, 2, 3, 11);
var b = SIMD.Float32x4(1, 4, 7, 9);

var mask = SIMD.Float32x4.lessThan(a,b);
// Bool32x4[false, true, true, false]
```

### SIMD.%type%.select()

`select`方法通过掩码生成一个新的SIMD值。它接受三个参数，分别是掩码和两个SIMD值。

```javascript
var a = SIMD.Float32x4(1, 2, 3, 4);
var b = SIMD.Float32x4(5, 6, 7, 8);

var mask = SIMD.Bool32x4(true, false, false, true);

SIMD.Float32x4.select(mask, a, b);
// Float32x4[1, 6, 7, 4]
```

上面代码中，`select`方法接受掩码和两个SIMD值作为参数。当某个通道对应的掩码为`true`时，会选择第一个SIMD值的对应通道，否则选择第二个SIMD值的对应通道。

这个方法通常与比较运算符结合使用。

```javascript
var a = SIMD.Float32x4(0, 12, 3, 4);
var b = SIMD.Float32x4(0, 6, 7, 50);

var mask = SIMD.Float32x4.lessThan(a,b);
// Bool32x4[false, false, true, true]

var result = SIMD.Float32x4.select(mask, a, b);
// Float32x4[0, 6, 3, 4]
```

上面代码中，先通过`lessThan`方法生成一个掩码，然后通过`select`方法生成一个由每个通道的较小值组成的新的SIMD值。

### SIMD.%type%.allTrue()，SIMD.%type%.anyTrue()

`allTrue`方法接受一个SIMD值作为参数，然后返回一个布尔值，表示该SIMD值的所有通道是否都为`true`。

```javascript
var a = SIMD.Bool32x4(true, true, true, true);
var b = SIMD.Bool32x4(true, false, true, true);

SIMD.Bool32x4.allTrue(a); // true
SIMD.Bool32x4.allTrue(b); // false
```

`anyTrue`方法则是只要有一个通道为`true`，就返回`true`，否则返回`false`。

```javascript
var a = SIMD.Bool32x4(false, false, false, false);
var b = SIMD.Bool32x4(false, false, true, false);

SIMD.Bool32x4.anyTrue(a); // false
SIMD.Bool32x4.anyTrue(b); // true
```

这两个方法通常与比较运算符结合使用。

```javascript
var ax4    = SIMD.Float32x4(1.0, 2.0, 3.0, 4.0);
var bx4    = SIMD.Float32x4(0.0, 6.0, 7.0, 8.0);
var ix4    = SIMD.Float32x4.lessThan(ax4, bx4);
var b1     = SIMD.Int32x4.allTrue(ix4); // false
var b2     = SIMD.Int32x4.anyTrue(ix4); // true
```

### SIMD.%type%.min()，SIMD.%type%.minNum()

`min`方法接受两个SIMD值作为参数，将它们的每个通道的较小值，组成一个新的SIMD值返回。

```javascript
var a = SIMD.Float32x4(-1, -2, 3, 5.2);
var b = SIMD.Float32x4(0, -4, 6, 5.5);
SIMD.Float32x4.min(a, b);
// Float32x4[-1, -4, 3, 5.2]
```

如果有一个通道的值是`NaN`，则会返回`NaN`。

```javascript
var c = SIMD.Float64x2(NaN, Infinity)
var d = SIMD.Float64x2(1337, 42);
SIMD.Float64x2.min(c, d);
// Float64x2[NaN, 42]
```

`minNum`方法与`min`方法的作用一模一样，唯一的区别是如果有一个通道的值是`NaN`，则会优先返回另一个通道的值。

```javascript
var ax4 = SIMD.Float32x4(1.0, 2.0, NaN, NaN);
var bx4 = SIMD.Float32x4(2.0, 1.0, 3.0, NaN);
var cx4 = SIMD.Float32x4.min(ax4, bx4);
// Float32x4[1.0, 1.0, NaN, NaN]
var dx4 = SIMD.Float32x4.minNum(ax4, bx4);
// Float32x4[1.0, 1.0, 3.0, NaN]
```

## 实例：求平均值

正常模式下，计算`n`个值的平均值，需要运算`n`次。

```javascript
function average(list) {
  var n = list.length;
  var sum = 0.0;
  for (var i = 0; i < n; i++) {
    sum += list[i];
  }
  return sum / n;
}
```

使用SIMD，可以将计算次数减少到`n`次的四分之一。

```javascript
function average(list) {
  var n = list.length;
  var sum = SIMD.Float32x4.splat(0.0);
  for (var i = 0; i < n; i += 4) {
    sum = SIMD.Float32x4.add(
      sum,
      SIMD.Float32x4.load(list, i)
    );
  }
  var total = SIMD.Float32x4.extractLane(sum, 0) +
              SIMD.Float32x4.extractLane(sum, 1) +
              SIMD.Float32x4.extractLane(sum, 2) +
              SIMD.Float32x4.extractLane(sum, 3);
  return total / n;
}
```

上面代码先是每隔四位，将所有的值读入一个SIMD，然后立刻累加。然后，得到累加值四个通道的总和，再除以`n`就可以了。

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

下面是一个例子。

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

- TC39, [SIMD.js Stage 2](https://docs.google.com/presentation/d/1MY9NHrHmL7ma7C8dyNXvmYNNGgVmmxXk8ZIiQtPlfH4/edit#slide=id.p19)
- MDN, [SIMD](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SIMD)
- TC39, [ECMAScript SIMD](https://github.com/tc39/ecmascript_simd)
- Axel Rauschmayer, [JavaScript gains support for SIMD](http://www.2ality.com/2013/12/simd-js.html)
