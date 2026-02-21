"use client";
import React from "react";
import { useStore } from "@/store/useStore"; 
import {
  Phone,
  Video,
  Search,
  Settings,
  Paperclip,
  Mic,
  Send,
} from "lucide-react";
import { ChatProvider } from "@/providers/ChatProvider";
import ChatSettings from "@/ui/ChatSettings";
import { useParams } from "next/navigation";
import { useChat } from "@/modules/useChat";

const Chat = () => {
  // 1. useParams аркылуу chatId алуу
  const { chatId } = useParams() as { chatId: string };

  // 2. Бардык логиканы бир эле жерден (хуктан) алуу
  const {
    text,
    setText,
    textareaRef,
    messagesEndRef,
    messages,
    myUserId,
    handleSendMessage,
  } = useChat(chatId);

  // 3. Бөлмөлөр тизмесинен учурдагы чатты табуу
  const rooms = useStore((s) => s.rooms);
  const currentChat = rooms.find((room) => room.id === chatId);

  if (!currentChat)
    return <div className="flex-1 bg-white dark:bg-[#101014]" />;

  return (
    <section className="z-50 flex-1 h-screen flex flex-col bg-white dark:bg-[#0b0b0e] text-slate-900 dark:text-white overflow-hidden transition-colors duration-300">
      <header
        className="relative h-24 flex items-center justify-between px-8 
        bg-white border-b border-slate-100 
        dark:bg-linear-to-r dark:from-[#1a1a2e] dark:via-[#3b1c71] dark:to-[#1a1a2e] dark:border-none shadow-sm"
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src="https://github.com/shadcn.png"
              className="w-12 h-12 rounded-full object-cover border-2 border-purple-100 dark:border-purple-400 shadow-sm"
              alt="avatar"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#1a1a2e] rounded-full"></span>
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight dark:tracking-wide">
              {currentChat.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-gray-300 dark:opacity-80">
              Active Session
            </p>
          </div>
        </div>

        <div className="relative flex items-center gap-5 text-slate-400 dark:text-gray-300">
          <Phone className="w-5 h-5 cursor-pointer hover:text-purple-600 dark:hover:text-white transition" />
          <Video className="w-5 h-5 cursor-pointer hover:text-purple-600 dark:hover:text-white transition" />
          <Search className="w-5 h-5 cursor-pointer hover:text-purple-600 dark:hover:text-white transition" />

          <ChatProvider>
            <ChatProvider.Open>
              <Settings className="w-5 h-5 cursor-pointer hover:text-purple-600 dark:hover:text-white transition" />
            </ChatProvider.Open>
            <ChatSettings chatId={chatId} />
          </ChatProvider>
        </div>
      </header>

      {/* Билдирүүлөр тизмеси */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-[#f8fafc] dark:bg-linear-to-b dark:from-[#1a1a2e] dark:to-[#0b0b0e] custom-scrollbar">
        {messages.map((msg: any) => {
          const isMe = msg.senderId === myUserId;

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-4 max-w-lg ${isMe ? "ml-auto flex-row-reverse" : ""}`}
            >
              <img
                src={isMe ? "https://github.com/shadcn.png" : "https://i.pravatar.cc/150?u=sasha"}
                className="w-8 h-8 rounded-full shadow-sm"
                alt="sender"
              />
              <div className={isMe ? "text-right" : ""}>
                <div className={`flex items-center gap-2 mb-1 ${isMe ? "justify-end" : ""}`}>
                  <span className={`text-sm font-bold ${isMe ? "text-purple-600 dark:text-purple-400" : "text-slate-700 dark:text-white"}`}>
                    {isMe ? "You" : "User"}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-gray-500">
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>

                <div className={`p-4 rounded-2xl ${
                    isMe
                      ? "bg-purple-600 text-white shadow-md rounded-tr-none"
                      : "bg-white text-slate-700 border border-slate-100 shadow-sm dark:bg-[#4d38a2] dark:text-white rounded-tl-none"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            </div>
          );
        })}
        {/* Скролл үчүн бош div */}
        <div ref={messagesEndRef} /> 
      </div>

      <footer className="p-6 bg-white dark:bg-[#0b0b0e] border-t border-slate-100">
        <form
          onSubmit={handleSendMessage}
          className="max-w-4xl mx-auto flex items-end gap-4 bg-slate-50 dark:bg-[#1a1a20] p-2 rounded-2xl border border-slate-200 dark:border-white/5"
        >
          <button type="button" className="p-3 text-slate-400">
            <Paperclip className="w-5 h-5" />
          </button>

          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={1}
            placeholder="Your Message..."
            className="flex-1 bg-transparent resize-none border-none outline-none text-sm py-2 px-2 text-slate-700 dark:text-white"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />

          {text.trim() ? (
            <button type="submit" className="p-3 bg-purple-600 rounded-xl text-white">
              <Send className="w-5 h-5" />
            </button>
          ) : (
            <button type="button" className="p-3 text-purple-600">
              <Mic className="w-5 h-5" />
            </button>
          )}
        </form>
      </footer>
    </section>
  );
};

export default Chat;