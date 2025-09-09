import React from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import { MottoLogo } from "@/components/MottoLogo";
import { Container } from "@/styles/AuthStyles";
import { AuthForm } from "@/components/AuthForm";

export default function RegisterScreen() {
  const router = useRouter();

  const handleRegister = (email: string, password: string) => {
    if (email && password) {
      Alert.alert("Success", "Account created!");
      router.replace("/login");
    } else {
      Alert.alert("Error", "Please fill in all fields");
    }
  };

  return (
    <ScreenWrapper>
      <Container>
        <MottoLogo />
        <AuthForm
          onSubmit={handleRegister}
          submitLabel="Register"
          linkLabel="Already have an account? Login"
          onLinkPress={() => router.push("/login")}
        />
      </Container>
    </ScreenWrapper>
  );
}
