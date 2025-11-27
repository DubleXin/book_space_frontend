import { useEffect, useState } from "react";
import {
  fetchAlgorithmicRecommendations,
  fetchEnhancedRecommendations,
} from "../api/recommendation";
import type {
  AlgorithmicRecommendation,
  EnhancedRecommendationData,
} from "../types/recommendation";

export default function RecommendationTestPage() {
  const [algo, setAlgo] = useState<AlgorithmicRecommendation[]>([]);
  const [enhanced, setEnhanced] = useState<EnhancedRecommendationData | null>(
    null
  );

  useEffect(() => {
    fetchAlgorithmicRecommendations().then((res) => {
      setAlgo(res.data);
    });

    fetchEnhancedRecommendations().then((res) => {
      setEnhanced(res.data);
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Recommendation Test Page</h1>
      <section>
        <h2>Algorithmic Recommendations</h2>
        {algo.length === 0 && <p>No algorithmic recs</p>}
        <ul>
          {algo.map((rec) => (
            <li key={rec.id}>
              Book #{rec.bookId} — score: {rec.score} — reason: {rec.reason}
            </li>
          ))}
        </ul>
      </section>
      <section style={{ marginTop: 40 }}>
        <h2>Enhanced Recommendations</h2>

        {enhanced === null && <p>Loading enhanced...</p>}

        {enhanced && (
          <>
            <h3>Recommended Books</h3>
            <ul>
              {enhanced.recommendedBooks.map((rec) => (
                <li key={rec.id}>
                  Book #{rec.bookId} — "{rec.reason}"
                </li>
              ))}
            </ul>

            <h3>AI Highlights</h3>
            <ul>
              {enhanced.aiHighlights.map((h) => (
                <li key={h.id}>
                  Book #{h.bookId}: {h.reason.slice(0, 60)}...
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </div>
  );
}
