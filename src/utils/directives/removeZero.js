/**
 * v-remove-zero directive
 * 使用  v-removeZero.keep
 */
export default {
  bind (el, binding) {
    const { modifiers } = binding
    const tagName = el.tagName.toLowerCase()
    // `el.querySelector('input')` in order to adapt el-input
    const input = tagName === 'input' ? el : el.querySelector('input')
    let oldValue = ''

    input.addEventListener('focus', (e) => {
      const { value } = e.target
      oldValue = value

      if (parseFloat(value) === 0) {
        input.value = ''
      }
    })

    modifiers.keep && input.addEventListener('blur', (e) => {
      const { value } = e.target

      if (value === '') {
        input.value = oldValue
      }
    })
  }
}
