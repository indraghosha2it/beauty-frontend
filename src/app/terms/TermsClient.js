// app/terms/page.js
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { 
  FaShieldAlt, 
  FaCheckCircle, 
  FaArrowRight,
  FaGavel,
  FaFileContract,
  FaUserShield,
  FaCreditCard,
  FaTruck,
  FaShoppingBag,
  FaHands,
  FaClipboardList,
  FaLock,
  FaExclamationTriangle,
  FaScroll,
  FaBalanceScale,
  FaGlobe,
  FaDatabase,
  FaUsers,
  FaStore,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { GiSparkles } from 'react-icons/gi';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState(null);

  const termsSections = [
    {
      id: 1,
      title: "Acceptance of Terms",
      icon: <FaFileContract className="w-5 h-5" />,
      description: "By using BeautyBucket's website and services, you agree to comply with and be bound by these Terms & Conditions. If you do not agree, please do not use our services.",
      details: [
        "These terms apply to all users of the BeautyBucket platform",
        "By placing an order, you accept these terms in full",
        "We reserve the right to update these terms at any time",
        "Continued use constitutes acceptance of updated terms"
      ]
    },
    {
      id: 2,
      title: "Products & Services",
      icon: <FaShoppingBag className="w-5 h-5" />,
      description: "BeautyBucket offers premium beauty products sourced from trusted brands and verified for authenticity.",
      details: [
        "All products are 100% authentic and sourced from authorized distributors",
        "Product descriptions and images are for illustrative purposes",
        "We reserve the right to modify or discontinue products at any time",
        "Prices are subject to change without prior notice"
      ]
    },
    {
      id: 3,
      title: "Orders & Payments",
      icon: <FaCreditCard className="w-5 h-5" />,
      description: "Orders are processed securely with multiple payment options including Cash on Delivery (COD) and online payments.",
      details: [
        "All orders are subject to acceptance and availability",
        "Payment must be completed before order processing",
        "Cash on Delivery is available for eligible areas",
        "Online payments are processed through secure gateways"
      ]
    },
    {
      id: 4,
      title: "Delivery & Shipping",
      icon: <FaTruck className="w-5 h-5" />,
      description: "We deliver across Bangladesh with fast and reliable shipping services.",
      details: [
        "Delivery times vary by location and product availability",
        "Shipping fees are calculated at checkout",
        "Free shipping is available for orders over ৳3000",
        "Tracking information is provided for all shipped orders"
      ]
    },
    {
      id: 5,
      title: "Returns & Refunds",
      icon: <FaHands className="w-5 h-5" />,
      description: "Customer satisfaction is our priority. We offer a 7-day return policy for eligible products.",
      details: [
        "Products can be returned within 7 days of delivery",
        "Products must be unused, unopened, and in original packaging",
        "Refunds are processed within 7-10 business days",
        "Return shipping costs are covered by the customer unless defective"
      ]
    },
    {
      id: 6,
      title: "User Accounts",
      icon: <FaUserShield className="w-5 h-5" />,
      description: "Creating an account with BeautyBucket provides you with a personalized shopping experience.",
      details: [
        "You are responsible for maintaining account security",
        "Provide accurate and complete registration information",
        "Notify us immediately of any unauthorized use",
        "We reserve the right to suspend accounts for violations"
      ]
    },
    {
      id: 7,
      title: "Privacy & Data Protection",
      icon: <FaLock className="w-5 h-5" />,
      description: "Your privacy is important to us. We protect your personal information in accordance with our Privacy Policy.",
      details: [
        "We collect minimal personal data necessary for order processing",
        "Your data is never shared with third parties without consent",
        "SSL encryption protects all transactions",
        "You may request data deletion at any time"
      ]
    },
  
    {
      id: 9,
      title: "Intellectual Property",
      icon: <FaBalanceScale className="w-5 h-5" />,
      description: "All content on BeautyBucket including logos, images, and text is protected by copyright.",
      details: [
        "Content is owned by BeautyBucket and its licensors",
        "You may not reproduce, modify, or distribute our content",
        "Trademarks and logos are protected by law",
        "Unauthorized use may result in legal action"
      ]
    },
    {
      id: 10,
      title: "Limitation of Liability",
      icon: <FaExclamationTriangle className="w-5 h-5" />,
      description: "BeautyBucket is not liable for any indirect, incidental, or consequential damages.",
      details: [
        "We are not responsible for third-party service interruptions",
        "Product descriptions are provided 'as is' without warranties",
        "We are not liable for any damages exceeding the order value",
        "Users agree to indemnify BeautyBucket for any violations"
      ]
    }
  ];

  const lastUpdated = "June 28, 2024";

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-white overflow-hidden -mt-20">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-8 pb-8 lg:pt-10 lg:pb-10">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('/images/bg11.PNG')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A0E14]/88 via-[#1A0E14]/78 to-[#1A0E14]/68"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#EE4275]/8 via-transparent to-[#FF6B9D]/8"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#EE4275]/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF6B9D]/10 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#EE4275]/20 backdrop-blur-sm rounded-full text-[#FF6B9D] text-sm font-medium mb-4 border border-[#EE4275]/20">
                <GiSparkles className="w-4 h-4" />
                <span className="font-['Playfair_Display']">Legal</span>
              </div>
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-4 font-['Playfair_Display']">
                Terms &amp;
                <br />
                <span className="bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] bg-clip-text text-transparent">
                  Conditions
                </span>
              </h1>
              <p className="text-base text-white/70 leading-relaxed max-w-2xl mx-auto font-['Inter']">
                Please read these terms carefully before using our services. 
                They govern your use of BeautyBucket's platform and services.
              </p>
           
            </motion.div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="py-6 bg-[#FFF5F6]/30 border-b border-[#FFD2DB]/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
             
              {termsSections.map((section, index) => (
                <a
                  key={index}
                  href={`#section-${section.id}`}
                  className="text-xs px-3 py-1 bg-white border  rounded-full text-[#EE4275] border-[#EE4275]/30  hover:bg-[#EE4275] hover:text-white transition-all font-['Inter']"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-12 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="max-w-4xl mx-auto"
            >
              <motion.div variants={fadeInUp}>
                <p className="text-[#8B7A8C] mb-8 font-['Inter'] text-sm lg:text-base">
                  Welcome to BeautyBucket. These Terms & Conditions ("Terms") govern your use of the BeautyBucket website, 
                  mobile application, and all related services (collectively, the "Platform"). By accessing or using our Platform, 
                  you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Platform.
                </p>
              </motion.div>

              {termsSections.map((section, index) => (
                <motion.div
                  key={section.id}
                  variants={fadeInUp}
                  id={`section-${section.id}`}
                  className="mb-8 lg:mb-10 scroll-mt-24"
                >
                  <div 
                    className="group bg-[#FFF5F6]/30 rounded-2xl p-6 lg:p-8 border border-[#FFD2DB]/20 hover:border-[#EE4275]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#EE4275]/5"
                  >
                    {/* Header with Icon */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EE4275]/10 to-[#FF6B9D]/10 flex items-center justify-center text-[#EE4275] flex-shrink-0">
                        {section.icon}
                      </div>
                      <div>
                        <h2 className="text-lg lg:text-xl font-bold text-[#2D1B2E] font-['Playfair_Display']">
                          {section.title}
                        </h2>
                        <span className="text-xs text-[#8B7A8C] font-['Inter']">Section {String(section.id).padStart(2, '0')}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm lg:text-base text-[#8B7A8C] leading-relaxed mb-4 font-['Inter']">
                      {section.description}
                    </p>

                    {/* Details List */}
                    <ul className="space-y-2">
                      {section.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm lg:text-base text-[#2D1B2E] font-['Inter']">
                          <FaCheckCircle className="w-4 h-4 text-[#EE4275] mt-0.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}

              {/* Important Notice */}
              <motion.div variants={fadeInUp} className="bg-gradient-to-r from-[#EE4275]/10 to-[#FF6B9D]/10 rounded-2xl p-6 lg:p-8 border border-[#FFD2DB]/20 mt-8">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#EE4275]/20 flex items-center justify-center flex-shrink-0">
                    <FaExclamationTriangle className="w-5 h-5 text-[#EE4275]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#2D1B2E] font-['Playfair_Display'] mb-2">Important Notice</h3>
                    <p className="text-sm text-[#8B7A8C] leading-relaxed font-['Inter']">
                      These Terms & Conditions are a legal agreement between you and BeautyBucket. 
                      By using our Platform, you acknowledge that you have read, understood, and agree to 
                      be bound by these Terms. If you have any questions, please contact our support team.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-4">
                      <Link 
                        href="/contact" 
                        className="inline-flex items-center gap-2 text-[#EE4275] hover:text-[#EE4275]/70 font-medium text-sm font-['Inter']"
                      >
                        Contact Us
                        <FaArrowRight className="w-3 h-3" />
                      </Link>
                      <Link 
                        href="/privacy" 
                        className="inline-flex items-center gap-2 text-[#EE4275] hover:text-[#EE4275]/70 font-medium text-sm font-['Inter']"
                      >
                        Privacy Policy
                        <FaArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#EE4275] to-[#FF6B9D]"></div>
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full filter blur-3xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center max-w-2xl mx-auto"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <GiSparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4 font-['Playfair_Display']">
                Have Questions About Our Terms?
              </h2>
              <p className="text-white/80 text-base lg:text-lg mb-8 font-['Inter']">
                Our team is here to help you understand our policies and ensure your experience is seamless.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact">
                  <button className="inline-flex items-center gap-2 px-6 lg:px-8 py-3 bg-white text-[#EE4275] rounded-xl hover:shadow-lg hover:shadow-black/25 transition-all font-medium hover:-translate-y-0.5 font-['Inter']">
                    Contact Support
                    <FaArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link href="/products">
                  <button className="inline-flex items-center gap-2 px-6 lg:px-8 py-3 border border-white/30 text-white rounded-xl hover:bg-white/10 transition-all font-medium hover:-translate-y-0.5 font-['Inter']">
                    Start Shopping
                    <FaShoppingBag className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}