import { create } from "zustand";

export type Employee = {
  id: string;
  name: string;
  role: "haircut" | "massage" | "nails" | "spa" | "all";
  active: boolean;
};

export type Booking = {
  id: string;
  service: string;
  employee: string;
  employeeId?: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  createdAt: string;
};

type BookingStore = {
  bookings: Booking[];
  employees: Employee[];

  setBookings: (b: Booking[]) => void;
  addBooking: (b: Booking) => void;
  updateBooking: (id: string, data: Partial<Booking>) => void;
  deleteBooking: (id: string) => void;

  setEmployees: (e: Employee[]) => void;
  addEmployee: (e: Employee) => void;
};

export const useBookingStore = create<BookingStore>((set) => ({
  bookings: [],
  employees: [
    { id: "e1", name: "John", role: "haircut", active: true },
    { id: "e2", name: "Anna", role: "massage", active: true },
    { id: "e3", name: "Mike", role: "haircut", active: true },
    { id: "e4", name: "Sara", role: "haircut", active: true },
    { id: "e5", name: "Tom", role: "haircut", active: true },
    { id: "e6", name: "Emma", role: "spa", active: true },
    { id: "e7", name: "Liam", role: "massage", active: true },
    { id: "e8", name: "Tom", role: "massage", active: true },
    { id: "e9", name: "Rio", role: "spa", active: true },
    { id: "e10", name: "Ysar", role: "spa", active: true },
  ],

  setBookings: (bookings) => set({ bookings }),

  addBooking: (booking) =>
    set((state) => ({
      bookings: [...state.bookings, booking],
    })),

  updateBooking: (id, data) =>
    set((state) => ({
      bookings: state.bookings.map((b) =>
        b.id === id ? { ...b, ...data } : b
      ),
    })),

  deleteBooking: (id) =>
    set((state) => ({
      bookings: state.bookings.filter((b) => b.id !== id),
    })),

  setEmployees: (employees) => set({ employees }),

  addEmployee: (employee) =>
    set((state) => ({
      employees: [...state.employees, employee],
    })),
}));
