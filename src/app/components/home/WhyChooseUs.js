// 'use client';

// import { motion } from 'framer-motion';
// import { 
//   Shield, Truck, Leaf, Award, Sparkles, 
//   Heart, Star, Clock, Gift, Flower2,
//   Droplets, Sun, Moon, ThumbsUp, CheckCircle2, Crown,
//   Users
// } from 'lucide-react';
// import { useState } from 'react';

// // State Card Component - Left Side (Icon Left, Text Right)
// const StateCardLeft = ({ icon: Icon, title, description, delay }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -30 }}
//       whileInView={{ opacity: 1, x: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.5, delay }}
//       className="group relative bg-white rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-[0_8px_30px_rgba(238,66,117,0.12)] transition-all duration-300 border border-[#FFD2DB]/30 hover:border-[#EE4275]/40 cursor-default"
//     >
//       <div className="flex items-start gap-3 md:gap-4">
//         {/* Icon Container */}
//         <div className="flex-shrink-0 w-9 h-9 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-[#EE4275]/10 to-[#FFD2DB]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//           <Icon className="w-4 h-4 md:w-4.5 md:h-4.5 text-[#EE4275]" />
//         </div>
        
//         {/* Text Content */}
//         <div className="flex-1 min-w-0">
//           <h4 className="text-xs md:text-sm font-semibold text-gray-900 mb-0.5 text-left" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
//             {title}
//           </h4>
//           <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed text-left">
//             {description}
//           </p>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // State Card Component - Right Side (Icon Left, Text Right - Same as Left)
// const StateCardRight = ({ icon: Icon, title, description, delay }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: 30 }}
//       whileInView={{ opacity: 1, x: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.5, delay }}
//       className="group relative bg-white rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-[0_8px_30px_rgba(238,66,117,0.12)] transition-all duration-300 border border-[#FFD2DB]/30 hover:border-[#EE4275]/40 cursor-default"
//     >
//       <div className="flex items-start gap-3 md:gap-4">
//         {/* Icon Container */}
//         <div className="flex-shrink-0 w-9 h-9 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-[#EE4275]/10 to-[#FFD2DB]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//           <Icon className="w-4 h-4 md:w-4.5 md:h-4.5 text-[#EE4275]" />
//         </div>
        
//         {/* Text Content - Left Aligned */}
//         <div className="flex-1 min-w-0">
//           <h4 className="text-xs md:text-sm font-semibold text-gray-900 mb-0.5 text-left" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
//             {title}
//           </h4>
//           <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed text-left">
//             {description}
//           </p>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // Main Why Choose Us Component
// export default function WhyChooseUs() {
//   const [imageError, setImageError] = useState(false);

//   // Left Side Cards Data
//   const leftCards = [
//     {
//       icon: Shield,
//       title: "100% Authentic",
//       description: "Premium quality products sourced directly from trusted brands"
//     },
//     {
//       icon: Truck,
//       title: "Fast Delivery",
//       description: "Free shipping on orders above ৳500 with express delivery options"
//     },
//     {
//       icon: Leaf,
//       title: "Cruelty-Free",
//       description: "We only stock products that are ethically sourced and tested"
//     },
//     {
//       icon: Award,
//       title: "Curated Selection",
//       description: "Handpicked beauty products by our expert team of professionals"
//     }
//   ];

//   // Right Side Cards Data
//   const rightCards = [
//     {
//       icon: Star,
//       title: "Trusted Reviews",
//       description: "Real customer reviews to help you make the right choice"
//     },
//     {
//       icon: Heart,
//       title: "Love Your Skin",
//       description: "Formulated with natural ingredients for sensitive skin.Enriched with soothing botanicals"
//     },
//     {
//       icon: Clock,
//       title: "24/7 Support",
//       description: "Dedicated customer care team ready to assist you anytime"
//     },
//     {
//       icon: Gift,
//       title: "Loyalty Rewards",
//       description: "Earn points and unlock exclusive deals with every purchase"
//     }
//   ];

//   return (
//     <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white via-[#FFF5F6]/30 to-white overflow-hidden relative">
//       {/* Background Decorative Elements */}
//       <div className="absolute inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#EE4275]/5 rounded-full blur-3xl"></div>
//         <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#FFD2DB]/30 rounded-full blur-3xl"></div>
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#EE4275]/[0.02] rounded-full blur-3xl"></div>
        
