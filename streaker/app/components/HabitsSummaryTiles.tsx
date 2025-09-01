import React, { useMemo } from "react";
import styled from "styled-components/native";
import { useHabitsStore } from "@/store/useHabitsStore";
import { isSameMonth, isSameDay, parseISO, format } from "date-fns";

export default function HabitsSummaryTiles() {
  const habits = useHabitsStore((state) => state.habits);

  const {
    currentMonthDone,
    totalDone,
    bestDaysCount,
    bestStreak,
    favoriteDay,
    busiestDay
  } = useMemo(() => {
    const now = new Date();

    const allDoneDates = habits.flatMap((habit) =>
      habit.doneDates.map((d) => parseISO(d))
    );

    const currentMonthDone = allDoneDates.filter((d) =>
      isSameMonth(d, now)
    ).length;

    const totalDone = allDoneDates.length;

    const uniqueDays = Array.from(
      new Set(allDoneDates.map((d) => d.toDateString()))
    ).map((d) => new Date(d));

    const bestDaysCount = uniqueDays.filter((day) =>
      habits.length > 0 &&
      habits.every((habit) =>
        habit.doneDates.some((d) => isSameDay(parseISO(d), day))
      )
    ).length;

    const bestStreak = habits.reduce(
      (max, h) => Math.max(max, h.longestStreak),
      0
    );

    const weekdayCounts: Record<string, number> = {};
    allDoneDates.forEach((d) => {
      const day = format(d, "EEEE");
      weekdayCounts[day] = (weekdayCounts[day] || 0) + 1;
    });
    const favoriteDay =
      Object.entries(weekdayCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      "-";

    const dateCounts: Record<string, number> = {};
    allDoneDates.forEach((d) => {
      const key = d.toDateString();
      dateCounts[key] = (dateCounts[key] || 0) + 1;
    });
    const busiestDayEntry = Object.entries(dateCounts).sort(
      (a, b) => b[1] - a[1]
    )[0];
    const busiestDay = busiestDayEntry
      ? format(new Date(busiestDayEntry[0]), "dd MMM yyyy")
      : "-";

    return {
      currentMonthDone,
      totalDone,
      bestDaysCount,
      bestStreak,
      favoriteDay,
      busiestDay
    };
  }, [habits]);

  return (
    <TilesContainer>
      <Tile bg="#FFEBEE">
        <Emoji>📅</Emoji>
        <Title>Current Month</Title>
        <Value>{currentMonthDone}</Value>
      </Tile>

      <Tile bg="#E8F5E9">
        <Emoji>🏆</Emoji>
        <Title>Best Days</Title>
        <Value>{bestDaysCount}</Value>
      </Tile>

      <Tile bg="#E3F2FD">
        <Emoji>✅</Emoji>
        <Title>Total Done</Title>
        <Value>{totalDone}</Value>
      </Tile>

      <Tile bg="#FFF3E0">
        <Emoji>🔥</Emoji>
        <Title>Best Streak</Title>
        <Value>{bestStreak}</Value>
      </Tile>

      <Tile bg="#F3E5F5">
        <Emoji>⭐</Emoji>
        <Title>Favorite Day</Title>
        <Value>{favoriteDay}</Value>
      </Tile>

      <Tile bg="#E0F7FA">
        <Emoji>💪</Emoji>
        <Title>Busiest Day</Title>
        <Value>{busiestDay}</Value>
      </Tile>
    </TilesContainer>
  );
}

const TilesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 16px;
`;

const Tile = styled.View<{ bg: string }>`
  background-color: ${(props) => props.bg};
  border-radius: 16px;
  padding: 16px;
  width: 48%;
  margin-bottom: 12px;
  align-items: center;
`;

const Emoji = styled.Text`
  font-size: 28px;
  margin-bottom: 8px;
`;

const Title = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

const Value = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-top: 4px;
  color: #111;
`;
