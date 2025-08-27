import React, { useState, useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import { useHabitsStore } from "@/store/useHabitsStore";
import ScreenWrapper from "@/components/ScreenWrapper";
import HabitCard from "@/components/HabitCard";
import WeekSelector from "@/components/WeekSelector";
import styled from "styled-components/native";
import { useRouter } from "expo-router";
import { AppButton } from "@/components/AppButton";

const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-top: 16px;
  margin-bottom: 8px;
`;

const ListItem = styled.View`
  margin-bottom: 12px;
`;

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const router = useRouter();
  const habits = useHabitsStore((state) => state.habits);

  const habitsForSelectedDate = useMemo(() => {
    return habits.map((h) => {
      const selectedDateString = selectedDate.toDateString();
      const isDone = h.doneDates?.some(
        (d) => new Date(d).toDateString() === selectedDateString
      );
      return { ...h, done: isDone };
    });
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
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            <WeekSelector onSelectDay={setSelectedDate} />

            <SectionTitle>To Do</SectionTitle>
            {toDo.map((h) => (
              <ListItem key={h.id}>
                <HabitCard habit={h} readOnly={!isToday(selectedDate)} selectedDate={selectedDate}/>
              </ListItem>
            ))
            }

            <SectionTitle>Done</SectionTitle>
            {done.map((h) => (
              <ListItem key={h.id}>
                <HabitCard habit={h} readOnly={!isToday(selectedDate)} selectedDate={selectedDate}/>
              </ListItem>
            ))
            }
          </View>
          <AppButton title="Add New Habit" onPress={handleAddHabit} />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
