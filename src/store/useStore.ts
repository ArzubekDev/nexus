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
        name: 'user-storage',
        storage: createJSONStorage(() => localStorage),
        
        partialize: (state) => ({
          user: state.user,
          rooms: state.rooms,
        }),

        onRehydrateStorage: (state) => {
          console.log("Маалыматтарды калыбына келтирүү башталды...");
          return (state, error) => {
            if (error) {
              console.error("Калыбына келтирүүдө ката кетти:", error);
            } else {
              console.log("LocalStorage ийгиликтүү жүктөлдү ✅");
            }
          };
        },
      }
    )
  )
);