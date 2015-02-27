# Iterator和for...of循环

## Iterator（遍历器）

### 概念

JavaScript原有的数据结构，主要是数组（Array）和对象（Object），ES6又添加了Map和Set，用户还可以组合使用它们，定义自己的数据结构。这就需要一种统一的接口机制，来处理所有不同的数据结果。

遍历器（Iterator）就是这样一种机制。它属于一种接口规格，任何数据结构只要部署这个接口，就可以完成遍历操作，即依次处理该结构的所有成员。它的作用有两个，一是为各种数据结构，提供一个统一的、简便的接口，二是使得数据结构的成员能够按某种次序排列。在ES6中，遍历操作特指for...of循环，即Iterator接口主要供for...of消费。

遍历器的遍历过程是这样的：它提供了一个指针，默认指向当前数据结构的起始位置。第一次调用遍历器的next方法，可以将指针指向到第一个成员，第二次调用就指向第二个成员，直至指向数据结构的结束位置。每一次调用，都会返回当前成员的信息，具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。

下面是一个模拟next方法返回值的例子。

```javascript

function makeIterator(array){
  var nextIndex = 0;
  return {
    next: function(){
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  }
}

var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

```

上面代码定义了一个makeIterator函数，它的参数是一个数组。调用该函数，就会返回一个对象。这个对象具有一个next方法，每次调用next方法，它的内部指针就会指向数组的下一个成员，并返回一个该成员信息的对象。请特别注意，next方法的返回值的构造：一个具有value和done两个属性的对象。通过这个返回值，我们就可以知道当前成员的值是什么，以及遍历是否结束。在这个例子中，makeIterator函数用来生成遍历器，它返回的那个具有next方法的对象就是遍历器，调用遍历器的next方法，就可以遍历事先给定的数组。

因为遍历器的作用，只是把接口规格加到数据结构之上。所以，遍历器与它所遍历的那个数据结构，实际上是分开的，完全可以写出没有对应数据结构的遍历器，或者说用遍历器模拟出数据结构。下面是一个无限运行的遍历器例子。

```javascript

function idMaker(){
  var index = 0;
    
  return {
    next: function(){
      return {value: index++, done: false};
    }
  }
}

var it = idMaker();

it.next().value // '0'
it.next().value // '1'
it.next().value // '2'
// ...

```

上面的例子中，idMaker函数返回的对象就是遍历器，但是并没有对应的数据结构，或者说遍历器自己描述了一个数据结构出来。

总之，所谓Iterator接口，就是指调用这个接口，会返回一个遍历器对象。该对象具备next方法，每次调用该方法，会返回一个具有value和done两个属性的新对象，指向部署了Iterator接口的数据结构的一个成员。

如果使用TypeScript的写法，遍历器接口、遍历器和遍历器返回值的规格可以描述如下。

```javascript

interface Iterable {
  [System.iterator]() : Iterator,
}

interface Iterator {
  next(value?: any) : IterationResult,
}

interface IterationResult {
  value: any,
  done: boolean,
}

```

### 默认的Iterator接口

Iterator接口的开发目的，就是为所有数据结构，提供了一种统一的访问机制，即for...of循环（见后文的介绍）。当使用for...of循环，遍历某种数据结构时，该循环会自动去寻找Iterator接口。

ES6规定，默认的Iterator接口部署在数据结构的Symbol.iterator属性。也就是说，调用Symbol.iterator方法，就会得到当前数据结构的默认遍历器。Symbol.iterator是一个表达式，返回Symbol对象的iterator属性，这是一个预定义好的、类型为Symbol的特殊值，所以要放在方括号内（请参考Symbol一节）。

在ES6中，有三类数据结构原生具备Iterator接口：数组、某些类似数组的对象、Set和Map结构。

```javascript

let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }

```

上面代码中，变量arr是一个数组，原生就具有遍历器接口，部署在arr的Symbol.iterator属性上面。所以，调用这个属性，就得到遍历器。

上面提到，原生就部署iterator接口的数据结构有三类，对于这三类数据结构，不用自己写遍历器，for...of循环会自动遍历它们。除此之外，其他数据结构（主要是对象）的Iterator接口，都需要自己在Symbol.iterator属性上面部署，这样才会被for...of循环遍历。

对象（Object）之所以没有默认部署Iterator接口，是因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者手动指定。本质上，遍历器是一种线性处理，对于任何非线性的数据结构，部署遍历器接口，就等于部署一种线性转换。不过，严格地说，对象部署遍历器接口并不是很必要，因为这时对象实际上被当作Map结构使用，ES5没有Map结构，而ES6原生提供了。

一个对象如果要有可被for...of循环调用的Iterator接口，就必须在Symbol.iterator的属性上部署遍历器方法（原型链上的对象具有该方法也可）。

```javascript

class MySpecialTree {
  // ...
  [Symbol.iterator]() { 
    // ...
    return theIterator;
  }
}

```

上面代码是一个类部署Iterator接口的写法。Symbol.iterator属性对应一个函数，执行后返回当前对象的遍历器。下面是一个例子。

