import { create } from "zustand";
import { Habit } from "@/models/Habit";
import { format } from "date-fns";

const API_URL = "http://192.168.1.28:8080/api/v1/habits";

interface HabitsState {
  habits: Habit[];
  addHabit: (name: string, color?: string, icon?: string) => Promise<void>;
  toggleHabit: (id: string) => Promise<void>;
  getHabitsByDate: (date: Date) => Promise<(Habit & { done: boolean })[]>;
  getHabitById: (id: string) => Habit | undefined;
}

export const useHabitsStore = create<HabitsState>((set, get) => ({
  habits: [],

  addHabit: async (name: string, color?: string, icon?: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name, color, icon }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create habit: ${response.status}`);
      }

      const newHabit: Habit = await response.json();

      set((state) => ({
        habits: [...state.habits, newHabit],
      }));
    } catch (err) {
      console.error("Error creating habit:", err);
    }
  },

  toggleHabit: async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/${id}/toggle`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to toggle habit: ${response.status}`);
      }

      const updatedHabit: Habit = await response.json();

      set((state) => ({
        habits: state.habits.map((h) =>
          h.id === id ? updatedHabit : h
        ),
      }));
    } catch (err) {
      console.error("Error toggling habit:", err);
    }
  },

  getHabitsByDate: async (date: Date) => {
    try {
      const token = localStorage.getItem("token");
      const formattedDate = format(date, "yyyy-MM-dd");
      const response = await fetch(`${API_URL}/by-date?date=${formattedDate}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch habits by date: ${response.status}`);
      }

      const habitsByDate: (Habit & { done: boolean })[] = await response.json();

      set({ habits: habitsByDate });

      return habitsByDate;
    } catch (err) {
      console.error("Error fetching habits by date:", err);
      return [];
    }
  },

  getHabitById: (id: string) => {
    const { habits } = get();
    return habits.find((h) => h.id === id);
  },
}));
