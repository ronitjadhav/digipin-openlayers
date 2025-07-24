import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { queryGeonames, GeonamesOptions} from "@geospatial-sdk/geocoding";
import digipin from "digipin";

interface PlaceholdersAndVanishInputDemoProps {
    onLocationSelect: (coordinates: [number, number], searchType: 'place' | 'coordinates' | 'digipin') => void;
}

export function PlaceholdersAndVanishInputDemo({ onLocationSelect }: PlaceholdersAndVanishInputDemoProps) {
    const [responseData, setResponseData] = useState<{ label: string; geom: any }[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [selectedLocation, setSelectedLocation] = useState<{ label: string; geom: any } | null>(null);
    const [selectedIndex, setSelectedIndex] = useState(-1); // For keyboard navigation
    const [showDropdown, setShowDropdown] = useState(false);
    const placeholders = [
        "Click on the map to get Digipin",
        "Search with a place name",
        "Search using Digipin",
        "Search with coordinates (lat, lon)",
    ];

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        if (value.trim() === '') {
            setResponseData([]);
            setShowDropdown(false);
            setSelectedIndex(-1);
            return;
        }

        try {
            const res = await queryGeonames(value, { maxRows: 4, username: "gn_ui", country: "IN" } as GeonamesOptions);
            const mappedResults = res.map(item => ({ label: item.label, geom: item.geom }));
            setResponseData(mappedResults);
            setShowDropdown(mappedResults.length > 0);
            
            // Automatically select the first option when results are available
            if (mappedResults.length > 0) {
                setSelectedIndex(0);
            } else {
                setSelectedIndex(-1);
            }
        } catch (error) {
            console.error("Error querying geonames:", error);
            setShowDropdown(false);
            setSelectedIndex(-1);
        }
    };

    const handleSelect = (location: { label: string; geom: any }) => {
        setSelectedLocation(location);
        setInputValue(location.label);
        setResponseData([]);
        setShowDropdown(false);
        setSelectedIndex(-1);
        
        // Immediately navigate to the selected location
        const { geom } = location;
        if (geom.type === "Point" && Array.isArray(geom.coordinates)) {
            onLocationSelect([geom.coordinates[0], geom.coordinates[1]], 'place'); // place search
        }
        
        console.log(`Selected location: ${location.label}, Geom: ${JSON.stringify(location.geom)}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!showDropdown || responseData.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => 
                    prev < responseData.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : 0); // Don't go below 0, keep first selected
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < responseData.length) {
                    handleSelect(responseData[selectedIndex]);
                } else if (responseData.length > 0) {
                    // If no specific selection, use first option
                    handleSelect(responseData[0]);
                }
                break;
            case 'Escape':
                setShowDropdown(false);
                setSelectedIndex(-1);
                break;
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // If there are search results available, use the selected index (default is first option)
        if (showDropdown && responseData.length > 0 && selectedIndex >= 0) {
            handleSelect(responseData[selectedIndex]);
            return;
        }
        
        // If there are search results but no specific selection, use the first one
        if (showDropdown && responseData.length > 0) {
            handleSelect(responseData[0]);
            return;
        }
        
        // Check for coordinate patterns first
        const coordinatePatterns = [
            // Pattern 1: "lat, lon" or "lat,lon"
            /^(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)$/,
            // Pattern 2: "lat lon" (space separated)
            /^(-?\d+\.?\d*)\s+(-?\d+\.?\d*)$/,
        ];
        
        let coordinateMatch = null;
        for (const pattern of coordinatePatterns) {
            coordinateMatch = inputValue.match(pattern);
            if (coordinateMatch) break;
        }
        
        if (coordinateMatch) {
            const lat = parseFloat(coordinateMatch[1]);
            const lon = parseFloat(coordinateMatch[2]);
            
            // Validate coordinate ranges
            if (lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
                console.log('Valid coordinates found:', { lat, lon });
                onLocationSelect([lon, lat], 'coordinates'); // coordinates search
                await new Promise(resolve => setTimeout(resolve, 500));
                setInputValue('');
                setShowDropdown(false);
                setSelectedIndex(-1);
                return;
            } else {
                console.error('Invalid coordinate ranges:', { lat, lon });
            }
        }
        
        const isDigipin = /^[0-9A-Z-]+$/.test(inputValue);
        if (isDigipin) {
            try {
                const coordinates = digipin.getLatLonFromDIGIPIN(inputValue);
                // @ts-ignore
                onLocationSelect([coordinates?.longitude, coordinates?.latitude], 'digipin'); // digipin search
            } catch (error) {
                console.error("Error getting coordinates from Digipin:", error);
            }
        } else if (selectedLocation) {
            const { geom } = selectedLocation;
            if (geom.type === "Point" && Array.isArray(geom.coordinates)) {
                onLocationSelect([geom.coordinates[0], geom.coordinates[1]], 'place'); // place search
            }
        }

        await new Promise(resolve => setTimeout(resolve, 500));
        setInputValue('');
        setShowDropdown(false);
        setSelectedIndex(-1);
    };

    return (
        <div className="flex flex-col items-center w-full">
            {showDropdown && responseData.length > 0 && (
                <ul className="list-none p-0 mb-2 w-full max-w-md bg-white dark:bg-zinc-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg">
                    <AnimatePresence>
                        {responseData.map((location, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3, ease: "linear" }}
                                className={`p-2 border-b border-gray-300 dark:border-gray-700 text-black dark:text-white last:border-b-0 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${
                                    selectedIndex === index ? 'bg-blue-100 dark:bg-blue-900' : ''
                                }`}
                                onClick={() => handleSelect(location)}
                                onMouseEnter={() => setSelectedIndex(index)}
                            >
                                {location.label}
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </ul>
            )}
            <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
                onKeyDown={handleKeyDown}
                value={inputValue}
            />
        </div>
    );
}