// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class', 
    theme: {
        extend: {
            // --- Rotation ---
            rotate: {
                '[-45deg]': '-45deg', 
            },
            
            // --- CRITICAL: Add Opacity Transition Property ---
            transitionProperty: {
                'filter': 'filter', 
                // 💡 NEW: Enable transition for opacity changes
                'opacity': 'opacity', 
            },

            // --- Blur Utility ---
            blur: {
                'md': '4px',
                'none': '0',
                'lg': '8px', 
            },
            
            // ... (rest of config)
        },
    },
    // ... (plugins section)
}