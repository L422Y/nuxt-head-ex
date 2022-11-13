<template>
  <div>
    Test page, check your meta tags!
  </div>
</template>

<script setup>
import {useHeadEx} from "../../src/runtime/composables";

useHeadEx({
  title: "Test Page"
})
</script>
