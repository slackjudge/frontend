// src/api/errors/errorHandler.ts

import { classifyError, ErrorType } from "@/api/errors//errorMap";
import type { ApiResponse } from "@/api/client/httpClient";

export class ApiError extends Error {
  errorType: ErrorType;
  errorCode?: string;

  constructor(message: string, errorType: ErrorType, errorCode?: string) {
    super(message);
    this.name = "ApiError";
    this.errorType = errorType;
    this.errorCode = errorCode;
  }
}

export function handleJwtApiError<T>(body: ApiResponse<T>): void {
  if (body.success) return;

  const errorCode: string | undefined =
    typeof body.errorCode === "string" ? body.errorCode : undefined;

  const type = classifyError(errorCode);

  switch (type) {
    case "REFRESH_EXPIRED": {
      localStorage.clear();
      window.location.href = "/";
      throw new ApiError("REFRESH_TOKEN_EXPIRED", "REFRESH_EXPIRED", errorCode);
    }

    case "ACCESS_INVALID": {
      throw new ApiError("ACCESS_TOKEN_INVALID", "ACCESS_INVALID", errorCode);
    }

    case "GENERAL": {
      throw new ApiError(errorCode ?? "UNKNOWN_ERROR", "GENERAL", errorCode);
    }

    case "UNKNOWN":
    default: {
      throw new ApiError("UNKNOWN_ERROR", "UNKNOWN", errorCode);
    }
  }
}