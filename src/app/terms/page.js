// import { Suspense } from 'react';
// import TermsClient from './TermsClient';

// // Import for loading state
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';

// // Loading fallback component for Terms page
// function TermsLoading() {
//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-br from-[#F0F7FF] to-[#DBEAFE] flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 mx-auto bg-[#2563EB]/20 rounded-full animate-pulse mb-4"></div>
//           <div className="h-6 w-48 bg-[#2563EB]/20 rounded mx-auto animate-pulse"></div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// // Smart Gadget Terms & Conditions Page SEO Metadata
// export const metadata = {
//   title: "Terms & Conditions - Smart Gadget | Legal Terms for Electronics Purchase",
//   description: "Read Smart Gadget's terms and conditions for online electronics purchases in Bangladesh. Learn about pricing, shipping, returns, warranty, and legal policies for premium gadgets.",
//   keywords: [
//     // Legal terms specific
//     "terms and conditions smart gadget",
//     "gadget store legal terms bd",
//     "electronics purchase terms",
//     "smart gadget policies",
//     "online electronics store terms bangladesh",
//     "legal terms electronics bd",
    
//     // Purchase terms
//     "gadget purchase agreement",
//     "tech products terms bd",
//     "smart gadget return policy",
//     "electronics warranty terms",
//     "refund policy gadgets",
//     "consumer electronics terms",
    
//     // Shipping terms
//     "gadget delivery terms",
//     "shipping policy electronics bd",
//     "cod terms gadgets",
//     "smart gadget shipping policy",
//     "electronics delivery policy bd",
//     "express delivery terms",
    
//     // Payment terms
//     "gadget payment terms",
//     "bkash payment policy",
//     "nagad payment terms",
//     "electronics pricing policy",
//     "emi payment terms bd",
//     "credit card payment policy",
    
//     // Warranty & Service
//     "electronics warranty policy",
//     "gadget repair policy",
//     "warranty claim terms bd",
//     "after sales service policy",
//     "tech support terms",
//     "official warranty terms",
    
//     // Legal compliance
//     "electronics safety compliance",
//     "consumer rights electronics bd",
//     "product liability gadgets",
//     "smart gadget legal information",
//     "import compliance bd",
//     "electronics standards bd",
    
//     // Account terms
//     "user account terms",
//     "customer agreement electronics",
//     "smart gadget account policy",
//     "tech buyer agreement",
    
//     // Privacy & Security
//     "privacy policy gadgets",
//     "data protection electronics bd",
//     "secure transaction terms",
//     "customer data policy bd",
    
//     // Additional
//     "consumer protection bd",
//     "digital commerce terms",
//     "online purchase policy bd",
//     "gadget buyer protection",
//     "electronics transaction terms"
//   ],
//   openGraph: {
//     title: "Terms & Conditions - Smart Gadget | Legal Information for Electronics Purchases",
//     description: "Review Smart Gadget's complete terms and conditions. Understand our policies on pricing, shipping, returns, warranty, privacy, and customer responsibilities for premium gadgets.",
//     url: process.env.NEXT_PUBLIC_BASE_URL + '/terms' || 'https://smartgadget.com.bd/terms',
//     siteName: "Smart Gadget",
//     images: [
//       {
//         url: '/terms-og-smartgadget.jpg',
//         width: 1200,
//         height: 630,
//         alt: 'Smart Gadget Terms & Conditions - Legal Information for Electronics',
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
//     title: "Terms & Conditions | Smart Gadget",
//     description: "Read Smart Gadget's terms for online electronics purchases in Bangladesh. Pricing, shipping, returns, warranty, and privacy policies.",
//     images: ['/terms-twitter-smartgadget.jpg'],
//   },
//   alternates: {
//     canonical: '/terms',
//     languages: {
//       'en': '/terms',
//       'bn': '/bn/terms',
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
//   // Terms page specific metadata
//   other: {
//     'application-name': 'Smart Gadget Terms',
//     'msapplication-TileColor': '#2563EB',
//     'theme-color': '#2563EB',
//     'page-type': 'legal-terms',
//     'last-updated': '2024-01-01',
//     'jurisdiction': 'Bangladesh',
//     'legal-entity': 'Smart Gadget BD',
//     'company-registration': 'Registered in Bangladesh',
//     'tax-id': 'TIN: 123456789',
    
//     // Policy details
//     'return-policy-period': '7 Days',
//     'warranty-policy': 'Official Brand Warranty',
//     'refund-policy': 'Within 7-14 business days',
//     'replacement-policy': 'Within 7 days of delivery',
//     'repair-policy': 'Warranty terms apply',
    
