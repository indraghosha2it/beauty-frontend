// // app/terms/page.jsx
// 'use client';

// import { motion, useInView } from 'framer-motion';
// import { useRef } from 'react';
// import Link from 'next/link';
// import {
//   Shield,
//   Mail,
//   Phone,
//   Clock,
//   ArrowRight,
//   Sparkles,
//   FileText,
//   CheckCircle,
//   Users,
//   ShoppingBag,
//   Truck,
//   RefreshCw,
//   AlertCircle,
//   Scale,
//   Gavel,
//   Package,
//   CreditCard,
//   MapPin,
//   Globe
// } from 'lucide-react';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';

// export default function TermsPage() {
//   // Use framer-motion's useInView properly
//   const heroRef = useRef(null);
//   const heroInView = useInView(heroRef, { once: true, amount: 0.2 });

//   const contentRef = useRef(null);
//   const contentInView = useInView(contentRef, { once: true, amount: 0.1 });

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.12,
//         delayChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.4, ease: "easeOut" }
//     }
//   };

//   const termsSections = [
//     {
//       icon: <Scale className="w-5 h-5 md:w-6 md:h-6" />,
//       title: "Acceptance of Terms",
//       items: [
//         "By using Smart Gadget's website and services, you agree to these Terms & Conditions",
//         "If you do not agree with any part of these terms, please do not use our platform",
//         "We reserve the right to update these terms at any time without prior notice",
//         "Continued use of our services constitutes acceptance of any changes"
//       ]
//     },
//     {
//       icon: <Users className="w-5 h-5 md:w-6 md:h-6" />,
//       title: "Account Registration",
//       items: [
//         "You must be at least 18 years old to create an account or make purchases",
//         "Provide accurate, complete, and up-to-date registration information",
//         "You are responsible for maintaining the confidentiality of your account credentials",
//         "Notify us immediately of any unauthorized use of your account"
//       ]
//     },
//     {
//       icon: <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />,
//       title: "Products & Pricing",
//       items: [
//         "We strive to display accurate product descriptions, images, and specifications",
//         "Prices are listed in Bangladeshi Taka (BDT) and include applicable VAT",
//         "We reserve the right to modify prices, products, or availability without notice",
//         "In case of pricing errors, we may cancel or refuse orders at our discretion"
//       ]
//     },
//     {
//       icon: <CreditCard className="w-5 h-5 md:w-6 md:h-6" />,
//       title: "Orders & Payment",
//       items: [
//         "All orders are subject to acceptance and product availability",
//         "We accept bKash, Nagad, credit/debit cards, and cash on delivery",
//         "Payment must be received in full before order processing begins",
//         "We reserve the right to cancel orders suspected of fraud or unauthorized activity"
//       ]
//     },
//     {
//       icon: <Truck className="w-5 h-5 md:w-6 md:h-6" />,
//       title: "Shipping & Delivery",
//       items: [
//         "We offer delivery services across all districts of Bangladesh",
//         "Estimated delivery times are provided as guidelines and are not guaranteed",
//         "Risk of loss or damage passes to you upon delivery of the products",
//         "Please inspect your order immediately and report any issues within 48 hours"
//       ]
//     },
//     {
//       icon: <RefreshCw className="w-5 h-5 md:w-6 md:h-6" />,
//       title: "Returns & Refunds",
//       items: [
//         "You may return most items within 7 days of delivery for a full refund or exchange",
//         "Items must be unused, in original packaging, and with proof of purchase",
//         "Certain items (e.g., opened electronics, personalized items) are non-returnable",
//         "Refunds will be processed within 5-7 business days of receiving returned items"
//       ]
//     },
//     {
//       icon: <Shield className="w-5 h-5 md:w-6 md:h-6" />,
//       title: "Intellectual Property",
//       items: [
//         "All content on this site (text, graphics, logos, images, software) is our property",
//         "Content is protected by Bangladesh and international copyright laws",
//         "You may not reproduce, distribute, or create derivative works without permission",
//         "Trademarks and service marks displayed on our site are our registered property"
//       ]
//     },
//     {
//       icon: <AlertCircle className="w-5 h-5 md:w-6 md:h-6" />,
//       title: "Limitation of Liability",
//       items: [
//         "Smart Gadget is not liable for indirect, incidental, or consequential damages",
//         "Our total liability is limited to the purchase price of the product in question",
//         "We are not responsible for delays or failures caused by circumstances beyond our control",
//         "Some jurisdictions do not allow limitations on liability, so this may not apply to you"
//       ]
//     },
//     {
//       icon: <Gavel className="w-5 h-5 md:w-6 md:h-6" />,
//       title: "Governing Law & Disputes",
//       items: [
//         "These terms are governed by the laws of the People's Republic of Bangladesh",
//         "Any disputes shall be subject to the exclusive jurisdiction of courts in Dhaka",
//         "Disputes may first be attempted to be resolved through informal negotiations",
//         "If mediation fails, disputes will be settled through binding arbitration"
//       ]
//     }
//   ];

