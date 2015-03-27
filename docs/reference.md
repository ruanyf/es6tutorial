# 参考链接

## 官方文件

- [ECMAScript 6 Language Specification](http://people.mozilla.org/~jorendorff/es6-draft.html): 语言规格草案
- [harmony:proposals](http://wiki.ecmascript.org/doku.php?id=harmony:proposals): ES6的各种提案
- [Draft Specification for ES.next (Ecma-262 Edition 6)](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts): ES6草案各版本之间的变动

## 综合介绍

- Sayanee Basu, [Use ECMAScript 6 Today](http://net.tutsplus.com/articles/news/ecmascript-6-today/)
- Ariya Hidayat, [Toward Modern Web Apps with ECMAScript 6](http://www.sencha.com/blog/toward-modern-web-apps-with-ecmascript-6/)
- Dale Schouten, [10 Ecmascript-6 tricks you can perform right now](http://html5hub.com/10-ecmascript-6-tricks-you-can-perform-right-now/)
- Colin Toh, [Lightweight ES6 Features That Pack A Punch](http://colintoh.com/blog/lightweight-es6-features): ES6的一些“轻量级”的特性介绍
- Domenic Denicola, [ES6: The Awesome Parts](http://www.slideshare.net/domenicdenicola/es6-the-awesome-parts)
- Nicholas C. Zakas, [Understanding ECMAScript 6](https://github.com/nzakas/understandinges6)
- Justin Drake, [ECMAScript 6 in Node.JS](https://github.com/JustinDrake/node-es6-examples)
- Ryan Dao, [Summary of ECMAScript 6 major features](http://ryandao.net/portal/content/summary-ecmascript-6-major-features)
- Luke Hoban, [ES6 features](https://github.com/lukehoban/es6features): ES6新语法点的罗列
- Traceur-compiler, [Language Features](https://github.com/google/traceur-compiler/wiki/LanguageFeatures): Traceur文档列出的一些ES6例子
- Axel Rauschmayer, [ECMAScript 6: what’s next for JavaScript?](https://speakerdeck.com/rauschma/ecmascript-6-whats-next-for-javascript-august-2014): 关于ES6新增语法的综合介绍，有很多例子
- Toby Ho, [ES6 in io.js](http://davidwalsh.name/es6-io)
- Guillermo Rauch, [ECMAScript 6](http://rauchg.com/2015/ecmascript-6/)
- Charles King, [The power of ECMAScript 6](http://charlesbking.com/power_of_es6/#/)
- Benjamin De Cock, [Frontend Guidelines](https://github.com/bendc/frontend-guidelines): ES6最佳实践
- Jani Hartikainen, [ES6: What are the benefits of the new features in practice?](http://codeutopia.net/blog/2015/01/06/es6-what-are-the-benefits-of-the-new-features-in-practice/)

## 语法点

- Kyle Simpson, [For and against `let`](http://davidwalsh.name/for-and-against-let): 讨论let命令的作用域
- kangax, [Why `typeof` is no longer “safe”](http://es-discourse.com/t/why-typeof-is-no-longer-safe/15): 讨论在块级作用域内，let命令的变量声明和赋值的行为
- Axel Rauschmayer, [Variables and scoping in ECMAScript 6](http://www.2ality.com/2015/02/es6-scoping.html): 讨论块级作用域与let和const的行为
- Nick Fitzgerald, [Destructuring Assignment in ECMAScript 6](http://fitzgeraldnick.com/weblog/50/): 详细介绍解构赋值的用法
- Nicholas C. Zakas, [Understanding ECMAScript 6 arrow functions](http://www.nczonline.net/blog/2013/09/10/understanding-ecmascript-6-arrow-functions/)
- Jack Franklin, [Real Life ES6 - Arrow Functions](http://javascriptplayground.com/blog/2014/04/real-life-es6-arrow-fn/)
- Axel Rauschmayer, [Handling required parameters in ECMAScript 6](http://www.2ality.com/2014/04/required-parameters-es6.html)
- Axel Rauschmayer, [ECMAScript 6’s new array methods](http://www.2ality.com/2014/05/es6-array-methods.html): 对ES6新增的数组方法的全面介绍
- Dmitry Soshnikov, [ES6 Notes: Default values of parameters](http://dmitrysoshnikov.com/ecmascript/es6-notes-default-values-of-parameters/): 介绍参数的默认值
- Mozilla Developer Network, [WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)：介绍WeakSet数据结构
- Dwayne Charrington, [What Are Weakmaps In ES6?](http://ilikekillnerds.com/2015/02/what-are-weakmaps-in-es6/): WeakMap数据结构介绍
- Axel Rauschmayer, [ECMAScript 6: maps and sets](http://www.2ality.com/2015/01/es6-maps-sets.html): Set和Map结构的详细介绍
- Ragan Wald, [Destructuring and Recursion in ES6](http://raganwald.com/2015/02/02/destructuring.html): rest参数和扩展运算符的详细介绍

## 字符串

- Mathias Bynens, [Unicode-aware regular expressions in ES6](https://mathiasbynens.be/notes/es6-unicode-regex): 详细介绍正则表达式的u修饰符
- Nicholas C. Zakas, [A critical review of ECMAScript 6 quasi-literals](http://www.nczonline.net/blog/2012/08/01/a-critical-review-of-ecmascript-6-quasi-literals/)
- Mozilla Developer Network, [Template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings)
- Addy Osmani, [Getting Literal With ES6 Template Strings](http://updates.html5rocks.com/2015/01/ES6-Template-Strings): 模板字符串的介绍
- Blake Winton, [ES6 Templates](https://weblog.latte.ca/blake/tech/firefox/templates.html): 模板字符串的介绍

## Object

- Nicholas C. Zakas, [Creating defensive objects with ES6 proxies](http://www.nczonline.net/blog/2014/04/22/creating-defensive-objects-with-es6-proxies/)
- Addy Osmani, [Data-binding Revolutions with Object.observe()](http://www.html5rocks.com/en/tutorials/es7/observe/): 介绍Object.observe()的概念
- Sella Rafaeli, [Native JavaScript Data-Binding](http://www.sellarafaeli.com/blog/native_javascript_data_binding): 如何使用Object.observe方法，实现数据对象与DOM对象的双向绑定
- Axel Rauschmayer, [Symbols in ECMAScript 6](http://www.2ality.com/2014/12/es6-symbols.html): Symbol简介
- Axel Rauschmayer, [Meta programming with ECMAScript 6 proxies](http://www.2ality.com/2014/12/es6-proxies.html): Proxy详解
- Daniel Zautner, [Meta-programming JavaScript Using Proxies](http://dzautner.com/meta-programming-javascript-using-proxies/): 使用Proxy实现元编程
- MDN, [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol): Symbol类型的详细介绍

## Iterator和Generator

- Mozilla Developer Network, [Iterators and generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)
- Mozilla Developer Network, [The Iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/The_Iterator_protocol)
- Matt Baker, [Replacing callbacks with ES6 Generators](http://flippinawesome.org/2014/02/10/replacing-callbacks-with-es6-generators/)
- Steven Sanderson, [Experiments with Koa and JavaScript Generators](http://blog.stevensanderson.com/2013/12/21/experiments-with-koa-and-javascript-generators/)
- jmar777, [What's the Big Deal with Generators?](http://devsmash.com/blog/whats-the-big-deal-with-generators)
- Marc Harter, [Generators in Node.js: Common Misconceptions and Three Good Use Cases](http://strongloop.com/strongblog/how-to-generators-node-js-yield-use-cases/): 讨论Generator函数的作用
- Axel Rauschmayer, [Iterators and generators in ECMAScript 6](http://www.2ality.com/2013/06/iterators-generators.html): 探讨Iterator和Generator的设计目的
- Axel Rauschmayer, [Iterables and iterators in ECMAScript 6](http://www.2ality.com/2015/02/es6-iteration.html): Iterator的详细介绍
- StackOverflow, [ES6 yield : what happens to the arguments of the first call next()?](http://stackoverflow.com/questions/20977379/es6-yield-what-happens-to-the-arguments-of-the-first-call-next): 第一次使用next方法时不能带有参数
- Kyle Simpson, [ES6 Generators: Complete Series](http://davidwalsh.name/es6-generators): 由浅入深探讨Generator的系列文章，共四篇
- Gajus Kuizinas, [The Definitive Guide to the JavaScript Generators](http://gajus.com/blog/2/the-definetive-guide-to-the-javascript-generators): 对Generator的综合介绍
- Jan Krems, [Generators Are Like Arrays](https://gist.github.com/jkrems/04a2b34fb9893e4c2b5c): 讨论Generator可以被当作数据结构看待
- Harold Cooper, [Coroutine Event Loops in Javascript](http://syzygy.st/javascript-coroutines/): Generator用于实现状态机
- Ruslan Ismagilov, [learn-generators](https://github.com/isRuslan/learn-generators): 编程练习，共6道题
- Kyle Simpson, [Iterating ES6 Numbers](http://blog.getify.com/iterating-es6-numbers/): 在数值对象上部署遍历器

## Promise对象

- Jake Archibald, [JavaScript Promises: There and back again](http://www.html5rocks.com/en/tutorials/es6/promises/)
- Tilde, [rsvp.js](https://github.com/tildeio/rsvp.js)
- Sandeep Panda, [An Overview of JavaScript Promises](http://www.sitepoint.com/overview-javascript-promises/): ES6 Promise入门介绍
- Jafar Husain, [Async Generators](https://docs.google.com/file/d/0B4PVbLpUIdzoMDR5dWstRllXblU/view?sle=true): 对async与Generator混合使用的一些讨论
- Axel Rauschmayer, [ECMAScript 6 promises (2/2): the API](http://www.2ality.com/2014/10/es6-promises-api.html): 对ES6 Promise规格和用法的详细介绍
- Jack Franklin, [Embracing Promises in JavaScript](http://javascriptplayground.com/blog/2015/02/promises/): catch方法的例子
- Luke Hoban, [Async Functions for ECMAScript](https://github.com/lukehoban/ecmascript-asyncawait): Async函数的设计思想，与Promise、Gernerator函数的关系
- Jafar Husain, [Asynchronous Generators for ES7](https://github.com/jhusain/asyncgenerator): Async函数的深入讨论
- Nolan Lawson, [Taming the asynchronous beast with ES7](http://pouchdb.com/2015/03/05/taming-the-async-beast-with-es7.html): async函数通俗的实例讲解

## Class与模块

- Sebastian Porto, [ES6 classes and JavaScript prototypes](https://reinteractive.net/posts/235-es6-classes-and-javascript-prototypes): ES6 Class的写法与ES5 Prototype的写法对比
- Jack Franklin, [An introduction to ES6 classes](http://javascriptplayground.com/blog/2014/07/introduction-to-es6-classes-tutorial/): ES6 class的入门介绍
- Jack Franklin, [JavaScript Modules the ES6 Way](http://24ways.org/2014/javascript-modules-the-es6-way/): ES6模块入门
- Axel Rauschmayer, [ECMAScript 6 modules: the final syntax](http://www.2ality.com/2014/09/es6-modules-final.html): ES6模块的介绍，以及与CommonJS规格的详细比较
- Dave Herman, [Static module resolution](http://calculist.org/blog/2012/06/29/static-module-resolution/): ES6模块的静态化设计思想
- Axel Rauschmayer, [ECMAScript 6: new OOP features besides classes](http://www.2ality.com/2014/12/es6-oop.html)
- Axel Rauschmayer, [Classes in ECMAScript 6 (final semantics)](http://www.2ality.com/2015/02/es6-classes-final.html): Class语法的详细介绍和设计思想分析

## 工具

- Google, [traceur-compiler](https://github.com/google/traceur-compiler): Traceur编译器
- Casper Beyer, [ECMAScript 6 Features and Tools](http://caspervonb.github.io/2014/03/05/ecmascript6-features-and-tools.html)
- Stoyan Stefanov, [Writing ES6 today with jstransform](http://www.phpied.com/writing-es6-today-with-jstransform/)
- ES6 Module Loader, [ES6 Module Loader Polyfill](https://github.com/ModuleLoader/es6-module-loader): 在浏览器和node.js加载ES6模块的一个库，文档里对ES6模块有详细解释
- Paul Miller, [es6-shim](https://github.com/paulmillr/es6-shim): 一个针对老式浏览器，模拟ES6部分功能的垫片库（shim）
- army8735, [Javascript Downcast](https://github.com/army8735/jsdc): 国产的ES6到ES5的转码器
- esnext, [ES6 Module Transpiler](https://github.com/esnext/es6-module-transpiler)：基于node.js的将ES6模块转为ES5代码的命令行工具
- Sebastian McKenzie, [BabelJS](http://babeljs.io/): ES6转译器
- SystemJS, [SystemJS](https://github.com/systemjs/systemjs): 在浏览器中加载AMD、CJS、ES6模块的一个垫片库
- Modernizr, [HTML5 Cross Browser Polyfills](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills#ecmascript-6-harmony): ES6垫片库清单
- Facebook, [regenerator](https://github.com/facebook/regenerator): 将Generator函数转为ES5的转码器
