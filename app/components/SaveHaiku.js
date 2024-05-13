// SaveHaiku.js
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { useState } from 'react';
import SignUp from './SignUp';

const SaveHaiku = ({ haiku }) => {
  const user = useUser();
  const [showAlert, setShowAlert] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false); // State to control SignUp component visibility

  const handleSaveHaiku = async () => {
    if (!user || !user.isSignedIn) {
      setShowSignUp(true); // Prompt the SignUp component if user is not signed in
      return;
    }

    try {
      const response = await axios.post('/api/haiku', {
        userId: user.user.id,
        haiku: haiku
      });

      console.log('Haiku saved successfully:', response.data);
      setShowAlert(true); 
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving haiku:', error);
    }
  };

  return (
    <div>
      <button
        className="
          px-6 py-2 rounded-md
          bg-green-600  border-2  text-white
          hover:border-green-400 hover:text-gray-600
          focus:outline-none focus:ring focus:ring-blue-400
          transition duration-300 ease-in-out ml-1/2"
        onClick={handleSaveHaiku}
      >
        Save Haiku
      </button>
      {showAlert && (
        <div className="absolute bg-green-200 text-gray-800 py-2 px-4 rounded-md top-0">
          Haiku saved successfully!
        </div>
      )}
      {showSignUp && <SignUp onClose={() => setShowSignUp(false)} />} {/* Render SignUp component if showSignUp is true */}
    </div>
  );
};

export default SaveHaiku;
