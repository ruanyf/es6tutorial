# 最新提案

本章介绍一些尚未进入标准、但很有希望的最新提案。

## do 表达式

本质上，块级作用域是一个语句，将多个操作封装在一起，没有返回值。

```javascript
{
  let t = f();
  t = t * t + 1;
}
```

上面代码中，块级作用域将两个语句封装在一起。但是，在块级作用域以外，没有办法得到`t`的值，因为块级作用域不返回值，除非`t`是全局变量。

现在有一个[提案](https://github.com/tc39/proposal-do-expressions)，使得块级作用域可以变为表达式，也就是说可以返回值，办法就是在块级作用域之前加上`do`，使它变为`do`表达式，然后就会返回内部最后执行的表达式的值。

```javascript
let x = do {
  let t = f();
  t * t + 1;
};
```

上面代码中，变量`x`会得到整个块级作用域的返回值（`t * t + 1`）。

`do`表达式的逻辑非常简单：封装的是什么，就会返回什么。

```javascript
// 等同于 <表达式>
do { <表达式>; }

// 等同于 <语句>
do { <语句> }
```

`do`表达式的好处是可以封装多个语句，让程序更加模块化，就像乐高积木那样一块块拼装起来。

```javascript
let x = do {
  if (foo()) { f() }
  else if (bar()) { g() }
  else { h() }
};
```

上面代码的本质，就是根据函数`foo`的执行结果，调用不同的函数，将返回结果赋给变量`x`。使用`do`表达式，就将这个操作的意图表达得非常简洁清晰。而且，`do`块级作用域提供了单独的作用域，内部操作可以与全局作用域隔绝。

值得一提的是，`do`表达式在 JSX 语法中非常好用。

```javascript
return (
  <nav>
    <Home />
    {
      do {
        if (loggedIn) {
          <LogoutButton />
        } else {
          <LoginButton />
        }
      }
    }
  </nav>
)
```

上面代码中，如果不用`do`表达式，就只能用三元判断运算符（`?:`）。那样的话，一旦判断逻辑复杂，代码就会变得很不易读。

## throw 表达式

JavaScript 语法规定`throw`是一个命令，用来抛出错误，不能用于表达式之中。

```javascript
// 报错
console.log(throw new Error());
```

上面代码中，`console.log`的参数必须是一个表达式，如果是一个`throw`语句就会报错。

现在有一个[提案](https://github.com/tc39/proposal-throw-expressions)，允许`throw`用于表达式。

```javascript
// 参数的默认值
function save(filename = throw new TypeError("Argument required")) {
}

// 箭头函数的返回值
lint(ast, {
  with: () => throw new Error("avoid using 'with' statements.")
});

// 条件表达式
function getEncoder(encoding) {
  const encoder = encoding === "utf8" ?
    new UTF8Encoder() :
    encoding === "utf16le" ?
      new UTF16Encoder(false) :
      encoding === "utf16be" ?
        new UTF16Encoder(true) :
        throw new Error("Unsupported encoding");
}

// 逻辑表达式
class Product {
  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value || throw new Error("Invalid value");
  }
}
```

上面代码中，`throw`都出现在表达式里面。

语法上，`throw`表达式里面的`throw`不再是一个命令，而是一个运算符。为了避免与`throw`命令混淆，规定`throw`出现在行首，一律解释为`throw`语句，而不是`throw`表达式。

## Null 传导运算符

编程实务中，如果读取对象内部的某个属性，往往需要判断一下该对象是否存在。比如，要读取`message.body.user.firstName`，安全的写法是写成下面这样。

```javascript
const firstName = (message
  && message.body
  && message.body.user
  && message.body.user.firstName) || 'default';
```

这样的层层判断非常麻烦，因此现在有一个[提案](https://github.com/claudepache/es-optional-chaining)，引入了“Null 传导运算符”（null propagation operator）`?.`，简化上面的写法。

```javascript
const firstName = message?.body?.user?.firstName || 'default';
```

上面代码有三个`?.`运算符，只要其中一个返回`null`或`undefined`，就不再往下运算，而是返回`undefined`。

“Null 传导运算符”有四种用法。

- `obj?.prop` // 读取对象属性
- `obj?.[expr]` // 同上
- `func?.(...args)` // 函数或对象方法的调用
- `new C?.(...args)` // 构造函数的调用

传导运算符之所以写成`obj?.prop`，而不是`obj?prop`，是为了方便编译器能够区分三元运算符`?:`（比如`obj?prop:123`）。

下面是更多的例子。

```javascript
// 如果 a 是 null 或 undefined, 返回 undefined
// 否则返回 a.b.c().d
a?.b.c().d

// 如果 a 是 null 或 undefined，下面的语句不产生任何效果
// 否则执行 a.b = 42
a?.b = 42

// 如果 a 是 null 或 undefined，下面的语句不产生任何效果
delete a?.b
```
