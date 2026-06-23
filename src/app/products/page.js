
// import { Suspense } from 'react';
// import ProductsClient from './ProductsClient';

// // Loading fallback component for ToyMart products page
// function ProductsLoading() {
//   return (
//     <div className="min-h-screen bg-[#FFF9F0]">
//       <div className="container mx-auto px-4 max-w-7xl py-6 md:py-8">
//         {/* Loading Skeleton - ToyMart themed */}
//         <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
//           {[...Array(12)].map((_, index) => (
//             <div key={index} className="bg-white rounded-xl border-2 border-[#FFE0E6] overflow-hidden animate-pulse shadow-md">
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

// // ToyMart - Kids Toy E-commerce SEO Metadata
// export const metadata = {
//   title: "Shop All Kids Toys | Educational Toys, RC Cars & More ",
//   description: "Browse 1000+ toys for kids of all ages at ToyMart Bangladesh. ✓ Educational toys ✓ Montessori materials ✓ STEM kits ✓ RC cars ✓ Outdoor toys ✓ Dolls. Best prices with COD & bKash/Nagad payment.",
//   keywords: [
//     // Primary keywords
//     "buy toys online bangladesh",
//     "kids toys shop dhaka",
//     "toymart products",
//     "best toys for children bd",
    
//     // Educational Toys
//     "educational toys bangladesh",
//     "montessori toys price in bd",
//     "stem kits for kids",
//     "puzzle games for children",
//     "alphabet learning toys",
//     "math toys for kids",
//     "science experiment kits bangladesh",
    
//     // Baby Toys
//     "baby toys online bd",
//     "soft toys bangladesh",
//     "rattles for babies",
//     "musical toys for infants",
//     "bath toys set",
    
//     // Trending Toys
//     "rc cars price in bangladesh",
//     "drones for kids bd",
//     "led light up toys",
//     "dancing cactus toy bangladesh",
//     "fidget toys dhaka",
//     "anime action figures bd",
    
//     // Creative Toys
//     "lego blocks bangladesh",
//     "art and craft kits for kids",
//     "drawing board price bd",
//     "clay modeling set",
//     "diy craft kits",
    
//     // Outdoor Toys
//     "kids cycle bangladesh",
//     "scooter for children",
//     "football kit for kids",
//     "mini basketball hoop",
    
//     // Gender Specific
//     "doll house bangladesh",
//     "barbie doll price bd",
//     "pretend play makeup",
//     "kitchen play set",
//     "superhero toys bd",
//     "car toy collection",
//     "action figures for boys",
//     "robot toys bangladesh",
    
//     // Shopping intent
//     "online toy store bd",
//     "cheap toys online dhaka",
//     "kids toy prices",
//     "original branded toys bangladesh",
//     "toy gift for kids"
//   ],
//   openGraph: {
//     title: "ToyMart Products - Bangladesh's Largest Collection of Kids Toys",
//     description: "Shop educational toys, Montessori materials, STEM kits, RC cars, outdoor toys, dolls, and more. Free delivery across Bangladesh. COD and bKash/Nagad accepted.",
//     url: process.env.NEXT_PUBLIC_BASE_URL + '/products' || 'https://toymart.com.bd/products',
//     siteName: "ToyMart",
//     images: [
//       {
//         url: '/products-og-toymart.jpg',
//         width: 1200,
//         height: 630,
//         alt: 'ToyMart Kids Toy Collection - Educational Toys, RC Cars, Dolls & More',
//       },
//     ],
//     type: 'website',
//     locale: 'en_BD',
//     alternateLocale: ['bn_BD'],
//   },
//   twitter: {
//     card: 'summary_large_image',
//     site: '@ToyMartBD',
//     creator: '@ToyMartBD',
//     title: "ToyMart Products - Best Kids Toys in Bangladesh",
//     description: "Shop 1000+ toys: educational, Montessori, STEM, RC cars, outdoor, dolls. COD & bKash/Nagad available. Free delivery on orders over ৳2000.",
//     images: ['/products-twitter-toymart.jpg'],
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
//     'application-name': 'ToyMart Products',
//     'msapplication-TileColor': '#FF6B35',
//     'theme-color': '#FF6B35',
//     'price-range': '200-20000 BDT',
//     'target-audience': 'Parents, Children, Gift Buyers',
//     'product-category': 'Kids Toys, Educational Toys, Baby Products',
//   },
// };

// // Server component with Suspense for ToyMart products page
// export default function ProductsPage() {
//   return (
//     <Suspense fallback={<ProductsLoading />}>
//       <ProductsClient />
//     </Suspense>
//   );
// }

import { Suspense } from 'react';
import ProductsClient from './ProductsClient';

