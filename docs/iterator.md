# Iterator和for...of循环

## Iterator（遍历器）

### 语法

遍历器（Iterator）是一种接口规格，任何对象只要部署这个接口，就可以完成遍历操作。它的作用有两个，一是为各种数据结构，提供一个统一的、简便的接口，二是使得对象的属性能够按某种次序排列。在ES6中，遍历操作特指for...of循环，即Iterator接口主要供for...of循环使用。

遍历器提供了一个指针，指向当前对象的某个属性，使用next方法，就可以将指针移动到下一个属性。next方法返回一个包含value和done两个属性的对象。其中，value属性是当前遍历位置的值，done属性是一个布尔值，表示遍历是否结束。下面是一个模拟next方法返回值的例子。

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
上面代码定义了一个makeIterator函数，它的作用是返回一个遍历器对象，用来遍历参数数组。next方法依次遍历数组的每个成员，请特别注意，next返回值的构造。

下面是一个无限运行的遍历器例子。

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

上面的例子，说明了next方法返回值的结构：value和done两个属性。

### Iterator接口的部署

具有Iterator接口的对象，都能被for...of循环遍历（见后文的介绍）。所谓Iterator接口，就是指它会返回一个遍历器对象，该对象具备next方法，每次调用该方法，会依次返回一个具有上节提到的value和done两个属性的新对象，指向原对象的一个成员。

在ES6中，有三类数据结构原生具备Iterator接口：数组、类似数组的对象、Set和Map结构。除此之外，其他数据结构（主要是对象）的Iterator接口都需要自己部署。其他对象需要手动部署Iterator接口，让其返回一个遍历器。

一个对象如果要有Iterator接口，必须部署一个@@iterator方法（原型链上的对象具有该方法也可），该方法部署在一个键名为`Symbol.iterator`的属性上，对应的键值是一个函数，该函数返回一个遍历器对象。

```javascript

class MySpecialTree {
  // ...
  [Symbol.iterator]() { 
    // ...
    return theIterator;
  }
}

```

上面代码是一个类部署Iterator接口的写法。`Symbol.iterator`是一个表达式，返回Symbol对象的iterator属性，这是一个预定义好的、类型为Symbol的特殊值，所以要放在方括号内（请参考Symbol一节）。这里要注意，@@iterator的键名是`Symbol.iterator`，键值是一个方法（函数），该方法执行后，返回一个当前对象的遍历器。

下面是一个例子。

```javascript

function O(value){
  this.value = value;
  this.next = null;
}

O.prototype[Symbol.iterator] = function(){
  
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

var one = new O(1);
var two = new O(2);
var three = new O(3);
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

对于类似数组的对象，部署Iterator接口，有一个简便方法，就是`Symbol.iterator`方法直接引用数值的Iterator接口。

```javascript

NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

```

如果`Symbol.iterator`方法返回的不是遍历器，解释引擎将会报错。

```javascript

var obj = {};

obj[Symbol.iterator] = () => 1;

[...obj] // TypeError: [] is not a function

```

上面代码中，变量obj的@@iterator方法返回的不是遍历器，因此报错。

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

字符串是一个类似数组的对象，因此也原生具有Iterator接口。

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

ES6中，一个对象只要部署了@@iterator方法，就被视为具有iterator接口，就可以用for...of循环遍历它的值。也就是说，for...of循环内部调用是原对象的`Symbol.iterator`方法。

数组原生具备iterator接口。

```javascript

const arr = ['red', 'green', 'blue'];

for(let v of arr) {
	console.log(v); // red green blue
}

```

上面代码说明，for...of循环可以代替数组实例的forEach方法。

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

上面代码演示了如何遍历Set结构和Map结构，后者是同时遍历键名和键值。

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

上面代码表示，for...in循环可以遍历键名，for...of循环会报错。

总结一下，for...of循环可以使用的范围包括数组、类似数组的对象（比如arguments对象、DOM NodeList对象）、Set和Map结构、后文的Generator对象，以及字符串。下面是for...of循环用于字符串和DOM NodeList对象的例子。

```javascript

// 字符串的例子

let str = "hello";

for (let s of str) {
  console.log(s); // h e l l o
}

// DOM NodeList对象的例子

let paras = document.querySelectorAll("p");

for (let p of paras) {
  p.classList.add("test");
}

```
