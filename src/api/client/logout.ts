import { apiFetch } from "@/api/client/httpClient";

export async function logout(): Promise<void> {
  try {
    await apiFetch<void>("/oauth/logout", {
      method: "POST",
      
    });

  } catch (e) {
    console.error("Logout error:", e);

  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    globalThis.location.href = "/";
  }
}