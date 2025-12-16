// 배포 환경에서 티어 아이콘을 미리 불러오기 위해 glob 사용
const tierAssets = import.meta.glob(
  "/src/assets/icons/baekjoon/**/*.svg",
  { eager: true, as: "url" }
) as Record<string, string>;

const GROUPS = ["bronze", "silver", "gold", "platinum", "diamond", "ruby"] as const;
const UNRATED_KEY = "/src/assets/icons/baekjoon/unrated/unrated.svg";

/**
 * 숫자 레벨(0-30)을 티어 이미지 URL로 변환
 */
export const getTierImageUrl = (tierLevel: number): string => {
  // 0: unrated
  if (tierLevel === 0) {
    return tierAssets[UNRATED_KEY] ?? "";
  }

  // 범위 벗어나면 빈 값
  if (tierLevel < 0 || tierLevel > 30) {
    return "";
  }

  // 그룹 인덱스(0~5)
  const groupIndex = Math.floor((tierLevel - 1) / 5);
  const group = GROUPS[groupIndex];
  if (!group) return tierAssets[UNRATED_KEY] ?? "";

  // 그룹 내 레벨(1~5) -> 파일명은 b1~b5 형태인데
  // 백준 tierLevel은 1이 B5, 5가 B1 이므로 역매핑 필요
  const levelInGroup = ((tierLevel - 1) % 5) + 1; // 1..5
  const level = 6 - levelInGroup;                 // 5..1
  const prefix = group[0];                        // b,s,g,p,d,r

  const key = `/src/assets/icons/baekjoon/${group}/${prefix}${level}.svg`;

  // 혹시 누락된 아이콘이면 unrated로 fallback
  return tierAssets[key] ?? (tierAssets[UNRATED_KEY] ?? "");
};
