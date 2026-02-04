"use client";

import StarBackground from "@/src/libs/StarBackground";
import { getSessionAll } from "../api/get-sessionAll";
import { useEffect, useState } from "react";
import SessionList from "./sessionList";
import RecordDashboard from "./recordDashboard";
import { Session } from "../type/getSessionAllResponse";
import { auth } from "@/src/libs/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

const RecordPage = () => {

    
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session[]>([]);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  // Firebase 인증 체크
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('✅ 로그인됨:', user.email);
        user.getIdToken().then(token => {
          console.log('✅ Token:', token.substring(0, 20) + '...');
          setAuthChecked(true); // 인증 확인 완료
        });
      } else {
        console.log('❌ 로그인 안 됨 - /login으로 이동');
        window.location.href = '/login';
      }
    });
    
    return () => unsubscribe();
  }, []);
  

  // 세션 데이터 가져오기 (인증 확인 후에만 실행)
  useEffect(() => {
    if (!authChecked) return; // 인증 체크 전에는 실행 안 함

    const fetchSessions = async () => {
      try {
        console.log('📡 Fetching sessions...');
        const res = await getSessionAll();
        console.log('✅ Sessions fetched:', res);
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
    <div className="w-full min-h-screen mt-50">
      <StarBackground />
      <div className="relative z-10 px-90">
        <span className="text-white text-[35px] font-bold">
          이번주 공부 리포트
        </span>

        {/* 대시보드 */}
        <RecordDashboard />

        <span className="text-white text-[35px] font-bold">
          나의 비행 티켓
        </span>

        <SessionList session={session} />
      </div>
    </div>
  );
};

export default RecordPage;