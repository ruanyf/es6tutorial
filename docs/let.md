# let和const命令

## let命令概述

ES6新增了let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。

```javascript

{
    let a = 10;
    var b = 1;
}

a // ReferenceError: a is not defined. 
b //1

```

上面代码在代码块之中，分别用let和var声明了两个变量。然后在代码块之外调用这两个变量，结果let声明的变量报错，var声明的变量返回了正确的值。这表明，let声明的变量只在它所在的代码块有效。

下面的代码如果使用var，最后输出的是9。

```javascript

var a = [];
for (var i = 0; i < 10; i++) {
  var c = i;
  a[i] = function () {
    console.log(c);
  };
}
a[6](); // 9

```

如果使用let，声明的变量仅在块级作用域内有效，最后输出的是6。

```javascript

var a = [];
for (var i = 0; i < 10; i++) {
  let c = i;
  a[i] = function () {
    console.log(c);
  };
}
a[6](); // 6

```

注意，let不允许在相同作用域内，重复声明同一个变量。

```javascript

// 报错
{
    let a = 10;
    var a = 1;
}

// 报错
{
    let a = 10;
    let a = 1;
}

```

## 块级作用域

let实际上为JavaScript新增了块级作用域。

```javascript

function f1() {
  let n = 5;
  if (true) {
      let n = 10;
  }
  console.log(n); // 5
}

```

上面的函数有两个代码块，都声明了变量n，运行后输出5。这表示外层代码块不受内层代码块的影响。如果使用var定义变量n，最后输出的值就是10。

块级作用域的出现，实际上使得获得广泛应用的立即执行函数（IIFE）不再必要了。

```javascript

// IIFE写法
(function () { 
    var tmp = ...;
    ...
}()); 

// 块级作用域写法
{
    let tmp = ...;
    ...
}

```

## const命令

const也用来声明变量，但是声明的是常量。一旦声明，常量的值就不能改变。

```javascript

const PI = 3.1415;
PI // 3.1415

PI = 3;
PI // 3.1415

const PI = 3.1;
PI // 3.1415

```

上面代码表明改变常量的值是不起作用的。需要注意的是，对常量重新赋值不会报错，只会默默地失败。

const的作用域与let命令相同：只在声明所在的块级作用域内有效。

```javascript

if (condition) {
    const MAX = 5;
}

// 常量MAX在此处不可得

```

const声明的常量，也与let一样不可重复声明。

```javascript

var message = "Hello!";
let age = 25;

// 以下两行都会报错
const message = "Goodbye!";
const age = 30;

```
