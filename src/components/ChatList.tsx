"use client";
import { initialState, reducer } from "@/reducer/useReducer";
import { Plus, Search } from "lucide-react";
import { useEffect, useReducer, useState } from "react";
import { motion } from "framer-motion";
import CreateGroup from "./CreateGroup";
import { useStore } from "@/store/useStore";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const ChatList = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [state, dispatch] = useReducer(reducer, initialState);
  const [mounted, setMounted] = useState(false);
  const { rooms, fetchRooms } = useStore((s) => s); // fetchRooms-ту алдык

  useEffect(() => {
    setMounted(true);
    fetchRooms();
  }, []);

  if (!mounted) return null;
  return (
    <div className=" overflow-hidden w-80 flex px-6 flex-col border-r border-slate-200 dark:border-gray-800 bg-white dark:bg-[#101014] py-8 h-screen">
      {state.group ? (
        <CreateGroup dispatch={dispatch} />
      ) : (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative h-screen w-full"
        >
          <div className="pb-3 pt-4">
            <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-gray-200 flex items-center gap-2">
              Messages
              <span className="text-xs font-medium bg-purple-100 text-purple-600 px-2 py-1 rounded-full dark:bg-purple-900/30 dark:text-purple-400">
                22
              </span>
            </h2>

            {/* Издөө */}
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
            {rooms.map((el, idx) => {
              const isActive = pathname?.includes(el.id ?? "");
              return (
                <Link
                  href={`/${el.id}`}
                  key={el.id}
                  className={`flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 group
      ${
        isActive
          ? "bg-purple-50 dark:bg-purple-900/10 border-purple-100 dark:border-purple-800/50"
          : "bg-transparent hover:bg-slate-50 dark:hover:bg-[#1a1a20] border-transparent"
      } border`}
                >
                  <div className="relative">
                    <img
                      src="https://github.com/shadcn.png"
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-transparent group-hover:ring-purple-400 transition-all"
                      alt={el.name}
                    />
                    {/* Онлайн статус индикаторун кошсоң болот */}
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#101014] rounded-full"></span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h4
                        className={`font-semibold text-sm truncate ${isActive ? "text-purple-600 dark:text-purple-400" : "text-slate-700 dark:text-gray-200"}`}
                      >
                        {el.name}
                      </h4>
                      <span className="text-[10px] font-medium text-slate-400 dark:text-gray-500">
                        10:24
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="text-xs text-purple-500 font-medium truncate animate-pulse">
                        typing...
                      </p>
                      {/* Окула элек билдирүүлөр үчүн иконка */}
                      <span className="bg-purple-600 text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-4.5 text-center">
                        3
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <motion.button
            onClick={() => dispatch({ type: "OPEN" })}
            className="cursor-pointer absolute bottom-6 right-6 flex items-center justify-center 
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
    </div>
  );
};

export default ChatList;
