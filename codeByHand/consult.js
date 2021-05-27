import {
    array,
    func
} from "prop-types";

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

//ES6 简易模拟实现apply
Function.prototype.apply = function (context) {
    const csx = context || window;
    //将当前被调用的方法定义在ctx.fuc上，为了能以对对象调用的形式绑定this
    context.func = this;
    //以对象调用的形式调用func,此时this指向ctx 也就是传入的需要绑定的this指向
    const res = arguments[1] ? context.func(...arguments[1]) : context.func();

    //删除该方法，不然会对传入对对象造成污染（添加该方法）
    delete context.func;
    return res;
}

//简易实现call--ES6
//apply实现的思路与call基本相同,我们只需要对参数进行不同处理即可
Function.prototype.call = function (context) {
    const ctx = context || window;
    //将当前被调用的方法定义在ctx.fuc上，为了能以对对象调用的形式绑定this
    ctx.func = this;
    //获取实参
    const args = Array.from(arguments).slice(1);
    //以对象调用的形式调用func,此时this指向ctx 也就是传入的需要绑定的this指向
    const res = arguments.length > 1 ? ctx.func(...args) : ctx.func();
    //删除该方法，不然会对传入对对象造成污染（添加该方法）
    delete context.func;
    return res;
}

//bind的简易模拟实现(es6)---不考虑new操作符
/**
 * 思路
 函数定义在哪里 ?
     bind是可以被所有方法调用的, 所以毫无疑问的定义在 Function的原型上!
     函数接收参数 ?
     bind函数返回一个绑定函数, 最终调用需要传入函数实参和绑定函数的实参!!
     如何显式绑定this ?
     如果调用者函数， 被某一个对象所拥有， 那么该函数在调用时， 内部的this指向该对象。
 */
Function.prototype.bind = function (context) {
    //对context进行参考吧，防止污染
    const ctx = JSON.parse(JSON.stringify(context)) || window;
    //将当前被调用的方法定义在ctx.fuc上，为了能以对对象调用的形式绑定this
    ctx.func = this;

    //获取实参
    const args = Array.from(arguments).slice(1);

    //bind 返回一个绑定函数，等待调用
    return function () {
        //这里需要注意的一点是需要对bind函数对实参和返回对绑定函数对实参进行参数合并，调用时传入
        const allArgs = args.concat(Array.from(arguments));
        //以对象调用的形式调用func,此时this指向ctx 也就是传入的需要绑定的this指向
        return allArgs.length > 0 ? ctx.func(...allArgs) : ctx.func();
    }
}