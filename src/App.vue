<template>
  <div id="app">
    <router-view></router-view>
    <div class="box"></div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
.box {
  width: 750px;
  height: 200px;
  background-color: blueviolet
}
</style>
