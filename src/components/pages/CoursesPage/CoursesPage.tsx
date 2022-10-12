import React, { useState, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import {
  addDoc, updateDoc, deleteDoc, collection, doc,
} from '@firebase/firestore';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch, SearchBox, Hits, Pagination, Configure,
} from 'react-instantsearch-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlgolia } from '@fortawesome/free-brands-svg-icons';
import { db } from '@/firebase.config';
import AdminControl from '@/components/common/AdminControl/AdminControl';
import Modal from '@/components/common/Modal/Modal';
import ToasterContainer from '@/components/common/ToasterContainer/ToasterContainer';
import Header from '@/components/common/Header/Header';
import AdminButton from '@/components/common/AdminButton/AdminButton';
import setToastError from '@/utils/setToastError';
import setToastSuccess from '@/utils/setToastSuccess';
import EditCourseForm from './EditCourseForm/EditCourseForm';
import CourseHit from './CourseHit';
import './coursesPage.scss';

type Props = {
  name?: string,
  id?: string
};

function CoursesPage() {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [currentCourse, setCurrentCourse] = useState<string>();

  const searchClient = algoliasearch('YZKLXAGGBW', '944f162b960cdcbda3f0b1a6c0ec6c98');

  const handleCurrentCourseId = (id: string) => {
    setCurrentCourse(id);
    setModalActive(true);
  };

  useEffect(() => {
    if (!modalActive) {
      setCurrentCourse('');
    }
  }, [modalActive]);

  const onCourseAdd: SubmitHandler<Props> = async ({ name }: Props): Promise<void> => {
    await addDoc(collection(db, 'courses'), { name, testsIDs: [] })
      .then(() => setToastSuccess('Course successfuly added!'))
      .catch((error: Error) => setToastError(error.message));
    setModalActive(false);
  };

  const onCourseEdit: SubmitHandler<Props> = async ({ name }: Props): Promise<void> => {
    const courseDoc = doc(db, 'courses', currentCourse as string);
    await updateDoc(courseDoc, { name })
      .then(() => setToastSuccess('Course successfuly edited!'))
      .catch((error: Error) => setToastError(error.message));
    setCurrentCourse('');
    setModalActive(false);
  };

  const onCourseDelete = async (id: string): Promise<void> => {
    const courseDoc = doc(db, 'courses', id);
    await deleteDoc(courseDoc)
      .then(() => setToastSuccess('Course successfuly deleted!'))
      .catch((error: Error) => setToastError(error.message));
  };

  const customHit = ({ hit }: any) => (
    <CourseHit
      hit={hit}
      onEdit={handleCurrentCourseId}
      onDelete={onCourseDelete}
    />
  );

  return (
    <div>
      <Header />
      <div className="coursesPage">
        <InstantSearch
          searchClient={searchClient}
          indexName="courses"
        >
          <div className="search">
            <SearchBox translations={{
              placeholder: 'Search courses...',
            }}
            />
            <div
              className="search__poweredBy"
            >
              <p className="search__poweredBy-text">
                Powered by
                {' '}
                <a
                  href="https://www.algolia.com/developers/firebase-search-extension/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faAlgolia} />
                  Algolia
                </a>
              </p>
            </div>
          </div>
          <Configure hitsPerPage={3} />
          <div className="coursesPage__content">
            <div className="coursesPage__content-list">
              <Hits hitComponent={customHit} />
            </div>
          </div>
          <AdminControl>
            <AdminButton
              onClick={() => setModalActive(true)}
              className="coursesPage__content-showModal"
              text="ADD COURSE"
            />
            <Modal active={modalActive} setActive={setModalActive}>
              <EditCourseForm
                setActive={setModalActive}
                onSubmit={currentCourse ? onCourseEdit : onCourseAdd}
                courseId={currentCourse}
              />
            </Modal>
          </AdminControl>
          <Pagination
            showFirst
            showLast
            showPrevious
            showNext
            padding={2}
            totalPages={100}
          />
        </InstantSearch>
      </div>
      <ToasterContainer />
    </div>
  );
}

export default CoursesPage;
