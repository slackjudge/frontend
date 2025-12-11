export const ErrorCodes = {
  // Refresh Token 관련 (만료, 위변조, 없음 등)
    REFRESH_TOKEN_EXPIRED: ["AUTH_005", "AUTH_006", "AUTH_007"] as readonly string[],

  // Access Token 관련 (만료, 유효하지 않음 등)
    ACCESS_TOKEN_INVALID: ["AUTH_003", "AUTH_004"] as readonly string[],
} as const;

export type ErrorType =
  | "REFRESH_EXPIRED"
  | "ACCESS_INVALID"
  | "GENERAL"
  | "UNKNOWN";

export function classifyError(errorCode?: string): ErrorType {
  
  if (!errorCode) return "UNKNOWN";

  if (ErrorCodes.REFRESH_TOKEN_EXPIRED.includes(errorCode)) {
    return "REFRESH_EXPIRED";
  }

  if (ErrorCodes.ACCESS_TOKEN_INVALID.includes(errorCode)) {
    return "ACCESS_INVALID";
  }

  return "GENERAL";
}