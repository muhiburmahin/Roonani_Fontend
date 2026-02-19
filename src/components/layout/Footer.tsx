"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const footerLinks = {
    shop: [
        { name: "New Arrivals", href: "/shop/new" },
        { name: "Best Sellers", href: "/shop/popular" },
        { name: "Summer Collection", href: "/category/summer" },
        { name: "Accessories", href: "/category/accessories" },
    ],
    customerService: [
        { name: "Track Order", href: "/track" },
        { name: "Shipping Policy", href: "/shipping" },
        { name: "Returns & Exchanges", href: "/returns" },
        { name: "Size Guide", href: "/size-guide" },
    ],
    about: [
        { name: "Our Story", href: "/about" },
        { name: "Contact Us", href: "/contact" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 transition-colors duration-300">
            <div className="container mx-auto px-6 md:px-12 pt-20 pb-10">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">

                    {/* Brand Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-100 bg-slate-50 shadow-sm transition-transform group-hover:scale-105">
                                <Image
                                    src="/logo1.ico"
                                    alt="roohani logo"
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                <span className="text-brand">roohani</span>
                            </span>
                        </Link>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
                            Redefining elegance with modern aesthetics. roohani brings you the finest collection of fashion and style delivered straight to your heart.
                        </p>

                        {/* Newsletter Mini Form */}
                        <div className="relative max-w-xs pt-2">
                            <input
                                type="email"
                                placeholder="Subscribe for deals"
                                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full py-3 px-5 pr-12 text-xs outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
                            />
                            <button className="absolute right-1 top-[13px] bg-brand text-white p-2 rounded-full hover:opacity-90 transition-opacity">
                                <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div>
                            <h4 className="font-black text-xs uppercase tracking-widest text-slate-900 dark:text-white mb-6">Shop</h4>
                            <ul className="space-y-4">
                                {footerLinks.shop.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-sm text-slate-500 hover:text-brand transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-black text-xs uppercase tracking-widest text-slate-900 dark:text-white mb-6">Support</h4>
                            <ul className="space-y-4">
                                {footerLinks.customerService.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-sm text-slate-500 hover:text-brand transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="hidden md:block">
                            <h4 className="font-black text-xs uppercase tracking-widest text-slate-900 dark:text-white mb-6">Company</h4>
                            <ul className="space-y-4">
                                {footerLinks.about.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-sm text-slate-500 hover:text-brand transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Contact & Social */}
                    <div className="space-y-6">
                        <h4 className="font-black text-xs uppercase tracking-widest text-slate-900 dark:text-white mb-6">Socials</h4>
                        <div className="flex gap-3">
                            {[Facebook, Instagram, Youtube, Twitter].map((Icon, idx) => (
                                <Link
                                    key={idx}
                                    href="#"
                                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-400 hover:bg-brand hover:text-white transition-all duration-300"
                                >
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                        <div className="space-y-3 pt-4 border-t border-slate-50 dark:border-slate-900">
                            <div className="flex items-center gap-3 text-xs text-slate-500">
                                <Phone size={14} className="text-brand" /> +880 1XXX-XXXXXX
                            </div>
                            <div className="flex items-center gap-3 text-xs text-slate-500">
                                <Mail size={14} className="text-brand" /> hello@roohani.com
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs text-slate-400 font-medium tracking-wide">
                        &copy; {new Date().getFullYear()} <span className="text-slate-900 dark:text-white font-bold">roohani fashion</span>. designed with love.
                    </p>

                    {/* Payment Icons */}
                    <div className="flex items-center gap-5 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" />
                    </div>
                </div>
            </div>
        </footer>
    );
}