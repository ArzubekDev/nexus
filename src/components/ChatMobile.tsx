"use client";
import { useChat } from "@/modules/useChat";
import { motion } from "framer-motion";
import { ChevronLeft, Send, Mic } from "lucide-react";

type ChatMobileProps = {
  dispatch: React.Dispatch<any>;
  chatId: string;
};

const ChatMobile = ({ dispatch, chatId }: ChatMobileProps) => {
  const {
    text,
    setText,
    textareaRef,
    messagesEndRef,
    messages,
    myUserId,
    handleSendMessage,
  } = useChat(chatId);

  return (
    <motion.section
      key="mobile-chat"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 w-full h-screen bg-white dark:bg-[#0b0b0e] z-50 flex flex-col"
    >
      {/* Header */}
      <header className="p-4 border-b flex items-center gap-4 bg-white dark:bg-[#101014]">
        <button
          onClick={() => dispatch({ type: "CLOSE_CHAT" })}
          className="flex items-center gap-2 text-purple-600"
        >
          <ChevronLeft size={20} />
          Артка
        </button>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-[#f8fafc] dark:bg-[#0b0b0e]">
        {messages.map((msg: any) => {
          const isMe = msg.senderId === myUserId;

          return (
            <div
              key={msg.id}
              className={`flex max-w-xs ${
                isMe ? "ml-auto justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 text-sm rounded-2xl ${
                  isMe
                    ? "bg-purple-600 text-white rounded-tr-none"
                    : "bg-gray-200 dark:bg-[#4d38a2] dark:text-white rounded-tl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer */}
      <form
        onSubmit={handleSendMessage}
        className="p-3 flex items-end gap-3 border-t bg-white dark:bg-[#101014]"
      >
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={1}
          placeholder="Жаз..."
          className="flex-1 resize-none bg-gray-100 dark:bg-[#1a1a20] rounded-xl px-3 py-2 text-sm outline-none"
        />

        {text.trim() ? (
          <button
            type="submit"
            className="p-3 bg-purple-600 rounded-xl text-white"
          >
            <Send size={18} />
          </button>
        ) : (
          <button
            type="button"
            className="p-3 bg-gray-200 dark:bg-white/5 rounded-xl"
          >
            <Mic size={18} />
          </button>
        )}
      </form>
    </motion.section>
  );
};

export default ChatMobile;