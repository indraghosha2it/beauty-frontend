
// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import { motion } from 'framer-motion';
// import { 
//   Mail, 
//   Lock, 
//   Eye, 
//   EyeOff, 
//   ArrowRight, 
//   Sparkles,
//   Star,
//   Rocket,
//   Gift,
//   Heart
// } from 'lucide-react';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';
// import GoogleLoginButton from '../components/GoogleLoginButton';
// import ForgotPasswordModal from '../components/auth/ForgotPasswordModal';

// export default function LoginClient() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     rememberMe: false
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showForgotPassword, setShowForgotPassword] = useState(false);

//   // Load remembered email
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const rememberedEmail = localStorage.getItem('rememberedEmail');
//       if (rememberedEmail) {
//         setFormData(prev => ({ ...prev, email: rememberedEmail, rememberMe: true }));
//       }
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

  
//   // Google Sign In Success Handler
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setIsSubmitting(true);

//   const loadingToast = toast.loading('🎈 Logging in...');

//   try {
//     const response = await fetch('https://gadget-backend.vercel.app/api/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         email: formData.email,
//         password: formData.password
//       }),
//     });

//     const data = await response.json();
//     toast.dismiss(loadingToast);

//     if (!response.ok) {
//       if (data.requiresVerification) {
//         toast.info('📧 Verify Your Email', {
//           description: 'Please check your email for verification code.',
//           duration: 5000,
//         });
//         setIsSubmitting(false);
//         return;
//       }
//       toast.error('Oops! ' + (data.error || 'Login failed'), {
//         description: 'Please check your credentials and try again.',
//         duration: 5000,
//       });
//       setIsSubmitting(false);
//       return;
//     }

//     toast.success('🎉 Welcome back!', {
//       description: `Ready for fun, ${data.user.contactPerson || data.user.companyName || 'Toy Lover'}!`,
//       duration: 4000,
//     });

//     if (typeof window !== 'undefined') {
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('user', JSON.stringify(data.user));
//       if (formData.rememberMe) {
//         localStorage.setItem('rememberedEmail', formData.email);
//       } else {
//         localStorage.removeItem('rememberedEmail');
//       }
//     }

//     // ========== MERGE GUEST CART ==========
//     const guestCartSessionId = localStorage.getItem('cartSessionId');
//     if (guestCartSessionId && data.token) {
//       try {
//         const mergeResponse = await fetch('https://gadget-backend.vercel.app/api/cart/merge', {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${data.token}`,
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ sessionId: guestCartSessionId })
//         });
        
//         const mergeData = await mergeResponse.json();
//         if (mergeData.success) {
//           localStorage.removeItem('cartSessionId');
//           window.dispatchEvent(new Event('cart-update'));
//           console.log('Guest cart merged successfully');
//         }
//       } catch (mergeError) {
//         console.error('Merge cart error:', mergeError);
//       }
//     }

//     // ========== ADD THIS - MERGE GUEST WISHLIST ==========
//     const guestWishlistSessionId = localStorage.getItem('wishlistSessionId');
//     if (guestWishlistSessionId && data.token) {
//       try {
//         const mergeResponse = await fetch('https://gadget-backend.vercel.app/api/wishlist/merge', {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${data.token}`,
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ sessionId: guestWishlistSessionId })
//         });
        
//         const mergeData = await mergeResponse.json();
//         if (mergeData.success) {
//           localStorage.removeItem('wishlistSessionId');
//           window.dispatchEvent(new Event('wishlist-update'));
//           console.log('Guest wishlist merged successfully');
//         }
//       } catch (mergeError) {
//         console.error('Merge wishlist error:', mergeError);
//       }
//     }
//     // ========== END OF WISHLIST MERGE ==========

//     // Role-based redirect
//     setTimeout(() => {
//       let dashboardPath = '/';
//       switch(data.user.role) {
//         case 'admin':
//           dashboardPath = '/admin/dashboard';
//           break;
//         case 'moderator':
//           dashboardPath = '/moderator/dashboard';
//           break;
//         default:
//           dashboardPath = '/customer/dashboard';
//       }
//       window.location.href = dashboardPath;
//     }, 1500);

//   } catch (error) {
//     console.error('Login error:', error);
//     toast.error('Connection Error', {
//       description: 'Unable to connect. Please try again!',
//       duration: 5000,
//     });
//     setIsSubmitting(false);
//   }
// };

