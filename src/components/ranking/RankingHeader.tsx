export default function RankingHeader() {
  return (
    <div className="w-full grid grid-cols-7 text-gray-500 text-sm py-3 border-y">
      <div className="text-center">등수</div>
      <div className="text-left">이름</div>
      <div className="text-center">누적 점수</div>
      <div className="text-center">푼 문제 수</div>
      <div className="text-center">백준 아이디</div>
      <div className="text-center">반</div>
      <div className="text-center">변동</div>
    </div>
  );
}