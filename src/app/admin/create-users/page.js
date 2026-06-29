


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
//   Rocket,
//   Briefcase,
//   Users,
//   CheckCircle,
//   AlertCircle
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
//       toast.error('Password Mismatch', {
//         description: 'The passwords you entered do not match.',
//         duration: 4000,
//       });
//       setIsSubmitting(false);
//       return;
//     }

//     if (formData.password.length < 8) {
//       toast.error('Weak Password', {
//         description: 'Password must be at least 8 characters long.',
//         duration: 4000,
//       });
//       setIsSubmitting(false);
//       return;
//     }

//     if (!formData.contactPerson || !formData.email || !formData.phone || !formData.password) {
//       toast.error('Missing Fields', {
//         description: 'Please fill in all required fields.',
//         duration: 4000,
//       });
//       setIsSubmitting(false);
//       return;
//     }

//     const loadingToast = toast.loading('Creating user account...');

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

//       toast.success('User Created Successfully!', {
//         description: `${formData.role === 'admin' ? 'Admin' : 'Moderator'} account for ${formData.contactPerson} has been created.`,
//         duration: 5000,
//       });

//       toast.info('Login Credentials', {
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

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="container mx-auto px-4 max-w-4xl">
//         {/* Header with back button */}
//         <div className="mb-6 flex items-center justify-between">
//           <Link 
//             href="/admin/manage-users" 
//             className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors group"
//           >
//             <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mr-2 group-hover:bg-blue-600 group-hover:text-white transition-all">
//               <ArrowLeft className="w-4 h-4" />
//             </div>
//             <span className="font-medium">Back to Users</span>
//           </Link>
          
//           <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
//             <Users className="w-4 h-4 text-blue-600" />
//             <span className="text-sm font-medium text-gray-700">Create User</span>
//           </div>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
//         >
//           {/* Header */}
//           <div className="px-6 py-5 border-b border-gray-200 bg-gray-50/50">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//                   <User className="w-6 h-6 text-blue-600" />
//                   Create New User
//                 </h1>
//                 <p className="text-gray-500 text-sm mt-1">
//                   Create admin or moderator accounts for platform management
//                 </p>
//               </div>
//               <div className="bg-blue-50 p-3 rounded-lg">
//                 <Shield className="w-6 h-6 text-blue-600" />
//               </div>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="p-6">
//             {/* Role Selection */}
//             <div className="mb-8">
//               <label className="block text-sm font-semibold text-gray-700 mb-3">
//                 Select User Role <span className="text-red-500">*</span>
//               </label>
//               <div className="grid grid-cols-2 gap-4">
//                 <label className={`
//                   relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all
//                   ${formData.role === 'admin' 
//                     ? 'border-blue-600 bg-blue-50' 
//                     : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/30'}
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
//                     <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
//                       formData.role === 'admin' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
//                     }`}>
//                       <Shield className="w-6 h-6" />
//                     </div>
//                     <div>
//                       <div className={`text-base font-semibold ${formData.role === 'admin' ? 'text-blue-600' : 'text-gray-700'}`}>
//                         Admin
//                       </div>
//                       <div className="text-xs text-gray-500 mt-0.5">Full system access</div>
//                     </div>
//                   </div>
//                   {formData.role === 'admin' && (
//                     <CheckCircle className="absolute top-2 right-2 w-4 h-4 text-blue-600" />
//                   )}
//                 </label>

//                 <label className={`
//                   relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all
//                   ${formData.role === 'moderator' 
//                     ? 'border-blue-600 bg-blue-50' 
//                     : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/30'}
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
//                     <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
//                       formData.role === 'moderator' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
//                     }`}>
//                       <Briefcase className="w-6 h-6" />
//                     </div>
//                     <div>
//                       <div className={`text-base font-semibold ${formData.role === 'moderator' ? 'text-blue-600' : 'text-gray-700'}`}>
//                         Moderator
//                       </div>
//                       <div className="text-xs text-gray-500 mt-0.5">Limited management access</div>
//                     </div>
//                   </div>
//                   {formData.role === 'moderator' && (
//                     <CheckCircle className="absolute top-2 right-2 w-4 h-4 text-blue-600" />
//                   )}
//                 </label>
//               </div>
//             </div>

