

// // components/home/HeroBanner.js
// 'use client';

// import { useState, useEffect, useRef, useCallback } from 'react';
// import Link from 'next/link';
// import { ChevronLeft, ChevronRight, Clock, Shield, Truck, Star, TrendingUp, Headphones, ArrowRight, Sparkles, Flower2 } from 'lucide-react';
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
//         title: 'Premium Beauty Collection',
//         subtitle: 'Luxury Skincare',
//         mainText: 'Experience the Beauty',
//         description: 'Discover premium beauty products with unmatched quality and radiant results',
//         badge: '✨ Limited Edition',
//         discount: '40% OFF',
//         category: 'Beauty',
//         bgImage: '/images/banner.jpeg',
//         productImage: 'https://res.cloudinary.com/dta5ahuh9/image/upload/v1781580462/rt3xpskc6vmqj5oieltz.jpg',
//         features: [
//           { icon: 'Truck', text: 'Free Shipping' },
//           { icon: 'Shield', text: '100% Authentic' },
//           { icon: 'Clock', text: '24/7 Support' }
//         ],
//         buttons: [
//           { text: 'Shop Now', link: '/products', isPrimary: true },
//           { text: 'Learn More', link: '/about', isPrimary: false }
//         ],
//         featuredProducts: []
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
//       <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[520px] xl:h-[530px] bg-gray-200 animate-pulse flex items-center justify-center">
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
//       <div className="relative min-h-[280px] sm:min-h-[400px] md:min-h-[480px] lg:h-[520px] xl:h-[530px]">
//         {banners.map((slide, index) => {
//           const IconComponent = (iconName) => {
//             const Icon = ICON_MAP[iconName];
//             return Icon ? <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-pink-500 group-hover:scale-110 transition-transform" /> : null;
//           };

//           // Get bgImage URL
//           const bgImageUrl = typeof slide.bgImage === 'string' 
//             ? slide.bgImage 
//             : slide.bgImage?.url || '';

//           // Get product image
//           const productImageUrl = typeof slide.productImage === 'string' 
//             ? slide.productImage 
//             : slide.productImage?.url || '';

//           // Get featured products
//           const featuredProducts = slide.featuredProducts || [];

//           return (
//             <div
//               key={slide.id || index}
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
//                   backgroundImage: `url(${bgImageUrl})`,
//                   backgroundPosition: 'center',
//                   transform: `scale(${currentSlide === index ? 1 : 1.05})`,
//                   transition: 'transform 8s ease-out',
//                 }}
//               />
              
//               {/* Gradient Overlay - Beauty Style */}
//               <div className="absolute inset-0 bg-gradient-to-r from-[#FFF5F6]/80 via-white/40 to-transparent" />
              
//               {/* Decorative Beauty Elements */}
//               <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-pink-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
//               <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 bg-purple-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              
//               {/* Floating Sparkles */}
//               <div className="absolute top-8 right-12 opacity-30">
//                 <Sparkles className="w-6 h-6 text-pink-400" />
//               </div>
//               <div className="absolute bottom-20 left-10 opacity-20">
//                 <Sparkles className="w-4 h-4 text-pink-300" />
//               </div>
//               <div className="absolute top-1/3 right-1/4 opacity-15">
//                 <Flower2 className="w-8 h-8 text-pink-400" />
//               </div>
              
//               {/* Content Container */}
//               <div className="relative h-full flex items-center py-3 sm:py-4 md:py-0">
//                 <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
//                   <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
//                     {/* Left Content */}
//                     <div className="flex-1 min-w-0 max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
//                       {/* Badge */}
//                       <div className={`mb-1 sm:mb-2 inline-block transition-all duration-700 delay-100 ${
//                         currentSlide === index && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//                       }`}>
//                         <span className="px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-pink-600 bg-white/90 backdrop-blur-md rounded-full border border-pink-200 shadow-sm" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
//                           {slide.badge}
//                         </span>
//                       </div>
                      
