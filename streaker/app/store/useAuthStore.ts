import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  email: string;
}

interface AuthState {
  token: string | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
  validateToken: () => Promise<boolean>;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  loading: true,

  validateToken: async () => {
    const { token } = get();
    return !!token;
  },

  initialize: async () => {
    const token = await AsyncStorage.getItem("token");
    set({ token, loading: false });
  },


  login: async (token) => {
    await AsyncStorage.setItem("token", token);
    set({ token });
  },

  logout: async () => {
    await AsyncStorage.removeItem("token");
    set({ token: null });
  },

  setLoading: (loading) => set({ loading })
}));
