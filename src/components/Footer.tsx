// src/components/Footer.tsx
import React from 'react';
// 💡 Assuming you have icons installed (e.g., react-icons)
import { FiPhone, FiClock, FiMapPin, FiInstagram, FiMail } from 'react-icons/fi';
import { useStaticData } from '../dataContext';

const Footer: React.FC = () => {
  const { servicesData } = useStaticData()

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
    // Outer container with black background and white text
    <footer className="bg-black text-white dark:bg-gray-900 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-gray-700 pb-10">

          {/* Company Info / Logo (Full width on mobile, 2 columns on desktop) */}
          <div className="col-span-2 md:col-span-2 space-y-4">
            <h3 className="text-xl font-extrabold tracking-wider">
              <span className="text-white">ADDAX</span>
              <span className="text-red-600"> AUTOMOTIVE</span>
            </h3>
            <p className="text-gray-400 text-sm max-w-sm">
              Your trusted automotive service center in Chennai. We provide professional car repair, AC services, denting & painting, and general maintenance with quality workmanship and reasonable prices.
            </p>

            {/* 💡 MOVED: Social Links Section */}
            <div className="flex items-center space-x-4 pt-2">
              <span className="font-semibold text-gray-300">Follow us:</span>
              {/* Placeholder for Instagram (using FiInstagram icon) */}
              <a href="https://www.instagram.com/addax_automotive/" aria-label="Follow us on Instagram" className="hover:text-red-500 transition">
                <FiInstagram className="w-5 h-5" />
              </a>
              {/* Placeholder for Email (using FiMail icon) */}
              <a href="mailto:info@addaxautomotive.com" aria-label="Send us an email" className="hover:text-red-500 transition">
                <FiMail className="w-5 h-5" />
              </a>
            </div>

            {/* Contact CTA (Remains after Follow Us) */}
            <p className="text-sm font-semibold text-red-400 pt-2">
              Contact us for Service & Assistance - 93630 39969
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold mb-3 text-red-500">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a onClick={(e) => handleScroll(e, '#service')} className="hover:text-red-400 transition cursor-pointer">Our Services</a></li>
              <li><a onClick={(e) => handleScroll(e, '#contact')} className="hover:text-red-400 transition cursor-pointer">Contact</a></li>
              <li><a onClick={(e) => handleScroll(e, '#pricing')} className="hover:text-red-400 transition cursor-pointer">Pricing</a></li>
              <li><a onClick={(e) => handleScroll(e, '#package')} className="hover:text-red-400 transition cursor-pointer">Package</a></li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold mb-3 text-red-500">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {servicesData.map((item) => (
                <li key={item.category}><a onClick={(e) => handleScroll(e, '#domain')} className="hover:text-red-400 transition cursor-pointer">{item.category}</a></li>
              ))}
            </ul>
          </div>

          {/* Insurance Links */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold mb-3 text-red-500">Insurance</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a onClick={(e) => handleScroll(e, '#insurance')} className="hover:text-red-400 transition cursor-pointer">Claim Assistance</a></li>
              <li><a href="tel:+919363039969" className="hover:text-red-400 transition">Call for Support</a></li>
            </ul>
          </div>
        </div>

        {/* Quick Contact Info Section */}
        <div className="mt-8 pt-4">
          <h4 className="text-lg font-bold mb-4 text-red-500">Quick Contact Info</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {/* Phone */}
            <div className="flex items-center space-x-3">
              <FiPhone className="text-red-500 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">Phone</p>
                <a href="tel:+919363039969" className="text-gray-400 hover:text-red-400 transition">+91 93630 39969</a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-center space-x-3">
              <FiClock className="text-red-500 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">Hours</p>
                <p className="text-gray-400">Open 24/7 - All days</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start space-x-3 col-span-1 sm:col-span-2 md:col-span-2">
              <FiMapPin className="text-red-500 w-5 h-5 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Address</p>
                <p className="text-gray-400">No.17, Andal Nagar, Masilamani Street, Opposite To SV High School, Vanagaram, Chennai - 600095</p>
              </div>
            </div>
          </div>
        </div>


        {/* Copyright (Social links removed from here) */}
        <div className="mt-10 pt-6 border-t border-gray-700 flex justify-center text-xs text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} ADDAX AUTOMOTIVE. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;