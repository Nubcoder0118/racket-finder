// src/Comparison.js
import React from "react";

const Comparison = ({ equipment, selectedRacket1, selectedRacket2 }) => {
  if (!equipment || !equipment.rackets) return null;

  // helper function to find racket data by name
  const getRacket = (name) =>
    equipment.rackets.find((r) => r.name === name) || null;

  const racket1 = getRacket(selectedRacket1);
  const racket2 = getRacket(selectedRacket2);

  return (
    <div>
      <h2>🏸 Compare Rackets</h2>

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
