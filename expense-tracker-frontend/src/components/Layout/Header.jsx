import React from 'react';

const Header = ({ title, subtitle }) => {
  return (
    <header className="py-6">
      <h1 className="text-3xl font-bold text-text-light dark:text-text-dark m-6">{title}</h1>
      {subtitle && <p className=" m-6 my-1 text-gray-500 dark:text-gray-400">{subtitle}</p>}
    </header>
  );
};

export default Header;
