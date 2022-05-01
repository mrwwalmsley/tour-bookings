<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  label: string
}>()

defineEmits(['update:modelValue'])

</script>

<template>
  <label text="right" for="input">{{ props.label }}</label>
  <input
    id="input"
    :value="modelValue"
    type="text"
    autocomplete="false"
    text="left"
    p="x4 y2"
    w="130px"
    bg="transparent"
    border="~ rounded gray-200 dark:gray-700"
    outline="none active:none"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  >
</template>
