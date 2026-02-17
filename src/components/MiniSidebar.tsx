import { MessageSquare, Phone, Settings, Users } from "lucide-react";
import React from "react";
import { ThemeToggle } from "./ThemeToggle";

const MiniSidebar = () => {
  return (
    <aside className="w-20 h-screen flex flex-col items-center border-r border-gray-200 dark:border-gray-800 bg-[#bebebe] dark:bg-[#1a1a20] py-20">
      <div className="mb-8">
        <img
          src="https://github.com/shadcn.png"
          alt="Logo"
          className="w-10 h-10 rounded-full object-cover border-2 border-purple-500"
        />
      </div>
      <nav className="flex flex-col items-center gap-10 text-gray-800 dark:text-gray-400 w-full px-4">
        <div className="w-full h-[1.5px] bg-gray-800 dark:bg-gray-400" />
        <button className="hover:text-gray-200 transition cursor-pointer">
          <MessageSquare size={20} />
        </button>
        <button className="hover:text-gray-200 transition cursor-pointer">
          <Phone size={20} />
        </button>
        <button className="hover:text-gray-200 transition cursor-pointer">
          <Users size={20} />
        </button>
        <button className="hover:text-gray-200 transition cursor-pointer">
          <Settings size={20} />
        </button>
      </nav>

      <div className="mt-auto text-gray-300">
        <ThemeToggle />
      </div>
    </aside>
  );
};

export default MiniSidebar;
