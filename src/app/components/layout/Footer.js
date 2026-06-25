

// 'use client';

// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import { Sparkles } from 'lucide-react';
// import { 
//   FaFacebookF, 
//   FaInstagram, 
//   FaTwitter, 
//   FaWhatsapp,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaClock,
//   FaTruck,
//   FaShieldAlt,
//   FaYoutube,
//   FaLinkedinIn,
//   FaCcVisa,
//   FaCcMastercard,
//   FaPaypal,
//   FaApplePay,
//   FaPinterestP,
//   FaTiktok
// } from 'react-icons/fa';
// import { HiOutlineBadgeCheck, HiOutlineChip } from 'react-icons/hi';
// import { IoIosFlash } from 'react-icons/io';
// import { GiLipstick } from 'react-icons/gi';

// export default function Footer() {
//   const router = useRouter();
//   const currentYear = new Date().getFullYear();

//   const companyInfo = {
//     name: "Beauty Bucket",
//     tagline: "Premium Beauty Essentials",
//     description: "Discover premium beauty products with expert care, fast delivery, and a touch of luxury across Bangladesh.",
//     address: "Dhaka, Bangladesh",
//     phone: "+880 1XXXXXXXXX",
//     email: "support@beautybucket.com",
//     whatsapp: "8801234567890",
//     hours: "Always Open • 24/7 Online Ordering • Quick Response",
//     social: {
//       facebook: "https://facebook.com",
//       instagram: "https://instagram.com",
//       youtube: "https://youtube.com",
//       pinterest: "https://pinterest.com",
//       tiktok: "https://tiktok.com"
//     }
//   };

//   const quickLinks = [
//     { name: 'Home', href: '/' },
//     { name: 'Products', href: '/products' },
//     { name: 'Track Order', href: '/track' },
//     { name: 'About Us', href: '/about' },
//   ];

//   const supportLinks = [
//     { name: 'Contact Us', href: '/contact' },
//     { name: 'Terms & Conditions', href: '/terms' },
//     { name: 'Privacy Policy', href: '/privacy' },
//   ];

//   const openGmail = (email) => {
//     window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
//   };

//   return (
//     <footer 
//       className="relative text-white overflow-hidden"
//       style={{
//         backgroundImage: 'url(/images/foot.PNG)',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//     >
//       {/* Pink Gradient Overlay - Same as FeaturedProducts left image */}
//       <div className="absolute inset-0 bg-gradient-to-br from-[#EE4275]/15 via-[#FF6B9D]/5 to-transparent"></div>
      
//       {/* Secondary Overlay for depth */}
//       <div className="absolute inset-0 bg-gradient-to-t from-[#1A0E14]/40 to-transparent"></div>
      
//       {/* Pink Border Frame - Same as FeaturedProducts */}
//       <div className="absolute inset-4 rounded-2xl border border-[#EE4275]/20"></div>
      
//       {/* Inner Pink Glow - Same as FeaturedProducts */}
//       <div className="absolute inset-0 rounded-3xl shadow-inner shadow-[#EE4275]/10"></div>
      
//       {/* Top Gradient Bar - Pink Beauty Theme */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-[#EE4275]/40 to-transparent z-20"></div>
      
//       {/* Bottom Decorative line - Pink (same as FeaturedProducts) */}
//       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-[#EE4275]/40 to-transparent z-20"></div>
      
//       {/* Decorative Pattern Overlay - Pink Theme */}
//       <div className="absolute inset-0 opacity-20 z-0">
//         <div className="absolute top-0 left-0 w-64 h-64 bg-[#EE4275] rounded-full filter blur-3xl"></div>
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D9366A] rounded-full filter blur-3xl"></div>
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#FF6B9D] rounded-full filter blur-3xl"></div>
//         {/* Decorative dots pattern */}
//         <div className="absolute inset-0 opacity-[0.05]" style={{
//           backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
//           backgroundSize: '30px 30px'
//         }}></div>
//       </div>

//       {/* Floating Sparkles - Same animation as FeaturedProducts */}
//       <motion.div 
//         className="absolute top-1/4 right-20 z-20 hidden lg:block"
//         animate={{
//           y: [0, -8, 0],
//           opacity: [0.4, 0.8, 0.4],
//         }}
//         transition={{
//           duration: 3,
//           repeat: Infinity,
//           ease: "easeInOut"
//         }}
//       >
//         <Sparkles className="w-3 h-3 text-[#EE4275]/40" />
//       </motion.div>

