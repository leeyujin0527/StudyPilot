import Image from "next/image";
import StarBackground from "@/src/libs/StarBackground";
export default function Home() {
  return (
    <div className="relative flex items-center justify-center w-full h-screen bg-black">
      <StarBackground />
    {/* 텍스트: 건드리지 않음 */}
    <div className="flex flex-col text-center mt-[-400px] z-10">
      <span className="text-2xl text-white">집중력이 필요할 때, 떠나는 비행</span>
      <span className="font-bold text-white text-7xl">Study Pilot</span>
    </div>
  
    {/* 캐릭터: 절대 위치로 오른쪽 끝에 붙임 */}
    <Image
      src="/cloudChar.png"
      alt="Cloud Character"
      width={400}
      height={400}
      className="absolute right-40 top-50" 
    />
    <Image
      src="/cloudChar2.png"
      alt="Cloud Character"
      width={400}
      height={400}
      className="absolute left-49 top-5" 
    />
  </div>
  
  );
}
