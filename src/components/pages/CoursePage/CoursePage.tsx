import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv } from 'uuid';
import { updateDoc, doc } from '@firebase/firestore';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';
import ScrollToTop from 'react-scroll-to-top';
import { db } from '@/firebase.config';
import Header from '@/components/common/Header/Header';
import AdminControl from '@/components/common/AdminControl/AdminControl';
import ToasterContainer from '@/components/common/ToasterContainer/ToasterContainer';
import useFetchCoursePage from './hooks/useFetchCoursePage';
import useFetchTests from './hooks/useFetchTests';
import TestCard from './components/TestCard';
import setToastSuccess from '@/utils/setToastSuccess';
import setToastError from '@/utils/setToastError';
import Loader from '@/components/common/Loader/Loader';
import AdminButton from '@/components/common/AdminButton/AdminButton';
import './coursePage.scss';

function CoursePage() {
  const [text, setText] = useState<string>('');

  const { courseId } = useParams();

  const navigate = useNavigate();

  const { description, loading, getCourse } = useFetchCoursePage(courseId);

  const { tests, testsIDs } = useFetchTests(courseId);

  const filteredTests = tests?.filter((test) => testsIDs?.includes(test.testId as string));

  const onContentChange = async (textContent: string): Promise<void> => {
    const courseDoc = doc(db, 'courses', courseId as string);
    await updateDoc(courseDoc, { description: textContent })
      .then(() => getCourse())
      .then(() => setToastSuccess('Course successfuly edited!'))
      .catch((error: Error) => setToastError(error.message));
  };

  const handleCurrentTestId = (id: string) => {
    navigate(`/courses/${courseId || ''}/edit-tests`, { state: { id } });
  };

  const onNavigate = (): void => {
    navigate(`/courses/${courseId || ''}/edit-tests`);
  };

  return (
    <div className="coursePage">
      <Header />
      <AdminControl>
        <div className="coursePage__content">
          <div className="editor">
            <CKEditor
              editor={ClassicEditor}
              data={description}
              onChange={(event: any, editor: { getData: () => any; }) => {
                const data = editor.getData();
                setText(data as string);
              }}
            />
            <AdminButton
              disabled={text.length === 0 || description === text}
              onClick={() => onContentChange(text)}
              className="coursePage__content-showModal"
              text="CHANGE PAGE CONTENT"
            />
          </div>
        </div>
      </AdminControl>
      {
        loading
          ? (
            <>
              <section className="coursePage__content">
                <div>
                  {
                    description !== undefined ? parse(description) : null
                  }
                </div>
              </section>
              <div className="coursePage__cards">
                <div className="coursePage__cards-tests">
                  {filteredTests?.map((test) => (
                    <TestCard
                      test={test}
                      key={uuidv()}
                      handleCurrentTestId={handleCurrentTestId}
                    />
                  ))}
                </div>
              </div>
            </>
          )
          : <Loader />
      }
      <AdminControl>
        <AdminButton onClick={onNavigate} className="coursePage__content-showModal" text="ADD TEST" />
      </AdminControl>
      <ScrollToTop
        smooth
        color="#18AEEF"
      />
      <ToasterContainer />
    </div>
  );
}

export default CoursePage;