//       <motion.div 
//         className="absolute bottom-1/4 left-20 z-20 hidden lg:block"
//         animate={{
//           y: [0, 8, 0],
//           opacity: [0.3, 0.7, 0.3],
//         }}
//         transition={{
//           duration: 3.5,
//           repeat: Infinity,
//           ease: "easeInOut",
//           delay: 0.5
//         }}
//       >
//         <Sparkles className="w-2.5 h-2.5 text-[#FF6B9D]/40" />
//       </motion.div>

//       <motion.div 
//         className="absolute top-1/3 left-1/4 z-20 hidden lg:block"
//         animate={{
//           y: [0, -5, 0],
//           opacity: [0.2, 0.6, 0.2],
//         }}
//         transition={{
//           duration: 4,
//           repeat: Infinity,
//           ease: "easeInOut",
//           delay: 1
//         }}
//       >
//         <Sparkles className="w-2 h-2 text-[#EE4275]/30" />
//       </motion.div>

//       <motion.div 
//         className="absolute bottom-1/3 right-1/4 z-20 hidden lg:block"
//         animate={{
//           y: [0, 6, 0],
//           opacity: [0.2, 0.5, 0.2],
//         }}
//         transition={{
//           duration: 3.8,
//           repeat: Infinity,
//           ease: "easeInOut",
//           delay: 0.8
//         }}
//       >
//         <Sparkles className="w-1.5 h-1.5 text-[#FF6B9D]/30" />
//       </motion.div>
      
//       {/* Main Footer - Reduced padding for smaller height */}
//       <div className="container mx-auto px-4 py-6 lg:py-5 relative z-10">
        
//         {/* Main Grid - 4 Columns Layout for large, custom stack for mobile */}
//         <div className="lg:grid lg:grid-cols-4 lg:gap-8 flex flex-col space-y-6 lg:space-y-0 mb-2">
          
//           {/* Row 1 on Mobile: Column 1 - Company Info (full width) */}
//           <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full">
//             <div className="flex flex-col items-center lg:items-start gap-1 mb-2">
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#EE4275] to-[#D9366A] flex items-center justify-center shadow-lg shadow-[#EE4275]/40">
//                   <GiLipstick className="text-white text-sm" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-bold text-white drop-shadow-lg">
//                     {companyInfo.name}
//                   </h2>
//                 </div>
//               </div>
//             </div>
            
//             <p className="text-white/90 text-xs mb-3 leading-relaxed max-w-xs drop-shadow">
//               {companyInfo.description}
//             </p>

//             {/* Trust Badges - Beauty Theme */}
//             <div className="flex flex-wrap gap-1.5 mb-2 justify-center lg:justify-start">
//               <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/30">
//                 <HiOutlineBadgeCheck className="text-white text-xs" />
//                 <span className="text-xs font-medium text-white drop-shadow">100% Authentic</span>
//               </div>
//               <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/30">
//                 <FaShieldAlt className="text-white text-xs" />
//                 <span className="text-xs font-medium text-white drop-shadow">Premium Quality</span>
//               </div>
//               <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/30">
//                 <IoIosFlash className="text-white text-xs" />
//                 <span className="text-xs font-medium text-white drop-shadow">Fast Delivery</span>
//               </div>
//             </div>
//           </div>

//           {/* Row 2 on Mobile: Two columns - Quick Links (left) & Support (right) */}
//           <div className="grid grid-cols-2 gap-4 lg:hidden w-full">
//             {/* Quick Links - Left column on mobile */}
//             <div>
//               <h3 className="text-sm font-semibold text-white mb-3 relative inline-block drop-shadow-lg">
//                 Quick Links
//                 <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-white/60 to-transparent"></span>
//               </h3>
//               <ul className="space-y-2">
//                 {quickLinks.map((link) => (
//                   <li key={link.name}>
//                     <Link 
//                       href={link.href}
//                       className="text-white/80 hover:text-white transition-colors duration-200 text-xs flex items-center gap-1.5 group drop-shadow"
//                     >
//                       <span className="w-1 h-1 rounded-full bg-white/40 group-hover:bg-white transition-colors"></span>
//                       {link.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Support - Right column on mobile */}
//             <div>
//               <h3 className="text-sm font-semibold text-white mb-3 relative inline-block drop-shadow-lg">
//                 Support
//                 <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-white/60 to-transparent"></span>
//               </h3>
//               <ul className="space-y-2">
//                 {supportLinks.map((link) => (
//                   <li key={link.name}>
//                     <Link 
//                       href={link.href}
//                       className="text-white/80 hover:text-white transition-colors duration-200 text-xs flex items-center gap-1.5 group drop-shadow"
//                     >
//                       <span className="w-1 h-1 rounded-full bg-white/40 group-hover:bg-white transition-colors"></span>
//                       {link.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* Row 3 on Mobile: Contact Us (full width) */}
//           <div className="lg:hidden w-full">
//             <h3 className="text-sm font-semibold text-white mb-3 relative inline-block drop-shadow-lg">
//               Contact Us
//               <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-white/60 to-transparent"></span>
//             </h3>
            
