// src/dataContext/dataContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import {  NavItem, SectionData, ServiceCategory, Service, CarBrand } from './types'; 
import { FaCarSide, FaPaintBrush, FaChargingStation, FaWrench, FaHandsWash } from 'react-icons/fa';
import { ClipboardCheck, Camera, UserCheck, Wrench } from 'lucide-react';

// --- I. SERVICE DATA ---

// Define the structure for all services 
const servicesData: ServiceCategory[] = [
    {
        category: "Body Repairs",
        icon: FaCarSide,
        color: "bg-red-600",
        services: [
            { name: "Bumper Repair", priceRange: "₹1,500 - ₹5,000", description: "Expert repair for minor dents and severe damage to your car's bumper." },
            { name: "Car Body Repair", priceRange: "Varies", description: "Comprehensive restoration of your vehicle's exterior, fixing all types of body damage." },
            { name: "Car Door Repair", priceRange: "₹2,000 - ₹8,000", description: "Repairing functional issues with car doors, including alignment." },
        ],
    },
    {
        category: "Denting & Painting",
        icon: FaPaintBrush,
        color: "bg-yellow-500",
        services: [
            { name: "Car Denting", priceRange: "₹800 - ₹3,000 per panel", description: "Skilled dent removal using advanced techniques to restore your car's body panels." },
            { name: "Car Painting", priceRange: "₹5,000 - ₹25,000", description: "High-quality paint jobs with perfect color matching for a flawless finish." },
        ],
    },
    {
        category: "Electrical Repairs",
        icon: FaChargingStation,
        color: "bg-blue-500",
        services: [
            { name: "Car Stereo Repair", priceRange: "₹500 - ₹2,000", description: "Fixing issues with car audio systems, speakers, and head units." },
            { name: "Car Battery Repair", priceRange: "₹1,000 - ₹4,000", description: "Battery testing, terminal cleaning, and replacement for reliable starts." },
        ],
    },
    {
        category: "Mechanical Repairs",
        icon: FaWrench,
        color: "bg-green-500",
        services: [
            { name: "Car Engine Repair", priceRange: "Varies (Diagnostic fee: ₹800)", description: "Diagnostic and repair services for all types of engine problems, ensuring optimal performance." },
            { name: "Brakes & Suspension", priceRange: "₹1,800 - ₹8,000", description: "Complete service for brake pads, fluid, and suspension system checks for safety and comfort." },
            { name: "Tyre Replacement", priceRange: "₹3,000 - ₹15,000", description: "Professional tyre inspection, fitting, balancing, and alignment services." },
        ],
    },
    {
        category: "General Services",
        icon: FaHandsWash,
        color: "bg-indigo-500",
        services: [
            { name: "Car Wash", priceRange: "₹300 - ₹800", description: "Thorough exterior and interior cleaning to keep your car looking pristine." },
            { name: "General Car Service", priceRange: "₹1,500 - ₹3,500", description: "Comprehensive vehicle maintenance including engine check, fluid levels, filters, and overall inspection." },
        ],
    },
];

const allFlatServices: Service[] = servicesData.flatMap(cat => cat.services);


// --- II. NAVIGATION & SECTIONS ---

