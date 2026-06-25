
// 'use client';

// import { useState, useEffect, useRef, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Heart, ShoppingCart, Eye, Star, Loader2, ChevronLeft, ChevronRight, 
//   Zap, Sparkles, Tag, Package, Building2, AlertTriangle, Scale, Flame, Clock, Gift,
//   ChevronDown, ChevronUp, Flower2, Award, Shield, Truck, Leaf, Users,
//   ArrowRight
// } from 'lucide-react';
// import { toast } from 'sonner';
// import { useRouter } from 'next/navigation';
// import CartSidebar from '../CartSidebar';
// import Link from 'next/link';

// // Helper functions
// const formatPrice = (price) => {
//   return price?.toFixed(2) || '0.00';
// };

// const truncateText = (text, limit = 20) => {
//   if (!text) return '';
//   if (text.length <= limit) return text;
//   return text.substring(0, limit) + '...';
// };

// const calculateDiscountPercentage = (regularPrice, discountPrice) => {
//   if (regularPrice && discountPrice && discountPrice < regularPrice) {
//     return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
//   }
//   return 0;
// };

// const getTagStyles = (tag) => {
//   const styles = {
//     'Best Seller': 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white shadow-lg shadow-[#EE4275]/30',
//     'Trending': 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white shadow-lg shadow-[#EE4275]/30',
//     'New Release': 'bg-gradient-to-r from-[#FF6B9D] to-[#EE4275] text-white shadow-lg shadow-[#EE4275]/30',
//     'Limited Offer': 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white shadow-lg shadow-[#EE4275]/30',
//     'Flash Sale': 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white shadow-lg shadow-[#EE4275]/30',
//     'Clearance': 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white shadow-lg shadow-[#EE4275]/30',
//     'Eco-Friendly': 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30',
//     'Organic': 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30',
//     'Cruelty-Free': 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/30',
//     'Vegan': 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30',
//     'Luxury': 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30',
//     'Award Winner': 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-lg shadow-yellow-500/30'
//   };
//   return styles[tag] || 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white shadow-lg shadow-[#EE4275]/30';
// };

// // Product Grid Card - Beauty Style (Compact)
// const ProductGridCard = ({ product, router, onCartStatusChange, isInCart: propIsInCart, onViewInCart }) => {
//   const [isMobile, setIsMobile] = useState(false);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [cartStatusLoading, setCartStatusLoading] = useState(false);
//   const [isInCart, setIsInCart] = useState(propIsInCart || false);

//   const productImages = product.images || [];
//   const hasMultipleImages = productImages.length > 1;
//   const primaryTag = product.tags?.[0];
//   const tagStyle = primaryTag ? getTagStyles(primaryTag) : '';
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
        
//         {/* Tag Badge */}
//         {primaryTag && (
//           <motion.div 
//             initial={{ x: 10, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.1 }}
//             className={`absolute top-0.5 right-0.5 ${tagStyle} text-[5px] sm:text-[6px] md:text-[7px] px-1 py-0.5 m-1 font-semibold rounded-md z-20 flex items-center gap-0.5 shadow-lg`}
//           >
//             <Sparkles className="w-1 h-1 sm:w-1.5 sm:h-1.5" />
//             <span className="truncate max-w-[35px] sm:max-w-[50px] md:max-w-[60px]">
//               {primaryTag}
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
//         <h3 className="text-[10px] sm:text-xs font-semibold text-gray-800 line-clamp-2 hover:text-[#EE4275] transition-colors duration-200 mb-1" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }} title={product.productName}>
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
//           <span className="text-xs sm:text-sm font-bold text-[#EE4275]" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
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
//             className="w-full py-1 text-center text-[8px] font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg flex items-center justify-center gap-1"
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
//             className="w-full py-1 text-center text-[7px] sm:text-[9px] font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center gap-1"
//           >
//             <ShoppingCart className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
//             <span className="hidden sm:inline">View in Cart</span>
//             <span className="sm:hidden">Cart</span>
//           </button>
//         ) : (
//           <button
//             onClick={addToCart}
//             className="w-full py-1 text-center text-[7px] sm:text-[9px] font-bold bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all duration-200 flex items-center justify-center gap-1"
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

