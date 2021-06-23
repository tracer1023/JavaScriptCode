/**
 * 实现千分位分隔符
 * 目描述： 实现将一个数从各位数开始， 每距离一个千分位添加一个分割符‘, ’
 * 如输入： 12345678.32423432
 * 输出： 12, 345, 678.32423432
 */
//第一种方法
const num = 12345678.323453;

function getForm(num) {
    let arr = num.toString().split('.');
    //取出整数部分    String.split() 执行的操作与 Array.join 执行的操作是相反的。
    let arr0 = arr[0].split('') //split() 方法用于把一个字符串分割成字符串数组。

    console.log('arr0', arr0)
    let stack = [];
    let i = 0;
    while (arr0.length > 0) {
        //每三位添加一个分隔符
        if (i % 3 == 0 && i !== 0) {
            stack.push(',')
        }
        stack.push(arr0.pop()) // arr0.pop() 取的是数组后面的数，栈顶即数组尾，栈底即数组头
        i++
    }
    let res = stack.reverse(); // 将栈（数组）倒转
    console.log('res', res)
    //考虑是否存在小数部分
    if (arr[1]) {
        return res.join('') + '.' + arr[1]
    } else {
        return res.join('')
    }
}
console.log(getForm(num))

//第二种方法用正则解决
// todo 正则表达式的语法
function regForm(num) {
    return num.toString().replace(/\d+/, (p) => {
        return p.replace(/\d(?=(\d{3})+$)+/g, (p1, p2) => {
            return p1 + ','
        })
    })
}


/**
 * 实现一个trim(),实现原型上的trim()方法
 */
//方法一
String.prototype.my_trim = function () {
    return this.replace(/^\s+/, '').replace(/\s+$/, '')
}
//方法二
String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '')
}

/**
 * 取出连续重复的字符
 * 取出： 'sadddddddddddddsssssssssssssdddddddasddd’重复的字符
 * 最终为[“ddddddddddddd”, “sssssssssssss”, “ddddddd”, “ddd”]
 */
let a = 'sadddddddddddddsssssssssssssdddddddasddd'
console.log(a.match(/([a-z])\1+/ig));


/**
 * 解析url为对象形式
 */
const url = 'http://www.baidu.com/we/index.html?id=098&aaa=123&ccc=456'

function parseParm(url) {
    let arr = url.splt('?')[1].split('&')
    console.log(arr)
    let obj = {}
    arr.forEach((item) => {
        console.log(item.split('='))
        let [key, value] = item.split('=')
        if (/^\d+$/.test(value)) {
            value = parseInt(value)
        }
        obj[key] = value
    })
    return obj;
}
console.log(parseParm(url))