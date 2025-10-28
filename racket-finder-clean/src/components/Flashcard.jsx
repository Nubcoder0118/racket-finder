function Flashcard({ question, answers, selected, onSelect }) {
  return (
    <div className="flashcard">
      <h2>{question}</h2>
      <div className="answers">
        {answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onSelect(answer)}
            className={selected === answer ? "selected" : ""}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}
export default Flashcard;
