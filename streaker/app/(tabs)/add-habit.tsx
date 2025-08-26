import React, { useState } from "react";
import { Button, Keyboard, TouchableWithoutFeedback, View } from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import styled from "styled-components/native";
import { useHabitsStore } from "@/store/useHabitsStore";
import { useRouter } from "expo-router";
import { EmojiPickerRow } from "@/components/EmojiPickerRow";
import { ColorPickerRow } from "@/components/ColorPickerRow";

const QUICK_COLORS = ["#d1c4e9", "#ffe0b2", "#c8e6c9", "#ffccbc"];

export default function AddHabitScreen() {
  const [name, setName] = useState("");
  const [color, setColor] = useState(QUICK_COLORS[Math.floor(Math.random() * QUICK_COLORS.length)]);
  const [emoji, setEmoji] = useState("");

  const addHabit = useHabitsStore((state) => state.addHabit);
  const router = useRouter();

  const handleSubmit = () => {
    if (!name) return;
    addHabit(name, color, emoji);
    router.back();
  };

  return (
    <ScreenWrapper>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <Label>Name</Label>
          <NameInput
            placeholder="Habit name"
            value={name}
            onChangeText={setName}
            borderColor={color}
          />

          <Label>Color</Label>
          <ColorPickerRow selectedColor={color} onSelect={setColor} />

          <Label>Emoji</Label>
          <EmojiPickerRow selectedEmoji={emoji} onSelect={setEmoji} />

          <Button title="Add Habit" onPress={handleSubmit} />
        </View>
      </TouchableWithoutFeedback>
    </ScreenWrapper>
  );
}

const Label = styled.Text`
  font-weight: bold;
  margin-bottom: 4px;
`;

const NameInput = styled.TextInput<{ borderColor: string }>`
  border-width: 2px;
  border-color: ${({ borderColor }) => borderColor};
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
`;

