const findEle = (parent, type) => {
  return parent.tagName.toLowerCase() === type ? parent : parent.querySelector(type)
}

export const debounce = {
  inserted: function (el, binding) {
    if (typeof binding.value !== 'function') {
      throw new Error('指令的参数必须是函数')
    }
    let timer
    const $inp = findEle(el, 'input')
    el.$inp = $inp
    el.handle = () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        binding.value()
      }, 1000)
    }
    el.addEventListener('input', el.handle)
  },
  unbind: function (el) {
    el.$inp.removeEventListener('input', el.$inp.handle)
  }
}

// throttle 节流
export const throttle = {
  inserted (el, binding) {
    if (typeof binding.value !== 'function') {
      throw new Error('指令的参数必须是函数')
    }
    let flg = false
    let timerName
    let time = 500
    if(binding.arg) {
      time = parseInt(binding.arg)
    }
    el.handle = () => {
      if (flg) return
      flg = true
      binding.value()
      timerName = setTimeout(() => {
        flg = false
      }, time)
    }
    el.addEventListener('click', el.handle)
  },
  unbind(el,binding) {
    el.removeEventListener('click',el.handle)
  }
}
