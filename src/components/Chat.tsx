"use client";
import React, { use } from 'react';
import { useStore } from "@/store/useStore";
import { Phone, Video, Search, Settings, Paperclip, Mic } from 'lucide-react';
import { ChatProvider } from '@/providers/ChatProvider';
import ChatSettings from '@/ui/ChatSettings';

interface ChatProps {
  params: Promise<{ chatId: string }>;
}

const Chat = ({ params }: ChatProps) => {
  const { chatId } = use(params);
  const rooms = useStore((s) => s.rooms);
  const currentChat = rooms.find((room) => room.id === chatId);

  if (!currentChat) return <div className="flex-1 bg-white dark:bg-[#101014]" />;

  return (
    <section className="flex-1 h-screen flex flex-col bg-white dark:bg-[#0b0b0e] text-slate-900 dark:text-white overflow-hidden transition-colors duration-300">
      
      {/* --- HEADER --- */}
      {/* Light: Ак / Dark: Purple Gradient */}
      <header className="relative h-24 flex items-center justify-between px-8 
        bg-white border-b border-slate-100 
        dark:bg-linear-to-r dark:from-[#1a1a2e] dark:via-[#3b1c71] dark:to-[#1a1a2e] dark:border-none shadow-sm">
        
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
            <h3 className="text-xl font-bold tracking-tight dark:tracking-wide">{currentChat.name}</h3>
            <p className="text-xs text-slate-500 dark:text-gray-300 dark:opacity-80">48 Members, 12 Online</p>
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

      {/* --- CHAT BODY --- */}
      {/* Light: Slate-50 / Dark: Deep Purple Gradient */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 
        bg-[#f8fafc] 
        dark:bg-linear-to-b dark:from-[#1a1a2e] dark:to-[#0b0b0e] custom-scrollbar">
        
        {/* Date Separator */}
        <div className="flex items-center gap-4 opacity-20 dark:opacity-30">
          <div className="flex-1 h-px bg-slate-400 dark:bg-gray-500"></div>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-white">Today</span>
          <div className="flex-1 h-px bg-slate-400 dark:bg-gray-500"></div>
        </div>

        {/* Receiver Message */}
        <div className="flex items-start gap-4 max-w-lg">
          <img src="https://i.pravatar.cc/150?u=sasha" className="w-8 h-8 rounded-full shadow-sm" />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-bold text-slate-700 dark:text-white">Sasha</span>
              <span className="text-[10px] text-slate-400 dark:text-gray-500">11:01</span>
            </div>
            {/* Light: Ак / Dark: Indigo Bubble */}
            <div className="bg-white text-slate-700 border border-slate-100 shadow-sm
              dark:bg-[#4d38a2] dark:text-white dark:border-none dark:shadow-lg
              p-4 rounded-2xl rounded-tl-none">
              <p className="text-sm leading-relaxed">What's up guys! How about today project?</p>
            </div>
          </div>
        </div>

        {/* Sender Message (YOU) */}
        <div className="flex items-start gap-4 max-w-lg ml-auto flex-row-reverse">
          <img src="https://github.com/shadcn.png" className="w-8 h-8 rounded-full shadow-sm" />
          <div className="text-right">
            <div className="flex items-center justify-end gap-2 mb-1">
              <span className="text-[10px] text-slate-400 dark:text-gray-500">11:05</span>
              <span className="text-sm font-bold text-purple-600 dark:text-purple-400">You</span>
            </div>
            {/* Light: Purple-600 / Dark: Purple Gradient Bubble */}
            <div className="bg-purple-600 text-white shadow-md shadow-purple-200
              dark:bg-linear-to-r dark:from-[#9d50bb] dark:to-[#6e48aa] dark:shadow-xl dark:shadow-purple-900/20
              p-4 rounded-2xl rounded-tr-none">
              <p className="text-sm leading-relaxed">I saw 2 creative UI design and I want to share with you guys!</p>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 dark:text-gray-500 italic ml-12 animate-pulse">Anastasia is typing...</p>
      </div>

      {/* --- INPUT AREA --- */}
      <footer className="p-6 bg-white dark:bg-[#0b0b0e] border-t border-slate-100 dark:border-none">
        <div className="max-w-4xl mx-auto flex items-center gap-4 
          bg-slate-50 dark:bg-[#1a1a20] 
          p-2 rounded-2xl border border-slate-200 dark:border-white/5 
          focus-within:border-purple-500/50 transition-all">
          
          <button className="p-2 hover:bg-purple-100 dark:hover:bg-white/5 rounded-xl transition text-slate-400 dark:text-gray-400">
            <Paperclip className="w-5 h-5" />
          </button>
          
          <input 
            type="text" 
            placeholder="Your Message..." 
            className="flex-1 bg-transparent border-none outline-none text-sm py-2 px-2 text-slate-700 dark:text-white placeholder-slate-400 dark:placeholder-gray-600"
          />

          <button className="p-3 bg-white dark:bg-white/5 hover:bg-purple-600 hover:text-white dark:hover:bg-white/10 transition rounded-xl text-purple-600 dark:text-gray-400 shadow-sm border border-slate-200 dark:border-none">
            <Mic className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </section>
  );
};

export default Chat;