// src/pages/ServicesPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { FiPhone, FiArrowRight } from 'react-icons/fi';

// NOTE: You must ensure 'CustomCSSProperties' and 'useStaticData' are correctly defined 
// in their respective files for this component to work.
import { CustomCSSProperties } from '../types';
import { useStaticData } from '../dataContext';

// Define types for clarity (assuming these structures from useStaticData)
type FlatService = { name: string, description: string, priceRange: string };
type ServiceCategoryGroup = { category: string, color: string, icon: React.FC<React.SVGProps<SVGSVGElement>>, services: FlatService[] };


const ServicesPage: React.FC = () => {
    // Retrieve all necessary data from the hook
    const { servicesData, allFlatServices } = useStaticData();
    
    // State to track the currently selected service category
    const [activeCategory, setActiveCategory] = useState<string | null>(null); 
    const [activeServiceIndex, setActiveServiceIndex] = useState(0);
    
    // UI states for scroll animations
    const [scrolled, setScrolled] = useState(false);
    const [tireScrolled, setTireScrolled] = useState(false); 
    
    // Ref for smooth scrolling back to the Hero section
    const heroRef = useRef<HTMLDivElement>(null); 
    
    // ----------------------------------------------------
    // --- Computed and Filtered Data ---
    // ----------------------------------------------------

    // Filtered list of services to display in the control buttons
    const servicesToDisplay: FlatService[] = activeCategory 
        ? (servicesData.find(cat => cat.category === activeCategory) as ServiceCategoryGroup)?.services || []
        : allFlatServices;

    // Reset active service index if the filtered list changes
    useEffect(() => {
        if (servicesToDisplay.length > 0) {
            // Find the index of the current service (by name) in the new filtered list
            const currentServiceName = allFlatServices[activeServiceIndex]?.name;
            const newIndex = servicesToDisplay.findIndex(s => s.name === currentServiceName);
            
            // Set index to the matching service, or 0 if the service isn't in the new category
            setActiveServiceIndex(newIndex !== -1 ? newIndex : 0);
        } else {
             setActiveServiceIndex(0);
        }
    }, [activeCategory, servicesToDisplay.length]); 

    // Auto-cycle effect for the tire section
    useEffect(() => {
        if (servicesToDisplay.length === 0) return;
        
        const interval = setInterval(() => {
            setActiveServiceIndex((prevIndex) => 
                (prevIndex + 1) % servicesToDisplay.length
            );
        }, 5000); 
        return () => clearInterval(interval);
    }, [servicesToDisplay.length]); 

    // Scroll effect for animations
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setScrolled(true);
            }
            if (window.scrollY > 50) { 
                setTireScrolled(true);
            } else {
                setTireScrolled(false); 
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); 
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    // ----------------------------------------------------
    // --- Handlers ---
    // ----------------------------------------------------
    
    // Handler for clicking a category card (in Section 2)
    const handleCategoryClick = (categoryName: string) => {
        setActiveCategory(categoryName);
        // Smoothly scroll back up to the Hero section
        if (heroRef.current) {
            heroRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Handler for clicking "View All Services"
    const handleViewAllClick = () => {
        setActiveCategory(null);
    };

    // ----------------------------------------------------
    // --- Render Logic ---
    // ----------------------------------------------------

    if (allFlatServices.length === 0) {
        return (
            <div className="bg-gray-950 min-h-screen text-white p-10 text-center">
                <h1 className="text-3xl text-red-500">Service data not available.</h1>
            </div>
        );
    }
    
    const currentActiveService: FlatService = servicesToDisplay[activeServiceIndex] || allFlatServices[0];
    const currentCategory = servicesData.find(cat => cat.services.some((s:any) => s.name === currentActiveService.name));
    
    const getTireRotation = () => activeServiceIndex * (360 / servicesToDisplay.length) * 2;


    return (
        <div id="service" className="bg-gray-950 min-h-screen text-white dark:bg-gray-950">
            
            {/* === 1. DYNAMIC TIRE HERO SECTION (Full Height) === */}
            <section ref={heroRef} className="relative w-full h-screen overflow-hidden bg-gradient-to-r from-gray-900 via-black to-gray-800 shadow-2xl">
                
                <div className="relative h-full max-w-7xl mx-auto flex items-center px-4 sm:px-6 lg:px-8">
                    
                    {/* Left Side: Large Half-Tire Visual */}
                    <div 
                        className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 
                                         w-[80vw] h-[80vw] 
                                         md:w-[80vh] md:h-[80vh] 
                                         lg:w-[90vh] lg:h-[90vh] 
                                         -ml-[20vw] md:-ml-[20vh] lg:-ml-[22vh] 
                                         opacity-20 md:opacity-100
                                         transition-all duration-2000 ease-in-out 
                                         ${tireScrolled 
                                            ? 'translate-x-0 rotate-0 scale-100' 
                                            : '-translate-x-full rotate-[-360deg] scale-90' 
                                         } 
                                         `}> 
                        <img 
                            src="/assets/Tire.webp"
                            alt="Car Tire" 
                            className="w-full h-full object-contain transition-transform duration-700 ease-in-out" 
                            style={{ transform: `rotate(${getTireRotation()}deg)` }} 
                        />
                        <div className="absolute inset-0 rounded-full shadow-inner-lg shadow-black/50 border-[10px] border-red-600/50"></div>
                    </div>

                    {/* Right Side: Service Details and Selector */}
                    <div className="md:w-3/5 lg:w-1/2 ml-auto p-4 md:p-8 relative z-20 bg-black/50 md:bg-transparent rounded-xl"> 
                        
                        <h2 className="text-4xl sm:text-6xl font-extrabold text-red-500 mb-6">
                            {activeCategory ? activeCategory : 'Precision Service, Dynamic Results'}
                        </h2>

                        {/* Service Details (Content) */}
                        <div className="h-40 flex flex-col justify-center">
                            <div 
                                key={currentActiveService.name}
                                className="animate-fadeSlideIn transition-all duration-700 ease-in-out"
                            >
                                <span className="text-red-400 text-sm font-semibold uppercase tracking-widest mb-1">
                                    {currentCategory?.category || 'Expert Care'}
                                </span>
                                <h3 className="text-4xl font-extrabold text-white mb-2 leading-snug">
                                    {currentActiveService.name}
                                </h3>
                                <p className="text-base text-gray-300 mb-3 line-clamp-2 md:text-lg">
                                    {currentActiveService.description}
                                </p>
                                <p className="text-2xl font-bold text-red-500 md:text-3xl">
                                    {currentActiveService.priceRange}
                                </p>
                            </div>
                        </div>
                        
                        {/* Call to Action and View All Button */}
                        <div className="flex items-center space-x-4 mt-6">
                            <a 
                                href={`/book?service=${currentActiveService.name.replace(/\s/g, '-')}`} 
                                className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition duration-300 shadow-xl"
                            >
                                Book Quick Service <FiArrowRight className="ml-2 w-5 h-5" />
                            </a>
                            
                            {/* NEW: VIEW ALL SERVICES BUTTON */}
                            {activeCategory && (
                                <button
                                    onClick={handleViewAllClick}
                                    className="inline-flex items-center border border-gray-500 text-gray-300 hover:bg-gray-700 px-4 py-3 rounded-lg text-lg font-semibold transition duration-300 cursor-pointer"
                                >
                                    View All Services
                                </button>
                            )}
                        </div>

                        {/* Control Buttons - Filters based on 'servicesToDisplay' */}
                        <div className="mt-8 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3"> 
                            {servicesToDisplay.map((service, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveServiceIndex(index)}
                                    className={`
                                        w-full flex-shrink-0 px-2 py-2 text-xs cursor-pointer rounded-lg font-medium transition duration-300 text-center
                                        ${activeServiceIndex === index 
                                            ? 'bg-red-600 text-white border border-red-400 shadow-lg' 
                                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white border border-gray-700'
                                        }
                                    `}
                                >
                                    {service.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* === 2. ANIMATED SERVICE CATEGORY GRID (3D Hover Effect) === */}
            <section id="domain" className="py-20 w-full bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <header className="text-center mb-12">
                        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
                            Explore By Domain
                        </h2>
                        <p className="mt-2 text-xl text-gray-600 dark:text-gray-400">
                            Our areas of expertise
                        </p>
                    </header>
                    
                    {/* Grid layout (2, 3, then 5 columns on XL screens) */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8"> 
                        {servicesData.map((categoryGroup, index) => {
                            const IconComponent = categoryGroup.icon; 
                            
                            return (
                                <div 
                                    key={index} 
                                    onClick={() => handleCategoryClick(categoryGroup.category)}
                                    className={`
                                        relative h-56 
                                        rounded-xl shadow-xl overflow-hidden cursor-pointer group
                                        transform transition-all duration-700 perspective-1000
                                        ${scrolled ? 'animate-staggerFadeUp' : 'opacity-0 translate-y-10'}
                                        hover:rotate-y-5 hover:scale-[1.05]
                                    `}
                                    style={{ 
                                        animationDelay: `${index * 0.2}s`,
                                        '--tw-rotate-y': '0deg', 
                                    } as CustomCSSProperties}
                                >
                                    {/* Background Image/Visual */}
                                    <div className={`absolute inset-0 ${categoryGroup.color} opacity-90 transition duration-500 group-hover:opacity-100`}></div>
                                    
                                    {/* Content */}
                                    <div className="relative p-6 h-full flex flex-col justify-end">
                                        <IconComponent className="w-10 h-10 text-white/50 mb-3 absolute top-4 right-4 transition-transform duration-500 group-hover:rotate-12" /> 
                                        
                                        <h3 className="text-2xl font-bold text-white mb-1 leading-snug">
                                            {categoryGroup.category}
                                        </h3>
                                        <p className="text-gray-200 text-xs">
                                            {categoryGroup.services.length} specialized services available.
                                        </p>
                                        <span className="mt-3 inline-flex items-center font-semibold text-white text-sm transition-all duration-300 group-hover:text-black">
                                            View Details <FiArrowRight className="ml-2 w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;