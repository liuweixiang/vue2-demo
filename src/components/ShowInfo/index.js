import Vue from 'vue'
import { WARNING, ActionTypeEnum } from '@/constants'
import { MessageTypeEnum } from './constant'
import showInfo from './index.vue'
import merge from 'element-ui/src/utils/merge'
import { isVNode } from 'element-ui/src/utils/vdom'

const defaults = {
  title: '操作确认',
  type: WARNING,
  message: '',
  notice: '原因说明',
  content: [],
  modal: true,
  showClose: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  closeOnHashChange: true,
  customClass: '',
  showDescription: false,
  showConfirmButton: true,
  showContinueButton: false,
  showCancelButton: false,
  actions: '',
  confirmButtonText: '',
  continueButtonText: '',
  cancelButtonText: '',
  confirmButtonLoading: false,
  cancelButtonLoading: false,
  continueButtonLoading: false,
  confirmButtonClass: '',
  confirmButtonDisabled: false,
  continueButtonClass: '',
  continueButtonDiaabled: false,
  cancelButtonClass: '',
  callback: null,
  beforeClose: null,
  dangerouslyUseHTMLString: false,
  distinguishCancelAndClose: false,
  showNotice: true
}

const ShowInfoConstructor = Vue.extend(showInfo)

console.log(ShowInfoConstructor,'ShowInfoConstructor');

let instance, currentMsg
let msgQueue = []

const defaultCallback = action => {
  if (currentMsg) {
    const callback = currentMsg.callback
    if (typeof callback === 'function') {
      callback(action)
    }
  }
  if (currentMsg.resolve && action === ActionTypeEnum.Confirm || action === ActionTypeEnum.Continue) {
    currentMsg.resolve(action)
  } else if (currentMsg.reject && (action === ActionTypeEnum.Cancel || action === ActionTypeEnum.Close)) {
    currentMsg.reject(action)
  }
}

const initInstance = () => {
  instance = new ShowInfoConstructor({
    el: document.createElement('div')
  })

  instance.callback = defaultCallback
}

const showNextMsg = () => {
  if (!instance) {
    initInstance()
  }
  instance.action = ''

  if (!instance.visible || instance.closeTimer) {
    if (msgQueue.length > 0) {
      currentMsg = msgQueue.shift()

      const options = currentMsg.options
      for (const prop in options) {
        if (options.hasOwnProperty(prop)) {
          instance[prop] = options[prop]
        }
      }
      if (!options.callback) {
        instance.callback = defaultCallback
      }

      const oldCb = instance.callback
      instance.callback = (action, instance) => {
        oldCb(action, instance)
        showNextMsg()
      }
      if (isVNode(instance.message)) {
        instance.$slots.default = [instance.message]
        instance.message = null
      } else {
        delete instance.$slots.default
      }
      ['modal', 'showClose', 'closeOnClickModal', 'closeOnPressEscape', 'closeOnHashChange'].forEach(prop => {
        if (instance[prop] === undefined) {
          instance[prop] = true
        }
      })
      document.body.appendChild(instance.$el)

      Vue.nextTick(() => {
        instance.visible = true
      })
    }
  }
}

const ShowInfo = function(options, callback) {
    console.log(options,'==optionsoptions');
  if (Vue.prototype.$isServer) return
  if (typeof options === 'string' || isVNode(options)) {
    options = {
      message: options
    }
    if (typeof arguments[1] === 'string') {
      options.title = arguments[1]
    }
  } else if (options.callback && !callback) {
    callback = options.callback
  }

  if (typeof Promise !== 'undefined') {
    return new Promise((resolve, reject) => {
      msgQueue.push({
        options: merge({}, defaults, ShowInfo.defaults, options),
        callback,
        resolve,
        reject
      })

      showNextMsg()
    })
  } else {
    msgQueue.push({
      options: merge({}, defaults, ShowInfo.defaults, options),
      callback
    })

    showNextMsg()
  }
}

ShowInfo.setDefaults = defaults => {
  ShowInfo.defaults = defaults
}

const handleOptionOnlyHasMessage = options => typeof options === 'string' ? (options = { message: options }) : options

ShowInfo.alert = options => {
  options = handleOptionOnlyHasMessage(options)
  return ShowInfo(merge({
    $type: MessageTypeEnum.Alert,
    closeOnPressEscape: false,
    closeOnClickModal: false
  }, options))
}

ShowInfo.confirm = options => {
  options = handleOptionOnlyHasMessage(options)
  debugger
  console.log(options,'=============options');
  return ShowInfo(merge({
    $type: MessageTypeEnum.Confirm,
    showCancelButton: false
  }, options))
}

ShowInfo.continue = options => {
  options = handleOptionOnlyHasMessage(options)
  return ShowInfo(merge({
    $type: MessageTypeEnum.Continue,
    showCancelButton: true,
    showConfirmButton: false,
    showContinueButton: true
  }, options))
}

ShowInfo.close = () => {
  instance.doClose()
  instance.visible = false
  msgQueue = []
  currentMsg = null
}

export default ShowInfo
export { ShowInfo }
