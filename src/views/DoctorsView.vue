<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Врачи</h1>
    <BaseButton @click="openModal" class="mb-4">
      Добавить врача
    </BaseButton>
    <EmployeeTable
      :employees="doctors"
      :show-head-of-department="true"
      @edit="editDoctor"
      @delete="confirmDelete"
    />

    <Modal v-model="showModal" :title="editingDoctor ? 'Редактировать врача' : 'Добавить врача'">
      <EmployeeForm
        :is-doctor="true"
        :employee="editingDoctor"
        @submit="handleSubmit"
      />
    </Modal>

    <Modal v-model="showDeleteModal" title="Подтвердите удаление">
      <p class="mb-4">Вы уверены, что хотите удалить этого врача?</p>
      <div class="flex justify-end">
        <BaseButton @click="showDeleteModal = false" class="mr-2" variant="secondary">
          Отмена
        </BaseButton>
        <BaseButton @click="deleteDoctor" variant="danger">
          Удалить
        </BaseButton>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useEmployeeStore } from '@/stores/employeeStore'
import EmployeeTable from '@/components/EmployeeTable.vue'
import EmployeeForm from '@/components/EmployeeForm.vue'
import Modal from '@/components/Modal.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import type { Doctor } from '@/types'

const store = useEmployeeStore()
const doctors = computed(() => store.doctors)
const editingDoctor = ref<Doctor | null>(null)
const showModal = ref(false)
const showDeleteModal = ref(false)
const doctorToDelete = ref<number | null>(null)

onMounted(() => {
  store.fetchAllEmployees()
})

const openModal = () => {
  showModal.value = true
  editingDoctor.value = null
}

const handleSubmit = async (doctor: Doctor) => {
  if (editingDoctor.value) {
    await store.updateDoctor(doctor)
  } else {
    await store.addDoctor(doctor)
  }
  showModal.value = false
  editingDoctor.value = null
}

const editDoctor = (doctor: Doctor) => {
  editingDoctor.value = doctor
  showModal.value = true
}

const confirmDelete = (id: number) => {
  doctorToDelete.value = id
  showDeleteModal.value = true
}

const deleteDoctor = async () => {
  if (doctorToDelete.value !== null) {
    await store.deleteDoctor(doctorToDelete.value)
    showDeleteModal.value = false
    doctorToDelete.value = null
  }
}
</script>
