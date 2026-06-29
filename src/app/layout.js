

// // app/layout.js
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import { Toaster } from "sonner";
// import LayoutContent from "./components/layout/LayoutContent";

// import ScrollToTop from "./components/layout/ScrollToTop";
// import PromotionalModalWrapper from "./components/PromotionalModalWrapper";
// import NewsletterPopup from "./components/NewsletterPopup";
// import UnifiedPopupManager from "./components/UnifiedPopupManager";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   // Base metadata
//   metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://smartgadget.com.bd'),
//   title: {
//     default: "Smart Gadget | Premium Gadget Store in Bangladesh - Smartphones, Laptops, Accessories & More",
//     template: "%s | Smart Gadget Bangladesh"
//   },
//   description: "Smart Gadget - Bangladesh's trusted online gadget store. Shop premium smartphones, laptops, smartwatches, headphones, gaming accessories & electronics. ✓COD ✓bKash/Nagad ✓Warranty ✓Best Prices",
  
//   // Keywords optimized for Bangladesh gadget market
//   keywords: [
//     // Primary keywords
//     "online gadget store bangladesh",
//     "smart gadget bd",
//     "gadget shop dhaka",
//     "best electronics store bangladesh",
    
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
    
//     // Laptops & Computers
//     "laptop price in bangladesh",
//     "gaming laptop bd",
//     "macbook price bangladesh",
//     "lenovo laptop price bd",
//     "hp laptop price bangladesh",
//     "asus laptop price bd",
//     "dell laptop price bangladesh",
//     "acer laptop price bd",
//     "desktop pc price bangladesh",
//     "monitor price bd",
    
//     // Smartwatches & Wearables
//     "smartwatch price in bangladesh",
//     "apple watch bd",
//     "samsung galaxy watch price bangladesh",
//     "fitness tracker bd",
//     "huawei watch price bangladesh",
//     "amazfit smartwatch bd",
//     "noise smartwatch price bangladesh",
    
//     // Audio & Headphones
//     "wireless headphones bangladesh",
//     "best earbuds price bd",
//     "sony headphones price bangladesh",
//     "boat earbuds bd",
//     "jbl speaker price bangladesh",
//     "airpods price bd",
//     "gaming headset bangladesh",
    
//     // Gaming Accessories
//     "gaming accessories bangladesh",
//     "gaming mouse price bd",
//     "mechanical keyboard price bangladesh",
//     "gaming controller bd",
//     "gaming chair price bangladesh",
//     "rgb gaming accessories bd",
    
//     // Smart Home
//     "smart home devices bangladesh",
//     "smart tv price bd",
//     "security camera price bangladesh",
//     "smart bulb price bd",
//     "robot vacuum cleaner bangladesh",
//     "smart speaker price bd",
    
//     // Accessories
//     "phone accessories bangladesh",
//     "phone cases bd",
//     "screen protector price bangladesh",
//     "power bank price bd",
//     "fast charger bangladesh",
//     "data cable price bd",
//     "bluetooth speaker price bangladesh",
    
//     // Shopping intent
//     "buy gadgets online bangladesh",
//     "best gadget price in bd",
//     "electronics shop dhaka",
//     "authentic gadgets bangladesh",
//     "gadget store near me",
//     "tech shop bd",
    
//     // Payment & Delivery
//     "cod electronics bangladesh",
//     "bkash payment gadget",
//     "nagad tech store",
//     "free delivery gadgets dhaka",
//     "warranty electronics bangladesh"
//   ],
  
//   authors: [{ name: "Smart Gadget", url: "https://smartgadget.com.bd" }],
//   creator: "Smart Gadget",
//   publisher: "Smart Gadget Bangladesh",
  
//   // Robots configuration
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       'max-video-preview': -1,
//       'max-image-preview': 'large',
//       'max-snippet': -1,
//     },
//   },
  
//   // Canonical URL
//   alternates: {
//     canonical: '/',
//     languages: {
//       'en-US': '/en',
//       'bn-BD': '/bn',
//     },
//   },
  
