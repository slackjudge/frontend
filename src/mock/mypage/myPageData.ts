import { MyPageResponse, Profile, Grass, SelectedDateDetail } from '../../types/mypage';
// 유틸리티 함수
import { getTodayISOString } from '../../utils/dateUtils';
// 1. 공통 데이터 정의 (Database 역할)
const MOCK_PROFILE: Profile = {
    username: "김마루",
    baekjoonId: "gr2147",
    tierLevel: 15,
    totalScore: 1520,
    myRank: 5
  };

const MOCK_GRASS: Grass[] = [
    { date: "2025-12-02", solvedCount: 1 },
    { date: "2025-12-05", solvedCount: 3 }
];
//날짜별 상세 데이터 (날짜를 클릭했을때 보여줄 내용)
const DETAILS_DB: Record<string, SelectedDateDetail> = {
    // [Case 1] 12월 5일: Gold 4 난이도가 최고점인 날 (총 3문제)
    "2025-12-05": {
        date: "2025-12-05",
        dailyScore: 15,
        dailyRank: 2,
        solvedCount: 3, // 문제는 3개여야 함
        maxDifficulty: 12, // Gold 4 (티어 레벨 12)
        problems: [
        {
            title: "거짓말", // Gold 4 대표 문제
            tierLevel: 12,
            link: "https://www.acmicpc.net/problem/1043"
        },
        {
            title: "A+B", // Bronze 5
            tierLevel: 1,
            link: "https://www.acmicpc.net/problem/1000"
        },
        {
            title: "별 찍기 - 1", // Bronze 5
            tierLevel: 1,
            link: "https://www.acmicpc.net/problem/2438"
        }
        ]
    },

    // [Case 2] 12월 2일: Silver 3 난이도가 최고점인 날 (총 3문제)
    "2025-12-02": {
        date: "2025-12-02",
        dailyScore: 3,
        dailyRank: 8,
        solvedCount: 1,
        maxDifficulty: 3, // Silver 3 (티어 레벨 8)
        problems: [
        
        {
            title: "알람 시계", // Bronze 3
            tierLevel: 3,
            link: "https://www.acmicpc.net/problem/2884"
        }
        ]
    }
};

// 2. Mock 함수 export (api 역할)
/**
 * 대시보드 데이터를 가져오는 Mock API 함수
 * @param year 조회할 연도 (현재 Mock에서는 사용하지 않음, 향후 필터링에 사용 예정)
 * @param month 조회할 월 (현재 Mock에서는 사용하지 않음, 향후 필터링에 사용 예정)
 * @param dateStr (선택) 클릭한 날짜. 없으면 오늘(2025-12-05) 기준
 */
export const getMockDashboard = (_year: number, _month: number, dateStr?: string): MyPageResponse => {
    //1. 요청한 날짜(dateStr)가 있으면 그 날짜를, 없으면 오늘 날짜 구하기 
    //만약 db에 없는 날짜면, 빈 껍데기 리턴 
    const targetDate = dateStr || getTodayISOString();

    //Mock DB 조회 로직 
    
    const selectedDetail = DETAILS_DB[targetDate] || {
        date: targetDate,
        dailyScore: 0,
        dailyRank: 0,
        solvedCount: 0,
        maxDifficulty: 0,
        problems: []
    };
    return {
        isSuccess: true,
        message: "마이페이지 조회 성공",
        response: {
          profile: MOCK_PROFILE,
          grass: MOCK_GRASS, // 실제로는 year, month에 따라 필터링해야 하지만 Mock이라 전체 반환
          selectedDateDetail: selectedDetail
        }
      };
    };