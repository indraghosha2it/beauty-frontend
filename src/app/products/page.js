

// import { Suspense } from 'react';
// import ProductsClient from './ProductsClient';

// // Loading fallback component for Smart Gadget products page
// function ProductsLoading() {
//   return (
//     <div className="min-h-screen bg-[#F0F7FF]">
//       <div className="container mx-auto px-4 max-w-7xl py-6 md:py-8">
//         {/* Loading Skeleton - Smart Gadget themed */}
//         <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
//           {[...Array(12)].map((_, index) => (
//             <div key={index} className="bg-white rounded-xl border-2 border-[#DBEAFE] overflow-hidden animate-pulse shadow-md">
//               <div className="h-32 sm:h-40 bg-gradient-to-br from-gray-100 to-gray-200"></div>
//               <div className="p-2 sm:p-3">
//                 <div className="h-3 sm:h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
//                 <div className="h-5 sm:h-6 bg-gray-200 rounded mb-2 w-1/2"></div>
//                 <div className="h-2 sm:h-3 bg-gray-200 rounded mb-2"></div>
//                 <div className="h-6 sm:h-8 bg-gray-200 rounded"></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // Smart Gadget - Premium Gadget E-commerce SEO Metadata
// export const metadata = {
//   title: "Shop All Premium Gadgets | Smartphones, Laptops, Accessories & More",
//   description: "Browse 500+ premium gadgets at Smart Gadget Bangladesh. ✓ Smartphones ✓ Laptops ✓ Smartwatches ✓ Headphones ✓ Gaming Accessories ✓ Smart Home Devices. Best prices with warranty, COD & bKash/Nagad payment.",
//   keywords: [
//     // Primary keywords
//     "buy gadgets online bangladesh",
//     "premium gadget shop dhaka",
//     "smart gadget products",
//     "best electronics for tech lovers bd",
    
//     // Smartphones
//     "smartphone price in bangladesh",
//     "best android phone bd",
//     "iphone price bangladesh",
//     "xiaomi mobile price bd",
//     "samsung galaxy price bangladesh",
//     "oneplus bangladesh",
//     "realme price bd",
//     "vivo mobile bangladesh",
//     "oppo phone price bd",
//     "nothing phone price bangladesh",
//     "google pixel bangladesh",
//     "tecno mobile price bd",
//     "infinix phone price bangladesh",
    
//     // Laptops & Computers
//     "laptop price in bangladesh",
//     "gaming laptop bd",
//     "macbook price bangladesh",
//     "lenovo laptop price bd",
//     "hp laptop price bangladesh",
//     "asus laptop price bd",
//     "dell laptop price bangladesh",
//     "acer laptop price bd",
//     "msi laptop bangladesh",
//     "desktop pc price bangladesh",
//     "monitor price bd",
//     "all in one pc bangladesh",
    
//     // Smartwatches & Wearables
//     "smartwatch price in bangladesh",
//     "apple watch bd",
//     "samsung galaxy watch price bangladesh",
//     "fitness tracker bd",
//     "huawei watch price bangladesh",
//     "amazfit smartwatch bd",
//     "noise smartwatch price bangladesh",
//     "garmin watch bangladesh",
//     "fitbit price bd",
    
//     // Audio & Headphones
//     "wireless headphones bangladesh",
//     "best earbuds price bd",
//     "sony headphones price bangladesh",
//     "boat earbuds bd",
//     "jbl speaker price bangladesh",
//     "airpods price bd",
//     "gaming headset bangladesh",
//     "noise cancelling headphones bd",
//     "tws earbuds bangladesh",
    
//     // Gaming Accessories
//     "gaming accessories bangladesh",
//     "gaming mouse price bd",
//     "mechanical keyboard price bangladesh",
//     "gaming controller bd",
//     "gaming chair price bangladesh",
//     "rgb gaming accessories bd",
//     "gaming monitor bangladesh",
//     "gaming pc price bd",
    
