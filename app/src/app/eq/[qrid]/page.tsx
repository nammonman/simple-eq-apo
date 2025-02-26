'use client'

'use client'

import { useState, useEffect, useRef, use } from 'react';
import { Heading1, Menu, X } from 'lucide-react';
import { ReactNode } from 'react';

const HintOverlay = ({ hint }: { hint: string }) => (
  <div className="absolute bottom-full mb-2 w-48 p-2 bg-gray-700 text-white text-sm rounded shadow-lg">
    {hint}
  </div>
);

const LabelWithHint = ({ label, hint, children }: { label: string, hint: string, children: ReactNode }) => {
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

const Layout = ({ children, qrid }: { children?: ReactNode, qrid: string }) => {
  const [screenWidth, setScreenWidth] = useState(0);
  const [containerBounds, setContainerBounds] = useState({ top: 0, bottom: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const [randomSequence, setRandomSequence] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');
  const [sliderValue, setSliderValue] = useState(20);
  const [textBoxValue, setTextBoxValue] = useState('');
  const [rangeValues, setRangeValues] = useState([0, 20000]);

  const [isWelcome, setIsWelcome] = useState(true);
  const [isMainMenu, setIsMainMenu] = useState(false);
  const [isWelcomeFadingOut, setIsWelcomeFadingOut] = useState(false);
  const [isMainMenuFadingIn, setIsMainMenuFadingIn] = useState(false);
  
  const [isParameter, setIsParameter] = useState(true);
  const [isPCReadyScreen, setIsPCReadyScreen] = useState(false);
  const [isParameterFadingOut, setIsParameterFadingOut] = useState(false);
  const [isPCReadyFadingIn, setIsPCReadyFadingIn] = useState(false);

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

  const handleWelcomeFadeOut = () => {
    setIsWelcomeFadingOut(true);
    setTimeout(() => {
      setIsWelcome(false);
      setIsMainMenu(true);
      setTimeout(() => {
        setIsMainMenuFadingIn(true);
      }, 300); 
    }, 300); 
  };

  const handleNextClick = () => {
    setIsParameterFadingOut(true);
    setTimeout(() => {
      setIsParameter(false);
      setIsPCReadyScreen(true);
      setTimeout(() => {
        setIsPCReadyFadingIn(true);
      }, 300);
    }, 300);
  };

  const handleBackClick = () => {
    setIsPCReadyFadingIn(false);
    setTimeout(() => {
      setIsPCReadyScreen(false);
      setIsParameter(true);
      setTimeout(() => {
        setIsParameterFadingOut(false);
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
      <main className="relative text-black justify-center items-center min-h-screen flex flex-col p-4">
        <div ref={containerRef} className='relative z-10 bg-white rounded-2xl p-12 w-full sm:w-4/5 lg:w-3/4 shadow-xl mx-auto'>
            <div className={`inset-0 flex flex-col m-auto justify-center items-center`}>
                <img className='max-h-72 mb-8' src="..\test123123.png" alt="" />
                <div className='flex justify-between items-center w-full space-x-12'>
                  <div className={`w-full md:w-3/4 flex flex-col space-y-8 `}>
                    <div className='flex justify-between items-center'>
                      <h2 className="text-2xl font-bold ">Adjusting EQ</h2>
                      <a href="" className="text-gray-500 hover:text-gray-900 pl-4">How to use?</a>
                    </div>
                    <LabelWithHint label="Intensity" hint="Adjust how much the EQ will effect the sound.">
                      <div className="flex justify-end items-center w-1/2">
                        <input
                          type="range"
                          min="10"
                          max="300"
                          value="100"
                          className="py-2 w-full"
                        />
                        <input
                          type="number"
                          value="100"
                          className="w-16 ml-4 p-2 border rounded text-center"
                        />
                      </div>
                    </LabelWithHint>
                    <LabelWithHint label="Width" hint="Adjust how wide each peak is.">
                    <div className="flex justify-end items-center w-1/2">
                        <input
                          type="range"
                          min="10"
                          max="300"
                          value="100"
                          className="py-2 w-full"
                        />
                        <input
                          type="number"
                          value="100"
                          className="w-16 ml-4 p-2 border rounded text-center"
                        />
                      </div>
                    </LabelWithHint>
                    <LabelWithHint label="Preamp" hint="Adjust how loud the overall sound is.">
                    <div className="flex justify-end items-center w-1/2">
                        <input
                          type="range"
                          min="-20"
                          max="20"
                          value="0"
                          className="py-2 w-full"
                        />
                        <input
                          type="number"
                          value="0"
                          className="w-16 ml-4 p-2 border rounded text-center"
                        />
                      </div>
                    </LabelWithHint>

                      <input
                        type="button"
                        value="Reset"
                        className="p-2 border rounded w-full bg-red-500 text-white hover:bg-red-700 cursor-pointer" 
                      />

                  </div>
                  <div className={`w-full md:w-3/4 flex flex-col space-y-8 `}>
                    <div className='flex justify-between items-center'>
                      <h2 className="text-2xl font-bold ">Result</h2>
                      <a href="" className="text-gray-500 hover:text-gray-900 pl-4">How to use?</a>
                    </div>
                    <div className='flex flex-col space-y-8'>
                      <div className='flex flex-col'>
                        <span className='mb-2'>{"simple-eq-" + qrid + ".txt"}</span>
                        <textarea 
                          className='font-mono bg-gray-100 rounded border border-gray-400 h-[155px] p-1' 
                          value="the eq text goes here"
                        ></textarea>
                      </div>
                      <div className="flex justify-end items-center space-x-4">
                          <input
                            type="button"
                            value="Copy"
                            className="p-2 border rounded w-1/2 bg-blue-500 text-white hover:bg-blue-700 cursor-pointer" 
                          />
                          <input
                            type="button"
                            value="Download"
                            className="p-2 border rounded w-1/2 bg-green-500 text-white hover:bg-green-700 cursor-pointer" 
                          />
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
        <div className='pt-3 space-x-6'>
          <a className='font-black underline text-red-500 hover:text-red-700'>UNDER DEVELOPMENT</a>
          <a href="https://github.com/nammonman/simple-eq-apo" className=' text-gray-500 hover:text-gray-700'>Source Code</a>
          <a href="https://linktr.ee/sirapatsiri" className=' text-gray-500 hover:text-gray-700'>About Me</a>
        </div>
        {children}
      </main>
    </div>
  );  
};

const Page = ({ params }: { params: Promise<{ qrid: string }> }) => {
  const unwrappedParams = use(params);
  return <Layout qrid={unwrappedParams.qrid} />;
};

export default Page;