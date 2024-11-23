<template>
  <div class="flex items-center">
    <input
      :id="id"
      type="checkbox"
      v-bind="$attrs"
      :checked="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
    >
    <label :for="id" class="ml-2 block text-sm text-gray-900">
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: string
  label: string
  modelValue: boolean
}>()

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>
