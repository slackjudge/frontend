import { useState, useRef, useEffect } from "react";

import RankingRow, { type RankingRowData } from "../components/ranking/RankingRow";
import RankingPeriodSelector from "../components/ranking/RankingPeriodSelector";
import RankingDateDisplay from "../components/ranking/RankingDateDisplay";
import RankingGroupSelector from "../components/ranking/RankingGroupSelector";
import Calendar from "../components/common/Calendar";
import RankingHeader from "../components/ranking/RankingHeader";

import { useFetch } from "../hooks/useFetch";
import { getRanking, type RankingPage as RankingPageType } from "../api/client/getRanking";
import { isTeamName, type TeamName, type GroupType } from "../types/team";

const toTeamName = (v: unknown): TeamName => {
  if (isTeamName(v)) return v;
  return "BACKEND_FACE";
};

export default function RankingPage() {
  const [period, setPeriod] = useState<"day" | "week" | "month">("day");
  const [date, setDate] = useState(new Date());
  const [group, setGroup] = useState<GroupType>("ALL");

  // 스크롤
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<RankingRowData[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const SIZE = 20;

  const resetPaging = () => {
    setRows([]);
    setPage(1);
    setHasMore(true);
  };

  const handlePeriodChange = (newPeriod: "day" | "week" | "month") => {
    resetPaging();
    setPeriod(newPeriod);
  };

  const handleGroupChange = (newGroup: GroupType) => {
    resetPaging();
    setGroup(newGroup);
  };

  const handleDateChange = (newDate: Date) => {
    resetPaging();
    setDate(newDate);
  };

  const buildQueryDateTime = (): Date => {
    const now = new Date();
    const sameDay =
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate();

    const d = new Date(date);
    if (sameDay) d.setHours(now.getHours(), 0, 0, 0);
    else d.setHours(23, 0, 0, 0);

    return d;
  };

  const { data, isLoading, error } = useFetch<RankingPageType>({
    fetchFn: async () => {
      return await getRanking({
        period,
        dateTime: buildQueryDateTime(),
        group,
        page,
        size: SIZE,
      });
    },
    dependencies: [period, date.getTime(), group, page],
    enabled: true,
  });


  useEffect(() => {
    if (!data) return;

    setHasMore(data.hasNext);

    const mapped: RankingRowData[] = data.rows.map((row) => ({
      ...row,
      team: toTeamName(row.team),
    }));

    setRows((prev) => {
      const next = page === 1 ? mapped : [...prev, ...mapped];

      // userId 기준 중복 제거 (same key 방지)
      const seen = new Set<number>();
      return next.filter((r) => {
        if (r.userId == null) return true;
        if (seen.has(r.userId)) return false;
        seen.add(r.userId);
        return true;
      });
    });

    console.log("유즈이펙트 1번 실행");
  }, [data, page]);


  const isLoadingRef = useRef(false);
  const hasMoreRef = useRef(true);

  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        if (isLoadingRef.current) return;
        if (!hasMoreRef.current) return;

        setPage((prev) => prev + 1);
      },
      { threshold: 0, rootMargin: "200px" }
    );

    observer.observe(el);
    console.log("유즈이펙트 2번 실행");
    return () => observer.disconnect();
  }, []);

  // 첫 페이지부터 데이터가 없을 경우 -> Empty State 조건
  const isEmpty = !isLoading && rows.length === 0 && hasMore === false;

  return (
    <div className="flex w-full">
      {/* 왼쪽 영역 -> 달력 */}
      <div className="w-[320px] p-6 bg-white flex justify-center items-start h-fit sticky top-20">
        <Calendar date={date} period={period} onDateChange={handleDateChange} />
      </div>

      {/* 오른쪽 영역 -> 나머지 컴포넌트들 */}
      <div className="flex-1 flex flex-col items-center px-10 py-8">
        {/* 헤더 */}
        <div className="w-full max-w-5xl">
          <div className="flex justify-center items-center mb-4">
            <RankingDateDisplay period={period} date={date} />
          </div>

          <div className="flex items-center justify-between mb-6">
            <RankingPeriodSelector value={period} onChange={handlePeriodChange} />
            <RankingGroupSelector value={group} onChange={handleGroupChange} />
          </div>
        </div>

        {/* 테이블 + 무한스크롤 */}
        <div className="w-full max-w-5xl">
          <RankingHeader />

          {rows.map((row) => (
            <RankingRow key={row.userId} row={row} />
          ))}


          <div ref={loaderRef} className="h-10"></div>

          {isLoading && (
            <div className="text-center text-gray-400 py-3">불러오는 중...</div>
          )}

          {error && (
            <div className="text-center text-red-500 py-3">{String(error)}</div>
          )}

          {/* 데이터 자체가 없는 경우(정상) */}
          {isEmpty && (
            <div className="text-center text-gray-400 py-3">
              해당 날짜에는 랭킹 데이터가 없습니다.
            </div>
          )}

          {/* 데이터가 있었는데 더 가져올 게 없는 경우 */}
          {!isLoading && !error && rows.length > 0 && !hasMore && (
            <div className="text-center text-gray-400 py-3">
              더 이상 데이터가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
