interface RankingPeriodSelectorProps {
  value: "day" | "week" | "month";
  onChange: (value: "day" | "week" | "month") => void;
}

export default function RankingPeriodSelector({
  value,
  onChange,
}: RankingPeriodSelectorProps) {
  const tabs = [
    { key: "day", label: "일" },
    { key: "week", label: "주" },
    { key: "month", label: "월" },
  ] as const;

  return (
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={
            "w-9 h-9 text-sm border border-gray-300 rounded-lg flex items-center justify-center " +
            (value === tab.key
              ? "bg-blue-700 text-white"
              : "bg-white text-black")
          }
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}