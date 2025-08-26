import React, { useState } from "react";
import { Button, Keyboard, TouchableWithoutFeedback, View } from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import styled from "styled-components/native";
import { useHabitsStore } from "@/store/useHabitsStore";
import { useRouter } from "expo-router";
import { EmojiPickerRow } from "@/components/EmojiPickerRow";
import { ColorPickerRow } from "@/components/ColorPickerRow";

const QUICK_COLORS = ["#d1c4e9", "#ffe0b2", "#c8e6c9", "#ffccbc"];

const DEFAULT_EMOJI = "🔥";

export default function AddHabitScreen() {
  const [name, setName] = useState("");
  const [color, setColor] = useState(QUICK_COLORS[Math.floor(Math.random() * QUICK_COLORS.length)]);
  const [emoji, setEmoji] = useState(DEFAULT_EMOJI);

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
          <NameInputWrapper borderColor={color}>
            <EmojiInInput>{emoji}</EmojiInInput>
            <NameInput
              placeholder="Habit name"
              value={name}
              onChangeText={setName}
              selectionColor={color}
            />
          </NameInputWrapper>

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

const NameInputWrapper = styled.View<{ borderColor: string }>`
  flex-direction: row;
  align-items: center;
  border-width: 2px;
  border-color: ${({ borderColor }) => borderColor};
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
`;

const EmojiInInput = styled.Text`
  font-size: 20px;
  margin-right: 8px;
`;

const NameInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
`;

const Label = styled.Text`
  font-weight: bold;
  text-align: left;
  font-size: 16px;
  margin-bottom: 4px;
  margin-top: 12px;
`;

