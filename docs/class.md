# Class和Module

## Class基本语法

**（1）概述**

ES5通过构造函数，定义并生成新对象。下面是一个例子。

```javascript

function Point(x,y){
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '('+this.x+', '+this.y+')';
}

```

ES6引入了Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类。基本上，class可以看作只是一个语法糖，它的绝大部分功能，ES5都可以做到，新的class写法只是让对象原型的写法更加清晰而已。上面的代码用“类”改写，就是下面这样。

```javascript

//定义类
class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '('+this.x+', '+this.y+')';
  }

}

```

上面代码定义了一个“类”，可以看到里面有一个constructor方法，这就是构造方法，而this关键字则代表实例对象。Point类除了构造方法，还定义了一个toString方法。注意，定义方法的时候，前面不需要加上function这个保留字，直接把函数定义放进去了就可以了。

**（2）constructor方法**

constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，该方法会被默认添加，代码如下。

```javascript

constructor() {}

```

constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。

```javascript

class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo
// false

```

上面代码中，constructor函数返回一个全新的对象，结果导致实例对象不是Foo类的实例。

**（3）实例对象**

生成实例对象的写法，与ES5完全一样，也是使用new命令。如果忘记加上new，像函数那样调用Class，将会报错。

```javascript

// 报错
var point = Point(2, 3);

// 正确
var point = new Point(2, 3);

```

与ES5一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。

```javascript

//定义类
class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '('+this.x+', '+this.y+')';
  }

}

var point = Point(2, 3);

point.toString() // (2, 3)

point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true

```

上面代码中，x和y都是实例对象point自身的属性（因为定义在this变量上），所以hasOwnProperty方法返回true，而toString是原型对象的属性（因为定义在Point类上），所以hasOwnProperty方法返回false。这些都与ES5的行为保持一致。

```javascript

var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__ === p2.__proto__
//true

```

上面代码中，p1和p2都是Point的实例，它们的原型都是Point，所以\_\_proto\_\_属性是相等的。

这也意味着，可以通过\_\_proto\_\_属性为Class添加方法。

```javascript

var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__.printName = function () { return 'Oops' };

p1.printName() // "Oops"
p2.printName() // "Oops"

var p3 = new Point(4,2);
p3.printName() // "Oops"

```

上面代码在p1的原型上添加了一个printName方法，由于p1的原型就是p2的原型，因此p2也可以调用这个方法。而且，此后新建的实例p3也可以调用这个方法。这意味着，使用实例的\__proto\__属性改写原型，必须相当谨慎，不推荐使用，因为这会改变Class的原始定义，影响到所有实例。

**（4）name属性**

由于本质上，ES6的Class只是ES5的构造函数的一层包装，所以函数的许多特性都被Class继承，包括name属性。

```javascript

class Point {}

Point.name // "Point"

```

name属性总是返回紧跟在class关键字后面的类名。

**（5）Class表达式**

与函数一样，Class也可以使用表达式的形式定义。

```javascript

const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};

```

上面代码使用表达式定义了一个类。需要注意的是，这个类的名字是MyClass而不是Me，Me只在Class的内部代码可用，指代当前类。

```javascript

let inst = new MyClass();
inst.getClassName() // Me
Me.name // ReferenceError: Me is not defined

```

上面代码表示，Me只在Class内部有定义。

如果Class内部没用到的话，可以省略Me，也就是可以写成下面的形式。

```javascript

const MyClass = class { /* ... */ };

```

**（6）不存在变量提升**

Class不存在变量提升（hoist），这一点与ES5完全不同。

```javascript

new Foo(); // ReferenceError

class Foo {}

```

上面代码中，Foo类使用在前，定义在后，这样会报错，因为ES6不会把变量声明提升到代码头部。这种规定的原因与下文要提到的继承有关，必须保证子类在父类之后定义。

```javascript

{
  let Foo = class {};
  class Bar extends Foo {
  }
}

```

如果存在Class的提升，上面代码将报错，因为let命令也是不提升的。

**（7）严格模式**

类和模块的内部，默认就是严格模式，所以不需要使用`use strict`指定运行模式。考虑到未来所有的代码，其实都是运行在模块之中，所以ES6实际上把整个语言升级到了严格模式。

## Class的继承

### 基本用法

Class之间可以通过extends关键字，实现继承，这比ES5的通过修改原型链实现继承，要清晰和方便很多。

```javascript

class ColorPoint extends Point {}

```

