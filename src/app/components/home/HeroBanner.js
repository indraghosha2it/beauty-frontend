
// // components/home/HeroBanner.js
// 'use client';

// import { useState, useEffect, useRef, useCallback } from 'react';
// import Link from 'next/link';
// import { ChevronLeft, ChevronRight, Clock, Shield, Truck, Star, TrendingUp, Headphones, ArrowRight } from 'lucide-react';
// import { getHomepageBanners, trackBannerClick } from '@/app/services/bannerService';

// // Icon mapping
// const ICON_MAP = {
//   Truck: Truck,
//   Shield: Shield,
//   Clock: Clock,
//   Star: Star,
//   TrendingUp: TrendingUp,
//   Headphones: Headphones
// };

// export default function BannerCarousel() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const [touchStart, setTouchStart] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [banners, setBanners] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const autoPlayRef = useRef(null);

//   // Fetch banners from API
//   useEffect(() => {
//     const fetchBanners = async () => {
//       try {
//         const response = await getHomepageBanners();
//         if (response.success && response.data.length > 0) {
//           setBanners(response.data);
//         } else {
//           setBanners(getFallbackBanners());
//         }
//       } catch (error) {
//         console.error('Error fetching banners:', error);
//         setBanners(getFallbackBanners());
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchBanners();
//   }, []);

//   // Fallback banners if API fails
//   const getFallbackBanners = () => {
//     return [
//       {
//         id: 'fallback-1',
//         title: 'Premium Gadgets',
//         subtitle: 'Latest Technology',
//         mainText: 'Experience the Future Today',
//         description: 'Discover cutting-edge electronics with premium quality and unmatched performance',
//         badge: 'Limited Edition',
//         discount: '40% OFF',
//         category: 'Electronics',
//         bgImage: '/images/1.png',
//         productImage: '/images/product1.png',
//         features: [
//           { icon: 'Truck', text: 'Free Shipping' },
//           { icon: 'Shield', text: '2 Year Warranty' },
//           { icon: 'Clock', text: '24/7 Support' }
//         ],
//         buttons: [
//           { text: 'Shop Now', link: '/products', isPrimary: true },
//           { text: 'Learn More', link: '/about', isPrimary: false }
//         ]
//       }
//     ];
//   };

//   const nextSlide = useCallback(() => {
//     if (isTransitioning || banners.length === 0) return;
//     setIsTransitioning(true);
//     setCurrentSlide((prev) => (prev + 1) % banners.length);
//     setTimeout(() => setIsTransitioning(false), 600);
//   }, [isTransitioning, banners.length]);

//   const prevSlide = useCallback(() => {
//     if (isTransitioning || banners.length === 0) return;
//     setIsTransitioning(true);
//     setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
//     setTimeout(() => setIsTransitioning(false), 600);
//   }, [isTransitioning, banners.length]);

//   const goToSlide = (index) => {
//     if (isTransitioning || index === currentSlide || banners.length === 0) return;
//     setIsTransitioning(true);
//     setCurrentSlide(index);
//     setTimeout(() => setIsTransitioning(false), 600);
//   };

//   const handleBannerClick = async (bannerId) => {
//     try {
//       await trackBannerClick(bannerId);
//     } catch (error) {
//       console.error('Error tracking banner click:', error);
//     }
//   };

//   const handleTouchStart = (e) => {
//     setTouchStart(e.touches[0].clientX);
//   };

//   const handleTouchEnd = (e) => {
//     const touchEnd = e.changedTouches[0].clientX;
//     const diff = touchStart - touchEnd;
//     if (Math.abs(diff) > 40) {
//       if (diff > 0) {
//         nextSlide();
//       } else {
//         prevSlide();
//       }
//     }
//   };

//   useEffect(() => {
//     if (isAutoPlaying && banners.length > 1) {
//       autoPlayRef.current = setInterval(() => {
//         nextSlide();
//       }, 5000);
//     } else if (autoPlayRef.current) {
//       clearInterval(autoPlayRef.current);
//     }
//     return () => {
//       if (autoPlayRef.current) {
//         clearInterval(autoPlayRef.current);
//       }
//     };
//   }, [isAutoPlaying, nextSlide, banners.length]);

