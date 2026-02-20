import axios from "axios";
import { StateCreator } from "zustand";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface RoomProps {
  id?: string;
  name: string;
  isGroup: boolean;
}

export interface RoomSlice {
  rooms: RoomProps[];
  isLoading: boolean;
  error: string | null;
  fetchRooms: () => Promise<void>;
  createRoom: (room: {
    name: string;
    isGroup: boolean;
  }) => Promise<{ success: boolean }>;
  deleteRoom: (id: string) => Promise<void>;
}


export const createRoomSlice: StateCreator<RoomSlice> = (set) => ({
  rooms: [],
  isLoading: false,
  error: null,

  createRoom: async (room) => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.post(`${API_URL}/rooms`, room, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });

      set((state) => ({
        rooms: [...state.rooms, res.data],
        isLoading: false,
      }));

      return { success: true };
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Ката кетти",
        isLoading: false,
      });

      return { success: false };
    }
  },

  fetchRooms: async () => {
    try {
      const res = await axios.get(`${API_URL}/rooms`, {
        headers: { Authorization: `Bearer ${Cookies.get("auth_token")}` },
      });
      set({ rooms: res.data });
    } catch (error) {
      console.error("Бөлмөлөрдү жүктөөдө ката:", error);
    }
  },

deleteRoom: async (id) => {
  set({ isLoading: true, error: null });

  try {
    await axios.delete(`${API_URL}/rooms/${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("auth_token")}`,
      },
    });

    set((state) => ({
      rooms: state.rooms.filter((room) => room.id !== id),
      isLoading: false,
    }));
  } catch (error: any) {
    set({
      error: error.response?.data?.message || "Ката кетти",
      isLoading: false,
    });
  }
}

});

