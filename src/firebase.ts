"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDoomZhSoqHlPvZe8A8tb1Hzrwv5pDiscA",
  authDomain: "studypilot-32cc4.firebaseapp.com",
  projectId: "studypilot-32cc4",
  storageBucket: "studypilot-32cc4.appspot.com",
  messagingSenderId: "726281734241",
  appId: "1:726281734241:web:541058dde3b968db5cc220",
  measurementId: "G-NLM6L8E5QS",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
