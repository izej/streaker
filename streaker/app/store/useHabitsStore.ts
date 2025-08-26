import { create } from "zustand";
import { Habit } from "@/models/Habit";
import { v4 as uuidv4 } from "uuid";
import { isSameDay } from "date-fns";

interface HabitsState {
  habits: Habit[];
  addHabit: (name: string, color?: string, icon?: string) => void;
  tickHabit: (id: string) => void;
  resetHabit: (id: string) => void;
  getHabitsByDate: (date: Date) => (Habit & { done: boolean })[];
}

export const useHabitsStore = create<HabitsState>((set, get) => ({
  habits: [
    {
      id: uuidv4(),
      name: "Drink water",
      createdAt: new Date().toISOString(),
      streak: 3,
      lastChecked: new Date().toISOString(),
      color: "#d1c4e9"
    },
    {
      id: uuidv4(),
      name: "Exercise",
      createdAt: new Date().toISOString(),
      streak: 0,
      color: "#ffe0b2"
    }
  ],

  addHabit: (name: string, color?: string, icon?: string) =>
    set((state) => ({
      habits: [
        ...state.habits,
        {
          id: uuidv4(),
          name,
          createdAt: new Date().toISOString(),
          streak: 0,
          color: color ?? "#ccc", // default
          icon: icon ?? "✅" // default emoji
        }
      ]
    })),

  tickHabit: (id: string) =>
    set((state) => ({
      habits: state.habits.map((h) =>
        h.id === id
          ? {
            ...h,
            streak: h.streak + 1,
            lastChecked: new Date().toISOString(),
            longestStreak:
              !h.longestStreak || h.streak + 1 > h.longestStreak
                ? h.streak + 1
                : h.longestStreak
          }
          : h
      )
    })),

  resetHabit: (id: string) =>
    set((state) => ({
      habits: state.habits.map((h) =>
        h.id === id ? { ...h, streak: 0, lastChecked: undefined } : h
      )
    })),

  getHabitsByDate: (date: Date) => {
    const { habits } = get();
    return habits.map((h) => ({
      ...h,
      done: h.lastChecked ? isSameDay(new Date(h.lastChecked), date) : false
    }));
  }
}));
