"use client";
import { initialState, reducer } from "@/reducer/useReducer";
import { Plus, Search } from "lucide-react";
import { useEffect, useReducer, useRef, useState } from "react";
import { motion } from "framer-motion";
import CreateGroup from "./CreateGroup";
import { useStore } from "@/store/useStore";
import animationData from "@/assets/lottie/menu.json";
import animationDataDark from "@/assets/lottie/dark.json";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import ChatListButton from "@/ui/ChatListButton";
import ChatListMobileButton from "@/ui/ChatListMobileButton";
import ChatMobile from "./ChatMobile";
import MobileProfile from "@/ui/MobileProfile";

const ChatList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { rooms, fetchRooms } = useStore((s) => s);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [modal, setModal] = useState(false);

  const handleMenu = () => {
    if (modal) {
      lottieRef.current?.setDirection(-1);
    } else {
      lottieRef.current?.setDirection(1);
    }
    lottieRef.current?.play();
    setModal((prev) => !prev);
  };

  useEffect(() => {
    setMounted(true);
    fetchRooms();
  }, []);

  useEffect(() => {
    setMounted(true);
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

 if (!mounted) return <div className="skeleton-sidebar" />; 
  return (
    <>
      {state.chat && state.activeChatId ? (
        <ChatMobile dispatch={dispatch} chatId={state.activeChatId} />
      ) : (
        <motion.div
          key="list"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
          className="py-8 px-6 overflow-hidden w-screen md:w-80 flex flex-col border-r border-slate-200 dark:border-gray-800 bg-white dark:bg-[#101014] h-screen"
        >
          {state.group ? (
            <CreateGroup dispatch={dispatch} />
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
              className="relative h-screen w-full"
            >
              <div onClick={handleMenu} className="w-12 h-12 cursor-pointer">
                <Lottie
                  key={!isDark ? "dark" : "light"}
                  lottieRef={lottieRef}
                  animationData={!isDark ? animationDataDark : animationData}
                  loop={false}
                  autoplay={false}
                />
              </div>

              {modal && <MobileProfile modal={modal} onClose={handleMenu} />}
              <div className="pb-3 pt-4">
                <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-gray-200 flex items-center gap-2">
                  Messages
                  <span className="text-xs font-medium bg-purple-100 text-purple-600 px-2 py-1 rounded-full dark:bg-purple-900/30 dark:text-purple-400">
                    22
                  </span>
                </h2>

                <div className="group relative bg-slate-100 dark:bg-[#1a1a20] rounded-xl flex items-center px-4 py-3 transition-colors focus-within:ring-2 focus-within:ring-purple-500/20">
                  <Search
                    size={18}
                    className="text-slate-400 dark:text-gray-500 mr-3 group-focus-within:text-purple-500 transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent border-none outline-none text-sm w-full placeholder-slate-400 dark:placeholder-gray-600 text-slate-700 dark:text-gray-200"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
                {rooms.map((el) => (
                  <div key={el.id} className="w-full">
                    {/* Десктоп версиясы (URL аркылуу өтөт) */}
                    <div className="hidden md:block">
                      <ChatListButton el={el} />
                    </div>

                    {/* Мобилдик версиясы (State аркылуу ачылат) */}
                    <div
                      className="md:hidden block"
                      onClick={() => {
                        if (el.id) {
                          dispatch({ type: "OPEN_CHAT", payload: el.id });
                        }
                      }}
                    >
                      <ChatListMobileButton el={el} />
                    </div>
                  </div>
                ))}
              </div>

              <motion.button
                onClick={() => dispatch({ type: "OPEN_GROUP" })}
                className="cursor-pointer absolute md:bottom-6 md:right-6 bottom-0 right-0 flex items-center justify-center 
             bg-linear-to-tr from-purple-600 to-blue-500 
             hover:from-purple-700 hover:to-blue-600 
             text-white p-4 rounded-2xl shadow-lg shadow-purple-500/30 
             transition-all duration-300 z-20 group"
                title="Создать группу"
                aria-label="Создать новую группу"
              >
                <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      )}
    </>
  );
};

export default ChatList;
