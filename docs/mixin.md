# Mixin

JavaScript语言的设计是单一继承，即子类只能继承一个父类，不允许继承多个父类。这种设计保证了对象继承的层次结构是树状的，而不是复杂的[网状结构](https://en.wikipedia.org/wiki/Multiple_inheritance#The_diamond_problem)。

但是，这大大降低了编程的灵活性。因为实际开发中，有时不可避免，子类需要继承多个父类。举例来说，“猫”可以继承“哺乳类动物”，也可以继承“宠物”。

各种单一继承的编程语言，有不同的多重继承解决方案。比如，Java语言也是子类只能继承一个父类，但是还允许继承多个界面（interface），这样就间接实现了多重继承。Interface与父类一样，也是一个类，只不过它只定义接口（method signature），不定义实现，因此又被称为“抽象类”。凡是继承于Interface的方法，都必须自己定义实现，否则就会报错。这样就避免了多重继承的最大问题：多个父类的同名方法的碰撞（naming collision）。

JavaScript语言没有采用Interface的方案，而是通过代理（delegation）实现了从其他类引入方法。

```javascript
var Enumerable_first = function () {
  this.first = function () {
    return this[0];
  };
};

var list = ["foo", "bar", "baz"];
Enumerable_first.call(list); // explicit delegation
list.first() // "foo"
```

上面代码中，`list`是一个数组，本身并没有`first`方法。通过`call`方法，可以把`Enumerable_first`里面的方法，绑定到`list`，从而`list`就具有`first`方法。这就叫做“代理”（delegation），`list`对象代理了`Enumerable_first`的`first`方法。

## 含义

Mixin这个名字来自于冰淇淋，在基本口味的冰淇淋上面混入其他口味，这就叫做Mix-in。

它允许向一个类里面注入一些代码，使得一个类的功能能够“混入”另一个类。实质上是多重继承的一种解决方案，但是避免了多重继承的复杂性，而且有利于代码复用。

Mixin就是一个正常的类，不仅定义了接口，还定义了接口的实现。

子类通过在`this`对象上面绑定方法，达到多重继承的目的。

很多库提供了Mixin功能。下面以Lodash为例。

```javascript
function vowels(string) {
  return /[aeiou]/i.test(this.value);
}

var obj = { value: 'hello' };
_.mixin(obj, {vowels: vowels})
obj.vowels() // true
```

上面代码通过Lodash库的`_.mixin`方法，让`obj`对象继承了`vowels`方法。

Underscore的类似方法是`_.extend`。

```javascript
var Person = function (fName, lName) {
  this.firstName = fName;
  this.lastName = lName;
}

var sam = new Person('Sam', 'Lowry');

var NameMixin = {
  fullName: function () {
    return this.firstName + ' ' + this.lastName;
  },
  rename: function(first, last) {
    this.firstName = first;
    this.lastName = last;
    return this;
  }
};
_.extend(Person.prototype, NameMixin);
sam.rename('Samwise', 'Gamgee');
sam.fullName() // "Samwise Gamgee"
```

上面代码通过`_.extend`方法，在`sam`对象上面（准确说是它的原型对象`Person.prototype`上面），混入了`NameMixin`类。

`extend`方法的实现非常简单。

```javascript
function extend(destination, source) {
  for (var k in source) {
    if (source.hasOwnProperty(k)) {
      destination[k] = source[k];
    }
  }
  return destination;
}
```

上面代码将`source`对象的所有方法，添加到`destination`对象。

## Trait

Trait是另外一种多重继承的解决方案。它与Mixin很相似，但是有一些细微的差别。

- Mixin可以包含状态（state），Trait不包含，即Trait里面的方法都是互不相干，可以线性包含的。比如，`Trait1`包含方法`A`和`B`，`Trait2`继承了`Trait1`，同时还包含一个自己的方法`C`，实际上就等同于直接包含方法`A`、`B`、`C`。
- 对于同名方法的碰撞，Mixin包含了解决规则，Trait则是报错。
