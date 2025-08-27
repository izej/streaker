import React, { useState } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, format, isSameDay, isSameMonth, addMonths
} from "date-fns";
import { MaterialIcons } from "@expo/vector-icons";

const CalendarContainer = styled.View`
  padding: 16px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const HeaderText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const WeekRow = styled.View`
  flex-direction: row;
`;

const DayCell = styled.View`
  flex: 1;
  aspect-ratio: 1;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const DayText = styled.Text<{ isCurrentMonth: boolean }>`
  color: ${({ isCurrentMonth }) => (isCurrentMonth ? "#000" : "#ccc")};
`;

const MarkerBackground = styled.View<{ isStart: boolean; isEnd: boolean }>`
  position: absolute;
  top: 25%;
  bottom: 25%;
  left: 0;
  right: 0;
  background-color: rgba(155, 89, 182, 0.3);
  border-top-left-radius: ${({ isStart }) => (isStart ? "20px" : "0px")};
  border-bottom-left-radius: ${({ isStart }) => (isStart ? "20px" : "0px")};
  border-top-right-radius: ${({ isEnd }) => (isEnd ? "20px" : "0px")};
  border-bottom-right-radius: ${({ isEnd }) => (isEnd ? "20px" : "0px")};
`;

type HabitCalendarProps = {
  doneDates: Date[];
};

export default function HabitCalendar({ doneDates }: HabitCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const isDone = (day: Date) =>
    doneDates.some((d) => isSameDay(d, day));

  return (
    <CalendarContainer>
      <Header>
        <MaterialIcons
          name="chevron-left"
          size={28}
          onPress={() => setCurrentMonth(addMonths(currentMonth, -1))}
        />
        <HeaderText>{format(currentMonth, "MMMM yyyy")}</HeaderText>
        <MaterialIcons
          name="chevron-right"
          size={28}
          onPress={() => setCurrentMonth(addMonths(currentMonth, 1))}
        />
      </Header>

      <WeekRow>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <DayCell key={d}>
            <Text style={{ fontWeight: "bold" }}>{d}</Text>
          </DayCell>
        ))}
      </WeekRow>

      {Array.from({ length: days.length / 7 }).map((_, weekIndex) => {
        const weekDays = days.slice(weekIndex * 7, weekIndex * 7 + 7);
        return (
          <WeekRow key={weekIndex}>
            {weekDays.map((day, i) => {
              const done = isDone(day);

              const dayIndex = days.findIndex(d => isSameDay(d, day));
              const prevDone = dayIndex > 0 && isDone(days[dayIndex - 1]);
              const nextDone = dayIndex < days.length - 1 && isDone(days[dayIndex + 1]);

              return (
                <DayCell key={day.toISOString()}>
                  {done && (
                    <MarkerBackground
                      isStart={!prevDone}
                      isEnd={!nextDone}
                    />
                  )}
                  <DayText isCurrentMonth={isSameMonth(day, currentMonth)}>
                    {format(day, "d")}
                  </DayText>
                </DayCell>
              );
            })}
          </WeekRow>
        );
      })}
    </CalendarContainer>
  );
}
