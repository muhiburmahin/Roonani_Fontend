"use client";

import { useEffect, useState } from "react";
import {
    Eye, Search, X, Truck, PackageCheck, Ban,
    ChevronLeft, ChevronRight, User, Phone, MapPin,
    Package, CheckCircle, ClipboardList, Trash2
} from "lucide-react";
import { toast } from "sonner";
import { getAllOrdersAction, updateOrderByIdAction, deleteOrderByIdAction } from "@/src/actions/order.action"; // নিশ্চিত করুন delete action টি আছে
import { Order, OrderStatus } from "@/src/types/order.type";

export default function AdminOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            const result = await getAllOrdersAction();
            if (result?.data) setOrders(result.data);
            setIsLoading(false);
        };
        fetchOrders();
    }, []);

    const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus) => {
        try {
            const result = await updateOrderByIdAction(orderId, { status: newStatus });
            if (result?.data) {
                toast.success(`Status updated to ${newStatus}`);
                setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
                if (selectedOrder?.id === orderId) setSelectedOrder({ ...selectedOrder, status: newStatus });
            }
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    // পার্মানেন্ট ডিলিট লজিক
    const handleDeleteOrder = async (orderId: string) => {
        if (!confirm("Are you sure? This will permanently delete the order from database!")) return;

        try {
            // আপনার action ফাইলে এই ফাংশনটি থাকতে হবে
            const result = await deleteOrderByIdAction(orderId);
            if (result) {
                toast.success("Order deleted permanently");
                setOrders(prev => prev.filter(o => o.id !== orderId));
                setSelectedOrder(null);
            }
        } catch (error) {
            toast.error("Error deleting order");
        }
    };

    const filteredOrders = orders.filter(order =>
        order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.phone?.includes(searchTerm)
    );

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const currentOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    if (isLoading) return (
        <div className="flex flex-col items-center justify-center p-20 space-y-4">
            <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loading Records...</p>
        </div>
    );

    return (
        <div className="p-2 sm:p-4 space-y-4 animate-in fade-in duration-500 max-w-[1400px] mx-auto">
            {/* --- Search & Total --- */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search ID, Name, Phone..."
                        className="w-full bg-slate-50 dark:bg-slate-950 rounded-xl py-2.5 pl-11 pr-4 outline-none text-sm border border-transparent focus:border-brand/20 transition-all"
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    />
                </div>
                <div className="w-full md:w-auto px-4 py-2 bg-brand/5 rounded-lg border border-brand/10 text-center">
                    <p className="text-[10px] font-black text-brand uppercase italic">Total: {filteredOrders.length} Orders</p>
                </div>
            </div>

            {/* --- Responsive Table --- */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto overflow-y-hidden">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                            <tr>
                                <th className="px-4 py-4 text-[10px] font-black uppercase text-slate-400">Order ID</th>
                                <th className="px-4 py-4 text-[10px] font-black uppercase text-slate-400">Customer</th>
                                <th className="px-4 py-4 text-[10px] font-black uppercase text-slate-400 text-center">Amount</th>
                                <th className="px-4 py-4 text-[10px] font-black uppercase text-slate-400 text-center">Status</th>
                                <th className="px-4 py-4 text-[10px] font-black uppercase text-slate-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                            {currentOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-800/30 transition-all group">
                                    <td className="px-4 py-4 font-mono text-[10px] text-slate-500">#{order.id?.slice(-6).toUpperCase()}</td>
                                    <td className="px-4 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-800 dark:text-slate-200 text-xs uppercase truncate max-w-[120px]">{order.customer?.name}</span>
                                            <span className="text-[10px] text-slate-400 italic">{order.phone}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-center font-black text-slate-900 dark:text-white italic text-sm">৳{order.totalAmount}</td>
                                    <td className="px-4 py-4 text-center">
                                        <StatusBadge status={order.status} />
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-brand rounded-lg transition-all"
                                            >
                                                <Eye size={16} />
                                            </button>

                                            {/* ডিলিট বাটন (শুধুমাত্র ফাইনাল স্ট্যাটাসে থাকলেই দৃশ্যমান করা নিরাপদ) */}
                                            {["DELIVERED", "CANCELLED"].includes(order.status) && (
                                                <button
                                                    onClick={() => handleDeleteOrder(order.id)}
                                                    className="p-2 bg-red-50 dark:bg-red-950/30 text-red-400 hover:text-red-600 rounded-lg transition-all"
                                                    title="Permanent Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* --- Pagination --- */}
                <div className="p-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 bg-slate-50/20">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Page {currentPage}/{totalPages}</span>
                    <div className="flex gap-2">
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="p-2 border rounded-lg disabled:opacity-30"><ChevronLeft size={14} /></button>
                        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="p-2 border rounded-lg disabled:opacity-30"><ChevronRight size={14} /></button>
                    </div>
                </div>
            </div>

            {/* --- Detail Drawer --- */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setSelectedOrder(null)} />
                    <div className="relative w-full max-w-[100%] sm:max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">

                        <div className="p-5 border-b sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md z-10 flex justify-between items-center">
                            <div>
                                <h3 className="font-black text-brand uppercase italic">Order Summary</h3>
                                <p className="text-[9px] text-slate-400">ID: {selectedOrder.id}</p>
                            </div>
                            <button onClick={() => setSelectedOrder(null)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full"><X size={18} /></button>
                        </div>

                        <div className="p-5 space-y-6">
                            {/* Customer Info Card */}
                            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700 space-y-3">
                                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest"><User size={12} /> Customer Info</div>
                                <div className="space-y-1">
                                    <p className="font-bold text-sm uppercase">{selectedOrder.customer?.name}</p>
                                    <p className="text-xs text-slate-500 flex items-center gap-1"><Phone size={12} /> {selectedOrder.phone}</p>
                                    <p className="text-xs text-slate-500 flex items-start gap-1 leading-relaxed"><MapPin size={12} className="shrink-0 mt-0.5" /> {selectedOrder.shippingAddress}</p>
                                </div>
                            </div>

                            {/* Cart Items */}
                            <div className="space-y-3">
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Package size={12} /> Items Ordered</div>
                                {selectedOrder.items?.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center p-3 border dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950">
                                        <div className="flex-1">
                                            <p className="text-[11px] font-black uppercase truncate max-w-[180px]">{item.product?.name}</p>
                                            <p className="text-[9px] text-slate-400 font-bold uppercase">{item.selectedSize} × {item.quantity}</p>
                                        </div>
                                        <p className="font-black text-xs italic ml-2">৳{item.price * item.quantity}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Action Area */}
                            <div className="pt-6 space-y-4">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-black text-slate-400 uppercase italic">Grand Total</span>
                                    <span className="text-3xl font-black italic tracking-tighter text-brand">৳{selectedOrder.totalAmount}</span>
                                </div>

                                <div className="grid grid-cols-1 gap-2">
                                    {selectedOrder.status === "PENDING" && (
                                        <button onClick={() => handleStatusUpdate(selectedOrder.id, "CONFIRMED" as OrderStatus)} className="w-full py-4 bg-slate-900 text-white rounded-xl font-black text-[11px] uppercase hover:bg-brand transition-all shadow-lg flex items-center justify-center gap-2">
                                            <CheckCircle size={16} /> Confirm Order
                                        </button>
                                    )}
                                    {selectedOrder.status === "CONFIRMED" && (
                                        <button onClick={() => handleStatusUpdate(selectedOrder.id, "SHIPPED" as OrderStatus)} className="w-full py-4 bg-blue-600 text-white rounded-xl font-black text-[11px] uppercase hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center gap-2">
                                            <Truck size={16} /> Start Shipping
                                        </button>
                                    )}
                                    {selectedOrder.status === "SHIPPED" && (
                                        <button onClick={() => handleStatusUpdate(selectedOrder.id, "DELIVERED" as OrderStatus)} className="w-full py-4 bg-emerald-600 text-white rounded-xl font-black text-[11px] uppercase hover:bg-emerald-700 transition-all shadow-lg flex items-center justify-center gap-2">
                                            <PackageCheck size={16} /> Complete Delivery
                                        </button>
                                    )}

                                    {/* Reject Button (Always allowed until delivered) */}
                                    {!["DELIVERED", "CANCELLED"].includes(selectedOrder.status) && (
                                        <button onClick={() => handleStatusUpdate(selectedOrder.id, "CANCELLED" as OrderStatus)} className="w-full py-3 text-red-500 font-black text-[10px] uppercase hover:bg-red-50 rounded-xl transition-all flex items-center justify-center gap-2">
                                            <Ban size={14} /> Reject Order
                                        </button>
                                    )}

                                    {/* Delete Button (For cleanup) */}
                                    {["DELIVERED", "CANCELLED"].includes(selectedOrder.status) && (
                                        <button
                                            onClick={() => handleDeleteOrder(selectedOrder.id)}
                                            className="w-full py-4 border-2 border-red-500 text-red-500 rounded-xl font-black text-[11px] uppercase hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
                                        >
                                            <Trash2 size={16} /> Delete from Database
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const config: Record<string, string> = {
        PENDING: "border-[#f8b12c] text-[#f8b12c] bg-[#f8b12c]/10",
        CONFIRMED: "border-[#1317fc] text-[#1317fc] bg-[#1317fc]/10",
        SHIPPED: "border-[#ff18ba] text-[#ff18ba] bg-[#ff18ba]/10",
        DELIVERED: "border-[#13dd6e] text-[#13dd6e] bg-[#7eff15]/10",
        CANCELLED: "border-[#f70606] text-[#f70606] bg-[#f70606]/10",
    };
    return (
        <span className={`px-2 py-1 rounded-full text-[8px] font-black border-2 ${config[status] || config.PENDING}`}>
            {status}
        </span>
    );
}