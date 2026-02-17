import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import MiniSidebar from "@/components/MiniSidebar";
import ChatList from "@/components/ChatList";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Nexus Chat",
  description: "Real-time futuristic chat application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}
      >
       <ThemeProvider
            attribute="class"
            defaultTheme="dark" // Демейки тема
            enableSystem
            disableTransitionOnChange
          >

         <div className="flex h-screen w-full overflow-hidden bg-white dark:bg-[#0f0f13]">
            
            <MiniSidebar />

            <ChatList />

            <main className="flex-1 h-full overflow-hidden relative">
              {children}
            </main>

          </div>
          </ThemeProvider>
      </body>
    </html>
  );
}