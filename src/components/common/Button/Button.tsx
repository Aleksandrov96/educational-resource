import React from 'react';

const defaultProps = {
  disabled: false,
};

type Props = {
  onClick: () => void,
  className: string,
  text: string
  disabled?: boolean,
};

function Button({
  onClick, className, text, disabled = false,
}: Props) {
  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

Button.defaultProps = defaultProps;

export default Button;
