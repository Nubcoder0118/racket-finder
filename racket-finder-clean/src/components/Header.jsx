// src/components/Header.jsx
import React from "react";


function Header({ setView }) {
  return (
    <header className="header">
      <h1 className="title">Racket Finder</h1>
      <nav className="nav">
        <button onClick={() => setView("finder")} className="nav-link">
          Find your Racket
        </button>
        <button onClick={() => setView("comparison")} className="nav-link">
          Comparison Tool
        </button>
      </nav>
    </header>
  );
}

export default Header;
