import type { ApiResult } from "./result";

export type RecommendationReason = "NO_SIGNALS" | "SERVER_500";

export type RecommendationResult<T> = ApiResult<T, RecommendationReason>;
