"use client";

import { Truck, ShieldCheck, Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        icon: Sparkles,
        title: "Premium Quality",
        desc: "Exquisite fabrics and unique fragrances crafted for the sophisticated soul.",
        color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20",
    },
    {
        icon: ShieldCheck,
        title: "100% Authentic",
        desc: "We guarantee the authenticity of every stitch and every drop of scent.",
        color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
        icon: Truck,
        title: "Fast Delivery",
        desc: "Receive your luxury essentials with our secured and rapid delivery service.",
        color: "text-rose-600 bg-rose-50 dark:bg-rose-900/20",
    },
    {
        icon: Heart,
        title: "Soulful Service",
        desc: "Our dedicated support team ensures a seamless experience for every customer.",
        color: "text-pink-600 bg-pink-50 dark:bg-pink-900/20",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="py-24 bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
            <div className="container mx-auto px-6 md:px-12">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-20 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="px-6 py-2 text-[10px] font-black tracking-[0.4em] text-brand uppercase bg-brand/5 border border-brand/20 rounded-full"
                    >
                        The Roohani Promise
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
                        Crafting <span className="text-brand italic font-serif">Excellence</span> <br className="hidden md:block" />
                        For Your Lifestyle
                    </h2>

                    <div className="h-1 w-32 bg-brand rounded-full shadow-[0_0_15px_rgba(var(--brand-rgb),0.4)]" />
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="group relative p-10 rounded-[3rem] bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800/50 hover:bg-white dark:hover:bg-slate-900 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-brand/5 transition-all duration-500"
                        >
                            {/* Icon Wrapper */}
                            <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center mb-8 group-hover:rotate-[10deg] transition-all duration-500 shadow-sm`}>
                                <item.icon className="w-8 h-8" />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                                {item.title}
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                                {item.desc}
                            </p>

                            {/* Subtle Decorative Gradient on Hover */}
                            <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}