import { useState, useCallback } from "react";
import { getTierImageUrl } from "../constants/tierMap";
import { formatDateToISO, getYearMonth } from "../utils/dateUtils";
import { useFetch } from "../hooks/useFetch";
import HeatMapCalendar from "../components/mypage/HeatMapCalendar";
import DailySummary from "../components/mypage/DailySummary";
import ProblemListModal from "../components/mypage/ProblemListModal";

import { MyPageData } from "../types/mypage"; 
import { getMyPageDashboard } from "../api/mypage/mypageApi"; 
import { logout } from "@/api/client/logout";

export default function MyPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); 
  const [dateStr, setDateStr] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, isLoading, error, refetch } = useFetch<MyPageData>({
    fetchFn: async () => {
      const { year, month } = getYearMonth(selectedDate);
      return await getMyPageDashboard(year, month, dateStr);
    },
    dependencies: [selectedDate, dateStr], 
  });

  const handleDateClick = useCallback((clickedDate: Date): void => {
    setSelectedDate(clickedDate);
    setDateStr(formatDateToISO(clickedDate)); 
  }, []);

  const handleMonthChange = useCallback((newDate: Date): void => {
    setSelectedDate(newDate);
    setDateStr(undefined); 
  }, []);

  const handleOpenModal = useCallback((): void => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback((): void => {
    setIsModalOpen(false);
  }, []);

  const handleLogout = useCallback(async (): Promise<void> => {
    await logout();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center p-20 text-gray-500">Loading...</div>;
  }

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

  if (!data) {
    return <div className="flex justify-center p-20 text-gray-500">데이터가 없습니다.</div>;
  }

  const { profile, grass, selectedDateDetail } = data;



  return (
    <div className="min-h-screen bg-[#F5F6F8] flex justify-center py-12 px-8 font-sans w-full">
      
      <div className="w-full max-w-[1000px] bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        
        <div className="flex flex-col items-center justify-center pt-12 pb-8">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={getTierImageUrl(profile.tierLevel)}
              alt="tier"
              className="w-10 h-10 object-contain"
            />
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

        <div className="w-[95%] mx-auto h-[1px] bg-gray-200"></div>

        <div className="flex flex-1 min-h-[600px]">
          
          <div className="w-[60%] pt-24 pb-12 px-8 border-r border-gray-200 flex flex-col items-center justify-start">
            <HeatMapCalendar
              selectedDate={selectedDate}
              onDateChange={handleDateClick}
              grassData={grass} 
              onMonthChange={handleMonthChange}
            />
          </div>

          <DailySummary
            data={selectedDateDetail} 
            onCountClick={handleOpenModal}
          />
          
        </div>

        <div className="w-[95%] mx-auto h-[1px] bg-gray-200"></div>

        <div className="flex flex-col items-center justify-center py-8">
          <button
            onClick={handleLogout}
            className="
              px-8 py-3
              bg-gradient-to-r from-blue-700 to-blue-500
              text-white text-base font-medium
              rounded-xl
              shadow-sm
              hover:shadow-md hover:opacity-90
              active:scale-[0.97]
              transition-all duration-200 ease-out
              select-none
            "
          >
            로그아웃
          </button>
        </div>
      </div>

      <ProblemListModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        date={selectedDateDetail.date}
        problems={selectedDateDetail.problems}
      />
    </div>
  );
}