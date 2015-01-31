# Generator 函数

## 语法

### 简介

所谓Generator，有多种理解角度。首先，可以把它理解成一个函数的内部状态的遍历器，每调用一次，函数的内部状态发生一次改变（可以理解成发生某些事件）。ES6引入Generator函数，作用就是可以完全控制函数的内部状态的变化，依次遍历这些状态。

在形式上，Generator是一个普通函数，但是有两个特征。一是，function命令与函数名之间有一个星号；二是，函数体内部使用yield语句，定义遍历器的每个成员，即不同的内部状态（yield语句在英语里的意思就是“产出”）。

```javascript

function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
	return 'ending';
}

var hw = helloWorldGenerator();

```

上面代码定义了一个Generator函数helloWorldGenerator，它的遍历器有两个成员“hello”和“world”。调用这个函数，就会得到遍历器。

当调用Generator函数的时候，该函数并不执行，而是返回一个遍历器（可以理解成暂停执行）。以后，每次调用这个遍历器的next方法，就从函数体的头部或者上一次停下来的地方开始执行（可以理解成恢复执行），直到遇到下一个yield语句为止。也就是说，next方法就是在遍历yield语句定义的内部状态。

```javascript

hw.next() 
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }

```

上面代码一共调用了四次next方法。

第一次调用，函数开始执行，直到遇到第一句yield语句为止。next方法返回一个对象，它的value属性就是当前yield语句的值hello，done属性的值false，表示遍历还没有结束。

第二次调用，函数从上次yield语句停下的地方，一直执行到下一个yield语句。next方法返回的对象的value属性就是当前yield语句的值world，done属性的值false，表示遍历还没有结束。

第三次调用，函数从上次yield语句停下的地方，一直执行到return语句（如果没有return语句，就执行到函数结束）。next方法返回的对象的value属性，就是紧跟在return语句后面的表达式的值（如果没有return语句，则value属性的值为undefined），done属性的值true，表示遍历已经结束。

第四次调用，此时函数已经运行完毕，next方法返回对象的value属性为undefined，done属性为true。以后再调用next方法，返回的都是这个值。

总结一下，Generator函数使用iterator接口，每次调用next方法的返回值，就是一个标准的iterator返回值：有着value和done两个属性的对象。其中，value是yield语句后面那个表达式的值，done是一个布尔值，表示是否遍历结束。

由于Generator函数本身就能生成遍历器，所以它的Symbol.iterator属性指向自身。

```javascript

function* gen(){
  // some code
}

gen[Symbol.iterator]() === gen
// true

```

上面代码中，gen是一个Generator函数，它的Symbol.iterator属性就指向它自己。

由于Generator函数返回的遍历器，只有调用next方法才会遍历下一个成员，所以其实提供了一种可以暂停执行的函数。yield语句就是暂停标志，next方法遇到yield，就会暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回对象的value属性的值。当下一次调用next方法时，再继续往下执行，直到遇到下一个yield语句。如果没有再遇到新的yield语句，就一直运行到函数结束，将return语句后面的表达式的值，作为value属性的值，如果该函数没有return语句，则value属性的值为undefined。另一方面，由于yield后面的表达式，直到调用next方法时才会执行，因此等于为JavaScript提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。

yield语句与return语句有点像，都能返回紧跟在语句后面的那个表达式的值。区别在于每次遇到yield，函数暂停执行，下一次再从该位置继续向后执行，而return语句不具备位置记忆的功能。一个函数里面，只能执行一次（或者说一个）return语句，但是可以执行多次（或者说多个）yield语句。正常函数只能返回一个值，因为只能执行一次return；Generator函数可以返回一系列的值，因为可以有任意多个yield。从另一个角度看，也可以说Generator生成了一系列的值，这也就是它的名称的来历（在英语中，generator这个词是“生成器”的意思）。

Generator函数可以不用yield语句，这时就变成了一个单纯的暂缓执行函数。

