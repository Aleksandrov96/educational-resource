import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ScrollToTop from 'react-scroll-to-top';
import { getFunctions, httpsCallable } from 'firebase/functions';
import Header from '@/components/common/Header/Header';
import ToasterContainer from '@/components/common/ToasterContainer/ToasterContainer';
import Loader from '@/components/common/Loader/Loader';
import Button from '@/components/common/Button/Button';
import useFetchQuiz from './hook/useFetchQuiz';
import Pagination from './components/Pagination/Pagination';
import { ICurrentQuestion } from '@/interfaces/ICurrentQuestion';
import { IAnswer } from '@/interfaces/IAnswer';
import Options from './components/Options';
import QuizResult from './components/QuizResult';
import AnswerModeTooltip from './components/AnswerModeTooltip';
import setToastError from '@/utils/setToastError';
import './quizPage.scss';

function QuizPage() {
  const { testId } = useParams();
  const { test, loading } = useFetchQuiz(testId);

  const functions = getFunctions();
  const onSendResult = httpsCallable(functions, 'onSendResult');

  const [currentQuestion, setCurrentQuestion] = useState<ICurrentQuestion>({ questionIndex: 0 });

  const [selectedAnswersIDs, setSelectedAnswersIDs] = useState<string[]>();
  const [answers, setAnswers] = useState<IAnswer[]>([]);

  const [showScore, setShowScore] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const handleSingleAnswer = (selectedAnswerId: string, questionIndex: number) => {
    const newAnswer = {
      selectedAnswerId,
      questionIndex,
    };

    if (test?.questions[currentQuestion.questionIndex].isMultipleAnswer === true) {
      const newState = answers.filter((answer) => answer.selectedAnswerId !== selectedAnswerId);
      const isToggleAnswer = answers.some((answer) => answer.selectedAnswerId === selectedAnswerId);

      if (isToggleAnswer) {
        setAnswers([...newState]);
      } else {
        setAnswers([...newState, newAnswer]);
      }
    } else {
      const newState = answers.filter((answer) => answer.questionIndex !== questionIndex);
      setAnswers([...newState, newAnswer]);
    }
  };

  const navigateQuestions = (id: string, questionIndex: number): void => {
    setCurrentQuestion({ id, questionIndex });
  };

  useEffect(() => {
    const answersIDs = answers.map((answer) => answer.selectedAnswerId);
    setSelectedAnswersIDs(answersIDs);
  }, [answers]);

  const sendResult = async () => {
    const data = {
      testId,
      answers,
    };

    setShowScore(true);
    onSendResult(data)
      .then((value) => setScore(value.data as number))
      .catch((error: Error) => setToastError(error.message));
  };

  return (
    <div>
      <Header />
      <div className="quizPage">
        <div className="quizPage__content">
          <div className="quizPage__content-description">
            <h2 className="quizPage__content-description--text">{test?.description}</h2>
          </div>
          {showScore
            ? <QuizResult score={score} />
            : (
              <div>
                <div className="quizPage__content-quiz">
                  {loading
                    ? <Loader />
                    : (
                      <div className="wrapper">
                        <div className="question">
                          <div className="question__description">
                            {test?.questions[currentQuestion.questionIndex].description}
                          </div>
                          {
                            test?.questions[currentQuestion.questionIndex].isMultipleAnswer === true
                            && <AnswerModeTooltip />
                          }
                        </div>
                        <Options
                          test={test}
                          currentQuestion={currentQuestion}
                          selectedAnswersIDs={selectedAnswersIDs}
                          handleAnswer={handleSingleAnswer}
                        />
                      </div>
                    )}
                </div>
                <div className="quizPage__content-pagination">
                  {
                    test?.questions.length as number - 1 === currentQuestion.questionIndex
                      && (
                      <Button
                        text="SEND RESULT"
                        className="quizPage__content-pagination--btn"
                        disabled={answers.length === 0}
                        onClick={sendResult}
                      />
                      )
                  }
                  <Pagination
                    test={test}
                    currentQuestion={currentQuestion}
                    navigateQuestions={navigateQuestions}
                  />
                </div>
              </div>
            )}
        </div>
      </div>
      <ScrollToTop
        smooth
        color="#18AEEF"
      />
      <ToasterContainer />
    </div>
  );
}

export default QuizPage;
