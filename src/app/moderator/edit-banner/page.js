// // app/moderator/edit-banner/page.jsx
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import NextLink from 'next/link';
// import { 
//   ArrowLeft, 
//   Save, 
//   Loader2, 
//   X,
//   Upload,
//   Image as ImageIcon,
//   Plus,
//   Trash2,
//   Eye,
//   Wand2,
//   CheckCircle,
//   AlertCircle,
//   Package,
//   Search,
//   Truck,
//   Shield,
//   Clock,
//   Star,
//   TrendingUp,
//   Headphones,
//   Link as LinkIcon,
//   Unlink,
//   UserCog,
//   Info
// } from 'lucide-react';
// import { toast } from 'sonner';
// import { getBannerById, updateBanner } from '@/app/services/bannerService';

// // Feature icon options
// const FEATURE_ICONS = [
//   { value: 'Truck', label: 'Truck', icon: <Truck className="w-4 h-4" /> },
//   { value: 'Shield', label: 'Shield', icon: <Shield className="w-4 h-4" /> },
//   { value: 'Clock', label: 'Clock', icon: <Clock className="w-4 h-4" /> },
//   { value: 'Star', label: 'Star', icon: <Star className="w-4 h-4" /> },
//   { value: 'TrendingUp', label: 'Trending', icon: <TrendingUp className="w-4 h-4" /> },
//   { value: 'Headphones', label: 'Headphones', icon: <Headphones className="w-4 h-4" /> }
// ];

// export default function ModeratorEditBannerPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const bannerId = searchParams.get('id');
  
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   const [removeBackground, setRemoveBackground] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     subtitle: '',
//     mainText: '',
//     description: '',
//     badge: '',
//     discount: '',
//     category: '',
//     bgImage: '',
//     productImage: '',
//     features: [],
//     buttons: [
//       { text: 'Shop Now', link: '/products', isPrimary: true },
//       { text: 'Learn More', link: '/about', isPrimary: false }
//     ],
//     isActive: true,
//     isPublished: false,
//     displayOrder: 0
//   });
  
//   const fileInputRef = useRef(null);
//   const bgFileInputRef = useRef(null);

//   // Load banner data
//   useEffect(() => {
//     if (!bannerId) {
//       toast.error('No banner ID provided');
//       router.push('/moderator/banner-management');
//       return;
//     }

//     loadBanner();
//   }, [bannerId]);

//   const loadBanner = async () => {
//     setIsLoading(true);
//     try {
//       const response = await getBannerById(bannerId);
//       if (response.success) {
//         const banner = response.data;
//         setFormData({
//           title: banner.title || '',
//           subtitle: banner.subtitle || '',
//           mainText: banner.mainText || '',
//           description: banner.description || '',
//           badge: banner.badge || '',
//           discount: banner.discount || '',
//           category: banner.category || '',
//           bgImage: typeof banner.bgImage === 'string' ? banner.bgImage : banner.bgImage?.url || '',
//           productImage: typeof banner.productImage === 'string' ? banner.productImage : banner.productImage?.url || '',
//           features: banner.features || [],
//           buttons: banner.buttons || [
//             { text: 'Shop Now', link: '/products', isPrimary: true },
//             { text: 'Learn More', link: '/about', isPrimary: false }
//           ],
//           isActive: banner.isActive !== undefined ? banner.isActive : true,
//           isPublished: banner.isPublished !== undefined ? banner.isPublished : false,
//           displayOrder: banner.displayOrder || banner.order || 0
//         });
//       }
//     } catch (error) {
//       console.error('Error loading banner:', error);
//       toast.error('Failed to load banner');
//       router.push('/moderator/banner-management');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const addFeature = () => {
//     if (formData.features.length >= 3) {
//       toast.error('Maximum 3 features allowed');
//       return;
//     }
//     setFormData(prev => ({
//       ...prev,
//       features: [...prev.features, { icon: 'Truck', text: '' }]
//     }));
//   };

//   const updateFeature = (index, field, value) => {
//     const updatedFeatures = [...formData.features];
//     updatedFeatures[index] = { ...updatedFeatures[index], [field]: value };
//     setFormData(prev => ({ ...prev, features: updatedFeatures }));
//   };

//   const removeFeature = (index) => {
//     const updatedFeatures = formData.features.filter((_, i) => i !== index);
//     setFormData(prev => ({ ...prev, features: updatedFeatures }));
//   };

//   const updateButton = (index, field, value) => {
//     const updatedButtons = [...formData.buttons];
//     updatedButtons[index] = { ...updatedButtons[index], [field]: value };
//     setFormData(prev => ({ ...prev, buttons: updatedButtons }));
//   };

//   const addButton = () => {
//     if (formData.buttons.length >= 2) {
//       toast.error('Maximum 2 buttons allowed');
//       return;
//     }
//     setFormData(prev => ({
//       ...prev,
//       buttons: [...prev.buttons, { text: '', link: '', isPrimary: false }]
//     }));
//   };

