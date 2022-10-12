import React, { PropsWithChildren } from 'react';
import ReactDom from 'react-dom';
import './modal.scss';

type Props = {
  active: boolean,
  setActive: (value: boolean) => void;
};

function Modal({ active, setActive, children }: PropsWithChildren<Props>) {
  const portal = document.getElementById('portal') as HTMLElement;

  const ModalElement = (
    <div
      className={active ? 'modal modal-active' : 'modal'}
      onClick={() => setActive(false)}
      aria-hidden="true"
    >
      <div
        className={active ? 'modal__content modal__content-active' : 'modal__content'}
        onClick={(e) => e.stopPropagation()}
        aria-hidden="true"
      >
        <div
          className="modal__content-close"
          onClick={() => setActive(false)}
          aria-hidden="true"
        >
          &times;
        </div>
        {children}
      </div>
    </div>
  );
  return active ? ReactDom.createPortal(ModalElement, portal) : null;
}

export default Modal;
