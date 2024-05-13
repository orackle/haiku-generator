import React from 'react';

const ToggleSignOn = ({ isSigningUp, onChange }) => {
  return (
    <div className="flex items-center mb-10 justify-center ">
      <button
        onClick={() => onChange(true)}
        className={`relative rounded-full px-6 py-2 focus:outline-none transition-colors duration-300 ${
          isSigningUp ? 'bg-blue-500 text-white' : 'bg-white-200 text-gray-800'
        }`}
      >
        <span className={`absolute inset-0 rounded-full transition-transform duration-300 ${isSigningUp ? 'translate-x-full bg-white' : 'bg-white'}`}></span>
        <span className={`relative z-10 ${isSigningUp ? 'text-white' : 'text-gray-800'}`}>Sign Up</span>
      </button>
      <button
        onClick={() => onChange(false)}
        className={`relative px-6 py-2 rounded-full ml-1 focus:outline-none transition-colors duration-300 ${
          !isSigningUp ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
        }`}
      >
        <span className={`absolute inset-0 rounded-full transition-transform duration-300 ${!isSigningUp ? 'translate-x-full' : ''}`}></span>
        <span className={`relative z-10 ${!isSigningUp ? 'text-white' : 'text-gray-800'}`}>Sign In</span>
      </button>
    </div>
  );
};

export default ToggleSignOn;
