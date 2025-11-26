import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './CustomerReview.css';

interface Review {
    name: string;
    location: string;
    car: string;
    text: string;
}

const reviews: Review[] = [
    {
        name: "Divya Rajesh",
        location: "Ambattur, Chennai",
        car: "Toyota Innova",
        text: "Outstanding denting and painting work! My car looks brand new after the accident repair. Highly recommended!"
    },
    {
        name: "Ravi Kumar",
        location: "Thiruvallur, Chennai",
        car: "Ford EcoSport",
        text: "Professional automotive service center. Quick diagnostics and fair pricing. Open 24/7 which is very convenient."
    },
    {
        name: "Karthick",
        location: "Vanagaram, Chennai",
        car: "Honda City",
        text: "Excellent service and reasonable prices. ADDAX AUTOMOTIVE fixed my car AC perfectly. Professional team with good technical knowledge."
    },
    {
        name: "Vijay",
        location: "Avadi, Chennai",
        car: "Hyundai i20",
        text: "Great experience with car repair service. The staff is helpful and the work quality is good. Affordable pricing."
    },
    {
        name: "Sinthu",
        location: "Velachery",
        car: "Maruti Swift",
        text: "Good service for general maintenance. They explained all the work needed and completed it on time. Will visit again."
    }
];

const CustomerReview: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
    const [activeIndex, setActiveIndex] = useState(0);
    const [isWaterSpraying, setIsWaterSpraying] = useState(true);

    // Auto-rotate carousel continuously
    useEffect(() => {
        const interval = setInterval(() => {
            // Stop water before changing card
            setIsWaterSpraying(false);

            setTimeout(() => {
                setActiveIndex((prev) => (prev + 1) % reviews.length);
                // Restart water after card changes
                setTimeout(() => {
                    setIsWaterSpraying(true);
                }, 300);
            }, 200);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="review-section py-20 px-5" ref={sectionRef}>
            <div className="max-w-[1400px] mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <motion.h2
                        className="text-3xl md:text-5xl font-extrabold text-[hsl(var(--color-secondary))] mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                        transition={{ duration: 0.6 }}
                    >
                        What Our Customers Say 💬
                    </motion.h2>
                    <p className="text-base md:text-lg lg:text-xl text-[hsl(var(--color-secondary)/0.7)] max-w-[700px] mx-auto leading-relaxed px-2">
                        Hear from customers who trust us with their vehicles
                    </p>

                </div>

                {/* Cards Container - Continuous 3-card display */}
                <div className="cards-container min-h-[450px]">
                    {[0, 1, 2].map((offset) => {
                        const index = (activeIndex + offset) % reviews.length;
                        const isActive = offset === 1; // Center card is active

                        return (
                            <motion.div
                                key={index}
                                className={`review-card ${isActive ? 'wet active' : 'inactive'} p-6 md:p-8 rounded-xl relative flex flex-col min-h-[350px] ${isActive ? 'w-full max-w-xl' : 'w-72'
                                    }`}
                                animate={{
                                    scale: isActive ? 1.05 : 0.9,
                                    opacity: isActive ? 1 : 0.6
                                }}
                                transition={{ duration: 0.6 }}
                            >
                                {/* Falling water droplets inside active card */}
                                {isActive && isWaterSpraying && (
                                    <>
                                        {[...Array(10)].map((_, i) => (
                                            <div
                                                key={`droplet-${i}`}
                                                className="water-droplet-fall"
                                                style={{
                                                    left: `${15 + (i * 7)}%`,
                                                    animationDelay: `${i * 0.3}s`
                                                }}
                                            />
                                        ))}
                                    </>
                                )}

                                <p className="text-[hsl(var(--color-secondary)/0.9)] text-base md:text-lg italic mb-6 leading-relaxed relative z-10">
                                    "{reviews[index].text}"
                                </p>

                                <div className="mt-auto flex items-center gap-4 border-t border-[hsl(var(--color-secondary)/0.1)] pt-4">
                                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[hsl(var(--color-primary))] to-[hsl(var(--color-primary-dark))] flex items-center justify-center text-white font-bold text-xl md:text-2xl shadow-lg">
                                        {reviews[index].name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-base md:text-lg text-[hsl(var(--color-secondary))]">{reviews[index].name}</h4>
                                        <p className="text-xs md:text-sm text-[hsl(var(--color-secondary)/0.6)]">{reviews[index].location}</p>
                                        <span className="text-xs font-semibold text-[hsl(var(--color-primary))] uppercase tracking-wider mt-1 block">
                                            {reviews[index].car}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Indicators */}
                <div className="flex justify-center gap-2">
                    {reviews.map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all ${index === activeIndex
                                ? 'bg-[hsl(var(--color-primary))] w-6'
                                : 'bg-[hsl(var(--color-secondary)/0.3)]'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Spray Nozzle Image from Top-Left Corner */}
            <motion.div
                className="pipe-container-corner"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <img
                    src="/images/spray-nozzle.png"
                    alt="Water Spray Nozzle"
                    className="spray-nozzle-img"
                />

                {/* Water spray - only show when water is spraying */}
                {isWaterSpraying && (
                    <div className="water-spray-corner">
                        {[...Array(100)].map((_, i) => (
                            <div
                                key={i}
                                className="water-particle-corner"
                                style={{
                                    top: `${Math.random() * 30 - 15}px`,
                                    left: `${Math.random() * 20}px`,
                                    animationDelay: `${(i * 0.03) % 2.5}s`
                                }}
                            />
                        ))}
                    </div>
                )}
            </motion.div>
        </section>
    );
};

export default CustomerReview;
