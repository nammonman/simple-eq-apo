'use client'

import { useState, useEffect } from 'react';
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
  const [isSquareVisible, setIsSquareVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

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
      setIsSquareVisible(false);
    }, 500); // Match the duration of the CSS transition
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden relative" style={{ fontFamily: 'Anuphan, sans-serif' }}>
      {/* Background with blurred pastel balls */}
      <div className="absolute inset-0 z-0">

        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-violet-300 rounded-full filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-1/4 right-1/2 w-96 h-96 bg-indigo-700 rounded-full filter blur-3xl opacity-50"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-300 rounded-full filter blur-3xl opacity-50"></div>
        <div className="absolute top-1/4 left-1/2 w-96 h-96 bg-blue-300 rounded-full filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-300 rounded-full filter blur-3xl opacity-50"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <span className="text-gray-700 font-bold">Simple EQ-APO</span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4">
                <a href="/" className="text-gray-700 hover:text-gray-900">Home</a>
                <a href="/search" className="text-gray-700 hover:text-gray-900">Search</a>
                <a href="/profile" className="text-gray-700 hover:text-gray-900">Profile</a>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden z-100">
              <div className="px-2 pt-2 pb-3 space-y-1 z-100">
                <a
                  href="/"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Home
                </a>
                <a
                  href="/search"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Search
                </a>
                <a
                  href="/profile"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Profile
                </a>
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="text-black max-w-7xl mx-auto px-4 py-6 h-[calc(100vh-4rem)]">
              {isSquareVisible && (
                <div className={`absolute inset-0 z-20 flex flex-col md:flex-row m-auto max-w-4xl w-10/12 min-h-96 h-fit bg-white rounded-2xl p-16 justify-center items-center transition-opacity duration-500 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
                  <div className='pt-24 text-white'>.</div>
                  {/*left side*/}
                  {/*<div className="w-full md:w-1/2 p-8 flex flex-col space-y-4 items-center">
                  <h2 className="text-6xl font-black text-center" style={{ fontFamily: '"Racing Sans One", serif' }}>Simple EQ-APO</h2>
                  </div>*/}
                  {/*right side*/}
                  
                  <div className="w-full md:w-3/4 p-8 flex flex-col space-y-4 justify-between items-center">
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
                  <div className='pt-24 text-white'>.</div>
                </div>
              )}
              <div className='absolute inset-0 z-10 flex flex-col lg:flex-row m-auto max-w-4xl w-10/12 min-h-96 h-fit bg-white rounded-2xl p-16  shadow-xl justify-center items-center '>
              {/*left side*/}
              <div className="w-full md:w-1/2 flex flex-col items-center lg:block">
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
                      min="10"
                      max="50"
                      value={sliderValue}
                      onChange={(e) => { setSliderValue(Number(e.target.value)); handleRangeChange(0, rangeValues[0].toString()); }}
                      className="py-2 w-full"
                    />
                    <span className="ml-2">{sliderValue}</span>
                  </div>
                </ParameterLabel>

                <ParameterLabel label="Frequency Range:" hint="Set the frequency range for the equalizer">
                  <div className="flex flex-col sm:flex-row justify-between items-center w-1/2">
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

                <label className="flex justify-between items-center">
                  <span className="mr-4"></span>
                  <input
                    type="button"
                    value="Start"
                    className="p-2 border rounded w-1/2 bg-blue-500 text-white hover:bg-blue-700 cursor-pointer" 
                  />
                </label>
                
                
              </div>
              
            </div>
                
            
          
            
          
            
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;