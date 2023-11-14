import { createSlice } from "@reduxjs/toolkit";

// Change these to your own questions!
const questions = [
  {
    id: 1,
    questionText: "How do orangutans build their nests in the treetops?",
    options: ["They order treehouse kits online", "Meticulously weaving branches together", "Hire a team of monkey architects"],
    correctAnswerIndex: 1
  },
  {
    id: 2,
    questionText:
      "Howler monkeys are often heard in the jungle. What's the primary reason for their vocal performances?",
    options: [" Morning choir practice", "Communicating with distant relatives", "Expressing their love for jungle karaoke nights"],
    correctAnswerIndex: 1
  },
  {
    id: 3,
    questionText:
      "Which bird, known for its vibrant plumage, is often considered the 'king of the jungle'?",
    options: ["Parrot", "Toucan", "Peacock", ""],
    correctAnswerIndex: 1
  },
  {
    id: 4,
    questionText:
      "What technique do jaguars often use when hunting in the jungle?",
    options: ["Stalking and ambush", "Loud roars to scare prey", "Attracts prey with sound"],
    correctAnswerIndex: 0
  },
  {
    id: 5,
    questionText:
      "Gorillas are known for living in close-knit social groups. What is the term commonly used to describe these family units?",
    options: ["A Congregation", "A Troop", "A Band"],
    correctAnswerIndex: 1
  },
  {
    id: 5,
    questionText:
      "What colorful bird, often associated with Nicaragua, is known for its vibrant plumage and is the national bird of the country?",
    options: ["Keel-billed Toucan", "Scarlet Macaw", "Turquoise-browed motmot"],
    correctAnswerIndex: 2
  },
  {
    id: 6,
    questionText:
      "What does gorillas mainly eat?",
    options: ["Meat from smaller monkeys", "Plantbased-diet", "Bamboo"],
    correctAnswerIndex: 1
  }
];

const initialState = {
  questions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false
};

export const quiz = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    /**
     * Use this action when a user selects an answer to the question.
     * The answer will be stored in the `quiz.answers` state with the
     * following values:
     *
     *    questionId  - The id of the question being answered.
     *    answerIndex - The index of the selected answer from the question's options.
     *    question    - A copy of the entire question object, to make it easier to show
     *                  details about the question in your UI.
     *    answer      - The answer string.
     *    isCorrect   - true/false if the answer was the one which the question says is correct.
     *
     * When dispatching this action, you should pass an object as the payload with `questionId`
     * and `answerIndex` keys. See the readme for more details.
     */
    submitAnswer: (state, action) => {
      const { questionId, answerIndex } = action.payload;
      const question = state.questions.find((q) => q.id === questionId);

      if (!question) {
        throw new Error(
          "Could not find question! Check to make sure you are passing the question id correctly."
        );
      }

      if (question.options[answerIndex] === undefined) {
        throw new Error(
          `You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`
        );
      }

      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex
      });
    },

    /**
     * Use this action to progress the quiz to the next question. If there's
     * no more questions (the user was on the final question), set `quizOver`
     * to `true`.
     *
     * This action does not require a payload.
     */
    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.quizOver = true;
      } else {
        state.currentQuestionIndex += 1;
      }
    },

    /**
     * Use this action to reset the state to the initial state the page had
     * when it was loaded. Who doesn't like re-doing a quiz when you know the
     * answers?!
     *
     * This action does not require a payload.
     */
    restart: () => {
      return initialState;
    }
  }
});
