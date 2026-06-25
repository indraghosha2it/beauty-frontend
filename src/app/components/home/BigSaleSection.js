
// // components/home/BigSaleSection.jsx
// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   ArrowRight, 
//   Percent,
//   Flame,
//   ChevronLeft,
//   ChevronRight,
//   Sparkles,
//   Star,
//   ShoppingBag
// } from 'lucide-react';

// // Helper functions
// const calculateDiscountPercentage = (regularPrice, discountPrice) => {
//   if (regularPrice && discountPrice && discountPrice < regularPrice) {
//     return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
//   }
//   return 0;
// };

// // Single Sale Product Card - Horizontal Layout (Left Image, Right Details)
// const SaleProductCard = ({ product }) => {
//   const discountPercent = calculateDiscountPercentage(product.regularPrice, product.discountPrice);
//   const productImage = product.images?.[0]?.url || product.images?.[0] || 'https://via.placeholder.com/300?text=Product';

//   return (
//     <Link href={`/productDetails?id=${product._id}`} className="block h-full">
//       <motion.div
//         className="group bg-white rounded-xl overflow-hidden border border-[#EE4275]/20 hover:border-[#EE4275]/40 hover:shadow-[0_8px_25px_rgba(238,66,117,0.12)] transition-all duration-300 cursor-pointer h-full flex flex-row"
//         whileHover={{ y: -2 }}
//         transition={{ duration: 0.3 }}
//       >
//         {/* Left - Product Image with Padding */}
//         <div className="relative w-20 sm:w-24 md:w-28 flex-shrink-0 bg-gradient-to-br from-[#F7C7D3]/15 to-[#EE4275]/5 overflow-hidden p-1.5 sm:p-2">
//           <div className="aspect-square w-full h-full rounded-lg overflow-hidden">
//             <img
//               src={productImage}
//               alt={product.productName}
//               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = 'https://via.placeholder.com/300?text=Product';
//               }}
//               loading="lazy"
//             />
//           </div>
          
//           {/* Discount Badge - Top Left */}
//           {discountPercent > 0 && (
//             <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-[6px] sm:text-[8px] md:text-[9px] font-bold px-1 sm:px-1.5 py-0.5 rounded-full shadow-lg flex items-center gap-0.5">
//               <Percent className="w-1.5 h-1.5 sm:w-2 sm:h-2" />
//               {discountPercent}%
//             </div>
//           )}
//         </div>

//         {/* Right - Product Details */}
//         <div className="flex-1 p-1.5 sm:p-2 md:p-3 flex flex-col justify-between min-w-0">
//           <div className="flex-1">
//             {/* Brand Name */}
//             {product.brand && (
//               <p className="text-[6px] sm:text-[8px] md:text-[10px] font-medium text-[#EE4275] uppercase tracking-wider mb-0.5 truncate">
//                 {product.brand}
//               </p>
//             )}

//             {/* Product Name - FIXED fontFamily */}
//             <h3 className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-[#EE4275] transition-colors" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
//               {product.productName}
//             </h3>

//             {/* Rating */}
//             {product.rating > 0 && (
//               <div className="flex items-center gap-1 mt-0.5">
//                 <div className="flex items-center gap-0.5">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 ${
//                         i < Math.round(product.rating)
//                           ? 'fill-[#EE4275] text-[#EE4275]'
//                           : 'text-gray-300'
//                       }`}
//                     />
//                   ))}
//                 </div>
//                 <span className="text-[6px] sm:text-[8px] md:text-[10px] text-gray-500">({product.rating})</span>
//               </div>
//             )}

//             {/* Short Description - Hidden on small screens */}
//             {product.shortDescription && (
//               <p className="text-[6px] sm:text-[8px] md:text-[10px] text-gray-500 line-clamp-1 mt-0.5 hidden sm:block">
//                 {product.shortDescription.replace(/<[^>]*>/g, '').substring(0, 50)}...
//               </p>
//             )}

