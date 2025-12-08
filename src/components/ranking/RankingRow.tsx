import React from "react";

interface RankingRowProps {
  row: {
    rank: number;
    tier: string;
    name: string;
    totalScore: number;
    solvedCount: number;
    bojId: string;
    team: string;
    diff: number;
  };
  tierMap: Record<string, string>;
}

const RankingRow = ({ row, tierMap }: RankingRowProps) => {
  return (
<div className="grid grid-cols-7 items-center py-4 border-b border-gray-200 text-sm">


  <div className="text-center">{row.rank}등</div>

  <div className="flex items-center gap-2 pl-3">
    <img src={tierMap[row.tier]} className="w-5 h-5" />
    <span>{row.name}</span>
  </div>

  <div className="text-center">{row.totalScore}점</div>

  <div className="text-center hidden lg:block">
    {row.solvedCount}문제
  </div>

  <div className="text-center hidden xl:block">
    {row.bojId}
  </div>

  <div className="text-center hidden 2xl:block">
    {row.team}
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
