// app/privacy/page.js
import { Suspense } from 'react';
import PrivacyClient from './PrivacyClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Privacy page
function PrivacyLoading() {
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

// Beauty Bucket Privacy Policy Page SEO Metadata
export const metadata = {
  title: "Privacy Policy | Beauty Bucket - Protecting Your Beauty & Personal Information",
  description: "Read Beauty Bucket's privacy policy to understand how we collect, use, and protect your personal information. Learn about data security, cookies, and your privacy rights in Bangladesh.",
  keywords: [
    // Privacy policy specific
    "privacy policy beauty bucket",
    "cosmetics store privacy policy bd",
    "beauty products data protection",
    "beauty bucket privacy practices",
    "online beauty store privacy bangladesh",
    
    // Data collection
    "personal information collection beauty",
    "customer data protection cosmetics",
    "skincare purchase privacy",
    "shopping data security beauty",
    
    // Security measures
    "ssl encryption beauty",
    "secure payment cosmetics bd",
    "data security beauty store",
    "beauty bucket security policy",
    
    // User rights
    "data access rights beauty",
    "delete my data cosmetics",
    "opt out marketing beauty",
    "gdpr compliance beauty bd",
    
    // Cookies & tracking
    "cookie policy beauty",
    "website tracking cosmetics",
    "analytics privacy beauty",
    
    // Beauty specific privacy
    "skin type data privacy",
    "beauty preferences data",
    "cosmetics purchase history",
    "beauty product recommendations privacy",
    
    // Health & safety data
    "skin condition data protection",
    "allergy information privacy",
    "beauty consultation data",
    "dermatological data privacy",
    
    // Legal compliance
    "data protection bangladesh beauty",
    "privacy compliance cosmetics",
    "ccpa rights beauty bd",
    "gdpr rights beauty customers",
    
    // Marketing & communications
    "beauty newsletter privacy",
    "promotional emails privacy",
    "beauty offers data usage",
    "marketing consent beauty",
    
    // Additional
    "beauty bucket data security",
    "cosmetics customer privacy",
    "skincare data protection bd",
    "makeup purchase privacy"
  ],
  openGraph: {
    title: "Privacy Policy - Beauty Bucket | Your Beauty Data Protection & Privacy Rights",
    description: "Learn how Beauty Bucket protects your personal information. We're committed to transparent data practices, secure payments, and respecting your privacy rights in Bangladesh.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/privacy' || 'https://beautybucket.com.bd/privacy',
    siteName: "Beauty Bucket",
    images: [
      {
        url: '/privacy-og-beautybucket.jpg',
        width: 1200,
        height: 630,
        alt: 'Beauty Bucket Privacy Policy - Your Beauty Data Protection',
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
    title: "Privacy Policy | Beauty Bucket",
    description: "How we collect, use, and protect your personal information. Your privacy rights and beauty data security explained.",
    images: ['/privacy-twitter-beautybucket.jpg'],
  },
  alternates: {
    canonical: '/privacy',
    languages: {
      'en': '/privacy',
      'bn': '/bn/privacy',
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
  // Privacy page specific metadata
  other: {
    'application-name': 'Beauty Bucket Privacy',
    'msapplication-TileColor': '#EE4275',
    'theme-color': '#EE4275',
    'page-type': 'privacy-policy',
    'privacy-policy-version': '2.0',
    'last-updated': '2024-01-01',
    'data-controller': 'Beauty Bucket Bangladesh',
    'privacy-contact': 'privacy@beautybucket.com',
    'gdpr-compliant': 'true',
    'ccpa-compliant': 'true',
    'data-retention-period': '2 years',
    'cookie-policy': 'opt-in',
    
    // Beauty specific data collection
    'data-collection-types': 'Name, Email, Phone, Address, Purchase History, Skin Preferences',
    'sensitive-data': 'Skin Type, Allergies, Beauty Preferences (Optional)',
    'data-usage': 'Order Processing, Recommendations, Marketing (with consent)',
    'third-party-sharing': 'Only with Delivery Partners and Payment Processors',
    
    // Security measures
    'encryption-standard': '256-bit SSL Encryption',
    'payment-security': 'PCI DSS Compliant',
    'data-storage': 'Secure Cloud Storage',
    'access-control': 'Role-Based Access Control',
    
    // User rights
    'rights-access': 'Access Personal Data',
    'rights-correction': 'Correct Inaccurate Data',
    'rights-deletion': 'Request Data Deletion',
    'rights-opt-out': 'Opt-out of Marketing',
    'rights-portability': 'Data Portability',
    
    // Children's privacy
    'children-privacy': 'COPPA Compliant',
    'age-restriction': '13+ with Parental Consent',
    'parental-consent': 'Required for Under 18',
    
    // Cookie policy
    'cookie-types': 'Essential, Analytics, Marketing (optional)',
    'cookie-retention': 'Session and Persistent',
    'third-party-cookies': 'Google Analytics, Social Media',
    
    // Beauty marketing
    'marketing-consent': 'Explicit Opt-in Required',
    'email-marketing': 'Opt-out Available',
    'personalized-recommendations': 'Based on Purchase History',
    'beauty-newsletters': 'Optional Subscription',
    
    // Legal compliance
    'compliance-standard': 'Bangladesh Data Protection Act',
    'international-compliance': 'GDPR, CCPA',
    'data-breach-notification': '72 Hours',
    'dispute-resolution': 'Customer Support + Regulatory',
  },
};

// Server component with Suspense
export default function PrivacyPage() {
  return (
    <Suspense fallback={<PrivacyLoading />}>
      <PrivacyClient />
    </Suspense>
  );
}