```javascript

function* f() {
  console.log('执行了！')
}

var generator = f();

setTimeout(function () {
  generator.next() 
}, 2000);

```

上面代码中，函数f如果是普通函数，在为变量generator赋值时就会执行。但是，函数f是一个Generator函数，就变成只有调用next方法时，函数f才会执行。

另外需要注意，yield语句不能用在普通函数中，否则会报错。

```javascript

(function (){
  yield 1;
})()
// SyntaxError: Unexpected number

```

上面代码在一个普通函数中使用yield语句，结果产生一个句法错误。

下面是另外一个例子。

```javascript

var arr = [1, [[2, 3], 4], [5, 6]];

var flat = function* (a){
  a.forEach(function(item){
    if (typeof item !== 'number'){
      yield* flat(item);  
    } else {
      yield item;
    }
  }
};

for (var f of flat(arr)){
  console.log(f);
}

```

上面代码也会产生句法错误，因为forEach方法的参数是一个普通函数，但是在里面使用了yield语句。一种修改方法是改用for循环。

```javascript

var arr = [1, [[2, 3], 4], [5, 6]];

var flat = function* (a){
  var length = a.length;
  for(var i =0;i<length;i++){
    var item = a[i];
    if (typeof item !== 'number'){
      yield* flat(item);  
    } else {
      yield item;
    }
  }
};

for (var f of flat(arr)){
  console.log(f);
}
// 1, 2, 3, 4, 5, 6

```

### next方法的参数

yield语句本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield语句的返回值。

```javascript

function* f() {
  for(var i=0; true; i++) {
    var reset = yield i;
    if(reset) { i = -1; }
  }
}

var g = f();

g.next() // { value: 0, done: false }
g.next() // { value: 1, done: false }
g.next(true) // { value: 0, done: false }

```

上面代码先定义了一个可以无限运行的Generator函数f，如果next方法没有参数，每次运行到yield语句，变量reset的值总是undefined。当next方法带一个参数true时，当前的变量reset就被重置为这个参数（即true），因此i会等于-1，下一轮循环就会从-1开始递增。

这个功能有很重要的语法意义。Generator函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。通过next方法的参数，就有办法在Generator函数开始运行之后，继续向函数体内部注入值。也就是说，可以在Generator函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。

再看一个例子。

```javascript

function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var it = foo(5);

it.next()
// { value:6, done:false }
it.next(12)
// { value:8, done:false }
it.next(13)
// { value:42, done:true }

```

上面代码第一次调用next方法时，返回`x+1`的值6；第二次调用next方法，将上一次yield语句的值设为12，因此y等于24，返回`y / 3`的值8；第三次调用next方法，将上一次yield语句的值设为13，因此z等于13，这时x等于5，y等于24，所以return语句的值等于42。

注意，由于next方法的参数表示上一个yield语句的返回值，所以第一次使用next方法时，不能带有参数。V8引擎直接忽略第一次使用next方法时的参数，只有从第二次使用next方法开始，参数才是有效的。

### for...of循环

for...of循环可以自动遍历Generator函数，且此时不再需要调用next方法。

```javascript

function *foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5

```

上面代码使用for...of循环，依次显示5个yield语句的值。这里需要注意，一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象，所以上面代码的return语句返回的6，不包括在for...of循环之中。

下面是一个利用generator函数和for...of循环，实现斐波那契数列的例子。

```javascript

function* fibonacci() {
    let [prev, curr] = [0, 1];
    for (;;) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

for (let n of fibonacci()) {
    if (n > 1000) break;
    console.log(n);
}

```

从上面代码可见，使用for...of语句时不需要使用next方法。

### throw方法

Generator函数还有一个特点，它可以在函数体外抛出错误，然后在函数体内捕获。

