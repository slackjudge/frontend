import { TEAM_OPTIONS } from "../../constants/team";
import type { GroupType } from "../../types/team";
import { isGroupType } from "../../types/team";

interface GroupSelectProps {
  value: GroupType;
  onChange: (value: GroupType) => void;
}

export default function RankingGroupSelector({ value, onChange }: GroupSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => {
        const v = e.target.value;
        if (isGroupType(v)) onChange(v);
        else onChange("ALL"); 
      }}
      className="
        w-52 px-3 py-2 border border-gray-300 rounded-lg
        text-sm text-gray-700 bg-white 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
      "
    >
      <option value="ALL">전체</option>
      {TEAM_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}