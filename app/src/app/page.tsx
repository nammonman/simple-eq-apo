'use client'

import { useState, useEffect, useRef } from 'react';
import { Heading1, Menu, X } from 'lucide-react';
import QrCodeDisplay from '../components/QrCodeDisplay'; 
import { ReactNode } from 'react';

const HintOverlay = ({ hint }: { hint: string }) => (
  <div className="absolute bottom-full mb-2 w-48 p-2 bg-gray-700 text-white text-sm rounded shadow-lg">
    {hint}
  </div>
);

const ParameterLabel = ({ label, hint, children }: { label: string, hint: string, children: ReactNode }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <label className="flex justify-between items-center relative">
      <span
        className="mr-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {label}
        {isHovered && <HintOverlay hint={hint} />}
      </span>
      {children}
    </label>
  );
};

const Layout = ({ children }: { children: ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [randomSequence, setRandomSequence] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');
  const [sliderValue, setSliderValue] = useState(20);
  const [textBoxValue, setTextBoxValue] = useState('');
  const [rangeValues, setRangeValues] = useState([0, 20000]);
  const [isWelcomeOverlay, setIsWelcomeOverlay] = useState(true);
  const [isMainMenu, setIsMainMenu] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const [containerBounds, setContainerBounds] = useState({ top: 0, bottom: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRandomSequence(Math.random().toString(36).substring(2, 12));
  }, []);

  useEffect(() => {
    const linkAnuphan = document.createElement('link');
    linkAnuphan.href = 'https://fonts.googleapis.com/css2?family=Anuphan:wght@400;700&display=swap';
    linkAnuphan.rel = 'stylesheet';
    document.head.appendChild(linkAnuphan);

    const linkRacingSans = document.createElement('link');
    linkRacingSans.href = 'https://fonts.googleapis.com/css2?family=Racing+Sans+One&display=swap';
    linkRacingSans.rel = 'stylesheet';
    document.head.appendChild(linkRacingSans);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    
    // Set initial width
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const updateContainerBounds = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerBounds({
          top: rect.top,
          bottom: rect.bottom
        });
      }
    };

    updateContainerBounds();
    window.addEventListener('resize', updateContainerBounds);
    window.addEventListener('scroll', updateContainerBounds);

    return () => {
      window.removeEventListener('resize', updateContainerBounds);
      window.removeEventListener('scroll', updateContainerBounds);
    };
  }, []);

  const handleRangeChange = (index: number, value: string) => {
    setRangeValues((prevValues) => {
      const valueInt = parseInt(value);
      const newValues = [...prevValues];
      newValues[index] = isNaN(valueInt) ? 0 : Math.max(0, Math.min(20000, valueInt));
      if (newValues[0] > newValues[1]) {
        newValues[1] = newValues[0];
      } else if (newValues[1] < newValues[0]) {
        newValues[0] = newValues[1];
      }
      if (newValues[1] - newValues[0] < sliderValue) {
        if (newValues[0] + sliderValue <= 20000) {
          newValues[1] = newValues[0] + sliderValue;
        }
        else {
          newValues[0] = 20000 - sliderValue;
        }
      }
      return newValues;
    });
  };

  const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.currentTarget.select();
  };

  const handleFadeOut = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsWelcomeOverlay(false);
      setIsMainMenu(true);
      setTimeout(() => {
        setIsFadingIn(true);
      }, 300); 
    }, 300); 
    
    
  };

  // Calculate ball positions based on screen width and container bounds
  const ballPosition = (screenWidth * 0.2) + 'px';
  const topBallsPosition = (containerBounds.top/2) + 'px';
  const bottomBallsPosition = (containerBounds.bottom/8) + 'px';

  return (
    <div className="relative min-w-full min-h-screen bg-gray-50" style={{ fontFamily: 'Anuphan, sans-serif' }}>
      {/* Background with moving blurred pastel balls */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div 
          className="fixed w-1/3 h-1/2 bg-violet-300 rounded-full filter blur-3xl opacity-60 "
          style={{ 
            bottom: bottomBallsPosition, 
            left: ballPosition,
          }}
        ></div>
        <div 
          className="fixed w-1/3 h-1/2 bg-indigo-700 rounded-full filter blur-3xl opacity-60 "
          style={{ 
            bottom: bottomBallsPosition, 
            right: ballPosition,
          }}
        ></div>
        <div 
          className="fixed w-1/3 h-1/2 bg-cyan-300 rounded-full filter blur-3xl opacity-60 "
          style={{ 
            top: topBallsPosition, 
            right: ballPosition,
          }}
        ></div>
        <div 
          className="fixed w-1/3 h-1/2 bg-blue-300 rounded-full filter blur-3xl opacity-60 "
          style={{ 
            top: topBallsPosition, 
            left: ballPosition,
          }}
        ></div>
        <div 
          className="fixed w-1/3 h-1/2 bg-purple-300 rounded-full filter blur-3xl opacity-60 "
          style={{ 
            bottom: bottomBallsPosition, 
            right: ballPosition,
          }}
        ></div>
      </div>

      {/* Main Content */}
      <main className="relative text-black justify-center items-center min-h-screen flex p-4">
        <div ref={containerRef} className='relative z-10 bg-white rounded-2xl p-8 md:p-12 lg:p-16 w-full sm:w-4/5 md:w-4/5 lg:w-3/4 xl:w-3/5 shadow-xl mx-auto'>
          {isWelcomeOverlay && (
            <div className={`inset-0 flex flex-col lg:flex-row m-auto justify-center items-center transition-opacity duration-300 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
              
              <div className="w-full p-8 flex flex-col space-y-4 justify-between items-center">
                <h2 className="text-2xl text-center font-bold">Make your PC speakers sound more balanced with just your phone and Equalizer APO </h2>

                <h6 className='pt-4 pb-2 text-center text-gray-700'>Note: This project is not affiliated with Equalizer APO in any way. <br /> Click <a href='https://sourceforge.net/projects/equalizerapo/' className='underline hover:text-black'>here</a> to go to the official website for Equalizer APO</h6>
                <p className="text-center"></p>
                <button
                  onClick={handleFadeOut}
                  className="p-2 border rounded w-1/2 bg-blue-500 text-white hover:bg-blue-700 cursor-pointer"
                >
                  Begin
                </button>
                
              </div>
            </div>
          )}
          {isMainMenu && (
            <div className={`inset-0 flex flex-col lg:flex-row m-auto justify-center items-center transition-opacity duration-300 ${isFadingIn ? 'opacity-100' : 'opacity-0'}`}>
              {/*left side*/}
              <div className="w-full md:w-1/2 flex flex-col items-center lg:block ">
                <QrCodeDisplay value={randomSequence} />
              </div>

              {/*right side*/}
              <div className="w-full md:w-3/4 flex flex-col space-y-8 lg:ml-16">
                <div className='flex justify-between items-center'>
                  <h2 className="text-2xl font-bold ">Select Parameters</h2>
                  <a href="" className="text-gray-500 hover:text-black pl-4">how to use?</a>
                </div>
                
                <ParameterLabel label="Audio channel:" hint="Select the audio channel to apply the equalizer to">
                  <select
                    value={dropdownValue}
                    onChange={(e) => setDropdownValue(e.target.value)}
                    className="ml-2 p-2 border rounded w-1/2"
                  >
                    <option value="Both">Both</option>
                    <option value="L">L Only</option>
                    <option value="R">R Only</option>
                  </select>
                </ParameterLabel>

                <ParameterLabel label="Number of points:" hint="Adjust the number of peaking filter points in the frequency range">
                  <div className="flex justify-end items-center w-1/2">
                    <input
                      type="range"
                      min="5"
                      max="50"
                      value={sliderValue}
                      onChange={(e) => { setSliderValue(Number(e.target.value)); handleRangeChange(0, rangeValues[0].toString()); }}
                      className="py-2 w-full"
                    />
                    <span className="ml-2">{sliderValue}</span>
                  </div>
                </ParameterLabel>

                <ParameterLabel label="Frequency Range:" hint="Set the frequency range for the equalizer">
                  <div className="flex  justify-between items-center w-1/2">
                    <input
                      type="number"
                      value={rangeValues[0]}
                      onChange={(e) => handleRangeChange(0, e.target.value)}
                      onClick={handleInputClick}
                      className="w-full p-2 border rounded text-center"
                      step="1"
                      min="0"
                      max={rangeValues[1]}
                      style={{ width: 85}}
                    />
                    <span className=" ml-4 mr-4">-</span>
                    <input
                      type="number"
                      value={rangeValues[1]}
                      onChange={(e) => handleRangeChange(1, e.target.value)}
                      onClick={handleInputClick}
                      className="w-full p-2 border rounded text-center"
                      step="1"
                      min={rangeValues[0]}
                      max="20000"
                      style={{ width: 85 }}
                    />
                  </div>
                </ParameterLabel>
                  <label className="flex justify-between items-center text-red-500">
					
                    <span className="mr-4"></span>
                    <input
                      type="button"
                      value="Start"
                      className="p-2 border rounded w-1/2 bg-blue-500 text-white hover:bg-blue-700 cursor-pointer" 
                    />
                  </label>
              </div>
            </div>
          )}
        </div>
        {children}
      </main>
    </div>
  );  
};


export default Layout;