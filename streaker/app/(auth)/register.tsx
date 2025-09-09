import React from "react";
import RegisterScreen from "@/screens/RegisterScreen";
import { Stack } from "expo-router";

export default function Register() {

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <RegisterScreen />
    </>
  );
}
