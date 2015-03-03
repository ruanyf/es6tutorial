# 编程风格

本章探讨如何将ES6的新语法，运用到编码实践之中，与传统的JavaScript语法结合在一起，以及如何形成良好的编码风格。

## 块级作用域

**（1）let取代var**

ES6提出了两个新的声明变量的命令：let和const。其中，let完全可以取代var，因为两者语义相同，而且let没有副作用。

```javascript

"use strict";

if(true) {
  let x = 'hello';
}

for (let i = 0; i < 10; i++) {
  console.log(i);
}

```

上面代码如果用var替代let，实际上就声明了一个全局变量，这显然不是本意。变量应该只在其声明的代码块内有效，var命令做不到这一点。

var命令存在变量提升效用，let命令没有这个问题。

```javascript

"use strict";

if(true) {
  console.log(x); // ReferenceError
  let x = 'hello';
}

```

上面代码如果使用var替代let，console.log那一行就不会报错，而是会输出undefined，因为变量声明提升到代码块的头部。这违反了变量先声明后使用的原则。

所以，建议不再使用var命令，而是使用let命令取代。

**（2）全局常量和线程安全**

在let和const之间，建议优先使用const，尤其是在全局环境，不应该设置变量，只应设置常量。这符合函数式编程思想，有利于将来的分布式运算。

```javascript

// bad
var a = 1, b = 2, c = 3;

// good
const a = 1;
const b = 2;
const c = 3;

// best
const [a, b, c] = [1, 2, 3];

```

const声明常量还有两个好处，一是阅读代码的人立刻会意识到不应该修改这个值，二是防止了无意间修改变量值所导致的错误。

所有的函数都应该设置为常量。

let表示的变量，只应出现在单线程运行的代码中，不能是多线程共享的，这样有利于保证线程安全。

**（3）严格模式**

V8引擎只在严格模式之下，支持let和const。结合前两点，这实际上意味着，将来所有的编程都是针对严格模式的。

## 字符串

静态字符串一律使用单引号或反引号，不使用双引号。动态字符串使用反引号。

```javascript

// bad
const a = "foobar";
const b = 'foo' + a + 'bar';

// acceptable
const c = `foobar`;

// good
const a  = 'foobar';
const b = `foo${a}bar`;
const c = 'foobar';

```

## 对象

单行定义的对象，最后一个成员不以逗号结尾。多行定义的对象，最后一个成员以逗号结尾。

```javascript

// bad
const a = { k1: v1, k2: v2, };
const b = {
  k1: v1,
  k2: v2
};

// good
const a = { k1: v1, k2: v2 };
const b = {
  k1: v1,
  k2: v2,
};

```

对象尽量静态化，一旦定义，就不得随意添加新的属性。如果添加属性不可避免，要使用Object.assign方法。

```javascript

// bad
const a = {};
a.x = 3;

// if reshape unavoidable
const a = {};
Object.assign(a, { x: 3 });

// good
const a = { x: null };
a.x = 3;

```

## 函数

使用匿名函数的场合，一律改为使用箭头函数。

```javascript

// bad
arr.reduce(function(x, y) { return x + y; }, 0);

// good
arr.reduce((x, y) => x + y, 0);

```

箭头函数取代Function.prototype.bind，不应再用 self / _this / that 绑定 this。

```javascript

// bad
const self = this;
const boundMethod = function(...params) {
  return method.apply(self, params);
}

// acceptable
const boundMethod = method.bind(this);

// best
const boundMethod = (...params) => method.apply(this, params);

```

所有配置项都应该集中在一个对象，放在最后一个参数，布尔值不可以直接作为参数。

```bash

// bad
function divide(a, b, option = false ) {
}

// good
function divide(a, b, { option = false } = {}) {
}

```

## Map结构

注意区分Object和Map，只有模拟实体对象时，才使用Object。如果只是需要key:value的数据结构，使用Map。因为Map有内建的遍历机制。

```javascript

let map = new Map(arr);

for (let key of map.keys()) {
  console.log(key);
}

for (let value of map.values()) {
  console.log(value);
}

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}

```

## 模块

使用import取代require。

```javascript
// bad
const moduleA = require('moduleA');
const func1 = moduleA.func1;
const func2 = moduleA.func2;

// good
import { func1, func2 } from 'moduleA';
```

使用export取代module.exports。

```javascript

// commonJS的写法
var React = require('react');

var Breadcrumbs = React.createClass({
  render() {
    return &lt;nav />;
  }
});

module.exports = Breadcrumbs;

// ES6的写法
import React from 'react';

const Breadcrumbs = React.createClass({
  render() {
    return &lt;nav />;
  }
});

export default Breadcrumbs

```
