import { ref } from 'vue'
import type { Doctor, Nurse } from '@/types'
import doctorsMockData from '@/mocks/doctors.json'
import nursesMockData from '@/mocks/nurses.json'

const doctors = ref<Doctor[]>(doctorsMockData)
const nurses = ref<Nurse[]>(nursesMockData)

export const mockDataService = {
  fetchDoctors: () => Promise.resolve(doctors.value),
  fetchNurses: () => Promise.resolve(nurses.value),

  createDoctor: (doctor: Omit<Doctor, 'id'>) => {
    const newDoctor = { ...doctor, id: Date.now() }
    doctors.value.push(newDoctor)
    return Promise.resolve(newDoctor)
  },

  createNurse: (nurse: Omit<Nurse, 'id'>) => {
    const newNurse = { ...nurse, id: Date.now() }
    nurses.value.push(newNurse)
    return Promise.resolve(newNurse)
  },

  updateDoctor: (updatedDoctor: Doctor) => {
    const index = doctors.value.findIndex(d => d.id === updatedDoctor.id)
    if (index !== -1) {
      doctors.value[index] = updatedDoctor
    }
    return Promise.resolve(updatedDoctor)
  },

  updateNurse: (updatedNurse: Nurse) => {
    const index = nurses.value.findIndex(n => n.id === updatedNurse.id)
    if (index !== -1) {
      nurses.value[index] = updatedNurse
    }
    return Promise.resolve(updatedNurse)
  },

  deleteDoctor: (id: number) => {
    doctors.value = doctors.value.filter(d => d.id !== id)
    return Promise.resolve()
  },

  deleteNurse: (id: number) => {
    nurses.value = nurses.value.filter(n => n.id !== id)
    return Promise.resolve()
  }
}
