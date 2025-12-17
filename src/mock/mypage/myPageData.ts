import { MyPageData, Profile, Grass, SelectedDateDetail } from '../../types/mypage';
import { ApiResponse } from '../../api/client/httpClient';
import { getTodayISOString } from '../../utils/dateUtils';

/*
author : 최하영
*/
const MOCK_PROFILE: Profile = {
    username: "김마루",
    baekjoonId: "gr2147",
    tierLevel: 15,
    totalScore: 1520
  };

const MOCK_GRASS: Grass[] = [
    { date: "2025-12-02", solvedCount: 1 },
    { date: "2025-12-05", solvedCount: 3 },
    { date: "2025-12-07", solvedCount: 7 }
];
//날짜별 상세 데이터 (날짜를 클릭했을때 보여줄 내용)
const DETAILS_DB: Record<string, SelectedDateDetail> = {
    // [Case 1] 12월 5일: Gold 4 난이도가 최고점인 날 (총 3문제)
    "2025-12-05": {
        date: "2025-12-05",
        dailyScore: 15,
        dailyRank: 2,
        solvedCount: 3, 
        maxDifficulty: 12, 
        problems: [
        {
            title: "거짓말", 
            tierLevel: 12,
            link: "https://www.acmicpc.net/problem/1043"
        },
        {
            title: "A+B", 
            tierLevel: 1,
            link: "https://www.acmicpc.net/problem/1000"
        },
        {
            title: "별 찍기 - 1", 
            tierLevel: 1,
            link: "https://www.acmicpc.net/problem/2438"
        }
        ]
    },

    "2025-12-02": {
        date: "2025-12-02",
        dailyScore: 3,
        dailyRank: 8,
        solvedCount: 1,
        maxDifficulty: 3, 
        problems: [
        
        {
            title: "알람 시계", 
            tierLevel: 3,
            link: "https://www.acmicpc.net/problem/2884"
        }
        ]
    },

    // [Case 3] 12월 7일: 다양한 난이도의 문제를 푼 날 (총 7문제)
    "2025-12-07": {
        date: "2025-12-07",
        dailyScore: 45,
        dailyRank: 1,
        solvedCount: 7,
        maxDifficulty: 18, // Platinum 3 (티어 레벨 18)
        problems: [
        {
            title: "트리의 지름", // Platinum 3
            tierLevel: 18,
            link: "https://www.acmicpc.net/problem/1967"
        },
        {
            title: "최단경로", // Gold 4
            tierLevel: 12,
            link: "https://www.acmicpc.net/problem/1753"
        },
        {
            title: "숨바꼭질", // Silver 1
            tierLevel: 10,
            link: "https://www.acmicpc.net/problem/1697"
        },
        {
            title: "좌표 정렬하기", // Silver 5
            tierLevel: 6,
            link: "https://www.acmicpc.net/problem/11650"
        },
        {
            title: "나이순 정렬", // Silver 5
            tierLevel: 6,
            link: "https://www.acmicpc.net/problem/10814"
        },
        {
            title: "수 정렬하기 2", // Silver 5
            tierLevel: 6,
            link: "https://www.acmicpc.net/problem/2751"
        },
        {
            title: "최대공약수와 최소공배수", // Bronze 1
            tierLevel: 5,
            link: "https://www.acmicpc.net/problem/2609"
        }
        ]
    }
};


/**
 * author : 최하영
 * @param year 조회할 연도 
 * @param month 조회할 월 
 * @param dateStr 클릭한 날짜. 없으면 오늘 기준
 * @returns 대시보드 데이터
 */
export const getMockDashboard = (_year: number, _month: number, dateStr?: string): ApiResponse<MyPageData> => {
    const targetDate = dateStr || getTodayISOString();

    const selectedDetail = DETAILS_DB[targetDate] || {
        date: targetDate,
        dailyScore: 0,
        dailyRank: 0,
        solvedCount: 0,
        maxDifficulty: 0,
        problems: []
    };
    return {
        success: true,
        errorCode: null,
        message: "마이페이지 조회 성공",
        data: {
          profile: MOCK_PROFILE,
          grass: MOCK_GRASS, 
          selectedDateDetail: selectedDetail
        }
      };
    };