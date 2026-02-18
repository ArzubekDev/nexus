import ChatList from "@/components/ChatList";
import MiniSidebar from "@/components/MiniSidebar";
import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className="flex h-screen w-full overflow-hidden bg-white dark:bg-[#0f0f13]">
        <MiniSidebar />

        <ChatList />

        <main className="flex-1 h-full overflow-hidden relative">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
