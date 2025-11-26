import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, MapPin, Instagram, Clock, Navigation } from 'lucide-react';

const Contact = () => {
    const contactInfo = {
        phone: "+91 93630 39969",
        address: "No.17, Andal Nagar, Masilamani Street, Opposite To SV High School, Vanagaram, Chennai - 600095",
        hours: "Open 24/7 - All days",
        mapLink: "https://www.google.com/maps/place/ADDAX+AUTOMOTIVE+(Car+Service,+Car+AC+Repair,+Car+Accident+Insurance+Claim,+Car+Mechanic,+Car+Towing,+Car+road+assistance))/@13.0545583,80.1462,16.86z/data=!4m7!3m6!1s0x3a52610f527eee05:0xf0228105c8d0de9f!8m2!3d13.0546086!4d80.1510902!10e1!16s%2Fg%2F11kq8bcykg?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D",
        whatsappLink: "https://wa.me/919363039969",
        instagramLink: "https://www.instagram.com/addax_automotive/"
    };

    const actionButtons = [
        {
            label: "Call Us Now",
            icon: Phone,
            action: `tel:${contactInfo.phone.replace(/\s/g, '')}`,
            color: "from-blue-500 to-blue-600",
            shadow: "shadow-blue-500/20",
            subtext: "Instant Support"
        },
        {
            label: "WhatsApp Us",
            icon: MessageCircle,
            action: contactInfo.whatsappLink,
            color: "from-green-500 to-green-600",
            shadow: "shadow-green-500/20",
            subtext: "Chat with us"
        },
        {
            label: "Get Directions",
            icon: MapPin,
            action: contactInfo.mapLink,
            color: "from-red-500 to-red-600",
            shadow: "shadow-red-500/20",
            subtext: "Visit our center"
        },
        {
            label: "Follow Us",
            icon: Instagram,
            action: contactInfo.instagramLink,
            color: "from-purple-500 to-purple-600",
            shadow: "shadow-purple-500/20",
            subtext: "On Instagram"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <section className="relative bg-zinc-950 py-20 px-4 overflow-hidden min-h-screen flex items-center justify-center" id="contact">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.05),transparent_70%)]" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-900/50 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-900/50 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto w-full relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                >
                    {/* Left Column: Header & Actions */}
                    <div className="space-y-12">
                        <motion.div variants={itemVariants} className="text-center lg:text-left">
                            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                                Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">Touch</span>
                            </h2>
                            <p className="text-zinc-400 text-lg md:text-xl max-w-lg mx-auto lg:mx-0">
                                Ready to help with all your automotive needs. Reach out to us anytime.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {actionButtons.map((btn, index) => (
                                <motion.a
                                    key={index}
                                    href={btn.action}
                                    target={btn.label === "Call Us Now" ? "_self" : "_blank"}
                                    rel="noopener noreferrer"
                                    className="group relative p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 overflow-hidden"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-br ${btn.color} transition-opacity duration-300`} />
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${btn.color} flex items-center justify-center text-white shadow-lg ${btn.shadow}`}>
                                            <btn.icon className="w-6 h-6" />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-white font-bold text-lg leading-tight">{btn.label}</div>
                                            <div className="text-zinc-500 text-sm group-hover:text-zinc-400 transition-colors">{btn.subtext}</div>
                                        </div>
                                    </div>
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Column: Quick Info Card */}
                    <motion.div variants={itemVariants} className="relative">
                        {/* Decorative backdrop */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-50" />

                        <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 md:p-10 shadow-2xl">
                            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                <span className="w-1 h-8 bg-red-600 rounded-full" />
                                Quick Contact Info
                            </h3>

                            <div className="space-y-8">
                                {/* Phone */}
                                <div className="flex items-start gap-5 group">
                                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/10 transition-colors duration-300">
                                        <Phone className="w-5 h-5 text-red-500" />
                                    </div>
                                    <div>
                                        <p className="text-zinc-500 text-sm font-medium uppercase tracking-wider mb-1">Phone</p>
                                        <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="text-xl md:text-2xl font-bold text-white hover:text-red-500 transition-colors">
                                            {contactInfo.phone}
                                        </a>
                                    </div>
                                </div>

                                {/* Hours */}
                                <div className="flex items-start gap-5 group">
                                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/10 transition-colors duration-300">
                                        <Clock className="w-5 h-5 text-red-500" />
                                    </div>
                                    <div>
                                        <p className="text-zinc-500 text-sm font-medium uppercase tracking-wider mb-1">Hours</p>
                                        <p className="text-lg text-zinc-200 font-medium">
                                            {contactInfo.hours}
                                        </p>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex items-start gap-5 group">
                                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/10 transition-colors duration-300">
                                        <Navigation className="w-5 h-5 text-red-500" />
                                    </div>
                                    <div>
                                        <p className="text-zinc-500 text-sm font-medium uppercase tracking-wider mb-1">Address</p>
                                        <p className="text-zinc-300 leading-relaxed">
                                            {contactInfo.address}
                                        </p>
                                        <a
                                            href={contactInfo.mapLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-red-500 text-sm font-bold mt-3 hover:text-red-400 transition-colors"
                                        >
                                            View on Map <MapPin className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
