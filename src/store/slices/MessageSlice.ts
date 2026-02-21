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
      console.error("Билдирүүлөрдү жүктөөдө ката:", error);
    }
  },

  connectSocket: (roomId) => {
    if (get().socket) {
      get().socket?.disconnect();
    }

    const token = Cookies.get("auth_token");

    const socket = io(API_URL!, {
      transports: ["websocket"], 
      auth: { token },
      reconnectionAttempts: 5,
    });

    socket.on("connect", () => {
      console.log("Сокетке туташты ✅");
      socket.emit("join-room", roomId);
    });

    socket.off("new-message"); 
    socket.on("new-message", (message: MessageProps) => {
      set((state) => {
        const exists = state.messages.some((m) => m.id === message.id);
        if (exists) return state;
        return { messages: [...state.messages, message] };
      });
    });

    socket.on("disconnect", () => console.log("Сокет үзүлдү ❌"));

    set({ socket });
  },

  sendMessage: (roomId, text) => {
    const socket = get().socket;
    if (socket && socket.connected) {
      socket.emit("send-message", { roomId, text });
    } else {
      console.error("Сокет туташкан эмес!");
    }
  },

  disconnectSocket: () => {
    get().socket?.disconnect();
    set({ socket: null });
  },
});
