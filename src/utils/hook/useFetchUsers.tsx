import { useState, useEffect } from 'react';
import {
  collection, DocumentData, getDocs,
} from 'firebase/firestore';
import { db } from '@/firebase.config';
import setToastError from '@/utils/setToastError';

function useFetchUsers() {
  const [users, setUsers] = useState<DocumentData[]>();

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(collection(db, 'users'));
      const dataList: DocumentData[] = [];
      data.forEach((doc) => dataList.push({ id: doc.id, ...doc?.data() }));
      setUsers(dataList);
    };
    getUsers()
      .catch((error: Error) => setToastError(error.message));
  }, []);

  return { users };
}

export default useFetchUsers;
