/**
 * 手写深拷贝
 * 拷贝一个地址不同其他完全相同的对象
 */
function deepClone(obj) {
    if (typeof obj !== 'object') {
        return obj
    }
    let res
    // 数组和对象的限定
    if (Array.isArray(obj)) {
        res = []
    } else {
        res = {}
    }
    //一层层递归赋值
    for (let key in obj) {
        console.log(key);
        if (obj.hasOwnProperty(key)) {
            res[key] = obj[key]
        }
    }
    return res
}
let book = {
    name: "局外人",
    types: {
        t1: "中文版",
        t2: "英文版",
        a: {
            c: 2
        }
    }
}
let book_clone = deepClone(book)
console.log(book_clone === book);
console.log(book_clone);

/**
 * 手写深度比较
 * 深度比较两个对象的值是否完全相同
 */
function isEqual(obj1, obj2) {
    // 判断两个是不是对象
    if (typeof obj1 !== 'object' && typeof obj2 !== 'object' &&
        obj1 !== null && obj2 !== null) {
        return obj1 === obj2
    }

    if (obj1 === obj2) {
        return true
    }
    // 先取出obj1和obj2的keys,比较个数
    let leng1 = Object.keys(obj1).length
    let leng2 = Object.keys(obj2).length
    // console.log(leng1);
    if (leng1 !== leng2) {
        return false
    }
    // 以obj1为基准和obj2递归比较
    for (let key in obj1) {
        const res = isEqual(obj1[key], obj2[key])
        if (!res) {
            return false
        }
    }

    return true
}

const obj1 = {
    a: 2,
    b: 'a',
    c: {
        e: 'f',
        f: 's'
    }
}

const obj2 = {
    a: 2,
    b: 'a',
    c: {
        e: 'f',
        f: 's',
        // a: 41
    }
}

console.log(isEqual(obj1, obj2));