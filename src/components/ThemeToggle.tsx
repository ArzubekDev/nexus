"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Гидратация катасын болтурбоо үчүн
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative p-2 rounded-full bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle Theme"
    >
      <div className="relative w-6 h-6">
        {/* Күн (Light Mode) */}
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{
            scale: theme === "dark" ? 0 : 1,
            rotate: theme === "dark" ? -90 : 0,
            opacity: theme === "dark" ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center text-orange-500"
        >
          <Sun size={24} />
        </motion.div>

        {/* Ай (Dark Mode) */}
        <motion.div
          initial={{ scale: 0, rotate: 90 }}
          animate={{
            scale: theme === "dark" ? 1 : 0,
            rotate: theme === "dark" ? 0 : 90,
            opacity: theme === "dark" ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center text-blue-500"
        >
          <Moon size={24} />
        </motion.div>
      </div>
    </button>
  );
}