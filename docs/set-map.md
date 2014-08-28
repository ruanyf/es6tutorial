# Set和Map数据结构

## Set

ES6提供了新的数据结构Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

Set本身是一个构造函数，用来生成Set数据结构。

```javascript

var s = new Set();

[2,3,5,4,5,2,2].map(x => s.add(x))

for (i of s) {console.log(i)}
// 2 3 4 5

```

上面代码通过add方法向Set结构加入成员，结果表明Set结构不会添加重复的值。

Set函数接受一个数组作为参数，用来初始化。

```javascript

var items = new Set([1,2,3,4,5,5,5,5]);

items.size 
// 5

```

向Set加入值的时候，不会发生类型转换。这意味在Set中，5和“5”是两个不同的值。

Set结构有以下属性。

- Set.prototype.constructor：构造函数，默认就是Set函数。
- Set.prototype.size：返回Set的成员总数。

Set数据结构有以下方法。

- add(value)：添加某个值。
- delete(value)：删除某个值。
- has(value)：返回一个布尔值，表示该值是否为set的成员。
- clear()：清除所有成员。

下面是这些属性和方法的使用演示。

```javascript

s.add(1).add(2).add(2); 
// 注意2被加入了两次

s.size // 2

s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2);
s.has(2) // false

```

下面是一个对比，看看在判断是否包括一个键上面，对象结构和Set结构的写法不同。

```javascript

// 对象的写法

var properties = {
    "width": 1,
    "height": 1
};

if (properties[someName]) {
    // do something
}

// Set的写法

var properties = new Set();

properties.add("width");
properties.add("height");

if (properties.has(someName)) {
    // do something
}

```

Array.from方法可以将Set结构转为数组。

```javascript

var items = new Set([1, 2, 3, 4, 5]);
var array = Array.from(items);

```

这就提供了一种去除数组中重复元素的方法。

```javascript

function dedupe(array) {
    return Array.from(new Set(array));
}

```

Set的遍历，可以借助for...of循环完成，参见《Iterator和for...of循环》章节。

## WeakSet

WeakSet结构与Set类似，也是不重复的值的集合。但是，它与Set有两个区别。

首先，WeakSet的成员只能是对象，而不能是其他类型的值。其次，WeakSet中的对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于WeakSet之中。这个特点意味着，无法引用WeakSet的成员，因此WeakSet是不可遍历的。

WeakSet是一个构造函数，可以使用new命令，创建WeakSet数据结构。

```javascript

var ws = new WeakSet();

```

作为构造函数，WeakSet可以接受一个数组或类似数组的对象作为参数。（实际上，任何具有iterable接口的对象，都可以作为WeakSet的对象。）该数组的所有成员，都会自动成为WeakSet实例对象的成员。

```javascript

var a = [[1,2], [3,4]];

var ws = new WeakSet(a);

```

上面代码中，a是一个数组，它有两个成员，也都是数组。将a作为WeakSet构造函数的参数，a的成员会自动成为WeakSet的成员。

WeakSet结构有以下四个方法。

- **WeakSet.prototype.add(value)**：向WeakSet实例添加一个新成员。
- **WeakSet.prototype.clear()**：清除WeakSet实例的所有成员。
- **WeakSet.prototype.delete(value)**：清除WeakSet实例的指定成员。
- **WeakSet.prototype.has(value)**：返回一个布尔值，表示某个值是否在WeakSet实例之中。

下面是一个例子。

```javascript

var ws = new WeakSet();
var obj = {};
var foo = {};

ws.add(window);
ws.add(obj);

ws.has(window); // true
ws.has(foo);    // false

ws.delete(window); 
ws.has(window);    // false

ws.clear();

```

## Map

**（1）基本用法**

JavaScript的对象，本质上是键值对的集合，但是只能用字符串当作键。这给它的使用带来了很大的限制。

```javascript

var data = {};
var element = document.getElementById("myDiv");

data[element] = metadata;

```

上面代码原意是将一个DOM节点作为对象data的键，但是由于对象只接受字符串作为键名，所以element被自动转为字符串“[Object HTMLDivElement]”。

为了解决这个问题，ES6提供了map数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，对象也可以当作键。

```javascript

var m = new Map();

o = {p: "Hello World"};

m.set(o, "content")

console.log(m.get(o))
// "content"

```

