
// 'use client';

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Star,
//   Heart,
//   Share2,
//   ShoppingCart,
//   Truck,
//   ShieldCheck,
//   RotateCcw,
//   AlertCircle,
//   CheckCircle,
//   Minus,
//   Plus,
//   ZoomIn,
//   ImageIcon,
//   Palette,
//   Play,
//   X,
//   ChevronLeft,
//   ChevronRight,
//   Gift,
//   Sparkles,
//   Users,
//   Package,
//   Tag,
//   Clock,
//   Facebook,
//   Twitter,
//   Linkedin,
//   Mail,
//   Copy,
//   Check,
//   Loader2,
//   Eye,
//   MessageCircle,
//   FolderTree,
//   Maximize2,
//   Zap,
//   Edit,
//   Trash2,
//   ArrowLeft,
//   Calendar,
//   User,
//   DollarSign,
//   TrendingUp,
//   Building2,
//   Box,
//   Scale,
//   List,
//   Info,
//   Award,
//   Flame,
//   Clock as ClockIcon
// } from 'lucide-react';

// import { toast } from 'sonner';

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

// const getAgeBadge = (ageGroup) => {
//   const styles = {
//     '0-2': { bg: 'bg-pink-100', text: 'text-pink-600', icon: '👶' },
//     '3-5': { bg: 'bg-blue-100', text: 'text-blue-600', icon: '🧒' },
//     '6-10': { bg: 'bg-green-100', text: 'text-green-600', icon: '👧' },
//     '11-14': { bg: 'bg-purple-100', text: 'text-purple-600', icon: '🧑' },
//     '': { bg: 'bg-teal-100', text: 'text-teal-600', icon: '🎈' }
//   };
//   return styles[ageGroup] || { bg: 'bg-gray-100', text: 'text-gray-600', icon: '🎈' };
// };

// const getAgeGroupBadge = (ageGroup) => {
//   const styles = {
//     '0-2': 'bg-pink-100 text-pink-600',
//     '3-5': 'bg-blue-100 text-blue-600',
//     '6-10': 'bg-green-100 text-green-600',
//     '11-14': 'bg-purple-100 text-purple-600',
//     '': 'bg-teal-100 text-teal-600'
//   };
//   return styles[ageGroup] || 'bg-gray-100 text-gray-600';
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

// const calculateDiscountPercentage = (regular, discount) => {
//   if (regular && discount && discount < regular) {
//     return Math.round(((regular - discount) / regular) * 100);
//   }
//   return 0;
// };

// const getStockStatus = (quantity) => {
//   if (quantity <= 0) return { label: 'Out of Stock', color: 'red', icon: AlertCircle };
//   if (quantity <= 10) return { label: 'Low Stock', color: 'orange', icon: AlertCircle };
//   return { label: 'In Stock', color: 'green', icon: CheckCircle };
// };

// const truncateText = (text, limit = 20) => {
//   if (!text) return '';
//   if (text.length <= limit) return text;
//   return text.substring(0, limit) + '...';
// };

// // Loading Skeleton Component
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

// // Main Admin Product Details Component
// export default function AdminProductDetails() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const productId = searchParams.get('id');

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);
//   const [showZoom, setShowZoom] = useState(false);
//   const [activeTab, setActiveTab] = useState('details');
//   const [isMobile, setIsMobile] = useState(false);
//   const [isZoomed, setIsZoomed] = useState(false);
//   const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
//   const [imageLoaded, setImageLoaded] = useState({});
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [videoThumbnail, setVideoThumbnail] = useState(null);
//   const [generatingThumbnail, setGeneratingThumbnail] = useState(false);
  
