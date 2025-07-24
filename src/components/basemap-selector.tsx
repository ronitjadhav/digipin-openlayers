import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import { Globe, Satellite, Map, Layers } from 'lucide-react';

export interface BasemapOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  attribution?: string;
}

interface BasemapSelectorProps {
  onBasemapChange: (basemapId: string) => void;
  currentBasemap: string;
}

const BasemapSelector: React.FC<BasemapSelectorProps> = ({ onBasemapChange, currentBasemap }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  const basemapOptions: BasemapOption[] = [
    {
      id: 'mapbox-light',
      name: 'Light',
      icon: <Map className="w-4 h-4" />,
      description: 'Clean light theme',
      attribution: 'Mapbox'
    },
    {
      id: 'mapbox-dark',
      name: 'Dark',
      icon: <Map className="w-4 h-4" />,
      description: 'Dark theme',
      attribution: 'Mapbox'
    },
    {
      id: 'osm',
      name: 'OpenStreetMap',
      icon: <Globe className="w-4 h-4" />,
      description: 'Standard OSM',
      attribution: 'OpenStreetMap'
    },
    {
      id: 'satellite-esri',
      name: 'Satellite',
      icon: <Satellite className="w-4 h-4" />,
      description: 'ESRI World Imagery',
      attribution: 'Esri, Maxar, Earthstar Geographics'
    },
    {
      id: 'terrain',
      name: 'Terrain',
      icon: <Layers className="w-4 h-4" />,
      description: 'Terrain with hills',
      attribution: 'OpenTopoMap'
    }
  ];

  const getCurrentBasemap = () => {
    return basemapOptions.find(option => option.id === currentBasemap) || basemapOptions[0];
  };

  return (
    <div className="relative">
      {/* Main toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 border border-gray-300 dark:border-zinc-600 rounded-lg p-2 shadow-md transition-colors duration-200 flex items-center gap-2"
        title="Change basemap"
      >
        {getCurrentBasemap().icon}
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline">
          {getCurrentBasemap().name}
        </span>
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <>
          {/* Backdrop to close dropdown */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown content */}
          <div className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-lg shadow-lg z-50 overflow-hidden">
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 px-1">
                Select Basemap
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {basemapOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      onBasemapChange(option.id);
                      setIsOpen(false);
                    }}
                    className={`flex flex-col items-center gap-2 p-3 rounded-lg text-center transition-all duration-200 border-2 ${
                      currentBasemap === option.id
                        ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-900 dark:text-blue-100'
                        : 'hover:bg-gray-50 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 border-transparent hover:border-gray-300 dark:hover:border-zinc-600'
                    }`}
                  >
                    <div className={`flex-shrink-0 p-2 rounded-md ${
                      currentBasemap === option.id 
                        ? 'bg-blue-100 dark:bg-blue-800' 
                        : 'bg-gray-100 dark:bg-zinc-600'
                    }`}>
                      {option.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">
                        {option.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {option.description}
                      </div>
                    </div>
                    {currentBasemap === option.id && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BasemapSelector;