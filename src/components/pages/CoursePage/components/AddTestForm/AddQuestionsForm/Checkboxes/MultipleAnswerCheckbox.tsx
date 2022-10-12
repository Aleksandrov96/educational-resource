import React from 'react';
import { UseFormRegister } from 'react-hook-form';

type Props = {
  register: UseFormRegister<Record<string, any>>;
  nestIndex: number,
  optionIndex: number,
};

function MultipleAnswerCheckbox({ register, nestIndex, optionIndex }: Props): JSX.Element {
  return (
    <input
      {...register(`questions.${nestIndex}.options.${optionIndex}.isCorrect` as const, {
        required: false,
      })}
      type="checkbox"
    />
  );
}

export default MultipleAnswerCheckbox;
