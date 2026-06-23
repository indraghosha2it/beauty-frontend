

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
//   AlertTriangle
// } from 'lucide-react';

// import { toast } from 'sonner';
// import WhatsAppButton from '../components/layout/WhatsAppButton';
// import Footer from '../components/layout/Footer';
// import Navbar from '../components/layout/Navbar';
// import MetadataUpdater from '../productDetails/MetadataUpdater';
// import CartSidebar from '../components/CartSidebar';

// // Helper Functions
// const formatPrice = (price) => {
//   return (price || 0).toFixed(2);
// };

// const calculateDiscount = (regular, discount) => {
//   if (regular && discount && discount < regular) {
//     return Math.round(((regular - discount) / regular) * 100);
//   }
//   return 0;
// };

// // Helper function for discount percentage
// const calculateDiscountPercentage = (regularPrice, discountPrice) => {
//   if (regularPrice && discountPrice && discountPrice < regularPrice) {
//     return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
//   }
//   return 0;
// };

// // Helper function for unit label
// const getUnitLabel = (unit) => {
//   const units = {
//     'pcs': 'pcs',
//     'ton': 'ton',
//     'other': 'unit'
//   };
//   return units[unit] || unit;
// };

// // Get tag style - All tags with black background
// const getTagStyle = (tag) => {
//   return 'bg-black text-white';
// };

// const getTagStyles = (tag) => {
//   const styles = {
//     'Best Seller': 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30',
//     'Trending': 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg shadow-rose-500/30',
//     'New Release': 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30',
//     'Limited Offer': 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30',
//     'Flash Sale': 'bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-lg shadow-red-500/30',
//     'Clearance': 'bg-gradient-to-r from-gray-500 to-gray-700 text-white shadow-lg shadow-gray-500/30',
//   };
//   return styles[tag] || 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/30';
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

// // Loading Skeleton
// const ProductSkeleton = () => (
//   <div className="min-h-screen bg-gray-50">
//     <div className="container mx-auto px-4 py-4 md:py-8 max-w-7xl">
//       <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-8">
//         <div className="lg:col-span-2 animate-pulse">
//           <div className="bg-gray-200 rounded-2xl h-64 sm:h-80 md:h-96 w-full"></div>
//           <div className="flex gap-2 mt-3 md:mt-4">
//             {[1, 2, 3, 4].map(i => (
//               <div key={i} className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-200 rounded-lg"></div>
//             ))}
//           </div>
//         </div>
//         <div className="lg:col-span-3 space-y-3 md:space-y-4 animate-pulse">
//           <div className="h-6 sm:h-7 md:h-8 bg-gray-200 rounded w-3/4"></div>
//           <div className="h-5 sm:h-5 md:h-6 bg-gray-200 rounded w-1/2"></div>
//           <div className="h-20 sm:h-24 md:h-24 bg-gray-200 rounded"></div>
//           <div className="h-10 bg-gray-200 rounded w-full"></div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // Zoom Modal Component
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
//         className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition z-10"
//       >
//         <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//       </button>
      
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           onImageChange((currentIndex - 1 + images.length) % images.length);
//         }}
//         className="absolute left-2 sm:left-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition z-10"
//       >
//         <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//       </button>
      
//       <motion.div
//         initial={{ scale: 0.9 }}
//         animate={{ scale: 1 }}
//         exit={{ scale: 0.9 }}
//         className="relative max-w-5xl w-full mx-2 sm:mx-4"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <img
//           src={images[currentIndex]?.url}
//           alt="Zoomed product"
//           className="w-full h-auto max-h-[70vh] sm:max-h-[80vh] object-contain rounded-2xl"
//         />
//       </motion.div>
      
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           onImageChange((currentIndex + 1) % images.length);
//         }}
//         className="absolute right-2 sm:right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition z-10"
//       >
//         <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//       </button>
      
//       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
//         {currentIndex + 1} / {images.length}
//       </div>
//     </div>
//   </motion.div>
// );

// // Related Product Card - Matches ProductGridCard design from Products page
// const RelatedProductCard = ({ product, router, isInCart: propIsInCart, onViewInCart }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [cartStatusLoading, setCartStatusLoading] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
  
//   const isInCart = propIsInCart || false;
//   const productImages = product.images || [];
//   const hasMultipleImages = productImages.length > 1;
//   const discountPercent = calculateDiscountPercentage(product.regularPrice, product.discountPrice);
//   const currentPrice = product.discountPrice && product.discountPrice < product.regularPrice ? product.discountPrice : product.regularPrice;
//   const originalPrice = product.regularPrice;
//   const primaryTag = product.tags?.[0];
//   const tagStyle = primaryTag ? getTagStyle(primaryTag) : '';
  
//   const isLowStock = product.stockAlertQuantity > 0 && product.stockQuantity <= product.stockAlertQuantity;
//   const isOutOfStock = product.stockQuantity <= 0;

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

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
      
//       const response = await fetch('https://gadget-backend.vercel.app/api/cart', {
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
//     <div
//       className="group bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 cursor-pointer overflow-hidden"
//       onClick={() => window.open(`/productDetails?id=${product._id}`, '_blank')}
//     >
//       {/* Image Container */}
//       <div className="relative w-full h-40 overflow-hidden bg-gray-50">
//         <img
//           src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://via.placeholder.com/300?text=Product'}
//           alt={product.productName}
//           className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = 'https://via.placeholder.com/300?text=Product';
//           }}
//           loading="lazy"
//         />
        
//         {/* Discount Badge */}
//         {discountPercent > 0 && (
//           <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 z-20 flex items-center gap-0.5">
//             <Zap className="w-2.5 h-2.5" />
//             {discountPercent}%
//           </div>
//         )}
        
//         {/* Brand Badge on Image */}
//         {product.brand && (
//           <div className="absolute top-2 right-2 bg-black/70 text-white text-[9px] px-1.5 py-0.5 font-medium z-20 flex items-center gap-0.5">
//             <Building2 className="w-2 h-2" />
//             {product.brand}
//           </div>
//         )}
        
//         {/* Out of Stock Overlay */}
//         {isOutOfStock && (
//           <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
//             <span className="bg-black text-white text-xs font-medium px-2 py-1">Out of Stock</span>
//           </div>
//         )}
        
//         {/* Low Stock Badge */}
//         {!isOutOfStock && isLowStock && (
//           <div className="absolute bottom-2 left-2 bg-orange-500 text-white text-[9px] font-medium px-1.5 py-0.5 z-20 flex items-center gap-0.5">
//             <AlertTriangle className="w-2 h-2" />
//             Only {product.stockQuantity} left
//           </div>
//         )}
        
//         {/* Mobile: Always visible icons at bottom center */}
//         {isMobile && (
//           <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 z-30">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 window.open(`/productDetails?id=${product._id}`, '_blank');
//               }}
//               className="bg-white p-1.5 shadow-md"
//             >
//               <Eye className="w-3.5 h-3.5 text-gray-700" />
//             </button>
//             <button
//               onClick={addToCart}
//               disabled={isOutOfStock}
//               className={`p-1.5 shadow-md ${isOutOfStock ? 'bg-gray-100' : 'bg-white'}`}
//             >
//               {cartStatusLoading ? (
//                 <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-500" />
//               ) : isInCart ? (
//                 <ShoppingCart className="w-3.5 h-3.5 text-cyan-600" />
//               ) : (
//                 <ShoppingCart className="w-3.5 h-3.5 text-black" />
//               )}
//             </button>
//           </div>
//         )}
        
//         {/* Desktop: Hover Icons */}
//         {!isMobile && (
//           <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 window.open(`/productDetails?id=${product._id}`, '_blank');
//               }}
//               className="w-7 h-7 bg-white shadow-md hover:bg-black flex items-center justify-center cursor-pointer transition-all duration-200"
//             >
//               <Eye className="w-3.5 h-3.5 text-gray-700 hover:text-white transition-colors" />
//             </button>
            
