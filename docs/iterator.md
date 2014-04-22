# Iterator：遍历器

遍历器（Iterator）是一种协议，任何对象只要部署这个协议，就可以完成遍历操作。在ES6中，遍历操作特指for...of循环。

ES6的遍历器协议规定，部署了next方法的对象，就具备了遍历器功能。next方法必须返回一个包含value和done两个属性的对象。其中，value属性是当前遍历位置的值，done属性是一个布尔值，表示遍历是否结束。

```javascript

function makeIterator(array){
    var nextIndex = 0;

    return {
       next: function(){
           return nextIndex < array.length ?
               {value: array[nextIndex++], done: false} :
               {value: undefined, done: true};
       }
    }
}

var it = makeIterator(['a', 'b']);

it.next().value // 'a'
it.next().value // 'b'
it.next().done  // true

```
上面代码定义了一个makeIterator函数，它的作用是返回一个遍历器对象，用来遍历参数数组。请特别注意，next返回值的构造。

下面是一个无限运行的遍历器例子。

```javascript

function idMaker(){
    var index = 0;
    
    return {
       next: function(){
           return {value: index++, done: false};
       }
    }
}

var it = idMaker();

it.next().value // '0'
it.next().value // '1'
it.next().value // '2'
// ...

```
