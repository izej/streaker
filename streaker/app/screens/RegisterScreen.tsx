import React from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import { MottoLogo } from "@/components/MottoLogo";
import { Container } from "@/styles/AuthStyles";
import { AuthForm } from "@/components/AuthForm";
import { signup } from "@/api/auth";

export default function RegisterScreen() {
  const router = useRouter();

  const handleRegister = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }

      const res = await signup(email, password);
      Alert.alert("Success", "Account created!");
      router.replace("/login");
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.message || "Registration failed");
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
