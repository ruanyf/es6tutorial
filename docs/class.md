# Class和Module

## Class

ES6引入了Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类

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

上面代码定义了一个class类，可以看到里面有一个constructor函数，这就是构造函数。而this关键字则代表实例对象。

class之间可以通过extends关键字，实现继承。

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

上面代码定义了一个ColorPoint类，该类通过extends关键字，继承了Point类的所有属性和方法。在constructor方法内，super就指代父类Point；在toString方法内，`super()`表示对父类求值，由于此处需要字符串，所以会自动调用父类的toString方法。

## Module的基本用法

ES6实现了模块功能，试图解决JavaScript代码的依赖和部署上的问题。模块功能有两个关键字：export和import。export用于用户自定义模块，规定对外接口；import用于输入其他模块提供的功能，同时创造命名空间（namespace），防止函数名冲突。

ES6允许将独立的JS文件作为模块，也就是说，允许一个JavaScript脚本文件调用另一个脚本文件。最简单的模块就是一个JS文件，里面使用export关键字输出变量。

```javascript

// profile.js
export var firstName = 'David';
export var lastName = 'Belle';
export var year = 1973;

```

上面是profile.js，ES6将其视为一个模块，里面用export关键字输出了三个变量。其他js文件就可以通过import关键字加载这个模块（文件）。

```javascript

import {firstName, lastName, year} from './profile';

function setHeader(element) {
  element.textContent = firstName + ' ' + lastName;
}

```

上面代码中import关键字接受一个对象（用大括号表示），里面指定要从其他模块导入的变量。大括号里面的变量名，必须与被导入模块对外接口的名称相同。

export关键字除了输出变量，还可以输出方法。下面是一个circle.js文件，它输出两个方法。

```javascript

// circle.js

export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}

```

然后，main.js引用这个模块。

```javascript

// main.js

import { area, circumference } from 'circle';

console.log("圆面积：" + area(4));
console.log("圆周长：" + circumference(14));

```
上面写法是逐一指定要导入的方法。另一种写法是使用module关键字，整体导入。

```javascript

// main.js

module circle from 'circle';

console.log("圆面积：" + circle.area(4));
console.log("圆周长：" + circle.circumference(14));

```

module关键字后面跟一个变量，表示导入的模块定义在该变量上。

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

上面代码中的“export *”，表示导入circle模块的所有属性和方法。export default命令表示，定义模块的默认方法。

加载上面模块的写法如下。

```javascript

// main.js

module math from "circleplus";
import exp from "circleplus";
console.log(exp(math.pi));

```

上面代码中的"import exp"表示，将circleplus模块的默认方法加载为exp方法。