//             {/* Pricing Section */}
//             <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 mt-1 flex-wrap">
//               {product.discountPrice > 0 && product.discountPrice < product.regularPrice ? (
//                 <>
//                   <span className="text-[10px] sm:text-xs md:text-sm font-bold text-[#EE4275]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
//                     ৳{product.discountPrice}
//                   </span>
//                   <span className="text-[7px] sm:text-[8px] md:text-xs text-gray-400 line-through">
//                     ৳{product.regularPrice}
//                   </span>
//                   <span className="text-[5px] sm:text-[7px] md:text-[9px] font-bold text-green-600 bg-green-50 px-1 py-0.5 rounded-full">
//                     Save {discountPercent}%
//                   </span>
//                 </>
//               ) : (
//                 <span className="text-[10px] sm:text-xs md:text-sm font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
//                   ৳{product.regularPrice}
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Add to Cart Button */}
//           <button 
//             className="mt-1 sm:mt-1.5 md:mt-2 w-full py-1 sm:py-1.5 md:py-2 rounded-lg bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-[7px] sm:text-[9px] md:text-xs font-medium hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all duration-300 flex items-center justify-center gap-1 group-hover:scale-[1.02]"
//             onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               // Add to cart logic
//             }}
//           >
//             <ShoppingBag className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" />
  
//             <span className="xs:hidden">Add To Cart</span>
//           </button>
//         </div>
//       </motion.div>
//     </Link>
//   );
// };

// // Main Big Sale Section - Grid Layout with Left-to-Right Gradient
// export default function BigSaleSection() {
//   const [products, setProducts] = useState([]);
//   const [allProducts, setAllProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(0);
//   const itemsPerPage = 4;

//   // Fetch all discounted products
//   useEffect(() => {
//     const fetchSaleProducts = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(
//           'http://localhost:5000/api/products?limit=100'
//         );
//         const data = await response.json();
        
//         if (data.success) {
//           const discountedProducts = data.data
//             .filter(p => p.discountPrice > 0 && p.discountPrice < p.regularPrice && p.isActive !== false)
//             .sort((a, b) => {
//               const discountA = calculateDiscountPercentage(a.regularPrice, a.discountPrice);
//               const discountB = calculateDiscountPercentage(b.regularPrice, b.discountPrice);
//               return discountB - discountA;
//             });
          
//           setAllProducts(discountedProducts);
//           setProducts(discountedProducts.slice(0, itemsPerPage));
//         }
//       } catch (error) {
//         console.error('Error fetching sale products:', error);
//         setAllProducts([]);
//         setProducts([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     fetchSaleProducts();
//   }, []);

//   const handleNext = () => {
//     const nextStart = (currentPage + 1) * itemsPerPage;
//     if (nextStart < allProducts.length) {
//       setCurrentPage(currentPage + 1);
//       setProducts(allProducts.slice(nextStart, nextStart + itemsPerPage));
//     }
//   };

//   const handlePrev = () => {
//     if (currentPage > 0) {
//       const prevStart = (currentPage - 1) * itemsPerPage;
//       setCurrentPage(currentPage - 1);
//       setProducts(allProducts.slice(prevStart, prevStart + itemsPerPage));
//     }
//   };

//   const goToPage = (pageIndex) => {
//     setCurrentPage(pageIndex);
//     setProducts(allProducts.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage));
//   };

//   const hasNext = (currentPage + 1) * itemsPerPage < allProducts.length;
//   const hasPrev = currentPage > 0;
//   const totalPages = Math.ceil(allProducts.length / itemsPerPage);

//   const getVisiblePages = () => {
//     const pages = [];
//     for (let i = 0; i < totalPages; i++) {
//       pages.push(i);
//     }
//     return pages;
//   };

