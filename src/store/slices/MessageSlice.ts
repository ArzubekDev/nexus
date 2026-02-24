import { StateCreator } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { io, Socket } from "socket.io-client";
import { RoomProps } from "./RoomSlice";
import { CombinedState } from "../useStore";

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
  typingUsers: string[];
  fetchMessages: (roomId: string) => Promise<void>;
  connectSocket: (roomId: string) => void;
  sendMessage: (roomId: string, content: string, userId: string) => void;
  disconnectSocket: () => void;
  emitTyping: (roomId: string, userId: string) => void;
  emitStopTyping: (roomId: string, userId: string) => void;
}

export const createMessageSlice: StateCreator<
  CombinedState,    
  [], 
  [], 
  MessageSlice      
> = (set, get) => ({
  messages: [],
  socket: null,
  typingUsers: [],

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

    socket.off("user-typing");
    socket.off("user-stop-typing");

    socket.on("user-typing", ({ userId }: { userId: string }) => {
      set((state) => {
        if (!state.typingUsers.includes(userId)) {
          return { typingUsers: [...state.typingUsers, userId] };
        }
        return state;
      });
    });

    socket.on("user-stop-typing", ({ userId }: { userId: string }) => {
      set((state) => ({
        typingUsers: state.typingUsers.filter((id) => id !== userId),
      }));
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
    // MessageSlice.ts ичиндеги connectSocket функциясынын ичине:

socket.on("room-created", (newRoom: RoomProps) => {
  set((state: any) => {
    const exists = state.rooms?.some((r: any) => r.id === newRoom.id);
    if (exists) return state;
    return { rooms: [newRoom, ...(state.rooms || [])] };
  });
});

socket.on("room-deleted", (roomId: string) => {
  set((state: any) => ({
    rooms: state.rooms?.filter((r: any) => r.id !== roomId) || [],
  }));
});

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

  emitTyping: (roomId, userId) => {
    get().socket?.emit("typing", { roomId, userId });
  },

  emitStopTyping: (roomId, userId) => {
    get().socket?.emit("stop-typing", { roomId, userId });
  },

  disconnectSocket: () => {
    get().socket?.disconnect();
    set({ socket: null, typingUsers: [] });
  },
});
