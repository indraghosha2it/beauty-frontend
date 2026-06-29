


// 'use client';

// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
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
//     <footer className="relative text-white overflow-hidden" style={{ backgroundColor: '#1A0E14' }}>
//       {/* Top Gradient Bar - Pink Beauty Theme */}
//       <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#EE4275] via-[#FF6B9D] to-[#EE4275]"></div>
      
//       {/* Decorative Pattern Overlay - Pink Theme */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute top-0 left-0 w-64 h-64 bg-[#EE4275] rounded-full filter blur-3xl"></div>
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FF6B9D] rounded-full filter blur-3xl"></div>
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#FFD2DB] rounded-full filter blur-3xl"></div>
//       </div>
      
//       {/* Main Footer - Reduced padding for smaller height */}
//       <div className="container mx-auto px-4 py-6 lg:py-5 relative z-10">
        
//         {/* Main Grid - 4 Columns Layout for large, custom stack for mobile */}
//         <div className="lg:grid lg:grid-cols-4 lg:gap-8 flex flex-col space-y-6 lg:space-y-0 mb-2">
          
//           {/* Row 1 on Mobile: Column 1 - Company Info (full width) */}
//           <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full">
//             <div className="flex flex-col items-center lg:items-start gap-1 mb-2">
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#EE4275] to-[#FF6B9D] flex items-center justify-center shadow-lg shadow-[#EE4275]/30">
//                   <GiLipstick className="text-white text-sm" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-bold bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] bg-clip-text text-transparent">
//                     {companyInfo.name}
//                   </h2>
//                 </div>
//               </div>
//             </div>
            
//             <p className="text-white/70 text-xs mb-3 leading-relaxed max-w-xs">
//               {companyInfo.description}
//             </p>

//             {/* Trust Badges - Beauty Theme */}
//             <div className="flex flex-wrap gap-1.5 mb-2 justify-center lg:justify-start">
//               <div className="flex items-center gap-1 bg-white/10 rounded-full px-3 py-1.5 border border-white/20">
//                 <HiOutlineBadgeCheck className="text-[#EE4275] text-xs" />
//                 <span className="text-xs font-medium text-white/80">100% Authentic</span>
//               </div>
//               <div className="flex items-center gap-1 bg-white/10 rounded-full px-3 py-1.5 border border-white/20">
//                 <FaShieldAlt className="text-[#FF6B9D] text-xs" />
//                 <span className="text-xs font-medium text-white/80">Premium Quality</span>
//               </div>
//               <div className="flex items-center gap-1 bg-white/10 rounded-full px-3 py-1.5 border border-white/20">
//                 <IoIosFlash className="text-[#EE4275] text-xs" />
//                 <span className="text-xs font-medium text-white/80">Fast Delivery</span>
//               </div>
//             </div>
//           </div>

//           {/* Row 2 on Mobile: Two columns - Quick Links (left) & Support (right) */}
//           <div className="grid grid-cols-2 gap-4 lg:hidden w-full">
//             {/* Quick Links - Left column on mobile */}
//             <div>
//               <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
//                 Quick Links
//                 <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#EE4275] to-transparent"></span>
//               </h3>
//               <ul className="space-y-2">
//                 {quickLinks.map((link) => (
//                   <li key={link.name}>
//                     <Link 
//                       href={link.href}
//                       className="text-white/60 hover:text-[#EE4275] transition-colors duration-200 text-xs flex items-center gap-1.5 group"
//                     >
//                       <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#EE4275] transition-colors"></span>
//                       {link.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Support - Right column on mobile */}
//             <div>
//               <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
//                 Support
//                 <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#EE4275] to-transparent"></span>
//               </h3>
//               <ul className="space-y-2">
//                 {supportLinks.map((link) => (
//                   <li key={link.name}>
//                     <Link 
//                       href={link.href}
//                       className="text-white/60 hover:text-[#EE4275] transition-colors duration-200 text-xs flex items-center gap-1.5 group"
//                     >
//                       <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#EE4275] transition-colors"></span>
//                       {link.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* Row 3 on Mobile: Contact Us (full width) */}
//           <div className="lg:hidden w-full">
//             <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
//               Contact Us
//               <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#EE4275] to-transparent"></span>
//             </h3>
            
//             <div className="space-y-2">
//               <motion.a 
//                 href={`https://maps.google.com/?q=${encodeURIComponent(companyInfo.address)}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-start gap-2 text-white/70 hover:text-[#EE4275] transition-colors group text-xs"
//                 whileHover={{ x: 2 }}
//               >
//                 <div className="w-5 h-5 rounded-lg bg-[#EE4275]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#EE4275]/30 transition-colors">
//                   <FaMapMarkerAlt className="text-[#EE4275] text-xs" />
//                 </div>
//                 <span className="text-xs leading-tight">{companyInfo.address}</span>
//               </motion.a>
              