//                       {/* Main Title - Cursive */}
//                       <h1 className={`text-lg sm:text-3xl md:text-4xl lg:text-6xl xl:text-6xl font-bold text-gray-900 mb-1 sm:mb-2 md:mb-3 tracking-tight leading-[1.1] transition-all duration-700 delay-200 ${
//                         currentSlide === index && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//                       } line-clamp-2 sm:line-clamp-none`}
//                       style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
//                         {slide.title}
//                       </h1>
                      
//                       {/* Description */}
//                       <p className={`text-sm sm:text-base md:text-lg text-gray-700 mb-3 sm:mb-4 md:mb-5 max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl leading-relaxed transition-all duration-700 delay-500 ${
//                         currentSlide === index && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//                       } line-clamp-2 sm:line-clamp-none`}
//                       style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
//                         {slide.description}
//                       </p>
                      
//                       {/* Features */}
//                       {slide.features && slide.features.length > 0 && (
//                         <div className={`flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 mb-3 sm:mb-4 md:mb-5 transition-all duration-700 delay-600 ${
//                           currentSlide === index && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//                         }`}>
//                           {slide.features.map((feature, idx) => (
//                             <div 
//                               key={idx} 
//                               className="group flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-white/80 backdrop-blur-md rounded-full border border-pink-200 hover:bg-white hover:shadow-md transition-all duration-300"
//                             >
//                               {IconComponent(feature.icon)}
//                               <span className="text-gray-700 text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-medium" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
//                                 {feature.text}
//                               </span>
//                             </div>
//                           ))}
//                         </div>
//                       )}
                      
//                       {/* Buttons */}
//                       <div className={`flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 mb-16 transition-all duration-700 delay-700 ${
//                         currentSlide === index && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//                       }`}>
//                         {slide.buttons && slide.buttons.map((button, idx) => (
//                           <Link
//                             key={idx}
//                             href={button.link}
//                             onClick={() => handleBannerClick(slide.id)}
//                             className={`group relative overflow-hidden flex-1 sm:flex-none px-4 sm:px-6 md:px-8 lg:px-10 py-1.5 sm:py-2.5 md:py-3 lg:py-4 ${
//                               button.isPrimary 
//                                 ? 'bg-pink-500 text-white hover:bg-pink-600 shadow-lg hover:shadow-xl' 
//                                 : 'bg-white/80 backdrop-blur-md border border-pink-300 text-gray-700 hover:bg-white hover:shadow-lg'
//                             } font-semibold rounded-full transition-all duration-300 transform hover:scale-105 text-center text-[9px] sm:text-xs md:text-sm lg:text-base`}
//                             style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
//                           >
//                             <span className="relative z-10 flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2">
//                               {button.text}
//                               {button.isPrimary && (
//                                 <ArrowRight className="w-2 h-2 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform" />
//                               )}
//                             </span>
//                             {button.isPrimary && (
//                               <div className="absolute inset-0 bg-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
//                             )}
//                           </Link>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Right Side - Product Image in Circle with Animated Border */}
//                     {productImageUrl && (
//                       <div className="hidden md:block flex-shrink-0 ml-2 sm:ml-4 md:ml-6 lg:ml-8">
//                         <div className="relative w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80">
//                           {/* Animated Border Ring */}
//                           <div className="absolute -inset-3 rounded-full">
//                             <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 via-rose-500 to-pink-400 animate-spin-slow opacity-75 blur-sm"></div>
//                             <div className="absolute inset-[3px] rounded-full bg-gradient-to-r from-pink-300 via-rose-400 to-pink-300 animate-spin-slow opacity-50 blur-sm" style={{ animationDirection: 'reverse' }}></div>
//                           </div>
                          
//                           {/* Main Circle Container */}
//                           <div className="relative rounded-full overflow-hidden shadow-2xl border-4 border-white/60"
//                                style={{
//                                  width: '100%',
//                                  aspectRatio: '1/1',
//                                  background: 'linear-gradient(135deg, #FFF5F6 0%, #FFE4E8 100%)',
//                                  boxShadow: '0 25px 50px -12px rgba(238, 66, 117, 0.25)'
//                                }}>
//                             <img
//                               src={productImageUrl}
//                               alt={slide.title}
//                               className="w-full h-full object-contain p-4"
//                               style={{ 
//                                 objectPosition: 'center',
//                                 filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))'
//                               }}
//                             />
//                             {/* Inner Glow */}
//                             <div className="absolute inset-0 rounded-full bg-gradient-to-t from-pink-500/10 via-transparent to-transparent pointer-events-none" />
//                             {/* Decorative Ring */}
//                             <div className="absolute inset-2 rounded-full border-2 border-white/30 pointer-events-none" />
                            
