# Class和Module

## Class

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

ES6引入了Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类。上面的代码用“类”改写，就是下面这样。

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

var point = new Point(2,3);
point.toString() // (2, 3)

```

上面代码定义了一个“类”，可以看到里面有一个constructor函数，这就是构造函数，而this关键字则代表实例对象。这个类除了构造方法，还定义了一个toString方法。注意，定义方法的时候，前面不需要加上function这个保留字，直接把函数定义放进去了就可以了。

Class之间可以通过extends关键字，实现继承。

```javascript

class ColorPoint extends Point {}

```

上面代码定义了一个ColorPoint类，该类通过extends关键字，继承了Point类的所有属性和方法。但是由于没有部署任何代码，所以这两个类完全一样，等于复制了一个Point类。下面，我们在ColorPoint内部加上代码。

```javascript

class ColorPoint extends Point {

  constructor(x, y, color) {
    super(x, y); // 等同于super.constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color+' '+super();
  }

}

```

上面代码中，constructor方法和toString方法之中，都出现了super关键字，它指代父类的同名方法。在constructor方法内，super指代父类的constructor方法；在toString方法内，super指代父类的toString方法。

## Module的基本用法

JavaScript没有模块（module）体系，无法将一个大程序拆分成互相依赖的小文件，再用简单的方法拼装起来。其他语言都有这项功能，比如Ruby的require、Python的import，甚至就连CSS都有@import，但是JavaScript任何这方面的支持都没有，这对开发大型的、复杂的项目形成了巨大障碍。

ES6解决了这个问题，实现了模块功能，而且实现得相当简单，完全可以取代现有的CommonJS和AMD规范，成为浏览器和服务器通用的模块解决方案。

**（1）export命令，import命令**

模块功能有两个命令：export和import。export命令用于用户自定义模块，规定对外接口；import命令用于输入其他模块提供的功能，同时创造命名空间（namespace），防止函数名冲突。

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

上面代码在export命令后面，使用大括号指定所要输出的一组变量。

它与前一种export命令直接放置在var语句前的写法是等价的，但是应该优先考虑使用这种写法。因为这样就可以在脚本尾部，一眼看清楚输出了哪些变量。

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
