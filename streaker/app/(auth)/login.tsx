import LoginScreen from "@/screens/LoginScreen";
import { Stack } from "expo-router";
import React from "react";

export default function Login() {

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <LoginScreen />
    </>
  );
}
