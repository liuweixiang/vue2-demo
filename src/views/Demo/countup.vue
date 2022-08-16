<template>
  <div class="content">
    <div class="item" :ref="'item'+index" v-for="(item,index) in list" :key="index">{{item}}</div>
  </div>
  
</template>

<script>
import { CountUp } from 'countup.js'
export default {
  name: 'countup',
  data () {
    return {
      list: [1214,4352,3453,1235,5463,6453],
      options: {
        startVal: 0
      },
      endCount: 2019
    }
  },
  mounted () {
    this.initCountUp()
  },
  methods: {
    initCountUp () {
      this.list.forEach((item,index) => {
        let demo = new CountUp(this.$refs['item'+index], item, this.options)
        console.log(demo);
        if (!demo.error) {
          demo.start()
        } else {
          console.error(demo.error)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.text {
  color: #4d63bc;
  font-size: 16px;
}
.content {
  display: flex;
  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
    background: #4d63bc;
    font-size: 50px;
    color: #fff;
    margin-right: 10px;
  }
}
</style>