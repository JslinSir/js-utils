/**
 * @desc 函数节流
 * @param fn 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版
 */
 export const throttle = function (fn, wait, type=1) {
    if (type === 1) {
      let preTime = 0
      return function () {
        let context = this
        let args = arguments
        let nowTime = new Date()
        if (nowTime - preTime > wait) {
          preTime = nowTime
          fn.apply(context, args)
       }
     }
   } else {
      let timer = null
      return function () {
        let context = this
        let args = arguments
        if (!timer) {
          // 当延迟时间结束后，执行函数
          timer = setTimeout(() => {
            timer = null
            fn.apply(context, args)
         }, wait)
       }
     }
   }
  }