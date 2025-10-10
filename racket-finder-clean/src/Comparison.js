import React, { useState } from "react";
const Comparison = ({ filteredRackets, selectedRacket1, selectedRacket2, onRacketClick }) => {
  const racket1 = filteredRackets.find(r => r.name === selectedRacket1);
  const racket2 = filteredRackets.find(r => r.name === selectedRacket2);

  return (
    <div>
      <h2>🏸 Compare Rackets</h2>

      <div className="results-container">
        {filteredRackets.map(racket => (
          <div
            key={racket.name}
            onClick={() => onRacketClick(racket)}
            style={{
              cursor: "pointer",
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              margin: "10px",
              display: "inline-block",
              textAlign: "center",
            }}
          >
            <img
              src={`http://localhost:8000/images/${racket.image}`}
              alt={racket.name}
              style={{ width: "180px", height: "100px", objectFit: "contain" }}
            />
            <p>{racket.name}</p>
            <p>{racket.price}</p>
          </div>
        ))}
      </div>

      {racket1 && racket2 ? (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Property</th>
              <th>{racket1.name}</th>
              <th>{racket2.name}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Brand</td>
              <td>{racket1.brand}</td>
              <td>{racket2.brand}</td>
            </tr>
            <tr>
              <td>Weight (g)</td>
              <td>{racket1.weight}</td>
              <td>{racket2.weight}</td>
            </tr>
            <tr>
              <td>Balance</td>
              <td>{racket1.balance}</td>
              <td>{racket2.balance}</td>
            </tr>
            <tr>
              <td>Material</td>
              <td>{racket1.material}</td>
              <td>{racket2.material}</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>{racket1.price}</td>
              <td>{racket2.price}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Select two rackets to compare.</p>
      )}
    </div>
  );
};

export default Comparison;
