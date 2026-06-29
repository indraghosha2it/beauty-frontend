

// 'use client';

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Star,
//   ShoppingCart,
//   Truck,
//   ShieldCheck,
//   RotateCcw,
//   AlertCircle,
//   CheckCircle,
//   Minus,
//   Plus,
//   ZoomIn,
//   Sparkles,
//   Play,
//   X,
//   ChevronLeft,
//   ChevronRight,
//   Package,
//   Tag,
//   Clock,
//   Copy,
//   Check,
//   Loader2,
//   Eye,
//   FolderTree,
//   Maximize2,
//   Zap,
//   Info,
//   Award,
//   TrendingUp,
//   Flame,
//   Clock as ClockIcon,
//   Building2,
//   Box,
//   Scale,
//   List,
//   FileText,
//   AlertTriangle,
//   Palette,
//   Flower2,
//   Heart,
//   Share2,
//   MessageCircle
// } from 'lucide-react';

// import { toast } from 'sonner';
// import WhatsAppButton from '../components/layout/WhatsAppButton';
// import Footer from '../components/layout/Footer';
// import Navbar from '../components/layout/Navbar';
// import MetadataUpdater from '../productDetails/MetadataUpdater';
// import CartSidebar from '../components/CartSidebar';

// // ========== HELPER FUNCTIONS ==========

// // Helper function to get tag name safely from object or string
// // ========== HELPER FUNCTIONS ==========
// const getTagName = (tag) => {
//   if (!tag) return '';
  
//   // If it's a string, check if it's a MongoDB ObjectId (24 hex characters)
//   if (typeof tag === 'string') {
//     // Check if it looks like a MongoDB ObjectId
//     if (/^[0-9a-fA-F]{24}$/.test(tag)) {
//       // This is an ObjectId, we need to find the actual tag name
//       // Return empty string to hide it
//       return '';
//     }
//     return tag;
//   }
  
//   if (typeof tag === 'object') {
//     // Check if tag has a name property (populated tag)
//     if (tag.name) return tag.name;
//     // Check if tag has a _id and it might be a populated reference
//     if (tag._id && typeof tag._id === 'object' && tag._id.name) {
//       return tag._id.name;
//     }
//     // If tag is an array, try to get the first item
//     if (Array.isArray(tag) && tag.length > 0) {
//       return getTagName(tag[0]);
//     }
//     // Check if tag has a title or label property
//     if (tag.title) return tag.title;
//     if (tag.label) return tag.label;
//     // If all else fails, return the string representation
//     return String(tag._id || tag);
//   }
//   return String(tag);
// };

// // Helper function to get tag image URL
// const getTagImage = (tag) => {
//   if (!tag) return null;
  
//   // If tag is an object with image property
//   if (typeof tag === 'object') {
//     // Check for image.url (Cloudinary format)
//     if (tag.image && tag.image.url) {
//       return tag.image.url;
//     }
//     // Check for image as string
//     if (tag.image && typeof tag.image === 'string') {
//       return tag.image;
//     }
//     // Check for imageUrl
//     if (tag.imageUrl) {
//       return tag.imageUrl;
//     }
//     // Check for image property that might be a string
//     if (tag.image && typeof tag.image === 'object' && tag.image.toString) {
//       return tag.image.toString();
//     }
//   }
  
//   return null;
// };

// // Helper function to get valid tag names (filters out ObjectIds)
// const getValidTagName = (tags) => {
//   if (!tags || !Array.isArray(tags) || tags.length === 0) return '';
  
//   for (const tag of tags) {
//     const name = getTagName(tag);
//     // Skip if it looks like a MongoDB ObjectId
//     if (name && !/^[0-9a-fA-F]{24}$/.test(name)) {
//       return name;
//     }
//   }
//   return '';
// };

// // Helper function to get tag value for comparison
// const getTagValue = (tag) => {
//   if (!tag) return '';
//   if (typeof tag === 'string') return tag;
//   if (typeof tag === 'object') {
//     if (tag.name) return tag.name;
//     if (tag._id && typeof tag._id === 'object' && tag._id.name) {
//       return tag._id.name;
//     }
//     if (tag._id) return tag._id;
//     return String(tag);
//   }
//   return String(tag);
// };

// // Helper function to get tag style based on tag name
// const getTagStyle = (tag) => {
//   const tagName = getTagName(tag);
//   const styles = {
//     'Best Seller': 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30',
//     'Trending': 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white shadow-lg shadow-[#EE4275]/30',
//     'New Release': 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30',
//     'Limited Offer': 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30',
//     'Flash Sale': 'bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-lg shadow-red-500/30',
//     'Clearance': 'bg-gradient-to-r from-gray-500 to-gray-700 text-white shadow-lg shadow-gray-500/30',
//   };
//   return styles[tagName] || 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white shadow-lg shadow-[#EE4275]/30';
// };

// const formatPrice = (price) => {
//   return (price || 0).toFixed(2);
// };

// const calculateDiscount = (regular, discount) => {
//   if (regular && discount && discount < regular) {
//     return Math.round(((regular - discount) / regular) * 100);
//   }
//   return 0;
// };

// const calculateDiscountPercentage = (regularPrice, discountPrice) => {
//   if (regularPrice && discountPrice && discountPrice < regularPrice) {
//     return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
//   }
//   return 0;
// };

// const getUnitLabel = (unit) => {
//   const units = {
//     'pcs': 'pcs',
//     'ton': 'ton',
//     'other': 'unit'
//   };
//   return units[unit] || unit;
// };

// const getStockStatus = (quantity, alertQuantity) => {
//   if (quantity <= 0) return { label: 'Out of Stock', color: 'red', icon: AlertCircle };
//   if (alertQuantity > 0 && quantity <= alertQuantity) return { label: 'Low Stock', color: 'orange', icon: AlertCircle };
//   return { label: 'In Stock', color: 'green', icon: CheckCircle };
// };

// const truncateText = (text, limit = 35) => {
//   if (!text) return '';
//   if (text.length <= limit) return text;
//   return text.substring(0, limit) + '...';
// };

// // ========== LOADING SKELETON ==========

// const ProductSkeleton = () => (
//   <div className="min-h-screen bg-[#FFF8F9]">
//     <div className="container mx-auto px-4 py-8 max-w-7xl">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div className="animate-pulse">
//           <div className="bg-[#FFD2DB]/30 rounded-2xl h-96 w-full"></div>
//         </div>
//         <div className="space-y-4 animate-pulse">
//           <div className="h-8 bg-[#FFD2DB]/30 rounded w-3/4"></div>
//           <div className="h-6 bg-[#FFD2DB]/30 rounded w-1/2"></div>
//           <div className="h-24 bg-[#FFD2DB]/30 rounded"></div>
//           <div className="h-12 bg-[#FFD2DB]/30 rounded w-full"></div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // ========== ZOOM MODAL ==========

// const ZoomModal = ({ images, currentIndex, onClose, onImageChange }) => (
//   <motion.div
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     exit={{ opacity: 0 }}
//     className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
//     onClick={onClose}
//   >
//     <div className="relative w-full h-full flex items-center justify-center">
//       <button
//         onClick={onClose}
//         className="absolute top-4 right-4 p-3 bg-white/20 rounded-full hover:bg-white/30 transition z-10 backdrop-blur-sm"
//       >
//         <X className="w-6 h-6 text-white" />
//       </button>
      
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           onImageChange((currentIndex - 1 + images.length) % images.length);
//         }}
//         className="absolute left-4 p-3 bg-white/20 rounded-full hover:bg-white/30 transition z-10 backdrop-blur-sm"
//       >
//         <ChevronLeft className="w-6 h-6 text-white" />
//       </button>
      
//       <motion.div
//         initial={{ scale: 0.9 }}
//         animate={{ scale: 1 }}
//         exit={{ scale: 0.9 }}
//         className="relative max-w-5xl w-full mx-4"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <img
//           src={images[currentIndex]?.url}
//           alt="Zoomed product"
//           className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl"
//         />
//       </motion.div>
      
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           onImageChange((currentIndex + 1) % images.length);
//         }}
//         className="absolute right-4 p-3 bg-white/20 rounded-full hover:bg-white/30 transition z-10 backdrop-blur-sm"
//       >
//         <ChevronRight className="w-6 h-6 text-white" />
//       </button>
      
//       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm">
//         {currentIndex + 1} / {images.length}
//       </div>
//     </div>
//   </motion.div>
// );

// // ========== RELATED PRODUCT CARD ==========


// const RelatedProductCard = ({ product, router, isInCart: propIsInCart, onViewInCart }) => {
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

//   // Check if device is mobile (small device)
//   const [isMobileDevice, setIsMobileDevice] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => {
//       const mobile = window.innerWidth < 768;
//       setIsMobile(mobile);
//       setIsMobileDevice(mobile);
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

//   // Handle card click - opens in new window on desktop, same tab on mobile
//   const handleCardClick = () => {
//     if (isMobileDevice) {
//       // Small device: open in same tab
//       window.location.href = `/productDetails?id=${product._id}`;
//     } else {
//       // Large device: open in new tab
//       window.open(`/productDetails?id=${product._id}`, '_blank');
//     }
//   };

//   // Handle eye icon click - always opens in new tab (desktop behavior)
//  const handleEyeClick = (e) => {
//   e.stopPropagation();
//   if (isMobileDevice) {
//     // Small device: open in same tab
//     window.location.href = `/productDetails?id=${product._id}`;
//   } else {
//     // Large device: open in new tab
//     window.open(`/productDetails?id=${product._id}`, '_blank');
//   }
// };

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
//       onClick={handleCardClick}
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
//               x: !isMobileDevice && isHovered ? 0 : 40, 
//               opacity: !isMobileDevice && isHovered ? 1 : 0 
//             }}
//             transition={{ duration: 0.15, ease: "easeOut" }}
//             onClick={handleEyeClick}
//             className="hidden sm:flex w-7 h-7 rounded-full bg-white shadow-md hover:bg-[#EE4275] items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
//           >
//             <Eye className="w-3.5 h-3.5 text-[#EE4275] hover:text-white transition-colors duration-200" />
//           </motion.div>
          
//           <motion.div
//             initial={{ x: 40, opacity: 0 }}
//             animate={{ 
//               x: !isMobileDevice && isHovered ? 0 : 40, 
//               opacity: !isMobileDevice && isHovered ? 1 : 0 
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
//           isMobileDevice ? 'flex' : 'hidden'
//         }`}>
//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             onClick={handleEyeClick}
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
//             ৳{formatPrice(currentPrice)}
//           </span>
//           {discountPercent > 0 && (
//             <>
//               <span className="text-[6px] sm:text-[8px] text-gray-400 line-through">
//                 ৳{formatPrice(originalPrice)}
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
//             <div className="text-[5px] sm:text-[7px] text-gray-400">✨ Beauty</div>
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

// // ========== MAIN PRODUCT DETAILS COMPONENT ==========

// export default function ProductDetailsClient() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const productId = searchParams.get('id');

//   const [product, setProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);
//   const [isInCart, setIsInCart] = useState(false);
//   const [addingToCart, setAddingToCart] = useState(false);
//   const [showZoom, setShowZoom] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isZoomed, setIsZoomed] = useState(false);
//   const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
//   const [imageLoaded, setImageLoaded] = useState({});
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [videoThumbnail, setVideoThumbnail] = useState(null);
//   const [generatingThumbnail, setGeneratingThumbnail] = useState(false);
//   const [checkingCart, setCheckingCart] = useState(true);
//   const [carouselIndex, setCarouselIndex] = useState(0);
//   const [carouselItemsPerView, setCarouselItemsPerView] = useState(5);
//   const [isAutoScrolling, setIsAutoScrolling] = useState(true);
//   const autoScrollIntervalRef = useRef(null);
//   const [productsInCart, setProductsInCart] = useState({});
//   const [activeTab, setActiveTab] = useState('description');
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [isWishlisted, setIsWishlisted] = useState(false);
  
//   const mainImageRef = useRef(null);
//   const galleryRef = useRef(null);

//   const openCartSidebar = () => setIsCartOpen(true);
//   const closeCartSidebar = () => setIsCartOpen(false);

//   // ========== CART STATUS FUNCTIONS ==========

//   const checkCartStatus = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = {};
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//         console.log('Using token for cart check');
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//         console.log('Using sessionId for cart check:', sessionId);
//       } else {
//         console.log('No token or sessionId found, setting isInCart to false');
//         setIsInCart(false);
//         setCheckingCart(false);
//         return;
//       }
      
//       if (!product || !product._id) {
//         console.log('No product or product ID available');
//         setCheckingCart(false);
//         return;
//       }
      
//       console.log('Checking cart status for product:', product._id);
      
//       const response = await fetch(`http://localhost:5000/api/cart/check/${product._id}`, { headers });
//       const data = await response.json();
      
//       console.log('Cart check response:', data);
      