// //   const handleGoogleSuccess = async (data) => {
// //   console.log('Google sign in success:', data);
  
// //   if (data.token) {
// //     localStorage.setItem('token', data.token);
// //     localStorage.setItem('user', JSON.stringify(data.user));
    
// //     // ========== ADD THIS CART MERGE CODE FOR GOOGLE LOGIN ==========
// //     // Merge guest cart after successful Google login
// //     const guestSessionId = localStorage.getItem('cartSessionId');
// //     if (guestSessionId && data.token) {
// //       try {
// //         const mergeResponse = await fetch('https://gadget-backend.vercel.app/api/cart/merge', {
// //           method: 'POST',
// //           headers: {
// //             'Authorization': `Bearer ${data.token}`,
// //             'Content-Type': 'application/json'
// //           },
// //           body: JSON.stringify({ sessionId: guestSessionId })
// //         });
        
// //         const mergeData = await mergeResponse.json();
// //         if (mergeData.success) {
// //           localStorage.removeItem('cartSessionId');
// //           window.dispatchEvent(new Event('cart-update'));
// //           console.log('Guest cart merged successfully');
// //         }
// //       } catch (mergeError) {
// //         console.error('Merge cart error:', mergeError);
// //       }
// //     }
// //     // ========== END OF CART MERGE CODE ==========
    
// //     if (data.requiresAdditionalInfo) {
// //       toast.success('🎉 Google Sign In Successful!', {
// //         description: 'Please complete your profile to continue.',
// //         duration: 4000,
// //       });
// //     } else {
// //       toast.success('🎉 Welcome back!', {
// //         description: `Ready for fun, ${data.user.contactPerson || data.user.companyName || 'Toy Lover'}!`,
// //         duration: 4000,
// //       });
// //     }
// //     // GoogleLoginButton handles redirect based on requiresAdditionalInfo
// //   }
// // };
  

// const handleGoogleSuccess = async (data) => {
//   console.log('Google sign in success:', data);
  
//   if (data.token) {
//     localStorage.setItem('token', data.token);
//     localStorage.setItem('user', JSON.stringify(data.user));
    
//     // Merge guest cart after successful Google login
//     const guestCartSessionId = localStorage.getItem('cartSessionId');
//     if (guestCartSessionId && data.token) {
//       try {
//         const mergeResponse = await fetch('https://gadget-backend.vercel.app/api/cart/merge', {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${data.token}`,
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ sessionId: guestCartSessionId })
//         });
        
//         const mergeData = await mergeResponse.json();
//         if (mergeData.success) {
//           localStorage.removeItem('cartSessionId');
//           window.dispatchEvent(new Event('cart-update'));
//           console.log('Guest cart merged successfully');
//         }
//       } catch (mergeError) {
//         console.error('Merge cart error:', mergeError);
//       }
//     }
    
//     // ========== ADD THIS - Merge guest wishlist ==========
//     const guestWishlistSessionId = localStorage.getItem('wishlistSessionId');
//     if (guestWishlistSessionId && data.token) {
//       try {
//         const mergeResponse = await fetch('https://gadget-backend.vercel.app/api/wishlist/merge', {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${data.token}`,
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ sessionId: guestWishlistSessionId })
//         });
        
//         const mergeData = await mergeResponse.json();
//         if (mergeData.success) {
//           localStorage.removeItem('wishlistSessionId');
//           window.dispatchEvent(new Event('wishlist-update'));
//           console.log('Guest wishlist merged successfully');
//         }
//       } catch (mergeError) {
//         console.error('Merge wishlist error:', mergeError);
//       }
//     }
//     // ========== END OF WISHLIST MERGE ==========
    
//     if (data.requiresAdditionalInfo) {
//       toast.success('🎉 Google Sign In Successful!', {
//         description: 'Please complete your profile to continue.',
//         duration: 4000,
//       });
//     } else {
//       toast.success('🎉 Welcome back!', {
//         description: `Ready for fun, ${data.user.contactPerson || data.user.companyName || 'Toy Lover'}!`,
//         duration: 4000,
//       });
//     }
//   }
// };
//   const handleGoogleError = (error) => {
//     console.error('Google sign in error:', error);
//     toast.error('Google Sign In Failed', {
//       description: error || 'Unable to sign in with Google. Please try again.',
//     });
//   };

