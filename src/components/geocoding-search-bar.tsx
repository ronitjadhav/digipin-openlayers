import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { queryGeonames, GeonamesOptions} from "@geospatial-sdk/geocoding";
import digipin from "digipin";

interface PlaceholdersAndVanishInputDemoProps {
    onLocationSelect: (coordinates: [number, number]) => void;
}

export function PlaceholdersAndVanishInputDemo({ onLocationSelect }: PlaceholdersAndVanishInputDemoProps) {
    const [responseData, setResponseData] = useState<{ label: string; geom: any }[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [selectedLocation, setSelectedLocation] = useState<{ label: string; geom: any } | null>(null);
    const placeholders = [
        "Click on the map to get Digipin",
        "Search with a place name",
        "Search using Digipin",
    ];

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        if (value.trim() === '') {
            setResponseData([]);
            return;
        }

        try {
            const res = await queryGeonames(value, { maxRows: 4, username: "gn_ui", country: "IN" } as GeonamesOptions);
            setResponseData(res.map(item => ({ label: item.label, geom: item.geom })));
        } catch (error) {
            console.error("Error querying geonames:", error);
        }
    };

    const handleSelect = (location: { label: string; geom: any }) => {
        setSelectedLocation(location);
        setInputValue(location.label);
        setResponseData([]);
        console.log(`Selected location: ${location.label}, Geom: ${JSON.stringify(location.geom)}`);
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isDigipin = /^[0-9A-Z-]+$/.test(inputValue);
        if (isDigipin) {
            try {
                const coordinates = digipin.getLatLonFromDIGIPIN(inputValue);
                // @ts-ignore
                onLocationSelect([coordinates?.longitude, coordinates?.latitude]);
            } catch (error) {
                console.error("Error getting coordinates from Digipin:", error);
            }
        } else if (selectedLocation) {
            const { geom } = selectedLocation;
            if (geom.type === "Point" && Array.isArray(geom.coordinates)) {
                onLocationSelect([geom.coordinates[0], geom.coordinates[1]]);
            }
        }

        await new Promise(resolve => setTimeout(resolve, 500));
        setInputValue('');
    };

    return (
        <div className="flex flex-col items-center w-full">
            {responseData.length > 0 && (
                <ul className="list-none p-0 mb-2 w-full max-w-md bg-white dark:bg-zinc-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg">
                    <AnimatePresence>
                        {responseData.map((location, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3, ease: "linear" }}
                                className="p-2 border-b border-gray-300 dark:border-gray-700 text-black dark:text-white last:border-b-0 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                                onClick={() => handleSelect(location)}
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
                value={inputValue}
            />
        </div>
    );
}