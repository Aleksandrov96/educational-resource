import React from 'react';
import Header from '@/components/common/Header/Header';
import './noMatchPage.scss';

function NoMatchPage() {
  return (
    <div>
      <Header />
      <div className="noMatchPage">
        <div className="noMatchPage__content">
          <h1 className="message">OUPS! Page not found</h1>
          <h1 className="emoji">😓</h1>
        </div>
      </div>
    </div>
  );
}

export default NoMatchPage;
