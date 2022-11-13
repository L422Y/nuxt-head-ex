import { defineNuxtConfig } from 'nuxt/config'
import HeadEx from '..'

export default defineNuxtConfig({
  modules: [
    HeadEx
  ],
  headExtra: {
    extra: 'Larry Williamson - Full-stack Engineer and Creative Technologist',
    defaults: {
      // you can use {{fullPath}} to pass the path to a dynamic image generator
      socialImageURL: 'https://l422y.com/images/share.png?path={{fullPath}}',
      description: 'Senior full-stack engineer and creative technologist with over 20 years’ experience and a focus in software, interactive and web development.'
    }
  }
})