//             <button
//               onClick={addToCart}
//               disabled={isOutOfStock}
//               className="w-7 h-7 bg-white shadow-md hover:bg-black flex items-center justify-center cursor-pointer transition-all duration-200"
//             >
//               {cartStatusLoading ? (
//                 <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-700" />
//               ) : isInCart ? (
//                 <ShoppingCart className="w-3.5 h-3.5 text-cyan-600" />
//               ) : (
//                 <ShoppingCart className="w-3.5 h-3.5 text-gray-700 hover:text-white transition-colors" />
//               )}
//             </button>
//           </div>
//         )}
//       </div>
      
//       {/* Thumbnail Images - 4 thumbnails */}
//       {hasMultipleImages && !isMobile && (
//         <div className="flex justify-center items-center gap-1 py-1.5 bg-gray-50 border-b border-gray-100">
//           {productImages.slice(0, 4).map((image, index) => (
//             <button
//               key={index}
//               className={`w-6 h-6 overflow-hidden transition-all duration-200 ${
//                 activeIndex === index ? 'ring-1 ring-black ring-offset-1' : 'opacity-60 hover:opacity-100'
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

//       {/* Content - Centered */}
//       <div className="p-2.5 text-center">
//         {/* Product Name */}
//         <h3 className="text-xs font-medium text-gray-900 truncate mb-1" title={product.productName}>
//           {truncateText(product.productName, 35)}
//         </h3>

//         {/* Price with Unit */}
//         <div className="flex items-baseline justify-center gap-1.5 mb-1.5">
//           <span className="text-sm font-bold text-black">
//             ৳{formatPrice(currentPrice)}
//           </span>
//           {discountPercent > 0 && (
//             <>
//               <span className="text-[9px] text-gray-400 line-through">
//                 ৳{formatPrice(originalPrice)}
//               </span>
//             </>
//           )}
//           <span className="text-[9px] text-gray-500">/{getUnitLabel(product.unit)}</span>
//         </div>

//         {/* Stock Status - Centered */}
//         <div className="mb-1.5 flex justify-center">
//           {isOutOfStock ? (
//             <span className="inline-flex items-center gap-1 text-red-600 text-[9px] font-medium">
//               <div className="w-1 h-1 bg-red-500 rounded-full"></div>
//               Out of Stock
//             </span>
//           ) : isLowStock ? (
//             <span className="inline-flex items-center gap-1 text-orange-600 text-[9px] font-medium">
//               <AlertTriangle className="w-2 h-2" />
//               Only {product.stockQuantity} left
//             </span>
//           ) : (
//             <span className="inline-flex items-center gap-1 text-green-600 text-[9px] font-medium">
//               <div className="w-1 h-1 bg-green-500 rounded-full"></div>
//               In Stock ({product.stockQuantity})
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Add to Cart / View in Cart Button */}
//       <button
//         onClick={addToCart}
//         disabled={isOutOfStock}
//         className={`w-full py-1.5 text-center text-[10px] font-medium transition-colors flex items-center justify-center gap-1 ${
//           isOutOfStock ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : isInCart ? 'bg-cyan-600 text-white hover:bg-cyan-700' : 'bg-black text-white hover:bg-gray-800'
//         }`}
//       >
//         {cartStatusLoading ? (
//           <Loader2 className="w-3 h-3 animate-spin" />
//         ) : isInCart ? (
//           <>
//             <ShoppingCart className="w-3 h-3" />
//             View in Cart
//           </>
//         ) : (
//           <>
//             <ShoppingCart className="w-3 h-3" />
//             Add to Cart
//           </>
//         )}
//       </button>
//     </div>
//   );
// };

// // Main Product Details Component
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
//   const [activeTab, setActiveTab] = useState('specifications');
//   const [isCartOpen, setIsCartOpen] = useState(false);
  
//   const mainImageRef = useRef(null);
//   const galleryRef = useRef(null);

//   // Open cart sidebar
//   const openCartSidebar = () => {
//     setIsCartOpen(true);
//   };

//   const closeCartSidebar = () => {
//     setIsCartOpen(false);
//   };

//   // ========== CART STATUS FUNCTIONS ==========

//   const checkCartStatus = async () => {
//     try {
//       // Get token and session ID
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
      
//       const response = await fetch(`https://gadget-backend.vercel.app/api/cart/check/${product._id}`, { headers });
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

//   // Fetch cart status whenever product changes
//   useEffect(() => {
//     if (product && product._id) {
//       console.log('Product loaded, checking cart status for:', product._id);
//       checkCartStatus();
//     }
//   }, [product]);

//   // Listen for cart update events
//   useEffect(() => {
//     const handleCartUpdate = () => {
//       if (product && product._id) {
//         console.log('Cart update event received, re-checking status');
//         // Force a fresh check
//         setCheckingCart(true);
//         checkCartStatus();
//       }
//     };
    
//     window.addEventListener('cart-update', handleCartUpdate);
//     return () => {
//       window.removeEventListener('cart-update', handleCartUpdate);
//     };
//   }, [product]);

//   // ========== FIX: Listen for auth change events (login/logout) ==========
//   useEffect(() => {
//     const handleAuthChange = () => {
//       if (product && product._id) {
//         console.log('Auth change detected, re-checking cart status');
//         // Reset cart status and re-check
//         setIsInCart(false);
//         setCheckingCart(true);
//         // Small delay to ensure localStorage is updated
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

//   // ========== FIX: Also listen for focus events (when user returns to tab) ==========
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
//         const cartResponse = await fetch('https://gadget-backend.vercel.app/api/cart/check-status', {
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
//       const response = await fetch(`https://gadget-backend.vercel.app/api/products/${productId}`);
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

//       const response = await fetch('https://gadget-backend.vercel.app/api/cart', {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({ productId: product._id, quantity: finalQuantity })
//       });
//       const data = await response.json();
//       if (data.success) {
//         if (data.sessionId && !token) localStorage.setItem('cartSessionId', data.sessionId);
//         // Immediately update the button state
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

//       const checkResponse = await fetch(`https://gadget-backend.vercel.app/api/cart/check/${product._id}`, { headers });
//       const checkData = await checkResponse.json();
      
//       let alreadyInCart = false;
//       if (checkData.success) {
//         alreadyInCart = checkData.data.inCart;
//       }
      
//       if (!alreadyInCart) {
//         const response = await fetch('https://gadget-backend.vercel.app/api/cart', {
//           method: 'POST',
//           headers,
//           body: JSON.stringify({ productId: product._id, quantity: quantity || 1 })
//         });
//         const data = await response.json();
        
//         if (data.success) {
//           if (data.sessionId && !token) localStorage.setItem('cartSessionId', data.sessionId);
//           // Update cart status immediately
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

//   // Check if delivery info exists and is not empty
//   const hasDeliveryInfo = product.deliveryInfo && product.deliveryInfo !== '<p></p>' && product.deliveryInfo.trim() !== '';

//   // Combine specifications and additional info
//   const specifications = [
//     { label: 'Brand', value: product.brand, icon: Building2 },
//     { label: 'SKU', value: product.skuCode, icon: Package },
//     { label: 'Stock', value: `${product.stockQuantity} units available`, icon: Package },
//     { label: 'Category', value: product.categoryName, icon: FolderTree },
//     { label: 'Subcategory', value: product.subcategoryName, icon: FolderTree },
//     { label: 'Unit', value: product.unit === 'pcs' ? 'Pieces' : product.unit || 'N/A', icon: Scale },
//     { label: 'COD Available', value: product.codAvailable ? 'Yes' : 'No', icon: Truck },
//   ].filter(item => item.value);

//   // Add additional info to specifications
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

//   return (
//     <>
//       {product && <MetadataUpdater product={product} />}
//       <Navbar />
//       <div className="min-h-screen bg-gray-50">
//         <div className="container mx-auto px-3 sm:px-4 py-4 md:py-6 lg:py-8 max-w-7xl">
//           {/* Breadcrumb */}
//           <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm mb-4 md:mb-6 overflow-x-auto pb-2">
//             <Link href="/" className="text-gray-500 hover:text-black transition whitespace-nowrap">Home</Link>
//             <span className="text-gray-400">/</span>
//             <Link href="/products" className="text-gray-500 hover:text-black transition whitespace-nowrap">Products</Link>
//             {categoryHierarchy.map((cat, idx) => (
//               <React.Fragment key={idx}>
//                 <span className="text-gray-400">/</span>
//                 <span className="text-gray-500 truncate max-w-[100px] sm:max-w-none">{cat}</span>
//               </React.Fragment>
//             ))}
//             <span className="text-gray-400">/</span>
//             <span className="text-black font-medium truncate max-w-[150px] sm:max-w-none">{product.productName}</span>
//           </nav>

