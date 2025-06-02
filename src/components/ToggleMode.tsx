"use client"

import React, {useState, useEffect} from "react";
import { useTheme } from "next-themes";
import {Moon, Sun} from "lucide-react"
import {Button} from "@/components/ui/button";


export const ToggleMode = () => {

    const{theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted){
        return <Button variant='secondary' size="icon" disabled={true}></Button>
    }

    const dark = theme === 'dark';

    return (
        <Button 
            variant='ghost' 
            size="icon" 
            onClick={() => setTheme(`${dark ? "light" : "dark"}`)}
            className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg sm:rounded-xl hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 transition-colors duration-200"
        >
            {dark ? (
                <Sun className="h-4 w-4 sm:h-5 sm:w-5 hover:cursor-pointer hover:text-yellow-500 transition-colors duration-200" />
            ) : (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5 hover:cursor-pointer hover:text-blue-500 transition-colors duration-200" />
            )}
        </Button>
    );
}