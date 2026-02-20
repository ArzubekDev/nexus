import { FC, ReactNode } from "react";


interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="">
      <main className="flex-1 h-full overflow-hidden relative border-l">
        {children}
      </main>
    </div>
  );
};

export default Layout;
