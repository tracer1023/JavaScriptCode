/**
 * https: //www.cnblogs.com/little-oil/p/14658434.html
 * 实现new的过程
 * 1.函数第一个参数是构造函数
 * 2.实例的__proto__指向构造函数的原型属性prototype
 * 3.函数剩余参数要挂载到一个实例对象上
 * 4.构造函数有返回值时，就返回这个返回值
 */


/**
 * 附加知识：
 * [].slice.call(arguments)  把类对象转为数组对象
 * [].shift.call(arguments) 把类数组对象转为数组对象，删除并拿到arguments的第一项
 * @returns 
 */

// 一个new的实现需要经过这几步
// 创建一个新的对象
// 将构造函数的作用域指向这个对象， 改变this的指向
// 执行构造函数中的代码
// 返回新的对象
const myNew = function () {
    let obj = {} //开辟内存空间
    let Constructor = [].shift.call(arguments) // 1
    obj.__proto__ = Constructor.prototype // 2
    let res = Constructor.apply(obj, arguments) // 3
    return typeof res === 'object' ? res : obj // 4
}

// 使用
const Fun = function (name) {
    this.name = name
}
Fun.prototype.getName = function () {
    alert(this.name)
}
let fun = myNew(Fun, 'gim')
fun.getName() // gim


/**
 * new 做了哪些事情
 * 1.执行构造函数
 * 2.当函数返回值类型为对象时，则返回该对象
 * 3.当函数返回值类型不为对象时，返回构造函数当实例化对象
 */
function my_new(fn, ...rest) {
    //基于fn的prototype构建对象的原型
    const thisObj = Object.create(fn.prototype);
    //将thisObj作为fn的this,继承其属性，并获取返回结果为result
    const result = fn.apply(thisObj, rest);
    //根据result对象的类型决定返回结果
    return typeof result === "object" ? result : thisObj
}