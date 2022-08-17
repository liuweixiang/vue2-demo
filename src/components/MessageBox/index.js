import _MessageBox from './MessageBox.vue'

export default {
  install(Vue) {
    let messageBox = null
    Vue.component(_MessageBox.name, _MessageBox)

    Vue.prototype.$messageBox = {
      show,
      hide,
      info,
      success,
      warn,
      danger
    }

    function show(props, callback) {
      if (!messageBox) {
        const MessageBox = Vue.extend({
          render(h) {
            return h('message-box', { props })
          }
        })

        messageBox = new MessageBox()
        this.vm = messageBox.$mount()
        document.body.appendChild(this.vm.$el)
      }

      callback && callback()
    }

    function hide(callback) {
      document.body.removeChild(this.vm.$el)
      messageBox.$destroy()
      messageBox = null
      this.vm = null

      callback && callback()
    }

    function info(props, callback) {
      this.show({ ...props, type: 'parmary' }, callback)
    }

    function success(props, callback) {
      this.show({ ...props, type: 'success' }, callback)
    }

    function warn(props, callback) {
      this.show({ ...props, type: 'warn' }, callback)
    }

    function danger(props, callback) {
      this.show({ ...props, type: 'danger' }, callback)
    }
  }
}
