import { shallowMount, mount, Wrapper } from '@vue/test-utils'
import Component from 'vue-class-component'
import Vue from 'vue'
import { Prop, Watch } from 'vue-property-decorator'
import {
  DebounceWatch,
  DEFAULT_DEBOUNCE_WATCH_INTERVAL,
} from '../src/DebounceWatch'

beforeEach(() => {
  jest.useFakeTimers()
  jest.spyOn(global, 'clearTimeout')
})

afterEach(() => {
  jest.useRealTimers()
})
describe('DebounceWatch', () => {
  it('sample', async () => {
    @Component
    class TestComponent extends Vue {
      @Prop({})
      testProp1!: string

      counter: number = 0

      @DebounceWatch(['testProp1'])
      // @Watch('testProp1')
      countUp() {
        this.counter += 1
      }

      render() {}
    }

    const view = shallowMount(TestComponent)
    view.setProps({ testProp1: 'update1' })
    // view.setProps({ testProp1: 'update2' })
    await view.vm.$nextTick()
    jest.advanceTimersByTime(DEFAULT_DEBOUNCE_WATCH_INTERVAL)
    console.log(view.vm.testProp1)
    expect(view.vm.counter).toBe(1)
  })
})