//   const removeButton = (index) => {
//     if (formData.buttons.length <= 1) {
//       toast.error('At least one button is required');
//       return;
//     }
//     const updatedButtons = formData.buttons.filter((_, i) => i !== index);
//     setFormData(prev => ({ ...prev, buttons: updatedButtons }));
//   };

//   const handleProductImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//     if (!allowedTypes.includes(file.type)) {
//       toast.error('Invalid format. Allowed: JPG, PNG, WebP');
//       return;
//     }
//     if (file.size > 5 * 1024 * 1024) {
//       toast.error('File too large. Max: 5MB');
//       return;
//     }

//     try {
//       setIsUploading(true);
      
//       const formDataUpload = new FormData();
//       formDataUpload.append('file', file);
//       formDataUpload.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'smart-gadget');
      
//       const uploadUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
      
//       const response = await fetch(uploadUrl, {
//         method: 'POST',
//         body: formDataUpload,
//       });

//       const data = await response.json();
//       if (data.secure_url) {
//         let finalUrl = data.secure_url;
//         if (removeBackground) {
//           finalUrl = data.secure_url.replace(
//             '/upload/',
//             `/upload/e_background_removal,f_png/`
//           );
//         }
//         setFormData(prev => ({
//           ...prev,
//           productImage: finalUrl
//         }));
//         toast.success(removeBackground ? 'Image uploaded with transparent background!' : 'Image uploaded successfully!');
//       } else {
//         toast.error('Failed to upload image');
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       toast.error('Failed to upload image');
//     } finally {
//       setIsUploading(false);
//     }

//     if (fileInputRef.current) fileInputRef.current.value = '';
//   };

//   const handleBgImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//     if (!allowedTypes.includes(file.type)) {
//       toast.error('Invalid format. Allowed: JPG, PNG, WebP');
//       return;
//     }
//     if (file.size > 5 * 1024 * 1024) {
//       toast.error('File too large. Max: 5MB');
//       return;
//     }

//     try {
//       const formDataUpload = new FormData();
//       formDataUpload.append('file', file);
//       formDataUpload.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'smart-gadget');

//       const response = await fetch(
//         `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
//         {
//           method: 'POST',
//           body: formDataUpload,
//         }
//       );

