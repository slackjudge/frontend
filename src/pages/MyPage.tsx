import { useState } from "react";
import Calendar from "../components/common/Calendar"; // 상대경로 수정
import { tierMap } from "../constants/tierMap";

export default function MyPage() {
    const [date, setDate] = useState(new Date());
    const [period, setPeriod] = useState<"day" | "week" | "month">("day");

    //TODO: 추후 API 연동시 실제 사용자 데이터로 바꾸기 
    const userData ={
        name: "홍길동", 
        tier: "bronze_1",
        solvedCount: 7, 
        bojId: "hong123",
        team: "프론트엔드 대면반",
        totalScore: 100,
        rank: 1,
        maxDifficulty: "G5",
    }; 

    return (
        <div className="flex w-full max-w-7xl mx-auto gap-6 px-6">
            {/* 좌측 영역 - 캘린더 */}
            <div className="w-[320px] flex-shrink-0">
                <div className="sticky top-24">
                    <Calendar
                        date={date}
                        period={period}
                        onDateChange={setDate}
                    />
                </div>
            </div>

            {/* 우측 영역 - 요약 및 프로필 */}
            <div className="flex-1 flex flex-col gap-6">
                {/* 상단 프로필 영역 - 작은 헤더 형태 */}
                <div className="flex items-center gap-3">
                    {/* 티어 이미지 */}
                    <img
                        src={tierMap[userData.tier]}
                        alt={`${userData.tier} 티어`}
                        className="w-12 h-12"
                    />
                    {/* 사용자 이름 및 ID */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            {userData.name}
                        </h2>
                        <p className="text-sm text-gray-600">
                            {userData.bojId}
                        </p>
                    </div>
                </div>

                {/* 통계 카드 영역 - 2x2 그리드 */}
                <div className="grid grid-cols-2 gap-4">
                    {/* 푼 문제 수 카드 */}
                    <div className="bg-white border rounded-xl p-6 shadow-lg">
                        <div className="text-sm text-gray-600 mb-2">
                            푼 문제 수
                        </div>
                        <div className="text-3xl font-bold text-gray-800 underline">
                            {userData.solvedCount}
                        </div>
                    </div>
                    {/* 총 점수 카드 */}
                    <div className="bg-white border rounded-xl p-6 shadow-lg">
                        <div className="text-sm text-gray-600 mb-2">
                            총 점수
                        </div>
                        <div className="text-3xl font-bold text-gray-800">
                            {userData.totalScore}
                        </div>
                    </div>

                    {/* 내 순위 카드 */}
                    <div className="bg-white border rounded-xl p-6 shadow-lg">
                        <div className="text-sm text-gray-600 mb-2">
                            내 순위
                        </div>
                        <div className="text-3xl font-bold text-gray-800">
                            {userData.rank}
                        </div>
                    </div>

                    {/* 최고 난이도 카드 */}
                    <div className="bg-white border rounded-xl p-6 shadow-lg">
                        <div className="text-sm text-gray-600 mb-2">
                            최고 난이도
                        </div>
                        <div className="text-3xl font-bold text-gray-800">
                            {userData.maxDifficulty}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}