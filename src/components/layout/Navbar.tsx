"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu, ShoppingCart, Search, Home,
  Grid, User, ChevronRight, X, LayoutDashboard, ShoppingBag, Sparkles
} from "lucide-react";
import { useSelector } from 'react-redux';
import { RootState } from "@/src/store";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { ModeToggle } from './modeTaggle';

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartItems = useSelector((state: RootState) => state.cart?.items || []);
  const auth = useSelector((state: any) => state.auth);
  const isAuthenticated = auth?.isAuthenticated || false;

  const cartCount = mounted ? cartItems.length : 0;

  const categories = [
    { name: "All-Category", url: "/shop" },
    { name: "Panjabi", url: "/shop/panjabi" },
    { name: "Perfume", url: "/shop/perfume" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
    }
  };

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

      {/* --- MAIN NAVBAR CONTAINER --- */}
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4">

        {/* 1. Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:text-brand transition-colors bg-slate-50 dark:bg-slate-900 rounded-xl">
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0 flex flex-col border-none dark:bg-slate-900">
              <SheetHeader className="p-5 border-b dark:border-slate-800 bg-brand/5">
                <div className="flex items-center gap-2">
                  <Image src="/logo1.ico" alt="Logo" width={32} height={32} />
                  <SheetTitle className="text-brand lowercase italic font-black text-xl tracking-tighter">roohani</SheetTitle>
                </div>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Mobile Quick Nav Added Here */}
                <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 px-2 tracking-widest">Navigation</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/" className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-300">
                      <Home size={16} className="text-brand" /> Home
                    </Link>
                    <Link href="/shop" className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-300">
                      <ShoppingBag size={16} className="text-brand" /> Shop
                    </Link>
                    <Link href="/dashboard" className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-300 col-span-2">
                      <LayoutDashboard size={16} className="text-brand" /> User Dashboard
                    </Link>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 px-2 tracking-widest mb-2">Categories</h3>
                  {categories.map((cat) => (
                    <Link key={cat.name} href={cat.url} className="group flex items-center justify-between py-3 px-2 border-b border-slate-50 dark:border-slate-800 font-bold text-sm text-slate-600 dark:text-slate-400 hover:text-brand transition-all">
                      <span>{cat.name}</span>
                      <ChevronRight className="size-4 opacity-50 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>

                <div className="pt-6 border-t dark:border-slate-800 space-y-4">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 px-2 tracking-widest">Settings</h3>
                  <div className="px-2">{mounted && <ModeToggle />}</div>
                  <div className="flex flex-col gap-3">
                    {!isAuthenticated && (
                      <>
                        <Link href="/login"><Button className="w-full bg-brand text-white font-bold h-11 rounded-xl shadow-lg shadow-brand/20">Log in</Button></Link>
                        <Link href="/register"><Button variant="outline" className="w-full border-brand/20 text-brand font-bold h-11 rounded-xl">Register</Button></Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* 2. Logo */}
        <Link href="/" className="flex items-center gap-1 shrink-0 group">
          <Image src="/logo.png" alt="Roohani" width={35} height={35} className="md:w-10 md:h-10 transition-transform group-hover:scale-110" priority />
          <span className="text-xl md:text-2xl font-black text-brand lowercase italic tracking-tighter">roohani</span>
        </Link>

        {/* 3. Desktop Navigation - Colorful Update */}
        <nav className="hidden lg:flex items-center gap-2 ml-4 shrink-0">
          <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-brand/10 hover:text-brand transition-all font-black uppercase text-[10px] tracking-widest group">
            <Home size={14} className="group-hover:animate-bounce" />
            Home
          </Link>
          <Link href="/shop" className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-orange-500/10 hover:text-orange-500 transition-all font-black uppercase text-[10px] tracking-widest group">
            <ShoppingBag size={14} className="group-hover:animate-pulse" />
            Shop
          </Link>
          <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-500 transition-all font-black uppercase text-[10px] tracking-widest group">
            <LayoutDashboard size={14} />
            Dashboard
          </Link>
        </nav>

        {/* 4. Desktop Search Bar (Middle) */}
        <form onSubmit={handleSearchSubmit} className="hidden lg:flex flex-1 max-w-md relative mx-6 group">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full h-11 bg-slate-50 dark:bg-slate-900 rounded-2xl px-5 pr-12 text-sm outline-none border border-slate-200 dark:border-slate-800 focus:border-brand/50 focus:ring-4 focus:ring-brand/5 transition-all dark:text-slate-100"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="absolute right-2 top-1.5 bg-brand text-white p-2 rounded-xl hover:bg-brand/90 transition-colors shadow-md">
            <Search className="size-4" />
          </button>
        </form>

        {/* 5. Right Side Icons & Auth */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden lg:block">{mounted && <ModeToggle />}</div>

          <button onClick={() => setIsSearchOpen(true)} className="lg:hidden p-2.5 bg-slate-50 dark:bg-slate-900 rounded-xl text-slate-600 dark:text-slate-400 hover:text-brand transition-colors">
            <Search className="size-5" />
          </button>

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

      {/* --- DESKTOP CATEGORY BAR --- */}
      <div className="hidden lg:block border-t dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-8 h-12 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.url}
                className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 hover:text-brand transition-colors whitespace-nowrap relative py-3 group"
              >
                {cat.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
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
        {/* Colorful Center Action for Dashboard in Mobile */}
        <Link href="/dashboard" className="flex flex-col items-center justify-center -translate-y-4 bg-brand text-white w-12 h-12 rounded-2xl shadow-xl shadow-brand/40 border-4 border-white dark:border-slate-950 active:scale-90 transition-all">
          <LayoutDashboard size={20} />
        </Link>
        <button onClick={() => setIsSearchOpen(true)} className="flex flex-col items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-brand transition-all group">
          <div className="p-1 rounded-lg group-hover:bg-brand/10 transition-colors">
            <Search className="size-5" />
          </div>
          <span className="text-[9px] font-black uppercase tracking-tighter">Search</span>
        </button>
        <Link
          href={
            isAuthenticated
              ? "/profile"
              : (mounted && localStorage.getItem("has_account") ? "/login" : "/register")
          }
          className="flex flex-col items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-brand transition-all group"
        >
          <div className="p-1 rounded-lg group-hover:bg-brand/10 transition-colors">
            <User className={`size-5 ${isAuthenticated ? "text-brand" : ""}`} />
          </div>

          <span className="text-[9px] font-black uppercase tracking-tighter">
            {isAuthenticated ? (
              "Account"
            ) : (
              mounted && localStorage.getItem("has_account") ? "Login" : "Register"
            )}
          </span>
        </Link>
      </div>
    </header>
  );
};

export { Navbar };

// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import {
//   Menu, ShoppingCart, Search, Home,
//   Grid, User, ChevronRight, X, LayoutDashboard, ShoppingBag
// } from "lucide-react";
// import { useSelector } from 'react-redux';
// import { RootState } from "@/src/store";
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
// import { Button } from "../ui/button";
// import { ModeToggle } from './modeTaggle';

// const Navbar = () => {
//   const [mounted, setMounted] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const cartItems = useSelector((state: RootState) => state.cart?.items || []);
//   const auth = useSelector((state: any) => state.auth);
//   const isAuthenticated = auth?.isAuthenticated || false;

//   const cartCount = mounted ? cartItems.length : 0;

//   const categories = [
//     { name: "All-Category", url: "/shop" },
//     { name: "Panjabi", url: "/shop/panjabi" },
//     { name: "Perfume", url: "/shop/perfume" },
//   ];

//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       setIsSearchOpen(false);
//     }
//   };

//   return (
//     <header className="w-full sticky top-0 z-50 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">

//       {/* --- MOBILE SEARCH OVERLAY --- */}
//       {isSearchOpen && (
//         <div className="fixed inset-0 z-[110] bg-white dark:bg-slate-950 p-4 animate-in slide-in-from-top duration-300">
//           <div className="flex items-center gap-3">
//             <form onSubmit={handleSearchSubmit} className="flex-1 relative">
//               <input
//                 autoFocus
//                 type="text"
//                 placeholder="Search products..."
//                 className="w-full h-12 bg-slate-100 dark:bg-slate-900 rounded-xl px-4 outline-none border-2 border-transparent focus:border-brand transition-all dark:text-slate-100"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <button type="submit" className="absolute right-3 top-3 text-brand">
//                 <Search className="size-6" />
//               </button>
//             </form>
//             <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
//               <X className="size-6 text-slate-800 dark:text-slate-200" />
//             </Button>
//           </div>
//         </div>
//       )}

//       {/* --- MAIN NAVBAR CONTAINER --- */}
//       <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4">

//         {/* 1. Mobile Menu Toggle */}
//         <div className="lg:hidden">
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button variant="ghost" size="icon" className="hover:text-brand transition-colors bg-slate-50 dark:bg-slate-900 rounded-xl">
//                 <Menu className="size-6" />
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="left" className="w-[300px] p-0 flex flex-col border-none dark:bg-slate-900">
//               <SheetHeader className="p-5 border-b dark:border-slate-800 bg-brand/5">
//                 <div className="flex items-center gap-2">
//                   <Image src="/logo1.ico" alt="Logo" width={32} height={32} />
//                   <SheetTitle className="text-brand lowercase italic font-black text-xl tracking-tighter">roohani</SheetTitle>
//                 </div>
//               </SheetHeader>

//               <div className="flex-1 overflow-y-auto p-4 space-y-6">
//                 <div className="space-y-3">
//                   <h3 className="text-[10px] font-black uppercase text-slate-400 px-2 tracking-widest">Quick Access</h3>
//                   <div className="grid grid-cols-2 gap-2">
//                     <Link href="/" className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-300">
//                       <Home size={16} className="text-brand" /> Home
//                     </Link>
//                     <Link href="/shop" className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-300">
//                       <ShoppingBag size={16} className="text-brand" /> Shop
//                     </Link>
//                     <Link href="/dashboard" className="flex items-center gap-2 p-3 bg-brand/10 rounded-xl font-black text-[10px] text-brand col-span-2 uppercase tracking-widest">
//                       <LayoutDashboard size={16} /> Open Dashboard
//                     </Link>
//                   </div>
//                 </div>

//                 <div className="space-y-1">
//                   <h3 className="text-[10px] font-black uppercase text-slate-400 px-2 tracking-widest mb-2">Categories</h3>
//                   {categories.map((cat) => (
//                     <Link key={cat.name} href={cat.url} className="group flex items-center justify-between py-3 px-2 border-b border-slate-50 dark:border-slate-800 font-bold text-sm text-slate-600 dark:text-slate-400 hover:text-brand transition-all">
//                       <span>{cat.name}</span>
//                       <ChevronRight className="size-4 opacity-50 group-hover:translate-x-1 transition-transform" />
//                     </Link>
//                   ))}
//                 </div>

//                 <div className="pt-6 border-t dark:border-slate-800 space-y-4">
//                   <div className="px-2">{mounted && <ModeToggle />}</div>
//                 </div>
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>

//         {/* 2. Logo */}
//         <Link href="/" className="flex items-center gap-1 shrink-0 group">
//           <Image src="/logo1.ico" alt="Roohani" width={35} height={35} className="md:w-10 md:h-10 transition-transform group-hover:scale-110" priority />
//           <span className="text-xl md:text-2xl font-black text-brand lowercase italic tracking-tighter">roohani</span>
//         </Link>

//         {/* 3. Desktop Navigation */}
//         <nav className="hidden lg:flex items-center gap-2 ml-4 shrink-0">
//           <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-brand/10 hover:text-brand transition-all font-black uppercase text-[10px] tracking-widest group">
//             <Home size={14} className="group-hover:animate-bounce" />
//             Home
//           </Link>
//           <Link href="/shop" className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-orange-500/10 hover:text-orange-500 transition-all font-black uppercase text-[10px] tracking-widest group">
//             <ShoppingBag size={14} className="group-hover:animate-pulse" />
//             Shop
//           </Link>
//         </nav>

//         {/* 4. Desktop Search Bar */}
//         <form onSubmit={handleSearchSubmit} className="hidden lg:flex flex-1 max-w-md relative mx-6 group">
//           <input
//             type="text"
//             placeholder="Search products..."
//             className="w-full h-11 bg-slate-50 dark:bg-slate-900 rounded-2xl px-5 pr-12 text-sm outline-none border border-slate-200 dark:border-slate-800 focus:border-brand/50 transition-all"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button type="submit" className="absolute right-2 top-1.5 bg-brand text-white p-2 rounded-xl hover:bg-brand/90 transition-colors">
//             <Search className="size-4" />
//           </button>
//         </form>

//         {/* 5. Right Side (Dashboard Button Replaced Login) */}
//         <div className="flex items-center gap-2 md:gap-4">
//           <div className="hidden lg:block">{mounted && <ModeToggle />}</div>

//           <Link href="/cart" className="relative p-2.5 bg-slate-50 dark:bg-slate-900 rounded-xl text-slate-700 dark:text-slate-300 hover:text-brand transition-all">
//             <ShoppingCart className="size-5 md:size-6" />
//             {cartCount > 0 && (
//               <span className="absolute -top-1 -right-1 bg-brand text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-950 shadow-lg animate-in zoom-in">
//                 {cartCount}
//               </span>
//             )}
//           </Link>

//           {/* Desktop Dashboard Button - Replaced Login/Register */}
//           <div className="hidden lg:block ml-2">
//             <Link href="/dashboard">
//               <Button className="bg-brand hover:bg-brand/90 text-white rounded-xl px-6 font-black text-[10px] uppercase tracking-[0.2em] h-10 shadow-lg shadow-brand/20 active:scale-95 transition-all flex items-center gap-2">
//                 <LayoutDashboard size={16} />
//                 Dashboard
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* --- MOBILE BOTTOM NAVIGATION (Login Replaced by Dashboard) --- */}
//       <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-t dark:border-slate-800 flex items-center justify-around h-16 z-50 rounded-t-[2.5rem] shadow-[0_-5px_30px_rgba(0,0,0,0.08)]">
//         <Link href="/" className="flex flex-col items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-brand transition-all">
//           <Home className="size-5" />
//           <span className="text-[9px] font-black uppercase tracking-tighter">Home</span>
//         </Link>
//         <Link href="/shop" className="flex flex-col items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-brand transition-all">
//           <Grid className="size-5" />
//           <span className="text-[9px] font-black uppercase tracking-tighter">Shop</span>
//         </Link>

//         {/* Center Dashboard Action */}
//         <Link href="/dashboard" className="flex flex-col items-center justify-center -translate-y-4 bg-brand text-white w-12 h-12 rounded-2xl shadow-xl shadow-brand/40 border-4 border-white dark:border-slate-950 active:scale-90 transition-all">
//           <LayoutDashboard size={20} />
//         </Link>

//         <button onClick={() => setIsSearchOpen(true)} className="flex flex-col items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-brand transition-all">
//           <Search className="size-5" />
//           <span className="text-[9px] font-black uppercase tracking-tighter">Search</span>
//         </button>

//         {/* Dashboard Icon Replaces Login Icon */}
//         <Link href="/dashboard" className="flex flex-col items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-brand transition-all">
//           <div className="p-1 rounded-lg">
//             <User className="size-5" />
//           </div>
//           <span className="text-[9px] font-black uppercase tracking-tighter">Dashboard</span>
//         </Link>
//       </div>
//     </header>
//   );
// };

// export { Navbar };