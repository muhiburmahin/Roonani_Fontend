"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu, ShoppingCart, Search, Home,
  Grid, User, X, LayoutDashboard, ShoppingBag
} from "lucide-react";
import { useSelector } from 'react-redux';
import { RootState } from "@/src/store";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { ModeToggle } from './modeTaggle';

interface ICartItem {
  product: {
    id: string;
  };
}

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Redux সিলেক্টর - টাইপ সেফটি নিশ্চিত করা হয়েছে
  const cartItems = useSelector((state: RootState) => state.cart?.items || []) as ICartItem[];
  const auth = useSelector((state: RootState) => state.auth);

  const isAuthenticated = (auth as { isAuthenticated?: boolean })?.isAuthenticated || false;

  const cartCount = mounted
    ? cartItems.filter((item) => item?.product?.id).length
    : 0;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="w-full sticky top-0 z-50 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">

      {/* --- MOBILE SEARCH OVERLAY --- */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[110] bg-white dark:bg-slate-950 p-4 animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-3">
            <form onSubmit={handleSearchSubmit} className="flex-1 relative">
              <input
                autoFocus
                type="text"
                placeholder="Search products..."
                className="w-full h-12 bg-slate-100 dark:bg-slate-900 rounded-xl px-4 outline-none border-2 border-transparent focus:border-brand transition-all dark:text-slate-100"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-3 text-brand">
                <Search className="size-6" />
              </button>
            </form>
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
              <X className="size-6 text-slate-800 dark:text-slate-200" />
            </Button>
          </div>
        </div>
      )}

      {/* --- MAIN NAVBAR --- */}
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4">

        <div className="lg:hidden flex items-center gap-2">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:text-brand transition-colors bg-slate-50 dark:bg-slate-900 rounded-xl">
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0 flex flex-col border-none dark:bg-slate-900">
              <SheetHeader className="p-5 border-b dark:border-slate-800 bg-brand/5 flex flex-row items-center">
                <div className="flex items-center gap-2">
                  <Image src="/logo.png" alt="Logo" width={32} height={32} />
                  <SheetTitle className="text-brand lowercase italic font-black text-xl tracking-tighter">roohani</SheetTitle>
                </div>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 px-2 tracking-widest">Navigation</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/" onClick={closeMenu} className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-300">
                      <Home size={16} className="text-brand" /> Home
                    </Link>
                    <Link href="/shop" onClick={closeMenu} className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-300">
                      <ShoppingBag size={16} className="text-brand" /> Shop
                    </Link>
                    <Link href="/dashboard" onClick={closeMenu} className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-300 col-span-2">
                      <LayoutDashboard size={16} className="text-brand" /> User Dashboard
                    </Link>
                  </div>
                </div>
                <div className="pt-6 border-t dark:border-slate-800 space-y-4">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 px-2 tracking-widest">Settings</h3>
                  <div className="px-2">{mounted && <ModeToggle />}</div>
                  <div className="flex flex-col gap-3">
                    {!isAuthenticated && (
                      <>
                        <Link href="/login" onClick={closeMenu}><Button className="w-full bg-brand text-white font-bold h-11 rounded-xl shadow-lg shadow-brand/20">Log in</Button></Link>
                        <Link href="/register" onClick={closeMenu}><Button variant="outline" className="w-full border-brand/20 text-brand font-bold h-11 rounded-xl">Register</Button></Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <Link href="/" className="flex items-center gap-1 shrink-0 group">
          <Image src="/logo.png" alt="Roohani" width={35} height={35} className="md:w-10 md:h-10 transition-transform group-hover:scale-110" priority />
          <span className="text-xl md:text-2xl font-black text-brand lowercase italic tracking-tighter">roohani</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-2 ml-4 mr-100 shrink-0">
          <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-brand/10 hover:text-brand transition-all font-black uppercase text-[10px] tracking-widest group">
            <Home size={14} className="group-hover:animate-bounce" /> Home
          </Link>
          <Link href="/shop" className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-orange-500/10 hover:text-orange-500 transition-all font-black uppercase text-[10px] tracking-widest group">
            <ShoppingBag size={14} className="group-hover:animate-pulse" /> Shop
          </Link>
          <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-500 transition-all font-black uppercase text-[10px] tracking-widest group">
            <LayoutDashboard size={14} /> Dashboard
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden lg:block">{mounted && <ModeToggle />}</div>

          <Link href="/cart" className="relative p-2.5 bg-slate-50 dark:bg-slate-900 rounded-xl text-slate-700 dark:text-slate-300 hover:text-brand transition-all group">
            <ShoppingCart className="size-5 md:size-6 group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-950 shadow-lg animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </Link>

          <div className="hidden lg:flex items-center gap-2 ml-2">
            {isAuthenticated ? (
              <Link href="/profile" className="flex items-center gap-2 bg-brand/10 px-4 py-2 rounded-2xl border border-brand/20 hover:bg-brand hover:text-white transition-all group shadow-sm shadow-brand/10">
                <User className="size-5 text-brand group-hover:text-white transition-colors" />
                <span className="text-[10px] font-black uppercase tracking-widest">Account</span>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-slate-700 dark:text-slate-300 hover:text-brand font-black text-[10px] uppercase tracking-widest px-4">Log In</Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-brand hover:bg-brand/90 text-white rounded-xl px-6 font-black text-[10px] uppercase tracking-widest h-10 shadow-lg shadow-brand/20 active:scale-95 transition-all">Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* --- MOBILE BOTTOM NAVIGATION --- */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-t dark:border-slate-800 flex items-center justify-around h-16 z-50 rounded-t-[2.5rem] shadow-[0_-5px_30px_rgba(0,0,0,0.08)] transition-colors duration-300">
        <Link href="/" className="flex flex-col items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-brand transition-all group">
          <div className="p-1 rounded-lg group-hover:bg-brand/10 transition-colors">
            <Home className="size-5" />
          </div>
          <span className="text-[9px] font-black uppercase tracking-tighter">Home</span>
        </Link>
        <Link href="/shop" className="flex flex-col items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-brand transition-all group">
          <div className="p-1 rounded-lg group-hover:bg-brand/10 transition-colors">
            <Grid className="size-5" />
          </div>
          <span className="text-[9px] font-black uppercase tracking-tighter">Shop</span>
        </Link>

        {/* Floating Dashboard - Now with Text */}
        <Link href="/dashboard" className="flex flex-col items-center gap-1 -translate-y-2.5 transition-all active:scale-95 group">
          <div className="bg-brand text-white w-12 h-12 rounded-2xl shadow-lg shadow-brand/30 border-4 border-white dark:border-slate-950 flex items-center justify-center">
            <LayoutDashboard size={15} />
          </div>
          <span className="text-[9px] font-black uppercase tracking-tighter text-brand">Dashboard</span>
        </Link>
        <Link
          href={isAuthenticated ? "/profile" : "/login"}
          className="flex flex-col items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-brand transition-all group"
        >
          <div className="p-1 rounded-lg group-hover:bg-brand/10 transition-colors">
            <User className={`size-5 ${isAuthenticated ? "text-brand" : ""}`} />
          </div>
          <span className="text-[9px] font-black uppercase tracking-tighter">
            {isAuthenticated ? "Account" : "Login"}
          </span>
        </Link>
      </div>
    </header>
  );
};

export { Navbar };