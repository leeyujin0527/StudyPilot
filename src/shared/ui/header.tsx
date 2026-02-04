"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { auth } from "@/src/libs/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";


const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);
  
  const handleLogout = async () => {
  try {
    await signOut(auth);
    router.push("/");
  } catch (error) {
    console.error(error);
  }
};

  return (
<header className="fixed top-0 left-0 z-50 flex items-center justify-between w-full h-16 px-4 bg-transparent sm:px-6">
  {/* 로고 */}
  <div onClick={() => router.push("/")} className="flex-shrink-0 text-white cursor-pointer">
    <Image
      src="/logo.png"
      alt="logo"
      width={70}
      height={70}
      className="w-12 sm:w-16 md:w-[70px]"
    />
  </div>

  {/* 네비게이션 - 모든 화면에서 표시 */}
  <nav className="flex flex-row gap-3 text-sm font-medium text-white sm:gap-6 md:gap-10 lg:gap-20 sm:text-base">
    <div
      onClick={() => router.push("/")}
      className="cursor-pointer hover:text-[#7FE067] transition whitespace-nowrap"
    >
      홈
    </div>
    <div
      onClick={() => router.push("/flight")}
      className="cursor-pointer hover:text-[#7FE067] transition whitespace-nowrap"
    >
      비행하기
    </div>
    <div
      onClick={() => router.push("/record")}
      className="cursor-pointer hover:text-[#7FE067] transition whitespace-nowrap"
    >
      기록
    </div>
  </nav>

  {/* 로그인/회원가입 */}
  <div className="flex flex-row gap-1 sm:gap-2.5 flex-shrink-0">
    {user ? (
      <div
        onClick={handleLogout}
        className="cursor-pointer px-2 sm:px-3 py-1.5 text-white font-bold text-sm sm:text-base whitespace-nowrap"
      >
        로그아웃
      </div>
    ) : (
      <>
        <div
          onClick={() => router.push("/login")}
          className="cursor-pointer px-2 sm:px-3 py-1.5 text-white font-bold text-sm sm:text-base whitespace-nowrap"
        >
          로그인
        </div>
        <div
          onClick={() => router.push("/signup")}
          className="cursor-pointer px-2 sm:px-3 py-1.5 text-white font-bold text-sm sm:text-base whitespace-nowrap"
        >
          회원가입
        </div>
      </>
    )}
  </div>
</header>
  );
};

export default Header;
