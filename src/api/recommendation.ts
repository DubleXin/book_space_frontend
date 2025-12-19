import axios from "axios";
import type { RecommendationResult } from "../types/api/recommendations";
import type {
  AlgorithmicRecommendationResponse,
  EnhancedRecommendationResponse,
} from "../types/recommendation";

import { callService } from "./client";
import { SERVICES } from "./services";

export async function fetchAlgorithmicRecommendations(signal?: AbortSignal) {
  const res = await callService<AlgorithmicRecommendationResponse>({
    method: "GET",
    url: "/api/recommendation/algorithmic",
    baseURL: SERVICES.recommendation,
    signal,
  });
  return res.data;
}

export async function fetchEnhancedRecommendations(
  signal?: AbortSignal
): Promise<RecommendationResult<EnhancedRecommendationResponse>> {
  try {
    const res = await callService<EnhancedRecommendationResponse>({
      method: "GET",
      url: "/api/recommendation",
      baseURL: SERVICES.recommendation,
      signal,
    });

    return {
      status: "ok",
      data: res.data,
    };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 500) {
      return { status: "fallback", reason: "SERVER_500" };
    }
    throw err;
  }
}
