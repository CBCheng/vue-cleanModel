<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div class="rollLine">
        <roBlank v-for="i in 6" :key="i" :row="i" :toggle="isToggle" :totalRow="6"></roBlank>
        <div @click="isToggle = true">toggle</div>
        <div id="percent-loaded" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" />1</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import roBlank from '@/components/roBlank.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    roBlank
  },
  data: () => ({
        isToggle:false,
    }),
}
</script>
<style lang="scss">
.home{
  width: 100%;
  overflow: auto;
  position: relative;
}
.rollLine{
  width: 300px;
  position: absolute;
  top: 0;
  left: 300px;
  perspective: 400px;
}

</style>
