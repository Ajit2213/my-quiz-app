import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './Question';
import Score from './Score';
import './QuizApp.css'; // Import the CSS file

const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchdata() {
      try {
        const response = await axios.get('http://localhost:5000/api/data');
        if (response.status === 200 && response.data && response.data.questions) {
          setQuestions(response.data.questions);
        } else {
          console.error('Unexpected response format or status:', response);
        }
      } catch (error) {
        console.error('Failed to fetch quiz data:', error);
      }
    }
    fetchdata();
  }, []);

  const handleOptionClick = (selectedOption) => {
    if (!submitted) {
      const newSelectedAnswers = [...selectedAnswers];
      newSelectedAnswers[currentQuestionIndex] = selectedOption;
      setSelectedAnswers(newSelectedAnswers);
    }
  };

  const handleNextClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    let newScore = 0;
    selectedAnswers.forEach((answer, index) => {
      const correctOption = questions[index].options.find(option => option.is_correct);
      if (correctOption && answer === correctOption.description) {
        newScore++;
      }
    });
    setScore(newScore);
    setShowScore(true);
    setSubmitted(true);
  };

  const handleCheckAnswers = () => {
    setShowAnswers(true);
  };

  return (
    <div className="quiz-container">
      <h1>Quiz Application</h1>

      {questions.length > 0 ? (
        showScore ? (
          <Score score={score} totalQuestions={questions.length} showAnswers={showAnswers} handleCheckAnswers={handleCheckAnswers} questions={questions} />
        ) : (
          <Question 
            question={questions[currentQuestionIndex]} 
            currentQuestionIndex={currentQuestionIndex} 
            handleOptionClick={handleOptionClick} 
            selectedAnswers={selectedAnswers} 
            handleNextClick={handleNextClick} 
            handlePreviousClick={handlePreviousClick} 
            handleSubmit={handleSubmit}
            totalQuestions={questions.length}
          />
        )
      ) : (
        <div>Loading questions...</div>
      )}
    </div>
  );
};

export default QuizApp;
