export type GroupType =
  | "FRONTEND_OFFLINE"
  | "FRONTEND_ONLINE"
  | "BACKEND_OFFLINE"
  | "BACKEND_ONLINE"
  | "ALL";

interface GroupSelectProps {
  value: GroupType;
  onChange: (value: GroupType) => void;
}

export default function RankingGroupSelector({ value, onChange }: GroupSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as GroupType)}
      className="
        w-52 px-3 py-2 border border-gray-300 rounded-lg
        text-sm text-gray-700 bg-white 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
      "
    >
      <option value="ALL">전체</option>
      <option value="FRONTEND_OFFLINE">프론트엔드 대면</option>
      <option value="FRONTEND_ONLINE">프론트엔드 비대면</option>
      <option value="BACKEND_OFFLINE">백엔드 대면</option>
      <option value="BACKEND_ONLINE">백엔드 비대면</option>
    </select>
  );
}