<template>
  <div class="about">
    <h1>This is an about page</h1>

    <el-button @click="btnClickhandler">弹窗</el-button>

    <el-button @click="openTypeMessageBox('info')">info</el-button>
    <el-button @click="openTypeMessageBox('success')">success</el-button>
    <el-button @click="openTypeMessageBox('warn')">warn</el-button>
    <el-button @click="openTypeMessageBox('danger')">danger</el-button>

  </div>
</template>

<script>
export default {
  name: 'aboutView',
  data() {
    return {
      
    }
  },
  methods: {
    btnClickhandler() {
      console.log('btnClick====');
      console.log(this.$enctry.toEnctry(346475476879));
      console.log(this.$enctry,'class enctry');

      this.$confirm({
          type: 'warning',
          title: '操作确认',
          message: "你好啊，message",
          dangerouslyUseHTMLString: true
        }).then(async() => {
          console.log('click confirm');
        }).catch(() => {
          console.log('click cancel');
        })
    },
    openMessageBox() {
      this.$messageBox.show({
        title: 'title name',
        content: '这是messageBox的content',
        closeOnClickModal: true
      },() => {
        console.log('messageBox的callback');
      })
    },
    openTypeMessageBox(type) {
      this.$messageBox[type]({
        content: `${type}类型的messageBox`
      })
    }
  }
}
</script>