//   if (isLoading) {
//     return (
//       <section 
//         className="py-10 md:py-14"
//         style={{ background: 'linear-gradient(to right, #FFD2DB, #FFFFFF, #FFD2DB)' }}
//       >
//         <div className="container mx-auto px-4 max-w-7xl">
//           <div className="animate-pulse">
//             <div className="h-8 w-48 bg-[#FFD2DB]/60 rounded mb-2"></div>
//             <div className="h-4 w-64 bg-[#FFD2DB]/50 rounded mb-6"></div>
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
//               {[...Array(4)].map((_, i) => (
//                 <div key={i} className="bg-white rounded-xl h-36 sm:h-40 w-full border border-[#FFD2DB]/50 flex">
//                   <div className="w-20 sm:w-28 bg-[#FFD2DB]/30 rounded-l-xl m-2"></div>
//                   <div className="flex-1 p-2 space-y-2">
//                     <div className="h-2 w-10 bg-[#FFD2DB]/30 rounded"></div>
//                     <div className="h-3 w-16 bg-[#FFD2DB]/30 rounded"></div>
//                     <div className="h-2 w-12 bg-[#FFD2DB]/30 rounded"></div>
//                     <div className="h-4 w-12 bg-[#FFD2DB]/30 rounded"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (allProducts.length === 0) {
//     return null;
//   }

//   return (
//     <section 
//       className="py-6 md:py-6 lg:py-6 overflow-hidden relative"
//       style={{ 
//         background: 'linear-gradient(to right, #FFD2DB 0%, #FFF5F6 25%, #FFFFFF 50%, #FFF5F6 75%, #FFD2DB 100%)'
//       }}
//     >
//       {/* Background Decorations */}
//       <div className="absolute inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#EE4275]/8 rounded-full blur-3xl"></div>
//         <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#FFD2DB]/50 rounded-full blur-3xl"></div>
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#EE4275]/5 rounded-full blur-3xl"></div>
//         {/* Decorative dots pattern */}
//         <div className="absolute inset-0 opacity-[0.04]" style={{
//           backgroundImage: 'radial-gradient(circle, #EE4275 1px, transparent 1px)',
//           backgroundSize: '30px 30px'
//         }}></div>
//       </div>

//       <div className="container mx-auto px-4 max-w-7xl relative z-10">
//         {/* Section Header - Glow Up ✨ */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="mb-6 md:mb-8"
//         >
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div>
//               <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] rounded-full px-3.5 py-1 mb-2.5 shadow-md shadow-[#EE4275]/20">
//                 <Sparkles className="w-3.5 h-3.5 text-white" />
//                 <span className="text-[9px] sm:text-xs font-bold text-white tracking-wider uppercase">Big Sale</span>
//                 <Sparkles className="w-3 h-3 text-[#FFD2DB]" />
//               </div>
//               <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
//                 Glow Up with<span className="text-[#EE4275]"> Big Savings </span>
//               </h2>
//               <p className="text-gray-600 text-xs sm:text-sm md:text-base mt-1">
//                 Premium skincare, makeup & beauty products at irresistible prices
//               </p>
//             </div>
//           </div>
//         </motion.div>

//         {/* Products Grid with Navigation Arrows */}
//         <div className="relative">
//           {/* Left Arrow */}
//           {hasPrev && (
//             <button
//               onClick={handlePrev}
//               className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-2.5 border-2 border-[#EE4275]/20 hover:border-[#EE4275] hover:bg-[#EE4275] hover:text-white transition-all duration-300"
//             >
//               <ChevronLeft className="w-4 h-4" />
//             </button>
//           )}

//           {/* Products Grid - 2 columns on mobile, 4 columns on desktop */}
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
//             <AnimatePresence mode="wait">
//               {products.map((product, index) => (
//                 <motion.div
//                   key={product._id}
//                   initial={{ opacity: 0, y: 15 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -15 }}
//                   transition={{ duration: 0.3, delay: index * 0.05 }}
//                   className="h-full"
//                 >
//                   <SaleProductCard product={product} />
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>

//           {/* Right Arrow */}
//           {hasNext && (
//             <button
//               onClick={handleNext}
//               className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-2.5 border-2 border-[#EE4275]/20 hover:border-[#EE4275] hover:bg-[#EE4275] hover:text-white transition-all duration-300"
//             >
//               <ChevronRight className="w-4 h-4" />
//             </button>
//           )}
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-6 md:mt-8">
//             <button
//               onClick={handlePrev}
//               disabled={!hasPrev}
//               className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border transition-all ${
//                 hasPrev
//                   ? 'border-[#EE4275]/30 text-[#EE4275] hover:bg-[#EE4275] hover:text-white hover:border-[#EE4275]'
//                   : 'border-gray-200 text-gray-300 cursor-not-allowed'
//               }`}
//             >
//               <ChevronLeft className="w-3.5 h-3.5" />
//             </button>