//   // Open Graph for social sharing (Facebook, WhatsApp, LinkedIn)
//   openGraph: {
//     title: "Smart Gadget - Bangladesh's Premium Gadget Store | Smartphones, Laptops, Accessories",
//     description: "✓COD Available ✓bKash/Nagad ✓Warranty ✓Best Prices. Shop smartphones, laptops, smartwatches, headphones, gaming accessories & more at Smart Gadget Bangladesh.",
//     url: process.env.NEXT_PUBLIC_BASE_URL || 'https://smartgadget.com.bd',
//     siteName: "Smart Gadget",
//     images: [
//       {
//         url: '/og-image-smartgadget.jpg',
//         width: 1200,
//         height: 630,
//         alt: 'Smart Gadget - Premium Gadget Store in Bangladesh | Shop Electronics Online',
//       },
//     ],
//     locale: 'en_BD',
//     alternateLocale: ['bn_BD'],
//     type: 'website',
//     emails: ['support@smartgadget.com.bd'],
//     phoneNumbers: ['+880123456789'],
//     countryName: 'Bangladesh',
//   },
  
//   // Twitter Card optimization
//   twitter: {
//     card: 'summary_large_image',
//     site: '@SmartGadgetBD',
//     siteId: 'smartgadget_bangladesh',
//     creator: '@SmartGadgetBD',
//     creatorId: 'smartgadget',
//     title: "Smart Gadget - Premium Gadget Store Bangladesh | Smartphones, Laptops & Electronics",
//     description: "Bangladesh's trusted premium gadget store. Shop authentic smartphones, laptops, wearables, accessories. COD & bKash/Nagad available. Warranty included.",
//     images: ['/twitter-card-smartgadget.jpg'],
//   },
  
//   // Verification (add your actual verification codes)
//   verification: {
//     google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
//     facebook: process.env.NEXT_PUBLIC_FACEBOOK_VERIFICATION || '',
//     me: 'smartgadget@contact',
//   },
  
//   // Additional metadata
//   category: "Premium Gadget & Electronics E-commerce",
//   classification: "Online Gadget Store | Electronics Bangladesh | Tech Products",
  
//   // App links for mobile
//   appleWebApp: {
//     title: "Smart Gadget",
//     statusBarStyle: "default",
//     capable: true,
//   },
  
//   // Format detection
//   formatDetection: {
//     email: true,
//     address: true,
//     telephone: true,
//   },
  
//   // Theme & Viewport
//   themeColor: [
//     { media: "(prefers-color-scheme: light)", color: "#2563EB" },
//     { media: "(prefers-color-scheme: dark)", color: "#1E40AF" },
//   ],
//   viewport: {
//     width: "device-width",
//     initialScale: 1,
//     maximumScale: 5,
//     userScalable: true,
//   },
  
//   // Manifest for PWA
//   manifest: "/manifest.json",
  
//   // Other important SEO tags
//   other: {
//     'geo.region': 'BD',
//     'geo.placename': 'Dhaka',
//     'geo.position': '23.8103;90.4125',
//     'ICBM': '23.8103, 90.4125',
//     'copyright': `Smart Gadget ${new Date().getFullYear()}`,
//     'distribution': 'global',
//     'rating': 'General',
//     'revisit-after': '1 day',
//     'language': 'English, Bengali',
//     'audience': 'Tech Enthusiasts, Professionals, Students, Gadget Buyers in Bangladesh',
//     'target_country': 'Bangladesh',
//     'price_range': '500-200000 BDT',
//     'currency': 'BDT',
//     'delivery': 'Cash on Delivery, Free Delivery over 3000 BDT',
//     'payment_methods': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
//     'warranty': 'Official Brand Warranty Available',
//   },
// };

