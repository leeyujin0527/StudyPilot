import React from 'react';

function FlightDashboard() {
  // 실제 데이터는 props나 상태관리로 받아오세요
  const title = "영어단어 100개 외우기ㅁㄴ;이라ㅓㅍ나ㅣ얼미나러ㅣㅁ낭ㄹ"
  const destination = "Tokyo"
  const progress = 65;


  return (
    <div className="fixed w-full max-w-5xl px-4 -translate-x-1/2 bottom-6 left-1/2">
      <div className="rounded-full shadow-2xl bg-slate-800">
        <div className="flex items-center gap-6 px-8 py-4">
          {/* Left: Title */}
          <div className="flex items-center flex-shrink-0 max-w-md min-w-0 gap-4">
            <div className="min-w-0 text-left">
              <div className="text-sm font-medium tracking-wide text-blue-400">
                비행 중
              </div>
              <div className="text-xl font-bold text-white truncate">
                {title}
              </div>
            </div>
            <div className="flex-shrink-0 w-px h-12 bg-slate-600"></div>
          </div>

          {/* Center: Mission Progress */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-4 mb-2">
              <div className="text-left">
                <div className="text-lg font-semibold text-white">
                  목적지:
                </div>
                <div className="text-xl font-bold text-white">
                  {destination}
                </div>
              </div>
              <div className="flex-shrink-0 text-right">
                <div className="text-2xl font-bold text-white">
                  {progress}%
                </div>
                <div className="text-sm text-slate-400">
                  Complete
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="relative w-full h-2 overflow-hidden rounded-full bg-slate-700">
              <div 
                className="absolute top-0 left-0 h-full transition-all duration-300 bg-blue-500 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="w-px h-12 bg-slate-600"></div>

          {/* Right: Emergency Stop Button */}
          <div className="flex-shrink-0">
            <button className="flex items-center gap-3 px-8 py-3 transition-colors border-2 rounded-full bg-red-950/50 border-red-500/50 hover:bg-red-900/50">
              <div className="flex items-center justify-center w-6 h-6 bg-red-500 rounded-sm">
                <div className="w-3 h-3 bg-white rounded-sm"></div>
              </div>
              <span className="text-lg font-bold text-red-500 whitespace-nowrap">비행중단</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightDashboard;