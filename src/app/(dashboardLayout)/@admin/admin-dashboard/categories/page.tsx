import AddCategory from "../../../../../components/modules/admin/category/AddCategory";
import CategoryTable from "../../../../../components/modules/admin/category/CategoryTable";
import { categoryService } from "../../../../../services/category.service";
import { Folder } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
    const res = await categoryService.getAllCategories();
    const categories = res?.data || (Array.isArray(res) ? res : []);

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* --- HEADER SECTION --- */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-black uppercase italic text-slate-800 tracking-tight">
                        Category Management
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">
                        Organize and manage your product categories.
                    </p>
                </div>
                <AddCategory />
            </div>

            {/* --- CONTENT SECTION --- */}
            {categories.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
                    <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                        <Folder className="w-10 h-10 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-700">No Categories Found</h3>
                    <p className="text-slate-400 text-sm max-w-xs text-center mt-2">
                        It seems there are no categories available. Please check your backend connection or add a new one.
                    </p>

                    <p className="mt-6 text-sm font-semibold text-pink-500">
                        Please add a new category to get started.
                    </p>
                </div>
            ) : (
                <div className="animate-in fade-in duration-500">
                    <CategoryTable categories={categories} />
                </div>
            )}
        </div>
    );
}