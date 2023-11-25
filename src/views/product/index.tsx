import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Index() {
  return (
    <div className="user-container">
      <Outlet />
    </div>
  );
}