//   const handleMouseEnter = () => setIsAutoPlaying(false);
//   const handleMouseLeave = () => setIsAutoPlaying(true);

//   if (isLoading) {
//     return (
//       <div className="relative w-full h-[400px] sm:h-[500px] md:h-[560px] lg:h-[520px] xl:h-[530px] bg-gray-200 animate-pulse flex items-center justify-center">
//         <div className="text-gray-500">Loading banners...</div>
//       </div>
//     );
//   }

//   if (banners.length === 0) {
//     return null;
//   }

//   return (
//     <div 
//       className="relative w-full overflow-hidden"
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       onTouchStart={handleTouchStart}
//       onTouchEnd={handleTouchEnd}
//     >
//       <div className="relative h-[400px] sm:h-[500px] md:h-[560px] lg:h-[520px] xl:h-[530px]">
//         {banners.map((slide, index) => {
//           const IconComponent = (iconName) => {
//             const Icon = ICON_MAP[iconName];
//             return Icon ? <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 group-hover:scale-110 transition-transform" /> : null;
//           };

//           return (
//             <div
//               key={slide.id}
//               className={`absolute inset-0 transition-opacity duration-600 ${
//                 currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
//               }`}
//               style={{
//                 transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
//               }}
//             >
//               {/* Background Image */}
//               <div 
//                 className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//                 style={{ 
//                   backgroundImage: `url(${slide.bgImage})`,
//                   backgroundPosition: 'center',
//                   transform: `scale(${currentSlide === index ? 1 : 1.05})`,
//                   transition: 'transform 8s ease-out',
//                 }}
//               />
              
//               {/* Gradient Overlay */}
//               <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/20 to-transparent" />
              
//               {/* Decorative Elements */}
//               <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
//               <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              
//               {/* Content Container */}
//               <div className="relative h-full flex items-center">
//                 <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
//                   <div className="flex items-center justify-between">
//                     <div className="max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
//                       {/* Badge */}
//                       <div className={`mb-1 md:mb-0 inline-block transition-all duration-700 delay-100 ${
//                         currentSlide === index && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//                       }`}>
//                         <span className="px-3 py-1 text-xs font-medium text-gray-700 bg-white/80 backdrop-blur-md rounded-full border border-gray-200 shadow-sm">
//                           {slide.badge}
//                         </span>
//                       </div>
                      
//                       {/* Main Title */}
//                       <h1 className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-bold font-serif text-gray-900 mb-2 sm:mb-3 tracking-tight leading-[1.1] transition-all duration-700 delay-200 ${
//                         currentSlide === index && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//                       }`}>
//                         {slide.title}
//                       </h1>
                      
//                       {/* Subtitle */}
//                       <h2 className={`text-xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-3 sm:mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-all duration-700 delay-300 ${
//                         currentSlide === index && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//                       }`}>
//                         {slide.subtitle}
//                       </h2>
                      
//                       {/* Main Text */}
//                       <p className={`text-lg sm:text-2xl md:text-3xl lg:text-4xl text-gray-800 mb-3 sm:mb-4 font-light leading-tight transition-all duration-700 delay-400 ${
//                         currentSlide === index && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//                       }`}>
//                         {slide.mainText}
//                       </p>
                      
//                       {/* Description */}
//                       <p className={`text-sm sm:text-base md:text-lg text-gray-600 mb-5 sm:mb-7 max-w-full sm:max-w-xl md:max-w-2xl leading-relaxed transition-all duration-700 delay-500 ${
//                         currentSlide === index && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//                       }`}>
//                         {slide.description}
//                       </p>
                      
//                       {/* Features */}
//                       {slide.features && slide.features.length > 0 && (
//                         <div className={`flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 transition-all duration-700 delay-600 ${
//                           currentSlide === index && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//                         }`}>
//                           {slide.features.map((feature, idx) => (
//                             <div 
//                               key={idx} 
//                               className="group flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/80 backdrop-blur-md rounded-full border border-gray-200 hover:bg-white hover:shadow-md transition-all duration-300"
//                             >
//                               {IconComponent(feature.icon)}
//                               <span className="text-gray-700 text-xs sm:text-sm font-medium">{feature.text}</span>
//                             </div>
//                           ))}
//                         </div>
//                       )}
                      
