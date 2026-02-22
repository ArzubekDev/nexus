import { StateCreator } from "zustand";
import Cookies from "js-cookie";
import api from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface UserData {
  id?: string;
  avatarUrl?: string;
  email: string;
  password?: string;
}

export interface LoginSlice {
  user: UserData | null;
  isLoading: boolean;
  error: string | null;
  loginUser: (userData: UserData) => Promise<{ success: boolean }>;
  logout: () => void;
}

export const createLoginSlice: StateCreator<LoginSlice, [], [], LoginSlice> = (
  set,
) => ({
  user: null,
  isLoading: false,
  error: null,

  loginUser: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.post(`${API_URL}/login`, userData);
      Cookies.set("auth_token", res.data.accessToken, { expires: 7 });
      set({ user: res.data.user, isLoading: false });

      return { success: true };
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Кирүүдө ката кетти",
        isLoading: false,
      });
      return { success: false };
    }
  },

  logout: () => {
    Cookies.remove("auth_token");
    set({ user: null });
  },
});