```javascript

var g = function* () {
    while (true) {
        try {
            yield;
        } catch (e) {
            if (e != 'a') {
                throw e;
            }
            console.log('内部捕获', e);
        }
    }
};

var i = g();
i.next();

try {
    i.throw('a');
    i.throw('b');
} catch (e) {
    console.log('外部捕获', e);
}
// 内部捕获 a
// 外部捕获 b

```

上面代码中，遍历器i连续抛出两个错误。第一个错误被Generator函数体内的catch捕获，然后Generator函数执行完成，于是第二个错误被函数体外的catch捕获。

这种函数体内捕获错误的机制，大大方便了对错误的处理。如果使用回调函数的写法，想要捕获多个错误，就不得不为每个函数写一个错误处理语句。

```javascript

foo('a', function (a) {
    if (a.error) {
        throw new Error(a.error);
    }
 
    foo('b', function (b) {
        if (b.error) {
            throw new Error(b.error);
        }
 
        foo('c', function (c) {
            if (c.error) {
                throw new Error(c.error);
            }
 
            console.log(a, b, c);
        });
    });
});

```

使用Generator函数可以大大简化上面的代码。

```javascript

function* g(){
  try {
        var a = yield foo('a');
        var b = yield foo('b');
        var c = yield foo('c');
    } catch (e) {
        console.log(e);
    }

  console.log(a, b, c);

}

```

如果Generator函数内部没有定义catch，那么throw方法抛出的错误，将被函数体的catch捕获。

```javascript

function *foo() { }

var it = foo();
try {
  it.throw( "Oops!" );
} catch (err) {
    console.log( "Error: " + err ); // Error: Oops!
}

```

上面代码中，foo函数内部没有任何语句，throw抛出的错误被函数体外的catch捕获。

反过来，Generator函数内抛出的错误，也可以被函数体外的catch捕获。

```javascript

function *foo() {
    var x = yield 3;
    var y = x.toUpperCase(); 
    yield y;
}

var it = foo();

it.next(); // { value:3, done:false }

try {
  it.next( 42 ); 
}
catch (err) {
  console.log( err );
}

```

上面代码中，第二个next方法向函数体内传入一个参数42，数值是没有toUpperCase方法的，所以会抛出一个TypeError错误，被函数体外的catch捕获。

一旦Generator执行过程中抛出错误，就不会再执行下去了。如果此后还调用next方法，将一直返回发生错误前的那个值。

```javascript

function* g() {
  yield 1;
  console.log('throwing an exception');
  throw new Error('generator broke!');
  yield 2;
}

function log(generator) {
  var v;
  console.log('starting generator');
  try {
    v = generator.next();
    console.log('got back', v);
  } catch (err) {
    console.log('fixing generator', v);
  }
  try {
    v = generator.next();
    console.log('got back', v);
  } catch (err) {
    console.log('fixing generator', v);
  }
  try {
    v = generator.next();
    console.log('got back', v);
  } catch (err) {
    console.log('fixing generator', v);
  }
  console.log('caller done');
}

log(g());
// starting generator
// got back { value: 1, done: false }
// throwing an exception
// fixing generator { value: 1, done: false }
// fixing generator { value: 1, done: false }
// caller done
 
```

上面代码在Generator函数g抛出错误以后，再调用next方法，就不再执行下去了，一直停留在上一次的状态。

### yield*语句

如果yield命令后面跟的是一个遍历器，需要在yield命令后面加上星号，表明它返回的是一个遍历器。这被称为yield*语句。

```javascript

let delegatedIterator = (function* () {
  yield 'Hello!';
  yield 'Bye!';
}());

let delegatingIterator = (function* () {
  yield 'Greetings!';
  yield* delegatedIterator;
  yield 'Ok, bye.';
}());

for(let value of delegatingIterator) {
  console.log(value);
}
// "Greetings!
// "Hello!"
// "Bye!"
// "Ok, bye."

```

