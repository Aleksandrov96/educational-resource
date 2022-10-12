import { toast } from 'react-toastify';
import 'react-toastify/scss/main.scss';

const setToastError = (error: string) => toast.error(`${error} 🤷‍♂️`, {
  position: 'bottom-right',
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
});

export default setToastError;
