import { useState, useEffect } from 'react';
import { DocumentData } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import setToastError from '@/utils/setToastError';

const useFetchQuiz = (currentTestId?: string) => {
  const [test, setTest] = useState<DocumentData>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getTest = async () => {
      const functions = getFunctions();
      const onTestFetch = httpsCallable(functions, 'onTestFetch');

      onTestFetch(currentTestId)
        .then((fetchedTest) => setTest(fetchedTest.data as DocumentData))
        .then(() => setLoading(false))
        .catch((error: Error) => setToastError(error.message));
    };

    getTest()
      .catch((error: Error) => setToastError(error.message));
  }, [currentTestId]);

  return { test, loading };
};

export default useFetchQuiz;
