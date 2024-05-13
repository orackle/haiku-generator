"use client";
import React, { useState, useEffect } from 'react';
import ChatApi from './components/ChatApi';
import SignUp from './components/SignUp'; // Import the SignUp component
import HaikuList from './components/HaikuList';
import { useUser, UserButton } from '@clerk/clerk-react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // Import the necessary function

const Home = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const user = useUser();
  const [afterSignUpInfo, setAfterSignUpInfo] = useState(null);
  const [underlineWidth, setUnderlineWidth] = useState(0);
  const [showHaikuList, setShowHaikuList] = useState(false); // State to toggle HaikuList visibility
  const [init, setInit] = useState(false);

  useEffect(() => {
    // Fetch information from afterSignUp URL if user is already signed in
    if (user && user.isSignedIn && user.isLoaded) {
      const queryParams = new URLSearchParams(window.location.search);
      const afterSignUpParam = queryParams.get('afterSignUp');
      if (afterSignUpParam) {
        setAfterSignUpInfo(afterSignUpParam);
      }
    }

    // Calculate the width of the logo for the underline animation
    const logo = document.getElementById('logo');
    if (logo) {
      const width = logo.offsetWidth;
      setUnderlineWidth(width);
    }

   
    // Initialize particles engine
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); // Load the slim version of particles
    }).then(() => {
      setInit(true);
    });
  }, [user]);

  const options = {
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 3,
        straight: false,
      },
      number: {
        density: {
          enable: true,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    detectRetina: true,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-white flex flex-row justify-center relative">
      <div className="w-1/2 flex items-center justify-center bg-gradient-to-r from-[#EC771D] to-[#DBC13A] relative">
        {init && (
          <Particles
            id="tsparticles"
            style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}
            options={options}
          />
        )}
        <a href="/"><h1 id="logo" className="font-italiana text-white text-6xl animate__animated animate__bounceInRight animate__duration-3s animate__delay-1s">haiku writer. </h1></a>
        
      </div>
      <div className=" w-1/2 flex justify-center items-center">
        {showHaikuList && user && user.isSignedIn ? (
          <div className="animate__animated animate__fadeInUp animate__delay-1s"><HaikuList />

          <p className="text-sm italic text-gray-500 mt-4 cursor-pointer hover:underline mx-10  items-center justify-center animate__animated animate__fadeInUp animate__delay-2s" onClick={() => setShowHaikuList(false)}>Back to Home →</p>
          
          </div>
        ) : (
          <main className="sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-6 shadow-xl sm:rounded-lg animate__animated animate__fadeInUp animate__delay-1s ">
              <ChatApi />
            </div>
            {/* Style the "Haiku history" link */}
            {user && user.isSignedIn && (
              <p className="text-sm italic text-gray-500 mt-4 cursor-pointer hover:underline animate__animated animate__fadeInUp animate__delay-2s" onClick={() => setShowHaikuList(true)}>Haiku history →</p>
            )}
          </main>
        )}
        {showSignUp && <SignUp onClose={() => setShowSignUp(false)} />} {/* Pass onClose function */}
        <div className="absolute top-0 right-0">
          {!user || !user.isSignedIn ? (
            <button
              onClick={() => setShowSignUp(true)}
              className="mt-4 text-black px-4 py-2 rounded-md shadow-md"
            >
              Sign Up/Sign In
            </button>
          ) : (
            <div className="mt-4 relative">
              <div className="relative">
                <div className="absolute top-0 right-0">
                  <div className="p-2">
                    <UserButton
                      dropdownStyle={{ backgroundColor: 'black' }} // Change dropdown style
                      dropdownClassName="text-black" // Change dropdown text color
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {afterSignUpInfo && (
            <div className="mt-4 bg-white text-black px-4 py-2 rounded-md shadow-md">
              After SignUp Info: {afterSignUpInfo}
            </div>
          )}
        </div>
      </div>

      <h6 className="text-xs bottom-0 right-0 absolute font-semibold px-4 text-center text-gray-400 mb-6 animate__animated animate__fadeInUp animate__delay-3s">🩷 Crafted with care, thanks to <br></br>Google Gemini, Next.js and MongoDB</h6>

    </div>
  );
};

export default Home;
