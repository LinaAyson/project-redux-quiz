import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { quiz } from "../reducers/quiz";
import "./CurrentQuestion.css";

export const CurrentQuestion = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.quiz);

  const question = state.questions[state.currentQuestionIndex];
  const [quizOver, setQuizOver] = useState(false);

  useEffect(() => {
    if (
      state.quizOver &&
      state.currentQuestionIndex === state.questions.length - 1
    ) {
      setQuizOver(true);
    }
  }, [state.quizOver, state.currentQuestionIndex, state.questions.length]);

  const handleAnswerClick = (index) => {
    dispatch(
      quiz.actions.submitAnswer({
        questionId: question.id,
        answerIndex: index,
      })
    );

    setTimeout(() => {
      dispatch(quiz.actions.goToNextQuestion());
    }, 1000);
  };

  const restartQuiz = () => {
    dispatch(quiz.actions.restart());
    setQuizOver(false);
  };

  const selectedAnswerIndex = state.answers.find(
    (answer) => answer.questionId === question.id
  )?.answerIndex;

  const isCorrect =
    selectedAnswerIndex !== undefined &&
    selectedAnswerIndex === question.correctAnswerIndex;

  return (
    <div className="main-container">
      <p className="header"> Jungle quiz </p>
      {quizOver ? (
        // Display quiz summary if the quiz is over
        <div className="question-summary">
          <h2>Quiz Summary</h2>
          <div className="answers">
            <p className="question-correct">
              Correct Answers:{" "}
              {state.answers.filter((answer) => answer.isCorrect).length} out of
              7
            </p>
          </div>
          {/* Restart button */}
          <div className="restart-btn">
            <button onClick={restartQuiz}>Restart Quiz</button>
          </div>
        </div>
      ) : (
        // Display the current question if the quiz is not over
        <>
          <div className="question-state">
            <h2>{`Question ${state.currentQuestionIndex + 1} / ${
              state.questions.length
            }`}</h2>
          </div>
          <div className="question">
            <h1>{question.questionText}</h1>
          </div>{" "}
          <h2 className="">Answer:</h2>
          <div className="answer">
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
          {/* Conditionally render the YouTube video */}
          {question.videoUrl && (
            <div className="youtube-video">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/RA2wWjhHPwU?si=iy6B6SQuo18gtRAL"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          )}
          <div className="question-image">
            {question.image && (
              <img
                src={question.image}
                className="question-image-img"
                alt={`Question ${question.id}`}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};
