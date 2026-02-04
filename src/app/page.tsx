import Image from "next/image";
import StarBackground from "@/src/libs/StarBackground";
export default function Home() {
  return (
<div className="relative w-full h-screen overflow-hidden bg-black">
  <StarBackground />

  {/* 텍스트: 화면 기준 정중앙 - 반응형 */}
  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
    <span className="mb-2 text-sm text-white sm:text-base md:text-xl lg:text-2xl md:mb-4">
      집중력이 필요할 때, 떠나는 비행
    </span>
    <span className="text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">
      Study Pilot
    </span>
  </div>

  {/* 오른쪽 구름 캐릭터 - 반응형 */}
  <Image
    src="/cloudChar.png"
    alt="Cloud Character"
    width={400}
    height={400}
    className="absolute right-2 top-1/2 -translate-y-1/2 
               w-32 sm:w-40 md:w-56 lg:w-80 xl:w-[470px]
               opacity-80 sm:opacity-90 md:opacity-100"
  />

  {/* 왼쪽 구름 캐릭터 - 반응형 */}
  <Image
    src="/cloudChar2.png"
    alt="Cloud Character"
    width={400}
    height={400}
    className="absolute left-2 top-8 sm:top-10 md:top-12 lg:top-16
               w-32 sm:w-48 md:w-64 lg:w-80 xl:w-[470px]
               opacity-80 sm:opacity-90 md:opacity-100"
  />
</div>
  
  );
}
