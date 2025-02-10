'use client'

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import QrCodeDisplay from '../components/QrCodeDisplay'; 
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [randomSequence] = useState(Math.random().toString(36).substring(2, 12)); 
  const [dropdownValue, setDropdownValue] = useState('');
  const [sliderValue, setSliderValue] = useState(20);
  const [textBoxValue, setTextBoxValue] = useState('');
  const [rangeValues, setRangeValues] = useState([0, 20000]);

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
      return newValues;
    });
  };

  const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.currentTarget.select();
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-gray-700 font-bold">Audio Recorder App</span>
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
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="/"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Home
              </a>
              <a
                href="/recordings"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                My Recordings
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
      <main className="max-w-7xl mx-auto px-4 py-6 h-[calc(100vh-4rem)]">
        <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
          <div className="w-full md:w-3/4 lg:w-3/4 bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-black items-center">
            {/* QR Code: Mobile Top, Desktop Left */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:block">
              <QrCodeDisplay value={randomSequence} />
            </div>

            {/* Right Side: Control Panel */}
            <div className="w-full md:w-3/4 flex flex-col space-y-4">
              <h2 className="text-2xl font-bold">Control Panel</h2>
              <label className="flex justify-between items-center">
                <span className="mr-4">Dropdown:</span> 
                <select
                  value={dropdownValue}
                  onChange={(e) => setDropdownValue(e.target.value)}
                  className="ml-2 p-2 border rounded w-1/2"
                >
                  <option value="Both">Both</option>
                  <option value="L">L Only</option>
                  <option value="R">R Only</option>
                </select>
              </label>

              <label className="flex justify-between items-center">
              <span className="mr-4">Slider:</span>
                <div className="flex justify-end items-center w-1/2">
                  <input
                    type="range"
                    min="10"
                    max="30"
                    value={sliderValue}
                    onChange={(e) => setSliderValue(Number(e.target.value))}
                    className="py-2 w-full"
                  />
                  <span className="ml-2">{sliderValue}</span>
                </div>
              </label>

              <label className="flex justify-between items-center">
                <span className="mr-4">Text Box:</span>
                <input
                  type="text"
                  value={textBoxValue}
                  onChange={(e) => setTextBoxValue(e.target.value)}
                  className="ml-2 p-2 border rounded w-1/2"
                />
              </label>

              <label className="flex justify-between items-center">
                <span className="mr-4">Range:</span>
                <div className="flex justify-end items-center w-1/2">
                  <input
                    type="number"
                    value={rangeValues[0]}
                    onChange={(e) => handleRangeChange(0, e.target.value)}
                    onClick={handleInputClick}
                    className="w-full p-2 border rounded text-center"
                    step="1"
                    min="0"
                    max={rangeValues[1]}
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
                  />
                </div>
              </label>

              <label className="flex justify-between items-center">
                <span className="mr-4">Button:</span>
                <input
                  type="button"
                  value="Start"
                  className="p-2 border rounded w-1/2 bg-blue-500 text-white hover:bg-blue-700 cursor-pointer" 
                />
              </label>
            </div>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
};

export default Layout;