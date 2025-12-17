/**
 * author : 박준희
 */
const tierAssets = import.meta.glob(
  "/src/assets/icons/baekjoon/**/*.svg",
  { eager: true, as: "url" }
) as Record<string, string>;

const GROUPS = ["bronze", "silver", "gold", "platinum", "diamond", "ruby"] as const;
const UNRATED_KEY = "/src/assets/icons/baekjoon/unrated/unrated.svg";

export const getTierImageUrl = (tierLevel: number): string => {

  if (tierLevel === 0) {
    return tierAssets[UNRATED_KEY] ?? "";
  }

  if (tierLevel < 0 || tierLevel > 30) {
    return "";
  }

  const groupIndex = Math.floor((tierLevel - 1) / 5);
  const group = GROUPS[groupIndex];
  if (!group) return tierAssets[UNRATED_KEY] ?? "";

  const levelInGroup = ((tierLevel - 1) % 5) + 1; 
  const level = 6 - levelInGroup;                 
  const prefix = group[0];                        

  const key = `/src/assets/icons/baekjoon/${group}/${prefix}${level}.svg`;

  return tierAssets[key] ?? (tierAssets[UNRATED_KEY] ?? "");
};
