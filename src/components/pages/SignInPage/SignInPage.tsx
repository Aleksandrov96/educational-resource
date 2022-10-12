import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import GoogleButton from 'react-google-button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import useSignInWithGoogle from './hook/useSignInWithGoogle';
import poster from '@/images/NIX_Screensaver.jpg';
import setToastSuccess from '@/utils/setToastSuccess';
import setToastError from '@/utils/setToastError';
import { auth } from '@/firebase.config';
import ToasterContainer from '@/components/common/ToasterContainer/ToasterContainer';
import { IFormValues } from '@/interfaces/IFormValues';
import './signInPage.scss';

function SignInPage() {
  const navigate = useNavigate();
  const { signInWithGoogle } = useSignInWithGoogle();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormValues>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IFormValues> = async ({ email, password }): Promise<void> => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/main');
        setToastSuccess('Sign in successful');
      })
      .catch((error: Error) => setToastError(error.message));
  };

  return (
    <div className="signInFirebase">
      <div className="signInFirebase__auth">
        <div className="signInFirebase__auth-left">
          <img src={poster as string} alt="NIX" />
        </div>
        <div className="signInFirebase__auth-right">
          <div className="signIn">
            Already have account? Sign in
          </div>
          <form className="signInForm" onSubmit={handleSubmit(onSubmit)}>
            <label>
              <div className="signInForm__labelText">
                <p className="signInForm__labelText-error">
                  {errors.email && <p>&#9447; Email is required</p>}
                </p>
              </div>
              <input
                type="email"
                placeholder="Enter your email..."
                {...register('email', { required: true })}
                className="signInForm__input"
              />
            </label>
            <label>
              <div className="signInForm__labelText">
                <p className="signInForm__labelText-error">
                  {errors.password && <p>&#9447; Password should be at least 6 characters long</p>}
                </p>
              </div>
              <input
                type="password"
                placeholder="Enter your password..."
                {...register('password', { required: true, minLength: 6 })}
                className="signInForm__input"
              />
            </label>
            <button
              type="submit"
              disabled={!isValid}
              className="signInForm__btn"
            >
              SIGN IN
            </button>
          </form>
          <div className="googleBtn">
            <GoogleButton onClick={signInWithGoogle} />
          </div>
          <div className="signUp">
            Don&#39;t have an account yet?
            {' '}
            <Link to="/sign-up">Sign up now</Link>
          </div>
        </div>
      </div>
      <ToasterContainer />
    </div>
  );
}

export default SignInPage;
