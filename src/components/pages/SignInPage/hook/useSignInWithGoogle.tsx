import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import setToastSuccess from '@/utils/setToastSuccess';
import setToastError from '@/utils/setToastError';
import { auth } from '@/firebase.config';

function useSignInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const signInWithGoogle = async (): Promise<void> => {
    await signInWithPopup(auth, provider)
      .then(() => {
        setToastSuccess('Login successful');
        navigate('/main');
      })
      .catch((error: Error) => {
        setToastError(error.message);
      });
  };
  return { signInWithGoogle };
}

export default useSignInWithGoogle;
