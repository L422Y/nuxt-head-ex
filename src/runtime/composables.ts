import {useHead, useNuxtApp, useRoute, useRuntimeConfig} from "#app";
import {HeadExtraObj, HeadExtraOptions} from "../types";

export const useHeadEx = (headObjInput: HeadExtraObj) => {
  let
    sendHead,
    fullTitle,
    fullPath

  let {subtitle, title, description, section, socialImageURL} = headObjInput

  let
    config = useRuntimeConfig(),
    options: HeadExtraOptions = config['headExtra'] || {},
    extra = options.extra

  if (process.server) {
    let app = useNuxtApp()
    app = useNuxtApp()
    fullPath = app.ssrContext?.url
  } else {
    fullPath = useRoute().path
  }

  socialImageURL ??= options.defaults?.socialImageURL
  socialImageURL = socialImageURL ? socialImageURL?.replace('{{fullPath}}', fullPath) : ''

  fullTitle = `${section && section?.length > 0 ? ` - ${section}` : ''}${extra && extra.length > 0 ? (title ? ' - ' : '') + extra : ''}`

  if (!!title) {
    fullTitle = `${title}${fullTitle}`
  } else {
    title = fullTitle
  }

  headObjInput.meta = [
    {property: "og:title", content: fullTitle},
    {name: "twitter:title", content: fullTitle},
    {name: "clean:title", content: title},
    {name: "clean:section", content: section},
  ]
  if (socialImageURL && socialImageURL.length > 0) {
    headObjInput.meta.push({name: "twitter:card", content: options.twitterImageSize || 'summary_large_image'})
    headObjInput.meta.push({name: "twitter:image", content: socialImageURL})
    headObjInput.meta.push({property: "og:image", content: socialImageURL})
  }

  if (!!description) {
    headObjInput.meta.push({property: "og:description", content: description})
    headObjInput.meta.push({name: "twitter:description", content: description})
    headObjInput.meta.push({name: "description", content: description})
  }

  if (!!subtitle) {
    headObjInput.meta.push({name: "clean:subtitle", content: subtitle})
  }

  headObjInput['title'] = fullTitle

  sendHead = Object.assign({}, options.defaults, headObjInput)
  useHead(sendHead)
}
