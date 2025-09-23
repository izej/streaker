import ScreenWrapper from "@/components/ScreenWrapper";
import styled from "styled-components/native";
import LogoutButton from "@/components/LogoutButton";

export default function ProfileScreen() {

  return (
    <ScreenWrapper>
      <Container>
        <LogoutButton />
      </Container>
    </ScreenWrapper>
  );
};

export const Container = styled.View`
  flex: 1;
  padding: 24px;
`;