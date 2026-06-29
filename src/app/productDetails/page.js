import { Suspense } from 'react';
import ProductDetailsClient from './ProductDetailsClient';

// Loading fallback component for Beauty Bucket Product Details page
function ProductDetailsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F9] via-white to-[#FFF8F9]">
      <div className="container mx-auto px-3 sm:px-4 max-w-7xl py-4 sm:py-8 mt-16">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
            <div>
              <div className="bg-[#FFD2DB]/30 rounded-2xl h-64 sm:h-80 md:h-96"></div>
              <div className="flex gap-2 mt-3 sm:mt-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 bg-[#FFD2DB]/30 rounded-lg"></div>
                ))}
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="h-6 sm:h-8 bg-[#FFD2DB]/30 rounded w-3/4"></div>
              <div className="h-4 sm:h-6 bg-[#FFD2DB]/30 rounded w-1/2"></div>
              <div className="h-16 sm:h-24 bg-[#FFD2DB]/30 rounded"></div>
              <div className="h-10 sm:h-12 bg-[#FFD2DB]/30 rounded w-full"></div>
              <div className="h-16 sm:h-20 bg-[#FFD2DB]/30 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Beauty Bucket Product Details Page SEO Metadata
// Note: Since we're using static export with searchParams, 
// the dynamic metadata is handled client-side by MetadataUpdater component

export const metadata = {
  title: "Product Details | Premium Beauty Products | Beauty Bucket Bangladesh",
  description: "View detailed information about our premium beauty products. Skincare, makeup, haircare, fragrances, and more. 100% authentic products with dermatologist-approved formulations.",
  keywords: [
    "beauty product details",
    "product information",
    "skincare specifications",
    "beauty bucket product",
    "buy cosmetics online bd",
    "premium beauty details",
    "skincare ingredients",
    "makeup features",
    "haircare details",
    "fragrance specs",
    "beauty product info",
    "cosmetic ingredients",
    "beauty reviews bd",
    "product comparison bd",
    "best beauty price bd",
    "skincare routine bd",
    "makeup products bd",
    "haircare products bd",
    "beauty essentials bd",
    "glowing skin bd"
  ],
  openGraph: {
    title: "Product Details - Beauty Bucket | Premium Beauty Products Bangladesh",
    description: "View complete product information, ingredients, and benefits of premium beauty products. Skincare, makeup, haircare, fragrances with 100% authentic formulations.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/productDetails' || 'https://beautybucket.com/productDetails',
    siteName: "Beauty Bucket",
    images: [
      {
        url: '/product-details-og-beautybucket.jpg',
        width: 1200,
        height: 630,
        alt: 'Beauty Bucket Product Details - Premium Beauty Products',
      },
    ],
    type: 'website',
    locale: 'en_BD',
    alternateLocale: ['bn_BD'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@BeautyBucketBD',
    creator: '@BeautyBucketBD',
    title: "Product Details | Beauty Bucket Bangladesh",
    description: "View detailed product information, ingredients, and benefits of premium beauty products at Beauty Bucket. 100% authentic formulations.",
    images: ['/product-details-twitter-beautybucket.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: '/productDetails',
    languages: {
      'en': '/productDetails',
      'bn': '/bn/productDetails',
    },
  },
  // Additional metadata for better SEO
  other: {
    'application-name': 'Beauty Bucket Product Details',
    'msapplication-TileColor': '#EE4275',
    'theme-color': '#EE4275',
    'product-type': 'Beauty, Skincare, Cosmetics, Makeup, Haircare, Fragrance',
    'authenticity': '100% Genuine Products',
    'dermatologist-approved': 'Dermatologist Approved',
    'safety-tested': 'Safety Tested Products',
    'cruelty-free': 'Cruelty Free Beauty',
    'condition': 'New, Authentic Imported',
    'price-range': '200-50000 BDT',
    'target-audience': 'Beauty Enthusiasts, Skincare Lovers, Makeup Artists, Everyone',
    'product-category': 'Skincare, Makeup, Haircare, Fragrance, Beauty Tools, Wellness',
    'return-policy': '7 Days Return Policy',
    'shipping-details': 'Free Delivery across Bangladesh on orders above 2000 BDT',
    'payment-options': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
    'skin-types': 'All Skin Types, Sensitive Skin, Oily Skin, Dry Skin, Combination Skin',
    'ingredients': 'Natural Ingredients, Organic Formulations, Paraben Free, Sulfate Free',
    'benefits': 'Glowing Skin, Healthy Hair, Radiant Look, Youthful Appearance',
  },
};

// Main page component with Suspense for loading state
export default function ProductDetailsPage() {
  return (
    <Suspense fallback={<ProductDetailsLoading />}>
      <ProductDetailsClient />
    </Suspense>
  );
}