//               <motion.a 
//                 href={`tel:${companyInfo.phone}`}
//                 className="flex items-center gap-2 text-white/70 hover:text-[#EE4275] transition-colors group text-xs"
//                 whileHover={{ x: 2 }}
//               >
//                 <div className="w-5 h-5 rounded-lg bg-[#EE4275]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#EE4275]/30 transition-colors">
//                   <FaPhone className="text-[#EE4275] text-xs" />
//                 </div>
//                 <span className="text-xs">{companyInfo.phone}</span>
//               </motion.a>
              
//               <motion.button 
//                 onClick={() => openGmail(companyInfo.email)}
//                 className="flex items-center gap-2 text-white/70 hover:text-[#EE4275] transition-colors group w-full text-left text-xs"
//                 whileHover={{ x: 2 }}
//               >
//                 <div className="w-5 h-5 rounded-lg bg-[#EE4275]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#EE4275]/30 transition-colors">
//                   <FaEnvelope className="text-[#EE4275] text-xs" />
//                 </div>
//                 <span className="text-xs">{companyInfo.email}</span>
//               </motion.button>
              
//               <div className="flex items-start gap-2 text-white/70 text-xs">
//                 <div className="w-5 h-5 rounded-lg bg-[#EE4275]/20 flex items-center justify-center flex-shrink-0">
//                   <FaClock className="text-[#EE4275] text-xs" />
//                 </div>
//                 <span className="text-xs leading-tight">{companyInfo.hours}</span>
//               </div>
//             </div>
//           </div>

//           {/* Row 4 on Mobile: Connect With Us (full width) */}
//           <div className="lg:hidden w-full">
//             <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
//               Connect With Us
//               <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#EE4275] to-transparent"></span>
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
//                   className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#EE4275]/20 transition-all duration-300 group"
//                   whileHover={{ y: -1 }}
//                   title={social.label}
//                 >
//                   <span className="text-white/70 group-hover:text-[#EE4275] transition-colors text-xs">
//                     {social.icon}
//                   </span>
//                 </motion.a>
//               ))}
//             </div>
//           </div>

//           {/* Desktop Layout - Large screens */}
//           {/* Column 2: Quick Links (Desktop) */}
//           <div className="hidden lg:block">
//             <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
//               Quick Links
//               <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#EE4275] to-transparent"></span>
//             </h3>
//             <ul className="space-y-2">
//               {quickLinks.map((link) => (
//                 <li key={link.name}>
//                   <Link 
//                     href={link.href}
//                     className="text-white/60 hover:text-[#EE4275] transition-colors duration-200 text-xs flex items-center gap-1.5 group"
//                   >
//                     <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#EE4275] transition-colors"></span>
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
//               <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
//                 Support
//                 <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#EE4275] to-transparent"></span>
//               </h3>
//               <ul className="space-y-2">
//                 {supportLinks.map((link) => (
//                   <li key={link.name}>
//                     <Link 
//                       href={link.href}
//                       className="text-white/60 hover:text-[#EE4275] transition-colors duration-200 text-xs flex items-center gap-1.5 group"
//                     >
//                       <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#EE4275] transition-colors"></span>
//                       {link.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Connect With Us - Immediately after Support with no gap */}
//             <div className="mt-0 pt-0">
//               <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
//                 Connect With Us
//                 <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#EE4275] to-transparent"></span>
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
//                     className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#EE4275]/20 transition-all duration-300 group"
//                     whileHover={{ y: -1 }}
//                     title={social.label}
//                   >
//                     <span className="text-white/70 group-hover:text-[#EE4275] transition-colors text-xs">
//                       {social.icon}
//                     </span>
//                   </motion.a>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Column 4: Contact Us (Desktop) */}
//           <div className="hidden lg:block">
//             <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
//               Contact Us
//               <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#EE4275] to-transparent"></span>
//             </h3>
            
//             <div className="space-y-2">
//               <motion.a 
//                 href={`https://maps.google.com/?q=${encodeURIComponent(companyInfo.address)}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-start gap-2 text-white/70 hover:text-[#EE4275] transition-colors group text-xs"
//                 whileHover={{ x: 2 }}
//               >
//                 <div className="w-5 h-5 rounded-lg bg-[#EE4275]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#EE4275]/30 transition-colors">
//                   <FaMapMarkerAlt className="text-[#EE4275] text-xs" />
//                 </div>
//                 <span className="text-xs leading-tight">{companyInfo.address}</span>
//               </motion.a>
              