//   const quickInfo = [
//     {
//       icon: <Mail className="w-4 h-4 md:w-5 md:h-5" />,
//       label: "Legal Email",
//       value: "legal@smartgadget.com",
//       link: "mailto:legal@smartgadget.com"
//     },
//     {
//       icon: <Phone className="w-4 h-4 md:w-5 md:h-5" />,
//       label: "Legal Hotline",
//       value: "+880 1871-733306",
//       link: "tel:+8801871733306"
//     },
//     {
//       icon: <MapPin className="w-4 h-4 md:w-5 md:h-5" />,
//       label: "Registered Office",
//       value: "House #12, Road #5, Sector #10, Uttara, Dhaka-1230",
//       link: "#"
//     }
//   ];

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-white">
//         {/* ============================================
//         HERO SECTION
//         ============================================ */}
//         <section 
//           ref={heroRef}
//           className="relative min-h-[220px] sm:min-h-[280px] md:min-h-[300px] overflow-hidden"
//         >
//           <div 
//             className="absolute inset-0"
//             style={{
//               backgroundImage: 'url("https://i.ibb.co.com/XkF8TGQZ/jn.png")',
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',
//             }}
//           />
          
//           <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/75 to-black/80" />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
//           <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10" />

//           <div className="absolute -top-20 -right-20 w-48 h-48 md:w-64 md:h-64 bg-blue-600/15 rounded-full blur-3xl" />
//           <div className="absolute -bottom-20 -left-20 w-48 h-48 md:w-64 md:h-64 bg-purple-600/15 rounded-full blur-3xl" />

//           <div className="container mx-auto px-4 max-w-7xl relative z-10 h-full flex items-center">
//             <motion.div
//               variants={containerVariants}
//               initial="hidden"
//               animate={heroInView ? "visible" : "hidden"}
//               className="w-full max-w-4xl mx-auto text-center py-6 md:py-8"
//             >
//               <motion.div 
//                 variants={itemVariants} 
//                 className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 md:px-4 md:py-1.5 mb-3 md:mb-4 border border-white/10"
//               >
//                 <FileText className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
//                 <span className="text-[10px] md:text-xs lg:text-sm font-medium text-gray-300">Terms & Conditions</span>
//               </motion.div>

//               <motion.h1 
//                 variants={itemVariants}
//                 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 md:mb-3 leading-tight"
//               >
//                 <span className="text-white">Terms &</span>
//                 <span className="block text-transparent bg-clip-text bg-blue-600">
//                   Conditions
//                 </span>
//               </motion.h1>

//               <motion.p 
//                 variants={itemVariants}
//                 className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed px-2"
//               >
//                 Please read these terms carefully before using our website and services. 
//                 By accessing our platform, you agree to be bound by these terms.
//               </motion.p>

//               <motion.div 
//                 variants={itemVariants}
//                 className="flex flex-wrap gap-2.5 sm:gap-3 md:gap-4 justify-center mt-4 md:mt-6"
//               >
//                 <a href="#terms-policy">
//                   <button className="group bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-5 sm:py-2.5 md:px-6 md:py-3 py-1.5 rounded-full font-semibold transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg shadow-blue-600/30 text-[10px] sm:text-sm md:text-base whitespace-nowrap">
//                     Read Full Policy
//                     <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
//                   </button>
//                 </a>
//                 <Link href="/contact">
//                   <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white px-3 sm:px-5 sm:py-2.5 md:px-6 md:py-3 py-1.5 rounded-full font-semibold transition-all text-[10px] sm:text-sm md:text-base whitespace-nowrap">
//                     Contact Support
//                   </button>
//                 </Link>
//               </motion.div>
//             </motion.div>
//           </div>
//         </section>

      