//                             {/* Pulsing Dot Decorations */}
//                             <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
//                             <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-rose-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
//                           </div>
                          
//                           {/* Floating Glow Effect */}
//                           <div className="absolute -inset-6 rounded-full bg-pink-500/10 blur-3xl -z-10" />
                          
//                           {/* Discount Badge */}
//                           {slide.discount && (
//                             <div className={`absolute -top-2 -right-2 sm:-top-3 sm:-right-3 md:-top-4 md:-right-4 transition-all duration-700 delay-400 ${
//                               currentSlide === index && !isTransitioning ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
//                             }`}>
//                               <div className="relative group">
//                                 <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-2xl border-2 border-white/30 hover:scale-110 transition-transform duration-300">
//                                   <div className="text-center">
//                                     <div className="text-white font-black text-[8px] sm:text-[10px] md:text-xs lg:text-sm leading-tight" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
//                                       {slide.discount}
//                                     </div>
//                                     <div className="text-white/90 text-[5px] sm:text-[6px] md:text-[8px] font-medium">OFF</div>
//                                   </div>
//                                 </div>
//                                 <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 blur-md opacity-40 -z-10" />
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Featured Products at Bottom - Cards with Pink Border */}
//               {featuredProducts.length > 0 && (
//                 <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-4xl">
//                   <div className="flex gap-1.5 sm:gap-2">
//                     {featuredProducts.slice(0, 3).map((item, idx) => (
//                       <Link 
//                         key={idx}
//                         href={`/productDetails?id=${item.productId?._id || item.productId}`}
//                         className="flex-1 bg-white/20 backdrop-blur-sm rounded-xl border-2 border-pink-300/60 hover:border-pink-500 transition-all overflow-hidden shadow-sm hover:shadow-md hover:bg-white/30"
//                       >
//                         <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2">
//                           <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white/20 border border-pink-200/50">
//                             <img
//                               src={item.productId?.images?.[0]?.url || '/images/placeholder.jpg'}
//                               alt={item.productId?.productName || 'Product'}
//                               className="w-full h-full object-cover"
//                             />
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <p className="text-[8px] sm:text-[10px] md:text-xs font-medium text-gray-800 truncate" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
//                               {item.productId?.productName || 'Product'}
//                             </p>
//                             {item.productId?.discountPrice > 0 ? (
//                               <div className="flex items-center gap-1">
//                                 <span className="text-[8px] sm:text-[10px] md:text-xs font-bold text-pink-500">৳{item.productId.discountPrice}</span>
//                                 <span className="text-[6px] sm:text-[7px] md:text-[8px] text-gray-400 line-through">৳{item.productId.regularPrice}</span>
//                               </div>
//                             ) : (
//                               <span className="text-[8px] sm:text-[10px] md:text-xs font-bold text-gray-700">৳{item.productId?.regularPrice}</span>
//                             )}
//                           </div>
//                           <button
//                             onClick={(e) => {
//                               e.preventDefault();
//                               window.open(`/productDetails?id=${item.productId?._id || item.productId}`, '_blank');
//                             }}
//                             className="flex-shrink-0 px-2 sm:px-3 py-0.5 sm:py-1 text-[7px] sm:text-[9px] md:text-[10px] font-semibold text-white bg-pink-500 rounded-lg hover:bg-pink-600 transition-colors shadow-md hover:shadow-lg whitespace-nowrap"
//                             style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
//                           >
//                             Shop Now
//                           </button>
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Navigation Buttons */}
//       {banners.length > 1 && (
//         <>
//           <button
//             onClick={prevSlide}
//             className="absolute left-0 sm:left-2 md:left-4 lg:left-6 xl:left-8 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-md border-2 border-pink-200 text-gray-800 hover:bg-pink-500 hover:text-white hover:border-pink-500 hover:scale-110 transition-all duration-200 z-20 flex items-center justify-center shadow-lg group"
//             aria-label="Previous slide"
//           >
//             <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:-translate-x-0.5 transition-transform" />
//           </button>

