# Generator 函数

## 含义

所谓Generator，简单说，就是一个内部状态的遍历器，即每调用一次遍历器，内部状态发生一次改变（可以理解成发生某些事件）。ES6引入了generator函数，作用就是可以完全控制内部状态的变化，依次遍历这些状态。

generator函数就是普通函数，但是有两个特征。一是，function关键字后面有一个星号；二是，函数体内部使用yield语句，定义遍历器的每个成员（即不同的内部状态）。

```javascript

function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
}

var hw = helloWorldGenerator();

```

上面代码定义了一个generator函数helloWorldGenerator，它的遍历器有两个成员“hello”和“world”。调用这个函数，就会得到遍历器。

当调用generator函数的时候，该函数并不执行，而是返回一个遍历器（可以理解成暂停执行）。以后，每次调用这个遍历器的next方法，就从函数体的头部或者上一次停下来的地方开始执行（可以理解成恢复执行），直到遇到下一个yield语句为止。也就是说，next方法就是在遍历yield语句定义的内部状态。

```javascript

hw.next() 
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: undefined, done: true }

hw.next()
// Error: Generator has already finished
//  ... 

```

上面代码一共调用了四次next方法。

- 第一次调用

函数开始执行，直到遇到第一句yield语句为止。next方法返回一个对象，它的value属性就是当前yield语句的值hello，done属性的值false，表示遍历还没有结束。

- 第二次调用

函数从上次yield语句停下的地方，一直执行到下一个yield语句。next方法返回的对象的value属性就是当前yield语句的值world，done属性的值false，表示遍历还没有结束。

- 第三次调用

函数从上次yield语句停下的地方，一直执行到函数结束。next方法返回的对象的value属性就是函数最后的返回值，由于上例的函数没有return语句（即没有返回值），所以value属性的值为undefined，done属性的值true，表示遍历已经结束。

- 第四次调用

由于此时函数已经运行完毕，next方法直接抛出一个错误。

Generator函数使用iterator接口，每次调用next方法的返回值，就是一个标准的iterator返回值：有着value和done两个属性的对象。其中，value是yield语句后面那个表达式的值，done是一个布尔值，表示是否遍历结束。

Generator函数的本质，其实是提供一种可以暂停执行的函数。yield语句就是暂停标志，next方法遇到yield，就会暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回对象的value属性的值。当下一次调用next方法时，再继续往下执行，直到遇到下一个yield语句。如果没有再遇到新的yield语句，就一直运行到函数结束，将return语句后面的表达式的值，作为value属性的值，如果该函数没有return语句，则value属性的值为undefined。

yield语句与return语句有点像，都能返回紧跟在语句后面的那个表达式的值。区别在于每次遇到yield，函数暂停执行，下一次再从该位置继续向后执行，而return语句不具备位置记忆的功能。

## next方法的参数

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

上面代码先定义了一个可以无限运行的generator函数f，如果next方法没有参数，每次运行到yield语句，变量reset的值总是undefined。当next方法带一个参数true时，当前的变量reset就被重置为这个参数（即true），因此i会等于-1，下一轮循环就会从-1开始递增。

## 异步操作的应用

generator函数的这种暂停执行的效果，意味着可以把异步操作写在yield语句里面，等到调用next方法时再往后执行。这实际上等同于不需要写回调函数了，因为异步操作的后续操作可以放在yield语句下面，反正要等到调用next方法时再执行。所以，generator函数的一个重要实际意义就是用来处理异步操作，改写回调函数。

```javascript

function* loadUI() { 
	showLoadingScreen(); 
	yield loadUIDataAsynchronously(); 
	hideLoadingScreen(); 
} 

// 加载UI
loadUI.next() 

// 卸载UI
loadUI.next()

```

上面代码表示，第一次调用loadUI函数时，该函数不会执行，仅返回一个遍历器。下一次对该遍历器调用next方法，则会显示登录窗口，并且异步加载数据。再一次使用next方法，则会隐藏登录窗口。可以看到，这种写法的好处是所有登录窗口的逻辑，都被封装在一个函数，按部就班非常清晰。

注意，yield语句是同步运行，不是异步运行（否则就失去了取代回调函数的设计目的了）。实际操作中，一般让yield语句返回Promises对象。

```javascript

var Q = require('q');
 
function delay(milliseconds) {
    var deferred = Q.defer();
    setTimeout(deferred.resolve, milliseconds);
    return deferred.promise;
}

function *f(){
    yield delay(100);
};

```

上面代码使用Promise的函数库Q，yield语句返回的就是一个Promise对象。

## for...of循环

for...of循环可以自动遍历Generator函数，且此时不再需要调用next方法。

下面是一个利用generator函数和for...of循环，实现斐波那契数列的例子。

```javascript

function* fibonacci() {
    let [prev, curr] = [0, 1];
    for (;;) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

for (n of fibonacci()) {
    if (n > 1000) break;
    console.log(n);
}

```

从上面代码可见，使用for...of语句时不需要使用next方法。
