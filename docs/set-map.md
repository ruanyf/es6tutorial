# Set和Map数据结构

## Set

> 兼容性：<https://kangax.github.io/compat-table/es6/#Set>

### 基本用法

ES6提供了新的数据结构Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

Set本身是一个构造函数，用来生成Set数据结构。

```javascript

var s = new Set();

[2,3,5,4,5,2,2].map(x => s.add(x))

for (i of s) {console.log(i)}
// 2 3 4 5

```

上面代码通过add方法向Set结构加入成员，结果表明Set结构不会添加重复的值。

Set函数可以接受一个数组作为参数，用来初始化。

```javascript

var items = new Set([1,2,3,4,5,5,5,5]);

items.size 
// 5

```

向Set加入值的时候，不会发生类型转换，所以5和“5”是两个不同的值。Set内部判断两个值是否不同，使用的算法类似于精确相等运算符（===），唯一的例外是NaN等于自身。这意味着，两个对象总是不相等的。

```javascript

let set = new Set();

set.add({})
set.size // 1
    
set.add({})
set.size // 2

```

上面代码表示，由于两个空对象不是精确相等，所以它们被视为两个值。

### 属性和方法

Set结构有以下属性。

- Set.prototype.constructor：构造函数，默认就是Set函数。
- Set.prototype.size：返回Set的成员总数。

Set数据结构有以下方法。

- add(value)：添加某个值，返回Set结构本身。
- delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
- has(value)：返回一个布尔值，表示该值是否为Set的成员。
- clear()：清除所有成员，没有返回值。

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

### 遍历操作

Set结构有一个values方法，返回一个遍历器。

```javascript

let set = new Set(['red', 'green', 'blue']);
for ( let item of set.values() ){
  console.log(item);
}
// red
// green
// blue

```

Set结构的默认遍历器就是它的values方法。

```javascript

Set.prototype[Symbol.iterator] === Set.prototype.values
// true

```

这意味着，可以省略values方法，直接用for...of循环遍历Set。

```javascript

let set = new Set(['red', 'green', 'blue']);

for (let x of set) {
  console.log(x);
}
// red
// green
// blue

```

Set结构的forEach方法，用于对每个成员执行某种操作，返回修改后的Set结构。

```javascript

let set = new Set([1, 2, 3]);

set.forEach((value, key) => value*2 )
// 返回Set结构{2, 4, 6}

```

上面代码说明，forEach方法的参数就是一个处理函数。该函数的参数依次为键值、键名、集合本身（上例省略了该参数）。另外，forEach方法还可以有第二个参数，表示绑定的this对象。

为了与Map结构保持一致，Set结构也有keys和entries方法，这时每个值的键名就是键值。

```javascript

let set = new Set(['red', 'green', 'blue']);
for ( let item of set.keys() ){
  console.log(item);
}
// red
// green
// blue

for ( let [key, value] of set.entries() ){
  console.log(key, value);
}
// red, red
// green, green
// blue, blue

```

由于扩展运算符（...）内部使用for...of循环，所以也可以用于Set结构。

```javascript

let set = new Set(['red', 'green', 'blue']);
let arr = [...set]; 
// ['red', 'green', 'blue']

```

这就提供了另一种便捷的去除数组重复元素的方法。

```javascript

let arr = [3, 5, 2, 2, 5, 5];
let unique = [...new Set(arr)]; 
// [3, 5, 2]

```

而且，数组的map和filter方法也可以用于Set了。

```javascript

let set = new Set([1, 2, 3]);
set = new Set([...set].map(x => x * 2));
// 返回Set结构：{2, 4, 6}

let set = new Set([1, 2, 3, 4, 5]);
set = new Set([...set].filter(x => (x % 2) == 0));
// 返回Set结构：{2, 4}

```

因此使用Set，可以很容易地实现并集（Union）和交集（Intersect）。

