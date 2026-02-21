import { initialState, reducer } from "@/reducer/useReducer";
import { useRouter } from "next/navigation";
import React, { useReducer } from "react";

type ChatListButtonProps = {
  el: {
    id?: string;
    name?: string;
  };
};

const ChatListMobileButton = ({ el }: ChatListButtonProps) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <button
      key={el.id}
      className={`md:hidden w-full cursor-pointer flex items-center gap-3 p-3 rounded-2xl bg-transparent hover:bg-slate-50 dark:hover:bg-[#1a1a20] border-transparent border`}
    >
      <div className="relative">
        <img
          src="https://github.com/shadcn.png"
          className="w-12 h-12 rounded-full object-cover ring-2 ring-transparent group-hover:ring-purple-400 transition-all"
          alt={el.name}
        />
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#101014] rounded-full"></span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline mb-0.5">
          <h4
            className={`font-semibold text-sm truncate text-slate-700 dark:text-gray-200`}
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
          <span className="bg-purple-600 text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-4.5 text-center">
            3
          </span>
        </div>
      </div>
    </button>
  );
};

export default ChatListMobileButton;