```javascript

function Obj(value){
  this.value = value;
  this.next = null;
}

Obj.prototype[Symbol.iterator] = function(){
  
  var iterator = {
    next: next
  };
  
  var current = this;

  function next(){
    if (current){
      var value = current.value;
      var done = current == null;
      current = current.next;
      return {
        done: done,
        value: value
      }
    } else {
      return {
        done: true
      }
    }
  }
  return iterator;
}

var one = new Obj(1);
var two = new Obj(2);
var three = new Obj(3);
one.next = two;
two.next = three;

for (var i of one){
  console.log(i)
}
// 1
// 2
// 3

```

上面代码首先在构造函数的原型链上部署Symbol.iterator方法，调用该方法会返回遍历器对象iterator，调用该对象的next方法，在返回一个值的同时，自动将内部指针移到下一个实例。

下面是另一个为对象添加Iterator接口的例子。

```javascript

let obj = {
  data: [ 'hello', 'world' ],
  [Symbol.iterator]() {
    const self = this;
    let index = 0;
    return {
      next() {
        if (index < self.data.length) {
          return {
            value: self.data[index++],
            done: false
          };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};

```

对于类似数组的对象（存在数值键名和length属性），部署Iterator接口，有一个简便方法，就是`Symbol.iterator`方法直接引用数值的Iterator接口。

```javascript

NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

```

如果Symbol.iterator方法返回的不是遍历器，解释引擎将会报错。

```javascript

var obj = {};

obj[Symbol.iterator] = () => 1;

[...obj] // TypeError: [] is not a function

```

上面代码中，变量obj的Symbol.iterator方法返回的不是遍历器，因此报错。

### 调用默认iterator接口的场合

有一些场合会默认调用iterator接口（即Symbol.iterator方法），除了下文会介绍的for...of循环，还有几个别的场合。

**（1）解构赋值**

对数组和Set结构进行解构赋值时，会默认调用iterator接口。

```javascript

let set = new Set().add('a').add('b').add('c');
    
let [x,y] = set;
// x='a'; y='b'
    
let [first, ...rest] = set;
// first='a'; rest=['b','c'];

```

**（2）扩展运算符**

扩展运算符（...）也会调用默认的iterator接口。

```javascript

// 例一
var str = 'hello';
[...str] //  ['h','e','l','l','o']

// 例二
let arr = ['b', 'c'];
['a', ...arr, 'd']
// ['a', 'b', 'c', 'd']

```

上面代码的扩展运算符内部就调用iterator接口。

实际上，这提供了一种简便机制，可以将任何部署了iterator接口的对象，转为对象。

```javascript

let arr = [...iterable];

```

**（3）其他场合**

以下场合也会用到默认的iterator接口，可以查阅相关章节。

- yield*
- Array.from()
- Map(), Set(), WeakMap(), WeakSet()
- Promise.all(), Promise.race()

### 原生具备iterator接口的数据结构

《数组的扩展》一章中提到，ES6对数组提供entries()、keys()和values()三个方法，就是返回三个遍历器。

```javascript

var arr = [1, 5, 7];
var arrEntries = arr.entries();

arrEntries.toString() 
// "[object Array Iterator]"

arrEntries === arrEntries[Symbol.iterator]()
// true

```

上面代码中，entries方法返回的是一个遍历器（iterator），本质上就是调用了`Symbol.iterator`方法。

字符串是一个类似数组的对象，也原生具有Iterator接口。

```javascript

var someString = "hi";
typeof someString[Symbol.iterator] 
// "function"

var iterator = someString[Symbol.iterator]();

iterator.next()  // { value: "h", done: false }
iterator.next()  // { value: "i", done: false }
iterator.next()  // { value: undefined, done: true }

```

上面代码中，调用`Symbol.iterator`方法返回一个遍历器，在这个遍历器上可以调用next方法，实现对于字符串的遍历。

可以覆盖原生的`Symbol.iterator`方法，达到修改遍历器行为的目的。

```javascript

var str = new String("hi");

[...str] // ["h", "i"]

str[Symbol.iterator] = function() {
  return { 
    next: function() {
      if (this._first) {
        this._first = false;
        return { value: "bye", done: false };
      } else {
        return { done: true };
      }
    },
    _first: true
  };
};

[...str] // ["bye"]  
str // "hi"

```

上面代码中，字符串str的`Symbol.iterator`方法被修改了，所以扩展运算符（...）返回的值变成了bye，而字符串本身还是hi。

### Iterator接口与Generator函数

部署`Symbol.iterator`方法的最简单实现，还是使用下一节要提到的Generator函数。

```javascript

var myIterable = {};

myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};
[...myIterable] // [1, 2, 3]

// 或者采用下面的简洁写法

let obj = {
  * [Symbol.iterator]() {
    yield 'hello';
    yield 'world';
  }
};

for (let x of obj) {
  console.log(x);
}
// hello
// world

```

## for...of循环

ES6中，一个数据结构只要部署了Symbol.iterator方法，就被视为具有iterator接口，就可以用for...of循环遍历它的成员。也就是说，for...of循环内部调用的是数据结构的Symbol.iterator方法。

