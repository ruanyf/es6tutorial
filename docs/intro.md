# ECMAScript 6简介

ECMAScript 6（以下简称ES6）是JavaScript语言的下一代标准，已经在2015年6月正式发布了。Mozilla公司将在这个标准的基础上，推出JavaScript 2.0。

ES6的目标，是使得JavaScript语言可以用来编写大型的复杂的应用程序，成为企业级开发语言。

标准的制定者有计划，以后每年发布一次标准，使用年份作为标准的版本。因为当前版本的ES6是在2015年发布的，所以又称ECMAScript 2015。

## ECMAScript和JavaScript的关系

很多初学者感到困惑：ECMAScript和JavaScript到底是什么关系？

简单说，ECMAScript是JavaScript语言的国际标准，JavaScript是ECMAScript的实现。

要讲清楚这个问题，需要回顾历史。1996年11月，JavaScript的创造者Netscape公司，决定将JavaScript提交给国际标准化组织ECMA，希望这种语言能够成为国际标准。次年，ECMA发布262号标准文件（ECMA-262）的第一版，规定了浏览器脚本语言的标准，并将这种语言称为ECMAScript。这个版本就是ECMAScript 1.0版。

之所以不叫JavaScript，有两个原因。一是商标，Java是Sun公司的商标，根据授权协议，只有Netscape公司可以合法地使用JavaScript这个名字，且JavaScript本身也已经被Netscape公司注册为商标。二是想体现这门语言的制定者是ECMA，不是Netscape，这样有利于保证这门语言的开放性和中立性。因此，ECMAScript和JavaScript的关系是，前者是后者的规格，后者是前者的一种实现。在日常场合，这两个词是可以互换的。

## ECMAScript的历史

1998年6月，ECMAScript 2.0版发布。

1999年12月，ECMAScript 3.0版发布，成为JavaScript的通行标准，得到了广泛支持。

2007年10月，ECMAScript 4.0版草案发布，对3.0版做了大幅升级，预计次年8月发布正式版本。草案发布后，由于4.0版的目标过于激进，各方对于是否通过这个标准，发生了严重分歧。以Yahoo、Microsoft、Google为首的大公司，反对JavaScript的大幅升级，主张小幅改动；以JavaScript创造者Brendan Eich为首的Mozilla公司，则坚持当前的草案。

2008年7月，由于对于下一个版本应该包括哪些功能，各方分歧太大，争论过于激进，ECMA开会决定，中止ECMAScript 4.0的开发，将其中涉及现有功能改善的一小部分，发布为ECMAScript 3.1，而将其他激进的设想扩大范围，放入以后的版本，由于会议的气氛，该版本的项目代号起名为Harmony（和谐）。会后不久，ECMAScript 3.1就改名为ECMAScript 5。

2009年12月，ECMAScript 5.0版正式发布。Harmony项目则一分为二，一些较为可行的设想定名为JavaScript.next继续开发，后来演变成ECMAScript 6；一些不是很成熟的设想，则被视为JavaScript.next.next，在更远的将来再考虑推出。

2011年6月，ECMAscript 5.1版发布，并且成为ISO国际标准（ISO/IEC 16262:2011）。

2013年3月，ECMAScript 6草案冻结，不再添加新功能。新的功能设想将被放到ECMAScript 7。

2013年12月，ECMAScript 6草案发布。然后是12个月的讨论期，听取各方反馈。

2015年6月，ECMAScript 6正式通过，成为国际标准。

ECMA的第39号技术专家委员会（Technical Committee 39，简称TC39）负责制订ECMAScript标准，成员包括Microsoft、Mozilla、Google等大公司。TC39的总体考虑是，ES5与ES3基本保持兼容，较大的语法修正和新功能加入，将由JavaScript.next完成。当时，JavaScript.next指的是ES6，第六版发布以后，就指ES7。TC39的判断是，ES5会在2013年的年中成为JavaScript开发的主流标准，并在此后五年中一直保持这个位置。

## 部署进度

各大浏览器的最新版本，对ES6的支持可以查看[kangax.github.io/es5-compat-table/es6/](http://kangax.github.io/es5-compat-table/es6/)。随着时间的推移，支持度已经越来越高了，ES6的大部分特性都实现了。

Node.js和io.js（一个部署新功能更快的Node分支）是JavaScript语言的服务器运行环境。它们对ES6的支持度，比浏览器更高。通过它们，可以体验更多ES6的特性。

建议使用版本管理工具[nvm](https://github.com/creationix/nvm)，来安装Node.js和io.js。不过，nvm不支持Windows系统，下面的操作可以改用[nvmw](https://github.com/hakobera/nvmw)或[nvm-windows](https://github.com/coreybutler/nvm-windows)代替。

安装nvm需要打开命令行窗口，运行下面的命令。

```bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/<version number>/install.sh | bash
```

上面命令的version number处，需要用版本号替换。本书写作时的版本号是v0.25.4。

该命令运行后，nvm会默认安装在用户主目录的`.nvm`子目录。然后，激活nvm。

```bash
$ source ~/.nvm/nvm.sh
```

激活以后，安装Node或io.js的最新版。

```bash
$ nvm install node
# 或
$ nvm install iojs
```

安装完成后，就可以在各种版本的node之间自由切换。

```bash
# 切换到node
$ nvm use node

# 切换到iojs
$ nvm use iojs
```

需要注意的是，Node.js对ES6的支持，需要打开harmony参数，iojs不需要。

```
$ node --harmony
# iojs不需要打开harmony参数
$ node
```

上面命令执行后，就会进入REPL环境，该环境支持所有已经实现的ES6特性。

使用下面的命令，可以查看Node.js所有已经实现的ES6特性。

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

它的安装命令如下。

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

Babel也可以用于浏览器。

```html
<script src="node_modules/babel-core/browser.js"></script>
<script type="text/babel">
// Your ES6 code
</script>
```

上面代码中，`browser.js`是Babel提供的转换器脚本，可以在浏览器运行。用户的ES6脚本放在script标签之中，但是要注明`type="text/babel"`。

Babel配合Browserify一起使用，可以生成浏览器能够直接加载的脚本。

```bash
$ browserify script.js -t babelify --outfile bundle.js
```

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
``

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

###  Node.js环境的用法

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

ES7可能包括的功能有：

（1）**Object.observe**：用来监听对象（以及数组）的变化。一旦监听对象发生变化，就会触发回调函数。

（2）**Async函数**：在Promise和Generator函数基础上，提出的异步操作解决方案。

（3）**Multi-Threading**：多线程支持。目前，Intel和Mozilla有一个共同的研究项目RiverTrail，致力于让JavaScript多线程运行。预计这个项目的研究成果会被纳入ECMAScript标准。

（4）**Traits**：它将是“类”功能（class）的一个替代。通过它，不同的对象可以分享同样的特性。

其他可能包括的功能还有：更精确的数值计算、改善的内存回收、增强的跨站点安全、类型化的更贴近硬件的低级别操作、国际化支持（Internationalization Support）、更多的数据结构等等。

本书的写作目标之一，是跟踪ECMAScript语言的最新进展。对于那些明确的、或者很有希望列入ES7的功能，尤其是那些Babel已经支持的功能，都将予以介绍。
