// Layout.tsx
"use client";
import ChatList from "@/components/ChatList";
import MiniSidebar from "@/components/MiniSidebar";
import { FC, ReactNode } from "react";
import { useParams } from "next/navigation"; // useParams кошобуз

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { chatId } = useParams(); // Учурда чат ачыкпы же жокпу текшеребиз

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white dark:bg-[#0f0f13]">
      <div className={`${chatId ? "hidden md:flex" : "flex"}`}>
        <MiniSidebar />
      </div>

      <div className={`${chatId ? "hidden md:block" : "block"} w-full md:w-80 border-r border-slate-200 dark:border-gray-800`}>
        <ChatList />
      </div>

      <main className={`flex-1 h-full overflow-hidden relative ${!chatId ? "hidden md:block" : "block"}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout