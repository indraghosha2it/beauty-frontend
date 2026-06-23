
// 'use client';

// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { useState, useEffect, useRef } from 'react';
// import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

// export default function Categories() {
//   const [categories, setCategories] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showLeftArrow, setShowLeftArrow] = useState(false);
//   const [showRightArrow, setShowRightArrow] = useState(false);
//   const scrollContainerRef = useRef(null);

//   // Fetch categories from API
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch('https://gadget-backend.vercel.app/api/categories');
//       const data = await response.json();
      
//       if (data.success) {
//         const formattedCategories = data.data.map((cat, index) => ({
//           _id: cat._id,
//           name: cat.name,
//           image: cat.image?.url || getDefaultImage(index),
//           slug: cat.slug,
//           productCount: cat.productCount || Math.floor(Math.random() * 50) + 10,
//         }));
//         setCategories(formattedCategories);
//         setTimeout(() => checkScroll(), 100);
//       }
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       const fallbackCategories = [
//         { _id: '1', name: 'Smartphones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop', productCount: 42 },
//         { _id: '2', name: 'Laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop', productCount: 38 },
//         { _id: '3', name: 'Smartwatches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop', productCount: 25 },
//         { _id: '4', name: 'Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop', productCount: 31 },
//         { _id: '5', name: 'Cameras', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=300&fit=crop', productCount: 19 },
//         { _id: '6', name: 'Gaming Gear', image: 'https://images.unsplash.com/photo-1592155931584-901ac15763e3?w=300&h=300&fit=crop', productCount: 27 },
//         { _id: '7', name: 'Audio Speakers', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=300&h=300&fit=crop', productCount: 22 },
//         { _id: '8', name: 'Accessories', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=300&h=300&fit=crop', productCount: 45 },
//       ];
//       setCategories(fallbackCategories);
//       setTimeout(() => checkScroll(), 100);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getDefaultImage = (index) => {
//     const images = [
//       'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
//       'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop',
//       'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
//       'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
//     ];
//     return images[index % images.length];
//   };

//   const checkScroll = () => {
//     if (scrollContainerRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
//       setShowLeftArrow(scrollLeft > 20);
//       setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
//     }
//   };

//   const scroll = (direction) => {
//     if (scrollContainerRef.current) {
//       const cardWidth = scrollContainerRef.current.children[0]?.offsetWidth || 120;
//       const gap = 16;
//       const scrollAmount = (cardWidth + gap) * 2.5;
      
//       const newScrollLeft = direction === 'left' 
//         ? scrollContainerRef.current.scrollLeft - scrollAmount
//         : scrollContainerRef.current.scrollLeft + scrollAmount;
      
//       scrollContainerRef.current.scrollTo({
//         left: newScrollLeft,
//         behavior: 'smooth'
//       });
//     }
//   };

//   useEffect(() => {
//     const container = scrollContainerRef.current;
//     if (container) {
//       container.addEventListener('scroll', checkScroll);
//       checkScroll();
//       window.addEventListener('resize', checkScroll);
//       return () => {
//         container.removeEventListener('scroll', checkScroll);
//         window.removeEventListener('resize', checkScroll);
//       };
//     }
//   }, [categories]);

//   if (isLoading) {
//     return (
//       <section className="py-8 md:py-10 bg-white">
//         <div className="container mx-auto px-4 max-w-7xl">
//           <div className="mb-6">
//             <div className="h-6 w-40 bg-gray-200 rounded mb-2 animate-pulse"></div>
//             <div className="h-3 w-48 bg-gray-100 rounded animate-pulse"></div>
//           </div>
//           <div className="flex gap-4 overflow-hidden">
//             {[...Array(6)].map((_, i) => (
//               <div key={i} className="animate-pulse flex-shrink-0">
//                 <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-gray-200"></div>
//                 <div className="h-2 w-12 bg-gray-200 rounded mx-auto mt-1.5"></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-8 md:py-10 lg:py-12 bg-gradient-to-b from-white via-gray-50/30 to-white overflow-hidden relative">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 opacity-30 pointer-events-none">
//         <div className="absolute top-5 left-10 w-48 h-48 bg-blue-500 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-5 right-10 w-56 h-56 bg-purple-500 rounded-full blur-3xl"></div>
//       </div>

//       <div className="container mx-auto px-4 max-w-7xl relative z-10">
//         {/* ✅ Section Header - LEFT ALIGNED */}
//         <div className="mb-6 md:mb-8">
//           <motion.div
//             initial={{ opacity: 0, x: -10 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-50 rounded-full mb-2"
//           >
//             <Sparkles className="w-3 h-3 text-blue-600" />
//             <span className="text-[10px] font-medium text-blue-700 tracking-wider uppercase">
//               Categories
//             </span>
//             <Sparkles className="w-3 h-3 text-blue-600" />
//           </motion.div>
          
//           <motion.h2 
//             initial={{ opacity: 0, x: -10 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.1 }}
//             className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900"
//           >
//             Shop by <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Category</span>
//           </motion.h2>
          
//           <motion.p
//             initial={{ opacity: 0, x: -10 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.2 }}
//             className="text-gray-500 mt-1 text-xs md:text-sm"
//           >
//             Discover cutting-edge gadgets and tech accessories
//           </motion.p>
//         </div>

//         {/* Categories Row with Scroll Arrows */}
//         <div className="relative group">
//           {/* Left Arrow */}
//           <AnimatedArrow
//             show={showLeftArrow}
//             direction="left"
//             onClick={() => scroll('left')}
//             Icon={ChevronLeft}
//           />

//           {/* Right Arrow */}
//           <AnimatedArrow
//             show={showRightArrow}
//             direction="right"
//             onClick={() => scroll('right')}
//             Icon={ChevronRight}
//           />

//           {/* Scrollable Container */}
//           <div
//             ref={scrollContainerRef}
//             className="flex overflow-x-auto gap-4 md:gap-5 lg:gap-6 pb-3 scroll-smooth px-1"
//             style={{ 
//               scrollbarWidth: 'none', 
//               msOverflowStyle: 'none',
//               WebkitOverflowScrolling: 'touch'
//             }}
//           >
//             {categories.map((category, index) => (
//               <CategoryCard 
//                 key={category._id || index} 
//                 category={category} 
//                 index={index}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // Animated Arrow Component
// function AnimatedArrow({ show, direction, onClick, Icon }) {
//   if (!show) return null;

//   return (
//     <motion.button
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.8 }}
//       onClick={onClick}
//       className={`absolute top-1/2 -translate-y-1/2 z-20 bg-white shadow-md rounded-full p-2 md:p-2.5 border border-gray-200 hover:bg-gray-50 hover:shadow-lg transition-all duration-300 ${
//         direction === 'left' ? 'left-0 -ml-3 md:-ml-4' : 'right-0 -mr-3 md:-mr-4'
//       }`}
//       whileHover={{ scale: 1.1 }}
//       whileTap={{ scale: 0.95 }}
//     >
//       <Icon className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
//     </motion.button>
//   );
// }

