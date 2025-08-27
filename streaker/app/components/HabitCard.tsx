import React from "react";
import styled from "styled-components/native";
import { Pressable } from "react-native";
import { Habit } from "@/models/Habit";
import { useHabitsStore } from "@/store/useHabitsStore";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { isSameDay } from "date-fns";

const getRandomColor = () => {
  const colors = ["#FFCDD2", "#C8E6C9", "#BBDEFB", "#FFE0B2", "#D1C4E9"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Container = styled.TouchableOpacity<{ bgColor: string }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor};
  padding: 12px;
  border-radius: 50px;
  width: 100%;
`;

const LeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const IconWrapper = styled.View`
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

const EmojiIcon = styled.Text`
  font-size: 32px;
  line-height: 32px;
`;

const HabitName = styled.Text`
  font-size: 18px;
  line-height: 24px;
  font-weight: bold;
  flex-shrink: 1;
`;

export default function HabitCard({ habit, readOnly, selectedDate }: { habit: Habit, readOnly: boolean, selectedDate: Date }) {
  const tickHabit = useHabitsStore((state) => state.tickHabit);
  const resetHabit = useHabitsStore((state) => state.resetHabit);
  const router = useRouter();

  const isDone =
    habit.doneDates?.some((d) => isSameDay(new Date(d), selectedDate)) ?? false;

  const bgColor = habit.color || getRandomColor();

  return (
    <Container bgColor={bgColor} onPress={() => router.push({
      pathname: "/habit/[id]",
      params: { id: habit.id.toString() }
    })}>
      <LeftContainer>
        <IconWrapper>
          <EmojiIcon>{habit.icon || "🔥"}</EmojiIcon>
        </IconWrapper>
        <HabitName>{habit.name}</HabitName>
      </LeftContainer>

      {
        !readOnly && <Pressable
          onPress={(e) => {
            e.stopPropagation();
            isDone ? resetHabit(habit.id) : tickHabit(habit.id);
          }}
        >
          <FontAwesome
            name={isDone ? "times" : "check"}
            size={24}
            color="#333"
          />
        </Pressable>
      }

    </Container>
  );
}
