import { HeadExtraObj, HeadExtraOptions } from '../../types'
// @ts-ignore
import { Ref, useHead, useNuxtApp, useRoute, useRuntimeConfig, useState } from '#imports'

export default (headObjInput: HeadExtraObj) => {
  const app = useNuxtApp()
  let
    fullTitle: string,
    fullPath: string

  let {
    title,
    socialImageURL
  } = headObjInput

  const {
    subtitle,
    description,
    section
  } = headObjInput

  const config = useRuntimeConfig()
  const options: HeadExtraOptions = config.headExtra || {}
  const extra = options.extra
  const headExtraState = useState('headExtraValues', () => {
    return {}
  }) as Ref<HeadExtraObj>

  // @ts-ignore
  if (process.server) {
    fullPath = app.ssrContext?.url
  } else {
    fullPath = useRoute().path
  }

  socialImageURL ??= options.defaults?.socialImageURL
  socialImageURL = socialImageURL ? socialImageURL?.replace('{{fullPath}}', fullPath) : ''

  fullTitle = `${section && section?.length > 0 ? ` - ${section}` : ''}${extra && extra.length > 0 ? (title ? ' - ' : '') + extra : ''}`

  if (title) {
    fullTitle = `${title}${fullTitle}`
  } else {
    title = fullTitle
  }

  // reset/clear existing values in the stored state
  headExtraState.value = {} as HeadExtraObj
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
    },
    {
      name: 'clean:section',
      content: section
    }
  ]

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
