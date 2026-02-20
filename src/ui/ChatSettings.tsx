import { ChatProvider } from "@/providers/ChatProvider";
import { useStore } from "@/store/useStore";
import { Settings, UserPlus, ShieldAlert, Trash2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type ChatSettingsProps = {
  chatId: string;
}

const ChatSettings = ({ chatId }: ChatSettingsProps) => {
  const { deleteRoom } = useStore();
  const router = useRouter()

  const handleDelete = async () => {
    await deleteRoom(chatId);
    router.replace("/")
  };

  return (
    <ChatProvider.Window>
      <div className="flex flex-col min-w-55 p-1.5 overflow-hidden">
        {/* Бөлүм 1: Негизги жөндөөлөр */}
        <div className="space-y-1">
          <button className="w-full group flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200">
            <Settings
              size={18}
              className="text-gray-500 group-hover:text-purple-400"
            />
            Настройки группы
          </button>

          <button className="w-full group flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200">
            <UserPlus
              size={18}
              className="text-gray-500 group-hover:text-purple-400"
            />
            Добавить участников
          </button>

          <button className="w-full group flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200">
            <ShieldAlert
              size={18}
              className="text-gray-500 group-hover:text-purple-400"
            />
            Конфиденциальность
          </button>
        </div>

        {/* Сызгыч (Divider) */}
        <div className="my-2 h-px bg-white/5 mx-2" />

        {/* Бөлүм 2: Коркунучтуу аракеттер */}
        <div className="space-y-1">
          <button className="w-full group flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all duration-200">
            <Trash2
              size={18}
              className="text-rose-500/70 group-hover:text-rose-500"
            />
            Очистить историю
          </button>

          <button onClick={handleDelete} className="w-full group flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-600/10 rounded-xl transition-all duration-200">
            <LogOut
              size={18}
              className="text-rose-600/70 group-hover:text-rose-600"
            />
            Удалить и выйти
          </button>
        </div>
      </div>
    </ChatProvider.Window>
  );
};

export default ChatSettings;
