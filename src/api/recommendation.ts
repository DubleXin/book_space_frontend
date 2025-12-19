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

export async function fetchEnhancedRecommendations(signal?: AbortSignal) {
  const res = await callService<EnhancedRecommendationResponse>({
    method: "GET",
    url: "/api/recommendation",
    baseURL: SERVICES.recommendation,
    signal,
  });

  return res.data;
}
