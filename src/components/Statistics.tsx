import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Star, Users, Calendar } from 'lucide-react';
import { useStaticData } from '../dataContext';

// Animated counter component - triggers on every scroll
const AnimatedCounter = ({
    target,
    duration = 2,
    decimals = 0,
    prefix = '',
    suffix = ''
}: {
    target: number;
    duration?: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
}) => {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { duration: duration * 1000 });
    const isInView = useInView(ref, { once: false, margin: "-100px" });
    const [displayValue, setDisplayValue] = useState('0');

    useEffect(() => {
        if (isInView) {
            motionValue.set(target);
        } else {
            motionValue.set(0);
        }
    }, [isInView, motionValue, target]);

    useEffect(() => {
        const unsubscribe = springValue.on('change', (latest) => {
            setDisplayValue(latest.toFixed(decimals));
        });
        return unsubscribe;
    }, [springValue, decimals]);

    return (
        <span ref={ref}>
            {prefix}{displayValue}{suffix}
        </span>
    );
};

const Statistics = () => {
    // Get statistics data from context
    const { statisticsData } = useStaticData();

    // Map icons to the statistics
    const iconMap: { [key: string]: any } = {
        'Satisfied Customers': Users,
        'Customer Rating': Star,
        'Years Experience': Calendar,
    };

    const stats = statisticsData.map(stat => ({
        ...stat,
        icon: iconMap[stat.label] || Users,
    }));

    return (
        <section className="relative w-full min-h-[500px] md:min-h-[650px] overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)',
                }}></div>
            </div>

            {/* Speed lines - Hidden on mobile for performance */}
            <div className="absolute inset-0 opacity-15 hidden md:block">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent"
                        style={{
                            top: `${Math.random() * 100}%`,
                            width: `${150 + Math.random() * 300}px`,
                        }}
                        initial={{ x: '-100%', opacity: 0 }}
                        animate={{
                            x: '200vw',
                            opacity: [0, 0.8, 0.8, 0],
                        }}
                        transition={{
                            duration: 1.5 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 3,
                            ease: 'linear',
                        }}
                    />
                ))}
            </div>

            {/* Animated Car Image - Reduced on mobile */}
            <motion.div
                className="absolute bottom-[8%] md:bottom-[12%] w-full h-[250px] md:h-[400px] flex items-center justify-center z-0 opacity-30 md:opacity-100"
                initial={{ x: '100%' }}
                animate={{ x: '-120%' }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            >
                {/* Exhaust smoke - Hidden on mobile */}
                <div className="absolute right-[-50px] bottom-[30%]">
                    {[...Array(18)].map((_, i) => (
                        <motion.div
                            key={`smoke-${i}`}
                            className="absolute w-24 h-24 rounded-full hidden md:block"
                            style={{
                                background: 'radial-gradient(circle, rgba(150,150,150,0.4) 0%, transparent 70%)',
                            }}
                            initial={{
                                x: 0,
                                y: 0,
                                scale: 0.1,
                                opacity: 0.7
                            }}
                            animate={{
                                x: 300 + Math.random() * 250,
                                y: Math.random() * 100 - 50,
                                scale: [0.1, 3, 5],
                                opacity: [0.7, 0.3, 0],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: i * 0.1,
                                ease: "easeOut",
                            }}
                        />
                    ))}
                </div>

                {/* Car Image - Smaller on mobile */}
                <img
                    src="/assets/Statistics.png"
                    alt="Red sports car"
                    className="w-[90%] md:w-[80%] h-auto object-contain opacity-60 md:opacity-80 drop-shadow-2xl"
                    style={{
                        filter: 'drop-shadow(0 0 40px rgba(239, 68, 68, 0.5))',
                    }}
                />
            </motion.div>

            {/* Content - Modern Minimal Design */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-2 py-12 md:py-16 lg:py-12">
                {/* Title Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 md:mb-15"
                >
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-3 md:mb-4 tracking-tight">
                        Our Impact
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-gray-400">Excellence in every service</p>
                </motion.div>

                {/* Statistics Grid - Mobile optimized */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-10">
                    {stats.map((stat, index) => {
                        const IconComponent = stat.icon;

                        return (
                            <motion.div
                                key={stat.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.15,
                                    type: "spring",
                                    stiffness: 100
                                }}
                                className="group"
                            >
                                {/* Card Container - Adjusted padding for mobile */}
                                <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 border border-white/10 hover:border-primary/50 transition-all duration-500 hover:bg-white/10">
                                    {/* Icon Circle - Smaller on mobile */}
                                    <div className="flex justify-center mb-4 md:mb-6">
                                        <div className="relative">
                                            {/* Glow effect */}
                                            <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                                            {/* Icon container */}
                                            <div className="relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary to-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={2.5} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Number - Responsive sizing */}
                                    <div className="text-center mb-3 md:mb-4">
                                        <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 leading-none">
                                            <AnimatedCounter
                                                target={stat.value}
                                                decimals={stat.decimals}
                                                suffix={stat.suffix}
                                                duration={2.5}
                                            />
                                        </div>
                                    </div>

                                    {/* Label - Responsive text */}
                                    <div className="text-center">
                                        <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-1">
                                            {stat.label}
                                        </h3>
                                        <p className="text-xs md:text-sm lg:text-base text-gray-400">
                                            {stat.description}
                                        </p>
                                    </div>

                                    {/* Bottom accent line */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-t from-white dark:from-zinc-900 to-transparent pointer-events-none"></div>
        </section>
    );
};

export default Statistics;
