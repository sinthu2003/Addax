import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './Pricing.css';

interface Service {
    name: string;
    duration: string;
    price: string;
    icon: string; // Emoji icon for the service
}

interface ServiceCategory {
    title: string;
    services: Service[];
}

const Pricing: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
    const [visiblePrices, setVisiblePrices] = useState<Set<number>>(new Set());

    const serviceCategories: ServiceCategory[] = [
        {
            title: 'Basic Services',
            services: [
                { name: 'General Car Service', duration: '2-4 hrs', price: '₹1,500 - ₹3,500', icon: '🔧' },
                { name: 'Oil Change', duration: '30 min', price: '₹800 - ₹2,000', icon: '🛢️' },
                { name: 'Battery Check', duration: '15 min', price: '₹200 - ₹500', icon: '🔋' },
                { name: 'Tyre Pressure Check', duration: '10 min', price: 'Free', icon: '🛞' },
            ],
        },
        {
            title: 'Advanced Services',
            services: [
                { name: 'Engine Diagnostics', duration: '1-2 hrs', price: '₹800 - ₹1,500', icon: '⚙️' },
                { name: 'AC Service Complete', duration: '2-3 hrs', price: '₹1,200 - ₹4,000', icon: '❄️' },
                { name: 'Brake & Suspension', duration: '3-4 hrs', price: '₹1,800 - ₹8,000', icon: '🛑' },
                { name: 'Battery Replacement', duration: '1 hr', price: '₹2,500 - ₹8,000', icon: '🔌' },
            ],
        },
        {
            title: 'Body Work',
            services: [
                { name: 'Minor Dent Repair', duration: '1-2 days', price: '₹2,000 - ₹5,000', icon: '🔨' },
                { name: 'Paint Touch-up', duration: '1-3 days', price: '₹1,500 - ₹8,000', icon: '🎨' },
                { name: 'Full Body Paint', duration: '5-7 days', price: '₹15,000 - ₹50,000', icon: '🖌️' },
                { name: 'Scratch Removal', duration: '1-2 hrs', price: '₹500 - ₹3,000', icon: '✨' },
            ],
        },
    ];

    // Track which cards are in view
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        cardRefs.current.forEach((card, index) => {
            if (card) {
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                setTimeout(() => {
                                    setVisiblePrices((prev) => new Set(prev).add(index));
                                }, 300);
                            }
                        });
                    },
                    { threshold: 0.5 }
                );

                observer.observe(card);
                observers.push(observer);
            }
        });

        return () => {
            observers.forEach((observer) => observer.disconnect());
        };
    }, []);

    return (
        <section className="pricing-section" ref={sectionRef}>
            {/* Background welding effects */}
            <div className="welding-bg-effects">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className={`bg-spark bg-spark-${i + 1}`} />
                ))}
            </div>

            <div className="pricing-container">
                {/* Header Section */}
                <div className="pricing-header">
                    <h2 className="pricing-title">Transparent Pricing 🔥</h2>
                    <p className="pricing-subtitle">
                        Honest, upfront pricing with no hidden charges. Choose from individual services or
                        money-saving maintenance packages tailored to your needs.
                    </p>
                </div>

                {/* Service Pricing Guide Title */}
                <div className="guide-title-wrapper" id="pricing">
                    <h3 className="guide-title">Service Pricing Guide</h3>
                    <div className="weld-line" />
                </div>

                {/* Service Categories */}
                {serviceCategories.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="category-section">
                        {/* Category Header */}
                        <motion.div
                            className="category-header"
                            initial={{ opacity: 0, x: -50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                            transition={{ duration: 0.6, delay: 0.3 + categoryIndex * 0.1 }}
                        >
                            <div className="category-badge">
                                <span className="badge-text">{category.title}</span>
                                <div className="badge-weld" />
                            </div>
                        </motion.div>

                        {/* Welding Mask Cards Grid */}
                        <div className="mask-cards-grid">
                            {category.services.map((service, serviceIndex) => {
                                const globalIndex = categoryIndex * 4 + serviceIndex;
                                const isPriceVisible = visiblePrices.has(globalIndex);

                                return (
                                    <motion.div
                                        key={serviceIndex}
                                        ref={(el) => { cardRefs.current[globalIndex] = el; }}
                                        className="mask-card"
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.4 + categoryIndex * 0.1 + serviceIndex * 0.1,
                                        }}
                                    >
                                        {/* Welding Mask Shape */}
                                        <div className="mask-shape">
                                            {/* Mask visor (dark tinted area) */}
                                            <div className="mask-visor">
                                                <div className="visor-tint">
                                                    <span className="visor-icon">{service.icon}</span>
                                                </div>
                                                <div className="visor-reflection" />
                                            </div>

                                            {/* Mask frame */}
                                            <div className="mask-frame">
                                                <div className="frame-rivet frame-rivet-1" />
                                                <div className="frame-rivet frame-rivet-2" />
                                                <div className="frame-rivet frame-rivet-3" />
                                                <div className="frame-rivet frame-rivet-4" />
                                            </div>

                                            {/* Service Info */}
                                            <div className="service-info">
                                                <h4 className="service-name">{service.name}</h4>
                                                <div className="service-duration">
                                                    <span className="duration-icon">⏱</span>
                                                    <span>{service.duration}</span>
                                                </div>
                                            </div>

                                            {/* Price reveal with welding effect */}
                                            <div className={`price-reveal ${isPriceVisible ? 'visible' : ''}`}>
                                                {/* Welding sparks */}
                                                {isPriceVisible && (
                                                    <>
                                                        {[...Array(12)].map((_, i) => (
                                                            <div key={i} className={`weld-spark spark-${i + 1}`} />
                                                        ))}
                                                    </>
                                                )}

                                                {/* Price display */}
                                                <div className="price-display">
                                                    <div className="price-glow" />
                                                    <span className="price-value">{service.price}</span>
                                                </div>
                                            </div>

                                            {/* Welding flash overlay */}
                                            {isPriceVisible && <div className="weld-flash" />}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* Footer Note */}
                <motion.div
                    className="pricing-footer"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <div className="footer-plate">
                        <p className="footer-note">
                            * Prices may vary based on vehicle model, parts required, and specific conditions
                        </p>
                        <div className="plate-edge" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Pricing;