// // Main Component - Beauty Featured Products
// export default function BeautyFeaturedProducts() {
//   const router = useRouter();
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTag, setActiveTag] = useState('all');
//   const [productsInCart, setProductsInCart] = useState({});
//   const [currentPage, setCurrentPage] = useState(1);
//   const [featuredTags, setFeaturedTags] = useState([
//     { id: 'all', name: 'All Products' }
//   ]);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const productsPerPage = 4;

//   // Featured content for the banner - Only background images
//   const getFeaturedContent = (tagId) => {
//     const contentMap = {
//       'all': {
//         bgImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop'
//       },
//       'Best Seller': {
//         bgImage: 'https://images.unsplash.com/photo-1557177324-56c542c3093f?w=800&h=600&fit=crop'
//       },
//       'Trending': {
//         bgImage: 'https://images.unsplash.com/photo-1596462502278-27bf7d5ee2a1?w=800&h=600&fit=crop'
//       },
//       'New Release': {
//         bgImage: '/images/1.png'
//       },
//       'Limited Offer': {
//         bgImage: '/images/1.png'
//       },
//       'Flash Sale': {
//         bgImage: 'https://images.unsplash.com/photo-1585618255604-2f2ac73592db?w=800&h=600&fit=crop'
//       },
//       'Clearance': {
//         bgImage: 'https://images.unsplash.com/photo-1512499618352-a9fd406ced1d?w=800&h=600&fit=crop'
//       },
//       'Luxury': {
//         bgImage: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=600&fit=crop'
//       },
//       'Award Winner': {
//         bgImage: 'https://images.unsplash.com/photo-1522336572468-97b06e8ef143?w=800&h=600&fit=crop'
//       }
//     };
//     return contentMap[tagId] || contentMap['all'];
//   };

//   // Extract unique tags from products
//   const extractTags = (productsList) => {
//     if (!productsList || productsList.length === 0) return [{ id: 'all', name: 'All Products' }];
    
//     const uniqueTags = [...new Set(
//       productsList
//         .flatMap(p => p.tags || [])
//         .filter(tag => tag && tag !== '')
//     )];
    
//     const tags = [{ id: 'all', name: 'All Products' }];
    
//     uniqueTags.forEach(tag => {
//       tags.push({ id: tag, name: tag });
//     });
    
//     return tags;
//   };

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('http://localhost:5000/api/products?limit=50');
//       const data = await response.json();
      
//       if (data.success) {
//         setProducts(data.data);
//         setFilteredProducts(data.data);
        
//         const tags = extractTags(data.data);
//         setFeaturedTags(tags);
        
//         await checkCartStatus(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const checkCartStatus = async (productsList) => {
//     if (!productsList || productsList.length === 0) return;
    
//     const productIds = productsList.map(p => p._id);
//     const token = localStorage.getItem('token');
//     const sessionId = localStorage.getItem('cartSessionId');
    
//     const headers = {};
//     if (token) {
//       headers['Authorization'] = `Bearer ${token}`;
//     } else if (sessionId) {
//       headers['x-session-id'] = sessionId;
//     } else {
//       const emptyCartStatus = {};
//       productIds.forEach(id => {
//         emptyCartStatus[id] = false;
//       });
//       setProductsInCart(emptyCartStatus);
//       return;
//     }
    
//     try {
//       const response = await fetch('http://localhost:5000/api/cart/check-status', {
//         method: 'POST',
//         headers: { ...headers, 'Content-Type': 'application/json' },
//         body: JSON.stringify({ productIds })
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         setProductsInCart(data.data);
//       } else {
//         const emptyCartStatus = {};
//         productIds.forEach(id => {
//           emptyCartStatus[id] = false;
//         });
//         setProductsInCart(emptyCartStatus);
//       }
//     } catch (error) {
//       console.error('Error checking cart status:', error);
//       const emptyCartStatus = {};
//       productIds.forEach(id => {
//         emptyCartStatus[id] = false;
//       });
//       setProductsInCart(emptyCartStatus);
//     }
//   };

//   const updateCartStatus = useCallback(async () => {
//     if (products.length === 0) return;
    
//     const productIds = products.map(p => p._id);
//     const token = localStorage.getItem('token');
//     const sessionId = localStorage.getItem('cartSessionId');
    
