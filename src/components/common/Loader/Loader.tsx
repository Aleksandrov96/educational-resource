import React from 'react';
import ReactDom from 'react-dom';
import './loadingio.scss';
import './loader.scss';

function Loader() {
  const portal = document.getElementById('portal') as HTMLElement;

  const ModalElement = (
    <div className="loadingModal">
      <div className="loadingio-spinner-pulse-zevjvpjk1xg">
        <div className="ldio-9uj700tf4j">
          <div />
          <div />
          <div />
        </div>
      </div>
    </div>
  );
  return ReactDom.createPortal(ModalElement, portal);
}

export default Loader;
