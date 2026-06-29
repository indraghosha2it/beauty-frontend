

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Link from 'next/link';
import { 
  Search, 
  Grid, 
  List, 
  SlidersHorizontal, 
  X, 
  Filter,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Tag,
  Users,
  DollarSign,
  Sparkles,
  Eye, 
  ShoppingCart,
  ArrowLeft,
  Package,
  TrendingUp,
  Palette,
  Ruler,
  FolderTree,
  Gift,
  Heart,
  Truck,
  Star,
  Clock,
  Zap,
  Building2,
  Box,
  Scale,
  AlertTriangle,
  Flower2
} from 'lucide-react';
import { toast } from 'sonner';
import CartSidebar from '../components/CartSidebar';

// Loading Bar Component
const LoadingBar = ({ isVisible }) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-0.5 bg-gray-200 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="h-full bg-pink-500 animate-loading-bar"></div>
    </div>
  );
};

// Helper functions
const getUnitLabel = (unit) => {
  const units = {
    'pcs': 'pcs',
    'ton': 'ton',
    'other': 'unit'
  };
  return units[unit] || unit;
};

const formatPrice = (price) => {
  return price?.toFixed(2) || '0.00';
};

const truncateText = (text, limit = 20) => {
  if (!text) return '';
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
};

const calculateDiscountPercentage = (regularPrice, discountPrice) => {
  if (regularPrice && discountPrice && discountPrice < regularPrice) {
    return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
  }
  return 0;
};

// Helper function to get tag name safely
const getTagName = (tag) => {
  if (!tag) return '';
  if (typeof tag === 'string') return tag;
  if (typeof tag === 'object' && tag.name) return tag.name;
  return String(tag);
};

// Helper function to get tag image
const getTagImage = (tag) => {
  if (!tag) return null;
  if (typeof tag === 'object' && tag.image && tag.image.url) {
    return tag.image.url;
  }
  if (typeof tag === 'object' && tag.image && typeof tag.image === 'string') {
    return tag.image;
  }
  return null;
};

// Product Grid Card - Beauty Style (Same as Featured Products)
// const ProductGridCard = ({ product, router, onCartStatusChange, isInCart: propIsInCart, onViewInCart }) => {
//   const [isMobile, setIsMobile] = useState(false);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [cartStatusLoading, setCartStatusLoading] = useState(false);
//   const [isInCart, setIsInCart] = useState(propIsInCart || false);

