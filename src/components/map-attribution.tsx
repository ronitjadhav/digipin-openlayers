import React from 'react';
import { BasemapOption } from './basemap-selector';

interface MapAttributionProps {
  currentBasemap: string;
}

const MapAttribution: React.FC<MapAttributionProps> = ({ currentBasemap }) => {
  const getAttributionText = (basemapId: string): string => {
    switch (basemapId) {
      case 'mapbox-light':
      case 'mapbox-dark':
        return '© Mapbox © OpenStreetMap';
      case 'osm':
        return '© OpenStreetMap contributors';
      case 'satellite-esri':
        return '© Esri, Maxar, Earthstar Geographics, and the GIS User Community';
      case 'terrain':
        return '© OpenTopoMap (CC-BY-SA) © OpenStreetMap contributors';
      default:
        return '© OpenStreetMap contributors';
    }
  };

  const getAttributionLinks = (basemapId: string) => {
    switch (basemapId) {
      case 'mapbox-light':
      case 'mapbox-dark':
        return [
          { text: 'Mapbox', url: 'https://www.mapbox.com/' },
          { text: 'OpenStreetMap', url: 'https://www.openstreetmap.org/copyright' }
        ];
      case 'osm':
        return [
          { text: 'OpenStreetMap', url: 'https://www.openstreetmap.org/copyright' }
        ];
      case 'satellite-esri':
        return [
          { text: 'Esri', url: 'https://www.esri.com/' },
          { text: 'Terms', url: 'https://www.esri.com/en-us/legal/terms/full-master-agreement' }
        ];
      case 'terrain':
        return [
          { text: 'OpenTopoMap', url: 'https://opentopomap.org/' },
          { text: 'OpenStreetMap', url: 'https://www.openstreetmap.org/copyright' }
        ];
      default:
        return [
          { text: 'OpenStreetMap', url: 'https://www.openstreetmap.org/copyright' }
        ];
    }
  };

  const links = getAttributionLinks(currentBasemap);

  return (
    <div className="absolute bottom-2 left-2 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm text-xs text-gray-600 dark:text-gray-400 px-2 py-1 rounded shadow-sm border border-gray-200 dark:border-zinc-600 z-30 max-w-[200px] sm:max-w-none">
      <span className="mr-1">©</span>
      {links.map((link, index) => (
        <React.Fragment key={link.text}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 dark:hover:text-blue-400 underline"
          >
            {link.text}
          </a>
          {index < links.length - 1 && <span className="mx-1 hidden sm:inline">•</span>}
          {index < links.length - 1 && <span className="block sm:hidden"></span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default MapAttribution;