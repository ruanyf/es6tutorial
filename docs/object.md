# 对象的扩展

## 属性的简洁表示法

ES6允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。

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

下面是一个类似的例子。

```javascript

let x = 4;
let y = 1;

// 下行等同于 let obj = { x: x, y: y };
let obj = { x, y };

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

var lastWord = "last word";

var a = {
    "first word": "hello",
    [lastWord]: "world"
};

a["first word"] // "hello"
a[lastWord] // "world"
a["last word"] // "world"

```

表达式还可以用于定义方法名。

```javascript

let obj = {
  ['h'+'ello']() {
    return 'hi';
  }
};

console.log(obj.hello()); // hi

```

## Object.is()

Object.is()用来比较两个值是否严格相等。它与严格比较运算符（===）的行为基本一致，不同之处只有两个：一是+0不等于-0，二是NaN等于自身。

```javascript

+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true

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

**（4）为属性指定默认值**

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

**（3）Object.getPrototypeOf()**

该方法与setPrototypeOf方法配套，用于读取一个对象的prototype对象。

```javascript

Object.getPrototypeOf(obj)

```

## Symbol

ES6引入了一种新的原始数据类型Symbol，表示独一无二的ID。它通过Symbol函数生成。

```javascript

let symbol1 = Symbol();

typeof symbol
// "symbol"

```

上面代码中，变量symbol1就是一个独一无二的ID。typeof运算符的结果，表明变量symbol1是Symbol数据类型，而不是字符串之类的其他类型。

Symbol函数可以接受一个字符串作为参数，表示Symbol实例的名称。

```javascript

var mySymbol = Symbol('Test');

mySymbol.name
// Test

```

上面代码表示，Symbol函数的字符串参数，用来指定生成的Symbol的名称，可以通过name属性读取。之所以要新增name属性，是因为键名是Symbol类型，而有些场合需要一个字符串类型的值来指代这个键。

注意，Symbol函数前不能使用new命令，否则会报错。这是因为生成的Symbol是一个原始类型的值，不是对象。

Symbol类型的值不能与其他类型的值进行运算，会报错。

```javascript

var sym = Symbol('My symbol');
'' + sym
// TypeError: Cannot convert a Symbol value to a string

```

但是，Symbol类型的值可以转为字符串。

```javascript

String(sym)
// 'Symbol(My symbol)'

sym.toString()
// 'Symbol(My symbol)'

```

symbol的最大特点，就是每一个Symbol都是不相等的，保证产生一个独一无二的值。

```javascript

let w1 = Symbol();
let w2 = Symbol();
let w3 = Symbol();

w1 === w2 // false
w1 === w3 // false
w2 === w3 // false

function f(w) {
  switch (w) {
    case w1:
      ...
    case w2:
      ...
    case w3:
      ...
  }
}

```

上面代码中，w1、w2、w3三个变量都等于`Symbol()`，但是它们的值是不相等的。

由于这种特点，Symbol类型适合作为标识符，用于对象的属性名，保证了属性名之间不会发生冲突。如果一个对象由多个模块构成，这样就不会出现同名的属性，也就防止了键值被不小心改写或覆盖。Symbol类型还可以用于定义一组常量，防止它们的值发生冲突。

```javascript

var mySymbol = Symbol();

// 第一种写法
var a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
var a = {
   [mySymbol]: 123
};

// 第三种写法
var a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

a[mySymbol] // "Hello!"

```

上面代码通过方括号结构和Object.defineProperty两种方法，将对象的属性名指定为一个Symbol值。

注意，不能使用点结构，将Symbol值作为对象的属性名。

```javascript

var a = {};
var mySymbol = Symbol();

a.mySymbol = 'Hello!';

a[mySymbol] // undefined

```

上面代码中，mySymbol属性的值为未定义，原因在于`a.mySymbol`这样的写法，并不是把一个Symbol值当作属性名，而是把mySymbol这个字符串当作属性名进行赋值，这是因为点结构中的属性名永远都是字符串。

下面的写法为Map结构添加了一个成员，但是该成员永远无法被引用。

```javascript

let a = Map();
a.set(Symbol(), 'Noise');
a.size // 1

```

为Symbol函数添加一个参数，就可以引用了。

```javascript

let a = Map();
a.set(Symbol('my_key'), 'Noise');

```

如果要在对象内部使用Symbol属性名，必须采用属性名表达式。

```javascript

let specialMethod = Symbol();

let obj = {
  [specialMethod]: function (arg) { ... }
};

obj[specialMethod](123);

```

采用增强的对象写法，上面代码的obj对象可以写得更简洁一些。

```javascript

let obj = {
  [specialMethod](arg) { ... }
};

```

Symbol类型作为属性名，不会出现在for...in循环中，也不会被Object.keys()、Object.getOwnPropertyNames()返回，但是有一个对应的Object.getOwnPropertySymbols方法，以及Object.getOwnPropertyKeys方法都可以获取Symbol属性名。

```javascript

var obj = {};

var foo = Symbol("foo");

Object.defineProperty(obj, foo, {
    value: "foobar",
});

Object.getOwnPropertyNames(obj)
// []

Object.getOwnPropertySymbols(obj)
// [Symbol(foo)]

```

上面代码中，使用Object.getOwnPropertyNames方法得不到Symbol属性名，需要使用Object.getOwnPropertySymbols方法。

Reflect.ownKeys方法返回所有类型的键名。

```javascript

let obj = {
  [Symbol('my_key')]: 1,
  enum: 2,
  nonEnum: 3
};

