
import AddProductForm from "@/src/components/modules/admin/AddProductForm";
import { getAllCategoriesAction } from '@/src/actions/category.action';

// Mark as dynamic to prevent build-time fetch failures
export const dynamic = 'force-dynamic';

export default async function Page() {
    // ১. ডাটা ফেচ করা
    const categoriesRes = await getAllCategoriesAction();


    const categoriesList = categoriesRes?.data?.data || categoriesRes?.data || [];

    return (
        <div className="p-8">
            <h1 className="text-3xl font-black uppercase italic mb-8">
                Add New Stock
            </h1>
            <AddProductForm categories={categoriesList} />
        </div>
    );
}