import React, { useState } from 'react';
import axios from 'axios';
import ExportToPdf from './ExportPdf'; // Import the PDF export component
import Typewriter from 'typewriter-effect';
import SaveHaiku from './SaveHaiku';
import SignUp from './SignUp';
import { useUser } from '@clerk/clerk-react';

const ChatApi = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log("Sending request to Gemini: ", prompt);
    try {

      // console.log(process.env.GEMINI_API_KEY);
      const response = await axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCm3KGY5FmojSq8shhXmkLSGjpCG5Bw2kY", {
        contents: [
          {
            parts: [
              {
                text: `Give me a haiku for the prompt ${prompt}`
              }
            ]
          }
        ]
      });
      const responseData = response.data;
      if (responseData) {
        setResult(''); 
        const haikuText = response.data.candidates[0].content.parts[0].text.split('\\n').map(line => line.trim()); 
        setResult(haikuText.join('\n')); 
        console.log("Response data: ", responseData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setResult('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-1 p-4  rounded-lg">
      <form onSubmit={handleSubmit} className="mb-4">
        <label className="block mb-2 text-black">
        <h5 className="text-sm font-bold text-black mb-4">Enter a prompt (or more): </h5>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="mt-1 p-2 block w-full bg-white border-b-2 border-black rounded-t-md focus:ring-indigo-500 focus:border-indigo-500 focus:border-b-[#EC771D] focus:outline-none"
            />
        </label>
        <button
          type="submit"
          className="py-2 px-4 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 w-full font-bold" style={{ backgroundColor: 'rgba(236, 119, 29, 0.8)' }}
        >
          Submit
        </button>
      </form>
      {loading && <div className="text-black">Loading...</div>}
      {!loading && result && (
        <div className={`mt-4 bg-gray-100 p-4 rounded-md text-black haiku h-[100px]`}>
          <Typewriter options={{ loop: false }} onInit={(typewriter) => {
            typewriter.typeString(result).start();
          }} />
        </div>
      )}
      <div className="flex flex-row space-x-4 mt-8">
      {!loading && result && <ExportToPdf textContent={result} textPrompt={prompt} />} 
      {!loading && result && <SaveHaiku haiku={result} />}
      </div>
    </div>
  );
};

export default ChatApi;
