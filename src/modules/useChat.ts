"use client";
import { useEffect, useRef, useState } from "react";
import { useStore } from "@/store/useStore";

export const useChat = (chatId: string) => {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTextEmpty, setIsTextEmpty] = useState(true);
const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  const {
    messages,
    user,
    fetchMessages,
    connectSocket,
    sendMessage,
    disconnectSocket,
    typingUsers,
    emitTyping,
    emitStopTyping,
    joinRoom,
  } = useStore((s) => s);

  const myUserId = user?.id;

const handleInput = () => {
  const textarea = textareaRef.current;
  if (!textarea || !myUserId) return;

  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;

  const value = textarea.value;
  const empty = value.trim().length === 0;

  if (empty !== isTextEmpty) {
    setIsTextEmpty(empty);
  }

  // 🔥 typing emit
  emitTyping(chatId, myUserId);

  if (typingTimeout.current) {
    clearTimeout(typingTimeout.current);
  }

  typingTimeout.current = setTimeout(() => {
    emitStopTyping(chatId, myUserId);
  }, 1500);
};


  useEffect(() => {
    if (!chatId) return;

    fetchMessages(chatId);
    joinRoom(chatId);

  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }, [text]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    const messageValue = textareaRef.current?.value.trim();

    if (!messageValue || !myUserId) return;

    sendMessage(chatId, messageValue, myUserId);

    emitStopTyping(chatId, myUserId);

    if (textareaRef.current) {
      textareaRef.current.value = "";
      textareaRef.current.style.height = "auto";
      setIsTextEmpty(true);
      textareaRef.current.focus();
    }
  };

return {
  text,
  setText,
  isTextEmpty,
  handleInput,
  textareaRef,
  messagesEndRef,
  messages,
  myUserId,
  handleSendMessage,
  typingUsers, 
};
};
