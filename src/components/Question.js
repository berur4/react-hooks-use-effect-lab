import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // useEffect to manage the countdown
  useEffect(() => {
    // Set up the interval to decrease time remaining every second
    const timer = setTimeout(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 1) {
          // Reset the timer to 10 seconds and call onAnswered with false
          onAnswered(false);
          return 10;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup function to clear the timeout when the component is unmounted or when dependencies change
    return () => clearTimeout(timer);
  }, [timeRemaining, onAnswered]); // Re-run effect when timeRemaining changes

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // Reset time to 10 seconds
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