上面代码中，delegatingIterator是代理者，delegatedIterator是被代理者。由于`yield* delegatedIterator`语句得到的值，是一个遍历器，所以要用星号表示。运行结果就是使用一个遍历器，遍历了多个Genertor函数，有递归的效果。

如果`yield*`后面跟着一个数组，就表示该数组会返回一个遍历器，因此就会遍历数组成员。

```javascript

function* gen(){
  yield* ["a", "b", "c"];
}

gen().next() // { value:"a", done:false }

```

上面代码中，yield命令后面如果不加星号，返回的是整个数组，加了星号就表示返回的是数组的遍历器。

如果被代理的Generator函数有return语句，那么就可以向代理它的Generator函数返回数据。

```javascript

function *foo() {
    yield 2;
    yield 3;
    return "foo";
}

function *bar() {
    yield 1;
    var v = yield *foo();
    console.log( "v: " + v );
    yield 4;
}

var it = bar();

it.next(); //
it.next(); //
it.next(); //
it.next(); // "v: foo" 
it.next(); //

```

上面代码在第四次调用next方法的时候，屏幕上会有输出，这是因为函数foo的return语句，向函数bar提供了返回值。

`yield*`命令可以很方便地取出嵌套数组的所有成员。

```javascript

function* iterTree(tree) {
  if (Array.isArray(tree)) {
    for(let i=0; i < tree.length; i++) {
      yield* iterTree(tree[i]);
    }
  } else {
    yield tree;
  }
}

const tree = [ 'a', ['b', 'c'], ['d', 'e'] ];

for(let x of iterTree(tree)) {
  console.log(x);
}
// a
// b
// c
// d
// e

```

下面是一个稍微复杂的例子，使用yield*语句遍历完全二叉树。

```javascript

// 下面是二叉树的构造函数，
// 三个参数分别是左树、当前节点和右树
function Tree(left, label, right) {
  this.left = left;
  this.label = label;
  this.right = right;
}

// 下面是中序（inorder）遍历函数。
// 由于返回的是一个遍历器，所以要用generator函数。
// 函数体内采用递归算法，所以左树和右树要用yield*遍历
function* inorder(t) {
  if (t) {
    yield* inorder(t.left);
    yield t.label;
    yield* inorder(t.right);
  }
}

// 下面生成二叉树
function make(array) {
  // 判断是否为叶节点
  if (array.length == 1) return new Tree(null, array[0], null);
  return new Tree(make(array[0]), array[1], make(array[2]));
}
let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

// 遍历二叉树
var result = [];
for (let node of inorder(tree)) {
  result.push(node); 
}

result
// ['a', 'b', 'c', 'd', 'e', 'f', 'g']

```

### 作为对象属性的Generator函数

如果一个对象的属性是Generator函数，可以简写成下面的形式。

```javascript

let obj = {
  * myGeneratorMethod() {
    ···
  }
};

```

它的完整形式如下，两者是等价的。

```javascript

let obj = {
  myGeneratorMethod: function* () {
    ···
  }
};

```

## 含义

### Generator与状态机

Generator是实现状态机的最佳结构。比如，下面的clock函数就是一个状态机。

```javascript

var ticking = true;
var clock = function() {
  if (ticking)
    console.log('Tick!');
  else
    console.log('Tock!');
  ticking = !ticking;
}

```

上面代码的clock函数一共有两种状态（Tick和Tock），每运行一次，就改变一次状态。这个函数如果用Generator实现，就是下面这样。

```javascript

var clock = function*(_) {
  while (true) {
    yield _;
    console.log('Tick!');
    yield _;
    console.log('Tock!');
  }
};

```

上面的Generator实现与ES5实现对比，可以看到少了用来保存状态的外部变量ticking，这样就更简洁，更安全（状态不会被非法篡改）、更符合函数式编程的思想，在写法上也更优雅。Generator之所以可以不用外部变量保存状态，是因为它本身就包含了一个状态信息，即目前是否处于暂停态。

