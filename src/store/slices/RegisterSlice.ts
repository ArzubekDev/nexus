import axios from "axios";
import { StateCreator } from "zustand";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface UserData {
  id?: string;
  avatarUrl?:string,
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

  registerUser: async (userData) => {
    set({ isRegistering: true, registerError: null, registerSuccess: false });
    
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      
      set({ 
        user: response.data.user, 
        isRegistering: false, 
        registerSuccess: true 
      });
      
      return { success: true };
    } catch (error: any) {
      set({ 
        registerError: error.response?.data?.message || "Каттоодо ката кетти", 
        isRegistering: false,
        registerSuccess: false
      });
      
      return { success: false };
    }
  },

  // Абалды баштапкы калыбына келтирүү (мисалы, баракчаны жапканда)
  resetRegisterStatus: () => {
    set({ registerError: null, registerSuccess: false, isRegistering: false });
  }
});