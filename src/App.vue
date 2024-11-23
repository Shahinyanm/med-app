<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow">
      <nav class="container mx-auto px-4 py-4">
        <RouterLink to="/doctors" class="text-lg font-semibold text-gray-700 hover:text-gray-900 mr-4">Врачи</RouterLink>
        <RouterLink to="/nurses" class="text-lg font-semibold text-gray-700 hover:text-gray-900">Медсестры</RouterLink>
      </nav>
    </header>

    <main class="container mx-auto px-4 py-8">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
