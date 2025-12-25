/**
 * author : 박준희
 */
type Props = {
  updateTime?: string | null; // "2025-12-24T19:00:00"
};

const formatUpdateTime = (value: string) => {
  const m = value.match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})/);
  if (!m) return `${value} KST 기준`;

  const yyyy = Number(m[1]);
  const mm = Number(m[2]);
  const dd = Number(m[3]);
  const hh = m[4];
  const mi = m[5];

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
