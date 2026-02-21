"use client";
import { useEffect, useRef, useState } from "react";
import { useStore } from "@/store/useStore";

export const useChat = (chatId: string) => {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    user,
    fetchMessages,
    connectSocket,
    sendMessage,
    disconnectSocket,
  } = useStore((s) => s);

  const myUserId = user?.id;

  useEffect(() => {
    if (!chatId) return;

    fetchMessages(chatId);
    connectSocket(chatId);

    return () => {
      disconnectSocket();
    };
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
    if (!text.trim() || !myUserId) return;

    sendMessage(chatId, text, myUserId);
    setText("");
  };

  return {
    text,
    setText,
    textareaRef,
    messagesEndRef,
    messages,
    myUserId,
    handleSendMessage,
  };
};