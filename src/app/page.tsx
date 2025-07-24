"use client";
import React, { useState } from "react";
import dynamic from 'next/dynamic';
import FloatingDigipinPanel from '../components/floating-digipin-panel';
import { PlaceholdersAndVanishInputDemo } from "@/components/geocoding-search-bar";
import MapContainer from '@/components/openlayers-map/map-container';
import { ToastContainer } from 'react-toastify';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const [digipin, setDigipin] = useState<string>('');
    const { theme } = useTheme();

    const handleCloseDigipinPanel = () => {
        setDigipin('');
    };

    return (
        <>
            {/* SEO-friendly hidden content for search engines */}
            <div className="sr-only">
                <h1>DIGIPIN Generator - Digital Postal Index Number for India</h1>
                <p>
                    Generate your DIGIPIN (Digital Postal Index Number) for any location in India. 
                    Our interactive map tool provides precise 10-digit alphanumeric geocodes based on 
                    4m x 4m grid system developed by India Post and IIT Hyderabad.
                </p>
                <h2>Features:</h2>
                <ul>
                    <li>Interactive map interface with OpenLayers</li>
                    <li>Click any location to get DIGIPIN code</li>
                    <li>Search by address or coordinates</li>
                    <li>Copy DIGIPIN codes to clipboard</li>
                    <li>Dark and light theme support</li>
                    <li>Mobile responsive design</li>
                </ul>
                <h2>About DIGIPIN:</h2>
                <p>
                    DIGIPIN is India&apos;s standardized geo-coded addressing system that divides the country&apos;s 
                    geographical territory into uniform 4-meter by 4-meter units. Each unit gets a unique 
                    10-digit alphanumeric code derived from latitude and longitude coordinates.
                </p>
            </div>

            <div className="min-h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.3] bg-dot-black/[0.3] relative flex items-center justify-center p-2 sm:p-4">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full h-[calc(100vh-1rem)] sm:h-[calc(100vh-2rem)] relative rounded-lg sm:rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-xl dark:shadow-neutral-900/40"
                >
                    <MapContainer setDigipin={setDigipin} />
                    <FloatingDigipinPanel digipin={digipin} onClose={handleCloseDigipinPanel} />
                </motion.div>
            </div>
            
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={theme === 'dark' ? 'dark' : 'light'}
                className="toast-container"
                toastClassName="toast-custom"
                bodyClassName="toast-body"
                progressClassName="toast-progress"
            />
        </>
    );
}

export default Dashboard;