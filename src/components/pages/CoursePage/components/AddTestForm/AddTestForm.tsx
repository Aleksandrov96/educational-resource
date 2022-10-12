import React, { useEffect, useState } from 'react';
import {
  useForm, useFieldArray, FormProvider,
} from 'react-hook-form';
import { v4 as uuidv } from 'uuid';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  addDoc, updateDoc, collection, doc,
} from '@firebase/firestore';
import { db } from '@/firebase.config';
import useFetchTests from '../../hooks/useFetchTests';
import setToastError from '@/utils/setToastError';
import setToastSuccess from '@/utils/setToastSuccess';
import Button from '@/components/common/Button/Button';
import AddQuestionsForm from './AddQuestionsForm/AddQuestionsForm';
import useFetchTest from './hooks/useFetchTest';
import { ITestFormValues } from '@/interfaces/ITestFormValues';
import { ICurrentTestIdFromHistory } from '@/interfaces/ICurrentTestIdFromHistory';
import './addTestForm.scss';

type Props = {
  courseId: string,
};

function AddTestForm({ courseId }: Props) {
  const { testsIDs, getTests } = useFetchTests(courseId);
  const [currentTestId, setCurrentTestId] = useState<string>('');

  const navigate = useNavigate();

  const location = useLocation();
  const { state } = location;

  const { test } = useFetchTest(currentTestId);

  useEffect(() => {
    const isId = (obj: unknown): obj is ICurrentTestIdFromHistory => (
      typeof obj === 'object' && obj !== null && 'id' in obj
    );
    if (isId(state)) {
      setCurrentTestId(state.id);
    }
    return () => {
      setCurrentTestId('');
    };
  }, [state]);

  const methods = useForm<ITestFormValues>({
    mode: 'onChange',
    defaultValues: test,
  });

  useEffect(() => {
    methods.reset(test);
  }, [methods, test]);

  const {
    fields: questionsFields, append, remove,
  } = useFieldArray({
    control: methods.control,
    name: 'questions',
  });

  const onTestAdd = async (data: ITestFormValues): Promise<void> => {
    const testId: string = uuidv();
    const IDs: string[] = [testId];

    await addDoc(collection(db, 'tests'), {
      name: data.name,
      description: data.description,
      testId,
      courseId,
      questions: data.questions,
    })
      .then(() => {
        const courseDoc = doc(db, 'courses', courseId);
        updateDoc(courseDoc, { testsIDs: testsIDs?.concat(IDs) })
          .then(() => getTests())
          .then(() => setToastSuccess('Test successfuly added!'))
          .catch((error: Error) => setToastError(error.message));
      })
      .catch((error: Error) => setToastError(error.message));
    methods.reset();
    navigate(`/courses/${courseId}`);
  };

  const onTestUpdate = async (data: ITestFormValues): Promise<void> => {
    const testDoc = doc(db, 'tests', currentTestId);
    await updateDoc(testDoc, {
      name: data.name,
      description: data.description,
      questions: data.questions,
    })
      .then(() => getTests())
      .then(() => setToastSuccess('Test successfuly updated!'))
      .catch((error: Error) => setToastError(error.message));
    methods.reset();
    navigate(`/courses/${courseId}`);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(currentTestId ? onTestUpdate : onTestAdd)} className="form">
        <label>
          <h2 className="form__title">ADD TEST</h2>
          <div className="form__error">
            <p className="form__error-text">
              {methods.formState.errors.name && 'Test name is required'}
            </p>
          </div>
          <input
            {...methods.register('name', { required: true })}
            type="text"
            placeholder="Enter test name..."
            className="form__input"
          />
          <div className="form__error">
            <p className="form__error-text">
              {methods.formState.errors.description && 'Test description is required'}
            </p>
          </div>
          <textarea
            {...methods.register('description', { required: true })}
            placeholder="Enter test description..."
            className="form__textarea"
          />
          {questionsFields.map((field, i) => (
            <div className="form__questions" key={field.id}>
              <Button
                className="form__questions-remove"
                text="&#10005;"
                onClick={() => remove(i)}
              />
              <AddQuestionsForm
                nestIndex={i}
              />
            </div>
          ))}
          <Button
            onClick={() => append({ id: uuidv(), isMultipleAnswer: false })}
            text="ADD QUESTION"
            className="form__addOption"
          />
          <button
            disabled={!methods.formState.isValid}
            type="submit"
            className="form__btn"
          >
            SAVE
          </button>
        </label>
      </form>
    </FormProvider>
  );
}

export default AddTestForm;
