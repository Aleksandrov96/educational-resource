/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import {
  DocumentData, deleteDoc, updateDoc, doc, arrayRemove,
} from '@firebase/firestore';
import { db } from '@/firebase.config';
import AdminControl from '@/components/common/AdminControl/AdminControl';
import Modal from '@/components/common/Modal/Modal';
import Button from '@/components/common/Button/Button';
import ToasterContainer from '@/components/common/ToasterContainer/ToasterContainer';
import setToastSuccess from '@/utils/setToastSuccess';
import setToastError from '@/utils/setToastError';
import '../coursePage.scss';

type Props = {
  test: DocumentData,
  handleCurrentTestId: (id: string) => void,
};

function TestCard({ test, handleCurrentTestId }: Props) {
  const [active, setActive] = useState<boolean>(false);

  const {
    id, name, testId, courseId,
  } = test;

  const onTestDelete = async (): Promise<void> => {
    const testsDoc = doc(db, 'tests', id as string);
    const deleteFromTestsDoc = await deleteDoc(testsDoc);

    const courseDoc = doc(db, 'courses', courseId);
    const deleteFromCursesDoc = await updateDoc(courseDoc, {
      testsIDs: arrayRemove(testId),
    });

    Promise.all([deleteFromTestsDoc, deleteFromCursesDoc])
      .then(() => setActive(false))
      .then(() => setToastSuccess('Test successfuly deleted!'))
      .catch((error: Error) => setToastError(error.message));
  };

  return (
    <div className="test">
      <AdminControl>
        <div className="test__edit">
          <div
            className="test__edit-icon"
            aria-hidden="true"
            onClick={() => handleCurrentTestId(id as string)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </div>
        </div>
        <div className="test__edit">
          <div
            className="test__edit-icon"
            aria-hidden="true"
            onClick={() => setActive(true)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>
      </AdminControl>
      <Link to={`/tests/${id as string}`} className="test__name">{name}</Link>
      <Modal active={active} setActive={setActive}>
        <div className="deleteModal">
          <p className="deleteModal__text">Are you sure you want to delete the test?</p>
          <Button onClick={onTestDelete} className="deleteModal__btn" text="DELETE TEST" />
        </div>
      </Modal>
      <ToasterContainer />
    </div>
  );
}

export default TestCard;
