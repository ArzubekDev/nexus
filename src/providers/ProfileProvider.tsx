"use client";
import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Анимация үчүн кошулду

interface ModalContextType {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>; 
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export interface ProfileProps {
  children: ReactNode;
}

export const ProfileProvider = ({ children }: ProfileProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ isOpen, toggle, close, triggerRef }}>
      {children}
    </ModalContext.Provider>
  );
};

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal сөзсүз ModalProvider ичинде колдонулушу керек!");
  }
  return context;
}

ProfileProvider.OpenButton = ({ children }: ProfileProps) => {
  const { toggle, triggerRef } = useModal();
  return (
    <button ref={triggerRef} onClick={toggle}>
      {children}
    </button>
  );
};

ProfileProvider.CloseButton = ({ children }: ProfileProps) => {
  const { close } = useModal();
  return <button onClick={close}>{children}</button>;
};



ProfileProvider.Window = ({ children }: ProfileProps) => {
  const { isOpen, close, triggerRef } = useModal();
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
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.9, y: -20, x: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0, x: 0}}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ 
            duration: 0.2, 
            ease: [0.4, 0, 0.2, 1]
          }}
          className="absolute -right-57 top-0 mt-3 w-56 rounded-2xl bg-white dark:bg-[#1c1c24] shadow-2xl border border-gray-200 dark:border-gray-700 p-2 z-50"
        >
          {children}
        </motion.div>
      )}
     </>
  );
};
