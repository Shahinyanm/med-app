<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white">
      <thead class="bg-gray-100">
      <tr>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ФИО</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Отделение</th>
        <th v-if="showHeadOfDepartment" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Заведующий отделения</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
      </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
      <tr v-for="employee in employees" :key="employee.id">
        <td class="px-6 py-4 whitespace-nowrap">{{ employee.fullName }}</td>
        <td class="px-6 py-4 whitespace-nowrap">{{ employee.department }}</td>
        <td v-if="showHeadOfDepartment" class="px-6 py-4 whitespace-nowrap">
          {{ (employee as Doctor).isHeadOfDepartment ? 'Да' : 'Нет' }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <BaseButton @click="$emit('edit', employee)" class="mr-2" variant="secondary">Редактировать</BaseButton>
          <BaseButton @click="$emit('delete', employee.id)" variant="danger">Удалить</BaseButton>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { Doctor, Nurse } from '@/types'
import BaseButton from '@/components/base/BaseButton.vue'

interface Props {
  employees: (Doctor | Nurse)[]
  showHeadOfDepartment: boolean
}

defineProps<Props>()
defineEmits(['edit', 'delete'])
</script>