//   const productImages = product.images || [];
//   const hasMultipleImages = productImages.length > 1;
//   const primaryTag = product.tags?.[0];
//   const primaryTagName = getTagName(primaryTag);
//   const tagImage = getTagImage(primaryTag);
//   const discountPercent = calculateDiscountPercentage(product.regularPrice, product.discountPrice);
//   const currentPrice = product.discountPrice && product.discountPrice < product.regularPrice ? product.discountPrice : product.regularPrice;
//   const originalPrice = product.regularPrice;
//   const isOutOfStock = product.stockQuantity <= 0;

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   useEffect(() => {
//     setIsInCart(propIsInCart || false);
//   }, [propIsInCart]);

//   const addToCart = async (e) => {
//     e.stopPropagation();
    
//     if (isInCart) {
//       onViewInCart();
//       return;
//     }
    
//     if (isOutOfStock) {
//       toast.error('Product is out of stock!');
//       return;
//     }
    
//     setCartStatusLoading(true);
//     const toastId = toast.loading('Adding to cart...');
    
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
      
//       const headers = { 'Content-Type': 'application/json' };
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       const response = await fetch('http://localhost:5000/api/cart', {
//         method: 'POST',
//         headers: headers,
//         body: JSON.stringify({ productId: product._id, quantity: 1 })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         if (data.sessionId && !token) {
//           localStorage.setItem('cartSessionId', data.sessionId);
//         }
//         toast.success('Added to cart!', { id: toastId });
//         setIsInCart(true);
//         if (onCartStatusChange) {
//           onCartStatusChange(product._id, true);
//         }
//         window.dispatchEvent(new Event('cart-update'));
//       } else {
//         toast.error(data.error || 'Failed to add to cart', { id: toastId });
//       }
//     } catch (error) {
//       console.error('Add to cart error:', error);
//       toast.error('Network error. Please try again.', { id: toastId });
//     } finally {
//       setCartStatusLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.95 }}
//       transition={{
//         layout: { type: "spring", stiffness: 100, damping: 15 },
//         opacity: { duration: 0.3 }
//       }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       className="group bg-white rounded-xl border border-[#FFD2DB]/40 hover:border-[#EE4275]/50 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-[0_8px_25px_rgba(238,66,117,0.12)] overflow-hidden"
//       onClick={() => {
//         if (isMobile) {
//           window.location.href = `/productDetails?id=${product._id}`;
//         } else {
//           window.open(`/productDetails?id=${product._id}`, '_blank');
//         }
//       }}
//     >
//       {/* Image Container */}
//       <div className="relative w-full h-28 sm:h-36 md:h-40 overflow-hidden bg-gradient-to-br from-[#FFD2DB]/15 to-[#EE4275]/5">
//         <motion.img
//           src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://via.placeholder.com/300?text=Beauty'}
//           alt={product.productName}
//           className="w-full h-full object-contain p-2"
//           whileHover={{ scale: 1.08 }}
//           transition={{ duration: 0.4 }}
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = 'https://via.placeholder.com/300?text=Beauty';
//           }}
//           loading="lazy"
//         />
        
//         {/* Discount Badge */}
//         {discountPercent > 0 && (
//           <div className="absolute top-0.5 left-0.5 m-1 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-[6px] sm:text-[8px] md:text-[9px] font-bold px-1 py-0.5 rounded-md shadow-lg z-20 flex items-center gap-0.5">
//             <Zap className="w-1 h-1 sm:w-1.5 sm:h-1.5" />
//             {discountPercent}% OFF
//           </div>
//         )}
        
//         {/* Tag Badge - Only tag name */}
//         {primaryTagName && (
//           <motion.div 
//             initial={{ x: 10, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.1 }}
//             className="absolute top-0.5 right-0.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-[6px] sm:text-[8px] md:text-[9px] px-1 py-0.5 m-1 font-semibold rounded-md z-20 flex items-center gap-0.5 shadow-lg"
//           >
//             <span className="truncate max-w-[35px] sm:max-w-[50px] md:max-w-[60px]">
//               {primaryTagName}
//             </span>
//           </motion.div>
//         )}
        
//         {/* Desktop Action Icons */}
//         <div className="absolute top-1/2 -translate-y-1/2 right-2 flex flex-col gap-2 z-30">
//           <motion.div
//             initial={{ x: 40, opacity: 0 }}
//             animate={{ 
//               x: !isMobile && isHovered ? 0 : 40, 
//               opacity: !isMobile && isHovered ? 1 : 0 
//             }}
//             transition={{ duration: 0.15, ease: "easeOut" }}
//             onClick={(e) => {
//               e.stopPropagation();
//               window.open(`/productDetails?id=${product._id}`, '_blank');
//             }}
//             className="hidden sm:flex w-7 h-7 rounded-full bg-white shadow-md hover:bg-[#EE4275] items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
//           >
//             <Eye className="w-3.5 h-3.5 text-[#EE4275] hover:text-white transition-colors duration-200" />
//           </motion.div>
          
//           <motion.div
//             initial={{ x: 40, opacity: 0 }}
//             animate={{ 
//               x: !isMobile && isHovered ? 0 : 40, 
//               opacity: !isMobile && isHovered ? 1 : 0 
//             }}
//             transition={{ duration: 0.15, ease: "easeOut", delay: 0.03 }}
//             onClick={addToCart}
//             className="hidden sm:flex w-7 h-7 rounded-full bg-white shadow-md hover:bg-[#EE4275] items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
//           >
//             {cartStatusLoading ? (
//               <Loader2 className="w-3.5 h-3.5 animate-spin text-[#EE4275] hover:text-white" />
//             ) : isInCart ? (
//               <ShoppingCart className="w-3.5 h-3.5 text-green-500" />
//             ) : (
//               <ShoppingCart className="w-3.5 h-3.5 text-[#EE4275] hover:text-white transition-colors duration-200" />
//             )}
//           </motion.div>
//         </div>
        
//         {/* Mobile Action Icons */}
//         <div className={`absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-30 px-2 ${
//           isMobile ? 'flex' : 'hidden'
//         }`}>
//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             onClick={(e) => {
//               e.stopPropagation();
//               window.open(`/productDetails?id=${product._id}`, '_blank');
//             }}
//             className="bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md flex items-center justify-center"
//           >
//             <Eye className="w-2 h-2 text-[#EE4275]" />
//           </motion.button>
          
//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             onClick={addToCart}
//             className="bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md flex items-center justify-center"
//           >
//             {cartStatusLoading ? (
//               <Loader2 className="w-2 h-2 animate-spin text-[#EE4275]" />
//             ) : isInCart ? (
//               <ShoppingCart className="w-2 h-2 text-green-500" />
//             ) : (
//               <ShoppingCart className="w-2 h-2 text-[#EE4275]" />
//             )}
//           </motion.button>
//         </div>
//       </div>
      
//       {/* Thumbnail Images */}
//       {hasMultipleImages && (
//         <div className="flex justify-center items-center gap-1 py-1 bg-[#FFF5F6] border-b border-[#FFD2DB]/30">
//           {productImages.slice(0, 4).map((image, index) => (
//             <button
//               key={index}
//               className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 overflow-hidden rounded transition-all duration-200 ${
//                 activeIndex === index 
//                   ? 'ring-1 ring-[#EE4275] ring-offset-0.5 scale-110' 
//                   : 'opacity-60 hover:opacity-100'
//               }`}
//               onMouseEnter={() => setActiveIndex(index)}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setActiveIndex(index);
//               }}
//             >
//               <img src={image.url} alt="" className="w-full h-full object-cover" />
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Content */}
//       <div className="p-1.5 sm:p-2">
//         <h3 className="text-[10px] sm:text-xs font-semibold text-gray-800 line-clamp-2 hover:text-[#EE4275] transition-colors duration-200 mb-1" style={{ fontFamily: 'Playfair Display, Georgia, serif' }} title={product.productName}>
//           {truncateText(product.productName, 15)}
//         </h3>
        
//         <div className="flex items-center justify-between mb-1">
//           {product.brand && (
//             <div className="inline-flex items-center gap-0.5 px-1 py-0.5 rounded-full text-[6px] sm:text-[8px] font-medium text-[#EE4275] bg-[#FFF5F6] border border-[#FFD2DB]/30">
//               <Building2 className="w-1.5 h-1.5 sm:w-2 sm:h-2" />
//               {product.brand}
//             </div>
//           )}
          
//           {product.rating > 0 && (
//             <div className="flex items-center gap-0.5">
//               <div className="flex items-center">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <Star
//                     key={star}
//                     className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 ${
//                       star <= Math.floor(product.rating)
//                         ? 'fill-[#EE4275] text-[#EE4275]'
//                         : star - 0.5 <= product.rating
//                         ? 'fill-[#EE4275] text-[#EE4275] opacity-50'
//                         : 'text-gray-300'
//                     }`}
//                   />
//                 ))}
//               </div>
//               <span className="text-[6px] sm:text-[8px] text-gray-500">({product.rating})</span>
//             </div>
//           )}
//         </div>

//         <div className="flex items-baseline gap-1 mb-1">
//           <span className="text-xs sm:text-sm font-bold text-[#EE4275]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
//             &#2547;{formatPrice(currentPrice)}
//           </span>
//           {discountPercent > 0 && (
//             <>
//               <span className="text-[6px] sm:text-[8px] text-gray-400 line-through">
//                 &#2547;{formatPrice(originalPrice)}
//               </span>
//               <span className="text-[5px] sm:text-[7px] font-semibold text-white bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] px-0.5 py-0.5 rounded">
//                 -{discountPercent}%
//               </span>
//             </>
//           )}
//         </div>

//         <div className="flex items-center justify-between gap-1">
//           {product.category?.name && (
//             <div className="flex items-center gap-0.5 text-[5px] sm:text-[7px] text-[#8B7A8C]">
//               <Package className="w-1.5 h-1.5 sm:w-2 sm:h-2" />
//               <span className="truncate max-w-[50px] sm:max-w-[70px]">{product.category.name}</span>
//             </div>
//           )}
          
//           {!product.category?.name && (
//             <div className="text-[5px] sm:text-[7px] text-gray-400">&#128132; Beauty</div>
//           )}
          
//           <div className="flex-shrink-0">
//             {product.stockQuantity > 0 ? (
//               <span className="flex items-center gap-0.5 text-[5px] sm:text-[7px] text-green-600 font-medium">
//                 <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-green-500 rounded-full animate-pulse"></div>
//                 <span className="hidden sm:inline">In Stock</span>
//                 <span className="sm:hidden">Stock</span>
//               </span>
//             ) : (
//               <span className="flex items-center gap-0.5 text-[5px] sm:text-[7px] text-red-500 font-medium">
//                 <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-red-500 rounded-full"></div>
//                 <span className="hidden sm:inline">Out of Stock</span>
//                 <span className="sm:hidden">Out</span>
//               </span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Add to Cart / View Cart Button */}
//       <div className="block sm:hidden px-1.5 pb-1.5">
//         {cartStatusLoading ? (
//           <button
//             disabled
//             className="w-full py-1 text-center text-[8px] font-bold bg-gray-300 text-gray-500 rounded-lg flex items-center justify-center gap-1"
//           >
//             <Loader2 className="w-2.5 h-2.5 animate-spin" />
//             Loading...
//           </button>
//         ) : isInCart ? (
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               onViewInCart();
//             }}
//             className="w-full py-1 text-center text-[8px] font-bold bg-gradient-to-r from-[#a80883] to-[#6c0756] text-white hover:from-[#8e066f] hover:to-[#3b032f] rounded-lg flex items-center justify-center gap-1"
//           >
//             <ShoppingCart className="w-2.5 h-2.5" />
//             View Cart
//           </button>
//         ) : (
//           <button
//             onClick={addToCart}
//             className="w-full py-1 text-center text-[8px] font-bold bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-lg flex items-center justify-center gap-1"
//           >
//             <ShoppingCart className="w-2.5 h-2.5" />
//             Add to Cart
//           </button>
//         )}
//       </div>

//       <div className="hidden sm:block">
//         {cartStatusLoading ? (
//           <button
//             disabled
//             className="w-full py-1 text-center text-[7px] sm:text-[9px] font-bold bg-gray-300 text-gray-500 flex items-center justify-center gap-1"
//           >
//             <Loader2 className="w-2 h-2 sm:w-2.5 sm:h-2.5 animate-spin" />
//             Loading...
//           </button>
//         ) : isInCart ? (
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               onViewInCart();
//             }}
//             className="w-full py-1 text-center text-[7px] sm:text-[9px] font-bold bg-gradient-to-r from-[#a80883] to-[#6c0756] text-white hover:from-[#8e066f] hover:to-[#3b032f] transition-all duration-200 flex items-center justify-center gap-1"
//           >
//             <ShoppingCart className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
//             <span className="hidden sm:inline">View in Cart</span>
//             <span className="sm:hidden">Cart</span>
//           </button>
//         ) : (
//           <button
//             onClick={addToCart}
//             className="w-full py-1 text-center text-[7px] sm:text-[9px] font-bold bg-gradient-to-r from-[#ca4f74] to-[#FF6B9D] text-white hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all duration-200 flex items-center justify-center gap-1"
//           >
//             <ShoppingCart className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
//             <span className="hidden sm:inline">Add to Cart</span>
//             <span className="sm:hidden">Add</span>
//           </button>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// Product Grid Card - Beauty Style (Same as Featured Products)
const ProductGridCard = ({ product, router, onCartStatusChange, isInCart: propIsInCart, onViewInCart }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [cartStatusLoading, setCartStatusLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(propIsInCart || false);

  const productImages = product.images || [];
  const hasMultipleImages = productImages.length > 1;
  const primaryTag = product.tags?.[0];
  const primaryTagName = getTagName(primaryTag);
  const tagImage = getTagImage(primaryTag);
  const discountPercent = calculateDiscountPercentage(product.regularPrice, product.discountPrice);
  const currentPrice = product.discountPrice && product.discountPrice < product.regularPrice ? product.discountPrice : product.regularPrice;
  const originalPrice = product.regularPrice;
  const isOutOfStock = product.stockQuantity <= 0;

  // Check if device is mobile (small device)
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsMobileDevice(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setIsInCart(propIsInCart || false);
  }, [propIsInCart]);

  // Handle card click - opens in new tab on desktop, same tab on mobile
  const handleCardClick = () => {
    if (isMobileDevice) {
      // Small device: navigate in same tab
      window.location.href = `/productDetails?id=${product._id}`;
    } else {
      // Large device: open in new tab
      window.open(`/productDetails?id=${product._id}`, '_blank');
    }
  };

  // Handle eye icon click - same behavior as card click
  const handleEyeClick = (e) => {
    e.stopPropagation();
    if (isMobileDevice) {
      // Small device: navigate in same tab
      window.location.href = `/productDetails?id=${product._id}`;
    } else {
      // Large device: open in new tab
      window.open(`/productDetails?id=${product._id}`, '_blank');
    }
  };

  const addToCart = async (e) => {
    e.stopPropagation();
    
    if (isInCart) {
      onViewInCart();
      return;
    }
    
    if (isOutOfStock) {
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
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        layout: { type: "spring", stiffness: 100, damping: 15 },
        opacity: { duration: 0.3 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white rounded-xl border border-[#FFD2DB]/40 hover:border-[#EE4275]/50 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-[0_8px_25px_rgba(238,66,117,0.12)] overflow-hidden"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative w-full h-28 sm:h-36 md:h-40 overflow-hidden bg-gradient-to-br from-[#FFD2DB]/15 to-[#EE4275]/5">
        <motion.img
          src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://via.placeholder.com/300?text=Beauty'}
          alt={product.productName}
          className="w-full h-full object-contain p-2"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300?text=Beauty';
          }}
          loading="lazy"
        />
        
        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-0.5 left-0.5 m-1 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-[6px] sm:text-[8px] md:text-[9px] font-bold px-1 py-0.5 rounded-md shadow-lg z-20 flex items-center gap-0.5">
            <Zap className="w-1 h-1 sm:w-1.5 sm:h-1.5" />
            {discountPercent}% OFF
          </div>
        )}
        
        {/* Tag Badge - Only tag name */}
        {primaryTagName && (
          <motion.div 
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="absolute top-0.5 right-0.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-[6px] sm:text-[8px] md:text-[9px] px-1 py-0.5 m-1 font-semibold rounded-md z-20 flex items-center gap-0.5 shadow-lg"
          >
            <span className="truncate max-w-[35px] sm:max-w-[50px] md:max-w-[60px]">
              {primaryTagName}
            </span>
          </motion.div>
        )}
        
        {/* Desktop Action Icons */}
        <div className="absolute top-1/2 -translate-y-1/2 right-2 flex flex-col gap-2 z-30">
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ 
              x: !isMobileDevice && isHovered ? 0 : 40, 
              opacity: !isMobileDevice && isHovered ? 1 : 0 
            }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onClick={handleEyeClick}
            className="hidden sm:flex w-7 h-7 rounded-full bg-white shadow-md hover:bg-[#EE4275] items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
          >
            <Eye className="w-3.5 h-3.5 text-[#EE4275] hover:text-white transition-colors duration-200" />
          </motion.div>
          
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ 
              x: !isMobileDevice && isHovered ? 0 : 40, 
              opacity: !isMobileDevice && isHovered ? 1 : 0 
            }}
            transition={{ duration: 0.15, ease: "easeOut", delay: 0.03 }}
            onClick={addToCart}
            className="hidden sm:flex w-7 h-7 rounded-full bg-white shadow-md hover:bg-[#EE4275] items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
          >
            {cartStatusLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#EE4275] hover:text-white" />
            ) : isInCart ? (
              <ShoppingCart className="w-3.5 h-3.5 text-green-500" />
            ) : (
              <ShoppingCart className="w-3.5 h-3.5 text-[#EE4275] hover:text-white transition-colors duration-200" />
            )}
          </motion.div>
        </div>
        
        {/* Mobile Action Icons */}
        <div className={`absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-30 px-2 ${
          isMobileDevice ? 'flex' : 'hidden'
        }`}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleEyeClick}
            className="bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md flex items-center justify-center"
          >
            <Eye className="w-2 h-2 text-[#EE4275]" />
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={addToCart}
            className="bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md flex items-center justify-center"
          >
            {cartStatusLoading ? (
              <Loader2 className="w-2 h-2 animate-spin text-[#EE4275]" />
            ) : isInCart ? (
              <ShoppingCart className="w-2 h-2 text-green-500" />
            ) : (
              <ShoppingCart className="w-2 h-2 text-[#EE4275]" />
            )}
          </motion.button>
        </div>
      </div>
      
      {/* Thumbnail Images */}
      {hasMultipleImages && (
        <div className="flex justify-center items-center gap-1 py-1 bg-[#FFF5F6] border-b border-[#FFD2DB]/30">
          {productImages.slice(0, 4).map((image, index) => (
            <button
              key={index}
              className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 overflow-hidden rounded transition-all duration-200 ${
                activeIndex === index 
                  ? 'ring-1 ring-[#EE4275] ring-offset-0.5 scale-110' 
                  : 'opacity-60 hover:opacity-100'
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(index);
              }}
            >
              <img src={image.url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="p-1.5 sm:p-2">
        <h3 className="text-[10px] sm:text-xs font-semibold text-gray-800 line-clamp-2 hover:text-[#EE4275] transition-colors duration-200 mb-1" style={{ fontFamily: 'Playfair Display, Georgia, serif' }} title={product.productName}>
          {truncateText(product.productName, 15)}
        </h3>
        
        <div className="flex items-center justify-between mb-1">
          {product.brand && (
            <div className="inline-flex items-center gap-0.5 px-1 py-0.5 rounded-full text-[6px] sm:text-[8px] font-medium text-[#EE4275] bg-[#FFF5F6] border border-[#FFD2DB]/30">
              <Building2 className="w-1.5 h-1.5 sm:w-2 sm:h-2" />
              {product.brand}
            </div>
          )}
          
          {product.rating > 0 && (
            <div className="flex items-center gap-0.5">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 ${
                      star <= Math.floor(product.rating)
                        ? 'fill-[#EE4275] text-[#EE4275]'
                        : star - 0.5 <= product.rating
                        ? 'fill-[#EE4275] text-[#EE4275] opacity-50'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[6px] sm:text-[8px] text-gray-500">({product.rating})</span>
            </div>
          )}
        </div>

        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-xs sm:text-sm font-bold text-[#EE4275]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            &#2547;{formatPrice(currentPrice)}
          </span>
          {discountPercent > 0 && (
            <>
              <span className="text-[6px] sm:text-[8px] text-gray-400 line-through">
                &#2547;{formatPrice(originalPrice)}
              </span>
              <span className="text-[5px] sm:text-[7px] font-semibold text-white bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] px-0.5 py-0.5 rounded">
                -{discountPercent}%
              </span>
            </>
          )}
        </div>

        <div className="flex items-center justify-between gap-1">
          {product.category?.name && (
            <div className="flex items-center gap-0.5 text-[5px] sm:text-[7px] text-[#8B7A8C]">
              <Package className="w-1.5 h-1.5 sm:w-2 sm:h-2" />
              <span className="truncate max-w-[50px] sm:max-w-[70px]">{product.category.name}</span>
            </div>
          )}
          
          {!product.category?.name && (
            <div className="text-[5px] sm:text-[7px] text-gray-400">✨ Beauty</div>
          )}
          
          <div className="flex-shrink-0">
            {product.stockQuantity > 0 ? (
              <span className="flex items-center gap-0.5 text-[5px] sm:text-[7px] text-green-600 font-medium">
                <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-green-500 rounded-full animate-pulse"></div>
                <span className="hidden sm:inline">In Stock</span>
                <span className="sm:hidden">Stock</span>
              </span>
            ) : (
              <span className="flex items-center gap-0.5 text-[5px] sm:text-[7px] text-red-500 font-medium">
                <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-red-500 rounded-full"></div>
                <span className="hidden sm:inline">Out of Stock</span>
                <span className="sm:hidden">Out</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Add to Cart / View Cart Button */}
      <div className="block sm:hidden px-1.5 pb-1.5">
        {cartStatusLoading ? (
          <button
            disabled
            className="w-full py-1 text-center text-[8px] font-bold bg-gray-300 text-gray-500 rounded-lg flex items-center justify-center gap-1"
          >
            <Loader2 className="w-2.5 h-2.5 animate-spin" />
            Loading...
          </button>
        ) : isInCart ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewInCart();
            }}
            className="w-full py-1 text-center text-[8px] font-bold bg-gradient-to-r from-[#a80883] to-[#6c0756] text-white hover:from-[#8e066f] hover:to-[#3b032f] rounded-lg flex items-center justify-center gap-1"
          >
            <ShoppingCart className="w-2.5 h-2.5" />
            View Cart
          </button>
        ) : (
          <button
            onClick={addToCart}
            className="w-full py-1 text-center text-[8px] font-bold bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-lg flex items-center justify-center gap-1"
          >
            <ShoppingCart className="w-2.5 h-2.5" />
            Add to Cart
          </button>
        )}
      </div>

      <div className="hidden sm:block">
        {cartStatusLoading ? (
          <button
            disabled
            className="w-full py-1 text-center text-[7px] sm:text-[9px] font-bold bg-gray-300 text-gray-500 flex items-center justify-center gap-1"
          >
            <Loader2 className="w-2 h-2 sm:w-2.5 sm:h-2.5 animate-spin" />
            Loading...
          </button>
        ) : isInCart ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewInCart();
            }}
            className="w-full py-1 text-center text-[7px] sm:text-[9px] font-bold bg-gradient-to-r from-[#a80883] to-[#6c0756] text-white hover:from-[#8e066f] hover:to-[#3b032f] transition-all duration-200 flex items-center justify-center gap-1"
          >
            <ShoppingCart className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
            <span className="hidden sm:inline">View in Cart</span>
            <span className="sm:hidden">Cart</span>
          </button>
        ) : (
          <button
            onClick={addToCart}
            className="w-full py-1 text-center text-[7px] sm:text-[9px] font-bold bg-gradient-to-r from-[#ca4f74] to-[#FF6B9D] text-white hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all duration-200 flex items-center justify-center gap-1"
          >
            <ShoppingCart className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
            <span className="hidden sm:inline">Add to Cart</span>
            <span className="sm:hidden">Add</span>
          </button>
        )}
      </div>
    </motion.div>
  );
};

