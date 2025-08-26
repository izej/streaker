import React from "react";
import styled from "styled-components/native";
import { SafeAreaView, View } from "react-native";

const Container = styled(SafeAreaView)`
  flex: 1;
  padding-left: 16px;
  padding-right: 16px;
  align-items: center;
`;

const Content = styled(View)`
  flex: 1;
  width: 100%;
  max-width: 700px;
`;

type ScreenWrapperProps = {
  children: React.ReactNode;
};

const ScreenWrapper = React.forwardRef<SafeAreaView, ScreenWrapperProps>(
  ({ children }, ref) => (
    <Container ref={ref}>
      <Content>{children}</Content>
    </Container>
  )
);

export default ScreenWrapper;

