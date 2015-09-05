# 对象的扩展

## 属性的简洁表示法

ES6允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。

```javascript
function f( x, y ) {
  return { x, y };
}

// 等同于

function f( x, y ) {
  return { x: x, y: y };
}
```

上面是属性简写的例子，方法也可以简写。

```javascript
var o = {
  method() {
    return "Hello!";
  }
};

// 等同于

var o = {
  method: function() {
    return "Hello!";
  }
};
```

下面是一个更实际的例子。

```javascript
var Person = {

  name: '张三',

  //等同于birth: birth
  birth,

  // 等同于hello: function ()...
  hello() { console.log('我的名字是', this.name); }

};
```

这种写法用于函数的返回值，将会非常方便。

```javascript
function getPoint() {
  var x = 1;
  var y = 10;

  return {x, y};
}

getPoint()
// {x:1, y:10}
```

赋值器和取值器，也可以采用简洁写法。

```javascript
var cart = {
  _wheels: 4,
  get wheels () {
    return this._wheels
  },
  set wheels (value) {
    if (value < this._wheels) {
      throw new Error('hey, come back here!')
    }
    this._wheels = value
  }
}
```

## 属性名表达式

JavaScript语言定义对象的属性，有两种方法。

```javascript
// 方法一
obj.foo = true;

// 方法二
obj['a'+'bc'] = 123;
```

上面代码的方法一是直接用标识符作为属性名，方法二是用表达式作为属性名，这时要将表达式放在方括号之内。

但是，如果使用字面量方式定义对象（使用大括号），在ES5中只能使用方法一（标识符）定义属性。

```javascript
var obj = {
  foo: true,
  abc: 123
};
```

ES6允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。

```javascript
let propKey = 'foo';

let obj = {
  [propKey]: true,
  ['a'+'bc']: 123
};
```

下面是另一个例子。

```javascript
var lastWord = 'last word';

var a = {
  'first word': 'hello',
  [lastWord]: 'world'
};

a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"
```

表达式还可以用于定义方法名。

```javascript
let obj = {
  ['h'+'ello']() {
    return 'hi';
  }
};

obj.hello() // hi
```

## 方法的name属性

函数的name属性，返回函数名。ES6为对象方法也添加了name属性。

```javascript
var person = {
  sayName: function() {
    console.log(this.name);
  },
  get firstName() {
    return "Nicholas"
  }
}

person.sayName.name   // "sayName"
person.firstName.name // "get firstName"
```

上面代码中，方法的name属性返回函数名（即方法名）。如果使用了取值函数，则会在方法名前加上get。如果是存值函数，方法名的前面会加上set。

有两种特殊情况：bind方法创造的函数，name属性返回“bound”加上原函数的名字；Function构造函数创造的函数，name属性返回“anonymous”。

```javascript
(new Function()).name // "anonymous"

var doSomething = function() {
  // ...
};
doSomething.bind().name // "bound doSomething"
```

## Object.is()

Object.is()用来比较两个值是否严格相等。它与严格比较运算符（===）的行为基本一致，不同之处只有两个：一是+0不等于-0，二是NaN等于自身。

```javascript
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

ES5可以通过下面的代码，部署Object.is()。

```javascript
Object.defineProperty(Object, 'is', {
  value: function(x, y) {
    if (x === y) {
      // 针对+0 不等于 -0的情况
      return x !== 0 || 1 / x === 1 / y;
    }
    // 针对NaN的情况
    return x !== x && y !== y;
  },
  configurable: true,
  enumerable: false,
  writable: true
});
```

## Object.assign()

Object.assign方法用来将源对象（source）的所有可枚举属性，复制到目标对象（target）。它至少需要两个对象作为参数，第一个参数是目标对象，后面的参数都是源对象。只要有一个参数不是对象，就会抛出TypeError错误。

```javascript
var target = { a: 1 };

var source1 = { b: 2 };
var source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```

注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。

```javascript
var target = { a: 1, b: 1 };

var source1 = { b: 2, c: 2 };
var source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```

assign方法有很多用处。

**（1）为对象添加属性**

```javascript
class Point {
  constructor(x, y) {
    Object.assign(this, {x, y});
  }
}
```

上面方法通过assign方法，将x属性和y属性添加到Point类的对象实例。

**（2）为对象添加方法**
```javascript

Object.assign(SomeClass.prototype, {
  someMethod(arg1, arg2) {
    ···
  },
  anotherMethod() {
    ···
  }
});

