import { getAllProductsAction } from "@/src/actions/product.action";
import ProductManagement from "@/src/components/modules/admin/ProductManagement";

export default async function AdminProductPage() {
    const response = await getAllProductsAction({ limit: "50" });
    const products = response?.data?.data || [];

    return (
        <div className="space-y-8 p-4">
            <div className="flex flex-col gap-1 px-4">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-10 bg-brand rounded-full" />
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">
                        Product <span className="text-brand">Vault</span>
                    </h2>
                </div>
                <p className="text-slate-500 font-bold text-xs tracking-[0.2em] uppercase mt-1">
                    Inventory Control & Collection Management
                </p>
            </div>

            <ProductManagement initialProducts={products} categories={[]} />
        </div>
    );
}