//           <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 md:gap-6 lg:gap-8">
//             {/* Left Column - Product Gallery */}
//             <div className="lg:col-span-3" ref={galleryRef}>
//               <div className="sticky top-20 lg:top-24">
//                 <div className="relative bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden shadow-md">
//                   <div 
//                     className="relative bg-gray-50 rounded-xl sm:rounded-2xl overflow-hidden cursor-crosshair"
//                     style={{ height: 'auto', minHeight: '280px' }}
//                     onMouseEnter={() => !isMainVideo && !isMobile && setIsZoomed(true)}
//                     onMouseLeave={() => setIsZoomed(false)}
//                     onMouseMove={(e) => {
//                       if (!isZoomed || isMainVideo || isMobile) return;
//                       const rect = e.currentTarget.getBoundingClientRect();
//                       const x = ((e.clientX - rect.left) / rect.width) * 100;
//                       const y = ((e.clientY - rect.top) / rect.height) * 100;
//                       setZoomPosition({
//                         x: Math.min(Math.max(x, 0), 100),
//                         y: Math.min(Math.max(y, 0), 100)
//                       });
//                     }}
//                   >
//                     <div className="relative w-full pt-[100%] sm:pt-[100%]">
//                       {(isTransitioning || !imageLoaded[activeImageIndex]) && !isMainVideo && (
//                         <div className="absolute inset-0 bg-gray-200 animate-pulse z-10">
//                           <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
//                         </div>
//                       )}
                      
//                       <div className="absolute inset-0 w-full h-full overflow-hidden">
//                         {!isMainVideo && mainImage ? (
//                           <img
//                             key={activeImageIndex}
//                             src={mainImage}
//                             alt={product.productName}
//                             className={`w-full h-full object-contain p-3 sm:p-4 bg-gray-50 transition-opacity duration-300 ${
//                               imageLoaded[activeImageIndex] ? 'opacity-100' : 'opacity-0'
//                             }`}
//                             style={{
//                               transform: isZoomed && !isMobile ? 'scale(2.2)' : 'scale(1)',
//                               transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
//                               transition: 'transform 0.15s ease-out'
//                             }}
//                             onLoad={() => {
//                               setImageLoaded(prev => ({ ...prev, [activeImageIndex]: true }));
//                               setTimeout(() => setIsTransitioning(false), 100);
//                             }}
//                             loading={activeImageIndex === 0 ? "eager" : "lazy"}
//                             fetchPriority={activeImageIndex === 0 ? "high" : "auto"}
//                             decoding="async"
//                             onError={(e) => {
//                               e.target.onerror = null;
//                               e.target.src = 'https://via.placeholder.com/800x800?text=Image+Not+Available';
//                               setImageLoaded(prev => ({ ...prev, [activeImageIndex]: true }));
//                             }}
//                           />
//                         ) : isMainVideo && mainVideoUrl && (
//                           mainVideoType === 'youtube' ? (
//                             <iframe 
//                               src={mainVideoUrl} 
//                               className="w-full h-full aspect-square" 
//                               allowFullScreen 
//                               title="Product Video"
//                             />
//                           ) : (
//                             <video 
//                               src={mainVideoUrl} 
//                               controls 
//                               className="w-full h-full object-contain bg-gray-50"
//                             />
//                           )
//                         )}
//                       </div>
//                     </div>

//                     {!isMainVideo && !isMobile && !isZoomed && (
//                       <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-all duration-300 flex items-center justify-center pointer-events-none">
//                         <div className="bg-black/60 backdrop-blur-sm text-white text-[10px] sm:text-xs px-2 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                           <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
//                           </svg>
//                           <span className="hidden xs:inline">Hover to zoom</span>
//                         </div>
//                       </div>
//                     )}

//                     <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex gap-1 sm:gap-2 z-20">
//                       {!isMainVideo && (
//                         <button
//                           onClick={() => setShowZoom(true)}
//                           className="p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-all hover:scale-105"
//                           aria-label="View fullscreen"
//                         >
//                           <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
//                         </button>
//                       )}
//                     </div>

//                     <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full z-20">
//                       {activeImageIndex + 1} / {productImages.length}
//                     </div>
//                   </div>
                  
//                   {discountPercent > 0 && (
//                     <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] sm:text-xs md:text-sm font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1.5 rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1">
//                       <Tag className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
//                       {discountPercent}% OFF
//                     </div>
//                   )}
//                   {product.tags?.[0] && (
//                     <div className={`absolute top-2 right-2 sm:top-3 sm:right-3 ${getTagStyles(product.tags[0])} text-[8px] sm:text-[10px] md:text-xs font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1.5 rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1`}>
//                       <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
//                       {product.tags[0]}
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex gap-1.5 sm:gap-2 mt-2 sm:mt-3 overflow-x-auto pb-2 scrollbar-thin justify-start sm:justify-center">
//                   {productImages.map((img, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => {
//                         if (activeImageIndex !== idx) {
//                           setActiveImageIndex(idx);
//                           setImageLoaded(prev => ({ ...prev, [idx]: false }));
//                           setIsZoomed(false);
//                         }
//                       }}
//                       onMouseEnter={() => {
//                         preloadImage(img.url);
//                         if (activeImageIndex !== idx) {
//                           setActiveImageIndex(idx);
//                           setImageLoaded(prev => ({ ...prev, [idx]: false }));
//                           setIsZoomed(false);
//                         }
//                       }}
//                       className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-[60px] md:h-[60px] rounded-lg overflow-hidden border-2 transition-all duration-200 ${
//                         activeImageIndex === idx ? 'border-black shadow-md ring-2 ring-black/20' : 'border-gray-200 hover:border-black'
//                       }`}
//                     >
//                       <img src={img.url} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
//                     </button>
//                   ))}
                  
//                   {hasVideo && (
//                     <button
//                       onClick={() => {
//                         if (activeImageIndex !== productImages.length) {
//                           setActiveImageIndex(productImages.length);
//                           setIsZoomed(false);
//                         }
//                       }}
//                       onMouseEnter={() => {
//                         if (activeImageIndex !== productImages.length) {
//                           setActiveImageIndex(productImages.length);
//                           setIsZoomed(false);
//                         }
//                       }}
//                       className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-[60px] md:h-[60px] rounded-lg overflow-hidden border-2 transition-all duration-200 relative ${
//                         activeImageIndex === productImages.length ? 'border-black shadow-md ring-2 ring-black/20' : 'border-gray-200 hover:border-black'
//                       }`}
//                     >
//                       {product.videoType === 'youtube' && getYouTubeThumbnail(product.videoUrl) ? (
//                         <img 
//                           src={getYouTubeThumbnail(product.videoUrl)} 
//                           alt="Video thumbnail" 
//                           className="w-full h-full object-cover"
//                           onError={(e) => {
//                             e.target.style.display = 'none';
//                             e.target.parentElement.querySelector('.fallback-icon').style.display = 'flex';
//                           }}
//                         />
//                       ) : 
//                       product.videoType !== 'youtube' && videoThumbnail ? (
//                         <img 
//                           src={videoThumbnail} 
//                           alt="Video thumbnail" 
//                           className="w-full h-full object-cover"
//                         />
//                       ) : null}
                      
//                       <div 
//                         className="fallback-icon w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex flex-col items-center justify-center"
//                         style={{ 
//                           display: (product.videoType === 'youtube' && getYouTubeThumbnail(product.videoUrl)) || 
//                                    (product.videoType !== 'youtube' && videoThumbnail) ? 'none' : 'flex' 
//                         }}
//                       >
//                         {generatingThumbnail ? (
//                           <>
//                             <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-purple-500 animate-spin" />
//                             <span className="text-[6px] sm:text-[8px] text-purple-500 mt-0.5">Loading</span>
//                           </>
//                         ) : (
//                           <>
//                             <Play className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-purple-500" />
//                             <span className="text-[6px] sm:text-[8px] text-purple-500 mt-0.5">Video</span>
//                           </>
//                         )}
//                       </div>
                      
