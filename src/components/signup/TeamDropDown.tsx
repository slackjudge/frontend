import { useState } from "react";

interface TeamDropdownProps {
  teamName: string;
  setTeamName: (value: string) => void;
}

interface TeamOption {
  value: string;
  label: string;
}

export default function TeamDropdown({ teamName, setTeamName }: TeamDropdownProps) {
  const [open, setOpen] = useState<boolean>(false);

  const teams: TeamOption[] = [
    { value: "FRONTEND_FACE", label: "프론트엔드 대면반" },
    { value: "FRONTEND_NON_FACE", label: "프론트엔드 비대면반" },
    { value: "BACKEND_FACE", label: "백엔드 대면반" },
    { value: "BACKEND_NON_FACE", label: "백엔드 비대면반" },
  ];

  return (
    <div className="relative w-full">

      {/* 선택박스 */}
      <div
        onClick={() => setOpen(!open)}
        className="w-full h-[45px] border border-[#DADCE0] rounded-[8px]
        px-3 flex items-center justify-between cursor-pointer bg-white"
      >
        <span className={`text-[14px] ${teamName ? "text-black" : "text-[#C4C8CC]"}`}>
          {teamName
            ? teams.find((t) => t.value === teamName)?.label
            : "반을 선택해주세요."}
        </span>
        <span className="text-[#C4C8CC] text-[12px]">▾</span>
      </div>

      {/* 아래로 펼쳐지는 메뉴 */}
      {open && (
        <div className="absolute left-0 right-0 mt-1 border border-[#DADCE0] rounded-[8px] bg-white shadow z-10">
          {teams.map((team) => (
            <div
              key={team.value}
              onClick={() => {
                setTeamName(team.value);
                setOpen(false);
              }}
              className="px-3 py-3 text-[14px] text-[#686F75] hover:bg-gray-100 cursor-pointer"
            >
              {team.label}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}