//     const headers = {};
//     if (token) {
//       headers['Authorization'] = `Bearer ${token}`;
//     } else if (sessionId) {
//       headers['x-session-id'] = sessionId;
//     } else {
//       const emptyCartStatus = {};
//       productIds.forEach(id => {
//         emptyCartStatus[id] = false;
//       });
//       setProductsInCart(emptyCartStatus);
//       return;
//     }
    
//     try {
//       const response = await fetch('http://localhost:5000/api/cart/check-status', {
//         method: 'POST',
//         headers: { ...headers, 'Content-Type': 'application/json' },
//         body: JSON.stringify({ productIds })
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         setProductsInCart(data.data);
//       } else {
//         const emptyCartStatus = {};
//         productIds.forEach(id => {
//           emptyCartStatus[id] = false;
//         });
//         setProductsInCart(emptyCartStatus);
//       }
//     } catch (error) {
//       console.error('Error refreshing cart status:', error);
//       const emptyCartStatus = {};
//       productIds.forEach(id => {
//         emptyCartStatus[id] = false;
//       });
//       setProductsInCart(emptyCartStatus);
//     }
//   }, [products]);

//   const onCartStatusChange = useCallback((productId, isInCart) => {
//     setProductsInCart(prev => ({
//       ...prev,
//       [productId]: isInCart
//     }));
//   }, []);

//   useEffect(() => {
//     if (activeTag === 'all') {
//       setFilteredProducts(products);
//     } else {
//       setFilteredProducts(products.filter(p => p.tags && p.tags.includes(activeTag)));
//     }
//     setCurrentPage(1);
//   }, [activeTag, products]);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     const handleCartUpdate = () => {
//       updateCartStatus();
//     };
    
//     window.addEventListener('cart-update', handleCartUpdate);
//     return () => window.removeEventListener('cart-update', handleCartUpdate);
//   }, [updateCartStatus]);

//   useEffect(() => {
//     const handleAuthChange = () => {
//       updateCartStatus();
//     };
    
//     window.addEventListener('auth-change', handleAuthChange);
//     return () => {
//       window.removeEventListener('auth-change', handleAuthChange);
//     };
//   }, [updateCartStatus]);

//   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
//   const currentProducts = filteredProducts.slice(
//     (currentPage - 1) * productsPerPage,
//     currentPage * productsPerPage
//   );

//   const goToPage = (page) => {
//     setCurrentPage(page);
//   };

//   const openCartSidebar = () => {
//     setIsCartOpen(true);
//   };

//   const closeCartSidebar = () => {
//     setIsCartOpen(false);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-white via-[#FFF5F6]/30 to-white">
//         <div className="container mx-auto px-4 sm:px-8 py-16 flex justify-center items-center">
//           <Loader2 className="w-8 h-8 animate-spin text-[#EE4275]" />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-b from-white via-[#FFF5F6]/30 to-white">
//         {/* Top Decorative Border - Beauty Style */}
//         <div className="w-full h-3 bg-gradient-to-r from-[#EE4275]/20 via-[#FFD2DB]/40 to-[#EE4275]/20"></div>

//         {/* Main Content */}
//         <div className="bg-white min-h-screen px-3 sm:px-8 pt-4 sm:pt-2 pb-0">
//           <div className="container mx-auto max-w-7xl">
            
//             {/* Header with Dynamic Tags - Professional Style */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-12 gap-3 sm:gap-4">
//               <div className="flex flex-col items-start gap-1">
//                 {/* Beauty Essentials Badge - Separate line above */}
//                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFD2DB]/30 rounded-full border border-[#FFD2DB]/40">
//                   <Flower2 className="w-3.5 h-3.5 text-[#EE4275]" />
//                   <span className="text-xs font-medium text-[#EE4275]">Beauty Essentials</span>
//                 </div>
//                 {/* Featured Beauty - One line */}
//                 <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#2D1B2E] leading-none" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
//                   <span className="text-[#EE4275]">Featured</span> Beauty
//                 </h1>
//               </div>
              
