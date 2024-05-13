import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import ExportPdf from './ExportPdf'; // Assuming ExportPdf component is in a separate file
import DeleteHaiku from './DeleteHaiku';

const HaikuList = () => {
  const [haikus, setHaikus] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useUser();

  useEffect(() => {
    const fetchHaikus = async () => {
      console.log('fetching haikus');
      debugger;

      try {
        setLoading(true);
        if (user.isSignedIn) {
          const response = await axios.get(`/api/haiku?userId=${user.user.id}`);
          const sortedHaikus = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          setHaikus(sortedHaikus);
          console.log('found for user id', user.user.id, sortedHaikus);
        }
      } catch (error) {
        console.error('Error fetching haikus:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHaikus();
  }, [user.user.id, user.isSignedIn]);

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const renderHaikuText = (haikuText, index) => {
    return haikuText.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i !== haikuText.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const clipHaiku = (haiku, maxLength, index) => {
    return haiku.length > maxLength && expandedRow !== index
      ? haiku.substring(0, maxLength) + '...'
      : haiku;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto p-8 flex flex-col items-center ">
    {loading ? (
      <div className="flex items-center justify-center text-gray-500">
        <FontAwesomeIcon icon={faCircleNotch} spin className="mr-2" color='#EC771D' size="2x" />
        Fetching your haikus...almost there...
      </div>

    ) : haikus.length === 0 ? (
      <div>
        <h2 className="text-lg font-bold text-[#EC771D] items-center ">Haiku History</h2>
        <p className="text-gray-500">No haikus found.</p>
      </div>
    )

    : (
      <div>
      <h2 className="text-lg font-bold mb-4 text-[#EC771D]">Haiku History</h2>
      <table className="w-full table-fixed bg-gray-50 divide-y divide-gray-200 rounded-lg overflow-hidden shadow-md">
        <thead className="bg-gray-800 text-white">
          <tr >
            <th className="px-8 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Text
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/4">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/4">
              Download
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/4">
              Delete
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {haikus.map((haiku, index) => (
            <React.Fragment key={index}>
              <tr
                className="transition-all duration-300 ease-in-out cursor-pointer hover:bg-gray-200 hover:text-white"
                onClick={() => handleRowClick(index)}
              >
                <td className="px-8 py-4 whitespace-pre-wrap text-sm text-gray-900 ">
                  {expandedRow === index ? renderHaikuText(haiku.haiku, index) : clipHaiku(haiku.haiku, 20, index)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-1/4">
                  {formatDate(haiku.created_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-1/4">
                  <ExportPdf textContent={haiku.haiku} textPrompt={haiku.created_at}/>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-1/4">
                  <DeleteHaiku textContent={haiku.haiku}/>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
      )}
    </div>
  );
};

export default HaikuList;
