import { useState, useEffect } from 'react';
import {
  collection, DocumentData, getDocs,
} from 'firebase/firestore';
import { db } from '@/firebase.config';
import setToastError from '@/utils/setToastError';

const useFetchTest = (currentTestId?: string) => {
  const [test, setTest] = useState<DocumentData>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getTest = async () => {
      const data = await getDocs(collection(db, 'tests'));
      const dataList: DocumentData[] = [];
      data.forEach((doc) => dataList.push({ id: doc.id, ...doc?.data() }));
      const filtered: DocumentData[] = dataList
        .filter((testDoc) => testDoc.id === currentTestId);
      setTest(filtered[0]);
    };

    getTest()
      .then(() => setLoading(false))
      .catch((error: Error) => setToastError(error.message));
  }, [currentTestId]);

  return { test, loading };
};

export default useFetchTest;