//     // Consumer rights
//     'consumer-protection': 'Bangladesh Consumer Rights Act',
//     'dispute-resolution': 'Mediation and Arbitration',
//     'governing-law': 'Laws of Bangladesh',
    
//     // Shipping policy
//     'shipping-policy': 'Nationwide Delivery',
//     'delivery-time': '1-3 business days',
//     'free-delivery': 'Orders over 3000 BDT',
//     'shipping-charges': 'As per delivery location',
//     'cod-charge': 'Free for all orders',
    
//     // Payment policy
//     'accepted-payments': 'COD, bKash, Nagad, Rocket, Credit Card',
//     'payment-security': '256-bit SSL Encrypted',
//     'refund-processing': '5-7 business days',
    
//     // Warranty details
//     'warranty-type': 'Official Manufacturer Warranty',
//     'warranty-period': 'Brand-dependent (6-24 months)',
//     'warranty-service': 'Service Center Support',
//     'free-service': 'Within warranty period',
    
//     // Data protection
//     'privacy-policy': 'Data Protection Compliant',
//     'data-collection': 'Order & Delivery Information Only',
//     'data-sharing': 'Not shared with third parties',
//     'data-security': 'Encrypted Storage',
    
//     // Additional
//     'business-hours': '10:00 AM - 10:00 PM (Everyday)',
//     'customer-support': 'support@smartgadget.com.bd',
//     'emergency-contact': '+880123456789',
//     'terms-version': 'v2.0',
//     'effective-date': 'January 1, 2024',
//   },
// };

// // Server component with Suspense
// export default function TermsPage() {
//   return (
//     <Suspense fallback={<TermsLoading />}>
//       <TermsClient />
//     </Suspense>
//   );
// }


// app/terms/page.js
import { Suspense } from 'react';
import TermsClient from './TermsClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Terms page
function TermsLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#FFF5F6] via-[#FFD2DB] to-[#FFE8ED] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-[#EE4275]/20 rounded-full animate-pulse mb-4"></div>
          <div className="h-6 w-48 bg-[#EE4275]/20 rounded mx-auto animate-pulse"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Beauty Bucket Terms & Conditions Page SEO Metadata
