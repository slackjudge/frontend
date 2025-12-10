export interface ApiReponse<T> {
    success: boolean;
    errorCode: string | null;
    message: string;
    data: T;
}

export async function apiFetch<T>(
    path: string,
    options: RequestInit = {}
): Promise<ApiReponse<T>> {
    const accessToken = localStorage.getItem("accessToken");

    const headers = new Headers(options.headers ?? {});
    headers.set("Content-Type", "application/json");

    if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
    }

    const url = path
    
    const res = await fetch(url, {
        ...options,
        headers,
    });

    const body: ApiReponse<T> = await res.json();

    if (body.success) return body;

    switch (body.errorCode) {
        case "AUTH_004": // ACCESS TOKEN EXPIRED
            localStorage.clear();
            window.location.href = "/";
            throw new Error("ACCESS_TOKEN_EXPIRED");

        case "AUTH_005": // REFRESH TOKEN EXPIRED
        case "AUTH_007": // REFRESH TOKEN MISMATCH
            localStorage.clear();
            window.location.href = "/";
            throw new Error("REFRESH_TOKEN_EXPIRED");

        default:
            throw new Error(body.errorCode ?? "UNKNOWN_ERROR");
  }
}