//                       {/* Buttons */}
//                       <div className={`flex flex-wrap gap-2 sm:gap-4 transition-all duration-700 delay-700 ${
//                         currentSlide === index && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//                       }`}>
//                         {slide.buttons && slide.buttons.map((button, idx) => (
//                           <Link
//                             key={idx}
//                             href={button.link}
//                             onClick={() => handleBannerClick(slide.id)}
//                             className={`group relative overflow-hidden flex-1 sm:flex-none px-4 sm:px-8 py-2.5 sm:py-3.5 ${
//                               button.isPrimary 
//                                 ? 'bg-gray-900 text-white hover:shadow-2xl' 
//                                 : 'bg-white/80 backdrop-blur-md border border-gray-300 text-gray-700 hover:bg-white hover:shadow-lg'
//                             } font-semibold rounded-full transition-all duration-300 transform hover:scale-105 text-center text-xs sm:text-sm md:text-base`}
//                           >
//                             <span className="relative z-10 flex items-center justify-center gap-1 sm:gap-2">
//                               {button.text}
//                               {button.isPrimary && (
//                                 <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
//                               )}
//                             </span>
//                             {button.isPrimary && (
//                               <div className="absolute inset-0 bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
//                             )}
//                           </Link>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Product Image - Right Side - INCREASED SIZE */}
//                     {slide.productImage && (
//                       <div className="hidden md:block flex-shrink-0 ml-8 w-64 lg:w-80 xl:w-96 2xl:w-[400px]">
//                         <div className="relative">
//                           <img
//                             src={slide.productImage}
//                             alt={slide.title}
//                             className="w-full h-auto object-contain drop-shadow-2xl"
//                             style={{ 
//                               filter: 'drop-shadow(0 25px 25px rgba(0,0,0,0.15))',
//                               maxHeight: '400px' // Increased from 280px
//                             }}
//                           />
//                           <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-3xl -z-10 scale-150" />
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Discount Badge */}
//               <div className={`hidden sm:block absolute -top-4 -right-4 sm:top-8 sm:right-8 md:top-12 md:right-12 transition-all duration-700 delay-400 ${
//                 currentSlide === index && !isTransitioning ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
//               }`}>
//                 <div className="relative">
//                   <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-2xl">
//                     <div className="text-center">
//                       <div className="text-white font-black text-sm sm:text-base md:text-xl leading-tight">{slide.discount}</div>
//                       <div className="text-white/90 text-[10px] sm:text-xs font-medium">OFF</div>
//                     </div>
//                   </div>
//                   <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 to-orange-500 blur-md opacity-50 -z-10" />
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Navigation Buttons */}
//       {banners.length > 1 && (
//         <>
//           <button
//             onClick={prevSlide}
//             className="hidden sm:flex absolute left-3 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-md border border-gray-300 text-gray-800 hover:bg-white hover:scale-110 transition-all duration-200 z-20 items-center justify-center shadow-lg group"
//             aria-label="Previous slide"
//           >
//             <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
//           </button>

//           <button
//             onClick={nextSlide}
//             className="hidden sm:flex absolute right-3 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-md border border-gray-300 text-gray-800 hover:bg-white hover:scale-110 transition-all duration-200 z-20 items-center justify-center shadow-lg group"
//             aria-label="Next slide"
//           >
//             <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
//           </button>

//           {/* Mobile Navigation Arrows */}
//           <div className="sm:hidden absolute bottom-20 left-0 right-0 flex justify-center gap-4 z-20">
//             <button
//               onClick={prevSlide}
//               className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-gray-300 text-gray-800 hover:bg-white transition-all duration-200 flex items-center justify-center shadow-lg"
//               aria-label="Previous slide"
//             >
//               <ChevronLeft className="w-5 h-5" />
//             </button>
//             <button
//               onClick={nextSlide}
//               className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-gray-300 text-gray-800 hover:bg-white transition-all duration-200 flex items-center justify-center shadow-lg"
//               aria-label="Next slide"
//             >
//               <ChevronRight className="w-5 h-5" />
//             </button>
//           </div>
//         </>
//       )}

