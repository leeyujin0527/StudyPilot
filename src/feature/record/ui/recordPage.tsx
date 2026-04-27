"use client";

import StarBackground from "@/src/libs/StarBackground";
import { getSessionAll } from "../api/get-sessionAll";
import { useEffect, useState } from "react";
import SessionList from "./sessionList";
import RecordWeekChart from "./recordWeekChart";
import { Session } from "../type/getSessionAllResponse";
import { auth } from "@/src/libs/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FaCalendar } from "react-icons/fa";
import CustomCalendar from "./Calendar";
import { useAiComment } from "../../comment/model/useAiComment";
import Image from "next/image";
import DonutChart from "./DonutChart";
import Streak from "./Streak";

const RecordPage = () => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session[]>([]);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { data: aiComment, isPending } = useAiComment();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("✅ 로그인됨:", user.email);
        user.getIdToken().then((token) => {
          console.log("✅ Token:", token.substring(0, 20) + "...");
          setAuthChecked(true); // 인증 확인 완료
        });
      } else {
        console.log("❌ 로그인 안 됨 - /login으로 이동");
        window.location.href = "/login";
      }
    });

    return () => unsubscribe();
  }, []);

  // 세션 데이터 가져오기 (인증 확인 후에만 실행)
  useEffect(() => {
    if (!authChecked) return; // 인증 체크 전에는 실행 안 함

    const fetchSessions = async () => {
      try {
        console.log("📡 Fetching sessions...");
        const res = await getSessionAll();
        console.log("✅ Sessions fetched:", res);
        setSession(res.sessions);
      } catch (error) {
        console.error("❌ session all fail", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [authChecked]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  // 로딩 중 화면
  if (!authChecked || loading) {
    return (
      <div className="w-full min-h-screen mt-50">
        <StarBackground />
        <div className="relative z-10 flex items-center justify-center h-screen">
          <div className="text-2xl text-white">로딩중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen mt-40">
      <StarBackground />
      <div className="relative z-10 px-90">
        <div className="flex flex-col">
          <span className="text-white text-[35px] font-bold mb-2">
            이번주 공부 리포트
          </span>

          <div className="inline-flex items-center gap-2 bg-[#ffffff] w-fit rounded-xl pr-5">
            <Image
              src="/CharBot.png"
              alt="bot character"
              width={90}
              height={80}
              className=""
            />
            <div className="flex flex-col">
              <span className="text-gray-500 text-[18px] font-medium">
                AI가 분석한 이번 주 학습 요약
              </span>
              <span className="text-black text-[25px] font-bold">
                {isPending ? "ai 분석 중" : aiComment}
              </span>
            </div>
          </div>
        </div>
        <Streak />
        <div className="flex items-center w-full gap-8 mt-5">
  <div className="flex-2">
    <RecordWeekChart />
  </div>
  <div className="flex-1">
    <DonutChart />
  </div>
</div>
        <div className="flex flex-row items-center">
          <span className="text-white text-[35px] font-bold mt-10">
            나의 비행 티켓
          </span>
          <FaCalendar
            size={26}
            color="white"
            onClick={() => setOpen(!open)}
            className="mt-10 ml-3 transition cursor-pointer hover:scale-110"
          />
          <span className="mt-10 ml-3 text-xl text-white">
            {selectedDate.toLocaleDateString()}
          </span>
        </div>

        {open && (
          <div className="p-4 mt-4 bg-white shadow-lg w-fit rounded-xl">
            <CustomCalendar
              selectedDate={selectedDate}
              onChange={setSelectedDate}
            />
          </div>
        )}

        <SessionList session={session} date={selectedDate.toISOString()} />
      </div>
    </div>
  );
};

export default RecordPage;
