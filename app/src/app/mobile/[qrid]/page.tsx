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
  
  const [isPCReady, setIsPCReady] = useState(false);

  const [isMainMenu, setIsMainMenu] = useState(true);
  const [isMainMenuFadingOut, setIsMainMenuFadingOut] = useState(false);
  const [isInstruction, setIsInstruction] = useState(false);
  const [isInstructionFadingIn, setIsInstructionFadingIn] = useState(false);

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

  useEffect(() => {
    if (isMainMenu) {
      const timer = setTimeout(() => {
        setIsPCReady(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isMainMenu]);

  const handleNextClick = () => {
    setIsMainMenuFadingOut(true);
    setTimeout(() => {
      setIsMainMenu(false);
      setIsInstruction(true);
      setTimeout(() => {
        setIsInstructionFadingIn(true);
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
        <div ref={containerRef} className='relative z-10 bg-white rounded-2xl p-16 w-full sm:w-4/5 lg:w-3/4 shadow-xl mx-auto'>
          {isMainMenu && (  
            <div className={`inset-0 flex flex-col lg:flex-row m-auto justify-center items-center transition-opacity duration-300 ${isMainMenuFadingOut ? 'opacity-0' : 'opacity-100'}`}>
                <div className={`w-full md:w-3/4 flex flex-col space-y-8 lg:ml-16 `}>
                  <div className='flex justify-between items-center'>
                    <h2 className="text-2xl font-bold ">Your Mobile side is ready</h2>
                  </div>
                  <div>
                    You are connected to
                    <br />
                    <span className="mt-4 text-lg font-mono font-black mb-4 lg:mb-0">{qrid}. </span>
                    <br />
                    (Please check if this matches the qr code on your PC)
                    <br />
                    <br />
                    The test will automatically start when you press "Start Test" on your mobile device.
                    <br />
                    <br />
                    Both of your devices should be on the same network for the best results.
                    <br />
                    <br />
                    <div className="flex mt-2 items-center">
                      {!isPCReady ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent"></div>
                          <span className="ml-2">Waiting for PC...</span>
                        </>
                      ) : (
                        <>
                          <div className="h-4 w-4 text-green-500 font-black mb-2">✓</div>
                          <span className="ml-2">Your PC is ready.</span>
                        </>
                      )}
                    </div>
                  </div>
                  <label className="flex justify-between items-center">
                  <span className="mt-4 font-mono font-black mb-4 mr-4 lg:mb-0">{qrid}</span>
                    <input
                      type="button"
                      value="Continue"
                      onClick={handleNextClick}
                      disabled={!isPCReady}
                      className={`p-2 border rounded w-1/2 text-white cursor-pointer ${
                        isPCReady 
                          ? 'bg-blue-500 hover:bg-blue-700' 
                          : 'bg-gray-400 cursor-not-allowed'
                      }`}
                    />
                  </label>
                </div>
            </div>
          )}
          {isInstruction && (  
            <div className={`inset-0 flex flex-col lg:flex-row m-auto justify-center items-center transition-opacity duration-300 ${isInstructionFadingIn ? 'opacity-100' : 'opacity-0'}`}>
                <div className={`w-full md:w-3/4 flex flex-col space-y-8 lg:ml-16 `}>
                  <div className='flex justify-between items-center'>
                    <h2 className="text-2xl font-bold ">Prepare your setup</h2>
                  </div>
                  <div>
                      <span>🤫 Make sure your environment is as quiet as possible.</span>
                      <br />
                      <br />
                      <span>🔊 Set the volume of your PC to your normal listening volume.</span>
                      <br />
                      <br />
                      <span>👂 Hold your mobile device up to your ususal head position when listening to music.</span>
                      <br />
                      <br />
                      <span>📱 Press the "Start Test" button when you are ready.</span>
                  </div>
                  <label className="flex justify-between items-center">
                  <span className="mt-4 font-mono font-black mb-4 mr-4 lg:mb-0">{qrid}</span>
                    <input
                      type="button"
                      value="Start Test."
                      disabled={!isPCReady}
                      className={`p-2 border rounded w-1/2 text-white cursor-pointer ${
                        isPCReady 
                          ? 'bg-green-500 hover:bg-green-700' 
                          : 'bg-gray-400 cursor-not-allowed'
                      }`}
                    />
                  </label>
                </div>
            </div>
          )}
        </div>
        <div className='pt-3 space-x-6'>
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