// 等同于下面的写法
SomeClass.prototype.someMethod = function (arg1, arg2) {
  ···
};
SomeClass.prototype.anotherMethod = function () {
  ···
};
```

上面代码使用了对象属性的简洁表示法，直接将两个函数放在大括号中，再使用assign方法添加到SomeClass.prototype之中。

**（3）克隆对象**

```javascript
function clone(origin) {
  return Object.assign({}, origin);
}
```

上面代码将原始对象拷贝到一个空对象，就得到了原始对象的克隆。

不过，采用这种方法克隆，只能克隆原始对象自身的值，不能克隆它继承的值。如果想要保持继承链，可以采用下面的代码。

```javascript
function clone(origin) {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}
```

**（4）合并多个对象**

将多个对象合并到某个对象。

```javascript
const merge =
  (target, ...sources) => Object.assign(target, ...sources);
```

如果希望合并后返回一个新对象，可以改写上面函数，对一个空对象合并。

```javascript
const merge =
  (...sources) => Object.assign({}, ...sources);
```

**（5）为属性指定默认值**

```javascript
const DEFAULTS = {
  logLevel: 0,
  outputFormat: 'html'
};

function processContent(options) {
  let options = Object.assign({}, DEFAULTS, options);
}
```

上面代码中，DEFAULTS对象是默认值，options对象是用户提供的参数。assign方法将DEFAULTS和options合并成一个新对象，如果两者有同名属性，则option的属性值会覆盖DEFAULTS的属性值。

## __proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()

**（1）__proto__属性**

__proto__属性，用来读取或设置当前对象的prototype对象。该属性一度被正式写入ES6草案，但后来又被移除。目前，所有浏览器（包括IE11）都部署了这个属性。

```javascript
// es6的写法

var obj = {
  __proto__: someOtherObj,
  method: function() { ... }
}

// es5的写法

var obj = Object.create(someOtherObj);
obj.method = function() { ... }
```

有了这个属性，实际上已经不需要通过Object.create()来生成新对象了。

**（2）Object.setPrototypeOf()**

Object.setPrototypeOf方法的作用与__proto__相同，用来设置一个对象的prototype对象。它是ES6正式推荐的设置原型对象的方法。

```javascript
// 格式
Object.setPrototypeOf(object, prototype)

// 用法
var o = Object.setPrototypeOf({}, null);
```

该方法等同于下面的函数。

```javascript
function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
}
```

下面是一个例子。

```javascript
let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto);

proto.y = 20;
proto.z = 40;

obj.x // 10
obj.y // 20
obj.z // 40
```

上面代码将proto对象设为obj对象的原型，所以从obj对象可以读取proto对象的属性。

**（3）Object.getPrototypeOf()**

该方法与setPrototypeOf方法配套，用于读取一个对象的prototype对象。

```javascript
Object.getPrototypeOf(obj);
```

下面是一个例子。

```javascript
function Rectangle() {
}

var rec = new Rectangle();

Object.getPrototypeOf(rec) === Rectangle.prototype
// true

Object.setPrototypeOf(rec, Object.prototype);
Object.getPrototypeOf(rec) === Rectangle.prototype
// false
```

## Object.observe()，Object.unobserve()

Object.observe方法用来监听对象（以及数组）的变化。一旦监听对象发生变化，就会触发回调函数。

```javascript
var user = {};
Object.observe(user, function(changes){
  changes.forEach(function(change) {
    user.fullName = user.firstName+" "+user.lastName;
  });
});

user.firstName = 'Michael';
user.lastName = 'Jackson';
user.fullName // 'Michael Jackson'
```

上面代码中，Object.observer方法监听user对象。一旦该对象发生变化，就自动生成fullName属性。

一般情况下，Object.observe方法接受两个参数，第一个参数是监听的对象，第二个函数是一个回调函数。一旦监听对象发生变化（比如新增或删除一个属性），就会触发这个回调函数。很明显，利用这个方法可以做很多事情，比如自动更新DOM。

```javascript
var div = $("#foo");

Object.observe(user, function(changes){
  changes.forEach(function(change) {
    var fullName = user.firstName+" "+user.lastName;
    div.text(fullName);
  });
});
```

上面代码中，只要user对象发生变化，就会自动更新DOM。如果配合jQuery的change方法，就可以实现数据对象与DOM对象的双向自动绑定。

回调函数的changes参数是一个数组，代表对象发生的变化。下面是一个更完整的例子。

```javascript
var o = {};

function observer(changes){
  changes.forEach(function(change) {
    console.log('发生变动的属性：' + change.name);
    console.log('变动前的值：' + change.oldValue);
    console.log('变动后的值：' + change.object[change.name]);
    console.log('变动类型：' + change.type);
  });
}

