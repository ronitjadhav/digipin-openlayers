import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from 'next-themes';

interface DigipinDisplayProps {
    digipin: string;
}

const DigipinDisplay: React.FC<DigipinDisplayProps> = ({ digipin }) => {
    const { theme } = useTheme();

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success('Copied to clipboard!');
        }).catch(err => {
            toast.error('Failed to copy!');
        });
    };

    return (
        <div className="relative inline-block cursor-pointer group" onClick={() => copyToClipboard(digipin)}>
            <h1 id="digipin" className="inline-block">
                {digipin}
            </h1>
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-32 bg-black text-white text-center rounded-md p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Click to copy
            </span>
            <ToastContainer theme={theme === 'dark' ? 'dark' : 'light'} />
        </div>
    );
};

export default DigipinDisplay;