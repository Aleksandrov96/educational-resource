import React from 'react';
import { UseFormRegister } from 'react-hook-form';

type Props = {
  register: UseFormRegister<Record<string, any>>;
  nestIndex: number,
  optionIndex: number,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  checked: string,
};

function SingleAnswerCheckbox({
  register, nestIndex, optionIndex, handleChange, checked,
}: Props): JSX.Element {
  return (
    <div>
      {checked
        ? (
          <input
            {...register(`questions.${nestIndex}.options.${optionIndex}.isCorrect` as const, {
              required: false,
            })}
            type="checkbox"
            onChange={(e) => handleChange(e)}
            checked={`questions.${nestIndex}.options.${optionIndex}.isCorrect` === checked}
          />
        )
        : (
          <input
            {...register(`questions.${nestIndex}.options.${optionIndex}.isCorrect` as const, {
              required: false,
            })}
            type="checkbox"
            onChange={(e) => handleChange(e)}
          />
        )}
    </div>

  );
}

export default SingleAnswerCheckbox;
