<template>
  <van-popup
    v-model="show"
    position="bottom"
    :style="{ height: '93%' }"
  />
</template>

<script>
export default {
  name: 'HomeChannel',
  props: {},
  data () {
    return {
      show: false
    }
  }

}
</script>

<style lang="less" scoped>

</style>
