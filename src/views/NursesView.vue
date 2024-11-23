<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Медсестры</h1>
    <BaseButton @click="openModal" class="mb-4">
      Добавить медсестру
    </BaseButton>
    <EmployeeTable
      :employees="nurses"
      :show-head-of-department="false"
      @edit="editNurse"
      @delete="confirmDelete"
    />

    <Modal v-model="showModal" :title="editingNurse ? 'Редактировать медсестру' : 'Добавить медсестру'">
      <EmployeeForm
        :is-doctor="false"
        :employee="editingNurse"
        @submit="handleSubmit"
      />
    </Modal>

    <Modal v-model="showDeleteModal" title="Подтвердите удаление">
      <p class="mb-4">Вы уверены, что хотите удалить эту медсестру?</p>
      <div class="flex justify-end">
        <BaseButton @click="showDeleteModal = false" class="mr-2" variant="secondary">
          Отмена
        </BaseButton>
        <BaseButton @click="deleteNurse" variant="danger">
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
import type { Nurse } from '@/types'

const store = useEmployeeStore()
const nurses = computed(() => store.nurses)
const editingNurse = ref<Nurse | null>(null)
const showModal = ref(false)
const showDeleteModal = ref(false)
const nurseToDelete = ref<number | null>(null)

onMounted(() => {
  store.fetchAllEmployees()
})

const openModal = () => {
  showModal.value = true
  editingNurse.value = null
}

const handleSubmit = async (nurse: Nurse) => {
  if (editingNurse.value) {
    await store.updateNurse(nurse)
  } else {
    await store.addNurse(nurse)
  }
  showModal.value = false
  editingNurse.value = null
}

const editNurse = (nurse: Nurse) => {
  editingNurse.value = nurse
  showModal.value = true
}

const confirmDelete = (id: number) => {
  nurseToDelete.value = id
  showDeleteModal.value = true
}

const deleteNurse = async () => {
  if (nurseToDelete.value !== null) {
    await store.deleteNurse(nurseToDelete.value)
    showDeleteModal.value = false
    nurseToDelete.value = null
  }
}
</script>