//                       <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
//                         <Play className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
//                       </div>
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Right Column - Product Info */}
//             <div className="lg:col-span-4 bg-white p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl shadow-sm border border-gray-200">
//               {/* Category Hierarchy */}
//               <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
//                 {categoryHierarchy.map((cat, idx) => (
//                   <span 
//                     key={idx} 
//                     className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-full bg-gray-100 text-gray-700 border border-gray-200"
//                   >
//                     <FolderTree className="w-2 h-2 sm:w-3 sm:h-3" />
//                     {cat}
//                   </span>
//                 ))}
                
//                 {product.brand && (
//                   <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-full bg-gray-100 text-gray-700 border border-gray-200">
//                     <Building2 className="w-2 h-2 sm:w-3 sm:h-3" />
//                     {product.brand}
//                   </span>
//                 )}
//               </div>

//               {/* Title */}
//               <div className="mb-3 sm:mb-4">
//                 <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
//                   {product.productName}
//                 </h1>
//               </div>

//               {/* Price Card */}
//               <div className="mb-4 sm:mb-5 p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
//                 <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
//                   <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">৳{formatPrice(currentPrice)}</span>
//                   {discountPercent > 0 && (
//                     <>
//                       <span className="text-sm sm:text-base text-gray-400 line-through">৳{formatPrice(product.regularPrice)}</span>
//                       <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-red-500 bg-red-100 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
//                         <Zap className="w-2 h-2 sm:w-3 sm:h-3" />
//                         Save {discountPercent}%
//                       </span>
//                     </>
//                   )}
//                 </div>
//                 {product.codAvailable && (
//                   <div className="flex items-center gap-1.5 mt-2 sm:mt-3 text-green-600 text-xs sm:text-sm bg-green-50 inline-flex px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
//                     <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                     <span>Cash on Delivery available</span>
//                   </div>
//                 )}
//               </div>

//               {/* Short Description */}
//               <div className="mb-4 sm:mb-5 p-3 sm:p-4 bg-white rounded-xl border border-gray-200">
//                 {product.shortDescription && product.shortDescription !== '<p></p>' ? (
//                   <div 
//                     className="text-xs sm:text-sm text-gray-600 prose-short"
//                     dangerouslySetInnerHTML={{ __html: product.shortDescription }} 
//                   />
//                 ) : (
//                   <p className="text-xs sm:text-sm text-gray-400 italic">
//                     No short description available.
//                   </p>
//                 )}
//               </div>

//               {/* Stock Status */}
//               <div className="flex items-center gap-2 mb-4">
//                 <div className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium text-${stockStatus.color}-600 bg-${stockStatus.color}-50 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full`}>
//                   <StockIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-${stockStatus.color}-500`} />
//                   <span>{stockStatus.label}</span>
//                   {stockStatus.label === 'In Stock' && <span className="text-[10px] sm:text-xs text-gray-500">({product.stockQuantity} available)</span>}
//                   {stockStatus.label === 'Low Stock' && <span className="text-[10px] sm:text-xs text-orange-500">(Only {product.stockQuantity} left)</span>}
//                 </div>
//               </div>

//               {/* Quantity + Add to Cart + Buy Now */}
//               <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
//                 {/* Quantity Selector */}
//                 <div className="flex items-center rounded-lg border-2 border-gray-200 overflow-hidden bg-white">
//                   <button 
//                     onClick={() => handleQuantityChange(-1)} 
//                     disabled={quantity <= 1} 
//                     className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
//                   >
//                     <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
//                   </button>
//                   <input
//                     type="number"
//                     value={quantity === '' ? '' : quantity}
//                     onChange={(e) => handleQuantityInput(e)}
//                     onBlur={() => {
//                       if (quantity === '' || quantity === null) {
//                         setQuantity(1);
//                       }
//                     }}
//                     min="1"
//                     max={product.stockQuantity}
//                     className="w-12 sm:w-14 md:w-16 text-center font-medium text-gray-900 text-sm sm:text-base outline-none focus:ring-2 focus:ring-black/20 border-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
//                   />
//                   <button 
//                     onClick={() => handleQuantityChange(1)} 
//                     disabled={quantity >= product.stockQuantity} 
//                     className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
//                   >
//                     <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
//                   </button>
//                 </div>

//                 {/* Add to Cart OR View in Cart Button */}
//                 {isInCart ? (
//                   <button
//                     onClick={openCartSidebar}
//                     className="flex-1 py-2 px-3 sm:py-2.5 sm:px-6 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-700 transition-all shadow-md flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
//                   >
//                     <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4" />
//                     View in Cart
//                   </button>
//                 ) : (
//                   <button
//                     onClick={handleAddToCart}
//                     disabled={addingToCart || product.stockQuantity <= 0}
//                     className="flex-1 py-2 px-3 sm:py-2.5 sm:px-6 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all shadow-md flex items-center justify-center gap-1 sm:gap-2 disabled:opacity-50 text-xs sm:text-sm"
//                   >
//                     {addingToCart ? <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" /> : <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
//                     {addingToCart ? 'Adding...' : 'Add to Cart'}
//                   </button>
//                 )}

//                 {/* Buy Now Button */}
//                 <button
//                   onClick={handleBuyNow}
//                   disabled={addingToCart || product.stockQuantity <= 0}
//                   className="flex-1 py-2 px-3 sm:py-2.5 sm:px-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-md flex items-center justify-center gap-1 sm:gap-2 disabled:opacity-50 text-xs sm:text-sm"
//                 >
//                   <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                   Buy Now
//                 </button>
//               </div>

//               {/* Delivery Info - Only show if available */}
//               {hasDeliveryInfo && (
//                 <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-3 sm:p-4 border border-gray-200">
//                   <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
//                     <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
//                     <span className="font-semibold text-gray-900 text-sm sm:text-base">Delivery Information</span>
//                   </div>
//                   <div 
//                     className="prose prose-sm max-w-none text-gray-600"
//                     style={{ fontSize: '0.875rem', lineHeight: '1.6' }}
//                     dangerouslySetInnerHTML={{ __html: product.deliveryInfo }} 
//                   />
//                   <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-200">
//                     <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
//                       <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                       <span>7 Days Return Policy</span>
//                     </div>
//                     <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
//                       <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                       <span>Safe & Secure</span>
//                     </div>
//                     <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
//                       <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                       <span>Genuine Products</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Tabs Section - Specifications & Description */}
//           <div className="mt-8 sm:mt-12">
//             <div className="flex flex-wrap gap-1 sm:gap-2 border-b border-gray-200">
//               <button
//                 onClick={() => setActiveTab('specifications')}
//                 className={`px-3 sm:px-5 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm rounded-t-lg transition-all flex items-center gap-1.5 sm:gap-2 ${
//                   activeTab === 'specifications' 
//                     ? 'bg-white text-black border-t-2 border-l-2 border-r-2 border-gray-200 border-b-white' 
//                     : 'text-gray-500 hover:text-black'
//                 }`}
//               >
//                 <List className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                 Specifications
//               </button>
//               <button
//                 onClick={() => setActiveTab('description')}
//                 className={`px-3 sm:px-5 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm rounded-t-lg transition-all flex items-center gap-1.5 sm:gap-2 ${
//                   activeTab === 'description' 
//                     ? 'bg-white text-black border-t-2 border-l-2 border-r-2 border-gray-200 border-b-white' 
//                     : 'text-gray-500 hover:text-black'
//                 }`}
//               >
//                 <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                 Description
//               </button>
//             </div>

