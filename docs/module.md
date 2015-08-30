# Module

ES6的Class只是面向对象编程的语法糖，升级了ES5的构造函数的原型链继承的写法，并没有解决模块化问题。Module功能就是为了解决这个问题而提出的。

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

## export命令

模块功能主要由两个命令构成：export和import。export命令用于用户自定义模块，规定对外接口；import命令用于输入其他模块提供的功能，同时创造命名空间（namespace），防止函数名冲突。

ES6允许将独立的JS文件作为模块，也就是说，允许一个JavaScript脚本文件调用另一个脚本文件。该文件内部的所有变量，外部无法获取，必须使用export关键字输出变量。下面是一个JS文件，里面使用export命令输出变量。

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

export命令除了输出变量，还可以输出函数或类（class）。

```javascript
export function multiply (x, y) {
  return x * y;
};
```

上面代码对外输出一个函数multiply。

## import命令

使用export命令定义了模块的对外接口以后，其他JS文件就可以通过import命令加载这个模块（文件）。

```javascript
// main.js

import {firstName, lastName, year} from './profile';

function setName(element) {
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

如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。

```javascript
export { es6 as default } from './someModule';

// 等同于
import { es6 } from './someModule';
export default es6;
```

上面代码中，export和import语句可以结合在一起，写成一行。但是从可读性考虑，不建议采用这种写法，h应该采用标准写法。

## 模块的整体输入

下面是一个circle.js文件，它输出两个方法area和circumference。

```javascript
// circle.js

export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}
```

然后，main.js文件输入circle.js模块。

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

## module命令

module命令可以取代import语句，达到整体输入模块的作用。

```javascript
// main.js

module circle from 'circle';

console.log("圆面积：" + circle.area(4));
console.log("圆周长：" + circle.circumference(14));
```

module命令后面跟一个变量，表示输入的模块定义在该变量上。

## export default命令

从前面的例子可以看出，使用import的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。但是，用户肯定希望快速上手，未必愿意阅读文档，去了解模块有哪些属性和方法。

为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到`export default`命令，为模块指定默认输出。

```javascript
// export-default.js
export default function () {
  console.log('foo');
}
```

上面代码是一个模块文件`export-default.js`，它的默认输出是一个函数。

其他模块加载该模块时，import命令可以为该匿名函数指定任意名字。

```javascript
// import-default.js
import customName from './export-default';
customName(); // 'foo'
```

上面代码的import命令，可以用任意名称指向`export-default.js`输出的方法。需要注意的是，这时import命令后面，不使用大括号。

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

下面比较一下默认输出和正常输出。

```javascript
import crc32 from 'crc32';
// 对应的输出
export default function crc32(){}

import { crc32 } from 'crc32';
// 对应的输出
export function crc32(){};
```

上面代码的两组写法，第一组是使用`export default`时，对应的import语句不需要使用大括号；第二组是不使用`export default`时，对应的import语句需要使用大括号。

`export default`命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此`export deault`命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能对应一个方法。

本质上，`export default`就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。所以，下面的写法是有效的。

```javascript
// modules.js
export default function (x, y) {
  return x * y;
};
// app.js
import { default } from 'modules';
```

有了`export default`命令，输入模块时就非常直观了，以输入jQuery模块为例。

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

`export default`也可以用来输出类。

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
console.log(exp(math.E));
```

上面代码中的"import exp"表示，将circleplus模块的默认方法加载为exp方法。

## ES6模块的转码

浏览器目前还不支持ES6模块，为了现在就能使用，可以将转为ES5的写法。

### ES6 module transpiler

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

### SystemJS

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
