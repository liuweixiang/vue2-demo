<template>
  <div class="hello" v-waterMarker="{ text: 'lzg版权所有', textColor: 'rgba(180, 180, 180, 0.4)' }">
    <slot></slot>
    <slot name="title"></slot>

    <div class="top">复制指令</div>
    <div v-copy="copyText">
      <el-button v-copy="copyText">复制</el-button>
      {{ copyText }}
    </div>

    <div class="top">长按指令</div>
    <el-button v-longpress="longpressFn">长按</el-button>

    <div class="top">节流指令</div>
    <el-button v-throttle:500="handlerClick">节流按钮throttle</el-button>
    <el-input v-debounce="handlerInput" v-model="inputValue"></el-input>

    <div class="top">emoji指令</div>
    <el-input v-model="emojiInpuValue" v-emoji>emoji指令</el-input>

    <div class="top">permission指令</div>
    <el-button v-permission="1">按钮1</el-button>
    <el-button v-permission="5">按钮2</el-button>
    <el-button v-permission="3">按钮3</el-button>

    <div class="top">拖拽按钮</div>
    <el-button v-draggable>拖拽按钮</el-button>

    <div class="top">dialog拖拽</div>
    <el-button @click="dialogBtnClick">dialogShow</el-button>
    <el-dialog
      v-dialogDrag
      title="提示"
      v-model="dialogVisible"
      width="30%"
      :before-close="dialogClose"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <div class="top">removeZero</div>
    <el-input v-removeZero.keep v-model="removeZero"></el-input>

    <div class="top">移除隐藏</div>
    <div style="width: atuo;" v-overflowTip:200>
      放假啦书法家李阿斯兰卡输卵管粉丝滤镜阿卡发简历说服力静安寺三福龙景了就理发师理发师
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src

  export default {
    name: 'HomeView',
    components: {},
    props: {
      msg: String,
      title: String
    },
    data() {
      return {
        copyText: '被复制的内容被复制的内容被复制的内容被复制的内容被',
        inputValue: '二个',
        emojiInpuValue: 'emoji',
        inputLimitValue: '',
        dialogVisible: false,
        removeZero: 0,
        temp: {
          firstName: 'firstName',
          lastName: 'lastName'
        }
      }
    },
    methods: {
      debounceClick() {
        console.log('debounce click')
      },

      handlerClick() {
        console.log('=======999')
      },
      handlerInput() {
        console.log('handlerInput')
      },

      longpressFn() {
        console.log('触发长按~')
      },

      dialogBtnClick() {
        this.dialogVisible = true
      },

      dialogClose() {
        console.log('dialog before close~~')
        this.dialogVisible = false
      }
    }
  }
</script>

<style scoped lang="scss">
  .hello {
    position: relative;
  }

  .top {
    margin-top: 50px;
  }

  .drag-btn {
    position: absolute;
  }
</style>