### Generator与协程

协程（coroutine）是一种程序运行的方式。传统的“子例程”（subroutine）采用堆栈式“后进先出”的执行方式，只有当调用的子函数完全执行完毕，才会结束执行父函数。协程与其不同，多个函数可以并行执行，但是只有一个函数处于正在运行的状态，其他函数都处于暂停态（suspended），函数之间可以交换执行权。也就是说，一个函数执行到一半，可以暂停执行，将执行权交给另一个函数，等到稍后收回执行权的时候，再恢复执行。这种可以并行执行、交换执行权的函数，就称为协程。

不难看出，协程适合用于多任务运行的环境。在这个意义上，它与线程很相似，都有自己的执行上下文、可以分享全局变量。它们的不同之处在于，同一时间可以有多个线程处于运行状态，但是运行的协程只能有一个，其他都处于暂停状态。此外，线程是抢先式的，到底哪个线程优先得到资源，必须由运行环境决定，但是协程是合作式的，执行权由协程自己分配。从实现上看，在内存中，子例程只使用一个栈（stack），而协程是同时存在多个栈，但只有一个栈是在运行状态，也就是说，协程是以多占用内存为代价，实现多任务的并行。

Generator函数是ECMAScript 6对协程的实现，但属于不完全实现，只做到了暂停执行和转移执行权，有一些特性没有实现，比如不支持所调用的函数之中的yield语句（即递归执行yield语句）。

如果将Generator函数看作多任务运行的方式，存在多个进入点和退出点。那么，一方面，并发的多任务可以写成多个Generator函数；另一方面，继发的任务则可以按照发生顺序，写在一个Generator函数之中，然后用一个任务管理函数执行（参考本节的“控制流管理”部分）。

## 应用

Generator可以暂停函数执行，返回任意表达式的值。这种特点使得Generator有多种应用场景。

### （1）异步操作的同步化表达

Generator函数的暂停执行的效果，意味着可以把异步操作写在yield语句里面，等到调用next方法时再往后执行。这实际上等同于不需要写回调函数了，因为异步操作的后续操作可以放在yield语句下面，反正要等到调用next方法时再执行。所以，Generator函数的一个重要实际意义就是用来处理异步操作，改写回调函数。

```javascript

function* loadUI() { 
	showLoadingScreen(); 
	yield loadUIDataAsynchronously(); 
	hideLoadingScreen(); 
} 
var loader = loadUI();
// 加载UI
loader.next() 

// 卸载UI
loader.next()

```

上面代码表示，第一次调用loadUI函数时，该函数不会执行，仅返回一个遍历器。下一次对该遍历器调用next方法，则会显示Loading界面，并且异步加载数据。等到数据加载完成，再一次使用next方法，则会隐藏Loading界面。可以看到，这种写法的好处是所有Loading界面的逻辑，都被封装在一个函数，按部就班非常清晰。

Ajax是典型的异步操作，通过Generator函数部署Ajax操作，可以用同步的方式表达。

```javascript

function* main() {
  var result = yield request("http://some.url");
  var resp = JSON.parse(result);
    console.log(resp.value);
}

function request(url) {
  makeAjaxCall(url, function(response){
    it.next(response);
  });
}

var it = main();
it.next();

```

上面代码的main函数，就是通过Ajax操作获取数据。可以看到，除了多了一个yield，它几乎与同步操作的写法完全一样。注意，makeAjaxCall函数中的next方法，必须加上response参数，因为yield语句构成的表达式，本身是没有值的，总是等于undefined。

下面是另一个例子，通过Generator函数逐行读取文本文件。

```javascript

function* numbers() {
	let file = new FileReader("numbers.txt");
	try {
		while(!file.eof) {
			yield parseInt(file.readLine(), 10);
		}
	} finally {
		file.close();
	}
}

```

上面代码打开文本文件，使用yield语句可以手动逐行读取文件。