//       const data = await response.json();
//       if (data.secure_url) {
//         setFormData(prev => ({ ...prev, bgImage: data.secure_url }));
//         toast.success('Background image uploaded successfully');
//       } else {
//         toast.error('Failed to upload image');
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       toast.error('Failed to upload image');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!formData.title?.trim()) {
//       toast.error('Title is required');
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const result = await updateBanner(bannerId, formData);
//       if (result.success) {
//         toast.success('Banner updated successfully!');
//         router.push('/moderator/banner-management');
//       }
//     } catch (error) {
//       toast.error(error.message || 'Failed to update banner');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
//           <p className="text-gray-500">Loading banner...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b shadow-sm sticky top-0 z-10">
//         <div className="px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <NextLink href="/moderator/banner-management" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                 <ArrowLeft className="w-5 h-5 text-gray-600" />
//               </NextLink>
//               <div>
//                 <div className="flex items-center gap-2">
//                   <UserCog className="w-6 h-6 text-green-600" />
//                   <h1 className="text-xl font-bold text-gray-900">Edit Banner</h1>
//                   <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">
//                     Moderator
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-500 mt-1">Update banner details</p>
//               </div>
//             </div>
//             <button
//               type="submit"
//               form="edit-banner-form"
//               disabled={isSubmitting}
//               className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 text-sm"
//             >
//               {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
//               {isSubmitting ? 'Saving...' : 'Save Changes'}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Info Banner */}
//       <div className="px-6 pt-4">
//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-3">
//           <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
//           <p className="text-xs text-blue-700">
//             <span className="font-semibold">Moderator Permissions:</span> You can edit all banner fields including 
//             images, features, and buttons. Changes will be applied immediately.
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="p-6">
//         <form id="edit-banner-form" onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Left Column - Basic Info */}
//             <div className="lg:col-span-2 space-y-6">
//               {/* Basic Information Card */}
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="p-5 border-b border-gray-200">
//                   <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                     <AlertCircle className="w-5 h-5 text-green-600" />
//                     Basic Information
//                   </h2>
//                 </div>
//                 <div className="p-5 space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Title <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="title"
//                       value={formData.title}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition"
//                       placeholder="e.g., Premium Gadgets"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Subtitle <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="subtitle"
//                       value={formData.subtitle}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition"
//                       placeholder="e.g., Latest Technology"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Main Text <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="mainText"
//                       value={formData.mainText}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition"
//                       placeholder="e.g., Experience the Future Today"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Description <span className="text-red-500">*</span>
//                     </label>
//                     <textarea
//                       name="description"
//                       value={formData.description}
//                       onChange={handleChange}
//                       rows="3"
//                       className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition resize-none"
//                       placeholder="Write a compelling description..."
//                     />
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Badge <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="badge"
//                         value={formData.badge}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition"
//                         placeholder="e.g., Best Seller"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Discount <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="discount"
//                         value={formData.discount}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition"
//                         placeholder="e.g., 40% OFF"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Category <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="category"
//                       value={formData.category}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition"
//                       placeholder="e.g., Electronics"
//                     />
//                   </div>

//                   <div className="flex items-center gap-6 pt-2">
//                     <label className="flex items-center gap-2 text-sm text-gray-700">
//                       <input
//                         type="checkbox"
//                         name="isActive"
//                         checked={formData.isActive}
//                         onChange={handleChange}
//                         className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
//                       />
//                       Active
//                     </label>
//                     <label className="flex items-center gap-2 text-sm text-gray-700">
//                       <input
//                         type="checkbox"
//                         name="isPublished"
//                         checked={formData.isPublished}
//                         onChange={handleChange}
//                         className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
//                       />
//                       Published
//                     </label>
//                   </div>
//                 </div>
//               </div>

//               {/* Features Card */}
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="p-5 border-b border-gray-200">
//                   <div className="flex items-center justify-between">
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                       <Star className="w-5 h-5 text-green-600" />
//                       Features <span className="text-sm font-normal text-gray-400">(Max 3)</span>
//                     </h2>
//                     <span className="text-xs text-gray-500">{formData.features.length}/3</span>
//                   </div>
//                 </div>
//                 <div className="p-5">
//                   <div className="space-y-4">
//                     {formData.features.map((feature, index) => (
//                       <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
//                         <select
//                           value={feature.icon}
//                           onChange={(e) => updateFeature(index, 'icon', e.target.value)}
//                           className="px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition bg-white"
//                         >
//                           {FEATURE_ICONS.map(icon => (
//                             <option key={icon.value} value={icon.value}>
//                               {icon.label}
//                             </option>
//                           ))}
//                         </select>
//                         <input
//                           type="text"
//                           value={feature.text}
//                           onChange={(e) => updateFeature(index, 'text', e.target.value)}
//                           placeholder="Feature text..."
//                           className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeFeature(index)}
//                           className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                         >
//                           <X className="w-4 h-4" />
//                         </button>
//                       </div>
//                     ))}
//                     {formData.features.length < 3 && (
//                       <button
//                         type="button"
//                         onClick={addFeature}
//                         className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-green-600 border-2 border-dashed border-green-300 rounded-lg hover:bg-green-50 transition-colors"
//                       >
//                         <Plus className="w-4 h-4" />
//                         Add Feature
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Buttons Card */}
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="p-5 border-b border-gray-200">
//                   <div className="flex items-center justify-between">
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                       <LinkIcon className="w-5 h-5 text-green-600" />
//                       Buttons <span className="text-sm font-normal text-gray-400">(Max 2)</span>
//                     </h2>
//                     <span className="text-xs text-gray-500">{formData.buttons.length}/2</span>
//                   </div>
//                 </div>
//                 <div className="p-5 space-y-4">
//                   {formData.buttons.map((button, index) => (
//                     <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
//                       <div className="flex-1 w-full">
//                         <input
//                           type="text"
//                           value={button.text}
//                           onChange={(e) => updateButton(index, 'text', e.target.value)}
//                           placeholder="Button text..."
//                           className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition"
//                         />
//                       </div>
//                       <div className="flex-1 w-full">
//                         <input
//                           type="text"
//                           value={button.link}
//                           onChange={(e) => updateButton(index, 'link', e.target.value)}
//                           placeholder="Button link..."
//                           className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition"
//                         />
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <label className="flex items-center gap-1 text-xs text-gray-600">
//                           <input
//                             type="radio"
//                             checked={button.isPrimary}
//                             onChange={() => {
//                               const updatedButtons = formData.buttons.map((b, i) => ({
//                                 ...b,
//                                 isPrimary: i === index
//                               }));
//                               setFormData(prev => ({ ...prev, buttons: updatedButtons }));
//                             }}
//                             className="w-3.5 h-3.5"
//                           />
//                           Primary
//                         </label>
//                         <button
//                           type="button"
//                           onClick={() => removeButton(index)}
//                           className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                         >
//                           <X className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                   {formData.buttons.length < 2 && (
//                     <button
//                       type="button"
//                       onClick={addButton}
//                       className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-green-600 border-2 border-dashed border-green-300 rounded-lg hover:bg-green-50 transition-colors"
//                     >
//                       <Plus className="w-4 h-4" />
//                       Add Button
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Right Column - Images */}
//             <div className="space-y-6">
//               {/* Product Image Card */}
//           {/* Product Image Card */}
// <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//   <div className="p-5 border-b border-gray-200 flex items-center justify-between">
//     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//       <ImageIcon className="w-5 h-5 text-blue-600" />
//       Product Image
//     </h2>
//     {formData.productImage && (
//       <button
//         type="button"
//         onClick={() => {
//           setFormData(prev => ({ ...prev, productImage: '' }));
//           toast.info('Image will be removed when you save');
//         }}
//         className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
//       >
//         <Trash2 className="w-3 h-3" />
//         Remove Image
//       </button>
//     )}
//   </div>
//   <div className="p-5 space-y-4">
//     {/* Image Upload */}
//     <div>
//       <div className="relative rounded-lg overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
//         {formData.productImage ? (
//           <div className="relative">
//             <img
//               src={formData.productImage}
//               alt="Product"
//               className="w-full h-40 object-contain"
//               style={removeBackground ? { background: 'transparent' } : { background: '#f9fafb' }}
//             />
//             {removeBackground && (
//               <div className="absolute top-2 left-2 px-2 py-0.5 bg-blue-500/80 text-white text-[10px] rounded-full flex items-center gap-1">
//                 <Wand2 className="w-2.5 h-2.5" />
//                 PNG (Transparent)
//               </div>
//             )}
//             <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
//               <button
//                 type="button"
//                 onClick={() => document.getElementById('product-image-upload').click()}
//                 className="px-3 py-1.5 bg-white/90 text-gray-700 text-sm rounded-lg hover:bg-white transition-colors flex items-center gap-2"
//               >
//                 <Upload className="w-4 h-4" />
//                 Change Image
//               </button>
//             </div>
//             <button
//               type="button"
//               onClick={() => {
//                 setFormData(prev => ({ ...prev, productImage: '' }));
//                 toast.info('Image will be removed on save');
//               }}
//               className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
//               title="Remove image"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         ) : (
//           <button
//             type="button"
//             onClick={() => document.getElementById('product-image-upload').click()}
//             className="w-full h-40 flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-blue-600 transition-colors"
//           >
//             <Upload className="w-8 h-8" />
//             <span className="text-sm">Click to upload product image</span>
//             <span className="text-xs">JPG, PNG, WebP (max 5MB)</span>
//             {removeBackground && (
//               <span className="text-xs text-blue-500 flex items-center gap-1">
//                 <Wand2 className="w-3 h-3" />
//                 Background will be removed automatically
//               </span>
//             )}
//           </button>
//         )}
//         <input
//           id="product-image-upload"
//           type="file"
//           accept="image/jpeg,image/jpg,image/png,image/webp"
//           onChange={handleProductImageUpload}
//           className="hidden"
//           ref={fileInputRef}
//         />
//       </div>
//       {isUploading && (
//         <div className="flex items-center justify-center gap-2 mt-2">
//           <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
//           <span className="text-sm text-gray-500">
//             {removeBackground ? 'Uploading and removing background...' : 'Uploading...'}
//           </span>
//         </div>
//       )}
//       {!formData.productImage && (
//         <p className="text-xs text-gray-400 mt-1">No image uploaded</p>
//       )}
//     </div>
//   </div>
// </div>

