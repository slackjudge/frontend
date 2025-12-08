import { useState } from "react";

interface CalendarProps {
  date: Date;
  period: "day" | "week" | "month";
  onDateChange: (d: Date) => void;
}

export default function Calendar({
  date,
  period,
  onDateChange,
}: CalendarProps) {
  const [current, setCurrent] = useState(new Date(date));
  const [selectedDate, setSelectedDate] = useState<Date | null>(date);

  const year = current.getFullYear();
  const month = current.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const prevLastDate = new Date(year, month, 0).getDate();

  const dates: { day: number; type: "prev" | "current" | "next" }[] = [];

  for (let i = 0; i < 42; i++) {
    let dayNum : number;
    let type: "prev" | "current" | "next";
    

    if (i < firstDay) {
      dayNum = prevLastDate - firstDay + i + 1;
      type = "prev";
    } else if (i - firstDay + 1 <= lastDate) {
      dayNum = i - firstDay + 1;
      type = "current";
    } else {
      dayNum = i - firstDay - lastDate + 1;
      type = "next";
    }

    dates.push({ day: dayNum, type });
  }

  const isSelected = (i: number) => {
    if (!selectedDate) return false;

    const d = dates[i];
    if (d.type !== "current") return false;

    const clicked = selectedDate.getDate();

    if (period === "day") return d.day === clicked;

    if (period === "week") {
      const start = clicked - selectedDate.getDay();
      const end = start + 6;
      return d.day >= start && d.day <= end;
    }

    if (period === "month") return d.type === "current";
  };

  const handleClick = (i: number) => {
    const d = dates[i];
    if (d.type !== "current") return;
    const clickedDate = new Date(year, month, d.day);

    setSelectedDate(clickedDate);
    onDateChange(clickedDate);
  };

  return (
    <div className="bg-white border rounded-xl p-4 w-80 shadow-xl">

      <div className="flex justify-between mb-3">
        <span className="font-bold text-lg">
          {current.toLocaleString("en-US", { month: "long" })} {year}
        </span>
        <div className="flex gap-4">
          <button onClick={() => setCurrent(new Date(year, month - 1, 1))}>◀</button>
          <button onClick={() => setCurrent(new Date(year, month + 1, 1))}>▶</button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-center text-sm font-semibold mb-1">
        <div className="text-red-500">Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div className="text-blue-500">Sa</div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {dates.map((d, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`
              py-2 rounded-md
              ${d.type !== "current" ? "text-gray-300" : ""}
              ${isSelected(i) ? "bg-blue-600 text-white" : ""}
            `}
          >
            {d.day}
          </button>
        ))}
      </div>
    </div>
  );
}
