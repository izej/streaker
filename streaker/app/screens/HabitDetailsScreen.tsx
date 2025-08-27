import HabitCalendar from "@/components/HabitCalendar";
import { Habit } from "@/models/Habit";

export default function HabitDetailsScreen({ habit}: { habit: Habit }) {

  const getDatesBetween = (start: string, end: string) => {
    const dates: Date[] = [];
    let current = new Date(start);
    const last = new Date(end);

    while (current <= last) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  const historyDates = habit.streakHistory.flatMap((streak) =>
    getDatesBetween(streak.start, streak.end)
  );

  const currentDates = habit.doneDates.map((d) => new Date(d));

  const allDoneDates = [...historyDates, ...currentDates];

  return (
    <>
      <HabitCalendar doneDates={allDoneDates} />
    </>
  );
}