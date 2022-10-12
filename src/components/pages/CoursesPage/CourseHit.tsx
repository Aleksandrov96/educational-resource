import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import AdminControl from '@/components/common/AdminControl/AdminControl';
import Modal from '@/components/common/Modal/Modal';
import Button from '@/components/common/Button/Button';
import './coursesPage.scss';

type Props = {
  hit: any,
  onEdit: (value: string) => void,
  onDelete: (value: string) => void,
};

function CourseHit({ hit, onEdit, onDelete }: Props) {
  const [active, setActive] = useState<boolean>(false);

  const onCourseDelete = () => {
    onDelete(hit.objectID as string);
    setActive(false);
  };

  return (
    <div className="course">
      <div className="course__edit">
        <AdminControl>
          <div
            className="course__edit-icon"
            onClick={() => onEdit(hit.objectID as string)}
            aria-hidden="true"
          >
            <FontAwesomeIcon icon={faEdit} />
          </div>
          <div
            className="course__edit-icon"
            onClick={() => setActive(true)}
            aria-hidden="true"
          >
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </AdminControl>
      </div>
      <Link to={`/courses/${hit.objectID as string}`} className="course__name">{hit.name}</Link>
      <Modal active={active} setActive={setActive}>
        <div className="deleteModal">
          <p className="deleteModal__text">Are you sure you want to delete the course?</p>
          <Button onClick={onCourseDelete} className="deleteModal__btn" text="DELETE COURSE" />
        </div>
      </Modal>
    </div>
  );
}

export default CourseHit;
