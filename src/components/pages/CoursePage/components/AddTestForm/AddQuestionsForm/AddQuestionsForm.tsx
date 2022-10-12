/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react';
import { useFieldArray, useFormContext, Controller } from 'react-hook-form';
import { v4 as uuidv } from 'uuid';
import Switch from '@mui/material/Switch';
import Button from '@/components/common/Button/Button';
import SingleAnswerCheckbox from './Checkboxes/SingleAnswerCheckbox';
import MultipleAnswerCheckbox from './Checkboxes/MultipleAnswerCheckbox';
import { IOption } from '@/interfaces/IOption';
import '../addTestForm.scss';

type QuestionsForm = {
  nestIndex: number,
};

function AddQuestionsForm({
  nestIndex,
}: QuestionsForm) {
  const {
    control, register, watch, setValue, formState: { errors },
  } = useFormContext();

  const [checked, setChecked] = useState<string>('');

  const { fields: optionsFields, append: appendOption, remove: removeOption } = useFieldArray({
    name: `questions[${nestIndex}].options`,
    control,
  });

  const isMultipleAnswer = watch(`questions.${nestIndex}.isMultipleAnswer`);
  const options = watch(`questions.${nestIndex}.options`);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, optionIndex: number):void => {
    if (e.target.checked) {
      const tempOptions = options;
      tempOptions.forEach((option: IOption, index: number) => {
        option.isCorrect = false;
        if (index === optionIndex) {
          option.isCorrect = true;
        }
      });
      setValue(`questions[${nestIndex}].options`, tempOptions);
      setChecked(e.target.name);
    } else {
      setChecked('');
    }
  };

  return (
    <label>
      <div className="form__error">
        <p className="form__error-text">
          {errors.questions?.[nestIndex].description && 'Question is required'}
        </p>
      </div>
      <div className="form__questionField">
        <textarea
          {...register(`questions.${nestIndex}.description`, { required: true })}
          placeholder="Enter question..."
          className="form__questionField-textarea"
        />
        <div className="form__questionField-switch">
          <p className="form__questionField-switch--text">
            {`Enabled ${isMultipleAnswer ? 'multiple' : 'single'} answer mode`}
          </p>
          <Controller
            name={`questions.${nestIndex}.isMultipleAnswer`}
            render={({ field }) => (
              <Switch
                {...field}
                checked={isMultipleAnswer || false}
              />
            )}
          />
        </div>
      </div>
      <div className="form__error">
        <p className="form__error-text">
          {optionsFields.length <= 1 ? 'Options is required' : ''}
        </p>
      </div>
      {optionsFields.map((field, optionIndex) => (
        <div key={field.id}>
          <div className="form__optionsField">
            <label className="form__optionsField-checkbox">
              {isMultipleAnswer
                ? (
                  <MultipleAnswerCheckbox
                    register={register}
                    nestIndex={nestIndex}
                    optionIndex={optionIndex}
                  />
                )
                : (
                  <SingleAnswerCheckbox
                    register={register}
                    nestIndex={nestIndex}
                    optionIndex={optionIndex}
                    checked={checked}
                    handleChange={(e) => handleChange(e, optionIndex)}
                  />
                )}
            </label>
            <input
              {...register(`questions.${nestIndex}.options.${optionIndex}.description` as const, {
                required: false,
              })}
              type="text"
              placeholder="Enter option..."
              className="form__optionsField-input"
            />
            <Button
              className="form__optionsField-delete"
              text="&#10005;"
              onClick={() => removeOption(optionIndex)}
            />
          </div>
        </div>
      ))}
      <Button
        disabled={optionsFields.length >= 10}
        className="form__addOption"
        onClick={() => appendOption({ description: '', isCorrect: false, id: uuidv() })}
        text="ADD OPTION"
      />
    </label>
  );
}

export default AddQuestionsForm;
