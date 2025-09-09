import React, { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setLoading = useAuthStore((s) => s.setLoading);
  const login = useAuthStore((s) => s.login);

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const userJson = await AsyncStorage.getItem("user");
        if (token && userJson) {
          login(token, JSON.parse(userJson));
        }
      } catch (e) {
        console.warn("Auth load error", e);
      } finally {
        setLoading(false);
      }
    };
    loadAuth();
  }, []);

  return <>{children}</>;
}
