/** 数组去重 */
//方法一：最简单的去重：用Set
var arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}];
console.log(unique(arr));
// 注意Set是能够去掉NaN的重复的
// [...new Set(arr)]
function unique(arr) {
    return Array.from(new Set(arr))
}

//方法二：使用indexOf无法去除 NaN的重复 indexOf(NaN)永远等于-1
function uniqueIndexOf(arr) {
    if (!Array.isArray(arr)) {
        {
            console.log('is nor a array');
        }
    }
    const res = []
    arr.forEach(element => {
        if (res.indexOf(element) === -1) {
            res.push(element)
        }
    });
    return res
}

//方法三：includes也是能够去掉NaN的重复的
function unique3(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError('is not array')
    }
    const new_arr = []
    arr.forEach(e => {
        if (!new_arr.includes(e)) {
            new_arr.push(e)
        }
    })

    return new_arr
}

//方法四：splice使用此函数特别需要注意的一点：会改变数组，改变数组的长度
function unique4(arr) {
    let len = arr.length
    for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
            if (arr[i] == arr[j]) {
                //       console.log(arr);
                arr.splice(j, 1)
                // console.log(arr);
                j--;
            }
        }
    }
    return arr
}

//方法五：用filter+hasOwnProperty两个空对象也能去重
function unique5(arr) {
    var obj = {};
    return arr.filter(function (item, index, arr) {
        console.log(item);
        console.log(typeof item + item);
        // console.log(obj[typeof item + item]);
        // 判断obj对象是否有这个属性，如果有（说明数组元素重复）直接返回false过滤掉数组中的重复元素
        // 如果没有，为obj对象添加上这个属性
        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
    })
}



/**
 * 数组乱序
 * 主要用到的api是Match.random和set
 */
function disorder(arr) {
    let len = arr.length
    let res = []
    let remember = new Set()
    // console.log(remember.size);
    while (remember.size < len) {
        let randomNum = Math.floor(len * Math.random())
        if (!remember.has(randomNum)) {
            res.push(arr[randomNum])
            remember.add(randomNum)
        }
    }
    return res
}

console.log(disorder([1, 2, 3, 4, 5, 6, 7, 8, 9]));


/** 手写filter */
Array.prototype.my_filter = function (fn, context) {
    if (Object.prototype.toString.call(this) !== '[object Array]') {
        throw new TypeError('is not a array')
    }
    let newArr = []
    for (let i = 0; i < this.length; i++) {
        let t = fn.call(context, this[i], i, this)
        if (t) {
            newArr.push(this[i])
        }
    }
    return newArr

}
const arr = [1, 2].my_filter(x => x == 2)
console.log(arr);

/**
 * 实现数组的flat方法
 * 要实现拍平一个数组， 可以用concat或剩余运算符
 */
//方法一：现用reduce+递归
const arr = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, "string", {
    name: "弹铁蛋同学"
}];

function flat(arr) {
    return arr.reduce((pres, cur) => {
        return pres.concat(Array.isArray(cur) ? flat(cur) : cur)
    }, [])
}

//方法二
console.log(flat2(arr, 2));

function flat2(arr) {
    let stack = [].concat(arr)
    let res = []

    while (stack.length !== 0) {
        const i = stack.pop()
        if (Array.isArray(i)) {
            stack.push(...i)
        } else {
            res.unshift(i)
        }
    }
    return res
}