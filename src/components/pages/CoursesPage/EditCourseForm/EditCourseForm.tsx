/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React from 'react';
import { useForm } from 'react-hook-form';
import './editForm.scss';

type FormValues = {
  name: string
};

function EditCourseForm({ onSubmit }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="editForm">
      <label>
        <div className="editForm__error">
          <p className="editForm__error-text">
            {errors.name && 'Course name is required'}
          </p>
        </div>
        <input
          {...register('name', { required: true })}
          type="text"
          placeholder="Enter course name..."
          className="editForm__input"
        />
        <button
          disabled={!isValid}
          type="submit"
          className="editForm__btn"
        >
          SAVE
        </button>
      </label>
    </form>
  );
}

export default EditCourseForm;
