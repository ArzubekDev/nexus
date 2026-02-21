"use client";
import React, { useEffect, useRef, useState } from "react";
import { useStore } from "@/store/useStore";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  Phone, 
  Settings, 
  Users, 
  X, 
  LogOut, 
  ChevronRight 
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useRouter } from "next/navigation";

type MobileProfileProps = {
  modal: boolean;
  onClose?: () => void;
};

const MobileProfile = ({ modal, onClose }: MobileProfileProps) => {
  const { user, logout } = useStore((state) => state);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [mustScroll, setMustScroll] = useState(false);
  const [scrollAmount, setScrollAmount] = useState(0);
  const router = useRouter()

  useEffect(() => {
    if (containerRef.current && textRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = textRef.current.scrollWidth;
      if (textWidth > containerWidth) {
        setMustScroll(true);
        setScrollAmount(textWidth - containerWidth + 12);
      }
    }
  }, [user?.email]);

    const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  const menuItems = [
    { icon: <MessageSquare size={22} />, label: "Сообщения", count: 12 },
    { icon: <Phone size={22} />, label: "Звонки", count: 0 },
    { icon: <Users size={22} />, label: "Контакты", count: 0 },
    { icon: <Settings size={22} />, label: "Настройки", count: null },
  ];

  return (
    <AnimatePresence>
      {modal && (
        <motion.div
        onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm md:hidden"
        >
          <motion.div
          onClick={(e) => e.stopPropagation()}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-0 left-0 h-full w-[85%] max-w-[320px] bg-white dark:bg-[#0f0f12] shadow-2xl flex flex-col"
          >
            {/* Header / Profile Section */}
            <div className="relative p-6 pt-12 bg-linear-to-br from-purple-600/10 to-blue-500/10 dark:from-purple-900/20 dark:to-transparent border-b border-gray-100 dark:border-white/5">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-linear-to-r from-purple-600 to-blue-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                  <img
                    src={user?.avatarUrl || "https://github.com/shadcn.png"}
                    alt="avatar"
                    className="relative w-20 h-20 rounded-full object-cover border-4 border-white dark:border-[#1a1a20] shadow-xl"
                  />
                </div>

                <div className="mt-4 w-full px-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {"User Name"}
                  </h3>
                  <div ref={containerRef} className="relative w-full overflow-hidden mt-1">
                    <motion.span
                      ref={textRef}
                      animate={mustScroll ? { x: [0, -scrollAmount, 0] } : {}}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                      className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap inline-block"
                    >
                      {user?.email}
                    </motion.span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
              <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
                Меню
              </p>
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all group"
                >
                  <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                    <span className="p-2 rounded-xl bg-gray-100 dark:bg-white/5 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/20 transition-colors">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.count ? (
                      <span className="text-[10px] font-bold bg-purple-600 text-white px-2 py-0.5 rounded-full">
                        {item.count}
                      </span>
                    ) : null}
                    <ChevronRight size={16} className="text-gray-300 dark:text-gray-600" />
                  </div>
                </button>
              ))}
            </nav>

            {/* Footer Section */}
            <div className="p-6 border-t border-gray-100 dark:border-white/5 space-y-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Тема</span>
                <ThemeToggle />
              </div>
              
              <button onClick={handleLogout} className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                <LogOut size={22} />
                <span className="font-bold">Выйти</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileProfile;