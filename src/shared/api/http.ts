import axios from "axios";
import { auth } from "@/src/libs/firebase";

export const http = axios.create({
  baseURL: "http://localhost:8088",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});
http.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('인증 실패 - 로그인 필요');
      // 로그인 페이지로 리다이렉트
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);