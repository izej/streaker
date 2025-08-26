import React, { useState } from "react";
import { Button } from "react-native";
import { useHabitsStore } from "@/store/useHabitsStore";
import ScreenWrapper from "@/components/ScreenWrapper";
import styled from "styled-components/native";
import { useRouter } from "expo-router";

const Input = styled.TextInput`
  border: 1px solid #ccc;
  padding: 12px;
  margin-top: 12px;
  margin-bottom: 12px;
  border-radius: 8px;
`;

export default function AddHabitScreen() {
  const [name, setName] = useState("");
  const addHabit = useHabitsStore(state => state.addHabit);
  const router = useRouter();

  const handleSubmit = () => {
    if (!name) return;
    addHabit(name);
    router.back();
  };

  return (
    <ScreenWrapper>
      <Input placeholder="Habit name" value={name} onChangeText={setName} />
      <Button title="Add Habit" onPress={handleSubmit} />
    </ScreenWrapper>
  );
}
