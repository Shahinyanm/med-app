// src/types/index.ts

export enum Department {
  Cardiology = 'Кардиологическое',
  Surgery = 'Хирургическое'
}

export interface Employee {
  id: number;
  fullName: string;
  department: Department;
}

export interface Doctor extends Employee {
  isHeadOfDepartment: boolean;
}

export interface Nurse extends Employee {}