Object.observe(o, observer);
```

参照上面代码，Object.observe方法指定的回调函数，接受一个数组（changes）作为参数。该数组的成员与对象的变化一一对应，也就是说，对象发生多少个变化，该数组就有多少个成员。每个成员是一个对象（change），它的name属性表示发生变化源对象的属性名，oldValue属性表示发生变化前的值，object属性指向变动后的源对象，type属性表示变化的种类。基本上，change对象是下面的样子。

```javascript
var change = {
  object: {...},
  type: 'update',
  name: 'p2',
  oldValue: 'Property 2'
}
```

Object.observe方法目前共支持监听六种变化。

- add：添加属性
- update：属性值的变化
- delete：删除属性
- setPrototype：设置原型
- reconfigure：属性的attributes对象发生变化
- preventExtensions：对象被禁止扩展（当一个对象变得不可扩展时，也就不必再监听了）

Object.observe方法还可以接受第三个参数，用来指定监听的事件种类。

```javascript
Object.observe(o, observer, ['delete']);
```

上面的代码表示，只在发生delete事件时，才会调用回调函数。

Object.unobserve方法用来取消监听。

```javascript
Object.unobserve(o, observer);
```

注意，Object.observe和Object.unobserve这两个方法不属于ES6，而是属于ES7的一部分。不过，Chrome浏览器从33版起就已经支持。

## 对象的扩展运算符

目前，ES7有一个[提案](https://github.com/sebmarkbage/ecmascript-rest-spread)，将rest参数/扩展运算符（...）引入对象。Babel转码器已经支持这项功能。

**（1）Rest参数**

Rest参数用于从一个对象取值，相当于将所有可遍历的、但尚未被读取的属性，分配到指定的对象上面。所有的键和它们的值，都会拷贝到新对象上面。

```javascript
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }
```

上面代码中，变量z是Rest参数所在的对象。它获取等号右边的所有尚未读取的键（a和b），将它们和它们的值拷贝过来。

注意，Rest参数的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、那么Rest参数拷贝的是这个值的引用，而不是这个值的副本。

```javascript
let obj = { a: { b: 1 } };
let { ...x } = obj;
obj.a.b = 2;
x.a.b // 2
```

上面代码中，x是Rest参数，拷贝了对象obj的a属性。a属性引用了一个对象，修改这个对象的值，会影响到Rest参数对它的引用。

另外，Rest参数不会拷贝继承自原型对象的属性。

```javascript
let o1 = { a: 1 };
let o2 = { b: 2 };
o2.__proto__ = o1;
let o3 = { ...o2 };
o3 // { b: 2 }
```

上面代码中，对象o3是o2的复制，但是只复制了o2自身的属性，没有复制它的原型对象o1的属性。

**（2）扩展运算符**

扩展运算符用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。

```javascript
let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }
```

这等同于使用`Object.assign`方法。

```javascript
let aClone = { ...a };
// 等同于
let aClone = Object.assign({}, a);
```

扩展运算符可以用于合并两个对象。

```javascript
let ab = { ...a, ...b };
```

扩展运算符还可以用自定义属性，会在新对象之中，覆盖掉原有参数。

```javascript
let aWithOverrides = { ...a, x: 1, y: 2 };
// 等同于
let aWithOverrides = { ...a, ...{ x: 1, y: 2 } };
// 等同于
let x = 1, y = 2, aWithOverrides = { ...a, x, y };
// 等同于
let aWithOverrides = Object.assign({}, a, { x: 1, y: 2 });
```

上面代码中，a对象的x属性和y属性，拷贝到新对象后会被覆盖掉。

如果把自定义属性放在扩展运算符前面，就变成了设置新对象的默认属性值。

```javascript
let aWithDefaults = { x: 1, y: 2, ...a };
// 等同于
let aWithDefaults = Object.assign({}, { x: 1, y: 2 }, a);
// 等同于
let aWithDefaults = Object.assign({ x: 1, y: 2 }, a);
```

扩展运算符的参数对象之中，如果有取值函数`get`，这个函数是会执行的。

```javascript
// 并不会抛出错误，因为x属性只是被定义，但没执行
let aWithXGetter = {
  ...a,
  get x() {
    throws new Error('not thrown yet');
  }
};

// 会抛出错误，因为x属性被执行了
let runtimeError = {
  ...a,
  ...{
    get x() {
      throws new Error('thrown now');
    }
  }
};
```

如果扩展运算符的参数是null或undefined，这个两个值会被忽略，不会报错。

```javascript
let emptyObject = { ...null, ...undefined }; // 不报错
```
