<template>
  <button
    :type="type"
    :disabled="disabled"
    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
    :class="[variantClasses[variant]]"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'danger'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  disabled: false,
  variant: 'primary'
})

const variantClasses = {
  primary: 'bg-indigo-600 hover:bg-indigo-700',
  secondary: 'bg-gray-600 hover:bg-gray-700',
  danger: 'bg-red-600 hover:bg-red-700'
}

const classes = computed(() => variantClasses[props.variant])
</script>
