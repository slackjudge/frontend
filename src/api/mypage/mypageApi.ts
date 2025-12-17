import { apiFetch } from "@/api/client/httpClient";
import { MyPageData } from "@/types/mypage";

/** 
 * 마이페이지 대시보드 데이터 조회 
 * author : 최하영
 * @param year 조회할 연도
 * @param month 조회할 월
 * @param date 선택한 날짜 (YYYY-MM-DD, optional)
 * @returns 마이페이지 데이터 
 * 
 */

export async function getMyPageDashboard(
    year: number,
    month: number,
    date?: string
): Promise<MyPageData> {
    const params = new URLSearchParams({
        year: year.toString(),
        month: month.toString(),
    });
    
    if (date) {
        params.append("date", date);
    }

    const response = await apiFetch<MyPageData>(
        `/user/me?${params.toString()}`        
    );

    return response.data;
}