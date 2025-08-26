export interface Habit {
  id: string;
  name: string;
  createdAt: string;
  streak: number;
  longestStreak?: number;
  lastChecked?: string;
  color?: string;
  icon?: string;
}