//         {/* Decorative floating elements */}
//         <div className="absolute top-20 left-[10%] opacity-20 hidden lg:block">
//           <Flower2 className="w-6 h-6 text-[#EE4275]" />
//         </div>
//         <div className="absolute bottom-20 right-[10%] opacity-20 hidden lg:block">
//           <Droplets className="w-6 h-6 text-[#EE4275]" />
//         </div>
//         <div className="absolute top-1/2 left-[3%] opacity-10 hidden lg:block">
//           <Sun className="w-8 h-8 text-[#EE4275]" />
//         </div>
//         <div className="absolute top-1/2 right-[3%] opacity-10 hidden lg:block">
//           <Moon className="w-8 h-8 text-[#EE4275]" />
//         </div>
//       </div>

//       <div className="container mx-auto px-4 max-w-7xl relative z-10">
//         {/* Section Header - Centered */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-8 md:mb-12"
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#EE4275]/10 rounded-full mb-3">
//             <Sparkles className="w-3.5 h-3.5 text-[#EE4275]" />
//             <span className="text-xs font-medium text-[#EE4275] tracking-wider uppercase">
//               Why Choose Us
//             </span>
//             <Sparkles className="w-3.5 h-3.5 text-[#EE4275]" />
//           </div>
          
//           <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
//             Why <span className="text-[#EE4275]">Choose</span> Us
//           </h2>
          
//           <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto mt-2">
//             Discover why thousands of beauty enthusiasts trust us for their skincare and makeup needs
//           </p>
//         </motion.div>

//         {/* 3-Column Layout - Fixed Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
          
//           {/* LEFT COLUMN - 4 State Cards Stacked */}
//           <div className="space-y-3 md:space-y-4 order-2 lg:order-1">
//             {leftCards.map((card, index) => (
//               <StateCardLeft
//                 key={index}
//                 icon={card.icon}
//                 title={card.title}
//                 description={card.description}
//                 delay={0.1 + index * 0.08}
//               />
//             ))}
//           </div>

//           {/* CENTER COLUMN - Image - No Outer Border, Full Rounded Top & Bottom */}
//        <motion.div
//   initial={{ opacity: 0, scale: 0.95 }}
//   whileInView={{ opacity: 1, scale: 1 }}
//   viewport={{ once: true }}
//   transition={{ duration: 0.6, delay: 0.2 }}
//   className="order-1 lg:order-2 flex justify-center items-start"
// >
//   <div className="relative w-full max-w-sm">
//     {/* Image Container - Full rounded top & bottom */}
//     <div className="relative rounded-t-full overflow-hidden shadow-xl shadow-[#EE4275]/10">
//       {/* Min-height with aspect ratio */}
//       <div className="relative w-full aspect-[4/5] min-h-[300px] md:min-h-[350px] overflow-hidden bg-gradient-to-br from-[#FFF5F6] to-[#FFD2DB]/20">
        
//         {/* Image */}
//         <img
//           src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop&crop=center&auto=format"
//           alt="Beauty products"
//           className="w-full h-full object-cover"
//           loading="lazy"
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center&auto=format';
//           }}
//         />
        
//         {/* Floating badges... */}
//       </div>
//     </div>
//   </div>
// </motion.div>

//           {/* RIGHT COLUMN - 4 State Cards Stacked - Left Aligned Text */}
//           <div className="space-y-3 md:space-y-4 order-3">
//             {rightCards.map((card, index) => (
//               <StateCardRight
//                 key={index}
//                 icon={card.icon}
//                 title={card.title}
//                 description={card.description}
//                 delay={0.1 + index * 0.08}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Bottom Trust Badges */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5, delay: 0.6 }}
//           className="mt-10 md:mt-14 pt-6 md:pt-8 border-t border-[#FFD2DB]/40 flex flex-wrap justify-center gap-4 md:gap-8"
//         >
//           <div className="flex items-center gap-2">
//             <ThumbsUp className="w-4 h-4 text-[#EE4275]" />
//             <span className="text-xs md:text-sm font-medium text-gray-600">Trusted by 10k+ Customers</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <CheckCircle2 className="w-4 h-4 text-[#EE4275]" />
//             <span className="text-xs md:text-sm font-medium text-gray-600">100% Satisfaction Guaranteed</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Crown className="w-4 h-4 text-[#EE4275]" />
//             <span className="text-xs md:text-sm font-medium text-gray-600">Premium Quality Products</span>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }



