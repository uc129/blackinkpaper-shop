'use client'
import React, { createContext, useState, useLayoutEffect, useContext } from "react";

// Create the Context
const WindowContext = createContext(
    {
        isMobile: false,
        isTablet: false,
        isDesktop: false,
        isPortrait: false,
        isLandscape: false,
    }
);

export const useWindowContext = () => useContext(WindowContext);

// Provider Component
export const WindowProvider = ({ children }: { children: React.ReactNode }) => {
    const [screenInfo, setScreenInfo] = useState({
        isMobile: false,
        isTablet: false,
        isDesktop: false,
        isPortrait: false,
        isLandscape: false,
    });

    const updateScreenInfo = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        setScreenInfo({
            isMobile: width <= 768,
            isTablet: width > 768 && width <= 1024,
            isDesktop: width > 1024,
            isPortrait: height >= width,
            isLandscape: width > height,
        });
    };

    useLayoutEffect(() => {
        // Update on initial render
        updateScreenInfo();

        // Add event listener for screen resize
        window.addEventListener("resize", updateScreenInfo);
        console.log('window resize event listener added');
        return () => {
            // Cleanup the event listener
            window.removeEventListener("resize", updateScreenInfo);
        };
    }, []);

    return (
        <WindowContext.Provider value={screenInfo}>{children}</WindowContext.Provider>
    );
};

// Custom hook for consuming context
