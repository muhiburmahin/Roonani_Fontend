"use client";

import { useState, useMemo } from "react";
import {
    Trash2,
    Plus,
    Search,
    Eye,
    Package,
    ChevronLeft,
    ChevronRight,
    LayoutGrid,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { deleteProductAction } from "@/src/actions/product.action";
import { Product } from "@/src/types/product.type";

interface Props {
    initialProducts: Product[];
    categories: any[];
}

interface ActionResponse {
    success: boolean;
    message?: string;
    data?: any;
}

export default function ProductManagement({ initialProducts }: Props) {
    /* ---------------- STATES ---------------- */
    // useEffect এর বদলে সরাসরি initialProducts ব্যবহার করছি
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;



    /* ---------------- FILTER ---------------- */
    const filteredProducts = useMemo(() => {
        const term = searchTerm.toLowerCase();
        return products.filter((p) =>
            p.name.toLowerCase().includes(term) ||
            p.category?.name?.toLowerCase().includes(term)
        );
    }, [products, searchTerm]);

    /* ---------------- PAGINATION ---------------- */
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    /* ---------------- DELETE ---------------- */
    const handleDeleteProduct = async (id: string) => {
        if (!confirm("Are you sure todelete product?")) return;

        try {
            const res = (await deleteProductAction(id)) as ActionResponse;

            if (res && (res.success || res.data)) {
                toast.success(res.message || "Deleted Successfully");
                setProducts((prev) => prev.filter((p) => p.id !== id));
                if (currentItems.length === 1 && currentPage > 1) setCurrentPage(currentPage - 1);
            } else {
                toast.error(res?.message || "মুছে ফেলা সম্ভব হয়নি");
            }
        } catch (error) {
            toast.error("সার্ভারে ত্রুটি দেখা দিয়েছে");
        }
    };

    return (
        <div className="space-y-6 pb-20 bg-slate-50/50 min-h-screen p-3 md:p-8">

            {/* -------- HEADER (Responsive) -------- */}
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-center bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-50">
                <div className="flex items-center gap-5 w-full">
                    <div className="p-4 bg-brand text-white rounded-2xl shadow-lg shadow-brand/30">
                        <LayoutGrid size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight italic">Inventory</h1>
                        <p className="text-[10px] md:text-xs text-brand font-black uppercase tracking-[0.2em]">Roohani Management</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                    <div className="relative flex-1 sm:w-72">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand" size={18} />
                        <input
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            placeholder="Search Products..."
                            className="w-full pl-11 pr-4 py-4 rounded-2xl bg-slate-100/80 border-2 border-transparent focus:bg-white focus:border-brand/30 outline-none font-bold text-slate-700 transition-all shadow-inner text-sm"
                        />
                    </div>

                    <Link href="/admin-dashboard/product/add-product" className="shrink-0">
                        <button className="w-full flex items-center justify-center gap-2 bg-brand text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-brand/20 hover:opacity-90 transition-all active:scale-95 text-xs uppercase tracking-tighter">
                            <Plus size={20} strokeWidth={3} /> Add Product
                        </button>
                    </Link>
                </div>
            </div>

            {/* -------- TABLE / MOBILE CARDS -------- */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                {/* Desktop View */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-900 text-white">
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] rounded-tl-[2.5rem]">Identity</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-center">Base Price</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em]">Variants</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-center">Stock</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-right rounded-tr-[2.5rem]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {currentItems.map((product) => (
                                <tr key={product.id} className="group hover:bg-brand/[0.01] transition-colors">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={product.images?.[0] || "/placeholder.png"}
                                                className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-100 group-hover:border-brand/40 transition-all"
                                                alt={product.name}
                                            />
                                            <div>
                                                <p className="font-black text-slate-800 text-sm leading-tight">{product.name}</p>
                                                <p className="text-[10px] text-brand font-black uppercase tracking-widest mt-1 bg-brand/5 inline-block px-2 rounded">{product.category?.name || "Roohani"}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6 text-center">
                                        <span className="px-4 py-2 bg-slate-100 text-slate-900 font-black rounded-xl text-xs italic">
                                            ৳{product.basePrice.toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                                            {Object.entries(product.variantPrices || {}).map(([size, price]) => (
                                                <span key={size} className="px-2 py-1 bg-brand/5 text-brand rounded-lg text-[9px] font-black border border-brand/10">
                                                    {size}: ৳{price}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-6 text-center">
                                        <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${product.stock < 5 ? "bg-red-100 text-red-500 animate-pulse" : "bg-emerald-100 text-emerald-600"}`}>
                                            {product.stock} Units
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex justify-end gap-3">
                                            <Link href={`/product/${product.id}`}>
                                                <button className="p-3 bg-brand/10 text-brand rounded-xl hover:bg-brand hover:text-white transition-all shadow-sm">
                                                    <Eye size={18} />
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteProduct(product.id)}
                                                className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile View (Cards) */}
                <div className="md:hidden p-4 space-y-4">
                    {currentItems.length > 0 ? (
                        currentItems.map((product) => (
                            <div key={product.id} className="bg-slate-50 rounded-3xl p-5 border border-slate-200">
                                <div className="flex gap-4 mb-4">
                                    <img src={product.images?.[0] || "/placeholder.png"} className="w-20 h-20 rounded-2xl object-cover shadow-sm border-2 border-white" alt={product.name} />
                                    <div className="flex-1">
                                        <p className="font-black text-slate-800 text-base uppercase leading-tight italic">{product.name}</p>
                                        <p className="text-[9px] text-brand font-black tracking-widest mt-1 uppercase">{product.category?.name}</p>
                                        <p className="mt-2 font-black text-brand text-lg">৳{product.basePrice}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center bg-white p-3 rounded-2xl border border-slate-100">
                                    <span className={`text-[10px] font-black uppercase ${product.stock < 5 ? "text-red-500" : "text-emerald-600"}`}>Stock: {product.stock} Units</span>
                                    <div className="flex gap-2">
                                        <Link href={`/product/${product.id}`} className="p-3 bg-brand text-white rounded-xl"><Eye size={16} /></Link>
                                        <button onClick={() => handleDeleteProduct(product.id)} className="p-3 bg-red-500 text-white rounded-xl"><Trash2 size={16} /></button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-20 text-center opacity-20">
                            <Package size={64} className="mx-auto text-brand" />
                            <p className="font-black mt-4">NO PRODUCTS FOUND</p>
                        </div>
                    )}
                </div>
            </div>

            {/* -------- PAGINATION (Responsive) -------- */}
            {totalPages > 1 && (
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-2">
                    <p className="text-[10px] text-brand font-black uppercase tracking-[0.2em] bg-white px-6 py-3 rounded-full shadow-sm border border-slate-100">
                        Page {currentPage} / {totalPages}
                    </p>
                    <div className="flex gap-2">
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="p-4 rounded-2xl bg-white border border-slate-200 disabled:opacity-20 text-brand shadow-sm"><ChevronLeft size={20} /></button>
                        {/* Page Numbers - Hidden on very small screens */}
                        <div className="hidden sm:flex gap-2">
                            {[...Array(totalPages)].map((_, i) => (
                                <button key={i} onClick={() => handlePageChange(i + 1)} className={`w-12 h-12 rounded-2xl font-black text-xs transition-all ${currentPage === i + 1 ? 'bg-brand text-white shadow-lg shadow-brand/30' : 'bg-white text-slate-400 hover:border-brand border border-slate-100'}`}>{i + 1}</button>
                            ))}
                        </div>
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-4 rounded-2xl bg-white border border-slate-200 disabled:opacity-20 text-brand shadow-sm"><ChevronRight size={20} /></button>
                    </div>
                </div>
            )}
        </div>
    );
}