import { apiFetch } from "@/api/client/httpClient";
import { MyPageData } from "@/types/mypage";

/** 
 * 마이페이지 대시보드 데이터 조회 
 * 
 * @param year 조회할 연도
 * @param month 조회할 월
 * @param date 선택한 날짜 (YYYY-MM-DD, optional)
 * @returns 마이페이지 데이터 
 * 
 * @example
 * 
 * // 현재 달, 오늘 날짜 조회
 * const data = await getMyPageDashboard(2025, 12);
 * 
 * // 특정 날짜 조회
 * const data = await getMyPageDashboard(2025, 12, "2025-12-05");
 */

export async function getMyPageDashboard(
    year: number,
    month: number,
    date?: string
): Promise<MyPageData> {
    // 쿼리 파라미터 
    const params = new URLSearchParams({
        year: year.toString(),
        month: month.toString(),
    });
    
    if (date) {
        params.append("date", date);
    }

    // API 호출: GET /api/user/me?year=2025&month=12&date=2025-12-05
    const response = await apiFetch<MyPageData>(
        `/user/me?${params.toString()}`
        // `/api/user/me?${params.toString()}`
        
    );

    return response.data;
}