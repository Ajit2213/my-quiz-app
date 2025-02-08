import React from 'react';

const Question = ({ question, currentQuestionIndex, handleOptionClick, selectedAnswers, handleNextClick, handlePreviousClick, handleSubmit, totalQuestions }) => {
  return (
    <div>
      <h2>{question.description}</h2>
      <ul>
        {question.options.map((option, index) => (
          <li 
            key={index} 
            onClick={() => handleOptionClick(option.description)} 
            className={selectedAnswers[currentQuestionIndex] === option.description ? 'selected' : ''}
          >
            {option.description}
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handlePreviousClick} disabled={currentQuestionIndex === 0}>Previous</button>
        {currentQuestionIndex < totalQuestions - 1 ? (
          <button onClick={handleNextClick}>Next</button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default Question;
