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
            icon: <LiaMapMarkedSolid size={24} />,
        },
        {
            name: "What is Digipin?",
            link: "/about",
            icon: <MdOutlineHelpOutline size={24} />,
        },
    ];
    return (
        <FloatingNav navItems={navItems} />
    );
}