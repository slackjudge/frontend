import { apiFetch } from "@/api/client/httpClient";

export async function logout(): Promise<void> {
  try {
    await apiFetch<void>("/oauth/logout", {
      method: "POST",
      
    });

  } catch (e) {
    console.error("Logout error:", e);

  } finally {
    // 클라이언트 토큰 정리
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // 로그인 페이지로 이동
    globalThis.location.href = "/";
  }
}