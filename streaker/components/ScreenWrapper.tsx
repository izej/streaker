import React from 'react';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
    flex: 1;
    padding-left: 16px;
    padding-right: 16px;
`;

export default function ScreenWrapper({ children }: { children: React.ReactNode }) {
  return <Container>{children}</Container>;
}
