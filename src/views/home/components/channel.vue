<template>
<!--
  v-model 是：
  v-bind:value="数据"
  v-on：inpu="数据=$event"
 -->
  <!-- <van-popup
    v-model="show"
    position="bottom"
    :style="{ height: '93%' }"
  /> -->
  <van-popup
    v-bind:value="value"
    @input="$emit('input', $event)"
    position="bottom"
    :style="{ height: '93%' }"
  />
</template>

<script>
export default {
  name: 'HomeChannel',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  }

}
</script>

<style lang="less" scoped>

</style>
