
export interface Problem {
    title: string;
    tierLevel: number;
    link: string;
  }
  
  export interface SelectedDateDetail {
    date: string;
    dailyScore: number;
    dailyRank: number; //일간 순위 ( 우측 패널용)
    solvedCount: number;
    maxDifficulty: number;
    problems: Problem[];
  }
  
  export interface Grass {
    date: string;
    solvedCount: number;
  }
  
  export interface Profile {
    username: string;
    baekjoonId: string;
    tierLevel: number; //0 ~30으로 이미지 띄움 
    totalScore: number;
    myRank: number;
  }
  
  export interface MyPageResponse {
    isSuccess: boolean;
    message: string;
    response: {
      profile: Profile;
      grass: Grass[];
      selectedDateDetail: SelectedDateDetail;
    };
  }