//               {/* Background Image Card */}
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="p-5 border-b border-gray-200">
//                   <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                     <ImageIcon className="w-5 h-5 text-green-600" />
//                     Background Image
//                   </h2>
//                 </div>
//                 <div className="p-5">
//                   <div className="relative rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
//                     <img
//                       src={formData.bgImage || 'https://via.placeholder.com/400x200?text=Upload+Background'}
//                       alt="Background"
//                       className="w-full h-32 object-cover"
//                     />
//                     <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
//                       <button
//                         type="button"
//                         onClick={() => document.getElementById('bg-image-upload').click()}
//                         className="px-3 py-1.5 bg-white/90 text-gray-700 text-sm rounded-lg hover:bg-white transition-colors flex items-center gap-2"
//                       >
//                         <Upload className="w-4 h-4" />
//                         Change Image
//                       </button>
//                     </div>
//                   </div>
//                   <input
//                     id="bg-image-upload"
//                     type="file"
//                     accept="image/jpeg,image/jpg,image/png,image/webp"
//                     onChange={handleBgImageUpload}
//                     className="hidden"
//                     ref={bgFileInputRef}
//                   />
//                   <p className="text-xs text-gray-400 mt-2 text-center">Recommended: 1920x600px, max 5MB</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


// app/moderator/edit-banner/page.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import NextLink from 'next/link';
import { 
  ArrowLeft, 
  Save, 
  Loader2, 
  X,
  Upload,
  Image as ImageIcon,
  Plus,
  Trash2,
  Eye,
  CheckCircle,
  AlertCircle,
  Package,
  Search,
  Truck,
  Shield,
  Clock,
  Star,
  TrendingUp,
  Headphones,
  Link as LinkIcon,
  Unlink,
  UserCog,
  Info,
  Flower2,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';
import { getBannerById, updateBanner } from '@/app/services/bannerService';

// Feature icon options
const FEATURE_ICONS = [
  { value: 'Truck', label: 'Truck', icon: <Truck className="w-4 h-4" /> },
  { value: 'Shield', label: 'Shield', icon: <Shield className="w-4 h-4" /> },
  { value: 'Clock', label: 'Clock', icon: <Clock className="w-4 h-4" /> },
  { value: 'Star', label: 'Star', icon: <Star className="w-4 h-4" /> },
  { value: 'TrendingUp', label: 'Trending', icon: <TrendingUp className="w-4 h-4" /> },
  { value: 'Headphones', label: 'Headphones', icon: <Headphones className="w-4 h-4" /> }
];

// Product Search Modal Component
const ProductSearchModal = ({ isOpen, onClose, onSelectProduct, mode = 'single' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const searchTimeoutRef = useRef(null);

  const searchProducts = async (query) => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:5000/api/products/admin/all?search=${encodeURIComponent(query)}&limit=10`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      } else {
        toast.error(data.error || 'Failed to search products');
      }
    } catch (error) {
      toast.error('Failed to search products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      searchProducts(searchTerm);
    }, 500);
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [searchTerm]);

  const handleSelectProduct = () => {
    if (selectedProduct) {
      onSelectProduct(selectedProduct, selectedImageIndex);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] flex flex-col">
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-pink-500" />
            {mode === 'single' ? 'Select Product for Banner' : 'Select Featured Product'}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-5 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products by name, SKU, or brand..."
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
              autoFocus
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-pink-500 animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">
                {searchTerm ? 'No products found matching your search' : 'Search for a product to add to banner'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {products.map((product) => (
                <div
                  key={product._id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedProduct?._id === product._id
                      ? 'border-pink-500 bg-pink-50'
                      : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50/50'
                  }`}
                  onClick={() => {
                    setSelectedProduct(product);
                    setSelectedImageIndex(0);
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0].url}
                          alt={product.productName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{product.productName}</h4>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span>SKU: {product.skuCode}</span>
                        <span>•</span>
                        <span>Brand: {product.brand}</span>
                        <span>•</span>
                        <span>৳{product.regularPrice}</span>
                        {product.discountPrice > 0 && (
                          <span className="text-green-600">-{product.discountPrice}%</span>
                        )}
                      </div>
                    </div>
                    {product.images && product.images.length > 0 && (
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <ImageIcon className="w-3 h-3" />
                        <span>{product.images.length}</span>
                      </div>
                    )}
                  </div>

                  {selectedProduct?._id === product._id && product.images && product.images.length > 1 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-2">Select image to use in banner:</p>
                      <div className="flex gap-2 overflow-x-auto pb-1">
                        {product.images.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImageIndex(idx);
                            }}
                            className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                              selectedImageIndex === idx
                                ? 'border-pink-500 ring-2 ring-pink-200'
                                : 'border-gray-200 hover:border-gray-400'
                            }`}
                          >
                            <img
                              src={img.url}
                              alt={`${product.productName} - ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                            {selectedImageIndex === idx && (
                              <div className="absolute inset-0 bg-pink-500/10 flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-pink-500" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-pink-600 mt-1">
                        Selected: Image {selectedImageIndex + 1}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-5 border-t border-gray-200 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSelectProduct}
            disabled={!selectedProduct}
            className="px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Select Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ModeratorEditBannerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bannerId = searchParams.get('id');
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showProductSearch, setShowProductSearch] = useState(false);
  const [showProductSearchForFeatured, setShowProductSearchForFeatured] = useState(false);
  const [linkedProduct, setLinkedProduct] = useState(null);
  const [selectedProductImage, setSelectedProductImage] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    badge: '',
    discount: '',
    bgImage: '',
    productImage: '',
    features: [],
    buttons: [
      { text: 'Shop Now', link: '/products', isPrimary: true },
      { text: 'Learn More', link: '/about', isPrimary: false }
    ],
    linkedProductId: null,
    featuredProducts: [],
    isActive: true,
    isPublished: false,
    displayOrder: 0
  });
  
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const fileInputRef = useRef(null);
  const bgFileInputRef = useRef(null);

  // Load banner data
  useEffect(() => {
    if (!bannerId) {
      toast.error('No banner ID provided');
      router.push('/moderator/banner-management');
      return;
    }
    loadBanner();
  }, [bannerId]);

  const loadBanner = async () => {
    setIsLoading(true);
    try {
      const response = await getBannerById(bannerId);
      if (response.success) {
        const banner = response.data;
        
        // Set featured products
        if (banner.featuredProducts && banner.featuredProducts.length > 0) {
          const featured = banner.featuredProducts.map(item => ({
            productId: item.productId?._id || item.productId,
            product: item.productId || null,
            selectedImage: item.productId?.images?.[0]?.url || null,
            displayOrder: item.displayOrder || 0
          }));
          setFeaturedProducts(featured);
        }

        setFormData({
          title: banner.title || '',
          description: banner.description || '',
          badge: banner.badge || '',
          discount: banner.discount || '',
          bgImage: typeof banner.bgImage === 'string' ? banner.bgImage : banner.bgImage?.url || '',
          productImage: typeof banner.productImage === 'string' ? banner.productImage : banner.productImage?.url || '',
          features: banner.features || [],
          buttons: banner.buttons || [
            { text: 'Shop Now', link: '/products', isPrimary: true },
            { text: 'Learn More', link: '/about', isPrimary: false }
          ],
          linkedProductId: banner.linkedProductId?._id || banner.linkedProductId || null,
          isActive: banner.isActive !== undefined ? banner.isActive : true,
          isPublished: banner.isPublished !== undefined ? banner.isPublished : false,
          displayOrder: banner.displayOrder || banner.order || 0
        });

        // Set linked product
        if (banner.linkedProductId) {
          setLinkedProduct(banner.linkedProductId);
          setSelectedProductImage(banner.productImage || banner.linkedProductId?.images?.[0]?.url);
        }
      }
    } catch (error) {
      console.error('Error loading banner:', error);
      toast.error('Failed to load banner');
      router.push('/moderator/banner-management');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addFeature = () => {
    if (formData.features.length >= 3) {
      toast.error('Maximum 3 features allowed');
      return;
    }
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, { icon: 'Truck', text: '' }]
    }));
  };

  const updateFeature = (index, field, value) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = { ...updatedFeatures[index], [field]: value };
    setFormData(prev => ({ ...prev, features: updatedFeatures }));
  };

  const removeFeature = (index) => {
    const updatedFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, features: updatedFeatures }));
  };

  const updateButton = (index, field, value) => {
    const updatedButtons = [...formData.buttons];
    updatedButtons[index] = { ...updatedButtons[index], [field]: value };
    setFormData(prev => ({ ...prev, buttons: updatedButtons }));
  };

  const addButton = () => {
    if (formData.buttons.length >= 2) {
      toast.error('Maximum 2 buttons allowed');
      return;
    }
    setFormData(prev => ({
      ...prev,
      buttons: [...prev.buttons, { text: '', link: '', isPrimary: false }]
    }));
  };

  const removeButton = (index) => {
    if (formData.buttons.length <= 1) {
      toast.error('At least one button is required');
      return;
    }
    const updatedButtons = formData.buttons.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, buttons: updatedButtons }));
  };

  const handleProductSelect = (product, imageIndex) => {
    const selectedImage = product.images[imageIndex];
    setFormData(prev => ({
      ...prev,
      title: product.productName,
      description: product.shortDescription || product.fullDescription || '',
      badge: product.tags?.[0]?.name || 'New Arrival',
      discount: product.discountPrice > 0 ? `${Math.round(((product.regularPrice - product.discountPrice) / product.regularPrice) * 100)}% OFF` : 'New',
      linkedProductId: product._id,
      productImage: selectedImage.url
    }));
    setLinkedProduct(product);
    setSelectedProductImage(selectedImage.url);
    toast.success(`Product "${product.productName}" loaded successfully`);
  };

  const handleFeaturedProductSelect = (product, imageIndex) => {
    if (featuredProducts.length >= 3) {
      toast.error('Maximum 3 featured products allowed');
      return;
    }
    
    const selectedImage = product.images[imageIndex];
    const existingIndex = featuredProducts.findIndex(p => p.productId === product._id);
    
    if (existingIndex !== -1) {
      toast.error('Product already added');
      return;
    }
    
    setFeaturedProducts(prev => [...prev, {
      productId: product._id,
      product: product,
      selectedImage: selectedImage?.url || product.images[0]?.url,
      displayOrder: featuredProducts.length
    }]);
    
    toast.success(`Product "${product.productName}" added to featured products`);
    setShowProductSearchForFeatured(false);
  };

  const removeFeaturedProduct = (index) => {
    setFeaturedProducts(prev => prev.filter((_, i) => i !== index));
  };

  const removeProductLink = () => {
    setFormData(prev => ({
      ...prev,
      linkedProductId: null,
      productImage: ''
    }));
    setLinkedProduct(null);
    setSelectedProductImage(null);
    toast.info('Product unlinked from banner');
  };

  const handleProductImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid format. Allowed: JPG, PNG, WebP');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File too large. Max: 5MB');
      return;
    }

    try {
      setIsUploading(true);
      
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      formDataUpload.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'smart-gadget');
      
      const uploadUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
      
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formDataUpload,
      });

      const data = await response.json();
      if (data.secure_url) {
        setFormData(prev => ({
          ...prev,
          productImage: data.secure_url,
          linkedProductId: null
        }));
        setSelectedProductImage(null);
        setLinkedProduct(null);
        toast.success('Image uploaded successfully!');
      } else {
        toast.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleBgImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid format. Allowed: JPG, PNG, WebP');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File too large. Max: 5MB');
      return;
    }

    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      formDataUpload.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'smart-gadget');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formDataUpload,
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        setFormData(prev => ({ ...prev, bgImage: data.secure_url }));
        toast.success('Background image uploaded successfully');
      } else {
        toast.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title?.trim()) {
      toast.error('Title is required');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        badge: formData.badge,
        discount: formData.discount,
        bgImage: formData.bgImage,
        productImage: formData.productImage,
        linkedProductId: formData.linkedProductId,
        features: formData.features.filter(f => f.text.trim()),
        buttons: formData.buttons.filter(b => b.text.trim() && b.link.trim()),
        featuredProducts: featuredProducts.map((p, index) => ({
          productId: p.productId,
          displayOrder: index
        })),
        category: 'Beauty',
        isActive: formData.isActive,
        isPublished: formData.isPublished,
        displayOrder: formData.displayOrder
      };

      const result = await updateBanner(bannerId, payload);
      if (result.success) {
        toast.success('Banner updated successfully!');
        router.push('/moderator/banner-management');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update banner');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-pink-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading banner...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductSearchModal
        isOpen={showProductSearch}
        onClose={() => setShowProductSearch(false)}
        onSelectProduct={handleProductSelect}
        mode="single"
      />

      <ProductSearchModal
        isOpen={showProductSearchForFeatured}
        onClose={() => setShowProductSearchForFeatured(false)}
        onSelectProduct={handleFeaturedProductSelect}
        mode="featured"
      />

      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <NextLink href="/moderator/banner-management" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </NextLink>
              <div>
                <div className="flex items-center gap-2">
                  <Flower2 className="w-6 h-6 text-pink-500" />
                  <h1 className="text-xl font-bold text-gray-900">Edit Beauty Banner</h1>
                  <span className="px-2 py-0.5 text-xs font-medium bg-pink-100 text-pink-700 rounded-full">
                    Moderator
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Update banner details</p>
              </div>
            </div>
            <button
              type="submit"
              form="edit-banner-form"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50 text-sm"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="px-6 pt-4">
        <div className="bg-pink-50 border border-pink-200 rounded-lg p-3 flex items-start gap-3">
          <Info className="w-4 h-4 text-pink-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-pink-700" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
            <span className="font-semibold">Moderator Permissions:</span> You can edit all banner fields including 
            images, features, and buttons. Changes will be applied immediately.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <form id="edit-banner-form" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Basic Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-5 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-pink-500" />
                    Basic Information
                  </h2>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
                      placeholder="e.g., Premium Beauty Collection"
                      style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition resize-none"
                      placeholder="Write a compelling description..."
                      style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Badge <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="badge"
                        value={formData.badge}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
                        placeholder="✨ Limited Edition"
                        style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discount <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
                        placeholder="40% OFF"
                        style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleChange}
                        className="w-4 h-4 rounded border-gray-300 text-pink-500 focus:ring-pink-500"
                      />
                      Active
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        name="isPublished"
                        checked={formData.isPublished}
                        onChange={handleChange}
                        className="w-4 h-4 rounded border-gray-300 text-pink-500 focus:ring-pink-500"
                      />
                      Published
                    </label>
                  </div>
                </div>
              </div>

              {/* Features Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-5 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Star className="w-5 h-5 text-pink-500" />
                      Features <span className="text-sm font-normal text-gray-400">(Max 3)</span>
                    </h2>
                    <span className="text-xs text-gray-500">{formData.features.length}/3</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="space-y-4">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <select
                          value={feature.icon}
                          onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                          className="px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition bg-white"
                        >
                          {FEATURE_ICONS.map(icon => (
                            <option key={icon.value} value={icon.value}>
                              {icon.label}
                            </option>
                          ))}
                        </select>
                        <input
                          type="text"
                          value={feature.text}
                          onChange={(e) => updateFeature(index, 'text', e.target.value)}
                          placeholder="Feature text..."
                          className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
                          style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                        />
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {formData.features.length < 3 && (
                      <button
                        type="button"
                        onClick={addFeature}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-pink-600 border-2 border-dashed border-pink-300 rounded-lg hover:bg-pink-50 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add Feature
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Buttons Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-5 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <LinkIcon className="w-5 h-5 text-pink-500" />
                      Buttons <span className="text-sm font-normal text-gray-400">(Max 2)</span>
                    </h2>
                    <span className="text-xs text-gray-500">{formData.buttons.length}/2</span>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  {formData.buttons.map((button, index) => (
                    <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex-1 w-full">
                        <input
                          type="text"
                          value={button.text}
                          onChange={(e) => updateButton(index, 'text', e.target.value)}
                          placeholder="Button text..."
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
                          style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                        />
                      </div>
                      <div className="flex-1 w-full">
                        <input
                          type="text"
                          value={button.link}
                          onChange={(e) => updateButton(index, 'link', e.target.value)}
                          placeholder="Button link..."
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
                          style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="flex items-center gap-1 text-xs text-gray-600">
                          <input
                            type="radio"
                            checked={button.isPrimary}
                            onChange={() => {
                              const updatedButtons = formData.buttons.map((b, i) => ({
                                ...b,
                                isPrimary: i === index
                              }));
                              setFormData(prev => ({ ...prev, buttons: updatedButtons }));
                            }}
                            className="w-3.5 h-3.5"
                          />
                          Primary
                        </label>
                        <button
                          type="button"
                          onClick={() => removeButton(index)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {formData.buttons.length < 2 && (
                    <button
                      type="button"
                      onClick={addButton}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-pink-600 border-2 border-dashed border-pink-300 rounded-lg hover:bg-pink-50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Button
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Images & Products */}
            <div className="space-y-6">
              {/* Featured Products Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-5 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Package className="w-5 h-5 text-pink-500" />
                    Featured Products <span className="text-red-500">*</span>
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">Up to 3 products to feature on the banner</p>
                </div>
                <div className="p-5 space-y-3">
                  {featuredProducts.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg border border-pink-200">
                      <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={item.selectedImage}
                          alt={item.product?.productName || 'Product'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                          {item.product?.productName || 'Product'}
                        </h4>
                        <p className="text-xs text-gray-500">SKU: {item.product?.skuCode || 'N/A'}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFeaturedProduct(index)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  
                  {featuredProducts.length < 3 && (
                    <button
                      type="button"
                      onClick={() => setShowProductSearchForFeatured(true)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-pink-600 border-2 border-dashed border-pink-300 rounded-lg hover:bg-pink-50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Product ({featuredProducts.length}/3)
                    </button>
                  )}
                </div>
              </div>

              {/* Product Image Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-5 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-pink-500" />
                    Product Image
                  </h2>
                  {formData.productImage && (
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, productImage: '' }));
                        toast.info('Image will be removed when you save');
                      }}
                      className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      Remove Image
                    </button>
                  )}
                </div>
                <div className="p-5 space-y-4">
                  {/* Manual Upload */}
                  <div>
                    <div className="relative rounded-lg overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 hover:border-pink-400 transition-colors">
                      {formData.productImage ? (
                        <div className="relative">
                          <img
                            src={formData.productImage}
                            alt="Product"
                            className="w-full h-40 object-contain"
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={() => document.getElementById('product-image-upload').click()}
                              className="px-3 py-1.5 bg-white/90 text-gray-700 text-sm rounded-lg hover:bg-white transition-colors flex items-center gap-2"
                            >
                              <Upload className="w-4 h-4" />
                              Change Image
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, productImage: '' }));
                              setSelectedProductImage(null);
                              if (linkedProduct) {
                                removeProductLink();
                              }
                            }}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => document.getElementById('product-image-upload').click()}
                          className="w-full h-40 flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-pink-600 transition-colors"
                        >
                          <Upload className="w-8 h-8" />
                          <span className="text-sm">Click to upload product image</span>
                          <span className="text-xs">JPG, PNG, WebP (max 5MB)</span>
                        </button>
                      )}
                      <input
                        id="product-image-upload"
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleProductImageUpload}
                        className="hidden"
                        ref={fileInputRef}
                      />
                    </div>
                    {isUploading && (
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <Loader2 className="w-4 h-4 text-pink-500 animate-spin" />
                        <span className="text-sm text-gray-500">Uploading...</span>
                      </div>
                    )}
                  </div>

                  {/* OR Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-white text-gray-500">OR</span>
                    </div>
                  </div>

                  {/* Link Product */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select from Product</label>
                    {linkedProduct ? (
                      <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg border border-pink-200">
                        <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                          {selectedProductImage ? (
                            <img
                              src={selectedProductImage}
                              alt={linkedProduct.productName}
                              className="w-full h-full object-cover"
                            />
                          ) : linkedProduct.images && linkedProduct.images.length > 0 ? (
                            <img
                              src={linkedProduct.images[0].url}
                              alt={linkedProduct.productName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="w-5 h-5 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                            {linkedProduct.productName}
                          </h4>
                          <p className="text-xs text-gray-500">SKU: {linkedProduct.skuCode}</p>
                        </div>
                        <button
                          type="button"
                          onClick={removeProductLink}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Unlink className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowProductSearch(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-pink-600 border-2 border-dashed border-pink-300 rounded-lg hover:bg-pink-50 transition-colors"
                      >
                        <Search className="w-4 h-4" />
                        Search & Select Product
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Background Image Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-5 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-pink-500" />
                    Background Image
                  </h2>
                </div>
                <div className="p-5">
                  <div className="relative rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
                    <img
                      src={formData.bgImage || 'https://via.placeholder.com/400x200?text=Upload+Background'}
                      alt="Background"
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => document.getElementById('bg-image-upload').click()}
                        className="px-3 py-1.5 bg-white/90 text-gray-700 text-sm rounded-lg hover:bg-white transition-colors flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Change Image
                      </button>
                    </div>
                  </div>
                  <input
                    id="bg-image-upload"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleBgImageUpload}
                    className="hidden"
                    ref={bgFileInputRef}
                  />
                  <p className="text-xs text-gray-400 mt-2 text-center">Recommended: 1920x600px, max 5MB</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}