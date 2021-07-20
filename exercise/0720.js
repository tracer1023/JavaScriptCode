// //千分位分隔符
// function formetNum(num) {
//     //整数小数分开
//     let arr = num.toString().split('.')
//     let arr0 = arr[0].split('') //整数
//     let stack = []
//     let i = 0
//     while (arr0.length > 0) {
//         if (i % 3 == 0 && i !== 0) {
//             stack.push(',')
//         }
//         stack.push(arr0.pop())
//         i++;
//     }
//     let res = stack.reverse()
//     if (arr[1]) {
//         return res.join('') + '.' + arr[1]
//     } else {
//         return res.join('')
//     }
// }
// let num = 1232333456.234
// console.log(formetNum(num))

//解析url
// function formatUrl(url) {
//     let arr = url.split('?')[1].split('&')
//     let obj = {}
//     arr.forEach((item) => {
//         let [key, value] = item.split('=')
//         obj[key] = value
//     })
//     return obj
// }
// let url = 'https://www.baidu.com/s?ie=UTF-8&wd=%E9%98%B2%E6%8A%96'
// console.log(formatUrl(url))

//call
Function.prototype.myApply = function (context) {
    context = context | window
    context.fn = this
    let result
    if (arguments[1]) {
        result = context.fn(...arguments[1])
    } else {
        result = context.fn()
    }
    delete context.fn
    return result
}

Function.prototype.myCall = function (context) {
    context = context | window
    context.fn = this
    let result
    let args = Array.from(arguments).slice(1)
    context.fn(...args)
    delete context.fn
    return res
}

//返回一个bind函数
Function.prototype.bind = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('not function')
    }
    let _this = this
    let arg = [...arguments].slice(1)
    return function F() {
        if (this instanceof F) {
            //处理函数使用new的情况
            return new _this(arg, ...arguments)
        } else {
            return _this.apply(context, arg.concat(...arguments))
        }
    }
}

function deepCloe(arr) {
    if (typeof arr !== 'object') {
        return arr
    }
    let obj = {}
    arr.
}