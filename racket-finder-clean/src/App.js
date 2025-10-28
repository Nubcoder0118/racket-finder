import { useState, useEffect } from 'react'
import './App.css';
import Comparison from "./Comparison";
import Header from './components/Header';
import Quiz from './components/Quiz';
import Flashcard from './components/Flashcard';
import RacketCard from './components/RacketCard';
import RacketResults from './components/RacketResults';


function App() {
  const flashcards = [
    {
      id:1, 
      question: "Are you a singles, doubles, or a singles/doubles player?",
      answers: ['Singles', 'Doubles', 'Singles/Doubles']
    },
    {
      id:2, 
      question: "What is the budget for your next racket?",
      answers: ['0-150cad', '151-269cad', '270+', ]
    },
    {
      id:3, 
      question: "What type of racket do you want? (Speed, Attack, Balance)",
      answers: ['Speed', 'Attack', 'Balance']
    },
  ]
 
  // local equipment.jsons data
  const [equipmentData, setEquipmentData] = useState(null);
  // qiuz answers
  const [answers, setAnswers] = useState({});
  
  // racket selected for comparison
  const [selectedRacket1, setSelectedRacket1] = useState(null);
  const [selectedRacket2, setSelectedRacket2] = useState(null);

  // current quiz step
  const [currentStep, setCurrentStep] = useState(1);

  // switch between finder & comparison views
  const [view, setView] = useState('finder');

  // favorites retreived from backend
  const [favorites, setFavorites] = useState([]);

  // load local racket data
  useEffect(() => {
    fetch('/equipment.json')
      .then(res => res.json())
      .then(data => setEquipmentData(data));
  }, []);

  // fetch favorites from backend (MONGODB)
  useEffect(() => {
    fetch("http://localhost:8000/api/rackets")
      .then(res => res.json())
      .then(data => setFavorites(data))
      .catch(err => console.log("error fetching favorites: ", err));
  }, []);

  if (!equipmentData) return <p>Loading...</p>;
  
  const allRackets = equipmentData.brands.flatMap(brand => brand.rackets);

  const filteredRackets = allRackets.filter((racket) => {
    const priceNumber = parseInt(racket.price.replace(/[^0-9]/g, ""));
    const playerTypeMatch = 
      !answers[1] || racket.playing_type.toLowerCase().includes(answers[1].toLowerCase()) ||
    (answers[1] === 'Singles/Doubles' && racket.playing_type.toLowerCase().includes('singles') && racket.playing_type.toLowerCase().includes('doubles'));
    const budgetMatch = 
      !answers[2] || 
      (answers[2] === "0-150cad" && priceNumber <= 150) ||
      (answers[2] === "151-269cad" && priceNumber <= 269 && priceNumber >= 151) ||
      (answers[2] === "270+" && priceNumber >= 270);
    const styleMatch = 
      !answers[3] || racket.racket_style.toLowerCase() === answers[3].toLowerCase();

    return playerTypeMatch && budgetMatch && styleMatch;
  });

  const getImageSrc = (image) => {
    if (image.startsWith('http')) {
      return image;
    }
    return `http://localhost:8000/images/${image}`;
  };

  const saveFavorite = async (racket) => {
  // prevent duplicate saves
  const alreadyFav = Array.isArray(favorites) && favorites.some(fav => fav.name === racket.name);
  if (alreadyFav) return;

  try {
    const response = await fetch("http://localhost:8000/api/rackets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(racket),
    });

    // Get the saved racket from MongoDB
    const saved = await response.json();

    // Update favorites with the saved racket object
    setFavorites((prev) => {
      const currentFavorites = Array.isArray(prev) ? prev : [];
      const newFavorites = [...currentFavorites, saved];
      console.log("Updated favorites:", newFavorites); // 🧠 debug line
      return newFavorites;
    });
  } catch (err) {
    console.log("Error saving racket:", err);
  }
};

  const removeFavorite = async (racketName) => {
    try {
      const encodedName = encodeURIComponent(racketName);
      const response = await fetch(`http://localhost:8000/api/rackets/${encodedName}`, {
      method: "DELETE",
      });
      if (!response.ok) {
        console.error('failed to delete favorite');
        return;
      }
      setFavorites((prev) => prev.filter((fav) => fav.name !== racketName));
      console.log(`Removed ${racketName} from favorites`);
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };
  const handleSelect = (questionId, answer) => {
    setAnswers(prev => ({...prev, [questionId]: answer}));
    setCurrentStep(prev => prev + 1);
    
  };

  const handleRacketClick = (racket) => {
  if (!selectedRacket1) {
    setSelectedRacket1(racket.name);
  } else if (!selectedRacket2) {
    setSelectedRacket2(racket.name);
  } else {
    // Reset selection if both are already picked
    setSelectedRacket1(racket.name);
    setSelectedRacket2(null);
  }
  };

  const clickHandler = (racket) => {
    saveFavorite(racket);
    if (!selectedRacket1) {
      setSelectedRacket1(racket.name);
    } else if (!selectedRacket2) {
    setSelectedRacket2(racket.name);
  } else {
    // optional: reset or replace one racket
    setSelectedRacket1(racket.name);
    setSelectedRacket2(null);
  }

  };

  return (
    <> 
      <Header setView={setView} />
      {view === 'finder' && (
        <div className="flashcards-container">
        {currentStep <= flashcards.length ? (
          <Quiz 
            flashcards={flashcards}
            answers={answers}
            currentStep={currentStep}
            setAnswers={setAnswers}
            setCurrentStep={setCurrentStep}
          />
        
        ) : (
          <div className="results">
            <h2>🎉 You finished!</h2>
            <p>Your answers:</p>
            <ul>
              {Object.entries(answers).map(([qId, ans]) => (
                <li key={qId}>
                  Question {qId}: {ans}
                </li>
              ))}
            </ul>

            <h3>Recommended Rackets:</h3>
            <div className = "results-container">
              {filteredRackets.map((racket, index) => {
    const isFavorite = Array.isArray(favorites) && favorites.some(fav => fav.name === racket.name);

    return (
      <div
        key={index}
        className="racket-card"
        style={{
          position: "relative",
          margin: "10px",
          textAlign: "center",
        }}
      >
        {/* ❤️ Heart Button */}
        <button
          className={`heart-button ${isFavorite ? "favorited" : ""}`}
          onClick={(e) => {
            e.stopPropagation(); // prevent triggering clickHandler
            if (isFavorite) {
              removeFavorite(racket.name);
            } else {
              saveFavorite(racket);
            }
          }}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            background: "transparent",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            color: isFavorite ? "red" : "gray",
            transition: "color 0.2s ease",
          }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>

        {/* Image click still works for selection */}
        <img
          className="racket-image"
          src={`http://localhost:8000/images/${racket.image}`}
          alt={racket.name}
          style={{ width: "350px", height: "200px", objectFit: "contain", cursor: "pointer" }}
          onClick={() => clickHandler(racket)}
        />
        </div>
      );
    })}
        </div>    
            <div className = "favorites">
              <h3>Your favorite Rackets: </h3>
              <ul>
                {Array.isArray(favorites) && favorites.map((fav, i) => (
                  <li key = {i}>{fav.name} - {fav.price}</li>
                )) }
              </ul>
            </div>
            </div>
        )}
      </div>
    )}

    {view === 'comparison' && (
      <Comparison 
        filteredRackets={filteredRackets}
        selectedRacket1={selectedRacket1}
        selectedRacket2={selectedRacket2}
        onRacketClick={handleRacketClick}
      />
    )}
        </>
    );
}

export default App
