import { signOut } from 'firebase/auth';
import { auth } from '@/firebase.config';
import setToastSuccess from '@/utils/setToastSuccess';
import setToastError from '@/utils/setToastError';

function signOutFirebase(): void {
  signOut(auth).then(() => {
    localStorage.removeItem('avatar');
    localStorage.removeItem('username');
    localStorage.removeItem('email');

    setToastSuccess('Sign out successful');
  }).catch((error: Error) => {
    setToastError(error.message);
  });
}

export default signOutFirebase;
