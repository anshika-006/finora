import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
 const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300" 
      aria-modal="true" 
      role="dialog"
      onClick={onClose} 
    >
      <div 
        className="relative w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl transform transition-all duration-300" 
        onClick={handleModalContentClick}
      >
        <div className="flex items-center justify-between pb-4 border-b dark:border-gray-700">
          <h3 className="text-xl font-semibold text-text-light dark:text-text-dark">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:ring-offset-gray-800"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

