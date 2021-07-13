var MyHashSet = function () {
    this.BASE = 1024;
    this.data = new Array(this.BASE).fill(0).map(() => new Array())
}
MyHashSet.prototype.add = function (key) {
    const h = this.hash(key);
    const it = this.data[h]
    for (let i = 0; i < it.length; i++) {

    }
}