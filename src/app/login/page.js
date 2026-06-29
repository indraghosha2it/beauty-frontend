// app/login/page.js
import { Suspense } from 'react';
import LoginClient from './LoginClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Login page
function LoginLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#FFF5F6] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#EE4275] border-t-transparent rounded-full animate-spin"></div>
      </div>
      <Footer />
    </>
  );
}

// Beauty Bucket Login Page SEO Metadata
export const metadata = {
  title: "Login to Beauty Bucket | Sign In for Premium Beauty Products in Bangladesh",
  description: "Login to your Beauty Bucket account to shop premium skincare, makeup, fragrances, hair care & more. Track orders, save wishlist, and get exclusive beauty deals.",
  keywords: [
    // Login specific
    "login beauty bucket",
    "sign in cosmetics store bd",
    "customer login bangladesh",
    "beauty bucket account access",
    "member login beauty",
    
    // Account related
    "my beauty account",
    "cosmetics shopping login",
    "skincare account bd",
    "premium beauty login",
    "beauty bucket member sign in",
    
    // Benefits
    "track beauty orders",
    "save wishlist login",
    "exclusive beauty deals",
    "cosmetics discount for members",
    "beauty purchase discount",
    
    // Authentication
    "secure login cosmetics",
    "beauty store authentication",
    "online cosmetics shop login bd",
    "beauty bucket customer portal",
    
    // User intent
    "access my beauty account",
    "login to buy cosmetics online",
    "beauty shopping account bd",
    "cosmetics store sign in",
    
    // Product specific
    "skincare account login",
    "makeup store login bd",
    "fragrance account access",
    "hair care store sign in",
    "body care login bd",
    
    // Local keywords
    "login bd beauty store",
    "premium cosmetics account",
    "beauty store customer login",
    "skincare shopping account bd",
    
    // Beauty categories
    "k-beauty account login",
    "organic skincare sign in",
    "vegan cosmetics login",
    "cruelty free beauty account",
    
    // Makeup specific
    "professional makeup login",
    "bridal cosmetics account",
    "makeup artist sign in",
    
    // Women focus
    "beauty for women login",
    "cosmetics for girls bd",
    "skincare for women bangladesh"
  ],
  openGraph: {
    title: "Login to Beauty Bucket - Your Premium Beauty Account | Bangladesh",
    description: "Sign in to your Beauty Bucket account to shop premium skincare, makeup, fragrances, hair care, body care & more. 100% authentic products & best prices!",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/login' || 'https://beautybucket.com.bd/login',
    siteName: "Beauty Bucket",
    images: [
      {
        url: '/login-og-beautybucket.jpg',
        width: 1200,
        height: 630,
        alt: 'Beauty Bucket Login - Sign in to Your Premium Beauty Account',
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
    title: "Login to Beauty Bucket | Premium Beauty Store Bangladesh",
    description: "Sign in to access your beauty account, track orders, save favorites, and get exclusive member deals on skincare, makeup & more!",
    images: ['/login-twitter-beautybucket.jpg'],
  },
  alternates: {
    canonical: '/login',
    languages: {
      'en': '/login',
      'bn': '/bn/login',
    },
  },
  robots: {
    index: false,  // Login pages should not be indexed
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  // Additional metadata
  other: {
    'application-name': 'Beauty Bucket Login',
    'msapplication-TileColor': '#EE4275',
    'theme-color': '#EE4275',
    'page-type': 'login',
    'user-action': 'authentication',
    'business-name': 'Beauty Bucket Bangladesh',
    'business-type': 'E-commerce Beauty & Cosmetics Store',
    'secure-login': '256-bit SSL Encrypted',
    'session-timeout': '7 days',
    'product-categories': 'Skincare, Makeup, Fragrances, Hair Care, Body Care, Beauty Accessories',
    'authenticity': '100% Authentic Products',
    'beauty-type': 'Premium, Natural, Organic, Vegan, Cruelty-Free Options Available',
  },
};

// Generate JSON-LD structured data
export const generateJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': process.env.NEXT_PUBLIC_BASE_URL + '/login' || 'https://beautybucket.com.bd/login',
    name: 'Login - Beauty Bucket',
    description: 'Login to your Beauty Bucket account to shop premium beauty products and cosmetics.',
    url: process.env.NEXT_PUBLIC_BASE_URL + '/login' || 'https://beautybucket.com.bd/login',
    inLanguage: 'en',
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
          name: 'Login',
          item: process.env.NEXT_PUBLIC_BASE_URL + '/login' || 'https://beautybucket.com.bd/login'
        }
      ]
    },
    mainEntity: {
      '@type': 'WebApplication',
      name: 'Customer Login System',
      description: 'Login to access your beauty account',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires modern browser'
    }
  };
};

// Server component with Suspense
export default function LoginPage() {
  // Generate JSON-LD
  const jsonLd = generateJsonLd();
  
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<LoginLoading />}>
        <LoginClient />
      </Suspense>
    </>
  );
}