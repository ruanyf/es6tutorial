# Iterator和for...of循环

## Iterator（遍历器）

遍历器（Iterator）是一种协议，任何对象只要部署这个协议，就可以完成遍历操作。在ES6中，遍历操作特指for...of循环。

它的作用主要有两个，一是为遍历对象的属性提供统一的接口，二是为使得对象的属性能够按次序排列。

ES6的遍历器协议规定，部署了next方法的对象，就具备了遍历器功能。next方法必须返回一个包含value和done两个属性的对象。其中，value属性是当前遍历位置的值，done属性是一个布尔值，表示遍历是否结束。

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

it.next().value // 'a'
it.next().value // 'b'
it.next().done  // true

```
上面代码定义了一个makeIterator函数，它的作用是返回一个遍历器对象，用来遍历参数数组。请特别注意，next返回值的构造。

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

在ES6中，数组、类似数组的对象、Set和Map结构，都原生具备iterator接口，可以被for...of循环遍历。

## for...of循环

ES6中，一个对象只要部署了next方法，就被视为具有iterator接口，就可以用for...of循环遍历它的值。下面用上一节的idMaker函数生成的it遍历器作为例子。

```javascript

for (var n of it) {
  if (n > 5)
    break;
  console.log(n);
}
// 0
// 1
// 2
// 3
// 4
// 5

```

上面代码说明，for...of默认从0开始循环。

数组原生具备iterator接口。

```javascript

const arr = ['red', 'green', 'blue'];

for(let v of arr) {
	console.log(v);
}
// red
// green
// blue

```

for...of循环完全可以取代数组实例的forEach方法。

JavaScript原有的for...in循环，只能获得对象的键名，不能直接获取键值。ES6提供for...of循环，允许遍历获得键值。

```javascript

var arr = ["a", "b", "c", "d"];
for (a in arr) {
  console.log(a);
}
// 0
// 1
// 2
// 3

for (a of arr) {
  console.log(a); 
}
// a
// b
// c
// d

```

上面代码表明，for...in循环读取键名，for...of循环读取键值。如果要通过for...of循环，获取数组的索引，可以借助数组实例的entries方法和keys方法，参见《数组的扩展》章节。

对于Set和Map结构的数据，可以直接使用for...of循环。

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
  console.log(s);
}
// h
// e
// l
// l
// o

// DOM NodeList对象的例子

let paras = document.querySelectorAll("p");

for (let p of paras) {
  p.classList.add("test");
}

```
