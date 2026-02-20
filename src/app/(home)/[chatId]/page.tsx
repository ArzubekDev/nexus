import Chat from '@/components/Chat';

// Next.js page компоненти params'ты автоматтык түрдө алат
const ChatID = ({ params }: { params: Promise<{ chatId: string }> }) => {
  return <Chat params={params} />;
};

export default ChatID;