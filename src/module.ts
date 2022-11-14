import { defu } from 'defu'
import { Ref } from 'vue'
import { addImports, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { HeadExtraHooks, HeadExtraObj, HeadExtraOptions } from './types'

declare module '@nuxt/schema' {
  // @ts-ignore
  interface NuxtConfig {
    ['headExtra']?: Partial<HeadExtraOptions>
  }

  // @ts-ignore
  interface NuxtOptions {
    ['headExtra']?: HeadExtraOptions
  }

  // @ts-ignore
  interface NuxtHooks extends HeadExtraHooks {
  }

  interface NuxtApp {
    $headExtra: Ref<HeadExtraObj>
  }
}

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
  setup (options, nuxt) {
    // @ts-ignore
    const resolver = createResolver(import.meta.url)
    const runtimeDir = resolver.resolve('./runtime')

    nuxt.options.build.transpile.push(runtimeDir)
    nuxt.options.runtimeConfig.public.headExtra = defu(nuxt.options.runtimeConfig.public.headExtra, {
      extra: options.extra,
      defaults: options.defaults
    })

    addImports({
      from: resolver.resolve('runtime/composables/useHeadEx'),
      name: 'useHeadEx2'
    })
    addPlugin({
      src: resolver.resolve('runtime/plugin')
    })
    nuxt.hook('imports:dirs', (dirs) => {
      dirs.push(resolver.resolve('runtime/composables'))
    })
  }
})
