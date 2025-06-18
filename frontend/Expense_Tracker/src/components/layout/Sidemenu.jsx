import React, { useContext, useCallback } from 'react';
import { SIDE_MENU_DATA } from '../../utils/data';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Charavtar from '../cards/Charavtar';

const Sidemenu = ({ Activemenu }) => {
  const { user, clearuser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = useCallback((route) => {
    if (route === 'logout') {
      handleLogout();
    } else {
      navigate(route);
    }
  }, [navigate]);

  const handleLogout = () => {
    try {
      localStorage.clear();
      clearuser();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20'>
      <div className='flex flex-col items-center gap-3 mt-3 mb-7'>
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt='profile'
            className='w-20 h-20 rounded-full bg-slate-400 object-cover'
          />
        ) : (
          <Charavtar
            fullName={user?.fullName}
            width='w-20'
            height='h-20'
            style='text-xl'
          />
        )}
        <h5 className='text-gray-950 font-medium leading-6'>
          {user?.fullName || ''}
        </h5>
      </div>

      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${
            Activemenu === item.label ? 'text-white bg-primary' : 'text-gray-700 hover:bg-gray-100'
          } py-3 px-6 rounded-lg mb-3 transition-colors duration-150`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className='text-xl' />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default Sidemenu;
