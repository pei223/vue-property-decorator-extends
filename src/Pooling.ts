import { createDecorator } from 'vue-class-component'
import Vue from 'vue'
import { ComponentOptions } from 'vue/types/umd'

type PoolingOptions = {
  intervalMs?: number
}

export const DEFAULT_POOLING_INTERVAL = 3000

const getCallbackId = (methodName: string) => {
  return `${methodName}_poolingCallbackId`
}

/**
 * decorator of a watch function with debounce
 * @param  path the path or the expression to observe
 * @param  watchOptions
 */
export function Pooling(options: PoolingOptions = {}) {
  const intervalMs = options.intervalMs ?? DEFAULT_POOLING_INTERVAL
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
