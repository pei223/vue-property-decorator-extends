<template>
  <div id="app">
    hello world
    <p>decorator sample</p>
    <button @click="enableSample = !enableSample">
      {{ enableSample ? 'disable' : 'enable' }}
    </button>
    <decorator-sample v-if="enableSample" />
  </div>
</template>

<script lang="ts">
import DecoratorSample from './DecoratorSample.vue'
import { Component, Vue } from 'vue-property-decorator'

const source = ['test', 'test1', 'test2']

@Component({
  components: {
    DecoratorSample,
  },
})
export default class App extends Vue {
  enableSample: boolean = true
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
