import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import './adminButton.scss';

const defaultProps = {
  disabled: false,
};

type Props = {
  onClick: () => void,
  className: string,
  text: string
  disabled?: boolean,
};

function AdminButton({
  onClick, className, text, disabled = false,
}: Props) {
  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      <FontAwesomeIcon icon={faScrewdriverWrench} className="icon" />
      {text}
    </button>
  );
}

AdminButton.defaultProps = defaultProps;

export default AdminButton;