// // Structured Data for better SEO (JSON-LD)
// export const generateJsonLd = () => {
//   return {
//     '@context': 'https://schema.org',
//     '@graph': [
//       {
//         '@type': 'Organization',
//         '@id': 'https://smartgadget.com.bd/#organization',
//         name: 'Smart Gadget Bangladesh',
//         url: process.env.NEXT_PUBLIC_BASE_URL || 'https://smartgadget.com.bd',
//         logo: 'https://smartgadget.com.bd/logo.png',
//         sameAs: [
//           'https://facebook.com/smartgadgetbd',
//           'https://instagram.com/smartgadget.bd',
//           'https://twitter.com/SmartGadgetBD',
//         ],
//         address: {
//           '@type': 'PostalAddress',
//           addressCountry: 'BD',
//           addressLocality: 'Dhaka',
//           addressRegion: 'Dhaka',
//           postalCode: '1212',
//           streetAddress: 'Gulshan Avenue',
//         },
//         contactPoint: {
//           '@type': 'ContactPoint',
//           telephone: '+880123456789',
//           contactType: 'customer service',
//           availableLanguage: ['English', 'Bengali'],
//         },
//       },
//       {
//         '@type': 'WebSite',
//         '@id': 'https://smartgadget.com.bd/#website',
//         url: process.env.NEXT_PUBLIC_BASE_URL || 'https://smartgadget.com.bd',
//         name: 'Smart Gadget - Premium Gadget E-commerce Bangladesh',
//         description: 'Best online gadget store in Bangladesh. Shop premium smartphones, laptops, smartwatches, headphones, gaming accessories & electronics.',
//         publisher: { '@id': 'https://smartgadget.com.bd/#organization' },
//         potentialAction: {
//           '@type': 'SearchAction',
//           target: {
//             '@type': 'EntryPoint',
//             urlTemplate: 'https://smartgadget.com.bd/search?q={search_term_string}',
//           },
//           'query-input': 'required name=search_term_string',
//         },
//         inLanguage: ['en', 'bn'],
//       },
//       {
//         '@type': 'Store',
//         '@id': 'https://smartgadget.com.bd/#store',
//         name: 'Smart Gadget Online Store',
//         url: process.env.NEXT_PUBLIC_BASE_URL || 'https://smartgadget.com.bd',
//         image: 'https://smartgadget.com.bd/store-image.jpg',
//         priceRange: '৳500 - ৳200000',
//         currenciesAccepted: 'BDT',
//         paymentAccepted: 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
//         openingHours: 'Mo-Su 10:00-22:00',
//         telephone: '+880123456789',
//         email: 'support@smartgadget.com.bd',
//         address: {
//           '@type': 'PostalAddress',
//           addressCountry: 'BD',
//           addressLocality: 'Dhaka',
//         },
//       },
//     ],
//   };
// };

// export default function RootLayout({ children }) {
//   // Generate JSON-LD structured data
//   const jsonLd = generateJsonLd();
  
//   return (
//     <html 
//       lang="en" 
//       data-scroll-behavior="smooth" 
//       data-theme="light" 
//       suppressHydrationWarning
//       style={{ colorScheme: 'light' }}
//       dir="ltr"
//     >
//       <head>
//         {/* Basic Meta Tags */}
//         <meta charSet="utf-8" />
//         <meta name="color-scheme" content="light only" />
//         <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        
//         {/* SEO Meta Tags */}
//         <meta name="description" content="Smart Gadget - Bangladesh's premium gadget store. Shop smartphones, laptops, smartwatches, headphones, gaming accessories & electronics. ✓COD ✓bKash/Nagad ✓Warranty ✓Best Prices" />
//         <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
//         <meta name="googlebot" content="index, follow" />
        
//         {/* Geo Tags for Bangladesh */}
//         <meta name="geo.region" content="BD" />
//         <meta name="geo.placename" content="Dhaka" />
//         <meta name="geo.position" content="23.8103;90.4125" />
//         <meta name="ICBM" content="23.8103, 90.4125" />
        
//         {/* Business Meta Tags */}
//         <meta name="business:contact_data:country_name" content="Bangladesh" />
//         <meta name="business:contact_data:website" content="https://smartgadget.com.bd" />
//         <meta name="business:contact_data:email" content="support@smartgadget.com.bd" />
        
//         {/* E-commerce Meta Tags */}
//         <meta name="og:availability" content="in stock" />
//         <meta name="product:retailer_item_id" content="global" />
//         <meta name="shopping:price_currency" content="BDT" />
//         <meta name="shopping:authorized_seller" content="true" />
//         <meta name="shopping:return_policy" content="7 days return" />
//         <meta name="shopping:warranty" content="Official brand warranty available" />
        
//         {/* Favicon & App Icons */}
//         <link rel="icon" href="/favicon.ico" sizes="any" />
//         <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
//         <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
//         <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
//         <link rel="manifest" href="/site.webmanifest" />
        
//         {/* Theme Color */}
//         <meta name="theme-color" content="#2563EB" />
//         <meta name="msapplication-TileColor" content="#2563EB" />
        
//         {/* Structured Data JSON-LD */}
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//         />
        
//         {/* Preconnect for Performance */}
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
//         {/* Canonical URL */}
//         <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL || 'https://smartgadget.com.bd'} />
        
//         {/* Alternate Language Versions */}
//         <link rel="alternate" hrefLang="en" href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartgadget.com.bd'}/en`} />
//         <link rel="alternate" hrefLang="bn" href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://smartgadget.com.bd'}/bn`} />
//         <link rel="alternate" hrefLang="x-default" href={process.env.NEXT_PUBLIC_BASE_URL || 'https://smartgadget.com.bd'} />
        
