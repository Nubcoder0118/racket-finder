// src/components/RacketResults.jsx
import React from "react";
import RacketCard from "./RacketCard"; // assumes you already have this

function RacketResults({ answers, filteredRackets, favorites, onFavoriteClick, onSelect }) {
  // defensive: ensure favorites is always treated as an array
  const favs = Array.isArray(favorites) ? favorites : [];

  return (
    <div className="results">
      <h2>🎉 You finished!</h2>

      <p>Your answers:</p>
      <ul>
        {Object.entries(answers).map(([qId, ans]) => (
          <li key={qId}>Question {qId}: {ans}</li>
        ))}
      </ul>

      <h3>Recommended Rackets:</h3>

      <div className="results-container">
        {filteredRackets.map((racket, index) => {
          // robust favorite check
          const isFavorite =
            Array.isArray(favs) &&
            favs.some(fav => fav?.name?.trim?.() === racket?.name?.trim?.());

          return (
            <RacketCard
              key={index}
              racket={racket}
              isFavorite={isFavorite}
              onFavoriteClick={onFavoriteClick}
              onSelect={onSelect}
            />
          );
        })}
      </div>
    </div>
  );
}

export default RacketResults;
