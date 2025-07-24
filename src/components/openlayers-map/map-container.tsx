import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import { Map, View, Feature } from 'ol';
import { transform } from 'ol/proj';
import { Vector as VectorLayer, Tile as TileLayer } from 'ol/layer';
import { Vector as VectorSource, OSM, XYZ } from 'ol/source';
import { Polygon, Point } from 'ol/geom';
import { Style, Fill, Stroke, Circle, Text } from 'ol/style';
import { getDIGIPINFromLatLon, getBoundsFromDIGIPIN } from 'digipin';
import { MapboxVectorLayer } from 'ol-mapbox-style';
import './map-container.css';
import { PlaceholdersAndVanishInputDemo } from "@/components/geocoding-search-bar";
import BasemapSelector from "@/components/basemap-selector";
import MapAttribution from "@/components/map-attribution";
import { useTheme } from 'next-themes';

interface MapContainerProps {
    setDigipin: (digipin: string) => void;
}

const MapContainer: React.FC<MapContainerProps> = ({ setDigipin }) => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstanceRef = useRef<Map | null>(null);
    const vectorSourceRef = useRef<VectorSource | null>(null);
    const baseLayerRef = useRef<TileLayer<any> | MapboxVectorLayer | null>(null);
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const mapboxLightStyle = String(process.env.NEXT_PUBLIC_MAPBOX_LIGHT_STYLE_URL);
    const mapboxDarkStyle = String(process.env.NEXT_PUBLIC_MAPBOX_DARK_STYLE_URL);
    const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
    const [isSearchResult, setIsSearchResult] = useState(false); // Track if current coordinates are from search
    const [currentBasemap, setCurrentBasemap] = useState('mapbox-light');
    const [isUserSelectedBasemap, setIsUserSelectedBasemap] = useState(false); // Track if user manually selected a basemap
    const { theme } = useTheme();
    const defaultCenter: [number, number] = [78.9629, 20.5937];
    const defaultZoom: number = 4;
    const maxZoom: number = 22; // Maximum zoom level - increased for better digipin visibility
    const digipinSelectZoom: number = 20; // Specific zoom level when selecting a digipin
    const searchZoom: number = 14; // City-level zoom for search results

    // Create basemap layer based on selected basemap
    const createBasemapLayer = (basemapId: string): TileLayer<any> | MapboxVectorLayer => {
        switch (basemapId) {
            case 'mapbox-light':
                return new MapboxVectorLayer({
                    styleUrl: mapboxLightStyle,
                    accessToken: mapboxToken,
                });
            case 'mapbox-dark':
                return new MapboxVectorLayer({
                    styleUrl: mapboxDarkStyle,
                    accessToken: mapboxToken,
                });
            case 'osm':
                return new TileLayer({
                    source: new OSM(),
                });
            case 'satellite-esri':
                return new TileLayer({
                    source: new XYZ({
                        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                        maxZoom: 19,
                    }),
                });
            case 'terrain':
                return new TileLayer({
                    source: new XYZ({
                        url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png',
                        maxZoom: 17,
                    }),
                });
            default:
                return new TileLayer({
                    source: new OSM(),
                });
        }
    };

    // Handle basemap change
    const handleBasemapChange = (basemapId: string) => {
        if (!mapInstanceRef.current) return;

        setCurrentBasemap(basemapId);
        setIsUserSelectedBasemap(true); // Mark that user has manually selected a basemap
        
        const newBaseLayer = createBasemapLayer(basemapId);
        
        // Remove existing base layer
        if (baseLayerRef.current) {
            mapInstanceRef.current.removeLayer(baseLayerRef.current);
        }
        
        // Add new base layer at index 0 (bottom)
        mapInstanceRef.current.getLayers().insertAt(0, newBaseLayer);
        baseLayerRef.current = newBaseLayer;
    };

    // Create enhanced polygon style with multiple visibility features
    const createPolygonStyle = (digipin: string) => {
        return [
            // Main polygon fill with translucent background
            new Style({
                fill: new Fill({
                    color: 'rgba(59, 130, 246, 0.2)', // Slightly reduced opacity for cleaner look at high zoom
                }),
                stroke: new Stroke({
                    color: '#3b82f6', // Solid blue border
                    width: 3, // Reduced width for cleaner look at high zoom
                }),
            }),
            // Secondary stroke for better visibility
            new Style({
                stroke: new Stroke({
                    color: '#ffffff', // White outline
                    width: 4, // Reduced width
                    lineDash: [0],
                }),
            }),
            // Animated dashed border effect
            new Style({
                stroke: new Stroke({
                    color: '#1d4ed8', // Darker blue dashed line
                    width: 1.5, // Reduced width for subtle effect
                    lineDash: [6, 3], // Adjusted dash pattern
                }),
            }),
        ];
    };

    // Create corner marker style
    const createCornerMarkerStyle = () => {
        return new Style({
            image: new Circle({
                radius: 5, // Reduced radius for better proportions at high zoom
                fill: new Fill({
                    color: '#ef4444', // Red fill
                }),
                stroke: new Stroke({
                    color: '#ffffff', // White border
                    width: 2, // Reduced border width
                }),
            }),
        });
    };

    // Create center marker style with label
    const createCenterMarkerStyle = (digipin: string) => {
        return [
            new Style({
                image: new Circle({
                    radius: 6, // Reduced radius for better proportions at high zoom
                    fill: new Fill({
                        color: '#059669', // Green fill
                    }),
                    stroke: new Stroke({
                        color: '#ffffff', // White border
                        width: 2, // Reduced border width
                    }),
                }),
            }),
            new Style({
                text: new Text({
                    text: digipin,
                    font: 'bold 14px Arial, sans-serif', // Slightly reduced font size for balance
                    fill: new Fill({
                        color: '#1f2937', // Dark text
                    }),
                    stroke: new Stroke({
                        color: '#ffffff', // White outline for text
                        width: 3, // Reduced outline width
                    }),
                    offsetY: 22, // Adjusted position relative to smaller marker
                    textAlign: 'center',
                }),
            }),
        ];
    };

    // Function to add polygon boundary with enhanced visibility
    const addPolygonBoundary = async (lat: number, lon: number) => {
        if (!vectorSourceRef.current || !mapInstanceRef.current) return;

        // Clear existing features
        vectorSourceRef.current.clear();

        try {
            const digipin = await getDIGIPINFromLatLon(lat, lon);
            const bounds = getBoundsFromDIGIPIN(digipin);
            
            if (!bounds || bounds === "Invalid DIGIPIN" || typeof bounds === "string") return;

            const { minLat, maxLat, minLon, maxLon } = bounds;

            // Create polygon coordinates (rectangle)
            const polygonCoords = [
                [minLon, minLat], // Bottom-left
                [maxLon, minLat], // Bottom-right
                [maxLon, maxLat], // Top-right
                [minLon, maxLat], // Top-left
                [minLon, minLat], // Close the polygon
            ];

            // Transform coordinates to map projection
            const transformedCoords = polygonCoords.map(coord => 
                transform(coord, 'EPSG:4326', 'EPSG:3857')
            );

            // Create main polygon feature
            const polygonFeature = new Feature({
                geometry: new Polygon([transformedCoords]),
            });
            polygonFeature.setStyle(createPolygonStyle(digipin));

            // Create corner markers
            const corners = [
                [minLon, minLat], // Bottom-left
                [maxLon, minLat], // Bottom-right
                [maxLon, maxLat], // Top-right
                [minLon, maxLat], // Top-left
            ];

            const cornerFeatures = corners.map(corner => {
                const transformedCorner = transform(corner, 'EPSG:4326', 'EPSG:3857');
                const cornerFeature = new Feature({
                    geometry: new Point(transformedCorner),
                });
                cornerFeature.setStyle(createCornerMarkerStyle());
                return cornerFeature;
            });

            // Create center marker
            const centerLat = (minLat + maxLat) / 2;
            const centerLon = (minLon + maxLon) / 2;
            const centerMarkerCoords = transform([centerLon, centerLat], 'EPSG:4326', 'EPSG:3857');
            
            const centerFeature = new Feature({
                geometry: new Point(centerMarkerCoords),
            });
            centerFeature.setStyle(createCenterMarkerStyle(digipin));

            // Add all features to the vector source
            vectorSourceRef.current.addFeature(polygonFeature);
            cornerFeatures.forEach(feature => vectorSourceRef.current?.addFeature(feature));
            vectorSourceRef.current.addFeature(centerFeature);

            // Smooth zoom to the clicked location with digipin visualization
            const view = mapInstanceRef.current.getView();
            const animationCenterCoords = transform([centerLon, centerLat], 'EPSG:4326', 'EPSG:3857');
            
            // Animate directly to the center point with appropriate zoom
            view.animate({
                center: animationCenterCoords,
                zoom: digipinSelectZoom,
                duration: 800,
            });

        } catch (error) {
            console.error('Error creating polygon boundary:', error);
        }
    };

    // Handle search location selection (less aggressive zoom, no digipin markers)
    const handleSearchLocation = (coords: [number, number], isDigipinSearch: boolean = false) => {
        console.log('handleSearchLocation called with coords:', coords);
        console.log('Is digipin search:', isDigipinSearch);
        setIsSearchResult(!isDigipinSearch); // If it's a digipin search, don't treat it as a regular search result
        setCoordinates(coords);
    };

    useEffect(() => {
        if (mapRef.current) {
            // Initialize with default basemap or theme-appropriate mapbox style
            const defaultBasemap = mapboxToken ? 
                (theme === 'dark' ? 'mapbox-dark' : 'mapbox-light') : 
                'osm';
            
            setCurrentBasemap(defaultBasemap);
            const baseLayer = createBasemapLayer(defaultBasemap);
            baseLayerRef.current = baseLayer;

            // Create vector source and layer for polygons
            const vectorSource = new VectorSource();
            vectorSourceRef.current = vectorSource;

            const vectorLayer = new VectorLayer({
                source: vectorSource,
                zIndex: 1000, // Ensure polygons appear above the base map
            });

            const view = new View({
                center: transform(defaultCenter, 'EPSG:4326', 'EPSG:3857'),
                zoom: defaultZoom,
                maxZoom: maxZoom,
            });

            const map = new Map({
                target: mapRef.current,
                layers: [baseLayer, vectorLayer],
                view: view,
            });

            // Handle map click events
            map.on('click', async (event: any) => {
                const clickCoordinates = event.coordinate;
                const [longitude, latitude] = transform(clickCoordinates, 'EPSG:3857', 'EPSG:4326');
                
                try {
                    const digipin = await getDIGIPINFromLatLon(latitude, longitude);
                    setDigipin(digipin);
                    setIsSearchResult(false); // Reset search result flag when clicking on map
                    
                    // Add polygon boundary visualization
                    await addPolygonBoundary(latitude, longitude);
                } catch (error) {
                    console.error('Error getting DIGIPIN:', error);
                }
            });

            mapInstanceRef.current = map;

            return () => map.setTarget(undefined);
        }
    }, [mapboxToken, setDigipin]); // Removed theme dependency to prevent recreation

    // Handle coordinate updates from search
    useEffect(() => {
        const handleCoordinates = async () => {
            if (coordinates && mapInstanceRef.current) {
                const [lon, lat] = coordinates;
                const view = mapInstanceRef.current.getView();
                const transformedCoords: [number, number] = transform([lon, lat], 'EPSG:4326', 'EPSG:3857') as [number, number];
                
                console.log(`Zooming to coordinates: ${transformedCoords}`);
                console.log('Is search result:', isSearchResult);
                view.setCenter(transformedCoords);
                
                if (isSearchResult) {
                    // For search results: moderate zoom and no digipin markers
                    console.log('Applying search zoom level:', searchZoom);
                    view.setZoom(searchZoom);
                    // Clear any existing digipin markers
                    if (vectorSourceRef.current) {
                        vectorSourceRef.current.clear();
                    }
                    // Still set the digipin for the panel, but don't show markers
                    try {
                        const digipin = await getDIGIPINFromLatLon(lat, lon);
                        setDigipin(digipin);
                    } catch (error) {
                        console.error('Error getting DIGIPIN from coordinates:', error);
                    }
                } else {
                    // For direct coordinate input (like digipin codes): use full zoom with markers
                    view.setZoom(digipinSelectZoom);
                    try {
                        const digipin = await getDIGIPINFromLatLon(lat, lon);
                        setDigipin(digipin);
                        await addPolygonBoundary(lat, lon);
                    } catch (error) {
                        console.error('Error getting DIGIPIN from coordinates:', error);
                    }
                }
                
                // Reset search result flag after handling coordinates
                if (isSearchResult) {
                    setIsSearchResult(false);
                }
            }
        };

        handleCoordinates();
    }, [coordinates, setDigipin, addPolygonBoundary, isSearchResult]); // Removed searchMode from dependencies

    // Handle theme changes for Mapbox styles (only if user hasn't manually selected a basemap)
    useEffect(() => {
        if (mapboxToken && !isUserSelectedBasemap && (currentBasemap === 'mapbox-light' || currentBasemap === 'mapbox-dark')) {
            const newBasemap = theme === 'dark' ? 'mapbox-dark' : 'mapbox-light';
            if (newBasemap !== currentBasemap) {
                setCurrentBasemap(newBasemap);
                
                if (mapInstanceRef.current && baseLayerRef.current) {
                    const newBaseLayer = createBasemapLayer(newBasemap);
                    mapInstanceRef.current.removeLayer(baseLayerRef.current);
                    mapInstanceRef.current.getLayers().insertAt(0, newBaseLayer);
                    baseLayerRef.current = newBaseLayer;
                }
            }
        }
    }, [theme, currentBasemap, mapboxToken, isUserSelectedBasemap]);

    return (
        <div className='relative w-full h-full'>
            <div ref={mapRef} className='w-full h-full relative bg-neutral-50 dark:bg-neutral-900'>
                {/* Basemap Selector - Top Right */}
                <div className='absolute top-4 right-4 z-20'>
                    <BasemapSelector 
                        onBasemapChange={handleBasemapChange}
                        currentBasemap={currentBasemap}
                    />
                </div>

                {/* Map Attribution - Bottom Left */}
                <MapAttribution currentBasemap={currentBasemap} />

                {/* Search Bar - Bottom Center */}
                <div className='absolute bottom-4 z-10 w-full px-4'>
                    <PlaceholdersAndVanishInputDemo onLocationSelect={handleSearchLocation} />
                </div>
            </div>
        </div>
    );
};

export default MapContainer;
