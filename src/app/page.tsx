"use client";
import React, { useState } from "react";
import dynamic from 'next/dynamic';
import DigipinDisplay from '../components/digipin-display';
import { PlaceholdersAndVanishInputDemo } from "@/components/geocoding-search-bar";
import MapContainer from '@/components/openlayers-map/map-container';

const Dashboard = () => {
    const [digipin, setDigipin] = useState<string>('');

    return (
        <div className="h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.3] bg-dot-black/[0.3] relative flex items-center justify-center overflow-hidden">
            <div className="absolute w-full h-full mt-52">
                <MapContainer setDigipin={setDigipin} />
                {digipin && (
                    <div className="text-center mt-2">
                        <h1 className="text-1xl font-bold items-center">YOUR DIGIPIN IS: </h1>
                        <DigipinDisplay digipin={digipin} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;