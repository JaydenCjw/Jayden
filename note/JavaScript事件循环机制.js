/**
 * JavaScript的运行顺序就是完全单线程的异步模型：同步在前，异步在后。
 * 所有的异步任务都要等待当前的同步任务执行完毕之后才能执行。
 * 
 * 这里我们会发现setTimeout设置的时间是1000毫秒
 * 但是在while的阻塞2000毫秒的循环之后并没有等待1秒而是直接输出了我是一个异步任务，
 * 这是因为setTimout的时间计算是从setTimeout()这个函数执行时开始计算的。
 */
var a = 1
var b = 2
var d1 = new Date().getTime()
var d2 = new Date().getTime()
setTimeout(function(){
  console.log('我是一个异步任务')
},1000)
while(d2-d1<2000){
  d2 = new Date().getTime()
}
//这段代码在输出3之前会进入假死状态，'我是一个异步任务'一定会在3之后输出
console.log(a+b);