//         {/* CSS Variables for Theme */}
//         <style>{`
//           :root {
//             color-scheme: light only;
//             --primary-color: #2563EB;
//             --secondary-color: #3B82F6;
//             --accent-color: #8B5CF6;
//             --smartgadget-blue: #2563EB;
//             --smartgadget-indigo: #4F46E5;
//             --smartgadget-purple: #7C3AED;
//           }
//         `}</style>
//       </head>
//       <body 
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//         suppressHydrationWarning
//       >
//         {children}
        
//         {/* Toast Notifications */}
//         <Toaster 
//           position="top-right"
//           richColors
//           closeButton
//           expand={true}
//           duration={4000}
//           theme="light"
//           toastOptions={{
//             style: {
//               background: '#FFFFFF',
//               color: '#333333',
//               border: '1px solid #2563EB',
//               borderRadius: '12px',
//               marginTop: '40px',
//             },
//           }}
//         />
        
//         {/* UI Components */}
//         <ScrollToTop />
//         {/* Optional Popup Components - Uncomment when ready */}
//         {/* <PromotionalModalWrapper /> */}
//         {/* <NewsletterPopup /> */}
//         {/* <UnifiedPopupManager /> */}
//       </body>
//     </html>
//   );
// }


// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import LayoutContent from "./components/layout/LayoutContent";

import ScrollToTop from "./components/layout/ScrollToTop";
import PromotionalModalWrapper from "./components/PromotionalModalWrapper";
import NewsletterPopup from "./components/NewsletterPopup";
import UnifiedPopupManager from "./components/UnifiedPopupManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ============================================
// BEAUTY BUCKET - Premium Beauty & Cosmetics E-commerce (Bangladesh)
// Complete SEO Optimization for Beauty Market
// ============================================

