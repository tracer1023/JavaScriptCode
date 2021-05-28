/**
 * https: //juejin.cn/post/6844903763178684430#heading-11
 * Promise/A+ 规范
 */

const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

//手动实现promsie构造函数
function MyPromsie(fn) {
    this.status = PENDING;
    this.value = undefined;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];
    const resolved = (value) => {
        if (this.status == PENDING) {
            this.status = RESOLVED;
            this.value = value;
            this.resolvedCallbacks.forEach(cb => cb)
        }
    }

    const rejected = (value) => {
        if (this.status == PENDING) {
            this.status = REJECTED;
            this.value = value;
            this.rejectedCallbacks.forEach(cb => cb);
        }
    }
    try {
        fn(resolved, rejected)
    } catch (e) {
        rejected(e)
    }
}

//手动实现Promise.prototype.then()方法
//简易版then方法，不能实现连续then
MyPromsie.prototype.then = function (onFulfilled, onRejected) {
    const that = this;
    onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : v => v;
    onRejected = typeof onRejected == 'function' ? onRejected : r => { throw r };
    // 如果new MyPromise 的时候执行了resolved函数，那么应该执行then中的第一个回调函数
    if (that.status === RESOLVED) {
        onFulfilled(that.value);
    }
    // 如果new MyPromise 的时候执行了rejected函数，那么应该执行then中的第二个回调函数
    if (that.status === REJECTED) {
        onRejected(that.value)
    }
    // 如果是异步调用的then方法，就先不执行函数，先把函数存到数组中
    // 当 status 变化后，再遍历数组，执行函数
    if (that.status === PENDING) {
        that.resolvedCallbacks.push(() => { onFulfilled(that.value) })
        that.rejectedCallbacks.push(() => onRejected(that.value))
    }
}

//增强版then函数，可以链式调用
MyPromsie.prototype.thenUpdate = function (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : v => v
    onRejected = typeof onRejected == 'function' ? onRejected : r => { throw r }
    let promise2 = new MyPromsie((resolve, reject) => {
        if (this.status === RESOLVED) {
            setTimeout(() => {
                try {
                    let x = onFulfilled(this.value);
                    resolve
                }
            })
        }
    })
}