/**
 * https: //www.cnblogs.com/little-oil/p/14658434.html
 * 实现new的过程
 * 1.函数第一个参数是构造函数
 * 2.实例的__proto__指向构造函数的原型属性prototype
 * 3.函数剩余参数要挂载到一个实例对象上
 * 4.构造函数有返回值时，就返回这个返回值
 */

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