//             <div className="flex items-center gap-1">
//               {getVisiblePages().map((pageIndex) => (
//                 <button
//                   key={pageIndex}
//                   onClick={() => goToPage(pageIndex)}
//                   className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full text-[10px] sm:text-xs font-medium transition-all ${
//                     currentPage === pageIndex
//                       ? 'bg-[#EE4275] text-white shadow-md shadow-[#EE4275]/25'
//                       : 'bg-white/80 text-gray-600 border border-gray-200 hover:border-[#EE4275]/50 hover:text-[#EE4275] hover:bg-white'
//                   }`}
//                 >
//                   {pageIndex + 1}
//                 </button>
//               ))}
//             </div>

//             <button
//               onClick={handleNext}
//               disabled={!hasNext}
//               className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border transition-all ${
//                 hasNext
//                   ? 'border-[#EE4275]/30 text-[#EE4275] hover:bg-[#EE4275] hover:text-white hover:border-[#EE4275]'
//                   : 'border-gray-200 text-gray-300 cursor-not-allowed'
//               }`}
//             >
//               <ChevronRight className="w-3.5 h-3.5" />
//             </button>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }


// components/home/BigSaleSection.jsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Percent,
  Flame,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Star,
  ShoppingBag,
  Loader2,
  ShoppingCart
} from 'lucide-react';
import { toast } from 'sonner';
import CartSidebar from '../CartSidebar';

// Helper functions
const calculateDiscountPercentage = (regularPrice, discountPrice) => {
  if (regularPrice && discountPrice && discountPrice < regularPrice) {
    return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
  }
  return 0;
};

