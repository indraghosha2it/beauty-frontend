import { Suspense } from 'react';
import CheckoutClient from './CheckoutClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Checkout page
function CheckoutLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-[#FFF8F9] via-white to-[#FFF8F9] pt-20 sm:pt-24">
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 sm:w-8 sm:h-8 border-4 border-[#EE4275] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Beauty Bucket Checkout Page SEO Metadata
export const metadata = {
  title: "Secure Checkout | Complete Your Beauty Order",
  description: "Secure checkout for your premium beauty products at Beauty Bucket. ✓ Cash on Delivery ✓ bKash/Nagad ✓ Credit Card ✓ 100% Authentic Products ✓ Free delivery on orders over 2000 BDT. Complete your purchase safely.",
  keywords: [
    // Checkout specific
    "secure checkout bangladesh",
    "beauty products checkout page",
    "complete order cosmetics bd",
    "beauty bucket checkout",
    "payment checkout beauty products",
    "secure online payment bd",
    
    // Payment methods
    "cash on delivery checkout",
    "bkash payment online bd",
    "nagad payment gateway",
    "credit card payment beauty",
    "online payment bd",
    "mobile payment bd",
    "digital payment cosmetics",
    "emi payment beauty products bd",
    
    // Customer info
    "shipping address bd",
    "delivery information cosmetics",
    "billing details beauty",
    "order confirmation bd",
    "buyer information bd",
    
    // Order summary
    "review order before payment",
    "beauty cart checkout",
    "finalize purchase cosmetics",
    "place order beauty products bd",
    "skincare product checkout",
    
    // Security
    "secure payment bd",
    "safe online shopping cosmetics",
    "encrypted checkout",
    "ssl commerce payment",
    "secure transaction bd",
    "protected checkout bd",
    "payment security bd",
    
    // Delivery
    "free delivery on beauty products",
    "home delivery bd",
    "cosmetic shipping charges",
    "delivery inside dhaka",
    "delivery outside dhaka",
    "express delivery beauty",
    "same day delivery dhaka",
    
    // Coupon & discount
    "beauty coupon code",
    "discount on cosmetics bd",
    "promo code beauty products",
    "offer on skincare purchase",
    "festival offer bd",
    "beauty sale bd",
    
    // Trust signals
    "7 day return policy",
    "secure beauty shopping",
    "verified checkout",
    "authentic products bd",
    "trusted cosmetics store",
    "genuine beauty products",
    
    // Additional
    "beauty purchase bd",
    "cosmetics checkout process",
    "order tracking bd",
    "invoice generation bd",
    "payment confirmation",
    "order receipt bd",
    "skincare checkout",
    "makeup products bd"
  ],
  openGraph: {
    title: "Secure Checkout - Beauty Bucket | Complete Your Beauty Order",
    description: "Safe and secure checkout for your beauty products. Pay with Cash on Delivery, bKash, Nagad, or Credit Card. Free delivery on orders over 2000 BDT. 100% Authentic Products.",
    url: process.env.NEXT_PUBLIC_BASE_URL + '/checkout' || 'https://beautybucket.com/checkout',
    siteName: "Beauty Bucket",
    images: [
      {
        url: '/checkout-og-beautybucket.jpg',
        width: 1200,
        height: 630,
        alt: 'Beauty Bucket Secure Checkout - Complete Your Beauty Order',
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
    title: "Secure Checkout | Beauty Bucket Bangladesh",
    description: "Complete your beauty product purchase securely. COD, bKash, Nagad, and Credit Card accepted. Free delivery over 2000 BDT. 100% Authentic Products.",
    images: ['/checkout-twitter-beautybucket.jpg'],
  },
  alternates: {
    canonical: '/checkout',
    languages: {
      'en': '/checkout',
      'bn': '/bn/checkout',
    },
  },
  robots: {
    index: false,  // Checkout pages should not be indexed by search engines
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  // Additional metadata for better SEO
  other: {
    'application-name': 'Beauty Bucket Checkout',
    'msapplication-TileColor': '#EE4275',
    'theme-color': '#EE4275',
    'page-type': 'checkout',
    'user-action': 'complete-purchase',
    'payment-methods': 'cod,bkash,nagad,credit-card',
    'secure-checkout': 'true',
    'return-policy': '7 Days Return Policy',
    'authenticity': '100% Authentic Products',
    'delivery-estimate': '1-3 business days',
    'free-delivery-threshold': '2000 BDT',
    
    // Payment security
    'ssl-secured': 'true',
    'encryption': '256-bit SSL Encryption',
    'payment-processor': 'SSL Commerz',
    
    // Additional checkout info
    'order-tracking': 'Available',
    'invoice-format': 'Digital Invoice',
    'payment-confirmation': 'Instant Confirmation',
    'customer-support': '24/7 Support Available',
    
    // Beauty specific
    'product-category': 'Beauty, Skincare, Cosmetics, Makeup, Haircare, Fragrance',
    'authentic-products': '100% Genuine Beauty Products',
    'brands-available': 'Premium Beauty Brands',
    'gift-option': 'Available',
    'tax-included': 'Yes (VAT Included)',
    'safety-tested': 'All Products Safety Tested',
    'dermatologist-approved': 'Dermatologist Approved Products',
  },
};

// Server component with Suspense
export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutClient />
    </Suspense>
  );
}