//       if (data.success) {
//         const inCart = data.data.inCart || false;
//         console.log('Product in cart:', inCart);
//         setIsInCart(inCart);
//       } else {
//         console.log('Cart check failed:', data.error);
//         setIsInCart(false);
//       }
//     } catch (error) {
//       console.error('Error checking cart status:', error);
//       setIsInCart(false);
//     } finally {
//       setCheckingCart(false);
//     }
//   };

//   // ========== EFFECTS ==========

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   useEffect(() => {
//     if (productId) fetchProductDetails();
//   }, [productId]);

//   useEffect(() => {
//     if (product && product._id) {
//       console.log('Product loaded, checking cart status for:', product._id);
//       checkCartStatus();
//     }
//   }, [product]);

//   useEffect(() => {
//     const handleCartUpdate = () => {
//       if (product && product._id) {
//         console.log('Cart update event received, re-checking status');
//         setCheckingCart(true);
//         checkCartStatus();
//       }
//     };
    
//     window.addEventListener('cart-update', handleCartUpdate);
//     return () => {
//       window.removeEventListener('cart-update', handleCartUpdate);
//     };
//   }, [product]);

//   useEffect(() => {
//     const handleAuthChange = () => {
//       if (product && product._id) {
//         console.log('Auth change detected, re-checking cart status');
//         setIsInCart(false);
//         setCheckingCart(true);
//         setTimeout(() => {
//           checkCartStatus();
//         }, 100);
//       }
//     };
    
//     window.addEventListener('auth-change', handleAuthChange);
//     return () => {
//       window.removeEventListener('auth-change', handleAuthChange);
//     };
//   }, [product]);

//   useEffect(() => {
//     const handleFocus = () => {
//       if (product && product._id) {
//         console.log('Window focus gained, re-checking cart status');
//         checkCartStatus();
//       }
//     };
    
//     window.addEventListener('focus', handleFocus);
//     return () => {
//       window.removeEventListener('focus', handleFocus);
//     };
//   }, [product]);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 640) {
//         setCarouselItemsPerView(2);
//       } else if (window.innerWidth < 768) {
//         setCarouselItemsPerView(2);
//       } else if (window.innerWidth < 1024) {
//         setCarouselItemsPerView(3);
//       } else {
//         setCarouselItemsPerView(5);
//       }
//     };
    
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     if (isAutoScrolling && relatedProducts.length > carouselItemsPerView) {
//       autoScrollIntervalRef.current = setInterval(() => {
//         setCarouselIndex((prev) => {
//           const maxIndex = Math.max(0, relatedProducts.length - carouselItemsPerView);
//           if (prev >= maxIndex) {
//             return 0;
//           }
//           return prev + 1;
//         });
//       }, 5000);
//     }
    
//     return () => {
//       if (autoScrollIntervalRef.current) {
//         clearInterval(autoScrollIntervalRef.current);
//       }
//     };
//   }, [isAutoScrolling, relatedProducts.length, carouselItemsPerView]);

//   useEffect(() => {
//     const refreshRelatedProductsStatus = async () => {
//       if (relatedProducts.length === 0) return;
      
//       const productIds = relatedProducts.map(p => p._id);
//       const token = localStorage.getItem('token');
//       const cartSessionId = localStorage.getItem('cartSessionId');
      
//       const cartHeaders = {};
//       if (token) cartHeaders['Authorization'] = `Bearer ${token}`;
//       else if (cartSessionId) cartHeaders['x-session-id'] = cartSessionId;
      
//       try {
//         const cartResponse = await fetch('http://localhost:5000/api/cart/check-status', {
//           method: 'POST',
//           headers: { ...cartHeaders, 'Content-Type': 'application/json' },
//           body: JSON.stringify({ productIds })
//         });
//         const cartData = await cartResponse.json();
//         if (cartData.success) setProductsInCart(cartData.data);
//       } catch (error) {
//         console.error('Error refreshing cart status:', error);
//       }
//     };
    
//     refreshRelatedProductsStatus();
    
//     const handleCartUpdate = () => refreshRelatedProductsStatus();
//     window.addEventListener('cart-update', handleCartUpdate);
//     return () => {
//       window.removeEventListener('cart-update', handleCartUpdate);
//     };
//   }, [relatedProducts]);

//   const handleCarouselInteraction = () => {
//     setIsAutoScrolling(false);
//     setTimeout(() => {
//       setIsAutoScrolling(true);
//     }, 5000);
//   };

//   const handlePrevSlide = () => {
//     handleCarouselInteraction();
//     setCarouselIndex((prev) => Math.max(0, prev - 1));
//   };

//   const handleNextSlide = () => {
//     handleCarouselInteraction();
//     const maxIndex = Math.max(0, relatedProducts.length - carouselItemsPerView);
//     setCarouselIndex((prev) => Math.min(maxIndex, prev + 1));
//   };

//   const fetchProductDetails = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`http://localhost:5000/api/products/${productId}`);
//       const data = await response.json();
//       if (data.success) {
//         setProduct(data.data.product);
//         setRelatedProducts(data.data.relatedProducts || []);
//       } else {
//         toast.error('Product not found');
//         router.push('/products');
//       }
//     } catch (error) {
//       console.error('Error fetching product:', error);
//       toast.error('Failed to load product');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ========== ADD TO CART FUNCTION ==========
//   const handleAddToCart = async () => {
//     if (product.stockQuantity <= 0) {
//       toast.error('Out of stock');
//       return;
//     }
//     let finalQuantity = quantity === '' || quantity === null ? 1 : quantity;
//     setAddingToCart(true);
//     const toastId = toast.loading('Adding to cart...');
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = { 'Content-Type': 'application/json' };
//       if (token) headers['Authorization'] = `Bearer ${token}`;
//       else if (sessionId) headers['x-session-id'] = sessionId;

//       const response = await fetch('http://localhost:5000/api/cart', {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({ productId: product._id, quantity: finalQuantity })
//       });
//       const data = await response.json();
//       if (data.success) {
//         if (data.sessionId && !token) localStorage.setItem('cartSessionId', data.sessionId);
//         setIsInCart(true);
//         toast.success(`${finalQuantity} item(s) added to cart!`, { id: toastId });
//         window.dispatchEvent(new Event('cart-update'));
//         setTimeout(() => window.dispatchEvent(new Event('cart-update')), 500);
//       } else {
//         toast.error(data.error || 'Failed to add to cart', { id: toastId });
//       }
//     } catch (error) {
//       console.error('Add to cart error:', error);
//       toast.error('Network error', { id: toastId });
//     } finally {
//       setAddingToCart(false);
//     }
//   };

//   // ========== BUY NOW FUNCTION ==========
//   const handleBuyNow = async () => {
//     if (product.stockQuantity <= 0) {
//       toast.error('Out of stock');
//       return;
//     }
    
//     setAddingToCart(true);
//     const toastId = toast.loading('Processing...');
    
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = { 'Content-Type': 'application/json' };
//       if (token) headers['Authorization'] = `Bearer ${token}`;
//       else if (sessionId) headers['x-session-id'] = sessionId;

//       const checkResponse = await fetch(`http://localhost:5000/api/cart/check/${product._id}`, { headers });
//       const checkData = await checkResponse.json();
      
//       let alreadyInCart = false;
//       if (checkData.success) {
//         alreadyInCart = checkData.data.inCart;
//       }
      
//       if (!alreadyInCart) {
//         const response = await fetch('http://localhost:5000/api/cart', {
//           method: 'POST',
//           headers,
//           body: JSON.stringify({ productId: product._id, quantity: quantity || 1 })
//         });
//         const data = await response.json();
        
//         if (data.success) {
//           if (data.sessionId && !token) localStorage.setItem('cartSessionId', data.sessionId);
//           setIsInCart(true);
//           window.dispatchEvent(new Event('cart-update'));
//         } else {
//           toast.error(data.error || 'Failed to process', { id: toastId });
//           setAddingToCart(false);
//           return;
//         }
//       }
      
//       setTimeout(() => {
//         toast.success('Redirecting to checkout...', { id: toastId });
//         router.push('/checkout');
//       }, 500);
      
//     } catch (error) {
//       console.error('Buy now error:', error);
//       toast.error('Network error', { id: toastId });
//     } finally {
//       setAddingToCart(false);
//     }
//   };

//   const handleQuantityChange = (delta) => {
//     const newQuantity = quantity + delta;
//     if (newQuantity >= 1 && newQuantity <= (product?.stockQuantity || 10)) {
//       setQuantity(newQuantity);
//     }
//   };

//   const handleQuantityInput = (e) => {
//     const rawValue = e.target.value;
    
//     if (rawValue === '') {
//       setQuantity('');
//       return;
//     }
    
//     let value = parseInt(rawValue);
    
//     if (isNaN(value)) {
//       setQuantity(1);
//       return;
//     }
    
//     if (value < 1) {
//       value = 1;
//     } else if (value > product.stockQuantity) {
//       value = product.stockQuantity;
//       toast.error(`Maximum quantity available is ${product.stockQuantity}`);
//     }
    
//     setQuantity(value);
//   };

//   const preloadImage = (src) => {
//     const img = new Image();
//     img.src = src;
//   };

//   const getYouTubeThumbnail = (url) => {
//     if (!url) return null;
    
//     const patterns = [
//       /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\s?#]+)/,
//       /youtube\.com\/v\/([^&\s?#]+)/,
//       /youtube\.com\/live\/([^&\s?#]+)/
//     ];
    
//     for (const pattern of patterns) {
//       const match = url.match(pattern);
//       if (match && match[1]) {
//         return `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`;
//       }
//     }
//     return null;
//   };

//   const generateVideoThumbnail = (videoUrl, callback) => {
//     const video = document.createElement('video');
//     video.crossOrigin = 'Anonymous';
//     video.src = videoUrl;
//     video.currentTime = 1.5;
    
//     video.addEventListener('loadeddata', () => {
//       setTimeout(() => {
//         const canvas = document.createElement('canvas');
//         const ctx = canvas.getContext('2d');
        
//         canvas.width = 160;
//         canvas.height = 160;
        
//         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
//         const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
//         callback(thumbnailUrl);
//       }, 100);
//     });
    
//     video.addEventListener('error', () => {
//       console.error('Error loading video for thumbnail generation');
//       callback(null);
//     });
    
//     video.load();
//   };

//   if (loading) return <ProductSkeleton />;
//   if (!product) return null;

//   const discountPercent = calculateDiscount(product.regularPrice, product.discountPrice);
//   const currentPrice = product.discountPrice && product.discountPrice < product.regularPrice ? product.discountPrice : product.regularPrice;
//   const stockStatus = getStockStatus(product.stockQuantity, product.stockAlertQuantity);
//   const StockIcon = stockStatus.icon;
//   const productImages = product.images || [];
//   const hasVideo = product.videoUrl && product.videoUrl.trim() !== '';
//   const mediaItems = [...productImages];
//   if (hasVideo) {
//     mediaItems.push({ type: 'video', url: product.videoUrl, videoType: product.videoType });
//   }
//   const mainMedia = mediaItems[activeImageIndex];
//   const isMainVideo = mainMedia?.type === 'video';
//   const mainImage = !isMainVideo ? mainMedia?.url : null;
//   const mainVideoUrl = isMainVideo ? mainMedia?.url : null;
//   const mainVideoType = isMainVideo ? mainMedia?.videoType : null;

//   const categoryHierarchy = [];
//   if (product.categoryName) categoryHierarchy.push(product.categoryName);
//   if (product.subcategoryName) categoryHierarchy.push(product.subcategoryName);
//   if (product.childSubcategoryName) categoryHierarchy.push(product.childSubcategoryName);

//   const hasDeliveryInfo = product.deliveryInfo && product.deliveryInfo !== '<p></p>' && product.deliveryInfo.trim() !== '';

//   const specifications = [
//     { label: 'Brand', value: product.brand, icon: Building2 },
//     { label: 'SKU', value: product.skuCode, icon: Package },
//     { label: 'Stock', value: `${product.stockQuantity} units available`, icon: Package },
//     { label: 'Category', value: product.categoryName, icon: FolderTree },
//     { label: 'Subcategory', value: product.subcategoryName, icon: FolderTree },
//     { label: 'Unit', value: product.unit === 'pcs' ? 'Pieces' : product.unit || 'N/A', icon: Scale },
//   ].filter(item => item.value);

//   if (product.additionalInfo && product.additionalInfo.length > 0) {
//     product.additionalInfo.forEach(info => {
//       if (info.fieldName && info.fieldValue) {
//         specifications.push({
//           label: info.fieldName,
//           value: info.fieldValue,
//           icon: Info
//         });
//       }
//     });
//   }

//   const hasColors = product.colors && product.colors.length > 0;

//   // Get tag name for display
//   const primaryTag = product.tags?.[0];
//   const primaryTagName = getTagName(primaryTag);

//   return (
//     <>
//       {product && <MetadataUpdater product={product} />}
//       <Navbar />
      
//       <div className="min-h-screen bg-gradient-to-b from-[#FFF8F9] via-white to-[#FFF8F9]">
//         <div className="container mx-auto px-3 sm:px-4 py-4 md:py-6 lg:py-8 max-w-7xl">
          
//           {/* Breadcrumb - Beauty Style */}
//           <nav className="flex items-center gap-1.5 text-xs sm:text-sm mb-6 overflow-x-auto pb-2">
//             <Link href="/" className="text-[#8B7A8C] hover:text-[#EE4275] transition whitespace-nowrap">
//               Home
//             </Link>
//             <span className="text-[#FFD2DB]">/</span>
//             <Link href="/products" className="text-[#8B7A8C] hover:text-[#EE4275] transition whitespace-nowrap">
//               Products
//             </Link>
//             {categoryHierarchy.map((cat, idx) => (
//               <React.Fragment key={idx}>
//                 <span className="text-[#FFD2DB]">/</span>
//                 <span className="text-[#8B7A8C] truncate max-w-[80px] sm:max-w-none">{cat}</span>
//               </React.Fragment>
//             ))}
//             <span className="text-[#FFD2DB]">/</span>
//             <span className="text-[#2D1B2E] font-medium truncate max-w-[120px] sm:max-w-none" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
//               {product.productName}
//             </span>
//           </nav>

//           {/* Main Product Section - Thumbnails on Left */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            
//             {/* Left Column - Product Gallery with Left Thumbnails */}
//             <div className="lg:col-span-1" ref={galleryRef}>
//               <div className="sticky top-24">
//                 <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  
//                   {/* Thumbnails - Left Side (Vertical on desktop, horizontal on mobile) */}
//                   <div className="flex sm:flex-col gap-2 sm:gap-3 order-2 sm:order-1 flex-row sm:flex-wrap justify-center sm:justify-start">
//                     {productImages.map((img, idx) => (
//                       <button
//                         key={idx}
//                         onClick={() => {
//                           if (activeImageIndex !== idx) {
//                             setActiveImageIndex(idx);
//                             setImageLoaded(prev => ({ ...prev, [idx]: false }));
//                             setIsZoomed(false);
//                           }
//                         }}
//                         onMouseEnter={() => {
//                           preloadImage(img.url);
//                           if (activeImageIndex !== idx) {
//                             setActiveImageIndex(idx);
//                             setImageLoaded(prev => ({ ...prev, [idx]: false }));
//                             setIsZoomed(false);
//                           }
//                         }}
//                         className={`flex-shrink-0 w-10 h-10 sm:w-10 sm:h-10   md:w-18 md:h-18 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
//                           activeImageIndex === idx 
//                             ? 'border-[#EE4275] shadow-[0_0_0_3px_rgba(238,66,117,0.2)]' 
//                             : 'border-[#FFD2DB]/40 hover:border-[#EE4275]/50'
//                         }`}
//                       >
//                         <img 
//                           src={img.url} 
//                           alt={`Thumb ${idx + 1}`} 
//                           className="w-full h-full object-cover"
//                           loading="lazy"
//                         />
//                       </button>
//                     ))}
                    
//                     {hasVideo && (
//                       <button
//                         onClick={() => {
//                           if (activeImageIndex !== productImages.length) {
//                             setActiveImageIndex(productImages.length);
//                             setIsZoomed(false);
//                           }
//                         }}
//                         className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 relative ${
//                           activeImageIndex === productImages.length 
//                             ? 'border-[#EE4275] shadow-[0_0_0_3px_rgba(238,66,117,0.2)]' 
//                             : 'border-[#FFD2DB]/40 hover:border-[#EE4275]/50'
//                         }`}
//                       >
//                         <div className="w-full h-full bg-gradient-to-br from-[#FFD2DB]/30 to-[#EE4275]/10 flex flex-col items-center justify-center">
//                           <Play className="w-6 h-6 text-[#EE4275]" />
//                           <span className="text-[8px] text-[#EE4275] font-medium mt-0.5">Video</span>
//                         </div>
//                       </button>
//                     )}
//                   </div>

//                   {/* Main Image - WITH ZOOM ON HOVER */}
//                   <div className="flex-1 order-1 sm:order-2 relative">
//                     <div className="relative bg-white rounded-2xl border border-[#FFD2DB]/30 overflow-hidden shadow-lg shadow-[#EE4275]/5">
//                       <div 
//                         className="relative w-full pt-[100%] cursor-zoom-in"
//                         onMouseEnter={() => !isMainVideo && !isMobile && setIsZoomed(true)}
//                         onMouseLeave={() => setIsZoomed(false)}
//                         onMouseMove={(e) => {
//                           if (!isZoomed || isMainVideo || isMobile) return;
//                           const rect = e.currentTarget.getBoundingClientRect();
//                           const x = ((e.clientX - rect.left) / rect.width) * 100;
//                           const y = ((e.clientY - rect.top) / rect.height) * 100;
//                           setZoomPosition({
//                             x: Math.min(Math.max(x, 0), 100),
//                             y: Math.min(Math.max(y, 0), 100)
//                           });
//                         }}
//                       >
//                         {(isTransitioning || !imageLoaded[activeImageIndex]) && !isMainVideo && (
//                           <div className="absolute inset-0 bg-gradient-to-br from-[#FFD2DB]/10 to-[#EE4275]/5 animate-pulse z-10" />
//                         )}
                        
//                         <div className="absolute inset-0 w-full h-full overflow-hidden">
//                           {!isMainVideo && mainImage ? (
//                             <>
//                               <img
//                                 key={activeImageIndex}
//                                 src={mainImage}
//                                 alt={product.productName}
//                                 className={`w-full h-full object-contain p-4 bg-white transition-opacity duration-300 ${
//                                   imageLoaded[activeImageIndex] ? 'opacity-100' : 'opacity-0'
//                                 }`}
//                                 style={{
//                                   transform: isZoomed && !isMobile ? 'scale(2.5)' : 'scale(1)',
//                                   transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
//                                   transition: 'transform 0.2s ease-out'
//                                 }}
//                                 onLoad={() => {
//                                   setImageLoaded(prev => ({ ...prev, [activeImageIndex]: true }));
//                                   setTimeout(() => setIsTransitioning(false), 100);
//                                 }}
//                                 loading={activeImageIndex === 0 ? "eager" : "lazy"}
//                                 fetchPriority={activeImageIndex === 0 ? "high" : "auto"}
//                                 decoding="async"
//                                 onError={(e) => {
//                                   e.target.onerror = null;
//                                   e.target.src = 'https://via.placeholder.com/800x800?text=Image+Not+Available';
//                                   setImageLoaded(prev => ({ ...prev, [activeImageIndex]: true }));
//                                 }}
//                               />
                              
//                               {/* Zoom Overlay - Blur Effect on Hover */}
//                               {isZoomed && !isMobile && !isMainVideo && (
//                                 <div className="absolute inset-0 bg-[#FFF8F9]/30 backdrop-blur-[2px] pointer-events-none z-10" />
//                               )}
//                             </>
//                           ) : isMainVideo && mainVideoUrl && (
//                             mainVideoType === 'youtube' ? (
//                               <iframe 
//                                 src={mainVideoUrl} 
//                                 className="w-full h-full aspect-square" 
//                                 allowFullScreen 
//                                 title="Product Video"
//                               />
//                             ) : (
//                               <video 
//                                 src={mainVideoUrl} 
//                                 controls 
//                                 className="w-full h-full object-contain bg-white"
//                               />
//                             )
//                           )}
//                         </div>
//                       </div>

//                       {/* Hover Zoom Indicator */}
//                       {!isMainVideo && !isMobile && !isZoomed && (
//                         <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-all duration-300 flex items-center justify-center pointer-events-none z-20">
//                           <div className="bg-white/80 backdrop-blur-sm text-[#2D1B2E] text-[10px] px-3 py-1.5 rounded-full flex items-center gap-2 opacity-0 hover:opacity-100 transition-opacity shadow-lg border border-[#FFD2DB]/30">
//                             <ZoomIn className="w-3.5 h-3.5 text-[#EE4275]" />
//                             <span className="hidden xs:inline font-medium">Hover to zoom</span>
//                           </div>
//                         </div>
//                       )}

//                       {/* Badges */}
//                       {discountPercent > 0 && (
//                         <div className="absolute top-3 left-3 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1 z-30">
//                           <Zap className="w-3 h-3" />
//                           {discountPercent}% OFF
//                         </div>
//                       )}
                      
//                       {/* Tag Badge - FIXED: Using getTagName and getTagStyle */}
//                       {primaryTag && (
//                         <div className={`absolute top-3 right-3 ${getTagStyle(primaryTag)} text-[9px] sm:text-xs font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1 z-30`}>
//                           <Sparkles className="w-3 h-3" />
//                           {primaryTagName}
//                         </div>
//                       )}

//                       {/* Fullscreen Zoom Button */}
//                       {!isMainVideo && (
//                         <button
//                           onClick={() => setShowZoom(true)}
//                           className="absolute bottom-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all hover:scale-105 z-30"
//                           aria-label="View fullscreen"
//                         >
//                           <Maximize2 className="w-4 h-4 text-[#EE4275]" />
//                         </button>
//                       )}

//                       {/* Image Counter */}
//                       <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full z-30">
//                         {activeImageIndex + 1} / {productImages.length}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column - Product Info - Beauty Styled */}
//             <div className="lg:col-span-1">
//               <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#FFD2DB]/30 shadow-lg shadow-[#EE4275]/5">
                
//                 {/* Category Tags */}
//                 <div className="flex flex-wrap items-center gap-1.5 mb-4">
//                   {categoryHierarchy.map((cat, idx) => (
//                     <span 
//                       key={idx} 
//                       className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium rounded-full bg-[#FFF5F6] text-[#EE4275] border border-[#FFD2DB]/30"
//                     >
//                       <FolderTree className="w-2.5 h-2.5" />
//                       {cat}
//                     </span>
//                   ))}
                  
//                   {product.brand && (
//                     <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium rounded-full bg-[#FFF5F6] text-[#EE4275] border border-[#FFD2DB]/30">
//                       <Building2 className="w-2.5 h-2.5" />
//                       {product.brand}
//                     </span>
//                   )}
//                 </div>

//                 {/* Title */}
//                 <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2D1B2E] mb-3" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
//                   {product.productName}
//                 </h1>

//                 {/* Rating */}
//                 {product.rating > 0 && (
//                   <div className="flex items-center gap-2 mb-4">
//                     <div className="flex items-center">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <Star
//                           key={star}
//                           className={`w-3.5 h-3.5 ${
//                             star <= Math.floor(product.rating)
//                               ? 'fill-[#EE4275] text-[#EE4275]'
//                               : star - 0.5 <= product.rating
//                               ? 'fill-[#EE4275] text-[#EE4275] opacity-50'
//                               : 'text-gray-300'
//                           }`}
//                         />
//                       ))}
//                     </div>
//                     <span className="text-xs text-[#8B7A8C]">({product.rating})</span>
//                   </div>
//                 )}

//                 {/* Price Card */}
//                 <div className="mb-4 p-4 bg-gradient-to-r from-[#FFF5F6] to-[#FFD2DB]/20 rounded-xl border border-[#FFD2DB]/30">
//                   <div className="flex items-baseline gap-3 flex-wrap">
//                     <span className="text-2xl sm:text-3xl font-bold text-[#EE4275]" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
//                       ৳{formatPrice(currentPrice)}
//                     </span>
//                     {discountPercent > 0 && (
//                       <>
//                         <span className="text-sm text-gray-400 line-through">৳{formatPrice(product.regularPrice)}</span>
//                         <span className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] px-2 py-0.5 rounded-full">
//                           Save {discountPercent}%
//                         </span>
//                       </>
//                     )}
//                   </div>
                  
//                   <div className="flex flex-wrap items-center gap-3 mt-2">
//                     {product.codAvailable && (
//                       <span className="flex items-center gap-1.5 text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full">
//                         <Truck className="w-3.5 h-3.5" />
//                         Cash on Delivery
//                       </span>
//                     )}
//                     <span className="flex items-center gap-1.5 text-xs text-[#8B7A8C]">
//                       <Package className="w-3.5 h-3.5" />
//                       {getUnitLabel(product.unit)}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Short Description */}
//                 <div className="mb-4 p-3 bg-[#FFF5F6] rounded-xl border border-[#FFD2DB]/20">
//                   {product.shortDescription && product.shortDescription !== '<p></p>' ? (
//                     <div 
//                       className="text-xs sm:text-sm text-[#4A3A4B] leading-relaxed"
//                       dangerouslySetInnerHTML={{ __html: product.shortDescription }} 
//                     />
//                   ) : (
//                     <p className="text-xs sm:text-sm text-gray-400 italic">
//                       No short description available.
//                     </p>
//                   )}
//                 </div>

//                 {/* Colors */}
//                 {hasColors && (
//                   <div className="mb-4">
//                     <p className="text-xs font-medium text-[#2D1B2E] mb-2 flex items-center gap-1.5">
//                       <Palette className="w-3.5 h-3.5 text-[#EE4275]" />
//                       Available Colors:
//                     </p>
//                     <div className="flex flex-wrap gap-2">
//                       {product.colors.map((color, idx) => (
//                         <div key={idx} className="flex items-center gap-1.5">
//                           <div 
//                             className="w-7 h-7 rounded-full border-2 border-[#FFD2DB]/50 shadow-sm hover:scale-110 transition-transform cursor-pointer"
//                             style={{ backgroundColor: color }}
//                             title={color}
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Stock Status */}
//                 <div className="flex items-center gap-2 mb-4">
//                   <div className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full ${
//                     stockStatus.color === 'green' ? 'bg-green-50 text-green-600' :
//                     stockStatus.color === 'orange' ? 'bg-orange-50 text-orange-600' :
//                     'bg-red-50 text-red-600'
//                   }`}>
//                     <StockIcon className="w-3.5 h-3.5" />
//                     <span>{stockStatus.label}</span>
//                     {stockStatus.label === 'Low Stock' && (
//                       <span className="text-[10px] text-orange-500">(Only {product.stockQuantity} left)</span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Quantity + Add to Cart + Buy Now */}
//                 <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
//                   {/* Quantity Selector - Beauty Style */}
//                   <div className="flex items-center rounded-full border-2 border-[#FFD2DB]/40 overflow-hidden bg-white">
//                     <button 
//                       onClick={() => handleQuantityChange(-1)} 
//                       disabled={quantity <= 1} 
//                       className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[#EE4275] hover:bg-[#FFF5F6] disabled:opacity-50 transition"
//                     >
//                       <Minus className="w-3.5 h-3.5" />
//                     </button>
//                     <input
//                       type="number"
//                       value={quantity === '' ? '' : quantity}
//                       onChange={(e) => handleQuantityInput(e)}
//                       onBlur={() => {
//                         if (quantity === '' || quantity === null) {
//                           setQuantity(1);
//                         }
//                       }}
//                       min="1"
//                       max={product.stockQuantity}
//                       className="w-12 sm:w-14 text-center font-medium text-[#2D1B2E] text-sm sm:text-base outline-none border-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
//                     />
//                     <button 
//                       onClick={() => handleQuantityChange(1)} 
//                       disabled={quantity >= product.stockQuantity} 
//                       className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[#EE4275] hover:bg-[#FFF5F6] disabled:opacity-50 transition"
//                     >
//                       <Plus className="w-3.5 h-3.5" />
//                     </button>
//                   </div>

//                   {/* Add to Cart OR View in Cart */}
//                   {isInCart ? (
//                     <button
//                       onClick={openCartSidebar}
//                       className="flex-1 py-2.5 px-4 bg-gradient-to-r from-[#a80883] to-[#6c0756] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#a80883]/25 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
//                     >
//                       <ShoppingCart className="w-4 h-4" />
//                       View in Cart
//                     </button>
//                   ) : (
//                     <button
//                       onClick={handleAddToCart}
//                       disabled={addingToCart || product.stockQuantity <= 0}
//                       className="flex-1 py-2.5 px-4 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-xs sm:text-sm"
//                     >
//                       {addingToCart ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingCart className="w-4 h-4" />}
//                       {addingToCart ? 'Adding...' : 'Add to Cart'}
//                     </button>
//                   )}

//                   {/* Buy Now */}
//                   <button
//                     onClick={handleBuyNow}
//                     disabled={addingToCart || product.stockQuantity <= 0}
//                     className="flex-1 py-2.5 px-4 bg-[#2D1B2E] text-white font-semibold rounded-full hover:bg-[#3D2B3E] transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-xs sm:text-sm"
//                   >
//                     <Zap className="w-4 h-4" />
//                     Buy Now
//                   </button>
//                 </div>

             

//                 {/* Delivery Info - Beauty Styled */}
//                 {hasDeliveryInfo && (
//                   <div className="bg-gradient-to-r from-[#FFF5F6] to-[#FFD2DB]/20 rounded-xl p-4 border border-[#FFD2DB]/30">
//                     <div className="flex items-center gap-2 mb-2">
//                       <div className="p-1.5 bg-[#EE4275]/10 rounded-full">
//                         <Truck className="w-4 h-4 text-[#EE4275]" />
//                       </div>
//                       <span className="font-semibold text-[#2D1B2E] text-sm" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
//                         Delivery Information
//                       </span>
//                     </div>
//                     <div 
//                       className="prose prose-sm max-w-none text-[#4A3A4B] text-xs sm:text-sm"
//                       style={{ lineHeight: '1.6' }}
//                       dangerouslySetInnerHTML={{ __html: product.deliveryInfo }} 
//                     />
//                     <div className="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t border-[#FFD2DB]/30">
//                       <div className="flex items-center gap-1 text-[10px] text-[#8B7A8C]">
//                         <RotateCcw className="w-3.5 h-3.5" />
//                         <span>7 Days Return</span>
//                       </div>
//                       <div className="flex items-center gap-1 text-[10px] text-[#8B7A8C]">
//                         <ShieldCheck className="w-3.5 h-3.5" />
//                         <span>Safe & Secure</span>
//                       </div>
//                       <div className="flex items-center gap-1 text-[10px] text-[#8B7A8C]">
//                         <Award className="w-3.5 h-3.5" />
//                         <span>Genuine Products</span>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Tabs Section - Specifications & Description */}
//           <div className="mt-10 sm:mt-14">
//             <div className="flex flex-wrap gap-1 border-b border-[#FFD2DB]/40">
//               <button
//                 onClick={() => setActiveTab('description')}
//                 className={`px-4 sm:px-6 py-2.5 sm:py-3 font-semibold text-xs sm:text-sm rounded-t-xl transition-all flex items-center gap-2 ${
//                   activeTab === 'description' 
//                     ? 'bg-white text-[#EE4275] border-t-2 border-l-2 border-r-2 border-[#EE4275]/30 border-b-white shadow-sm' 
//                     : 'text-[#8B7A8C] hover:text-[#2D1B2E]'
//                 }`}
//                 style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
//               >
//                 <FileText className="w-4 h-4" />
//                 Description
//               </button>
//               <button
//                 onClick={() => setActiveTab('specifications')}
//                 className={`px-4 sm:px-6 py-2.5 sm:py-3 font-semibold text-xs sm:text-sm rounded-t-xl transition-all flex items-center gap-2 ${
//                   activeTab === 'specifications' 
//                     ? 'bg-white text-[#EE4275] border-t-2 border-l-2 border-r-2 border-[#EE4275]/30 border-b-white shadow-sm' 
//                     : 'text-[#8B7A8C] hover:text-[#2D1B2E]'
//                 }`}
//                 style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
//               >
//                 <List className="w-4 h-4" />
//                 Specifications
//               </button>
//             </div>

//             <div className="bg-white rounded-b-xl rounded-tr-xl border border-t-0 border-[#FFD2DB]/30 p-4 sm:p-6">
//               {activeTab === 'description' && (
//                 <div className="prose prose-sm max-w-none text-[#4A3A4B]">
//                   {product.fullDescription && product.fullDescription !== '<p></p>' ? (
//                     <div dangerouslySetInnerHTML={{ __html: product.fullDescription }} />
//                   ) : (
//                     <p className="text-gray-400 italic">No description available.</p>
//                   )}
//                 </div>
//               )}

//               {activeTab === 'specifications' && (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                   {specifications.map((item, idx) => (
//                     <div key={idx} className="flex items-center gap-3 p-3 bg-[#FFF5F6] rounded-xl border border-[#FFD2DB]/20">
//                       <div className="p-2 bg-[#EE4275]/10 rounded-full">
//                         <item.icon className="w-4 h-4 text-[#EE4275]" />
//                       </div>
//                       <div>
//                         <p className="text-[10px] text-[#8B7A8C]">{item.label}</p>
//                         <p className="font-medium text-[#2D1B2E] text-xs sm:text-sm">{item.value || 'N/A'}</p>
//                       </div>
//                     </div>
//                   ))}
                  
//                   {specifications.length === 0 && (
//                     <div className="col-span-2 text-center py-8 text-gray-400">
//                       <Package className="w-8 h-8 mx-auto mb-2 text-[#FFD2DB]" />
//                       <p>No specifications available</p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Related Products Section - Beauty Styled */}
//           {relatedProducts.length > 0 && (
//             <div className="mt-10 sm:mt-14">
//               <div className="flex items-center justify-between mb-4 sm:mb-6">
//                 <div className="flex items-center gap-2">
//                   <div className="p-2 bg-[#EE4275]/10 rounded-full">
//                     <Flower2 className="w-5 h-5 text-[#EE4275]" />
//                   </div>
//                   <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#2D1B2E]" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
//                     You May Also Like
//                   </h2>
//                 </div>
                
//                 {relatedProducts.length > carouselItemsPerView && (
//                   <div className="flex items-center gap-1.5">
//                     <button
//                       onClick={handlePrevSlide}
//                       disabled={carouselIndex === 0}
//                       className={`p-2 rounded-full transition-all ${
//                         carouselIndex === 0 
//                           ? 'bg-[#FFF5F6] text-[#FFD2DB] cursor-not-allowed' 
//                           : 'bg-white border border-[#FFD2DB]/40 text-[#EE4275] hover:bg-[#FFF5F6] hover:scale-105'
//                       }`}
//                     >
//                       <ChevronLeft className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={handleNextSlide}
//                       disabled={carouselIndex >= relatedProducts.length - carouselItemsPerView}
//                       className={`p-2 rounded-full transition-all ${
//                         carouselIndex >= relatedProducts.length - carouselItemsPerView 
//                           ? 'bg-[#FFF5F6] text-[#FFD2DB] cursor-not-allowed' 
//                           : 'bg-white border border-[#FFD2DB]/40 text-[#EE4275] hover:bg-[#FFF5F6] hover:scale-105'
//                       }`}
//                     >
//                       <ChevronRight className="w-4 h-4" />
//                     </button>
//                   </div>
//                 )}
//               </div>
              
//               <div className="relative overflow-hidden">
//                 <motion.div
//                   className="flex gap-3 sm:gap-4"
//                   animate={{ x: `-${carouselIndex * (100 / carouselItemsPerView)}%` }}
//                   transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                   style={{ width: `${(relatedProducts.length / carouselItemsPerView) * 100}%` }}
//                 >
//                   {relatedProducts.map((relProduct) => (
//                     <div 
//                       key={relProduct._id} 
//                       className="flex-shrink-0"
//                       style={{ width: `${100 / relatedProducts.length}%` }}
//                     >
//                       <RelatedProductCard 
//                         product={relProduct} 
//                         router={router}
//                         isInCart={productsInCart[relProduct._id] || false}
//                         onViewInCart={openCartSidebar}
//                       />
//                     </div>
//                   ))}
//                 </motion.div>
//               </div>
              
//               {relatedProducts.length > carouselItemsPerView && (
//                 <div className="flex justify-center gap-1.5 mt-4">
//                   {Array.from({ length: Math.ceil(relatedProducts.length / carouselItemsPerView) }).map((_, idx) => {
//                     const pageIndex = idx * carouselItemsPerView;
//                     const isActive = carouselIndex >= pageIndex && carouselIndex < pageIndex + carouselItemsPerView;
//                     return (
//                       <button
//                         key={idx}
//                         onClick={() => {
//                           handleCarouselInteraction();
//                           setCarouselIndex(pageIndex);
//                         }}
//                         className={`h-1.5 rounded-full transition-all duration-300 ${
//                           isActive ? 'w-6 bg-[#EE4275]' : 'w-1.5 bg-[#FFD2DB] hover:bg-[#EE4275]/50'
//                         }`}
//                       />
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Modals */}
//       <AnimatePresence>
//         {showZoom && (
//           <ZoomModal 
//             images={productImages} 
//             currentIndex={activeImageIndex}
//             onClose={() => setShowZoom(false)} 
//             onImageChange={(index) => {
//               setActiveImageIndex(index);
//               setShowZoom(true);
//             }}
//           />
//         )}
//       </AnimatePresence>

//       {/* Cart Sidebar */}
//       <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />

//       <Footer />

//       <style jsx global>{`
//         .prose {
//           max-width: none;
//         }
        
//         .prose h1 {
//           font-size: 1.5em;
//           font-weight: 600;
//           margin: 0.75em 0 0.5em;
//           color: #2D1B2E;
//         }
        
//         .prose h2 {
//           font-size: 1.3em;
//           font-weight: 600;
//           margin: 0.7em 0 0.4em;
//           color: #2D1B2E;
//         }
        
//         .prose h3 {
//           font-size: 1.1em;
//           font-weight: 600;
//           margin: 0.6em 0 0.3em;
//           color: #2D1B2E;
//         }
        
//         .prose p {
//           margin: 0.5em 0;
//           line-height: 1.6;
//           color: #4A3A4B;
//         }
        
//         .prose ul {
//           list-style-type: disc;
//           padding-left: 1.5em;
//           margin: 0.5em 0;
//         }
        
//         .prose ol {
//           list-style-type: decimal;
//           padding-left: 1.5em;
//           margin: 0.5em 0;
//         }
        
//         .prose li {
//           margin: 0.2em 0;
//           color: #4A3A4B;
//         }
        
//         .prose a {
//           color: #EE4275;
//           text-decoration: underline;
//         }
        
//         .prose strong {
//           font-weight: 600;
//           color: #2D1B2E;
//         }
        
//         .prose em {
//           font-style: italic;
//         }
        
//         .prose blockquote {
//           border-left: 3px solid #EE4275;
//           padding-left: 1em;
//           margin: 0.5em 0;
//           color: #8B7A8C;
//           font-style: italic;
//         }
        
//         .prose img {
//           max-width: 100%;
//           height: auto;
//           border-radius: 0.5rem;
//         }
        
//         .prose table {
//           width: 100%;
//           border-collapse: collapse;
//           margin: 1em 0;
//         }
        
//         .prose th,
//         .prose td {
//           border: 1px solid #FFD2DB;
//           padding: 0.5em;
//           text-align: left;
//           color: #4A3A4B;
//         }
        
//         .prose th {
//           background-color: #FFF5F6;
//           font-weight: 600;
//           color: #2D1B2E;
//         }
//       `}</style>
//     </>
//   );
// }



'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  ShoppingCart,
  Truck,
  ShieldCheck,
  RotateCcw,
  AlertCircle,
  CheckCircle,
  Minus,
  Plus,
  ZoomIn,
  Sparkles,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Package,
  Tag,
  Clock,
  Copy,
  Check,
  Loader2,
  Eye,
  FolderTree,
  Maximize2,
  Zap,
  Info,
  Award,
  TrendingUp,
  Flame,
  Clock as ClockIcon,
  Building2,
  Box,
  Scale,
  List,
  FileText,
  AlertTriangle,
  Palette,
  Flower2,
  Heart,
  Share2,
  MessageCircle
} from 'lucide-react';