//     // Smart Home
//     "smart home devices bangladesh",
//     "smart tv price bd",
//     "security camera price bangladesh",
//     "smart bulb price bd",
//     "robot vacuum cleaner bangladesh",
//     "smart speaker price bd",
//     "smart door lock bangladesh",
//     "cctv camera price bd",
    
//     // Accessories
//     "phone accessories bangladesh",
//     "phone cases bd",
//     "screen protector price bangladesh",
//     "power bank price bd",
//     "fast charger bangladesh",
//     "data cable price bd",
//     "bluetooth speaker price bangladesh",
//     "wireless charger bd",
//     "car charger bangladesh",
//     "selfie stick price bd",
//     "tripod for phone bangladesh",
    
//     // Tablets
//     "tablet price in bangladesh",
//     "ipad price bd",
//     "samsung tab price bangladesh",
//     "xiaomi pad bd",
//     "kids tablet bangladesh",
    
//     // Shopping intent
//     "online gadget store bd",
//     "best gadget deals dhaka",
//     "premium electronics bangladesh",
//     "authentic gadgets bd",
//     "gift gadgets for tech lovers",
//     "tech accessories bangladesh",
//     "electronics shop near me",
    
//     // Payment & Delivery
//     "cod electronics bangladesh",
//     "bkash payment gadget",
//     "nagad tech store",
//     "free delivery gadgets dhaka",
//     "warranty electronics bangladesh",
//     "original products bd",
//     "trusted gadget store"
//   ],
//   openGraph: {
//     title: "Smart Gadget Products - Bangladesh's Premium Collection of Electronics & Gadgets",
//     description: "Shop smartphones, laptops, smartwatches, headphones, gaming accessories, smart home devices, and more. Official warranty, free delivery across Bangladesh. COD and bKash/Nagad accepted.",
//     url: process.env.NEXT_PUBLIC_BASE_URL + '/products' || 'https://smartgadget.com.bd/products',
//     siteName: "Smart Gadget",
//     images: [
//       {
//         url: '/products-og-smartgadget.jpg',
//         width: 1200,
//         height: 630,
//         alt: 'Smart Gadget Premium Collection - Smartphones, Laptops, Smartwatches, Audio & Accessories',
//       },
//     ],
//     type: 'website',
//     locale: 'en_BD',
//     alternateLocale: ['bn_BD'],
//   },
//   twitter: {
//     card: 'summary_large_image',
//     site: '@SmartGadgetBD',
//     creator: '@SmartGadgetBD',
//     title: "Smart Gadget Products - Premium Electronics & Gadgets in Bangladesh",
//     description: "Shop 500+ premium gadgets: smartphones, laptops, smartwatches, headphones, gaming accessories, smart home devices. Official warranty. COD & bKash/Nagad available.",
//     images: ['/products-twitter-smartgadget.jpg'],
//   },
//   alternates: {
//     canonical: '/products',
//     languages: {
//       'en': '/products',
//       'bn': '/bn/products',
//     },
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       'max-snippet': -1,
//       'max-image-preview': 'large',
//       'max-video-preview': -1,
//     },
//   },
//   // Additional metadata for better SEO
//   other: {
//     'application-name': 'Smart Gadget Products',
//     'msapplication-TileColor': '#2563EB',
//     'theme-color': '#2563EB',
//     'price-range': '500-200000 BDT',
//     'target-audience': 'Tech Enthusiasts, Professionals, Students, Gadget Lovers',
//     'product-category': 'Smartphones, Laptops, Wearables, Audio, Gaming, Smart Home',
//     'warranty': 'Official Brand Warranty Available',
//     'return-policy': '7 Days Return Policy',
//     'authenticity': '100% Original Products',
//     'product-types': 'Consumer Electronics, Mobile Phones, Computers, Accessories',
//     'condition': 'New, Official Imported',
//   },
// };

// // Server component with Suspense for Smart Gadget products page
// export default function ProductsPage() {
//   return (
//     <Suspense fallback={<ProductsLoading />}>
//       <ProductsClient />
//     </Suspense>
//   );
// }


// app/products/page.js
import { Suspense } from 'react';
import ProductsClient from './ProductsClient';

