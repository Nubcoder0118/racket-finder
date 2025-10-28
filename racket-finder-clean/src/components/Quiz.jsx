// src/components/Quiz.jsx
import React from "react";
import Flashcard from "./Flashcard";

function Quiz({ flashcards, answers, currentStep, setAnswers, setCurrentStep }) {
  const currentCard = flashcards.find((c) => c.id === currentStep);

  if (!currentCard) return null; // safety guard

  const handleSelect = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <div className="flashcards-container">
      <Flashcard
        question={currentCard.question}
        answers={currentCard.answers}
        selected={answers[currentCard.id]}
        onSelect={(answer) => handleSelect(currentCard.id, answer)}
      />
    </div>
  );
}

export default Quiz;
