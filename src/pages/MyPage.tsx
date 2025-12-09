import { useState } from "react";
import Calendar from "../components/common/Calendar"; // 상대경로 수정
import { tierMap } from "../constants/tierMap";
import DailySummary from "../components/mypage/DailySummary";
import ProblemListModal from "../components/mypage/ProblemListModal";
import { Problem } from "../types/mypage";

export default function MyPage() {
    const [date, setDate] = useState(new Date());
    const [period, setPeriod] = useState<"day" | "week" | "month">("day");
    const [isModalOpen, setIsModalOpen] = useState(false);

    //TODO: 추후 API 연동시 실제 사용자 데이터로 바꾸기 
    const userData ={
        name: "홍길동", 
        tier: "bronze_1",
        solvedCount: 7, 
        bojId: "hong123",
        team: "프론트엔드 대면반",
        totalScore: 100,
        rank: 1,
        maxDifficulty: 12, // 숫자 level (0-30)
    };

    // 테스트용 더미 문제 데이터
    const testProblems: Problem[] = [
        { title: "A+B", tierLevel: 1, link: "https://www.acmicpc.net/problem/1000" },
        { title: "A-B", tierLevel: 2, link: "https://www.acmicpc.net/problem/1001" },
        { title: "A×B", tierLevel: 3, link: "https://www.acmicpc.net/problem/10998" },
        { title: "Hello World", tierLevel: 4, link: "https://www.acmicpc.net/problem/2557" },
        { title: "두 수 비교하기", tierLevel: 5, link: "https://www.acmicpc.net/problem/1330" },
        { title: "시험 성적", tierLevel: 6, link: "https://www.acmicpc.net/problem/9498" },
        { title: "윤년", tierLevel: 7, link: "https://www.acmicpc.net/problem/2753" },
    ]; 

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

                {/* DailySummary 컴포넌트로 통계 카드 영역 교체 */}
                <DailySummary
                    data={{
                        date: date.toISOString().split('T')[0],
                        dailyScore: userData.totalScore,
                        dailyRank: userData.rank,
                        solvedCount: userData.solvedCount,
                        maxDifficulty: userData.maxDifficulty, // 숫자 level 그대로 전달
                        problems: testProblems
                    }}
                    onCountClick={() => {
                        setIsModalOpen(true);
                    }}
                    className="w-full"
                />
            </div>

            {/* 문제 목록 모달 */}
            <ProblemListModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                date={date.toISOString().split('T')[0]}
                problems={testProblems}
            />
        </div>
    );
}