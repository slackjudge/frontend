export const tierMap = (() => {
  const groups = ["bronze", "silver", "gold", "platinum", "diamond", "ruby"];
  const map: Record<string, string> = {};

  // unrated 추가 (level 0)
  map["unrated_0"] = `/src/assets/icons/baekjoon/unrated/unrated.svg`;

  groups.forEach((group) => {
    for (let i = 1; i <= 5; i++) {
      const prefix = group[0]; // b, s, g, p, d, r
      map[`${group}_${i}`] = `/src/assets/icons/baekjoon/${group}/${prefix}${i}.svg`;
    }
  });

  return map;
})();

/**
 * 숫자 레벨(0-30)을 티어 이미지 경로로 변환하는 함수
 * 백준 티어 시스템:
 * - 0:  unrated 
 * - 1-5: Bronze (1=B5, 2=B4, 3=B3, 4=B2, 5=B1)
 * - 6-10: Silver (6=S5, 7=S4, 8=S3, 9=S2, 10=S1)
 * - 11-15: Gold (11=G5, 12=G4, 13=G3, 14=G2, 15=G1)
 * - 16-20: Platinum (16=P5, 17=P4, 18=P3, 19=P2, 20=P1)
 * - 21-25: Diamond (21=D5, 22=D4, 23=D3, 24=D2, 25=D1)
 * - 26-30: Ruby (26=R5, 27=R4, 28=R3, 29=R2, 30=R1)
 * 
 * @param tierLevel 0-30 사이의 티어 레벨 (0은 기본값/없음)
 * @returns 티어 이미지 경로 문자열
 */
export const getTierImageUrl = (tierLevel: number): string => {
  // level이 0이면 unrated 반환
  if (tierLevel === 0) {
    return `/src/assets/icons/baekjoon/unrated/unrated.svg`;
  }

  // 유효하지 않은 범위면 빈 문자열 반환
  if (tierLevel < 0 || tierLevel > 30) {
    return "";
  }

  const groups = ["bronze", "silver", "gold", "platinum", "diamond", "ruby"];
  
  // 티어 그룹 인덱스 계산 (0-5)
  const groupIndex = Math.floor((tierLevel - 1) / 5);
  
  // 그룹 내 레벨 계산 (1-5, 백준은 낮은 숫자가 높은 티어이므로 역순)
  const levelInGroup = ((tierLevel - 1) % 5) + 1;
  const level = 6 - levelInGroup; // 5->1, 4->2, 3->3, 2->4, 1->5
  
  const group = groups[groupIndex];
  const prefix = group[0]; // b, s, g, p, d, r
  
  return `/src/assets/icons/baekjoon/${group}/${prefix}${level}.svg`;
};