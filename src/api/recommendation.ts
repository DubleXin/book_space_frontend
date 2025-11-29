import type {
  AlgorithmicRecommendationResponse,
  EnhancedRecommendationResponse,
} from "../types/recommendation";

import { callService } from "./client";
import { SERVICES } from "./services";

export async function fetchAlgorithmicRecommendations() {
  const res = await callService<AlgorithmicRecommendationResponse>({
    method: "GET",
    url: "/api/recommendation/algorithmic",
    baseURL: SERVICES.recommendation,
  });
  return res.data;
}

export async function fetchEnhancedRecommendations() {
  const res = await callService<EnhancedRecommendationResponse>({
    method: "GET",
    url: "/api/recommendation",
    baseURL: SERVICES.recommendation,
  });

  return res.data;
}