//               {/* Professional Tabs - No Background Color, Text Color Change + Bottom Border */}
//               <nav className="flex gap-0 sm:gap-1 text-xs sm:text-sm font-medium overflow-x-auto pb-0 w-full sm:w-auto scrollbar-hide border-b border-[#FFD2DB]/30">
//                 {featuredTags.map((tag) => (
//                   <button
//                     key={tag.id}
//                     onClick={() => setActiveTag(tag.id)}
//                     className={`px-3 sm:px-5 py-2 sm:py-2.5 transition-all duration-300 whitespace-nowrap relative ${
//                       activeTag === tag.id
//                         ? 'text-[#EE4275] font-semibold'
//                         : 'text-[#8B7A8C] hover:text-[#2D1B2E]'
//                     }`}
//                   >
//                     {tag.name}
//                     {activeTag === tag.id && (
//                       <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EE4275] rounded-full"></span>
//                     )}
//                   </button>
//                 ))}
//               </nav>
//             </div>

//             {/* Content Container - Left Banner + Right Products */}
//             <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 mb-16 items-stretch">
//               {/* Left Side - Featured Banner with Only Background Image */}
//               <div className="w-[27.5%] lg:w-[27.5%] flex-shrink-0 h-[380px] hidden lg:block">
//                 <div 
//                   className="relative rounded-3xl w-full h-full overflow-hidden shadow-xl"
//                   style={{
//                     backgroundImage: `url(${getFeaturedContent(activeTag).bgImage})`,
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                   }}
//                 />
//               </div>
              
//               {/* Right Side - Product Grid */}
//               <div className="flex-1">
//                 {filteredProducts.length === 0 ? (
//                   <div className="text-center py-16 bg-white rounded-2xl border border-[#FFD2DB]/40">
//                     <Package className="w-12 h-12 text-[#FFD2DB] mx-auto mb-3" />
//                     <p className="text-[#8B7A8C]">No products found in this category</p>
//                   </div>
//                 ) : (
//                   <>
//                     {/* Grid: 2 columns on mobile, 4 columns on desktop */}
//                     <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-2 lg:grid-cols-4">
//                       <AnimatePresence mode="wait">
//                         {currentProducts.map((product) => (
//                           <ProductGridCard
//                             key={product._id}
//                             product={product}
//                             router={router}
//                             isInCart={productsInCart[product._id] || false}
//                             onViewInCart={openCartSidebar}
//                             onCartStatusChange={onCartStatusChange}
//                           />
//                         ))}
//                       </AnimatePresence>
//                     </div>

//                     {/* Pagination */}
//                     {totalPages > 1 && (
//                       <div className="flex justify-center items-center gap-1 sm:gap-2 mt-6 sm:mt-8">
//                         <button
//                           onClick={() => goToPage(currentPage - 1)}
//                           disabled={currentPage === 1}
//                           className="p-1.5 sm:p-2 rounded-lg bg-white border border-[#FFD2DB]/40 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FFF5F6] transition-colors"
//                         >
//                           <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-[#EE4275]" />
//                         </button>
//                         <div className="flex gap-0.5 sm:gap-1">
//                           {[...Array(totalPages)].map((_, i) => {
//                             const pageNum = i + 1;
//                             if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
//                               return (
//                                 <button
//                                   key={i}
//                                   onClick={() => goToPage(pageNum)}
//                                   className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
//                                     currentPage === pageNum
//                                       ? 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white shadow-md shadow-[#EE4275]/25'
//                                       : 'bg-white border border-[#FFD2DB]/40 text-[#8B7A8C] hover:text-[#EE4275] hover:border-[#EE4275]/50'
//                                   }`}
//                                 >
//                                   {pageNum}
//                                 </button>
//                               );
//                             } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
//                               return <span key={i} className="text-[#C4B5C5] text-xs sm:text-sm">...</span>;
//                             }
//                             return null;
//                           })}
//                         </div>
//                         <button
//                           onClick={() => goToPage(currentPage + 1)}
//                           disabled={currentPage === totalPages}
//                           className="p-1.5 sm:p-2 rounded-lg bg-white border border-[#FFD2DB]/40 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FFF5F6] transition-colors"
//                         >
//                           <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#EE4275]" />
//                         </button>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Decorative Border - Beauty Style */}
//         <div className="w-full h-3 bg-gradient-to-r from-[#EE4275]/20 via-[#FFD2DB]/40 to-[#EE4275]/20"></div>
//       </div>

//       {/* Cart Sidebar */}
//       <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />
//     </>
//   );
// }

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, ShoppingCart, Eye, Star, Loader2, ChevronLeft, ChevronRight, 
  Zap, Sparkles, Tag, Package, Building2, AlertTriangle, Scale, Flame, Clock, Gift,
  ChevronDown, ChevronUp, Flower2, Award, Shield, Truck, Leaf, Users,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import CartSidebar from '../CartSidebar';