// Loading fallback component for Beauty Bucket products page
function ProductsLoading() {
  return (
    <div className="min-h-screen bg-[#FFF5F6]">
      <div className="container mx-auto px-4 max-w-7xl py-6 md:py-8">
        {/* Loading Skeleton - Beauty Bucket themed */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {[...Array(12)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl border border-[#FFD2DB]/30 overflow-hidden animate-pulse shadow-sm hover:shadow-md transition-shadow">
              <div className="h-32 sm:h-40 bg-gradient-to-br from-[#FFF5F6] to-[#FFD2DB]/30"></div>
              <div className="p-2 sm:p-3">
                <div className="h-3 sm:h-4 bg-[#FFD2DB]/50 rounded mb-2 w-3/4"></div>
                <div className="h-5 sm:h-6 bg-[#FFD2DB]/50 rounded mb-2 w-1/2"></div>
                <div className="h-2 sm:h-3 bg-[#FFD2DB]/30 rounded mb-2"></div>
                <div className="h-6 sm:h-8 bg-[#EE4275]/20 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Beauty Bucket - Premium Beauty & Cosmetics SEO Metadata
export const metadata = {
  title: "Shop All Premium Beauty Products | Skincare, Makeup, Fragrances & More",
  description: "Browse 500+ premium beauty products at Beauty Bucket Bangladesh. ✓ Skincare ✓ Makeup ✓ Fragrances ✓ Hair Care ✓ Body Care ✓ Beauty Accessories. 100% authentic with COD & bKash/Nagad payment.",
  keywords: [
    // Primary keywords
    "buy beauty products online bangladesh",
    "premium cosmetics shop dhaka",
    "beauty bucket products",
    "best beauty products for women bd",
    
    // Skincare
    "skincare products bangladesh",
    "best skincare routine bd",
    "face cream price bangladesh",
    "serum price bd",
    "vitamin c serum bangladesh",
    "hyaluronic acid serum bd",
    "sunscreen price bangladesh",
    "moisturizer price bd",
    "face wash price bangladesh",
    "toner price bd",
    "eye cream bangladesh",
    "retinol serum bd",
    "niacinamide serum price bangladesh",
    "face mask price bd",
    "sheet mask bangladesh",
    "korean skincare bangladesh",
    "k beauty products bd",
    "natural skincare bangladesh",
    "organic beauty products bd",
    "herbal cosmetics price bangladesh",
    "clean beauty products bd",
    "vegan skincare bangladesh",
    "cruelty free skincare bd",
    
    // Makeup
    "makeup products bangladesh",
    "foundation price bd",
    "concealer price bangladesh",
    "lipstick price bd",
    "liquid lipstick bangladesh",
    "matte lipstick price bd",
    "mascara price bd",
    "eyeshadow palette bangladesh",
    "kajal price bd",
    "eyeliner price bangladesh",
    "blush price bd",
    "highlighter bangladesh",
    "bronzer price bd",
    "setting spray bangladesh",
    "makeup brushes bd",
    "primer price bangladesh",
    "bb cream bangladesh",
    "cc cream price bd",
    "compact powder bangladesh",
    "loose powder price bd",
    "makeup kit bangladesh",
    "vegan makeup bd",
    "cruelty free makeup bangladesh",
    
    // Hair Care
    "hair care products bangladesh",
    "shampoo price bd",
    "conditioner price bangladesh",
    "hair serum bd",
    "hair oil price bangladesh",
    "hair mask bd",
    "hair spray price bangladesh",
    "dry shampoo bangladesh",
    "hair growth serum bd",
    "anti dandruff shampoo bangladesh",
    "hair color price bd",
    "hair straightener bangladesh",
    "hair dryer price bd",
    "curling iron bangladesh",
    
    // Fragrances
    "perfume price in bangladesh",
    "women perfume bd",
    "men perfume price bangladesh",
    "attar price bd",
    "fragrance oil bangladesh",
    "body mist price bd",
    "deodorant price bangladesh",
    "luxury perfume bd",
    "designer perfume bangladesh",
    "niche fragrance bd",
    "long lasting perfume bangladesh",
    
    // Body Care
    "body lotion price bangladesh",
    "body scrub bd",
    "body wash price bangladesh",
    "body butter bangladesh",
    "hand cream price bd",
    "foot cream bangladesh",
    "body oil bangladesh",
    "body mist price bd",
    "body spray bangladesh",
    
    // Face Care
    "face serum bangladesh",
    "face moisturizer bd",
    "face cleanser price bangladesh",
    "face toner bd",
    "face mist bangladesh",
    "face cream for glowing skin bd",
    "anti aging cream bangladesh",
    "acne treatment products bd",
    "pigmentation cream bangladesh",
    
    // Beauty Accessories
    "beauty accessories bangladesh",
    "makeup sponge bd",
    "beauty blender price bangladesh",
    "makeup bag bd",
    "mirror price bangladesh",
    "beauty tools bd",
    "makeup organizer bangladesh",
    "brush cleaner bangladesh",
    "beauty kit bangladesh",
    
    // Natural & Organic
    "organic skincare bangladesh",
    "natural makeup bd",
    "ayurvedic beauty products bangladesh",
    "plant based skincare bd",
    "chemical free cosmetics bangladesh",
    "sustainable beauty bd",
    "zero waste beauty bangladesh",
    
    // Men's Grooming
    "men grooming products bangladesh",
    "beard oil price bd",
    "shaving cream bangladesh",
    "aftershave balm bd",
    "men skincare bangladesh",
    "men perfume bd",
    
    // Shopping intent
    "online beauty store bd",
    "best cosmetic deals dhaka",
    "premium beauty bangladesh",
    "authentic makeup bd",
    "gift beauty products for her",
    "beauty accessories bangladesh",
    "cosmetics shop near me",
    "beauty store bd",
    
    // Payment & Delivery
    "cod beauty products bangladesh",
    "bkash payment cosmetics",
    "nagad beauty store",
    "free delivery beauty dhaka",
    "authentic products bd",
    "trusted beauty store",
    "100% original cosmetics bd"
  ],
  openGraph: {
    title: "Beauty Bucket Products - Bangladesh's Premium Collection of Beauty & Cosmetics",
    description: "Shop skincare, makeup, fragrances, hair care, body care, and beauty accessories. 100% authentic products with free delivery across Bangladesh. COD and bKash/Nagad accepted.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/products' || 'https://beautybucket.com.bd/products',
    siteName: "Beauty Bucket",
    images: [
      {
        url: '/products-og-beautybucket.jpg',
        width: 1200,
        height: 630,
        alt: 'Beauty Bucket Premium Collection - Skincare, Makeup, Fragrances, Hair Care & Accessories',
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
    title: "Beauty Bucket Products - Premium Beauty & Cosmetics in Bangladesh",
    description: "Shop 500+ premium beauty products: skincare, makeup, fragrances, hair care, body care. 100% authentic. COD & bKash/Nagad available.",
    images: ['/products-twitter-beautybucket.jpg'],
  },
  alternates: {
    canonical: '/products',
    languages: {
      'en': '/products',
      'bn': '/bn/products',
    },
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
  // Additional metadata for better SEO
  other: {
    'application-name': 'Beauty Bucket Products',
    'msapplication-TileColor': '#EE4275',
    'theme-color': '#EE4275',
    'price-range': '200-20000 BDT',
    'target-audience': 'Beauty Enthusiasts, Skincare Lovers, Makeup Artists, Women, Men',
    'product-category': 'Skincare, Makeup, Fragrances, Hair Care, Body Care, Accessories, Men Grooming',
    'authenticity': '100% Authentic Products',
    'return-policy': '7 Days Return Policy',
    'product-types': 'Cosmetics, Beauty Products, Personal Care, Skincare',
    'condition': 'New, Authentic Imported',
    'skin-types': 'All Skin Types - Dry, Oily, Combination, Sensitive, Normal',
    'ingredients': 'Natural, Organic, Vegan, Cruelty-Free, Chemical-Free Options Available',
  },
};

// Server component with Suspense for Beauty Bucket products page
export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsClient />
    </Suspense>
  );
}