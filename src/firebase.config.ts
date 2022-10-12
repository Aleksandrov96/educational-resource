import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA6xaGgGSaUA1FKsyQ4cf1cetmudfO6xDs',
  authDomain: 'nix-intern-react-ts-crud.firebaseapp.com',
  projectId: 'nix-intern-react-ts-crud',
  storageBucket: 'nix-intern-react-ts-crud.appspot.com',
  messagingSenderId: '187836501560',
  appId: '1:187836501560:web:42bee3695f9b9f4e17e0cd',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