//   // Floating elements background
//   const floatingElements = [
//     { icon: '🎈', x: '5%', y: '10%', delay: 0, duration: 8 },
//     { icon: '🎪', x: '85%', y: '15%', delay: 1, duration: 10 },
//     { icon: '🎨', x: '10%', y: '75%', delay: 2, duration: 9 },
//     { icon: '🚀', x: '90%', y: '70%', delay: 0.5, duration: 11 },
//     { icon: '🧸', x: '15%', y: '45%', delay: 1.5, duration: 7 },
//     { icon: '🎮', x: '80%', y: '40%', delay: 2.5, duration: 12 },
//     { icon: '🎯', x: '45%', y: '85%', delay: 3, duration: 6 },
//     { icon: '⭐', x: '70%', y: '90%', delay: 0.8, duration: 9 },
//     { icon: '🎵', x: '30%', y: '20%', delay: 1.8, duration: 8 },
//     { icon: '📚', x: '60%', y: '55%', delay: 2.2, duration: 10 },
//   ];

//   return (
//     <>
//       <Navbar />
    
//       <div className="min-h-screen bg-gradient-to-br from-[#4F9DFF]/10 via-[#FF7B54]/5 to-[#FFD93D]/10 overflow-hidden relative">
        
//         {/* Animated Background Pattern */}
//         <div className="absolute inset-0 pointer-events-none">
//           <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//               <pattern id="toys" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
//                 <circle cx="5" cy="5" r="3" fill="#4F9DFF" opacity="0.5" />
//                 <circle cx="30" cy="30" r="2" fill="#FF7B54" opacity="0.5" />
//                 <circle cx="50" cy="15" r="2.5" fill="#FFD93D" opacity="0.5" />
//               </pattern>
//             </defs>
//             <rect width="100%" height="100%" fill="url(#toys)" />
//           </svg>
//         </div>

//         {/* Floating Emojis Animation */}
//         {floatingElements.map((item, idx) => (
//           <motion.div
//             key={idx}
//             className="absolute hidden lg:block text-3xl pointer-events-none"
//             style={{ left: item.x, top: item.y }}
//             animate={{
//               y: [0, -30, 0, 30, 0],
//               x: [0, 10, -10, 5, 0],
//               rotate: [0, 15, -15, 10, 0],
//             }}
//             transition={{
//               duration: item.duration,
//               delay: item.delay,
//               repeat: Infinity,
//               ease: "easeInOut"
//             }}
//           >
//             {item.icon}
//           </motion.div>
//         ))}

//         <div className="container mx-auto px-4 min-h-screen flex items-center justify-center py-12">
//           <div className="max-w-md w-full mx-auto">
            
//             {/* Fun Header */}
//             <motion.div
//               initial={{ opacity: 0, y: -50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, type: "spring" }}
//               className="text-center mb-6"
//             >
             
              
//               <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#4F9DFF] via-[#FF7B54] to-[#FFD93D] bg-clip-text text-transparent mb-1" 
//                   style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//                 ToyMart
//               </h1>
              
//               <div className="flex items-center justify-center gap-2 mb-2">
//                 <Sparkles className="w-3 h-3 text-[#FFD93D] animate-pulse" />
//                 <p className="text-gray-600 text-sm" style={{ fontFamily: "'Comic Neue', cursive" }}>
//                   Where every child's dream comes true!
//                 </p>
//                 <Sparkles className="w-3 h-3 text-[#FFD93D] animate-pulse" />
//               </div>
              
//               <div className="inline-block bg-gradient-to-r from-[#FFD93D] to-[#FF7B54] rounded-full px-3 py-1 shadow-md">
//                 <p className="text-white text-xs font-bold" style={{ fontFamily: "'Comic Neue', cursive" }}>
//                   🎁 Sign in to continue your adventure 🎈
//                 </p>
//               </div>
//             </motion.div>

//             {/* Login Card */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="bg-white rounded-3xl shadow-2xl p-6 border-2 border-[#FFD93D]/40"
//             >

