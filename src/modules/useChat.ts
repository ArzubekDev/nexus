"use client";
import { useStore } from "@/store/useStore";
import { useEffect, useRef, useState } from "react";

export const useChat = (chatId: string) => {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTextEmpty, setIsTextEmpty] = useState(true);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const {
    messages,
    user,
    fetchMessages,
    connectSocket,
    uploadVoice,
    sendMessage,
    disconnectSocket,
    typingUsers,
    emitTyping,
    emitStopTyping,
    joinRoom,
  } = useStore((s) => s);

  const myUserId = user?.id;

  // Сокетке туташуу / ажыратуу
  useEffect(() => {
    connectSocket();

    return () => {
      disconnectSocket();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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


  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        await uploadVoice(chatId, audioBlob);
        stream.getTracks().forEach(track => track.stop()); // Микрофонду өчүрүү
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Микрофонго уруксат берилген жок:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  return {
    text,
    setText,
    isTextEmpty,
    handleInput,
    isRecording,
    startRecording,
    stopRecording,
    textareaRef,
    messagesEndRef,
    messages,
    myUserId,
    handleSendMessage,
    typingUsers,
  };
};