// Product List Card - Beauty Style
const ProductListCard = ({ product, router, onCartStatusChange, isInCart: propIsInCart, onViewInCart }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cartStatusLoading, setCartStatusLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(propIsInCart || false);

  const productImages = product.images || [];
  const hasMultipleImages = productImages.length > 1;
  const primaryTag = product.tags?.[0];
  const primaryTagName = getTagName(primaryTag);
  const discountPercent = calculateDiscountPercentage(product.regularPrice, product.discountPrice);
  const currentPrice = product.discountPrice && product.discountPrice < product.regularPrice ? product.discountPrice : product.regularPrice;
  const originalPrice = product.regularPrice;
  const isOutOfStock = product.stockQuantity <= 0;

  useEffect(() => {
    setIsInCart(propIsInCart || false);
  }, [propIsInCart]);

  const addToCart = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (isInCart) {
      onViewInCart();
      return;
    }
    
    if (isOutOfStock) {
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
    <Link
      href={`/productDetails?id=${product._id}`}
      className="block group bg-white rounded-xl border border-[#FFD2DB]/40 hover:border-[#EE4275]/50 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-[0_8px_25px_rgba(238,66,117,0.12)] overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image Section */}
        <div className="sm:w-32 relative">
          <div className="relative h-32 overflow-hidden bg-gradient-to-br from-[#FFD2DB]/15 to-[#EE4275]/5">
            <img
              src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://via.placeholder.com/150?text=Beauty'}
              alt={product.productName}
              className="w-full h-full object-contain p-2"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/150?text=Beauty';
              }}
              loading="lazy"
            />
            
            {discountPercent > 0 && (
              <div className="absolute top-1 left-1 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow-lg z-20 flex items-center gap-0.5">
                <Zap className="w-2 h-2" />
                {discountPercent}%
              </div>
            )}
            
            {primaryTagName && (
              <div className="absolute top-1 right-1 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-[7px] px-1.5 py-0.5 rounded shadow-lg z-20 font-semibold">
                {primaryTagName}
              </div>
            )}
            
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
                <span className="bg-black text-white text-[10px] font-medium px-1.5 py-0.5">Out of Stock</span>
              </div>
            )}
          </div>
          
          {/* Thumbnails */}
          {hasMultipleImages && (
            <div className="flex justify-center gap-0.5 py-1 bg-[#FFF5F6]">
              {productImages.slice(0, 4).map((image, idx) => (
                <div
                  key={idx}
                  className={`w-5 h-5 overflow-hidden cursor-pointer transition-all ${
                    activeIndex === idx ? 'ring-1 ring-[#EE4275]' : 'opacity-60 hover:opacity-100'
                  }`}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setActiveIndex(idx);
                  }}
                >
                  <img src={image.url} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 p-3">
          {/* Product Name */}
          <h3 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-1" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            {product.productName}
          </h3>
          
          {/* Brand */}
          {product.brand && (
            <div className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[8px] font-medium text-[#EE4275] bg-[#FFF5F6] border border-[#FFD2DB]/30 mb-1">
              <Building2 className="w-2 h-2" />
              {product.brand}
            </div>
          )}
          
          {/* Description */}
          <p className="text-[10px] text-gray-500 mb-2 line-clamp-2">
            {product.fullDescription?.replace(/<[^>]*>/g, '').substring(0, 100) || product.shortDescription?.replace(/<[^>]*>/g, '').substring(0, 100) || 'No description available'}
          </p>
          
          {/* Price and Discount */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-bold text-[#EE4275]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                ৳{formatPrice(currentPrice)}
              </span>
              {discountPercent > 0 && (
                <>
                  <span className="text-[9px] text-gray-400 line-through">৳{formatPrice(originalPrice)}</span>
                  <span className="text-[8px] font-semibold text-white bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] px-1 py-0.5 rounded">-{discountPercent}%</span>
                </>
              )}
              <span className="text-[9px] text-gray-500">/{getUnitLabel(product.unit)}</span>
            </div>
          </div>
          
          {/* Stock Status and Rating */}
          <div className="flex flex-wrap items-center gap-3 mb-3">
            {isOutOfStock ? (
              <span className="inline-flex items-center gap-1 text-red-500 text-[9px] font-medium">
                <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                Out of Stock
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-green-600 text-[9px] font-medium">
                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                In Stock ({product.stockQuantity})
              </span>
            )}
            
            {product.rating > 0 && (
              <div className="flex items-center gap-1">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`w-2.5 h-2.5 ${star <= Math.floor(product.rating) ? 'fill-[#EE4275] text-[#EE4275]' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-[8px] text-gray-500">({product.rating})</span>
              </div>
            )}
          </div>
          
          {/* Add to Cart / View in Cart Button */}
          <button
            onClick={addToCart}
            disabled={isOutOfStock}
            className={`w-full sm:w-auto px-4 py-1.5 text-[10px] font-medium transition-all rounded-lg flex items-center justify-center gap-1 ${
              isOutOfStock ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : isInCart ? 'bg-gradient-to-r from-[#a80883] to-[#6c0756] text-white hover:from-[#8e066f] hover:to-[#3b032f]' : 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white hover:shadow-lg hover:shadow-[#EE4275]/25'
            }`}
          >
            {cartStatusLoading ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : isInCart ? (
              <>
                <ShoppingCart className="w-3 h-3" />
                View in Cart
              </>
            ) : (
              <>
                <ShoppingCart className="w-3 h-3" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
};

// Filter Sidebar Component - Beauty Styled
const FilterSidebar = ({ 
  expandedSections, 
  toggleSection, 
  categories, 
  subcategories,
  childSubcategories,
  brands,
  filters, 
  handleCategoryChange, 
  handleRemoveCategory,
  handleSubcategoryChange,
  handleRemoveSubcategory,
  handleChildSubcategoryChange,
  handleRemoveChildSubcategory,
  handleBrandChange,
  handleRemoveBrand,
  handleUnitChange,
  handleRemoveUnit,
  minPriceInput,
  maxPriceInput,
  setMinPriceInput,
  setMaxPriceInput,
  applyPriceRange,
  clearPriceRange,
  getActiveFilterCount,
  clearFilters,
  selectedCategory,
  selectedSubcategory,
  showChildSubcategory,
  availableUnits,      
  unitsLoading   
}) => (
  <div className="bg-white border border-[#FFD2DB]/40 rounded-xl p-4 sticky top-24 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-base font-semibold text-[#2D1B2E] flex items-center gap-2">
        <Filter className="w-4 h-4 text-[#EE4275]" />
        Filters
      </h3>
      {getActiveFilterCount() > 0 && (
        <button onClick={clearFilters} className="text-[11px] text-[#EE4275] hover:text-[#ca4f74]">
          Clear All ({getActiveFilterCount()})
        </button>
      )}
    </div>

    {/* Price Range */}
    <div className="mb-4 border-b border-[#FFD2DB]/30 pb-4">
      <button onClick={() => toggleSection('price')} className="flex items-center justify-between w-full text-left mb-3">
        <h4 className="font-medium text-sm text-[#2D1B2E] flex items-center gap-2">
          <DollarSign className="w-3.5 h-3.5 text-[#EE4275]" />
          Price Range
        </h4>
        {expandedSections.price ? <ChevronUp className="w-3.5 h-3.5 text-gray-500" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-500" />}
      </button>
      
      {expandedSections.price && (
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Min (৳)</span>
              <input
                type="text"
                inputMode="decimal"
                value={minPriceInput}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^\d*\.?\d*$/.test(value)) setMinPriceInput(value);
                }}
                placeholder="0"
                className="w-24 px-2 py-1 text-right text-xs border border-[#FFD2DB]/40 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#EE4275]"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Max (৳)</span>
              <input
                type="text"
                inputMode="decimal"
                value={maxPriceInput}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^\d*\.?\d*$/.test(value)) setMaxPriceInput(value);
                }}
                placeholder="Any"
                className="w-24 px-2 py-1 text-right text-xs border border-[#FFD2DB]/40 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#EE4275]"
              />
            </div>
          </div>
          
          <button
            onClick={applyPriceRange}
            disabled={!minPriceInput && !maxPriceInput}
            className="w-full py-1.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-xs font-medium rounded-lg hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Apply Price Range
          </button>

          {(filters.priceRange.min || filters.priceRange.max) && (
            <div className="flex items-center justify-between bg-[#FFF5F6] p-2 rounded-lg border border-[#FFD2DB]/30">
              <span className="text-xs font-medium text-[#EE4275]">৳{filters.priceRange.min || '0'} - ৳{filters.priceRange.max || '∞'}</span>
              <button onClick={clearPriceRange} className="text-gray-400 hover:text-gray-600"><X className="w-3 h-3" /></button>
            </div>
          )}
        </div>
      )}
    </div>

    {/* Categories */}
    <div className="mb-4 border-b border-[#FFD2DB]/30 pb-4">
      <button onClick={() => toggleSection('categories')} className="flex items-center justify-between w-full text-left mb-3">
        <h4 className="font-medium text-sm text-[#2D1B2E] flex items-center gap-2">
          <Tag className="w-3.5 h-3.5 text-[#EE4275]" />
          Categories
        </h4>
        {expandedSections.categories ? <ChevronUp className="w-3.5 h-3.5 text-gray-500" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-500" />}
      </button>
      
      {expandedSections.categories && (
        <div className="space-y-2">
          {filters.categories.length > 0 && (
            <div className="mb-2 p-2 bg-[#FFF5F6] rounded-lg border border-[#FFD2DB]/30">
              <p className="text-[10px] text-gray-500 mb-1.5">Selected Categories:</p>
              {filters.categories.map(catId => {
                const category = categories.find(c => c._id === catId);
                return category ? (
                  <div key={catId} className="flex items-center justify-between py-1">
                    <span className="text-xs text-[#2D1B2E]">{category.name}</span>
                    <button onClick={() => handleRemoveCategory(catId)} className="text-gray-400 hover:text-gray-600"><X className="w-3 h-3" /></button>
                  </div>
                ) : null;
              })}
            </div>
          )}
          
          <div className="max-h-48 overflow-y-auto pr-1 space-y-1.5">
            {categories.map(category => (
              <label key={category._id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category._id)}
                  onChange={() => handleCategoryChange(category._id)}
                  className="w-3.5 h-3.5 rounded border-[#FFD2DB]/40 text-[#EE4275] focus:ring-[#EE4275]"
                />
                <span className="text-xs text-gray-700 hover:text-[#EE4275] transition-colors">{category.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* Subcategories */}
    {selectedCategory && subcategories.length > 0 && (
      <div className="mb-4 border-b border-[#FFD2DB]/30 pb-4">
        <button onClick={() => toggleSection('subcategories')} className="flex items-center justify-between w-full text-left mb-3">
          <h4 className="font-medium text-sm text-[#2D1B2E] flex items-center gap-2">
            <FolderTree className="w-3.5 h-3.5 text-[#EE4275]" />
            Subcategories
          </h4>
          {expandedSections.subcategories ? <ChevronUp className="w-3.5 h-3.5 text-gray-500" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-500" />}
        </button>
        
        {expandedSections.subcategories && (
          <div className="space-y-2">
            {filters.subcategories.length > 0 && (
              <div className="mb-2 p-2 bg-[#FFF5F6] rounded-lg border border-[#FFD2DB]/30">
                <p className="text-[10px] text-gray-500 mb-1.5">Selected Subcategories:</p>
                {filters.subcategories.map(subId => {
                  const subcategory = subcategories.find(s => s._id === subId);
                  return subcategory ? (
                    <div key={subId} className="flex items-center justify-between py-1">
                      <span className="text-xs text-[#2D1B2E]">{subcategory.name}</span>
                      <button onClick={() => handleRemoveSubcategory(subId)} className="text-gray-400 hover:text-gray-600"><X className="w-3 h-3" /></button>
                    </div>
                  ) : null;
                })}
              </div>
            )}
            
            <div className="max-h-48 overflow-y-auto pr-1 space-y-1.5">
              {subcategories.map(sub => (
                <label key={sub._id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.subcategories.includes(sub._id)}
                    onChange={() => handleSubcategoryChange(sub._id)}
                    className="w-3.5 h-3.5 rounded border-[#FFD2DB]/40 text-[#EE4275] focus:ring-[#EE4275]"
                  />
                  <span className="text-xs text-gray-700 hover:text-[#EE4275] transition-colors">{sub.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    )}

    {/* Child Subcategories */}
    {showChildSubcategory && childSubcategories.length > 0 && (
      <div className="mb-4 border-b border-[#FFD2DB]/30 pb-4">
        <button onClick={() => toggleSection('childSubcategories')} className="flex items-center justify-between w-full text-left mb-3">
          <h4 className="font-medium text-sm text-[#2D1B2E] flex items-center gap-2">
            <FolderTree className="w-3.5 h-3.5 text-[#EE4275]" />
            Child Subcategories
          </h4>
          {expandedSections.childSubcategories ? <ChevronUp className="w-3.5 h-3.5 text-gray-500" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-500" />}
        </button>
        
        {expandedSections.childSubcategories && (
          <div className="space-y-2">
            {filters.childSubcategories.length > 0 && (
              <div className="mb-2 p-2 bg-[#FFF5F6] rounded-lg border border-[#FFD2DB]/30">
                <p className="text-[10px] text-gray-500 mb-1.5">Selected Child Subcategories:</p>
                {filters.childSubcategories.map(childId => {
                  const child = childSubcategories.find(c => c._id === childId);
                  return child ? (
                    <div key={childId} className="flex items-center justify-between py-1">
                      <span className="text-xs text-[#2D1B2E]">{child.name}</span>
                      <button onClick={() => handleRemoveChildSubcategory(childId)} className="text-gray-400 hover:text-gray-600"><X className="w-3 h-3" /></button>
                    </div>
                  ) : null;
                })}
              </div>
            )}
            
            <div className="max-h-48 overflow-y-auto pr-1 space-y-1.5">
              {childSubcategories.map(child => (
                <label key={child._id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.childSubcategories.includes(child._id)}
                    onChange={() => handleChildSubcategoryChange(child._id)}
                    className="w-3.5 h-3.5 rounded border-[#FFD2DB]/40 text-[#EE4275] focus:ring-[#EE4275]"
                  />
                  <span className="text-xs text-gray-700 hover:text-[#EE4275] transition-colors">{child.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    )}

    {/* Brands */}
    <div className="mb-4 border-b border-[#FFD2DB]/30 pb-4">
      <button onClick={() => toggleSection('brands')} className="flex items-center justify-between w-full text-left mb-3">
        <h4 className="font-medium text-sm text-[#2D1B2E] flex items-center gap-2">
          <Building2 className="w-3.5 h-3.5 text-[#EE4275]" />
          Brands
        </h4>
        {expandedSections.brands ? <ChevronUp className="w-3.5 h-3.5 text-gray-500" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-500" />}
      </button>
      
      {expandedSections.brands && (
        <div className="space-y-2">
          {filters.brands.length > 0 && (
            <div className="mb-2 p-2 bg-[#FFF5F6] rounded-lg border border-[#FFD2DB]/30">
              <p className="text-[10px] text-gray-500 mb-1.5">Selected Brands:</p>
              {filters.brands.map(brand => (
                <div key={brand} className="flex items-center justify-between py-1">
                  <span className="text-xs text-[#2D1B2E]">{brand}</span>
                  <button onClick={() => handleRemoveBrand(brand)} className="text-gray-400 hover:text-gray-600"><X className="w-3 h-3" /></button>
                </div>
              ))}
            </div>
          )}
          
          <div className="max-h-48 overflow-y-auto pr-1 space-y-1.5">
            {brands.map(brand => (
              <label key={brand._id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand.name)}
                  onChange={() => handleBrandChange(brand.name)}
                  className="w-3.5 h-3.5 rounded border-[#FFD2DB]/40 text-[#EE4275] focus:ring-[#EE4275]"
                />
                <span className="text-xs text-gray-700 hover:text-[#EE4275] transition-colors">{brand.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* Unit Filter */}
    <div className="mb-4">
      <button onClick={() => toggleSection('unit')} className="flex items-center justify-between w-full text-left mb-3">
        <h4 className="font-medium text-sm text-[#2D1B2E] flex items-center gap-2">
          <Scale className="w-3.5 h-3.5 text-[#EE4275]" />
          Unit
        </h4>
        {expandedSections.unit ? <ChevronUp className="w-3.5 h-3.5 text-gray-500" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-500" />}
      </button>
      
      {expandedSections.unit && (
        <div className="space-y-2">
          {filters.units.length > 0 && (
            <div className="mb-2 p-2 bg-[#FFF5F6] rounded-lg border border-[#FFD2DB]/30">
              <p className="text-[10px] text-gray-500 mb-1.5">Selected Units:</p>
              {filters.units.map(unit => {
                const unitLabel = availableUnits.find(u => u.value === unit)?.label || unit;
                return (
                  <div key={unit} className="flex items-center justify-between py-1">
                    <span className="text-xs text-[#2D1B2E]">{unitLabel}</span>
                    <button onClick={() => handleRemoveUnit(unit)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
          
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {availableUnits.length === 0 ? (
              <p className="text-xs text-gray-500">No units available</p>
            ) : (
              availableUnits.map(unit => (
                <label key={unit.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.units.includes(unit.value)}
                    onChange={() => handleUnitChange(unit.value)}
                    className="w-3.5 h-3.5 rounded border-[#FFD2DB]/40 text-[#EE4275] focus:ring-[#EE4275]"
                  />
                  <span className="text-xs text-gray-700 hover:text-[#EE4275] transition-colors">
                    {unit.label}
                  </span>
                </label>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  </div>
);

export default function ProductsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  const [childSubcategories, setChildSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [showChildSubcategory, setShowChildSubcategory] = useState(false);
  const [productsInCart, setProductsInCart] = useState({});
  const [forceFetch, setForceFetch] = useState(0);
  const [brands, setBrands] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [availableUnits, setAvailableUnits] = useState([]);
  const [unitsLoading, setUnitsLoading] = useState(true);
  
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    categories: true,
    subcategories: true,
    childSubcategories: true,
    brands: true,
    unit: true
  });

  const productsContainerRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const searchTimerRef = useRef(null);

  const [filters, setFilters] = useState({
    search: '',
    categories: [],
    subcategories: [],
    childSubcategories: [],
    brands: [],
    units: [],
    priceRange: { min: '', max: '' },
    sortBy: 'newest'
  });

  const [searchInput, setSearchInput] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [minPriceInput, setMinPriceInput] = useState('');
  const [maxPriceInput, setMaxPriceInput] = useState('');
  const [initialCategorySet, setInitialCategorySet] = useState(false);

  // Functions to open/close cart sidebar
  const openCartSidebar = () => {
    setIsCartOpen(true);
  };

  const closeCartSidebar = () => {
    setIsCartOpen(false);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const saveScrollPosition = () => {
    scrollPositionRef.current = window.scrollY;
  };

  const restoreScrollPosition = () => {
    if (scrollPositionRef.current > 0) {
      window.scrollTo({ top: scrollPositionRef.current, behavior: 'instant' });
    }
  };

  const debouncedSearch = useCallback((searchValue) => {
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      saveScrollPosition();
      setFilters(prev => ({ ...prev, search: searchValue }));
      setCurrentPage(1);
    }, 500);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSearch(value);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    saveScrollPosition();
    setFilters(prev => ({ ...prev, search: '' }));
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products/units/all');
        const data = await response.json();
        if (data.success) {
          setAvailableUnits(data.data);
        }
      } catch (error) {
        console.error('Error fetching units:', error);
      } finally {
        setUnitsLoading(false);
      }
    };
    fetchUnits();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/brands');
      const data = await response.json();
      if (data.success) setBrands(data.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  useEffect(() => {
    if (categories.length > 0 && !initialCategorySet) {
      const categoryParam = searchParams.get('category');
      if (categoryParam && categories.some(cat => cat._id === categoryParam)) {
        setFilters(prev => ({ ...prev, categories: [categoryParam] }));
      }
      setInitialCategorySet(true);
    }
  }, [categories, searchParams]);

  useEffect(() => {
    if (filters.categories.length === 1) {
      const categoryId = filters.categories[0];
      setSelectedCategory(categoryId);
      fetchSubcategories(categoryId);
    } else {
      setSubcategories([]);
      setSelectedCategory(null);
      setChildSubcategories([]);
      setSelectedSubcategory(null);
      setShowChildSubcategory(false);
      if (filters.subcategories.length > 0) setFilters(prev => ({ ...prev, subcategories: [] }));
      if (filters.childSubcategories.length > 0) setFilters(prev => ({ ...prev, childSubcategories: [] }));
    }
  }, [filters.categories]);

  useEffect(() => {
    if (filters.subcategories.length === 1 && selectedCategory) {
      const subcategoryId = filters.subcategories[0];
      setSelectedSubcategory(subcategoryId);
      fetchChildSubcategories(selectedCategory, subcategoryId);
    } else {
      setChildSubcategories([]);
      setSelectedSubcategory(null);
      setShowChildSubcategory(false);
      if (filters.childSubcategories.length > 0) setFilters(prev => ({ ...prev, childSubcategories: [] }));
    }
  }, [filters.subcategories, selectedCategory]);

  useEffect(() => {
    if (initialCategorySet) fetchProducts();
  }, [filters.categories, filters.subcategories, filters.childSubcategories, filters.brands, filters.units, filters.priceRange, filters.search, filters.sortBy, currentPage, initialCategorySet, forceFetch]);

  useEffect(() => {
    if (!loading) restoreScrollPosition();
  }, [loading]);

  useEffect(() => {
    const checkAllProductsCartStatus = async () => {
      if (products.length === 0) return;
      const productIds = products.map(p => p._id);
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      else if (sessionId) headers['x-session-id'] = sessionId;
      
      try {
        const response = await fetch('http://localhost:5000/api/cart/check-status', {
          method: 'POST',
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify({ productIds })
        });
        const data = await response.json();
        if (data.success) setProductsInCart(data.data);
      } catch (error) { console.error('Error checking cart status:', error); }
    };
    checkAllProductsCartStatus();
  }, [products]);

  useEffect(() => {
    const refreshCartStatus = async () => {
      if (products.length === 0) return;
      const productIds = products.map(p => p._id);
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      else if (sessionId) headers['x-session-id'] = sessionId;
      
      try {
        const response = await fetch('http://localhost:5000/api/cart/check-status', {
          method: 'POST',
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify({ productIds })
        });
        const data = await response.json();
        if (data.success) setProductsInCart(data.data);
      } catch (error) { console.error('Error refreshing cart status:', error); }
    };
    const handleCartUpdate = () => refreshCartStatus();
    window.addEventListener('cart-update', handleCartUpdate);
    return () => window.removeEventListener('cart-update', handleCartUpdate);
  }, [products]);

  useEffect(() => {
    const handleCategoryFilterChange = (event) => {
      const categoryId = event.detail?.categoryId;
      if (categoryId) {
        saveScrollPosition();
        setFilters(prev => ({ ...prev, categories: [categoryId], subcategories: [], childSubcategories: [] }));
        setCurrentPage(1);
        setForceFetch(prev => prev + 1);
        const url = new URL(window.location.href);
        url.searchParams.set('category', categoryId);
        window.history.pushState({}, '', url);
      } else if (event.detail?.categoryId === null) {
        saveScrollPosition();
        setFilters(prev => ({ ...prev, categories: [], subcategories: [], childSubcategories: [] }));
        setCurrentPage(1);
        setForceFetch(prev => prev + 1);
        const url = new URL(window.location.href);
        url.searchParams.delete('category');
        window.history.pushState({}, '', url);
      }
    };
    window.addEventListener('categoryFilterChanged', handleCategoryFilterChange);
    return () => window.removeEventListener('categoryFilterChanged', handleCategoryFilterChange);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const categoryParam = new URLSearchParams(window.location.search).get('category');
      if (categoryParam) setFilters(prev => ({ ...prev, categories: [categoryParam], subcategories: [], childSubcategories: [] }));
      else setFilters(prev => ({ ...prev, categories: [], subcategories: [], childSubcategories: [] }));
      setCurrentPage(1);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const data = await response.json();
      if (data.success) setCategories(data.data);
      setCategoriesLoaded(true);
    } catch (error) { console.error('Error fetching categories:', error); setCategoriesLoaded(true); }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories`);
      const data = await response.json();
      if (data.success && Array.isArray(data.data.subcategories)) {
        setSubcategories(data.data.subcategories);
        return data.data.subcategories;
      } else {
        setSubcategories([]);
        return [];
      }
    } catch (error) { console.error('Error fetching subcategories:', error); setSubcategories([]); return []; }
  };

  const fetchChildSubcategories = async (categoryId, subcategoryId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories/${subcategoryId}/children`);
      const data = await response.json();
      if (data.success && Array.isArray(data.data.children)) {
        setChildSubcategories(data.data.children);
        setShowChildSubcategory(data.data.children.length > 0);
        return data.data.children;
      } else {
        setChildSubcategories([]);
        setShowChildSubcategory(false);
        return [];
      }
    } catch (error) { console.error('Error fetching child subcategories:', error); setChildSubcategories([]); setShowChildSubcategory(false); return []; }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', currentPage);
      queryParams.append('limit', 12);
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.categories.length > 0) filters.categories.forEach(cat => queryParams.append('category', cat));
      if (filters.subcategories.length > 0) filters.subcategories.forEach(sub => queryParams.append('subcategory', sub));
      if (filters.childSubcategories.length > 0) filters.childSubcategories.forEach(child => queryParams.append('childSubcategory', child));
      if (filters.brands.length > 0) filters.brands.forEach(brand => queryParams.append('brand', brand));
      if (filters.units.length > 0) filters.units.forEach(unit => queryParams.append('unit', unit));
      if (filters.priceRange.min) queryParams.append('minPrice', filters.priceRange.min);
      if (filters.priceRange.max) queryParams.append('maxPrice', filters.priceRange.max);
      
      let sortParam = '-createdAt';
      switch (filters.sortBy) {
        case 'price_low': sortParam = 'price_asc'; break;
        case 'price_high': sortParam = 'price_desc'; break;
        case 'name_asc': sortParam = 'name_asc'; break;
        default: sortParam = 'newest';
      }
      queryParams.append('sort', sortParam);

      const response = await fetch(`http://localhost:5000/api/products?${queryParams.toString()}`);
      const data = await response.json();
      if (data.success) {
        setProducts(data.data || []);
        setTotalPages(data.pagination?.pages || 1);
        setTotalProducts(data.pagination?.total || 0);
      }
    } catch (error) { console.error('Error fetching products:', error); } finally { setLoading(false); }
  };

  const handleCategoryChange = (categoryId) => {
    saveScrollPosition();
    setFilters(prev => {
      const newCategories = prev.categories.includes(categoryId) ? prev.categories.filter(id => id !== categoryId) : [...prev.categories, categoryId];
      return { ...prev, categories: newCategories, subcategories: [], childSubcategories: [] };
    });
    setCurrentPage(1);
    
    const isSelected = !filters.categories.includes(categoryId);
    const newCategory = isSelected ? categoryId : null;
    const params = new URLSearchParams(window.location.search);
    if (newCategory) params.set('category', newCategory);
    else params.delete('category');
    window.history.pushState({}, '', `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`);
    window.dispatchEvent(new CustomEvent('categoryFilterChanged', { detail: { categoryId: newCategory } }));
  };

  const handleRemoveCategory = (categoryId) => {
    saveScrollPosition();
    setFilters(prev => ({ ...prev, categories: prev.categories.filter(id => id !== categoryId), subcategories: [], childSubcategories: [] }));
    setCurrentPage(1);
    const params = new URLSearchParams(window.location.search);
    params.delete('category');
    window.history.pushState({}, '', `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`);
    window.dispatchEvent(new CustomEvent('categoryFilterChanged', { detail: { categoryId: null } }));
  };

  const handleSubcategoryChange = (subcategoryId) => {
    saveScrollPosition();
    setFilters(prev => {
      const newSubcategories = prev.subcategories.includes(subcategoryId) ? prev.subcategories.filter(id => id !== subcategoryId) : [...prev.subcategories, subcategoryId];
      return { ...prev, subcategories: newSubcategories, childSubcategories: [] };
    });
    setCurrentPage(1);
  };

  const handleRemoveSubcategory = (subcategoryId) => {
    saveScrollPosition();
    setFilters(prev => ({ ...prev, subcategories: prev.subcategories.filter(id => id !== subcategoryId), childSubcategories: [] }));
    setCurrentPage(1);
  };

  const handleChildSubcategoryChange = (childSubcategoryId) => {
    saveScrollPosition();
    setFilters(prev => {
      const newChildSubcategories = prev.childSubcategories.includes(childSubcategoryId) ? prev.childSubcategories.filter(id => id !== childSubcategoryId) : [...prev.childSubcategories, childSubcategoryId];
      return { ...prev, childSubcategories: newChildSubcategories };
    });
    setCurrentPage(1);
  };

  const handleRemoveChildSubcategory = (childSubcategoryId) => {
    saveScrollPosition();
    setFilters(prev => ({ ...prev, childSubcategories: prev.childSubcategories.filter(id => id !== childSubcategoryId) }));
    setCurrentPage(1);
  };

  const handleBrandChange = (brand) => {
    saveScrollPosition();
    setFilters(prev => {
      const newBrands = prev.brands.includes(brand) ? prev.brands.filter(b => b !== brand) : [...prev.brands, brand];
      return { ...prev, brands: newBrands };
    });
    setCurrentPage(1);
  };

  const handleRemoveBrand = (brand) => {
    saveScrollPosition();
    setFilters(prev => ({ ...prev, brands: prev.brands.filter(b => b !== brand) }));
    setCurrentPage(1);
  };

  const handleUnitChange = (unit) => {
    saveScrollPosition();
    setFilters(prev => {
      const newUnits = prev.units.includes(unit) ? prev.units.filter(u => u !== unit) : [...prev.units, unit];
      return { ...prev, units: newUnits };
    });
    setCurrentPage(1);
  };

  const handleRemoveUnit = (unit) => {
    saveScrollPosition();
    setFilters(prev => ({ ...prev, units: prev.units.filter(u => u !== unit) }));
    setCurrentPage(1);
  };

  const applyPriceRange = () => {
    saveScrollPosition();
    setFilters(prev => ({ ...prev, priceRange: { min: minPriceInput || '', max: maxPriceInput || '' } }));
    setCurrentPage(1);
  };

  const clearPriceRange = () => {
    saveScrollPosition();
    setMinPriceInput('');
    setMaxPriceInput('');
    setFilters(prev => ({ ...prev, priceRange: { min: '', max: '' } }));
  };

  const clearFilters = () => {
    saveScrollPosition();
    setSearchInput('');
    setFilters({
      search: '',
      categories: [],
      subcategories: [],
      childSubcategories: [],
      brands: [],
      units: [],
      priceRange: { min: '', max: '' },
      sortBy: 'newest'
    });
    setMinPriceInput('');
    setMaxPriceInput('');
    setCurrentPage(1);
    window.history.pushState({}, '', window.location.pathname);
    window.dispatchEvent(new CustomEvent('categoryFilterChanged', { detail: { categoryId: null } }));
  };

  const handleFilterChange = (filterType, value) => {
    saveScrollPosition();
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    saveScrollPosition();
    setCurrentPage(newPage);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.categories.length > 0) count += filters.categories.length;
    if (filters.subcategories.length > 0) count += filters.subcategories.length;
    if (filters.childSubcategories.length > 0) count += filters.childSubcategories.length;
    if (filters.brands.length > 0) count += filters.brands.length;
    if (filters.units.length > 0) count += filters.units.length;
    if (filters.priceRange.min || filters.priceRange.max) count++;
    return count;
  };

  useEffect(() => {
    return () => { if (searchTimerRef.current) clearTimeout(searchTimerRef.current); };
  }, []);

  return (
    <>
      <LoadingBar isVisible={loading} />
      <Navbar />
      
      {/* Hero Section - Beauty Styled */}
      <div className="bg-gradient-to-r from-[#FFF5F6] via-white to-[#FFF5F6] border-b border-[#FFD2DB]/30">
        <div className="container mx-auto px-4 max-w-7xl py-4 md:py-8">
          <div className="flex items-center justify-center gap-3">
            <Flower2 className="w-6 h-6 text-[#EE4275]" />
            <h1 className="text-2xl md:text-4xl font-bold text-[#2D1B2E] text-center" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Beauty Collection
            </h1>
            <Flower2 className="w-6 h-6 text-[#EE4275]" />
          </div>
          <p className="text-gray-500 text-center text-sm mt-1" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Discover our curated collection of premium beauty products
          </p>
        </div>
      </div>

      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 max-w-7xl py-6">
          {/* Filter and Sort Bar */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="md:hidden flex items-center gap-2 px-3 py-1.5 bg-white border border-[#FFD2DB]/40 rounded-lg hover:bg-[#FFF5F6] transition-colors text-xs font-medium text-gray-700"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#EE4275]" />
                  Filters
                  {getActiveFilterCount() > 0 && (
                    <span className="ml-1 px-1 py-0.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-[9px] rounded-full min-w-[16px] text-center">{getActiveFilterCount()}</span>
                  )}
                </button>

                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="px-3 py-1.5 text-xs border border-[#FFD2DB]/40 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#EE4275]"
                >
                  <option value="newest">Newest First</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="name_asc">Name: A to Z</option>
                </select>

                {/* Desktop view toggle */}
                {!isMobile && (
                  <div className="hidden md:flex items-center gap-1 bg-white border border-[#FFD2DB]/40 rounded-lg p-0.5">
                    <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white' : 'text-gray-500 hover:bg-[#FFF5F6]'}`} title="Grid View">
                      <Grid className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white' : 'text-gray-500 hover:bg-[#FFF5F6]'}`} title="List View">
                      <List className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
              
              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search beauty products..."
                  value={searchInput}
                  onChange={handleSearchChange}
                  className="w-full pl-9 pr-8 py-1.5 text-xs border border-[#FFD2DB]/40 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#EE4275] bg-white"
                />
                {searchInput && (
                  <button onClick={handleClearSearch} className="absolute right-3 top-1/2 -translate-y-1/2">
                    <X className="w-3 h-3 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </div>

            {/* Active Filters Display */}
            {getActiveFilterCount() > 0 && (
              <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                {filters.search && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-[#FFF5F6] text-gray-700 text-[10px] rounded-full border border-[#FFD2DB]/30">
                    <span>🔍 "{filters.search}"</span>
                    <button onClick={handleClearSearch} className="ml-1 hover:text-[#EE4275]"><X className="w-2.5 h-2.5" /></button>
                  </div>
                )}
                {filters.categories.map(catId => {
                  const category = categories.find(c => c._id === catId);
                  return category ? (
                    <div key={catId} className="flex items-center gap-1 px-2 py-1 bg-[#FFF5F6] text-gray-700 text-[10px] rounded-full border border-[#FFD2DB]/30">
                      <Tag className="w-2.5 h-2.5 text-[#EE4275]" />
                      <span>{category.name}</span>
                      <button onClick={() => handleRemoveCategory(catId)} className="ml-1 hover:text-[#EE4275]"><X className="w-2.5 h-2.5" /></button>
                    </div>
                  ) : null;
                })}
                {filters.brands.map(brand => (
                  <div key={brand} className="flex items-center gap-1 px-2 py-1 bg-[#FFF5F6] text-gray-700 text-[10px] rounded-full border border-[#FFD2DB]/30">
                    <Building2 className="w-2.5 h-2.5 text-[#EE4275]" />
                    <span>{brand}</span>
                    <button onClick={() => handleRemoveBrand(brand)} className="ml-1 hover:text-[#EE4275]"><X className="w-2.5 h-2.5" /></button>
                  </div>
                ))}
                {filters.units.map(unit => (
                  <div key={unit} className="flex items-center gap-1 px-2 py-1 bg-[#FFF5F6] text-gray-700 text-[10px] rounded-full border border-[#FFD2DB]/30">
                    <Scale className="w-2.5 h-2.5 text-[#EE4275]" />
                    <span>{unit === 'pcs' ? 'Pieces' : 'Ton'}</span>
                    <button onClick={() => handleRemoveUnit(unit)} className="ml-1 hover:text-[#EE4275]"><X className="w-2.5 h-2.5" /></button>
                  </div>
                ))}
                {(filters.priceRange.min || filters.priceRange.max) && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-[#FFF5F6] text-gray-700 text-[10px] rounded-full border border-[#FFD2DB]/30">
                    <DollarSign className="w-2.5 h-2.5 text-[#EE4275]" />
                    <span>৳{filters.priceRange.min || '0'} - ৳{filters.priceRange.max || '∞'}</span>
                    <button onClick={clearPriceRange} className="ml-1 hover:text-[#EE4275]"><X className="w-2.5 h-2.5" /></button>
                  </div>
                )}
                {getActiveFilterCount() > 0 && (
                  <button onClick={clearFilters} className="px-2 py-1 text-[10px] text-[#EE4275] hover:text-[#ca4f74] underline">
                    Clear All
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Desktop Filters */}
            {!isMobile && (
              <div className="hidden md:block md:w-72 flex-shrink-0">
                <FilterSidebar 
                  expandedSections={expandedSections}
                  toggleSection={toggleSection}
                  categories={categories}
                  subcategories={subcategories}
                  childSubcategories={childSubcategories}
                  brands={brands}
                  filters={filters}
                  handleCategoryChange={handleCategoryChange}
                  handleRemoveCategory={handleRemoveCategory}
                  handleSubcategoryChange={handleSubcategoryChange}
                  handleRemoveSubcategory={handleRemoveSubcategory}
                  handleChildSubcategoryChange={handleChildSubcategoryChange}
                  handleRemoveChildSubcategory={handleRemoveChildSubcategory}
                  handleBrandChange={handleBrandChange}
                  handleRemoveBrand={handleRemoveBrand}
                  handleUnitChange={handleUnitChange}
                  handleRemoveUnit={handleRemoveUnit}
                  minPriceInput={minPriceInput}
                  maxPriceInput={maxPriceInput}
                  setMinPriceInput={setMinPriceInput}
                  setMaxPriceInput={setMaxPriceInput}
                  applyPriceRange={applyPriceRange}
                  clearPriceRange={clearPriceRange}
                  getActiveFilterCount={getActiveFilterCount}
                  clearFilters={clearFilters}
                  selectedCategory={selectedCategory}
                  selectedSubcategory={selectedSubcategory}
                  showChildSubcategory={showChildSubcategory}
                  availableUnits={availableUnits}
                  unitsLoading={unitsLoading}
                />
              </div>
            )}

            {/* Products */}
            <div className="flex-1" ref={productsContainerRef}>
              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[...Array(12)].map((_, index) => (
                    <div key={index} className="bg-white rounded-xl border border-[#FFD2DB]/40 overflow-hidden animate-pulse">
                      <div className="h-40 bg-gradient-to-br from-[#FFD2DB]/15 to-[#EE4275]/5"></div>
                      <div className="p-3">
                        <div className="h-3 bg-gray-100 rounded mb-2 w-3/4"></div>
                        <div className="h-4 bg-gray-100 rounded mb-2 w-1/2"></div>
                        <div className="h-2 bg-gray-100 rounded w-1/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {products.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl border border-[#FFD2DB]/40">
                      <Package className="w-12 h-12 text-[#FFD2DB] mx-auto mb-3" />
                      <p className="text-sm text-gray-500 mb-3" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>No products found</p>
                      <button onClick={clearFilters} className="px-4 py-1.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-xs font-medium rounded-lg hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all">Clear Filters</button>
                    </div>
                  ) : (
                    <>
                      <div className="mb-3 text-xs text-gray-500" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Found {totalProducts} product{totalProducts !== 1 ? 's' : ''}</div>
                      
                      {/* On mobile: always grid view */}
                      {(isMobile || viewMode === 'grid') ? (
                        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-2 lg:grid-cols-4">
                          {products.map(product => (
                            <ProductGridCard 
                              key={product._id} 
                              product={product} 
                              router={router} 
                              isInCart={productsInCart[product._id] || false} 
                              onViewInCart={openCartSidebar}
                              onCartStatusChange={(productId, inCart) => {
                                setProductsInCart(prev => ({ ...prev, [productId]: inCart }));
                              }}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {products.map(product => (
                            <ProductListCard 
                              key={product._id} 
                              product={product} 
                              router={router} 
                              isInCart={productsInCart[product._id] || false} 
                              onViewInCart={openCartSidebar}
                              onCartStatusChange={(productId, inCart) => {
                                setProductsInCart(prev => ({ ...prev, [productId]: inCart }));
                              }}
                            />
                          ))}
                        </div>
                      )}

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-1.5 mt-8">
                          <button onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} disabled={currentPage === 1} className="px-2 py-1 border border-[#FFD2DB]/40 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FFF5F6] text-xs">Prev</button>
                          {[...Array(totalPages)].map((_, i) => {
                            const pageNum = i + 1;
                            if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
                              return (
                                <button key={i} onClick={() => handlePageChange(pageNum)} className={`min-w-[28px] h-7 text-xs font-medium rounded-lg transition-all ${currentPage === pageNum ? 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white shadow-md shadow-[#EE4275]/25' : 'border border-[#FFD2DB]/40 text-gray-700 hover:bg-[#FFF5F6]'}`}>
                                  {pageNum}
                                </button>
                              );
                            } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                              return <span key={i} className="text-xs text-gray-400">...</span>;
                            }
                            return null;
                          })}
                          <button onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages} className="px-2 py-1 border border-[#FFD2DB]/40 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FFF5F6] text-xs">Next</button>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-white p-3 border-b border-[#FFD2DB]/30 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#2D1B2E]">Filters</h3>
              <button onClick={() => setShowMobileFilters(false)} className="p-1.5 hover:bg-[#FFF5F6] rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3">
              <FilterSidebar 
                expandedSections={expandedSections}
                toggleSection={toggleSection}
                categories={categories}
                subcategories={subcategories}
                childSubcategories={childSubcategories}
                brands={brands}
                filters={filters}
                handleCategoryChange={handleCategoryChange}
                handleRemoveCategory={handleRemoveCategory}
                handleSubcategoryChange={handleSubcategoryChange}
                handleRemoveSubcategory={handleRemoveSubcategory}
                handleChildSubcategoryChange={handleChildSubcategoryChange}
                handleRemoveChildSubcategory={handleRemoveChildSubcategory}
                handleBrandChange={handleBrandChange}
                handleRemoveBrand={handleRemoveBrand}
                handleUnitChange={handleUnitChange}
                handleRemoveUnit={handleRemoveUnit}
                minPriceInput={minPriceInput}
                maxPriceInput={maxPriceInput}
                setMinPriceInput={setMinPriceInput}
                setMaxPriceInput={setMaxPriceInput}
                applyPriceRange={applyPriceRange}
                clearPriceRange={clearPriceRange}
                getActiveFilterCount={getActiveFilterCount}
                clearFilters={clearFilters}
                selectedCategory={selectedCategory}
                selectedSubcategory={selectedSubcategory}
                showChildSubcategory={showChildSubcategory}
                availableUnits={availableUnits}
                unitsLoading={unitsLoading}
              />
            </div>
            <div className="sticky bottom-0 bg-white p-3 border-t border-[#FFD2DB]/30">
              <button onClick={() => setShowMobileFilters(false)} className="w-full py-2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-xs font-medium rounded-lg hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all">Apply Filters</button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />

      <Footer />

      <style jsx>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}