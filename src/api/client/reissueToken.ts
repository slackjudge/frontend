import { ApiResponse } from "@/api/client/httpClient";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  registeredUser: boolean;
}

export async function reissueToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  try {
    const res = await fetch(`${API_BASE_URL}/oauth/reissue`, {
      method: "POST",
      headers: {
        refreshToken,
      },
    });

    const body: ApiResponse<LoginResponse> = await res.json();

    // ▲ Refresh Token 자체 에러
    if (
      body.errorCode === "AUTH_005" ||
      body.errorCode === "AUTH_006" ||
      body.errorCode === "AUTH_007"
    ) {
      // refresh token 만료 → 로그인 필요
      return null;
    }

    if (!body.success) return null;

    // Refresh Token 정상 → 새 토큰 저장
    localStorage.setItem("accessToken", body.data.accessToken);
    localStorage.setItem("refreshToken", body.data.refreshToken);

    return body.data.accessToken;
  } catch {
    return null;
  }
}