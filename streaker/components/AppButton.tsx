import React from "react";
import styled from "styled-components/native";
import { TouchableOpacityProps } from "react-native";

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
}

export const AppButton: React.FC<AppButtonProps> = ({ title, onPress, ...rest }) => {
  return (
    <ButtonWrapper onPress={onPress} activeOpacity={0.8} {...rest}>
      <ButtonText>{title}</ButtonText>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.TouchableOpacity`
  background-color: #a5d6a7; 
  padding-top: 14px;
  padding-bottom: 14px;
  margin-bottom: 4px;
  border-radius: 999px;
  align-items: center;
  justify-content: center;
  elevation: 2;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
