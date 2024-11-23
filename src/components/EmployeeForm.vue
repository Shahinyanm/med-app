<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <BaseInput
      id="fullName"
      v-model="form.fullName"
      label="ФИО"
      required
    />
    <BaseSelect
      id="department"
      v-model="form.department"
      :options="departmentOptions"
      label="Отделение"
      required
    />
    <BaseCheckbox
      v-if="isDoctor"
      id="isHeadOfDepartment"
      v-model="form.isHeadOfDepartment"
      label="Заведующий отделения"
    />
    <BaseButton type="submit" :disabled="!isFormValid">
      {{ employee ? 'Обновить' : 'Добавить' }}
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {Doctor, Nurse, Department, type Employee} from '@/types'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseSelect from '@/components/base/BaseSelect.vue'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import BaseButton from '@/components/base/BaseButton.vue'

interface Props {
  employee?: Doctor | Nurse
  isDoctor: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'submit', employee: Doctor | Nurse): void
}>()

const departmentOptions = Object.entries(Department).map(([value, label]) => ({ value, label }))

const form = ref({
  fullName: '',
  department: Department.Cardiology,
  isHeadOfDepartment: false,
})

const isFormValid = computed(() => {
  return form.value.fullName.trim() !== '' && form.value.department !== ''
})

watch(() => props.employee, (newEmployee:Employee) => {
  if (newEmployee) {
    form.value = {
      ...newEmployee,
      isHeadOfDepartment: props.isDoctor ? (newEmployee as Doctor).isHeadOfDepartment : false
    }
  } else {
    form.value = {
      fullName: '',
      department: employee.department,
      isHeadOfDepartment: false,
    }
  }
}, { immediate: true })

const handleSubmit = () => {
  if (isFormValid.value) {
    emit('submit', { ...form.value, id: props.employee?.id })
  }
}
</script>
