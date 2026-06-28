import { create } from "zustand";

export type Employee = {
  id: string;
  name: string;
  role: "barber" | "stylist" | "junior";
  active: boolean;
  skills: string[];
  maxPerDay: number;
};

type EmployeeStore = {
  employees: Employee[];
  setEmployees: (e: Employee[]) => void;
};

export const useEmployeeStore = create<EmployeeStore>((set) => ({
  employees: [
    {
      id: "e1",
      name: "John",
      role: "barber",
      active: true,
      skills: ["haircut", "fade", "beard"],
      maxPerDay: 8,
    },
    {
      id: "e2",
      name: "Anna",
      role: "stylist",
      active: true,
      skills: ["haircut", "color", "wash"],
      maxPerDay: 6,
    },
    {
      id: "e3",
      name: "Mike",
      role: "junior",
      active: true,
      skills: ["basic haircut"],
      maxPerDay: 5,
    },
  ],

  setEmployees: (employees) => set({ employees }),

  updateEmployee: (id: string, data: Partial<Employee>) =>
    set((state) => ({
      employees: state.employees.map((e) =>
        e.id === id ? { ...e, ...data } : e
      ),
    })),
}));
