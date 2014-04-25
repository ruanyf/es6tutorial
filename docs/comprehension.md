# 数组推导

ES6提供简洁写法，允许直接通过现有数组生成新数组，这被称为数组推导（array comprehension）。

```javascript

var a1 = [1, 2, 3, 4];
var a2 = [i * 2 for (i of a1)];

a2 // [2, 4, 6, 8]

```

上面代码表示，通过for...of结构，数组a2直接在a1的基础上生成。

数组推导可以替代map和filter方法。

```javascript

[for (i of [1, 2, 3]) i * i];
// 等价于
[1, 2, 3].map(function (i) { return i * i });

[i for (i of [1,4,2,3,-8]) if (i < 3)];
// 等价于
[1,4,2,3,-8].filter(function(i) { return i < 3 });

```

上面代码说明，模拟map功能只要单纯的for...of循环就行了，模拟filter功能除了for...of循环，还必须加上if语句。

新引入的for...of结构，可以直接跟在表达式的前面或后面，甚至可以在一个数组推导中，使用多个for...of结构。

```javascript

var a1 = ["x1", "y1"];
var a2 = ["x2", "y2"];
var a3 = ["x3", "y3"];

[(console.log(s + w + r)) for (s of a1) for (w of a2) for (r of a3)];
// x1x2x3
// x1x2y3
// x1y2x3
// x1y2y3
// y1x2x3
// y1x2y3
// y1y2x3
// y1y2y3

```

上面代码在一个数组推导之中，使用了三个for...of结构。

需要注意的是，数组推导的方括号构成了一个单独的作用域，在这个方括号中声明的变量类似于使用let语句声明的变量。

由于字符串可以视为数组，因此字符串也可以直接用于数组推导。

```javascript

[c for (c of 'abcde') if (/[aeiou]/.test(c))].join('') // 'ae'

[c+'0' for (c of 'abcde')].join('') // 'a0b0c0d0e0'

```

上面代码使用了数组推导，对字符串进行处理。

数组推导需要注意的地方是，新数组会立即在内存中生成。这时，如果原数组是一个很大的数组，将会非常耗费内存。
