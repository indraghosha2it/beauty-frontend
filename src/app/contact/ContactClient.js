// app/contact/page.js
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaClock,
  FaPaperPlane,
  FaCheckCircle,
  FaArrowRight,
  FaUser,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPinterestP,
  FaTiktok,
  FaSparkles,
  FaShieldAlt,
  FaTruck,
  FaHeart,
  FaStar,
  FaGlobe,
  FaWhatsapp,
  FaAward,
  FaUsers,
  FaGem
} from 'react-icons/fa';
import { GiLipstick, GiSparkles } from 'react-icons/gi';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } }
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

const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({ submitted: false, success: false, message: '' });
  const sectionRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setFormStatus({ submitted: true, success: false, message: 'Sending...' });
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject || 'General Inquiry',
          message: formData.message
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormStatus({
          submitted: true,
          success: true,
          message: data.message || 'Thank you! We\'ll get back to you within 24 hours.'
        });
        
        setFormData({ 
          name: '', 
          email: '', 
          phone: '',
          subject: '', 
          message: '' 
        });
        
        setTimeout(() => {
          setFormStatus({ submitted: false, success: false, message: '' });
        }, 5000);
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setFormStatus({
        submitted: true,
        success: false,
        message: error.message || 'Failed to send message. Please try again later.'
      });
      
      setTimeout(() => {
        setFormStatus({ submitted: false, success: false, message: '' });
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaPhone className="w-5 h-5" />,
      title: "Phone",
      details: ["+880 1XXXXXXXXX"],
      action: "Call us",
      link: "tel:+8801XXXXXXXXX",
      highlight: "24/7 Support"
    },
    {
      icon: <FaEnvelope className="w-5 h-5" />,
      title: "Email",
      details: ["support@beautybucket.com"],
      action: "Email us",
      link: "mailto:support@beautybucket.com",
      highlight: "Quick Response"
    },
    {
      icon: <FaMapMarkerAlt className="w-5 h-5" />,
      title: "Address",
      details: ["House #470, Avenue #6, Road #6, Mirpur DOHS, Dhaka"],
      action: "Find us",
      link: "https://maps.google.com",
      highlight: "Visit Us"
    },
    {
      icon: <FaClock className="w-5 h-5" />,
      title: "Working Hours",
      details: ["Always Open", "24/7 Online Ordering"],
      action: "Contact us",
      link: "#",
      highlight: "Always Available"
    }
  ];

  const socialLinks = [
    { icon: <FaFacebookF className="w-5 h-5" />, name: "Facebook", link: "#", color: "hover:bg-[#1877F2]" },
    { icon: <FaInstagram className="w-5 h-5" />, name: "Instagram", link: "#", color: "hover:bg-[#E4405F]" },
    { icon: <FaYoutube className="w-5 h-5" />, name: "YouTube", link: "#", color: "hover:bg-[#FF0000]" },
    { icon: <FaPinterestP className="w-5 h-5" />, name: "Pinterest", link: "#", color: "hover:bg-[#BD081C]" },
    { icon: <FaTiktok className="w-5 h-5" />, name: "TikTok", link: "#", color: "hover:bg-[#000000]" }
  ];

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
                backgroundImage: `url('/images/bg10.jpg')`,
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
                <span className="font-['Playfair_Display']">Get in Touch</span>
              </div>
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-4 font-['Playfair_Display']">
                We'd Love to
                <br />
                <span className="bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] bg-clip-text text-transparent">
                  Hear From You
                </span>
              </h1>
              <p className="text-base text-white/70 leading-relaxed max-w-2xl mx-auto font-['Inter']">
                Have questions about products, orders, or anything else? 
                We're here to help and respond within 24 hours.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards - Highlighted Design */}
        <section className="py-10 lg:py-12 bg-white border-b border-[#FFD2DB]/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6"
            >
              {contactInfo.map((info, idx) => (
                <motion.div
                  key={idx}
                  variants={scaleUp}
                  className="group relative overflow-hidden rounded-2xl p-4 lg:p-6 border-2 border-[#FFD2DB]/30 hover:border-[#EE4275] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#EE4275]/10 bg-gradient-to-br from-white to-[#FFF5F6]"
                >
                  {/* Highlight Badge */}
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-[8px] lg:text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md font-['Inter']">
                    {info.highlight}
                  </div>
                  
                  {/* Decorative gradient */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#EE4275]/10 to-[#FF6B9D]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                  
                  <div className="flex flex-col items-center text-center gap-2 relative z-10">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-[#EE4275]/10 to-[#FF6B9D]/10 flex items-center justify-center text-[#EE4275] flex-shrink-0 group-hover:from-[#EE4275] group-hover:to-[#FF6B9D] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#2D1B2E] text-xs lg:text-base font-['Playfair_Display']">
                        {info.title}
                      </h4>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-[9px] lg:text-sm text-[#8B7A8C] font-['Inter']">
                          {detail}
                        </p>
                      ))}
                      <Link 
                        href={info.link} 
                        className="text-[10px] lg:text-sm text-[#EE4275] hover:text-[#EE4275]/70 font-medium inline-flex items-center gap-1 mt-1 font-['Inter'] group-hover:gap-2 transition-all"
                      >
                        {info.action}
                        <FaArrowRight className="w-2 h-2 lg:w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Form Section - Professional Design */}
        <section className="relative py-16 lg:py-24 overflow-hidden" ref={sectionRef}>
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('/images/form-bg.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
              }}
            ></div>
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/88 to-white/92"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#EE4275]/8 via-transparent to-[#FF6B9D]/8"></div>
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#EE4275]/8 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FF6B9D]/8 rounded-full filter blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
              {/* Left Side - Content */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="lg:col-span-2"
              >
                <motion.div variants={fadeInUp}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-10 h-0.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]"></span>
                    <span className="text-sm font-medium text-[#EE4275] uppercase tracking-wider font-['Playfair_Display']">Contact Us</span>
                  </div>
                </motion.div>

                <motion.h2 
                  variants={fadeInUp}
                  className="text-2xl lg:text-3xl xl:text-4xl font-bold text-[#2D1B2E] mb-4 font-['Playfair_Display']"
                >
                  Let's Connect
                  <br />
                  <span className="bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] bg-clip-text text-transparent">
                    & Make Beauty Happen
                  </span>
                </motion.h2>

                <motion.p 
                  variants={fadeInUp}
                  className="text-sm lg:text-base text-[#8B7A8C] mb-6 leading-relaxed font-['Inter']"
                >
                  Whether you have questions about a product, need assistance with an order, 
                  or just want some beauty advice - our team is ready to help you.
                </motion.p>

                {/* Benefits List - Professional Design */}
                <motion.div variants={fadeInUp} className="space-y-3 mb-6">
                  <div className="flex items-start gap-3 p-3 bg-white/90 backdrop-blur-sm rounded-xl border border-[#FFD2DB]/20 hover:border-[#EE4275]/30 transition-all hover:shadow-md">
                    <div className="w-6 h-6 mt-0.5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaCheckCircle className="w-3.5 h-3.5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#2D1B2E] text-sm font-['Playfair_Display']">Quick Response</h4>
                      <p className="text-xs lg:text-sm text-[#8B7A8C] font-['Inter']">We reply within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white/90 backdrop-blur-sm rounded-xl border border-[#FFD2DB]/20 hover:border-[#EE4275]/30 transition-all hover:shadow-md">
                    <div className="w-6 h-6 mt-0.5 bg-[#EE4275]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaShieldAlt className="w-3.5 h-3.5 text-[#EE4275]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#2D1B2E] text-sm font-['Playfair_Display']">Expert Advice</h4>
                      <p className="text-xs lg:text-sm text-[#8B7A8C] font-['Inter']">Get guidance from beauty experts</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white/90 backdrop-blur-sm rounded-xl border border-[#FFD2DB]/20 hover:border-[#EE4275]/30 transition-all hover:shadow-md">
                    <div className="w-6 h-6 mt-0.5 bg-[#FF6B9D]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaTruck className="w-3.5 h-3.5 text-[#FF6B9D]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#2D1B2E] text-sm font-['Playfair_Display']">Order Support</h4>
                      <p className="text-xs lg:text-sm text-[#8B7A8C] font-['Inter']">Track and manage your orders</p>
                    </div>
                  </div>
                </motion.div>

                {/* Social Links */}
                <motion.div variants={fadeInUp}>
                  <p className="text-xs lg:text-sm text-[#8B7A8C] mb-3 font-['Inter']">Connect with us:</p>
                  <div className="flex flex-wrap gap-2">
                    {socialLinks.map((social, idx) => (
                      <a
                        key={idx}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white border border-[#FFD2DB]/30 text-[#8B7A8C] flex items-center justify-center transition-all duration-300 hover:text-white shadow-sm hover:shadow-lg ${social.color}`}
                        aria-label={social.name}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Side - Professional Contact Form */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInRight}
                className="lg:col-span-3"
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 lg:p-8 border border-[#FFD2DB]/30">
                  {/* Form Header */}
                  <div className="mb-6 lg:mb-8">
                    <h3 className="text-xl lg:text-2xl font-bold text-[#2D1B2E] font-['Playfair_Display']">Send Us a Message</h3>
                    <p className="text-sm text-[#8B7A8C] font-['Inter']">Fill in the form and we'll get back to you within 24 hours</p>
                  </div>

                  {formStatus.submitted && formStatus.success ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-50 border border-green-200 rounded-xl p-6 lg:p-8 text-center"
                    >
                      <div className="w-14 h-14 lg:w-16 lg:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaCheckCircle className="text-green-600 w-7 h-7 lg:w-8 lg:h-8" />
                      </div>
                      <h4 className="text-lg lg:text-xl font-bold text-[#2D1B2E] mb-2 font-['Playfair_Display']">Message Sent! ✨</h4>
                      <p className="text-sm lg:text-base text-[#8B7A8C] mb-4 font-['Inter']">{formStatus.message}</p>
                      <button
                        onClick={() => setFormStatus({ submitted: false, success: false, message: '' })}
                        className="text-[#EE4275] font-semibold hover:text-[#EE4275]/70 text-sm lg:text-base font-['Inter']"
                      >
                        Send Another Message →
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
                      {/* Name Field */}
                      <div>
                        <label className="block text-xs lg:text-sm font-semibold text-[#2D1B2E] mb-1.5 font-['Inter']">
                          Full Name <span className="text-[#EE4275]">*</span>
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-0 bg-gradient-to-r from-[#EE4275]/10 to-[#FF6B9D]/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C4B5C5] w-4 h-4 lg:w-5 lg:h-5 z-10 group-hover:text-[#EE4275] transition-colors" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="relative w-full pl-10 lg:pl-12 pr-4 py-2.5 lg:py-3 text-sm lg:text-base border-2 border-[#FFD2DB]/40 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent outline-none transition bg-white/90 hover:bg-white text-[#2D1B2E] placeholder:text-[#C4B5C5] font-['Inter'] shadow-sm"
                            placeholder="Your Name"
                          />
                        </div>
                      </div>

                      {/* Email & Phone - 2 Column Grid */}
                      <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
                        <div>
                          <label className="block text-xs lg:text-sm font-semibold text-[#2D1B2E] mb-1.5 font-['Inter']">
                            Email <span className="text-[#EE4275]">*</span>
                          </label>
                          <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#EE4275]/10 to-[#FF6B9D]/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C4B5C5] w-4 h-4 lg:w-5 lg:h-5 z-10 group-hover:text-[#EE4275] transition-colors" />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="relative w-full pl-10 lg:pl-12 pr-4 py-2.5 lg:py-3 text-sm lg:text-base border-2 border-[#FFD2DB]/40 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent outline-none transition bg-white/90 hover:bg-white text-[#2D1B2E] placeholder:text-[#C4B5C5] font-['Inter'] shadow-sm"
                              placeholder="info@email.com"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs lg:text-sm font-semibold text-[#2D1B2E] mb-1.5 font-['Inter']">
                            Phone <span className="text-[#EE4275]">*</span>
                          </label>
                          <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#EE4275]/10 to-[#FF6B9D]/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C4B5C5] w-4 h-4 lg:w-5 lg:h-5 z-10 group-hover:text-[#EE4275] transition-colors" />
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              className="relative w-full pl-10 lg:pl-12 pr-4 py-2.5 lg:py-3 text-sm lg:text-base border-2 border-[#FFD2DB]/40 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent outline-none transition bg-white/90 hover:bg-white text-[#2D1B2E] placeholder:text-[#C4B5C5] font-['Inter'] shadow-sm"
                              placeholder="+880 1XXXXXXXXX"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Subject Field */}
                      <div>
                        <label className="block text-xs lg:text-sm font-semibold text-[#2D1B2E] mb-1.5 font-['Inter']">
                          Product Interest
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-0 bg-gradient-to-r from-[#EE4275]/10 to-[#FF6B9D]/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C4B5C5] w-4 h-4 lg:w-5 lg:h-5 z-10 group-hover:text-[#EE4275] transition-colors" />
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="relative w-full pl-10 lg:pl-12 pr-4 py-2.5 lg:py-3 text-sm lg:text-base border-2 border-[#FFD2DB]/40 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent outline-none transition bg-white/90 hover:bg-white text-[#2D1B2E] placeholder:text-[#C4B5C5] font-['Inter'] shadow-sm"
                            placeholder="e.g. Product Inquiry"
                          />
                        </div>
                      </div>

                      {/* Message Field */}
                      <div>
                        <label className="block text-xs lg:text-sm font-semibold text-[#2D1B2E] mb-1.5 font-['Inter']">
                          Message <span className="text-[#EE4275]">*</span>
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-0 bg-gradient-to-r from-[#EE4275]/10 to-[#FF6B9D]/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="relative w-full px-4 py-2.5 lg:py-3 text-sm lg:text-base border-2 border-[#FFD2DB]/40 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent outline-none transition resize-none bg-white/90 hover:bg-white text-[#2D1B2E] placeholder:text-[#C4B5C5] font-['Inter'] shadow-sm"
                            placeholder="Tell us how we can help you..."
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white font-semibold py-3 lg:py-3.5 rounded-xl hover:shadow-xl hover:shadow-[#EE4275]/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 text-sm lg:text-base font-['Inter'] hover:-translate-y-0.5"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Sending...
                          </span>
                        ) : (
                          <>
                            <FaPaperPlane className="w-4 h-4 lg:w-5 lg:h-5" />
                            Send Message
                          </>
                        )}
                      </button>

                      <p className="text-center text-[10px] lg:text-xs text-[#C4B5C5] font-['Inter']">
                        🔒 Your information is safe with us. We'll never share your data.
                      </p>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-6 lg:mb-8"
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="w-10 h-0.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]"></span>
                <span className="text-sm font-medium text-[#EE4275] uppercase tracking-wider font-['Playfair_Display']">Find Us</span>
                <span className="w-10 h-0.5 bg-gradient-to-l from-[#EE4275] to-[#FF6B9D]"></span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#2D1B2E] font-['Playfair_Display']">Visit Our Showroom</h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="rounded-2xl overflow-hidden shadow-lg border border-[#FFD2DB]/20"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.5029279808477!2d90.3686038739732!3d23.83626858547701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c14a38f924d3%3A0x39a8c038652ae720!2sHouse%20470%2C%20R9PC%2BHGM%2C%206%20Avenue%206%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1781765267904!5m2!1sen!2sbd"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[250px] sm:h-[300px] md:h-[400px]"
                title="BeautyBucket Location"
              />
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
                Still Have Questions?
              </h2>
              <p className="text-white/80 text-base lg:text-lg mb-8 font-['Inter']">
                Our beauty experts are ready to assist you with any questions about products or orders.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="tel:+8801871733305">
                  <button className="inline-flex items-center gap-2 px-6 lg:px-8 py-3 bg-white text-[#EE4275] rounded-xl hover:shadow-lg hover:shadow-black/25 transition-all font-medium hover:-translate-y-0.5 font-['Inter']">
                    <FaPhone className="w-4 h-4" />
                    Call Now
                  </button>
                </a>
                <Link href="/products">
                  <button className="inline-flex items-center gap-2 px-6 lg:px-8 py-3 border border-white/30 text-white rounded-xl hover:bg-white/10 transition-all font-medium hover:-translate-y-0.5 font-['Inter']">
                    Browse Products
                    <FaArrowRight className="w-4 h-4" />
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