for...of循环可以使用的范围包括数组、Set和Map结构、某些类似数组的对象（比如arguments对象、DOM NodeList对象）、后文的Generator对象，以及字符串。

### 数组

数组原生具备iterator接口，for...of循环本质上就是调用这个接口产生的遍历器，可以用下面的代码证明。

```javascript

const arr = ['red', 'green', 'blue'];
let iterator  = arr[Symbol.iterator]();

for(let v of arr) {
	console.log(v); // red green blue
}

for(let v of iterator) {
	console.log(v); // red green blue
}

```

上面代码的for...of循环的两种写法是等价的。

for...of循环可以代替数组实例的forEach方法。

```javascript

const arr = ['red', 'green', 'blue'];

arr.forEach(function (element, index) {
  console.log(element); // red green blue
  console.log(index);   // 0 1 2
});

```

JavaScript原有的for...in循环，只能获得对象的键名，不能直接获取键值。ES6提供for...of循环，允许遍历获得键值。

```javascript

var arr = ["a", "b", "c", "d"];

for (a in arr) {
  console.log(a); // 0 1 2 3
}

for (a of arr) {
  console.log(a); // a b c d
}

```

上面代码表明，for...in循环读取键名，for...of循环读取键值。如果要通过for...of循环，获取数组的索引，可以借助数组实例的entries方法和keys方法，参见《数组的扩展》章节。

### Set和Map结构

Set和Map结构也原生具有Iterator接口，可以直接使用for...of循环。

```javascript

var engines = Set(["Gecko", "Trident", "Webkit", "Webkit"]);
for (var e of engines) {
  console.log(e);
}
// Gecko
// Trident
// Webkit

var es6 = new Map();
es6.set("edition", 6);
es6.set("committee", "TC39");
es6.set("standard", "ECMA-262");
for (var [name, value] of es6) {
  console.log(name + ": " + value);
}
// edition: 6
// committee: TC39
// standard: ECMA-262

```

上面代码演示了如何遍历Set结构和Map结构。值得注意的地方有两个，首先，遍历的顺序是按照各个成员被添加进数据结构的顺序。其次，Set结构遍历时，返回的是一个值，而Map结构遍历时，返回的是一个数组，该数组的两个成员分别为当前Map成员的键名和键值。

```javascript

let map = new Map().set('a', 1).set('b', 2);
for (let pair of map) {
  console.log(pair);
}
// ['a', 1]
// ['b', 2]

```

### 计算生成的数据结构

ES6的数组、Set、Map都部署了以下三个方法，调用后都返回遍历器。

- entries() 返回一个遍历器，用来遍历 [键名, 键值] 组成的数组。对于数组，键名就是索引值；对于Set，键名与键值相同。Map结构的iterator接口，默认就是调用entries方法。
- keys() 返回一个遍历器，用来遍历所有的键名。
- values() 返回一个遍历器，用来遍历所有的键值。

这三个方法调用后生成的遍历器，所遍历的都是计算生成的数据结构。

```javascript

let arr = ['a', 'b', 'c'];
for (let pair of arr.entries()) {
  console.log(pair);
}
// [0, 'a']
// [1, 'b']
// [2, 'c']

```

### 类似数组的对象

类似数组的对象包括好几类。下面是for...of循环用于字符串、DOM NodeList对象、arguments对象的例子。

```javascript

// 字符串
let str = "hello";

for (let s of str) {
  console.log(s); // h e l l o
}

// DOM NodeList对象
let paras = document.querySelectorAll("p");

for (let p of paras) {
  p.classList.add("test");
}

// arguments对象
function printArgs() {
  for (let x of arguments) {
    console.log(x);
  }
}
printArgs('a', 'b');
// 'a'
// 'b'

```

对于字符串来说，for...of循环还有一个特点，就是会正确识别32位UTF-16字符。

```javascript

for (let x of 'a\uD83D\uDC0A') {
  console.log(x);
}
// 'a'
// '\uD83D\uDC0A'

```

并不是所有类似数组的对象都具有iterator接口，一个简便的解决方法，就是使用Array.from方法将其转为数组。

```javascript

let arrayLike = { length: 2, 0: 'a', 1: 'b' };

// 报错
for (let x of arrayLike) { 
  console.log(x);
}

// 正确
for (let x of Array.from(arrayLike)) { 
  console.log(x);
}

```

### 对象

对于普通的对象，for...of结构不能直接使用，会报错，必须部署了iterator接口后才能使用。但是，这样情况下，for...in循环依然可以用来遍历键名。

```javascript

var es6 = {
  edition: 6,
  committee: "TC39",
  standard: "ECMA-262"
};

for (e in es6) {
  console.log(e);
}
// edition
// committee
// standard

for (e of es6) {
  console.log(e);
}
// TypeError: es6 is not iterable

```

上面代码表示，对于普通的对象，for...in循环可以遍历键名，for...of循环会报错。

在对象上部署iterator接口的代码，参见本章前面部分。
