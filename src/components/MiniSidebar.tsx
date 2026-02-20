"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MessageSquare, Phone, Settings, Users } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useStore } from "@/store/useStore";
import { ProfileProvider } from "@/providers/ProfileProvider";
import ProfileModal from "@/ui/ProfileModal";

const MiniSidebar = () => {
  const { user, logout } = useStore((state) => state);

  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [mustScroll, setMustScroll] = useState(false);
  const [scrollAmount, setScrollAmount] = useState(0);

  console.log(user, 'USER');
  
  useEffect(() => {
    if (containerRef.current && textRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = textRef.current.scrollWidth;

      if (textWidth > containerWidth) {
        setMustScroll(true);
        setScrollAmount(textWidth - containerWidth + 8);
      }
    }
  }, [user?.email]);

  return (
    <aside className="w-20 h-screen flex flex-col items-center border-r border-gray-200 dark:border-gray-800 bg-[#f8faff] dark:bg-[#1a1a20] py-20">
      <div className="mb-8 relative">
        {user ? (
          <ProfileProvider>
            <ProfileProvider.OpenButton>
              <div className="cursor-pointer flex flex-col items-center gap-2 w-full">
                <img
                  src={user.avatarUrl || "https://github.com/shadcn.png"}
                  alt={user.email}
                  className="w-10 h-10 rounded-full object-cover border-2 border-purple-500"
                />

                <div
                  ref={containerRef}
                  className="relative w-17.5 overflow-hidden group"
                >
                 <div className="absolute left-0 top-0 bottom-0 w-3 z-10 pointer-events-none bg-linear-to-r from-slate-50 dark:from-[#1a1a20] to-transparent" />
  <div className="absolute right-0 top-0 bottom-0 w-3 z-10 pointer-events-none bg-linear-to-l from-slate-50 dark:from-[#1a1a20] to-transparent" />
                  <motion.span
                    ref={textRef}
                    initial={{ x: 0 }}
                    animate={
                      mustScroll
                        ? {
                            x: [0, -scrollAmount, -scrollAmount, 0, 0],
                          }
                        : {}
                    }
                    transition={{
                      duration: 16,
                      times: [0, 0.3, 0.5, 0.8, 1],
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 2,
                    }}
                    className="text-[10px] text-gray-800 dark:text-gray-300 inline-block whitespace-nowrap px-1 font-medium"
                  >
                    {user.email}
                  </motion.span>
                </div>
              </div>
            </ProfileProvider.OpenButton>
            <ProfileModal />
          </ProfileProvider>
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center">
            <Users size={20} className="text-white" />
          </div>
        )}
      </div>

      <nav className="flex flex-col items-center gap-10 text-gray-800 dark:text-gray-400 w-full px-4">
        <div className="w-full h-[1.5px] bg-gray-800 dark:bg-gray-400" />
        <button className="group relative text-slate-500 hover:text-indigo-600 transition cursor-pointer">
          <MessageSquare size={20} />
           <span
            className="absolute left-6 ml-2 w-max px-2 py-1 rounded-md bg-gray-800 text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50"
          >
            Сообщение
          </span>
        </button>
        <button className="group relative text-slate-500 hover:text-indigo-600  transition cursor-pointer">
          <Phone size={20} />
           <span
            className="absolute left-6 ml-2 w-max px-2 py-1 rounded-md bg-gray-800 text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50"
          >
            Звонки
          </span>
        </button>
        <button className="group relative text-slate-500 hover:text-indigo-600  transition cursor-pointer">
          <Users size={20} />
           <span
            className="absolute left-6 ml-2 w-max px-2 py-1 rounded-md bg-gray-800 text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50"
          >
            Контакты
          </span>
        </button>

        <button className="group relative text-slate-500 hover:text-indigo-600  transition cursor-pointer">
          <Settings size={20} />
          <span
            className="absolute left-6 ml-2 w-max px-2 py-1 rounded-md bg-gray-800 text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50"
          >
            Настройки
          </span>
        </button>
      </nav>

      <div className="mt-auto text-gray-300">
        <ThemeToggle />
      </div>
    </aside>
  );
};

export default MiniSidebar;
