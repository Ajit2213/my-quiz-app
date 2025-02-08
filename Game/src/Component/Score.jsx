import React from 'react';

const Score = ({ score, totalQuestions, showAnswers, handleCheckAnswers, questions }) => {
  return (
    <div>
      <h2>Your Score: {score} out of {totalQuestions}</h2>
      {!showAnswers && <button onClick={handleCheckAnswers}>Check Answers</button>}
      {showAnswers && (
        <div>
          {questions.map((question, index) => (
            <div key={index}>
              <h2>{question.description}</h2>
              <ul>
                {question.options.map((option, idx) => (
                  <li
                    key={idx}
                    className={option.is_correct ? 'correct' : ''}
                  >
                    {option.description}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Score;