### （2）控制流管理

如果有一个多步操作非常耗时，采用回调函数，可能会写成下面这样。

```javascript

step1(function (value1) {
  step2(value1, function(value2) {
    step3(value2, function(value3) {
      step4(value3, function(value4) {
        // Do something with value4
      });
    });
  });
});

```

采用Promise改写上面的代码。

```javascript

Q.fcall(step1)
.then(step2)
.then(step3)
.then(step4)
.then(function (value4) {
    // Do something with value4
}, function (error) {
    // Handle any error from step1 through step4
})
.done();

```

上面代码已经把回调函数，改成了直线执行的形式。Generator函数可以进一步改善代码运行流程。

```javascript

function* longRunningTask() {
  try {	
    var value1 = yield step1();
    var value2 = yield step2(value1);
    var value3 = yield step3(value2);
    var value4 = yield step4(value3);
    // Do something with value4
  } catch (e) {
    // Handle any error from step1 through step4
  }
}

```

然后，使用一个函数，按次序自动执行所有步骤。

```javascript

scheduler(longRunningTask());

function scheduler(task) {
  setTimeout(function () {
    if (!task.next(task.value).done) {
      scheduler(task);
    }
  }, 0);
}

```

注意，yield语句是同步运行，不是异步运行（否则就失去了取代回调函数的设计目的了）。实际操作中，一般让yield语句返回Promise对象。

```javascript

var Q = require('q');
 
function delay(milliseconds) {
  var deferred = Q.defer();
  setTimeout(deferred.resolve, milliseconds);
  return deferred.promise;
}

function* f(){
  yield delay(100);
};

```

上面代码使用Promise的函数库Q，yield语句返回的就是一个Promise对象。

### （3）部署iterator接口

利用Generator函数，可以在任意对象上部署iterator接口。

```javascript

function* iterEntries(obj) {
	let keys = Object.keys(obj);
	for (let i=0; i < keys.length; i++) {
		let key = keys[i];
		yield [key, obj[key]];
	}
}

let myObj = { foo: 3, bar: 7 };

for (let [key, value] of iterEntries(myObj)) {
	console.log(key, value);
}

// foo 3
// bar 7

```

上述代码中，myObj是一个普通对象，通过iterEntries函数，就有了iterator接口。也就是说，可以在任意对象上部署next方法。

下面是一个对数组部署Iterator接口的例子，尽管数组原生具有这个接口。

```javascript

function* makeSimpleGenerator(array){
  var nextIndex = 0;
    
  while(nextIndex < array.length){
    yield array[nextIndex++];
  }
}

var gen = makeSimpleGenerator(['yo', 'ya']);

gen.next().value // 'yo'
gen.next().value // 'ya'
gen.next().done  // true

```

### （4）作为数据结构

Generator可以看作是数据结构，更确切地说，可以看作是一个数组结构，因为Generator函数可以返回一系列的值，这意味着它可以对任意表达式，提供类似数组的接口。

```javascript

function *doStuff() {
  yield fs.readFile.bind(null, 'hello.txt');
  yield fs.readFile.bind(null, 'world.txt');
  yield fs.readFile.bind(null, 'and-such.txt');
}

```

上面代码就是依次返回三个函数，但是由于使用了Generator函数，导致可以像处理数组那样，处理这三个返回的函数。

```javascript

for (task of doStuff()) {
  // task是一个函数，可以像回调函数那样使用它
}

```

实际上，如果用ES5表达，完全可以用数组模拟Generator的这种用法。

```javascript

function doStuff() {
  return [
    fs.readFile.bind(null, 'hello.txt'),
    fs.readFile.bind(null, 'world.txt'),
    fs.readFile.bind(null, 'and-such.txt')
  ];
}

```

上面的函数，可以用一模一样的for...of循环处理！两相一比较，就不难看出Generator使得数据或者操作，具备了类似数组的接口。

