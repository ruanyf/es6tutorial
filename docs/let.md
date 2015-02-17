# let和const命令

## let命令

### 基本用法

ES6新增了let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。

```javascript

{
  let a = 10;
  var b = 1;
}

a // ReferenceError: a is not defined.
b // 1

```

上面代码在代码块之中，分别用let和var声明了两个变量。然后在代码块之外调用这两个变量，结果let声明的变量报错，var声明的变量返回了正确的值。这表明，let声明的变量只在它所在的代码块有效。

for循环的计数器，就很合适使用let命令。

```javascript

for(let i = 0; i < arr.length; i++){}
 
console.log(i)
//ReferenceError: i is not defined


```

上面代码的计数器i，只在for循环体内有效。

下面的代码如果使用var，最后输出的是10。

```javascript

var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10

```

如果使用let，声明的变量仅在块级作用域内有效，最后输出的是6。

```javascript

var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6

```

### 不存在变量提升

let不像var那样，会发生“变量提升”现象。

```javascript

function do_something() {
  console.log(foo); // ReferenceError
  let foo = 2;
}

```

上面代码在声明foo之前，就使用这个变量，结果会抛出一个错误。

这也意味着typeof不再是一个百分之百安全的操作。

```javascript

if (1) { 
  typeof x; // ReferenceError 
  let x; 
}

```

上面代码中，由于块级作用域内typeof运行时，x还没有声明，所以会抛出一个ReferenceError。

只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

```javascript

var tmp = 123; 

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp; 
}

```

上面代码中，存在全局量tmp，但是块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以在let声明变量前，对tmp赋值会报错。 

总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称TDZ）。

```javascript

if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError
    
  let tmp; // TDZ结束
  console.log(tmp); // undefined
    
  tmp = 123;
  console.log(tmp); // 123
}

```

上面代码中，在let命令声明变量tmp之前，都属于变量tmp的“死区”。

有些“死区”比较隐蔽，不太容易发现。

```javascript

// 报错

```

上面代码中，调用bar函数之所以报错，是因为参数x默认值等于另一个参数y，而此时y还没有声明，属于”死区“。

需要注意的是，函数参数的作用域与函数体的作用域是分离的。

```javascript

let foo = 'outer';

function bar(func = x => foo) {
  let foo = 'inner';
  console.log(func()); // outer
}

bar();

```

上面代码中，函数bar的参数func，默认是一个匿名函数，返回值为变量foo。这个匿名函数运行时，foo只在函数体外声明，内层的声明还没执行，因此foo指向函数体外的声明，输出outer。

### 不允许重复声明

let不允许在相同作用域内，重复声明同一个变量。

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

因此，不能在函数内部重新声明参数。

```javascript

function func(arg) {
  let arg; // 报错
}

function func(arg) {
  {
    let arg; // 不报错
  }
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

块级作用域的出现，实际上使得获得广泛应用的立即执行匿名函数（IIFE）不再必要了。

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

另外，ES6也规定，函数本身的作用域，在其所在的块级作用域之内。

```javascript

function f() { console.log('I am outside!'); }
(function () {
  if(false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();
}());

```

上面代码在ES5中运行，会得到“I am inside!”，但是在ES6中运行，会得到“I am outside!”。这是因为ES5存在函数提升，不管会不会进入if代码块，函数声明都会提升到当前作用域的顶部，得到执行；而ES6支持块级作用域，不管会不会进入if代码块，其内部声明的函数皆不会影响到作用域的外部。

需要注意的是，如果在严格模式下，函数只能在顶层作用域和函数内声明，其他情况（比如if代码块、循环代码块）的声明都会报错。

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

if (true) {
  const MAX = 5;
}

// 常量MAX在此处不可得

```

const命令也不存在提升，只能在声明的位置后面使用。

```javascript

if (true) {
  console.log(MAX); // ReferenceError
  const MAX = 5;
}

```

上面代码在常量MAX声明之前就调用，结果报错。

const声明的常量，也与let一样不可重复声明。

```javascript

var message = "Hello!";
let age = 25;

// 以下两行都会报错
const message = "Goodbye!";
const age = 30;

```

由于const命令只是指向变量所在的地址，所以将一个对象声明为常量必须非常小心。

```javascript

const foo = {};
foo.prop = 123;

foo.prop
// 123

foo = {} // 不起作用

```

上面代码中，常量foo储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，即不能把foo指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。如果真的想将对象冻结，应该使用Object.freeze方法。

```javascript

const foo = Object.freeze({});
foo.prop = 123; // 不起作用

```

上面代码中，常量foo指向一个冻结的对象，所以添加新属性不起作用。

## 全局对象的属性

全局对象是最顶层的对象，在浏览器环境指的是window对象，在Node.js指的是global对象。ES5规定，所有全局变量都是全局对象的属性。

ES6规定，var命令和function命令声明的全局变量，属于全局对象的属性；let命令、const命令、class命令声明的全局变量，不属于全局对象的属性。

```javascript

var a = 1;
// 如果在node环境，可以写成global.a
// 或者采用通用方法，写成this.a
window.a // 1

let b = 1;
window.b // undefined

```

上面代码中，全家变量a由var命令声明，所以它是全局对象的属性；全局变量b由let命令声明，所以它不是全局对象的属性，返回undefined。
