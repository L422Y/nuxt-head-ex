// @ts-ignore
import { HeadExtraObj, ModuleOptions } from '../../types'
// @ts-ignore
import { Ref, useHead, useNuxtApp, useRoute, useRuntimeConfig, useState } from '#imports'

let renderTitle = function ({
  title,
  subtitle,
  section,
  separator,
  extra
}) {
  let renderedTitle = `${section && section?.length > 0 ? ` ${separator} ${section}` : ''}${extra && extra.length > 0 ? (title ? ` ${separator} ` : '') + extra : ''}`
  if (title) {
    renderedTitle = `${title}${renderedTitle}`
  }
  return renderedTitle
}

export default (headObjInput: HeadExtraObj) => {
  let fullPath: string

  const app = useNuxtApp()
  const config = useRuntimeConfig()
  const options = config.public.headExtra as ModuleOptions
  const headExtraState = useState('headExtraValues', () => {
    return {}
  }) as Ref<HeadExtraObj>

  let {
    title,
    subtitle,
    description,
    section,
    extra,
    socialImageURL
  } = headObjInput

  extra = extra !== undefined ? extra : options.extra

  if (typeof app.$headExtra?.renderTitle === 'function') {
    renderTitle = app.$headExtra?.renderTitle
  }

  // @ts-ignore
  if (process.server) {
    fullPath = app.ssrContext?.url
  } else {
    fullPath = useRoute().path
  }

  // set defaults
  socialImageURL = socialImageURL || options.defaults?.socialImageURL
  title = title || options?.defaults?.title
  subtitle = subtitle || options?.defaults?.subtitle
  section = section || options?.defaults?.section
  description = description || options?.defaults?.description

  socialImageURL = socialImageURL ? socialImageURL?.replace('{{fullPath}}', fullPath) : ''

  const { separator } = options
  const fullTitle = renderTitle({
    title,
    subtitle,
    section,
    extra,
    separator
  })

  // reset/clear existing values in the stored state
  headExtraState.value = {
    fullTitle,
    extra
  } as HeadExtraObj
  Object.assign(headExtraState.value as HeadExtraObj, headObjInput)

  headObjInput.meta = [
    {
      property: 'og:title',
      content: fullTitle
    },
    {
      name: 'twitter:title',
      content: fullTitle
    },
    {
      name: 'clean:title',
      content: title
    }
  ]

  if (section) {
    headObjInput.meta.push({
      name: 'clean:section',
      content: section
    })
  }

  if (socialImageURL && socialImageURL.length > 0) {
    headObjInput.meta.push({
      name: 'twitter:card',
      content: options.twitterImageSize || 'summary_large_image'
    })
    headObjInput.meta.push({
      name: 'twitter:image',
      content: socialImageURL
    })
    headObjInput.meta.push({
      property: 'og:image',
      content: socialImageURL
    })
  }

  if (description) {
    headObjInput.meta.push({
      property: 'og:description',
      content: description
    })
    headObjInput.meta.push({
      name: 'twitter:description',
      content: description
    })
    headObjInput.meta.push({
      name: 'description',
      content: description
    })
  }

  if (subtitle) {
    headObjInput.meta.push({
      name: 'clean:subtitle',
      content: subtitle
    })
  }

  headObjInput.title = fullTitle
  const sendHead: HeadExtraObj = Object.assign({}, options.defaults, headObjInput)
  useHead(sendHead)
  if (typeof app.$headExtra?.callback === 'function') {
    app.$headExtra?.callback(sendHead)
  }
  app.hooks.callHook('headExtra:update' as any, sendHead)
}
