/**
 * 用法：v-limit-input:digit 只允许输入数字
 * v-limip-input:reg="your reg expression" 支持传正则表达式，处理一些特殊的场景
 */
export default {
  name: 'limit-input',
  bind(el, binding, vnode, oldvnode) {
    const typeMap = {
      // 只输入数字
      digit: /\D/g,
      // 只输入正整数
      positiveInteger: /^(0+)|\D+/g,
      // 只输入基本中文
      chinese: /[^\u4E00-\u9FA5]/g,
      // 只输入中文英文字母
      chineseAlphabet: /[^\u4E00-\u9FA5A-Za-z]/g,
      // 只输入大写字母及数字
      uppercaseLetterDigit: /[^A-Z0-9]/g,
      // 只输入字母及数字
      letterDigit: /[^0-9a-zA-Z]/,
      // 只输入合法的金额格式
      price: /(\d+)(\.\d{0,2})?/
      // price: /([^0-9.])|((?<=\d+\.\d{2})\d+)|((?<=^0)0+)|(^0(?=[1-9]))|((?<=\.\d*)\.)|(^\.)/g
    }
    const { arg, value } = binding
    if (!arg) {
      throw Error('one arg is required')
    }
    if (arg && !typeMap.hasOwnProperty(arg)) {
      throw Error('arg is not in typeMap')
    }
    if (arg === 'reg' && !value) {
      throw Error('reg arg requires a reg expression value')
    }
    const tagName = el.tagName.toLowerCase()
    const input = tagName === 'input' ? el : el.querySelector('input')
    const regKey = arg || (arg === 'reg' && value)
    // 输入法气泡窗弹出，开始拼写
    el.compositionstartHandler = function() {
      el.inputLocking = true
    }
    // 输入法气泡窗关闭，输入结束
    el.compositionendHandler = function() {
      el.inputLocking = false
      input.dispatchEvent(new Event('input'))
    }
    el.inputHandler = function(e) {
      if (el.inputLocking) return
      const oldValue = e.target.value
      const newValue = oldValue.replace(typeMap[regKey], '')
      // price 正则在safar报错，导致页面无法打开，新增的判断
      if (regKey === 'price') {
        const rege = /(\d+)(\.\d{0,2})?/
        const target = e.target
        if (rege.test(target.value)) {
          const value = target.value.match(rege)[0]
          if (value.split('.').length === 1 && target.value === value) {
            input.value = Number(value)
          } else if (target.value !== value) {
            input.value = value
            input.dispatchEvent(new Event('input')) // 通知v-model更新
          }
        } else {
          input.value = ''
          input.dispatchEvent(new Event('input'))
        }
      } else {
        // 判断是否需要更新，避免进入死循环
        if (newValue !== oldValue) {
          input.value = newValue
          input.dispatchEvent(new Event('input')) // 通知v-model更新
        }
      }
    }
    input.addEventListener('compositionstart', el.compositionstartHandler)
    input.addEventListener('compositionend', el.compositionendHandler)
    input.addEventListener('input', el.inputHandler)
  },
  unbind(el) {
    const tagName = el.tagName.toLowerCase()
    const input = tagName === 'input' ? el : el.querySelector('input')
    input.removeEventListener('compositionstart', el.compositionstartHandler)
    input.removeEventListener('compositionend', el.compositionendHandler)
    input.removeEventListener('input', el.inputHandler)
  }
}