//               <motion.a 
//                 href={`tel:${companyInfo.phone}`}
//                 className="flex items-center gap-2 text-white/70 hover:text-[#EE4275] transition-colors group text-xs"
//                 whileHover={{ x: 2 }}
//               >
//                 <div className="w-5 h-5 rounded-lg bg-[#EE4275]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#EE4275]/30 transition-colors">
//                   <FaPhone className="text-[#EE4275] text-xs" />
//                 </div>
//                 <span className="text-xs">{companyInfo.phone}</span>
//               </motion.a>
              
//               <motion.button 
//                 onClick={() => openGmail(companyInfo.email)}
//                 className="flex items-center gap-2 text-white/70 hover:text-[#EE4275] transition-colors group w-full text-left text-xs"
//                 whileHover={{ x: 2 }}
//               >
//                 <div className="w-5 h-5 rounded-lg bg-[#EE4275]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#EE4275]/30 transition-colors">
//                   <FaEnvelope className="text-[#EE4275] text-xs" />
//                 </div>
//                 <span className="text-xs">{companyInfo.email}</span>
//               </motion.button>
              
//               <div className="flex items-start gap-2 text-white/70 text-xs">
//                 <div className="w-5 h-5 rounded-lg bg-[#EE4275]/20 flex items-center justify-center flex-shrink-0">
//                   <FaClock className="text-[#EE4275] text-xs" />
//                 </div>
//                 <span className="text-xs leading-tight">{companyInfo.hours}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar - More compact */}
//         <div className="pt-3 mt-1 border-t border-white/10">
//           <div className="flex flex-col lg:flex-row justify-between items-center gap-2">
//             <p className="text-white/40 text-xs">
//               © {currentYear} <span className="text-[#EE4275] font-medium">Beauty Bucket</span>. All rights reserved.
//             </p>
            
