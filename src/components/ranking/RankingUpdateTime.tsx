/**
 * author : 박준희
 */
type Props = {
  updateTime?: string | null; // "2025-12-24T19:00:00"
};

const formatUpdateTime = (value: string) => {
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return `${value} KST 기준`;
  }

  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const hh = String(date.getHours()).padStart(2, '0');
  const mi = String(date.getMinutes()).padStart(2, '0');

  return `${yyyy}년 ${mm}월 ${dd}일 ${hh}:${mi} KST 기준`;
};

export default function RankingUpdateTime({ updateTime }: Props) {
  if (!updateTime) return null;

  return (
    <div className="flex justify-center items-center mb-2">
      <span className="text-xs text-gray-500">{formatUpdateTime(updateTime)}</span>
    </div>
  );
}
