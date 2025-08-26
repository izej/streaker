import React, { useEffect, useState, useRef } from "react";
import { TextInput, Keyboard, TouchableWithoutFeedback, View } from "react-native";
import styled from "styled-components/native";

interface Props {
  selectedColor?: string;
  onSelect: (color: string) => void;
  quickColors?: string[];
}

export function ColorPickerRow({
                                 selectedColor,
                                 onSelect,
                                 quickColors = ["#d1c4e9", "#ffe0b2", "#c8e6c9", "#9ec7e1", "#ffccbc"],
                               }: Props) {
  const [hexInput, setHexInput] = useState<string>(selectedColor || quickColors[0]);
  const hexInputRef = useRef<TextInput>(null);

  useEffect(() => {
    setHexInput(selectedColor || quickColors[0]);
  }, [selectedColor, quickColors]);

  const handleHexChange = (text: string) => {
    // pozwalamy na usunięcie całego tekstu
    if (text === "") {
      setHexInput("");
      return;
    }

    if (!text.startsWith("#")) text = "#" + text;

    if (/^#[0-9A-Fa-f]{0,6}$/.test(text)) {
      setHexInput(text);
      onSelect(text);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Row>
        {quickColors.map((c) => (
          <ColorOption key={c} color={c} selected={c === selectedColor} onPress={() => {
            onSelect(c);
            hexInputRef.current?.blur(); // odklikujemy input po wyborze szybkiego koloru
          }} />
        ))}

        <HexInput
          ref={hexInputRef}
          value={hexInput ?? ""}
          onChangeText={handleHexChange}
          placeholder="#hex"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </Row>
    </TouchableWithoutFeedback>
  );
}

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 12px;
`;

const ColorOption = styled.TouchableOpacity<{ color: string; selected: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ color }) => color};
  margin-right: 8px;
  margin-bottom: 8px;
  border-width: ${({ selected }) => (selected ? "3px" : "1px")};
  border-color: ${({ selected }) => (selected ? "black" : "#ccc")};
`;

const HexInput = styled(TextInput)`
  flex: 1; 
  border-width: 1px;
  border-color: #ccc;
  padding: 8px;
  border-radius: 6px;
  text-align: center;
  min-width: 70px; 
`;
