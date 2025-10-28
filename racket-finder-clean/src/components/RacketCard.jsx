// src/components/RacketCard.jsx
import React from "react";

function RacketCard({ racket, isFavorite, onFavoriteClick, onSelect }) {
  return (
    <div
      className="racket-card"
      onClick={() => onSelect(racket)}
      style={{ position: "relative", display: "inline-block", margin: 10, textAlign: "center", cursor: "pointer" }}
    >
      {/* Heart icon in the top-right corner */}
      <button
        type="button"
        className={`heart-button ${isFavorite ? "favorited" : ""}`}
        onClick={(e) => {
          e.stopPropagation(); // don’t trigger image click
          onFavoriteClick(racket);
        }}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          background: "transparent",
          border: "none",
          fontSize: 24,
          cursor: "pointer",
        }}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      {/* Image */}
      <img
        className="racket-image"
        src={`http://localhost:8000/images/${racket.image}`}
        alt={racket.name}
        style={{ width: "350px", height: "200px", objectFit: "contain" }}
      />

      {/* Optional info */}
      <div className="racket-info" style={{ marginTop: 6, fontSize: 14 }}>
        <p>{racket.name}</p>
        <p style={{ color: "gray" }}>{racket.price}</p>
      </div>
    </div>
  );
}

export default RacketCard;
