export interface TeamOption {
  value: string;
  label: string;
}

export const TEAM_OPTIONS: TeamOption[] = [
  { value: "FRONTEND_FACE", label: "프론트엔드 대면반" },
  { value: "FRONTEND_NON_FACE", label: "프론트엔드 비대면반" },
  { value: "BACKEND_FACE", label: "백엔드 대면반" },
  { value: "BACKEND_NON_FACE", label: "백엔드 비대면반" },
];