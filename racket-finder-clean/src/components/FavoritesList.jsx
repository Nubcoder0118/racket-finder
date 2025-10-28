// src/components/FavoritesList.jsx
import React from "react";

function FavoritesList({ favorites }) {
  const favs = Array.isArray(favorites) ? favorites : [];

  if (favs.length === 0) {
    return (
      <div className="favorites" style={{ marginTop: 16 }}>
        <h3>Your favorite Rackets:</h3>
        <p>No favorites yet. Tap the heart on a racket to add it.</p>
      </div>
    );
  }

  return (
    <div className="favorites" style={{ marginTop: 16 }}>
      <h3>Your favorite Rackets:</h3>
      <ul>
        {favs.map((fav, i) => (
          <li key={i}>
            {fav?.name} {fav?.price ? `- ${fav.price}` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoritesList;
