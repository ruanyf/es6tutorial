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

ES6允许将独立的js文件作为模块，也就是说，允许一个JavaScript脚本文件调用另一个脚本文件，从而使得模块化编程成为可能。

假设有一个circle.js，它是一个单独模块。

```javascript

// circle.js

export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}

```

上面代码中的export关键字，表示这个方法是对外开放的接口。

然后，main.js引用这个模块。

```javascript

// main.js

import { area, circumference } from 'circle';

console.log("圆面积：" + area(4));
console.log("圆周长：" + circumference(14));

```

import语句用来导入模块，它接受一个对象，里面指定所要导入的方法，后面的from指定模块名。

另一种写法是使用module命令，整体加载circle.js。

```javascript

// main.js

module circle from 'circle';

console.log("圆面积：" + circle.area(4));
console.log("圆周长：" + circle.circumference(14));

```

module命令跟一个变量，表示加载的模块定义在该变量上。

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
