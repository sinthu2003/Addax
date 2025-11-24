import React, { useRef, CSSProperties } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, Variants } from 'framer-motion';
import { InsuranceStep, useStaticData } from '../dataContext';
import { Zap } from 'lucide-react'; // Icon for the electric flow indicator on mobile

const THEME_RED = 'text-red-600 dark:text-red-500';
const THEME_BG_RED = 'bg-red-600 dark:bg-red-700';

const InsuranceSection = () => {
    const { insuranceSteps: steps } = useStaticData();
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "center center"],
    });

    // --- Burst Unbuckling Animation Logic (Unchanged) ---
    const burstStart = 0.75;
    const burstEnd = 0.8;
    const xLeft = useTransform(scrollYProgress, [burstStart, burstEnd], ["0%", "-300%"]);
    const xRight = useTransform(scrollYProgress, [burstStart, burstEnd], ["0%", "300%"]);
    const yWavy = useTransform(scrollYProgress, [burstStart, (burstStart + burstEnd) / 2, burstEnd], ["0%", "30%", "0%"]);
    const innerBuckleScale = useTransform(scrollYProgress, [burstStart, burstEnd], [1, 0.1]);
    const innerBuckleOpacity = useTransform(scrollYProgress, [burstStart, burstEnd], [1, 0]);
    const innerBuckleRotate = useTransform(scrollYProgress, [burstStart, burstEnd], [0, 90]);
    const innerBuckleSkew = useTransform(scrollYProgress, [burstStart, burstEnd], [0, 45]);
    const pushButtonScale = useTransform(scrollYProgress, [burstStart, burstEnd], [1, 0.1]);
    const pushButtonOpacity = useTransform(scrollYProgress, [burstStart, burstEnd], [1, 0]);
    const pushButtonY = useTransform(scrollYProgress, [burstStart, burstEnd], ["0%", "-100%"]);
    const pushButtonX = useTransform(scrollYProgress, [burstStart, burstEnd], ["0%", "100%"]);
    const pushButtonRotate = useTransform(scrollYProgress, [burstStart, burstEnd], [0, -120]);

    const innerBuckleTransform = useMotionTemplate`
    scale(${innerBuckleScale}) rotate(${innerBuckleRotate}deg) skewX(${innerBuckleSkew}deg) translateZ(0px) opacity(${innerBuckleOpacity})
  `;
    const pushButtonTransform = useMotionTemplate`
    translateX(${pushButtonX}) translateY(${pushButtonY}) scale(${pushButtonScale}) rotate(${pushButtonRotate}deg) translateZ(50px) opacity(${pushButtonOpacity})
  `;

    const blurAmount = useTransform(scrollYProgress, [burstStart - 0.02, burstEnd], [8, 0]);
    const contentFilter = useMotionTemplate`blur(${blurAmount}px)`;
    const beltOpacity = useTransform(scrollYProgress, [burstEnd - 0.01, burstEnd + 0.01], [1, 0]);
    const pointerEvents = useTransform(scrollYProgress, (v) => (v > burstEnd ? 'none' : 'auto'));

    // ============ DIAGONAL SEATBELT STYLE (Unchanged) ============
    const seatbeltStyleStatic: CSSProperties = {
        width: '150%', height: '6rem', top: '50%', left: '-25%', position: 'absolute', zIndex: 50,
        transform: 'translateY(-50%) rotate(10deg) perspective(1000px)',
        display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
        transformOrigin: 'center center', willChange: 'transform, opacity',
    };

    // Variants (Unchanged)
    const flowContainerVariants: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.5, delayChildren: 0.3 } }, };
    const oilFlowVariants: Variants = { hidden: { width: 0 }, show: { width: '100%', transition: { duration: 0.5, ease: "easeInOut" } }, };
    const cardActivationVariants: Variants = { hidden: { scale: 0.95, opacity: 0.8 }, show: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 10 } }, };


    return (
        <section
            ref={sectionRef}
            id="insurance"
            // 1. REDUCED BOTTOM PADDING: pb-12 instead of py-24
            className="relative w-full min-h-screen bg-white dark:bg-zinc-900 transition-colors duration-500 overflow-hidden pt-24 pb-12 px-4"
        >
            {/* ================= DIAGONAL SEATBELT ================= */}
            <motion.div
                style={{ ...seatbeltStyleStatic, pointerEvents, opacity: beltOpacity }}
                className="hidden lg:flex md:h-32 [transform:translateY(-50%)_rotate(10deg)_perspective(1000px)] md:[transform:translateY(-50%)_rotate(25deg)_perspective(1000px)]"
            >
                {/* Left Belt Half (Top Left Side) */}
                <motion.div
                    style={{ x: xLeft, y: yWavy }}
                    className="w-1/2 h-full bg-zinc-800 relative flex items-center justify-end shadow-2xl z-20 rounded-r-sm"
                >
                    <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,#000_4px,#000_8px)] dark:opacity-50 dark:bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,#FFF_4px,#FFF_8px)]" />
                    <div className="relative -mr-2 z-30 flex items-center transform scale-90 md:scale-110">
                        <div className="w-16 h-12 md:w-20 md:h-16 bg-gradient-to-b from-gray-200 to-gray-400 dark:from-zinc-700 dark:to-zinc-800 rounded-r-lg border border-gray-500 flex items-center justify-center shadow-md">
                            <motion.div
                                style={{ transform: innerBuckleTransform }}
                                className="w-8 h-6 md:w-10 md:h-8 border-4 border-gray-500 dark:border-zinc-500 rounded-sm bg-zinc-800/20"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Right Belt Half (Bottom Right Side) */}
                <motion.div
                    style={{ x: xRight, y: yWavy }}
                    className="w-1/2 h-full bg-zinc-800 relative flex items-center justify-start shadow-2xl z-20 rounded-l-sm"
                >
                    <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,#000_4px,#000_8px)] dark:opacity-50 dark:bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,#FFF_4px,#FFF_8px)]" />
                    <div className="relative -ml-2 z-40 transform scale-90 md:scale-110">
                        <div className="w-20 h-16 md:w-24 md:h-20 bg-gradient-to-b from-zinc-700 to-zinc-900 rounded-l-md border-r border-zinc-950 flex flex-col items-center justify-center shadow-xl rounded-r-xl">
                            <motion.div
                                style={{ transform: pushButtonTransform }}
                                className={`w-10 h-6 ${THEME_BG_RED} rounded shadow-inner border border-red-800 flex items-center justify-center group cursor-pointer`}
                            >
                                <span className="text-[8px] md:text-[9px] font-bold text-red-900 uppercase tracking-widest">PUSH</span>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>


            {/* ================= MAIN CONTENT (Revealed by unbuckling) ================= */}
            <motion.div
                style={{ filter: contentFilter }}
                className="max-w-7xl mx-auto relative z-10 will-change-transform"
            >
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-4xl font-extrabold text-black dark:text-white mb-2"
                    >
                        Insurance Claim Assistance
                    </motion.h2>
                    <p className="mt-2 text-base md:text-xl text-gray-600 dark:text-gray-400">
                        Complete support for your vehicle insurance claims with expert documentation, surveyor coordination, and direct settlement services</p>
                </div>

                {/* Claim Flow Container */}
                <motion.div
                    // Adjusted for mobile: flex-col is default, md:flex-row is for desktop
                    className="relative flex flex-col md:flex-row justify-between items-center px-4"
                    variants={flowContainerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {/* Main Pipe/Line (Background) - Hidden on mobile, shown on md+ */}
                    <div className="absolute hidden md:block w-[calc(100%-12rem)] h-1 border-b-2 border-dashed border-gray-300 dark:border-gray-700 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"></div>

                    {steps.map((step: InsuranceStep, index: number) => {
                        const IconComponent = step.icon;

                        return (
                            <React.Fragment key={step.id}>
                                {/* Individual Step Card */}
                                <motion.div
                                    variants={cardActivationVariants}
                                    className="relative z-10 w-full md:w-1/4 min-h-[250px] my-4 md:my-0 flex flex-col justify-end p-5 rounded-xl shadow-xl overflow-hidden cursor-default transition-all duration-500 ease-out border-4 border-white dark:border-zinc-800"
                                    style={{
                                        backgroundImage: `url(${step.img})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        filter: 'grayscale(100%)',
                                    }}
                                    whileInView={{ filter: 'grayscale(0%)', transition: { duration: 0.5, delay: index * 0.5 + 0.3 } }}
                                >
                                    {/* Overlay to darken image and provide red/black theme */}
                                    <div className="absolute inset-0 bg-black/70 z-10"></div>

                                    {/* Content Section */}
                                    <div className="relative z-20 h-full flex flex-col justify-end text-white">
                                        <div className={`w-12 h-12 md:w-14 md:h-14 ${THEME_BG_RED} rounded-full flex items-center justify-center mb-3 text-white shadow-xl`}>
                                            <div className="w-6 h-6 md:w-8 md:h-8"><IconComponent /></div>
                                        </div>
                                        <p className={`text-sm md:text-lg font-mono ${THEME_RED} mb-1`}>{step.id}</p>
                                        <h3 className="font-extrabold text-xl md:text-2xl mb-2">{step.title}</h3>
                                        <p className="text-xs md:text-sm text-gray-300">{step.desc}</p>
                                    </div>
                                </motion.div>

                                {/* Separator Logic (Mobile vs. Desktop) */}
                                {index < steps.length - 1 && (
                                    // Mobile: Vertical dashed line with a flash icon (representing electrical connection flow)
                                    <div className="relative w-full h-12 md:w-[6rem] md:h-12 flex flex-col md:flex-row items-center justify-center z-10">

                                        {/* Mobile/Vertical Separator */}
                                        <div className="md:hidden w-1 h-full border-l-2 border-dashed border-gray-300 dark:border-gray-700 absolute"></div>

                                        {/* Connection Point / Icon */}
                                        <div className={`w-6 h-6 md:w-3 md:h-3 ${THEME_BG_RED} rounded-full absolute z-10 shadow-lg shadow-red-500/50 flex items-center justify-center`}>
                                            <Zap className="w-3 h-3 text-white md:hidden" />
                                        </div>

                                        {/* Desktop/Horizontal Separator (Oil Flow - HIDDEN ON MOBILE) */}
                                        <div className="w-full h-1 bg-gray-300 dark:bg-gray-700 absolute hidden md:block"></div>
                                        <motion.div
                                            variants={oilFlowVariants}
                                            className={`h-1 ${THEME_BG_RED} absolute origin-left hidden md:block`}
                                            custom={index}
                                        />
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </motion.div>
            </motion.div>
        </section>
    );
};

export default InsuranceSection;