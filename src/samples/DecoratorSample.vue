<template>
  <div id="app">
    <h2>Decorator sample</h2>
    <input v-model="searchWord" />
    <p v-for="(item, i) in textLs" :key="i">
      {{ item }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { DebounceWatch } from '../DebounceWatch'
import { Polling } from '../Polling'

const source = ['test', 'test1', 'test2']

@Component
export default class DecoratorSample extends Vue {
  textLs: string[] = source.concat([])
  counter: number = 3

  searchWord: string = ''

  @DebounceWatch('searchWord')
  filter() {
    console.log('DebounceWatch called')
    this.textLs = source.filter((item) => item.indexOf(this.searchWord) >= 0)
  }

  @Polling({ intervalMs: 5000 })
  test() {
    console.log('Polling called')
    this.counter += 1
    source.push(`test${this.counter}`)
    this.textLs = source.concat([])
  }
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
