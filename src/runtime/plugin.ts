import { HeadExtraObj } from '../types'
// @ts-ignore
import { defineNuxtPlugin, useState } from '#app'

export default defineNuxtPlugin(() => {
  let callback: null | Function
  let renderTitle: null | Function
  return {
    provide: {
      headExtra: {
        callback,
        /**
         * @example
         * (title, subtitle, section, extra, separator) => {
         *           let fullTitle = `${section && section?.length > 0 ? ` ${separator} ${section}` : ''}${extra && extra.length > 0 ? (title ? `  ${separator} ` : '') + extra : ''}`
         *           if (title) {
         *             fullTitle = `${title}${fullTitle}`
         *           } else {
         *             title = fullTitle
         *           }
         *           return fullTitle
         *         }
         */
        renderTitle,
        values: useState('headExtra', () => {
          return {}
        }) as HeadExtraObj
      }
    }
  }
})
