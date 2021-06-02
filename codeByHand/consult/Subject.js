/**
 * 观察者模式
 * 观察者模式存在耦合，主体中存储的是观察者实例，而notify方法遍历时调用了观察者的update方法
 * 要点：都要实现添加/删除/派发更新事件
 */

class Subject {
    constructor() {
        this.observers = [];
    }

    add(observer) {
        this.observers.push(observer)
        this.observers = [...new Set(this.observers)]
    }

    notify(...args) {
        this.observers.forEach(observer => observer.update(...args));
    }

    remove(observer) {
        let observers = this.observers
        for (let i = 0, len = observers.length; i < len; i++) {
            if (observers[i] === observer) observers.splice(i, 1)
        }
    }

}

class Observer {
    update(...args) {
        // dosomething ....
        console.log(...args)
    }
}

let observer_1 = new Observer() // 创建观察者
let observer_2 = new Observer()
let sub = new Subject() // 创建主体
sub.add(observer_1) // 添加观察者
sub.add(observer_2)
sub.notify('send msg')