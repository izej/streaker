import React, {useState} from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import {startOfWeek, addDays, format, isSameDay} from 'date-fns';

const WeekContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 16px;
`;

const DayButton = styled.Pressable<{ selected?: boolean }>`
    padding: 12px;
    border-radius: 12px;
    background-color: ${({selected}) => (selected ? '#BBDEFB' : '#eee')};
    flex: 1;
    margin-right: 4px;
    align-items: center;
`;

export default function WeekSelector({ onSelectDay }: {
  onSelectDay: (date: Date) => void;
}) {
  const today = new Date();
  const weekStart = startOfWeek(today, {weekStartsOn: 1});
  const [selectedDay, setSelectedDay] = useState(today);

  const days = Array.from({length: 7}).map((_, i) => addDays(weekStart, i));

  return (
    <WeekContainer>
      {days.map(day => {
        const isSelected = isSameDay(day, selectedDay);
        return (
          <DayButton
            key={day.toISOString()}
            selected={isSelected}
            onPress={() => {
              setSelectedDay(day);
              onSelectDay(day);
            }}
          >
            <Text>{format(day, 'EEE dd')}</Text>
          </DayButton>
        );
      })}
    </WeekContainer>
  );
}
