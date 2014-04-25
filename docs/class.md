# class

ES6引入了Class（类）这个概念，可以定义class，作为对象的模板。

```javascript

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

上面代码定义了一个class类，可以看到里面有一个constructor函数，这就是构造函数。而this关键字则代表实例对象。

class之间可以通过extends关键字，实现继承。

```javascript

class ColorPoint extends Point {

  constructor(x, y, color) {
    super(x, y); // same as super.constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color+' '+super();
  }

}

```

上面代码定义了一个ColorPoint类，该类通过extends关键字，继承了Point类的所有属性和方法。在constructor方法内，super就指代父类Point。
