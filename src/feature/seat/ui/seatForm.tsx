"use client"
import { useState, useCallback } from 'react';

type SeatStatus = 'available' | 'occupied';
type SeatsMap = Record<string, SeatStatus>;

interface Props {
  onStart: () => void;
  onSeatSelect: (seat: string) => void;
  flightName: string;
}

const SeatForm = ({ onStart, onSeatSelect, flightName }: Props) => {
  const rows = 12;
  const seatsPerRow = 6;

  const [seats] = useState<SeatsMap>(() => {
    const initialSeats: SeatsMap = {};
    for (let row = 1; row <= rows; row++) {
      for (let col = 0; col < seatsPerRow; col++) {
        const seatId = `${row}${String.fromCharCode(65 + col)}`;
        initialSeats[seatId] = Math.random() > 0.7 ? 'occupied' : 'available';
      }
    }
    return initialSeats;
  });

  const [selectedSeat, setSelectedSeat] = useState<string>("");

  // setSelectedSeat 중복 호출 제거
  const handleSeatClick = useCallback((seatId: string) => {
    if (seats[seatId] === 'occupied') return;

    const nextSeat = selectedSeat === seatId ? "" : seatId;
    setSelectedSeat(nextSeat);
    onSeatSelect(nextSeat);
  }, [seats, selectedSeat, onSeatSelect]);

  // useCallback으로 감싸서 렌더마다 재생성 방지
  const getSeatColor = useCallback((seatId: string) => {
    if (seats[seatId] === 'occupied') return 'bg-gray-600';
    if (selectedSeat === seatId) return 'bg-emerald-500';
    return 'bg-blue-500 hover:bg-blue-400';
  }, [seats, selectedSeat]);

  return (
    <div className="flex items-center justify-center min-h-screen p-8 bg-black">
      <div className="w-full max-w-2xl">
        <div className="flex justify-center mb-8">
          <div className="w-64 h-16 border-t-4 border-gray-600 rounded-t-full bg-gradient-to-b from-gray-800 to-gray-700"></div>
        </div>

        <div className="p-8 bg-gray-900 shadow-2xl rounded-3xl">
          <h2 className="mb-6 text-2xl font-bold text-center text-white">좌석 선택</h2>

          <div className="flex justify-center gap-6 mb-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-500 rounded"></div>
              <span className="text-gray-300">선택 가능</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-emerald-500"></div>
              <span className="text-gray-300">선택됨</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-600 rounded"></div>
              <span className="text-gray-300">예약됨</span>
            </div>
          </div>

          <div className="space-y-3">
            {Array.from({ length: rows }, (_, rowIndex) => {
              const rowNum = rowIndex + 1;
              return (
                <div key={rowNum} className="flex items-center justify-center gap-2">
                  <div className="flex gap-2">
                    {[0, 1, 2].map(colIndex => {
                      const seatId = `${rowNum}${String.fromCharCode(65 + colIndex)}`;
                      return (
                        <button
                          key={seatId}
                          onClick={() => handleSeatClick(seatId)}
                          disabled={seats[seatId] === 'occupied'}
                          className={`w-10 h-10 rounded-lg transition-all duration-200 ${getSeatColor(seatId)} ${
                            seats[seatId] === 'occupied' ? 'cursor-not-allowed' : 'cursor-pointer'
                          } shadow-lg`}
                          title={seatId}
                        >
                          <span className="text-xs font-semibold text-white">{seatId}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-center w-8">
                    <span className="font-bold text-gray-600">{rowNum}</span>
                  </div>

                  <div className="flex gap-2">
                    {[3, 4, 5].map(colIndex => {
                      const seatId = `${rowNum}${String.fromCharCode(65 + colIndex)}`;
                      return (
                        <button
                          key={seatId}
                          onClick={() => handleSeatClick(seatId)}
                          disabled={seats[seatId] === 'occupied'}
                          className={`w-10 h-10 rounded-lg transition-all duration-200 ${getSeatColor(seatId)} ${
                            seats[seatId] === 'occupied' ? 'cursor-not-allowed' : 'cursor-pointer'
                          } shadow-lg`}
                          title={seatId}
                        >
                          <span className="text-xs font-semibold text-white">{seatId}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {selectedSeat && (
            <div className="mt-8 text-center">
              <p className="text-lg text-white">
                선택된 좌석: <span className="font-bold text-emerald-400">{selectedSeat}</span>
              </p>
              <button
                onClick={onStart}
                className="px-8 py-3 mt-4 font-bold text-white transition-colors duration-200 rounded-lg bg-emerald-500 hover:bg-emerald-600"
              >
                예약하기
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-8">
          <div className="w-48 h-12 border-b-4 border-gray-600 rounded-b-full bg-liner-to-b from-gray-700 to-gray-800"></div>
        </div>
      </div>
    </div>
  );
};

export default SeatForm;