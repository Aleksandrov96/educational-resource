import React from 'react';
import { DocumentData } from '@firebase/firestore';
import { v4 as uuidv } from 'uuid';
import { ICurrentQuestion } from '@/interfaces/ICurrentQuestion';
import { IOption } from '@/interfaces/IOption';

type Props = {
  test: DocumentData | undefined,
  currentQuestion: ICurrentQuestion,
  selectedAnswersIDs: string[] | undefined,
  handleAnswer: (id: string, currentQuestionIndex: number) => void,
};
function Options({
  test, currentQuestion, selectedAnswersIDs, handleAnswer,
}: Props) {
  return (
    <div className="options">
      {test?.questions[currentQuestion.questionIndex].options.map(
        ({ description, id }: IOption) => (
          <button
            className={selectedAnswersIDs?.includes(id) ? 'options__option-active' : 'options__option'}
            key={uuidv()}
            type="button"
            onClick={
          () => handleAnswer(id, currentQuestion.questionIndex)
        }
          >
            {description}
          </button>
        ),
      )}
    </div>
  );
}

export default Options;
