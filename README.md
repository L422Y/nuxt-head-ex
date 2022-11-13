# nuxt-head-ex

Implements `useHeadEx()` composable to automatically propagate title and description to social media compatible meta tags.


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

## Development

- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start [playground](./playground) in development mode.
