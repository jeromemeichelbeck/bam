export type ApiError = {
  code: "INTERNAL_SERVER_ERROR" | "NOT_FOUND" | "BAD_REQUEST";
  message?: string;
};

export type Maybe<T> = T | ApiError;
