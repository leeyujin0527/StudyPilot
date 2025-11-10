"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-transparent flex items-center justify-between px-6 z-50">
      <div onClick={() => router.push("/")} className="cursor-pointer text-white">
        로고
      </div>
      <nav className="flex flex-row gap-20 text-gray-700 font-medium">
        <div
          onClick={() => router.push("/flight")}
          className="cursor-pointer hover:text-[#7FE067] transition text-white"
        >
          비행하기
        </div>
        <div
          onClick={() => router.push("/record")}
          className="cursor-pointer hover:text-[#7FE067] transition text-white"
        >
          기록
        </div>
        <div
          onClick={() => router.push("/mypage")}
          className="cursor-pointer hover:text-[#7FE067] transition text-white"
        >
          마이페이지
        </div>
      </nav>
      <div className="flex flex-row gap-2.5">
        <div onClick={() => router.push("/login")} className="cursor-pointer px-3 py-1.5 text-white font-bold">
          로그인
        </div>
        <div onClick={() => router.push("/signup")} className="cursor-pointer px-3 py-1.5 text-white font-bold">
          회원가입
        </div>
      </div>
    </header>
  );
};

export default Header;
