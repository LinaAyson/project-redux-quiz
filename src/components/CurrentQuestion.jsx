import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { quiz } from "../reducers/quiz";
import "./CurrentQuestion.css";

export const CurrentQuestion = () => {
  const dispatch = useDispatch();
  const question = useSelector(
    (state) => state.quiz.questions[state.quiz.currentQuestionIndex]
  );

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>;
  }

  const handleAnswerClick = (index) => {
    // Dispatch the submitAnswer action
    dispatch(
      quiz.actions.submitAnswer({
        questionId: question.id,
        answerIndex: index,
      })
    );

    // Dispatch the goToNextQuestion action after a delay (for visualization)
    setTimeout(() => {
      dispatch(quiz.actions.goToNextQuestion());
    }, 2000); // Adjust the delay as needed
  };

  const selectedAnswerIndex = useSelector(
    (state) =>
      state.quiz.answers.find((answer) => answer.questionId === question.id)
        ?.answerIndex
  );

  const isCorrect =
    selectedAnswerIndex !== undefined &&
    selectedAnswerIndex === question.correctAnswerIndex;

  return (
    <div className="main-container">
      <p className="header"> Jungle quiz </p>
      <div className="question">
        <h1>Question: {question.questionText}</h1>
      </div>
      <div className="answer">
        <p>Answer:</p>
        <ul>
          {question.options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleAnswerClick(index)}
              className={`answer-option ${
                selectedAnswerIndex === index && isCorrect
                  ? "correct selected"
                  : ""
              } ${
                selectedAnswerIndex === index && !isCorrect
                  ? "wrong selected"
                  : ""
              } ${
                selectedAnswerIndex !== undefined &&
                selectedAnswerIndex !== index &&
                index === question.correctAnswerIndex
                  ? "correct correct-selected"
                  : ""
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
        {selectedAnswerIndex !== undefined && (
          <p className={isCorrect ? "correct-answer" : "wrong-answer"}></p>
        )}
      </div>
    </div>
  );
};