//             {/* Trust Badges - Beauty Theme */}
//             <div className="flex items-center gap-2 flex-wrap justify-center">
//               <span className="text-white/40 text-xs">Secure:</span>
//               <div className="flex gap-1 flex-wrap justify-center">
//                 <div className="px-1.5 py-0.5 bg-white/10 rounded text-[9px] font-medium text-white/60 border border-white/20 flex items-center gap-1">
//                   <FaTruck className="text-[#EE4275]" /> Free Shipping ৳3000+
//                 </div>
//                 <div className="px-1.5 py-0.5 bg-white/10 rounded text-[9px] font-medium text-white/60 border border-white/20 flex items-center gap-1">
//                   <FaShieldAlt className="text-[#FF6B9D]" /> Premium Quality
//                 </div>
//                 <div className="px-1.5 py-0.5 bg-white/10 rounded text-[9px] font-medium text-white/60 border border-white/20 flex items-center gap-1">
//                   <GiLipstick className="text-[#EE4275]" /> Beauty Essentials
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
  FaTiktok,
  FaHeart
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
    { name: 'Register', href: '/register' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
  ];

  const openGmail = (email) => {
    window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
  };

  return (
    <footer className="relative text-white overflow-hidden">
      {/* Background Image with Lighter Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/footer.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        {/* Lighter Gradient Overlay - Beauty Theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A0E14]/70 via-[#1A0E14]/60 to-[#1A0E14]/75"></div>
        {/* Very Light Pink Glow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#EE4275]/5 via-transparent to-[#FF6B9D]/5"></div>
        {/* Subtle Decorative Blur Circles */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#EE4275]/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#FF6B9D]/5 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FFD2DB]/3 rounded-full filter blur-3xl"></div>
      </div>
      
      {/* Top Pink Accent Line */}
      <div className="relative z-10 w-full h-0.5 bg-gradient-to-r from-[#EE4275] via-[#FF6B9D] to-[#EE4275]"></div>
      
      {/* Main Footer */}
      <div className="relative z-10 container mx-auto px-4 py-10 lg:py-12">
        
        {/* Main Grid - 4 Columns Desktop, 2 Columns Mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
          
          {/* Column 1: Brand Info - Full width on mobile */}
        <div className="col-span-2 lg:col-span-1">
  {/* Logo Image instead of Text */}
<div className="flex items-center gap-2">
  <div>
    {/* Logo Image with proper dimensions */}
    <img 
      src="/images/logo3.png" 
      alt="BeautyBucket Logo" 
      className="w-auto object-contain"
      style={{ height: '60px', width: 'auto' }}
    />
  </div>
</div>
  
  <p className="text-white text-sm leading-relaxed mb-4 max-w-xs">
    {companyInfo.description}
  </p>

  {/* Social Links - Beauty Theme */}
  <div className="flex items-center gap-2">
    <span className="text-xs text-white font-medium mr-1">Follow us:</span>
    {[
      { icon: <FaFacebookF size={14} />, href: companyInfo.social.facebook, label: 'Facebook' },
      { icon: <FaInstagram size={14} />, href: companyInfo.social.instagram, label: 'Instagram' },
      { icon: <FaYoutube size={14} />, href: companyInfo.social.youtube, label: 'YouTube' },
      { icon: <FaPinterestP size={14} />, href: companyInfo.social.pinterest, label: 'Pinterest' },
      { icon: <FaTiktok size={14} />, href: companyInfo.social.tiktok, label: 'TikTok' },
    ].map((social, index) => (
      <motion.a
        key={index}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full bg-[#EE4275]   border border-white/20  flex items-center justify-center hover:bg-[#EE4275] hover:text-white hover:border-[#EE4275] transition-all duration-300 group"
        whileHover={{ y: -2 }}
        title={social.label}
      >
        <span className="text-white group-hover:text-white transition-colors">
          {social.icon}
        </span>
      </motion.a>
    ))}
  </div>
</div>

          {/* Column 2: Quick Links - Company */}
          <div className="col-span-1">
            <h3 className="text-sm font-bold text-white mb-4 font-bold relative inline-block">
              Company
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#EE4275] to-transparent"></span>
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-white hover:text-[#EE4275] transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#EE4275] transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="col-span-1">
            <h3 className="text-sm font-bold text-white mb-4 relative inline-block">
              Support
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#EE4275] to-transparent"></span>
            </h3>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-white hover:text-[#EE4275] transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-[#EE4275] transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-sm font-bold text-white mb-4 relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#EE4275] to-transparent"></span>
            </h3>
            
            <div className="space-y-3">
              <motion.a 
                href={`https://maps.google.com/?q=${encodeURIComponent(companyInfo.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-white hover:text-[#EE4275] transition-colors group text-sm"
                whileHover={{ x: 3 }}
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#EE4275]/20 transition-colors">
                  <FaMapMarkerAlt className="text-[#EE4275] text-sm" />
                </div>
                <span className="text-sm leading-tight">{companyInfo.address}</span>
              </motion.a>
              
              <motion.a 
                href={`tel:${companyInfo.phone}`}
                className="flex items-center gap-3 text-white hover:text-[#EE4275] transition-colors group text-sm"
                whileHover={{ x: 3 }}
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#EE4275]/20 transition-colors">
                  <FaPhone className="text-[#EE4275] text-sm" />
                </div>
                <span className="text-sm">{companyInfo.phone}</span>
              </motion.a>
              
              <motion.button 
                onClick={() => openGmail(companyInfo.email)}
                className="flex items-center gap-3 text-white hover:text-[#EE4275] transition-colors group w-full text-left text-sm"
                whileHover={{ x: 3 }}
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#EE4275]/20 transition-colors">
                  <FaEnvelope className="text-[#EE4275] text-sm" />
                </div>
                <span className="text-sm">{companyInfo.email}</span>
              </motion.button>
              
              <div className="flex items-start gap-3 text-white text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                  <FaClock className="text-[#EE4275] text-sm" />
                </div>
                <span className="text-sm leading-tight">{companyInfo.hours}</span>
              </div>
            </div>
          </div>
        </div>


        {/* Bottom Bar */}
        <div className="pt-4 mt-4 -mb-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-white/40 text-xs">
              © {currentYear} <span className="text-[#EE4275] font-medium">BeautyBucket</span>. All rights reserved.
            </p>
            
            <div className="flex items-center gap-2">
              <span className="text-white/40 text-xs">Made with</span>
              <FaHeart className="text-[#EE4275] text-xs" />
              <span className="text-white/40 text-xs">for beauty lovers</span>
            </div>
            
            {/* Payment Methods */}
            <div className="flex items-center gap-2">
              <span className="text-white/40 text-xs">Secure payments:</span>
              <div className="flex gap-1.5">
                <div className="px-2 py-0.5 bg-white/10 rounded border border-white/20 text-[10px] text-white/60">Visa</div>
                <div className="px-2 py-0.5 bg-white/10 rounded border border-white/20 text-[10px] text-white/60">Mastercard</div>
                <div className="px-2 py-0.5 bg-white/10 rounded border border-white/20 text-[10px] text-white/60">bKash</div>
                <div className="px-2 py-0.5 bg-white/10 rounded border border-white/20 text-[10px] text-white/60">Nagad</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}