import { toast } from 'sonner';
import WhatsAppButton from '../components/layout/WhatsAppButton';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import MetadataUpdater from '../productDetails/MetadataUpdater';
import CartSidebar from '../components/CartSidebar';

// ========== HELPER FUNCTIONS ==========

const getTagName = (tag) => {
  if (!tag) return '';
  if (typeof tag === 'string') {
    if (/^[0-9a-fA-F]{24}$/.test(tag)) {
      return '';
    }
    return tag;
  }
  if (typeof tag === 'object') {
    if (tag.name) return tag.name;
    if (tag._id && typeof tag._id === 'object' && tag._id.name) {
      return tag._id.name;
    }
    if (Array.isArray(tag) && tag.length > 0) {
      return getTagName(tag[0]);
    }
    if (tag.title) return tag.title;
    if (tag.label) return tag.label;
    return String(tag._id || tag);
  }
  return String(tag);
};

const getTagImage = (tag) => {
  if (!tag) return null;
  if (typeof tag === 'object') {
    if (tag.image && tag.image.url) {
      return tag.image.url;
    }
    if (tag.image && typeof tag.image === 'string') {
      return tag.image;
    }
    if (tag.imageUrl) {
      return tag.imageUrl;
    }
  }
  return null;
};

const getTagValue = (tag) => {
  if (!tag) return '';
  if (typeof tag === 'string') return tag;
  if (typeof tag === 'object') {
    if (tag.name) return tag.name;
    if (tag._id && typeof tag._id === 'object' && tag._id.name) {
      return tag._id.name;
    }
    if (tag._id) return tag._id;
    return String(tag);
  }
  return String(tag);
};