//             <div className="bg-white rounded-b-xl rounded-tr-xl border border-t-0 border-gray-200 p-4 sm:p-5 md:p-6">
//               {activeTab === 'specifications' && (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
//                   {specifications.map((item, idx) => (
//                     <div key={idx} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-xl border border-gray-200">
//                       <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
//                       <div>
//                         <p className="text-[10px] sm:text-xs text-gray-500">{item.label}</p>
//                         <p className="font-medium text-gray-900 text-xs sm:text-sm">{item.value || 'N/A'}</p>
//                       </div>
//                     </div>
//                   ))}
                  
//                   {specifications.length === 0 && (
//                     <div className="col-span-2 text-center py-8 text-gray-400">
//                       <Package className="w-8 h-8 mx-auto mb-2 text-gray-300" />
//                       <p>No specifications available</p>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {activeTab === 'description' && (
//                 <div className="prose prose-sm max-w-none">
//                   {product.fullDescription && product.fullDescription !== '<p></p>' ? (
//                     <div dangerouslySetInnerHTML={{ __html: product.fullDescription }} />
//                   ) : (
//                     <p className="text-gray-400 italic">No description available.</p>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Related Products Section */}
//           {relatedProducts.length > 0 && (
//             <div className="mt-8 sm:mt-12">
//               <div className="flex items-center justify-between mb-3 sm:mb-5">
//                 <div className="flex items-center gap-1 sm:gap-2">
//                   <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
//                   <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
//                     You May Also Like
//                   </h2>
//                 </div>
                
//                 {relatedProducts.length > carouselItemsPerView && (
//                   <div className="flex items-center gap-1 sm:gap-2">
//                     <button
//                       onClick={handlePrevSlide}
//                       disabled={carouselIndex === 0}
//                       className={`p-1.5 sm:p-2 rounded-full transition-all ${
//                         carouselIndex === 0 
//                           ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
//                           : 'bg-white border border-gray-200 text-black hover:bg-gray-50 hover:scale-110'
//                       }`}
//                     >
//                       <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
//                     </button>
//                     <button
//                       onClick={handleNextSlide}
//                       disabled={carouselIndex >= relatedProducts.length - carouselItemsPerView}
//                       className={`p-1.5 sm:p-2 rounded-full transition-all ${
//                         carouselIndex >= relatedProducts.length - carouselItemsPerView 
//                           ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
//                           : 'bg-white border border-gray-200 text-black hover:bg-gray-50 hover:scale-110'
//                       }`}
//                     >
//                       <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
//                     </button>
//                   </div>
//                 )}
//               </div>
              
//               <div className="relative overflow-hidden">
//                 <motion.div
//                   className="flex gap-2 sm:gap-3 md:gap-4"
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
//                 <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
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
//                         className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
//                           isActive ? 'w-4 sm:w-6 bg-black' : 'w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400'
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
//       <WhatsAppButton />

//       <style jsx global>{`
//         .prose {
//           max-width: none;
//         }
        
//         .prose h1 {
//           font-size: 1.5em;
//           font-weight: 600;
//           margin: 0.75em 0 0.5em;
//           color: #1F2937;
//         }
        
//         .prose h2 {
//           font-size: 1.3em;
//           font-weight: 600;
//           margin: 0.7em 0 0.4em;
//           color: #1F2937;
//         }
        
//         .prose h3 {
//           font-size: 1.1em;
//           font-weight: 600;
//           margin: 0.6em 0 0.3em;
//           color: #1F2937;
//         }
        
//         .prose p {
//           margin: 0.5em 0;
//           line-height: 1.6;
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
//         }
        
//         .prose a {
//           color: #2563EB;
//           text-decoration: underline;
//         }
        
//         .prose strong {
//           font-weight: 600;
//           color: #1F2937;
//         }
        
//         .prose em {
//           font-style: italic;
//         }
        
//         .prose blockquote {
//           border-left: 3px solid #2563EB;
//           padding-left: 1em;
//           margin: 0.5em 0;
//           color: #666;
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
//           border: 1px solid #ddd;
//           padding: 0.5em;
//           text-align: left;
//         }
        
//         .prose th {
//           background-color: #f5f5f5;
//           font-weight: 600;
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
  Palette
} from 'lucide-react';

import { toast } from 'sonner';
import WhatsAppButton from '../components/layout/WhatsAppButton';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import MetadataUpdater from '../productDetails/MetadataUpdater';
import CartSidebar from '../components/CartSidebar';

// Helper Functions
const formatPrice = (price) => {
  return (price || 0).toFixed(2);
};

const calculateDiscount = (regular, discount) => {
  if (regular && discount && discount < regular) {
    return Math.round(((regular - discount) / regular) * 100);
  }
  return 0;
};

// Helper function for discount percentage
const calculateDiscountPercentage = (regularPrice, discountPrice) => {
  if (regularPrice && discountPrice && discountPrice < regularPrice) {
    return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
  }
  return 0;
};

// Helper function for unit label
const getUnitLabel = (unit) => {
  const units = {
    'pcs': 'pcs',
    'ton': 'ton',
    'other': 'unit'
  };
  return units[unit] || unit;
};

// Get tag style - All tags with black background
const getTagStyle = (tag) => {
  return 'bg-black text-white';
};

const getTagStyles = (tag) => {
  const styles = {
    'Best Seller': 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30',
    'Trending': 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg shadow-rose-500/30',
    'New Release': 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30',
    'Limited Offer': 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30',
    'Flash Sale': 'bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-lg shadow-red-500/30',
    'Clearance': 'bg-gradient-to-r from-gray-500 to-gray-700 text-white shadow-lg shadow-gray-500/30',
  };
  return styles[tag] || 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/30';
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

// Loading Skeleton
const ProductSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="container mx-auto px-4 py-4 md:py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-8">
        <div className="lg:col-span-2 animate-pulse">
          <div className="bg-gray-200 rounded-2xl h-64 sm:h-80 md:h-96 w-full"></div>
          <div className="flex gap-2 mt-3 md:mt-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-3 space-y-3 md:space-y-4 animate-pulse">
          <div className="h-6 sm:h-7 md:h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-5 sm:h-5 md:h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-20 sm:h-24 md:h-24 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    </div>
  </div>
);

// Zoom Modal Component
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
        className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition z-10"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          onImageChange((currentIndex - 1 + images.length) % images.length);
        }}
        className="absolute left-2 sm:left-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition z-10"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>
      
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="relative max-w-5xl w-full mx-2 sm:mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]?.url}
          alt="Zoomed product"
          className="w-full h-auto max-h-[70vh] sm:max-h-[80vh] object-contain rounded-2xl"
        />
      </motion.div>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          onImageChange((currentIndex + 1) % images.length);
        }}
        className="absolute right-2 sm:right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition z-10"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  </motion.div>
);

