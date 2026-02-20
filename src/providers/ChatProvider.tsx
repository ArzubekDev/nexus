"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";

interface ChatType {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export const ChatContext = createContext<ChatType | undefined>(undefined);

export interface ChatSettingsProps {
  children: ReactNode;
}

export const ChatProvider = ({ children }: ChatSettingsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  return (
    <ChatContext.Provider value={{ isOpen, toggle, triggerRef, close }}>
      {children}
    </ChatContext.Provider>
  );
};

export function useChatSettings() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error(
      "useChatSettings сөзсүз ChatProvider ичинде колдонулушу керек!",
    );
  }
  return context;
}

ChatProvider.Open = ({ children }: ChatSettingsProps) => {
  const { toggle, triggerRef } = useChatSettings();
  return (
    <button ref={triggerRef} onClick={toggle}>
      {children}
    </button>
  );
};

ChatProvider.Close = ({ children }: ChatSettingsProps) => {
  const { close } = useChatSettings();
  return <button onClick={close}>{children}</button>;
};

ChatProvider.Window = ({ children }: ChatSettingsProps) => {
  const { isOpen, close, triggerRef } = useChatSettings();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [close, isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        modalRef.current &&
        !modalRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        close();
      }
    };

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [close, isOpen, triggerRef]);

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -13, x: 10 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{
            duration: 0.2,
            ease: [0.4, 0, 0.2, 1],
          }}
          ref={modalRef}
          className="absolute right-0 -bottom-69 mt-3 w-56 rounded-2xl bg-white dark:bg-[#1c1c24] shadow-2xl border border-gray-200 dark:border-gray-700 p-2 z-50"
        >
          {children}
        </motion.div>
      )}
    </>
  );
};