export const metadata = {
  title: "Terms & Conditions - Beauty Bucket | Legal Terms for Beauty Product Purchase",
  description: "Read Beauty Bucket's terms and conditions for online beauty and cosmetics purchases in Bangladesh. Learn about pricing, shipping, returns, authenticity, and legal policies for premium beauty products.",
  keywords: [
    // Legal terms specific
    "terms and conditions beauty bucket",
    "cosmetics store legal terms bd",
    "beauty product purchase terms",
    "beauty bucket policies",
    "online cosmetics store terms bangladesh",
    "legal terms beauty bd",
    
    // Purchase terms
    "beauty purchase agreement",
    "skincare products terms bd",
    "beauty bucket return policy",
    "cosmetics warranty terms",
    "refund policy beauty products",
    "premium beauty terms",
    
    // Shipping terms
    "beauty delivery terms",
    "shipping policy cosmetics bd",
    "cod terms beauty products",
    "beauty bucket shipping policy",
    "cosmetics delivery policy bd",
    "express delivery terms beauty",
    
    // Payment terms
    "beauty payment terms",
    "bkash payment policy cosmetics",
    "nagad payment terms beauty",
    "cosmetics pricing policy",
    "emi payment terms bd",
    "credit card payment policy beauty",
    
    // Authenticity & Quality
    "beauty authenticity policy",
    "100% genuine products policy",
    "quality assurance cosmetics bd",
    "authentic beauty products terms",
    "original cosmetics guarantee",
    "premium quality policy",
    
    // Returns & Refunds
    "beauty return policy",
    "cosmetics refund policy bd",
    "skin care return terms",
    "makeup exchange policy",
    "beauty product replacement",
    "satisfaction guarantee beauty",
    
    // Legal compliance
    "cosmetics safety compliance bd",
    "consumer rights beauty bd",
    "product liability cosmetics",
    "beauty bucket legal information",
    "import compliance beauty bd",
    "cosmetics standards bd",
    "bd cosmetics regulations",
    "beauty product safety regulations",
    
    // Account terms
    "user account terms beauty",
    "customer agreement cosmetics",
    "beauty bucket account policy",
    "beauty buyer agreement",
    
    // Privacy & Security
    "privacy policy cosmetics",
    "data protection beauty bd",
    "secure transaction terms beauty",
    "customer data policy beauty",
    
    // Skin & Health
    "skin safety policy bd",
    "cosmetics allergy terms",
    "beauty product testing policy",
    "hypoallergenic products policy",
    "dermatologically tested terms",
    
    // Natural & Organic
    "organic beauty terms bd",
    "natural cosmetics policy",
    "vegan beauty terms",
    "cruelty free policy",
    "clean beauty standards",
    
    // Additional
    "consumer protection beauty bd",
    "digital commerce terms cosmetics",
    "online purchase policy beauty",
    "beauty buyer protection",
    "cosmetics transaction terms",
    "beauty bucket terms update"
  ],
  openGraph: {
    title: "Terms & Conditions - Beauty Bucket | Legal Information for Beauty Purchases",
    description: "Review Beauty Bucket's complete terms and conditions. Understand our policies on pricing, shipping, returns, authenticity, warranty, privacy, and customer responsibilities for premium beauty products.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/terms' || 'https://beautybucket.com.bd/terms',
    siteName: "Beauty Bucket",
    images: [
      {
        url: '/terms-og-beautybucket.jpg',
        width: 1200,
        height: 630,
        alt: 'Beauty Bucket Terms & Conditions - Legal Information for Beauty Products',
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
    title: "Terms & Conditions | Beauty Bucket",
    description: "Read Beauty Bucket's terms for online beauty product purchases in Bangladesh. Pricing, shipping, returns, authenticity, warranty, and privacy policies.",
    images: ['/terms-twitter-beautybucket.jpg'],
  },
  alternates: {
    canonical: '/terms',
    languages: {
      'en': '/terms',
      'bn': '/bn/terms',
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
  // Terms page specific metadata
  other: {
    'application-name': 'Beauty Bucket Terms',
    'msapplication-TileColor': '#EE4275',
    'theme-color': '#EE4275',
    'page-type': 'legal-terms',
    'last-updated': '2024-01-01',
    'jurisdiction': 'Bangladesh',
    'legal-entity': 'Beauty Bucket BD',
    'company-registration': 'Registered in Bangladesh',
    'tax-id': 'TIN: 123456789',
    
    // Policy details
    'return-policy-period': '7 Days (Unopened Products)',
    'warranty-policy': '100% Authentic Product Guarantee',
    'refund-policy': 'Within 7-14 business days',
    'replacement-policy': 'Within 7 days of delivery',
    'repair-policy': 'Not Applicable (Beauty Products)',
    'satisfaction-guarantee': 'Money Back Guarantee',
    
    // Authenticity policy
    'authenticity-guarantee': '100% Genuine Products',
    'counterfeit-policy': 'Zero Tolerance',
    'brand-authorization': 'Authorized Retailer',
    'quality-check': 'Pre-shipment Quality Check',
    
    // Consumer rights
    'consumer-protection': 'Bangladesh Consumer Rights Act',
    'dispute-resolution': 'Mediation and Arbitration',
    'governing-law': 'Laws of Bangladesh',
    'product-safety': 'Compliant with BD Cosmetics Regulations',
    
    // Shipping policy
    'shipping-policy': 'Nationwide Delivery',
    'delivery-time': '1-3 business days',
    'free-delivery': 'Orders over 3000 BDT',
    'shipping-charges': 'As per delivery location',
    'cod-charge': 'Free for all orders',
    'handling-time': '24-48 hours',
    
    // Payment policy
    'accepted-payments': 'COD, bKash, Nagad, Rocket, Credit Card',
    'payment-security': '256-bit SSL Encrypted',
    'refund-processing': '5-7 business days',
    
    // Beauty product terms
    'skin-safety': 'Dermatologically Tested',
    'allergy-policy': 'Patch Test Recommended',
    'expiry-policy': 'Minimum 6 months expiry',
    'storage-conditions': 'Store as per product instructions',
    'hygiene-policy': 'Hygienically Packaged',
    
    // Natural/Organic terms
    'organic-certification': 'Certified Organic Options',
    'vegan-policy': 'Cruelty-Free & Vegan Options',
    'natural-ingredients': 'Natural Ingredients Policy',
    'chemical-free': 'Chemical-Free Options Available',
    
    // Data protection
    'privacy-policy': 'Data Protection Compliant',
    'data-collection': 'Order & Delivery Information Only',
    'data-sharing': 'Not shared with third parties',
    'data-security': 'Encrypted Storage',
    'gdpr-compliance': 'GDPR Compliant',
    
    // Additional
    'business-hours': '10:00 AM - 10:00 PM (Everyday)',
    'customer-support': 'support@beautybucket.com',
    'emergency-contact': '+880123456789',
    'terms-version': 'v2.0',
    'effective-date': 'January 1, 2024',
  },
};

// Server component with Suspense
export default function TermsPage() {
  return (
    <Suspense fallback={<TermsLoading />}>
      <TermsClient />
    </Suspense>
  );
}