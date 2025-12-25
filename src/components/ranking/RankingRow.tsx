import { getTierImageUrl } from "../../constants/tierMap";
import { getTeamLabel, type TeamName } from "@/types/team";
import newPng from "../../assets/images/new444.png";

/**
 * author : 박준희
 */
export interface RankingRowData {
  userId: number;
  rank: number;
  tier: number;
  name: string;
  totalScore: number;
  solvedCount: number;
  baekjoonId: string;
  team: TeamName;
  diff: number;
  newUser: boolean;
}

interface RankingRowProps {
  row: RankingRowData;
}

const RankingRow = ({ row }: RankingRowProps) => {
  return (
<div 
  className={[
    "relative grid grid-cols-7 items-center py-4 border-b text-sm",
    row.newUser
      ? "border-green-100 bg-gradient-to-r from-green-100/80 to-transparent"
      : "border-blue-200",
  ].join(" ")}
>
<div className="relative text-center">
  {row.newUser && (
    <img
      src={newPng}
      alt="new"
      className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 object-contain"
    />
  )}
  <span className="tabular-nums">{row.rank}등</span>
</div>

  <div className="flex items-center gap-2">
    <img src={getTierImageUrl(row.tier)} className="w-5 h-5" />
    <span>{row.name}</span>
  </div>

  <div className="text-center">{row.totalScore}점</div>

  <div className="text-center hidden lg:block">
    {row.solvedCount}문제
  </div>

  <div className="text-center hidden xl:block">
    {row.baekjoonId}
  </div>

  <div className="text-center hidden 2xl:block">
    {getTeamLabel(row.team)}
  </div>

  <div
    className={`text-center ${
      row.diff === 0
        ? "text-gray-400"
        : row.diff > 0
        ? "text-red-500"
        : "text-blue-500"
    }`}
  >
    {row.diff === 0 ? "-" : row.diff > 0 ? `▲${row.diff}` : `▼${Math.abs(row.diff)}`}
  </div>

</div>
  );
};


export default RankingRow;
