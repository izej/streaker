import React, { useState, useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { addDays, startOfWeek, endOfWeek, format, isSameDay } from "date-fns";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { useHabitsStore } from "@/store/useHabitsStore";

export default function HabitsStatsCalendar() {
  const habits = useHabitsStore((state) => state.habits);

  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => addDays(currentWeekStart, i));
  }, [currentWeekStart]);

  const goPrevWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, -7));
  };

  const goNextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7));
  };

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={goPrevWeek}>
          <Ionicons name="chevron-back" size={24} />
        </TouchableOpacity>

        <HeaderText>
          {format(currentWeekStart, "dd MMM")} - {format(endOfWeek(currentWeekStart, { weekStartsOn: 1 }), "dd MMM")}
        </HeaderText>

        <TouchableOpacity onPress={goNextWeek}>
          <Ionicons name="chevron-forward" size={24} />
        </TouchableOpacity>
      </Header>

      <Grid>
        <Row>
          <EmptyCell />

          {weekDays.map((day) => (
            <DayLabel key={day.toISOString()}>{format(day, "EEE")}</DayLabel>
          ))}
        </Row>

        {habits.map((habit) => (
          <Row key={habit.id}>
            {habit.icon ? (
              <IconText>{habit.icon}</IconText>
            ) : (
              <Ionicons name="checkmark-circle-outline" size={16} style={{ marginRight: 4 }} />
            )}
            <HabitName>{habit.name}</HabitName>

            {weekDays.map((day) => {
              const isDone = habit.doneDates.some((d) => isSameDay(new Date(d), day));
              return <DayCell key={day.toISOString()} done={isDone} color={habit.color} />;
            })}
          </Row>
        ))}
      </Grid>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const HeaderText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const Grid = styled.View``;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

const EmptyCell = styled.View`
  width: 100px;
`;

const DayLabel = styled.Text`
  flex: 1;
  text-align: center;
  font-weight: bold;
`;

const IconText = styled.Text`
  margin-right: 4px;
`;

const HabitName = styled.Text`
  width: 80px;
`;

interface DayCellProps {
  done: boolean;
  color?: string;
}

const DayCell = styled.View<DayCellProps>`
  flex: 1;
  aspect-ratio: 1;
  margin: 5px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.done ? props.color || "#4caf50" : "transparent"};
`;