```javascript

let a = new Set([1,2,3]);
let b = new Set([4,3,2]);

let union = new Set([...a, ...b]);
// [1,2,3,4]

let intersect = new Set([...a].filter(x => b.has(x))); 
// [2,3]

```

## WeakSet

> 兼容性：<https://kangax.github.io/compat-table/es6/#WeakSet>

WeakSet结构与Set类似，也是不重复的值的集合。但是，它与Set有两个区别。

首先，WeakSet的成员只能是对象，而不能是其他类型的值。其次，WeakSet中的对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于WeakSet之中。这个特点意味着，无法引用WeakSet的成员，因此WeakSet是不可遍历的。

```javascript

var ws = new WeakSet();
ws.add(1)
// TypeError: Invalid value used in weak set

```

上面代码试图向WeakSet添加一个数值，结果报错。

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

WeakSet结构有以下三个方法。

- **WeakSet.prototype.add(value)**：向WeakSet实例添加一个新成员。
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

WeakSet没有size属性，没有办法遍历它的成员。

```javascript

ws.size
// undefined

ws.forEach(function(item){ console.log('WeakSet has ' + item)})
// TypeError: undefined is not a function

ws.forEach
// undefined

```

上面代码试图获取size和forEach属性，结果都不能成功。

WeakSet不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保存成员的存在，很可能刚刚遍历结束，成员就取不到了。WeakSet的一个用处，是储存DOM节点，而不用担心这些节点从文档移除时，会引发内存泄漏。

## Map

> 兼容性：<https://kangax.github.io/compat-table/es6/#Map>

**（1）基本用法**

JavaScript的对象，本质上是键值对的集合，但是只能用字符串当作键。这给它的使用带来了很大的限制。

```javascript

var data = {};
var element = document.getElementById("myDiv");

data[element] = metadata;

```

上面代码原意是将一个DOM节点作为对象data的键，但是由于对象只接受字符串作为键名，所以element被自动转为字符串`[Object HTMLDivElement]`。

为了解决这个问题，ES6提供了map数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object结构提供了“字符串—值”的对应，Map结构提供了“值—值”的对应。

```javascript

var m = new Map();
var o = {p: "Hello World"};

m.set(o, "content")
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false

```

上面代码使用set方法，将对象o当作m的一个键，然后又使用get方法读取这个键，接着使用delete方法删除了这个键。

作为构造函数，Map也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。

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

由上可知，Map的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞（clash）的问题，我们扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名。

如果Map的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map将其视为一个键，包括0和-0。另外，虽然NaN不严格相等于自身，但Map将其视为同一个键。

```javascript

let map = new Map();
    
map.set(NaN, 123);
map.get(NaN) // 123

map.set(-0, 123);
map.get(+0) // 123

```

如果读取一个未知的键，则返回undefined。

```javascript

new Map().get('asfddfsasadf')
// undefined

```

**（2）属性和方法**

Map数据结构有以下属性和方法。

- size：返回成员总数。
- set(key, value)：设置key所对应的键值，然后返回整个Map结构。如果key已经有值，则键值会被更新，否则就新生成该键。
- get(key)：读取key对应的键值，如果找不到key，返回undefined。
- has(key)：返回一个布尔值，表示某个键是否在Map数据结构中。
- delete(key)：删除某个键，返回true。如果删除失败，返回false。
- clear()：清除所有成员，没有返回值。

set()方法返回的是Map本身，因此可以采用链式写法。

```javascript

let map = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');

```

下面是has()和delete()的例子。

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

下面是size属性和clear方法的例子。

```javascript

let map = new Map();
map.set('foo', true);
map.set('bar', false);
    
map.size // 2
map.clear()
map.size // 0

```    

**（3）遍历**

Map原生提供三个遍历器。

- keys()：返回键名的遍历器。
- values()：返回键值的遍历器。
- entries()：返回所有成员的遍历器。

下面是使用实例。

```javascript

let map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}

```

上面代码最后的那个例子，表示Map结构的默认遍历器接口（Symbol.iterator属性），就是entries方法。

