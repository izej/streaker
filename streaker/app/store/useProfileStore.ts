import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Profile = {
  email: string;
};

type ProfileStore = {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
};

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  loading: false,
  error: null,
  fetchProfile: async () => {
    try {
      set({ loading: true, error: null });

      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("No auth token found");

  console.log(token);
      const res = await fetch("http://192.168.1.28:8080/api/v1/users/me", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const text = await res.text();
      let data = null;
      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error("Response is not valid JSON");
        }
      }

      if (!res.ok) {
        throw new Error(data?.message || `HTTP ${res.status}`);
      }

      set({ profile: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));