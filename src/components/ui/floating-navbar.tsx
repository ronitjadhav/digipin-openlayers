"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ToggleMode } from "@/components/ToggleMode";

export const FloatingNav = ({
                                navItems,
                                className,
                            }: {
    navItems: {
        name: string;
        link: string;
        icon?: JSX.Element;
    }[];
    className?: string;
}) => {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{
                    opacity: 1,
                    y: 0,
                }}
                animate={{
                    y: 0,
                    opacity: 1,
                }}
                transition={{
                    duration: 0.2,
                }}
                className={cn(
                    "flex max-w-fit fixed top-6 sm:top-6 inset-x-0 mx-auto border border-transparent dark:border-white/[0.15] rounded-xl sm:rounded-2xl dark:bg-black/85 bg-white/85 backdrop-blur-md shadow-[0px_8px_25px_-5px_rgba(0,0,0,0.1),0px_4px_6px_-2px_rgba(0,0,0,0.05)] dark:shadow-[0px_8px_25px_-5px_rgba(255,255,255,0.05),0px_4px_6px_-2px_rgba(255,255,255,0.05)] z-[6000] px-4 sm:px-6 py-2 sm:py-3 items-center justify-center space-x-3 sm:space-x-6 transition-all duration-300 hover:shadow-[0px_12px_30px_-8px_rgba(0,0,0,0.15)] dark:hover:shadow-[0px_12px_30px_-8px_rgba(255,255,255,0.08)]",
                    className
                )}
            >
                {navItems.map((navItem: any, idx: number) => (
                    <Link
                        key={`link=${idx}`}
                        href={navItem.link}
                        className={cn(
                            "relative dark:text-neutral-50 items-center flex space-x-1 sm:space-x-2 text-neutral-700 dark:hover:text-neutral-200 hover:text-neutral-900 transition-colors duration-200 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50"
                        )}
                    >
                        <span className="flex text-lg sm:text-base">{navItem.icon}</span>
                        <span className="hidden sm:block text-sm font-medium">{navItem.name}</span>
                    </Link>
                ))}
                <div className="hidden sm:block w-px h-6 bg-neutral-300 dark:bg-neutral-600 mx-2"></div>
                <ToggleMode />
            </motion.div>
        </AnimatePresence>
    );
};