<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <div class="link">
      <router-link to="render-test">渲染测试</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {}
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.link {
  border-bottom: 1px solid rgb(177, 172, 172);
}
</style>