// Related Product Card - Matches ProductGridCard design from Products page
const RelatedProductCard = ({ product, router, isInCart: propIsInCart, onViewInCart }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cartStatusLoading, setCartStatusLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const isInCart = propIsInCart || false;
  const productImages = product.images || [];
  const hasMultipleImages = productImages.length > 1;
  const discountPercent = calculateDiscountPercentage(product.regularPrice, product.discountPrice);
  const currentPrice = product.discountPrice && product.discountPrice < product.regularPrice ? product.discountPrice : product.regularPrice;
  const originalPrice = product.regularPrice;
  const primaryTag = product.tags?.[0];
  const tagStyle = primaryTag ? getTagStyle(primaryTag) : '';
  
  const isLowStock = product.stockAlertQuantity > 0 && product.stockQuantity <= product.stockAlertQuantity;
  const isOutOfStock = product.stockQuantity <= 0;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      
      const response = await fetch('https://gadget-backend.vercel.app/api/cart', {
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
    <div
      className="group bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={() => window.open(`/productDetails?id=${product._id}`, '_blank')}
    >
      {/* Image Container */}
      <div className="relative w-full h-40 overflow-hidden bg-gray-50">
        <img
          src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://via.placeholder.com/300?text=Product'}
          alt={product.productName}
          className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300?text=Product';
          }}
          loading="lazy"
        />
        
        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 z-20 flex items-center gap-0.5">
            <Zap className="w-2.5 h-2.5" />
            {discountPercent}%
          </div>
        )}
        
        {/* Brand Badge on Image */}
        {product.brand && (
          <div className="absolute top-2 right-2 bg-black/70 text-white text-[9px] px-1.5 py-0.5 font-medium z-20 flex items-center gap-0.5">
            <Building2 className="w-2 h-2" />
            {product.brand}
          </div>
        )}
        
        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
            <span className="bg-black text-white text-xs font-medium px-2 py-1">Out of Stock</span>
          </div>
        )}
        
        {/* Low Stock Badge */}
        {!isOutOfStock && isLowStock && (
          <div className="absolute bottom-2 left-2 bg-orange-500 text-white text-[9px] font-medium px-1.5 py-0.5 z-20 flex items-center gap-0.5">
            <AlertTriangle className="w-2 h-2" />
            Only {product.stockQuantity} left
          </div>
        )}
        
        {/* Mobile: Always visible icons at bottom center */}
        {isMobile && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 z-30">
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(`/productDetails?id=${product._id}`, '_blank');
              }}
              className="bg-white p-1.5 shadow-md"
            >
              <Eye className="w-3.5 h-3.5 text-gray-700" />
            </button>
            <button
              onClick={addToCart}
              disabled={isOutOfStock}
              className={`p-1.5 shadow-md ${isOutOfStock ? 'bg-gray-100' : 'bg-white'}`}
            >
              {cartStatusLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-500" />
              ) : isInCart ? (
                <ShoppingCart className="w-3.5 h-3.5 text-cyan-600" />
              ) : (
                <ShoppingCart className="w-3.5 h-3.5 text-black" />
              )}
            </button>
          </div>
        )}
        
        {/* Desktop: Hover Icons */}
        {!isMobile && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(`/productDetails?id=${product._id}`, '_blank');
              }}
              className="w-7 h-7 bg-white shadow-md hover:bg-black flex items-center justify-center cursor-pointer transition-all duration-200"
            >
              <Eye className="w-3.5 h-3.5 text-gray-700 hover:text-white transition-colors" />
            </button>
            
            <button
              onClick={addToCart}
              disabled={isOutOfStock}
              className="w-7 h-7 bg-white shadow-md hover:bg-black flex items-center justify-center cursor-pointer transition-all duration-200"
            >
              {cartStatusLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-700" />
              ) : isInCart ? (
                <ShoppingCart className="w-3.5 h-3.5 text-cyan-600" />
              ) : (
                <ShoppingCart className="w-3.5 h-3.5 text-gray-700 hover:text-white transition-colors" />
              )}
            </button>
          </div>
        )}
      </div>
      
      {/* Thumbnail Images - 4 thumbnails */}
      {hasMultipleImages && !isMobile && (
        <div className="flex justify-center items-center gap-1 py-1.5 bg-gray-50 border-b border-gray-100">
          {productImages.slice(0, 4).map((image, index) => (
            <button
              key={index}
              className={`w-6 h-6 overflow-hidden transition-all duration-200 ${
                activeIndex === index ? 'ring-1 ring-black ring-offset-1' : 'opacity-60 hover:opacity-100'
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

      {/* Content - Centered */}
      <div className="p-2.5 text-center">
        {/* Product Name */}
        <h3 className="text-xs font-medium text-gray-900 truncate mb-1" title={product.productName}>
          {truncateText(product.productName, 35)}
        </h3>

        {/* Price with Unit */}
        <div className="flex items-baseline justify-center gap-1.5 mb-1.5">
          <span className="text-sm font-bold text-black">
            ৳{formatPrice(currentPrice)}
          </span>
          {discountPercent > 0 && (
            <>
              <span className="text-[9px] text-gray-400 line-through">
                ৳{formatPrice(originalPrice)}
              </span>
            </>
          )}
          <span className="text-[9px] text-gray-500">/{getUnitLabel(product.unit)}</span>
        </div>

        {/* Stock Status - Centered */}
        <div className="mb-1.5 flex justify-center">
          {isOutOfStock ? (
            <span className="inline-flex items-center gap-1 text-red-600 text-[9px] font-medium">
              <div className="w-1 h-1 bg-red-500 rounded-full"></div>
              Out of Stock
            </span>
          ) : isLowStock ? (
            <span className="inline-flex items-center gap-1 text-orange-600 text-[9px] font-medium">
              <AlertTriangle className="w-2 h-2" />
              Only {product.stockQuantity} left
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-green-600 text-[9px] font-medium">
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
              In Stock ({product.stockQuantity})
            </span>
          )}
        </div>
      </div>

      {/* Add to Cart / View in Cart Button */}
      <button
        onClick={addToCart}
        disabled={isOutOfStock}
        className={`w-full py-1.5 text-center text-[10px] font-medium transition-colors flex items-center justify-center gap-1 ${
          isOutOfStock ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : isInCart ? 'bg-cyan-600 text-white hover:bg-cyan-700' : 'bg-black text-white hover:bg-gray-800'
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
  );
};

// Main Product Details Component
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
  const [activeTab, setActiveTab] = useState('specifications');
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const mainImageRef = useRef(null);
  const galleryRef = useRef(null);

  // Open cart sidebar
  const openCartSidebar = () => {
    setIsCartOpen(true);
  };

  const closeCartSidebar = () => {
    setIsCartOpen(false);
  };

  // ========== CART STATUS FUNCTIONS ==========

  const checkCartStatus = async () => {
    try {
      // Get token and session ID
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        console.log('Using token for cart check');
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
        console.log('Using sessionId for cart check:', sessionId);
      } else {
        console.log('No token or sessionId found, setting isInCart to false');
        setIsInCart(false);
        setCheckingCart(false);
        return;
      }
      
      if (!product || !product._id) {
        console.log('No product or product ID available');
        setCheckingCart(false);
        return;
      }
      
      console.log('Checking cart status for product:', product._id);
      
      const response = await fetch(`https://gadget-backend.vercel.app/api/cart/check/${product._id}`, { headers });
      const data = await response.json();
      
      console.log('Cart check response:', data);
      
      if (data.success) {
        const inCart = data.data.inCart || false;
        console.log('Product in cart:', inCart);
        setIsInCart(inCart);
      } else {
        console.log('Cart check failed:', data.error);
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

  // Fetch cart status whenever product changes
  useEffect(() => {
    if (product && product._id) {
      console.log('Product loaded, checking cart status for:', product._id);
      checkCartStatus();
    }
  }, [product]);

  // Listen for cart update events
  useEffect(() => {
    const handleCartUpdate = () => {
      if (product && product._id) {
        console.log('Cart update event received, re-checking status');
        // Force a fresh check
        setCheckingCart(true);
        checkCartStatus();
      }
    };
    
    window.addEventListener('cart-update', handleCartUpdate);
    return () => {
      window.removeEventListener('cart-update', handleCartUpdate);
    };
  }, [product]);

  // ========== FIX: Listen for auth change events (login/logout) ==========
  useEffect(() => {
    const handleAuthChange = () => {
      if (product && product._id) {
        console.log('Auth change detected, re-checking cart status');
        // Reset cart status and re-check
        setIsInCart(false);
        setCheckingCart(true);
        // Small delay to ensure localStorage is updated
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

  // ========== FIX: Also listen for focus events (when user returns to tab) ==========
  useEffect(() => {
    const handleFocus = () => {
      if (product && product._id) {
        console.log('Window focus gained, re-checking cart status');
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
        const cartResponse = await fetch('https://gadget-backend.vercel.app/api/cart/check-status', {
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
      const response = await fetch(`https://gadget-backend.vercel.app/api/products/${productId}`);
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

      const response = await fetch('https://gadget-backend.vercel.app/api/cart', {
        method: 'POST',
        headers,
        body: JSON.stringify({ productId: product._id, quantity: finalQuantity })
      });
      const data = await response.json();
      if (data.success) {
        if (data.sessionId && !token) localStorage.setItem('cartSessionId', data.sessionId);
        // Immediately update the button state
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

      const checkResponse = await fetch(`https://gadget-backend.vercel.app/api/cart/check/${product._id}`, { headers });
      const checkData = await checkResponse.json();
      
      let alreadyInCart = false;
      if (checkData.success) {
        alreadyInCart = checkData.data.inCart;
      }
      
      if (!alreadyInCart) {
        const response = await fetch('https://gadget-backend.vercel.app/api/cart', {
          method: 'POST',
          headers,
          body: JSON.stringify({ productId: product._id, quantity: quantity || 1 })
        });
        const data = await response.json();
        
        if (data.success) {
          if (data.sessionId && !token) localStorage.setItem('cartSessionId', data.sessionId);
          // Update cart status immediately
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

  // Check if delivery info exists and is not empty
  const hasDeliveryInfo = product.deliveryInfo && product.deliveryInfo !== '<p></p>' && product.deliveryInfo.trim() !== '';

  // Combine specifications and additional info
  const specifications = [
    { label: 'Brand', value: product.brand, icon: Building2 },
    { label: 'SKU', value: product.skuCode, icon: Package },
    { label: 'Stock', value: `${product.stockQuantity} units available`, icon: Package },
    { label: 'Category', value: product.categoryName, icon: FolderTree },
    { label: 'Subcategory', value: product.subcategoryName, icon: FolderTree },
    { label: 'Unit', value: product.unit === 'pcs' ? 'Pieces' : product.unit || 'N/A', icon: Scale },
  ].filter(item => item.value);

  // Add additional info to specifications
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

  // Check if product has colors
  const hasColors = product.colors && product.colors.length > 0;

  return (
    <>
      {product && <MetadataUpdater product={product} />}
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-3 sm:px-4 py-4 md:py-6 lg:py-8 max-w-7xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm mb-4 md:mb-6 overflow-x-auto pb-2">
            <Link href="/" className="text-gray-500 hover:text-black transition whitespace-nowrap">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-gray-500 hover:text-black transition whitespace-nowrap">Products</Link>
            {categoryHierarchy.map((cat, idx) => (
              <React.Fragment key={idx}>
                <span className="text-gray-400">/</span>
                <span className="text-gray-500 truncate max-w-[100px] sm:max-w-none">{cat}</span>
              </React.Fragment>
            ))}
            <span className="text-gray-400">/</span>
            <span className="text-black font-medium truncate max-w-[150px] sm:max-w-none">{product.productName}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 md:gap-6 lg:gap-8">
            {/* Left Column - Product Gallery */}
            <div className="lg:col-span-3" ref={galleryRef}>
              <div className="sticky top-20 lg:top-24">
                <div className="relative bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden shadow-md">
                  <div 
                    className="relative bg-gray-50 rounded-xl sm:rounded-2xl overflow-hidden cursor-crosshair"
                    style={{ height: 'auto', minHeight: '280px' }}
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
                    <div className="relative w-full pt-[100%] sm:pt-[100%]">
                      {(isTransitioning || !imageLoaded[activeImageIndex]) && !isMainVideo && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse z-10">
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
                        </div>
                      )}
                      
                      <div className="absolute inset-0 w-full h-full overflow-hidden">
                        {!isMainVideo && mainImage ? (
                          <img
                            key={activeImageIndex}
                            src={mainImage}
                            alt={product.productName}
                            className={`w-full h-full object-contain p-3 sm:p-4 bg-gray-50 transition-opacity duration-300 ${
                              imageLoaded[activeImageIndex] ? 'opacity-100' : 'opacity-0'
                            }`}
                            style={{
                              transform: isZoomed && !isMobile ? 'scale(2.2)' : 'scale(1)',
                              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                              transition: 'transform 0.15s ease-out'
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
                              className="w-full h-full object-contain bg-gray-50"
                            />
                          )
                        )}
                      </div>
                    </div>

                    {!isMainVideo && !isMobile && !isZoomed && (
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-all duration-300 flex items-center justify-center pointer-events-none">
                        <div className="bg-black/60 backdrop-blur-sm text-white text-[10px] sm:text-xs px-2 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                          <span className="hidden xs:inline">Hover to zoom</span>
                        </div>
                      </div>
                    )}

                    <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex gap-1 sm:gap-2 z-20">
                      {!isMainVideo && (
                        <button
                          onClick={() => setShowZoom(true)}
                          className="p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-all hover:scale-105"
                          aria-label="View fullscreen"
                        >
                          <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                        </button>
                      )}
                    </div>

                    <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full z-20">
                      {activeImageIndex + 1} / {productImages.length}
                    </div>
                  </div>
                  
                  {discountPercent > 0 && (
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] sm:text-xs md:text-sm font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1.5 rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1">
                      <Tag className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                      {discountPercent}% OFF
                    </div>
                  )}
                  {product.tags?.[0] && (
                    <div className={`absolute top-2 right-2 sm:top-3 sm:right-3 ${getTagStyles(product.tags[0])} text-[8px] sm:text-[10px] md:text-xs font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1.5 rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1`}>
                      <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                      {product.tags[0]}
                    </div>
                  )}
                </div>

                <div className="flex gap-1.5 sm:gap-2 mt-2 sm:mt-3 overflow-x-auto pb-2 scrollbar-thin justify-start sm:justify-center">
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
                      className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-[60px] md:h-[60px] rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        activeImageIndex === idx ? 'border-black shadow-md ring-2 ring-black/20' : 'border-gray-200 hover:border-black'
                      }`}
                    >
                      <img src={img.url} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
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
                      onMouseEnter={() => {
                        if (activeImageIndex !== productImages.length) {
                          setActiveImageIndex(productImages.length);
                          setIsZoomed(false);
                        }
                      }}
                      className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-[60px] md:h-[60px] rounded-lg overflow-hidden border-2 transition-all duration-200 relative ${
                        activeImageIndex === productImages.length ? 'border-black shadow-md ring-2 ring-black/20' : 'border-gray-200 hover:border-black'
                      }`}
                    >
                      {product.videoType === 'youtube' && getYouTubeThumbnail(product.videoUrl) ? (
                        <img 
                          src={getYouTubeThumbnail(product.videoUrl)} 
                          alt="Video thumbnail" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.querySelector('.fallback-icon').style.display = 'flex';
                          }}
                        />
                      ) : 
                      product.videoType !== 'youtube' && videoThumbnail ? (
                        <img 
                          src={videoThumbnail} 
                          alt="Video thumbnail" 
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                      
                      <div 
                        className="fallback-icon w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex flex-col items-center justify-center"
                        style={{ 
                          display: (product.videoType === 'youtube' && getYouTubeThumbnail(product.videoUrl)) || 
                                   (product.videoType !== 'youtube' && videoThumbnail) ? 'none' : 'flex' 
                        }}
                      >
                        {generatingThumbnail ? (
                          <>
                            <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-purple-500 animate-spin" />
                            <span className="text-[6px] sm:text-[8px] text-purple-500 mt-0.5">Loading</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-purple-500" />
                            <span className="text-[6px] sm:text-[8px] text-purple-500 mt-0.5">Video</span>
                          </>
                        )}
                      </div>
                      
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Play className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="lg:col-span-4 bg-white p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl shadow-sm border border-gray-200">
              {/* Category Hierarchy */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                {categoryHierarchy.map((cat, idx) => (
                  <span 
                    key={idx} 
                    className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-full bg-gray-100 text-gray-700 border border-gray-200"
                  >
                    <FolderTree className="w-2 h-2 sm:w-3 sm:h-3" />
                    {cat}
                  </span>
                ))}
                
                {product.brand && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                    <Building2 className="w-2 h-2 sm:w-3 sm:h-3" />
                    {product.brand}
                  </span>
                )}
              </div>

              {/* Title */}
              <div className="mb-3 sm:mb-4">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  {product.productName}
                </h1>
              </div>

              {/* Price Card */}
              <div className="mb-4 sm:mb-5 p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">৳{formatPrice(currentPrice)}</span>
                  {discountPercent > 0 && (
                    <>
                      <span className="text-sm sm:text-base text-gray-400 line-through">৳{formatPrice(product.regularPrice)}</span>
                      <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-red-500 bg-red-100 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                        <Zap className="w-2 h-2 sm:w-3 sm:h-3" />
                        Save {discountPercent}%
                      </span>
                    </>
                  )}
                </div>
                {product.codAvailable && (
                  <div className="flex items-center gap-1.5 mt-2 sm:mt-3 text-green-600 text-xs sm:text-sm bg-green-50 inline-flex px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
                    <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>Cash on Delivery available</span>
                  </div>
                )}
              </div>

              {/* Short Description */}
              <div className="mb-4 sm:mb-5 p-3 sm:p-4 bg-white rounded-xl border border-gray-200">
                {product.shortDescription && product.shortDescription !== '<p></p>' ? (
                  <div 
                    className="text-xs sm:text-sm text-gray-600 prose-short"
                    dangerouslySetInnerHTML={{ __html: product.shortDescription }} 
                  />
                ) : (
                  <p className="text-xs sm:text-sm text-gray-400 italic">
                    No short description available.
                  </p>
                )}
              </div>

            

              {/* ========== COLORS SECTION - ADDED ========== */}
              {hasColors && (
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-2 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-gray-500" />
                    Available Colors:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <div 
                          className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-gray-200 shadow-sm hover:scale-110 transition-transform cursor-pointer"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                       
                      </div>
                    ))}
                  </div>
                </div>
              )}

                {/* Stock Status */}
              <div className="flex items-center gap-2 mb-4">
                <div className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium text-${stockStatus.color}-600 bg-${stockStatus.color}-50 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full`}>
                  <StockIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-${stockStatus.color}-500`} />
                  <span>{stockStatus.label}</span>
                  {stockStatus.label === 'In Stock' && <span className="text-[10px] sm:text-xs text-gray-500"></span>}
                  {stockStatus.label === 'Low Stock' && <span className="text-[10px] sm:text-xs text-orange-500">(Only {product.stockQuantity} left)</span>}
                </div>
              </div>

              {/* Quantity + Add to Cart + Buy Now */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                {/* Quantity Selector */}
                <div className="flex items-center rounded-lg border-2 border-gray-200 overflow-hidden bg-white">
                  <button 
                    onClick={() => handleQuantityChange(-1)} 
                    disabled={quantity <= 1} 
                    className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
                  >
                    <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
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
                    className="w-12 sm:w-14 md:w-16 text-center font-medium text-gray-900 text-sm sm:text-base outline-none focus:ring-2 focus:ring-black/20 border-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button 
                    onClick={() => handleQuantityChange(1)} 
                    disabled={quantity >= product.stockQuantity} 
                    className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
                  >
                    <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                  </button>
                </div>

                {/* Add to Cart OR View in Cart Button */}
                {isInCart ? (
                  <button
                    onClick={openCartSidebar}
                    className="flex-1 py-2 px-3 sm:py-2.5 sm:px-6 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-700 transition-all shadow-md flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    View in Cart
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    disabled={addingToCart || product.stockQuantity <= 0}
                    className="flex-1 py-2 px-3 sm:py-2.5 sm:px-6 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all shadow-md flex items-center justify-center gap-1 sm:gap-2 disabled:opacity-50 text-xs sm:text-sm"
                  >
                    {addingToCart ? <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" /> : <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                    {addingToCart ? 'Adding...' : 'Add to Cart'}
                  </button>
                )}

                {/* Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  disabled={addingToCart || product.stockQuantity <= 0}
                  className="flex-1 py-2 px-3 sm:py-2.5 sm:px-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-md flex items-center justify-center gap-1 sm:gap-2 disabled:opacity-50 text-xs sm:text-sm"
                >
                  <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Buy Now
                </button>
              </div>

              {/* Delivery Info - Only show if available */}
              {hasDeliveryInfo && (
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-3 sm:p-4 border border-gray-200">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">Delivery Information</span>
                  </div>
                  <div 
                    className="prose prose-sm max-w-none text-gray-600"
                    style={{ fontSize: '0.875rem', lineHeight: '1.6' }}
                    dangerouslySetInnerHTML={{ __html: product.deliveryInfo }} 
                  />
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
                      <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>7 Days Return Policy</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
                      <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>Safe & Secure</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
                      <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>Genuine Products</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tabs Section - Specifications & Description */}
          <div className="mt-8 sm:mt-12">
            <div className="flex flex-wrap gap-1 sm:gap-2 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('specifications')}
                className={`px-3 sm:px-5 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm rounded-t-lg transition-all flex items-center gap-1.5 sm:gap-2 ${
                  activeTab === 'specifications' 
                    ? 'bg-white text-black border-t-2 border-l-2 border-r-2 border-gray-200 border-b-white' 
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                <List className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('description')}
                className={`px-3 sm:px-5 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm rounded-t-lg transition-all flex items-center gap-1.5 sm:gap-2 ${
                  activeTab === 'description' 
                    ? 'bg-white text-black border-t-2 border-l-2 border-r-2 border-gray-200 border-b-white' 
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Description
              </button>
            </div>

            <div className="bg-white rounded-b-xl rounded-tr-xl border border-t-0 border-gray-200 p-4 sm:p-5 md:p-6">
              {activeTab === 'specifications' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {specifications.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-xl border border-gray-200">
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                      <div>
                        <p className="text-[10px] sm:text-xs text-gray-500">{item.label}</p>
                        <p className="font-medium text-gray-900 text-xs sm:text-sm">{item.value || 'N/A'}</p>
                      </div>
                    </div>
                  ))}
                  
                  {specifications.length === 0 && (
                    <div className="col-span-2 text-center py-8 text-gray-400">
                      <Package className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p>No specifications available</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'description' && (
                <div className="prose prose-sm max-w-none">
                  {product.fullDescription && product.fullDescription !== '<p></p>' ? (
                    <div dangerouslySetInnerHTML={{ __html: product.fullDescription }} />
                  ) : (
                    <p className="text-gray-400 italic">No description available.</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-8 sm:mt-12">
              <div className="flex items-center justify-between mb-3 sm:mb-5">
                <div className="flex items-center gap-1 sm:gap-2">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                    You May Also Like
                  </h2>
                </div>
                
                {relatedProducts.length > carouselItemsPerView && (
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={handlePrevSlide}
                      disabled={carouselIndex === 0}
                      className={`p-1.5 sm:p-2 rounded-full transition-all ${
                        carouselIndex === 0 
                          ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
                          : 'bg-white border border-gray-200 text-black hover:bg-gray-50 hover:scale-110'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={handleNextSlide}
                      disabled={carouselIndex >= relatedProducts.length - carouselItemsPerView}
                      className={`p-1.5 sm:p-2 rounded-full transition-all ${
                        carouselIndex >= relatedProducts.length - carouselItemsPerView 
                          ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
                          : 'bg-white border border-gray-200 text-black hover:bg-gray-50 hover:scale-110'
                      }`}
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
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
                <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
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
                        className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                          isActive ? 'w-4 sm:w-6 bg-black' : 'w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400'
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
          font-size: 1.5em;
          font-weight: 600;
          margin: 0.75em 0 0.5em;
          color: #1F2937;
        }
        
        .prose h2 {
          font-size: 1.3em;
          font-weight: 600;
          margin: 0.7em 0 0.4em;
          color: #1F2937;
        }
        
        .prose h3 {
          font-size: 1.1em;
          font-weight: 600;
          margin: 0.6em 0 0.3em;
          color: #1F2937;
        }
        
        .prose p {
          margin: 0.5em 0;
          line-height: 1.6;
        }
        
        .prose ul {
          list-style-type: disc;
          padding-left: 1.5em;
          margin: 0.5em 0;
        }
        
        .prose ol {
          list-style-type: decimal;
          padding-left: 1.5em;
          margin: 0.5em 0;
        }
        
        .prose li {
          margin: 0.2em 0;
        }
        
        .prose a {
          color: #2563EB;
          text-decoration: underline;
        }
        
        .prose strong {
          font-weight: 600;
          color: #1F2937;
        }
        
        .prose em {
          font-style: italic;
        }
        
        .prose blockquote {
          border-left: 3px solid #2563EB;
          padding-left: 1em;
          margin: 0.5em 0;
          color: #666;
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
          margin: 1em 0;
        }
        
        .prose th,
        .prose td {
          border: 1px solid #ddd;
          padding: 0.5em;
          text-align: left;
        }
        
        .prose th {
          background-color: #f5f5f5;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}