'use client';

import { motion } from 'framer-motion';
import { 
  Shield, Truck, Leaf, Award, Sparkles, 
  Heart, Star, Clock, Gift, Flower2,
  Droplets, Sun, Moon, ThumbsUp, CheckCircle2, Crown,
  Users
} from 'lucide-react';
import { useState } from 'react';

// State Card Component - Left Side (Icon Left, Text Right)
const StateCardLeft = ({ icon: Icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative bg-white rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-[0_8px_30px_rgba(238,66,117,0.12)] transition-all duration-300 border border-[#FFD2DB]/30 hover:border-[#EE4275]/40 cursor-default"
    >
      <div className="flex items-start gap-3 md:gap-4">
        {/* Icon Container */}
        <div className="flex-shrink-0 w-9 h-9 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-[#EE4275]/10 to-[#FFD2DB]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-4 h-4 md:w-4.5 md:h-4.5 text-[#EE4275]" />
        </div>
        
        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <h4 className="text-xs md:text-sm font-semibold text-gray-900 mb-0.5 text-left" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
            {title}
          </h4>
          <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed text-left">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// State Card Component - Right Side (Icon Left, Text Right - Same as Left)
const StateCardRight = ({ icon: Icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative bg-white rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-[0_8px_30px_rgba(238,66,117,0.12)] transition-all duration-300 border border-[#FFD2DB]/30 hover:border-[#EE4275]/40 cursor-default"
    >
      <div className="flex items-start gap-3 md:gap-4">
        {/* Icon Container */}
        <div className="flex-shrink-0 w-9 h-9 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-[#EE4275]/10 to-[#FFD2DB]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-4 h-4 md:w-4.5 md:h-4.5 text-[#EE4275]" />
        </div>
        
        {/* Text Content - Left Aligned */}
        <div className="flex-1 min-w-0">
          <h4 className="text-xs md:text-sm font-semibold text-gray-900 mb-0.5 text-left" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
            {title}
          </h4>
          <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed text-left">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Main Why Choose Us Component
export default function WhyChooseUs() {
  const [imageError, setImageError] = useState(false);

  // Left Side Cards Data
  const leftCards = [
    {
      icon: Shield,
      title: "100% Authentic",
      description: "Premium quality products sourced directly from trusted brands"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Free shipping on orders above ৳500 with express delivery options"
    },
    {
      icon: Leaf,
      title: "Cruelty-Free",
      description: "We only stock products that are ethically sourced and tested"
    },
    {
      icon: Award,
      title: "Curated Selection",
      description: "Handpicked beauty products by our expert team of professionals"
    }
  ];

  // Right Side Cards Data
  const rightCards = [
    {
      icon: Star,
      title: "Trusted Reviews",
      description: "Real customer reviews to help you make the right choice"
    },
    {
      icon: Heart,
      title: "Love Your Skin",
      description: "Formulated with natural ingredients for sensitive skin.Enriched with soothing botanicals"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Dedicated customer care team ready to assist you anytime"
    },
    {
      icon: Gift,
      title: "Loyalty Rewards",
      description: "Earn points and unlock exclusive deals with every purchase"
    }
  ];

  // Combine all cards for mobile grid
  const allCards = [...leftCards, ...rightCards];

  return (
    <section className="py-10 md:py-14 lg:py-16 bg-gradient-to-b from-white via-[#FFF5F6]/30 to-white overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#EE4275]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#FFD2DB]/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#EE4275]/[0.02] rounded-full blur-3xl"></div>
        
        {/* Decorative floating elements */}
        <div className="absolute top-20 left-[10%] opacity-20 hidden lg:block">
          <Flower2 className="w-6 h-6 text-[#EE4275]" />
        </div>
        <div className="absolute bottom-20 right-[10%] opacity-20 hidden lg:block">
          <Droplets className="w-6 h-6 text-[#EE4275]" />
        </div>
        <div className="absolute top-1/2 left-[3%] opacity-10 hidden lg:block">
          <Sun className="w-8 h-8 text-[#EE4275]" />
        </div>
        <div className="absolute top-1/2 right-[3%] opacity-10 hidden lg:block">
          <Moon className="w-8 h-8 text-[#EE4275]" />
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 md:mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#EE4275]/10 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#EE4275]" />
            <span className="text-xs font-medium text-[#EE4275] tracking-wider uppercase">
              Why Choose Us
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#EE4275]" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
            Why <span className="text-[#EE4275]">Choose</span> Us
          </h2>
          
          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto mt-2">
            Discover why thousands of beauty enthusiasts trust us for their skincare and makeup needs
          </p>
        </motion.div>

        {/* MOBILE VIEW - 2 Columns Grid (No Image) */}
        <div className="lg:hidden grid grid-cols-2 gap-3 md:gap-4">
          {allCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative bg-white rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-[0_8px_30px_rgba(238,66,117,0.12)] transition-all duration-300 border border-[#FFD2DB]/30 hover:border-[#EE4275]/40 cursor-default"
            >
              <div className="flex flex-col items-center text-center">
                {/* Icon Container */}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#EE4275]/10 to-[#FFD2DB]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-2">
                  <card.icon className="w-4.5 h-4.5 md:w-5 md:h-5 text-[#EE4275]" />
                </div>
                
                {/* Text Content */}
                <h4 className="text-xs md:text-sm font-semibold text-gray-900 mb-0.5 text-center" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
                  {card.title}
                </h4>
                <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed text-center">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* DESKTOP VIEW - 3 Column Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 md:gap-8 items-start">
          
          {/* LEFT COLUMN - 4 State Cards Stacked */}
          <div className="space-y-3 md:space-y-4">
            {leftCards.map((card, index) => (
              <StateCardLeft
                key={index}
                icon={card.icon}
                title={card.title}
                description={card.description}
                delay={0.1 + index * 0.08}
              />
            ))}
          </div>

          {/* CENTER COLUMN - Image - Reduced Height */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center items-start"
          >
            <div className="relative w-full max-w-xs">
              {/* Image Container - Full rounded top & bottom */}
              <div className="relative rounded-t-full overflow-hidden shadow-xl shadow-[#EE4275]/10 border-2 border-pink-600">
                {/* Reduced height */}
               <div className="relative w-full aspect-[3/4] min-h-[300px] md:min-h-[350px] overflow-hidden bg-gradient-to-br from-[#FFF5F6] to-[#FFD2DB]/20">
                  
                  {/* Image */}
                  <img
                    src="/images/choose.jpg"
                    alt="Beauty products"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/choose.jpg';
                    }}
                  />
                  
                  {/* Pink Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#EE4275]/10 via-transparent to-transparent"></div>
                  
                  {/* Decorative elements on image */}
                  <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md border border-[#FFD2DB]/30">
                    <Sparkles className="w-3.5 h-3.5 text-[#EE4275]" />
                  </div>
                  <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 shadow-md border border-[#FFD2DB]/30">
                    <span className="text-[10px] font-medium text-[#EE4275]" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
                      Beauty & Glow
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN - 4 State Cards Stacked - Left Aligned Text */}
          <div className="space-y-3 md:space-y-4">
            {rightCards.map((card, index) => (
              <StateCardRight
                key={index}
                icon={card.icon}
                title={card.title}
                description={card.description}
                delay={0.1 + index * 0.08}
              />
            ))}
          </div>
        </div>

        {/* Bottom Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-[#FFD2DB]/40 flex flex-wrap justify-center gap-3 md:gap-6"
        >
          <div className="flex items-center gap-2">
            <ThumbsUp className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#EE4275]" />
            <span className="text-[10px] md:text-sm font-medium text-gray-600">Trusted by 10k+ Customers</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#EE4275]" />
            <span className="text-[10px] md:text-sm font-medium text-gray-600">100% Satisfaction Guaranteed</span>
          </div>
          <div className="flex items-center gap-2">
            <Crown className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#EE4275]" />
            <span className="text-[10px] md:text-sm font-medium text-gray-600">Premium Quality Products</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}