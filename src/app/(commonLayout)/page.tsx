import { getAllCategoriesAction } from "@/src/actions/category.action";
import { getAllProductsAction } from "@/src/actions/product.action"; // সঠিক অ্যাকশন ইমপোর্ট করুন
import Banner from "@/src/components/modules/home/Banner";
import ProductList from "@/src/components/modules/home/Product-list";
import WhyChooseUs from "@/src/components/modules/home/WhyChooseUs";

export default async function HomePage({
    searchParams
}: {
    searchParams: Promise<{ category?: string }>
}) {
    const params = await searchParams;

    const [productResponse, categoryResponse] = await Promise.all([
        getAllProductsAction({
            category: params.category || "",
            limit: "12"
        }),
        getAllCategoriesAction(),
    ]);

    const products = productResponse?.data?.data || productResponse?.data || [];
    const categories = categoryResponse?.data || (Array.isArray(categoryResponse) ? categoryResponse : []);

    // console.log("--- HOME PAGE DEBUG ---");
    // console.log("Filtering by Category ID:", params.category || "None");
    // console.log("Products Count:", products.length);

    return (
        <main>
            <Banner />
            <ProductList products={products} categories={categories} />
            <WhyChooseUs />
        </main>
    );
}