//   const galleryRef = useRef(null);
//   const lensRef = useRef(null);

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   useEffect(() => {
//     if (productId) {
//       fetchProductDetails();
//     } else {
//       toast.error('No product ID provided');
//       router.push('/admin/all-products');
//     }
//   }, [productId]);

//   useEffect(() => {
//     if (product?.videoUrl && product?.videoType !== 'youtube' && !videoThumbnail && !generatingThumbnail) {
//       setGeneratingThumbnail(true);
//       generateVideoThumbnail(product.videoUrl, (thumbnail) => {
//         if (thumbnail) {
//           setVideoThumbnail(thumbnail);
//         }
//         setGeneratingThumbnail(false);
//       });
//     }
//   }, [product?.videoUrl, product?.videoType]);

//   const fetchProductDetails = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`https://gadget-backend.vercel.app/api/products/${productId}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setProduct(data.data.product);
//       } else {
//         toast.error('Product not found');
//         router.push('/admin/all-products');
//       }
//     } catch (error) {
//       console.error('Error fetching product:', error);
//       toast.error('Failed to load product');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = () => {
//     router.push(`/admin/editProduct?id=${productId}`);
//   };

//   const handleDelete = async () => {
//     if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`https://gadget-backend.vercel.app/api/products/${productId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       const data = await response.json();
//       if (data.success) {
//         toast.success('Product deleted successfully');
//         router.push('/admin/all-products');
//       } else {
//         toast.error(data.error || 'Failed to delete product');
//       }
//     } catch (error) {
//       console.error('Error deleting product:', error);
//       toast.error('Failed to delete product');
//     }
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
//   const stockStatus = getStockStatus(product.stockQuantity);
//   const StockIcon = stockStatus.icon;
//   const ageBadge = getAgeBadge(product.ageGroup);
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

//   // Get promotion style if exists
//   const getPromotionStyles = (promotion) => {
//     const styles = {
//       'flash-sale': {
//         label: '🔥 Flash Sale',
//         bg: 'bg-gradient-to-r from-red-500 to-orange-500',
//         text: 'text-white',
//         icon: Zap
//       },
//       'new-arrival': {
//         label: '✨ New Arrival',
//         bg: 'bg-gradient-to-r from-emerald-500 to-teal-500',
//         text: 'text-white',
//         icon: Sparkles
//       },
//       'trending': {
//         label: '📈 Trending',
//         bg: 'bg-gradient-to-r from-purple-500 to-pink-500',
//         text: 'text-white',
//         icon: TrendingUp
//       },
//       'clearance': {
//         label: '🏷️ Clearance',
//         bg: 'bg-gradient-to-r from-yellow-500 to-orange-500',
//         text: 'text-white',
//         icon: Tag
//       },
//       'holiday-special': {
//         label: '🎄 Holiday Special',
//         bg: 'bg-gradient-to-r from-red-600 to-green-600',
//         text: 'text-white',
//         icon: Gift
//       },
//       'bundle-deal': {
//         label: '📦 Bundle Deal',
//         bg: 'bg-gradient-to-r from-blue-500 to-indigo-500',
//         text: 'text-white',
//         icon: Package
//       },
//       'limited-stock': {
//         label: '⚠️ Limited Stock',
//         bg: 'bg-gradient-to-r from-orange-500 to-red-500',
//         text: 'text-white',
//         icon: AlertCircle
//       }
//     };
//     return styles[promotion] || null;
//   };

//   const promotionStyle = product.promotion ? getPromotionStyles(product.promotion) : null;
//   const PromotionIcon = promotionStyle?.icon || Sparkles;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-3 sm:px-4 py-4 md:py-6 lg:py-8 max-w-7xl">
//         {/* Header with Back Button and Actions */}
//         <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => router.back()}
//               className="p-2 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
//             >
//               <ArrowLeft className="w-5 h-5 text-gray-700" />
//             </button>
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
//                 Product Details
//               </h1>
//               <p className="text-sm text-gray-500 mt-0.5">View complete product information</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <button
//               onClick={handleEdit}
//               className="flex items-center gap-2 px-4 py-2 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all shadow-md"
//             >
//               <Edit className="w-4 h-4" />
//               Edit Product
//             </button>
//             <button
//               onClick={handleDelete}
//               className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all shadow-md"
//             >
//               <Trash2 className="w-4 h-4" />
//               Delete
//             </button>
//           </div>
//         </div>

//         {/* Breadcrumb */}
//         <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm mb-4 md:mb-6 overflow-x-auto pb-2">
//           <Link href="/admin/dashboard" className="text-gray-500 hover:text-black transition whitespace-nowrap">Dashboard</Link>
//           <span className="text-gray-400">/</span>
//           <Link href="/admin/all-products" className="text-gray-500 hover:text-black transition whitespace-nowrap">Products</Link>
//           <span className="text-gray-400">/</span>
//           <span className="text-black font-medium truncate max-w-[150px] sm:max-w-none">{product.productName}</span>
//         </nav>

//         {/* Product Title and Status Bar */}
//         <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
//           <div className="flex flex-wrap items-center justify-between gap-3">
//             <div>
//               <h2 className="text-xl font-bold text-gray-900">{product.productName}</h2>
//               <div className="flex flex-wrap items-center gap-3 mt-1">
//                 <p className="text-sm text-gray-500">SKU: {product.skuCode}</p>
//                 {product.brand && (
//                   <span className="inline-flex items-center gap-1 text-sm text-gray-500">
//                     <Building2 className="w-3.5 h-3.5" />
//                     {product.brand}
//                   </span>
//                 )}
//               </div>
//             </div>
//             <div className="flex flex-wrap items-center gap-2">
//               <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
//                 product.isActive 
//                   ? 'bg-green-100 text-green-700' 
//                   : 'bg-red-100 text-red-700'
//               }`}>
//                 {product.isActive ? (
//                   <><CheckCircle className="w-3.5 h-3.5" /> Active</>
//                 ) : (
//                   <><X className="w-3.5 h-3.5" /> Inactive</>
//                 )}
//               </span>
//               <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${stockStatus.color === 'green' ? 'bg-green-100 text-green-700' : stockStatus.color === 'orange' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
//                 <StockIcon className="w-3.5 h-3.5" />
//                 {stockStatus.label}
//               </span>
//               {product.isFeatured && (
//                 <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
//                   <Star className="w-3.5 h-3.5" />
//                   Featured
//                 </span>
//               )}
//               {product.showOnBanner && (
//                 <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
//                   <ImageIcon className="w-3.5 h-3.5" />
//                   On Banner
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 md:gap-6 lg:gap-8">
//           {/* Left Column - Product Gallery */}
//           <div className="lg:col-span-3" ref={galleryRef}>
//             <div className="sticky top-20 lg:top-24">
//               {/* Main Image/Video Area */}
//               <div className="relative bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden shadow-md">
//                 <div 
//                   className="relative bg-gray-50 rounded-xl sm:rounded-2xl overflow-hidden cursor-crosshair"
//                   style={{ height: 'auto', minHeight: '280px' }}
//                   onMouseEnter={() => !isMainVideo && !isMobile && setIsZoomed(true)}
//                   onMouseLeave={() => setIsZoomed(false)}
//                   onMouseMove={(e) => {
//                     if (!isZoomed || isMainVideo || isMobile) return;
//                     const rect = e.currentTarget.getBoundingClientRect();
//                     const x = ((e.clientX - rect.left) / rect.width) * 100;
//                     const y = ((e.clientY - rect.top) / rect.height) * 100;
//                     setZoomPosition({
//                       x: Math.min(Math.max(x, 0), 100),
//                       y: Math.min(Math.max(y, 0), 100)
//                     });
//                   }}
//                 >
//                   <div className="relative w-full pt-[100%] sm:pt-[100%]">
//                     {(isTransitioning || !imageLoaded[activeImageIndex]) && !isMainVideo && (
//                       <div className="absolute inset-0 bg-gray-200 animate-pulse z-10">
//                         <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
//                       </div>
//                     )}
                    
//                     <div className="absolute inset-0 w-full h-full overflow-hidden">
//                       {!isMainVideo && mainImage ? (
//                         <img
//                           key={activeImageIndex}
//                           src={mainImage}
//                           alt={product.productName}
//                           className={`w-full h-full object-contain p-3 sm:p-4 bg-gray-50 transition-opacity duration-300 ${
//                             imageLoaded[activeImageIndex] ? 'opacity-100' : 'opacity-0'
//                           }`}
//                           style={{
//                             transform: isZoomed && !isMobile ? 'scale(2.2)' : 'scale(1)',
//                             transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
//                             transition: 'transform 0.15s ease-out'
//                           }}
//                           onLoad={() => {
//                             setImageLoaded(prev => ({ ...prev, [activeImageIndex]: true }));
//                             setTimeout(() => setIsTransitioning(false), 100);
//                           }}
//                           loading={activeImageIndex === 0 ? "eager" : "lazy"}
//                           fetchPriority={activeImageIndex === 0 ? "high" : "auto"}
//                           decoding="async"
//                           onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.src = 'https://via.placeholder.com/800x800?text=Image+Not+Available';
//                             setImageLoaded(prev => ({ ...prev, [activeImageIndex]: true }));
//                           }}
//                         />
//                       ) : isMainVideo && mainVideoUrl && (
//                         mainVideoType === 'youtube' ? (
//                           <iframe 
//                             src={mainVideoUrl} 
//                             className="w-full h-full aspect-square" 
//                             allowFullScreen 
//                             title="Product Video"
//                           />
//                         ) : (
//                           <video 
//                             src={mainVideoUrl} 
//                             controls 
//                             className="w-full h-full object-contain bg-gray-50"
//                           />
//                         )
//                       )}
//                     </div>
//                   </div>

//                   {/* Zoom Indicator Overlay */}
//                   {!isMainVideo && !isMobile && !isZoomed && (
//                     <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-all duration-300 flex items-center justify-center pointer-events-none">
//                       <div className="bg-black/60 backdrop-blur-sm text-white text-[10px] sm:text-xs px-2 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                         <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
//                         </svg>
//                         <span className="hidden xs:inline">Hover to zoom</span>
//                       </div>
//                     </div>
//                   )}

//                   {/* Controls */}
//                   <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex gap-1 sm:gap-2 z-20">
//                     {!isMainVideo && (
//                       <button
//                         onClick={() => setShowZoom(true)}
//                         className="p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-all hover:scale-105"
//                         aria-label="View fullscreen"
//                       >
//                         <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
//                       </button>
//                     )}
//                   </div>

//                   <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full z-20">
//                     {activeImageIndex + 1} / {productImages.length}
//                   </div>
//                 </div>
                
//                 {discountPercent > 0 && (
//                   <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] sm:text-xs md:text-sm font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1.5 rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1">
//                     <Tag className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
//                     {discountPercent}% OFF
//                   </div>
//                 )}
//                 {product.tags?.[0] && (
//                   <div className={`absolute top-2 right-2 sm:top-3 sm:right-3 ${getTagStyles(product.tags[0])} text-[8px] sm:text-[10px] md:text-xs font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1.5 rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1`}>
//                     <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
//                     {product.tags[0]}
//                   </div>
//                 )}
//               </div>

//               {/* Thumbnail Gallery */}
//               <div className="flex gap-1.5 sm:gap-2 mt-2 sm:mt-3 overflow-x-auto pb-2 scrollbar-thin justify-start sm:justify-center">
//                 {productImages.map((img, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => {
//                       if (activeImageIndex !== idx) {
//                         setActiveImageIndex(idx);
//                         setImageLoaded(prev => ({ ...prev, [idx]: false }));
//                         setIsZoomed(false);
//                       }
//                     }}
//                     onMouseEnter={() => {
//                       preloadImage(img.url);
//                       if (activeImageIndex !== idx) {
//                         setActiveImageIndex(idx);
//                         setImageLoaded(prev => ({ ...prev, [idx]: false }));
//                         setIsZoomed(false);
//                       }
//                     }}
//                     className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-[60px] md:h-[60px] rounded-lg overflow-hidden border-2 transition-all duration-200 ${
//                       activeImageIndex === idx ? 'border-black shadow-md ring-2 ring-black/20' : 'border-gray-200 hover:border-black'
//                     }`}
//                   >
//                     <img src={img.url} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
//                   </button>
//                 ))}
                
//                 {hasVideo && (
//                   <button
//                     onClick={() => {
//                       if (activeImageIndex !== productImages.length) {
//                         setActiveImageIndex(productImages.length);
//                         setIsZoomed(false);
//                       }
//                     }}
//                     onMouseEnter={() => {
//                       if (activeImageIndex !== productImages.length) {
//                         setActiveImageIndex(productImages.length);
//                         setIsZoomed(false);
//                       }
//                     }}
//                     className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-[60px] md:h-[60px] rounded-lg overflow-hidden border-2 transition-all duration-200 relative ${
//                       activeImageIndex === productImages.length ? 'border-black shadow-md ring-2 ring-black/20' : 'border-gray-200 hover:border-black'
//                     }`}
//                   >
//                     {product.videoType === 'youtube' && getYouTubeThumbnail(product.videoUrl) ? (
//                       <img 
//                         src={getYouTubeThumbnail(product.videoUrl)} 
//                         alt="Video thumbnail" 
//                         className="w-full h-full object-cover"
//                         onError={(e) => {
//                           e.target.style.display = 'none';
//                           e.target.parentElement.querySelector('.fallback-icon').style.display = 'flex';
//                         }}
//                       />
//                     ) : 
//                     product.videoType !== 'youtube' && videoThumbnail ? (
//                       <img 
//                         src={videoThumbnail} 
//                         alt="Video thumbnail" 
//                         className="w-full h-full object-cover"
//                       />
//                     ) : null}
                    
//                     <div 
//                       className="fallback-icon w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex flex-col items-center justify-center"
//                       style={{ 
//                         display: (product.videoType === 'youtube' && getYouTubeThumbnail(product.videoUrl)) || 
//                                  (product.videoType !== 'youtube' && videoThumbnail) ? 'none' : 'flex' 
//                       }}
//                     >
//                       {generatingThumbnail ? (
//                         <>
//                           <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-purple-500 animate-spin" />
//                           <span className="text-[6px] sm:text-[8px] text-purple-500 mt-0.5">Loading</span>
//                         </>
//                       ) : (
//                         <>
//                           <Play className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-purple-500" />
//                           <span className="text-[6px] sm:text-[8px] text-purple-500 mt-0.5">Video</span>
//                         </>
//                       )}
//                     </div>
                    
//                     <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
//                       <Play className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
//                     </div>
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Product Info */}
//           <div className="lg:col-span-4 bg-white p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl shadow-sm border border-gray-200">
//             {/* Category Hierarchy */}
//             <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
//               {categoryHierarchy.map((cat, idx) => (
//                 <span 
//                   key={idx} 
//                   className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-full bg-gray-100 text-gray-700 border border-gray-200"
//                 >
//                   <FolderTree className="w-2 h-2 sm:w-3 sm:h-3" />
//                   {cat}
//                 </span>
//               ))}

//               {product.brand && (
//                 <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-full bg-gray-100 text-gray-700 border border-gray-200">
//                   <Building2 className="w-2 h-2 sm:w-3 sm:h-3" />
//                   {product.brand}
//                 </span>
//               )}

//               {promotionStyle && (
//                 <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold ${promotionStyle.bg} ${promotionStyle.text} shadow-sm`}>
//                   <PromotionIcon className="w-3 h-3" />
//                   {promotionStyle.label}
//                 </span>
//               )}
//             </div>

//             {/* Title */}
//             <div className="mb-3 sm:mb-4">
//               <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
//                 {product.productName}
//               </h1>
//             </div>

//             {/* Price Card */}
//             <div className="mb-4 sm:mb-5 p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
//               <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
//                 <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">৳{formatPrice(currentPrice)}</span>
//                 {discountPercent > 0 && (
//                   <>
//                     <span className="text-sm sm:text-base text-gray-400 line-through">৳{formatPrice(product.regularPrice)}</span>
//                     <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-red-500 bg-red-100 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
//                       <Zap className="w-2 h-2 sm:w-3 sm:h-3" />
//                       Save {discountPercent}%
//                     </span>
//                   </>
//                 )}
//               </div>
//               {product.codAvailable && (
//                 <div className="flex items-center gap-1.5 mt-2 sm:mt-3 text-green-600 text-xs sm:text-sm bg-green-50 inline-flex px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
//                   <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                   <span>Cash on Delivery available</span>
//                 </div>
//               )}
//             </div>

//             {/* Short Description */}
//             <div className="mb-4 sm:mb-5 p-3 sm:p-4 bg-white rounded-xl border border-gray-200">
//               {product.shortDescription && product.shortDescription !== '<p></p>' ? (
//                 <div 
//                   className="text-xs sm:text-sm text-gray-600 prose-short"
//                   dangerouslySetInnerHTML={{ __html: product.shortDescription }} 
//                 />
//               ) : (
//                 <p className="text-xs sm:text-sm text-gray-400 italic">
//                   No short description available.
//                 </p>
//               )}
//             </div>

//             {/* Stock Status */}
//             <div className="flex items-center gap-2 mb-4">
//               <div className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium text-${stockStatus.color}-600 bg-${stockStatus.color}-50 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full`}>
//                 <StockIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-${stockStatus.color}-500`} />
//                 <span>{stockStatus.label}</span>
//                 {stockStatus.label === 'In Stock' && <span className="text-[10px] sm:text-xs text-gray-500">({product.stockQuantity} available)</span>}
//                 {stockStatus.label === 'Low Stock' && <span className="text-[10px] sm:text-xs text-orange-500">(Only {product.stockQuantity} left)</span>}
//               </div>
//             </div>

//             {/* Product Specifications Summary */}
//             <div className="grid grid-cols-2 gap-2 mb-4">
//               <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
//                 <p className="text-[10px] text-gray-500">Unit</p>
//                 <p className="text-sm font-medium text-gray-900">{product.unit === 'pcs' ? 'Pieces' : product.unit || 'N/A'}</p>
//               </div>
//               <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
//                 <p className="text-[10px] text-gray-500">SKU</p>
//                 <p className="text-sm font-medium text-gray-900 font-mono">{product.skuCode}</p>
//               </div>
//             </div>

//             {/* Delivery Info - Only show if available */}
//             {product.deliveryInfo && product.deliveryInfo !== '<p></p>' && product.deliveryInfo.trim() !== '' && (
//               <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-3 sm:p-4 border border-gray-200 mb-4">
//                 <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
//                   <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
//                   <span className="font-semibold text-gray-900 text-sm sm:text-base">Delivery Information</span>
//                 </div>
//                 <div 
//                   className="prose prose-sm max-w-none text-gray-600"
//                   style={{ fontSize: '0.875rem', lineHeight: '1.6' }}
//                   dangerouslySetInnerHTML={{ __html: product.deliveryInfo }} 
//                 />
//                 <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-200">
//                   <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
//                     <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                     <span>7 Days Return Policy</span>
//                   </div>
//                   <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
//                     <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                     <span>Safe & Secure</span>
//                   </div>
//                   <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
//                     <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                     <span>Genuine Products</span>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Tabs for Description, Specifications, Additional Info */}
//         <div className="mt-8 sm:mt-12">
//           <div className="flex flex-wrap gap-1 sm:gap-2 border-b border-gray-200">
//             {['details', 'specifications', 'additional', 'meta'].map(tab => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`px-3 sm:px-5 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm rounded-t-lg transition-all ${
//                   activeTab === tab ? 'bg-white text-black border-t-2 border-l-2 border-r-2 border-gray-200 border-b-white' : 'text-gray-500 hover:text-black'
//                 }`}
//               >
//                 {tab === 'details' && 'Description'}
//                 {tab === 'specifications' && 'Specifications'}
//                 {tab === 'additional' && 'Additional Info'}
//                 {tab === 'meta' && 'SEO & Meta'}
//               </button>
//             ))}
//           </div>

//           <div className="bg-white rounded-b-xl rounded-tr-xl border border-t-0 border-gray-200 p-4 sm:p-5 md:p-6">
//             {activeTab === 'details' && (
//               <div className="prose prose-sm max-w-none">
//                 {product.fullDescription && product.fullDescription !== '<p></p>' ? (
//                   <div dangerouslySetInnerHTML={{ __html: product.fullDescription }} />
//                 ) : (
//                   <p className="text-gray-400 italic">No description available.</p>
//                 )}
//               </div>
//             )}

//             {activeTab === 'specifications' && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
//                 {[
//                   { label: 'Brand', value: product.brand, icon: Building2 },
//                   { label: 'SKU', value: product.skuCode, icon: Package },
//                   { label: 'Stock', value: `${product.stockQuantity} units available`, icon: Package },
//                   { label: 'Category', value: product.categoryName, icon: FolderTree },
//                   { label: 'Subcategory', value: product.subcategoryName, icon: FolderTree },
//                   { label: 'Child Subcategory', value: product.childSubcategoryName, icon: FolderTree },
//                   { label: 'Unit', value: product.unit === 'pcs' ? 'Pieces' : product.unit || 'N/A', icon: Scale },
//                   { label: 'COD Available', value: product.codAvailable ? 'Yes' : 'No', icon: Truck },
//                   { label: 'Regular Price', value: `৳${formatPrice(product.regularPrice)}`, icon: DollarSign },
//                   { label: 'Discount Price', value: product.discountPrice > 0 ? `৳${formatPrice(product.discountPrice)}` : 'N/A', icon: Tag },
//                   { label: 'Cost Per Item', value: product.costPerItem > 0 ? `৳${formatPrice(product.costPerItem)}` : 'N/A', icon: DollarSign },
//                   { label: 'Status', value: product.isActive ? 'Active' : 'Inactive', icon: CheckCircle },
//                   { label: 'Featured', value: product.isFeatured ? 'Yes' : 'No', icon: Star },
//                   { label: 'Show on Banner', value: product.showOnBanner ? 'Yes' : 'No', icon: ImageIcon },
//                   { label: 'Promotion', value: product.promotion || 'None', icon: Zap },
//                   { label: 'Total Views', value: product.views || 0, icon: Eye },
//                   { label: 'Purchase Count', value: product.purchaseCount || 0, icon: ShoppingCart },
//                   { label: 'Created At', value: new Date(product.createdAt).toLocaleString(), icon: Calendar },
//                   { label: 'Created By', value: product.createdBy?.name || product.createdBy?.email || 'Unknown', icon: User },
//                 ].filter(item => item.value).map((item, idx) => (
//                   <div key={idx} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-xl border border-gray-200">
//                     <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
//                     <div>
//                       <p className="text-[10px] sm:text-xs text-gray-500">{item.label}</p>
//                       <p className="font-medium text-gray-900 text-xs sm:text-sm">{item.value || 'N/A'}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {activeTab === 'additional' && (
//               <>
//                 {product.additionalInfo && product.additionalInfo.length > 0 ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
//                     {product.additionalInfo.map((info, idx) => (
//                       <div key={`additional-${idx}`} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-xl border border-gray-200">
//                         <Info className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
//                         <div>
//                           <p className="text-[10px] sm:text-xs text-gray-500">{info.fieldName}</p>
//                           <p className="font-medium text-gray-900 text-xs sm:text-sm">{info.fieldValue}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-8">
//                     <Info className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//                     <p className="text-gray-500">No additional information available</p>
//                   </div>
//                 )}
//               </>
//             )}

//             {activeTab === 'meta' && (
//               <div className="space-y-4">
//                 {product.metaSettings?.metaTitle && (
//                   <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
//                     <p className="text-xs text-gray-500 mb-1">Meta Title</p>
//                     <p className="font-medium text-gray-900 text-sm">{product.metaSettings.metaTitle}</p>
//                   </div>
//                 )}
//                 {product.metaSettings?.metaDescription && (
//                   <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
//                     <p className="text-xs text-gray-500 mb-1">Meta Description</p>
//                     <p className="font-medium text-gray-900 text-sm">{product.metaSettings.metaDescription}</p>
//                   </div>
//                 )}
//                 {product.metaSettings?.metaKeywords && product.metaSettings.metaKeywords.length > 0 && (
//                   <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
//                     <p className="text-xs text-gray-500 mb-2">Meta Keywords</p>
//                     <div className="flex flex-wrap gap-2">
//                       {product.metaSettings.metaKeywords.map((keyword, idx) => (
//                         <span key={idx} className="px-2 py-1 bg-white rounded-md text-xs text-gray-600 border border-gray-200">
//                           {keyword}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//                 {!product.metaSettings?.metaTitle && !product.metaSettings?.metaDescription && (!product.metaSettings?.metaKeywords || product.metaSettings.metaKeywords.length === 0) && (
//                   <div className="text-center py-8">
//                     <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//                     <p className="text-gray-500">No SEO & Meta settings available</p>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Tags Section */}
//         {product.tags && product.tags.length > 0 && (
//           <div className="mt-6">
//             <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
//               <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                 <Tag className="w-4 h-4 text-gray-700" />
//                 Product Tags
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {product.tags.map((tag, idx) => (
//                   <span key={idx} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${getTagStyles(tag)}`}>
//                     <Sparkles className="w-2.5 h-2.5" />
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Colors Section */}
//         {product.colors && product.colors.length > 0 && (
//           <div className="mt-6">
//             <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
//               <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                 <Palette className="w-4 h-4 text-gray-700" />
//                 Available Colors
//               </h3>
//               <div className="flex flex-wrap gap-3">
//                 {product.colors.map((color, idx) => (
//                   <div key={idx} className="flex items-center gap-2">
//                     <div 
//                       className="w-8 h-8 rounded-full border-2 border-gray-200 shadow-sm"
//                       style={{ backgroundColor: color }}
//                     />
                    
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

      
//       </div>

//       {/* Zoom Modal */}
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
//     </div>
//   );
// }



'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Truck,
  ShieldCheck,
  RotateCcw,
  AlertCircle,
  CheckCircle,
  Minus,
  Plus,
  ZoomIn,
  ImageIcon,
  Palette,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Gift,
  Sparkles,
  Users,
  Package,
  Tag,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Copy,
  Check,
  Loader2,
  Eye,
  MessageCircle,
  FolderTree,
  Maximize2,
  Zap,
  Edit,
  Trash2,
  ArrowLeft,
  Calendar,
  User,
  DollarSign,
  TrendingUp,
  Building2,
  Box,
  Scale,
  List,
  Info,
  Award,
  Flame,
  Clock as ClockIcon
} from 'lucide-react';

import { toast } from 'sonner';

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

const getAgeBadge = (ageGroup) => {
  const styles = {
    '0-2': { bg: 'bg-pink-100', text: 'text-pink-600', icon: '👶' },
    '3-5': { bg: 'bg-blue-100', text: 'text-blue-600', icon: '🧒' },
    '6-10': { bg: 'bg-green-100', text: 'text-green-600', icon: '👧' },
    '11-14': { bg: 'bg-purple-100', text: 'text-purple-600', icon: '🧑' },
    '': { bg: 'bg-teal-100', text: 'text-teal-600', icon: '🎈' }
  };
  return styles[ageGroup] || { bg: 'bg-gray-100', text: 'text-gray-600', icon: '🎈' };
};

const getAgeGroupBadge = (ageGroup) => {
  const styles = {
    '0-2': 'bg-pink-100 text-pink-600',
    '3-5': 'bg-blue-100 text-blue-600',
    '6-10': 'bg-green-100 text-green-600',
    '11-14': 'bg-purple-100 text-purple-600',
    '': 'bg-teal-100 text-teal-600'
  };
  return styles[ageGroup] || 'bg-gray-100 text-gray-600';
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

const calculateDiscountPercentage = (regular, discount) => {
  if (regular && discount && discount < regular) {
    return Math.round(((regular - discount) / regular) * 100);
  }
  return 0;
};

// Updated getStockStatus to handle alert quantity
const getStockStatus = (quantity, alertQuantity) => {
  if (quantity <= 0) return { label: 'Out of Stock', color: 'red', icon: AlertCircle };
  if (alertQuantity > 0 && quantity <= alertQuantity) return { label: 'Low Stock', color: 'orange', icon: AlertCircle };
  return { label: 'In Stock', color: 'green', icon: CheckCircle };
};

const truncateText = (text, limit = 20) => {
  if (!text) return '';
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
};

// Loading Skeleton Component
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

// Main Admin Product Details Component
export default function AdminProductDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [isMobile, setIsMobile] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [imageLoaded, setImageLoaded] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [videoThumbnail, setVideoThumbnail] = useState(null);
  const [generatingThumbnail, setGeneratingThumbnail] = useState(false);
  
  const galleryRef = useRef(null);
  const lensRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (productId) {
      fetchProductDetails();
    } else {
      toast.error('No product ID provided');
      router.push('/admin/all-products');
    }
  }, [productId]);

  useEffect(() => {
    if (product?.videoUrl && product?.videoType !== 'youtube' && !videoThumbnail && !generatingThumbnail) {
      setGeneratingThumbnail(true);
      generateVideoThumbnail(product.videoUrl, (thumbnail) => {
        if (thumbnail) {
          setVideoThumbnail(thumbnail);
        }
        setGeneratingThumbnail(false);
      });
    }
  }, [product?.videoUrl, product?.videoType]);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://gadget-backend.vercel.app/api/products/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setProduct(data.data.product);
      } else {
        toast.error('Product not found');
        router.push('/admin/all-products');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    router.push(`/admin/editProduct?id=${productId}`);
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://gadget-backend.vercel.app/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Product deleted successfully');
        router.push('/admin/all-products');
      } else {
        toast.error(data.error || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
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
  // Updated to use alert quantity
  const stockStatus = getStockStatus(product.stockQuantity, product.stockAlertQuantity);
  const StockIcon = stockStatus.icon;
  const ageBadge = getAgeBadge(product.ageGroup);
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

  // Get promotion style if exists
  const getPromotionStyles = (promotion) => {
    const styles = {
      'flash-sale': {
        label: '🔥 Flash Sale',
        bg: 'bg-gradient-to-r from-red-500 to-orange-500',
        text: 'text-white',
        icon: Zap
      },
      'new-arrival': {
        label: '✨ New Arrival',
        bg: 'bg-gradient-to-r from-emerald-500 to-teal-500',
        text: 'text-white',
        icon: Sparkles
      },
      'trending': {
        label: '📈 Trending',
        bg: 'bg-gradient-to-r from-purple-500 to-pink-500',
        text: 'text-white',
        icon: TrendingUp
      },
      'clearance': {
        label: '🏷️ Clearance',
        bg: 'bg-gradient-to-r from-yellow-500 to-orange-500',
        text: 'text-white',
        icon: Tag
      },
      'holiday-special': {
        label: '🎄 Holiday Special',
        bg: 'bg-gradient-to-r from-red-600 to-green-600',
        text: 'text-white',
        icon: Gift
      },
      'bundle-deal': {
        label: '📦 Bundle Deal',
        bg: 'bg-gradient-to-r from-blue-500 to-indigo-500',
        text: 'text-white',
        icon: Package
      },
      'limited-stock': {
        label: '⚠️ Limited Stock',
        bg: 'bg-gradient-to-r from-orange-500 to-red-500',
        text: 'text-white',
        icon: AlertCircle
      }
    };
    return styles[promotion] || null;
  };

  const promotionStyle = product.promotion ? getPromotionStyles(product.promotion) : null;
  const PromotionIcon = promotionStyle?.icon || Sparkles;

  // Check if product has colors
  const hasColors = product.colors && product.colors.length > 0;
  // Check if product has cost per item
  const hasCostPerItem = product.costPerItem && product.costPerItem > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-3 sm:px-4 py-4 md:py-6 lg:py-8 max-w-7xl">
        {/* Header with Back Button and Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Product Details
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">View complete product information</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all shadow-md"
            >
              <Edit className="w-4 h-4" />
              Edit Product
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all shadow-md"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm mb-4 md:mb-6 overflow-x-auto pb-2">
          <Link href="/admin/dashboard" className="text-gray-500 hover:text-black transition whitespace-nowrap">Dashboard</Link>
          <span className="text-gray-400">/</span>
          <Link href="/admin/all-products" className="text-gray-500 hover:text-black transition whitespace-nowrap">Products</Link>
          <span className="text-gray-400">/</span>
          <span className="text-black font-medium truncate max-w-[150px] sm:max-w-none">{product.productName}</span>
        </nav>

        {/* Product Title and Status Bar */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{product.productName}</h2>
              <div className="flex flex-wrap items-center gap-3 mt-1">
                <p className="text-sm text-gray-500">SKU: {product.skuCode}</p>
                {product.brand && (
                  <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                    <Building2 className="w-3.5 h-3.5" />
                    {product.brand}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                product.isActive 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {product.isActive ? (
                  <><CheckCircle className="w-3.5 h-3.5" /> Active</>
                ) : (
                  <><X className="w-3.5 h-3.5" /> Inactive</>
                )}
              </span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${stockStatus.color === 'green' ? 'bg-green-100 text-green-700' : stockStatus.color === 'orange' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                <StockIcon className="w-3.5 h-3.5" />
                {stockStatus.label}
                {stockStatus.label === 'Low Stock' && (
                  <span className="ml-1 text-[10px] text-orange-600">
                    (Alert: {product.stockAlertQuantity})
                  </span>
                )}
              </span>
              {product.isFeatured && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                  <Star className="w-3.5 h-3.5" />
                  Featured
                </span>
              )}
              {product.showOnBanner && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                  <ImageIcon className="w-3.5 h-3.5" />
                  On Banner
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 md:gap-6 lg:gap-8">
          {/* Left Column - Product Gallery */}
          <div className="lg:col-span-3" ref={galleryRef}>
            <div className="sticky top-20 lg:top-24">
              {/* Main Image/Video Area */}
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

                  {/* Zoom Indicator Overlay */}
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

                  {/* Controls */}
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

              {/* Thumbnail Gallery */}
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

              {promotionStyle && (
                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold ${promotionStyle.bg} ${promotionStyle.text} shadow-sm`}>
                  <PromotionIcon className="w-3 h-3" />
                  {promotionStyle.label}
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

            {/* Stock Status - Shows Low Stock when stock quantity is <= Stock Alert Quantity */}
            <div className="flex items-center gap-2 mb-4">
              <div className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium text-${stockStatus.color}-600 bg-${stockStatus.color}-50 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full`}>
                <StockIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-${stockStatus.color}-500`} />
                <span>{stockStatus.label}</span>
                {stockStatus.label === 'In Stock' && (
                  <span className="text-[10px] sm:text-xs text-gray-500">({product.stockQuantity} available)</span>
                )}
                {stockStatus.label === 'Low Stock' && (
                  <span className="text-[10px] sm:text-xs text-orange-500">
                    (Only {product.stockQuantity} left - Alert at {product.stockAlertQuantity})
                  </span>
                )}
              </div>
            </div>

            {/* Stock Alert Quantity Display */}
            {product.stockAlertQuantity > 0 && (
              <div className="mb-4 p-2 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-orange-500" />
                  Stock Alert: Notify when stock reaches {product.stockAlertQuantity}
                </p>
              </div>
            )}

            {/* Product Specifications Summary */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                <p className="text-[10px] text-gray-500">Unit</p>
                <p className="text-sm font-medium text-gray-900">{product.unit === 'pcs' ? 'Pieces' : product.unit || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                <p className="text-[10px] text-gray-500">SKU</p>
                <p className="text-sm font-medium text-gray-900 font-mono">{product.skuCode}</p>
              </div>
            </div>

            {/* Cost Per Item - Show if available */}
            {hasCostPerItem && (
              <div className="mb-4 p-2 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-gray-500" />
                  Cost Per Item: <span className="font-medium text-gray-900">৳{formatPrice(product.costPerItem)}</span>
                </p>
              </div>
            )}

            {/* Delivery Info - Only show if available */}
            {product.deliveryInfo && product.deliveryInfo !== '<p></p>' && product.deliveryInfo.trim() !== '' && (
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-3 sm:p-4 border border-gray-200 mb-4">
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

        {/* Tabs for Description, Specifications, Additional Info */}
        <div className="mt-8 sm:mt-12">
          <div className="flex flex-wrap gap-1 sm:gap-2 border-b border-gray-200">
            {['details', 'specifications', 'additional', 'meta'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-5 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm rounded-t-lg transition-all ${
                  activeTab === tab ? 'bg-white text-black border-t-2 border-l-2 border-r-2 border-gray-200 border-b-white' : 'text-gray-500 hover:text-black'
                }`}
              >
                {tab === 'details' && 'Description'}
                {tab === 'specifications' && 'Specifications'}
                {tab === 'additional' && 'Additional Info'}
                {tab === 'meta' && 'SEO & Meta'}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-b-xl rounded-tr-xl border border-t-0 border-gray-200 p-4 sm:p-5 md:p-6">
            {activeTab === 'details' && (
              <div className="prose prose-sm max-w-none">
                {product.fullDescription && product.fullDescription !== '<p></p>' ? (
                  <div dangerouslySetInnerHTML={{ __html: product.fullDescription }} />
                ) : (
                  <p className="text-gray-400 italic">No description available.</p>
                )}
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {[
                  { label: 'Brand', value: product.brand, icon: Building2 },
                  { label: 'SKU', value: product.skuCode, icon: Package },
                  { label: 'Stock', value: `${product.stockQuantity} units available`, icon: Package },
                  { label: 'Stock Alert', value: product.stockAlertQuantity > 0 ? `${product.stockAlertQuantity} units` : 'Not set', icon: AlertCircle },
                  { label: 'Category', value: product.categoryName, icon: FolderTree },
                  { label: 'Subcategory', value: product.subcategoryName, icon: FolderTree },
                  { label: 'Child Subcategory', value: product.childSubcategoryName, icon: FolderTree },
                  { label: 'Unit', value: product.unit === 'pcs' ? 'Pieces' : product.unit || 'N/A', icon: Scale },
                  { label: 'Regular Price', value: `৳${formatPrice(product.regularPrice)}`, icon: DollarSign },
                  { label: 'Discount Price', value: product.discountPrice > 0 ? `৳${formatPrice(product.discountPrice)}` : 'N/A', icon: Tag },
                  { label: 'Cost Per Item', value: product.costPerItem > 0 ? `৳${formatPrice(product.costPerItem)}` : 'N/A', icon: DollarSign },
                  { label: 'Status', value: product.isActive ? 'Active' : 'Inactive', icon: CheckCircle },
                  { label: 'Featured', value: product.isFeatured ? 'Yes' : 'No', icon: Star },
                  { label: 'Show on Banner', value: product.showOnBanner ? 'Yes' : 'No', icon: ImageIcon },
                  { label: 'Promotion', value: product.promotion || 'None', icon: Zap },
                  { label: 'Purchase Count', value: product.purchaseCount || 0, icon: ShoppingCart },
                  { label: 'Created At', value: new Date(product.createdAt).toLocaleString(), icon: Calendar },
                  { label: 'Created By', value: product.createdBy?.name || product.createdBy?.email || 'Unknown', icon: User },
                ].filter(item => item.value).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-xl border border-gray-200">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                    <div>
                      <p className="text-[10px] sm:text-xs text-gray-500">{item.label}</p>
                      <p className="font-medium text-gray-900 text-xs sm:text-sm">{item.value || 'N/A'}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'additional' && (
              <>
                {product.additionalInfo && product.additionalInfo.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {product.additionalInfo.map((info, idx) => (
                      <div key={`additional-${idx}`} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-xl border border-gray-200">
                        <Info className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                        <div>
                          <p className="text-[10px] sm:text-xs text-gray-500">{info.fieldName}</p>
                          <p className="font-medium text-gray-900 text-xs sm:text-sm">{info.fieldValue}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Info className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No additional information available</p>
                  </div>
                )}
              </>
            )}

            {activeTab === 'meta' && (
              <div className="space-y-4">
                {product.metaSettings?.metaTitle && (
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">Meta Title</p>
                    <p className="font-medium text-gray-900 text-sm">{product.metaSettings.metaTitle}</p>
                  </div>
                )}
                {product.metaSettings?.metaDescription && (
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">Meta Description</p>
                    <p className="font-medium text-gray-900 text-sm">{product.metaSettings.metaDescription}</p>
                  </div>
                )}
                {product.metaSettings?.metaKeywords && product.metaSettings.metaKeywords.length > 0 && (
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                    <p className="text-xs text-gray-500 mb-2">Meta Keywords</p>
                    <div className="flex flex-wrap gap-2">
                      {product.metaSettings.metaKeywords.map((keyword, idx) => (
                        <span key={idx} className="px-2 py-1 bg-white rounded-md text-xs text-gray-600 border border-gray-200">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {!product.metaSettings?.metaTitle && !product.metaSettings?.metaDescription && (!product.metaSettings?.metaKeywords || product.metaSettings.metaKeywords.length === 0) && (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No SEO & Meta settings available</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Tags Section */}
        {product.tags && product.tags.length > 0 && (
          <div className="mt-6">
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4 text-gray-700" />
                Product Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, idx) => (
                  <span key={idx} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${getTagStyles(tag)}`}>
                    <Sparkles className="w-2.5 h-2.5" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Colors Section */}
        {hasColors && (
          <div className="mt-6">
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Palette className="w-4 h-4 text-gray-700" />
                Available Colors
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded-full border-2 border-gray-200 shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

       
      </div>

      {/* Zoom Modal */}
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
    </div>
  );
}