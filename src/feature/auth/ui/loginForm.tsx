"use client"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { auth } from "@/src/libs/firebase"
import { useRouter } from "next/navigation"

const LoginForm = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const router = useRouter();
    const handleLogin = async(e : React.FormEvent) =>{
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth, email, password)
            alert('로그인 성공')
            router.push("/")
        }catch(error){
            console.log(error)
        }
    }
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#F6F5F2]">
      <form onSubmit={handleLogin} className="w-full flex flex-col gap-5 sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <div className="flex flex-col gap-1">
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력해주세요"
            type="email"
            className="w-full h-13  bg-[#E9E7E1] px-2 sm:px-3  outline-none"
          ></input>
        </div>
        <div>
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요"
            type="password"
            className="w-full h-13  bg-[#E9E7E1] px-2 sm:px-3 outline-none"
          ></input>
        </div>
        <button type="submit" className="w-full h-13 mt-8 bg-[#7FE067] px-2 sm:px-3 outline-none text-white font-bold text-[20px]">로그인</button>
      </form>
    </div>
  )
}

export default LoginForm
