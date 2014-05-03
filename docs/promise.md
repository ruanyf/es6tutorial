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
      if (this.readyState === this.DONE) {
        if (this.status === 200) { resolve(this.response); }
        else { reject(this); }
      }
    };
  });

  return promise;
};

getJSON("/posts.json").then(function(json) {
  // continue
}, function(error) {
  // handle errors
});

```

## 链式操作

then方法返回的是一个新的Promise对象，因此可以采用链式写法。

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

## catch方法：捕捉错误

catch方法是then(null, rejection)的别名，用于指定发生错误时的回调函数。

```javascript

getJSON("/posts.json").then(function(posts) {
  // some code
}).catch(function(error) {
  // 处理前一个回调函数运行时发生的错误
});

```

Promise对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。

```javascript

getJSON("/post/1.json").then(function(post) {
  return getJSON(post.commentURL);
}).then(function(comments) {
  // some code
}).catch(function(error) {
  // 处理前两个回调函数的错误
});

```

## Promise.all方法

Promise.all方法用于将多个异步操作（或Promise对象），包装成一个新的Promise对象。当这些异步操作都完成后，新的Promise对象的状态才会变为fulfilled；只要其中一个异步操作失败，新的Promise对象的状态就会变为rejected。

```javascript

// 生成一个promise对象的数组
var promises = [2, 3, 5, 7, 11, 13].map(function(id){
  return getJSON("/post/" + id + ".json");
});

Promise.all(promises).then(function(posts) {
  // ...  
}).catch(function(reason){
  // ...
});

```

## Promise.resolve方法

有时需要将现有对象转为Promise对象，Promise.resolve方法就起到这个作用。

```javascript

var jsPromise = Promise.resolve($.ajax('/whatever.json'));

```

上面代码将jQuery生成deferred对象，转为一个新的ES6的Promise对象。

如果Promise.resolve方法的参数，不是具有then方法的对象（又称thenable对象），则返回一个新的Promise对象，且它的状态为resolved。

```javascript

var p = Promise.resolve('Hello');

p.then(function (s){
  console.log(s)
});
// Hello

```

上面代码生成一个新的Promise对象，它的状态为fulfilled，所以回调函数会立即执行，Promise.resolve方法的参数就是回调函数的参数。

## async函数

async函数是用来取代回调函数的另一种方法。

只要函数名之前加上async关键字，就表明该函数内部有异步操作。该异步操作应该返回一个promise对象，前面用await关键字注明。当函数执行的时候，一旦遇到await就会先返回，等到触发的异步操作完成，再接着执行函数体内后面的语句。

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

(async function() {
  var value = await asyncValue(42);
  assert.equal(42, value);
  done();
})();

```

上面代码中，asyncValue函数前面有async关键字，表明函数体内有异步操作。执行的时候，遇到await语句就会先返回，等到timeout函数执行完毕，再返回value。后面的匿名函数前也有async关键字，表明该函数也需要暂停，等到await后面的`asyncValue(42)`得到值以后，再执行后面的语句。

async函数并不属于ES6，而是被列入了ES7，但是traceur编译器已经实现了这个功能。
