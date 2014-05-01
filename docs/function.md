# 函数的扩展

## 函数参数的默认值

ES6允许为函数的参数设置默认值。

```javascript

function Point(x = 0, y = 0) {
   this.x = x;
   this.y = y;
}

var p = new Point(); 
// p = { x:0, y:0 }

```

任何带有默认值的参数，被视为可选参数。不带默认值的参数，则被视为必需参数。

利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误。

```javascript

function throwIfMissing() {
        throw new Error('Missing parameter');
    }

function foo(mustBeProvided = throwIfMissing()) {
        return mustBeProvided;
}

foo()
// Error: Missing parameter

```

上面代码的foo函数，如果调用的时候没有参数，就会调用默认值throwIfMissing函数，从而抛出一个错误。

## rest（...）运算符

ES6引入rest运算符（...），用于获取函数的多余参数，这样就不需要使用arguments.length了。rest运算符后面是一个数组变量，该变量将多余的参数放入数组中。

```javascript

function add(...values) {
   let sum = 0;

   for (var val of values) {
      sum += val;
   }

   return sum;
}

add(2, 5, 3) // 10

```

上面代码的add函数是一个求和函数，利用rest运算符，可以向该函数传入任意数目的参数。

下面是一个利用rest运算符改写数组push方法的例子。

```javascript

function push(array, ...items) { 
  items.forEach(function(item) {
    array.push(item);
    console.log(item);
  });
}
 
var a = [];
push(a, "a1", "a2", "a3", "a4"); 

```

注意，rest参数之后不能再有其他参数，否则会报错。

```javascript

// 报错
function f(a, ...b, c) { 
  // ...
}

```

rest运算符不仅可以用于函数定义，还可以用于函数调用。

```javascript

function f(s1, s2, s3, s4, s5) {
    console.log(s1 + s2 + s3 + s4 +s5);
}

var a = ["a2", "a3", "a4", "a5"];

f("a1", ...a)
// a1a2a3a4a5

```

从上面的例子可以看出，rest运算符的另一个重要作用是，可以将数组转变成正常的参数序列。利用这一点，可以简化求出一个数组最大元素的写法。

```javascript

// ES5
Math.max.apply(null, [14, 3, 77])

// ES6
Math.max(...[14, 3, 77])

// 等同于
Math.max(14, 3, 77);

```

上面代码表示，由于JavaScript不提供求数组最大元素的函数，所以只能套用Math.max函数，将数组转为一个参数序列，然后求最大值。有了rest运算符以后，就可以直接用Math.max了。

## 箭头函数

ES6允许使用“箭头”（=>）定义函数。

```javascript

var f = v => v;

```

上面的箭头函数等同于：

```javascript

var f = function(v) {
    return v;
};

```

如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。

```javascript

var f = () => 5; 
// 等同于
var f = function (){ return 5 };

var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
    return num1 + num2;
};

```

如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回。

```javascript

var sum = (num1, num2) => { return num1 + num2; }

```

由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号。

```javascript

var getTempItem = id => ({ id: id, name: "Temp" });

```
箭头函数的一个用处是简化回调函数。

```javascript

// 正常函数写法
[1,2,3].map(function (x) {
  return x * x;
});

// 箭头函数写法
[1,2,3].map(x => x * x);

```

另一个例子是

```javascript

// 正常函数写法
var result = values.sort(function(a, b) {
    return a - b;
});

// 箭头函数写法
var result = values.sort((a, b) => a - b);

```

箭头函数有几个使用注意点。

- 函数体内的this对象，绑定定义时所在的对象，而不是使用时所在的对象。
- 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
- 不可以使用arguments对象，该对象在函数体内不存在。 

关于this对象，下面的代码将它绑定定义时的对象。

```javascript

var handler = {

    id: "123456",

    init: function() {
        document.addEventListener("click",
                event => this.doSomething(event.type), false);
    },

    doSomething: function(type) {
        console.log("Handling " + type  + " for " + this.id);
    }
};

```

上面代码的init方法中，使用了箭头函数，这导致this绑定handler对象。否则，doSomething方法内部的this对象就指向全局对象，运行时会报错。

由于this在箭头函数中被绑定，所以不能用call()、apply()、bind()这些方法去改变this的指向。
