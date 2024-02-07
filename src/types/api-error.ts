export type ApiError = {
  code: "INTERNAL_SERVER_ERROR" | "NOT_FOUND" | "BAD_REQUEST" | "CONFLICT";
  message?: string;
};

export type Maybe<T> = T | ApiError;