import Link from 'next/link';

// Helper functions
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

// Helper function to get tag value for comparison
const getTagValue = (tag) => {
  if (!tag) return '';
  if (typeof tag === 'string') return tag;
  if (typeof tag === 'object' && tag.name) return tag.name;
  if (typeof tag === 'object' && tag._id) return tag._id;
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

// Helper function to get tag background color
const getTagColor = (tag) => {
  if (!tag) return 'from-[#EE4275] to-[#FF6B9D]';
  if (typeof tag === 'object' && tag.color) {
    return tag.color;
  }
  return 'from-[#EE4275] to-[#FF6B9D]';
};

// Product Grid Card - Beauty Style (Compact)
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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
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
      onClick={() => {
        if (isMobile) {
          window.location.href = `/productDetails?id=${product._id}`;
        } else {
          window.open(`/productDetails?id=${product._id}`, '_blank');
        }
      }}
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
            className="absolute top-0.5 right-0.5  bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-[6px] sm:text-[8px] md:text-[9px] px-1 py-0.5 m-1 font-semibold rounded-md z-20 flex items-center gap-0.5 shadow-lg"
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
              x: !isMobile && isHovered ? 0 : 40, 
              opacity: !isMobile && isHovered ? 1 : 0 
            }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onClick={(e) => {
              e.stopPropagation();
              window.open(`/productDetails?id=${product._id}`, '_blank');
            }}
            className="hidden sm:flex w-7 h-7 rounded-full bg-white shadow-md hover:bg-[#EE4275] items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
          >
            <Eye className="w-3.5 h-3.5 text-[#EE4275] hover:text-white transition-colors duration-200" />
          </motion.div>
          
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ 
              x: !isMobile && isHovered ? 0 : 40, 
              opacity: !isMobile && isHovered ? 1 : 0 
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
          isMobile ? 'flex' : 'hidden'
        }`}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              window.open(`/productDetails?id=${product._id}`, '_blank');
            }}
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
            <div className="text-[5px] sm:text-[7px] text-gray-400">&#128132; Beauty</div>
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
            className="w-full py-1 text-center text-[8px] font-bold bg-gradient-to-r from-[#a80883] to-[#6c0756] text-white hover:from-[#8e066f] hover:to-[#3b032f] text-white rounded-lg flex items-center justify-center gap-1"
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

// Main Component - Beauty Featured Products
export default function BeautyFeaturedProducts() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState('all');
  const [productsInCart, setProductsInCart] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [featuredTags, setFeaturedTags] = useState([
    { id: 'all', name: 'All Products', image: null }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const productsPerPage = 4;

  // Default banner image for "All" tab
  const DEFAULT_BANNER_IMAGE = '/images/featured2.png';

  // Extract unique tags from products - FIXED to handle both string and object tags
  const extractTags = (productsList) => {
    if (!productsList || productsList.length === 0) {
      return [{ id: 'all', name: 'All Products', image: null }];
    }
    
    const uniqueTags = [];
    const tagSet = new Set();
    
    productsList.forEach(product => {
      const tags = product.tags || [];
      tags.forEach(tag => {
        // Handle both string tags and populated tag objects
        const tagValue = getTagValue(tag);
        if (tagValue && !tagSet.has(tagValue)) {
          tagSet.add(tagValue);
          const tagImage = getTagImage(tag);
          uniqueTags.push({ 
            id: tagValue, 
            name: getTagName(tag) || tagValue,
            image: tagImage // Store tag image for the banner
          });
        }
      });
    });
    
    // Sort tags alphabetically
    uniqueTags.sort((a, b) => a.name.localeCompare(b.name));
    
    return [{ id: 'all', name: 'All Products', image: null }, ...uniqueTags];
  };

  // Get the current tag's image for the banner
  const getCurrentTagImage = () => {
    if (activeTag === 'all') {
      return DEFAULT_BANNER_IMAGE;
    }
    const currentTag = featuredTags.find(tag => tag.id === activeTag);
    return currentTag?.image || DEFAULT_BANNER_IMAGE;
  };

const fetchProducts = async () => {
  setLoading(true);
  try {
    // Add isFeatured=true to only fetch featured products
    const response = await fetch('http://localhost:5000/api/products?limit=50&isFeatured=true');
    const data = await response.json();
    
    if (data.success) {
      setProducts(data.data);
      setFilteredProducts(data.data);
      
      const tags = extractTags(data.data);
      setFeaturedTags(tags);
      
      await checkCartStatus(data.data);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    setLoading(false);
  }
};

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

  const updateCartStatus = useCallback(async () => {
    if (products.length === 0) return;
    
    const productIds = products.map(p => p._id);
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
  }, [products]);

  const onCartStatusChange = useCallback((productId, isInCart) => {
    setProductsInCart(prev => ({
      ...prev,
      [productId]: isInCart
    }));
  }, []);

  useEffect(() => {
    if (activeTag === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => {
        const productTags = p.tags || [];
        return productTags.some(tag => {
          const tagValue = getTagValue(tag);
          return tagValue === activeTag;
        });
      }));
    }
    setCurrentPage(1);
  }, [activeTag, products]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleCartUpdate = () => {
      updateCartStatus();
    };
    
    window.addEventListener('cart-update', handleCartUpdate);
    return () => window.removeEventListener('cart-update', handleCartUpdate);
  }, [updateCartStatus]);

  useEffect(() => {
    const handleAuthChange = () => {
      updateCartStatus();
    };
    
    window.addEventListener('auth-change', handleAuthChange);
    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, [updateCartStatus]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const openCartSidebar = () => {
    setIsCartOpen(true);
  };

  const closeCartSidebar = () => {
    setIsCartOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-[#FFF5F6]/30 to-white">
        <div className="container mx-auto px-4 sm:px-8 py-16 flex justify-center items-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#EE4275]" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white via-[#FFF5F6]/30 to-white">
        {/* Top Decorative Border - Beauty Style */}
        <div className="w-full h-3 bg-gradient-to-r from-[#EE4275]/20 via-[#FFD2DB]/40 to-[#EE4275]/20"></div>

        {/* Main Content */}
        <div className="bg-white min-h-screen px-3 sm:px-8 pt-4 sm:pt-2 pb-0">
          <div className="container mx-auto max-w-7xl">
            
            {/* Header with Dynamic Tags - Professional Style */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-12 gap-3 sm:gap-4">
              <div className="flex flex-col items-start gap-1">
                {/* Beauty Essentials Badge - Separate line above */}
                <div className="inline-flex items-center gap-2 px-3 py-1 mt-2 md:mt-6 bg-[#FFD2DB]/30 rounded-full border border-[#FFD2DB]/40">
                  <Flower2 className="w-3.5 h-3.5 text-[#EE4275]" />
                  <span className="text-xs font-medium text-[#EE4275]">Beauty Essentials</span>
                </div>
                {/* Featured Beauty - One line */}
                <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#2D1B2E] leading-none" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  <span className="text-[#EE4275]">Featured</span> Beauty
                </h1>
              </div>
              
              {/* Professional Tabs - Using tag images in tabs */}
              <nav className="flex gap-0 sm:gap-1 text-xs sm:text-sm font-medium overflow-x-auto pb-0 w-full sm:w-auto scrollbar-hide border-b border-[#FFD2DB]/30">
                {featuredTags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => setActiveTag(tag.id)}
                    className={`px-3 sm:px-5 py-2 sm:py-2.5 transition-all duration-300 whitespace-nowrap relative flex items-center gap-1.5 ${
                      activeTag === tag.id
                        ? 'text-[#EE4275] font-semibold'
                        : 'text-[#8B7A8C] hover:text-[#2D1B2E]'
                    }`}
                  >
                    
                    <span>{tag.name}</span>
                    {activeTag === tag.id && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EE4275] rounded-full"></span>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content Container - Left Banner + Right Products */}
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 mb-16 items-stretch">
              {/* Left Side - Featured Banner with Dynamic Tag Image */}
     
<div className="w-[27.5%] lg:w-[27.5%] flex-shrink-0 h-[380px] hidden lg:block">
  <div 
    className="relative rounded-3xl w-full h-full overflow-hidden shadow-xl"
    style={{
      backgroundImage: `url(${getCurrentTagImage()})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    {/* Pink Gradient Overlay - Soft and elegant */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#EE4275]/15 via-[#FF6B9D]/5 to-transparent z-10"></div>
    
    {/* Pink Border Frame */}
    <div className="absolute inset-2 rounded-2xl border border-[#EE4275]/20 z-10"></div>
    
    {/* Inner Pink Glow */}
    <div className="absolute inset-0 rounded-3xl shadow-inner shadow-[#EE4275]/10 z-10"></div>

   

   

    {/* Floating Sparkles - Subtle animation */}
    <motion.div 
      className="absolute top-1/3 right-8 z-20"
      animate={{
        y: [0, -8, 0],
        opacity: [0.4, 0.8, 0.4],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Sparkles className="w-3 h-3 text-[#EE4275]/40" />
    </motion.div>

    <motion.div 
      className="absolute bottom-1/3 left-8 z-20"
      animate={{
        y: [0, 8, 0],
        opacity: [0.3, 0.7, 0.3],
      }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5
      }}
    >
      <Sparkles className="w-2.5 h-2.5 text-[#FF6B9D]/40" />
    </motion.div>

    {/* Bottom overlay with tag name - Elegant pink gradient */}
    {activeTag !== 'all' && (
      <motion.div 
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#EE4275]/80 via-[#EE4275]/40 to-transparent p-5 z-20"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-2">
          {featuredTags.find(t => t.id === activeTag)?.image && (
            <img 
              src={featuredTags.find(t => t.id === activeTag)?.image} 
              alt=""
              className="w-6 h-6 rounded-full object-cover border-2 border-white/40"
            />
          )}
          <span className="text-white text-sm font-semibold">
            {featuredTags.find(t => t.id === activeTag)?.name || ''}
          </span>
          <motion.div
            animate={{
              x: [0, 4, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ArrowRight className="w-3 h-3 text-white/60" />
          </motion.div>
        </div>
      </motion.div>
    )}

    {/* Decorative line - Pink */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-[#EE4275]/40 to-transparent z-20"></div>
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-[#EE4275]/40 to-transparent z-20"></div>
  </div>
</div>
              
              {/* Right Side - Product Grid */}
              <div className="flex-1">
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-2xl border border-[#FFD2DB]/40">
                    <Package className="w-12 h-12 text-[#FFD2DB] mx-auto mb-3" />
                    <p className="text-[#8B7A8C]">No products found in this category</p>
                  </div>
                ) : (
                  <>
                    {/* Grid: 2 columns on mobile, 4 columns on desktop */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-2 lg:grid-cols-4">
                      <AnimatePresence mode="wait">
                        {currentProducts.map((product) => (
                          <ProductGridCard
                            key={product._id}
                            product={product}
                            router={router}
                            isInCart={productsInCart[product._id] || false}
                            onViewInCart={openCartSidebar}
                            onCartStatusChange={onCartStatusChange}
                          />
                        ))}
                      </AnimatePresence>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center gap-1 sm:gap-2 mt-6 sm:mt-8">
                        <button
                          onClick={() => goToPage(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="p-1.5 sm:p-2 rounded-lg bg-white border border-[#FFD2DB]/40 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FFF5F6] transition-colors"
                        >
                          <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-[#EE4275]" />
                        </button>
                        <div className="flex gap-0.5 sm:gap-1">
                          {[...Array(totalPages)].map((_, i) => {
                            const pageNum = i + 1;
                            if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
                              return (
                                <button
                                  key={i}
                                  onClick={() => goToPage(pageNum)}
                                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                                    currentPage === pageNum
                                      ? 'bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white shadow-md shadow-[#EE4275]/25'
                                      : 'bg-white border border-[#FFD2DB]/40 text-[#8B7A8C] hover:text-[#EE4275] hover:border-[#EE4275]/50'
                                  }`}
                                >
                                  {pageNum}
                                </button>
                              );
                            } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                              return <span key={i} className="text-[#C4B5C5] text-xs sm:text-sm">...</span>;
                            }
                            return null;
                          })}
                        </div>
                        <button
                          onClick={() => goToPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="p-1.5 sm:p-2 rounded-lg bg-white border border-[#FFD2DB]/40 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FFF5F6] transition-colors"
                        >
                          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#EE4275]" />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Border - Beauty Style */}
        <div className="w-full h-3 bg-gradient-to-r from-[#EE4275]/20 via-[#FFD2DB]/40 to-[#EE4275]/20"></div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />
    </>
  );
}