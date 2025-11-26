// src/pages/Home.tsx
import React from 'react';
import { FiPhone, FiMapPin } from 'react-icons/fi';

const Home: React.FC = () => {
    return (
        <div className="min-h-[700px]">

            {/* === HERO SECTION (Full Focus with Switched WBR Gradient) === */}
            <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden p-4 
                                bg-gradient-to-br from-red-600 via-black to-white"> {/* 💡 GRADIENT SWITCHED HERE */}

                {/* Overlay: Slightly adjust opacity if needed for text clarity over the white part of the gradient */}
                {/* I'll keep it at opacity-30 for now, but you can increase it (e.g., opacity-40) if white is too dominant */}
                <div className="absolute inset-0 bg-black opacity-30 z-10"></div>

                {/* Content */}
                {/* Text is primarily white, with red accents */}
                <div className="relative z-20 text-center max-w-4xl text-white">

                    {/* Slogan/Pre-Headline */}


                    {/* Main Headline */}
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-snug">
                        Your Premier <span className="text-red-300">Multi-Brand Car</span> Service Station {/* text-red-300 for consistency */}
                    </h1>

                    {/* Sub-Headline / Value Proposition */}
                    <p className="text-base sm:text-xl font-light mb-8 text-gray-100"> {/* text-gray-100 for better visibility */}
                        Expert Care for All Makes & Models. 24/7 Roadside Assistance & Seamless Insurance Claims
                    </p>

                    {/* Call-to-Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">

                        {/* Primary CTA: Booking */}
                        <a
                            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl text-lg font-bold transition duration-300 shadow-xl transform hover:scale-[1.03] cursor-pointer"
                        >
                            Book Your Service Now
                        </a>

                        {/* Secondary CTA: Emergency/Contact */}
                        <a
                            href="tel:+919363039969"
                            // 💡 FIX APPLIED HERE: Changed to a more visible dark background with some transparency
                            // Removed backdrop-blur-sm as it can sometimes hinder visibility with solid colors
                            className="bg-gray-800 bg-opacity-70 hover:bg-opacity-90 text-white px-8 py-3 rounded-xl text-lg font-bold transition duration-300 shadow-xl flex items-center justify-center space-x-2 border border-white/20"
                        >
                            <FiPhone className="w-5 h-5" />
                            <span>Emergency Call: 93630 39969</span>
                        </a>
                    </div>

                    {/* Optional: Location Hint */}
                    <div className="mt-6 text-xs text-gray-200 flex items-center justify-center space-x-2"> {/* text-gray-200 for better contrast */}
                        <FiMapPin className="w-4 h-4 text-red-400" />
                        <span>Serving Vanagaram, Avadi, Velachery & All of Chennai</span>
                    </div>

                </div>
            </section>

        </div>
    );
};

export default Home;