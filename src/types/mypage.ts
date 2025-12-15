// 문제 정보
export interface Problem {
  title: string;          // 문제 제목
  tierLevel: number;      // 문제 난이도
  link: string;           // 문제 링크 (URL)
}

// 잔디 데이터 (월간)
export interface Grass {
  date: string;           // 날짜 (YYYY-MM-DD)
  solvedCount: number;    // 해당 날짜에 푼 문제 수
}

// 프로필 정보
export interface MyPageProfile {
  username: string;       // 유저 실명
  baekjoonId: string;     // 백준 ID
  tierLevel: number;      // 백준 티어 (숫자값)
  totalScore: number;     // 총 풀이 점수
}

// 선택 날짜 상세 정보
export interface MyPageDetail {
  date: string;           // 선택된 날짜 (YYYY-MM-DD)
  dailyScore: number;     // 일간 획득 점수
  dailyRank: number;      // 일간 순위
  solvedCount: number;    // 일간 푼 문제 수
  maxDifficulty: number;  // 그날 푼 가장 어려운 문제 레벨
  problems: Problem[];    // 푼 문제 목록
}

// 마이페이지 전체 데이터
export interface MyPageData {
  profile: MyPageProfile;
  grass: Grass[];
  selectedDateDetail: MyPageDetail;
}

// 하위 호환성을 위한 타입 별칭 (기존 코드에서 사용 중)
export type Profile = MyPageProfile;
export type SelectedDateDetail = MyPageDetail;