// // ✅ Category Card Component - NO ICON ON CIRCLE
// function CategoryCard({ category, index }) {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.4) }}
//       whileHover={{ y: -4 }}
//       onHoverStart={() => setIsHovered(true)}
//       onHoverEnd={() => setIsHovered(false)}
//       className="flex-shrink-0"
//     >
//       <Link href={`/products?category=${category._id}`}>
//         <div className="cursor-pointer text-center group/card">
//           {/* ✅ LARGER Category Circle - NO ICON */}
//           <motion.div 
//             className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden mx-auto"
//             style={{
//               boxShadow: isHovered 
//                 ? '0 12px 30px rgba(0,0,0,0.12), 0 0 0 2px rgba(59,130,246,0.25)' 
//                 : '0 6px 20px rgba(0,0,0,0.06)',
//               border: '3px solid white'
//             }}
//             animate={{
//               boxShadow: isHovered 
//                 ? '0 16px 40px rgba(0,0,0,0.15), 0 0 0 3px rgba(59,130,246,0.3)' 
//                 : '0 6px 20px rgba(0,0,0,0.06)',
//               scale: isHovered ? 1.05 : 1
//             }}
//             transition={{ duration: 0.3 }}
//           >
//             {/* Category Image */}
//             <img
//               src={category.image}
//               alt={category.name}
//               className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
//               loading="lazy"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop';
//               }}
//             />
            
//             {/* Gradient Overlay - Cleaner without icon */}
//             <motion.div 
//               className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"
//               initial={{ opacity: 0.3 }}
//               animate={{ opacity: isHovered ? 0.5 : 0.3 }}
//               transition={{ duration: 0.3 }}
//             />
//           </motion.div>
          
//           {/* Category Info */}
//           <motion.div className="mt-2 md:mt-3">
//             <h3 
//               className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 px-1 max-w-[90px] sm:max-w-[110px] md:max-w-[130px] mx-auto truncate"
//               animate={{ 
//                 color: isHovered ? '#2563EB' : '#1F2937',
//               }}
//               transition={{ duration: 0.2 }}
//             >
//               {category.name}
//             </h3>
        
//           </motion.div>

//           {/* Decorative line */}
//           <motion.div
//             className="h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mt-1"
//             initial={{ width: 0, opacity: 0 }}
//             animate={{ 
//               width: isHovered ? '40%' : 0,
//               opacity: isHovered ? 1 : 0
//             }}
//             transition={{ duration: 0.3 }}
//           />
//         </div>
//       </Link>
//     </motion.div>
//   );
// }


