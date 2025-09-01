import { create } from "zustand";
import { Habit, Streak } from "@/models/Habit";
import { v4 as uuidv4 } from "uuid";
import { format, isSameDay, addDays, parseISO, subDays, formatISO } from "date-fns";

function calculateStreaks(doneDates: string[]): {
  streakHistory: Streak[];
  currentStreak: number;
  longestStreak: number;
} {
  if (doneDates.length === 0) {
    return { streakHistory: [], currentStreak: 0, longestStreak: 0 };
  }

  const sorted = [...doneDates].sort();

  const streaks: Streak[] = [];
  let streakStart = sorted[0];
  let streakEnd = sorted[0];
  let currentLength = 1;

  for (let i = 1; i < sorted.length; i++) {
    const prev = parseISO(sorted[i - 1]);
    const curr = parseISO(sorted[i]);

    if (isSameDay(addDays(prev, 1), curr)) {
      streakEnd = sorted[i];
      currentLength++;
    } else {
      streaks.push({ start: streakStart, end: streakEnd, length: currentLength });
      streakStart = sorted[i];
      streakEnd = sorted[i];
      currentLength = 1;
    }
  }
  streaks.push({ start: streakStart, end: streakEnd, length: currentLength });

  const longestStreak = Math.max(...streaks.map((s) => s.length), 0);

  const today = format(new Date(), "yyyy-MM-dd");
  const lastStreak = streaks[streaks.length - 1];
  let currentStreak = 0;
  if (
    isSameDay(parseISO(lastStreak.end), new Date(today)) ||
    isSameDay(addDays(parseISO(lastStreak.end), 1), new Date(today))
  ) {
    currentStreak = lastStreak.length;
  }

  return { streakHistory: streaks, currentStreak, longestStreak };
}

interface HabitsState {
  habits: Habit[];
  addHabit: (name: string, color?: string, icon?: string) => void;
  tickHabit: (id: string, date?: Date) => void;
  resetHabit: (id: string) => void;
  getHabitsByDate: (date: Date) => (Habit & { done: boolean })[];
  getHabitById: (id: string) => Habit | undefined;
}


const toISO = (date: Date) => formatISO(date, { representation: "date" });

export const useHabitsStore = create<HabitsState>((set, get) => ({

  habits: [
    {
      id: uuidv4(),
      name: "Drink water",
      createdAt: new Date().toISOString(),
      doneDates: Array.from({ length: 20 }).map((_, i) =>
        toISO(subDays(new Date("2025-09-07"), i * 2)) // co 2 dni
      ),
      currentStreak: 3,
      longestStreak: 5,
      streakHistory: [
        {
          start: toISO(subDays(new Date("2025-08-15"), 4)),
          end: toISO(new Date("2025-08-15")),
          length: 5
        }
      ],
      color: "#d1c4e9",
      icon: "🔥"
    },
    {
      id: uuidv4(),
      name: "Morning Run",
      createdAt: new Date().toISOString(),
      doneDates: Array.from({ length: 15 }).map((_, i) =>
        toISO(subDays(new Date("2025-09-07"), i))
      ), // codziennie przez 15 dni
      currentStreak: 15,
      longestStreak: 15,
      streakHistory: [
        {
          start: toISO(subDays(new Date("2025-08-24"), 14)),
          end: toISO(new Date("2025-09-07")),
          length: 15
        }
      ],
      color: "#FFCDD2",
      icon: "🏃‍♀️"
    },
    {
      id: uuidv4(),
      name: "Meditation",
      createdAt: new Date().toISOString(),
      doneDates: Array.from({ length: 12 }).map((_, i) =>
        toISO(subDays(new Date("2025-09-07"), i * 3))
      ), // co 3 dni
      currentStreak: 1,
      longestStreak: 7,
      streakHistory: [
        {
          start: toISO(new Date("2025-08-10")),
          end: toISO(new Date("2025-08-16")),
          length: 7
        }
      ],
      color: "#C8E6C9",
      icon: "🧘"
    },
    {
      id: uuidv4(),
      name: "Read book",
      createdAt: new Date().toISOString(),
      doneDates: Array.from({ length: 10 }).map((_, i) =>
        toISO(addDays(new Date("2025-08-01"), i * 3))
      ), // co 3 dni od 01.08
      currentStreak: 2,
      longestStreak: 4,
      streakHistory: [
        {
          start: toISO(new Date("2025-08-19")),
          end: toISO(new Date("2025-08-22")),
          length: 4
        }
      ],
      color: "#FFF9C4",
      icon: "📖"
    },
    {
      id: uuidv4(),
      name: "No sugar",
      createdAt: new Date().toISOString(),
      doneDates: Array.from({ length: 25 }).map((_, i) =>
        toISO(subDays(new Date("2025-09-07"), i))
      ), // prawie codziennie
      currentStreak: 6,
      longestStreak: 10,
      streakHistory: [
        {
          start: toISO(new Date("2025-08-05")),
          end: toISO(new Date("2025-08-14")),
          length: 10
        }
      ],
      color: "#B2DFDB",
      icon: "🍏"
    },
    {
      id: uuidv4(),
      name: "Yoga",
      createdAt: new Date().toISOString(),
      doneDates: Array.from({ length: 8 }).map((_, i) =>
        toISO(addDays(new Date("2025-08-02"), i * 5))
      ), // co 5 dni
      currentStreak: 1,
      longestStreak: 3,
      streakHistory: [
        {
          start: toISO(new Date("2025-08-12")),
          end: toISO(new Date("2025-08-14")),
          length: 3
        }
      ],
      color: "#F8BBD0",
      icon: "🧘‍♀️"
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
          doneDates: [],
          currentStreak: 0,
          longestStreak: 0,
          streakHistory: [],
          color: color ?? "#ccc",
          icon: icon ?? "🔥"
        }
      ]
    })),

  tickHabit: (id: string, date: Date = new Date()) =>
    set((state) => {
      const targetDate = format(date, "yyyy-MM-dd");

      return {
        habits: state.habits.map((h) => {
          if (h.id !== id) return h;

          const alreadyDone = h.doneDates.includes(targetDate);
          const updatedDates = alreadyDone
            ? h.doneDates // nie dodajemy drugi raz
            : [...h.doneDates, targetDate];

          const { streakHistory, currentStreak, longestStreak } =
            calculateStreaks(updatedDates);

          return {
            ...h,
            doneDates: updatedDates,
            streakHistory,
            currentStreak,
            longestStreak
          };
        })
      };
    }),

  resetHabit: (id: string) =>
    set((state) => ({
      habits: state.habits.map((h) =>
        h.id === id
          ? {
            ...h,
            doneDates: [],
            streakHistory: [],
            currentStreak: 0,
            longestStreak: 0
          }
          : h
      )
    })),

  getHabitsByDate: (date: Date) => {
    const { habits } = get();
    const target = format(date, "yyyy-MM-dd");

    return habits.map((h) => ({
      ...h,
      done: h.doneDates.includes(target)
    }));
  },

  getHabitById: (id: string) => {
    const { habits } = get();
    return habits.find((h) => h.id === id);
  }
}));
