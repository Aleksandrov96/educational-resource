import React from 'react';
import { DocumentData } from '@firebase/firestore';
import { v4 as uuidv } from 'uuid';
import { IQuestion } from '@/interfaces/IQuestion';
import './pagination.scss';

type Props = {
  test: DocumentData | undefined,
  currentQuestion: {
    id?: string,
    questionIndex: number,
  },
  navigateQuestions: (id: string, index: number) => void,
};

function Pagination({ test, currentQuestion, navigateQuestions }: Props) {
  return (
    <div className="pagination">
      {test?.questions?.map((question: IQuestion, i: number) => (
        <button
          type="button"
          className={currentQuestion.questionIndex === i ? 'pagination__btn-active' : 'pagination__btn'}
          key={uuidv()}
          onClick={() => navigateQuestions(question.id, i)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
