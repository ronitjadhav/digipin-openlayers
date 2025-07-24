import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import { FiCopy, FiMapPin, FiExternalLink, FiMap, FiX } from 'react-icons/fi';
import { motion, useAnimation } from 'framer-motion';
import { getBoundsFromDIGIPIN } from 'digipin';

interface FloatingDigipinPanelProps {
    digipin: string;
    onClose?: () => void;
}

const FloatingDigipinPanel: React.FC<FloatingDigipinPanelProps> = ({ digipin, onClose }) => {
    const { theme } = useTheme();
    const controls = useAnimation();

    useEffect(() => {
        if (digipin) {
            // Animate the panel when DIGIPIN changes
            controls.start({
                opacity: 1, 
                y: 0,
                scale: 1,
                transition: { 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20 
                }
            });
        }
    }, [digipin, controls]);

    // Handle ESC key to close panel
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && digipin && onClose) {
                onClose();
            }
        };

        if (digipin && onClose) {
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [digipin, onClose]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(digipin).then(() => {
            // Animate on copy
            controls.start({
                scale: [1, 1.05, 1],
                transition: { duration: 0.3 }
            });
            toast.success('DIGIPIN copied to clipboard!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }).catch(err => {
            toast.error('Failed to copy!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        });
    };

    const openInGoogleMaps = () => {
        try {
            const bounds = getBoundsFromDIGIPIN(digipin);
            
            if (!bounds || bounds === "Invalid DIGIPIN" || typeof bounds === "string") {
                toast.error('Unable to get coordinates for this DIGIPIN!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                return;
            }

            const { minLat, maxLat, minLon, maxLon } = bounds;
            
            // Calculate center coordinates with higher precision
            const centerLat = Number(((minLat + maxLat) / 2).toFixed(8));
            const centerLon = Number(((minLon + maxLon) / 2).toFixed(8));
            
            console.log('DIGIPIN bounds:', { minLat, maxLat, minLon, maxLon });
            console.log('Calculated center coordinates:', { centerLat, centerLon });
            
            // Create Google Maps URL with marker
            const googleMapsUrl = `https://www.google.com/maps/place/${centerLat},${centerLon}/@${centerLat},${centerLon},19z`;
            
            console.log('Google Maps URL:', googleMapsUrl);
            
            // Open in new tab
            window.open(googleMapsUrl, '_blank');
            
            // Show success message
            toast.success(`Opening in Google Maps! (${centerLat}, ${centerLon})`, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } catch (error) {
            console.error('Error opening Google Maps:', error);
            toast.error('Failed to open Google Maps!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    const openInOpenStreetMap = () => {
        try {
            const bounds = getBoundsFromDIGIPIN(digipin);
            
            if (!bounds || bounds === "Invalid DIGIPIN" || typeof bounds === "string") {
                toast.error('Unable to get coordinates for this DIGIPIN!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                return;
            }

            const { minLat, maxLat, minLon, maxLon } = bounds;
            
            // Calculate center coordinates with higher precision
            const centerLat = Number(((minLat + maxLat) / 2).toFixed(8));
            const centerLon = Number(((minLon + maxLon) / 2).toFixed(8));
            
            console.log('DIGIPIN bounds for OSM:', { minLat, maxLat, minLon, maxLon });
            console.log('Calculated center coordinates for OSM:', { centerLat, centerLon });
            
            // Create OpenStreetMap URL with marker
            const osmUrl = `https://www.openstreetmap.org/?mlat=${centerLat}&mlon=${centerLon}&zoom=19#map=19/${centerLat}/${centerLon}`;
            
            console.log('OpenStreetMap URL:', osmUrl);
            
            // Open in new tab
            window.open(osmUrl, '_blank');
            
            // Show success message
            toast.success(`Opening in OpenStreetMap! (${centerLat}, ${centerLon})`, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } catch (error) {
            console.error('Error opening OpenStreetMap:', error);
            toast.error('Failed to open OpenStreetMap!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    if (!digipin) return null;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={controls}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className={`absolute z-20 p-3 md:p-4 rounded-xl shadow-lg backdrop-blur-sm ${
                theme === 'dark' 
                    ? 'bg-gray-800/90 text-white border border-gray-700' 
                    : 'bg-white/90 text-black border border-gray-200'
            } transition-all duration-300 flex flex-col items-center
            
            /* Mobile: Position well above search bar */
            bottom-28 right-3 max-w-[260px]
            
            /* Small screens: Better spacing for small tablets */
            sm:bottom-32 sm:right-4 sm:max-w-[280px]
            
            /* Medium screens (tablets): Move to side to avoid search overlap */
            md:bottom-6 md:right-6 md:max-w-[300px]
            
            /* Large screens: Maintain desktop positioning */
            lg:bottom-6 lg:right-6 lg:max-w-[320px]
            
            /* Extra large screens: More spacing */
            xl:bottom-8 xl:right-8`}
        >
            {/* Close button */}
            {onClose && (
                <button
                    onClick={onClose}
                    className={`absolute top-2 right-2 p-1 rounded-full transition-colors ${
                        theme === 'dark'
                            ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                            : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                    }`}
                    aria-label="Close digipin panel"
                >
                    <FiX size={16} />
                </button>
            )}
            
            <div className="flex flex-col items-center w-full">
                <div className="flex items-center gap-1 mb-2">
                    <FiMapPin size={16} className="text-rose-500" />
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">YOUR DIGIPIN</h3>
                </div>
                
                <motion.div 
                    className="font-bold text-base md:text-lg break-all text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {digipin}
                </motion.div>
                
                <div className="w-full mt-2 md:mt-3 space-y-2">
                    <Button 
                        onClick={copyToClipboard}
                        variant="outline"
                        size="sm" 
                        className={`flex items-center gap-1 w-full justify-center text-xs md:text-sm ${
                            theme === 'dark' 
                                ? 'hover:bg-gray-700 border-gray-700' 
                                : 'hover:bg-gray-100 border-gray-200'
                        }`}
                    >
                        <FiCopy size={14} />
                        <span>Copy</span>
                    </Button>
                    
                    <Button 
                        onClick={openInGoogleMaps}
                        variant="outline"
                        size="sm" 
                        className={`flex items-center gap-1 w-full justify-center text-xs md:text-sm ${
                            theme === 'dark' 
                                ? 'hover:bg-gray-700 border-gray-700' 
                                : 'hover:bg-gray-100 border-gray-200'
                        }`}
                    >
                        <FiExternalLink size={14} />
                        <span>Open in Google Maps</span>
                    </Button>
                    
                    <Button 
                        onClick={openInOpenStreetMap}
                        variant="outline"
                        size="sm" 
                        className={`flex items-center gap-1 w-full justify-center text-xs md:text-sm ${
                            theme === 'dark' 
                                ? 'hover:bg-gray-700 border-gray-700' 
                                : 'hover:bg-gray-100 border-gray-200'
                        }`}
                    >
                        <FiMap size={14} />
                        <span>Open in OpenStreetMap</span>
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

export default FloatingDigipinPanel;
