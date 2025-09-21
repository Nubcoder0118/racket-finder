import { useState, useEffect } from 'react'
import './App.css'

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

  const [equipmentData, setEquipmentData] = useState(null);
  const [answers, setAnswers] = useState({});

  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    fetch('/equipment.json')
      .then(res => res.json())
      .then(data => setEquipmentData(data));
  }, []);

  if (!equipmentData) return <p>Loading...</p>;
  
  const allRackets = equipmentData.brands.flatMap(brand => brand.rackets)

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

  const handleSelect = (questionId, answer) => {
    setAnswers(prev => ({...prev, [questionId]: answer}));
    setCurrentStep(prev => prev + 1);
    
  };
  console.log("answers: ", answers);
  console.log("filteredRackets: ", filteredRackets);

  return (
    <>
      <div className = "header">
        <h1 className = "title">Racket Finder</h1>
        <nav>
          <a className = "mainpage" href = "#">Find your Racket</a>
          <a className = "comparison"href = "#">Comparison Tool</a>
        </nav>
      </div>
      <div className="flashcards-container">
    {currentStep <= flashcards.length ? (
      flashcards
        .filter(card => card.id === currentStep)
        .map(card => (
          <div key={card.id} className="flashcard">
            <h2>{card.question}</h2>
            <div className="answers">
              {card.answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(card.id, answer)}
                  className={answers[card.id] === answer ? "selected" : ""}
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
        ))
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
        <ul>
          {filteredRackets.map((racket, index) => (
            <li key={index}>
              {racket.name} — {racket.price}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
    </>
    );
}

export default App