```javascript

map[Symbol.iterator] === map.entries
// true

```

Map结构转为数组结构，比较快速的方法是结合使用扩展运算符（...）。

```javascript

let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

[...map.keys()]
// [1, 2, 3]

[...map.values()]
// ['one', 'two', 'three']

[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]

[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]

```

结合数组的map方法、filter方法，可以实现Map的遍历和过滤（Map本身没有map和filter方法）。

```javascript

let map0 = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');
    
let map1 = new Map(
  [...map0].filter(([k, v]) => k < 3) 
);
// 产生Map结构 {1 => 'a', 2 => 'b'}
    
let map2 = new Map(
  [...map0].map(([k, v]) => [k * 2, '_' + v])
    );
// 产生Map结构 {2 => '_a', 4 => '_b', 6 => '_c'}

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

> 兼容性：<https://kangax.github.io/compat-table/es6/#WeakMap>

WeakMap结构与Map结构基本类似，唯一的区别是它只接受对象作为键名（null除外），不接受原始类型的值作为键名，而且键名所指向的对象，不计入垃圾回收机制。

WeakMap的设计目的在于，键名是对象的弱引用（垃圾回收机制不将该引用考虑在内），所以其所对应的对象可能会被自动回收。当对象被回收后，WeakMap自动移除对应的键值对。典型应用是，一个对应DOM元素的WeakMap结构，当某个DOM元素被清除，其所对应的WeakMap记录就会自动被移除。基本上，WeakMap的专用场合就是，它的键所对应的对象，可能会在将来消失。WeakMap结构有助于防止内存泄漏。 

下面是WeakMap结构的一个例子，可以看到用法上与Map几乎一样。

```javascript

var wm = new WeakMap();
var element = document.querySelector(".element");

wm.set(element, "Original");
wm.get(element) // "Original"

element.parentNode.removeChild(element);
element = null;
wm.get(element) // undefined

```

上面代码中，变量wm是一个WeakMap实例，我们将一个DOM节点element作为键名，然后销毁这个节点，element对应的键就自动消失了，再引用这个键名就返回undefined。

WeakMap与Map在API上的区别主要是两个，一是没有遍历操作（即没有key()、values()和entries()方法），也没有size属性；二是无法清空，即不支持clear方法。这与WeakMap的键不被计入引用、被垃圾回收机制忽略有关。因此，WeakMap只有四个方法可用：get()、set()、has()、delete()。

```javascript

var wm = new WeakMap();

wm.size
// undefined

wm.forEach
// undefined

```

前文说过，WeakMap应用的典型场合就是DOM节点作为键名。下面是一个例子。

```javascript

let myElement = document.getElementById('logo');
let myWeakmap = new WeakMap();

myWeakmap.set(myElement, {timesClicked: 0});

myElement.addEventListener('click', function() {
  let logoData = myWeakmap.get(myElement);
  logoData.timesClicked++;
  myWeakmap.set(myElement, logoData);
}, false);

```

上面代码中，myElement是一个DOM节点，每当发生click事件，就更新一下状态。我们将这个状态作为键值放在WeakMap里，对应的键名就是myElement。一旦这个DOM节点删除，该状态就会自动消失，不存在内存泄漏风险。

WeakMap的另一个用处是部署私有属性。

```javascript

let _counter = new WeakMap();
let _action = new WeakMap();

class Countdown {
  constructor(counter, action) {
    _counter.set(this, counter);
    _action.set(this, action);
  }
  dec() {
    let counter = _counter.get(this);
    if (counter < 1) return;
    counter--;
    _counter.set(this, counter);
    if (counter === 0) {
      _action.get(this)();
    }
  }
}

let c = new Countdown(2, () => console.log('DONE'));

c.dec()
c.dec()
// DONE

```

上面代码中，Countdown类的两个内部属性_counter和_action，是实例的弱引用，所以如果删除实例，它们也就随之消失，不会造成内存泄漏。
