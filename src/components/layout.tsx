import { FC, ReactNode } from "react";
import ChatList from "./ChatList";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return <>
    <ChatList/>
    {children}
  </>
}

export default Layout;