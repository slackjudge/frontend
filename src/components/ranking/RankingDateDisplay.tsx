type RankingDateDisplayProps = {
  period: "day" | "week" | "month";
  date: Date;
};

/**
 * author : 박준희
 */

export default function RankingDateDisplay({ period, date }: RankingDateDisplayProps) {
  
  const getDailyLabel = () => {
     const year = date.getFullYear();
     const month = date.getMonth() + 1;
     const day = date.getDate();
       return `${year}년 ${month}월 ${day}일`;
  };

  const getWeekOfMonth = (date: Date) => {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const day = start.getDay();
    const offset = date.getDate() + day - 1;
    return Math.floor(offset / 7) + 1;
  };

  const getWeeklyLabel = () => {
    const month = date.getMonth() + 1;
    const week = getWeekOfMonth(date);
    return `${month}월 ${week}주차`;
  };

  const getMonthlyLabel = () => {
    return `${date.getMonth() + 1}월`;
  };

  const getDisplayDate = () => {
    switch (period) {
      case "day":
        return getDailyLabel();
      case "week":
        return getWeeklyLabel();
      case "month":
        return getMonthlyLabel();
    }
  };

  return (
    <div className="text-xl font-semibold">
      {getDisplayDate()}
    </div>
  );
}