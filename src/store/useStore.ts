import { create } from "zustand";
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { createRegisterSlice, RegisterSlice } from "./slices/RegisterSlice";
import { createLoginSlice, LoginSlice } from "./slices/LoginSlice";
import { createRoomSlice, RoomSlice } from "./slices/RoomSlice";
import { createMessageSlice, MessageSlice } from "./slices/MessageSlice";


type CombinedState = RegisterSlice & LoginSlice & RoomSlice & MessageSlice;

export const useStore = create<CombinedState>()(
  devtools(
    persist(
      (...a) => ({
        ...createLoginSlice(...a),
        ...createRegisterSlice(...a),
        ...createRoomSlice(...a),
        ...createMessageSlice(...a), 
      }),
      {
        name: 'nexus-storage',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          user: (state as any).user,
        }),
      }
    )
  )
);