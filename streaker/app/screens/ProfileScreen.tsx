import { useEffect } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import styled from "styled-components/native";
import LogoutButton from "@/components/LogoutButton";
import { useProfileStore } from "@/store/useProfileStore";
import { ActivityIndicator, Text } from "react-native";

export default function ProfileScreen() {
  const { profile, loading, error, fetchProfile } = useProfileStore();

  useEffect(() => {
    fetchProfile().catch(console.error);
  }, [fetchProfile]);

  return (
    <ScreenWrapper>
      <Container>
        {loading && <ActivityIndicator />}
        {error && <Text>{error}</Text>}
        {profile && <HelloText>Hello, {profile.email} | buddy</HelloText>}

        <LogoutButton />
      </Container>
    </ScreenWrapper>
  );
}

export const Container = styled.View`
  flex: 1;
  padding: 24px;
`;

const HelloText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 24px;
`;
