# 参考链接

## 官方文件

- [ECMAScript® 2015 Language Specification](http://www.ecma-international.org/ecma-262/6.0/index.html): ECMAScript 2015规格
- [ECMAScript® 2016 Language Specification](http://www.ecma-international.org/ecma-262/7.0/): ECMAScript 2016规格
- [ECMAScript® 2017 Language Specification](https://tc39.github.io/ecma262/)：ECMAScript 2017规格（草案）
- [ECMAScript Current Proposals](https://github.com/tc39/ecma262): ECMAScript当前的所有提案
- [ECMAScript Active Proposals](https://github.com/tc39/proposals): 已经进入正式流程的提案
- [ECMAscript proposals](https://github.com/hemanth/es-next)：从阶段0到阶段4的所有提案列表
- [ECMAScript Daily](https://ecmascript-daily.github.io/): TC39委员会的动态

## 综合介绍

- Axel Rauschmayer, [Exploring ES6: Upgrade to the next version of JavaScript](http://exploringjs.com/es6/): ES6的专著，本书的许多代码实例来自该书
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
- Axel Rauschmayer, [Getting started with ECMAScript 6](http://www.2ality.com/2015/08/getting-started-es6.html): ES6语法点的综合介绍
- Toby Ho, [ES6 in io.js](http://davidwalsh.name/es6-io)
- Guillermo Rauch, [ECMAScript 6](http://rauchg.com/2015/ecmascript-6/)
- Charles King, [The power of ECMAScript 6](http://charlesbking.com/power_of_es6/#/)
- Benjamin De Cock, [Frontend Guidelines](https://github.com/bendc/frontend-guidelines): ES6最佳实践
- Jani Hartikainen, [ES6: What are the benefits of the new features in practice?](http://codeutopia.net/blog/2015/01/06/es6-what-are-the-benefits-of-the-new-features-in-practice/)
- kangax, [Javascript quiz. ES6 edition](http://perfectionkills.com/javascript-quiz-es6/): ES6小测试
- Jeremy Fairbank, [HTML5DevConf ES7 and Beyond!](https://speakerdeck.com/jfairbank/html5devconf-es7-and-beyond): ES7新增语法点介绍

## let和const

- Kyle Simpson, [For and against let](http://davidwalsh.name/for-and-against-let): 讨论let命令的作用域
- kangax, [Why typeof is no longer “safe”](http://es-discourse.com/t/why-typeof-is-no-longer-safe/15): 讨论在块级作用域内，let命令的变量声明和赋值的行为
- Axel Rauschmayer, [Variables and scoping in ECMAScript 6](http://www.2ality.com/2015/02/es6-scoping.html): 讨论块级作用域与let和const的行为
- Nicolas Bevacqua, [ES6 Let, Const and the “Temporal Dead Zone” (TDZ) in Depth](http://ponyfoo.com/articles/es6-let-const-and-temporal-dead-zone-in-depth)
- acorn, [Function statements in strict mode](https://github.com/ternjs/acorn/issues/118): 块级作用域对严格模式的函数声明的影响

## 解构赋值

- Nick Fitzgerald, [Destructuring Assignment in ECMAScript 6](http://fitzgeraldnick.com/weblog/50/): 详细介绍解构赋值的用法
- Nicholas C. Zakas, [ECMAScript 6 destructuring gotcha](https://www.nczonline.net/blog/2015/10/ecmascript-6-destructuring-gotcha/)

## 字符串

- Nicholas C. Zakas, [A critical review of ECMAScript 6 quasi-literals](http://www.nczonline.net/blog/2012/08/01/a-critical-review-of-ecmascript-6-quasi-literals/)
- Mozilla Developer Network, [Template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings)
- Addy Osmani, [Getting Literal With ES6 Template Strings](http://updates.html5rocks.com/2015/01/ES6-Template-Strings): 模板字符串的介绍
- Blake Winton, [ES6 Templates](https://weblog.latte.ca/blake/tech/firefox/templates.html): 模板字符串的介绍
- Peter Jaszkowiak, [How to write a template compiler in JavaScript](https://medium.com/@PitaJ/how-to-write-a-template-compiler-in-javascript-f174df6f32f): 使用模板字符串，编写一个模板编译函数
- Axel Rauschmayer, [ES.stage3: string padding](http://www.2ality.com/2015/11/string-padding.html)

## 正则

- Mathias Bynens, [Unicode-aware regular expressions in ES6](https://mathiasbynens.be/notes/es6-unicode-regex): 详细介绍正则表达式的u修饰符
- Axel Rauschmayer, [New regular expression features in ECMAScript 6](http://www.2ality.com/2015/07/regexp-es6.html)：ES6正则特性的详细介绍
- Yang Guo, [RegExp lookbehind assertions](http://v8project.blogspot.jp/2016/02/regexp-lookbehind-assertions.html)：介绍后行断言

## 数值

- Nicolas Bevacqua, [ES6 Number Improvements in Depth](http://ponyfoo.com/articles/es6-number-improvements-in-depth)

## 数组

- Axel Rauschmayer, [ECMAScript 6’s new array methods](http://www.2ality.com/2014/05/es6-array-methods.html): 对ES6新增的数组方法的全面介绍
- TC39, [Array.prototype.includes](https://github.com/tc39/Array.prototype.includes/): 数组的includes方法的规格
- Axel Rauschmayer, [ECMAScript 6: holes in Arrays](http://www.2ality.com/2015/09/holes-arrays-es6.html): 数组的空位问题

## 函数

- Nicholas C. Zakas, [Understanding ECMAScript 6 arrow functions](http://www.nczonline.net/blog/2013/09/10/understanding-ecmascript-6-arrow-functions/)
- Jack Franklin, [Real Life ES6 - Arrow Functions](http://javascriptplayground.com/blog/2014/04/real-life-es6-arrow-fn/)
- Axel Rauschmayer, [Handling required parameters in ECMAScript 6](http://www.2ality.com/2014/04/required-parameters-es6.html)
- Dmitry Soshnikov, [ES6 Notes: Default values of parameters](http://dmitrysoshnikov.com/ecmascript/es6-notes-default-values-of-parameters/): 介绍参数的默认值
- Ragan Wald, [Destructuring and Recursion in ES6](http://raganwald.com/2015/02/02/destructuring.html): rest参数和扩展运算符的详细介绍
- Axel Rauschmayer, [The names of functions in ES6](http://www.2ality.com/2015/09/function-names-es6.html): 函数的name属性的详细介绍
- Kyle Simpson, [Arrow This](http://blog.getify.com/arrow-this/): 箭头函数并没有自己的this
- Derick Bailey, [Do ES6 Arrow Functions Really Solve “this” In JavaScript?](http://derickbailey.com/2015/09/28/do-es6-arrow-functions-really-solve-this-in-javascript/)：使用箭头函数处理this指向，必须非常小心
- Mark McDonnell, [Understanding recursion in functional JavaScript programming](http://www.integralist.co.uk/posts/js-recursion.html): 如何自己实现尾递归优化

## 对象

- Addy Osmani, [Data-binding Revolutions with Object.observe()](http://www.html5rocks.com/en/tutorials/es7/observe/): 介绍Object.observe()的概念
- Sella Rafaeli, [Native JavaScript Data-Binding](http://www.sellarafaeli.com/blog/native_javascript_data_binding): 如何使用Object.observe方法，实现数据对象与DOM对象的双向绑定
- Axel Rauschmayer, [`__proto__` in ECMAScript 6](http://www.2ality.com/2015/09/proto-es6.html)
- Axel Rauschmayer, [Enumerability in ECMAScript 6](http://www.2ality.com/2015/10/enumerability-es6.html)
- Axel Rauschmayer, [ES proposal: Object.getOwnPropertyDescriptors()](http://www.2ality.com/2016/02/object-getownpropertydescriptors.html)
- TC39, [Object.getOwnPropertyDescriptors Proposal](https://github.com/tc39/proposal-object-getownpropertydescriptors)

## Proxy和Reflect

- Nicholas C. Zakas, [Creating defensive objects with ES6 proxies](http://www.nczonline.net/blog/2014/04/22/creating-defensive-objects-with-es6-proxies/)
- Axel Rauschmayer, [Meta programming with ECMAScript 6 proxies](http://www.2ality.com/2014/12/es6-proxies.html): Proxy详解
- Daniel Zautner, [Meta-programming JavaScript Using Proxies](http://dzautner.com/meta-programming-javascript-using-proxies/): 使用Proxy实现元编程
- Tom Van Cutsem, [Harmony-reflect](https://github.com/tvcutsem/harmony-reflect/wiki): Reflect对象的设计目的
- Tom Van Cutsem, [Proxy Traps](https://github.com/tvcutsem/harmony-reflect/blob/master/doc/traps.md)：Proxy拦截操作一览
- Tom Van Cutsem, [Reflect API](https://github.com/tvcutsem/harmony-reflect/blob/master/doc/api.md)
- Tom Van Cutsem, [Proxy Handler API](https://github.com/tvcutsem/harmony-reflect/blob/master/doc/handler_api.md)
- Nicolas Bevacqua, [ES6 Proxies in Depth](http://ponyfoo.com/articles/es6-proxies-in-depth)
- Nicolas Bevacqua, [ES6 Proxy Traps in Depth](http://ponyfoo.com/articles/es6-proxy-traps-in-depth)
- Nicolas Bevacqua, [More ES6 Proxy Traps in Depth](http://ponyfoo.com/articles/more-es6-proxy-traps-in-depth)

## Symbol

- Axel Rauschmayer, [Symbols in ECMAScript 6](http://www.2ality.com/2014/12/es6-symbols.html): Symbol简介
- MDN, [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol): Symbol类型的详细介绍
- Jason Orendorff, [ES6 In Depth: Symbols](https://hacks.mozilla.org/2015/06/es6-in-depth-symbols/)
- Keith Cirkel, [Metaprogramming in ES6: Symbols and why they're awesome](http://blog.keithcirkel.co.uk/metaprogramming-in-es6-symbols/): Symbol的深入介绍
- Axel Rauschmayer, [Customizing ES6 via well-known symbols](http://www.2ality.com/2015/09/well-known-symbols-es6.html)
- Derick Bailey, [Creating A True Singleton In Node.js, With ES6 Symbols](https://derickbailey.com/2016/03/09/creating-a-true-singleton-in-node-js-with-es6-symbols/)

## 二进制数组

- Ilmari Heikkinen, [Typed Arrays: Binary Data in the Browser](http://www.html5rocks.com/en/tutorials/webgl/typed_arrays/)
- Khronos, [Typed Array Specification](http://www.khronos.org/registry/typedarray/specs/latest/)
- Ian Elliot, [Reading A BMP File In JavaScript](http://www.i-programmer.info/projects/36-web/6234-reading-a-bmp-file-in-javascript.html)	
- Renato Mangini, [How to convert ArrayBuffer to and from String](http://updates.html5rocks.com/2012/06/How-to-convert-ArrayBuffer-to-and-from-String)
- Axel Rauschmayer, [Typed Arrays in ECMAScript 6](http://www.2ality.com/2015/09/typed-arrays.html)

## Set和Map

- Mozilla Developer Network, [WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)：介绍WeakSet数据结构
- Dwayne Charrington, [What Are Weakmaps In ES6?](http://ilikekillnerds.com/2015/02/what-are-weakmaps-in-es6/): WeakMap数据结构介绍
- Axel Rauschmayer, [ECMAScript 6: maps and sets](http://www.2ality.com/2015/01/es6-maps-sets.html): Set和Map结构的详细介绍
- Jason Orendorff, [ES6 In Depth: Collections](https://hacks.mozilla.org/2015/06/es6-in-depth-collections/)：Set和Map结构的设计思想
- Axel Rauschmayer, [Converting ES6 Maps to and from JSON](http://www.2ality.com/2015/08/es6-map-json.html): 如何将Map与其他数据结构互相转换

## Iterator

- Mozilla Developer Network, [Iterators and generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)
- Mozilla Developer Network, [The Iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/The_Iterator_protocol)
- Jason Orendorff, [ES6 In Depth: Iterators and the for-of loop](https://hacks.mozilla.org/2015/04/es6-in-depth-iterators-and-the-for-of-loop/): 遍历器与for...of循环的介绍
- Axel Rauschmayer, [Iterators and generators in ECMAScript 6](http://www.2ality.com/2013/06/iterators-generators.html): 探讨Iterator和Generator的设计目的
- Axel Rauschmayer, [Iterables and iterators in ECMAScript 6](http://www.2ality.com/2015/02/es6-iteration.html): Iterator的详细介绍
- Kyle Simpson, [Iterating ES6 Numbers](http://blog.getify.com/iterating-es6-numbers/): 在数值对象上部署遍历器

## Generator

- Matt Baker, [Replacing callbacks with ES6 Generators](http://flippinawesome.org/2014/02/10/replacing-callbacks-with-es6-generators/)
- Steven Sanderson, [Experiments with Koa and JavaScript Generators](http://blog.stevensanderson.com/2013/12/21/experiments-with-koa-and-javascript-generators/)
- jmar777, [What's the Big Deal with Generators?](http://devsmash.com/blog/whats-the-big-deal-with-generators)
- Marc Harter, [Generators in Node.js: Common Misconceptions and Three Good Use Cases](http://strongloop.com/strongblog/how-to-generators-node-js-yield-use-cases/): 讨论Generator函数的作用
- StackOverflow, [ES6 yield : what happens to the arguments of the first call next()?](http://stackoverflow.com/questions/20977379/es6-yield-what-happens-to-the-arguments-of-the-first-call-next): 第一次使用next方法时不能带有参数
- Kyle Simpson, [ES6 Generators: Complete Series](http://davidwalsh.name/es6-generators): 由浅入深探讨Generator的系列文章，共四篇
- Gajus Kuizinas, [The Definitive Guide to the JavaScript Generators](http://gajus.com/blog/2/the-definetive-guide-to-the-javascript-generators): 对Generator的综合介绍
- Jan Krems, [Generators Are Like Arrays](https://gist.github.com/jkrems/04a2b34fb9893e4c2b5c): 讨论Generator可以被当作数据结构看待
- Harold Cooper, [Coroutine Event Loops in Javascript](http://syzygy.st/javascript-coroutines/): Generator用于实现状态机
- Ruslan Ismagilov, [learn-generators](https://github.com/isRuslan/learn-generators): 编程练习，共6道题
- Steven Sanderson, [Experiments with Koa and JavaScript Generators](http://blog.stevensanderson.com/2013/12/21/experiments-with-koa-and-javascript-generators/): Generator入门介绍，以Koa框架为例
- Mahdi Dibaiee, [ES7 Array and Generator comprehensions](http://dibaiee.ir/es7-array-generator-comprehensions/)：ES7的Generator推导
- Nicolas Bevacqua, [ES6 Generators in Depth](http://ponyfoo.com/articles/es6-generators-in-depth)
- Axel Rauschmayer, [ES6 generators in depth](http://www.2ality.com/2015/03/es6-generators.html): Generator规格的详尽讲解
- Derick Bailey, [Using ES6 Generators To Short-Circuit Hierarchical Data Iteration](https://derickbailey.com/2015/10/05/using-es6-generators-to-short-circuit-hierarchical-data-iteration/)：使用 for...of 循环完成预定的操作步骤

## Promise对象

- Jake Archibald, [JavaScript Promises: There and back again](http://www.html5rocks.com/en/tutorials/es6/promises/)
- Tilde, [rsvp.js](https://github.com/tildeio/rsvp.js)
- Sandeep Panda, [An Overview of JavaScript Promises](http://www.sitepoint.com/overview-javascript-promises/): ES6 Promise入门介绍
- Dave Atchley, [ES6 Promises](http://www.datchley.name/es6-promises/): Promise的语法介绍
- Axel Rauschmayer, [ECMAScript 6 promises (2/2): the API](http://www.2ality.com/2014/10/es6-promises-api.html): 对ES6 Promise规格和用法的详细介绍
- Jack Franklin, [Embracing Promises in JavaScript](http://javascriptplayground.com/blog/2015/02/promises/): catch方法的例子
- Ronald Chen, [How to escape Promise Hell](https://medium.com/@pyrolistical/how-to-get-out-of-promise-hell-8c20e0ab0513#.2an1he6vf): 如何使用`Promise.all`方法的一些很好的例子

## 异步操作和Async函数

- Luke Hoban, [Async Functions for ECMAScript](https://github.com/lukehoban/ecmascript-asyncawait): Async函数的设计思想，与Promise、Gernerator函数的关系
- Jafar Husain, [Asynchronous Generators for ES7](https://github.com/jhusain/asyncgenerator): Async函数的深入讨论
- Nolan Lawson, [Taming the asynchronous beast with ES7](http://pouchdb.com/2015/03/05/taming-the-async-beast-with-es7.html): async函数通俗的实例讲解
- Jafar Husain, [Async Generators](https://docs.google.com/file/d/0B4PVbLpUIdzoMDR5dWstRllXblU/view?sle=true): 对async与Generator混合使用的一些讨论
- Daniel Brain, [Understand promises before you start using async/await](https://medium.com/@bluepnume/learn-about-promises-before-you-start-using-async-await-eb148164a9c8): 讨论async/await与Promise的关系

## Class

- Sebastian Porto, [ES6 classes and JavaScript prototypes](https://reinteractive.net/posts/235-es6-classes-and-javascript-prototypes): ES6 Class的写法与ES5 Prototype的写法对比
- Jack Franklin, [An introduction to ES6 classes](http://javascriptplayground.com/blog/2014/07/introduction-to-es6-classes-tutorial/): ES6 class的入门介绍
- Axel Rauschmayer, [ECMAScript 6: new OOP features besides classes](http://www.2ality.com/2014/12/es6-oop.html)
- Axel Rauschmayer, [Classes in ECMAScript 6 (final semantics)](http://www.2ality.com/2015/02/es6-classes-final.html): Class语法的详细介绍和设计思想分析
- Eric Faust, [ES6 In Depth: Subclassing](https://hacks.mozilla.org/2015/08/es6-in-depth-subclassing/): Class语法的深入介绍
- Nicolás Bevacqua, [Binding Methods to Class Instance Objects](https://ponyfoo.com/articles/binding-methods-to-class-instance-objects): 如何绑定类的实例中的this

## Decorator

- Maximiliano Fierro, [Declarative vs Imperative](http://elmasse.github.io/js/decorators-bindings-es7.html): Decorators和Mixin介绍
- Justin Fagnani, ["Real" Mixins with JavaScript Classes](http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/): 使用类的继承实现Mixin
- Addy Osmani, [Exploring ES2016 Decorators](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841): Decorator的深入介绍
- Sebastian McKenzie, [Allow decorators for functions as well](https://github.com/wycats/javascript-decorators/issues/4): 为什么修饰器不能用于函数
- Maximiliano Fierro, [Traits with ES7 Decorators](http://cocktailjs.github.io/blog/traits-with-es7-decorators.html): Trait的用法介绍
- Jonathan Creamer: [Using ES2016 Decorators to Publish on an Event Bus](http://jonathancreamer.com/using-es2016-decorators-to-publish-on-an-event-bus/): 使用修饰器实现自动发布事件

## Module

- Jack Franklin, [JavaScript Modules the ES6 Way](http://24ways.org/2014/javascript-modules-the-es6-way/): ES6模块入门
- Axel Rauschmayer, [ECMAScript 6 modules: the final syntax](http://www.2ality.com/2014/09/es6-modules-final.html): ES6模块的介绍，以及与CommonJS规格的详细比较
- Dave Herman, [Static module resolution](http://calculist.org/blog/2012/06/29/static-module-resolution/): ES6模块的静态化设计思想
- Jason Orendorff, [ES6 In Depth: Modules](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/): ES6模块设计思想的介绍
- Ben Newman, [The Importance of import and export](http://benjamn.github.io/empirenode-2015/#/): ES6模块的设计思想
- ESDiscuss, [Why is "export default var a = 1;" invalid syntax?](https://esdiscuss.org/topic/why-is-export-default-var-a-1-invalid-syntax)

## 工具

- Babel, [Babel Handbook](https://github.com/thejameskyle/babel-handbook/tree/master/translations/en): Babel的用法介绍
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
