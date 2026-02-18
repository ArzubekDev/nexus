import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRegisterSlice, RegisterSlice } from "./slices/RegisterSlice";
import { createLoginSlice, LoginSlice } from "./slices/LoginSlice";
import { persist, createJSONStorage } from 'zustand/middleware';


type CombinedState = RegisterSlice & LoginSlice;

export const useStore = create<CombinedState>()(
  devtools(
    persist(
      (...a) => ({
        ...createLoginSlice(...a),
        ...createRegisterSlice(...a),
      }),
      {
        name: 'nexus-storage',
        storage: createJSONStorage(() => localStorage), 
      }
    )
  )
);