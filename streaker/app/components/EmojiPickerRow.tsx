import React, { useRef } from "react";
import { TextInput, Keyboard, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";

interface Props {
  selectedEmoji?: string;
  onSelect: (emoji: string) => void;
  quickEmojis?: string[];
}

const isEmoji = (text: string) => /\p{Emoji}/u.test(text);

export function EmojiPickerRow({
                                 selectedEmoji,
                                 onSelect,
                                 quickEmojis = ["🍵", "🏃", "📖", "🧘‍♀️", "🥦"],
                               }: Props) {
  const inputRef = useRef<TextInput>(null);

  const handleEmojiInput = (text: string) => {
    if (text === "" || isEmoji(text)) {
      onSelect(text);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Row>
        {quickEmojis.map((e) => (
          <EmojiOption
            key={e}
            selected={e === selectedEmoji}
            onPress={() => {
              onSelect(e);
              inputRef.current?.blur();
            }}
          >
            <EmojiText>{e}</EmojiText>
          </EmojiOption>
        ))}
        <EmojiInput
          ref={inputRef}
          value={selectedEmoji || ""}
          onChangeText={handleEmojiInput}
          placeholder="😀"
          maxLength={2}
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

const EmojiOption = styled.TouchableOpacity<{ selected?: boolean }>`
  width: 40px;
  height: 40px;
  margin-right: 8px;
  margin-bottom: 8px;
  border-width: ${({ selected }) => (selected ? "2px" : "0px")};
  border-color: black;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

const EmojiText = styled.Text`
  font-size: 20px;
`;

const EmojiInput = styled(TextInput)`
  flex: 1;
  min-width: 50px;
  border-width: 1px;
  border-color: #ccc;
  padding: 8px;
  border-radius: 6px;
  text-align: center;
`;
