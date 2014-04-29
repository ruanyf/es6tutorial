# 多变量的模式赋值

ES6允许按照一定模式，一次性对多个变量进行赋值，这又称为解构（Destructuring）。

正常情况下，将数组元素赋值给多个变量，只能一次次分开赋值。

```javascript

var a = 1;
var b = 2;
var c = 3;

```

ES6允许写成下面这样。

```javascript

var [a, b, c] = [1, 2, 3];

```

本质上，这种写法属于模式匹配，只要等号两边的模式相同，左边的变量就会被赋予对应的值。下面是一些嵌套数组进行模式赋值的例子。

```javascript

var [foo, [[bar], baz]] = [1, [[2], 3]]

var [,,third] = ["foo", "bar", "baz"]

var [head, ...tail] = [1, 2, 3, 4]

```

模式赋值还允许指定默认值。

```javascript

var [missing = true] = [];

console.log(missing)
// true

var { x = 3 } = {};
console.log(x)
// 3

```

模式赋值不仅可以用于数组，还可以用于对象。

```javascript

var { foo, bar } = { foo: "lorem", bar: "ipsum" };

foo // "lorem"
bar // "ipsum"

var o = {
  p1: [
    "Hello",
    { p2: "World" }
  ]
};

var { a: [x, { y }] } = o;

x // "Hello"
y // "World"

```

这种写法的用途很多。

（1）交换变量的值

```javascript

[x, y] = [y, x]; 

```

（2）从函数返回多个值

```javascript

function example() {
    return [1, 2, 3];
}

var [a, b, c] = example();

```

（3）函数参数的定义

```javascript

function f({p1, p2, p3}) {
  // ...
}

```

（4）函数参数的默认值

```javascript

jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
}) {
  // ... do stuff
};

```
