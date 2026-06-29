// app/privacy/page.js
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { 
  FaShieldAlt, 
  FaCheckCircle, 
  FaArrowRight,
  FaUserShield,
  FaLock,
  FaDatabase,
  FaCookie,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGlobe,
  FaUsers,
  FaShoppingBag,
  FaExclamationTriangle,
  FaFileContract,
  FaServer,
  FaCog,
  FaEye,
  FaTrash,
  FaExchangeAlt,
  FaClock,
  FaChild,
  FaBuilding,
  FaRegEnvelope
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

export default function PrivacyPage() {
  const privacySections = [
    {
      id: 1,
      title: "Information We Collect",
      icon: <FaDatabase className="w-5 h-5" />,
      description: "We collect information to provide better services to our customers. The types of information we collect include:",
      details: [
        "Personal identification information (Name, email address, phone number, shipping address)",
        "Payment information (processed securely through third-party payment gateways)",
        "Order history and preferences",
        "Device and browser information for analytics",
        "Cookies and usage data for improved user experience"
      ]
    },
    {
      id: 2,
      title: "How We Use Your Information",
      icon: <FaCog className="w-5 h-5" />,
      description: "The information we collect is used to provide, maintain, and improve our services.",
      details: [
        "Process and fulfill your orders accurately",
        "Send order confirmations, updates, and shipping information",
        "Personalize your shopping experience",
        "Improve our website and product offerings",
        "Respond to customer inquiries and provide support",
        "Send promotional offers (only with your consent)"
      ]
    },
    {
      id: 3,
      title: "Information Security",
      icon: <FaLock className="w-5 h-5" />,
      description: "We take data security seriously and implement industry-standard measures to protect your information.",
      details: [
        "SSL encryption for all data transmission",
        "Secure servers and firewalls",
        "Regular security audits and updates",
        "Access control and authentication protocols",
        "Encrypted storage of sensitive information"
      ]
    },
    {
      id: 4,
      title: "Data Sharing & Disclosure",
      icon: <FaUsers className="w-5 h-5" />,
      description: "We do not sell, trade, or rent your personal information to third parties. However, we may share your information:",
      details: [
        "With shipping and delivery partners to fulfill orders",
        "With payment processors for secure transactions",
        "When required by law or to protect legal rights",
        "With your explicit consent",
        "In aggregated, anonymized form for analytics"
      ]
    },
    {
      id: 5,
      title: "Cookies & Tracking",
      icon: <FaCookie className="w-5 h-5" />,
      description: "We use cookies and similar tracking technologies to enhance your browsing experience.",
      details: [
        "Essential cookies for website functionality",
        "Analytics cookies to understand user behavior",
        "Preferences cookies for personalized experience",
        "You can manage cookie preferences in your browser settings",
        "Third-party cookies may be used for payment processing"
      ]
    },
    {
      id: 6,
      title: "Your Rights",
      icon: <FaUserShield className="w-5 h-5" />,
      description: "You have certain rights regarding your personal information, including:",
      details: [
        "Right to access your personal data",
        "Right to correct inaccurate or incomplete data",
        "Right to request deletion of your data",
        "Right to opt-out of marketing communications",
        "Right to withdraw consent at any time",
        "Right to data portability"
      ]
    },
    {
      id: 7,
      title: "Data Retention",
      icon: <FaClock className="w-5 h-5" />,
      description: "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy.",
      details: [
        "Order data is kept for 7 years for legal and tax purposes",
        "Account data is retained until account deletion",
        "Analytics data is anonymized after 2 years",
        "Marketing data is kept until you opt-out",
        "You can request early deletion of your data at any time"
      ]
    },
    {
      id: 8,
      title: "Third-Party Services",
      icon: <FaGlobe className="w-5 h-5" />,
      description: "We may use third-party services to enhance our platform. These services have their own privacy policies.",
      details: [
        "Payment gateways (bKash, Nagad, SSLCommerz, etc.)",
        "Delivery and logistics partners",
        "Analytics and tracking services",
        "Communication and email services",
        "We recommend reviewing their privacy policies"
      ]
    },
    {
      id: 9,
      title: "Children's Privacy",
      icon: <FaChild className="w-5 h-5" />,
      description: "BeautyBucket is not intended for children under 13 years of age. We do not knowingly collect personal information from children.",
      details: [
        "We do not target or market to children under 13",
        "If we discover data from a child under 13, we will delete it",
        "Parents/guardians can contact us to remove their child's data",
        "We encourage parents to monitor their children's online activity"
      ]
    },
    {
      id: 10,
      title: "Policy Updates",
      icon: <FaExchangeAlt className="w-5 h-5" />,
      description: "We may update this Privacy Policy periodically. We will notify you of any significant changes.",
      details: [
        "Check the 'Last Updated' date for the latest version",
        "Significant changes will be communicated via email",
        "Continued use constitutes acceptance of updated policy",
        "Archived versions are available upon request"
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
                <span className="font-['Playfair_Display']">Privacy</span>
              </div>
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-4 font-['Playfair_Display']">
                Privacy
                
                <span className="bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] bg-clip-text text-transparent">
                  Policy
                </span>
              </h1>
              <p className="text-base text-white/70 leading-relaxed max-w-2xl mx-auto font-['Inter']">
                Your privacy is important to us. Learn how we collect, use, and protect your personal information.
              </p>
           
            </motion.div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="py-6 bg-[#FFF5F6]/30 border-b border-[#FFD2DB]/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
             
              {privacySections.map((section, index) => (
                <a
                  key={index}
                  href={`#section-${section.id}`}
                  className="text-xs px-3 py-1 bg-white border border-[#EE4275]/30 rounded-full text-[#EE4275] hover:bg-[#EE4275] hover:text-white transition-all font-['Inter']"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy Content */}
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
                  At BeautyBucket, we are committed to protecting your privacy and ensuring the security of your personal 
                  information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                  when you visit our website and use our services. Please read this policy carefully.
                </p>
              </motion.div>

              {privacySections.map((section, index) => (
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
                    <FaShieldAlt className="w-5 h-5 text-[#EE4275]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#2D1B2E] font-['Playfair_Display'] mb-2">Your Privacy Matters</h3>
                    <p className="text-sm text-[#8B7A8C] leading-relaxed font-['Inter']">
                      We are committed to protecting your privacy and ensuring the security of your personal information. 
                      If you have any questions about our privacy practices, please don't hesitate to contact us.
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
                        href="/terms" 
                        className="inline-flex items-center gap-2 text-[#EE4275] hover:text-[#EE4275]/70 font-medium text-sm font-['Inter']"
                      >
                        Terms & Conditions
                        <FaArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-6 lg:p-8 border border-[#FFD2DB]/20 mt-8">
                <h3 className="text-lg font-bold text-[#2D1B2E] font-['Playfair_Display'] mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#EE4275]/10 flex items-center justify-center text-[#EE4275]">
                      <FaEnvelope className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-[#8B7A8C] font-['Inter']">Email</p>
                      <p className="text-sm font-medium text-[#2D1B2E] font-['Inter']">support@beautybucket.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#EE4275]/10 flex items-center justify-center text-[#EE4275]">
                      <FaPhone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-[#8B7A8C] font-['Inter']">Phone</p>
                      <p className="text-sm font-medium text-[#2D1B2E] font-['Inter']">+880 1XXXXXXXXX</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#EE4275]/10 flex items-center justify-center text-[#EE4275]">
                      <FaMapMarkerAlt className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-[#8B7A8C] font-['Inter']">Address</p>
                      <p className="text-sm font-medium text-[#2D1B2E] font-['Inter']">House #470, Avenue #6, Road #6, Mirpur DOHS, Dhaka</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#EE4275]/10 flex items-center justify-center text-[#EE4275]">
                      <FaClock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-[#8B7A8C] font-['Inter']">Working Hours</p>
                      <p className="text-sm font-medium text-[#2D1B2E] font-['Inter']">24/7 Online Support</p>
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
                Have Questions About Privacy?
              </h2>
              <p className="text-white/80 text-base lg:text-lg mb-8 font-['Inter']">
                Our team is here to address your privacy concerns and ensure your data is protected.
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