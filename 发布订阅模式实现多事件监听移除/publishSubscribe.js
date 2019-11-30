;
let _subscribe = (function() {
  class Sub {
    constructor() {
      // 创建一个事件池，用来存储后期需要执行的方法
      this.pond = [];
    }
    // => 向事件池中追加方法(去重)
    add(fn) {
      let flag = this.pond.some((item, index) => {
        return item === fn;
      });
      !flag ? this.pond.push(fn) : null;
    }
    // => 从事件池中移除方法
    remove(fn) {
      let pond = this.pond;
      pond.forEach((item, index) => {
        if (item === fn) {
          pond[index] = null;
        }
      })
    }
    fire(...args) {
      let pond = this.pond;
      for (let i = 0; i < pond.length; i++) {
        let item = pond[i];
        //如果itme为空了,最好把它删除掉
        if (item === null) {
          pond.splice(i, 1);
          //如果用了splice要防止数组塌陷问题，即删除了一个元素后，后面所有元素的索引默认都会减1
          i--;
          continue;
        }
        item.call(this, ...args);
      }
    }
  }
  return function subscribe() {
    return new Sub();
  }
}())
