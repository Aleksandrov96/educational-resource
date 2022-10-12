import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

function AnswerModeTooltip() {
  return (
    <div className="question__answerMode">
      <div className="question__answerMode-icon">
        <FontAwesomeIcon icon={faExclamationCircle} />
      </div>
      Multiple Answer
    </div>
  );
}

export default AnswerModeTooltip;
