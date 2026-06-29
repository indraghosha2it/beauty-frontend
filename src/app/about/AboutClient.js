// app/about/page.js
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  FaHeart, 
  FaLeaf, 
  FaShippingFast, 
  FaShieldAlt, 
  FaStar, 
  FaUsers, 
  FaAward, 
  FaGlobe,
  FaArrowRight,
  FaCheckCircle,
  FaGift,
  FaSmile,
  FaRocket,
  FaChevronLeft,
  FaChevronRight,
  FaStore,
  FaSparkles,
  FaQuoteLeft,
  FaPlay,
  FaPlayCircle,
  FaGem,
  FaHands,
  FaSeedling,
  FaTrophy,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaShoppingBag
} from 'react-icons/fa';
import { GiLipstick, GiSparkles, GiFlower } from 'react-icons/gi';
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
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

export default function AboutPage() {
  const storyImages = [
   
    { id: 1, src: '/images/about1.jpg', alt: 'Happy customer' },
     { id: 2, src: '/images/bg6.png', alt: 'Beauty products display' },
    { id: 3, src: '/images/bg9.PNG', alt: 'Product curation' },
    { id: 4, src: '/images/bg8.png', alt: 'Beauty team' }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % storyImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [storyImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % storyImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + storyImages.length) % storyImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const values = [
    {
      icon: <FaHeart className="w-6 h-6" />,
      title: "Passion for Beauty",
      description: "We believe every individual deserves to feel beautiful and confident in their own skin."
    },
    {
      icon: <FaLeaf className="w-6 h-6" />,
      title: "Natural & Safe",
      description: "We prioritize natural ingredients and safety in every product we curate."
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: "100% Authentic",
      description: "Every product is sourced directly from trusted brands and verified for authenticity."
    },
    {
      icon: <FaUsers className="w-6 h-6" />,
      title: "Community First",
      description: "We build a community of beauty enthusiasts who support and inspire each other."
    }
  ];

  const stats = [
    { number: "50+", label: "Premium Brands", icon: <FaAward className="w-5 h-5" /> },
    { number: "5K+", label: "Happy Customers", icon: <FaUsers className="w-5 h-5" /> },
    { number: "500+", label: "Products", icon: <GiLipstick className="w-5 h-5" /> },
    { number: "98%", label: "Satisfaction Rate", icon: <FaStar className="w-5 h-5" /> }
  ];

  const milestones = [
    { year: "2020", title: "Founded", description: "BeautyBucket was born with a vision to bring premium beauty products to Bangladesh.", icon: <FaRocket className="w-5 h-5" /> },
    { year: "2021", title: "First Store", description: "Opened our first physical store in Dhaka, bringing beauty closer to our customers.", icon: <FaStore className="w-5 h-5" /> },
    { year: "2022", title: "Online Launch", description: "Launched our e-commerce platform to serve customers nationwide with ease.", icon: <FaGlobe className="w-5 h-5" /> },
    { year: "2023", title: "50+ Brands", description: "Partnered with over 50 premium beauty brands from around the world.", icon: <FaTrophy className="w-5 h-5" /> },
    { year: "2024", title: "5K+ Customers", description: "Served over 5,000 happy customers across Bangladesh with love and care.", icon: <FaUsers className="w-5 h-5" /> }
  ];

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-white overflow-hidden -mt-24">
        
        {/* Hero Section - Modern Overlapping Images */}
        <section className="py-16 lg:py-20 bg-gradient-to-b from-[#FFF5F6]/30 to-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInLeft}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-10 h-0.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]"></span>
                  <span className="text-sm font-medium text-[#EE4275] uppercase tracking-wider font-['Playfair_Display']">About Us</span>
                </div>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[#2D1B2E] leading-tight mb-4 font-['Playfair_Display']">
                  Redefining Beauty
                  <br />
                  <span className="bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] bg-clip-text text-transparent">
                    for Everyone
                  </span>
                </h1>
                <p className="text-base lg:text-lg text-[#8B7A8C] leading-relaxed mb-6 max-w-lg font-['Inter']">
                  We believe beauty is for everyone. Our mission is to bring you the finest beauty products with expert care, fast delivery, and a touch of luxury.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    href="/products" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-xl hover:shadow-lg hover:shadow-[#EE4275]/30 transition-all font-medium text-sm font-['Inter']"
                  >
                    Explore Products
                    <FaArrowRight className="w-4 h-4" />
                  </Link>
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center gap-2 px-6 py-3 border border-[#FFD2DB]/50 text-[#2D1B2E] rounded-xl hover:bg-[#FFF5F6] transition-all font-medium text-sm font-['Inter']"
                  >
                    Get in Touch
                  </Link>
                </div>
              </motion.div>

              {/* Right Side - Overlapping Images */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInRight}
                className="relative"
              >
                <div className="relative flex justify-center items-center -ml-20">
                  {/* Background decorative circle */}
                  <div className="absolute w-[90%] h-[90%] bg-gradient-to-br from-[#EE4275]/5 to-[#FF6B9D]/5 rounded-full"></div>
                  
                  {/* Main Image */}
                  <div className="relative w-full max-w-[420px] z-10">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                      <img 
                        src="/images/bg1.png" 
                        alt="Beauty products" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/images/bg1.png';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B2E]/20 to-transparent"></div>
                      
                      {/* Badge */}
                      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg">
                        <GiSparkles className="w-3 h-3 text-[#EE4275]" />
                        <span className="text-xs font-medium text-[#2D1B2E] font-['Inter']">Premium Collection</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Overlapping Image */}
                  <div className="absolute -top-8 -right-8 w-[55%] max-w-[280px] z-20">
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-white rotate-6 hover:rotate-0 transition-transform duration-500">
                      <img 
                        src="/images/bg2.jpg" 
                        alt="Beauty product" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x400/FFF5F6/EE4275?text=Beauty';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B2E]/10 to-transparent"></div>
                      
                      {/* Small badge */}
                      <div className="absolute top-3 right-3 bg-[#EE4275] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg font-['Inter']">
                        NEW
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
       <section className="py-12 relative overflow-hidden">
  {/* Background Image with Light Gradient Overlay */}
  <div className="absolute inset-0 z-0">
    <div 
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/images/bg5.PNG')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    ></div>
    {/* Light Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#ed2f78]/10 via-white/25 to-[#ed2f78]/20"></div>
    {/* Subtle Pink Glow */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#EE4275]/5 via-transparent to-[#FF6B9D]/5"></div>
  </div>
  
  <div className="container mx-auto px-4 relative z-10">
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="grid grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          variants={scaleUp}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 text-center border border-[#FFD2DB]/30 hover:shadow-xl hover:shadow-[#EE4275]/10 transition-all duration-300 group hover:-translate-y-1 hover:bg-white/95"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EE4275]/10 to-[#FF6B9D]/10 flex items-center justify-center mx-auto mb-3 text-[#EE4275] group-hover:from-[#EE4275] group-hover:to-[#FF6B9D] group-hover:text-white transition-all duration-300">
            {stat.icon}
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-[#EE4275] group-hover:scale-105 transition-transform duration-300 font-['Playfair_Display']">{stat.number}</p>
          <p className="text-xs lg:text-sm text-[#8B7A8C] mt-1 font-['Inter']">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>

        {/* Our Story Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInLeft}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-10 h-0.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]"></span>
                  <span className="text-sm font-medium text-[#EE4275] uppercase tracking-wider font-['Playfair_Display']">Our Story</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-[#2D1B2E] mt-2 mb-6 font-['Playfair_Display']">
                  A Journey of Beauty &amp; Trust
                </h2>
                <div className="space-y-4 text-[#8B7A8C] leading-relaxed font-['Inter']">
                  <p className="text-base">
                    BeautyBucket was founded with a simple yet powerful vision: to make premium beauty products accessible to everyone in Bangladesh. What started as a passion project has grown into a trusted destination for beauty enthusiasts.
                  </p>
                  <p className="text-base">
                    We carefully curate each product in our collection, ensuring only the highest quality, authentic, and effective products make it to our shelves. From skincare to makeup, we bring you the best from around the world.
                  </p>
                  <p className="text-base">
                    Our commitment to quality, transparency, and customer satisfaction has made us a beloved brand among thousands of customers across the country.
                  </p>
                </div>
                
                {/* Trust Indicators */}
                <div className="grid grid-cols-2 gap-3 mt-8">
                  <div className="flex items-center gap-2 bg-[#FFF5F6] rounded-xl px-4 py-3 border border-[#FFD2DB]/20 hover:border-[#EE4275]/30 transition-colors">
                    <FaCheckCircle className="w-4 h-4 text-[#EE4275]" />
                    <span className="text-xs font-medium text-[#2D1B2E] font-['Inter']">Quality Assured</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#FFF5F6] rounded-xl px-4 py-3 border border-[#FFD2DB]/20 hover:border-[#EE4275]/30 transition-colors">
                    <FaShippingFast className="w-4 h-4 text-[#EE4275]" />
                    <span className="text-xs font-medium text-[#2D1B2E] font-['Inter']">Fast Delivery</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#FFF5F6] rounded-xl px-4 py-3 border border-[#FFD2DB]/20 hover:border-[#EE4275]/30 transition-colors">
                    <FaGift className="w-4 h-4 text-[#EE4275]" />
                    <span className="text-xs font-medium text-[#2D1B2E] font-['Inter']">Free Shipping ৳3000+</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#FFF5F6] rounded-xl px-4 py-3 border border-[#FFD2DB]/20 hover:border-[#EE4275]/30 transition-colors">
                    <FaSmile className="w-4 h-4 text-[#EE4275]" />
                    <span className="text-xs font-medium text-[#2D1B2E] font-['Inter']">100% Satisfaction</span>
                  </div>
                </div>
              </motion.div>

              {/* Sliding Images */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInRight}
                className="relative"
              >
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-[#FFD2DB]/30 bg-[#FFF5F6]">
                  <div className="relative w-full h-full">
                    {storyImages.map((image, index) => (
                      <div
                        key={image.id}
                        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                          index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                        }`}
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = `https://via.placeholder.com/800x600/FFF5F6/EE4275?text=${image.alt}`;
                          }}
                        />
                      </div>
                    ))}
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B2E]/20 via-transparent to-transparent"></div>
                    
                    {/* Slide Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                      {storyImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`transition-all duration-300 ${
                            index === currentSlide
                              ? 'w-6 h-2 bg-[#EE4275] rounded-full'
                              : 'w-2 h-2 bg-white/50 rounded-full hover:bg-white/80'
                          }`}
                        />
                      ))}
                    </div>
                    
                    {/* Navigation Arrows */}
                    <button
                      onClick={prevSlide}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-lg z-10"
                    >
                      <FaChevronLeft className="w-4 h-4 text-[#2D1B2E]" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-lg z-10"
                    >
                      <FaChevronRight className="w-4 h-4 text-[#2D1B2E]" />
                    </button>
                  </div>
                </div>
             
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section - 2 Cards per row on mobile */}
        <section className="py-20 bg-gradient-to-b from-[#FFF5F6]/20 to-white -mt-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="w-10 h-0.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]"></span>
                <span className="text-sm font-medium text-[#EE4275] uppercase tracking-wider font-['Playfair_Display']">Our Values</span>
                <span className="w-10 h-0.5 bg-gradient-to-l from-[#EE4275] to-[#FF6B9D]"></span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2D1B2E] mt-2 mb-4 font-['Playfair_Display']">
                What We Stand For
              </h2>
              <p className="text-[#8B7A8C] font-['Inter']">
                These core values guide everything we do at BeautyBucket — from product selection to customer service.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
            >
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={scaleUp}
                  className="group bg-white rounded-2xl p-5 lg:p-6 text-center border border-[#FFD2DB]/20 hover:shadow-xl hover:shadow-[#EE4275]/5 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br from-[#EE4275]/10 to-[#FF6B9D]/10 flex items-center justify-center mx-auto mb-3 text-[#EE4275] group-hover:from-[#EE4275] group-hover:to-[#FF6B9D] group-hover:text-white transition-all duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-sm lg:text-lg font-semibold text-[#2D1B2E] mb-1 lg:mb-2 font-['Playfair_Display']">{value.title}</h3>
                  <p className="text-[10px] lg:text-sm text-[#8B7A8C] leading-relaxed font-['Inter']">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Milestone Section - New Professional Design */}
        <section className="py-20 bg-white -mt-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="w-10 h-0.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D]"></span>
                <span className="text-sm font-medium text-[#EE4275] uppercase tracking-wider font-['Playfair_Display']">Our Journey</span>
                <span className="w-10 h-0.5 bg-gradient-to-l from-[#EE4275] to-[#FF6B9D]"></span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2D1B2E] mt-2 mb-4 font-['Playfair_Display']">
                Milestones
              </h2>
              <p className="text-[#8B7A8C] font-['Inter']">
                From our humble beginnings to where we are today — every step has been a beautiful journey.
              </p>
            </motion.div>

            {/* Modern Milestone Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={scaleUp}
                  transition={{ delay: index * 0.08 }}
                  className="relative group"
                >
                  <div className="bg-gradient-to-b from-white to-[#FFF5F6]/30 rounded-2xl p-6 text-center border border-[#FFD2DB] hover:border-[#EE4275]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#EE4275]/10 h-full flex flex-col items-center">
                    {/* Year Badge */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg font-['Inter']">
                      {milestone.year}
                    </div>
                    
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#EE4275]/10 to-[#FF6B9D]/10 flex items-center justify-center text-[#EE4275] mt-4 mb-3 group-hover:from-[#EE4275] group-hover:to-[#FF6B9D] group-hover:text-white transition-all duration-300">
                      {milestone.icon}
                    </div>
                    
                    {/* Content */}
                    <h4 className="text-base font-semibold text-[#2D1B2E] mb-2 font-['Playfair_Display']">{milestone.title}</h4>
                    <p className="text-xs text-[#8B7A8C] leading-relaxed font-['Inter']">{milestone.description}</p>
                    
                    {/* Step Number */}
                    <div className="mt-4 w-8 h-8 rounded-full border-2 border-[#FFD2DB]/30 flex items-center justify-center text-xs font-bold text-[#8B7A8C] group-hover:border-[#EE4275]/50 group-hover:text-[#EE4275] group-hover:bg-[#FFF5F6] transition-all duration-300 font-['Inter']">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                  
                  {/* Connector Line */}
                  {index < milestones.length - 1 && (
                    <div className="hidden xl:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#FFD2DB] to-transparent"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 overflow-hidden">
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
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-['Playfair_Display']">
                Ready to Start Your Beauty Journey?
              </h2>
              <p className="text-white/80 text-lg mb-8 font-['Inter']">
                Explore our curated collection of premium beauty products and find your perfect match.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link 
                  href="/products" 
                  className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#EE4275] rounded-xl hover:shadow-lg hover:shadow-black/25 transition-all font-medium hover:-translate-y-0.5 font-['Inter']"
                >
                  Shop Now
                  <FaArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-2 px-8 py-3 border border-white/30 text-white rounded-xl hover:bg-white/10 transition-all font-medium hover:-translate-y-0.5 font-['Inter']"
                >
                  Contact Us
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