//               <form onSubmit={handleSubmit} className="space-y-4">
//                 {/* Email Field */}
//                 <div>
//                   <label className="block text-xs font-bold text-gray-700 mb-1.5" style={{ fontFamily: "'Comic Neue', cursive" }}>
//                     📧 Your Email
//                   </label>
//                   <div className="relative group">
//                     <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#4F9DFF] transition-colors" />
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                       className="w-full pl-11 pr-4 py-2.5 text-sm text-gray-700 border-2 border-gray-200 rounded-xl focus:border-[#4F9DFF] focus:ring-2 focus:ring-[#4F9DFF]/20 transition-all bg-gray-50 focus:bg-white"
//                       placeholder="Enter your email"
//                       style={{ fontFamily: "'Comic Neue', sans-serif" }}
//                     />
//                   </div>
//                 </div>

//                 {/* Password Field */}
//                 <div>
//                   <label className="block text-xs font-bold text-gray-700 mb-1.5" style={{ fontFamily: "'Comic Neue', cursive" }}>
//                     🔒 Secret Password
//                   </label>
//                   <div className="relative group">
//                     <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#4F9DFF] transition-colors" />
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       required
//                       className="w-full pl-11 pr-11 py-2.5 text-sm text-gray-700 border-2 border-gray-200 rounded-xl focus:border-[#4F9DFF] focus:ring-2 focus:ring-[#4F9DFF]/20 transition-all bg-gray-50 focus:bg-white"
//                       placeholder="Enter your secret password"
//                       style={{ fontFamily: "'Comic Neue', sans-serif" }}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-4 top-1/2 transform -translate-y-1/2"
//                     >
//                       {showPassword ? (
//                         <EyeOff className="w-4 h-4 text-gray-400 hover:text-[#4F9DFF] transition-colors" />
//                       ) : (
//                         <Eye className="w-4 h-4 text-gray-400 hover:text-[#4F9DFF] transition-colors" />
//                       )}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Options Row */}
//                 <div className="flex items-center justify-between">
                 
//                   <button
//                     type="button"
//                     onClick={() => setShowForgotPassword(true)}
//                     className="text-xs text-[#4A8A90] hover:text-[#276167] font-semibold transition-colors"
//                     style={{ fontFamily: "'Comic Neue', cursive" }}
//                   >
//                     Forgot password? 🤔
//                   </button>
//                 </div>

//                 {/* Submit Button */}
//                 <motion.button
//                   whileHover={{ scale: 1.02, y: -1 }}
//                   whileTap={{ scale: 0.98 }}
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1] text-white py-2.5 rounded-xl font-bold text-base hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
//                   style={{ fontFamily: "'Fredoka One', cursive" }}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Logging in...
//                     </>
//                   ) : (
//                     <>
//                       🚀 Let's Go!
//                       <ArrowRight className="w-4 h-4" />
//                     </>
//                   )}
//                 </motion.button>

//                 {/* Divider */}
//                 <div className="relative my-4">
//                   <div className="absolute inset-0 flex items-center">
//                     <div className="w-full border-t-2 border-dashed border-gray-200" />
//                   </div>
//                   <div className="relative flex justify-center">
//                     <span className="px-3 bg-white text-gray-500 text-xs" style={{ fontFamily: "'Comic Neue', cursive" }}>
//                       or continue with
//                     </span>
//                   </div>
//                 </div>

//                 {/* Google Login Button */}
//                 <div className="w-full">
//                   <GoogleLoginButton 
//                     mode="login"
//                     onSuccess={handleGoogleSuccess}
//                     onError={handleGoogleError}
//                   />
//                 </div>

//                 {/* Register Link */}
//                 <div className="text-center mt-4">
//                   <p className="text-xs text-gray-600" style={{ fontFamily: "'Comic Neue', cursive" }}>
//                     New to ToyMart?{' '}
//                     <Link href="/register" className="font-bold text-[#4A8A90] hover:text-[#276167] transition-colors">
//                       Create Account 🎁
//                     </Link>
//                   </p>
//                 </div>
//               </form>
//             </motion.div>

//             {/* Fun Footer Banner */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.5 }}
//               className="mt-4 bg-gradient-to-r from-[#FFD93D] to-[#FF7B54] rounded-2xl p-2 text-center shadow-lg"
//             >
//               <p className="text-white font-bold text-xs flex items-center justify-center gap-1" style={{ fontFamily: "'Comic Neue', cursive" }}>
//                 <Sparkles className="w-3 h-3" />
//                 🎉 New users get 10% OFF on first purchase! 🎉
//                 <Sparkles className="w-3 h-3" />
//               </p>
//             </motion.div>

