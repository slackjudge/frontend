import { MyPageResponse } from '../../types/mypage';

export const MOCK_MYPAGE_DATA: MyPageResponse = {
    isSuccess: true,
    message: "마이페이지 조회 성공",
    response: {
      profile: {
        username: "김마루",
        baekjoonId: "gr2147",
        tierLevel: 15,
        totalScore: 1520,
        myRank: 5
      },
      grass: [
        { date: "2025-12-01", solvedCount: 0, degree: 0 },
        { date: "2025-12-02", solvedCount: 3, degree: 2 },
        { date: "2025-12-03", solvedCount: 7, degree: 3 }, 
        { date: "2025-12-04", solvedCount: 2, degree: 1 }
      ],
      selectedDateDetail: {
        date: "2025-12-05",
        dailyScore: 15,
        dailyRank: 2,
        solvedCount: 3,
        maxDifficulty: 12,
        problems: [
          {
            title: "A+B",
            tierLevel: 1,
            link: "https://www.acmicpc.net/problem/1000"
          },
          {
            title: "별찍기",
            tierLevel: 2,
            link: "https://www.acmicpc.net/problem/2438"
          }
        ]
      }
    }
  };