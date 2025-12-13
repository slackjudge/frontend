import { TEAM_OPTIONS } from "@/constants/team";
import { useState } from "react";

interface TeamDropdownProps {
  id?: string;
  teamName: string;
  setTeamName: (value: string) => void;
}

export default function TeamDropdown({ id, teamName, setTeamName }: Readonly<TeamDropdownProps>) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">

      {/* 선택박스 */}
      <button
        id={id}
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full h-[45px] border border-[#DADCE0] rounded-[8px]
        px-3 flex items-center justify-between cursor-pointer bg-white"
      >
        <span className={`text-[14px] ${teamName ? "text-black" : "text-[#C4C8CC]"}`}>
          {teamName
            ? TEAM_OPTIONS.find((t) => t.value === teamName)?.label
            : "반을 선택해주세요."}
        </span>
        <span className="text-[#C4C8CC] text-[12px]">▾</span>
      </button>

      {/* 아래로 펼쳐지는 메뉴 */}
      {open && (
        <div className="absolute left-0 right-0 mt-1 border border-[#DADCE0] rounded-[8px] bg-white shadow z-10">
          {TEAM_OPTIONS.map((team) => (
            <button
              key={team.value}
              type="button"
              onClick={() => {
                setTeamName(team.value);
                setOpen(false);
              }}
              className="w-full block text-left px-3 py-3 text-[14px] text-[#686F75] hover:bg-gray-100 cursor-pointer"
            >
              {team.label}
            </button>
          ))}
        </div>
      )}

    </div>
  );
}