上面代码定义了一个ColorPoint类，该类通过extends关键字，继承了Point类的所有属性和方法。但是由于没有部署任何代码，所以这两个类完全一样，等于复制了一个Point类。下面，我们在ColorPoint内部加上代码。

```javascript

class ColorPoint extends Point {

  constructor(x, y, color) {
    super(x, y); // 等同于parent.constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 等同于parent.toString()
  }

}

```

上面代码中，constructor方法和toString方法之中，都出现了super关键字，它指代父类的实例（即父类的this对象）。

子类必须在constructor方法中调用super方法，否则新建实例时会报错。

```javascript

class Point { /* ... */ }

class ColorPoint extends Foo {
  constructor() {
  }
}

let cp = new ColorPoint(); // ReferenceError

```

如果子类没有定义constructor方法，这个方法会被默认添加，代码如下。也就是说，不管有没有显式定义，任何一个子类都有constructor方法。

```javascript

constructor(...args) {
  super(...args);
}

```

另一个需要注意的地方是，在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。这是因为没有调用父类的构造函数，就无法子类实例的构建。

```javascript

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    this.color = color; // ReferenceError
    super(x, y);
    this.color = color; // 正确
  }
}

```

上面代码中，子类的constructor方法没有调用super之前，就使用this关键字，结果报错，而放在super方法之后就是正确的。

下面是生成子类实例的代码。

```javascript

let cp = new ColorPoint(25, 8, 'green');

cp instanceof ColorPoint // true
cp instanceof Point // true

```

上面代码中，实例对象cp同时是ColorPoint和Point两个类的实例，这与ES5的行为完全一致。

### prototype属性

Class作为构造函数的升级，也有自己的prototype属性，其规则与ES5构造函数的prototype属性一致。

```javascript

class A {
}

A.prototype === Function.prototype
// true

class B extends A {
}

B.prototype === A
// true

class C extends Object {
}

C.prototype === Object
// true

```

上面代码中，子类的prototype属性都指向父类。如果一个类是基类（即不存在任何继承），那么它的原型指向`Function.prototype`。

### Object.getPrototypeOf()

Object.getPrototypeOf方法可以用来从子类上获取父类。

```javascript

Object.getPrototypeOf(ColorPoint) === Point
// true

```

### \_\_proto\_\_属性

父类和子类的\_\_proto\_\_属性，指向是不一样的。

```javascript

var p1 = new Point(2, 3);
var p2 = new ColorPoint(2, 3, 'red');

p2.__proto__ === p1.__proto // false
p2.__proto__.__proto__ === p1.__proto__ // true

```

通过子类的\_\_proto\_\_属性，可以修改父类。

```javascript

p2.__proto__.__proto__.printName = function () {
  console.log('Ha');
};

p1.printName() // "Ha"

```

上面代码在ColorPoint的实例p2上向Point类添加方法，结果影响到了Point的实例p1。

### 构造函数的继承

下面是一个继承原生的Array构造函数的例子。

```javascript

class MyArray extends Array {
  constructor(...args) {
    super(...args);
  }
}

var arr = new MyArray();
arr[1] = 12;

```

上面代码定义了一个MyArray类，继承了Array构造函数，因此就可以从MyArray生成数组的实例。这意味着，ES6可以自定义原生数据结构（比如Array、String等）的子类，这是ES5无法做到的。

上面这个例子也说明，extends关键字不仅可以用来继承类，还可以用来继承构造函数。下面是一个自定义Error子类的例子。

```javascript

class MyError extends Error {
}

throw new MyError('Something happened!');

```

## class的取值函数（getter）和存值函数（setter）

与ES5一样，在Class内部可以使用get和set关键字，对某个属性设置存值函数和取值函数。

```javascript

class MyClass {
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'

```

上面代码中，prop属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了。

## Class的Generator方法

如果某个方法之前加上星号（*），就表示该方法是一个Generator函数。

```javascript

class Foo {
  constructor(...args) {
    this.args = args;
  }
  * [Symbol.iterator]() {
    for (let arg of this.args) {
      yield arg;
    }
  }
}

for (let x of new Foo('hello', 'world')) {
  console.log(x);
}
// hello
// world

```

上面代码中，Foo类的Symbol.iterator方法前有一个星号，表示该方法是一个Generator函数。Symbol.iterator方法返回一个Foo类的默认遍历器，for...of循环会自动调用这个遍历器。

## Class的静态方法

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

```javascript

class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: undefined is not a function

```

上面代码中，Foo类的classMethod方法前有static关键字，表明该方法是一个静态方法，可以直接在Foo类上调用（`Foo.classMethod()`），而不是在Foo类的实例上调用。如果在实例上调用静态方法，会抛出一个错误，表示不存在该方法。

