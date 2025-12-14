import { useState, useCallback } from "react";
import { getTierImageUrl } from "../constants/tierMap";
// 유틸리티 함수
import { formatDateToISO, getYearMonth } from "../utils/dateUtils";
import { useFetch } from "../hooks/useFetch";
//컴포넌트 import 
import HeatMapCalendar from "../components/mypage/HeatMapCalendar";
import DailySummary from "../components/mypage/DailySummary";
import ProblemListModal from "../components/mypage/ProblemListModal";

// 타입 및 실제 api 함수 
import { MyPageData } from "../types/mypage"; //직접 데이터 타입 사용 
import { getMyPageDashboard } from "../api/mypage/mypageApi"; // Api 함수 

export default function MyPage() {
  // 상태 관리
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); 
  const [dateStr, setDateStr] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // 공통 API 훅 사용 
  const { data, isLoading, error, refetch } = useFetch<MyPageData>({
    fetchFn: async () => {
      const { year, month } = getYearMonth(selectedDate);
      return await getMyPageDashboard(year, month, dateStr);
    },
    dependencies: [selectedDate, dateStr], // 날짜 변경시 재요청 
  });

  // 날짜 클릭 핸들러 
  const handleDateClick = useCallback((clickedDate: Date): void => {
    setSelectedDate(clickedDate);
    setDateStr(formatDateToISO(clickedDate)); // 날짜 클릭시 dateStr 설정 
  }, []);

  // 월 변경 핸들러 
  const handleMonthChange = useCallback((newDate: Date): void => {
    setSelectedDate(newDate);
    setDateStr(undefined); // 월 변경시 dateStr 초기화
  }, []);

  // 모달 핸들러
  const handleOpenModal = useCallback((): void => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback((): void => {
    setIsModalOpen(false);
  }, []);

  // 로딩 중 UI
  if (isLoading) {
    return <div className="flex justify-center p-20 text-gray-500">Loading...</div>;
  }

  // 에러 UI 
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-red-500">
        <p>Error: {error}</p>
        <button 
          onClick={() => refetch()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          다시 시도
        </button>
      </div>
    );
  }

  // 데이터 없음 UI 
  if (!data) {
    return <div className="flex justify-center p-20 text-gray-500">데이터가 없습니다.</div>;
  }

  const { profile, grass, selectedDateDetail } = data;



  return (
    // [레이아웃] 전체 페이지 배경 (회색)
    <div className="min-h-screen bg-[#F5F6F8] flex justify-center py-12 px-8 font-sans w-full">
      
      {/* [레이아웃] 메인 흰색 카드 (둥근 모서리 40px) */}
      <div className="w-full max-w-[1000px] bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        
        {/* ---------------- 상단: 프로필 영역 (중앙 정렬) ---------------- */}
        <div className="flex flex-col items-center justify-center pt-12 pb-8">
          <div className="flex items-center gap-3 mb-2">
            {/* 티어 이미지 */}
            <img
              src={getTierImageUrl(profile.tierLevel)}
              alt="tier"
              className="w-10 h-10 object-contain"
            />
            {/* 이름 | 아이디 */}
            <div className="flex items-baseline gap-2.5">
              <span className="text-2xl font-bold text-gray-900 tracking-tight">
                {profile.username}
              </span>
              <span className="text-gray-300 text-xl font-light">|</span>
              <span className="text-lg text-gray-500 font-medium">
                {profile.baekjoonId}
              </span>
            </div>
          </div>
        </div>

        {/* 가로 구분선 */}
        <div className="w-[95%] mx-auto h-[1px] bg-gray-200"></div>

        {/* ---------------- 하단: 컨텐츠 영역 (좌우 분할) ---------------- */}
        <div className="flex flex-1 min-h-[600px]">
          
          {/* 좌측: 캘린더 영역 (60% 너비) */}
          <div className="w-[60%] py-12 px-8 border-r border-gray-200 flex flex-col items-center justify-start">
            <HeatMapCalendar
              selectedDate={selectedDate}
              onDateChange={handleDateClick}
              grassData={grass} // 잔디 데이터
              onMonthChange={handleMonthChange}
            />
          </div>

          {/* 우측: 요약 통계 영역 (40% 너비) */}
          <DailySummary
            data={selectedDateDetail} // 선택된 날짜의 상세 데이터
            onCountClick={handleOpenModal}
          />
          
        </div>
      </div>

      {/* 문제 목록 모달 */}
      <ProblemListModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        date={selectedDateDetail.date}
        problems={selectedDateDetail.problems}
      />
    </div>
  );
}