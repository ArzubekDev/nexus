"use client";

import { ProfileProvider } from "@/providers/ProfileProvider";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";

const ProfileModal = () => {
  const { user, logout } = useStore((state) => state);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };
  return (
    <>
      <ProfileProvider.Window>
        <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {user?.email}
          </p>
          <p className="text-xs text-gray-500">Профиль</p>
        </div>

        <div className="flex flex-col mt-2 gap-1">
          <button
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm 
        text-gray-700 dark:text-gray-300 
        hover:bg-gray-100 dark:hover:bg-[#2a2a35] 
        transition"
          >
            Профиль
          </button>

          <button
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm 
        text-gray-700 dark:text-gray-300 
        hover:bg-gray-100 dark:hover:bg-[#2a2a35] 
        transition"
          >
            Настройка
          </button>

          <div className="h-px bg-gray-200 dark:bg-gray-700 my-2" />

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm 
        text-red-600 dark:text-red-400 
        hover:bg-red-50 dark:hover:bg-red-900/20 
        transition font-medium"
          >
            Выйти
          </button>
        </div>
      </ProfileProvider.Window>
    </>
  );
};

export default ProfileModal;
