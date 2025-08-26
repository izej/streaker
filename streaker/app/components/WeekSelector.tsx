import React, { useState } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { startOfWeek, addDays, format, isSameDay } from "date-fns";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Colors from "@/constants/Colors";

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const IconButton = styled.Pressable`
  padding: 8px;
`;

const TodayButton = styled.Pressable`
  padding: 8px;
`;

const MonthText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const WeekContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const DayButton = styled.Pressable<{ selected?: boolean }>`
  flex: 1;
  margin-right: 4px;
  padding: 4px;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: 25px !important;
  max-width: 48px;
  background-color: ${({ selected }) => (selected ? "#E0BBFF" : "transparent")};
`;

const DayCircle = styled.View<{ selected?: boolean }>`
  width: 38px;
  height: 38px;
  border-radius: 20px !important;
  overflow: hidden;
  background-color: ${({ selected }) => (selected ? Colors.light.background : "#eedaff")};
  align-items: center;
  justify-content: center;
`;

const DayNumber = styled.Text`
  font-weight: bold;
`;

const DayShort = styled.Text`
  font-size: 12px;
  flex-shrink: 0;
  margin-bottom: 2px;
`;

export default function WeekSelector({ onSelectDay }: { onSelectDay: (date: Date) => void }) {
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });

  const [selectedDay, setSelectedDay] = useState(today);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const days = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));

  const handleDateConfirm = (date: Date) => {
    setSelectedDay(date);
    onSelectDay(date);
    setDatePickerVisibility(false);
  };

  return (
    <>
      <Header>
        <IconButton onPress={() => setDatePickerVisibility(true)}>
          <MaterialIcons name="calendar-today" size={24} color="black" />
        </IconButton>

        <MonthText>{format(selectedDay, "MMMM yyyy")}</MonthText>

        <TodayButton
          onPress={() => {
            setSelectedDay(today);
            onSelectDay(today);
          }}
        >
          <Text>Today</Text>
        </TodayButton>
      </Header>

      <WeekContainer>
        {days.map((day) => {
          const isSelected = isSameDay(day, selectedDay);
          return (
            <DayButton
              key={day.toISOString()}
              onPress={() => {
                setSelectedDay(day);
                onSelectDay(day);
              }}
              android_ripple={{ color: "transparent" }}
              selected={isSelected}
            >
              <DayShort>{format(day, "EEE")}</DayShort>
              <DayCircle selected={isSelected}>
                <DayNumber>{format(day, "dd")}</DayNumber>
              </DayCircle>
            </DayButton>
          );
        })}
      </WeekContainer>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={selectedDay}
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </>
  );
}
