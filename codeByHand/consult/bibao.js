/**
 * 关于闭包的手写题
 */
//利用高阶函数实现函数缓存
//高阶函数应该就是输入参数是函数，返回也是一个函数
let add = function (a) {
    return a + 1
}

function memo(fn) {
    const cache = {}
    return function (...ret) {
        let key = JSON.stringify(ret)
        return cache[key] || (cache[key] = fn.apply(fn, [...ret]))
    }
}
const adder = memo(add)
console.log(adder)
console.log(adder(1));
console.log(adder(1));
console.log(adder(3));
console.log(adder(3));


/**
 * 柯里化--实现一个add(1)(2)(3)
 * 具体要求就是能使本来函数add(1, 2, 3) 变成add(1)(2)(3)
 * 具体思路就是将参数用递归的方式一个一个的传入目标函数
 */
function curry(fn, args) {
    var ofArgs = args || []
    var len = fn.length
    var self = this
    // 
    return function (...ret) {
        // ret是后面传入的函数
        var currentArg = [...ofArgs, ...ret]
        console.log(currentArg);
        // 如果当前参数数组的长度小于fn的要求长度  那么继续递归
        if (len > currentArg.length) {
            return curry.call(self, fn, currentArg)
        }
        return fn.apply(self, currentArg)
    }
}
const add = function (a, b, c) {
    return a + b + c
}
const newFn = curry(add)
// newFn(1)(2)(3)
console.log(newFn(1)(2)(3));