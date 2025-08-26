import React from "react";
import styled from "styled-components/native";
import { Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Habit } from "@/models/Habit";
import { useHabitsStore } from "@/store/useHabitsStore";

const getRandomColor = () => {
  const colors = ["#FFCDD2", "#C8E6C9", "#BBDEFB", "#FFE0B2", "#D1C4E9"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Container = styled.View<{ bgColor: string }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor};
  padding: 16px;
  border-radius: 20px;
  width: 100%;
`;

const HabitName = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export default function HabitCard({ habit }: { habit: Habit }) {
  const tickHabit = useHabitsStore((state) => state.tickHabit);
  const resetHabit = useHabitsStore((state) => state.resetHabit);

  const lastChecked = habit.lastChecked ? new Date(habit.lastChecked) : null;
  const today = new Date();
  const isDoneToday =
    lastChecked &&
    lastChecked.getDate() === today.getDate() &&
    lastChecked.getMonth() === today.getMonth() &&
    lastChecked.getFullYear() === today.getFullYear();

  const bgColor = habit.color || getRandomColor();

  return (
    <Container bgColor={bgColor}>
      <HabitName>{habit.name}</HabitName>
      <Pressable onPress={() => (isDoneToday ? resetHabit(habit.id) : tickHabit(habit.id))}>
        <FontAwesome
          name={isDoneToday ? "times" : "check"}
          size={24}
          color="#333"
        />
      </Pressable>
    </Container>
  );
}
