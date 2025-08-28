import React, { useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import styled from "styled-components/native";
import { useHabitsStore } from "@/store/useHabitsStore";
import { useRouter } from "expo-router";
import { EmojiPickerRow } from "@/components/EmojiPickerRow";
import { ColorPickerRow } from "@/components/ColorPickerRow";
import { AppButton } from "@/components/AppButton";
import { useTranslation } from "react-i18next";

const QUICK_COLORS = ["#d1c4e9", "#ffe0b2", "#c8e6c9", "#ffccbc"];
const DEFAULT_EMOJI = "🔥";

export default function AddHabitScreen() {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [color, setColor] = useState(
    QUICK_COLORS[Math.floor(Math.random() * QUICK_COLORS.length)]
  );
  const [emoji, setEmoji] = useState(DEFAULT_EMOJI);

  const addHabit = useHabitsStore((state) => state.addHabit);
  const router = useRouter();

  const handleSubmit = () => {
    if (!name) return;
    addHabit(name, color, emoji);
    router.back();
  };

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <Content>
            <Label>{t("add_habit.name")}</Label>
            <NameInputWrapper borderColor={color}>
              <EmojiInInput>{emoji}</EmojiInInput>
              <NameInput
                placeholder={t("add_habit.name_placeholder")}
                value={name}
                onChangeText={setName}
                selectionColor={color}
              />
            </NameInputWrapper>

            <Label>{t("add_habit.color")}</Label>
            <ColorPickerRow selectedColor={color} onSelect={setColor} />

            <Label>{t("add_habit.emoji")}</Label>
            <EmojiPickerRow selectedEmoji={emoji} onSelect={setEmoji} />
          </Content>

          <Footer>
            <AppButton title="Add Habit" onPress={handleSubmit} />
          </Footer>
        </View>
      </TouchableWithoutFeedback>
  );
}

const Content = styled.View`
  flex: 1;
`;

const Footer = styled.View`
  justify-content: flex-end;
`;

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
