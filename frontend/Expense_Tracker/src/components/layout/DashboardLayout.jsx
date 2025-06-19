import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Navbar from './Navbar';
import Sidemenu from './Sidemenu';

const DashboardLayout = ({ children, Activemenu }) => {
  const user = useContext(UserContext);

  return (
    <div>
      <Navbar Activemenu={Activemenu} />
      {user && (
        <div className='flex'>
          <div className='max-[1080px]:hidden'>
            <Sidemenu Activemenu={Activemenu} />
          </div>
          <div className='grow mx-5'>{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
