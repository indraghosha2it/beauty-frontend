// app/contact/page.js
import { Suspense } from 'react';
import ContactClient from './ContactClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Contact page
function ContactLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#FFF5F6] via-[#FFD2DB] to-[#FFE8ED] flex items-center justify-center">
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

// Beauty Bucket Contact Us Page SEO Metadata
export const metadata = {
  title: "Contact Us | Get in Touch with Beauty Bucket - Premium Beauty Store Bangladesh",
  description: "Contact Beauty Bucket customer support for questions about skincare, makeup, fragrances, orders, delivery, or returns. Call, email, or visit us in Dhaka. We're here to help!",
  keywords: [
    // Contact specific
    "contact beauty bucket",
    "beauty store customer care bd",
    "cosmetics support bangladesh",
    "beauty bucket helpline",
    "customer service skincare bd",
    
    // Contact methods
    "beauty shop phone number",
    "beauty bucket email address",
    "cosmetics store location dhaka",
    "customer care number beauty",
    "beauty support bd",
    
    // Support inquiries
    "skincare order help",
    "delivery support bangladesh",
    "cosmetics return contact",
    "product inquiry beauty",
    "makeup warranty support",
    
    // Business inquiries
    "beauty business contact",
    "cosmetics wholesale inquiry",
    "beauty supplier bangladesh",
    "partnership cosmetics bd",
    
    // Social media
    "beauty bucket facebook",
    "beauty bucket instagram",
    "cosmetics store social media",
    
    // Location
    "beauty store dhaka address",
    "cosmetics shop gulshan",
    "beauty bucket office location",
    
    // Beauty specific
    "skincare consultation bd",
    "makeup help bangladesh",
    "fragrance inquiry dhaka",
    "beauty advice bd",
    
    // Customer service
    "beauty product support",
    "cosmetics helpline bd",
    "skincare customer care",
    "beauty store assistance",
    "makeup expert help"
  ],
  openGraph: {
    title: "Contact Beauty Bucket - We're Here to Help | Premium Beauty Store Bangladesh",
    description: "Need help with your beauty order? Have questions about skincare, makeup, or fragrances? Contact our friendly customer support team via phone, email, or visit our Dhaka store.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/contact' || 'https://beautybucket.com.bd/contact',
    siteName: "Beauty Bucket",
    images: [
      {
        url: '/contact-og-beautybucket.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Beauty Bucket - Customer Support for Premium Beauty Products',
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
    title: "Contact Beauty Bucket | Customer Support",
    description: "Questions about beauty products or orders? Contact our friendly team. Call, email, or visit us in Dhaka.",
    images: ['/contact-twitter-beautybucket.jpg'],
  },
  alternates: {
    canonical: '/contact',
    languages: {
      'en': '/contact',
      'bn': '/bn/contact',
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
  // Contact page specific metadata
  other: {
    'application-name': 'Beauty Bucket Contact',
    'msapplication-TileColor': '#EE4275',
    'theme-color': '#EE4275',
    'page-type': 'contact-us',
    'contact-email': 'support@beautybucket.com',
    'contact-phone': '+8801234567890',
    'business-hours': 'Mon-Sat 9AM-9PM, Sun 10AM-6PM',
    'address-locality': 'Dhaka',
    'address-country': 'BD',
    'product-categories': 'Skincare, Makeup, Fragrances, Hair Care, Body Care',
    'authenticity': '100% Genuine Products',
    'beauty-consultation': 'Available via Chat & Phone',
    'customer-care-type': 'Beauty Experts Support',
  },
};

// Server component with Suspense
export default function ContactPage() {
  return (
    <Suspense fallback={<ContactLoading />}>
      <ContactClient />
    </Suspense>
  );
}