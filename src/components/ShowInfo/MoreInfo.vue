<template>
  <TextEllipsis :text="text" :height="44" text-class="more-info" :is-limit-height="isLimitHeight">
    <template v-slot:more>
      <span>...</span>
      <span class="link" @click="isLimitHeight = false">
        更多
      </span>
    </template>
    <template #after>
      <span v-if="!isLimitHeight" class="link" @click="isLimitHeight = true">收起</span>
    </template>
  </TextEllipsis>
</template>

<script>
  import create from '../../utils/create/create.js'
  import TextEllipsis from '../TextElipsis/TextElipsis.vue'
  export default create({
    name: 'MoreInfo',

    components: { TextEllipsis },

    props: {
      text: String
    },

    data() {
      return {
        isLimitHeight: true
      }
    },

    methods: {}
  })
</script>

<style lang="scss">
  .hd-showinfo-notice-content {
    .link {
      margin-left: 3px;
      color: #007fff;
      cursor: pointer;
    }
    & .hd-textellipsis {
      margin-left: 15px;
    }
    & .more-info {
      line-height: 22px;
      font-size: 14px;
      font-weight: 400;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #999;
    }
  }
</style>
