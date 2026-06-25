

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Search, 
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
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  Eye,
  CheckCircle,
  XCircle,
  Package,
  AlertCircle,
  ArrowLeft,
  Star,
  Sparkles,
  TrendingUp,
  Award,
  Flame,
  Palette,
  Ruler,
  Layers,
  FolderTree,
  Gift,
  Clock,
  Zap,
  Truck,
  Heart,
  Building2,
  Box,
  Scale
} from 'lucide-react';
import { toast } from 'sonner';

// Tag styles based on tag name
const getTagStyle = (tag) => {
  const styles = {
    'Best Seller': 'bg-gradient-to-r from-amber-500 to-orange-600 text-white',
    'Trending': 'bg-gradient-to-r from-rose-500 to-red-600 text-white',
    'New Release': 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white',
    'Limited Offer': 'bg-gradient-to-r from-purple-500 to-pink-600 text-white',
    'Flash Sale': 'bg-gradient-to-r from-red-500 to-orange-600 text-white',
    'Clearance': 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white'
  };
  return styles[tag] || 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
};

// Unit options display
const getUnitLabel = (unit) => {
  const units = {
    'pcs': 'Pieces',
    'ton': 'Ton',
    'other': 'Custom'
  };
  return units[unit] || unit;
};

const formatPrice = (price) => {
  return price?.toFixed(2) || '0';
};

const calculateDiscount = (regularPrice, discountPrice) => {
  if (regularPrice && discountPrice && discountPrice < regularPrice) {
    return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
  }
  return 0;
};

