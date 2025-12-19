export type ApiOk<T> = { status: "ok"; data: T };
export type ApiFallback<R extends string> = { status: "fallback"; reason: R };
export type ApiEmpty<R extends string> = { status: "empty"; reason: R };

export type ApiResult<T, R extends string = string> =
  | ApiOk<T>
  | ApiEmpty<R>
  | ApiFallback<R>;