//         {/* ============================================
//         TERMS & CONDITIONS CONTENT
//         ============================================ */}
//         <section id="terms-policy" className="py-10 md:py-14 lg:py-20 bg-gray-50">
//           <div className="container mx-auto px-4 max-w-7xl">
//             <motion.div
//               ref={contentRef}
//               initial={{ opacity: 0, y: 30 }}
//               animate={contentInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.5 }}
//               className="text-center mb-8 md:mb-12"
//             >
//               <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-3 py-1 md:px-4 md:py-1.5 mb-2 md:mb-4">
//                 <Gavel className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600" />
//                 <span className="text-[10px] md:text-sm font-medium text-blue-700">Legal Agreement</span>
//               </div>
//               <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
//                 Our Terms & Conditions
//               </h2>
//               <p className="text-gray-500 text-xs sm:text-sm md:text-base mt-1.5 md:mt-2 max-w-2xl mx-auto px-4">
//                 Last updated: June 18, 2026 — These terms govern your use of our website and services.
//               </p>
//             </motion.div>

//             <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
//               {termsSections.map((section, idx) => (
//                 <motion.div
//                   key={idx}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={contentInView ? { opacity: 1, y: 0 } : {}}
//                   transition={{ duration: 0.4, delay: idx * 0.06 }}
//                   className="group bg-white rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
//                 >
//                   <div className="flex items-start gap-3 md:gap-4">
//                     <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
//                       <div className="text-blue-600 group-hover:scale-110 transition-transform">
//                         {section.icon}
//                       </div>
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-2 md:mb-3">
//                         {section.title}
//                       </h3>
//                       <ul className="space-y-1.5 md:space-y-2">
//                         {section.items.map((item, itemIdx) => (
//                           <li key={itemIdx} className="flex items-start gap-2 text-xs sm:text-sm md:text-base text-gray-600">
//                             <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-500 flex-shrink-0 mt-0.5" />
//                             <span className="leading-relaxed">{item}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Additional Important Clauses */}
//             <div className="mt-8 md:mt-12 grid md:grid-cols-2 gap-4 md:gap-6">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={contentInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.5, delay: 0.4 }}
//                 className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10 border border-gray-200 shadow-sm"
//               >
//                 <div className="flex items-start gap-3 md:gap-4">
//                   <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
//                     <Package className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
//                   </div>
//                   <div>
//                     <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-2">
//                       Warranty & Guarantees
//                     </h3>
//                     <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
//                       All products come with manufacturer warranty as specified on the product page. 
//                       Warranty covers manufacturing defects only and does not cover damage from misuse, 
//                       accidents, or unauthorized modifications. Please retain your proof of purchase 
//                       for warranty claims.
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={contentInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.5, delay: 0.45 }}
//                 className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10 border border-gray-200 shadow-sm"
//               >
//                 <div className="flex items-start gap-3 md:gap-4">
//                   <div className="w-10 h-10 md:w-12 md:h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
//                     <Globe className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
//                   </div>
//                   <div>
//                     <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-2">
//                       International Users
//                     </h3>
//                     <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
//                       Smart Gadget is based in Bangladesh. If you are accessing our services from 
//                       outside Bangladesh, you are responsible for compliance with local laws. 
//                       We do not guarantee that our products or services are appropriate or available 
//                       for use in your location.
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>

//             {/* Contact for Disputes */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={contentInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.5, delay: 0.5 }}
//               className="mt-4 md:mt-6 bg-blue-50 rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10 border border-blue-200"
//             >
//               <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//                 <div className="flex items-start gap-3 md:gap-4">
//                   <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
//                     <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
//                   </div>
//                   <div>
//                     <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900">
//                       Have Questions or Disputes?
//                     </h3>
//                     <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
//                       We aim to resolve all issues fairly and promptly. Please contact our legal team 
//                       for any concerns regarding these terms or your rights as a customer.
//                     </p>
//                   </div>
//                 </div>
//                 <Link href="/contact">
//                   <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 md:px-6 md:py-2.5 rounded-full font-semibold text-xs sm:text-sm md:text-base transition-all shadow-lg shadow-blue-600/30 whitespace-nowrap flex items-center gap-2">
//                     Contact Legal Team
//                     <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
//                   </button>
//                 </Link>
//               </div>
//             </motion.div>
//           </div>
//         </section>

//         {/* ============================================
//         CTA BANNER
//         ============================================ */}
//         <section className="relative py-10 md:py-14 lg:py-20 overflow-hidden">
//           <div 
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `url("https://i.ibb.co.com/0RHQ0thP/jh.png")`,
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',
//               backgroundRepeat: 'no-repeat'
//             }}
//           />
//           <div className="absolute -top-20 -right-20 w-48 h-48 md:w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" />
//           <div className="absolute -bottom-20 -left-20 w-48 h-48 md:w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />
//           <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