//             {/* Info Banner */}
//             <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
//               <div className="flex items-start gap-3">
//                 <div className="text-blue-600 mt-0.5">
//                   <Sparkles className="w-5 h-5" />
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-800">Account Verification</p>
//                   <p className="text-xs text-gray-600 mt-1">
//                     Users created by admin are automatically verified. No email verification required. 
//                     They can login immediately with the provided credentials.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Form Fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               {/* Full Name */}
//               <div className="col-span-2 md:col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Full Name <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative group">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <User className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600" />
//                   </div>
//                   <input
//                     type="text"
//                     name="contactPerson"
//                     value={formData.contactPerson}
//                     onChange={handleChange}
//                     required
//                     className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
//                     placeholder="Enter full name"
//                   />
//                 </div>
//               </div>

//               {/* Email */}
//               <div className="col-span-2 md:col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email Address <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative group">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600" />
//                   </div>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
//                     placeholder="user@example.com"
//                   />
//                 </div>
//               </div>

//               {/* Phone Number */}
//               <div className="col-span-2 md:col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Phone Number <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative group">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Phone className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600" />
//                   </div>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     required
//                     className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
//                     placeholder="+880 1234 567890"
//                   />
//                 </div>
//               </div>

//               {/* WhatsApp */}
//               <div className="col-span-2 md:col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   WhatsApp Number <span className="text-[#4A8A90]">*</span>

//                 </label>
//                 <div className="relative group">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Smartphone className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600" />
//                   </div>
//                   <input
//                     type="tel"
//                     name="whatsapp"
//                     value={formData.whatsapp}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
//                     placeholder="+880 1234 567890"
//                   />
//                 </div>
//               </div>

//               {/* Password */}
//               <div className="col-span-2 md:col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Password <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative group">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 transition-all bg-gray-50 hover:bg-white"
//                     placeholder="Min. 8 characters"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
//                   >
//                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//               </div>

//               {/* Confirm Password */}
//               <div className="col-span-2 md:col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Confirm Password <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative group">
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 transition-all bg-gray-50 hover:bg-white"
//                     placeholder="Re-enter password"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
//                   >
//                     {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Password Strength Indicator */}
//             {formData.password && (
//               <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
//                 <div className="flex items-center gap-2 mb-2">
//                   <div className={`h-2 flex-1 rounded-full ${
//                     formData.password.length >= 8 ? 'bg-blue-600' : 'bg-gray-200'
//                   }`} />
//                   <div className={`h-2 flex-1 rounded-full ${
//                     /[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) ? 'bg-blue-600' : 'bg-gray-200'
//                   }`} />
//                   <div className={`h-2 flex-1 rounded-full ${
//                     /[0-9]/.test(formData.password) ? 'bg-blue-600' : 'bg-gray-200'
//                   }`} />
//                   <div className={`h-2 flex-1 rounded-full ${
//                     /[^A-Za-z0-9]/.test(formData.password) ? 'bg-blue-600' : 'bg-gray-200'
//                   }`} />
//                 </div>
//                 <p className="text-xs text-gray-600 flex items-center gap-1">
//                   <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
//                   Password must be at least 8 characters with uppercase, lowercase, number and special character
//                 </p>
//               </div>
//             )}

//             {/* Submit Button */}
//             <div className="mt-8">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full py-3 px-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
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
//                     <Users className="w-5 h-5" />
//                     Create {formData.role === 'admin' ? 'Admin' : 'Moderator'} Account
//                   </span>
//                 )}
//               </button>
//             </div>