//             <div className="space-y-2">
//               <motion.a 
//                 href={`https://maps.google.com/?q=${encodeURIComponent(companyInfo.address)}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-start gap-2 text-white/80 hover:text-white transition-colors group text-xs drop-shadow"
//                 whileHover={{ x: 2 }}
//               >
//                 <div className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
//                   <FaMapMarkerAlt className="text-white text-xs" />
//                 </div>
//                 <span className="text-xs leading-tight">{companyInfo.address}</span>
//               </motion.a>
              
//               <motion.a 
//                 href={`tel:${companyInfo.phone}`}
//                 className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group text-xs drop-shadow"
//                 whileHover={{ x: 2 }}
//               >
//                 <div className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
//                   <FaPhone className="text-white text-xs" />
//                 </div>
//                 <span className="text-xs">{companyInfo.phone}</span>
//               </motion.a>
              
//               <motion.button 
//                 onClick={() => openGmail(companyInfo.email)}
//                 className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group w-full text-left text-xs drop-shadow"
//                 whileHover={{ x: 2 }}
//               >
//                 <div className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
//                   <FaEnvelope className="text-white text-xs" />
//                 </div>
//                 <span className="text-xs">{companyInfo.email}</span>
//               </motion.button>
              
//               <div className="flex items-start gap-2 text-white/80 text-xs drop-shadow">
//                 <div className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
//                   <FaClock className="text-white text-xs" />
//                 </div>
//                 <span className="text-xs leading-tight">{companyInfo.hours}</span>
//               </div>
//             </div>
//           </div>

//           {/* Row 4 on Mobile: Connect With Us (full width) */}
//           <div className="lg:hidden w-full">
//             <h3 className="text-sm font-semibold text-white mb-3 relative inline-block drop-shadow-lg">
//               Connect With Us
//               <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-white/60 to-transparent"></span>
//             </h3>
            
//             {/* Social Links - Beauty Theme */}
//             <div className="flex flex-wrap gap-1.5">
//               {[
//                 { icon: <FaFacebookF />, href: companyInfo.social.facebook, label: 'Facebook' },
//                 { icon: <FaInstagram />, href: companyInfo.social.instagram, label: 'Instagram' },
//                 { icon: <FaYoutube />, href: companyInfo.social.youtube, label: 'YouTube' },
//                 { icon: <FaPinterestP />, href: companyInfo.social.pinterest, label: 'Pinterest' },
//                 { icon: <FaTiktok />, href: companyInfo.social.tiktok, label: 'TikTok' },
//               ].map((social, index) => (
//                 <motion.a
//                   key={index}
//                   href={social.href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300 group border border-white/30"
//                   whileHover={{ y: -1, scale: 1.05 }}
//                   title={social.label}
//                 >
//                   <span className="text-white/80 group-hover:text-white transition-colors text-xs">
//                     {social.icon}
//                   </span>
//                 </motion.a>
//               ))}
//             </div>
//           </div>

