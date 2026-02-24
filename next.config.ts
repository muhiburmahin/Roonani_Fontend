/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
      { protocol: 'https', hostname: '**.googleusercontent.com' },
      { protocol: 'https', hostname: 'example.com' },
    ],
  },
  experimental: {
    dynamicIO: true,
    cacheLife: {
      page: {
        stale: 3600,    // কতক্ষণ ডাটা ফ্রেশ থাকবে (সেকেন্ডে)
        revalidate: 60,  // কতক্ষণ পর ব্যাকগ্রাউন্ডে চেক করবে
        expire: 86400,   // কতক্ষণ পর ক্যাশ ডিলিট হবে
      },
    },
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
};

export default nextConfig;