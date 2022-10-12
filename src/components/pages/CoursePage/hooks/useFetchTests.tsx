/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useState, useEffect, useCallback } from 'react';
import {
  collection, DocumentData, getDocs,
} from 'firebase/firestore';
import setToastError from '@/utils/setToastError';
import { db } from '@/firebase.config';

const useFetchTests = (courseId?: string) => {
  const [testsIDs, setTestsIDs] = useState<Array<string>>();
  const [tests, setTests] = useState<DocumentData[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const getTestsIDs = useCallback(async () => {
    const data = await getDocs(collection(db, 'courses'));
    const dataList: DocumentData[] = [];
    data.forEach((doc) => dataList.push({ id: doc.id, ...doc?.data() }));
    const filtered: DocumentData[] = dataList.filter((course) => course.id === courseId);
    setTestsIDs(filtered[0].testsIDs);
    setLoading(false);
  }, [courseId]);

  const getTests = async () => {
    const data = await getDocs(collection(db, 'tests'));
    const dataList: DocumentData[] = [];
    data.forEach((doc) => dataList.push({ id: doc.id, ...doc?.data() }));
    setTests(dataList);
  };

  useEffect(() => {
    setLoading(true);
    getTestsIDs()
      .catch((error: Error) => setToastError(error.message));

    getTests()
      .catch((error: Error) => setToastError(error.message));
  }, [getTestsIDs]);

  return {
    tests,
    testsIDs,
    loading,
    getTests,
  };
};

export default useFetchTests;