const navItems: NavItem[] = [
    { name: 'Service', href: '#service' },
    { name: 'Insurance', href: '#insurance' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
];

const sections: SectionData[] = [
    { id: 'service', title: 'Our Services', content: 'We offer a wide range of top-tier services tailored to meet your unique needs. Our team is dedicated to delivering excellence in every project we undertake. Click here to learn more about our core offerings.' },
    { id: 'insurance', title: 'Comprehensive Insurance', content: 'Protect your assets and future with our comprehensive insurance plans. We provide peace of mind through reliable coverage for individuals and businesses alike. Get a free quote today and secure your tomorrow.' },
    { id: 'pricing', title: 'Transparent Pricing', content: 'Check out our flexible and transparent pricing structures designed to fit any budget. We believe in providing maximum value without hidden fees. Choose the plan that works best for you.' },
    { id: 'contact', title: 'Get In Touch', content: 'Ready to start your project or have a question? Our support team is here to help. Reach out to us via phone, email, or fill out the contact form below. We look forward to hearing from you!' },
];

// --- III. BRAND DATA (NEW) ---

// 💡 NEW: Define sample data for car brands
const carBrands: CarBrand[] = [
    { name: 'BMW', logoUrl: '/assets/brands/BMW-_New.png' },
    { name: 'Audi', logoUrl: '/assets/brands/Audi.png' },
    { name: 'Mercedes-Benz', logoUrl: '/assets/brands/Mercedes.png' },
    { name: 'Honda', logoUrl: '/assets/brands/Honda.png' },
    { name: 'Nissan', logoUrl: '/assets/brands/Nissan_Old.png' },
    { name: 'Volkswagen', logoUrl: '/assets/brands/Volkswagen_New.png' },
    { name: 'Toyota', logoUrl: '/assets/brands/toyota.png' },
    { name: 'Hyundai', logoUrl: '/assets/brands/Hyundai.png' },
    { name: 'Land Rover', logoUrl: '/assets/brands/LandRover.png' },
];

// --- IV. INSURANCE STEP DATA (NEW) ---

// Placeholder image paths (In a real app, these might be served from a public folder)
const IMAGE_ASSESSMENT = '/assets/Insurance/InspectFinal.jpeg';
const IMAGE_DOCUMENTATION = '/assets/Insurance/DocFinal.jpeg';
const IMAGE_COORDINATION = '/assets/Insurance/Approve.jpeg';
const IMAGE_REPAIR = '/assets/Insurance/Drive.jpeg';

export interface InsuranceStep {
    id: string;
    title: string;
    icon: React.ElementType; // Use React.ElementType for the component type (Lucide icons)
    desc: string;
    img: string;
}

const insuranceSteps: InsuranceStep[] = [
    { id: '01', title: 'Vehicle Check', icon: ClipboardCheck, desc: 'Initial damage inspection and estimate.', img: IMAGE_ASSESSMENT },
    { id: '02', title: 'Claim File Build', icon: Camera, desc: 'Gather all required documents and photo evidence.', img: IMAGE_DOCUMENTATION },
    { id: '03', title: 'Surveyor Approval', icon: UserCheck, desc: 'Coordinated review and authorization of the repair plan.', img: IMAGE_COORDINATION },
    { id: '04', title: 'Repair Bay & Drive', icon: Wrench, desc: 'Complete high-quality repairs and finalize direct payment.', img: IMAGE_REPAIR },
];


// --- V. COMBINED STATIC DATA OBJECT (UPDATED) ---
// Define the full context type (for internal use)
export interface StaticDataContextType {
    navItems: any[]; // Replace with actual type
    sections: any[]; // Replace with actual type
    servicesData: any[]; // Replace with actual type
    allFlatServices: any[]; // Replace with actual type
    carBrands: any[]; // Replace with actual type
    insuranceSteps: InsuranceStep[]; // <--- ADDED
}

const staticData: StaticDataContextType = {
    navItems: navItems as any,
    sections: sections as any,
    servicesData: servicesData as any, 
    allFlatServices: allFlatServices as any, 
    carBrands: carBrands as any, 
    insuranceSteps,
};

// --- VI. CONTEXT SETUP ---

// Create the Context
const StaticDataContext = createContext<StaticDataContextType | undefined>(undefined);

// Provider Component
export const StaticDataProvider = ({ children }: { children: ReactNode }) => {
    return (
        <StaticDataContext.Provider value={staticData}>
            {children}
        </StaticDataContext.Provider>
    );
};

// Custom Hook to use the data
export const useStaticData = () => {
    const context = useContext(StaticDataContext);
    if (context === undefined) {
        throw new Error('useStaticData must be used within a StaticDataProvider');
    }
    return context;
};