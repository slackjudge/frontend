/**
 * author : 박준희
 */
export const TEAM_NAMES = [
  "FRONTEND_FACE",
  "FRONTEND_NON_FACE",
  "BACKEND_FACE",
  "BACKEND_NON_FACE",
] as const;

export type TeamName = (typeof TEAM_NAMES)[number];
export type GroupType = TeamName | "ALL";


export function isTeamName(v: unknown): v is TeamName {
  return TEAM_NAMES.includes(v as TeamName); 
}

export function isGroupType(v: string): v is GroupType {
  return v === "ALL" || (TEAM_NAMES as readonly string[]).includes(v);
}

export const TEAM_LABELS: Record<TeamName, string> = {
  FRONTEND_FACE: "프론트엔드 대면반",
  FRONTEND_NON_FACE: "프론트엔드 비대면반",
  BACKEND_FACE: "백엔드 대면반",
  BACKEND_NON_FACE: "백엔드 비대면반",
};

export function getTeamLabel(team: TeamName): string {
  return TEAM_LABELS[team];
}