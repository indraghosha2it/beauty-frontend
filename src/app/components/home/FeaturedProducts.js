

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, ShoppingCart, Eye, Star, Loader2, ChevronLeft, ChevronRight, 
  Zap, Sparkles, Tag, Package, Building2, AlertTriangle, Scale, Flame, Clock, Gift,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import CartSidebar from '../CartSidebar';
import Link from 'next/link';

// Helper functions
const formatPrice = (price) => {
  return price?.toFixed(2) || '0.00';
};

const truncateText = (text, limit = 35) => {
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

// Get tag icon
const getTagIcon = (tag) => {
  const icons = {
    'Best Seller': <Star className="w-3.5 h-3.5" />,
    'Trending': <Flame className="w-3.5 h-3.5" />,
    'New Release': <Sparkles className="w-3.5 h-3.5" />,
    'Limited Offer': <Clock className="w-3.5 h-3.5" />,
    'Flash Sale': <Zap className="w-3.5 h-3.5" />,
    'Clearance': <Tag className="w-3.5 h-3.5" />
  };
  return icons[tag] || <Tag className="w-3.5 h-3.5" />;
};

// Product Grid Card
// const ProductGridCard = ({ product, router, isInCart: propIsInCart, onViewInCart, onCartStatusChange }) => {
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
        
//         // Immediately update the button state
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
//     <div
//       className="group bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 cursor-pointer overflow-hidden"
//       onClick={() => window.open(`/productDetails?id=${product._id}`, '_blank')}
//     >
//       {/* Image Container - Reduced height for mobile */}
//       <div className="relative w-full md:h-40 h-32 overflow-hidden bg-gray-50">
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
        
//         {/* Tag Badge on Image */}
//         {primaryTag && (
//           <div className={`absolute top-2 right-2 ${tagStyle} text-[9px] px-1.5 py-0.5 font-medium z-20 flex items-center gap-0.5 shadow-sm`}>
//             <Sparkles className="w-2 h-2" />
//             {primaryTag}
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
//                 <ShoppingCart className="w-3.5 h-3.5 text-blue-600" />
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
//                 <ShoppingCart className="w-3.5 h-3.5 text-blue-600" />
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
//                 activeIndex === index ? 'ring-1 ring-blue-500 ring-offset-1' : 'opacity-60 hover:opacity-100'
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
//           ) : 
//           (
//             <span className="inline-flex items-center gap-1 text-green-600 text-[9px] font-medium">
//               <div className="w-1 h-1 bg-green-500 rounded-full"></div>
//               In Stock 
//               {/* ({product.stockQuantity}) */}
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


const ProductGridCard = ({ product, router, isInCart: propIsInCart, onViewInCart, onCartStatusChange }) => {
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

  // Navigate to product details in same tab
  const navigateToProduct = () => {
    router.push(`/productDetails?id=${product._id}`);
  };

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
    e.preventDefault(); // Prevent Link navigation when clicking Add to Cart
    
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
      className="block group bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="relative w-full md:h-40 h-32 overflow-hidden bg-gray-50">
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
        
        {/* Tag Badge on Image */}
        {primaryTag && (
          <div className={`absolute top-2 right-2 ${tagStyle} text-[9px] px-1.5 py-0.5 font-medium z-20 flex items-center gap-0.5 shadow-sm`}>
            <Sparkles className="w-2 h-2" />
            {primaryTag}
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
                e.preventDefault();
                // Navigate in same tab using router
                router.push(`/productDetails?id=${product._id}`);
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
                <ShoppingCart className="w-3.5 h-3.5 text-blue-600" />
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
                e.preventDefault();
                // Navigate in same tab using router
                router.push(`/productDetails?id=${product._id}`);
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
                <ShoppingCart className="w-3.5 h-3.5 text-blue-600" />
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
                activeIndex === index ? 'ring-1 ring-blue-500 ring-offset-1' : 'opacity-60 hover:opacity-100'
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
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
              In Stock
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
    </Link>
  );
};

// All possible product tags
const ALL_TAGS = [
  { id: 'all', name: 'All Products', icon: <Package className="w-3.5 h-3.5" /> },
  { id: 'Best Seller', name: 'Best Seller', icon: <Star className="w-3.5 h-3.5" /> },
  { id: 'Trending', name: 'Trending', icon: <Flame className="w-3.5 h-3.5" /> },
  { id: 'New Release', name: 'New Release', icon: <Sparkles className="w-3.5 h-3.5" /> },
  { id: 'Limited Offer', name: 'Limited Offer', icon: <Clock className="w-3.5 h-3.5" /> },
  { id: 'Flash Sale', name: 'Flash Sale', icon: <Zap className="w-3.5 h-3.5" /> },
  { id: 'Clearance', name: 'Clearance', icon: <Tag className="w-3.5 h-3.5" /> }
];

// Main Component
export default function FeaturedProducts() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState('all');
  const [productsInCart, setProductsInCart] = useState({});
  const [visibleCount, setVisibleCount] = useState(5);
  const [availableTags, setAvailableTags] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const itemsPerLoad = 5;
  const itemsPerLoadMobile = 4;
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://gadget-backend.vercel.app/api/products?limit=100');
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data);
        setFilteredProducts(data.data);
        
        // Extract available tags from products
        const availableTagIds = [...new Set(
          data.data
            .flatMap(p => p.tags || [])
            .filter(tag => tag && tag !== '')
        )];
        
        // Filter tags to show only those that exist in products
        const filteredTags = ALL_TAGS.filter(tag => 
          tag.id === 'all' || availableTagIds.includes(tag.id)
        );
        setAvailableTags(filteredTags);
        
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
      // No auth - clear cart status
      const emptyCartStatus = {};
      productIds.forEach(id => {
        emptyCartStatus[id] = false;
      });
      setProductsInCart(emptyCartStatus);
      return;
    }
    
    try {
      const response = await fetch('https://gadget-backend.vercel.app/api/cart/check-status', {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ productIds })
      });
      
      const data = await response.json();
      if (data.success) {
        setProductsInCart(data.data);
      } else {
        // If API fails, clear cart status
        const emptyCartStatus = {};
        productIds.forEach(id => {
          emptyCartStatus[id] = false;
        });
        setProductsInCart(emptyCartStatus);
      }
    } catch (error) {
      console.error('Error checking cart status:', error);
      // On error, clear cart status
      const emptyCartStatus = {};
      productIds.forEach(id => {
        emptyCartStatus[id] = false;
      });
      setProductsInCart(emptyCartStatus);
    }
  };

  // Function to update cart status immediately when adding/removing
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
      // No auth - clear all cart statuses
      const emptyCartStatus = {};
      productIds.forEach(id => {
        emptyCartStatus[id] = false;
      });
      setProductsInCart(emptyCartStatus);
      return;
    }
    
    try {
      const response = await fetch('https://gadget-backend.vercel.app/api/cart/check-status', {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ productIds })
      });
      
      const data = await response.json();
      if (data.success) {
        setProductsInCart(data.data);
      } else {
        // If API fails, clear cart status
        const emptyCartStatus = {};
        productIds.forEach(id => {
          emptyCartStatus[id] = false;
        });
        setProductsInCart(emptyCartStatus);
      }
    } catch (error) {
      console.error('Error refreshing cart status:', error);
      // On error, clear cart status
      const emptyCartStatus = {};
      productIds.forEach(id => {
        emptyCartStatus[id] = false;
      });
      setProductsInCart(emptyCartStatus);
    }
  }, [products]);

  // Update a single product's cart status
  const onCartStatusChange = useCallback((productId, isInCart) => {
    setProductsInCart(prev => ({
      ...prev,
      [productId]: isInCart
    }));
  }, []);

  // Filter products based on active tag
  useEffect(() => {
    if (activeTag === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.tags && p.tags.includes(activeTag)));
    }
    // Reset visible count based on device
    setVisibleCount(isMobile ? 4 : 5);
  }, [activeTag, products, isMobile]);

  // Initial load
  useEffect(() => {
    fetchProducts();
  }, []);

  // Set up cart update listener
  useEffect(() => {
    const handleCartUpdate = () => {
      updateCartStatus();
    };
    
    window.addEventListener('cart-update', handleCartUpdate);
    return () => window.removeEventListener('cart-update', handleCartUpdate);
  }, [updateCartStatus]);

  // ========== FIX: Listen for auth-change events ==========
  useEffect(() => {
    const handleAuthChange = () => {
      // When auth changes (login/logout), update cart status
      updateCartStatus();
    };
    
    window.addEventListener('auth-change', handleAuthChange);
    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, [updateCartStatus]);

  // Check mobile and scroll position
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setVisibleCount(mobile ? 4 : 5);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    if (isMobile && scrollContainerRef.current) {
      checkScrollPosition();
      scrollContainerRef.current.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);
      return () => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.removeEventListener('scroll', checkScrollPosition);
        }
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, [isMobile, availableTags]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;
  const hasLess = visibleCount > (isMobile ? 4 : 5);

  const showMore = () => {
    const increment = isMobile ? itemsPerLoadMobile : itemsPerLoad;
    setVisibleCount(prev => Math.min(prev + increment, filteredProducts.length));
  };

  const showLess = () => {
    setVisibleCount(isMobile ? 4 : 5);
  };

  const openCartSidebar = () => {
    setIsCartOpen(true);
  };

  const closeCartSidebar = () => {
    setIsCartOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-16 flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-black" />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white py-2 md:py-2">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Professional Modern Header */}
          <div className="text-center mb-6 md:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full mb-3 md:mb-4">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span className="text-xs font-medium text-gray-600">Trending Now</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-black mb-2 md:mb-3">Featured Products</h2>
            <p className="text-gray-500 text-xs md:text-sm max-w-2xl mx-auto px-4">
              Discover our handpicked selection of trending gadgets and electronics,
              curated just for you.
            </p>
          </div>

          {/* Product Tags Tabs - Scrollable on mobile */}
          <div className="flex justify-center mb-6 md:mb-10">
            <div className="relative w-full max-w-full">
              {/* Left Arrow - Mobile only */}
              {isMobile && showLeftArrow && (
                <button
                  onClick={() => scroll('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-1.5 border border-gray-200 hover:bg-gray-50 transition-all"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-700" />
                </button>
              )}
              
              {/* Scrollable Tabs Container */}
              <div
                ref={scrollContainerRef}
                className={`flex gap-2 overflow-x-auto scrollbar-hide ${
                  isMobile ? 'justify-start px-6' : 'justify-center flex-wrap'
                }`}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {availableTags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => setActiveTag(tag.id)}
                    className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 rounded-lg transition-all duration-300 text-xs md:text-sm font-medium whitespace-nowrap ${
                      activeTag === tag.id
                        ? 'bg-black text-white shadow-md'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {tag.icon}
                    <span className="text-xs md:text-sm">{tag.name}</span>
                  </button>
                ))}
              </div>
              
              {/* Right Arrow - Mobile only */}
              {isMobile && showRightArrow && (
                <button
                  onClick={() => scroll('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-1.5 border border-gray-200 hover:bg-gray-50 transition-all"
                >
                  <ChevronRight className="w-4 h-4 text-gray-700" />
                </button>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="mb-2">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white border border-gray-200">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No products found with tag "{activeTag}"</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3">
                  <AnimatePresence mode="wait">
                    {visibleProducts.map((product) => (
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

                {/* Show More / Show Less Buttons */}
                <div className="flex justify-center gap-3 mt-8">
                  {hasLess && (
                    <button
                      onClick={showLess}
                      className="flex items-center gap-2 px-4 md:px-5 py-1.5 md:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-xs md:text-sm font-medium"
                    >
                      <ChevronUp className="w-3 h-3 md:w-4 md:h-4" />
                      Show Less
                    </button>
                  )}
                  
                  {hasMore && (
                    <button
                      onClick={showMore}
                      className="flex items-center gap-2 px-4 md:px-5 py-1.5 md:py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-xs md:text-sm font-medium"
                    >
                      Show More
                      <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />
    </>
  );
}