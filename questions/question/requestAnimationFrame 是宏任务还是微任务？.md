## 面试官：requestAnimationFrame 是宏任务还是微任务？

### 宏任务和微任务
### 微任务：
* process.nextTick
* MutationObserver
* Promise.then catch finally

### 宏任务：
* I/O
* setTimeout
* setInterval
* setImmediate
* requestAnimationFrame

>从上面可以看出宏任务和微任务的区别
### 宏任务：
是没有使用回调，且又不按照代码的执行顺序执行的任务
### 微任务：
首先他也是不按照代码顺序执行的，但是他有回调，比如外面promise，我们可以反复掉用then

### 参考资料
* https://blog.csdn.net/weixin_45581741/article/details/108737474  
* https://zhuanlan.zhihu.com/p/360507457