// app/contact/page.jsx
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Clock,
  Headphones,
  MessageCircle,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  ArrowRight,
  Users,
  Sparkles,
  Shield,
  Truck,
  Zap,
  Star,
  Package,
  Award,
  Globe,
  TrendingUp
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function ContactPage() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({ submitted: false, success: false, message: '' });

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
      const response = await fetch('https://gadget-backend.vercel.app/api/contact', {
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
      icon: <Phone className="w-5 h-5" />,
      title: "Phone",
      details: ["+880 1XXXXXXX", "+880 1XXXXXXX"],
      action: "Call us",
      link: "tel:+8801XXXXXXX"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      details: ["info@smartgadget.com", "support@smartgadget.com"],
      action: "Email us",
      link: "mailto:info@smartgadget.com"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Address",
      details: ["House #470, Avenue #6 Road #6, Mirpur DOHS, Dhaka, Bangladesh"],
      action: "Find us",
      link: "https://maps.google.com"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Working Hours",
      details: ["Always Open ", "24/7 Online Ordering"],
      action: "Contact us",
      link: "#"
    }
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, name: "Facebook", link: "#", color: "hover:bg-[#1877F2]" },
    { icon: <Youtube className="w-5 h-5" />, name: "YouTube", link: "#", color: "hover:bg-[#FF0000]" },

  ];

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

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white" ref={sectionRef}>
        {/* ============================================
        HERO SECTION - Matching About Page
        ============================================ */}
        <section className="relative min-h-[220px] sm:min-h-[280px] md:min-h-[300px] overflow-hidden">
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
                <MessageCircle className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
                <span className="text-[10px] md:text-xs lg:text-sm font-medium text-gray-300">Get in Touch</span>
              </motion.div>

              <motion.h1 
                variants={itemVariants}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 md:mb-3 leading-tight"
              >
                <span className="text-white">We'd Love to</span>
                <span className="block text-transparent bg-clip-text bg-blue-600">
                  Hear From You
                </span>
              </motion.h1>

              <motion.p 
                variants={itemVariants}
                className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed px-2"
              >
                Have questions about products, orders, or anything else? 
                We're here to help and respond within 24 hours.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ============================================
        CONTACT INFO - Top Section
        ============================================ */}
       <section className="py-8 md:py-12 bg-white border-b border-gray-100">
  <div className="container mx-auto px-4 max-w-7xl">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-6"
    >
      {contactInfo.map((info, idx) => (
        <div key={idx} className="group bg-gray-50 rounded-xl p-2.5 sm:p-3 md:p-5 border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all duration-300">
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-1.5 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
              {info.icon}
            </div>
            <div className="flex-1 min-w-0 w-full">
              <h4 className="font-semibold text-gray-900 text-[10px] sm:text-xs md:text-base">
                {info.title}
              </h4>
              {info.details.map((detail, i) => (
                <p key={i} className="text-[8px] sm:text-[10px] md:text-sm text-gray-600 break-words leading-tight sm:leading-relaxed">
                  {detail}
                </p>
              ))}
              <Link 
                href={info.link} 
                className="text-[8px] sm:text-[10px] md:text-sm text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-0.5 sm:gap-1 mt-0.5"
              >
                {info.action}
                <ArrowRight className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3.5 md:h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  </div>
</section>

        {/* ============================================
        CONTACT FORM & LEFT CONTENT
        ============================================ */}
        <section className="py-10 md:py-14 lg:py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-5 gap-8 md:gap-12">
              {/* Left Side - Content */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="lg:col-span-2"
              >
                <motion.div variants={itemVariants}>
                  <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-3 py-1 md:px-4 md:py-1.5 mb-4">
                    <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600" />
                    <span className="text-[10px] md:text-xs font-medium text-blue-700">Why Contact Us</span>
                  </div>
                </motion.div>

                <motion.h2 
                  variants={itemVariants}
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
                >
                  We're Here to
                  <span className="block text-blue-600">Help You</span>
                </motion.h2>

                <motion.p 
                  variants={itemVariants}
                  className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed"
                >
                  Whether you have questions about a product, need assistance with an order, 
                  or just want some tech advice - our team is ready to help you.
                </motion.p>

                <motion.div variants={itemVariants} className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 mt-0.5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Quick Response</h4>
                      <p className="text-gray-500 text-xs md:text-sm">We reply within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 mt-0.5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Expert Advice</h4>
                      <p className="text-gray-500 text-xs md:text-sm">Get guidance from tech experts</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 mt-0.5 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Truck className="w-3.5 h-3.5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Order Support</h4>
                      <p className="text-gray-500 text-xs md:text-sm">Track and manage your orders</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((social, idx) => (
                      <a
                        key={idx}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center transition-all duration-300 hover:text-white shadow-sm ${social.color}`}
                        aria-label={social.name}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Side - Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-3"
              >
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200">
                  <div className="mb-5 md:mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">Send Us a Message</h3>
                    <p className="text-sm text-gray-500">Fill in the form and we'll get back to you within 24 hours</p>
                  </div>

                  {formStatus.submitted && formStatus.success ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-50 border border-green-200 rounded-xl p-6 md:p-8 text-center"
                    >
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="text-green-600 w-7 h-7 md:w-8 md:h-8" />
                      </div>
                      <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Message Sent! 🎉</h4>
                      <p className="text-sm md:text-base text-gray-600 mb-4">{formStatus.message}</p>
                      <button
                        onClick={() => setFormStatus({ submitted: false, success: false, message: '' })}
                        className="text-blue-600 font-semibold hover:text-blue-700 text-sm md:text-base"
                      >
                        Send Another Message →
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                      <div>
                        <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 hover:bg-white"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                        <div>
                          <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 hover:bg-white"
                              placeholder="info@email.com"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5">
                            Phone <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 hover:bg-white"
                              placeholder="+880 1XXXXXXXXX"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5">
                          Subject
                        </label>
                        <div className="relative">
                          <MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 hover:bg-white"
                            placeholder="e.g. Product Inquiry"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={4}
                          className="w-full px-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none bg-gray-50 hover:bg-white"
                          placeholder="Tell us how we can help you..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-black text-white font-semibold py-3 md:py-3.5 rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 text-sm md:text-base shadow-sm hover:shadow-md"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Sending...
                          </span>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-4 h-4 md:w-5 md:h-5" />
                          </>
                        )}
                      </button>

                      <p className="text-center text-[10px] md:text-xs text-gray-400">
                        🔒 Your information is safe with us. We'll never share your data.
                      </p>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================
        MAP SECTION - Embedded Google Map
        ============================================ */}
        <section className="py-10 md:py-14 lg:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-6 md:mb-8"
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-3 py-1 md:px-4 md:py-1.5 mb-3">
                <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600" />
                <span className="text-[10px] md:text-sm font-medium text-blue-700">Find Us</span>
              </div>
              <h2 className="text-xl md:text-3xl font-bold text-gray-900">Visit Our Showroom</h2>
           
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl overflow-hidden shadow-lg border border-gray-200"
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
                title="Smart Gadget Location"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid sm:grid-cols-3 gap-4 mt-6"
            >
              <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                <Phone className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                <p className="text-xs md:text-sm text-gray-600">+880 1XXXXXXXXX</p>
                <p className="text-xs md:text-sm text-gray-600">+880 18XXXXXXXXX</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                <Clock className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                <p className="text-xs md:text-sm text-gray-600">Always Open </p>
                <p className="text-xs md:text-sm text-gray-600"> 24/7 Online Ordering</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                <Mail className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                <p className="text-xs md:text-sm text-gray-600">info@smartgadget.com</p>
                <p className="text-xs md:text-sm text-gray-600">support@smartgadget.com</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================
        CTA BANNER
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
                <span className="text-[10px] md:text-xs font-medium text-gray-300">Still Have Questions?</span>
              </div>
              
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 md:mb-4 leading-tight">
                We're Here to Help
              </h2>
              
              <p className="text-gray-200 text-xs sm:text-sm md:text-base mb-5 md:mb-8 max-w-2xl mx-auto px-4">
                Our team is ready to assist you with any questions about products, orders, or tech advice.
              </p>
              
              <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
                <a href="tel:+8801871733305">
                  <button className="group bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-full font-semibold inline-flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all text-xs sm:text-sm md:text-base">
                    <Phone className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    Call Now
                  </button>
                </a>
                <Link href="/products">
                  <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white px-5 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-full font-semibold inline-flex items-center gap-2 transition-all text-xs sm:text-sm md:text-base">
                    Browse Products
                    <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
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