//           <button
//             onClick={nextSlide}
//             className="absolute right-0 sm:right-2 md:right-4 lg:right-6 xl:right-8 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-md border-2 border-pink-200 text-gray-800 hover:bg-pink-500 hover:text-white hover:border-pink-500 hover:scale-110 transition-all duration-200 z-20 flex items-center justify-center shadow-lg group"
//             aria-label="Next slide"
//           >
//             <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform" />
//           </button>
//         </>
//       )}

//       {/* Dots Indicator */}
//       <div className="absolute bottom-14 sm:bottom-16 md:bottom-20 lg:bottom-24 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 md:gap-3 z-20">
//         {banners.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={`transition-all duration-300 rounded-full ${
//               currentSlide === index
//                 ? 'w-6 sm:w-8 md:w-10 h-1 bg-pink-500 shadow-lg'
//                 : 'w-4 sm:w-5 md:w-6 h-1 bg-pink-300/50 hover:bg-pink-400'
//             }`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>

//       {/* Auto-play progress bar */}
//       {isAutoPlaying && banners.length > 1 && (
//         <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-200/50 z-20">
//           <div 
//             className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full"
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
        
//         @keyframes spin-slow {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }
        
//         .animate-spin-slow {
//           animation: spin-slow 4s linear infinite;
//         }
        
//         .duration-600 {
//           transition-duration: 600ms;
//         }
        
//         .line-clamp-1 {
//           display: -webkit-box;
//           -webkit-line-clamp: 1;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
        
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
        
//         .line-clamp-none {
//           display: block;
//           -webkit-line-clamp: unset;
//           -webkit-box-orient: unset;
//           overflow: visible;
//         }
//       `}</style>
//     </div>
//   );
// }

