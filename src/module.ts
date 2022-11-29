import { defu } from 'defu'
import { addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { HeadExtraObj, ModuleOptions } from './types'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'head-extra',
    configKey: 'headExtra'
  },
  defaults: {
    extra: '',
    twitterImageSize: 'summary_large_image',
    separator: '-',
    defaults: {} as HeadExtraObj
  },
  setup (options, nuxt) {
    // @ts-ignore
    const resolver = createResolver(import.meta.url)
    const runtimeDir = resolver.resolve('./runtime')

    nuxt.options.build.transpile.push(runtimeDir)
    nuxt.options.runtimeConfig.public.headExtra = defu(nuxt.options.runtimeConfig.public.headExtra, options)

    addPlugin({
      src: resolver.resolve('runtime/plugin')
    })
    nuxt.hook('imports:dirs', (dirs) => {
      dirs.push(resolver.resolve('runtime/composables'))
    })
  }
})
