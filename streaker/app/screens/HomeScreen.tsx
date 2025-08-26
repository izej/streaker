import React, { useState, useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import { useHabitsStore } from "@/store/useHabitsStore";
import ScreenWrapper from "@/components/ScreenWrapper";
import HabitCard from "@/components/HabitCard";
import WeekSelector from "@/components/WeekSelector";
import styled from "styled-components/native";
import { useRouter } from "expo-router";

const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-top: 16px;
  margin-bottom: 8px;
`;

const ListItem = styled.View`
  margin-bottom: 12px;
`;

const AddButton = styled.Pressable`
  background-color: #2f95dc;
  padding: 12px;
  margin-vertical: 16px;
  border-radius: 8px;
  align-items: center;
`;

const AddButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const router = useRouter();
  const habits = useHabitsStore((state) => state.habits);

  const habitsForSelectedDate = useMemo(() => {
    return habits.map((h) => ({
      ...h,
      done: h.lastChecked
        ? new Date(h.lastChecked).toDateString() === selectedDate.toDateString()
        : false
    }));
  }, [selectedDate, habits]);

  const toDo = habitsForSelectedDate.filter((h) => !h.done);
  const done = habitsForSelectedDate.filter((h) => h.done);

  const today = new Date();
  const isToday = (date: Date) =>
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const handleAddHabit = () => {
    router.push("/add-habit");
  };

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16 }}>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            <WeekSelector onSelectDay={setSelectedDate} />

            <SectionTitle>To Do</SectionTitle>
            {isToday(selectedDate)
              ? toDo.map((h) => (
                <ListItem key={h.id}>
                  <HabitCard habit={h} />
                </ListItem>
              ))
              : <Text>To Do – tylko dzisiaj można edytować</Text>
            }

            <SectionTitle>Done</SectionTitle>
            {isToday(selectedDate)
              ? done.map((h) => (
                <ListItem key={h.id}>
                  <HabitCard habit={h} />
                </ListItem>
              ))
              : <Text>Done – tylko dzisiaj można edytować</Text>
            }
          </View>

          <AddButton onPress={handleAddHabit}>
            <AddButtonText>Add New Habit</AddButtonText>
          </AddButton>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