const getTagStyle = (tag) => {
  const tagName = getTagName(tag);
  const styles = {
    'Best Seller': 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30',
    'Trending': 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white shadow-lg shadow-[#EE4275]/30',
    'New Release': 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30',
    'Limited Offer': 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30',
    'Flash Sale': 'bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-lg shadow-red-500/30',
    'Clearance': 'bg-gradient-to-r from-gray-500 to-gray-700 text-white shadow-lg shadow-gray-500/30',
  };
  return styles[tagName] || 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white shadow-lg shadow-[#EE4275]/30';
};

const formatPrice = (price) => {
  return (price || 0).toFixed(2);
};

const calculateDiscount = (regular, discount) => {
  if (regular && discount && discount < regular) {
    return Math.round(((regular - discount) / regular) * 100);
  }
  return 0;
};

const calculateDiscountPercentage = (regularPrice, discountPrice) => {
  if (regularPrice && discountPrice && discountPrice < regularPrice) {
    return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
  }
  return 0;
};

const getUnitLabel = (unit) => {
  const units = {
    'pcs': 'pcs',
    'ton': 'ton',
    'other': 'unit'
  };
  return units[unit] || unit;
};

const getStockStatus = (quantity, alertQuantity) => {
  if (quantity <= 0) return { label: 'Out of Stock', color: 'red', icon: AlertCircle };
  if (alertQuantity > 0 && quantity <= alertQuantity) return { label: 'Low Stock', color: 'orange', icon: AlertCircle };
  return { label: 'In Stock', color: 'green', icon: CheckCircle };
};

const truncateText = (text, limit = 35) => {
  if (!text) return '';
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
};

// ========== LOADING SKELETON ==========

const ProductSkeleton = () => (
  <div className="min-h-screen bg-[#FFF8F9]">
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        <div className="animate-pulse">
          <div className="bg-[#FFD2DB]/30 rounded-2xl h-64 sm:h-96 w-full"></div>
        </div>
        <div className="space-y-3 sm:space-y-4 animate-pulse">
          <div className="h-6 sm:h-8 bg-[#FFD2DB]/30 rounded w-3/4"></div>
          <div className="h-4 sm:h-6 bg-[#FFD2DB]/30 rounded w-1/2"></div>
          <div className="h-16 sm:h-24 bg-[#FFD2DB]/30 rounded"></div>
          <div className="h-10 sm:h-12 bg-[#FFD2DB]/30 rounded w-full"></div>
        </div>
      </div>
    </div>
  </div>
);

// ========== ZOOM MODAL ==========

const ZoomModal = ({ images, currentIndex, onClose, onImageChange }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
    onClick={onClose}
  >
    <div className="relative w-full h-full flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 sm:p-3 bg-white/20 rounded-full hover:bg-white/30 transition z-10 backdrop-blur-sm"
      >
        <X className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
      </button>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          onImageChange((currentIndex - 1 + images.length) % images.length);
        }}
        className="absolute left-1 sm:left-4 p-2 sm:p-3 bg-white/20 rounded-full hover:bg-white/30 transition z-10 backdrop-blur-sm"
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
      </button>
      
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="relative max-w-5xl w-full mx-1 sm:mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]?.url}
          alt="Zoomed product"
          className="w-full h-auto max-h-[70vh] sm:max-h-[80vh] object-contain rounded-xl sm:rounded-2xl shadow-2xl"
        />
      </motion.div>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          onImageChange((currentIndex + 1) % images.length);
        }}
        className="absolute right-1 sm:right-4 p-2 sm:p-3 bg-white/20 rounded-full hover:bg-white/30 transition z-10 backdrop-blur-sm"
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
      </button>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  </motion.div>
);