//       {/* Dots Indicator */}
//       <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
//         {banners.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={`transition-all duration-300 rounded-full ${
//               currentSlide === index
//                 ? 'w-8 sm:w-10 md:w-12 h-1 bg-gray-800 shadow-lg'
//                 : 'w-5 sm:w-6 md:w-7 h-1 bg-gray-400 hover:bg-gray-600'
//             }`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>

//       {/* Auto-play progress bar */}
//       {isAutoPlaying && banners.length > 1 && (
//         <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-300 z-20">
//           <div 
//             className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
//             style={{
//               width: '100%',
//               animation: 'progress 5s linear infinite',
//             }}
//           />
//         </div>
//       )}

//       <style jsx global>{`
//         @keyframes progress {
//           from {
//             width: 100%;
//           }
//           to {
//             width: 0%;
//           }
//         }
        
//         .duration-600 {
//           transition-duration: 600ms;
//         }
//       `}</style>
//     </div>
//   );
// }

// components/home/HeroBanner.js
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Clock, Shield, Truck, Star, TrendingUp, Headphones, ArrowRight } from 'lucide-react';
import { getHomepageBanners, trackBannerClick } from '@/app/services/bannerService';

// Icon mapping
const ICON_MAP = {
  Truck: Truck,
  Shield: Shield,
  Clock: Clock,
  Star: Star,
  TrendingUp: TrendingUp,
  Headphones: Headphones
};