//           {/* Desktop Layout - Large screens */}
//           {/* Column 2: Quick Links (Desktop) */}
//           <div className="hidden lg:block">
//             <h3 className="text-sm font-semibold text-white mb-3 relative inline-block drop-shadow-lg">
//               Quick Links
//               <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-white/60 to-transparent"></span>
//             </h3>
//             <ul className="space-y-2">
//               {quickLinks.map((link) => (
//                 <li key={link.name}>
//                   <Link 
//                     href={link.href}
//                     className="text-white/80 hover:text-white transition-colors duration-200 text-xs flex items-center gap-1.5 group drop-shadow"
//                   >
//                     <span className="w-1 h-1 rounded-full bg-white/40 group-hover:bg-white transition-colors"></span>
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Column 3: Support & Connect With Us (Desktop) */}
//           <div className="hidden lg:block">
//             {/* Support Links */}
//             <div>
//               <h3 className="text-sm font-semibold text-white mb-3 relative inline-block drop-shadow-lg">
//                 Support
//                 <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-white/60 to-transparent"></span>
//               </h3>
//               <ul className="space-y-2">
//                 {supportLinks.map((link) => (
//                   <li key={link.name}>
//                     <Link 
//                       href={link.href}
//                       className="text-white/80 hover:text-white transition-colors duration-200 text-xs flex items-center gap-1.5 group drop-shadow"
//                     >
//                       <span className="w-1 h-1 rounded-full bg-white/40 group-hover:bg-white transition-colors"></span>
//                       {link.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Connect With Us - Immediately after Support with no gap */}
//             <div className="mt-0 pt-0">
//               <h3 className="text-sm font-semibold text-white mb-3 relative inline-block drop-shadow-lg">
//                 Connect With Us
//                 <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-white/60 to-transparent"></span>
//               </h3>
              
//               {/* Social Links - Beauty Theme */}
//               <div className="flex flex-wrap gap-1.5">
//                 {[
//                   { icon: <FaFacebookF />, href: companyInfo.social.facebook, label: 'Facebook' },
//                   { icon: <FaInstagram />, href: companyInfo.social.instagram, label: 'Instagram' },
//                   { icon: <FaYoutube />, href: companyInfo.social.youtube, label: 'YouTube' },
//                   { icon: <FaPinterestP />, href: companyInfo.social.pinterest, label: 'Pinterest' },
//                   { icon: <FaTiktok />, href: companyInfo.social.tiktok, label: 'TikTok' },
//                 ].map((social, index) => (
//                   <motion.a
//                     key={index}
//                     href={social.href}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300 group border border-white/30"
//                     whileHover={{ y: -1, scale: 1.05 }}
//                     title={social.label}
//                   >
//                     <span className="text-white/80 group-hover:text-white transition-colors text-xs">
//                       {social.icon}
//                     </span>
//                   </motion.a>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Column 4: Contact Us (Desktop) */}
//           <div className="hidden lg:block">
//             <h3 className="text-sm font-semibold text-white mb-3 relative inline-block drop-shadow-lg">
//               Contact Us
//               <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-white/60 to-transparent"></span>
//             </h3>
            
//             <div className="space-y-2">
//               <motion.a 
//                 href={`https://maps.google.com/?q=${encodeURIComponent(companyInfo.address)}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-start gap-2 text-white/80 hover:text-white transition-colors group text-xs drop-shadow"
//                 whileHover={{ x: 2 }}
//               >
//                 <div className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
//                   <FaMapMarkerAlt className="text-white text-xs" />
//                 </div>
//                 <span className="text-xs leading-tight">{companyInfo.address}</span>
//               </motion.a>
              
//               <motion.a 
//                 href={`tel:${companyInfo.phone}`}
//                 className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group text-xs drop-shadow"
//                 whileHover={{ x: 2 }}
//               >
//                 <div className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
//                   <FaPhone className="text-white text-xs" />
//                 </div>
//                 <span className="text-xs">{companyInfo.phone}</span>
//               </motion.a>
              
//               <motion.button 
//                 onClick={() => openGmail(companyInfo.email)}
//                 className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group w-full text-left text-xs drop-shadow"
//                 whileHover={{ x: 2 }}
//               >
//                 <div className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
//                   <FaEnvelope className="text-white text-xs" />
//                 </div>
//                 <span className="text-xs">{companyInfo.email}</span>
//               </motion.button>
              
//               <div className="flex items-start gap-2 text-white/80 text-xs drop-shadow">
//                 <div className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
//                   <FaClock className="text-white text-xs" />
//                 </div>
//                 <span className="text-xs leading-tight">{companyInfo.hours}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar - More compact */}
//         <div className="pt-3 mt-1 border-t border-white/30">
//           <div className="flex flex-col lg:flex-row justify-between items-center gap-2">
//             <p className="text-white/80 text-xs drop-shadow">
//               © {currentYear} <span className="text-white font-medium">Beauty Bucket</span>. All rights reserved.
//             </p>
            
