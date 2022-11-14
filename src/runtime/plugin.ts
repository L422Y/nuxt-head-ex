import { HeadExtraObj } from '../types'
// @ts-ignore
import { defineNuxtPlugin, useState } from '#app'

export default defineNuxtPlugin(() => {
  let callback: null | Function
  return {
    provide: {
      headExtra: {
        callback,
        values: useState('headExtra', () => {
          return {}
        }) as HeadExtraObj
      }
    }
  }
})
