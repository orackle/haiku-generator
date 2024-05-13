import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { useState } from 'react';


export default function DeleteHaiku({ textContent}) {
    const user = useUser();
    const [showAlert, setShowAlert] = useState(false); 
    const handleDeleteHaiku = async () => {
        if (!user || !user.isSignedIn) {
            return;
        }
    
        try {
            console.log('Deleting haiku with id:', textContent);
            const data = {
                userId: user.user.id,
                haiku: textContent
            };
            const response = await axios.delete('/api/haiku', { data });
            console.log('Haiku deleted successfully:', response.data);
            setShowAlert(true); 
            setTimeout(() => {
              setShowAlert(false);
            }, 3000);
          } catch (error) {
            console.error('Error deleting haiku:', error);
          }
    };
    

    return (
        <div>
            {showAlert && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center text-red-500">
                    Haiku deleted successfully! You won`&apos;`t see it again on next reload.
                    </div>
            )}
            <button onClick={handleDeleteHaiku} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
            


            
        </div>
    )
  }
      