//             {/* Note about login */}
//             <div className="mt-4 text-center">
//               <p className="text-xs text-gray-500">
//                 Users will be able to login immediately with the provided credentials.
//                 No email verification required.
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
  AlertCircle,
  Heart,
  Store
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50/50 via-white to-rose-50/30 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header with back button */}
        <div className="mb-6 flex items-center justify-between">
          <Link 
            href="/admin/manage-users" 
            className="inline-flex items-center text-gray-600 hover:text-pink-600 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mr-2 group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-rose-500 group-hover:text-white transition-all border border-pink-100">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="font-medium">Back to Users</span>
          </Link>
          
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-pink-100">
            <Users className="w-4 h-4 text-pink-500" />
            <span className="text-sm font-medium text-gray-700">Create User</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-pink-100 overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-pink-100 bg-gradient-to-r from-pink-50/30 to-rose-50/30">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent flex items-center gap-2">
                  <User className="w-6 h-6 text-pink-500" />
                  Create New User
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  Create admin or moderator accounts for platform management
                </p>
              </div>
              <div className="bg-gradient-to-r from-pink-100 to-rose-100 p-3 rounded-lg border border-pink-200">
                <Sparkles className="w-6 h-6 text-pink-500" />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Role Selection */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select User Role <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`
                  relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
                  ${formData.role === 'admin' 
                    ? 'border-pink-500 bg-pink-50/50 shadow-md shadow-pink-100/50' 
                    : 'border-pink-200 hover:border-pink-300 hover:bg-pink-50/30'}
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
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                      formData.role === 'admin' ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md' : 'bg-pink-50 text-gray-500'
                    }`}>
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <div className={`text-base font-semibold ${formData.role === 'admin' ? 'text-pink-600' : 'text-gray-700'}`}>
                        Admin
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">Full system access</div>
                    </div>
                  </div>
                  {formData.role === 'admin' && (
                    <CheckCircle className="absolute top-2 right-2 w-4 h-4 text-pink-500" />
                  )}
                </label>

                <label className={`
                  relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
                  ${formData.role === 'moderator' 
                    ? 'border-pink-500 bg-pink-50/50 shadow-md shadow-pink-100/50' 
                    : 'border-pink-200 hover:border-pink-300 hover:bg-pink-50/30'}
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
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                      formData.role === 'moderator' ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md' : 'bg-pink-50 text-gray-500'
                    }`}>
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <div className={`text-base font-semibold ${formData.role === 'moderator' ? 'text-pink-600' : 'text-gray-700'}`}>
                        Moderator
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">Limited management access</div>
                    </div>
                  </div>
                  {formData.role === 'moderator' && (
                    <CheckCircle className="absolute top-2 right-2 w-4 h-4 text-pink-500" />
                  )}
                </label>
              </div>
            </div>

            {/* Info Banner */}
            <div className="mb-6 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-200">
              <div className="flex items-start gap-3">
                <div className="text-pink-500 mt-0.5">
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
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-pink-400 group-focus-within:text-pink-500" />
                  </div>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all bg-pink-50/30 hover:bg-white"
                    placeholder="Enter full name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-pink-400 group-focus-within:text-pink-500" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all bg-pink-50/30 hover:bg-white"
                    placeholder="user@example.com"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="w-5 h-5 text-pink-400 group-focus-within:text-pink-500" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all bg-pink-50/30 hover:bg-white"
                    placeholder="+880 1234 567890"
                  />
                </div>
              </div>

              {/* WhatsApp */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Smartphone className="w-5 h-5 text-pink-400 group-focus-within:text-pink-500" />
                  </div>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all bg-pink-50/30 hover:bg-white"
                    placeholder="+880 1234 567890"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent pr-10 transition-all bg-pink-50/30 hover:bg-white"
                    placeholder="Min. 8 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400 hover:text-pink-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative group">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent pr-10 transition-all bg-pink-50/30 hover:bg-white"
                    placeholder="Re-enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400 hover:text-pink-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`h-2 flex-1 rounded-full ${
                    formData.password.length >= 8 ? 'bg-gradient-to-r from-pink-500 to-rose-500' : 'bg-pink-200'
                  }`} />
                  <div className={`h-2 flex-1 rounded-full ${
                    /[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) ? 'bg-gradient-to-r from-pink-500 to-rose-500' : 'bg-pink-200'
                  }`} />
                  <div className={`h-2 flex-1 rounded-full ${
                    /[0-9]/.test(formData.password) ? 'bg-gradient-to-r from-pink-500 to-rose-500' : 'bg-pink-200'
                  }`} />
                  <div className={`h-2 flex-1 rounded-full ${
                    /[^A-Za-z0-9]/.test(formData.password) ? 'bg-gradient-to-r from-pink-500 to-rose-500' : 'bg-pink-200'
                  }`} />
                </div>
                <p className="text-xs text-gray-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500"></span>
                  Password must be at least 8 characters with uppercase, lowercase, number and special character
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-pink-200/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
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
                    <Sparkles className="w-5 h-5" />
                    Create {formData.role === 'admin' ? 'Admin' : 'Moderator'} Account
                  </span>
                )}
              </button>
            </div>

            {/* Note about login */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                <span className="w-1 h-1 rounded-full bg-pink-400"></span>
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