上面代码将对象o当作m的一个键。

Map函数也可以接受一个数组进行初始化。

```javascript

var map = new Map([ ["name", "张三"], ["title", "Author"]]);

map.size // 2
map.has("name") // true
map.get("name") // "张三"
map.has("title") // true
map.get("title") // "Author"

```

注意，只有对同一个对象的引用，Map结构才将其视为同一个键。这一点要非常小心。

```javascript

var map = new Map();

map.set(['a'], 555); 
map.get(['a']) // undefined

```

上面代码的set和get方法，表面是针对同一个键，但实际上这是两个值，内存地址是不一样的，因此get方法无法读取该键，返回undefined。

同理，同样的值的两个实例，在Map结构中被视为两个键。

```javascript

var map = new Map();

var k1 = ['a'];
var k2 = ['a'];

map.set(k1, 111);
map.set(k2, 222);

map.get(k1) // 111
map.get(k2) // 222

```

上面代码中，变量k1和k2的值是一样的，但是它们在Map结构中被视为两个键。

**（2）属性和方法**

Map数据结构有以下属性和方法。

- size：返回成员总数。
- set(key, value)：设置一个键值对。
- get(key)：读取一个键。
- has(key)：返回一个布尔值，表示某个键是否在Map数据结构中。
- delete(key)：删除某个键。
- clear()：清除所有成员。

下面是一些用法实例。

```javascript

var m = new Map(); 

m.set("edition", 6)        // 键是字符串
m.set(262, "standard")     // 键是数值
m.set(undefined, "nah")    // 键是undefined

var hello = function() {console.log("hello");}
m.set(hello, "Hello ES6!") // 键是函数

m.has("edition")     // true
m.has("years")       // false
m.has(262)           // true
m.has(undefined)     // true
m.has(hello)         // true

m.delete(undefined)
m.has(undefined)       // false

m.get(hello)  // Hello ES6!
m.get("edition")  // 6

```

**（3）遍历**

Map原生提供三个遍历器。

- keys()：返回键名的遍历器。
- values()：返回键值的遍历器。
- entries()：返回所有成员的遍历器。

下面是使用实例。

```javascript

for (let key of map.keys()) {
    console.log("Key: %s", key);
}

for (let value of map.values()) {
    console.log("Value: %s", value);
}

for (let item of map.entries()) {
    console.log("Key: %s, Value: %s", item[0], item[1]);
}

// same as using map.entries()
for (let item of map) {
    console.log("Key: %s, Value: %s", item[0], item[1]);
}

```

此外，Map还有一个forEach方法，与数组的forEach方法类似，也可以实现遍历。

```javascript

map.forEach(function(value, key, map)) {
    console.log("Key: %s, Value: %s", key, value);
};

```

forEach方法还可以接受第二个参数，用来绑定this。

```javascript

var reporter = {
    report: function(key, value) {
        console.log("Key: %s, Value: %s", key, value);
    }
};

map.forEach(function(value, key, map) {
    this.report(key, value);
}, reporter);

```

上面代码中，forEach方法的回调函数的this，就指向reporter。

## WeakMap

WeakMap结构与Map结构基本类似，唯一的区别是它只接受对象作为键名（null除外），不接受原始类型的值作为键名。

WeakMap的设计目的在于，键名是对象的弱引用（垃圾回收机制不将该引用考虑在内），所以其所对应的对象可能会被自动回收。当对象被回收后，WeakMap自动移除对应的键值对。典型应用是，一个对应DOM元素的WeakMap结构，当某个DOM元素被清除，其所对应的WeakMap记录就会自动被移除。基本上，WeakMap的专用场合就是，它的键所对应的对象，可能会在将来消失。WeakMap结构有助于防止内存泄漏。 

下面是WeakMap结构的一个例子，可以看到用法上与Map几乎一样。

```javascript

var map = new WeakMap();
var element = document.querySelector(".element");

map.set(element, "Original");

var value = map.get(element);
console.log(value); // "Original"

element.parentNode.removeChild(element);
element = null;

value = map.get(element);
console.log(value); // undefined

```

WeakMap还有has和delete方法，但没有size属性，也无法遍历它的值，这与WeakMap的键不被计入引用、被垃圾回收机制忽略有关。
