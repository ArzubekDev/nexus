import Image from "next/image";

export default function EmptyPage() {
  return (
    <div className="flex flex-col gap-4 h-full items-center justify-center">
      <div className="flex items-center justify-center">
        <Image src={"/logo.png"} alt="Nexus" width={200} height={40} />
      </div>
      <p className="text-gray-500 select-none">Выберите чат, чтобы начать общение</p>
    </div>
  );
}
