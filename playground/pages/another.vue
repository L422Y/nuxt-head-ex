<template>
  <div>
    Another page, check your meta tags!
  </div>
</template>

<script setup>
import { useHeadEx } from '#imports'

useHeadEx({
  title: 'Another Page',
  section: 'Other Section',
  extra: false
})
</script>
