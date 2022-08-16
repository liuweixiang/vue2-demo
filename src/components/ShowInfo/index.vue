<template>
  <transition name="msgbox-fade">
    <div
      v-show="visible"
      :class="b('wrapper')"
      @click.self="handleWrapperClick"
    >
      <div :class="[b(), customClass]">
        <div :class="b('header')">
          <div :class="b('title')">
            <span>{{ title }}</span>
          </div>
          <button
            v-if="showClose"
            :class="b('close')"
            @click="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')"
            @keydown.enter="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')"
          ><i class="el-icon-close" /></button>
        </div>
        <div :class="b('content')">
          <div :class="b('tip', {'desc': showDescription, 'only-alert': !hasContent})">
            <img
              v-if="showImg"
              :src="iconImg"
            >
            <slot>
              <p v-if="!dangerouslyUseHTMLString">{{ message }}</p>
              <p
                v-else
                v-html="message"
              />
            </slot>
          </div>
          <div
            v-if="hasContent"
            :class="b('notice-wrapper')"
          >
            <p v-if="showNotice">{{ notice }}：</p>
            <ul
              v-if="showNotice"
              :class="b('notice')"
            >
              <li
                v-for="(item, idx) in content"
                :key="idx"
              >
                <div :class="b('notice-content', {'has-more': item.content})">
                  <div :class="b('reason-wrap')">
                    <div class="dot" /><p>{{ item.reason || '' }}</p>
                  </div>
                  <MoreInfo
                    v-if="visible"
                    :text="item.content || ''"
                  />
                </div>
              </li>
            </ul>
            <ul
              v-if="!showNotice"
              :class="b('notice')"
            >
              <li
                v-for="(item, idx) in content"
                :key="idx"
              >
                <div :class="b('notice-content', {'has-more': item.content})">
                  <MoreInfo
                    v-if="visible"
                    :text="item.content || ''"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div :class="b('footer')">
          <el-button
            v-if="showCancelButton"
            :loading="cancelButtonLoading"
            :class="cancelButtonClass"
            @click.native="handleAction('cancel')"
            @keydown.enter="handleAction('cancel')"
          >
            {{ cancelButtonText || '取 消' }}
          </el-button>
          <el-button
            v-if="showConfirmButton"
            ref="confirm"
            :loading="confirmButtonLoading"
            :class="confirmButtonClass"
            type="primary"
            @click.native="handleAction('confirm')"
            @keydown.enter="handleAction('confirm')"
          >
            {{ confirmButtonText || '确 定' }}
          </el-button>
          <el-button
            v-if="showContinueButton"
            ref="continue"
            :loading="continueButtonLoading"
            :class="continueButtonClass"
            type="primary"
            @click.native="handleAction('continue')"
            @keydown.enter="handleAction('continue')"
          >
            {{ continueButtonText || '继 续' }}
          </el-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import create from '../../utils/create/create'
import Popup from 'element-ui/lib/utils/popup/index.js'
import MoreInfo from './MoreInfo.vue'
import { MessageTypeEnum } from './constant'
import { WARNING, ERROR, SUCCESS, NONE, ActionTypeEnum } from '@/constants'

export default create({
  name: 'showInfo',

  mixins: [Popup],

  components: { MoreInfo },

  props: {
    modal: { // 是否是模态框
      type: Boolean,
      default: true
    },
    type: { // icon 类型
      type: String,
      validator(val) {
        return [WARNING, ERROR, SUCCESS, NONE].includes(val)
      }
    },
    showClose: { // 显示关闭按钮
      type: Boolean,
      default: true
    },
    closeOnClickModal: { // 是否可通过点击遮罩关闭
      default: true
    },
    closeOnPressEscape: { // 是否可通过按下 ESC 键关闭
      default: true
    },
    closeOnHashChange: { // 是否在 hashchange 时关闭
      default: true
    }
  },

  data() {
    return {
      uid: 1,
      title: '操作确认', // 提示标题
      message: '', // 提示信息
      notice: '原因说明', // 原因提示
      content: [], // 弹框详细信息
      customClass: '', // 根节点样式类
      showDescription: false, // 是否展示辅助提示信息
      showNotice: true, // 是否显示原因说明
      showConfirmButton: true, // 是否展示确认按钮
      showContinueButton: false, // 是否展示继续按钮
      showCancelButton: false, // 是否展示取消按钮
      actions: '',
      confirmButtonText: '', // 确认按钮文案
      continueButtonText: '', // 继续按钮文案
      cancelButtonText: '', // 取消按钮文案
      confirmButtonLoading: false,
      cancelButtonLoading: false,
      continueButtonLoading: false,
      confirmButtonClass: '', // 确认按钮样式
      confirmButtonDisabled: false, // 确认按钮是否可点击
      continueButtonClass: '', // 继续按钮样式
      continueButtonDiaabled: false, // 继续按钮是否可点击
      cancelButtonClass: '', // 取消按钮样式
      callback: null, // 确认或取消的回调函数
      beforeClose: null, // 关闭前的回调
      dangerouslyUseHTMLString: false, // 是否展示 html 字段
      distinguishCancelAndClose: false
    }
  },

  computed: {
    showImg() {
      return this.type !== NONE
    },
    iconImg() {
      return this.type ? `${this.ossImageUrl}alert_${this.type}.png` : ''
    },
    hasContent() {
      return this.content && this.content.length
    }
  },

  watch: {
    visible(val) {
      if (val) {
        this.uid++
        if ([MessageTypeEnum.Alert, MessageTypeEnum.Confirm, MessageTypeEnum.Continue].includes(this.$type)) {
          this.$nextTick(() => {
            this.showConfirmButton && this.$refs.confirm.$el.focus()
            this.showContinueButton && this.$refs.continue.$el.focus()
          })
        }
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      if (this.closeOnHashChange) {
        window.addEventListener('hashchange', this.close)
      }
    })
  },

  beforeDestroy() {
    if (this.closeOnHashChange) {
      window.removeEventListener('hashchange', this.close)
    }
  },

  methods: {
    getSafeClose() {
      const currentId = this.uid
      return () => {
        this.$nextTick(() => {
          if (currentId === this.uid) this.doClose()
        })
      }
    },
    // 关闭弹窗函数
    doClose() {
      if (!this.visible) return
      this.visible = false
      this._closing = true
      this.onClose && this.onClose()
      // 解绑
      if (this.lockScroll) {

      }
      this.opened = false
      this.doAfterClose()
      setTimeout(() => {
        if (this.action) this.callback(this.action, this)
      })
    },
    // 点击遮罩层
    handleWrapperClick() {
      this.closeOnClickModal && this.handleAction(this.distinguishCancelAndClose ? ActionTypeEnum.Close : ActionTypeEnum.Cancel)
    },
    // 处理按钮点击事件
    handleAction(action) {
      this.action = action
      if (typeof this.beforeClose === 'function') {
        this.close = this.getSafeClose()
        this.beforeClose(action, this, this.close)
      } else {
        this.doClose()
      }
    }
  }
})
</script>

<style lang="scss">
@import "./index.scss";
</style>
