import { StateCreator } from "zustand";
import Cookies from "js-cookie";
import api from "@/lib/api";
import { CombinedState } from "../useStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface UserData {
  id?: string;
  avatarUrl?: string;
  email: string;
  password?: string;
}

export interface RegisterSlice {
  user: UserData | null;
  isRegistering: boolean;
  registerError: string | null;
  registerSuccess: boolean;
  registerUser: (userData: UserData) => Promise<{ success: boolean }>;
  resetRegisterStatus: () => void;
}

export const createRegisterSlice: StateCreator<CombinedState, [], [], RegisterSlice> = (set, get) => ({
  user: null,
  isRegistering: false,
  registerError: null,
  registerSuccess: false,

  registerUser: async (data) => {
    set({ isRegistering: true, registerError: null });

    try {
      const res = await api.post(`/register`, data);

      Cookies.set("auth_token", res.data.accessToken, { expires: 7 });

      set({
        isRegistering: false,
        user: res.data.user,
        registerSuccess: true,
      });

      if (typeof (get() as any).fetchRooms === "function") {
        await (get() as any).fetchRooms();
      }

      return { success: true };
    } catch (error: any) {
      set({
        registerError: error.response?.data?.message || "Ката кетти",
        isRegistering: false,
      });
      return { success: false };
    }
  },

  resetRegisterStatus: () => {
    set({ registerError: null, registerSuccess: false, isRegistering: false });
  },
});
