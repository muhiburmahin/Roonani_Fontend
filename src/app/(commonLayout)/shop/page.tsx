
import { getAllCategoriesAction } from "@/src/actions/category.action";
import { getAllProductsAction } from "@/src/actions/product.action";
import ShopPageContent from "@/src/components/modules/shop/ShopPage";

interface IShopPageProps {
    searchParams: Promise<{
        searchTerm?: string;
        category?: string;
        sort?: string;
        page?: string;
    }>;
}

export default async function ShopPage({ searchParams }: IShopPageProps) {
    const params = await searchParams;

    const [productResponse, categoryResponse] = await Promise.all([
        getAllProductsAction({
            searchTerm: params.searchTerm || "",
            category: params.category || "",
            sort: params.sort || "",
            page: params.page || "1",
        }),
        getAllCategoriesAction(),
    ]);
    const products = productResponse?.data?.data || productResponse?.data || [];
    const metaData = productResponse?.data?.meta || null;

    let categories = [];
    if (categoryResponse?.data && Array.isArray(categoryResponse.data)) {
        categories = categoryResponse.data;
    } else if (Array.isArray(categoryResponse)) {
        categories = categoryResponse;
    }

    return (
        <ShopPageContent
            products={products}
            categories={categories}
            meta={metaData}
        />
    );
}