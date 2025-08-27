export interface Habit {
  id: string;
  name: string;
  createdAt: string;
  doneDates: string[];
  currentStreak: number;
  longestStreak: number;
  streakHistory: Streak[];
  color?: string;
  icon?: string;
}

export interface Streak {
  start: string;
  end: string;
  length: number;
}