Reflect.ownKeys(obj)
// [Symbol(my_key), 'enum', 'nonEnum']

```

## Proxy

Proxy用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

Proxy可以理解成在目标对象之前，架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。proxy这个词的原意是代理，用在这里表示由它来“代理”某些操作。

ES6原生提供Proxy构造函数，用来生成Proxy实例。

```javascript

var proxy = new Proxy({}, {
  get: function(target, property) {
    return 35;
  }
});

proxy.time // 35
proxy.name // 35
proxy.title // 35

```

作为构造函数，Proxy接受两个参数。第一个参数是所要代理的目标对象（上例是一个空对象），即如果没有Proxy的介入，操作原来要访问的就是这个对象；第二个参数是一个设置对象，对于每一个被代理的操作，需要提供一个对应的处理函数，该函数将拦截对应的操作。比如，上面代码中，设置对象有一个get方法，用来拦截对目标对象属性的访问请求。get方法的两个参数分别是目标对象和所要访问的属性。可以看到，由于拦截函数总是返回35，所以访问任何属性都得到35。

注意，要使得Proxy起作用，必须针对Proxy实例（上例是proxy对象）进行操作，而不是针对目标对象（上例是空对象）进行操作。

Proxy实例也可以作为其他对象的原型对象。

```javascript

var proxy = new Proxy({}, {
  get: function(target, property) {
    return 35;
  }
});

let obj = Object.create(proxy);

obj.time // 35

```

上面代码中，proxy对象是obj对象的原型，obj对象本身并没有time属性，所有根据原型链，会在proxy对象上读取该属性，导致被拦截。

对于没有设置拦截的操作，则直接落在目标函数上，按照原先的方式产生结果。

下面是另一个拦截读取操作的例子。

```javascript

var person = {
  name: "张三"
};

var proxy = new Proxy(person, {
  get: function(target, property) {
    if (property in target) {
      return target[property];
    } else {
      throw new ReferenceError("Property \"" + property + "\" does not exist.");
    }
  }
});

proxy.name // "张三"
proxy.age // 抛出一个错误

```

上面代码表示，如果访问目标对象不存在的属性，会抛出一个错误。如果没有这个拦截函数，访问不存在的属性，只会返回undefined。

除了取值函数get，Proxy还可以设置存值函数set，用来拦截某个属性的赋值行为。假定Person对象有一个age属性，该属性应该是一个不大于200的整数，那么可以使用Proxy对象保证age的属性值符合要求。

```javascript

let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // 对于age以外的属性，直接保存
    obj[prop] = value;
  }
};

let person = new Proxy({}, validator);

person.age = 100;

person.age // 100
person.age = 'young' // 报错
person.age = 300 // 报错

```

上面代码中，由于设置了存值函数set，任何不符合要求的age属性赋值，都会抛出一个错误。利用set方法，还可以数据绑定，即每当对象发生变化时，会自动更新DOM。

ownKeys方法用来拦截Object.keys()操作。

```javascript

let target = {};

let handler = {
  ownKeys(target) {
    return ['hello', 'world'];
  }
};

let proxy = new Proxy(target, handler);

Object.keys(proxy)
// [ 'hello', 'world' ]

```

上面代码拦截了对于target对象的Object.keys()操作，返回预先设定的数组。

Proxy支持的拦截操作一览。

- defineProperty(target, propKey, propDesc)：返回一个布尔值，拦截Object.defineProperty(proxy, propKey, propDesc）
- deleteProperty(target, propKey) ：返回一个布尔值，拦截delete proxy[propKey]
- enumerate(target)：返回一个遍历器，拦截for (x in proxy)
- get(target, propKey, receiver)：返回类型不限，拦截对象属性的读取
- getOwnPropertyDescriptor(target, propKey) ：返回属性的描述对象，拦截Object.getOwnPropertyDescriptor(proxy, propKey)
- getPrototypeOf(target) ：返回一个对象，拦截Object.getPrototypeOf(proxy)
- has(target, propKey)：返回一个布尔值，拦截propKey in proxy
- isExtensible(target)：返回一个布尔值，拦截Object.isExtensible(proxy)
- ownKeys(target)：返回一个数组，拦截Object.getOwnPropertyPropertyNames(proxy)、Object.getOwnPropertyPropertySymbols(proxy)、Object.keys(proxy)
- preventExtensions(target)：返回一个布尔值，拦截Object.preventExtensions(proxy)
- set(target, propKey, value, receiver)：返回一个布尔值，拦截对象属性的设置
- setPrototypeOf(target, proto)：返回一个布尔值，拦截Object.setPrototypeOf(proxy, proto)

如果目标对象是函数，那么还有两种额外操作可以拦截。

- apply方法：拦截Proxy实例作为函数调用的操作，比如proxy(···)、proxy.call(···)、proxy.apply(···)。
- construct方法：拦截Proxy实例作为构造函数调用的操作，比如new proxy(···)。

Proxy.revocable方法返回一个可取消的Proxy实例。

```javascript

let target = {};
let handler = {};

let {proxy, revoke} = Proxy.revocable(target, handler);
    
proxy.foo = 123;
proxy.foo // 123
    
revoke();
proxy.foo // TypeError: Revoked

```

Proxy.revocable方法返回一个对象，该对象的proxy属性是Proxy实例，revoke属性是一个函数，可以取消Proxy实例。上面代码中，当执行revoke函数之后，再访问Proxy实例，就会抛出一个错误。

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
