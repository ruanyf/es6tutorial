# 异步操作

## co函数库

如果并发执行异步操作，可以将异步操作都放入一个数组，跟在yield语句后面。

```javascript
co(function* () {
  var values = [n1, n2, n3];
  yield values.map(somethingAsync);
});

function* somethingAsync(x) {
  // do something async
  return y
}
```

上面的代码允许并发三个somethingAsync异步操作，等到它们全部完成，才会进行下一步。
