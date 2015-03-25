# Promise对象

## 基本用法

ES6原生提供了Promise对象。所谓Promise对象，就是代表了未来某个将要发生的事件（通常是一个异步操作）。它的好处在于，有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象还提供了一整套完整的接口，使得可以更加容易地控制异步操作。Promise对象的概念的详细解释，请参考[《JavaScript标准参考教程》](http://javascript.ruanyifeng.com/)。

ES6的Promise对象是一个构造函数，用来生成Promise实例。下面是Promise对象的基本用法。

```javascript

var promise = new Promise(function(resolve, reject) {
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});

promise.then(function(value) {
  // success
}, function(value) {
  // failure
});

```

上面代码表示，Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve方法和reject方法。如果异步操作成功，则用resolve方法将Promise对象的状态变为“成功”（即从pending变为resolved）；如果异步操作失败，则用reject方法将状态变为“失败”（即从pending变为rejected）。

promise实例生成以后，可以用then方法分别指定resolve方法和reject方法的回调函数。

下面是一个使用Promise对象的简单例子。

```javascript

function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

timeout(100).then(() => {
  console.log('done');
});

```

上面代码的timeout方法返回一个Promise实例对象，表示一段时间以后改变自身状态，从而触发then方法绑定的回调函数。

下面是一个用Promise对象实现的Ajax操作的例子。

```javascript

var getJSON = function(url) {
  var promise = new Promise(function(resolve, reject){
    var client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

    function handler() {
      if (this.status === 200) { 
  			resolve(this.response); 
	  	} else { 
		  	reject(new Error(this.statusText)); 
	  	}
    };
  });

  return promise;
};

getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});

```

上面代码中，resolve方法和reject方法调用时，都带有参数。它们的参数会被传递给回调函数。reject方法的参数通常是Error对象的实例，而resolve方法的参数除了正常的值以外，还可能是另一个Promise实例，比如像下面这样。

```javascript

var p1 = new Promise(function(resolve, reject){
  // ... some code
});

var p2 = new Promise(function(resolve, reject){
  // ... some code
  resolve(p1);
})

```

上面代码中，p1和p2都是Promise的实例，但是p2的resolve方法将p1作为参数，这时p1的状态就会传递给p2。如果调用的时候，p1的状态是pending，那么p2的回调函数就会等待p1的状态改变；如果p1的状态已经是fulfilled或者rejected，那么p2的回调函数将会立刻执行。

## Promise.prototype.then()

Promise.prototype.then方法返回的是一个新的Promise对象，因此可以采用链式写法。

```javascript

getJSON("/posts.json").then(function(json) {
  return json.post;
}).then(function(post) {
  // proceed
});

```

上面的代码使用then方法，依次指定了两个回调函数。第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。

如果前一个回调函数返回的是Promise对象，这时后一个回调函数就会等待该Promise对象有了运行结果，才会进一步调用。

```javascript

getJSON("/post/1.json").then(function(post) {
  return getJSON(post.commentURL);
}).then(function(comments) {
  // 对comments进行处理
});

```

这种设计使得嵌套的异步操作，可以被很容易得改写，从回调函数的“横向发展”改为“向下发展”。

## Promise.prototype.catch()

Promise.prototype.catch方法是`Promise.prototype.then(null, rejection)`的别名，用于指定发生错误时的回调函数。

```javascript

getJSON("/posts.json").then(function(posts) {
  // some code
}).catch(function(error) {
  // 处理前一个回调函数运行时发生的错误
  console.log('发生错误！', error);
});

```

上面代码中，getJSON方法返回一个Promise对象，如果该对象运行正常，则会调用then方法指定的回调函数；如果该方法抛出错误，则会调用catch方法指定的回调函数，处理这个错误。

下面是一个例子。

```javascript

var promise = new Promise(function(resolve, reject) {
  throw new Error('test')
});
promise.catch(function(error) { console.log(error) });
// Error: test

```

上面代码中，Promise抛出一个错误，就被catch方法指定的回调函数捕获。

如果Promise状态已经变成“已完成”，再抛出错误是无效的。

```javascript

var promise = new Promise(function(resolve, reject) {
  resolve("ok");
  throw new Error('test');
});
promise
  .then(function(value) { console.log(value) })
  .catch(function(error) { console.log(error) });
// ok

```

上面代码中，Promise在resolve语句后面，再抛出错误，不会被捕获，等于没有抛出。

Promise对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。

```javascript

getJSON("/post/1.json").then(function(post) {
  return getJSON(post.commentURL);
}).then(function(comments) {
  // some code
}).catch(function(error) {
  // 处理前面三个Promise产生的错误
});

```

上面代码中，一共有三个Promise对象：一个由getJSON产生，两个由then产生。它们之中任何一个抛出的错误，都会被最后一个catch捕获。

跟传统的try/catch代码块不同的是，如果没有使用catch方法指定错误处理的回调函数，Promise对象抛出的错误不会传递到外层代码，即不会有任何反应。

```javascript

var someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().then(function() {
  console.log('everything is great');
});

```

上面代码中，someAsyncThing函数产生的Promise对象会报错，但是由于没有调用catch方法，这个错误不会被捕获，也不会传递到外层代码，导致运行后没有任何输出。

```javascript

var promise = new Promise(function(resolve, reject) {
  resolve("ok");
  setTimeout(function() { throw new Error('test') }, 0)
});
promise.then(function(value) { console.log(value) });
// ok
// Uncaught Error: test

```

上面代码中，Promise指定在下一轮“事件循环”再抛出错误，结果由于没有指定catch语句，就冒泡到最外层，成了未捕获的错误。

需要注意的是，catch方法返回的还是一个Promise对象，因此后面还可以接着调用then方法。

```javascript

var someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().then(function() {
  return someOtherAsyncThing();
}).catch(function(error) {
  console.log('oh no', error);
}).then(function() {
  console.log('carry on');
});
// oh no [ReferenceError: x is not defined]
// carry on

```

上面代码运行完catch方法指定的回调函数，会接着运行后面那个then方法指定的回调函数。

catch方法之中，还能再抛出错误。

```javascript

var someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().then(function() {
  return someOtherAsyncThing();
}).catch(function(error) {
  console.log('oh no', error);
  // 下面一行会报错，因为y没有声明
  y + 2;
}).then(function() {
  console.log('carry on');
});
// oh no [ReferenceError: x is not defined]

```

上面代码中，catch方法抛出一个错误，因为后面没有别的catch方法了，导致这个错误不会被捕获，也不会到传递到外层。如果改写一下，结果就不一样了。

```javascript

someAsyncThing().then(function() {
  return someOtherAsyncThing();
}).catch(function(error) {
  console.log('oh no', error);
  // 下面一行会报错，因为y没有声明
  y + 2;
}).catch(function(error) {
  console.log('carry on', error);
});
// oh no [ReferenceError: x is not defined]
// carry on [ReferenceError: y is not defined]

```

上面代码中，第二个catch方法用来捕获，前一个catch方法抛出的错误。

## Promise.all()，Promise.race()

Promise.all方法用于将多个Promise实例，包装成一个新的Promise实例。

```javascript

var p = Promise.all([p1,p2,p3]);

```

上面代码中，Promise.all方法接受一个数组作为参数，p1、p2、p3都是Promise对象的实例。（Promise.all方法的参数不一定是数组，但是必须具有iterator接口，且返回的每个成员都是Promise实例。）

p的状态由p1、p2、p3决定，分成两种情况。

（1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

下面是一个具体的例子。

```javascript

// 生成一个Promise对象的数组
var promises = [2, 3, 5, 7, 11, 13].map(function(id){
  return getJSON("/post/" + id + ".json");
});

Promise.all(promises).then(function(posts) {
  // ...  
}).catch(function(reason){
  // ...
});

```

Promise.race方法同样是将多个Promise实例，包装成一个新的Promise实例。

```javascript

var p = Promise.race([p1,p2,p3]);

```

上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的Promise实例的返回值，就传递给p的返回值。

如果Promise.all方法和Promise.race方法的参数，不是Promise实例，就会先调用下面讲到的Promise.resolve方法，将参数转为Promise实例，再进一步处理。

## Promise.resolve()，Promise.reject()

有时需要将现有对象转为Promise对象，Promise.resolve方法就起到这个作用。

```javascript

var jsPromise = Promise.resolve($.ajax('/whatever.json'));

```

上面代码将jQuery生成deferred对象，转为一个新的ES6的Promise对象。

如果Promise.resolve方法的参数，不是具有then方法的对象（又称thenable对象），则返回一个新的Promise对象，且它的状态为fulfilled。

```javascript

var p = Promise.resolve('Hello');

p.then(function (s){
  console.log(s)
});
// Hello

```

上面代码生成一个新的Promise对象的实例p，它的状态为fulfilled，所以回调函数会立即执行，Promise.resolve方法的参数就是回调函数的参数。

所以，如果希望得到一个Promise对象，比较方便的方法就是直接调用Promise.resolve方法。

```javascript

var p = Promise.resolve();

p.then(function () {
  // ...
});

```

上面代码的变量p就是一个Promise对象。

如果Promise.resolve方法的参数是一个Promise对象的实例，则会被原封不动地返回。

Promise.reject(reason)方法也会返回一个新的Promise实例，该实例的状态为rejected。Promise.reject方法的参数reason，会被传递给实例的回调函数。

```javascript

var p = Promise.reject('出错了');

p.then(null, function (s){
  console.log(s)
});
// 出错了

```

上面代码生成一个Promise对象的实例p，状态为rejected，回调函数会立即执行。

## Generator函数与Promise的结合

使用Generator函数管理流程，遇到异步操作的时候，通常返回一个Promise对象。

```javascript

function getFoo () {
  return new Promise(function (resolve, reject){
    resolve('foo');
  });
}

var g = function* () {
  try {
    var foo = yield getFoo();
    console.log(foo);
  } catch (e) {
    console.log(e);
  }
};

function run (generator) {
  var it = generator();
   
  function go(result) {
    if (result.done) return result.value;
    
    return result.value.then(function (value) {
      return go(it.next(value));
    }, function (error) {
      return go(it.throw(value));
    });
  }

  go(it.next());
}

run(g);

```

上面代码的Generator函数g之中，有一个异步操作getFoo，它返回的就是一个Promise对象。函数run用来处理这个Promise对象，并调用下一个next方法。

## async函数

### 概述

async函数与Promise、Generator函数一样，是用来取代回调函数、解决异步操作的另一种方法。它可以写出比Promise和Generator更简洁易读的代码，但是依赖这两者来实现。async函数并不属于ES6，而是被列入了ES7，但是traceur、Babel.js、regenerator等转码器已经支持这个功能，转码后立刻就能使用。

在用法上，只要函数名之前加上async关键字，就表明该函数内部有异步操作。该异步操作应该返回一个Promise对象，前面用await关键字注明。当函数执行的时候，一旦遇到await就会先返回，等到触发的异步操作完成，再接着执行函数体内后面的语句。

```javascript

async function getStockPrice(symbol, currency) {
  let price = await getStockPrice(symbol);
  return convert(price, currency);
}

getStockPrice("JNJ")
  .then(
    price => console.log(price),
    error => console.error(error)
  );

```

上面代码是一个获取股票报价的函数，函数前面的async关键字，表明该函数将返回一个Promise对象。调用该函数时，当遇到await关键字，立即返回它后面的表达式（getStockPrice函数）产生的Promise对象，不再执行函数体内后面的语句。等到getStockPrice完成，再自动回到函数体内，执行剩下的语句。

仔细观察getStockPrice函数，你会发现除了添加async、await这两个命令，整个代码与同步操作的流程一模一样。这就是async函数的本意，尽可能地用同步的流程，表达异步操作。

下面是一个更一般性的例子。

```javascript

function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncValue(value) {
  await timeout(50);
  return value;
}

```

上面代码中，asyncValue函数前面有async关键字，表明函数体内有异步操作。执行的时候，遇到await语句就会先返回，等到timeout函数执行完毕，再返回value。

总之，async函数的关键就是，await命令后面，必须是一个返回Promise对象的操作。因为Promise对象的运行结果可能是rejected，所以最好把await命令放在try...catch代码块中。

```javascript

async function myFunction() {
  try {
    await somethingThatReturnsAPromise();
  } catch (err) { 
    console.log(err); 
  }
}

```

await命令只能用在async函数之中，如果用在普通函数，就会报错。

```javascript

async function dbFuc(db) {
  let docs = [{}, {}, {}];

  // 报错
  docs.forEach(function (doc) {
    await db.post(doc);
  });
}

```

上面代码会报错，因为await用在普通函数之中了。但是，如果将forEach方法的参数改成async函数，也有问题。

```javascript

async function dbFuc(db) {
  let docs = [{}, {}, {}];

  // 可能得到错误结果
  docs.forEach(async function (doc) {
    await db.post(doc);
  });
}

```

上面代码可能不会正常工作，原因是这时三个db.post操作将是并发执行，也就是同时执行，而不是继发执行。正确的写法是采用for循环。

```javascript

async function dbFuc(db) {
  let docs = [{}, {}, {}];

  for (let doc of docs) {
    await db.post(doc);
  }
}

```

如果确实希望多个请求并发执行，可以使用Promise.all方法。

```javascript

async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = await Promise.all(promises);
  console.log(results);
}

// 或者使用下面的写法

async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = [];
  for (let promise of promises) {
    results.push(await promise);
  }
  console.log(results);
}

```

ES6将await增加为保留字。使用这个词作为标识符，在ES5是合法的，在ES6将抛出SyntaxError。

### 与Promise、Generator的比较

我们通过一个例子，来看Async函数与Promise、Generator函数的区别。

假定某个DOM元素上面，部署了一系列的动画，前一个动画结束，才能开始后一个。如果当中有一个动画出错，就不再往下执行，返回上一个成功执行的动画的返回值。

首先是Promise的写法。

```javascript

function chainAnimationsPromise(elem, animations) {

  // 变量ret用来保存上一个动画的返回值
  var ret = null;

  // 新建一个空的Promise
  var p = Promise.resolve();

  // 使用then方法，添加所有动画
  for(var anim in animations) {
    p = p.then(function(val) {
      ret = val;
      return anim(elem);
    })
  }

  // 返回一个部署了错误捕捉机制的Promise
  return p.catch(function(e) {
    /* 忽略错误，继续执行 */
  }).then(function() {
    return ret;
  });

}

```

虽然Promise的写法比回调函数的写法大大改进，但是一眼看上去，代码完全都是Promise的API（then、catch等等），操作本身的语义反而不容易看出来。

接着是Generator函数的写法。

```javascript

function chainAnimationsGenerator(elem, animations) {

  return spawn(function*() {
    var ret = null;
    try {
      for(var anim of animations) {
        ret = yield anim(elem);
      }
    } catch(e) { 
      /* 忽略错误，继续执行 */ 
    }
      return ret;
  });

}

```

上面代码使用Generator函数遍历了每个动画，语义比Promise写法更清晰，用户定义的操作全部都出现在spawn函数的内部。这个写法的问题在于，必须有一个任务运行器，自动执行Generator函数，上面代码的spawn函数就是任务运行器，它返回一个Promise对象，而且必须保证yield语句后面的表达式，必须返回一个Promise。下面是spawn函数的代码。

```javascript

function spawn(genF) {
  // 返回一个Promise
  return new Promise(function(resolve, reject) {
    // 执行Generator函数，返回一个遍历器
    var gen = genF();

    // 定义一个函数，执行每一个任务
    function step(nextF) {
      var next;
      try {
        next = nextF();
      } catch(e) {
        // 如果任务执行出错，Promise状态变为已失败
        reject(e); 
        return;
      }
      if(next.done) {
        // 所有任务执行完毕，Promise状态变为已完成
        resolve(next.value);
        return;
      } 
      // 如果还有下一个任务，就继续调用step方法
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });      
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }

    step(function() { return gen.next(undefined); });
  });
}

```

最后是Async函数的写法。

```javascript

async function chainAnimationsAsync(elem, animations) {
  var ret = null;
  try {
    for(var anim of animations) {
      ret = await anim(elem);
    }
  } catch(e) { 
    /* 忽略错误，继续执行 */ 
  }
  return ret;
}

```

可以看到Async函数的实现最简洁，最符合语义，几乎没有语义不相关的代码。它实际上将Generator写法中的任务运行器，改在语言层面提供，因此代码量最少。Generator写法的spawn函数本质是将Generator函数转为Promise对象，Async函数将这个过程在语言内部处理掉了，不暴露给用户。
