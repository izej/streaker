import React from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import { MottoLogo } from "@/components/MottoLogo";
import { Container } from "@/styles/AuthStyles";
import { AuthForm } from "@/components/AuthForm";
import { login } from "@/api/auth";

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }

      const res = await login(email, password);
      // zakładam, że backend zwraca token
      Alert.alert("Success", "Logged in!");
      router.replace("/");
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.message || "Login failed");
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