'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollContainerRef = useRef(null);

  // Fetch categories from API
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://gadget-backend.vercel.app/api/categories');
      const data = await response.json();
      
      if (data.success) {
        const formattedCategories = data.data.map((cat, index) => ({
          _id: cat._id,
          name: cat.name,
          image: cat.image?.url || getDefaultImage(index),
          slug: cat.slug,
          productCount: cat.productCount || Math.floor(Math.random() * 50) + 10,
        }));
        setCategories(formattedCategories);
        setTimeout(() => checkScroll(), 100);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      const fallbackCategories = [
        { _id: '1', name: 'Smartphones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop', productCount: 42 },
        { _id: '2', name: 'Laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop', productCount: 38 },
        { _id: '3', name: 'Smartwatches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop', productCount: 25 },
        { _id: '4', name: 'Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop', productCount: 31 },
        { _id: '5', name: 'Cameras', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=300&fit=crop', productCount: 19 },
        { _id: '6', name: 'Gaming Gear', image: 'https://images.unsplash.com/photo-1592155931584-901ac15763e3?w=300&h=300&fit=crop', productCount: 27 },
        { _id: '7', name: 'Audio Speakers', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=300&h=300&fit=crop', productCount: 22 },
        { _id: '8', name: 'Accessories', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=300&h=300&fit=crop', productCount: 45 },
      ];
      setCategories(fallbackCategories);
      setTimeout(() => checkScroll(), 100);
    } finally {
      setIsLoading(false);
    }
  };

  const getDefaultImage = (index) => {
    const images = [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    ];
    return images[index % images.length];
  };

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.children[0]?.offsetWidth || 120;
      const gap = 16;
      const scrollAmount = (cardWidth + gap) * 2.5;
      
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      checkScroll();
      window.addEventListener('resize', checkScroll);
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [categories]);

  if (isLoading) {
    return (
      <section className="py-8 md:py-10 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-6">
            <div className="h-6 w-40 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="h-3 w-48 bg-gray-100 rounded animate-pulse"></div>
          </div>
          <div className="flex gap-4 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse flex-shrink-0">
                <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-gray-200"></div>
                <div className="h-2 w-12 bg-gray-200 rounded mx-auto mt-1.5"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-10 lg:py-12 bg-gradient-to-b from-white via-gray-50/30 to-white overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-5 left-10 w-48 h-48 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-5 right-10 w-56 h-56 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header - LEFT ALIGNED */}
        <div className="mb-6 md:mb-8">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-50 rounded-full mb-2"
          >
            <Sparkles className="w-3 h-3 text-blue-600" />
            <span className="text-[10px] font-medium text-blue-700 tracking-wider uppercase">
              Categories
            </span>
            <Sparkles className="w-3 h-3 text-blue-600" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900"
          >
            Shop by <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Category</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 mt-1 text-xs md:text-sm"
          >
            Discover cutting-edge gadgets and tech accessories
          </motion.p>
        </div>

        {/* Categories Row with Scroll Arrows */}
        <div className="relative group">
          {/* Left Arrow */}
          <AnimatedArrow
            show={showLeftArrow}
            direction="left"
            onClick={() => scroll('left')}
            Icon={ChevronLeft}
          />

          {/* Right Arrow */}
          <AnimatedArrow
            show={showRightArrow}
            direction="right"
            onClick={() => scroll('right')}
            Icon={ChevronRight}
          />

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 md:gap-5 lg:gap-6 pb-3 scroll-smooth px-1"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {categories.map((category, index) => (
              <CategoryCard 
                key={category._id || index} 
                category={category} 
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Animated Arrow Component
function AnimatedArrow({ show, direction, onClick, Icon }) {
  if (!show) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 z-20 bg-white shadow-md rounded-full p-2 md:p-2.5 border border-gray-200 hover:bg-gray-50 hover:shadow-lg transition-all duration-300 ${
        direction === 'left' ? 'left-0 -ml-3 md:-ml-4' : 'right-0 -mr-3 md:-mr-4'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
    </motion.button>
  );
}

// ✅ Category Card Component - NO ZOOM, ONLY BORDER ON HOVER
function CategoryCard({ category, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.4) }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex-shrink-0"
    >
      <Link href={`/products?category=${category._id}`}>
        <div className="cursor-pointer text-center group/card">
          {/* Category Circle - NO ZOOM, ONLY BORDER ON HOVER */}
          <motion.div 
            className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden mx-auto"
            style={{
              boxShadow: isHovered 
                ? '0 8px 25px rgba(0,0,0,0.10)' 
                : '0 4px 15px rgba(0,0,0,0.06)',
              border: isHovered 
                ? '3px solid #3B82F6' 
                : '3px solid transparent',
              transition: 'border 0.3s ease, box-shadow 0.3s ease'
            }}
          >
            {/* Category Image */}
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop';
              }}
            />
            
            {/* Gradient Overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: isHovered ? 0.5 : 0.3 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          
          {/* Category Info */}
          <motion.div className="mt-2 md:mt-3">
            <h3 
              className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 px-1 max-w-[90px] sm:max-w-[110px] md:max-w-[130px] mx-auto truncate"
              animate={{ 
                color: isHovered ? '#2563EB' : '#1F2937',
              }}
              transition={{ duration: 0.2 }}
            >
              {category.name}
            </h3>
          </motion.div>

          {/* Decorative line */}
          <motion.div
            className="h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mt-1"
            initial={{ width: 0, opacity: 0 }}
            animate={{ 
              width: isHovered ? '40%' : 0,
              opacity: isHovered ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </Link>
    </motion.div>
  );
}