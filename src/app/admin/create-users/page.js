

// // app/admin/createUser/page.js
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import { toast } from 'sonner';
// import Link from 'next/link';
// import { 
//   User, 
//   Mail, 
//   Phone, 
//   Smartphone, 
//   Lock, 
//   Eye, 
//   EyeOff,
//   ArrowLeft,
//   Shield,
//   Sparkles,
//   Gift,
//   Rocket
// } from 'lucide-react';

// export default function CreateUsers() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     contactPerson: '',
//     email: '',
//     phone: '',
//     whatsapp: '',
//     password: '',
//     confirmPassword: '',
//     role: 'moderator'
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (formData.password !== formData.confirmPassword) {
//       toast.error('🔐 Password Mismatch', {
//         description: 'The passwords you entered do not match.',
//         duration: 4000,
//       });
//       setIsSubmitting(false);
//       return;
//     }

//     if (formData.password.length < 8) {
//       toast.error('🔒 Weak Password', {
//         description: 'Password must be at least 8 characters long.',
//         duration: 4000,
//       });
//       setIsSubmitting(false);
//       return;
//     }

//     if (!formData.contactPerson || !formData.email || !formData.phone || !formData.password) {
//       toast.error('📝 Missing Fields', {
//         description: 'Please fill in all required fields.',
//         duration: 4000,
//       });
//       setIsSubmitting(false);
//       return;
//     }

//     const loadingToast = toast.loading('🎈 Creating user account...');

//     try {
//       const token = localStorage.getItem('token');

//       const response = await fetch('http://localhost:5000/api/admin/users', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           contactPerson: formData.contactPerson,
//           email: formData.email,
//           phone: formData.phone,
//           whatsapp: formData.whatsapp || '',
//           role: formData.role,
//           password: formData.password,
//           country: 'Bangladesh',
//           address: 'Not Specified',
//           city: 'Not Specified',
//           zipCode: 'Not Specified',
//           emailVerified: true,
//           isActive: true,
//           registrationStatus: 'completed'
//         }),
//       });

//       const data = await response.json();
//       toast.dismiss(loadingToast);

//       if (!response.ok) {
//         toast.error('Creation Failed', {
//           description: data.error || 'Something went wrong. Please try again.',
//           duration: 5000,
//         });
//         setIsSubmitting(false);
//         return;
//       }

//       toast.success('🎉 User Created Successfully!', {
//         description: `${formData.role === 'admin' ? 'Admin' : 'Moderator'} account for ${formData.contactPerson} has been created.`,
//         duration: 5000,
//       });

//       toast.info('📧 Login Credentials', {
//         description: `Email: ${formData.email}`,
//         duration: 8000,
//       });

//       setFormData({
//         contactPerson: '',
//         email: '',
//         phone: '',
//         whatsapp: '',
//         password: '',
//         confirmPassword: '',
//         role: 'moderator'
//       });

//       setTimeout(() => {
//         router.push('/admin/manage-users');
//       }, 2000);

//     } catch (err) {
//       toast.dismiss(loadingToast);
//       toast.error('Connection Error', {
//         description: 'Unable to connect to server. Please check your internet connection.',
//         duration: 5000,
//       });
//       setIsSubmitting(false);
//     }
//   };

//   // Floating elements for background
//   const floatingElements = [
//     { icon: '🎈', left: '5%', top: '10%', delay: 0, duration: 8 },
//     { icon: '🧸', left: '85%', top: '15%', delay: 1, duration: 10 },
//     { icon: '🎪', left: '10%', top: '75%', delay: 2, duration: 9 },
//     { icon: '🎨', left: '90%', top: '70%', delay: 0.5, duration: 11 },
//     { icon: '🚀', left: '15%', top: '45%', delay: 1.5, duration: 7 },
//     { icon: '⭐', left: '80%', top: '40%', delay: 2.5, duration: 12 },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#FFF9F0] to-[#D4EDEE] py-4 relative overflow-hidden">
//       {/* Floating Background Elements */}
//       <div className="absolute inset-0 pointer-events-none">
//         {floatingElements.map((item, i) => (
//           <motion.div
//             key={i}
//             className="absolute text-2xl md:text-3xl opacity-20"
//             style={{ left: item.left, top: item.top }}
//             animate={{ 
//               y: [0, -20, 0],
//               x: [0, 10, 0],
//               rotate: [0, 10, -10, 0],
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
//       </div>

//       <div className="container mx-auto  max-w-4xl relative z-10">
//         {/* Header with back button */}
//         <div className="mb-6 flex items-center justify-between">
//           <Link 
//             href="/admin/manage-users" 
//             className="inline-flex items-center text-gray-600 hover:text-[#4A8A90] transition-colors group"
//           >
//             <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mr-2 group-hover:bg-[#4A8A90] group-hover:text-white transition-all">
//               <ArrowLeft className="w-4 h-4" />
//             </div>
//             <span className="font-medium">Back to Users</span>
//           </Link>
          
//           <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-[#FFB6C1]">
//             <Gift className="w-4 h-4 text-[#4A8A90]" />
//             <span className="text-sm font-medium text-[#4A8A90]">Admin Creation</span>
//           </div>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
//         >
//           {/* Header with ToyMart gradient */}
//           <div className="px-8 py-6 bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1]">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-2xl font-bold text-white flex items-center gap-2" style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}>
//                   <User className="w-6 h-6" />
//                   Create New User
//                 </h1>
//                 <p className="text-white/90 text-sm mt-1">
//                   Create admin or moderator accounts for platform management 🎈
//                 </p>
//               </div>
//               <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
//                 <Shield className="w-6 h-6 text-white" />
//               </div>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="p-8">
//             {/* Role Selection */}
//             <div className="mb-8">
//               <label className="block text-sm font-semibold text-gray-700 mb-3">
//                 Select User Role <span className="text-[#4A8A90]">*</span>
//               </label>
//               <div className="grid grid-cols-2 gap-4">
//                 <label className={`
//                   relative flex items-center p-5 border-2 rounded-xl cursor-pointer transition-all
//                   ${formData.role === 'admin' 
//                     ? 'border-[#4A8A90] bg-[#D4EDEE]' 
//                     : 'border-gray-200 hover:border-[#4A8A90] hover:bg-[#D4EDEE]/30'}
//                 `}>
//                   <input
//                     type="radio"
//                     name="role"
//                     value="admin"
//                     checked={formData.role === 'admin'}
//                     onChange={handleChange}
//                     className="sr-only"
//                   />
//                   <div className="flex items-center gap-4">
//                     <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
//                       formData.role === 'admin' ? 'bg-[#4A8A90] text-white' : 'bg-gray-100 text-gray-500'
//                     }`}>
//                       <Shield className="w-6 h-6" />
//                     </div>
//                     <div>
//                       <div className={`text-lg font-semibold ${formData.role === 'admin' ? 'text-[#4A8A90]' : 'text-gray-700'}`}>
//                         Admin
//                       </div>
//                       <div className="text-xs text-gray-500 mt-1">Full system access</div>
//                     </div>
//                   </div>
//                 </label>

//                 <label className={`
//                   relative flex items-center p-5 border-2 rounded-xl cursor-pointer transition-all
//                   ${formData.role === 'moderator' 
//                     ? 'border-[#4A8A90] bg-[#D4EDEE]' 
//                     : 'border-gray-200 hover:border-[#4A8A90] hover:bg-[#D4EDEE]/30'}
//                 `}>
//                   <input
//                     type="radio"
//                     name="role"
//                     value="moderator"
//                     checked={formData.role === 'moderator'}
//                     onChange={handleChange}
//                     className="sr-only"
//                   />
//                   <div className="flex items-center gap-4">
//                     <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
//                       formData.role === 'moderator' ? 'bg-[#4A8A90] text-white' : 'bg-gray-100 text-gray-500'
//                     }`}>
//                       <Rocket className="w-6 h-6" />
//                     </div>
//                     <div>
//                       <div className={`text-lg font-semibold ${formData.role === 'moderator' ? 'text-[#4A8A90]' : 'text-gray-700'}`}>
//                         Moderator
//                       </div>
//                       <div className="text-xs text-gray-500 mt-1">Limited management access</div>
//                     </div>
//                   </div>
//                 </label>
//               </div>
//             </div>

//             {/* Info Banner */}
//             <div className="mb-6 p-4 bg-[#D4EDEE] rounded-xl border border-[#FFB6C1]">
//               <div className="flex items-start gap-3">
//                 <div className="text-[#4A8A90] mt-0.5">
//                   <Sparkles className="w-5 h-5" />
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-[#2D3A5C]">✨ Account Verification</p>
//                   <p className="text-xs text-gray-600 mt-1">
//                     Users created by admin are automatically verified. No email verification required. 
//                     They can login immediately with the provided credentials.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Form Fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Full Name */}
//               <div className="col-span-2 md:col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   👤 Full Name <span className="text-[#4A8A90]">*</span>
//                 </label>
//                 <div className="relative group">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <User className="w-5 h-5 text-gray-400 group-focus-within:text-[#4A8A90]" />
//                   </div>
//                   <input
//                     type="text"
//                     name="contactPerson"
//                     value={formData.contactPerson}
//                     onChange={handleChange}
//                     required
//                     className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-[#4A8A90] transition-all group-hover:border-[#4A8A90]"
//                     placeholder="Enter full name"
//                   />
//                 </div>
//               </div>

//               {/* Email */}
//               <div className="col-span-2 md:col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   📧 Email Address <span className="text-[#4A8A90]">*</span>
//                 </label>
//                 <div className="relative group">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-[#4A8A90]" />
//                   </div>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-[#4A8A90] transition-all group-hover:border-[#4A8A90]"
//                     placeholder="user@example.com"
//                   />
//                 </div>
//               </div>

//               {/* Phone Number */}
//               <div className="col-span-2 md:col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   📞 Phone Number <span className="text-[#4A8A90]">*</span>
//                 </label>
//                 <div className="relative group">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Phone className="w-5 h-5 text-gray-400 group-focus-within:text-[#4A8A90]" />
//                   </div>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     required
//                     className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-[#4A8A90] transition-all group-hover:border-[#4A8A90]"
//                     placeholder="+880 1234 567890"
//                   />
//                 </div>
//               </div>

//               {/* WhatsApp */}
//               <div className="col-span-2 md:col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   💬 WhatsApp Number <span className="text-[#4A8A90]">*</span>
//                 </label>
//                 <div className="relative group">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Smartphone className="w-5 h-5 text-gray-400 group-focus-within:text-[#4A8A90]" />
//                   </div>
//                   <input
//                     type="tel"
//                     name="whatsapp"
//                     value={formData.whatsapp}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-[#4A8A90] transition-all group-hover:border-[#4A8A90]"
//                     placeholder="+880 1234 567890"
//                   />
//                 </div>
//               </div>

//               {/* Password */}
//               <div className="col-span-2 md:col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   🔒 Password <span className="text-[#4A8A90]">*</span>
//                 </label>
//                 <div className="relative group">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-[#4A8A90] pr-10 transition-all group-hover:border-[#4A8A90]"
//                     placeholder="Min. 8 characters"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#4A8A90] transition-colors"
//                   >
//                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//               </div>

//               {/* Confirm Password */}
//               <div className="col-span-2 md:col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   🔒 Confirm Password <span className="text-[#4A8A90]">*</span>
//                 </label>
//                 <div className="relative group">
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-[#4A8A90] pr-10 transition-all group-hover:border-[#4A8A90]"
//                     placeholder="Re-enter password"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#4A8A90] transition-colors"
//                   >
//                     {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Password Strength Indicator */}
//             {formData.password && (
//               <div className="mt-6 p-4 bg-[#FFF9F0] rounded-xl border border-[#FFB6C1]">
//                 <div className="flex items-center gap-2 mb-2">
//                   <div className={`h-2 flex-1 rounded-full ${
//                     formData.password.length >= 8 ? 'bg-[#4A8A90]' : 'bg-gray-200'
//                   }`} />
//                   <div className={`h-2 flex-1 rounded-full ${
//                     /[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) ? 'bg-[#4A8A90]' : 'bg-gray-200'
//                   }`} />
//                   <div className={`h-2 flex-1 rounded-full ${
//                     /[0-9]/.test(formData.password) ? 'bg-[#4A8A90]' : 'bg-gray-200'
//                   }`} />
//                   <div className={`h-2 flex-1 rounded-full ${
//                     /[^A-Za-z0-9]/.test(formData.password) ? 'bg-[#4A8A90]' : 'bg-gray-200'
//                   }`} />
//                 </div>
//                 <p className="text-xs text-gray-600 flex items-center gap-1">
//                   <span className="w-1.5 h-1.5 rounded-full bg-[#4A8A90]"></span>
//                   Password must be at least 8 characters with uppercase, lowercase, number and special character
//                 </p>
//               </div>
//             )}

//             {/* Submit Button */}
//             <div className="mt-8">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full py-4 px-4 text-white font-semibold rounded-xl hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A8A90] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md bg-gradient-to-r from-[#4A8A90] to-[#FFB6C1]"
//                 style={{ fontFamily: "'Fredoka One', 'Comic Neue', cursive" }}
//               >
//                 {isSubmitting ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                     </svg>
//                     Creating User...
//                   </span>
//                 ) : (
//                   <span className="flex items-center justify-center gap-2">
//                     🚀 Create {formData.role === 'admin' ? 'Admin' : 'Moderator'} Account
//                     <Sparkles className="w-5 h-5" />
//                   </span>
//                 )}
//               </button>
//             </div>

//             {/* Note about login */}
//             <div className="mt-4 text-center">
//               <p className="text-xs text-gray-500">
//                 Users will be able to login immediately with the provided credentials.
//                 No email verification required. 🎈
//               </p>
//             </div>
//           </form>
//         </motion.div>
//       </div>
//     </div>
//   );
// }


// app/admin/createUser/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Link from 'next/link';
import { 
  User, 
  Mail, 
  Phone, 
  Smartphone, 
  Lock, 
  Eye, 
  EyeOff,
  ArrowLeft,
  Shield,
  Sparkles,
  Gift,
  Rocket,
  Briefcase,
  Users,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function CreateUsers() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    contactPerson: '',
    email: '',
    phone: '',
    whatsapp: '',
    password: '',
    confirmPassword: '',
    role: 'moderator'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error('Password Mismatch', {
        description: 'The passwords you entered do not match.',
        duration: 4000,
      });
      setIsSubmitting(false);
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Weak Password', {
        description: 'Password must be at least 8 characters long.',
        duration: 4000,
      });
      setIsSubmitting(false);
      return;
    }

    if (!formData.contactPerson || !formData.email || !formData.phone || !formData.password) {
      toast.error('Missing Fields', {
        description: 'Please fill in all required fields.',
        duration: 4000,
      });
      setIsSubmitting(false);
      return;
    }

    const loadingToast = toast.loading('Creating user account...');

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5000/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          contactPerson: formData.contactPerson,
          email: formData.email,
          phone: formData.phone,
          whatsapp: formData.whatsapp || '',
          role: formData.role,
          password: formData.password,
          country: 'Bangladesh',
          address: 'Not Specified',
          city: 'Not Specified',
          zipCode: 'Not Specified',
          emailVerified: true,
          isActive: true,
          registrationStatus: 'completed'
        }),
      });

      const data = await response.json();
      toast.dismiss(loadingToast);

      if (!response.ok) {
        toast.error('Creation Failed', {
          description: data.error || 'Something went wrong. Please try again.',
          duration: 5000,
        });
        setIsSubmitting(false);
        return;
      }

      toast.success('User Created Successfully!', {
        description: `${formData.role === 'admin' ? 'Admin' : 'Moderator'} account for ${formData.contactPerson} has been created.`,
        duration: 5000,
      });

      toast.info('Login Credentials', {
        description: `Email: ${formData.email}`,
        duration: 8000,
      });

      setFormData({
        contactPerson: '',
        email: '',
        phone: '',
        whatsapp: '',
        password: '',
        confirmPassword: '',
        role: 'moderator'
      });

      setTimeout(() => {
        router.push('/admin/manage-users');
      }, 2000);

    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error('Connection Error', {
        description: 'Unable to connect to server. Please check your internet connection.',
        duration: 5000,
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header with back button */}
        <div className="mb-6 flex items-center justify-between">
          <Link 
            href="/admin/manage-users" 
            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mr-2 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="font-medium">Back to Users</span>
          </Link>
          
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Create User</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50/50">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <User className="w-6 h-6 text-blue-600" />
                  Create New User
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  Create admin or moderator accounts for platform management
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Role Selection */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select User Role <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`
                  relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all
                  ${formData.role === 'admin' 
                    ? 'border-blue-600 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/30'}
                `}>
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={formData.role === 'admin'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      formData.role === 'admin' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
                    }`}>
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <div className={`text-base font-semibold ${formData.role === 'admin' ? 'text-blue-600' : 'text-gray-700'}`}>
                        Admin
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">Full system access</div>
                    </div>
                  </div>
                  {formData.role === 'admin' && (
                    <CheckCircle className="absolute top-2 right-2 w-4 h-4 text-blue-600" />
                  )}
                </label>

                <label className={`
                  relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all
                  ${formData.role === 'moderator' 
                    ? 'border-blue-600 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/30'}
                `}>
                  <input
                    type="radio"
                    name="role"
                    value="moderator"
                    checked={formData.role === 'moderator'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      formData.role === 'moderator' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
                    }`}>
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <div className={`text-base font-semibold ${formData.role === 'moderator' ? 'text-blue-600' : 'text-gray-700'}`}>
                        Moderator
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">Limited management access</div>
                    </div>
                  </div>
                  {formData.role === 'moderator' && (
                    <CheckCircle className="absolute top-2 right-2 w-4 h-4 text-blue-600" />
                  )}
                </label>
              </div>
            </div>

            {/* Info Banner */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="text-blue-600 mt-0.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Account Verification</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Users created by admin are automatically verified. No email verification required. 
                    They can login immediately with the provided credentials.
                  </p>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600" />
                  </div>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
                    placeholder="Enter full name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
                    placeholder="user@example.com"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
                    placeholder="+880 1234 567890"
                  />
                </div>
              </div>

              {/* WhatsApp */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp Number <span className="text-[#4A8A90]">*</span>

                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Smartphone className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600" />
                  </div>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
                    placeholder="+880 1234 567890"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 transition-all bg-gray-50 hover:bg-white"
                    placeholder="Min. 8 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 transition-all bg-gray-50 hover:bg-white"
                    placeholder="Re-enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`h-2 flex-1 rounded-full ${
                    formData.password.length >= 8 ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                  <div className={`h-2 flex-1 rounded-full ${
                    /[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                  <div className={`h-2 flex-1 rounded-full ${
                    /[0-9]/.test(formData.password) ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                  <div className={`h-2 flex-1 rounded-full ${
                    /[^A-Za-z0-9]/.test(formData.password) ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                </div>
                <p className="text-xs text-gray-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  Password must be at least 8 characters with uppercase, lowercase, number and special character
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating User...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Users className="w-5 h-5" />
                    Create {formData.role === 'admin' ? 'Admin' : 'Moderator'} Account
                  </span>
                )}
              </button>
            </div>

            {/* Note about login */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Users will be able to login immediately with the provided credentials.
                No email verification required.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}