import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Doctor, Nurse } from '@/types'
import { mockDataService } from '@/services/mockDataService'

export const useEmployeeStore = defineStore('employee', () => {
  const doctors = ref<Doctor[]>([])
  const nurses = ref<Nurse[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchAllEmployees = async () => {
    isLoading.value = true
    error.value = null
    try {
      const [fetchedDoctors, fetchedNurses] = await Promise.all([
        mockDataService.fetchDoctors(),
        mockDataService.fetchNurses()
      ])
      doctors.value = fetchedDoctors
      nurses.value = fetchedNurses
    } catch (e) {
      error.value = 'Ошибка при загрузке данных'
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  const addDoctor = async (doctor: Omit<Doctor, 'id'>) => {
    try {
      const newDoctor = await mockDataService.createDoctor(doctor)
      doctors.value.push(newDoctor)
    } catch (e) {
      error.value = 'Ошибка при добавлении врача'
      console.error(e)
    }
  }

  const addNurse = async (nurse: Omit<Nurse, 'id'>) => {
    try {
      const newNurse = await mockDataService.createNurse(nurse)
      nurses.value.push(newNurse)
    } catch (e) {
      error.value = 'Ошибка при добавлении медсестры'
      console.error(e)
    }
  }

  const updateDoctor = async (doctor: Doctor) => {
    try {
      await mockDataService.updateDoctor(doctor)
      const index = doctors.value.findIndex(d => d.id === doctor.id)
      if (index !== -1) {
        doctors.value[index] = doctor
      }
    } catch (e) {
      error.value = 'Ошибка при обновлении данных врача'
      console.error(e)
    }
  }

  const updateNurse = async (nurse: Nurse) => {
    try {
      await mockDataService.updateNurse(nurse)
      const index = nurses.value.findIndex(n => n.id === nurse.id)
      if (index !== -1) {
        nurses.value[index] = nurse
      }
    } catch (e) {
      error.value = 'Ошибка при обновлении данных медсестры'
      console.error(e)
    }
  }

  const deleteDoctor = async (id: number) => {
    try {
      await mockDataService.deleteDoctor(id)
      doctors.value = doctors.value.filter(d => d.id !== id)
    } catch (e) {
      error.value = 'Ошибка при удалении врача'
      console.error(e)
    }
  }

  const deleteNurse = async (id: number) => {
    try {
      await mockDataService.deleteNurse(id)
      nurses.value = nurses.value.filter(n => n.id !== id)
    } catch (e) {
      error.value = 'Ошибка при удалении медсестры'
      console.error(e)
    }
  }

  return {
    doctors: computed(() => doctors.value),
    nurses: computed(() => nurses.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    fetchAllEmployees,
    addDoctor,
    addNurse,
    updateDoctor,
    updateNurse,
    deleteDoctor,
    deleteNurse,
  }
})
