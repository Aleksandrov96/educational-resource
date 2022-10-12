import React, { useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase.config';
import setToastSuccess from '@/utils/setToastSuccess';
import setToastError from '@/utils/setToastError';
import { IFormValues } from '@/interfaces/IFormValues';
import './signUpPage.scss';

function SignUpPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IFormValues>({
    mode: 'onChange',
  });

  const pass = useRef({});
  pass.current = watch('password', '');

  const onSubmit: SubmitHandler<IFormValues> = async ({ email, password }): Promise<void> => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setToastSuccess('Registration completed successful. Sign in to your account');
        navigate('/');
      })
      .catch((error: Error) => setToastError(error.message));
  };

  return (
    <div>
      <div className="signUpPage">
        <form className="signUpForm" onSubmit={handleSubmit(onSubmit)}>
          <label>
            <div className="formInput__text">
              <p className="labelText">Email: </p>
              <p className="validationError">
                {errors.email && 'Email is required'}
              </p>
            </div>
            <input
              type="email"
              placeholder="Enter your email..."
              {...register('email', { required: true })}
              className="formInput"
            />
          </label>
          <label>
            <div className="formInput__text">
              <p className="labelText">Password: </p>
              <p className="validationError">
                {errors.password && 'Password should be at least 6 characters long'}
              </p>
            </div>
            <input
              type="password"
              placeholder="Enter your password..."
              {...register('password', { required: true, minLength: 6 })}
              className="formInput"
            />
          </label>
          <label>
            <div className="formInput__text">
              <p className="labelText">Confirm password: </p>
              <p className="validationError">
                {errors.password_confirm && errors.password_confirm.message}
              </p>
            </div>
            <input
              type="password"
              placeholder="Confirm password..."
              {...register('password_confirm', { required: true, validate: { validate: (value) => value === pass.current || 'Password do not match' } })}
              className="formInput"
            />
          </label>
          <button
            className="submitBtn"
            type="submit"
            disabled={!isValid}
          >
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
