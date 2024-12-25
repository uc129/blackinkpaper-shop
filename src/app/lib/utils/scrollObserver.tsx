'use client'
import React, { createContext, useState, useEffect, useRef, useContext } from "react";

// Create the Scroll Context
const ScrollContext = createContext({
    scrollY: 0,
    elementsScroll: {},
    observeElementScroll: (elementRef: any) => { },
});

// Scroll Provider Component
export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
    const [scrollY, setScrollY] = useState(0);
    const [elementsScroll, setElementsScroll] = useState({}); // Tracks each element's scroll

    // Track `window.scrollY`
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Function to observe individual elements
    const observeElementScroll = (elementRef: any) => {
        if (!elementRef?.current) return;

        const handleElementScroll = () => {
            setElementsScroll((prev) => ({
                ...prev,
                [elementRef.current.id || elementRef.current.tagName]: elementRef.current.scrollTop,
            }));
        };

        const el = elementRef.current;
        el.addEventListener("scroll", handleElementScroll);

        return () => {
            el.removeEventListener("scroll", handleElementScroll);
        };
    };

    return (
        <ScrollContext.Provider value={{ scrollY, elementsScroll, observeElementScroll }}>
            {children}
        </ScrollContext.Provider>
    );
};

// Custom Hook to Use Scroll Context
export const useScroll = () => useContext(ScrollContext);
