import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import { transform } from 'ol/proj';
import Overlay from 'ol/Overlay';
import { getDIGIPINFromLatLon } from 'digipin';
import { MapboxVectorLayer } from 'ol-mapbox-style';
import './map-container.css';
import { PlaceholdersAndVanishInputDemo } from "@/components/geocoding-search-bar";
import { useTheme } from 'next-themes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface MapContainerProps {
    setDigipin: (digipin: string) => void;
}

const MapContainer: React.FC<MapContainerProps> = ({ setDigipin }) => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstanceRef = useRef<Map | null>(null);
    const popupContainerRef = useRef<HTMLDivElement>(null);
    const popupContentRef = useRef<HTMLDivElement>(null);
    const popupCloserRef = useRef<HTMLAnchorElement>(null);
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const mapboxLightStyle = String(process.env.NEXT_PUBLIC_MAPBOX_LIGHT_STYLE_URL);
    const mapboxDarkStyle = String(process.env.NEXT_PUBLIC_MAPBOX_DARK_STYLE_URL);
    const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
    const { theme } = useTheme();
    const defaultCenter: [number, number] = [78.9629, 20.5937];
    const defaultZoom: number = 4;

    const [currentCenter, setCurrentCenter] = useState<[number, number]>(defaultCenter);
    const [currentZoom, setCurrentZoom] = useState<number>(defaultZoom);

    useEffect(() => {
        if (mapRef.current && mapboxToken) {
            const isDarkTheme = theme === 'dark';
            const layers = [
                new MapboxVectorLayer({
                    styleUrl: mapboxLightStyle,
                    accessToken: mapboxToken,
                }),
            ];

            if (isDarkTheme) {
                layers.push(
                    new MapboxVectorLayer({
                        styleUrl: mapboxDarkStyle,
                        accessToken: mapboxToken,
                    })
                );
            }

            const view = new View({
                center: transform(currentCenter, 'EPSG:4326', 'EPSG:3857'),
                zoom: currentZoom,
            });

            const map = new Map({
                target: mapRef.current,
                layers: layers,
                view: view,
            });

            map.on('moveend', () => {
                const view = map.getView();
                const newCenter = view.getCenter();
                const newZoom = view.getZoom();

                if (newCenter) {
                    const transformedCenter = transform(newCenter as [number, number], 'EPSG:3857', 'EPSG:4326') as [number, number];
                    setCurrentCenter(transformedCenter);
                }

                if (typeof newZoom === 'number') {
                    setCurrentZoom(newZoom);
                }
            });

            const overlay = new Overlay({
                element: popupContainerRef.current!,
                autoPan: false,
            });
            map.addOverlay(overlay);

            map.on('click', async (event: any) => {
                const coordinates = event.coordinate;
                const [longitude, latitude] = transform(coordinates, 'EPSG:3857', 'EPSG:4326');
                const digipin = await getDIGIPINFromLatLon(latitude, longitude);
                setDigipin(digipin);
                popupContentRef.current!.innerHTML = `
                    <p id="digipin" class="tooltip">DIGIPIN: ${digipin}
                        <span class="tooltiptext">Click to copy</span>
                    </p>
                `;
                overlay.setPosition(coordinates);

                document.getElementById('digipin')!.addEventListener('click', () => {
                    copyToClipboard(digipin);
                });
            });

            const clearDigipin = () => {
                setDigipin('');
            };

            popupCloserRef.current!.onclick = function () {
                overlay.setPosition(undefined);
                popupCloserRef.current!.blur();
                clearDigipin();
                return false;
            };

            mapInstanceRef.current = map;

            return () => map.setTarget(undefined);
        }
    }, [mapboxToken, setDigipin, theme]);

    useEffect(() => {
        if (coordinates && mapInstanceRef.current) {
            const [lon, lat] = coordinates;
            const view = mapInstanceRef.current.getView();
            const transformedCoords: [number, number] = transform([lon, lat], 'EPSG:4326', 'EPSG:3857') as [number, number];
            console.log(`Zooming to coordinates: ${transformedCoords}`);
            view.setCenter(transformedCoords);
            view.setZoom(13);
            const digipin = getDIGIPINFromLatLon(lat, lon);
            showPopup(transformedCoords, digipin);
        }
    }, [coordinates]);

    const showPopup = (coordinates: [number, number], digipin: string) => {
        popupContentRef.current!.innerHTML = `
        <p id="popup-content" class="tooltip">DIGIPIN: ${digipin}
            <span class="tooltiptext">Click to copy</span>
        </p>
    `;
        const overlay = mapInstanceRef.current!.getOverlays().getArray().find(o => o.getElement() === popupContainerRef.current) as Overlay;
        overlay.setPosition(coordinates);

        document.getElementById('popup-content')!.addEventListener('click', () => {
            copyToClipboard(digipin);
        });
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success('Copied to clipboard!');
        }).catch(err => {
            toast.error('Failed to copy!');
        });
    };

    return (
        <div className='relative'>
            <div ref={mapRef} className='h-[calc(100vh-200px)] mt-1 ml-8 mr-8 rounded-3xl overflow-hidden relative'>
                <div className='absolute bottom-4 z-10 w-full px-4'>
                    <PlaceholdersAndVanishInputDemo onLocationSelect={setCoordinates} />
                </div>
            </div>
            <div ref={popupContainerRef} className='ol-popup'>
                <a ref={popupCloserRef} href='#' className='ol-popup-closer'></a>
                <div ref={popupContentRef} className='ol-popup-content'></div>
            </div>
            <ToastContainer theme={theme === 'dark' ? 'dark' : 'light'} />
        </div>
    );
};

export default MapContainer;