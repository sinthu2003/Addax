import React from 'react';
import { motion } from 'framer-motion';

interface PackageFeature {
    text: string;
    included: boolean;
}

interface MaintenancePackage {
    id: string;
    name: string;
    duration: string;
    originalPrice: string;
    discountedPrice: string;
    savings: string;
    features: PackageFeature[];
    popular?: boolean;
    oilColor: string;
}

const Package: React.FC = () => {
    const packages: MaintenancePackage[] = [
        {
            id: 'basic',
            name: 'Basic Care',
            duration: '3 Months Package',
            originalPrice: '₹4,500',
            discountedPrice: '₹3,999',
            savings: 'Save up to ₹501',
            oilColor: '#FFD700',
            features: [
                { text: 'General service (1x)', included: true },
                { text: 'Oil change', included: true },
                { text: 'Basic inspection', included: true },
                { text: 'Tyre pressure check', included: true },
                { text: 'Battery check', included: true },
                { text: 'Free pickup & drop', included: true },
            ],
        },
        {
            id: 'complete',
            name: 'Complete Care',
            duration: '6 Months Package',
            originalPrice: '₹9,500',
            discountedPrice: '₹7,999',
            savings: 'Save up to ₹1501',
            popular: true,
            oilColor: '#FF8C00',
            features: [
                { text: 'General service (2x)', included: true },
                { text: 'Engine diagnostics', included: true },
                { text: 'AC service', included: true },
                { text: 'Brake inspection', included: true },
                { text: 'Battery maintenance', included: true },
                { text: 'Free pickup & drop', included: true },
                { text: '24/7 emergency support', included: true },
            ],
        },
        {
            id: 'premium',
            name: 'Premium Care',
            duration: '12 Months Package',
            originalPrice: '₹18,000',
            discountedPrice: '₹14,999',
            savings: 'Save up to ₹3001',
            oilColor: '#C41E3A',
            features: [
                { text: 'General service (4x)', included: true },
                { text: 'Complete diagnostics', included: true },
                { text: 'AC service (2x)', included: true },
                { text: 'Brake & suspension check', included: true },
                { text: 'Battery replacement', included: true },
                { text: 'Insurance claim assistance', included: true },
                { text: 'Free pickup & drop', included: true },
                { text: '24/7 priority support', included: true },
            ],
        },
    ];

    return (
        <section className="relative min-h-[800px] py-12 md:py-20 px-4 md:px-5 bg-[hsl(var(--color-background))] overflow-hidden">
            <div className="relative max-w-[1400px] mx-auto z-[2]">
                {/* Header */}
                <div className="text-center mb-10 md:mb-15" id="package">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-[hsl(var(--color-secondary))] mb-4">
                        Annual Maintenance Packages 🛠️
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-[hsl(var(--color-secondary)/0.7)] max-w-[700px] mx-auto leading-relaxed px-2">
                        Choose the perfect maintenance plan for your vehicle. Save money with our comprehensive packages.
                    </p>
                </div>

                {/* Package Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 py-5">
                    {packages.map((pkg, index) => (
                        <motion.div
                            key={pkg.id}
                            className="relative group cursor-pointer mx-auto w-full max-w-[380px] md:max-w-none"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            {/* Popular Badge */}
                            {pkg.popular && (
                                <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 z-10 bg-gradient-to-br from-[hsl(var(--color-primary))] to-[hsl(var(--color-primary-light))] px-4 md:px-5 py-1.5 md:py-2 rounded-full shadow-lg shadow-[hsl(var(--color-primary)/0.4)] whitespace-nowrap">
                                    <span className="text-xs md:text-sm font-bold text-white uppercase tracking-wide">
                                        ⭐ Most Popular
                                    </span>
                                </div>
                            )}

                            {/* Engine Oil Bottle Shape */}
                            <div className="relative w-full pt-6 md:pt-8 px-1 md:px-2">
                                {/* Bottle Cap & Spout - Top Left */}
                                <div className="absolute top-0 left-[10%] md:left-[15%] z-20">
                                    {/* Cap */}
                                    <div className="w-12 md:w-14 h-5 md:h-6 bg-[#d03a3a] rounded-sm shadow-md border-b-2 border-[#a02a2a] relative">
                                        <div className="absolute inset-0 flex justify-around items-center opacity-30">
                                            <div className="w-0.5 h-full bg-black" />
                                            <div className="w-0.5 h-full bg-black" />
                                            <div className="w-0.5 h-full bg-black" />
                                        </div>
                                    </div>
                                    {/* Neck */}
                                    <div className="mx-auto w-8 md:w-10 h-5 md:h-6 bg-gradient-to-r from-[#4a4a4a] to-[#2a2a2a] -mt-1" />
                                </div>

                                {/* Curved Handle - Right Side */}
                                <div className="absolute top-12 md:top-16 -right-1 md:-right-2 w-16 md:w-20 h-40 md:h-48 z-0">
                                    <div className="w-full h-full border-[10px] md:border-[14px] border-[#3b82f6] border-l-0 rounded-r-[40px] md:rounded-r-[50px] skew-y-6 shadow-[4px_4px_10px_rgba(0,0,0,0.2)] bg-[#60a5fa]" />
                                </div>

                                {/* Bottle Body */}
                                <div
                                    className={`relative z-10 bg-gradient-to-br from-[#60a5fa] via-[#93c5fd] to-[#3b82f6] rounded-tl-[25px] md:rounded-tl-[30px] rounded-tr-[80px] md:rounded-tr-[120px] rounded-b-[20px] p-4 md:p-6 pt-14 md:pt-16 min-h-[480px] md:min-h-[540px] shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.1),5px_10px_25px_rgba(0,0,0,0.2)] border-2 ${pkg.popular ? 'border-[hsl(var(--color-primary))]' : 'border-[#2563eb]'
                                        }`}
                                >
                                    {/* Molded Grip Lines (Left Side) */}
                                    <div className="absolute top-32 md:top-40 left-0 w-2 md:w-3 h-24 md:h-32 flex flex-col justify-between opacity-20">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="w-full h-1 md:h-1.5 bg-black rounded-r-full" />
                                        ))}
                                    </div>

                                    {/* Label Area */}
                                    <div className="relative bg-white/90 dark:bg-[#1a1a1a]/95 rounded-xl p-4 md:p-5 shadow-lg border border-gray-200 dark:border-gray-700 backdrop-blur-sm mr-3 md:mr-4 transition-colors duration-300 overflow-hidden">
                                        {/* Content Oil Fill Animation */}
                                        <div
                                            className="absolute bottom-0 left-0 w-full h-0 group-hover:h-full transition-all duration-[2000ms] ease-in-out z-0 opacity-15"
                                            style={{ background: pkg.oilColor }}
                                        />

                                        <div className="relative z-10">
                                            <h3 className="text-xl md:text-2xl font-extrabold text-[#1a1a1a] dark:text-white mb-1 md:mb-2 text-center">
                                                {pkg.name}
                                            </h3>
                                            <p className="text-xs md:text-sm text-[#666] dark:text-gray-400 text-center mb-3 md:mb-4 font-bold uppercase tracking-wider">
                                                {pkg.duration}
                                            </p>

                                            {/* Price Section */}
                                            <div className="text-center mb-4 md:mb-5 p-2 md:p-3 bg-gray-50/80 dark:bg-gray-800/80 rounded-lg border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
                                                <div className="text-xs md:text-sm text-[#999] dark:text-gray-500 line-through">
                                                    {pkg.originalPrice}
                                                </div>
                                                <div className="text-2xl md:text-3xl font-black text-[hsl(var(--color-primary))] mb-1">
                                                    {pkg.discountedPrice}
                                                </div>
                                                <div className="inline-block text-[10px] md:text-xs font-bold text-white bg-green-500 px-2 py-0.5 rounded-md">
                                                    {pkg.savings}
                                                </div>
                                            </div>

                                            {/* Features List */}
                                            <ul className="mb-4 md:mb-5 space-y-1.5 md:space-y-2">
                                                {pkg.features.map((feature, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="flex items-start gap-2 text-xs text-[#333] dark:text-gray-300 border-b border-gray-100 dark:border-gray-700 pb-1 last:border-0"
                                                    >
                                                        <span className="flex-shrink-0 text-[hsl(var(--color-primary))] font-bold">
                                                            ✓
                                                        </span>
                                                        <span className="leading-tight">{feature.text}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* CTA Button */}
                                            <button className="w-full py-2.5 md:py-3 bg-[hsl(var(--color-primary))] text-white hover:bg-white hover:text-[hsl(var(--color-primary))] border-2 border-transparent hover:border-[hsl(var(--color-primary))] text-sm md:text-base font-bold rounded-lg shadow-md transition-all uppercase">
                                                Choose {pkg.name}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Bottom branding/emboss effect */}
                                    <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-[10px] md:text-xs font-black tracking-[0.2em] select-none">
                                        ADDAX
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Package;