//             {/* Trust Badges - Beauty Theme */}
//             <div className="flex items-center gap-2 flex-wrap justify-center">
//               <span className="text-white/70 text-xs drop-shadow">Secure:</span>
//               <div className="flex gap-1 flex-wrap justify-center">
//                 <div className="px-1.5 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-[9px] font-medium text-white border border-white/30 flex items-center gap-1 drop-shadow">
//                   <FaTruck className="text-white" /> Free Shipping ৳3000+
//                 </div>
//                 <div className="px-1.5 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-[9px] font-medium text-white border border-white/30 flex items-center gap-1 drop-shadow">
//                   <FaShieldAlt className="text-white" /> Premium Quality
//                 </div>
//                 <div className="px-1.5 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-[9px] font-medium text-white border border-white/30 flex items-center gap-1 drop-shadow">
//                   <GiLipstick className="text-white" /> Beauty Essentials
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }


'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaTruck,
  FaShieldAlt,
  FaYoutube,
  FaLinkedinIn,
  FaCcVisa,
  FaCcMastercard,
  FaPaypal,
  FaApplePay,
  FaPinterestP,
  FaTiktok
} from 'react-icons/fa';
import { HiOutlineBadgeCheck, HiOutlineChip } from 'react-icons/hi';
import { IoIosFlash } from 'react-icons/io';
import { GiLipstick } from 'react-icons/gi';