export const metadata = {
  // Base metadata
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'),
  title: {
    default: "Beauty Bucket | Premium Beauty & Cosmetics Store in Bangladesh - Skincare, Makeup, Fragrances & More",
    template: "%s | Beauty Bucket Bangladesh"
  },
  description: "Beauty Bucket - Bangladesh's trusted premium beauty store. Shop authentic skincare, makeup, fragrances, hair care, body care & beauty accessories. ✓COD ✓bKash/Nagad ✓100% Authentic ✓Best Prices",
  
  // Keywords optimized for Bangladesh beauty market
  keywords: [
    // Primary keywords
    "online beauty store bangladesh",
    "beauty bucket bd",
    "cosmetics shop dhaka",
    "best beauty products bangladesh",
    
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
    
    // Makeup
    "makeup products bangladesh",
    "foundation price bd",
    "concealer price bangladesh",
    "lipstick price bd",
    "liquid lipstick bangladesh",
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
    
    // Fragrances
    "perfume price in bangladesh",
    "women perfume bd",
    "men perfume price bangladesh",
    "attar price bd",
    "fragrance oil bangladesh",
    "body mist price bd",
    "deodorant price bangladesh",
    "luxury perfume bd",
    
    // Body Care
    "body lotion price bangladesh",
    "body scrub bd",
    "body wash price bangladesh",
    "body butter bangladesh",
    "hand cream price bd",
    "foot cream bangladesh",
    
    // Natural & Organic
    "natural skincare bangladesh",
    "organic beauty products bd",
    "herbal cosmetics price bangladesh",
    "vegan beauty bd",
    "cruelty free makeup bangladesh",
    "clean beauty products bd",
    
    // Beauty Accessories
    "beauty accessories bangladesh",
    "makeup sponge bd",
    "beauty blender price bangladesh",
    "makeup bag bd",
    "mirror price bangladesh",
    "beauty tools bd",
    
    // Shopping intent
    "buy cosmetics online bangladesh",
    "best beauty price in bd",
    "beauty shop dhaka",
    "authentic makeup bangladesh",
    "beauty store near me",
    "cosmetics shop bd",
    
    // Payment & Delivery
    "cod beauty products bangladesh",
    "bkash payment cosmetics",
    "nagad beauty store",
    "free delivery beauty dhaka",
    "warranty cosmetics bangladesh",
    
    // Trending beauty
    "korean skincare bangladesh",
    "k beauty products bd",
    "vegan makeup bangladesh",
    "clean beauty bd",
    "cruelty free beauty products bangladesh",
    "sustainable beauty bd",
    "glow skincare bangladesh"
  ],
  
  authors: [{ name: "Beauty Bucket", url: "https://beautybucket.com.bd" }],
  creator: "Beauty Bucket",
  publisher: "Beauty Bucket Bangladesh",
  
  // Robots configuration
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Canonical URL
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'bn-BD': '/bn',
    },
  },
  
  // Open Graph for social sharing (Facebook, WhatsApp, LinkedIn)
  openGraph: {
    title: "Beauty Bucket - Bangladesh's Premium Beauty Store | Skincare, Makeup, Fragrances",
    description: "✓COD Available ✓bKash/Nagad ✓100% Authentic ✓Best Prices. Shop premium skincare, makeup, fragrances, hair care & beauty accessories at Beauty Bucket Bangladesh.",
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd',
    siteName: "Beauty Bucket",
    images: [
      {
        url: '/og-image-beautybucket.jpg',
        width: 1200,
        height: 630,
        alt: 'Beauty Bucket - Premium Beauty Store in Bangladesh | Shop Cosmetics Online',
      },
    ],
    locale: 'en_BD',
    alternateLocale: ['bn_BD'],
    type: 'website',
    emails: ['support@beautybucket.com'],
    phoneNumbers: ['+880123456789'],
    countryName: 'Bangladesh',
  },
  
  // Twitter Card optimization
  twitter: {
    card: 'summary_large_image',
    site: '@BeautyBucketBD',
    siteId: 'beautybucket_bangladesh',
    creator: '@BeautyBucketBD',
    creatorId: 'beautybucket',
    title: "Beauty Bucket - Premium Beauty Store Bangladesh | Skincare, Makeup & Cosmetics",
    description: "Bangladesh's trusted premium beauty store. Shop authentic skincare, makeup, fragrances, hair care. COD & bKash/Nagad available. 100% authentic products.",
    images: ['/twitter-card-beautybucket.jpg'],
  },
  
  // Verification (add your actual verification codes)
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_VERIFICATION || '',
    me: 'beautybucket@contact',
  },
  
  // Additional metadata
  category: "Premium Beauty & Cosmetics E-commerce",
  classification: "Online Beauty Store | Cosmetics Bangladesh | Skincare Products",
  
  // App links for mobile
  appleWebApp: {
    title: "Beauty Bucket",
    statusBarStyle: "default",
    capable: true,
  },
  
  // Format detection
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  
  // Theme & Viewport
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EE4275" },
    { media: "(prefers-color-scheme: dark)", color: "#CC3366" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  
  // Manifest for PWA
  manifest: "/manifest.json",
  
  // Other important SEO tags
  other: {
    'geo.region': 'BD',
    'geo.placename': 'Dhaka',
    'geo.position': '23.8103;90.4125',
    'ICBM': '23.8103, 90.4125',
    'copyright': `Beauty Bucket ${new Date().getFullYear()}`,
    'distribution': 'global',
    'rating': 'General',
    'revisit-after': '1 day',
    'language': 'English, Bengali',
    'audience': 'Beauty Enthusiasts, Skincare Lovers, Makeup Artists, Women in Bangladesh',
    'target_country': 'Bangladesh',
    'price_range': '200-20000 BDT',
    'currency': 'BDT',
    'delivery': 'Cash on Delivery, Free Delivery over 3000 BDT',
    'payment_methods': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
    'warranty': '100% Authentic Products Guaranteed',
  },
};

