import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

export default () => {
  return (
    <div className="user-container">
      <Outlet />
    </div>
  );
};
