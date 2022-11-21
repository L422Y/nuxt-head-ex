# Nuxt: Head<em>Extra</em>

Implements `useHeadEx()` composable to automatically propagate title and description to social media compatible meta
tags.

```shell
yarn add nuxt-head-ex
```

...and add the module to your `nuxt.config.ts`:

```shell
 modules: ['nuxt-head-ex'],
```

Configuration example (see `types.ts` for more information / parameters):

```js
export default defineNuxtConfig({
  modules: ['nuxt-head-ex'],
  headExtra: {
    extra: 'My Sweet Website', // appended to titles
    separator: '•', // used to separate title components / extra
    defaults: {
      // you can use {{fullPath}} to pass the path to a dynamic image generator
      socialImageURL: 'https://l422y.com/images/share.png?path={{fullPath}}',
      description: 'Senior full-stack engineer and creative technologist with over 20 years’ experience and a focus in software, interactive and web development.'
    }
  }
})
```

Usage:

```js
<script setup>
  useHeadEx({
  title: `${project?.title}`,
  subtitle,
  section: `PROJECTS`,
  description: `${excerpt}`
})
</script>
```

Accessing updated values:

```js
const nuxt = useNuxtApp()
const sectionTitle = useState('sectionTitle')

// set up a callback
nuxt.$headExtra.callback = (headObj) => { /*...*/
}

// ...or use the `headExtra:update` nuxt hook
nuxt.hook('headExtra:update', (headObj) => {
  sectionTitle = headObj.meta.find(v => v.name === 'clean:section')
})
```

Accessing the currently used input reflectively:

#### **`app.vue`**
```js
<template>
  <div v-if="hExValues?.section">
    hExValues.section = "{{ hExValues.section }}"
  </div>
  <NuxtPage/>
</template>
<script setup>
  const hExValues = useState('headExtraValues')
</script>
```
#### **`pages/test.vue`**
```js
<template>
  <section id="testing">
    Now we're cooking with gas!
  </section>
</template>
<script setup>
  useHeadEx({
      title: 'Testing!', 
      section: 'Testing Section'
  })
</script>
```

## Development

- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start [playground](./playground) in development mode.


## Credits

Made with 💚 by [Larry Williamson](https://l422y.com) / [@l422y](https://twitter.com/l422y)
