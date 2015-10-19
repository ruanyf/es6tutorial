# ECMAScript 6简介

ECMAScript 6（以下简称ES6）是JavaScript语言的下一代标准，已经在2015年6月正式发布了。它的目标，是使得JavaScript语言可以用来编写复杂的大型应用程序，成为企业级开发语言。

标准的制定者有计划，以后每年发布一次标准，使用年份作为标准的版本。因为当前版本的ES6是在2015年发布的，所以又称ECMAScript 2015。也就是说，ES6就是ES2015。

## ECMAScript和JavaScript的关系

一个常见的问题是，ECMAScript和JavaScript到底是什么关系？

要讲清楚这个问题，需要回顾历史。1996年11月，JavaScript的创造者Netscape公司，决定将JavaScript提交给国际标准化组织ECMA，希望这种语言能够成为国际标准。次年，ECMA发布262号标准文件（ECMA-262）的第一版，规定了浏览器脚本语言的标准，并将这种语言称为ECMAScript，这个版本就是1.0版。

该标准从一开始就是针对JavaScript语言制定的，但是之所以不叫JavaScript，有两个原因。一是商标，Java是Sun公司的商标，根据授权协议，只有Netscape公司可以合法地使用JavaScript这个名字，且JavaScript本身也已经被Netscape公司注册为商标。二是想体现这门语言的制定者是ECMA，不是Netscape，这样有利于保证这门语言的开放性和中立性。

因此，ECMAScript和JavaScript的关系是，前者是后者的规格，后者是前者的一种实现。在日常场合，这两个词是可以互换的。

## ECMAScript的历史

ES6从开始制定到最后发布，整整用了15年。

前面提到，ECMAScript 1.0是1997年发布的，接下来的两年，连续发布了ECMAScript 2.0（1998年6月）和ECMAScript 3.0（1999年12月）。3.0版是一个巨大的成功，在业界得到广泛支持，成为通行标准，奠定了JavaScript语言的基本语法，以后的版本完全继承。直到今天，初学者一开始学习JavaScript，其实就是在学3.0版的语法。

2000年，ECMAScript 4.0开始酝酿。这个版本最后没有通过，但是它的大部分内容被ES6继承了。因此，ES6制定的起点其实是2000年。

为什么ES4没有通过呢？因为这个版本太激进了，对ES3做了彻底升级，导致标准委员会的一些成员不愿意接受。2007年10月，ECMAScript 4.0版草案发布，本来预计次年8月发布正式版本。但是，各方对于是否通过这个标准，发生了严重分歧。以Yahoo、Microsoft、Google为首的大公司，反对JavaScript的大幅升级，主张小幅改动；以JavaScript创造者Brendan Eich为首的Mozilla公司，则坚持当前的草案。

2008年7月，由于对于下一个版本应该包括哪些功能，各方分歧太大，争论过于激进，ECMA开会决定，中止ECMAScript 4.0的开发，将其中涉及现有功能改善的一小部分，发布为ECMAScript 3.1，而将其他激进的设想扩大范围，放入以后的版本，由于会议的气氛，该版本的项目代号起名为Harmony（和谐）。会后不久，ECMAScript 3.1就改名为ECMAScript 5。

2009年12月，ECMAScript 5.0版正式发布。Harmony项目则一分为二，一些较为可行的设想定名为JavaScript.next继续开发，后来演变成ECMAScript 6；一些不是很成熟的设想，则被视为JavaScript.next.next，在更远的将来再考虑推出。

2011年6月，ECMAscript 5.1版发布，并且成为ISO国际标准（ISO/IEC 16262:2011）。

2013年3月，ECMAScript 6草案冻结，不再添加新功能。新的功能设想将被放到ECMAScript 7。

2013年12月，ECMAScript 6草案发布。然后是12个月的讨论期，听取各方反馈。

2015年6月，ECMAScript 6正式通过，成为国际标准。从2000年算起，这时已经过去了15年。

