"use client";
import React, { useState } from 'react';
import { SignUp as ClerkSignUp, SignIn as ClerkSignIn } from '@clerk/clerk-react';
import ToggleSignOn from './ToggleSignOn'; // Import the ToggleSignOn component

const SignUp = ({ onClose }) => {
  const [isSigningUp, setIsSigningUp] = useState(true);

  const toggleSignUpSignIn = () => {
    setIsSigningUp(prevState => !prevState);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="relative p-8 rounded-lg shadow-md w-96 ">
        <ToggleSignOn isSigningUp={isSigningUp} onChange={toggleSignUpSignIn} /> {/* Replace the toggle button with the ToggleSignOn component */}
        {isSigningUp ? (
          <ClerkSignUp onSuccess={onClose} />
        ) : (
          <ClerkSignIn onSuccess={onClose} />
        )}
        
      </div>

      <button
          onClick={onClose} // Ensure onClose is called on click
          className="absolute top-0 right-0 m-4 p-2 text-white-500 hover:text-white-400 focus:outline-none z-10"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
    </div>
    
  );
};

export default SignUp;
