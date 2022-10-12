import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '@/components/common/Loader/Loader';

type Props = {
  score: number,
};

function QuizResult({ score }: Props) {
  return (
    <div>
      {!score
        ? <Loader />
        : (
          <div className="quizPage__content-score">
            {`You scored ${score}%`}
            <Link className="quizPage__content-score--link" to="/courses">Go back to courses</Link>
            <Link className="quizPage__content-score--link" to="/account">Go to your account</Link>
          </div>
        )}
    </div>

  );
}

export default QuizResult;
