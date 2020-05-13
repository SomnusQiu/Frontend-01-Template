# 每周总结可以写在这里
JS执行粒度
直接量/变量/this...
表达式
语句/声明
函数调用（Execution Context）
微任务（Promise）
宏任务
JS Context => Realm Realm里包含了一套原始的内置对象，Error、Date等
JavaScript中的对象
宿主对象(host Objects) 由 JavaScript 宿主环境提供的对象，它们的行为完全由宿主环境决定。
固有对象
用户可创建对象
内置对象(Built-in Objects) 由 JavaScript 语言提供的对象。
固有对象(Intrinsic Objects) 由标准规定，随着 JavaScript 运行时创建而自动创建的对象实例。
原生对象(Native Objects) 可以由用户通过 Array、RegExp 等内置构造器或者特殊语法创建的对象。能够通过语言本身的构造器创建的对象称作原生对象
普通对象(Ordinary Objects) 由{}语法、Object 构造器或者 class 关键字定义类创建的对象，它能够被原型继承。
函数调用
Execution Context Stack，函数调用时，会形成调用栈。支持push和pop。栈顶元素叫Running Execution Context
code evaluation state，代码执行位置，主要是async与generator函数有用
Function，如果Execution Context在函数执行的，那就会有这个Function，如果不是刚为null，比如全局的代码就是null
Script or Module，如果是script或module初始化的就会有，也有可能是null
Generator，完全是为了generator函数打造的，因为在执行generator函数时，调用next时，需要知道到哪个yield在哪 ，也有可能是null
Realm
在JS中，函数表达式和对象直接量均会创建对象。使用'.'做隐式转换也会创建对象。这些对象也是有原型的，如果我们没有Realm，就不知道他们的原型是什么。
LexicalEnvironment，词法环境，取变量的值时，需要的环境
this
nuew.target
super
变量
VariableEnvironment，变量环境
用于处理var声明
Environment Record
Declarative(Environment Records)
Function(Environment Records)
module(Environment Records)
Global(Environment Records)
Object(Environment Records)
Function Closure