/**
 * JavaScript的运行顺序就是完全单线程的异步模型：同步在前，异步在后。
 * 所有的异步任务都要等待当前的同步任务执行完毕之后才能执行。
 * 
 * 这里我们会发现setTimeout设置的时间是1000毫秒
 * 但是在while的阻塞2000毫秒的循环之后并没有等待1秒而是直接输出了我是一个异步任务，
 * 这是因为setTimout的时间计算是从setTimeout()这个函数执行时开始计算的。
 */
// var a = 1
// var b = 2
// var d1 = new Date().getTime()
// var d2 = new Date().getTime()
// setTimeout(function () {
//   console.log('我是一个异步任务')
// }, 1000)
// while (d2 - d1 < 2000) {
//   d2 = new Date().getTime()
// }
// //这段代码在输出3之前会进入假死状态，'我是一个异步任务'一定会在3之后输出
// console.log(a + b);

/*
JavaScript执行代码的线程主线程代码在运行的时候会按照同步和异步代码分成两个去处
如果是同步代码执行就会直接将该任务放在一个叫做“函数执行栈”的空间进行执行，执行栈是典型的栈结构（先进后出），程序在运行的时候会将同步代码按顺序入栈
将异步代码放到工作线程中暂时挂起，工作线程中保存的就是定时任务函数，JS的交互事件，JS的网络请求等耗时操作。
当主线程将代码块筛选完毕后进入执行栈的函数会按照从外到内的顺序依次运行，运行中涉及到的数据是在堆内存中进行获取的。
当执行栈内的任务全部执行完毕之后执行栈就会清空，执行栈清空之后“事件循环”就会工作
他会检测任务队列中是否有要执行的任务，那么这个任务队列的任务来源就是工作线程在主线程执行的过程中
工作线程中就会把到期的定时任务，返回数据的http任务等异步任务按照先后顺序插入到任务队列中
等执行栈清空之后事件循环会访问任务队列将任务队列中存在的任务放在执行栈中继续执行知道任务队列清空。
*/

/*
程序在主线程执行之后就将任务1、4和任务2、3分别放进了两个方向，
任务1和任务4都是立即执行任务所以会按照1->4的顺序进栈出栈
（这里由于任务1和2是平行任务所以会先执行任务1的进出栈再执行任务4的进出栈），
而任务2和任务3由于是异步任务就会进入工作线程挂起并开始计时，并不影响主线程运行，此时的任务队列还是空置的。
*/
// function task1() {
//   console.log('第一个任务')
// }
// function task2() {
//   console.log('第二个任务')
// }
// function task3() {
//   console.log('第三个任务')
// }
// function task4() {
//   console.log('第四个任务')
// }
// task1()
// setTimeout(task2, 1000)
// setTimeout(task3, 500)
// task4()

/*
 执行栈是一个栈的数据结构，
 当我们运行单层函数的时候执行栈执行的函数进栈之后就会出栈销毁然后下一个进栈下一个出栈，
 当有函数嵌套调用的时候栈中就会堆积栈帧
 */
// function task1() {
//   console.log('task1执行')
//   task2()
//   console.log('task2执行完毕')
// }
// function task2() {
//   console.log('task2执行')
//   task3()
//   console.log('task3执行完毕')
// }
// function task3() {
//   console.log('task3执行')
// }
// task1()
// console.log('task1执行完毕')

/**
 * 递归溢出
 */
// var i = 0;
// function task() {
//   i++
//   console.log(`递归了${i}次`)
//   task()
// }

// task()

/**
 * 解决递归溢出堆栈
 */
var i = 0;

function task() {
  i++
  console.log(`递归了${i}次`)
  //使用异步任务来阻止递归的溢出
  setTimeout(function () {
    task()
  }, 0)
}

task()
/*
 有了异步任务之后我们的递归就不会叠加栈帧了，因为放入工作线程之后该函数就结束了可以出栈销毁，
 那么在执行栈中就永远都是只有一个任务在运行这样就防止了栈帧的无限叠加。
 */

