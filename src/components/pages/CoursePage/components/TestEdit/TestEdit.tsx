import React from 'react';
import { useParams } from 'react-router-dom';
import ScrollToTop from 'react-scroll-to-top';
import Header from '@/components/common/Header/Header';
import AddTestForm from '@/components/pages/CoursePage/components/AddTestForm/AddTestForm';
import useFetchTest from '../AddTestForm/hooks/useFetchTest';
import Loader from '@/components/common/Loader/Loader';
import './testEdit.scss';

function TestEdit() {
  const { courseId } = useParams();
  const { loading } = useFetchTest();

  return (
    <div className="testEdit">
      <Header />
      <div className="testEdit__content">
        <div className="container">
          {
            loading
              ? <Loader />
              : <AddTestForm courseId={courseId as string} />
          }
        </div>
      </div>
      <ScrollToTop
        smooth
        color="#18AEEF"
      />
    </div>
  );
}

export default TestEdit;
