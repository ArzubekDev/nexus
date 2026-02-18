import { FC, ReactNode } from "react";
import { ToastContainer } from "react-toastify";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="">
      <main className="flex-1 h-full overflow-hidden relative border-l">
        <ToastContainer />
        {children}
      </main>
    </div>
  );
};

export default Layout;
