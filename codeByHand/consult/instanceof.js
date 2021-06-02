/**
 * 手动实现instanceof的功能
 * @param {*} left 
 * @param {*} right 
 * @returns 
 */

// 拓展知识：
//typeof 判断基础类型，Array，Object，null，Date，RegExp，Error这几个类型都被typeof判断为object
//instanceof 用来判断这个构造函数的原型是否在给定对象的原型链上
//Object.prototype.toString.call()
//constructor
function myInstanceOf(left, right) {
    //基本数据类型直接返回false
    if (typeof left !== 'object' || left === null) {
        return false
    }
    //getPrototypeOf 是Object对象自带的一个方法，能够拿到参数的原型对象
    let proto = Object.getPrototypeOf(left);
    while (true) {
        //找到尽头还没找到
        if (proto == null) {
            return false;
        }
        //找到相同的原型对象
        if (proto == right.prototype) {
            return true;
        }
        proto = Object.getPrototypeOf(proto)
    }
}