//             {/* Features Row */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.7 }}
//               className="flex flex-wrap justify-center gap-2 mt-4"
//             >
//               {['🎈 Safe Shopping', '🚚 Free Delivery', '🎁 Gift Wrap', '⭐ 24/7 Support'].map((feature, idx) => (
//                 <div key={idx} className="flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-full px-2.5 py-0.5 shadow-sm">
//                   <span className="text-[10px] text-gray-600" style={{ fontFamily: "'Comic Neue', cursive" }}>{feature}</span>
//                 </div>
//               ))}
//             </motion.div>
//           </div>
//         </div>

//         {/* Forgot Password Modal */}
//         <ForgotPasswordModal 
//           isOpen={showForgotPassword}
//           onClose={() => setShowForgotPassword(false)}
//         />

//         {/* Google Fonts */}
//         <style jsx global>{`
//           @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&family=Fredoka+One&display=swap');
//         `}</style>
//       </div>
//       {/* <Footer /> */}
//     </>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Shield,
  Zap,
  Headphones,
  Truck,
  Cpu,
  Smartphone
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import GoogleLoginButton from '../components/GoogleLoginButton';
import ForgotPasswordModal from '../components/auth/ForgotPasswordModal';

export default function LoginClient() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Load remembered email
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const rememberedEmail = localStorage.getItem('rememberedEmail');
      if (rememberedEmail) {
        setFormData(prev => ({ ...prev, email: rememberedEmail, rememberMe: true }));
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const loadingToast = toast.loading('Logging in...');

    try {
      const response = await fetch('https://gadget-backend.vercel.app/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();
      toast.dismiss(loadingToast);

      if (!response.ok) {
        if (data.requiresVerification) {
          toast.info('Verify Your Email', {
            description: 'Please check your email for verification code.',
            duration: 5000,
          });
          setIsSubmitting(false);
          return;
        }
        toast.error('Login failed', {
          description: data.error || 'Please check your credentials and try again.',
          duration: 5000,
        });
        setIsSubmitting(false);
        return;
      }

      toast.success('Welcome back!', {
        description: `Logged in as ${data.user.contactPerson || data.user.companyName || data.user.email?.split('@')[0]}`,
        duration: 4000,
      });

      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        if (formData.rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
      }

      // Merge guest cart
      const guestCartSessionId = localStorage.getItem('cartSessionId');
      if (guestCartSessionId && data.token) {
        try {
          const mergeResponse = await fetch('https://gadget-backend.vercel.app/api/cart/merge', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${data.token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sessionId: guestCartSessionId })
          });
          
          const mergeData = await mergeResponse.json();
          if (mergeData.success) {
            localStorage.removeItem('cartSessionId');
            window.dispatchEvent(new Event('cart-update'));
            console.log('Guest cart merged successfully');
          }
        } catch (mergeError) {
          console.error('Merge cart error:', mergeError);
        }
      }

      // Merge guest wishlist
      const guestWishlistSessionId = localStorage.getItem('wishlistSessionId');
      if (guestWishlistSessionId && data.token) {
        try {
          const mergeResponse = await fetch('https://gadget-backend.vercel.app/api/wishlist/merge', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${data.token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sessionId: guestWishlistSessionId })
          });
          
          const mergeData = await mergeResponse.json();
          if (mergeData.success) {
            localStorage.removeItem('wishlistSessionId');
            window.dispatchEvent(new Event('wishlist-update'));
            console.log('Guest wishlist merged successfully');
          }
        } catch (mergeError) {
          console.error('Merge wishlist error:', mergeError);
        }
      }

      // Role-based redirect
      setTimeout(() => {
        let dashboardPath = '/';
        switch(data.user.role) {
          case 'admin':
            dashboardPath = '/admin/dashboard';
            break;
          case 'moderator':
            dashboardPath = '/moderator/dashboard';
            break;
          default:
            dashboardPath = '/customer/dashboard';
        }
        window.location.href = dashboardPath;
      }, 1500);

    } catch (error) {
      console.error('Login error:', error);
      toast.error('Connection Error', {
        description: 'Unable to connect. Please try again!',
        duration: 5000,
      });
      setIsSubmitting(false);
    }
  };

  const handleGoogleSuccess = async (data) => {
    console.log('Google sign in success:', data);
    
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Merge guest cart
      const guestCartSessionId = localStorage.getItem('cartSessionId');
      if (guestCartSessionId && data.token) {
        try {
          const mergeResponse = await fetch('https://gadget-backend.vercel.app/api/cart/merge', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${data.token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sessionId: guestCartSessionId })
          });
          
          const mergeData = await mergeResponse.json();
          if (mergeData.success) {
            localStorage.removeItem('cartSessionId');
            window.dispatchEvent(new Event('cart-update'));
            console.log('Guest cart merged successfully');
          }
        } catch (mergeError) {
          console.error('Merge cart error:', mergeError);
        }
      }
      
      // Merge guest wishlist
      const guestWishlistSessionId = localStorage.getItem('wishlistSessionId');
      if (guestWishlistSessionId && data.token) {
        try {
          const mergeResponse = await fetch('https://gadget-backend.vercel.app/api/wishlist/merge', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${data.token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sessionId: guestWishlistSessionId })
          });
          
          const mergeData = await mergeResponse.json();
          if (mergeData.success) {
            localStorage.removeItem('wishlistSessionId');
            window.dispatchEvent(new Event('wishlist-update'));
            console.log('Guest wishlist merged successfully');
          }
        } catch (mergeError) {
          console.error('Merge wishlist error:', mergeError);
        }
      }
      
      if (data.requiresAdditionalInfo) {
        toast.success('Google Sign In Successful!', {
          description: 'Please complete your profile to continue.',
          duration: 4000,
        });
      } else {
        toast.success('Welcome back!', {
          description: `Logged in as ${data.user.contactPerson || data.user.companyName || data.user.email?.split('@')[0]}`,
          duration: 4000,
        });
      }
    }
  };

  const handleGoogleError = (error) => {
    console.error('Google sign in error:', error);
    toast.error('Google Sign In Failed', {
      description: error || 'Unable to sign in with Google. Please try again.',
    });
  };

  return (
    <>
      <Navbar />
    
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden relative">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <rect width="30" height="30" fill="none" stroke="#3B82F6" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Tech Decorative Circles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 min-h-[calc(100vh-64px)] flex items-center justify-center py-8">
          <div className="max-w-md w-full mx-auto">
            
            {/* Logo & Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center mb-6"
            >
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-lg">
                  <Cpu className="w-7 h-7 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Smart Gadget
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Sign in to your Smart Gadget account
              </p>
            </motion.div>

            {/* Login Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <div className="p-5">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email Field */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-9 pr-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-gray-50 focus:bg-white"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full pl-9 pr-9 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-gray-50 focus:bg-white"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Options Row */}
                  <div className="flex  justify-end">
                  
                    
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white py-2 rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-blue-600 transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>

                  {/* Divider */}
                  <div className="relative my-3">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-3 bg-white text-gray-400 text-xs">
                        OR
                      </span>
                    </div>
                  </div>

                  {/* Google Login Button */}
                  <div className="w-full">
                    <GoogleLoginButton 
                      mode="login"
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleError}
                    />
                  </div>

                  {/* Register Link */}
                  <div className="text-center pt-1">
                    <p className="text-xs text-gray-500">
                      New to Smart Gadget?{' '}
                      <Link href="/register" className="font-medium text-blue-600 hover:text-blue-700 transition-colors">
                        Create an account
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Features Row - Compact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-4 gap-2 mt-5"
            >
              <div className="flex flex-col items-center gap-1 px-2 py-2 bg-white rounded-lg border border-gray-100 shadow-sm">
                <Shield className="w-4 h-4 text-blue-500" />
                <span className="text-[10px] text-gray-600">Secure</span>
              </div>
              <div className="flex flex-col items-center gap-1 px-2 py-2 bg-white rounded-lg border border-gray-100 shadow-sm">
                <Truck className="w-4 h-4 text-green-500" />
                <span className="text-[10px] text-gray-600">Fast Ship</span>
              </div>
              <div className="flex flex-col items-center gap-1 px-2 py-2 bg-white rounded-lg border border-gray-100 shadow-sm">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-[10px] text-gray-600">1-Yr Warranty</span>
              </div>
              <div className="flex flex-col items-center gap-1 px-2 py-2 bg-white rounded-lg border border-gray-100 shadow-sm">
                <Headphones className="w-4 h-4 text-purple-500" />
                <span className="text-[10px] text-gray-600">24/7</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Forgot Password Modal */}
        <ForgotPasswordModal 
          isOpen={showForgotPassword}
          onClose={() => setShowForgotPassword(false)}
        />
      </div>
    </>
  );
}