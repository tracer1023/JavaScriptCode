
/**
 * 手动实现instanceof的功能
 * @param {*} left 
 * @param {*} right 
 * @returns 
 */
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

/**
 * 手动实现apply
 * apply()方法调用一个具有this值的函数，以及作为一个数值（或类似数组对象）提供的参数
 * 语法：func.apply(thisArg,[argsArray])
 * apply()和call()类似，区别在于call可以接收参数列表，而appaly接收一个参数数组，
 * 所以我们在call的实现上简单改一下入参形式即可
 * @param {*} context 
 * @returns 
 */

Function.prototype.myApply = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('not a function')
    }
    context = context || window
    context.fn = this;
    let result;
    if (arguments[1]) {
        result = context.fn(...arguments[1])
    } else {
        result = context.fn()
    }
    delete context.fn
    return result;
}