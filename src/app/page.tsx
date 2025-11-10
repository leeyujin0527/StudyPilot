import Image from "next/image";
import { FaCloud } from "react-icons/fa";

export default function Home() {
  return (
    <div className="w-full h-[400px] bg-[#24bdff] flex flex-col justify-center items-center relative">
      <div className="flex flex-col items-start">
        <span className="font-bold text-2xl text-[#3b3333]">
          집중력이 필요할 때, 떠나는 비행
        </span>
        <span className="font-bold text-[100px] text-[#ffffff] leading-none">
          StudyPilot
        </span>
      </div>
      <div className="w-[72%] h-22 bg-white absolute bottom-[-17px] flex items-center justify-center flex-col gap-2">
        <span className="font-bold text-[30px] mt-15">제 개인 프로젝트인 StudyPilot을 소개합니다.</span>
        <span className="font-bold text-[13px] text-[#5d5b5b] text-center">이 서비스는 기존 집중 보조 앱인 Flight Focus에서 아이디어를 얻어 만들어졌습니다. <br/>더 쉽고 친근하게 집중을 도와주는 경험을 제공하고자 직접 개발했습니다.</span>
      </div>

    </div>
  );
}
