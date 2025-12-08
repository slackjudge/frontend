import { useState, useRef, useEffect } from "react";

import RankingRow from "../components/ranking/RankingRow";
import RankingPeriodSelector from "../components/ranking/RankingPeriodSelector";
import RankingDateDisplay from "../components/ranking/RankingDateDisplay";
import RankingGroupSelector, {GroupType} from "../components/ranking/RankingGroupSelector";
import Calendar from "../components/common/Calendar";
import RankingHeader from "../components/ranking/RankingHeader";

import { tierMap } from "../constants/tierMap";
import { generateDummyRank } from "../mock/ranking/generateDummyRank";



export default function RankingPage() {
  const [period, setPeriod] = useState<"day" | "week" | "month">("day");
  const [date, setDate] = useState(new Date());
  const [group, setGroup] = useState<GroupType>("ALL");

  // 스크롤
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<any[]>([]);
  const loaderRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);


  // 더미 데이터 로드 -> 추후에 API로 변경 예정
    const loadMore = () => {
    const newRows = generateDummyRank(20);

    if (newRows.length === 0) {
      setHasMore(false);
      return;
    }

    setRows((prev) => [...prev, ...newRows]);
  };


    // page 변경 시 더미 데이터 로드
    useEffect(() => {
        loadMore();
    }, [page]);


  // 기간, 그룹, 날짜 변경 시 데이터 로드
  useEffect(() => {
    setRows([]);
    setPage(1);
    setHasMore(true);
    }, [period, date, group]);


  // Intersection Observer
    useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore]);




  return (
    <div className="flex w-full">

      {/* 왼쪽 영역 -> 달력 */}
      <div className="w-[320px] p-6 bg-white flex justify-center items-start h-fit sticky top-20">
          <Calendar
          date={date}
          period={period}
          onDateChange={setDate}
          />
      </div>

      {/* 오른쪽 영역 -> 나머지 컴포넌트들 */}
      <div className="flex-1 flex flex-col items-center px-10 py-8">

        {/* 헤더 */}
        <div className="w-full max-w-5xl">

          <div className="flex justify-center items-center mb-4">
            <RankingDateDisplay period={period} date={date} />
          </div>

          <div className="flex items-center justify-between mb-6">
            <RankingPeriodSelector
              value={period}
              onChange={(newPeriod) => {
                setPeriod(newPeriod);
                setDate(new Date());
              }}
            />

            <RankingGroupSelector value={group} onChange={setGroup} />
          </div>
        </div>

        {/* 테이블 + 무한스크롤 */}
        <div className="w-full max-w-5xl">

          <RankingHeader />

          {rows.map((row, i) => (
            <RankingRow key={i} row={row} tierMap={tierMap} />
          ))}

          {/* 무한스크롤 div */}
          <div ref={loaderRef} className="h-10"></div>

          {!hasMore && (
            <div className="text-center text-gray-400 py-3">
              더 이상 데이터가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}