<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'Tour Bookings',
  meta: [
    { name: 'description', content: 'Template for bookings website' },
  ],
})
</script>

<template>
  <RouterView />
</template>
