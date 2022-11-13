import {fileURLToPath} from 'url'
import {defu} from 'defu'
import {addImports, createResolver, defineNuxtModule} from '@nuxt/kit'
import {HeadExtraObj, HeadExtraOptions} from "./types";

export default defineNuxtModule<HeadExtraOptions>({
  meta: {
    name: 'head-extra',
    configKey: 'headExtra'
  },
  defaults: {
    extra: '',
    twitterImageSize: 'summary_large_image',
    defaults: {} as HeadExtraObj
  },
  setup(options, nuxt) {
    // @ts-ignore
    const resolver = createResolver(import.meta.url)
    // @ts-ignore
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)
    nuxt.options.runtimeConfig.public.headExtra = defu(nuxt.options.runtimeConfig.public.headExtra, {
      extra: options.extra,
      defaults: options.defaults
    })

    addImports({
      from: resolver.resolve('runtime/composables'),
      name: 'useHeadEx',
      as: 'useHeadEx'
    })

  }
})