//           <div className="container mx-auto px-4 max-w-7xl text-center relative z-10">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 md:px-4 md:py-1.5 mb-3 md:mb-4 border border-white/10">
//                 <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400" />
//                 <span className="text-[10px] md:text-xs font-medium text-gray-300">Agreement</span>
//               </div>
              
//               <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 md:mb-4 leading-tight">
//                 Ready to Shop with Confidence?
//               </h2>
              
//               <p className="text-gray-200 text-xs sm:text-sm md:text-base mb-5 md:mb-8 max-w-2xl mx-auto px-4">
//                 Browse our collection of premium gadgets and enjoy a secure shopping experience with clear terms.
//               </p>
              
//               <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
//                 <Link href="/products">
//                   <button className="group bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-full font-semibold inline-flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all text-xs sm:text-sm md:text-base">
//                     Explore Products
//                     <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
//                   </button>
//                 </Link>
//                 <Link href="/privacy">
//                   <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white px-5 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-full font-semibold inline-flex items-center gap-2 transition-all text-xs sm:text-sm md:text-base">
//                     View Privacy Policy
//                   </button>
//                 </Link>
//               </div>
//             </motion.div>
//           </div>
//         </section>
//       </div>
//       <Footer />
//     </>
//   );
// }


// app/terms/page.jsx
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import {
  Shield,
  Mail,
  Phone,
  Clock,
  ArrowRight,
  Sparkles,
  FileText,
  CheckCircle,
  Users,
  ShoppingBag,
  Truck,
  RefreshCw,
  AlertCircle,
  Scale,
  Gavel,
  Package,
  CreditCard,
  MapPin,
  Globe
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function TermsPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });

  const contentRef = useRef(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const termsSections = [
    {
      icon: <Scale className="w-4 h-4 md:w-6 md:h-6" />,
      title: "Acceptance of Terms",
      items: [
        "By using Smart Gadget's website and services, you agree to these Terms & Conditions",
        "If you do not agree with any part of these terms, please do not use our platform",
        "We reserve the right to update these terms at any time without prior notice",
        "Continued use of our services constitutes acceptance of any changes"
      ]
    },
    {
      icon: <Users className="w-4 h-4 md:w-6 md:h-6" />,
      title: "Account Registration",
      items: [
        "You must be at least 18 years old to create an account or make purchases",
        "Provide accurate, complete, and up-to-date registration information",
        "You are responsible for maintaining the confidentiality of your account credentials",
        "Notify us immediately of any unauthorized use of your account"
      ]
    },
    {
      icon: <ShoppingBag className="w-4 h-4 md:w-6 md:h-6" />,
      title: "Products & Pricing",
      items: [
        "We strive to display accurate product descriptions, images, and specifications",
        "Prices are listed in Bangladeshi Taka (BDT) and include applicable VAT",
        "We reserve the right to modify prices, products, or availability without notice",
        "In case of pricing errors, we may cancel or refuse orders at our discretion"
      ]
    },
    {
      icon: <CreditCard className="w-4 h-4 md:w-6 md:h-6" />,
      title: "Orders & Payment",
      items: [
        "All orders are subject to acceptance and product availability",
        "We accept bKash, Nagad, credit/debit cards, and cash on delivery",
        "Payment must be received in full before order processing begins",
        "We reserve the right to cancel orders suspected of fraud or unauthorized activity"
      ]
    },
    {
      icon: <Truck className="w-4 h-4 md:w-6 md:h-6" />,
      title: "Shipping & Delivery",
      items: [
        "We offer delivery services across all districts of Bangladesh",
        "Estimated delivery times are provided as guidelines and are not guaranteed",
        "Risk of loss or damage passes to you upon delivery of the products",
        "Please inspect your order immediately and report any issues within 48 hours"
      ]
    },
    {
      icon: <RefreshCw className="w-4 h-4 md:w-6 md:h-6" />,
      title: "Returns & Refunds",
      items: [
        "You may return most items within 7 days of delivery for a full refund or exchange",
        "Items must be unused, in original packaging, and with proof of purchase",
        "Certain items (e.g., opened electronics, personalized items) are non-returnable",
        "Refunds will be processed within 5-7 business days of receiving returned items"
      ]
    },
    {
      icon: <Shield className="w-4 h-4 md:w-6 md:h-6" />,
      title: "Intellectual Property",
      items: [
        "All content on this site (text, graphics, logos, images, software) is our property",
        "Content is protected by Bangladesh and international copyright laws",
        "You may not reproduce, distribute, or create derivative works without permission",
        "Trademarks and service marks displayed on our site are our registered property"
      ]
    },
    {
      icon: <AlertCircle className="w-4 h-4 md:w-6 md:h-6" />,
      title: "Limitation of Liability",
      items: [
        "Smart Gadget is not liable for indirect, incidental, or consequential damages",
        "Our total liability is limited to the purchase price of the product in question",
        "We are not responsible for delays or failures caused by circumstances beyond our control",
        "Some jurisdictions do not allow limitations on liability, so this may not apply to you"
      ]
    },
    {
      icon: <Gavel className="w-4 h-4 md:w-6 md:h-6" />,
      title: "Governing Law & Disputes",
      items: [
        "These terms are governed by the laws of the People's Republic of Bangladesh",
        "Any disputes shall be subject to the exclusive jurisdiction of courts in Dhaka",
        "Disputes may first be attempted to be resolved through informal negotiations",
        "If mediation fails, disputes will be settled through binding arbitration"
      ]
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* ============================================
        HERO SECTION - Mobile Optimized
        ============================================ */}
        <section 
          ref={heroRef}
          className="relative min-h-[200px] sm:min-h-[280px] md:min-h-[300px] overflow-hidden"
        >
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'url("https://i.ibb.co.com/XkF8TGQZ/jn.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/75 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10" />

          <div className="absolute -top-20 -right-20 w-36 h-36 md:w-64 md:h-64 bg-blue-600/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-36 h-36 md:w-64 md:h-64 bg-purple-600/15 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 max-w-7xl relative z-10 h-full flex items-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              className="w-full max-w-4xl mx-auto text-center py-4 md:py-8"
            >
              <motion.div 
                variants={itemVariants} 
                className="inline-flex items-center gap-1.5 md:gap-2 bg-white/10 backdrop-blur-sm rounded-full px-2.5 py-1 md:px-4 md:py-1.5 mb-2 md:mb-4 border border-white/10"
              >
                <FileText className="w-2.5 h-2.5 md:w-4 md:h-4 text-blue-400" />
                <span className="text-[8px] md:text-xs lg:text-sm font-medium text-gray-300">Terms & Conditions</span>
              </motion.div>

              <motion.h1 
                variants={itemVariants}
                className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-1.5 md:mb-3 leading-tight"
              >
                <span className="text-white">Terms &</span>
                <span className="block text-transparent bg-clip-text bg-blue-600">
                  Conditions
                </span>
              </motion.h1>

              <motion.p 
                variants={itemVariants}
                className="text-gray-300 text-[10px] sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed px-2"
              >
                Please read these terms carefully before using our website and services. 
                By accessing our platform, you agree to be bound by these terms.
              </motion.p>

              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center mt-3 md:mt-6"
              >
                <a href="#terms-policy">
                  <button className="group bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-5 py-1.5 sm:py-2.5 md:px-6 md:py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg shadow-blue-600/30 text-[9px] sm:text-sm md:text-base whitespace-nowrap">
                    Read Full Policy
                    <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </a>
                <Link href="/contact">
                  <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white px-3 sm:px-5 py-1.5 sm:py-2.5 md:px-6 md:py-3 rounded-full font-semibold transition-all text-[9px] sm:text-sm md:text-base whitespace-nowrap">
                    Contact Support
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ============================================
        TERMS & CONDITIONS CONTENT - Mobile Optimized
        ============================================ */}
        <section id="terms-policy" className="py-6 md:py-14 lg:py-20 bg-gray-50">
          <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
            <motion.div
              ref={contentRef}
              initial={{ opacity: 0, y: 30 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-center mb-6 md:mb-12"
            >
              <div className="inline-flex items-center gap-1.5 md:gap-2 bg-blue-100 rounded-full px-2.5 py-1 md:px-4 md:py-1.5 mb-2 md:mb-4">
                <Gavel className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
                <span className="text-[8px] md:text-sm font-medium text-blue-700">Legal Agreement</span>
              </div>
              <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                Our Terms & Conditions
              </h2>
              <p className="text-gray-500 text-[10px] sm:text-sm md:text-base mt-1.5 md:mt-2 max-w-2xl mx-auto px-4">
                Last updated: June 18, 2026 — These terms govern your use of our website and services.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6">
              {termsSections.map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className="group bg-white rounded-lg md:rounded-2xl p-4 md:p-6 lg:p-8 border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-2.5 md:gap-4">
                    <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                      <div className="text-blue-600 group-hover:scale-110 transition-transform">
                        {section.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm md:text-lg lg:text-xl font-bold text-gray-900 mb-1.5 md:mb-3">
                        {section.title}
                      </h3>
                      <ul className="space-y-1 md:space-y-2">
                        {section.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-1.5 md:gap-2 text-[10px] sm:text-xs md:text-base text-gray-600">
                            <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Important Clauses - Mobile Optimized */}
            <div className="mt-6 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-lg md:rounded-2xl p-4 md:p-8 lg:p-10 border border-gray-200 shadow-sm"
              >
                <div className="flex items-start gap-2.5 md:gap-4">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-purple-50 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                    <Package className="w-4 h-4 md:w-6 md:h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-lg lg:text-xl font-bold text-gray-900 mb-1 md:mb-2">
                      Warranty & Guarantees
                    </h3>
                    <p className="text-[10px] sm:text-xs md:text-base text-gray-600 leading-relaxed">
                      All products come with manufacturer warranty as specified on the product page. 
                      Warranty covers manufacturing defects only and does not cover damage from misuse, 
                      accidents, or unauthorized modifications. Please retain your proof of purchase 
                      for warranty claims.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="bg-white rounded-lg md:rounded-2xl p-4 md:p-8 lg:p-10 border border-gray-200 shadow-sm"
              >
                <div className="flex items-start gap-2.5 md:gap-4">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-green-50 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                    <Globe className="w-4 h-4 md:w-6 md:h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-lg lg:text-xl font-bold text-gray-900 mb-1 md:mb-2">
                      International Users
                    </h3>
                    <p className="text-[10px] sm:text-xs md:text-base text-gray-600 leading-relaxed">
                      Smart Gadget is based in Bangladesh. If you are accessing our services from 
                      outside Bangladesh, you are responsible for compliance with local laws. 
                      We do not guarantee that our products or services are appropriate or available 
                      for use in your location.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact for Disputes - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-4 md:mt-6 bg-blue-50 rounded-lg md:rounded-2xl p-4 md:p-8 lg:p-10 border border-blue-200"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4">
                <div className="flex items-start gap-2.5 md:gap-4 w-full sm:w-auto">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-blue-100 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-4 h-4 md:w-6 md:h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-lg lg:text-xl font-bold text-gray-900">
                      Have Questions or Disputes?
                    </h3>
                    <p className="text-[10px] sm:text-xs md:text-base text-gray-600 leading-relaxed">
                      We aim to resolve all issues fairly and promptly. Please contact our legal team 
                      for any concerns regarding these terms or your rights as a customer.
                    </p>
                  </div>
                </div>
                <Link href="/contact" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 md:px-6 md:py-2.5 rounded-full font-semibold text-xs sm:text-sm md:text-base transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2">
                    Contact Legal Team
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================
        CTA BANNER - Mobile Optimized
        ============================================ */}
        <section className="relative py-8 md:py-14 lg:py-20 overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("https://i.ibb.co.com/0RHQ0thP/jh.png")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <div className="absolute -top-20 -right-20 w-36 h-36 md:w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-36 h-36 md:w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

          <div className="container mx-auto px-4 max-w-7xl text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-1.5 md:gap-2 bg-white/10 backdrop-blur-sm rounded-full px-2.5 py-1 md:px-4 md:py-1.5 mb-2 md:mb-4 border border-white/10">
                <Sparkles className="w-2.5 h-2.5 md:w-4 md:h-4 text-blue-400" />
                <span className="text-[8px] md:text-xs font-medium text-gray-300">Agreement</span>
              </div>
              
              <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-1.5 md:mb-4 leading-tight">
                Ready to Shop with Confidence?
              </h2>
              
              <p className="text-gray-200 text-[10px] sm:text-sm md:text-base mb-4 md:mb-8 max-w-2xl mx-auto px-4">
                Browse our collection of premium gadgets and enjoy a secure shopping experience with clear terms.
              </p>
              
              <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
                <Link href="/products">
                  <button className="group bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-full font-semibold inline-flex items-center gap-1.5 md:gap-2 shadow-lg shadow-blue-600/30 transition-all text-[10px] sm:text-sm md:text-base">
                    Explore Products
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/privacy">
                  <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white px-4 py-1.5 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-full font-semibold inline-flex items-center gap-1.5 md:gap-2 transition-all text-[10px] sm:text-sm md:text-base">
                    View Privacy Policy
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}


