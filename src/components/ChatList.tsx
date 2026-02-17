import { Search } from "lucide-react";

const ChatList = () => {
  return (
    <div className="w-80 flex flex-col border-r border-gray-200 dark:border-gray-800 bg-[#d6d3d3] dark:bg-[#101014] py-16">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-1 text-gray-800 dark:text-gray-300">
          Messages <span className="text-purple-600">(22)</span>
        </h2>

        {/* Издөө */}
        <div className="mt-4 relative bg-[#aaa] dark:bg-[#1a1a20] rounded-xl flex items-center p-3">
          <Search size={18} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-500"
          />
        </div>
      </div>

      {/* Тизме */}
      <div className="flex-1 overflow-y-auto px-4 space-y-4">
        {/* Мисал үчүн бир чат */}
        <div className="flex items-center gap-3 p-3 bg-[#1c1c24] rounded-2xl cursor-pointer border border-gray-800 hover:border-purple-500/50 transition">
          <div className="relative">
            <img
              src="https://github.com/shadcn.png"
              className="w-12 h-12 rounded-full"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1c1c24]"></span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <h4 className="font-semibold text-sm">Designers</h4>
              <span className="text-xs text-gray-500">10:24</span>
            </div>
            <p className="text-xs text-purple-400 mt-1">Sasha is typing...</p>
          </div>
        </div>

        {/* Дагы бир чат */}
        <div className="flex items-center gap-3 p-3 hover:bg-[#1a1a20] rounded-2xl cursor-pointer transition">
          <div className="relative">
            <img
              src="https://ui.shadcn.com/avatars/02.png"
              className="w-12 h-12 rounded-full"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <h4 className="font-semibold text-sm text-gray-300">Emilia</h4>
              <span className="text-xs text-gray-500">16:14</span>
            </div>
            <p className="text-xs text-gray-500 mt-1 line-clamp-1">
              Sent images
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