// Filter Bar Component
const FilterBar = ({ 
  filters, 
  handleFilterChange,
  categories,
  subcategories,
  childSubcategories,
  selectedCategory,
  selectedSubcategory,
  showChildSubcategory,
  brands,
  minPriceInput,
  maxPriceInput,
  setMinPriceInput,
  setMaxPriceInput,
  applyPriceRange,
  clearPriceRange,
  getActiveFilterCount,
  clearFilters
}) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
        <Filter className="w-4 h-4 text-blue-600" />
        Filters
      </h3>
      {getActiveFilterCount() > 0 && (
        <button
          onClick={clearFilters}
          className="text-xs text-blue-600 hover:text-blue-700 font-medium"
        >
          Clear All ({getActiveFilterCount()})
        </button>
      )}
    </div>
  
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
      {/* Search Input */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">Search</label>
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
        />
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">Category</label>
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Brand Filter */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">Brand</label>
        <select
          value={filters.brand}
          onChange={(e) => handleFilterChange('brand', e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
        >
          <option value="">All Brands</option>
          {brands.map(brand => (
            <option key={brand._id} value={brand.name}>{brand.name}</option>
          ))}
        </select>
      </div>

      {/* Subcategory Filter */}
      {selectedCategory && subcategories.length > 0 && (
        <div>
          <label className="block text-xs text-gray-500 mb-1">Subcategory</label>
          <select
            value={filters.subcategory}
            onChange={(e) => handleFilterChange('subcategory', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
          >
            <option value="">All Subcategories</option>
            {subcategories.map(sub => (
              <option key={sub._id} value={sub._id}>{sub.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Child Subcategory Filter */}
      {showChildSubcategory && childSubcategories.length > 0 && (
        <div>
          <label className="block text-xs text-gray-500 mb-1">Child Subcategory</label>
          <select
            value={filters.childSubcategory}
            onChange={(e) => handleFilterChange('childSubcategory', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
          >
            <option value="">All Child Subcategories</option>
            {childSubcategories.map(child => (
              <option key={child._id} value={child._id}>{child.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Unit Filter */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">Unit</label>
        <select
          value={filters.unit}
          onChange={(e) => handleFilterChange('unit', e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
        >
          <option value="">All Units</option>
          <option value="pcs">Pieces (pcs)</option>
          <option value="ton">Ton (ton)</option>
        </select>
      </div>

      {/* Featured Filter */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">Featured</label>
        <select
          value={filters.isFeatured}
          onChange={(e) => handleFilterChange('isFeatured', e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
        >
          <option value="">All Products</option>
          <option value="featured">Featured Only</option>
        </select>
      </div>

      {/* Show on Banner Filter */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">Banner</label>
        <select
          value={filters.showOnBanner}
          onChange={(e) => handleFilterChange('showOnBanner', e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
        >
          <option value="">All Products</option>
          <option value="true">Show on Banner</option>
        </select>
      </div>

      {/* Status Filter */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">Status</label>
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
        >
          <option value="all">All</option>
          <option value="active">Active Only</option>
          <option value="inactive">Inactive Only</option>
        </select>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">Sort By</label>
        <select
          value={filters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
        >
          <option value="newest">Newest First</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
          <option value="name_asc">Name: A to Z</option>
          <option value="rating_desc">Rating: High to Low</option>
        </select>
      </div>
    </div>
    
    {/* Price Range Row */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
      <div>
        <label className="block text-xs text-gray-500 mb-1">Min Price (৳)</label>
        <input
          type="text"
          inputMode="decimal"
          value={minPriceInput}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '' || /^\d*\.?\d*$/.test(value)) {
              setMinPriceInput(value);
            }
          }}
          placeholder="0"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
        />
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">Max Price (৳)</label>
        <input
          type="text"
          inputMode="decimal"
          value={maxPriceInput}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '' || /^\d*\.?\d*$/.test(value)) {
              setMaxPriceInput(value);
            }
          }}
          placeholder="Any"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
        />
      </div>
      <div className="flex items-end">
        <button
          onClick={applyPriceRange}
          disabled={!minPriceInput && !maxPriceInput}
          className="w-full px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Apply Price
        </button>
      </div>
      {(filters.minPrice || filters.maxPrice) && (
        <div className="flex items-center justify-between bg-blue-50 p-2 rounded-lg border border-blue-200 col-span-4">
          <span className="text-xs text-blue-700 font-medium">
            Price: ৳{filters.minPrice || '0'} - ৳{filters.maxPrice || '∞'}
          </span>
          <button onClick={clearPriceRange} className="text-gray-400 hover:text-gray-600">
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  </div>
);

// Product Card Component
// Product Card Component with action buttons on same row as stock info
// const ProductCard = ({ product, onEdit, onView, onDelete, onToggleStatus }) => {
//   const [activeImageIndex, setActiveImageIndex] = useState(0);
//   const productImages = product.images || [];
//   const hasMultipleImages = productImages.length > 1;
//   const discountPercent = calculateDiscount(product.regularPrice, product.discountPrice);
//   const currentPrice = product.discountPrice && product.discountPrice < product.regularPrice ? product.discountPrice : product.regularPrice;
//   const primaryTag = product.tags?.[0];
//   const tagStyle = primaryTag ? getTagStyle(primaryTag) : '';
//   const colors = product.colors || [];

//   return (
//     <div className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border ${
//       product.isActive ? 'border-gray-200' : 'border-red-200 bg-red-50/30'
//     } overflow-hidden`}>
//       <div className="p-4">
//         {/* Main Row: Image and Details */}
//         <div className="flex gap-4">
//           {/* Image Section */}
//           <div 
//             className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 cursor-pointer"
//             onMouseEnter={() => hasMultipleImages && setActiveImageIndex((activeImageIndex + 1) % productImages.length)}
//             onClick={() => onView(product._id)}
//           >
//             <img
//               src={productImages[activeImageIndex]?.url || productImages[0]?.url || 'https://via.placeholder.com/100?text=Product'}
//               alt={product.productName}
//               className="w-full h-full object-contain p-2 transition-all duration-500"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = 'https://via.placeholder.com/100?text=Product';
//               }}
//             />
//             {hasMultipleImages && (
//               <div className="absolute bottom-0 right-0 bg-black/50 text-white text-[8px] px-1 rounded-tl">
//                 {activeImageIndex + 1}/{productImages.length}
//               </div>
//             )}
            
//             {/* Discount Badge */}
//             {discountPercent > 0 && (
//               <div className="absolute top-0 left-0 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-br shadow-lg flex items-center gap-0.5">
//                 <Zap className="w-2 h-2" />
//                 {discountPercent}%
//               </div>
//             )}
//           </div>

//           {/* Product Details - Takes remaining space */}
//           <div className="flex-1 min-w-0">
//             {/* Name and Status */}
//             <div className="flex flex-wrap items-center gap-2 mb-1.5">
//               <h3 className="text-sm font-semibold text-gray-900 truncate hover:text-blue-600 transition-colors max-w-[250px]" title={product.productName}>
//                 {product.productName}
//               </h3>
              
//               <span className={`flex-shrink-0 text-[10px] px-2 py-0.5 rounded-full font-medium ${
//                 product.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//               }`}>
//                 {product.isActive ? 'Active' : 'Inactive'}
//               </span>

//               {product.isFeatured && (
//                 <span className="flex-shrink-0 text-[10px] px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full flex items-center gap-0.5 font-medium">
//                   <Star className="w-2.5 h-2.5 fill-yellow-500" />
//                   Featured
//                 </span>
//               )}

//               {product.showOnBanner && (
//                 <span className="flex-shrink-0 text-[10px] px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full flex items-center gap-0.5 font-medium">
//                   <Eye className="w-2.5 h-2.5" />
//                   On Banner
//                 </span>
//               )}
//             </div>

//             {/* Tags and Details Row */}
//             <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
//               {/* Tag */}
//               {primaryTag && (
//                 <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[9px] font-semibold ${tagStyle}`}>
//                   <Sparkles className="w-2 h-2" />
//                   {primaryTag}
//                 </span>
//               )}
              
//               {/* Brand */}
//               {product.brand && (
//                 <div className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[9px] font-medium bg-gray-100 text-gray-700">
//                   <Building2 className="w-2.5 h-2.5" />
//                   {product.brand}
//                 </div>
//               )}
              
//               {/* Category */}
//               {product.category?.name && (
//                 <div className="flex items-center gap-0.5 text-gray-500 text-[9px]">
//                   <FolderTree className="w-2.5 h-2.5" />
//                   <span className="truncate max-w-[100px]">{product.category.name}</span>
//                 </div>
//               )}
              
//               {/* Unit */}
//               {product.unit && (
//                 <div className="flex items-center gap-0.5 text-gray-500 text-[9px]">
//                   <Scale className="w-2.5 h-2.5" />
//                   <span>{getUnitLabel(product.unit)}</span>
//                 </div>
//               )}
//             </div>

//             {/* Price */}
//             <div className="flex items-baseline gap-2 mb-1.5">
//               <span className="text-lg font-bold text-blue-600">
//                 ৳{formatPrice(currentPrice)}
//               </span>
//               {discountPercent > 0 && (
//                 <>
//                   <span className="text-xs text-gray-400 line-through">
//                     ৳{formatPrice(product.regularPrice)}
//                   </span>
//                   <span className="text-[10px] font-semibold text-red-500 bg-red-100 px-1.5 py-0.5 rounded-full">
//                     Save {discountPercent}%
//                   </span>
//                 </>
//               )}
//             </div>

//             {/* Colors */}
//             {colors.length > 0 && (
//               <div className="flex items-center gap-1 mb-1.5">
//                 <Palette className="w-3 h-3 text-gray-400" />
//                 <div className="flex items-center gap-1">
//                   {colors.slice(0, 4).map((color, idx) => (
//                     <div
//                       key={idx}
//                       className="w-4 h-4 rounded-full border border-gray-300"
//                       style={{ backgroundColor: color }}
//                       title={color}
//                     />
//                   ))}
//                   {colors.length > 4 && (
//                     <span className="text-[9px] text-gray-500">+{colors.length - 4}</span>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Bottom Row: Stock Info + Action Buttons */}
//             <div className="flex flex-wrap items-center justify-between gap-2">
//               {/* Left side - Stock and Meta Info */}
//               <div className="flex flex-wrap items-center gap-2">
//                 {/* Stock Status */}
//                 {product.stockQuantity > 0 ? (
//                   <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded-full text-[9px]">
//                     <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
//                     In Stock ({product.stockQuantity})
//                   </span>
//                 ) : (
//                   <span className="inline-flex items-center gap-1 text-red-500 bg-red-50 px-2 py-0.5 rounded-full text-[9px]">
//                     <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
//                     Out of Stock
//                   </span>
//                 )}
                
//                 {/* Rating */}
//                 {product.rating > 0 && (
//                   <div className="flex items-center gap-0.5">
//                     <div className="flex items-center">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <Star
//                           key={star}
//                           className={`w-2.5 h-2.5 ${
//                             star <= Math.floor(product.rating)
//                               ? 'fill-yellow-400 text-yellow-400'
//                               : star - 0.5 <= product.rating
//                               ? 'fill-yellow-400 text-yellow-400 opacity-50'
//                               : 'text-gray-300'
//                           }`}
//                         />
//                       ))}
//                     </div>
//                     <span className="text-[8px] text-gray-500">({product.rating})</span>
//                   </div>
//                 )}
                
//                 {/* SKU */}
//                 {product.skuCode && (
//                   <span className="text-gray-400 text-[9px]">SKU: {product.skuCode}</span>
//                 )}
//               </div>

//               {/* Right side - Action Buttons */}
//               <div className="flex items-center gap-1.5">
//                 <button
//                   onClick={() => onView(product._id)}
//                   className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                   title="View"
//                 >
//                   <Eye className="w-3.5 h-3.5" />
//                 </button>
//                 <button
//                   onClick={() => onEdit(product._id)}
//                   className="p-1.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
//                   title="Edit"
//                 >
//                   <Edit className="w-3.5 h-3.5" />
//                 </button>
//                 <button
//                   onClick={() => onToggleStatus(product._id, product.isActive)}
//                   className={`p-1.5 rounded-lg transition-colors ${
//                     product.isActive 
//                       ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
//                       : 'bg-green-100 text-green-700 hover:bg-green-200'
//                   }`}
//                   title={product.isActive ? 'Deactivate' : 'Activate'}
//                 >
//                   {product.isActive ? <XCircle className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5" />}
//                 </button>
//                 <button
//                   onClick={() => onDelete(product._id, product.productName)}
//                   className="p-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                   title="Delete"
//                 >
//                   <Trash2 className="w-3.5 h-3.5" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// Product Card Component - Updated to handle both tag ID and populated tag
const ProductCard = ({ product, onEdit, onView, onDelete, onToggleStatus }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const productImages = product.images || [];
  const hasMultipleImages = productImages.length > 1;
  const discountPercent = calculateDiscount(product.regularPrice, product.discountPrice);
  const currentPrice = product.discountPrice && product.discountPrice < product.regularPrice ? product.discountPrice : product.regularPrice;
  
  // Handle tags - check if tags are populated objects or just IDs
  const getTagName = (tag) => {
    if (!tag) return '';
    // If tag is an object with name property (populated)
    if (typeof tag === 'object' && tag.name) {
      return tag.name;
    }
    // If tag is just a string (legacy or ID)
    return tag;
  };

  const getTagImage = (tag) => {
    if (!tag) return null;
    // If tag is an object with image property (populated)
    if (typeof tag === 'object' && tag.image && tag.image.url) {
      return tag.image.url;
    }
    return null;
  };

  const primaryTag = product.tags?.[0];
  const primaryTagName = getTagName(primaryTag);
  const tagStyle = primaryTagName ? getTagStyle(primaryTagName) : '';
  const colors = product.colors || [];

  return (
    <div className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border ${
      product.isActive ? 'border-gray-200' : 'border-red-200 bg-red-50/30'
    } overflow-hidden`}>
      <div className="p-4">
        {/* Main Row: Image and Details */}
        <div className="flex gap-4">
          {/* Image Section */}
          <div 
            className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 cursor-pointer"
            onMouseEnter={() => hasMultipleImages && setActiveImageIndex((activeImageIndex + 1) % productImages.length)}
            onClick={() => onView(product._id)}
          >
            <img
              src={productImages[activeImageIndex]?.url || productImages[0]?.url || 'https://via.placeholder.com/100?text=Product'}
              alt={product.productName}
              className="w-full h-full object-contain p-2 transition-all duration-500"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/100?text=Product';
              }}
            />
            {hasMultipleImages && (
              <div className="absolute bottom-0 right-0 bg-black/50 text-white text-[8px] px-1 rounded-tl">
                {activeImageIndex + 1}/{productImages.length}
              </div>
            )}
            
            {/* Discount Badge */}
            {discountPercent > 0 && (
              <div className="absolute top-0 left-0 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-br shadow-lg flex items-center gap-0.5">
                <Zap className="w-2 h-2" />
                {discountPercent}%
              </div>
            )}
          </div>

          {/* Product Details - Takes remaining space */}
          <div className="flex-1 min-w-0">
            {/* Name and Status */}
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h3 className="text-sm font-semibold text-gray-900 truncate hover:text-blue-600 transition-colors max-w-[250px]" title={product.productName}>
                {product.productName}
              </h3>
              
              <span className={`flex-shrink-0 text-[10px] px-2 py-0.5 rounded-full font-medium ${
                product.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {product.isActive ? 'Active' : 'Inactive'}
              </span>

              {product.isFeatured && (
                <span className="flex-shrink-0 text-[10px] px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full flex items-center gap-0.5 font-medium">
                  <Star className="w-2.5 h-2.5 fill-yellow-500" />
                  Featured
                </span>
              )}

              {product.showOnBanner && (
                <span className="flex-shrink-0 text-[10px] px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full flex items-center gap-0.5 font-medium">
                  <Eye className="w-2.5 h-2.5" />
                  On Banner
                </span>
              )}
            </div>

            {/* Tags and Details Row */}
            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
              {/* Tag - Now shows tag image and name */}
              {primaryTagName && (
                <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[9px] font-semibold ${tagStyle}`}>
                  {primaryTag && typeof primaryTag === 'object' && primaryTag.image && primaryTag.image.url ? (
                    <img 
                      src={primaryTag.image.url} 
                      alt={primaryTagName}
                      className="w-3 h-3 rounded-full object-cover"
                    />
                  ) : (
                    <Sparkles className="w-2 h-2" />
                  )}
                  {primaryTagName}
                </span>
              )}
              
              {/* Brand */}
              {product.brand && (
                <div className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[9px] font-medium bg-gray-100 text-gray-700">
                  <Building2 className="w-2.5 h-2.5" />
                  {product.brand}
                </div>
              )}
              
              {/* Category */}
              {product.category?.name && (
                <div className="flex items-center gap-0.5 text-gray-500 text-[9px]">
                  <FolderTree className="w-2.5 h-2.5" />
                  <span className="truncate max-w-[100px]">{product.category.name}</span>
                </div>
              )}
              
              {/* Unit */}
              {product.unit && (
                <div className="flex items-center gap-0.5 text-gray-500 text-[9px]">
                  <Scale className="w-2.5 h-2.5" />
                  <span>{getUnitLabel(product.unit)}</span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="text-lg font-bold text-blue-600">
                ৳{formatPrice(currentPrice)}
              </span>
              {discountPercent > 0 && (
                <>
                  <span className="text-xs text-gray-400 line-through">
                    ৳{formatPrice(product.regularPrice)}
                  </span>
                  <span className="text-[10px] font-semibold text-red-500 bg-red-100 px-1.5 py-0.5 rounded-full">
                    Save {discountPercent}%
                  </span>
                </>
              )}
            </div>

            {/* Colors */}
            {colors.length > 0 && (
              <div className="flex items-center gap-1 mb-1.5">
                <Palette className="w-3 h-3 text-gray-400" />
                <div className="flex items-center gap-1">
                  {colors.slice(0, 4).map((color, idx) => (
                    <div
                      key={idx}
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                  {colors.length > 4 && (
                    <span className="text-[9px] text-gray-500">+{colors.length - 4}</span>
                  )}
                </div>
              </div>
            )}

            {/* Bottom Row: Stock Info + Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              {/* Left side - Stock and Meta Info */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Stock Status */}
                {product.stockQuantity > 0 ? (
                  <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded-full text-[9px]">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    In Stock ({product.stockQuantity})
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-red-500 bg-red-50 px-2 py-0.5 rounded-full text-[9px]">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                    Out of Stock
                  </span>
                )}
                
                {/* Rating */}
                {product.rating > 0 && (
                  <div className="flex items-center gap-0.5">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-2.5 h-2.5 ${
                            star <= Math.floor(product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : star - 0.5 <= product.rating
                              ? 'fill-yellow-400 text-yellow-400 opacity-50'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[8px] text-gray-500">({product.rating})</span>
                  </div>
                )}
                
                {/* SKU */}
                {product.skuCode && (
                  <span className="text-gray-400 text-[9px]">SKU: {product.skuCode}</span>
                )}
              </div>

              {/* Right side - Action Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onView(product._id)}
                  className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  title="View"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onEdit(product._id)}
                  className="p-1.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                  title="Edit"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onToggleStatus(product._id, product.isActive)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    product.isActive 
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                  title={product.isActive ? 'Deactivate' : 'Activate'}
                >
                  {product.isActive ? <XCircle className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => onDelete(product._id, product.productName)}
                  className="p-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AdminAllProducts() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  
  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    subcategory: '',
    childSubcategory: '',
    brand: '',
    unit: '',
    minPrice: '',
    maxPrice: '',
    status: 'all',
    isFeatured: '',
    showOnBanner: '',
    sortBy: 'newest'
  });

  // Price range input states
  const [minPriceInput, setMinPriceInput] = useState('');
  const [maxPriceInput, setMaxPriceInput] = useState('');

  // Available filter options
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [childSubcategories, setChildSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [showChildSubcategory, setShowChildSubcategory] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // Delete confirmation modal
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null, name: '' });

  // Check admin access
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'admin' && user.role !== 'moderator') {
      toast.error('Unauthorized access');
      router.push('/login');
    }
  }, [router]);

  // Fetch brands
  useEffect(() => {
    fetchBrands();
  }, []);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (filters.category) {
      const categoryId = filters.category;
      setSelectedCategory(categoryId);
      fetchSubcategories(categoryId);
    } else {
      setSubcategories([]);
      setSelectedCategory(null);
      if (filters.subcategory) {
        setFilters(prev => ({ ...prev, subcategory: '' }));
      }
    }
  }, [filters.category]);

  // Fetch child subcategories when subcategory is selected
  useEffect(() => {
    if (filters.category && filters.subcategory) {
      setSelectedSubcategory(filters.subcategory);
      fetchChildSubcategories(filters.category, filters.subcategory);
    } else {
      setChildSubcategories([]);
      setSelectedSubcategory(null);
      setShowChildSubcategory(false);
      if (filters.childSubcategory) {
        setFilters(prev => ({ ...prev, childSubcategory: '' }));
      }
    }
  }, [filters.subcategory, filters.category]);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch products when filters change
  useEffect(() => {
    fetchProducts();
  }, [filters, currentPage]);

  const fetchBrands = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/brands', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setBrands(data.data);
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/categories', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setSubcategories(data.data.subcategories);
      } else {
        setSubcategories([]);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      setSubcategories([]);
    }
  };

  const fetchChildSubcategories = async (categoryId, subcategoryId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories/${subcategoryId}/children`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setChildSubcategories(data.data.children);
        setShowChildSubcategory(data.data.children.length > 0);
      } else {
        setChildSubcategories([]);
        setShowChildSubcategory(false);
      }
    } catch (error) {
      console.error('Error fetching child subcategories:', error);
      setChildSubcategories([]);
      setShowChildSubcategory(false);
    }
  };
// const fetchProducts = async () => {
//   setLoading(true);
//   try {
//     const token = localStorage.getItem('token');
//     const queryParams = new URLSearchParams();
//     queryParams.append('page', currentPage);
//     queryParams.append('limit', 12);
    
//     if (filters.search) queryParams.append('search', filters.search);
//     if (filters.category) queryParams.append('category', filters.category);
//     if (filters.subcategory) queryParams.append('subcategory', filters.subcategory);
//     if (filters.childSubcategory) queryParams.append('childSubcategory', filters.childSubcategory);
//     if (filters.brand) queryParams.append('brand', filters.brand);
//     if (filters.unit) queryParams.append('unit', filters.unit);
//     if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
//     if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
    
//     if (filters.isFeatured === 'featured') {
//       queryParams.append('isFeatured', 'true');
//     }
    
//     if (filters.showOnBanner === 'true') {
//       queryParams.append('showOnBanner', 'true');
//     }
    
//     // Status filter - only apply when specific status is selected
//     if (filters.status === 'active') {
//       queryParams.append('isActive', 'true');
//     } else if (filters.status === 'inactive') {
//       queryParams.append('isActive', 'false');
//     }
//     // When status is 'all', don't send any filter - backend will show all for admin/moderator
    
//     let sortParam = '-createdAt';
//     switch (filters.sortBy) {
//       case 'price_low': sortParam = 'price_asc'; break;
//       case 'price_high': sortParam = 'price_desc'; break;
//       case 'name_asc': sortParam = 'name_asc'; break;
//       case 'rating_desc': sortParam = 'rating_desc'; break;
//       default: sortParam = 'newest';
//     }
//     queryParams.append('sort', sortParam);

//     const response = await fetch(`http://localhost:5000/api/products?${queryParams.toString()}`, {
//       headers: { 'Authorization': `Bearer ${token}` }
//     });
//     const data = await response.json();
    
//     if (data.success) {
//       setProducts(data.data || []);
//       setTotalPages(data.pagination?.pages || 1);
//       setTotalProducts(data.pagination?.total || 0);
//     }
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     toast.error('Failed to fetch products');
//   } finally {
//     setLoading(false);
//   }
// };


// In admin/all-products/page.js

const fetchProducts = async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem('token');
    const queryParams = new URLSearchParams();
    queryParams.append('page', currentPage);
    queryParams.append('limit', 12);
    
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.subcategory) queryParams.append('subcategory', filters.subcategory);
    if (filters.childSubcategory) queryParams.append('childSubcategory', filters.childSubcategory);
    if (filters.brand) queryParams.append('brand', filters.brand);
    if (filters.unit) queryParams.append('unit', filters.unit);
    if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
    if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
    
    if (filters.isFeatured === 'featured') {
      queryParams.append('isFeatured', 'true');
    }
    
    if (filters.showOnBanner === 'true') {
      queryParams.append('showOnBanner', 'true');
    }
    
    // Status filter - for admin route
    if (filters.status === 'active') {
      queryParams.append('isActive', 'true');
    } else if (filters.status === 'inactive') {
      queryParams.append('isActive', 'false');
    }
    // When status is 'all', don't send any filter - backend will show all products
    
    let sortParam = '-createdAt';
    switch (filters.sortBy) {
      case 'price_low': sortParam = 'price_asc'; break;
      case 'price_high': sortParam = 'price_desc'; break;
      case 'name_asc': sortParam = 'name_asc'; break;
      case 'rating_desc': sortParam = 'rating_desc'; break;
      default: sortParam = 'newest';
    }
    queryParams.append('sort', sortParam);

    // Use the admin route that shows all products including inactive
    const response = await fetch(`http://localhost:5000/api/products/admin/all?${queryParams.toString()}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    
    if (data.success) {
      setProducts(data.data || []);
      setTotalPages(data.pagination?.pages || 1);
      setTotalProducts(data.pagination?.total || 0);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    toast.error('Failed to fetch products');
  } finally {
    setLoading(false);
  }
};
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const applyPriceRange = () => {
    setFilters(prev => ({
      ...prev,
      minPrice: minPriceInput || '',
      maxPrice: maxPriceInput || ''
    }));
    setCurrentPage(1);
  };

  const clearPriceRange = () => {
    setMinPriceInput('');
    setMaxPriceInput('');
    setFilters(prev => ({ ...prev, minPrice: '', maxPrice: '' }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      subcategory: '',
      childSubcategory: '',
      brand: '',
      unit: '',
      minPrice: '',
      maxPrice: '',
      status: 'all',
      isFeatured: '',
      showOnBanner: '',
      sortBy: 'newest'
    });
    setMinPriceInput('');
    setMaxPriceInput('');
    setCurrentPage(1);
  };

  const handleEdit = (productId) => {
    window.open(`/admin/editProduct?id=${productId}`, '_blank');
  };

  const handleView = (productId) => {
    window.open(`/admin/productDetails?id=${productId}`, '_blank');
  };

  const handleDeleteClick = (id, name) => {
    setDeleteModal({ show: true, id, name });
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/products/${deleteModal.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Product deleted successfully');
        fetchProducts();
      } else {
        toast.error(data.error || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setDeleteModal({ show: false, id: null, name: '' });
    }
  };

  const handleToggleStatus = async (productId, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/products/${productId}/toggle`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success) {
        toast.success(`Product ${currentStatus ? 'deactivated' : 'activated'} successfully`);
        fetchProducts();
      } else {
        toast.error(data.error || 'Failed to toggle product status');
      }
    } catch (error) {
      console.error('Error toggling product status:', error);
      toast.error('Network error. Please try again.');
    }
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.category) count++;
    if (filters.subcategory) count++;
    if (filters.childSubcategory) count++;
    if (filters.brand) count++;
    if (filters.unit) count++;
    if (filters.minPrice || filters.maxPrice) count++;
    if (filters.status !== 'all') count++;
    if (filters.isFeatured) count++;
    if (filters.showOnBanner) count++;
    return count;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Side - Title Section */}
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Package className="w-6 h-6 text-blue-600" />
                    All Products
                  </h1>
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                    Admin
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Manage your product catalog • {totalProducts} total products
                </p>
              </div>
            </div>

            {/* Right Side - Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => fetchProducts()}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Refresh"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <Link
                href="/admin/create-products"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Filter Bar */}
        <FilterBar 
          filters={filters}
          handleFilterChange={handleFilterChange}
          categories={categories}
          subcategories={subcategories}
          childSubcategories={childSubcategories}
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
          showChildSubcategory={showChildSubcategory}
          brands={brands}
          minPriceInput={minPriceInput}
          maxPriceInput={maxPriceInput}
          setMinPriceInput={setMinPriceInput}
          setMaxPriceInput={setMaxPriceInput}
          applyPriceRange={applyPriceRange}
          clearPriceRange={clearPriceRange}
          getActiveFilterCount={getActiveFilterCount}
          clearFilters={clearFilters}
        />

        {/* Results Count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-900">{products.length}</span> of{' '}
            <span className="font-semibold text-gray-900">{totalProducts}</span> products
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        )}

        {/* Products Display */}
        {!loading && (
          <>
            {products.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-200 shadow-sm">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-sm text-gray-500 mb-4">No products found matching your criteria</p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {products.map(product => (
                    <ProductCard 
                      key={product._id} 
                      product={product}
                      onEdit={handleEdit}
                      onView={handleView}
                      onDelete={handleDeleteClick}
                      onToggleStatus={handleToggleStatus}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors bg-white shadow-sm"
                    >
                      <ChevronLeft className="w-4 h-4 text-gray-600" />
                    </button>
                    
                    {[...Array(totalPages)].map((_, i) => {
                      const pageNum = i + 1;
                      if (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={i}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                              currentPage === pageNum
                                ? 'bg-blue-600 text-white'
                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                        return <span key={i} className="text-gray-400 text-sm">...</span>;
                      }
                      return null;
                    })}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors bg-white shadow-sm"
                    >
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 border border-gray-200">
            <div className="p-6">
              <div className="flex items-center gap-3 text-red-600 mb-4">
                <AlertCircle className="w-6 h-6" />
                <h3 className="text-lg font-bold text-gray-900">Delete Product</h3>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">
                Are you sure you want to delete <span className="font-semibold text-gray-900">"{deleteModal.name}"</span>?
              </p>
              <p className="text-xs text-gray-500 mb-6">
                This action cannot be undone. The product and its images will be permanently removed.
              </p>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setDeleteModal({ show: false, id: null, name: '' })}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-md"
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}