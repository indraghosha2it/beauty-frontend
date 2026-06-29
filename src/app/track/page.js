// app/track/page.js
import { Suspense } from 'react';
import TrackClient from './TrackClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Track page
function TrackLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#FFF5F6] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-[#EE4275]/20 rounded-full animate-pulse mb-4"></div>
          <div className="h-6 w-48 bg-[#EE4275]/20 rounded mx-auto animate-pulse"></div>
          <div className="h-4 w-64 bg-[#EE4275]/20 rounded mx-auto mt-3 animate-pulse"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Beauty Bucket Track Page SEO Metadata
export const metadata = {
  title: "Track Your Orders | Beauty Bucket - Premium Beauty Store Bangladesh",
  description: "Track your beauty and cosmetics orders easily with your phone number. Check order status, delivery updates, and tracking information for all your purchases from Beauty Bucket Bangladesh.",
  keywords: [
    // Primary tracking keywords
    "track order bangladesh",
    "beauty order tracking",
    "beauty bucket track",
    "order status check bd",
    "track my order",
    "cosmetics delivery tracking",
    "skincare order tracking",
    "makeup order status",
    
    // Delivery tracking
    "track order by phone",
    "bangladesh beauty delivery",
    "order tracking system",
    "delivery status bd",
    "beauty product tracking",
    "beauty bucket order status",
    "online cosmetics tracking",
    "premium beauty delivery",
    
    // Customer support
    "beauty order help",
    "tracking support bd",
    "delivery inquiry bangladesh",
    "order status support",
    "cosmetics shipping tracking",
    "beauty delivery tracking",
    
    // Local keywords
    "track order dhaka",
    "beauty tracking bangladesh",
    "order status bangladesh",
    "beauty bucket delivery",
    "cosmetics order tracking bd",
    "premium beauty tracking",
    
    // Beauty specific tracking
    "skincare order tracking",
    "makeup delivery status",
    "fragrance order tracking",
    "hair care order status",
    "body care delivery tracking",
    "beauty accessories tracking",
    
    // Customer service
    "beauty customer support",
    "order inquiry beauty",
    "delivery status beauty",
    "beauty product tracking bd"
  ],
  openGraph: {
    title: "Track Your Orders - Beauty Bucket | Beauty Product Delivery Tracking",
    description: "Enter your phone number to track all your beauty and cosmetics orders. Get real-time updates on delivery status and order progress from Beauty Bucket Bangladesh.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/track' || 'https://beautybucket.com.bd/track',
    siteName: "Beauty Bucket",
    images: [
      {
        url: '/track-og-beautybucket.jpg',
        width: 1200,
        height: 630,
        alt: 'Track Your Orders - Beauty Bucket Bangladesh',
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
    title: "Track Your Orders | Beauty Bucket",
    description: "Track all your beauty and cosmetics orders with your phone number. Check delivery status and order updates.",
    images: ['/track-twitter-beautybucket.jpg'],
  },
  alternates: {
    canonical: '/track',
    languages: {
      'en': '/track',
      'bn': '/bn/track',
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
  // Additional metadata
  other: {
    'application-name': 'Beauty Bucket Track',
    'msapplication-TileColor': '#EE4275',
    'theme-color': '#EE4275',
    'page-type': 'order-tracking',
    'user-action': 'track-orders',
    'service-type': 'order-tracking',
    'product-category': 'Skincare, Makeup, Fragrances, Hair Care, Body Care, Beauty Accessories',
    
    // Tracking service info
    'tracking-method': 'Phone Number',
    'tracking-status': 'Real-time Updates',
    'order-history': 'Available',
    'delivery-updates': 'Live Tracking',
    
    // Support information
    'customer-support-phone': '+880123456789',
    'customer-support-email': 'support@beautybucket.com',
    'support-hours': '10:00 AM - 10:00 PM (Everyday)',
    'beauty-consultation': 'Available via Support',
    
    // Business info
    'business-name': 'Beauty Bucket Bangladesh',
    'business-type': 'E-commerce Beauty & Cosmetics Store',
    'service-area': 'Nationwide Delivery',
    'payment-methods': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
    
    // Delivery info
    'delivery-time': '1-3 Business Days',
    'free-delivery': 'Orders over 3000 BDT',
    'cod-charge': 'Free for all orders',
    'delivery-partners': 'Multiple Delivery Partners',
    
    // Beauty specific
    'authenticity-guarantee': '100% Genuine Products',
    'quality-check': 'Pre-shipment Quality Check',
    'hygiene-guarantee': 'Hygienically Packaged',
    'satisfaction-guarantee': 'Money Back Guarantee',
  },
};

// Generate JSON-LD structured data
export const generateJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': process.env.NEXT_PUBLIC_BASE_URL + '/track' || 'https://beautybucket.com.bd/track',
    name: 'Track Your Orders - Beauty Bucket',
    description: 'Track your beauty and cosmetics orders easily with your phone number. Check order status, delivery updates, and tracking information.',
    url: process.env.NEXT_PUBLIC_BASE_URL + '/track' || 'https://beautybucket.com.bd/track',
    inLanguage: 'en',
    about: {
      '@type': 'Thing',
      name: 'Order Tracking',
      description: 'Track beauty products and cosmetics orders'
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Track Orders',
          item: process.env.NEXT_PUBLIC_BASE_URL + '/track' || 'https://beautybucket.com.bd/track'
        }
      ]
    },
    mainEntity: {
      '@type': 'WebApplication',
      name: 'Beauty Order Tracking System',
      description: 'Track beauty products and cosmetics orders by phone number',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires modern browser'
    }
  };
};

// Server component with Suspense
export default function TrackPage() {
  // Generate JSON-LD
  const jsonLd = generateJsonLd();
  
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<TrackLoading />}>
        <TrackClient />
      </Suspense>
    </>
  );
}