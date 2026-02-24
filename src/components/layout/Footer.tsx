"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, LayoutDashboard, ShoppingBag, Home, MessageSquare } from "lucide-react";

const quickLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Shop", href: "/shop", icon: ShoppingBag },
    { name: "Dashboard", href: "/admin-dashboard", icon: LayoutDashboard },
    { name: "Contact", href: "/contact", icon: MessageSquare },
];

export default function Footer() {
    const whatsappLink = "https://wa.me/8801771955119";

    return (
        <>
            {/* --- Compact & Bouncing WhatsApp Widget --- */}
            <div className="fixed bottom-6 right-5 z-[9999] flex flex-col items-end gap-2 group">
                {/* Small Tooltip */}
                <div className="bg-white dark:bg-slate-900 text-[10px] font-black uppercase tracking-tighter text-slate-800 dark:text-white px-3 py-1.5 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                    Chat with us
                </div>

                {/* Smaller Bouncing Button */}
                <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] text-white p-3.5 rounded-2xl shadow-lg hover:shadow-[#25D366]/40 transition-all duration-300 flex items-center justify-center animate-bounce hover:animate-none active:scale-90"
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="w-6 h-6 fill-white" // সাইজ কমিয়ে ৬ করে দেওয়া হয়েছে
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.412c-1.935 0-3.83-.518-5.488-1.498l-.394-.233-4.085 1.071 1.089-3.986-.255-.406C1.92 15.117 1.412 13.082 1.412 11.0c0-5.835 4.745-10.58 10.58-10.58 2.827 0 5.485 1.1 7.483 3.098 1.998 1.998 3.098 4.656 3.098 7.483 0 5.836-4.745 10.581-10.58 10.581m0-22.161C5.462 0 0 5.462 0 12.201c0 2.153.562 4.253 1.63 6.132L0 24l5.857-1.536c1.815 1.026 3.876 1.569 5.978 1.569 6.739 0 12.202-5.462 12.202-12.201C24.037 5.462 18.575 0 12.202 0z" />
                    </svg>
                </a>
            </div>

            <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 transition-colors duration-300">
                <div className="container mx-auto px-6 md:px-12 pt-20 pb-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16 items-start text-center md:text-left">

                        {/* 1. Brand Section */}
                        <div className="space-y-6 flex flex-col items-center md:items-start">
                            <Link href="/" className="relative">
                                <div className="w-28 h-10 relative mb-1">
                                    <Image
                                        src="/logo.png"
                                        alt="roohani logo"
                                        fill
                                        className="object-contain object-left"
                                    />
                                </div>
                                <span className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white block">
                                    roohani<span className="text-[#E8939B]">.</span>
                                </span>
                            </Link>
                            <p className="text-slate-400 dark:text-slate-500 text-[11px] font-bold leading-relaxed max-w-xs uppercase tracking-widest">
                                Redefining elegance with modern aesthetics. roohani brings the finest fashion straight to your heart.
                            </p>
                        </div>

                        {/* 2. Quick Navigation */}
                        <div className="flex flex-col items-center">
                            <h4 className="font-black text-[10px] uppercase tracking-[0.4em] text-[#E8939B] mb-8">Navigation</h4>
                            <ul className="grid grid-cols-2 gap-x-8 gap-y-5">
                                {quickLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="flex items-center gap-2 text-[12px] font-black text-slate-700 dark:text-slate-300 hover:text-[#E8939B] transition-all group uppercase tracking-tighter"
                                        >
                                            <span className="w-1 h-1 rounded-full bg-slate-200 group-hover:bg-[#E8939B]"></span>
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 3. Contact & Socials */}
                        <div className="space-y-6 flex flex-col items-center md:items-end">
                            <div className="text-center md:text-right">
                                <h4 className="font-black text-[10px] uppercase tracking-[0.4em] text-[#E8939B] mb-4">Concierge</h4>
                                <a href={whatsappLink} target="_blank" className="block group">
                                    <span className="text-xl font-black text-slate-900 dark:text-white group-hover:text-[#E8939B] transition-colors">
                                        017 7195 5119
                                    </span>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Direct WhatsApp</p>
                                </a>
                            </div>

                            <div className="flex gap-3">
                                <Link
                                    href="https://www.facebook.com/share/1Fvo8tGVvr/?mibextid=wwXIfr"
                                    target="_blank"
                                    className="w-10 h-10 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center"
                                >
                                    <Facebook size={18} />
                                </Link>
                                <Link
                                    href="https://www.instagram.com/roohani.bd?igsh=MWkwM2ZtaXg0N2Rubw=="
                                    target="_blank"
                                    className="w-10 h-10 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center"
                                >
                                    <Instagram size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                            &copy; {new Date().getFullYear()} roohani • Elegant Lifestyle
                        </p>
                        <div className="flex items-center gap-6 opacity-30 grayscale hover:opacity-100 transition-all duration-500">
                            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">COD Available</span>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}