// ========== RELATED PRODUCT CARD ==========

const RelatedProductCard = ({ product, router, isInCart: propIsInCart, onViewInCart }) => {
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

  const handleCardClick = () => {
    if (isMobileDevice) {
      window.location.href = `/productDetails?id=${product._id}`;
    } else {
      window.open(`/productDetails?id=${product._id}`, '_blank');
    }
  };

  const handleEyeClick = (e) => {
    e.stopPropagation();
    if (isMobileDevice) {
      window.location.href = `/productDetails?id=${product._id}`;
    } else {
      window.open(`/productDetails?id=${product._id}`, '_blank');
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
      <div className="relative w-full h-28 sm:h-36 md:h-40 overflow-hidden bg-gradient-to-br from-[#FFD2DB]/15 to-[#EE4275]/5">
        <motion.img
          src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://via.placeholder.com/300?text=Beauty'}
          alt={product.productName}
          className="w-full h-full object-contain p-1 sm:p-2"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300?text=Beauty';
          }}
          loading="lazy"
        />
        
        {discountPercent > 0 && (
          <div className="absolute top-0.5 left-0.5 m-1 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-[5px] sm:text-[6px] md:text-[9px] font-bold px-0.5 py-0.5 sm:px-1 rounded-md shadow-lg z-20 flex items-center gap-0.5">
            <Zap className="w-1 h-1 sm:w-1.5 sm:h-1.5" />
            {discountPercent}% OFF
          </div>
        )}
        
        {primaryTagName && (
          <motion.div 
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="absolute top-0.5 right-0.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-[5px] sm:text-[6px] md:text-[9px] px-0.5 py-0.5 sm:px-1 m-1 font-semibold rounded-md z-20 flex items-center gap-0.5 shadow-lg"
          >
            <span className="truncate max-w-[25px] sm:max-w-[35px] md:max-w-[60px]">
              {primaryTagName}
            </span>
          </motion.div>
        )}
        
        <div className="absolute top-1/2 -translate-y-1/2 right-1 sm:right-2 flex flex-col gap-1 sm:gap-2 z-30">
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ 
              x: !isMobileDevice && isHovered ? 0 : 40, 
              opacity: !isMobileDevice && isHovered ? 1 : 0 
            }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onClick={handleEyeClick}
            className="hidden sm:flex w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-white shadow-md hover:bg-[#EE4275] items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
          >
            <Eye className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#EE4275] hover:text-white transition-colors duration-200" />
          </motion.div>
          
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ 
              x: !isMobileDevice && isHovered ? 0 : 40, 
              opacity: !isMobileDevice && isHovered ? 1 : 0 
            }}
            transition={{ duration: 0.15, ease: "easeOut", delay: 0.03 }}
            onClick={addToCart}
            className="hidden sm:flex w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-white shadow-md hover:bg-[#EE4275] items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
          >
            {cartStatusLoading ? (
              <Loader2 className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 animate-spin text-[#EE4275] hover:text-white" />
            ) : isInCart ? (
              <ShoppingCart className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-green-500" />
            ) : (
              <ShoppingCart className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#EE4275] hover:text-white transition-colors duration-200" />
            )}
          </motion.div>
        </div>
        
        <div className={`absolute bottom-1 left-0 right-0 flex justify-center gap-1 z-30 px-1 ${
          isMobileDevice ? 'flex' : 'hidden'
        }`}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleEyeClick}
            className="bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-md flex items-center justify-center"
          >
            <Eye className="w-2 h-2 text-[#EE4275]" />
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={addToCart}
            className="bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-md flex items-center justify-center"
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
      
      {hasMultipleImages && (
        <div className="flex justify-center items-center gap-0.5 py-1 bg-[#FFF5F6] border-b border-[#FFD2DB]/30">
          {productImages.slice(0, 4).map((image, index) => (
            <button
              key={index}
              className={`w-2 h-2 sm:w-3 sm:h-3 md:w-5 md:h-5 overflow-hidden rounded transition-all duration-200 ${
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

      <div className="p-1 sm:p-2">
        <h3 className="text-[8px] sm:text-[10px] md:text-xs font-semibold text-gray-800 line-clamp-2 hover:text-[#EE4275] transition-colors duration-200 mb-0.5 sm:mb-1" style={{ fontFamily: 'Playfair Display, Georgia, serif' }} title={product.productName}>
          {truncateText(product.productName, 12)}
        </h3>
        
        <div className="flex items-center justify-between mb-0.5 sm:mb-1">
          {product.brand && (
            <div className="inline-flex items-center gap-0.5 px-0.5 py-0.5 rounded-full text-[5px] sm:text-[6px] md:text-[8px] font-medium text-[#EE4275] bg-[#FFF5F6] border border-[#FFD2DB]/30">
              <Building2 className="w-1 h-1 sm:w-1.5 sm:h-1.5" />
              {truncateText(product.brand, 8)}
            </div>
          )}
          
          {product.rating > 0 && (
            <div className="flex items-center gap-0.5">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2.5 md:h-2.5 ${
                      star <= Math.floor(product.rating)
                        ? 'fill-[#EE4275] text-[#EE4275]'
                        : star - 0.5 <= product.rating
                        ? 'fill-[#EE4275] text-[#EE4275] opacity-50'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[5px] sm:text-[6px] md:text-[8px] text-gray-500">({product.rating})</span>
            </div>
          )}
        </div>

        <div className="flex items-baseline gap-0.5 sm:gap-1 mb-0.5 sm:mb-1">
          <span className="text-[9px] sm:text-xs md:text-sm font-bold text-[#EE4275]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            ৳{formatPrice(currentPrice)}
          </span>
          {discountPercent > 0 && (
            <>
              <span className="text-[5px] sm:text-[6px] md:text-[8px] text-gray-400 line-through">
                ৳{formatPrice(originalPrice)}
              </span>
              <span className="text-[4px] sm:text-[5px] md:text-[7px] font-semibold text-white bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] px-0.5 py-0.5 rounded">
                -{discountPercent}%
              </span>
            </>
          )}
        </div>

        <div className="flex items-center justify-between gap-1">
          {product.category?.name && (
            <div className="flex items-center gap-0.5 text-[4px] sm:text-[5px] md:text-[7px] text-[#8B7A8C]">
              <Package className="w-1 h-1 sm:w-1.5 sm:h-1.5" />
              <span className="truncate max-w-[30px] sm:max-w-[50px] md:max-w-[70px]">{product.category.name}</span>
            </div>
          )}
          
          {!product.category?.name && (
            <div className="text-[4px] sm:text-[5px] md:text-[7px] text-gray-400">✨ Beauty</div>
          )}
          
          <div className="flex-shrink-0">
            {product.stockQuantity > 0 ? (
              <span className="flex items-center gap-0.5 text-[4px] sm:text-[5px] md:text-[7px] text-green-600 font-medium">
                <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-green-500 rounded-full animate-pulse"></div>
                <span className="hidden sm:inline">In Stock</span>
                <span className="sm:hidden">Stock</span>
              </span>
            ) : (
              <span className="flex items-center gap-0.5 text-[4px] sm:text-[5px] md:text-[7px] text-red-500 font-medium">
                <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-red-500 rounded-full"></div>
                <span className="hidden sm:inline">Out of Stock</span>
                <span className="sm:hidden">Out</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="block sm:hidden px-1 pb-1">
        {cartStatusLoading ? (
          <button
            disabled
            className="w-full py-0.5 text-center text-[6px] sm:text-[8px] font-bold bg-gray-300 text-gray-500 rounded-lg flex items-center justify-center gap-0.5"
          >
            <Loader2 className="w-2 h-2 animate-spin" />
            Loading...
          </button>
        ) : isInCart ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewInCart();
            }}
            className="w-full py-0.5 text-center text-[6px] sm:text-[8px] font-bold bg-gradient-to-r from-[#a80883] to-[#6c0756] text-white hover:from-[#8e066f] hover:to-[#3b032f] rounded-lg flex items-center justify-center gap-0.5"
          >
            <ShoppingCart className="w-2 h-2" />
            View Cart
          </button>
        ) : (
          <button
            onClick={addToCart}
            className="w-full py-0.5 text-center text-[6px] sm:text-[8px] font-bold bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-lg flex items-center justify-center gap-0.5"
          >
            <ShoppingCart className="w-2 h-2" />
            Add to Cart
          </button>
        )}
      </div>

      <div className="hidden sm:block">
        {cartStatusLoading ? (
          <button
            disabled
            className="w-full py-0.5 sm:py-1 text-center text-[6px] sm:text-[7px] md:text-[9px] font-bold bg-gray-300 text-gray-500 flex items-center justify-center gap-1"
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
            className="w-full py-0.5 sm:py-1 text-center text-[6px] sm:text-[7px] md:text-[9px] font-bold bg-gradient-to-r from-[#a80883] to-[#6c0756] text-white hover:from-[#8e066f] hover:to-[#3b032f] transition-all duration-200 flex items-center justify-center gap-1"
          >
            <ShoppingCart className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
            <span className="hidden sm:inline">View in Cart</span>
            <span className="sm:hidden">Cart</span>
          </button>
        ) : (
          <button
            onClick={addToCart}
            className="w-full py-0.5 sm:py-1 text-center text-[6px] sm:text-[7px] md:text-[9px] font-bold bg-gradient-to-r from-[#ca4f74] to-[#FF6B9D] text-white hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all duration-200 flex items-center justify-center gap-1"
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

// ========== MAIN PRODUCT DETAILS COMPONENT ==========

export default function ProductDetailsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isInCart, setIsInCart] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [imageLoaded, setImageLoaded] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [videoThumbnail, setVideoThumbnail] = useState(null);
  const [generatingThumbnail, setGeneratingThumbnail] = useState(false);
  const [checkingCart, setCheckingCart] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselItemsPerView, setCarouselItemsPerView] = useState(5);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollIntervalRef = useRef(null);
  const [productsInCart, setProductsInCart] = useState({});
  const [activeTab, setActiveTab] = useState('description');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const mainImageRef = useRef(null);
  const galleryRef = useRef(null);

  const openCartSidebar = () => setIsCartOpen(true);
  const closeCartSidebar = () => setIsCartOpen(false);

  // ========== CART STATUS FUNCTIONS ==========

  const checkCartStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      } else {
        setIsInCart(false);
        setCheckingCart(false);
        return;
      }
      
      if (!product || !product._id) {
        setCheckingCart(false);
        return;
      }
      
      const response = await fetch(`http://localhost:5000/api/cart/check/${product._id}`, { headers });
      const data = await response.json();
      
      if (data.success) {
        setIsInCart(data.data.inCart || false);
      } else {
        setIsInCart(false);
      }
    } catch (error) {
      console.error('Error checking cart status:', error);
      setIsInCart(false);
    } finally {
      setCheckingCart(false);
    }
  };

  // ========== EFFECTS ==========

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (productId) fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    if (product && product._id) {
      checkCartStatus();
    }
  }, [product]);

  useEffect(() => {
    const handleCartUpdate = () => {
      if (product && product._id) {
        setCheckingCart(true);
        checkCartStatus();
      }
    };
    
    window.addEventListener('cart-update', handleCartUpdate);
    return () => {
      window.removeEventListener('cart-update', handleCartUpdate);
    };
  }, [product]);

  useEffect(() => {
    const handleAuthChange = () => {
      if (product && product._id) {
        setIsInCart(false);
        setCheckingCart(true);
        setTimeout(() => {
          checkCartStatus();
        }, 100);
      }
    };
    
    window.addEventListener('auth-change', handleAuthChange);
    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, [product]);

  useEffect(() => {
    const handleFocus = () => {
      if (product && product._id) {
        checkCartStatus();
      }
    };
    
    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [product]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCarouselItemsPerView(2);
      } else if (window.innerWidth < 768) {
        setCarouselItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setCarouselItemsPerView(3);
      } else {
        setCarouselItemsPerView(5);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isAutoScrolling && relatedProducts.length > carouselItemsPerView) {
      autoScrollIntervalRef.current = setInterval(() => {
        setCarouselIndex((prev) => {
          const maxIndex = Math.max(0, relatedProducts.length - carouselItemsPerView);
          if (prev >= maxIndex) {
            return 0;
          }
          return prev + 1;
        });
      }, 5000);
    }
    
    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [isAutoScrolling, relatedProducts.length, carouselItemsPerView]);

  useEffect(() => {
    const refreshRelatedProductsStatus = async () => {
      if (relatedProducts.length === 0) return;
      
      const productIds = relatedProducts.map(p => p._id);
      const token = localStorage.getItem('token');
      const cartSessionId = localStorage.getItem('cartSessionId');
      
      const cartHeaders = {};
      if (token) cartHeaders['Authorization'] = `Bearer ${token}`;
      else if (cartSessionId) cartHeaders['x-session-id'] = cartSessionId;
      
      try {
        const cartResponse = await fetch('http://localhost:5000/api/cart/check-status', {
          method: 'POST',
          headers: { ...cartHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({ productIds })
        });
        const cartData = await cartResponse.json();
        if (cartData.success) setProductsInCart(cartData.data);
      } catch (error) {
        console.error('Error refreshing cart status:', error);
      }
    };
    
    refreshRelatedProductsStatus();
    
    const handleCartUpdate = () => refreshRelatedProductsStatus();
    window.addEventListener('cart-update', handleCartUpdate);
    return () => {
      window.removeEventListener('cart-update', handleCartUpdate);
    };
  }, [relatedProducts]);

  const handleCarouselInteraction = () => {
    setIsAutoScrolling(false);
    setTimeout(() => {
      setIsAutoScrolling(true);
    }, 5000);
  };

  const handlePrevSlide = () => {
    handleCarouselInteraction();
    setCarouselIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextSlide = () => {
    handleCarouselInteraction();
    const maxIndex = Math.max(0, relatedProducts.length - carouselItemsPerView);
    setCarouselIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`);
      const data = await response.json();
      if (data.success) {
        setProduct(data.data.product);
        setRelatedProducts(data.data.relatedProducts || []);
      } else {
        toast.error('Product not found');
        router.push('/products');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  // ========== ADD TO CART FUNCTION ==========
  const handleAddToCart = async () => {
    if (product.stockQuantity <= 0) {
      toast.error('Out of stock');
      return;
    }
    let finalQuantity = quantity === '' || quantity === null ? 1 : quantity;
    setAddingToCart(true);
    const toastId = toast.loading('Adding to cart...');
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      else if (sessionId) headers['x-session-id'] = sessionId;

      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers,
        body: JSON.stringify({ productId: product._id, quantity: finalQuantity })
      });
      const data = await response.json();
      if (data.success) {
        if (data.sessionId && !token) localStorage.setItem('cartSessionId', data.sessionId);
        setIsInCart(true);
        toast.success(`${finalQuantity} item(s) added to cart!`, { id: toastId });
        window.dispatchEvent(new Event('cart-update'));
        setTimeout(() => window.dispatchEvent(new Event('cart-update')), 500);
      } else {
        toast.error(data.error || 'Failed to add to cart', { id: toastId });
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Network error', { id: toastId });
    } finally {
      setAddingToCart(false);
    }
  };

  // ========== BUY NOW FUNCTION ==========
  const handleBuyNow = async () => {
    if (product.stockQuantity <= 0) {
      toast.error('Out of stock');
      return;
    }
    
    setAddingToCart(true);
    const toastId = toast.loading('Processing...');
    
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      else if (sessionId) headers['x-session-id'] = sessionId;

      const checkResponse = await fetch(`http://localhost:5000/api/cart/check/${product._id}`, { headers });
      const checkData = await checkResponse.json();
      
      let alreadyInCart = false;
      if (checkData.success) {
        alreadyInCart = checkData.data.inCart;
      }
      
      if (!alreadyInCart) {
        const response = await fetch('http://localhost:5000/api/cart', {
          method: 'POST',
          headers,
          body: JSON.stringify({ productId: product._id, quantity: quantity || 1 })
        });
        const data = await response.json();
        
        if (data.success) {
          if (data.sessionId && !token) localStorage.setItem('cartSessionId', data.sessionId);
          setIsInCart(true);
          window.dispatchEvent(new Event('cart-update'));
        } else {
          toast.error(data.error || 'Failed to process', { id: toastId });
          setAddingToCart(false);
          return;
        }
      }
      
      setTimeout(() => {
        toast.success('Redirecting to checkout...', { id: toastId });
        router.push('/checkout');
      }, 500);
      
    } catch (error) {
      console.error('Buy now error:', error);
      toast.error('Network error', { id: toastId });
    } finally {
      setAddingToCart(false);
    }
  };

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= (product?.stockQuantity || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleQuantityInput = (e) => {
    const rawValue = e.target.value;
    
    if (rawValue === '') {
      setQuantity('');
      return;
    }
    
    let value = parseInt(rawValue);
    
    if (isNaN(value)) {
      setQuantity(1);
      return;
    }
    
    if (value < 1) {
      value = 1;
    } else if (value > product.stockQuantity) {
      value = product.stockQuantity;
      toast.error(`Maximum quantity available is ${product.stockQuantity}`);
    }
    
    setQuantity(value);
  };

  const preloadImage = (src) => {
    const img = new Image();
    img.src = src;
  };

  const getYouTubeThumbnail = (url) => {
    if (!url) return null;
    
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\s?#]+)/,
      /youtube\.com\/v\/([^&\s?#]+)/,
      /youtube\.com\/live\/([^&\s?#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`;
      }
    }
    return null;
  };

  const generateVideoThumbnail = (videoUrl, callback) => {
    const video = document.createElement('video');
    video.crossOrigin = 'Anonymous';
    video.src = videoUrl;
    video.currentTime = 1.5;
    
    video.addEventListener('loadeddata', () => {
      setTimeout(() => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = 160;
        canvas.height = 160;
        
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
        callback(thumbnailUrl);
      }, 100);
    });
    
    video.addEventListener('error', () => {
      console.error('Error loading video for thumbnail generation');
      callback(null);
    });
    
    video.load();
  };

  if (loading) return <ProductSkeleton />;
  if (!product) return null;

  const discountPercent = calculateDiscount(product.regularPrice, product.discountPrice);
  const currentPrice = product.discountPrice && product.discountPrice < product.regularPrice ? product.discountPrice : product.regularPrice;
  const stockStatus = getStockStatus(product.stockQuantity, product.stockAlertQuantity);
  const StockIcon = stockStatus.icon;
  const productImages = product.images || [];
  const hasVideo = product.videoUrl && product.videoUrl.trim() !== '';
  const mediaItems = [...productImages];
  if (hasVideo) {
    mediaItems.push({ type: 'video', url: product.videoUrl, videoType: product.videoType });
  }
  const mainMedia = mediaItems[activeImageIndex];
  const isMainVideo = mainMedia?.type === 'video';
  const mainImage = !isMainVideo ? mainMedia?.url : null;
  const mainVideoUrl = isMainVideo ? mainMedia?.url : null;
  const mainVideoType = isMainVideo ? mainMedia?.videoType : null;

  const categoryHierarchy = [];
  if (product.categoryName) categoryHierarchy.push(product.categoryName);
  if (product.subcategoryName) categoryHierarchy.push(product.subcategoryName);
  if (product.childSubcategoryName) categoryHierarchy.push(product.childSubcategoryName);

  const hasDeliveryInfo = product.deliveryInfo && product.deliveryInfo !== '<p></p>' && product.deliveryInfo.trim() !== '';

  const specifications = [
    { label: 'Brand', value: product.brand, icon: Building2 },
    { label: 'SKU', value: product.skuCode, icon: Package },
    { label: 'Stock', value: `${product.stockQuantity} units available`, icon: Package },
    { label: 'Category', value: product.categoryName, icon: FolderTree },
    { label: 'Subcategory', value: product.subcategoryName, icon: FolderTree },
    { label: 'Unit', value: product.unit === 'pcs' ? 'Pieces' : product.unit || 'N/A', icon: Scale },
  ].filter(item => item.value);

  if (product.additionalInfo && product.additionalInfo.length > 0) {
    product.additionalInfo.forEach(info => {
      if (info.fieldName && info.fieldValue) {
        specifications.push({
          label: info.fieldName,
          value: info.fieldValue,
          icon: Info
        });
      }
    });
  }

  const hasColors = product.colors && product.colors.length > 0;

  const primaryTag = product.tags?.[0];
  const primaryTagName = getTagName(primaryTag);

  return (
    <>
      {product && <MetadataUpdater product={product} />}
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-b from-[#FFF8F9] via-white to-[#FFF8F9] overflow-x-hidden">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 md:py-6 lg:py-8 max-w-7xl">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-[10px] sm:text-xs md:text-sm mb-3 sm:mb-4 md:mb-6 overflow-x-auto pb-1 sm:pb-2 scrollbar-hide">
            <Link href="/" className="text-[#8B7A8C] hover:text-[#EE4275] transition whitespace-nowrap">
              Home
            </Link>
            <span className="text-[#FFD2DB]">/</span>
            <Link href="/products" className="text-[#8B7A8C] hover:text-[#EE4275] transition whitespace-nowrap">
              Products
            </Link>
            {categoryHierarchy.map((cat, idx) => (
              <React.Fragment key={idx}>
                <span className="text-[#FFD2DB]">/</span>
                <span className="text-[#8B7A8C] truncate max-w-[50px] sm:max-w-[80px]">{cat}</span>
              </React.Fragment>
            ))}
            <span className="text-[#FFD2DB]">/</span>
            <span className="text-[#2D1B2E] font-medium truncate max-w-[80px] sm:max-w-[120px]" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
              {product.productName}
            </span>
          </nav>

          {/* Main Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            
            {/* Left Column - Product Gallery */}
            <div className="lg:col-span-1" ref={galleryRef}>
              <div className="sticky top-20 sm:top-24">
                {/* Thumbnails - Horizontal on mobile, Vertical on desktop */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                  
                  {/* Thumbnails - Horizontal scroll on mobile */}
                  <div className="flex sm:flex-col gap-1.5 sm:gap-2 md:gap-3 order-2 sm:order-1 flex-row sm:flex-wrap overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 justify-start sm:justify-start scrollbar-hide">
                    {productImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (activeImageIndex !== idx) {
                            setActiveImageIndex(idx);
                            setImageLoaded(prev => ({ ...prev, [idx]: false }));
                            setIsZoomed(false);
                          }
                        }}
                        onMouseEnter={() => {
                          preloadImage(img.url);
                          if (activeImageIndex !== idx) {
                            setActiveImageIndex(idx);
                            setImageLoaded(prev => ({ ...prev, [idx]: false }));
                            setIsZoomed(false);
                          }
                        }}
                        className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                          activeImageIndex === idx 
                            ? 'border-[#EE4275] shadow-[0_0_0_2px_rgba(238,66,117,0.2)] sm:shadow-[0_0_0_3px_rgba(238,66,117,0.2)]' 
                            : 'border-[#FFD2DB]/40 hover:border-[#EE4275]/50'
                        }`}
                      >
                        <img 
                          src={img.url} 
                          alt={`Thumb ${idx + 1}`} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </button>
                    ))}
                    
                    {hasVideo && (
                      <button
                        onClick={() => {
                          if (activeImageIndex !== productImages.length) {
                            setActiveImageIndex(productImages.length);
                            setIsZoomed(false);
                          }
                        }}
                        className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all duration-200 relative ${
                          activeImageIndex === productImages.length 
                            ? 'border-[#EE4275] shadow-[0_0_0_2px_rgba(238,66,117,0.2)] sm:shadow-[0_0_0_3px_rgba(238,66,117,0.2)]' 
                            : 'border-[#FFD2DB]/40 hover:border-[#EE4275]/50'
                        }`}
                      >
                        <div className="w-full h-full bg-gradient-to-br from-[#FFD2DB]/30 to-[#EE4275]/10 flex flex-col items-center justify-center">
                          <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#EE4275]" />
                          <span className="text-[5px] sm:text-[6px] md:text-[8px] text-[#EE4275] font-medium mt-0.5">Video</span>
                        </div>
                      </button>
                    )}
                  </div>

                  {/* Main Image */}
                  <div className="flex-1 order-1 sm:order-2 relative">
                    <div className="relative bg-white rounded-xl sm:rounded-2xl border border-[#FFD2DB]/30 overflow-hidden shadow-lg shadow-[#EE4275]/5">
                      <div 
                        className="relative w-full pt-[100%] cursor-zoom-in"
                        onMouseEnter={() => !isMainVideo && !isMobile && setIsZoomed(true)}
                        onMouseLeave={() => setIsZoomed(false)}
                        onMouseMove={(e) => {
                          if (!isZoomed || isMainVideo || isMobile) return;
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = ((e.clientX - rect.left) / rect.width) * 100;
                          const y = ((e.clientY - rect.top) / rect.height) * 100;
                          setZoomPosition({
                            x: Math.min(Math.max(x, 0), 100),
                            y: Math.min(Math.max(y, 0), 100)
                          });
                        }}
                      >
                        {(isTransitioning || !imageLoaded[activeImageIndex]) && !isMainVideo && (
                          <div className="absolute inset-0 bg-gradient-to-br from-[#FFD2DB]/10 to-[#EE4275]/5 animate-pulse z-10" />
                        )}
                        
                        <div className="absolute inset-0 w-full h-full overflow-hidden">
                          {!isMainVideo && mainImage ? (
                            <>
                              <img
                                key={activeImageIndex}
                                src={mainImage}
                                alt={product.productName}
                                className={`w-full h-full object-contain p-2 sm:p-3 md:p-4 bg-white transition-opacity duration-300 ${
                                  imageLoaded[activeImageIndex] ? 'opacity-100' : 'opacity-0'
                                }`}
                                style={{
                                  transform: isZoomed && !isMobile ? 'scale(2.5)' : 'scale(1)',
                                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                  transition: 'transform 0.2s ease-out'
                                }}
                                onLoad={() => {
                                  setImageLoaded(prev => ({ ...prev, [activeImageIndex]: true }));
                                  setTimeout(() => setIsTransitioning(false), 100);
                                }}
                                loading={activeImageIndex === 0 ? "eager" : "lazy"}
                                fetchPriority={activeImageIndex === 0 ? "high" : "auto"}
                                decoding="async"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://via.placeholder.com/800x800?text=Image+Not+Available';
                                  setImageLoaded(prev => ({ ...prev, [activeImageIndex]: true }));
                                }}
                              />
                              
                              {isZoomed && !isMobile && !isMainVideo && (
                                <div className="absolute inset-0 bg-[#FFF8F9]/30 backdrop-blur-[2px] pointer-events-none z-10" />
                              )}
                            </>
                          ) : isMainVideo && mainVideoUrl && (
                            mainVideoType === 'youtube' ? (
                              <iframe 
                                src={mainVideoUrl} 
                                className="w-full h-full aspect-square" 
                                allowFullScreen 
                                title="Product Video"
                              />
                            ) : (
                              <video 
                                src={mainVideoUrl} 
                                controls 
                                className="w-full h-full object-contain bg-white"
                              />
                            )
                          )}
                        </div>
                      </div>

                      {!isMainVideo && !isMobile && !isZoomed && (
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-all duration-300 flex items-center justify-center pointer-events-none z-20">
                          <div className="bg-white/80 backdrop-blur-sm text-[#2D1B2E] text-[8px] sm:text-[10px] px-2 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1 sm:gap-2 opacity-0 hover:opacity-100 transition-opacity shadow-lg border border-[#FFD2DB]/30">
                            <ZoomIn className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#EE4275]" />
                            <span className="hidden xs:inline font-medium">Hover to zoom</span>
                          </div>
                        </div>
                      )}

                      {discountPercent > 0 && (
                        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-[8px] sm:text-[10px] md:text-xs font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1 z-30">
                          <Zap className="w-2 h-2 sm:w-3 sm:h-3" />
                          {discountPercent}% OFF
                        </div>
                      )}
                      
                      {primaryTag && (
                        <div className={`absolute top-2 right-2 sm:top-3 sm:right-3 ${getTagStyle(primaryTag)} text-[7px] sm:text-[9px] md:text-xs font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1 z-30`}>
                          <Sparkles className="w-2 h-2 sm:w-3 sm:h-3" />
                          {primaryTagName}
                        </div>
                      )}

                      {!isMainVideo && (
                        <button
                          onClick={() => setShowZoom(true)}
                          className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 p-1 sm:p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all hover:scale-105 z-30"
                          aria-label="View fullscreen"
                        >
                          <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 text-[#EE4275]" />
                        </button>
                      )}

                      <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-black/60 backdrop-blur-sm text-white text-[8px] sm:text-[10px] px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full z-30">
                        {activeImageIndex + 1} / {productImages.length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-[#FFD2DB]/30 shadow-lg shadow-[#EE4275]/5">
                
                {/* Category Tags */}
                <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 mb-2 sm:mb-3 md:mb-4">
                  {categoryHierarchy.map((cat, idx) => (
                    <span 
                      key={idx} 
                      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[10px] md:text-xs font-medium rounded-full bg-[#FFF5F6] text-[#EE4275] border border-[#FFD2DB]/30"
                    >
                      <FolderTree className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                      {cat}
                    </span>
                  ))}
                  
                  {product.brand && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[10px] md:text-xs font-medium rounded-full bg-[#FFF5F6] text-[#EE4275] border border-[#FFD2DB]/30">
                      <Building2 className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                      {product.brand}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#2D1B2E] mb-2 sm:mb-3" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                  {product.productName}
                </h1>

                {/* Rating */}
                {product.rating > 0 && (
                  <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                            star <= Math.floor(product.rating)
                              ? 'fill-[#EE4275] text-[#EE4275]'
                              : star - 0.5 <= product.rating
                              ? 'fill-[#EE4275] text-[#EE4275] opacity-50'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] sm:text-xs text-[#8B7A8C]">({product.rating})</span>
                  </div>
                )}

                {/* Price Card */}
                <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-gradient-to-r from-[#FFF5F6] to-[#FFD2DB]/20 rounded-xl border border-[#FFD2DB]/30">
                  <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                    <span className="text-lg sm:text-2xl md:text-3xl font-bold text-[#EE4275]" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                      ৳{formatPrice(currentPrice)}
                    </span>
                    {discountPercent > 0 && (
                      <>
                        <span className="text-xs sm:text-sm text-gray-400 line-through">৳{formatPrice(product.regularPrice)}</span>
                        <span className="inline-flex items-center gap-0.5 text-[9px] sm:text-xs font-semibold text-white bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full">
                          Save {discountPercent}%
                        </span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1.5 sm:mt-2">
                    {product.codAvailable && (
                      <span className="flex items-center gap-1 text-[10px] sm:text-xs text-green-600 bg-green-50 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
                        <Truck className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                        Cash on Delivery
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-[10px] sm:text-xs text-[#8B7A8C]">
                      <Package className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                      {getUnitLabel(product.unit)}
                    </span>
                  </div>
                </div>

                {/* Short Description */}
                <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-[#FFF5F6] rounded-xl border border-[#FFD2DB]/20">
                  {product.shortDescription && product.shortDescription !== '<p></p>' ? (
                    <div 
                      className="text-[11px] sm:text-xs md:text-sm text-[#4A3A4B] leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: product.shortDescription }} 
                    />
                  ) : (
                    <p className="text-[11px] sm:text-xs md:text-sm text-gray-400 italic">
                      No short description available.
                    </p>
                  )}
                </div>

                {/* Colors */}
                {hasColors && (
                  <div className="mb-3 sm:mb-4">
                    <p className="text-[10px] sm:text-xs font-medium text-[#2D1B2E] mb-1.5 sm:mb-2 flex items-center gap-1 sm:gap-1.5">
                      <Palette className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#EE4275]" />
                      Available Colors:
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {product.colors.map((color, idx) => (
                        <div key={idx} className="flex items-center gap-1">
                          <div 
                            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-[#FFD2DB]/50 shadow-sm hover:scale-110 transition-transform cursor-pointer"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stock Status */}
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className={`flex items-center gap-1 text-[10px] sm:text-xs font-medium px-2 py-0.5 sm:px-3 sm:py-1 rounded-full ${
                    stockStatus.color === 'green' ? 'bg-green-50 text-green-600' :
                    stockStatus.color === 'orange' ? 'bg-orange-50 text-orange-600' :
                    'bg-red-50 text-red-600'
                  }`}>
                    <StockIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>{stockStatus.label}</span>
                    {stockStatus.label === 'Low Stock' && (
                      <span className="text-[8px] sm:text-[10px] text-orange-500">(Only {product.stockQuantity} left)</span>
                    )}
                  </div>
                </div>

                {/* Quantity + Add to Cart + Buy Now */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-3 mb-3 sm:mb-4">
                  {/* Quantity Selector */}
                  <div className="flex items-center rounded-full border-2 border-[#FFD2DB]/40 overflow-hidden bg-white">
                    <button 
                      onClick={() => handleQuantityChange(-1)} 
                      disabled={quantity <= 1} 
                      className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center text-[#EE4275] hover:bg-[#FFF5F6] disabled:opacity-50 transition"
                    >
                      <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </button>
                    <input
                      type="number"
                      value={quantity === '' ? '' : quantity}
                      onChange={(e) => handleQuantityInput(e)}
                      onBlur={() => {
                        if (quantity === '' || quantity === null) {
                          setQuantity(1);
                        }
                      }}
                      min="1"
                      max={product.stockQuantity}
                      className="w-10 sm:w-12 md:w-14 text-center font-medium text-[#2D1B2E] text-sm sm:text-base outline-none border-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button 
                      onClick={() => handleQuantityChange(1)} 
                      disabled={quantity >= product.stockQuantity} 
                      className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center text-[#EE4275] hover:bg-[#FFF5F6] disabled:opacity-50 transition"
                    >
                      <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </button>
                  </div>

                  {/* Add to Cart OR View in Cart */}
                  {isInCart ? (
                    <button
                      onClick={openCartSidebar}
                      className="flex-1 py-1.5 sm:py-2 md:py-2.5 px-3 sm:px-4 bg-gradient-to-r from-[#a80883] to-[#6c0756] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#a80883]/25 transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-sm"
                    >
                      <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                      View in Cart
                    </button>
                  ) : (
                    <button
                      onClick={handleAddToCart}
                      disabled={addingToCart || product.stockQuantity <= 0}
                      className="flex-1 py-1.5 sm:py-2 md:py-2.5 px-3 sm:px-4 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all flex items-center justify-center gap-1.5 sm:gap-2 disabled:opacity-50 text-[10px] sm:text-xs md:text-sm"
                    >
                      {addingToCart ? <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" /> : <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />}
                      {addingToCart ? 'Adding...' : 'Add to Cart'}
                    </button>
                  )}

                  {/* Buy Now */}
                  <button
                    onClick={handleBuyNow}
                    disabled={addingToCart || product.stockQuantity <= 0}
                    className="flex-1 py-1.5 sm:py-2 md:py-2.5 px-3 sm:px-4 bg-[#2D1B2E] text-white font-semibold rounded-full hover:bg-[#3D2B3E] transition-all flex items-center justify-center gap-1.5 sm:gap-2 disabled:opacity-50 text-[10px] sm:text-xs md:text-sm"
                  >
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                    Buy Now
                  </button>
                </div>

                {/* Delivery Info */}
                {hasDeliveryInfo && (
                  <div className="bg-gradient-to-r from-[#FFF5F6] to-[#FFD2DB]/20 rounded-xl p-3 sm:p-4 border border-[#FFD2DB]/30">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                      <div className="p-1 bg-[#EE4275]/10 rounded-full">
                        <Truck className="w-3 h-3 sm:w-4 sm:h-4 text-[#EE4275]" />
                      </div>
                      <span className="font-semibold text-[#2D1B2E] text-[11px] sm:text-sm" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                        Delivery Information
                      </span>
                    </div>
                    <div 
                      className="prose prose-sm max-w-none text-[#4A3A4B] text-[10px] sm:text-xs md:text-sm"
                      style={{ lineHeight: '1.5' }}
                      dangerouslySetInnerHTML={{ __html: product.deliveryInfo }} 
                    />
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-[#FFD2DB]/30">
                      <div className="flex items-center gap-0.5 sm:gap-1 text-[8px] sm:text-[10px] text-[#8B7A8C]">
                        <RotateCcw className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                        <span>7 Days Return</span>
                      </div>
                      <div className="flex items-center gap-0.5 sm:gap-1 text-[8px] sm:text-[10px] text-[#8B7A8C]">
                        <ShieldCheck className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                        <span>Safe & Secure</span>
                      </div>
                      <div className="flex items-center gap-0.5 sm:gap-1 text-[8px] sm:text-[10px] text-[#8B7A8C]">
                        <Award className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                        <span>Genuine Products</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-6 sm:mt-10 md:mt-14">
            <div className="flex flex-wrap gap-0.5 sm:gap-1 border-b border-[#FFD2DB]/40">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 font-semibold text-[10px] sm:text-xs md:text-sm rounded-t-lg sm:rounded-t-xl transition-all flex items-center gap-1 sm:gap-2 ${
                  activeTab === 'description' 
                    ? 'bg-white text-[#EE4275] border-t-2 border-l-2 border-r-2 border-[#EE4275]/30 border-b-white shadow-sm' 
                    : 'text-[#8B7A8C] hover:text-[#2D1B2E]'
                }`}
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                Description
              </button>
              <button
                onClick={() => setActiveTab('specifications')}
                className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 font-semibold text-[10px] sm:text-xs md:text-sm rounded-t-lg sm:rounded-t-xl transition-all flex items-center gap-1 sm:gap-2 ${
                  activeTab === 'specifications' 
                    ? 'bg-white text-[#EE4275] border-t-2 border-l-2 border-r-2 border-[#EE4275]/30 border-b-white shadow-sm' 
                    : 'text-[#8B7A8C] hover:text-[#2D1B2E]'
                }`}
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                <List className="w-3 h-3 sm:w-4 sm:h-4" />
                Specifications
              </button>
            </div>

            <div className="bg-white rounded-b-lg sm:rounded-b-xl rounded-tr-lg sm:rounded-tr-xl border border-t-0 border-[#FFD2DB]/30 p-3 sm:p-4 md:p-6">
              {activeTab === 'description' && (
                <div className="prose prose-sm max-w-none text-[#4A3A4B] text-[12px] sm:text-sm">
                  {product.fullDescription && product.fullDescription !== '<p></p>' ? (
                    <div dangerouslySetInnerHTML={{ __html: product.fullDescription }} />
                  ) : (
                    <p className="text-gray-400 italic">No description available.</p>
                  )}
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                  {specifications.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-[#FFF5F6] rounded-lg sm:rounded-xl border border-[#FFD2DB]/20">
                      <div className="p-1.5 sm:p-2 bg-[#EE4275]/10 rounded-full">
                        <item.icon className="w-3 h-3 sm:w-4 sm:h-4 text-[#EE4275]" />
                      </div>
                      <div>
                        <p className="text-[8px] sm:text-[10px] text-[#8B7A8C]">{item.label}</p>
                        <p className="font-medium text-[#2D1B2E] text-[10px] sm:text-xs md:text-sm">{item.value || 'N/A'}</p>
                      </div>
                    </div>
                  ))}
                  
                  {specifications.length === 0 && (
                    <div className="col-span-2 text-center py-6 sm:py-8 text-gray-400">
                      <Package className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-[#FFD2DB]" />
                      <p className="text-sm">No specifications available</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-6 sm:mt-10 md:mt-14">
              <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="p-1.5 sm:p-2 bg-[#EE4275]/10 rounded-full">
                    <Flower2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#EE4275]" />
                  </div>
                  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#2D1B2E]" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                    You May Also Like
                  </h2>
                </div>
                
                {relatedProducts.length > carouselItemsPerView && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handlePrevSlide}
                      disabled={carouselIndex === 0}
                      className={`p-1 sm:p-2 rounded-full transition-all ${
                        carouselIndex === 0 
                          ? 'bg-[#FFF5F6] text-[#FFD2DB] cursor-not-allowed' 
                          : 'bg-white border border-[#FFD2DB]/40 text-[#EE4275] hover:bg-[#FFF5F6] hover:scale-105'
                      }`}
                    >
                      <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <button
                      onClick={handleNextSlide}
                      disabled={carouselIndex >= relatedProducts.length - carouselItemsPerView}
                      className={`p-1 sm:p-2 rounded-full transition-all ${
                        carouselIndex >= relatedProducts.length - carouselItemsPerView 
                          ? 'bg-[#FFF5F6] text-[#FFD2DB] cursor-not-allowed' 
                          : 'bg-white border border-[#FFD2DB]/40 text-[#EE4275] hover:bg-[#FFF5F6] hover:scale-105'
                      }`}
                    >
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="relative overflow-hidden">
                <motion.div
                  className="flex gap-2 sm:gap-3 md:gap-4"
                  animate={{ x: `-${carouselIndex * (100 / carouselItemsPerView)}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ width: `${(relatedProducts.length / carouselItemsPerView) * 100}%` }}
                >
                  {relatedProducts.map((relProduct) => (
                    <div 
                      key={relProduct._id} 
                      className="flex-shrink-0"
                      style={{ width: `${100 / relatedProducts.length}%` }}
                    >
                      <RelatedProductCard 
                        product={relProduct} 
                        router={router}
                        isInCart={productsInCart[relProduct._id] || false}
                        onViewInCart={openCartSidebar}
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
              
              {relatedProducts.length > carouselItemsPerView && (
                <div className="flex justify-center gap-1 sm:gap-1.5 mt-3 sm:mt-4">
                  {Array.from({ length: Math.ceil(relatedProducts.length / carouselItemsPerView) }).map((_, idx) => {
                    const pageIndex = idx * carouselItemsPerView;
                    const isActive = carouselIndex >= pageIndex && carouselIndex < pageIndex + carouselItemsPerView;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          handleCarouselInteraction();
                          setCarouselIndex(pageIndex);
                        }}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          isActive ? 'w-4 sm:w-6 bg-[#EE4275]' : 'w-1 sm:w-1.5 bg-[#FFD2DB] hover:bg-[#EE4275]/50'
                        }`}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showZoom && (
          <ZoomModal 
            images={productImages} 
            currentIndex={activeImageIndex}
            onClose={() => setShowZoom(false)} 
            onImageChange={(index) => {
              setActiveImageIndex(index);
              setShowZoom(true);
            }}
          />
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />

      <Footer />

      <style jsx global>{`
        .prose {
          max-width: none;
        }
        
        .prose h1 {
          font-size: 1.3em;
          font-weight: 600;
          margin: 0.5em 0 0.3em;
          color: #2D1B2E;
        }
        
        .prose h2 {
          font-size: 1.1em;
          font-weight: 600;
          margin: 0.4em 0 0.2em;
          color: #2D1B2E;
        }
        
        .prose h3 {
          font-size: 1em;
          font-weight: 600;
          margin: 0.3em 0 0.2em;
          color: #2D1B2E;
        }
        
        .prose p {
          margin: 0.3em 0;
          line-height: 1.5;
          color: #4A3A4B;
        }
        
        .prose ul, .prose ol {
          padding-left: 1.2em;
          margin: 0.3em 0;
        }
        
        .prose li {
          margin: 0.1em 0;
          color: #4A3A4B;
        }
        
        .prose a {
          color: #EE4275;
          text-decoration: underline;
        }
        
        .prose strong {
          font-weight: 600;
          color: #2D1B2E;
        }
        
        .prose em {
          font-style: italic;
        }
        
        .prose blockquote {
          border-left: 3px solid #EE4275;
          padding-left: 0.8em;
          margin: 0.3em 0;
          color: #8B7A8C;
          font-style: italic;
        }
        
        .prose img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
        }
        
        .prose table {
          width: 100%;
          border-collapse: collapse;
          margin: 0.5em 0;
          font-size: 0.9em;
        }
        
        .prose th,
        .prose td {
          border: 1px solid #FFD2DB;
          padding: 0.3em 0.5em;
          text-align: left;
          color: #4A3A4B;
        }
        
        .prose th {
          background-color: #FFF5F6;
          font-weight: 600;
          color: #2D1B2E;
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </>
  );
}