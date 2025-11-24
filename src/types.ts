// src/dataContext/types.ts

import { IconType } from 'react-icons'; // Assuming React Icons are typed
import React from 'react'; // Import React for React.CSSProperties

// --- 1. Service Data Structures ---

/** Defines the structure for a single service item. */
export interface Service {
    name: string;
    priceRange: string;
    description: string;
}

/** Defines the structure for a service category group. */
export interface ServiceCategory {
    category: string;
    icon: IconType; // Used to store the React Icon component (e.g., FaCarSide)
    color: string;
    services: Service[];
}

/** Defines the flattened list of all individual services. */
export type FlatService = Service;


// --- 2. Existing Navigation and Section Structures ---

/** Defines the structure for a navigation item. */
export interface NavItem {
    name: 'Service' | 'Insurance' | 'Pricing' | 'Contact';
    href: '#service' | '#insurance' | '#pricing' | '#contact';
}

/** Defines the structure for content sections. */
export interface SectionData {
    id: string; // Used for the href in NavItem
    title: string;
    content: string;
}


// --- 3. Context Type (Updated) ---

/** Defines the structure of the data accessible via StaticDataContext. */
export interface StaticDataContextType {
    navItems: NavItem[];
    sections: SectionData[];
    // New Service data properties
    servicesData: ServiceCategory[];
    allFlatServices: FlatService[];
}


// --- 4. Custom Style Properties ---

/** Define custom CSS properties for use with React's style attribute. */
export interface CustomCSSProperties extends React.CSSProperties {
    '--tw-rotate-y'?: string;
    animationDelay?: string; 
}

export interface CarBrand {
    name: string;
    logoUrl: string; // Path to the logo image (e.g., '/assets/brands/bmw.svg')
}

// Update the main context interface
export interface StaticDataContextType {
    navItems: NavItem[];
    sections: SectionData[];
    servicesData: ServiceCategory[];
    allFlatServices: FlatService[];
    // 💡 NEW: List of car brands
    carBrands: CarBrand[];
}