// Structured Data for better SEO (JSON-LD)
export const generateJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://beautybucket.com.bd/#organization',
        name: 'Beauty Bucket Bangladesh',
        url: process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd',
        logo: 'https://beautybucket.com.bd/logo.png',
        sameAs: [
          'https://facebook.com/beautybucketbd',
          'https://instagram.com/beautybucket.bd',
          'https://twitter.com/BeautyBucketBD',
          'https://pinterest.com/beautybucketbd',
        ],
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'BD',
          addressLocality: 'Dhaka',
          addressRegion: 'Dhaka',
          postalCode: '1212',
          streetAddress: 'Gulshan Avenue',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+880123456789',
          contactType: 'customer service',
          availableLanguage: ['English', 'Bengali'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://beautybucket.com.bd/#website',
        url: process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd',
        name: 'Beauty Bucket - Premium Beauty E-commerce Bangladesh',
        description: 'Best online beauty store in Bangladesh. Shop premium skincare, makeup, fragrances, hair care & beauty accessories.',
        publisher: { '@id': 'https://beautybucket.com.bd/#organization' },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://beautybucket.com.bd/search?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
        inLanguage: ['en', 'bn'],
      },
      {
        '@type': 'Store',
        '@id': 'https://beautybucket.com.bd/#store',
        name: 'Beauty Bucket Online Store',
        url: process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd',
        image: 'https://beautybucket.com.bd/store-image.jpg',
        priceRange: '৳200 - ৳20000',
        currenciesAccepted: 'BDT',
        paymentAccepted: 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
        openingHours: 'Mo-Su 10:00-22:00',
        telephone: '+880123456789',
        email: 'support@beautybucket.com',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'BD',
          addressLocality: 'Dhaka',
        },
        // Beauty-specific schema
        product: {
          '@type': 'Product',
          name: 'Premium Beauty Products',
          description: 'Authentic skincare, makeup, fragrances, hair care & body care products',
          brand: {
            '@type': 'Brand',
            name: 'Beauty Bucket',
          },
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'BDT',
            availability: 'https://schema.org/InStock',
          },
        },
      },
    ],
  };
};

export default function RootLayout({ children }) {
  // Generate JSON-LD structured data
  const jsonLd = generateJsonLd();
  
  return (
    <html 
      lang="en" 
      data-scroll-behavior="smooth" 
      data-theme="light" 
      suppressHydrationWarning
      style={{ colorScheme: 'light' }}
      dir="ltr"
    >
      <head>
        {/* Basic Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="color-scheme" content="light only" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        
        {/* SEO Meta Tags */}
        <meta name="description" content="Beauty Bucket - Bangladesh's premium beauty store. Shop skincare, makeup, fragrances, hair care & beauty accessories. ✓COD ✓bKash/Nagad ✓100% Authentic ✓Best Prices" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        
        {/* Geo Tags for Bangladesh */}
        <meta name="geo.region" content="BD" />
        <meta name="geo.placename" content="Dhaka" />
        <meta name="geo.position" content="23.8103;90.4125" />
        <meta name="ICBM" content="23.8103, 90.4125" />
        
        {/* Business Meta Tags */}
        <meta name="business:contact_data:country_name" content="Bangladesh" />
        <meta name="business:contact_data:website" content="https://beautybucket.com.bd" />
        <meta name="business:contact_data:email" content="support@beautybucket.com" />
        
        {/* Beauty E-commerce Meta Tags */}
        <meta name="og:availability" content="in stock" />
        <meta name="product:retailer_item_id" content="global" />
        <meta name="shopping:price_currency" content="BDT" />
        <meta name="shopping:authorized_seller" content="true" />
        <meta name="shopping:return_policy" content="7 days return" />
        <meta name="shopping:authenticity" content="100% authentic products" />
        
        {/* Favicon & App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme Color - Beauty Brand Color */}
        <meta name="theme-color" content="#EE4275" />
        <meta name="msapplication-TileColor" content="#EE4275" />
        
        {/* Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google Fonts - Playfair Display for Beauty Brand */}
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'} />
        
        {/* Alternate Language Versions */}
        <link rel="alternate" hrefLang="en" href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/en`} />
        <link rel="alternate" hrefLang="bn" href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/bn`} />
        <link rel="alternate" hrefLang="x-default" href={process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'} />
        
        {/* CSS Variables for Beauty Theme */}
        <style>{`
          :root {
            color-scheme: light only;
            --primary-color: #EE4275;
            --secondary-color: #FF6B9D;
            --accent-color: #FF8FAB;
            --beauty-pink: #EE4275;
            --beauty-rose: #FF6B9D;
            --beauty-blush: #FFD2DB;
            --beauty-dark: #2D1B2E;
            --beauty-light: #FFF5F6;
          }
        `}</style>
      </head>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        
        {/* Toast Notifications */}
        <Toaster 
          position="top-right"
          richColors
          closeButton
          expand={true}
          duration={4000}
          theme="light"
          toastOptions={{
            style: {
              background: '#FFFFFF',
              color: '#333333',
              border: '1px solid #EE4275',
              borderRadius: '12px',
              marginTop: '40px',
            },
          }}
        />
        
        {/* UI Components */}
        <ScrollToTop />
        {/* Optional Popup Components - Uncomment when ready */}
        {/* <PromotionalModalWrapper /> */}
        {/* <NewsletterPopup /> */}
        {/* <UnifiedPopupManager /> */}
      </body>
    </html>
  );
}