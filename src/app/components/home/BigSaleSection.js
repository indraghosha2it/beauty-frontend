// components/home/BigSaleSection.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Percent,
  Flame,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Star
} from 'lucide-react';

// Helper functions
const calculateDiscountPercentage = (regularPrice, discountPrice) => {
  if (regularPrice && discountPrice && discountPrice < regularPrice) {
    return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
  }
  return 0;
};

// Single Sale Product Card - Simple Horizontal Layout
const SaleProductCard = ({ product }) => {
  const discountPercent = calculateDiscountPercentage(product.regularPrice, product.discountPrice);
  const productImage = product.images?.[0]?.url || product.images?.[0] || 'https://via.placeholder.com/300?text=Product';

  return (
    <Link href={`/productDetails?id=${product._id}`} className="block h-full">
      <motion.div
        className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-row"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        {/* Left - Product Image */}
        <div className="relative w-24 sm:w-28 md:w-32 flex-shrink-0 bg-gray-50 overflow-hidden">
          <div className="aspect-square w-full h-full">
            <img
              src={productImage}
              alt={product.productName}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/150?text=Product';
              }}
              loading="lazy"
            />
          </div>
          
          {/* Discount Badge - Top Left */}
          {discountPercent > 0 && (
            <div className="absolute top-1 left-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1">
              <Percent className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
              {discountPercent}% OFF
            </div>
          )}
        </div>

        {/* Right - Product Details */}
        <div className="flex-1 p-2 sm:p-3 md:p-4 flex flex-col justify-center min-w-0">
          {/* Product Name */}
          <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.productName}
          </h3>
          
          {/* Rating - Optional */}
          {product.rating > 0 && (
            <div className="flex items-center gap-1 mt-0.5">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${
                      i < Math.round(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[8px] sm:text-[10px] text-gray-500">({product.rating})</span>
            </div>
          )}
          
          {/* Only Show Discount Percentage - No Prices */}
          {discountPercent > 0 && (
            <div className="flex items-center gap-1 sm:gap-2 mt-1">
              <span className="text-xs sm:text-sm font-bold text-red-600 bg-red-50 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                {discountPercent}% OFF
              </span>
            </div>
          )}
          
          {/* Arrow indicator on hover */}
          <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

// Main Big Sale Section - Grid Layout
export default function BigSaleSection() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4; // Show 4 products per page

  // Fetch all discounted products
  useEffect(() => {
    const fetchSaleProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          'https://gadget-backend.vercel.app/api/products?limit=100'
        );
        const data = await response.json();
        
        if (data.success) {
          // Filter products with discount and sort by discount percentage
          const discountedProducts = data.data
            .filter(p => p.discountPrice > 0 && p.discountPrice < p.regularPrice && p.isActive !== false)
            .sort((a, b) => {
              const discountA = calculateDiscountPercentage(a.regularPrice, a.discountPrice);
              const discountB = calculateDiscountPercentage(b.regularPrice, b.discountPrice);
              return discountB - discountA;
            });
          
          // Store all discounted products
          setAllProducts(discountedProducts);
          
          // Show first 4 products
          setProducts(discountedProducts.slice(0, itemsPerPage));
        }
      } catch (error) {
        console.error('Error fetching sale products:', error);
        setAllProducts([]);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSaleProducts();
  }, []);

  // Navigate to next page (4 products)
  const handleNext = () => {
    const nextStart = (currentPage + 1) * itemsPerPage;
    if (nextStart < allProducts.length) {
      setCurrentPage(currentPage + 1);
      setProducts(allProducts.slice(nextStart, nextStart + itemsPerPage));
    }
  };

  // Navigate to previous page (4 products)
  const handlePrev = () => {
    if (currentPage > 0) {
      const prevStart = (currentPage - 1) * itemsPerPage;
      setCurrentPage(currentPage - 1);
      setProducts(allProducts.slice(prevStart, prevStart + itemsPerPage));
    }
  };

  // Navigate to specific page
  const goToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
    setProducts(allProducts.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage));
  };

  // Check if more products available
  const hasNext = (currentPage + 1) * itemsPerPage < allProducts.length;
  const hasPrev = currentPage > 0;
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);

  // Get visible page numbers for pagination (show all on mobile, limited on desktop)
  const getVisiblePages = () => {
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (isLoading) {
    return (
      <section className="py-8 md:py-12 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-64 bg-gray-100 rounded mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl h-20 w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (allProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 overflow-hidden relative">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-yellow-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 md:mb-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 mb-2 sm:mb-3">
                <Flame className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                <span className="text-[10px] sm:text-xs font-bold text-white tracking-wider uppercase">Big Sale</span>
                <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-yellow-300" />
              </div>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                <span className="text-transparent bg-clip-text bg-blue-600">
                  Up to 70% OFF
                </span>
                {' '}Top Deals
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base mt-1">
                Grab the best discounted gadgets before they're gone!
              </p>
            </div>
            
            {/* <div className="flex items-center gap-2">
              <Link href="/products?sort=discount" className="text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                View All Deals
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </Link>
            </div> */}
          </div>
        </motion.div>

        {/* Products Grid with Navigation Arrows */}
        <div className="relative">
          {/* Left Arrow - Desktop only */}
          {hasPrev && (
            <button
              onClick={handlePrev}
              className="hidden lg:flex absolute -left-3 md:-left-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-2 border border-gray-200 hover:bg-gray-50 hover:shadow-xl transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
            </button>
          )}

          {/* Products Grid - Always 4 columns on desktop, 1 on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            <AnimatePresence mode="wait">
              {products.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="h-full"
                >
                  <SaleProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Right Arrow - Desktop only */}
          {hasNext && (
            <button
              onClick={handleNext}
              className="hidden lg:flex absolute -right-3 md:-right-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-2 border border-gray-200 hover:bg-gray-50 hover:shadow-xl transition-all duration-200"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
            </button>
          )}
        </div>

        {/* Pagination - Shows on all devices */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-6 md:mt-8">
            {/* Previous Button - Mobile & Desktop */}
            <button
              onClick={handlePrev}
              disabled={!hasPrev}
              className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg border transition-all ${
                hasPrev
                  ? 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:shadow-md'
                  : 'border-gray-200 text-gray-300 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Page Numbers - Show all on mobile, limited on desktop */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              {getVisiblePages().map((pageIndex) => (
                <button
                  key={pageIndex}
                  onClick={() => goToPage(pageIndex)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    currentPage === pageIndex
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  {pageIndex + 1}
                </button>
              ))}
            </div>

            {/* Next Button - Mobile & Desktop */}
            <button
              onClick={handleNext}
              disabled={!hasNext}
              className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg border transition-all ${
                hasNext
                  ? 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:shadow-md'
                  : 'border-gray-200 text-gray-300 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}