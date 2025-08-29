import HabitCalendar from "@/components/HabitCalendar";
import { Habit } from "@/models/Habit";
import styled from "styled-components/native";
import React from "react";

export default function HabitDetailsScreen({ habit }: { habit: Habit }) {

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
      <DetailsContainer>
        <DetailBox>
          <Label>This Streak</Label>
          <Value>{habit.currentStreak} dni</Value>
        </DetailBox>
        <DetailBox>
          <Label>Longest Streak</Label>
          <Value>{habit.longestStreak} dni</Value>
        </DetailBox>
      </DetailsContainer>
    </>
  );
}

const DetailsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;
`;

const DetailBox = styled.View`
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const Value = styled.Text`
  font-size: 36px;
  color: #9ec7e1;
  font-weight: bold;
`;