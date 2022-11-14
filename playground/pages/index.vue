<template>
  <div>
    useHeadEx() / nuxt-head-ex playground, check your meta tags!
    <h1>{{ headExtraValues.title }}</h1>
  </div>
</template>
<script setup>
import { useHeadEx, useState } from '#imports'
const headExtraValues = useState('headExtraValues')
useHeadEx({
  title: 'Home Page'
})
</script>
