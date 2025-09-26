import { create } from "zustand";
import { Habit } from "@/models/Habit";
import { format } from "date-fns";

const API_URL = "http://192.168.1.28:8080/api/v1/habits";

interface HabitsState {
  habits: Habit[];
  addHabit: (name: string, color?: string, icon?: string) => Promise<void>;
  tickHabit: (id: string, date?: Date) => void;
  resetHabit: (id: string) => void;
  getHabitsByDate: (date: Date) => (Habit & { done: boolean })[];
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

  tickHabit: (id: string, date: Date = new Date()) => {
    const targetDate = format(date, "yyyy-MM-dd");

    set((state) => ({
      habits: state.habits.map((h) =>
        h.id !== id
          ? h
          : {
            ...h,
            doneDates: h.doneDates.includes(targetDate)
              ? h.doneDates
              : [...h.doneDates, targetDate],
          }
      ),
    }));
  },

  resetHabit: (id: string) =>
    set((state) => ({
      habits: state.habits.map((h) =>
        h.id === id
          ? { ...h, doneDates: [], streakHistory: [], currentStreak: 0, longestStreak: 0 }
          : h
      ),
    })),

  getHabitsByDate: (date: Date) => {
    const { habits } = get();
    const target = format(date, "yyyy-MM-dd");

    return habits.map((h) => ({
      ...h,
      done: h.doneDates.includes(target),
    }));
  },

  getHabitById: (id: string) => {
    const { habits } = get();
    return habits.find((h) => h.id === id);
  },
}));
