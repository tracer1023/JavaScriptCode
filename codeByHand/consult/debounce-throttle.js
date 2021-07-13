/**
 * 函数防抖： 当持续触发事件是， 一定事件内没有再触发事件， 事件处理函数才会执行一次， 
 * 如果设定的时间到来之前， 又一次触发了事件， 就重新开始延时
 * 应用场景
 search搜索联想， 用户在不断的输入值时， 用防抖来节约请求资源
 window触发resize的时候
 不断的调整浏览器窗口大小会不断的触发这个事件， 用防抖只会让其只触发一次
 放置重复提交
 */
function debounced(fn, delay = 500) {
    let timer = null

    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments)
            timer = null
        }, delay)
    }
}


/**
 * 函数的节流
 * 控制方法的执行周期， 减少一些无用的请求， 优化性能
应用场景
鼠标不断的点击触发mousedown(单位时间只触发一次)
监听滚动事件， 比如石佛那个滑到底部自动加载更多。
 */
function throttle(fn, interval = 500) {
    let timer = null

    // 注意：这其实是一个闭包
    return function () {
        if (timer) {
            return //因为和防抖不同，不需要重新开始计时，所以不用清楚timer
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments)
            timer = null
        }, interval)
    }
}