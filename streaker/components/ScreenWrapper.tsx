import React from "react";
import styled from "styled-components/native";

const Container = styled.SafeAreaView`
  flex: 1;
  padding-left: 16px;
  padding-right: 16px;
  align-items: center;
`;

const Content = styled.View`
  flex: 1;
  width: 100%;
  max-width: 700px;
`;

export default function ScreenWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Content>
        {children}
      </Content>
    </Container>
  );
}