// Single Sale Product Card - Horizontal Layout (Left Image, Right Details)
const SaleProductCard = ({ 
  product, 
  isInCart: propIsInCart, 
  onCartStatusChange, 
  onViewInCart,
  onAddToCart 
}) => {
  const [cartStatusLoading, setCartStatusLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(propIsInCart || false);
  const discountPercent = calculateDiscountPercentage(product.regularPrice, product.discountPrice);
  const productImage = product.images?.[0]?.url || product.images?.[0] || 'https://via.placeholder.com/300?text=Product';

  useEffect(() => {
    setIsInCart(propIsInCart || false);
  }, [propIsInCart]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInCart) {
      onViewInCart();
      return;
    }
    
    if (product.stockQuantity <= 0) {
      toast.error('Product is out of stock!');
      return;
    }
    
    setCartStatusLoading(true);
    const toastId = toast.loading('Adding to cart...');
    
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      
      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }
      
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ productId: product._id, quantity: 1 })
      });
      
      const data = await response.json();
      
      if (data.success) {
        if (data.sessionId && !token) {
          localStorage.setItem('cartSessionId', data.sessionId);
        }
        toast.success('Added to cart!', { id: toastId });
        setIsInCart(true);
        if (onCartStatusChange) {
          onCartStatusChange(product._id, true);
        }
        window.dispatchEvent(new Event('cart-update'));
      } else {
        toast.error(data.error || 'Failed to add to cart', { id: toastId });
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Network error. Please try again.', { id: toastId });
    } finally {
      setCartStatusLoading(false);
    }
  };

  return (
    <Link href={`/productDetails?id=${product._id}`} className="block h-full">
      <motion.div
        className="group bg-white rounded-xl overflow-hidden border border-[#EE4275]/20 hover:border-[#EE4275]/40 hover:shadow-[0_8px_25px_rgba(238,66,117,0.12)] transition-all duration-300 cursor-pointer h-full flex flex-row"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3 }}
      >
        {/* Left - Product Image with Padding */}
        <div className="relative w-20 sm:w-24 md:w-28 flex-shrink-0 bg-gradient-to-br from-[#F7C7D3]/15 to-[#EE4275]/5 overflow-hidden p-1.5 sm:p-2">
          <div className="aspect-square w-full h-full rounded-lg overflow-hidden">
            <img
              src={productImage}
              alt={product.productName}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/300?text=Product';
              }}
              loading="lazy"
            />
          </div>
          
          {/* Discount Badge - Top Left */}
          {discountPercent > 0 && (
            <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-[6px] sm:text-[8px] md:text-[9px] font-bold px-1 sm:px-1.5 py-0.5 rounded-full shadow-lg flex items-center gap-0.5">
              <Percent className="w-1.5 h-1.5 sm:w-2 sm:h-2" />
              {discountPercent}%
            </div>
          )}
        </div>

        {/* Right - Product Details */}
        <div className="flex-1 p-1.5 sm:p-2 md:p-3 flex flex-col justify-between min-w-0">
          <div className="flex-1">
            {/* Brand Name */}
            {product.brand && (
              <p className="text-[6px] sm:text-[8px] md:text-[10px] font-medium text-[#EE4275] uppercase tracking-wider mb-0.5 truncate">
                {product.brand}
              </p>
            )}

            {/* Product Name */}
            <h3 className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-[#EE4275] transition-colors" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              {product.productName}
            </h3>

            {/* Rating */}
            {product.rating > 0 && (
              <div className="flex items-center gap-1 mt-0.5">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 ${
                        i < Math.round(product.rating)
                          ? 'fill-[#EE4275] text-[#EE4275]'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[6px] sm:text-[8px] md:text-[10px] text-gray-500">({product.rating})</span>
              </div>
            )}

            {/* Short Description - Hidden on small screens */}
            {product.shortDescription && (
              <p className="text-[6px] sm:text-[8px] md:text-[10px] text-gray-500 line-clamp-1 mt-0.5 hidden sm:block">
                {product.shortDescription.replace(/<[^>]*>/g, '').substring(0, 50)}...
              </p>
            )}

            {/* Pricing Section */}
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 mt-1 flex-wrap">
              {product.discountPrice > 0 && product.discountPrice < product.regularPrice ? (
                <>
                  <span className="text-[10px] sm:text-xs md:text-sm font-bold text-[#EE4275]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                    ৳{product.discountPrice}
                  </span>
                  <span className="text-[7px] sm:text-[8px] md:text-xs text-gray-400 line-through">
                    ৳{product.regularPrice}
                  </span>
                  <span className="text-[5px] sm:text-[7px] md:text-[9px] font-bold text-green-600 bg-green-50 px-1 py-0.5 rounded-full">
                    Save {discountPercent}%
                  </span>
                </>
              ) : (
                <span className="text-[10px] sm:text-xs md:text-sm font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  ৳{product.regularPrice}
                </span>
              )}
            </div>
          </div>

          {/* Add to Cart / View Cart Button */}
          <button 
            onClick={handleAddToCart}
            className={`mt-1 sm:mt-1.5 md:mt-2 w-full py-1 sm:py-1.5 md:py-2 rounded-lg text-[7px] sm:text-[9px] md:text-xs font-medium transition-all duration-300 flex items-center justify-center gap-1 group-hover:scale-[1.02] ${
              cartStatusLoading 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : isInCart
                ? 'bg-gradient-to-r from-[#a80883] to-[#6c0756] text-white hover:from-[#8e066f] hover:to-[#3b032f] shadow-lg shadow-[#3b032f]/25'
                : 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white hover:shadow-lg hover:shadow-[#EE4275]/25'
            }`}
            disabled={cartStatusLoading}
          >
            {cartStatusLoading ? (
              <>
                <Loader2 className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 animate-spin" />
                Adding...
              </>
            ) : isInCart ? (
              <>
                <ShoppingCart className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" />
            
                <span className="xs:hidden">View in Cart</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" />
              
                <span className="xs:hidden">Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </Link>
  );
};

// Main Big Sale Section - Grid Layout with Left-to-Right Gradient
export default function BigSaleSection() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [productsInCart, setProductsInCart] = useState({});
  const itemsPerPage = 4;

  // Check cart status for products
  const checkCartStatus = async (productsList) => {
    if (!productsList || productsList.length === 0) return;
    
    const productIds = productsList.map(p => p._id);
    const token = localStorage.getItem('token');
    const sessionId = localStorage.getItem('cartSessionId');
    
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else if (sessionId) {
      headers['x-session-id'] = sessionId;
    } else {
      const emptyCartStatus = {};
      productIds.forEach(id => {
        emptyCartStatus[id] = false;
      });
      setProductsInCart(emptyCartStatus);
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/cart/check-status', {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ productIds })
      });
      
      const data = await response.json();
      if (data.success) {
        setProductsInCart(data.data);
      } else {
        const emptyCartStatus = {};
        productIds.forEach(id => {
          emptyCartStatus[id] = false;
        });
        setProductsInCart(emptyCartStatus);
      }
    } catch (error) {
      console.error('Error checking cart status:', error);
      const emptyCartStatus = {};
      productIds.forEach(id => {
        emptyCartStatus[id] = false;
      });
      setProductsInCart(emptyCartStatus);
    }
  };

  // Update cart status
  const updateCartStatus = useCallback(async () => {
    if (allProducts.length === 0) return;
    
    const productIds = allProducts.map(p => p._id);
    const token = localStorage.getItem('token');
    const sessionId = localStorage.getItem('cartSessionId');
    
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else if (sessionId) {
      headers['x-session-id'] = sessionId;
    } else {
      const emptyCartStatus = {};
      productIds.forEach(id => {
        emptyCartStatus[id] = false;
      });
      setProductsInCart(emptyCartStatus);
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/cart/check-status', {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ productIds })
      });
      
      const data = await response.json();
      if (data.success) {
        setProductsInCart(data.data);
      } else {
        const emptyCartStatus = {};
        productIds.forEach(id => {
          emptyCartStatus[id] = false;
        });
        setProductsInCart(emptyCartStatus);
      }
    } catch (error) {
      console.error('Error refreshing cart status:', error);
      const emptyCartStatus = {};
      productIds.forEach(id => {
        emptyCartStatus[id] = false;
      });
      setProductsInCart(emptyCartStatus);
    }
  }, [allProducts]);

  // Fetch all discounted products
  useEffect(() => {
    const fetchSaleProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          'http://localhost:5000/api/products?limit=100'
        );
        const data = await response.json();
        
        if (data.success) {
          const discountedProducts = data.data
            .filter(p => p.discountPrice > 0 && p.discountPrice < p.regularPrice && p.isActive !== false)
            .sort((a, b) => {
              const discountA = calculateDiscountPercentage(a.regularPrice, a.discountPrice);
              const discountB = calculateDiscountPercentage(b.regularPrice, b.discountPrice);
              return discountB - discountA;
            });
          
          setAllProducts(discountedProducts);
          setProducts(discountedProducts.slice(0, itemsPerPage));
          await checkCartStatus(discountedProducts);
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

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      updateCartStatus();
    };
    
    window.addEventListener('cart-update', handleCartUpdate);
    return () => window.removeEventListener('cart-update', handleCartUpdate);
  }, [updateCartStatus]);

  const handleNext = () => {
    const nextStart = (currentPage + 1) * itemsPerPage;
    if (nextStart < allProducts.length) {
      setCurrentPage(currentPage + 1);
      setProducts(allProducts.slice(nextStart, nextStart + itemsPerPage));
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      const prevStart = (currentPage - 1) * itemsPerPage;
      setCurrentPage(currentPage - 1);
      setProducts(allProducts.slice(prevStart, prevStart + itemsPerPage));
    }
  };

  const goToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
    setProducts(allProducts.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage));
  };

  const onCartStatusChange = useCallback((productId, isInCart) => {
    setProductsInCart(prev => ({
      ...prev,
      [productId]: isInCart
    }));
  }, []);

  const openCartSidebar = () => {
    setIsCartOpen(true);
  };

  const closeCartSidebar = () => {
    setIsCartOpen(false);
  };

  const hasNext = (currentPage + 1) * itemsPerPage < allProducts.length;
  const hasPrev = currentPage > 0;
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);

  const getVisiblePages = () => {
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (isLoading) {
    return (
      <section 
        className="py-10 md:py-14"
        style={{ background: 'linear-gradient(to right, #FFD2DB, #FFFFFF, #FFD2DB)' }}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-[#FFD2DB]/60 rounded mb-2"></div>
            <div className="h-4 w-64 bg-[#FFD2DB]/50 rounded mb-6"></div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl h-36 sm:h-40 w-full border border-[#FFD2DB]/50 flex">
                  <div className="w-20 sm:w-28 bg-[#FFD2DB]/30 rounded-l-xl m-2"></div>
                  <div className="flex-1 p-2 space-y-2">
                    <div className="h-2 w-10 bg-[#FFD2DB]/30 rounded"></div>
                    <div className="h-3 w-16 bg-[#FFD2DB]/30 rounded"></div>
                    <div className="h-2 w-12 bg-[#FFD2DB]/30 rounded"></div>
                    <div className="h-4 w-12 bg-[#FFD2DB]/30 rounded"></div>
                  </div>
                </div>
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
    <>
      <section 
        className="py-6 md:py-6 lg:py-6 overflow-hidden relative"
        style={{ 
          background: 'linear-gradient(to right, #FFD2DB 0%, #FFF5F6 25%, #FFFFFF 50%, #FFF5F6 75%, #FFD2DB 100%)'
        }}
      >
        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#EE4275]/8 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#FFD2DB]/50 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#EE4275]/5 rounded-full blur-3xl"></div>
          {/* Decorative dots pattern */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: 'radial-gradient(circle, #EE4275 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          {/* Section Header - Glow Up ✨ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 md:mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] rounded-full px-3.5 py-1 mb-2.5 shadow-md shadow-[#EE4275]/20">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span className="text-[9px] sm:text-xs font-bold text-white tracking-wider uppercase">Big Sale</span>
                  <Sparkles className="w-3 h-3 text-[#FFD2DB]" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  Glow Up with<span className="text-[#EE4275]"> Big Savings </span>
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base mt-1">
                  Premium skincare, makeup & beauty products at irresistible prices
                </p>
              </div>
            </div>
          </motion.div>

          {/* Products Grid with Navigation Arrows */}
          <div className="relative">
            {/* Left Arrow */}
            {hasPrev && (
              <button
                onClick={handlePrev}
                className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-2.5 border-2 border-[#EE4275]/20 hover:border-[#EE4275] hover:bg-[#EE4275] hover:text-white transition-all duration-300"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            {/* Products Grid - 2 columns on mobile, 4 columns on desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
              <AnimatePresence mode="wait">
                {products.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="h-full"
                  >
                    <SaleProductCard 
                      product={product}
                      isInCart={productsInCart[product._id] || false}
                      onCartStatusChange={onCartStatusChange}
                      onViewInCart={openCartSidebar}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Right Arrow */}
            {hasNext && (
              <button
                onClick={handleNext}
                className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-2.5 border-2 border-[#EE4275]/20 hover:border-[#EE4275] hover:bg-[#EE4275] hover:text-white transition-all duration-300"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-6 md:mt-8">
              <button
                onClick={handlePrev}
                disabled={!hasPrev}
                className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border transition-all ${
                  hasPrev
                    ? 'border-[#EE4275]/30 text-[#EE4275] hover:bg-[#EE4275] hover:text-white hover:border-[#EE4275]'
                    : 'border-gray-200 text-gray-300 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-1">
                {getVisiblePages().map((pageIndex) => (
                  <button
                    key={pageIndex}
                    onClick={() => goToPage(pageIndex)}
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full text-[10px] sm:text-xs font-medium transition-all ${
                      currentPage === pageIndex
                        ? 'bg-[#EE4275] text-white shadow-md shadow-[#EE4275]/25'
                        : 'bg-white/80 text-gray-600 border border-gray-200 hover:border-[#EE4275]/50 hover:text-[#EE4275] hover:bg-white'
                    }`}
                  >
                    {pageIndex + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={!hasNext}
                className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border transition-all ${
                  hasNext
                    ? 'border-[#EE4275]/30 text-[#EE4275] hover:bg-[#EE4275] hover:text-white hover:border-[#EE4275]'
                    : 'border-gray-200 text-gray-300 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />
    </>
  );
}