import { useStore } from "@/store/useStore";
import { motion } from "framer-motion";
import { MoveLeft } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

type CreateGroupProps = {
  dispatch: React.Dispatch<{ type: "OPEN_GROUP" | "CLOSE_GROUP" }>;
};

const CreateGroup = ({ dispatch }: CreateGroupProps) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const createRoom = useStore((state) => state.createRoom);

  const handleCreate = async () => {
    const name = nameRef.current?.value.trim();

    if (!name) {
      toast.error("Пожалуйста, заполните название группы.");
      return;
    }

    const result = await createRoom({ name, isGroup: true });

    if (result.success) {
      toast.success("Успешно!");
      dispatch({ type: "CLOSE_GROUP" });
    }
  };

  return (
    <motion.div
      key="list"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className="relative min-h-screen w-full flex items-start justify-center pt-16"
    >
      <motion.button
        onClick={() => dispatch({ type: "CLOSE_GROUP" })}
        className="absolute left-4 top-4 p-2.5 cursor-pointer
             bg-white dark:bg-gray-800 
             border border-slate-200 dark:border-gray-700
             hover:bg-slate-50 dark:hover:bg-gray-700 
             rounded-xl shadow-sm transition-colors group"
        title="Назад"
        aria-label="Назад к списку чатов"
      >
        <MoveLeft className="w-5 h-5 text-slate-600 dark:text-gray-300 group-hover:text-purple-500" />
      </motion.button>
      <div className="w-full rounded-2xl shadow-lg p-3 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Создать группу
          </h2>
          <p className="text-sm text-gray-500">Заполни информацию о группе</p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
            Avatar
          </div>
          <input
            type="text"
            placeholder="Ссылка на аватар"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Название группы</label>
          <input
            ref={nameRef}
            type="text"
            placeholder="Введите название"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="w-full py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Добавить контакты
          </button>

          <button
            onClick={handleCreate}
            type="submit"
            className="w-full py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Создать группу
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CreateGroup;
