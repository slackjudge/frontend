import { apiFetch } from "@/api/client/httpClient";
import type { GroupType } from "@/types/team";

/**
 * author : 박준희
 */
export type PeriodType = "day" | "week" | "month";

export interface RankingRow {
  userId: number;
  rank: number;
  tier: number;
  name: string;
  totalScore: number;
  solvedCount: number;
  baekjoonId: string;
  team: string;
  diff: number;
  newUser: boolean;
}

export interface RankingPage {
  hasNext: boolean;
  updateTime: string;
  rows: RankingRow[];
}

export function toLocalDateTimeString(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
    `T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  );
}

export async function getRanking(params: {
  period: PeriodType;
  dateTime?: Date;     
  group: GroupType;
  page: number;
  size: number;
}): Promise<RankingPage> {
  const qs = new URLSearchParams();

  qs.set("period", params.period);
  qs.set("page", String(params.page));
  qs.set("size", String(params.size));

  if (params.dateTime) qs.set("dateTime", toLocalDateTimeString(params.dateTime));
  if (params.group !== "ALL") qs.set("group", params.group);

  const body = await apiFetch<RankingPage>(`/rank?${qs.toString()}`, { method: "GET" });

 if (!body.data) {
   throw new Error("EMPTY_RANKING_DATA");
 }
  return body.data;
}
