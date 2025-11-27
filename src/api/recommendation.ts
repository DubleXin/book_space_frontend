import type {
  AlgorithmicRecommendationResponse,
  EnhancedRecommendationResponse,
} from "../types/recommendation";

import api from "./client";

export async function fetchAlgorithmicRecommendations() {
  const res = await api.get<AlgorithmicRecommendationResponse>(
    "/recommendation/algorithmic"
  );
  return res.data;
}

export async function fetchEnhancedRecommendations() {
  const res = await api.get<EnhancedRecommendationResponse>(
    "/recommendation/enhanced"
  );
  return res.data;
}
