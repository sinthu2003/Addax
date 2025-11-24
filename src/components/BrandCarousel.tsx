// src/components/BrandCarousel.tsx

import React from 'react';
import { useStaticData } from '../dataContext';

// Define the type for the custom CSS properties to satisfy TypeScript
interface CustomCSSProperties extends React.CSSProperties {
    '--brand-width'?: string;
    '--animation-duration'?: string; 
}


const BrandCarousel: React.FC = () => {
    const { carBrands } = useStaticData();

    // To create an infinite scroll effect, we duplicate the list of brands.
    const brandsForScroll = [...carBrands, ...carBrands];

    // Determine animation duration based on the number of brands for consistent speed
    const animationDuration = `${carBrands.length * 2}s`; // e.g., 10 brands = 20s animation

    if (carBrands.length === 0) {
        return <p className="text-center py-10 text-gray-500">No brands listed.</p>;
    }

    return (
        // 💡 UPDATED: Added dark:bg-gray-900 for dark mode compatibility
        <div className="bg-white dark:bg-gray-900 py-12 md:py-20"> 
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-8 md:mb-10">
                    {/* 💡 UPDATED: Added dark:text-white */}
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                        Brands We Serve 🤝
                    </h2>
                    {/* 💡 UPDATED: Added dark:text-gray-400 */}
                    <p className="mt-2 text-base md:text-xl text-gray-600 dark:text-gray-400">
                        Trust your vehicle with experts familiar with every major make and model.
                    </p>
                </header>

                {/* --- Logo Slider Container --- */}
                <div 
                    className="relative w-full overflow-hidden whitespace-nowrap mask-image-brands" 
                    // 💡 UPDATED: Added custom property for animation duration
                    style={{ '--animation-duration': animationDuration } as CustomCSSProperties}
                >
                    {/* The animation CSS needs to use var(--animation-duration) */}
                    <div className="inline-block animate-scroll hover:animation-play-state-paused">
                        {brandsForScroll.map((brand, index) => (
                            <div 
                                key={index} 
                                // 💡 UPDATED: Used responsive classes for container width
                                className="w-[150px] sm:w-[200px] md:w-[250px] inline-block p-2 sm:p-4 mx-2" 
                            >
                                <img
                                    src={brand.logoUrl}
                                    alt={brand.name}
                                    // 💡 UPDATED: Added dark theme support for images (grayscale in light mode, color in dark mode)
                                    // Use 'grayscale' by default, remove it on hover/focus.
                                    className="h-12 md:h-16 w-auto object-contain mx-auto 
                                               transition-all duration-300 opacity-100 
                                               filter dark:filter-none hover:filter-none hover:scale-105"
                                    title={brand.name}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandCarousel;