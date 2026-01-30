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
    <header className="fixed top-0 left-0 z-50 flex items-center justify-between w-full h-16 px-6 bg-transparent">
      <div onClick={() => router.push("/")} className="text-white cursor-pointer">
        <Image
        src="/logo.png"
        alt="logo"
        width={70}
        height={70}/>
      </div>
      <nav className="flex flex-row gap-20 font-medium text-gray-700">
        <div
          onClick={() => router.push("/")}
          className="cursor-pointer hover:text-[#7FE067] transition text-white"
        >
          홈
        </div>
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
      </nav>
     <div className="flex flex-row gap-2.5">
        {user ? (
          <div
            onClick={handleLogout}
            className="cursor-pointer px-3 py-1.5 text-white font-bold"
          >
            로그아웃
          </div>
        ) : (
          <>
            <div
              onClick={() => router.push("/login")}
              className="cursor-pointer px-3 py-1.5 text-white font-bold"
            >
              로그인
            </div>
            <div
              onClick={() => router.push("/signup")}
              className="cursor-pointer px-3 py-1.5 text-white font-bold"
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
