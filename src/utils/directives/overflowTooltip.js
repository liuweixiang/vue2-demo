/**
 * 超出设置宽度显示文字提示指令
 * 用法：v-overflow-tooltip / v-overflow-tooltip:width
 * width 可选
 * 只要当dom元素内容超出设置的宽度时，超出文字省略号显示，鼠标画上去有全部文字提示
 */
export default {
  name: 'overflow-tooltip',
  bind(el, binding) {
    const width = binding.arg
    if (width) {
      el.style.width = `${width}px`
    }
    const style = {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
    setStyle(el, style)
  },
  inserted(el, binding) {
    addTooltip(el, binding)
  },
  unbind(el) {
    if (!el.tooltip) return
    el.removeEventListener('mouseenter', el.elMouseEnterHandler)
    el.removeEventListener('mouseleave', el.elMouseOutHandler)
    el.tooltip.destroy()
  }
}

function addTooltip(el, binding) {
  el.oldOffsetWidth = el.offsetWidth
  if (!el.textWidth) {
    // 计算文本宽度
    const range = document.createRange()
    range.setStart(el, 0)
    range.setEnd(el, el.childNodes.length)
    const rangeWidth = range.getBoundingClientRect().width
    const padding =
      (parseInt(getStyle(el, 'paddingLeft'), 10) || 0) +
      (parseInt(getStyle(el, 'paddingRight'), 10) || 0)
    const textWidth = rangeWidth + padding
    el.textWidth = textWidth
  }

  // 监听元素宽度变化
  const resizeObserver = new ResizeObserver((entry) => {
    const target = entry[0].target
    el.oldOffsetWidth !== target.offsetWidth && addTooltip(el, binding)
  })
  resizeObserver.observe(el)

  // Math.max(el.offsetWidth, binding.arg) 处理offsetWidth不是设置宽度时的情况
  if (el.textWidth > Math.max(el.offsetWidth, binding.arg || 0)) {
    let tooltip = null

    const elMouseEnterHandler = (el.elMouseEnterHandler = debounce((event) => {
      if (!tooltip) {
        const tooltipContent = el.innerText || el.textContent
        tooltip = new Tooltip()
        tooltip.create(tooltipContent)
        el.tooltip = tooltip
      }
      // 400为tootip最大宽度
      tooltip.show(event, Math.min(el.textWidth, 400))
    }, 300))
    const elMouseOutHandler = (el.elMouseOutHandler = debounce(() => {
      tooltip && tooltip.hide()
    }, 300))

    el.addEventListener('mouseenter', elMouseEnterHandler)
    el.addEventListener('mouseleave', elMouseOutHandler)
  } else {
    el.tooltip && el.tooltip.destroy()
    el.elMouseEnterHandler && el.removeEventListener('mouseenter', el.elMouseEnterHandler)
    el.elMouseOutHandler && el.removeEventListener('mouseleave', el.elMouseOutHandler)
  }
}

function debounce(fn, delay = 500) {
  let timer
  return function() {
    const th = this
    const args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function() {
      timer = null
      fn.apply(th, args)
    }, delay)
  }
}

const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g
const MOZ_HACK_REGEXP = /^moz([A-Z])/
const ieVersion = Number(document.documentMode)
const camelCase = function(name) {
  return name
    .replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter
    })
    .replace(MOZ_HACK_REGEXP, 'Moz$1')
}

const getStyle =
  ieVersion < 9
    ? function(element, styleName) {
        if (!element || !styleName) return null
        styleName = camelCase(styleName)
        if (styleName === 'float') {
          styleName = 'styleFloat'
        }
        try {
          switch (styleName) {
            case 'opacity':
              try {
                return element.filters.item('alpha').opacity / 100
              } catch (e) {
                return 1.0
              }
            default:
              return element.style[styleName] || element.currentStyle
                ? element.currentStyle[styleName]
                : null
          }
        } catch (e) {
          return element.style[styleName]
        }
      }
    : function(element, styleName) {
        if (!element || !styleName) return null
        styleName = camelCase(styleName)
        if (styleName === 'float') {
          styleName = 'cssFloat'
        }
        try {
          let computed = document.defaultView.getComputedStyle(element, '')
          return element.style[styleName] || computed ? computed[styleName] : null
        } catch (e) {
          return element.style[styleName]
        }
      }

function setStyle(element, styleName, value) {
  if (!element || !styleName) return

  if (typeof styleName === 'object') {
    for (const prop in styleName) {
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop])
      }
    }
  } else {
    styleName = camelCase(styleName)
    if (styleName === 'opacity' && ieVersion < 9) {
      element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')'
    } else {
      element.style[styleName] = value
    }
  }
}

class Tooltip {
  constructor() {
    this.id = 'autoToolTip'
    this.styleId = 'autoToolTipStyle'
    this.tooltipContent = ''
    this.styleElementText = `
      #autoToolTip {
        display: none;
        position: absolute;
        border-radius: 4px;
        padding: 10px;
        z-index: 99999;
        font-size: 12px;
        line-height: 1.2;
        min-width: 10px;
        max-width: 400px;
        word-break: break-word;
        color: #fff;
        background: #303133;
        transform-origin: center top;
      }

      #autoToolTip #arrow::after {
        content: " ";
        border-width: 5px;
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
        bottom: -10px;
        left: calc(50% - 5px);
        border-top-color: #303133;
      }
    `
    this.tooltipElement = null
    this.styleElement = null
    this.showStatus = false
  }

  create(tooltipContent) {
    this.tooltipContent = tooltipContent
    const autoToolTip = document.querySelector('#' + this.id)
    // 同时只添加一个
    if (autoToolTip) {
      this.tooltipElement = autoToolTip
      return
    }

    const styleElement = document.createElement('style')
    styleElement.id = this.styleId
    styleElement.innerHTML = this.styleElementText
    document.head.append(styleElement)
    this.styleElement = styleElement

    const element = document.createElement('div')
    element.id = this.id

    const arrowElement = document.createElement('div')
    arrowElement.id = 'arrow'
    element.append(arrowElement)

    document.body.append(element)
    this.tooltipElement = element
  }

  show(event, textWidth) {
    if (this.showStatus) return

    const targetElement = event.target
    const targetElementRect = targetElement.getBoundingClientRect()
    const { left, top, width } = targetElementRect

    this.showStatus = true
    this.removeTextNode()
    this.tooltipElement.insertAdjacentText('afterbegin', this.tooltipContent)
    const style = {
      left: `${left - (textWidth + 20 - width) / 2}px`,
      top: `${top - 38}px`,
      display: 'block'
    }
    setStyle(this.tooltipElement, style)
  }

  hide() {
    const style = {
      left: '0px',
      top: '0px',
      display: 'none'
    }
    setStyle(this.tooltipElement, style)

    this.removeTextNode()
    this.showStatus = false
  }

  removeTextNode() {
    const { firstChild } = this.tooltipElement
    if (Object.prototype.toString.call(firstChild) === '[object Text]') {
      this.tooltipElement.removeChild(firstChild)
    }
  }

  destroy() {
    const { tooltipElement, styleElement } = this
    tooltipElement && tooltipElement.remove()
    styleElement && styleElement.remove()
  }
}
