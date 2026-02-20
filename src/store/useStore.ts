import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRegisterSlice, RegisterSlice } from "./slices/RegisterSlice";
import { createLoginSlice, LoginSlice } from "./slices/LoginSlice";
import { persist, createJSONStorage } from 'zustand/middleware';
import { createRoomSlice, RoomSlice,  } from "./slices/RoomSlice";


type CombinedState = RegisterSlice & LoginSlice & RoomSlice;


export const useStore = create<CombinedState>()(
  devtools(
   persist(
  (...a) => ({
    ...createLoginSlice(...a),
    ...createRegisterSlice(...a),
    ...createRoomSlice(...a)
  }),
  {
    name: 'nexus-storage',
    storage: createJSONStorage(() => localStorage),

    partialize: (state) => ({
      user: state.user,
    }),
  }
)
  )
);