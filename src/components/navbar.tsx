"use client";
import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { LiaMapMarkedSolid } from "react-icons/lia";
import { MdOutlineHelpOutline } from "react-icons/md";

export function FloatingNavDemo() {
    const navItems = [
        {
            name: "Digipin Map",
            link: "/",
            icon: <LiaMapMarkedSolid size={30} />,
        },
        {
            name: "What is Digipin?",
            link: "/about",
            icon: <MdOutlineHelpOutline size={30} />,
        },
    ];
    return (
        <div className="relative w-full z-20">
            <FloatingNav navItems={navItems} className="fixed mt-5 left-0 w-full z-20" />
        </div>
    );
}