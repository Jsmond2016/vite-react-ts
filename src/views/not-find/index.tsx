import './style.scss';

import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFind: React.FC = () => {
  const navigateTo = useNavigate();
  const toHome = () => {
    navigateTo('/');
  };
  return (
    <div className="not-find-wrap">
      <div className="error">
        <section className="error-container">
          <span>4</span>
          <span>
            <span className="screen-reader-text "></span>
          </span>
          <span>4</span>
        </section>
        <p>哎呀，找不到了</p>
        <span className="go-home" onClick={toHome}>
          返回首页
        </span>
      </div>
    </div>
  );
};
export default NotFind;
