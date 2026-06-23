// app/privacy/page.jsx
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import {
  Shield,
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  Lock,
  Eye,
  FileText,
  CheckCircle,
  Users,
  Globe,
  Server,
  Cookie,
  AlertCircle
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function PrivacyPage() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

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

  const privacySections = [
    {
      icon: <Users className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Information We Collect",
      items: [
        "Name, email address, phone number, and shipping/billing address",
        "Payment information (processed securely through our payment partners)",
        "IP address, browser type, device information, and usage data",
        "Cookies and similar tracking technologies"
      ]
    },
    {
      icon: <Eye className="w-5 h-5 md:w-6 md:h-6" />,
      title: "How We Use Your Information",
      items: [
        "Process and fulfill your orders and deliveries",
        "Communicate with you about orders, products, and promotions",
        "Improve our website, products, and customer service",
        "Prevent fraud and ensure the security of our platform",
        "Comply with legal obligations and regulatory requirements"
      ]
    },
    {
      icon: <Shield className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Data Sharing & Disclosure",
      items: [
        "We never sell or rent your personal data to third parties",
        "Share data with trusted service providers (payment processors, delivery partners)",
        "May disclose data when required by law or to protect our rights",
        "Third-party services have their own privacy policies"
      ]
    },
    {
      icon: <Lock className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Data Security",
      items: [
        "SSL encryption for all data transmission",
        "Regular security audits and vulnerability assessments",
        "Access controls and authentication measures",
        "Secure data storage with industry-standard practices"
      ]
    },
    {
      icon: <Cookie className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Cookies & Tracking",
      items: [
        "Essential cookies for site functionality",
        "Analytics cookies to understand user behavior",
        "Preference cookies to remember your settings",
        "You can manage cookie preferences in your browser settings"
      ]
    },
    {
      icon: <AlertCircle className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Your Rights",
      items: [
        "Access, correct, or delete your personal data",
        "Withdraw consent for marketing communications",
        "Request data portability",
        "Lodge a complaint with data protection authorities"
      ]
    }
  ];

  const quickInfo = [
    {
      icon: <Mail className="w-4 h-4 md:w-5 md:h-5" />,
      label: "Privacy Email",
      value: "privacy@smartgadget.com",
      link: "mailto:privacy@smartgadget.com"
    },
    {
      icon: <Phone className="w-4 h-4 md:w-5 md:h-5" />,
      label: "Privacy Hotline",
      value: "+880 1871-733305",
      link: "tel:+8801871733305"
    },
    {
      icon: <Clock className="w-4 h-4 md:w-5 md:h-5" />,
      label: "Response Time",
      value: "Within 24 hours"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white" ref={sectionRef}>
        {/* ============================================
        HERO SECTION - Matching About & Contact
        ============================================ */}
        <section className="relative min-h-[220px] sm:min-h-[280px] md:min-h-[300px] overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'url("https://i.ibb.co.com/SXv2zphh/top-view-vr-glasses-earphones-arrangement.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/75 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10" />

          <div className="absolute -top-20 -right-20 w-48 h-48 md:w-64 md:h-64 bg-blue-600/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 md:w-64 md:h-64 bg-purple-600/15 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 max-w-7xl relative z-10 h-full flex items-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="w-full max-w-4xl mx-auto text-center py-6 md:py-8"
            >
              <motion.div 
                variants={itemVariants} 
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 md:px-4 md:py-1.5 mb-3 md:mb-4 border border-white/10"
              >
                <Shield className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
                <span className="text-[10px] md:text-xs lg:text-sm font-medium text-gray-300">Privacy Policy</span>
              </motion.div>

              <motion.h1 
                variants={itemVariants}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 md:mb-3 leading-tight"
              >
                <span className="text-white">Your Privacy</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Matters to Us
                </span>
              </motion.h1>

              <motion.p 
                variants={itemVariants}
                className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed px-2"
              >
                We are committed to protecting your personal data and being transparent 
                about how we collect, use, and safeguard your information.
              </motion.p>

              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-2.5 sm:gap-3 md:gap-4 justify-center mt-4 md:mt-6"
              >
                <a href="#privacy-policy">
                  <button className="group bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-5 sm:py-2.5 md:px-6 md:py-3 py-1.5 rounded-full font-semibold transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg shadow-blue-600/30 text-[10px] sm:text-sm md:text-base whitespace-nowrap">
                    Read Policy
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </a>
                <Link href="/contact">
                  <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white px-3 sm:px-5 sm:py-2.5 md:px-6 md:py-3 py-1.5 rounded-full font-semibold transition-all text-[10px] sm:text-sm md:text-base whitespace-nowrap">
                    Contact Us
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

    

        {/* ============================================
        PRIVACY POLICY CONTENT
        ============================================ */}
        <section id="privacy-policy" className="py-10 md:py-14 lg:py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-center mb-8 md:mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-3 py-1 md:px-4 md:py-1.5 mb-2 md:mb-4">
                <FileText className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600" />
                <span className="text-[10px] md:text-sm font-medium text-blue-700">Privacy Policy</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                How We Protect Your Data
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm md:text-base mt-1.5 md:mt-2 max-w-2xl mx-auto px-4">
                Last updated: June 18, 2026 — We value your trust and are committed to protecting your privacy.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
              {privacySections.map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="group bg-white rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                      <div className="text-blue-600 group-hover:scale-110 transition-transform">
                        {section.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-2 md:mb-3">
                        {section.title}
                      </h3>
                      <ul className="space-y-1.5 md:space-y-2">
                        {section.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2 text-xs sm:text-sm md:text-base text-gray-600">
                            <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 md:mt-12 bg-white rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10 border border-gray-200 shadow-sm"
            >
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-2">
                    International Data Transfers
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                    Smart Gadget operates primarily in Bangladesh. However, we may use service providers 
                    located in other countries. When we transfer your data internationally, we ensure that 
                    appropriate safeguards are in place to protect your information in accordance with 
                    applicable data protection laws.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Children's Privacy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-4 md:mt-6 bg-white rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10 border border-gray-200 shadow-sm"
            >
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-2">
                    Children's Privacy
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                    Our services are not directed at children under 13 years of age. We do not knowingly 
                    collect personal information from children. If you are a parent or guardian and believe 
                    that your child has provided us with personal data, please contact us immediately. 
                    We will take steps to remove such information from our systems.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Policy Updates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-4 md:mt-6 bg-blue-50 rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10 border border-blue-200"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900">
                      Updates to This Policy
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                      We may update this Privacy Policy periodically. The latest version will always be 
                      posted on this page with the effective date. We encourage you to review this policy 
                      regularly.
                    </p>
                  </div>
                </div>
                <Link href="/contact">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 md:px-6 md:py-2.5 rounded-full font-semibold text-xs sm:text-sm md:text-base transition-all shadow-lg shadow-blue-600/30 whitespace-nowrap flex items-center gap-2">
                    Questions? Contact Us
                    <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================
        CTA BANNER - Matching About & Contact
        ============================================ */}
        <section className="relative py-10 md:py-14 lg:py-20 overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("https://i.ibb.co.com/0RHQ0thP/jh.png")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <div className="absolute -top-20 -right-20 w-48 h-48 md:w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 md:w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

          <div className="container mx-auto px-4 max-w-7xl text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 md:px-4 md:py-1.5 mb-3 md:mb-4 border border-white/10">
                <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400" />
                <span className="text-[10px] md:text-xs font-medium text-gray-300">Trust & Transparency</span>
              </div>
              
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 md:mb-4 leading-tight">
                Your Privacy is Our Priority
              </h2>
              
              <p className="text-gray-200 text-xs sm:text-sm md:text-base mb-5 md:mb-8 max-w-2xl mx-auto px-4">
                Have questions about how we handle your data? Our team is here to help.
              </p>
              
              <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
                <Link href="/contact">
                  <button className="group bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-full font-semibold inline-flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all text-xs sm:text-sm md:text-base">
                    Contact Privacy Team
                    <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/products">
                  <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white px-5 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-full font-semibold inline-flex items-center gap-2 transition-all text-xs sm:text-sm md:text-base">
                    Browse Products
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