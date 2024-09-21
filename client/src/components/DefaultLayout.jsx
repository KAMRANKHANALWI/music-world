import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function DefaultLayout({ children }) {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="header flex justify-between items-center p-4 lg:p-6 bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-md sticky top-0 z-50">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => {
            navigate('/');
          }}
        >
          <h1 className="text-2xl lg:text-4xl font-bold">
            <span className="text-white">MUSIC</span> <span className="text-gray-300">WORLD</span>
          </h1>
        </div>

        {/* User Info and Logout */}
        <div className="flex items-center space-x-4">
          <h1 className="text-lg lg:text-xl">{user?.name.toUpperCase()}</h1>
          <i
            className="ri-logout-circle-r-line text-2xl lg:text-3xl cursor-pointer hover:text-red-500 transition-all"
            onClick={() => {
              localStorage.removeItem('token');
              window.location.reload();
            }}
          ></i>
        </div>
      </header>

      {/* Content */}
      <main className="content flex-grow p-6 lg:p-10 mb-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full bg-gray-900 p-4 text-center text-gray-400">
        <p>© 2024 Music World - All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default DefaultLayout;


