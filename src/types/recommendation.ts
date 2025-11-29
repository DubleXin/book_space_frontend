export interface AlgorithmicRecommendation {
  id: number;
  userId: number;
  bookId: number;
  reason: string;
  score: number;
  generatedAt: string;
}

export interface AlgorithmicRecommendationResponse {
  success: boolean;
  cached: boolean;
  data: AlgorithmicRecommendation[];
  message: string;
}

export interface EnhancedRecommendationItem {
  id: number;
  userId: number;
  bookId: number;
  reason: string;
  score: number;
  generatedAt: string;
}

export interface AIHighlight {
  id: number;
  bookId: number;
  reason: string;
  generatedAt: string;
  expiresAt: string;
}

export interface EnhancedRecommendationData {
  recommendedBooks: EnhancedRecommendationItem[];
  aiHighlights: AIHighlight[];
}

export interface EnhancedRecommendationResponse {
  success: boolean;
  cachedAlgorithmic: boolean;
  data: EnhancedRecommendationData;
}