父类的静态方法，可以被子类继承。

```javascript

class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
}

Bar.classMethod(); // 'hello'

```

上面代码中，父类Foo有一个静态方法，子类Bar可以调用这个方法。

## Module

ES6的Class只是面向对象编程的语法糖，升级了ES5的对象定义的写法，并没有解决模块化问题。Module功能就是为了解决这个问题而提出的。

历史上，JavaScript一直没有模块（module）体系，无法将一个大程序拆分成互相依赖的小文件，再用简单的方法拼装起来。其他语言都有这项功能，比如Ruby的require、Python的import，甚至就连CSS都有@import，但是JavaScript任何这方面的支持都没有，这对开发大型的、复杂的项目形成了巨大障碍。

在ES6之前，社区制定了一些模块加载方案，最主要的有CommonJS和AMD两种。前者用于服务器，后者用于浏览器。ES6在语言规格的层面上，实现了模块功能，而且实现得相当简单，完全可以取代现有的CommonJS和AMD规范，成为浏览器和服务器通用的模块解决方案。

ES6模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS和AMD模块，都只能在运行时确定这些东西。比如，CommonJS模块就是对象，输入时必须查找对象属性。

```javascript

var { stat, exists, readFile } = require('fs');

```

ES6模块不是对象，而是通过export命令显式指定输出的代码，输入时也采用静态命令的形式。

```javascript

import { stat, exists, readFile } from 'fs';

```

所以，ES6可以在编译时就完成模块编译，效率要比CommonJS模块高。

**（1）export命令，import命令**

模块功能主要由两个命令构成：export和import。export命令用于用户自定义模块，规定对外接口；import命令用于输入其他模块提供的功能，同时创造命名空间（namespace），防止函数名冲突。

ES6允许将独立的JS文件作为模块，也就是说，允许一个JavaScript脚本文件调用另一个脚本文件。该文件内部的所有变量，外部无法获取，必须使用export关键字输出变量。下面是一个JS文件，里面使用export关键字输出变量。

```javascript

// profile.js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;

```

上面代码是profile.js文件，保存了用户信息。ES6将其视为一个模块，里面用export命令对外部输出了三个变量。

export的写法，除了像上面这样，还有另外一种。

```javascript

// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export {firstName, lastName, year};

```

上面代码在export命令后面，使用大括号指定所要输出的一组变量。它与前一种写法（直接放置在var语句前）是等价的，但是应该优先考虑使用这种写法。因为这样就可以在脚本尾部，一眼看清楚输出了哪些变量。

使用export命令定义了模块的对外接口以后，其他JS文件就可以通过import命令加载这个模块（文件）。

```javascript

// main.js

import {firstName, lastName, year} from './profile';

function sfirsetHeader(element) {
  element.textContent = firstName + ' ' + lastName;
}

```

上面代码属于另一个文件main.js，import命令就用于加载profile.js文件，并从中输入变量。import命令接受一个对象（用大括号表示），里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块（profile.js）对外接口的名称相同。

如果想为输入的变量重新取一个名字，import语句中要使用as关键字，将输入的变量重命名。

```javascript

import { lastName as surname } from './profile';

```

ES6支持多重加载，即所加载的模块中又加载其他模块。

```javascript

import { Vehicle } from './Vehicle';

class Car extends Vehicle {
  move () {
    console.log(this.name + ' is spinning wheels...')
  }
}

export { Car }

```

上面的模块先加载Vehicle模块，然后在其基础上添加了move方法，再作为一个新模块输出。

**（2）模块的整体输入，module命令**

export命令除了输出变量，还可以输出方法或类（class）。下面是一个circle.js文件，它输出两个方法area和circumference。

```javascript

// circle.js

export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}

```

然后，main.js输入circlek.js模块。

```javascript

// main.js

import { area, circumference } from 'circle';

console.log("圆面积：" + area(4));
console.log("圆周长：" + circumference(14));

```

上面写法是逐一指定要输入的方法。另一种写法是整体输入。

```javascript

import * as circle from 'circle';

console.log("圆面积：" + circle.area(4));
console.log("圆周长：" + circle.circumference(14));

```

module命令可以取代import语句，达到整体输入模块的作用。

```javascript

// main.js

module circle from 'circle';

console.log("圆面积：" + circle.area(4));
console.log("圆周长：" + circle.circumference(14));

```

module命令后面跟一个变量，表示输入的模块定义在该变量上。