// Loading fallback component for Smart Gadget products page
function ProductsLoading() {
  return (
    <div className="min-h-screen bg-[#F0F7FF]">
      <div className="container mx-auto px-4 max-w-7xl py-6 md:py-8">
        {/* Loading Skeleton - Smart Gadget themed */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {[...Array(12)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl border-2 border-[#DBEAFE] overflow-hidden animate-pulse shadow-md">
              <div className="h-32 sm:h-40 bg-gradient-to-br from-gray-100 to-gray-200"></div>
              <div className="p-2 sm:p-3">
                <div className="h-3 sm:h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div className="h-5 sm:h-6 bg-gray-200 rounded mb-2 w-1/2"></div>
                <div className="h-2 sm:h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 sm:h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Smart Gadget - Premium Gadget E-commerce SEO Metadata
export const metadata = {
  title: "Shop All Premium Gadgets | Smartphones, Laptops, Accessories & More",
  description: "Browse 500+ premium gadgets at Smart Gadget Bangladesh. ✓ Smartphones ✓ Laptops ✓ Smartwatches ✓ Headphones ✓ Gaming Accessories ✓ Smart Home Devices. Best prices with warranty, COD & bKash/Nagad payment.",
  keywords: [
    // Primary keywords
    "buy gadgets online bangladesh",
    "premium gadget shop dhaka",
    "smart gadget products",
    "best electronics for tech lovers bd",
    
    // Smartphones
    "smartphone price in bangladesh",
    "best android phone bd",
    "iphone price bangladesh",
    "xiaomi mobile price bd",
    "samsung galaxy price bangladesh",
    "oneplus bangladesh",
    "realme price bd",
    "vivo mobile bangladesh",
    "oppo phone price bd",
    "nothing phone price bangladesh",
    "google pixel bangladesh",
    "tecno mobile price bd",
    "infinix phone price bangladesh",
    
    // Laptops & Computers
    "laptop price in bangladesh",
    "gaming laptop bd",
    "macbook price bangladesh",
    "lenovo laptop price bd",
    "hp laptop price bangladesh",
    "asus laptop price bd",
    "dell laptop price bangladesh",
    "acer laptop price bd",
    "msi laptop bangladesh",
    "desktop pc price bangladesh",
    "monitor price bd",
    "all in one pc bangladesh",
    
    // Smartwatches & Wearables
    "smartwatch price in bangladesh",
    "apple watch bd",
    "samsung galaxy watch price bangladesh",
    "fitness tracker bd",
    "huawei watch price bangladesh",
    "amazfit smartwatch bd",
    "noise smartwatch price bangladesh",
    "garmin watch bangladesh",
    "fitbit price bd",
    
    // Audio & Headphones
    "wireless headphones bangladesh",
    "best earbuds price bd",
    "sony headphones price bangladesh",
    "boat earbuds bd",
    "jbl speaker price bangladesh",
    "airpods price bd",
    "gaming headset bangladesh",
    "noise cancelling headphones bd",
    "tws earbuds bangladesh",
    
    // Gaming Accessories
    "gaming accessories bangladesh",
    "gaming mouse price bd",
    "mechanical keyboard price bangladesh",
    "gaming controller bd",
    "gaming chair price bangladesh",
    "rgb gaming accessories bd",
    "gaming monitor bangladesh",
    "gaming pc price bd",
    
    // Smart Home
    "smart home devices bangladesh",
    "smart tv price bd",
    "security camera price bangladesh",
    "smart bulb price bd",
    "robot vacuum cleaner bangladesh",
    "smart speaker price bd",
    "smart door lock bangladesh",
    "cctv camera price bd",
    
    // Accessories
    "phone accessories bangladesh",
    "phone cases bd",
    "screen protector price bangladesh",
    "power bank price bd",
    "fast charger bangladesh",
    "data cable price bd",
    "bluetooth speaker price bangladesh",
    "wireless charger bd",
    "car charger bangladesh",
    "selfie stick price bd",
    "tripod for phone bangladesh",
    
    // Tablets
    "tablet price in bangladesh",
    "ipad price bd",
    "samsung tab price bangladesh",
    "xiaomi pad bd",
    "kids tablet bangladesh",
    
    // Shopping intent
    "online gadget store bd",
    "best gadget deals dhaka",
    "premium electronics bangladesh",
    "authentic gadgets bd",
    "gift gadgets for tech lovers",
    "tech accessories bangladesh",
    "electronics shop near me",
    
    // Payment & Delivery
    "cod electronics bangladesh",
    "bkash payment gadget",
    "nagad tech store",
    "free delivery gadgets dhaka",
    "warranty electronics bangladesh",
    "original products bd",
    "trusted gadget store"
  ],
  openGraph: {
    title: "Smart Gadget Products - Bangladesh's Premium Collection of Electronics & Gadgets",
    description: "Shop smartphones, laptops, smartwatches, headphones, gaming accessories, smart home devices, and more. Official warranty, free delivery across Bangladesh. COD and bKash/Nagad accepted.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/products' || 'https://smartgadget.com.bd/products',
    siteName: "Smart Gadget",
    images: [
      {
        url: '/products-og-smartgadget.jpg',
        width: 1200,
        height: 630,
        alt: 'Smart Gadget Premium Collection - Smartphones, Laptops, Smartwatches, Audio & Accessories',
      },
    ],
    type: 'website',
    locale: 'en_BD',
    alternateLocale: ['bn_BD'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@SmartGadgetBD',
    creator: '@SmartGadgetBD',
    title: "Smart Gadget Products - Premium Electronics & Gadgets in Bangladesh",
    description: "Shop 500+ premium gadgets: smartphones, laptops, smartwatches, headphones, gaming accessories, smart home devices. Official warranty. COD & bKash/Nagad available.",
    images: ['/products-twitter-smartgadget.jpg'],
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
    'application-name': 'Smart Gadget Products',
    'msapplication-TileColor': '#2563EB',
    'theme-color': '#2563EB',
    'price-range': '500-200000 BDT',
    'target-audience': 'Tech Enthusiasts, Professionals, Students, Gadget Lovers',
    'product-category': 'Smartphones, Laptops, Wearables, Audio, Gaming, Smart Home',
    'warranty': 'Official Brand Warranty Available',
    'return-policy': '7 Days Return Policy',
    'authenticity': '100% Original Products',
    'product-types': 'Consumer Electronics, Mobile Phones, Computers, Accessories',
    'condition': 'New, Official Imported',
  },
};

// Server component with Suspense for Smart Gadget products page
export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsClient />
    </Suspense>
  );
}