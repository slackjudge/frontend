// src/api/client.ts
import { handleJwtApiError, ApiError } from "@/api/errors/errorHandler";
import { reissueToken } from "@/api/client/reissueToken";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface ApiResponse<T> {
  success: boolean;
  errorCode: string | null;
  message: string;
  data: T;
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {

  async function sendRequest(accessTokenOverride?: string) {
    const headers = new Headers(options.headers ?? {});
    headers.set("Content-Type", "application/json");

    const accessToken =
      accessTokenOverride ?? localStorage.getItem("accessToken");

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
    });
    return res.json() as Promise<ApiResponse<T>>;
  }

  try {
    let body = await sendRequest();

    try {
      handleJwtApiError(body);
      return body;
    } catch (err) {
      if (err instanceof ApiError && err.errorType === "ACCESS_INVALID") {
        const newToken = await reissueToken();

        if (!newToken) {
          localStorage.clear();
          globalThis.location.href = "/";
          throw new Error("REFRESH_TOKEN_EXPIRED");
        }

        body = await sendRequest(newToken);
        handleJwtApiError(body);
        return body;
      }

      // 다른 ApiError는 그대로 throw → OUTER catch로 가지 않고 상위로 전달됨
      throw err;
    }

  } catch (networkError) {
    console.error("Network error:", networkError);

    // fetch 자체가 실패한 경우만 홈으로 이동
    localStorage.clear();
    globalThis.location.href = "/";

    throw new Error("NETWORK_ERROR");
  }
}