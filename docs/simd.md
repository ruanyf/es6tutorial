# SIMD 的用法

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
var c = SIMD.Float32x4.add(a,b); // Float32x4[6, 8, 10, 12]
```

上面代码之中，数组`a`和`b`的四个成员的各自相加，只用一条指令就完成了。因此，速度比上一种写法提高了4倍。

一次SIMD运算，可以处理多个数据，这些数据被称为“通道”（lane）。上面代码中，一次运算了四个数据，因此就是四个通道。
