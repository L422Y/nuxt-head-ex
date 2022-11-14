<template>
  <div>
    Test page, check your meta tags!
  </div>
</template>

<script setup>
import { useHeadEx } from '#imports'

useHeadEx({
  title: 'Test Page',
  section: 'Testing Section'
})
</script>