export default function Footer() {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  const companyInfo = {
    name: "Beauty Bucket",
    tagline: "Premium Beauty Essentials",
    description: "Discover premium beauty products with expert care, fast delivery, and a touch of luxury across Bangladesh.",
    address: "Dhaka, Bangladesh",
    phone: "+880 1XXXXXXXXX",
    email: "support@beautybucket.com",
    whatsapp: "8801234567890",
    hours: "Always Open • 24/7 Online Ordering • Quick Response",
    social: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
      pinterest: "https://pinterest.com",
      tiktok: "https://tiktok.com"
    }
  };

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Track Order', href: '/track' },
    { name: 'About Us', href: '/about' },
  ];

  const supportLinks = [
    { name: 'Contact Us', href: '/contact' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
  ];

  const openGmail = (email) => {
    window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
  };

  return (
    <footer className="relative text-white overflow-hidden" style={{ backgroundColor: '#1A0E14' }}>
      {/* Top Gradient Bar - Pink Beauty Theme */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#EE4275] via-[#FF6B9D] to-[#EE4275]"></div>
      
      {/* Decorative Pattern Overlay - Pink Theme */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#EE4275] rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FF6B9D] rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#FFD2DB] rounded-full filter blur-3xl"></div>
      </div>
      
      {/* Main Footer - Reduced padding for smaller height */}
      <div className="container mx-auto px-4 py-6 lg:py-5 relative z-10">
        
        {/* Main Grid - 4 Columns Layout for large, custom stack for mobile */}
        <div className="lg:grid lg:grid-cols-4 lg:gap-8 flex flex-col space-y-6 lg:space-y-0 mb-2">
          
          {/* Row 1 on Mobile: Column 1 - Company Info (full width) */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full">
            <div className="flex flex-col items-center lg:items-start gap-1 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#EE4275] to-[#FF6B9D] flex items-center justify-center shadow-lg shadow-[#EE4275]/30">
                  <GiLipstick className="text-white text-sm" />
                </div>
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] bg-clip-text text-transparent">
                    {companyInfo.name}
                  </h2>
                </div>
              </div>
            </div>
            
            <p className="text-white/70 text-xs mb-3 leading-relaxed max-w-xs">
              {companyInfo.description}
            </p>

            {/* Trust Badges - Beauty Theme */}
            <div className="flex flex-wrap gap-1.5 mb-2 justify-center lg:justify-start">
              <div className="flex items-center gap-1 bg-white/10 rounded-full px-3 py-1.5 border border-white/20">
                <HiOutlineBadgeCheck className="text-[#EE4275] text-xs" />
                <span className="text-xs font-medium text-white/80">100% Authentic</span>
              </div>
              <div className="flex items-center gap-1 bg-white/10 rounded-full px-3 py-1.5 border border-white/20">
                <FaShieldAlt className="text-[#FF6B9D] text-xs" />
                <span className="text-xs font-medium text-white/80">Premium Quality</span>
              </div>
              <div className="flex items-center gap-1 bg-white/10 rounded-full px-3 py-1.5 border border-white/20">
                <IoIosFlash className="text-[#EE4275] text-xs" />
                <span className="text-xs font-medium text-white/80">Fast Delivery</span>
              </div>
            </div>
          </div>

          {/* Row 2 on Mobile: Two columns - Quick Links (left) & Support (right) */}
          <div className="grid grid-cols-2 gap-4 lg:hidden w-full">
            {/* Quick Links - Left column on mobile */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
                Quick Links
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#EE4275] to-transparent"></span>
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-white/60 hover:text-[#EE4275] transition-colors duration-200 text-xs flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#EE4275] transition-colors"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support - Right column on mobile */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
                Support
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#EE4275] to-transparent"></span>
              </h3>
              <ul className="space-y-2">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-white/60 hover:text-[#EE4275] transition-colors duration-200 text-xs flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#EE4275] transition-colors"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Row 3 on Mobile: Contact Us (full width) */}
          <div className="lg:hidden w-full">
            <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#EE4275] to-transparent"></span>
            </h3>
            
            <div className="space-y-2">
              <motion.a 
                href={`https://maps.google.com/?q=${encodeURIComponent(companyInfo.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-white/70 hover:text-[#EE4275] transition-colors group text-xs"
                whileHover={{ x: 2 }}
              >
                <div className="w-5 h-5 rounded-lg bg-[#EE4275]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#EE4275]/30 transition-colors">
                  <FaMapMarkerAlt className="text-[#EE4275] text-xs" />
                </div>
                <span className="text-xs leading-tight">{companyInfo.address}</span>
              </motion.a>
              
              <motion.a 
                href={`tel:${companyInfo.phone}`}
                className="flex items-center gap-2 text-white/70 hover:text-[#EE4275] transition-colors group text-xs"
                whileHover={{ x: 2 }}
              >
                <div className="w-5 h-5 rounded-lg bg-[#EE4275]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#EE4275]/30 transition-colors">
                  <FaPhone className="text-[#EE4275] text-xs" />
                </div>
                <span className="text-xs">{companyInfo.phone}</span>
              </motion.a>
              
              <motion.button 
                onClick={() => openGmail(companyInfo.email)}
                className="flex items-center gap-2 text-white/70 hover:text-[#EE4275] transition-colors group w-full text-left text-xs"
                whileHover={{ x: 2 }}
              >
                <div className="w-5 h-5 rounded-lg bg-[#EE4275]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#EE4275]/30 transition-colors">
                  <FaEnvelope className="text-[#EE4275] text-xs" />
                </div>
                <span className="text-xs">{companyInfo.email}</span>
              </motion.button>
              
              <div className="flex items-start gap-2 text-white/70 text-xs">
                <div className="w-5 h-5 rounded-lg bg-[#EE4275]/20 flex items-center justify-center flex-shrink-0">
                  <FaClock className="text-[#EE4275] text-xs" />
                </div>
                <span className="text-xs leading-tight">{companyInfo.hours}</span>
              </div>
            </div>
          </div>

          {/* Row 4 on Mobile: Connect With Us (full width) */}
          <div className="lg:hidden w-full">
            <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
              Connect With Us
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#EE4275] to-transparent"></span>
            </h3>
            
            {/* Social Links - Beauty Theme */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { icon: <FaFacebookF />, href: companyInfo.social.facebook, label: 'Facebook' },
                { icon: <FaInstagram />, href: companyInfo.social.instagram, label: 'Instagram' },
                { icon: <FaYoutube />, href: companyInfo.social.youtube, label: 'YouTube' },
                { icon: <FaPinterestP />, href: companyInfo.social.pinterest, label: 'Pinterest' },
                { icon: <FaTiktok />, href: companyInfo.social.tiktok, label: 'TikTok' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#EE4275]/20 transition-all duration-300 group"
                  whileHover={{ y: -1 }}
                  title={social.label}
                >
                  <span className="text-white/70 group-hover:text-[#EE4275] transition-colors text-xs">
                    {social.icon}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Desktop Layout - Large screens */}
          {/* Column 2: Quick Links (Desktop) */}
          <div className="hidden lg:block">
            <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#EE4275] to-transparent"></span>
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-white/60 hover:text-[#EE4275] transition-colors duration-200 text-xs flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#EE4275] transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support & Connect With Us (Desktop) */}
          <div className="hidden lg:block">
            {/* Support Links */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
                Support
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#EE4275] to-transparent"></span>
              </h3>
              <ul className="space-y-2">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-white/60 hover:text-[#EE4275] transition-colors duration-200 text-xs flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#EE4275] transition-colors"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect With Us - Immediately after Support with no gap */}
            <div className="mt-0 pt-0">
              <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
                Connect With Us
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#EE4275] to-transparent"></span>
              </h3>
              
              {/* Social Links - Beauty Theme */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { icon: <FaFacebookF />, href: companyInfo.social.facebook, label: 'Facebook' },
                  { icon: <FaInstagram />, href: companyInfo.social.instagram, label: 'Instagram' },
                  { icon: <FaYoutube />, href: companyInfo.social.youtube, label: 'YouTube' },
                  { icon: <FaPinterestP />, href: companyInfo.social.pinterest, label: 'Pinterest' },
                  { icon: <FaTiktok />, href: companyInfo.social.tiktok, label: 'TikTok' },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#EE4275]/20 transition-all duration-300 group"
                    whileHover={{ y: -1 }}
                    title={social.label}
                  >
                    <span className="text-white/70 group-hover:text-[#EE4275] transition-colors text-xs">
                      {social.icon}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 4: Contact Us (Desktop) */}
          <div className="hidden lg:block">
            <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#EE4275] to-transparent"></span>
            </h3>
            
            <div className="space-y-2">
              <motion.a 
                href={`https://maps.google.com/?q=${encodeURIComponent(companyInfo.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-white/70 hover:text-[#EE4275] transition-colors group text-xs"
                whileHover={{ x: 2 }}
              >
                <div className="w-5 h-5 rounded-lg bg-[#EE4275]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#EE4275]/30 transition-colors">
                  <FaMapMarkerAlt className="text-[#EE4275] text-xs" />
                </div>
                <span className="text-xs leading-tight">{companyInfo.address}</span>
              </motion.a>
              
              <motion.a 
                href={`tel:${companyInfo.phone}`}
                className="flex items-center gap-2 text-white/70 hover:text-[#EE4275] transition-colors group text-xs"
                whileHover={{ x: 2 }}
              >
                <div className="w-5 h-5 rounded-lg bg-[#EE4275]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#EE4275]/30 transition-colors">
                  <FaPhone className="text-[#EE4275] text-xs" />
                </div>
                <span className="text-xs">{companyInfo.phone}</span>
              </motion.a>
              
              <motion.button 
                onClick={() => openGmail(companyInfo.email)}
                className="flex items-center gap-2 text-white/70 hover:text-[#EE4275] transition-colors group w-full text-left text-xs"
                whileHover={{ x: 2 }}
              >
                <div className="w-5 h-5 rounded-lg bg-[#EE4275]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#EE4275]/30 transition-colors">
                  <FaEnvelope className="text-[#EE4275] text-xs" />
                </div>
                <span className="text-xs">{companyInfo.email}</span>
              </motion.button>
              
              <div className="flex items-start gap-2 text-white/70 text-xs">
                <div className="w-5 h-5 rounded-lg bg-[#EE4275]/20 flex items-center justify-center flex-shrink-0">
                  <FaClock className="text-[#EE4275] text-xs" />
                </div>
                <span className="text-xs leading-tight">{companyInfo.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - More compact */}
        <div className="pt-3 mt-1 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-2">
            <p className="text-white/40 text-xs">
              © {currentYear} <span className="text-[#EE4275] font-medium">Beauty Bucket</span>. All rights reserved.
            </p>
            
            {/* Trust Badges - Beauty Theme */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="text-white/40 text-xs">Secure:</span>
              <div className="flex gap-1 flex-wrap justify-center">
                <div className="px-1.5 py-0.5 bg-white/10 rounded text-[9px] font-medium text-white/60 border border-white/20 flex items-center gap-1">
                  <FaTruck className="text-[#EE4275]" /> Free Shipping ৳3000+
                </div>
                <div className="px-1.5 py-0.5 bg-white/10 rounded text-[9px] font-medium text-white/60 border border-white/20 flex items-center gap-1">
                  <FaShieldAlt className="text-[#FF6B9D]" /> Premium Quality
                </div>
                <div className="px-1.5 py-0.5 bg-white/10 rounded text-[9px] font-medium text-white/60 border border-white/20 flex items-center gap-1">
                  <GiLipstick className="text-[#EE4275]" /> Beauty Essentials
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}