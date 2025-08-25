import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { useHabitsStore } from '@/store/useHabitsStore';
import ScreenWrapper from '@/components/ScreenWrapper';
import HabitCard from '@/components/HabitCard';
import WeekSelector from '@/components/WeekSelector';
import styled from 'styled-components/native';

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
  const habits = useHabitsStore((state) => state.habits);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const today = new Date();
  const isToday = (date: Date) =>
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const toDo = habits.filter(h => !h.lastChecked || !isToday(new Date(h.lastChecked)));
  const done = habits.filter(h => h.lastChecked && isToday(new Date(h.lastChecked)));

  return (
    <ScreenWrapper>
      <ScrollView>
        <WeekSelector onSelectDay={setSelectedDate} />

        <SectionTitle>To Do</SectionTitle>
        {isToday(selectedDate)
          ? toDo.map(h => (
            <ListItem key={h.id}>
              <HabitCard habit={h} />
            </ListItem>
          ))
          : <Text>To Do – tylko dzisiaj można edytować</Text>
        }

        <SectionTitle>Done</SectionTitle>
        {isToday(selectedDate)
          ? done.map(h => (
            <ListItem key={h.id}>
              <HabitCard habit={h} />
            </ListItem>
          ))
          : <Text>Done – tylko dzisiaj można edytować</Text>
        }
      </ScrollView>
    </ScreenWrapper>
  );
}
