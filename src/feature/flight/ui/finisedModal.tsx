import { useRouter } from 'next/navigation';

const FinisedModal = () => {
      const route = useRouter()
      
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="p-8 bg-white rounded-xl">
        <h2 className="text-2xl font-bold">비행 완료 ✈️</h2>
        <p className="mt-2 text-gray-600">
          목표 시간에 도달했어요!
        </p>
        <button className="mt-6 btn-primary" onClick={()=>route.push("/record")}>
          기록 보러가기
        </button>
      </div>
    </div>
  )
}

export default  FinisedModal
