import { createDecorator } from 'vue-class-component'
import { debounce } from 'lodash'
import Vue from 'vue'
import { ComponentOptions } from 'vue/types/umd'

type DebounceWatchOptions = {
  intervalMs?: number
}

export const DEFAULT_DEBOUNCE_WATCH_INTERVAL = 1000

const getCallbackName = (methodName: string) => {
  return `${methodName}_debouceWatchCallback`
}

/**
 * decorator of a watch function with debounce
 * @param  path the path or the expression to observe
 * @param  watchOptions
 */
export function DebounceWatch(
  watchVar: string | string[],
  options: DebounceWatchOptions = {},
) {
  const watchVars = Array.isArray(watchVar) ? watchVar : [watchVar]
  const intervalMs = options.intervalMs ?? DEFAULT_DEBOUNCE_WATCH_INTERVAL
  return createDecorator((componentOptions, methodName) => {
    componentOptions.mixins = componentOptions.mixins || []
    componentOptions.mixins = componentOptions.mixins.concat([
      {
        created() {
          ;(this as any)[getCallbackName(methodName)] = debounce(() => {
            ;(this as any)[methodName]()
          }, intervalMs)
        },
        beforeDestroy() {
          ;(this as any)[getCallbackName(methodName)].cancel()
        },
      },
    ])
    watchVars.forEach((_watchVar) => {
      componentOptions.mixins = componentOptions.mixins!.concat([
        {
          watch: {
            [_watchVar]: function () {
              ;(this as any)[getCallbackName(methodName)]()
            },
          },
        },
      ])
    })
  })
}

export function Test(v: string) {
  return (vu: ComponentOptions<Vue>, d: string) => {
    console.log(vu, d)
  }
}
