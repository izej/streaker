import React, { FC } from "react";
import { TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

interface CustomHeaderProps {
  title: string;
  onBack: () => void;
}

const CustomHeader: FC<CustomHeaderProps> = ({ title, onBack }) => {
  return (
    <SafeAreaView edges={["top"]}>
      <Header>
        <Left>
          <BackButton onPress={onBack}>
            <Ionicons name="chevron-back" size={28} color="#333" />
          </BackButton>
        </Left>
        <Center>
          <Title>{title}</Title>
        </Center>
        <Right />
      </Header>
    </SafeAreaView>
  );
};

const Header = styled.View`
  height: 60px;
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
`;

const Left = styled.View`
  flex: 1;
`;

const Center = styled.View`
  flex: 2;
  align-items: center;
`;

const Right = styled.View`
  flex: 1;
`;

const BackButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`;

const Title = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: #000;
`;

export default CustomHeader;