**（3）export default命令**

如果想要输出匿名函数，可以使用export default命令。

```javascript

// export-default.js

export default function () {
    console.log('foo');
}

```

其他模块输入该模块时，import命令可以为该匿名函数指定任意名字。

```javascript

// import-default.js

import customName from './export-default';
customName(); // 'foo'

```

上面代码的import命令，可以用任意名称指向输出的匿名函数。需要注意的是，这时import命令后面，不使用大括号。

```javascript

// 第一组
import crc32 from 'crc32';
export default function crc32(){}

// 第二组
import { crc32 } from 'crc32';
export function crc32(){};

```

上面代码的两组写法，第一组是使用export default时，对应的import语句不需要使用大括号；第二组是不使用export default时，对应的import语句需要使用大括号。

export default命令用在非匿名函数前，也是可以的。

```javascript

// export-default.js

export default function foo() {
  console.log('foo');
}

// 或者写成

function foo() {
  console.log('foo');
}

export default foo;

```

上面代码中，foo函数的函数名foo，在模块外部是无效的。加载的时候，视同匿名函数加载。

export default命令用于指定模块的默认输出。如果模块加载时，只能输出一个值或方法，那就是export default所指定的那个值或方法。所以，import命令后面才不用加大括号。显然，一个模块只能有一个默认输出，因此export deault命令只能使用一次。

有了export default命令，输入模块时就非常直观了，以输入jQuery模块为例。

```javascript

import $ from 'jquery';

```

如果想在一条import语句中，同时输入默认方法和其他变量，可以写成下面这样。

```javascript

import customName, { otherMethod } from './export-default';

```

如果要输出默认的值，只需将值跟在`export default`之后即可。

```javascript

export default 42;  

```

export default也可以用来输出类。

```javascript

// MyClass.js
export default class { ... }

// main.js
import MyClass from 'MyClass'
let o = new MyClass();

```

## 模块的继承

模块之间也可以继承。

假设有一个circleplus模块，继承了circle模块。

```javascript

// circleplus.js

export * from 'circle';
export var e = 2.71828182846;
export default function(x) {
    return Math.exp(x);
}

```

上面代码中的“export *”，表示输出circle模块的所有属性和方法，export default命令定义模块的默认方法。

这时，也可以将circle的属性或方法，改名后再输出。

```javascript

// circleplus.js

export { area as circleArea } from 'circle';  

```

上面代码表示，只输出circle模块的area方法，且将其改名为circleArea。

加载上面模块的写法如下。

```javascript

// main.js

module math from "circleplus";
import exp from "circleplus";
console.log(exp(math.pi));

```

上面代码中的"import exp"表示，将circleplus模块的默认方法加载为exp方法。

## ES6模块的转码

浏览器目前还不支持ES6模块，为了现在就能使用，可以将转为ES5的写法。

**（1）ES6 module transpiler**

[ES6 module transpiler](https://github.com/esnext/es6-module-transpiler)是square公司开源的一个转码器，可以将ES6模块转为CommonJS模块或AMD模块的写法，从而在浏览器中使用。

首先，安装这个转玛器。

```bash

$ npm install -g es6-module-transpiler

```

然后，使用`compile-modules convert`命令，将ES6模块文件转码。

```bash

$ compile-modules convert file1.js file2.js

```

o参数可以指定转码后的文件名。

```bash

$ compile-modules convert -o out.js file1.js

```

**（2）SystemJS**

另一种解决方法是使用[SystemJS](https://github.com/systemjs/systemjs)。它是一个垫片库（polyfill），可以在浏览器内加载ES6模块、AMD模块和CommonJS模块，将其转为ES5格式。它在后台调用的是Google的Traceur转码器。

使用时，先在网页内载入system.js文件。

```html

<script src="system.js"></script>

```

然后，使用`System.import`方法加载模块文件。

```html

<script>
  System.import('./app');
</script>

```

上面代码中的`./app`，指的是当前目录下的app.js文件。它可以是ES6模块文件，`System.import`会自动将其转码。

需要注意的是，`System.import`使用异步加载，返回一个Promise对象，可以针对这个对象编程。下面是一个模块文件。

```javascript

// app/es6-file.js:

export class q {
  constructor() {
    this.es6 = 'hello';
  }
}


```

然后，在网页内加载这个模块文件。

```html

<script>

System.import('app/es6-file').then(function(m) {
  console.log(new m.q().es6); // hello
});

</script>

```

上面代码中，`System.import`方法返回的是一个Promise对象，所以可以用then方法指定回调函数。
