// src/components/Navigation.tsx

import React, { useState, useEffect } from 'react';
import { useStaticData } from '../dataContext';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'; 

const Navigation: React.FC = () => {
  const { navItems } = useStaticData();
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('theme');
      return savedMode === 'dark';
    }
    return false;
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const standardNavItems = navItems.slice(0, -1);
  const ctaNavItem = navItems.slice(-1)[0];

  // Handler function to scroll without changing the URL
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault(); 

        // Extract the target ID (e.g., '#services' becomes 'services')
        const targetId = href.substring(1); 
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            // Use scrollIntoView with smooth behavior
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start', // Scroll to the top of the element
            });
            
        }
    };

  return (
    // The main nav bar remains sticky
    <nav className="sticky top-0 z-50 bg-background sm:shadow-lg border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
      
      {/* 1. PRIMARY NAVIGATION BAR CONTENT (PADDED) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo/Brand - MODIFIED FOR CUSTOM COLORS AND SLOGAN STYLING */}
          <div className="flex-shrink-0 flex items-center">
            {/* Wrapper for vertical layout of Logo + Slogan */}
            <div className="flex items-center">
                <img 
                    src="/assets/Logo.jpg" 
                    alt="Logo" 
                    className="h-16 w-16 mr-2 rounded-full" 
                />
                {/* Text container for stacking brand name and slogan */}
                <div className="flex flex-col leading-none">
                    {/* Brand Name - Split and styled */}
                    <span className="text-2xl font-extrabold tracking-wide">
                        {/* 💡 "Addax" in black */}
                        <span className="text-black dark:text-gray-100">Addax </span>
                        {/* 💡 "Automotive" in red (using text-red-600) */}
                        <span className="text-red-600">Automotive</span>
                    </span>
                    
                    {/* Slogan - All caps and widened tracking */}
                    <span 
                        // 💡 ALL CAPS, WIDEST TRACKING, and secondary color
                        className="uppercase text-md font-medium text-secondary dark:text-gray-400 tracking-widest"
                    >
                        DRIVE WITH CONFIDENCE
                    </span>
                </div>
            </div>
          </div>

          {/* DESKTOP Navigation Links and Toggler */}
          <div className="hidden lg:flex items-center space-x-6">
            
            {standardNavItems.map((item: any) => (
              <a
                key={item.name}
                onClick={(e) => handleScroll(e, item.href)}
                className="text-secondary dark:text-gray-300 hover:text-primary px-3 py-2 rounded-md text-lg font-medium transition duration-150 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
              >
                {item.name}
              </a>
            ))}

            {ctaNavItem && (
              <a
                key={ctaNavItem.name}
                href={ctaNavItem.href}
                className={`
                  bg-primary text-white 
                  hover:bg-primary-light dark:hover:bg-primary-dark
                  px-5 py-2 rounded-md text-base font-medium transition duration-150
                  shadow-md hover:shadow-lg
                `}
              >
                {ctaNavItem.name}
              </a>
            )}

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-secondary dark:text-gray-300 hover:text-primary transition duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <FiSun className="text-2xl" /> : <FiMoon className="text-2xl" />}
            </button>
          </div>
          
          {/* MOBILE Hamburger/Close Button and Dark Mode Toggler */}
          <div className="flex items-center lg:hidden space-x-2">
            
            <button
              onClick={toggleDarkMode}
              className="p-3 rounded-full text-secondary dark:text-gray-300 hover:text-primary transition duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <FiSun className="text-2xl" /> : <FiMoon className="text-2xl" />}
            </button>

            <button
              onClick={toggleMenu}
              className="p-3 rounded-full text-secondary dark:text-gray-300 hover:text-primary transition duration-150 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              aria-label="Toggle menu"
            >
              <div className="text-2xl">
                 {isMenuOpen ? <FiX /> : <FiMenu />}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MOBILE MENU DROPDOWN (FULL VIEWPORT WIDTH) */}
      <div 
        className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden 
          fixed top-20 inset-x-0 bg-background dark:bg-gray-900 shadow-xl border-t border-gray-100 dark:border-gray-800 transition-all duration-300 ease-in-out`}
      >
        <div className="px-4 pt-2 pb-3 space-y-1 sm:px-6"> 
          
          {/* Mobile Standard Links */}
          {standardNavItems.map((item: any) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="block text-secondary dark:text-gray-300 hover:text-primary px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150"
            >
              {item.name}
            </a>
          ))}
          
          {/* Mobile CTA Button */}
          {ctaNavItem && (
            <a
              key={ctaNavItem.name}
              href={ctaNavItem.href}
              onClick={() => setIsMenuOpen(false)}
              className={`
                block mt-2 w-full text-center
                bg-primary text-white 
                hover:bg-primary-light dark:hover:bg-primary-dark
                px-5 py-2 rounded-md text-base font-medium transition duration-150
                shadow-md hover:shadow-lg
              `}
            >
              {ctaNavItem.name}
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;