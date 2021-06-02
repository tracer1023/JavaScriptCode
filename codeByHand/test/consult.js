function myInstanceOf(lef, right) {
    if (typeof left !== 'object' || left === null) {
        return false;
    }
    let proto = Object.getPrototypeOf(left);
    while (true) {
        if (proto == null) {
            return false;
        }
        if (proto == right.prototype) {
            return true;
        }
        proto = Object.getPrototypeOf(left);
    }
}

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
    delete context.fn;
    return result;
}

Function.prototype.apply = function (context) {
    const ctx = context || window;
    ctx.func = this;
    const res = arguments[1] ? ctx.func(...arguments[1]) : ctx.func()
    delete ctx.func();
    return res;
}

Function.prototype.call = function (context) {
    const ctx = context || window;
    ctx.func = this;
    const args = Array.from(arguments).slice(1);
    const res = arguments.length > 1 ? ctx.func(...args) : ctx.func();
    delete context.func;
    return res;
}

Function.prototype.bind = function (context) {
    const ctx = JSON.parse(JSON.stringify(context)) || window;
    ctx.func = this;
    const args = Array.from(arguments).slice(1);
    return function () {
        const allArgs = args.contact(Array.from(arguments));
        return allArgs.length > 0 ? ctx.func(...allArgs) : ctx.func()
    }
}