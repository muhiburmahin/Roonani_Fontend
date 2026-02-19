
import Banner from '@/src/components/modules/home/Banner';
import ProductList from '../../components/modules/home/Product-list';
import WhyChooseUs from '@/src/components/modules/home/WhyChooseUs';

export default async function Home() {
  return (
    <main className="min-h-screen bg-[#0f172a]"> {/* space-y-16 বাদ দিন */}
      <Banner />
      <ProductList />
      <WhyChooseUs />
    </main>
  );
}