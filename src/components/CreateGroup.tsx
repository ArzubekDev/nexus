"use client";
import { useStore } from "@/store/useStore";
import { motion } from "framer-motion";
import { MoveLeft, Camera, Users, Link as LinkIcon, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

type CreateGroupProps = {
  dispatch: React.Dispatch<{ type: "OPEN_GROUP" | "CLOSE_GROUP" }>;
};

const CreateGroup = ({ dispatch }: CreateGroupProps) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const createRoom = useStore((state) => state.createRoom);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    const name = nameRef.current?.value.trim();

    if (!name) {
      toast.error("Пожалуйста, заполните название группы.");
      return;
    }

    setLoading(true);
    const result = await createRoom({ name, isGroup: true });
    setLoading(false);

    if (result.success) {
      toast.success("Группа успешно создана!");
      dispatch({ type: "CLOSE_GROUP" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative w-full h-full flex flex-col bg-white dark:bg-[#101014]"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/5">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => dispatch({ type: "CLOSE_GROUP" })}
          className="p-2.5 cursor-pointer bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-gray-300 rounded-xl hover:text-purple-500 transition-colors"
        >
          <MoveLeft size={20} />
        </motion.button>
        <h2 className="text-xl font-bold bg-linear-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Новая группа
        </h2>
        <div className="w-10" /> {/* Spacer */}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        {/* Avatar Section */}
        <div className="flex flex-col items-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-purple-600 to-blue-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative w-28 h-28 rounded-full bg-slate-100 dark:bg-white/5 border-2 border-dashed border-slate-300 dark:border-gray-700 flex items-center justify-center overflow-hidden transition-all group-hover:border-purple-500">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center text-slate-400 dark:text-gray-500">
                  <Camera size={32} strokeWidth={1.5} />
                  <span className="text-[10px] mt-1 font-medium">AVATAR</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="w-full max-w-sm mt-6">
            <div className="relative flex items-center">
              <LinkIcon size={16} className="absolute left-4 text-slate-400" />
              <input
                type="text"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="Ссылка на аватар"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-white/5 border border-transparent dark:border-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all text-sm dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="space-y-6 max-w-sm mx-auto">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-gray-500 ml-1">
              Название группы
            </label>
            <input
              ref={nameRef}
              type="text"
              placeholder="Напр: Дизайнеры, Семья..."
              className="w-full px-5 py-3.5 bg-slate-50 dark:bg-white/5 border border-transparent dark:border-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all font-medium dark:text-white"
            />
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-500/5 border border-blue-100/50 dark:border-blue-500/10">
            <div className="flex gap-3">
              <div className="p-2 bg-blue-500 rounded-lg text-white shrink-0">
                <Users size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-blue-900 dark:text-blue-400">Участники</h4>
                <p className="text-xs text-blue-700/70 dark:text-blue-400/60 mt-0.5">
                  Вы сможете добавить участников после создания группы.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-6 border-t border-gray-100 dark:border-white/5 bg-white/80 dark:bg-[#101014]/80 backdrop-blur-md">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCreate}
          disabled={loading}
          className={`w-full py-4 rounded-2xl bg-linear-to-r from-purple-600 to-blue-500 text-white font-bold shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 transition-all ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:shadow-purple-500/40"
          }`}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Sparkles size={18} />
              Создать группу
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CreateGroup;