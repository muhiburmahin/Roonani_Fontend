"use client";

import { useState, useRef, FormEvent, ChangeEvent } from "react";
import {
    ArrowLeft, X, ChevronDown, CheckCircle2,
    UploadCloud, Loader2, PackagePlus, AlignLeft,
    Layers, ImageIcon, Info, Plus, Banknote, Hash, Link as LinkIcon
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createProductAction } from "@/src/actions/product.action";
import { CreateProduct } from "@/src/types";
import { env } from "@/src/env";

interface IProps {
    categories: { id: string; name: string }[];
}

export default function AddProductForm({ categories }: IProps) {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [urlInput, setUrlInput] = useState("");

    const [productData, setProductData] = useState<CreateProduct>({
        name: "",
        description: "",
        basePrice: 0,
        stock: 0,
        categoryId: "",
        variantPrices: {},
        variantType: 'SIZE',
        sizes: [],
        images: []
    });

    const [vName, setVName] = useState("");
    const [vPrice, setVPrice] = useState("");

    const uploadToCloudinary = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        const cloudName = env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
        formData.append("upload_preset", uploadPreset);

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                { method: "POST", body: formData }
            );
            if (!response.ok) throw new Error("Upload failed");
            const data = await response.json();
            return data.secure_url;
        } catch (error) {
            console.error("Cloudinary Error:", error);
            return null;
        }
    };

    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        setLoading(true);
        const fileArray = Array.from(files);
        const uploadedUrls: string[] = [];

        try {
            for (const file of fileArray) {
                if (file.size > 5 * 1024 * 1024) {
                    toast.error(`${file.name} is too large. Max 5MB.`);
                    continue;
                }
                const url = await uploadToCloudinary(file);
                if (url) uploadedUrls.push(url);
            }
            if (uploadedUrls.length > 0) {
                setProductData(prev => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
                toast.success(`${uploadedUrls.length} images uploaded!`);
            }
        } finally {
            setLoading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const addImageViaLink = () => {
        const trimmedUrl = urlInput.trim();
        if (!trimmedUrl) return;
        if (!trimmedUrl.startsWith('http')) return toast.error("Invalid URL.");
        setProductData(prev => ({ ...prev, images: [...prev.images, trimmedUrl] }));
        setUrlInput("");
        toast.success("Link added!");
    };

    const removeImage = (index: number) => {
        setProductData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    };

    const addVariant = () => {
        if (vName && vPrice) {
            if (productData.sizes.includes(vName)) return toast.error("Exists!");
            setProductData(prev => ({
                ...prev,
                sizes: [...prev.sizes, vName],
                variantPrices: { ...prev.variantPrices, [vName]: Number(vPrice) }
            }));
            setVName("");
            setVPrice("");
        }
    };

    const removeVariant = (name: string) => {
        const updatedPrices = { ...productData.variantPrices };
        delete updatedPrices[name];
        setProductData(prev => ({
            ...prev,
            sizes: prev.sizes.filter(s => s !== name),
            variantPrices: updatedPrices
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!productData.categoryId) return toast.error("Select category");
        if (productData.images.length === 0) return toast.error("Add image");
        setLoading(true);
        try {
            const res = await createProductAction(productData);
            if (res.success) {
                toast.success("Created!");
                router.push("/admin-dashboard/product");
                router.refresh();
            } else toast.error(res.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDF8F9] p-4 md:p-10 font-sans text-slate-700">
            {/* Header */}
            <div className="max-w-4xl mx-auto mb-6 md:mb-8 flex flex-row justify-between items-center bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm border border-white">
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#E8939B] rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg">
                        <PackagePlus size={20} className="md:w-6 md:h-6" />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-lg md:text-xl font-black uppercase italic tracking-tighter leading-tight">New <span className="text-[#E8939B]">Product</span></h2>
                        <span className="text-[7px] md:text-[8px] font-bold text-slate-400 uppercase tracking-widest">Inventory</span>
                    </div>
                </div>
                <Link href="/admin-dashboard/product">
                    <button className="px-3 py-2 md:px-5 md:py-2.5 bg-slate-50 text-slate-400 rounded-lg md:rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center gap-1.5">
                        <ArrowLeft size={12} /> <span className="hidden xs:inline">Cancel</span>
                    </button>
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
                <div className="bg-white p-5 md:p-12 rounded-[2rem] md:rounded-[3.5rem] shadow-xl shadow-[#E8939B]/5 border border-white space-y-8 md:space-y-10">

                    {/* 1. Name */}
                    <div className="space-y-3">
                        <label className="text-[10px] md:text-[11px] font-black uppercase text-slate-400 ml-2 tracking-widest flex items-center gap-2">
                            <Info size={14} /> Product Name
                        </label>
                        <input required type="text" placeholder="Ex: Premium Matte Lipstick" className="w-full bg-[#FDF8F9] rounded-xl md:rounded-2xl py-4 md:py-5 px-6 md:px-8 font-bold text-slate-700 outline-none border-2 border-transparent focus:border-[#E8939B]/10 shadow-inner text-sm md:text-base"
                            onChange={(e) => setProductData({ ...productData, name: e.target.value })} />
                    </div>

                    {/* 2. Description */}
                    <div className="space-y-3">
                        <label className="text-[10px] md:text-[11px] font-black uppercase text-slate-400 ml-2 tracking-widest flex items-center gap-2">
                            <AlignLeft size={14} /> Description
                        </label>
                        <textarea required rows={4} placeholder="Describe product details..." className="w-full bg-[#FDF8F9] rounded-[1.5rem] md:rounded-[2rem] py-5 md:py-6 px-6 md:px-8 font-bold text-slate-700 outline-none border-2 border-transparent focus:border-[#E8939B]/10 shadow-inner resize-none text-sm md:text-base"
                            onChange={(e) => setProductData({ ...productData, description: e.target.value })} />
                    </div>

                    {/* 3. Category */}
                    <div className="space-y-3">
                        <label className="text-[10px] md:text-[11px] font-black uppercase text-slate-400 ml-2 tracking-widest flex items-center gap-2">
                            <Layers size={14} /> Category
                        </label>
                        <div className="relative">
                            <select required className="w-full bg-[#FDF8F9] rounded-xl md:rounded-2xl py-4 md:py-5 px-6 md:px-8 font-bold outline-none appearance-none cursor-pointer shadow-inner text-slate-600 text-sm md:text-base"
                                onChange={(e) => setProductData({ ...productData, categoryId: e.target.value })}>
                                <option value="">Select Category</option>
                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-[#E8939B] pointer-events-none" size={20} />
                        </div>
                    </div>

                    {/* 4. Price & 5. Stock */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                        <div className="space-y-3">
                            <label className="text-[10px] md:text-[11px] font-black uppercase text-slate-400 ml-2 tracking-widest flex items-center gap-2">
                                <Banknote size={14} /> Price (৳)
                            </label>
                            <input required type="number" min="0" placeholder="0.00" className="w-full bg-[#FDF8F9] rounded-xl md:rounded-2xl py-4 md:py-5 px-6 md:px-8 font-bold outline-none shadow-inner text-sm md:text-base"
                                onChange={(e) => setProductData({ ...productData, basePrice: Number(e.target.value) })} />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] md:text-[11px] font-black uppercase text-slate-400 ml-2 tracking-widest flex items-center gap-2">
                                <Hash size={14} /> Stock
                            </label>
                            <input required type="number" min="0" placeholder="Quantity" className="w-full bg-[#FDF8F9] rounded-xl md:rounded-2xl py-4 md:py-5 px-6 md:px-8 font-bold outline-none shadow-inner text-sm md:text-base"
                                onChange={(e) => setProductData({ ...productData, stock: Number(e.target.value) })} />
                        </div>
                    </div>

                    {/* 6. Variation Pricing */}
                    <div className="space-y-4 bg-[#FDF8F9] p-4 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-white shadow-inner">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-2">
                            <label className="text-[10px] md:text-[11px] font-black uppercase text-slate-400 italic">Variation Pricing</label>
                            <div className="flex bg-white p-1 rounded-xl shadow-sm w-full sm:w-auto">
                                {(['SIZE', 'VOLUME'] as const).map(t => (
                                    <button
                                        key={t}
                                        type="button"
                                        onClick={() => setProductData({ ...productData, variantType: t })}
                                        className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-[9px] font-black transition-all ${productData.variantType === t ? "bg-[#E8939B] text-white shadow-md" : "text-slate-400 hover:bg-slate-50"}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input type="text" placeholder={productData.variantType === 'SIZE' ? "XL / XXL" : "100ml"} value={vName} className="flex-1 bg-white rounded-xl py-3.5 md:py-4 px-6 font-bold outline-none text-sm shadow-sm" onChange={(e) => setVName(e.target.value)} />
                            <input type="number" placeholder="৳" value={vPrice} className="w-full sm:w-28 bg-white rounded-xl py-3.5 md:py-4 px-6 font-bold outline-none text-sm shadow-sm" onChange={(e) => setVPrice(e.target.value)} />
                            <button type="button" onClick={addVariant} className="bg-slate-900 text-white px-8 py-4 sm:py-0 rounded-xl font-black text-[10px] uppercase hover:bg-[#E8939B] transition-colors">Add</button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {productData.sizes.map(s => (
                                <div key={s} className="bg-white px-4 py-2.5 rounded-xl border border-slate-100 flex items-center gap-3 shadow-sm">
                                    <span className="font-black text-[9px] text-slate-600 uppercase italic">{s} — ৳{productData.variantPrices[s]}</span>
                                    <button type="button" onClick={() => removeVariant(s)} className="text-rose-400 hover:text-rose-600"><X size={14} /></button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 7. Photo Management */}
                    <div className="space-y-4">
                        <label className="text-[10px] md:text-[11px] font-black uppercase text-slate-400 ml-2 tracking-widest flex items-center gap-2">
                            <ImageIcon size={14} /> Photo Management ({productData.images.length})
                        </label>

                        <div className="flex flex-col sm:flex-row gap-2 mb-4">
                            <input
                                type="text"
                                placeholder="Paste Image URL"
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)}
                                className="flex-1 bg-[#FDF8F9] rounded-xl py-3.5 md:py-4 px-6 font-bold outline-none text-xs shadow-inner"
                            />
                            <button type="button" onClick={addImageViaLink} className="bg-[#E8939B] text-white py-3.5 sm:py-0 px-6 rounded-xl text-[10px] font-bold uppercase hover:bg-slate-900 transition-all flex items-center justify-center gap-2">
                                <LinkIcon size={14} /> Link
                            </button>
                        </div>

                        <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-5 gap-3 md:gap-4">
                            {productData.images.map((src, index) => (
                                <div key={index} className="relative aspect-square rounded-xl md:rounded-2xl overflow-hidden border border-slate-100 group shadow-md">
                                    <img src={src} className="w-full h-full object-cover" alt="preview" />
                                    <button type="button" onClick={() => removeImage(index)} className="absolute inset-0 bg-rose-500/80 text-white opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-[2px]">
                                        <X size={20} />
                                    </button>
                                </div>
                            ))}

                            <div
                                onClick={() => !loading && fileInputRef.current?.click()}
                                className={`aspect-square rounded-xl md:rounded-2xl border-2 border-dashed border-[#E8939B]/30 bg-[#FDF8F9]/50 flex flex-col items-center justify-center cursor-pointer hover:border-[#E8939B] transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {loading ? <Loader2 size={20} className="text-[#E8939B] animate-spin" /> : <UploadCloud size={20} className="text-[#E8939B]" />}
                                <span className="text-[7px] md:text-[8px] font-black uppercase text-[#E8939B] mt-1 text-center px-1">Upload</span>
                                <input type="file" multiple accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" disabled={loading} />
                            </div>
                        </div>
                    </div>

                    {/* 8. Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-6 md:py-8 bg-[#E8939B] text-white rounded-[1.5rem] md:rounded-[2.5rem] font-black text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.5em] shadow-2xl hover:bg-slate-900 transition-all flex items-center justify-center gap-3 md:gap-4 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                    >
                        {loading ? <Loader2 className="animate-spin w-5 h-5 md:w-6 md:h-6" /> : <CheckCircle2 size={22} className="md:w-6 md:h-6" />}
                        {loading ? "Creating..." : "Create Product"}
                    </button>
                </div>
            </form>
        </div>
    );
}