// components/home/HeroBanner.js
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Clock, Shield, Truck, Star, TrendingUp, Headphones, ArrowRight, Sparkles, Flower2 } from 'lucide-react';
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
        title: 'Premium Beauty Collection',
        subtitle: 'Luxury Skincare',
        mainText: 'Experience the Beauty',
        description: 'Discover premium beauty products with unmatched quality and radiant results',
        badge: '✨ Limited Edition',
        discount: '40% OFF',
        category: 'Beauty',
        bgImage: '/images/banner.jpeg',
        productImage: 'https://res.cloudinary.com/dta5ahuh9/image/upload/v1781580462/rt3xpskc6vmqj5oieltz.jpg',
        features: [
          { icon: 'Truck', text: 'Free Shipping' },
          { icon: 'Shield', text: '100% Authentic' },
          { icon: 'Clock', text: '24/7 Support' }
        ],
        buttons: [
          { text: 'Shop Now', link: '/products', isPrimary: true },
          { text: 'Learn More', link: '/about', isPrimary: false }
        ],
        featuredProducts: []
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
      <div className="relative -mt-14 md:-mt-4 min-h-[280px] sm:min-h-[400px] md:min-h-[480px] lg:h-[520px] xl:h-[550px]">
        {banners.map((slide, index) => {
          const IconComponent = (iconName) => {
            const Icon = ICON_MAP[iconName];
            return Icon ? <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-pink-500 group-hover:scale-110 transition-transform" /> : null;
          };

          // Get bgImage URL
          const bgImageUrl = typeof slide.bgImage === 'string' 
            ? slide.bgImage 
            : slide.bgImage?.url || '';

          // Get product image
          const productImageUrl = typeof slide.productImage === 'string' 
            ? slide.productImage 
            : slide.productImage?.url || '';

          // Get featured products
          const featuredProducts = slide.featuredProducts || [];

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
              
              {/* Gradient Overlay - Beauty Style */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFF5F6]/80 via-white/40 to-transparent" />
              
              {/* Decorative Beauty Elements */}
              <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-pink-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 bg-purple-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              
              {/* Floating Sparkles */}
              <div className="absolute top-8 right-12 opacity-30">
                <Sparkles className="w-6 h-6 text-pink-400" />
              </div>
              <div className="absolute bottom-20 left-10 opacity-20">
                <Sparkles className="w-4 h-4 text-pink-300" />
              </div>
              <div className="absolute top-1/3 right-1/4 opacity-15">
                <Flower2 className="w-8 h-8 text-pink-400" />
              </div>
              
              {/* Content Container - Large device same, small device adjusted */}
              <div className="relative h-full flex items-center py-3 sm:py-4 md:py-0">
                <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
                  <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
                    {/* Left Content - Reduced width on small devices to give more space to image */}
                    <div className="flex-1 min-w-0 max-w-[45%] sm:max-w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
                      {/* Badge */}
                      <div className={`mb-1 sm:mb-2 inline-block transition-all duration-700 delay-100 ${
                        currentSlide === index && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}>
                        <span className="px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-1.5 text-[8px] sm:text-[10px] md:text-xs font-medium text-pink-600 bg-white/90 backdrop-blur-md rounded-full border border-pink-200 shadow-sm" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                          {slide.badge}
                        </span>
                      </div>
                      
                      {/* Main Title - Large device same, small device smaller */}
                      <h1 className={`text-sm sm:text-3xl md:text-4xl lg:text-6xl xl:text-6xl font-bold text-gray-900 mb-1 sm:mb-2 md:mb-3 tracking-tight leading-[1.1] transition-all duration-700 delay-200 ${
                        currentSlide === index && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      } line-clamp-2 sm:line-clamp-2 lg:line-clamp-none`}
                      style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                        {slide.title}
                      </h1>
                      
                      {/* Description - Large device same, small device smaller */}
                      <p className={`text-[10px] sm:text-sm md:text-base lg:text-lg text-gray-700 mb-2 sm:mb-3 md:mb-4 max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl leading-relaxed transition-all duration-700 delay-500 ${
                        currentSlide === index && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      } line-clamp-2 sm:line-clamp-2 lg:line-clamp-none`}
                      style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                        {slide.description}
                      </p>
                      
                      {/* Features - Large device same, small device smaller */}
                      {slide.features && slide.features.length > 0 && (
                        <div className={`flex flex-wrap gap-1 sm:gap-1.5 md:gap-2 mb-2 sm:mb-3 md:mb-4 transition-all duration-700 delay-600 ${
                          currentSlide === index && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                          {slide.features.map((feature, idx) => (
                            <div 
                              key={idx} 
                              className="group flex items-center gap-0.5 sm:gap-1 md:gap-1.5 px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 md:py-1.5 bg-white/80 backdrop-blur-md rounded-full border border-pink-200 hover:bg-white hover:shadow-md transition-all duration-300"
                            >
                              {IconComponent(feature.icon)}
                              <span className="text-gray-700 text-[6px] sm:text-[9px] md:text-xs font-medium" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                                {feature.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Buttons - Large device same, small device smaller */}
                   {/* Buttons - Large device same, small device smaller */}
<div className={`flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 transition-all duration-700 delay-700 ${
  currentSlide === index && !isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
}`}>
  {slide.buttons && slide.buttons.map((button, idx) => {
    // Determine the correct link for "Shop Now" button
    let buttonLink = button.link;
    
    if (button.isPrimary) {
      // First priority: Use productId from banner
      if (slide.productId) {
        buttonLink = `/productDetails?id=${slide.productId}`;
      }
      // Second priority: Use first featured product
      else if (slide.featuredProducts && slide.featuredProducts.length > 0) {
        const firstProduct = slide.featuredProducts[0];
        const productId = firstProduct.productId?._id || firstProduct.productId;
        if (productId) {
          buttonLink = `/productDetails?id=${productId}`;
        }
      }
    }
    
    return (
      <Link
        key={idx}
        href={buttonLink}
        onClick={() => handleBannerClick(slide.id)}
        className={`group relative overflow-hidden flex-1 sm:flex-none px-2 sm:px-5 md:px-7 lg:px-10 py-0.5 sm:py-2 md:py-2.5 lg:py-4 ${
          button.isPrimary 
            ? 'bg-pink-500 text-white hover:bg-pink-600 shadow-md hover:shadow-lg' 
            : 'bg-white/80 backdrop-blur-md border border-pink-300 text-gray-700 hover:bg-white hover:shadow-md'
        } font-semibold rounded-full transition-all duration-300 transform hover:scale-105 text-center text-[7px] sm:text-[10px] md:text-sm lg:text-base`}
        style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
      >
        <span className="relative z-10 flex items-center justify-center gap-0.5 sm:gap-1 md:gap-1.5">
          {button.text}
          {button.isPrimary && (
            <ArrowRight className="w-2 h-2 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform" />
          )}
        </span>
        {button.isPrimary && (
          <div className="absolute inset-0 bg-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
        )}
      </Link>
    );
  })}
</div>
                    </div>

                    {/* Right Side - Product Image in Circle - Larger on small devices */}
                    {productImageUrl && (
                      <div className="flex-shrink-0 ml-18 sm:ml-3 md:ml-6 lg:ml-8">
                        {/* <div className="relative w-24 sm:w-32 md:w-48 lg:w-72 xl:w-80"> */}
                        <div className="relative w-28 sm:w-40 md:w-56 lg:w-80 xl:w-88">
                          {/* Animated Border Ring - Larger on mobile */}
                          {/* <div className="absolute -inset-1 sm:-inset-2 md:-inset-3 rounded-full">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 via-rose-500 to-pink-400 animate-spin-slow opacity-75 blur-sm"></div>
                            <div className="absolute inset-[1px] sm:inset-[2px] md:inset-[3px] rounded-full bg-gradient-to-r from-pink-300 via-rose-400 to-pink-300 animate-spin-slow opacity-50 blur-sm" style={{ animationDirection: 'reverse' }}></div>
                          </div> */}

                          <div className="absolute -inset-0.5 sm:-inset-1 md:-inset-1.5 rounded-full">
  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 via-rose-500 to-pink-400 animate-spin-slow opacity-75 blur-sm"></div>
  <div className="absolute inset-[0.5px] sm:inset-[1px] md:inset-[1.5px] rounded-full bg-gradient-to-r from-pink-300 via-rose-400 to-pink-300 animate-spin-slow opacity-50 blur-sm" style={{ animationDirection: 'reverse' }}></div>
</div>
                          
                          {/* Main Circle Container */}
                         <div className="relative rounded-full overflow-hidden shadow-2xl border-2 sm:border-4 border-white/60"
     style={{
       width: '100%',
       aspectRatio: '1/1',
       background: 'linear-gradient(135deg, #FFF5F6 0%, #FFE4E8 100%)',
       boxShadow: '0 25px 50px -12px rgba(238, 66, 117, 0.25)'
     }}>
  <img
    src={productImageUrl}
    alt={slide.title}
    className="w-full h-full object-cover p-0"
    style={{ 
      objectPosition: 'center',
      filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))'
    }}
    loading="lazy"
  />
                            {/* Inner Glow */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-pink-500/10 via-transparent to-transparent pointer-events-none" />
                            {/* Decorative Ring */}
                            <div className="absolute inset-1 sm:inset-2 rounded-full border border-white/30 pointer-events-none" />
                            
                            {/* Pulsing Dot Decorations - Larger on mobile */}
                            <div className="absolute  -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-1.5 h-1.5 sm:w-3 sm:h-3 bg-pink-400 rounded-full animate-pulse"></div>
                            <div className="absolute -bottom-0.5 -left-0.5 sm:-bottom-1 sm:-left-1 w-1.5 h-1.5 sm:w-3 sm:h-3 bg-rose-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                          </div>
                          
                          {/* Floating Glow Effect */}
                          <div className="absolute -inset-2 sm:-inset-4 md:-inset-6 rounded-full bg-pink-500/10 blur-3xl -z-10" />
                          
                          {/* Discount Badge - Larger on mobile */}
                          {slide.discount && (
                            <div className={`absolute -top-1 -right-1 sm:-top-2 sm:-right-2 md:-top-4 md:-right-2 transition-all duration-700 delay-400 ${
                              currentSlide === index && !isTransitioning ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                            }`}>
                              <div className="relative group">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-2xl border border-white/30 hover:scale-110 transition-transform duration-300">
                                  <div className="text-center">
                                    <div className="text-white font-black text-[6px] sm:text-[8px] md:text-[10px] lg:text-sm leading-tight" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                                      {slide.discount}
                                    </div>
                                    <div className="text-white/90 text-[4px] sm:text-[5px] md:text-[7px] font-medium">OFF</div>
                                  </div>
                                </div>
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 blur-md opacity-40 -z-10" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}




                  </div>
                </div>
              </div>

              {/* Featured Products at Bottom - Cards with Pink Border */}
            {/* Featured Products at Bottom - Cards with Pink Border */}
{featuredProducts.length > 0 && (
  <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 z-10 w-[95%] sm:w-[90%] max-w-4xl">
    <div className="flex gap-1 sm:gap-1.5 md:gap-2">
      {featuredProducts.slice(0, 3).map((item, idx) => (
        <Link 
          key={idx}
          href={`/productDetails?id=${item.productId?._id || item.productId}`}
          onClick={() => handleBannerClick(slide.id)}
          className="flex-1 bg-white/15 backdrop-blur-sm rounded-lg sm:rounded-xl border border-pink-300/40 hover:border-pink-500 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md hover:bg-white/25"
        >
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 p-1 sm:p-1.5 md:p-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white/20 border border-pink-200/30">
              <img
                src={item.productId?.images?.[0]?.url || '/images/placeholder.jpg'}
                alt={item.productId?.productName || 'Product'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[6px] sm:text-[8px] md:text-[10px] font-medium text-gray-800 truncate group-hover:text-pink-600 transition-colors" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                {item.productId?.productName || 'Product'}
              </p>
              <div className="flex items-center gap-0.5 sm:gap-1">
                {item.productId?.discountPrice > 0 ? (
                  <>
                    <span className="text-[6px] sm:text-[8px] md:text-[10px] font-bold text-pink-500">৳{item.productId.discountPrice}</span>
                    <span className="text-[4px] sm:text-[6px] md:text-[8px] text-gray-400 line-through">৳{item.productId.regularPrice}</span>
                  </>
                ) : (
                  <span className="text-[6px] sm:text-[8px] md:text-[10px] font-bold text-gray-700">৳{item.productId?.regularPrice}</span>
                )}
              </div>
            </div>
            <span className="flex-shrink-0 px-1 sm:px-2 md:px-3 py-0.5 sm:py-0.5 md:py-1 text-[5px] sm:text-[7px] md:text-[9px] font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-md sm:rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 whitespace-nowrap">
              Shop Now
            </span>
          </div>
        </Link>
      ))}
    </div>
  </div>
)}
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 sm:left-2 md:left-4 lg:left-6 xl:left-8 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-white/90 backdrop-blur-md border-2 border-pink-200 text-gray-800 hover:bg-pink-500 hover:text-white hover:border-pink-500 hover:scale-110 transition-all duration-200 z-20 flex items-center justify-center shadow-lg group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 sm:right-2 md:right-4 lg:right-6 xl:right-8 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-white/90 backdrop-blur-md border-2 border-pink-200 text-gray-800 hover:bg-pink-500 hover:text-white hover:border-pink-500 hover:scale-110 transition-all duration-200 z-20 flex items-center justify-center shadow-lg group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 lg:bottom-20 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index
                ? 'w-3 sm:w-5 md:w-8 lg:w-10 h-0.5 sm:h-0.5 md:h-1 bg-pink-500 shadow-lg'
                : 'w-2 sm:w-4 md:w-5 lg:w-6 h-0.5 sm:h-0.5 md:h-1 bg-pink-300/50 hover:bg-pink-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play progress bar */}
      {isAutoPlaying && banners.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-200/50 z-20">
          <div 
            className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full"
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
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
        
        .duration-600 {
          transition-duration: 600ms;
        }
        
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