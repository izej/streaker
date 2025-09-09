import React from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import { MottoLogo } from "@/components/MottoLogo";
import { Container } from "@/styles/AuthStyles";
import { AuthForm } from "@/components/AuthForm";

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = (email: string, password: string) => {
    if (email && password) {
      Alert.alert("Success", "Logged in!");
      router.replace("/");
    } else {
      Alert.alert("Error", "Please fill in all fields");
    }
  };

  return (
    <ScreenWrapper>
      <Container>
        <MottoLogo />
        <AuthForm
          onSubmit={handleLogin}
          submitLabel="Login"
          linkLabel="Don’t have an account? Register"
          onLinkPress={() => router.push("/register")}
        />
      </Container>
    </ScreenWrapper>
  );
}
