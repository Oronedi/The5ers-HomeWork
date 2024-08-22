import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Sidebar } from '../Sidebar/Sidebar';
import './layout.css';

const Layout: FC = () => {
  return (
    <div className="page-container">
      <Sidebar />
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
