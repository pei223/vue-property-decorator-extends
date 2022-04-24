import { createDecorator } from 'vue-class-component'
import Vue from 'vue'
import { ComponentOptions } from 'vue/types/umd'

type PollingOptions = {
  intervalMs?: number
}

export const DEFAULT_POLLING_INTERVAL = 3000

const getCallbackId = (methodName: string) => {
  return `${methodName}_pollingCallbackId`
}

/**
 * decorator of a polling function
 * @param  options polling options
 */
export function Polling(options: PollingOptions = {}) {
  const intervalMs = options.intervalMs ?? DEFAULT_POLLING_INTERVAL
  return createDecorator((componentOptions, methodName) => {
    componentOptions.mixins = componentOptions.mixins || []
    componentOptions.mixins = componentOptions.mixins.concat([
      {
        created() {
          ;(this as any)[getCallbackId(methodName)] = setInterval(() => {
            ;(this as any)[methodName]()
          }, intervalMs)
        },
        beforeDestroy() {
          clearInterval((this as any)[getCallbackId(methodName)])
          ;(this as any)[getCallbackId(methodName)] = null
        },
      },
    ])
  })
}

export function Test(v: string) {
  return (vu: ComponentOptions<Vue>, d: string) => {
    console.log(vu, d)
  }
}