export default function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const autoPlayRef = useRef(null);

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await getHomepageBanners();
        if (response.success && response.data.length > 0) {
          setBanners(response.data);
        } else {
          setBanners(getFallbackBanners());
        }
      } catch (error) {
        console.error('Error fetching banners:', error);
        setBanners(getFallbackBanners());
      } finally {
        setIsLoading(false);
      }
    };
    fetchBanners();
  }, []);

  // Fallback banners if API fails
  const getFallbackBanners = () => {
    return [
      {
        id: 'fallback-1',
        title: 'Premium Gadgets',
        subtitle: 'Latest Technology',
        mainText: 'Experience the Future Today',
        description: 'Discover cutting-edge electronics with premium quality and unmatched performance',
        badge: 'Limited Edition',
        discount: '40% OFF',
        category: 'Electronics',
        bgImage: 'https://i.ibb.co.com/WWQ097yx/Gemini-Generated-Image-3wcrdr3wcrdr3wcr.png',
        productImage: 'https://res.cloudinary.com/dta5ahuh9/image/upload/v1781580462/rt3xpskc6vmqj5oieltz.jpg',
        features: [
          { icon: 'Truck', text: 'Free Shipping' },
          { icon: 'Shield', text: '2 Year Warranty' },
          { icon: 'Clock', text: '24/7 Support' }
        ],
        buttons: [
          { text: 'Shop Now', link: '/products', isPrimary: true },
          { text: 'Learn More', link: '/about', isPrimary: false }
        ]
      }
    ];
  };

  const nextSlide = useCallback(() => {
    if (isTransitioning || banners.length === 0) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % banners.length);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning, banners.length]);

  const prevSlide = useCallback(() => {
    if (isTransitioning || banners.length === 0) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning, banners.length]);

  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide || banners.length === 0) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const handleBannerClick = async (bannerId) => {
    try {
      await trackBannerClick(bannerId);
    } catch (error) {
      console.error('Error tracking banner click:', error);
    }
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  useEffect(() => {
    if (isAutoPlaying && banners.length > 1) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    } else if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, nextSlide, banners.length]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  if (isLoading) {
    return (
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[520px] xl:h-[530px] bg-gray-200 animate-pulse flex items-center justify-center">
        <div className="text-gray-500">Loading banners...</div>
      </div>
    );
  }

  if (banners.length === 0) {
    return null;
  }

  return (
    <div 
      className="relative w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative min-h-[280px] sm:min-h-[400px] md:min-h-[480px] lg:h-[520px] xl:h-[530px]">
        {banners.map((slide, index) => {
          const IconComponent = (iconName) => {
            const Icon = ICON_MAP[iconName];
            return Icon ? <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-blue-600 group-hover:scale-110 transition-transform" /> : null;
          };

          // Get bgImage URL (handle both string and object)
          const bgImageUrl = typeof slide.bgImage === 'string' 
            ? slide.bgImage 
            : slide.bgImage?.url || '';

          // Get product image
          const productImageUrl = typeof slide.productImage === 'string' 
            ? slide.productImage 
            : slide.productImage?.url || '';

          return (
            <div
              key={slide.id || index}
              className={`absolute inset-0 transition-opacity duration-600 ${
                currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
              style={{
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ 
                  backgroundImage: `url(${bgImageUrl})`,
                  backgroundPosition: 'center',
                  transform: `scale(${currentSlide === index ? 1 : 1.05})`,
                  transition: 'transform 8s ease-out',
                }}
              />
              
              {/* Gradient Overlay - Same for all devices */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/30 to-transparent" />
              
              {/* Decorative Elements - Responsive */}
              <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 bg-purple-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              
              {/* Content Container */}
              <div className="relative h-full flex items-center py-3 sm:py-4 md:py-0">
                <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
                  <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
                    {/* Left Content - Takes remaining space */}
                    <div className="flex-1 min-w-0 max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
                      {/* Badge */}
                      <div className={`mb-1 sm:mb-2 inline-block transition-all duration-700 delay-100 ${
                        currentSlide === index && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}>
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-gray-700 bg-white/80 backdrop-blur-md rounded-full border border-gray-200 shadow-sm">
                          {slide.badge}
                        </span>
                      </div>
                      
                      {/* Main Title - 2 lines on mobile, no limit on desktop */}
                      <h1 className={`text-lg sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold font-serif text-gray-900 mb-1 sm:mb-2 md:mb-3 tracking-tight leading-[1.1] transition-all duration-700 delay-200 ${
                        currentSlide === index && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      } line-clamp-2 sm:line-clamp-none`}>
                        {slide.title}
                      </h1>
                      
                      {/* Subtitle - No truncation */}
                      <h2 className={`text-base sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl font-semibold mb-1 sm:mb-2 md:mb-3 lg:mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-all duration-700 delay-300 ${
                        currentSlide === index && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}>
                        {slide.subtitle}
                      </h2>
                      
                      {/* Main Text - 1 line on mobile, no limit on desktop */}
                      <p className={`text-sm sm:text-lg md:text-xl lg:text-3xl xl:text-4xl text-gray-800 mb-1 sm:mb-2 md:mb-3 lg:mb-4 font-light leading-tight transition-all duration-700 delay-400 ${
                        currentSlide === index && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      } line-clamp-1 sm:line-clamp-none`}>
                        {slide.mainText}
                      </p>
                      
                      {/* Description - 2 lines on mobile, no limit on desktop */}
                      <p className={`text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 mb-2 sm:mb-3 md:mb-4 lg:mb-5 max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl leading-relaxed transition-all duration-700 delay-500 ${
                        currentSlide === index && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      } line-clamp-2 sm:line-clamp-none`}>
                        {slide.description}
                      </p>
                      
                      {/* Features */}
                      {slide.features && slide.features.length > 0 && (
                        <div className={`flex flex-wrap gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 mb-2 sm:mb-3 md:mb-4 lg:mb-6 transition-all duration-700 delay-600 ${
                          currentSlide === index && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                          {slide.features.map((feature, idx) => (
                            <div 
                              key={idx} 
                              className="group flex items-center gap-1 sm:gap-1.5 md:gap-2 px-1.5 sm:px-2 md:px-3 lg:px-4 py-0.5 sm:py-1 md:py-1.5 lg:py-2 bg-white/80 backdrop-blur-md rounded-full border border-gray-200 hover:bg-white hover:shadow-md transition-all duration-300"
                            >
                              {IconComponent(feature.icon)}
                              <span className="text-gray-700 text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-medium">{feature.text}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Buttons */}
                     {/* Buttons */}
<div className={`flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 transition-all duration-700 delay-700 ${
  currentSlide === index && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
}`}>
  {slide.buttons && slide.buttons.map((button, idx) => (
    <Link
      key={idx}
      href={button.link}
      onClick={() => handleBannerClick(slide.id)}
      className={`group relative overflow-hidden flex-1 sm:flex-none px-2 sm:px-4 md:px-6 lg:px-8 py-1 sm:py-2 md:py-2.5 lg:py-3.5 ${
        button.isPrimary 
          ? 'bg-gray-900 text-white hover:shadow-2xl' 
          : 'bg-white/80 backdrop-blur-md border border-gray-300 text-gray-700 hover:bg-white hover:shadow-lg'
      } font-semibold rounded-full transition-all duration-300 transform hover:scale-105 text-center text-[8px] sm:text-xs md:text-sm lg:text-base`}
    >
      <span className="relative z-10 flex items-center justify-center gap-0.5 sm:gap-1.5 md:gap-2">
        {button.text}
        {button.isPrimary && (
          <ArrowRight className="w-2 h-2 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform" />
        )}
      </span>
      {button.isPrimary && (
        <div className="absolute inset-0 bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
      )}
    </Link>
  ))}
</div>
                    </div>

                    {/* Product Image Container - Right Side */}
                    {productImageUrl && (
                      <div className="relative flex-shrink-0 ml-1 sm:ml-2 md:ml-4 lg:ml-6">
                        {/* Product Image */}
                        <div className="relative">
                          <img
                            src={productImageUrl}
                            alt={slide.title}
                            className="w-28 sm:w-28 md:w-44 lg:w-64 xl:w-80 2xl:w-[420px] h-auto object-contain drop-shadow-2xl"
                            style={{ 
                              filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.15))',
                              maxHeight: '120px sm:160px md:280px lg:380px xl:420px'
                            }}
                          />
                          <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-3xl -z-10 scale-150" />
                        </div>

                        {/* Discount Badge - Positioned on Top-Right Corner of Product Image */}
                        {slide.discount && (
                          <div className={`absolute -top-2 -right-2 sm:-top-3 sm:-right-3 md:-top-4 md:-right-4 lg:-top-5 lg:-right-5 transition-all duration-700 delay-400 ${
                            currentSlide === index && !isTransitioning ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                          }`}>
                            <div className="relative">
                              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-2xl border-2 border-white/20">
                                <div className="text-center">
                                  <div className="text-white font-black text-[8px] sm:text-[10px] md:text-xs lg:text-xl leading-tight">{slide.discount}</div>
                                  <div className="text-white/90 text-[5px] sm:text-[6px] md:text-[8px] lg:text-[10px] xl:text-xs font-medium">OFF</div>
                                </div>
                              </div>
                              {/* Glow effect */}
                              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 to-orange-500 blur-md opacity-40 -z-10" />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons - Same design, responsive size */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 sm:left-2 md:left-4 lg:left-6 xl:left-8 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-white/90 backdrop-blur-md border border-gray-300 text-gray-800 hover:bg-white hover:scale-110 transition-all duration-200 z-20 flex items-center justify-center shadow-lg group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 sm:right-2 md:right-4 lg:right-6 xl:right-8 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-white/90 backdrop-blur-md border border-gray-300 text-gray-800 hover:bg-white hover:scale-110 transition-all duration-200 z-20 flex items-center justify-center shadow-lg group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      <div className="absolute bottom-1 sm:bottom-3 md:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index
                ? 'w-4 sm:w-5 md:w-8 lg:w-10 h-0.5 sm:h-0.5 md:h-1 bg-gray-800 shadow-lg'
                : 'w-3 sm:w-4 md:w-5 lg:w-6 h-0.5 sm:h-0.5 md:h-1 bg-gray-400 hover:bg-gray-600'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play progress bar */}
      {isAutoPlaying && banners.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-300 z-20">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
            style={{
              width: '100%',
              animation: 'progress 5s linear infinite',
            }}
          />
        </div>
      )}

      <style jsx global>{`
        @keyframes progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
        
        .duration-600 {
          transition-duration: 600ms;
        }
        
        /* Line clamp utilities */
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-none {
          display: block;
          -webkit-line-clamp: unset;
          -webkit-box-orient: unset;
          overflow: visible;
        }
      `}</style>
    </div>
  );
}