/**
 * @desc 函数防抖
 * @param fn 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
 export const debounce = function (fn, wait, immediate = false) {
    let timer = null
    return function () {
      let context = this
      let args = arguments
  ​
      if (timer) {
        // 触发事件之后，在n秒内函数只能执行一次，如果在n秒内又触发了函数，则会重新计算函数执行事件
        clearTimeout(timer)
     }
      if (immediate) {
        // 立即执行版本
        let callNow = !timer
        if (callNow) {
          fn.apply(context, args)
       }
        timer = setTimeout(() => {
          timer = null
       }, wait)
     } else {
        timer = setTimeout(() => {
          fn.apply(context, args)
       }, wait)
     }
   }
  }