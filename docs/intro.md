# ECMAScript 6简介

ECMAScript 6（以下简称ES6）是JavaScript语言的下一代标准，正处在快速开发之中，大部分已经完成了，预计将在2015年6月正式发布。Mozilla公司将在这个标准的基础上，推出JavaScript 2.0。

ES6的目标，是使得JavaScript语言可以用来编写大型的复杂的应用程序，成为企业级开发语言。

## ECMAScript和JavaScript的关系

ECMAScript是JavaScript语言的国际标准，JavaScript是ECMAScript的实现。

1996年11月，JavaScript的创造者Netscape公司，决定将JavaScript提交给国际标准化组织ECMA，希望这种语言能够成为国际标准。次年，ECMA发布262号标准文件（ECMA-262）的第一版，规定了浏览器脚本语言的标准，并将这种语言称为ECMAScript。这个版本就是ECMAScript 1.0版。

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

2015年6月，ECMAScript 6预计将发布正式版本。

ECMA的第39号技术专家委员会（Technical Committee 39，简称TC39）负责制订ECMAScript标准，成员包括Microsoft、Mozilla、Google等大公司。TC39的总体考虑是，ES5与ES3基本保持兼容，较大的语法修正和新功能加入，将由JavaScript.next完成。当前，JavaScript.next指的是ES6，当第六版发布以后，将指ES7。TC39认为，ES5会在2013年的年中成为JavaScript开发的主流标准，并在今后五年中一直保持这个位置。

## 部署进度

由于ES6还没有定案，有些语法规则还会变动，目前支持ES6的软件和开发环境还不多。各大浏览器的最新版本，对ES6的支持可以查看[kangax.github.io/es5-compat-table/es6/](http://kangax.github.io/es5-compat-table/es6/)。

Google公司的V8引擎已经部署了ES6的部分特性。使用Node.js 0.11版，就可以体验这些特性。

Node.js的0.11版还不是稳定版本，要使用版本管理工具[nvm](https://github.com/creationix/nvm)切换。下载nvm以后，进入项目目录，运行下面的命令。

```bash

$ source nvm.sh
$ nvm use 0.11
$ node --harmony

```

启动命令中的`--harmony`选项可以打开所有已经部署的ES6功能。使用下面的命令，可以查看所有与ES6有关的单个选项。

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

## Traceur编译器

Google公司的[Traceur](https://github.com/google/traceur-compiler)编译器，可以将ES6代码编译为ES5代码。这意味着，你可以用ES6的方式编写程序，又不用担心浏览器是否支持。

它有多种使用方式。

**（1）直接插入网页**

Traceur允许将ES6代码直接插入网页。

首先，必须在网页头部加载Traceur库文件。

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

**（2）在线转换**

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

**（3）命令行转换**

作为命令行工具使用时，Traceur是一个node.js的模块，首先需要用npm安装。

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

**（4）Node.js环境的用法**

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

（2）**Multi-Threading**：多线程支持。目前，Intel和Mozilla有一个共同的研究项目RiverTrail，致力于让JavaScript多线程运行。预计这个项目的研究成果会被纳入ECMAScript标准。

（3）**Traits**：它将是“类”功能（class）的一个替代。通过它，不同的对象可以分享同样的特性。

其他可能包括的功能还有：更精确的数值计算、改善的内存回收、增强的跨站点安全、类型化的更贴近硬件的低级别操作、国际化支持（Internationalization Support）、更多的数据结构等等。
