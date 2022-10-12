/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useState, useEffect } from 'react';
import {
  collection, DocumentData, getDocs,
} from 'firebase/firestore';
import { db } from '@/firebase.config';
import setToastError from '@/utils/setToastError';

function useFetchCourse(courseId?: string) {
  const [description, setDescription] = useState<string>();
  const [name, setName] = useState<string>();
  const [loading, setLoading] = useState<boolean>();

  const getCourse = async () => {
    const data = await getDocs(collection(db, 'courses'));
    const dataList: DocumentData[] = [];
    data.forEach((doc) => dataList.push({ id: doc.id, ...doc?.data() }));
    const filtered: DocumentData[] = dataList.filter((doc) => doc.id === courseId);
    setDescription(filtered[0].description);
    setName(filtered[0].name);
    setLoading(true);
  };

  useEffect(() => {
    getCourse()
      .catch((error: Error) => setToastError(error.message));
  }, [courseId]);

  return {
    description,
    name,
    loading,
    getCourse,
  };
}

export default useFetchCourse;