ECMA的第39号技术专家委员会（Technical Committee 39，简称TC39）负责制订ECMAScript标准，成员包括Microsoft、Mozilla、Google等大公司。TC39的总体考虑是，ES5与ES3基本保持兼容，较大的语法修正和新功能加入，将由JavaScript.next完成。当时，JavaScript.next指的是ES6，第六版发布以后，就指ES7。TC39的判断是，ES5会在2013年的年中成为JavaScript开发的主流标准，并在此后五年中一直保持这个位置。

## 部署进度

各大浏览器的最新版本，对ES6的支持可以查看[kangax.github.io/es5-compat-table/es6/](http://kangax.github.io/es5-compat-table/es6/)。随着时间的推移，支持度已经越来越高了，ES6的大部分特性都实现了。

Node.js是JavaScript语言的服务器运行环境，对ES6的支持度比浏览器更高。通过Node，可以体验更多ES6的特性。建议使用版本管理工具[nvm](https://github.com/creationix/nvm)，来安装Node，因为可以自由切换版本。不过，`nvm`不支持Windows系统，如果你使用Windows系统，下面的操作可以改用[nvmw](https://github.com/hakobera/nvmw)或[nvm-windows](https://github.com/coreybutler/nvm-windows)代替。

安装nvm需要打开命令行窗口，运行下面的命令。

```bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/<version number>/install.sh | bash
```

上面命令的`version number`处，需要用版本号替换。本节写作时的版本号是`v0.29.0`。该命令运行后，`nvm`会默认安装在用户主目录的`.nvm`子目录。

然后，激活`nvm`。

```bash
$ source ~/.nvm/nvm.sh
```

激活以后，安装Node的最新版。

```bash
$ nvm install node
```

安装完成后，切换到该版本。

```bash
$ nvm use node
```

使用下面的命令，可以查看Node所有已经实现的ES6特性。

```bash
$ node --v8-options | grep harmony

  --harmony_typeof
  --harmony_scoping
  --harmony_modules
  --harmony_symbols
  --harmony_proxies
  --harmony_collections
  --harmony_observation
  --harmony_generators
  --harmony_iteration
  --harmony_numeric_literals
  --harmony_strings
  --harmony_arrays
  --harmony_maths
  --harmony
```

上面命令的输出结果，会因为版本的不同而有所不同。

我写了一个[ES-Checker](https://github.com/ruanyf/es-checker)模块，用来检查各种运行环境对ES6的支持情况。访问[ruanyf.github.io/es-checker](http://ruanyf.github.io/es-checker)，可以看到您的浏览器支持ES6的程度。运行下面的命令，可以查看本机支持ES6的程度。

```bash
$ npm install -g es-checker
$ es-checker

=========================================
Passes 24 feature Dectations
Your runtime supports 57% of ECMAScript 6
=========================================
```

## Babel转码器

[Babel](https://babeljs.io/)是一个广泛使用的ES6转码器，可以将ES6代码转为ES5代码，从而在浏览器或其他环境执行。这意味着，你可以用ES6的方式编写程序，又不用担心现有环境是否支持。下面是一个例子。

```javascript
// 转码前
input.map(item => item + 1);

// 转码后
input.map(function (item) {
  return item + 1;
});
```

上面的原始代码用了箭头函数，这个特性还没有得到广泛支持，Babel将其转为普通函数，就能在现有的JavaScript环境执行了。

### 命令行环境

命令行下，Babel的安装命令如下。

```bash
$ npm install --global babel
```

Babel自带一个`babel-node`命令，提供支持ES6的REPL环境。它支持Node的REPL环境的所有功能，而且可以直接运行ES6代码。

```bash
$ babel-node
>
> console.log([1,2,3].map(x => x * x))
    [ 1, 4, 9 ]
>
```

`babel-node`命令也可以直接运行ES6脚本。假定将上面的代码放入脚本文件`es6.js`。

```bash
$ babel-node es6.js
[1, 4, 9]
```

babel命令可以将ES6代码转为ES5代码。

```bash
$ babel es6.js
"use strict";

console.log([1, 2, 3].map(function (x) {
  return x * x;
}));
```

`-o`参数将转换后的代码，从标准输出导入文件。

```bash
$ babel es6.js -o es5.js
# 或者
$ babel es6.js --out-file es5.js
```

`-d`参数用于转换整个目录。

```bash
$ babel -d build-dir source-dir
```

注意，`-d`参数后面跟的是输出目录。

如果希望生成source map文件，则要加上`-s`参数。

```bash
$ babel -d build-dir source-dir -s
```

### 浏览器环境

Babel也可以用于浏览器。它的浏览器版本，可以通过安装`babel-core`模块获取。

```bash
$ npm install babel-core
```

运行上面的命令以后，就可以在当前目录的`node_modules/babel-core/`子目录里面，找到`babel`的浏览器版本`browser.js`（未精简）和`browser.min.js`（已精简）。

然后，将下面的代码插入网页。

```html
<script src="node_modules/babel-core/browser.js"></script>
<script type="text/babel">
// Your ES6 code
</script>
```

上面代码中，`browser.js`是Babel提供的转换器脚本，可以在浏览器运行。用户的ES6脚本放在`script`标签之中，但是要注明`type="text/babel"`。

这种写法是实时将ES6代码转为ES5，对网页性能会有影响。生产环境需要加载已经转码完成的脚本。

`Babel`配合`Browserify`一起使用，可以生成浏览器能够直接加载的脚本。

```bash
$ browserify script.js -t babelify --outfile bundle.js
```

上面代码将ES6脚本`script.js`，转为`bundle.js`。浏览器直接加载后者就可以了，不用再加载`browser.js`。

在`package.json`设置下面的代码，就不用每次命令行都输入参数了。

```javascript
{
  // ...
  "browserify": {
    "transform": [
      ["babelify", { "stage": [0] }]
    ]
  }
}
```

### Node环境

Node脚本之中，需要转换ES6脚本，可以像下面这样写。

先安装`babel-core`。

```javascript
$ npm install --save-dev babel-core
```

然后在脚本中，调用`babel-core`的`transform`方法。

```javascript
require("babel-core").transform("code", options);
```

上面代码中，`transform`方法的第一个参数是一个字符串，表示ES6代码。

Node脚本还有一种特殊的`babel`用法，即把`babel`加载为`require`命令的一个钩子。先将`babel`全局安装。

```bash
$ npm install -g babel
```

然后，在你的应用的入口脚本（entry script）头部，加入下面的语句。

```javascript
require("babel/register");
```

有了上面这行语句，后面所有通过`require`命令加载的后缀名为`.es6`、`.es`、`.jsx`和`.js`的脚本，都会先通过`babel`转码后再加载。

## Traceur转码器

Google公司的[Traceur](https://github.com/google/traceur-compiler)转码器，也可以将ES6代码转为ES5代码。

### 直接插入网页

Traceur允许将ES6代码直接插入网页。首先，必须在网页头部加载Traceur库文件。

```javascript
<!-- 加载Traceur编译器 -->
<script src="http://google.github.io/traceur-compiler/bin/traceur.js"
        type="text/javascript"></script>
<!-- 将Traceur编译器用于网页 -->
<script src="http://google.github.io/traceur-compiler/src/bootstrap.js"
        type="text/javascript"></script>
<!-- 打开实验选项，否则有些特性可能编译不成功 -->
<script>
        traceur.options.experimental = true;
</script>
```

接下来，就可以把ES6代码放入上面这些代码的下方。

```javascript
<script type="module">
  class Calc {
    constructor(){
      console.log('Calc constructor');
    }
    add(a, b){
      return a + b;
    }
  }

  var c = new Calc();
  console.log(c.add(4,5));
</script>
```

正常情况下，上面代码会在控制台打印出9。

注意，`script`标签的`type`属性的值是`module`，而不是`text/javascript`。这是Traceur编译器识别ES6代码的标识，编译器会自动将所有`type=module`的代码编译为ES5，然后再交给浏览器执行。

如果ES6代码是一个外部文件，也可以用`script`标签插入网页。

```javascript
<script type="module" src="calc.js" >
</script>
```

### 在线转换

Traceur提供一个[在线编译器](http://google.github.io/traceur-compiler/demo/repl.html)，可以在线将ES6代码转为ES5代码。转换后的代码，可以直接作为ES5代码插入网页运行。

上面的例子转为ES5代码运行，就是下面这个样子。

```javascript
<script src="http://google.github.io/traceur-compiler/bin/traceur.js"
        type="text/javascript"></script>
<script src="http://google.github.io/traceur-compiler/src/bootstrap.js"
        type="text/javascript"></script>
<script>
        traceur.options.experimental = true;
</script>
<script>
$traceurRuntime.ModuleStore.getAnonymousModule(function() {
  "use strict";

  var Calc = function Calc() {
    console.log('Calc constructor');
  };

  ($traceurRuntime.createClass)(Calc, {add: function(a, b) {
    return a + b;
  }}, {});

  var c = new Calc();
  console.log(c.add(4, 5));
  return {};
});
</script>
```

### 命令行转换

作为命令行工具使用时，Traceur是一个Node.js的模块，首先需要用npm安装。

```bash
$ npm install -g traceur
```

安装成功后，就可以在命令行下使用traceur了。

traceur直接运行es6脚本文件，会在标准输出显示运行结果，以前面的calc.js为例。

```bash
$ traceur calc.js
Calc constructor
9
```

如果要将ES6脚本转为ES5保存，要采用下面的写法

```bash
$ traceur --script calc.es6.js --out calc.es5.js
```

上面代码的`--script`选项表示指定输入文件，`--out`选项表示指定输出文件。

为了防止有些特性编译不成功，最好加上`--experimental`选项。

```bash
$ traceur --script calc.es6.js --out calc.es5.js --experimental
```

命令行下转换的文件，就可以放到浏览器中运行。

### Node.js环境的用法

Traceur的Node.js用法如下（假定已安装traceur模块）。

```javascript
var traceur = require('traceur');
var fs = require('fs');

// 将ES6脚本转为字符串
var contents = fs.readFileSync('es6-file.js').toString();

var result = traceur.compile(contents, {
  filename: 'es6-file.js',
  sourceMap: true,
  // 其他设置
  modules: 'commonjs'
});

if (result.error)
  throw result.error;

// result对象的js属性就是转换后的ES5代码
fs.writeFileSync('out.js', result.js);
// sourceMap属性对应map文件
fs.writeFileSync('out.js.map', result.sourceMap);
```

## ECMAScript 7

2013年3月，ES6的草案封闭，不再接受新功能了。新的功能将被加入ES7。

任何人都可以向ES7提案，从提案到变成正式标准，需要经历五个阶段。每个阶段的变动都需要由TC39委员会批准。

- Stage 0 - Strawman（展示阶段）
- Stage 1 - Proposal（征求意见阶段）
- Stage 2 - Draft（草案阶段）
- Stage 3 - Candidate（候选人阶段）
- Stage 4 - Finished（定案阶段）

一个提案只要能进入Stage 2，就差不多等于肯定会包括在ES7里面。

本书的写作目标之一，是跟踪ECMAScript语言的最新进展。对于那些明确的、或者很有希望列入ES7的功能，尤其是那些Babel已经支持的功能，都将予以介绍。

本书介绍的ES7功能清单如下。

**Stage 0**：

- es7.comprehensions：数组推导
- es7.classProperties：类的属性
- es7.functionBind：函数的绑定运算符

**Stage 1**：

- es7.decorators：修饰器
- es7.exportExtensions：export的扩展写法
- es7.trailingFunctionCommas：函数参数的尾逗号

**Stage 2**：

- es7.exponentiationOperator：指数运算符
- es7.asyncFunctions：async函数
- es7.objectRestSpread：对象的Rest参数和扩展运算符

Babel转码器对Stage 2及以上阶段的功能，是默认支持的。对于那些默认没有打开的功能，需要手动打开。

```bash
$ babel --stage 0
$ babel --optional es7.decorators
```

