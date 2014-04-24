# 对象和函数的扩展

## Object.is()

Object.is()用来比较两个值是否严格相等。它与严格比较运算符（===）的行为基本一致，不同之处只有两个：一是+0不等于-0，二是NaN等于自身。

```javascript

+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true

```

## 增强的对象写法

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

## 属性名表达式

ES6允许表达式作为对象的属性名，在写法上要把表达式放在大括号内。

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

上面代码中，对象a的属性名lastWord是一个变量。

下面是一个将字符串的加法表达式作为属性名的例子。

```javascript

var suffix = " word";

var a = {
    ["first" + suffix]: "hello",
    ["last" + suffix]: "world"
};

a["first word"] // "hello"
a["last word"] // "world"

```

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

注意，rest参数不能再有其他参数，否则会报错。

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
