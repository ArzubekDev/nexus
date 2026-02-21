import { StateCreator } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { io, Socket } from "socket.io-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface MessageProps {
  id: string;
  text: string;
  roomId: string;
  senderId: string;
  createdAt: string;
}

export interface MessageSlice {
  messages: MessageProps[];
  socket: Socket | null;
  fetchMessages: (roomId: string) => Promise<void>;
  connectSocket: (roomId: string) => void;
  sendMessage: (roomId: string, content: string, userId: string) => void;
  disconnectSocket: () => void;
}

export const createMessageSlice: StateCreator<MessageSlice> = (set, get) => ({
  messages: [],
  socket: null,

  fetchMessages: async (roomId) => {
    try {
      const res = await axios.get(`${API_URL}/messages?roomId=${roomId}`, {
        headers: { Authorization: `Bearer ${Cookies.get("auth_token")}` },
      });
      set({ messages: res.data });
    } catch (error) {
      console.error(error);
    }
  },

  connectSocket: (roomId) => {
    const existing = get().socket;
    if (existing) {
      existing.disconnect();
    }

    const token = Cookies.get("auth_token");

    const socket = io(API_URL, {
      auth: {
        token: token,
      },
    });

    socket.on("new-message", (message) => {
      set((state) => ({
        messages: [...state.messages, message],
      }));
    });

    socket.on("connect", () => {
      console.log("Connected to Socket");
      socket.emit("join-room", roomId);
    });

    set({ socket });
  },

  sendMessage: (roomId, text) => {
    get().socket?.emit("send-message", { roomId, text });
  },
  disconnectSocket: () => {
    get().socket?.disconnect();
    set({ socket: null });
  },
});
