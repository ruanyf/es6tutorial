# 函数式编程

从一诞生，JavaScript语言就具有函数式编程的烙印。它将函数作为一种独立的数据类型，与其他数据类型处于完全平等的地位。在JavaScript语言中，你可以采用面向对象编程，也可以采用函数式编程。有人甚至说，JavaScript是有史以来第一种被大规模采用的函数式编程语言。

ES6的种种新增功能，使得函数式编程变得更方便、更强大。本章介绍ES6如何进行函数式编程。

## 函数合成

函数合成（function composition）指的是，将多个函数合成一个函数。

```javascript
let add = x => x + x;
let pow = x => x * x;
let inv = x => 1 / x;

let comp = f.comp(add, pow, inv);

comp(1) // 0.25
comp(4) // 0.015625
```

上面代码中，`f.comp`就是函数合成器，它的参数全部都是函数，然后返回一个新的函数。

函数合成的代码如下。

```javascript
let f = {};
f.comp = (...fs) => {
  return (...args) =>
    fs.map(
      f => args = [f.apply(null, args)]
    ).pop()[0];
  };
```

上面代码先依次遍历执行`f.comp`方法的参数（即排队执行的各个函数），每一次都将结果`args`变量存入一个数组。所以，对于`comp(1)`来说，最后结果是`[[1], [0.5], [0.25]]`，然后再用`pop`方法取出最后一个元素。

## 参数倒置

参数倒置（flip）指的是改变函数参数的顺序。

```javascript
var divide = (a, b) => a / b;
var flip = f.flip(divide);

flip(10, 5) // 0.5
flip(1, 10) // 10
```

上面代码中，如果按照正常的参数顺序，10除以5等于2。但是，参数倒置以后得到的新函数，结果就是5除以10，结果得到0.5。

参数倒置的代码非常简单。

```javascript
let f = {};
f.flip =
  fn =>
    (...args) => fn.apply(null, args.reverse());
```

## 执行边界

执行边界（until）指的是函数执行到满足条件为止。

```javascript
let condition = x => x > 100;
let inc = x => x + 1;
let until = f.until(condition, inc);

until(0) // 101

condition = x => x === 5;
until = f.until(condition, inc);

until(3) // 5
```

上面代码中，第一段的条件是执行到`x`大于100为止，所以`x`初值为0时，会一直执行到101。第二段的条件是执行到等于5为止，所以`x`最后的值是5。

执行边界的实现如下。

```javascript
let f = {};
f.until = (condition, f) =>
  (...args) => {
    var r = f.apply(null, args);
    return condition(r) ? r : f.until(condition, f)(r);
  };
```

上面代码的关键就是，如果满足条件就返回结果，否则不断递归执行。

## 队列操作

队列（list）操作包括以下几种。

- `head`： 取出队列的第一个非空成员。
- `last`： 取出有限队列的最后一个非空成员。
- `tail`： 取出除了“队列头”以外的其他非空成员。
- `init`： 取出除了“队列尾”以外的其他非空成员。

下面是例子。

```javascript
f.head(5, 27, 3, 1) // 5
f.last(5, 27, 3, 1) // 1
f.tail(5, 27, 3, 1) // [27, 3, 1]
f.init(5, 27, 3, 1) // [5, 27, 3]
```

这些方法的实现如下。

```javascript
let f = {};
f.head = (...xs) => xs[0];
f.last = (...xs) => xs.slice(-1);
f.tail = (...xs) => Array.prototype.slice.call(xs, 1);
f.init = (...xs) => xs.slice(0, -1);
```

## 合并操作

合并操作分为`concat`和`concatMap`两种。前者就是将多个数组合成一个，后者则是先处理一下参数，然后再将处理结果合成一个数组。

```javascript
f.concat([5], [27], [3]) // [5, 27, 3]
f.concatMap(x => 'hi ' + x, 1, [[2]], 3) // ['hi 1', 'hi 2', 'hi 3']
```

这两种方法的实现代码如下。

```javascript
let f = {};
f.concat =
  (...xs) => xs.reduce((a, b) => a.concat(b));
f.concatMap =
  (f, ...xs) => f.concat(xs.map(f));
```

## 配对操作

配对操作分为`zip`和`zipWith`两种方法。`zip`操作将两个队列的成员，一一配对，合成一个新的队列。如果两个队列不等长，较长的那个队列多出来的成员，会被忽略。`zipWith`操作的第一个参数是一个函数，然后会将后面的队列成员一一配对，输入该函数，返回值就组成一个新的队列。

下面是例子。

```javascript
let a = [0, 1, 2];
let b = [3, 4, 5];
let c = [6, 7, 8];

f.zip(a, b) // [[0, 3], [1, 4], [2, 5]]
f.zipWith((a, b) => a + b, a, b, c) // [9, 12, 15]
```

上面代码中，`zipWith`方法的第一个参数是一个求和函数，它将后面三个队列的成员，一一配对进行相加。

这两个方法的实现如下。

```javascript
let f = {};

f.zip = (...xs) => {
  let r = [];
  let nple = [];
  let length = Math.min.apply(null, xs.map(x => x.length));

  for (var i = 0; i < length; i++) {
    xs.forEach(
      x => nple.push(x[i])
    );

    r.push(nple);
    nple = [];
  }

  return r;
};

f.zipWith = (op, ...xs) =>
  f.zip.apply(null, xs).map(
    (x) => x.reduce(op)
  );
```

## 参考链接

- Mateo Gianolio, [Haskell in ES6: Part 1](http://casualjavascript.com/javascript/es6/haskell/native/implementation/2015/11/12/haskell-in-es6-part-1.html)
