// app/components/AuthGuard.tsx
import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";
import { useAuthStore } from "@/store/useAuthStore";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { token, loading } = useAuthStore();
  if (loading) return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator />
    </View>
  );
  if (!token) return <Redirect href="/(auth)/login" />;
  return <>{children}</>;
}
