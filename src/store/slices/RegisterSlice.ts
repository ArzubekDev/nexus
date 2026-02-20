import axios from "axios";
import { StateCreator } from "zustand";
import Cookies from "js-cookie";

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

export const createRegisterSlice: StateCreator<
  RegisterSlice,
  [],
  [],
  RegisterSlice
> = (set, get) => ({
  user: null,
  isRegistering: false,
  registerError: null,
  registerSuccess: false,

registerUser: async (data) => {
  set({ isRegistering: true, registerError: null });

  try {
    const res = await axios.post(`${API_URL}/register`, data);

    // Cookie сактоо
    Cookies.set("auth_token", res.data.access_token, { expires: 7 });

    // user сактоо store'го
    set({
      isRegistering: false,
      user: res.data.user, // ← МААНИЛҮҮ
      registerSuccess: true,
    });

    return { success: true };
  } catch (error: any) {
    set({
      registerError: error.response?.data?.message,
      isRegistering: false,
    });

    return { success: false };
  }
},

  resetRegisterStatus: () => {
    set({ registerError: null, registerSuccess: false, isRegistering: false });
  },
});
