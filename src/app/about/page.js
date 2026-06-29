// app/about/page.js
import { Suspense } from 'react';
import AboutClient from './AboutClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for About page
function AboutLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#EE4275] via-[#FF6B9D] to-[#FFD2DB] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-white/20 rounded-full animate-pulse mb-4"></div>
          <div className="h-6 w-48 bg-white/20 rounded mx-auto animate-pulse"></div>
          <div className="h-4 w-64 bg-white/20 rounded mx-auto mt-3 animate-pulse"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Beauty Bucket About Us Page SEO Metadata
export const metadata = {
  title: "About Beauty Bucket | Bangladesh's Trusted Premium Beauty Store",
  description: "Learn about Beauty Bucket - Bangladesh's premier online beauty store. We provide authentic skincare, makeup, fragrances, hair care, body care & beauty accessories with 100% genuine products and best prices.",
  keywords: [
    // About us specific
    "about beauty bucket",
    "premium beauty store bangladesh",
    "cosmetics company bd",
    "beauty bucket story",
    "beauty shop dhaka about",
    
    // Mission & values
    "beauty company mission",
    "cosmetics store values",
    "authentic beauty products bangladesh",
    "quality cosmetics bd",
    "100% genuine products",
    
    // Trust signals
    "why choose beauty bucket",
    "trusted cosmetics store bd",
    "verified products bd",
    "original beauty products bangladesh",
    "premium beauty store bd",
    
    // Team & milestones
    "beauty bucket team",
    "beauty company milestones",
    "cosmetics store journey bd",
    "beauty industry bangladesh",
    
    // Company info
    "online beauty store about",
    "cosmetics company bd",
    "beauty retailer bangladesh",
    "premium beauty store dhaka",
    "authorized beauty seller bd",
    
    // Social proof
    "happy customers beauty bd",
    "beauty enthusiast bangladesh",
    "beauty bucket reviews",
    "customer trust cosmetics bd",
    "satisfied buyers bd",
    "recommended beauty store bd",
    
    // Beauty categories
    "best skincare price bd",
    "original makeup warranty bd",
    "certified beauty seller bangladesh",
    "trusted cosmetics provider dhaka",
    "quality assurance beauty bd",
    "after sales service beauty",
    
    // Natural & Organic
    "organic beauty store bd",
    "natural cosmetics bangladesh",
    "vegan beauty products bd",
    "cruelty free cosmetics bangladesh",
    "clean beauty store bd",
    
    // Makeup specific
    "professional makeup store bd",
    "bridal cosmetics bangladesh",
    "makeup artist trusted store",
    
    // Women focus
    "beauty for women bd",
    "skincare for girls bangladesh",
    "cosmetics for ladies dhaka"
  ],
  openGraph: {
    title: "About Beauty Bucket - Our Story | Premium Beauty Store Bangladesh",
    description: "Discover the Beauty Bucket story. We're on a mission to provide authentic premium beauty products at the best prices across Bangladesh. 100% genuine products, quality assurance, and exceptional service.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/about' || 'https://beautybucket.com.bd/about',
    siteName: "Beauty Bucket",
    images: [
      {
        url: '/about-og-beautybucket.jpg',
        width: 1200,
        height: 630,
        alt: 'About Beauty Bucket - Bangladesh\'s Premium Beauty Store',
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
    title: "About Beauty Bucket | Premium Beauty Store Bangladesh",
    description: "Learn about our mission to provide authentic premium beauty products with 100% quality guarantee. Join thousands of satisfied beauty lovers!",
    images: ['/about-twitter-beautybucket.jpg'],
  },
  alternates: {
    canonical: '/about',
    languages: {
      'en': '/about',
      'bn': '/bn/about',
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
    'application-name': 'Beauty Bucket About',
    'msapplication-TileColor': '#EE4275',
    'theme-color': '#EE4275',
    'page-type': 'about-us',
    'business-type': 'ecommerce-beauty-store',
    'founded-year': '2020',
    'headquarters': 'Dhaka, Bangladesh',
    'service-area': 'Nationwide Delivery',
    'product-categories': 'Skincare, Makeup, Fragrances, Hair Care, Body Care, Beauty Accessories',
    'authenticity': '100% Genuine Products',
    'certifications': 'Authorized Beauty Seller, Certified Cosmetics Store',
    'employee-count': '30+',
    'customer-count': '5,000+ Satisfied Customers',
    'social-responsibility': 'Supporting Women & Beauty Entrepreneurs in Bangladesh',
    'contact-email': 'support@beautybucket.com',
    'contact-phone': '+880123456789',
    'business-hours': '10:00 AM - 10:00 PM (Everyday)',
    'payment-methods': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
    'brand-ambassador': 'Beauty Influencers, Makeup Artists, Skincare Experts',
    'beauty-standards': 'Premium, Natural, Organic, Vegan, Cruelty-Free Options',
  },
};

// Server component with Suspense
export default function AboutPage() {
  return (
    <Suspense fallback={<AboutLoading />}>
      <AboutClient />
    </Suspense>
  );
}