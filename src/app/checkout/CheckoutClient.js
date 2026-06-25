
// 'use client';

// import { useState, useEffect, useCallback, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';

// import { 
//   FaChevronDown, 
//   FaCheckCircle, 
//   FaTimes, 
//   FaUser,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaFileAlt,
//   FaMoneyBillWave,
//   FaTruck,
//   FaShoppingBag,
//   FaClock,
//   FaShieldAlt,
//   FaArrowLeft,
//   FaBox,
//   FaShippingFast,
//   FaCreditCard,
//   FaStore,
//   FaBuilding,
//   FaSearch,
//   FaHome,
//   FaCity,
//   FaMapPin,
//   FaMinus,
//   FaPlus,
//   FaTrash
// } from 'react-icons/fa';
// import { toast } from 'sonner';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';


// // Searchable Select Component - No "Other" option
// const SearchableSelect = ({ name, value, onChange, options, placeholder, required, disabled, error }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const dropdownRef = useRef(null);

//   const filteredOptions = options.filter(option =>
//     option.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleSelect = (selectedValue) => {
//     onChange({ target: { name, value: selectedValue } });
//     setIsOpen(false);
//     setSearchTerm('');
//   };

//   const handleClear = () => {
//     onChange({ target: { name, value: '' } });
//     setSearchTerm('');
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const selectedOption = value && options.includes(value) ? value : '';

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <div
//         className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl focus-within:ring-2 focus-within:ring-black focus-within:border-transparent cursor-pointer flex items-center justify-between transition-all ${
//           disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
//         } ${error ? 'border-red-500' : 'border-gray-200 hover:border-black'}`}
//         onClick={() => !disabled && setIsOpen(!isOpen)}
//       >
//         <span className={`text-sm ${selectedOption ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
//           {selectedOption || placeholder}
//         </span>
//         <div className="flex items-center gap-2">
//           {selectedOption && !disabled && (
//             <button
//               type="button"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleClear();
//               }}
//               className="text-gray-400 hover:text-gray-600"
//             >
//               <FaTimes className="w-3 h-3" />
//             </button>
//           )}
//           <FaChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
//         </div>
//       </div>

//       {isOpen && !disabled && (
//         <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-hidden">
//           <div className="p-2 border-b border-gray-100">
//             <div className="relative">
//               <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search..."
//                 className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
//                 onClick={(e) => e.stopPropagation()}
//               />
//             </div>
//           </div>
//           <div className="overflow-y-auto max-h-48">
//             {filteredOptions.length > 0 ? (
//               filteredOptions.map((option, idx) => (
//                 <button
//                   key={idx}
//                   type="button"
//                   onClick={() => handleSelect(option)}
//                   className="w-full px-4 py-2.5 text-left hover:bg-gray-100 transition-colors text-sm"
//                 >
//                   {option}
//                 </button>
//               ))
//             ) : (
//               <div className="px-4 py-3 text-sm text-gray-500 text-center">
//                 No results found
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//       {required && !disabled && (
//         <input type="hidden" name={name} value={value} required={required} />
//       )}
//     </div>
//   );
// };

// // Payment Selector - COD Only
// const PaymentSelector = ({ onSubmit, isSubmitting, disabled }) => {
//   return (
//     <div>
//       <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border-2 border-black">
//         <div className="flex items-start gap-3">
//           <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
//             <FaMoneyBillWave className="w-5 h-5 text-white" />
//           </div>
//           <div>
//             <h4 className="font-bold text-gray-900 text-sm">Cash on Delivery</h4>
//             <p className="text-xs text-gray-600">Pay when you receive your order</p>
//           </div>
//         </div>
//       </div>
      
//       {disabled ? (
//         <div className="w-full mt-4 bg-gray-200 text-gray-600 py-3 rounded-xl font-semibold text-center cursor-not-allowed flex items-center justify-center gap-2 text-sm">
//           <FaShieldAlt className="w-4 h-4" />
//           Checkout Disabled for Admin/Moderator
//         </div>
//       ) : (
//         <button
//           type="button"
//           onClick={onSubmit}
//           disabled={isSubmitting}
//           className="w-full mt-4 bg-black text-white py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
//         >
//           {isSubmitting ? (
//             <>
//               <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
//               </svg>
//               Placing Order...
//             </>
//           ) : (
//             <>
//               <FaShoppingBag className="w-4 h-4" />
//               Place Order
//             </>
//           )}
//         </button>
//       )}
//     </div>
//   );
// };

// // Order Success Modal
// const OrderSuccessModal = ({ isOpen, onClose, orderId, isLoggedIn, customerEmail }) => {
//   const router = useRouter();
  
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
//           >
//             <div className="p-6 bg-gradient-to-r from-black to-gray-800 text-white text-center">
//               <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
//                 <FaCheckCircle className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-xl font-bold">Order Placed Successfully! 🎉</h2>
//               <p className="text-sm text-white/80 mt-1">Your order has been confirmed</p>
//             </div>
            
//             <div className="p-6 text-center">
//               <p className="text-gray-700 mb-2">Thank you for your order!</p>
//               <p className="text-sm text-gray-500 mb-4">We'll notify you when it ships.</p>
//               {orderId && (
//                 <div className="bg-gray-50 rounded-lg p-3 mb-4">
//                   <p className="text-xs text-gray-400">Order Reference</p>
//                   <p className="text-sm font-mono font-bold text-gray-800">{orderId.slice(-8).toUpperCase()}</p>
//                 </div>
//               )}
//               {customerEmail ? (
//                 <div className="bg-blue-50 rounded-lg p-3 mb-4 flex items-start gap-2 text-left">
//                   <FaCheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
//                   <p className="text-xs text-blue-700">A confirmation email has been sent to {customerEmail}</p>
//                 </div>
//               ) : (
//                 <div className="bg-yellow-50 rounded-lg p-3 mb-4 flex items-start gap-2 text-left">
//                   <FaCheckCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
//                   <p className="text-xs text-yellow-700">Order placed successfully! Check your phone for updates.</p>
//                 </div>
//               )}
//             </div>
            
//             <div className="p-4 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row gap-2">
//               <button 
//                 onClick={() => {
//                   onClose();
//                   if (isLoggedIn) {
//                     router.push('/customer/orders');
//                   }
//                 }} 
//                 className="flex-1 px-4 py-2.5 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-medium"
//               >
//                 {isLoggedIn ? 'View My Orders' : 'Continue Shopping'}
//               </button>
//               <button 
//                 onClick={onClose}
//                 className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
//               >
//                 Close
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default function CheckoutClient() {
//   const router = useRouter();
//   const [cart, setCart] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [user, setUser] = useState(null);
//   const [showOrderSuccessModal, setShowOrderSuccessModal] = useState(false);
//   const [lastOrderId, setLastOrderId] = useState(null);
//   const [shippingCost, setShippingCost] = useState(0);
//   const [isUpdatingCart, setIsUpdatingCart] = useState(false);
//   const [navigating, setNavigating] = useState(false);
//   const isPlacingOrder = useRef(false);

//   const [shippingRates, setShippingRates] = useState({
//     insideDhaka: 70,
//     outsideDhaka: 150
//   });

//   const [locationData, setLocationData] = useState({});
//   const [divisions, setDivisions] = useState({});
//   const [divisionList, setDivisionList] = useState([]);
//   const [citiesByDivision, setCitiesByDivision] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [zones, setZones] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [locationLoading, setLocationLoading] = useState(true);

//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     division: '',
//     address: '',
//     city: '',
//     zone: '',
//     area: '',
//     zipCode: '',
//     country: 'Bangladesh',
//     note: ''
//   });

//   const [errors, setErrors] = useState({});
//   const [quantityInputs, setQuantityInputs] = useState({});

//   // Fetch locations
//   // useEffect(() => {
//   //   const fetchLocations = async () => {
//   //     try {
//   //       const response = await fetch('/api/locations');
//   //       const data = await response.json();
//   //       setLocationData(data.locationData || {});
        
//   //       setDivisions(data.divisions || {});
//   //       setDivisionList(Object.keys(data.divisions || {}).sort());
        
//   //       const cityList = data.locationData ? Object.keys(data.locationData) : [];
//   //       setCities(cityList);
//   //       setLocationLoading(false);
//   //     } catch (error) {
//   //       console.error('Failed to load location data:', error);
//   //       setLocationLoading(false);
//   //     }
//   //   };
//   //   fetchLocations();
//   // }, []);

//   // Fetch locations
// useEffect(() => {
//   const fetchLocations = async () => {
//     try {
//       const response = await fetch('/api/locations');
//       const data = await response.json();
//       setLocationData(data.locationData || {});
      
//       // Get divisions and filter out "Other"
//       const divisions = data.divisions || {};
//       const filteredDivisions = {};
//       const divisionKeys = [];
      
//       Object.keys(divisions).forEach(key => {
//         if (key !== 'Other') {
//           filteredDivisions[key] = divisions[key];
//           divisionKeys.push(key);
//         }
//       });
      
//       setDivisions(filteredDivisions);
//       setDivisionList(divisionKeys.sort());
      
//       const cityList = data.locationData ? Object.keys(data.locationData) : [];
//       setCities(cityList);
//       setLocationLoading(false);
//     } catch (error) {
//       console.error('Failed to load location data:', error);
//       setLocationLoading(false);
//     }
//   };
//   fetchLocations();
// }, []);

//   // Update cities when division changes
//   useEffect(() => {
//     if (formData.division && divisions[formData.division]) {
//       setCitiesByDivision(divisions[formData.division]);
//       setFormData(prev => ({ ...prev, city: '', zone: '', area: '' }));
//       setZones([]);
//       setAreas([]);
//     } else {
//       setCitiesByDivision([]);
//     }
//   }, [formData.division, divisions]);

//   // Update zones when city changes
//   useEffect(() => {
//     const selectedCity = formData.city;
//     if (selectedCity && locationData[selectedCity]) {
//       const availableZones = Object.keys(locationData[selectedCity].zones || {});
//       setZones(availableZones);
//       setFormData(prev => ({ ...prev, zone: '', area: '' }));
//       setAreas([]);
//       const isDhaka = selectedCity.toLowerCase() === 'dhaka';
//       setShippingCost(isDhaka ? shippingRates.insideDhaka : shippingRates.outsideDhaka);
//     } else {
//       setZones([]);
//       setAreas([]);
//     }
//   }, [formData.city, locationData, shippingRates]);

//   // Update areas when zone changes
//   useEffect(() => {
//     const selectedCity = formData.city;
//     const selectedZone = formData.zone;
//     if (selectedCity && selectedZone && locationData[selectedCity]) {
//       const availableAreas = locationData[selectedCity].zones[selectedZone] || [];
//       setAreas(availableAreas);
//       setFormData(prev => ({ ...prev, area: '' }));
//     } else {
//       setAreas([]);
//     }
//   }, [formData.zone, formData.city, locationData]);

//   // Fetch cart, user, shipping rates on mount
//   useEffect(() => {
//     fetchCart();
//     fetchUser();
//     fetchShippingRates();
//   }, []);

//   // Autofill user data when user is loaded
//   useEffect(() => {
//     if (user) {
//       setFormData(prev => ({
//         ...prev,
//         fullName: user.contactPerson || user.companyName || user.name || '',
//         email: user.email || '',
//         phone: user.phone || '',
//         division: user.division || '',
//         address: user.address || '',
//         city: user.city || '',
//         zone: user.zone || '',
//         area: user.area || '',
//         zipCode: user.zipCode || '',
//         country: user.country || 'Bangladesh'
//       }));
      
//       if (user.division) {
//         setFormData(prev => ({ ...prev, division: user.division }));
//       }
      
//       if (user.city) {
//         setFormData(prev => ({ ...prev, city: user.city }));
//       }
      
//       if (user.zone) setFormData(prev => ({ ...prev, zone: user.zone }));
//       if (user.area) setFormData(prev => ({ ...prev, area: user.area }));
//     }
//   }, [user]);

//   const fetchUser = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (token) {
//         const response = await fetch('http://localhost:5000/api/auth/me', {
//           headers: { 'Authorization': `Bearer ${token}` }
//         });
//         const data = await response.json();
//         if (data.success) setUser(data.user);
//       }
//     } catch (error) {
//       console.error('Fetch user error:', error);
//     }
//   };

//   const fetchShippingRates = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/delivery/settings');
//       const data = await response.json();
//       if (data.success) {
//         setShippingRates({
//           insideDhaka: data.data.insideDhaka,
//           outsideDhaka: data.data.outsideDhaka
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching shipping rates:', error);
//     }
//   };

//   const fetchCart = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = {};
//       if (token) headers['Authorization'] = `Bearer ${token}`;
//       else if (sessionId) headers['x-session-id'] = sessionId;
      
//       const response = await fetch('http://localhost:5000/api/cart', { headers });
//       const data = await response.json();
      
//       if (data.success && data.data.items?.length > 0) {
//         setCart(data.data);
//       } else {
//         setCart({ items: [], totalItems: 0, subtotal: 0 });
//       }
//     } catch (error) {
//       console.error('Fetch cart error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Update cart item quantity
//   const updateCartQuantity = async (itemId, newQuantity) => {
//     if (isUpdatingCart) return;
    
//     if (newQuantity < 1) {
//       removeCartItem(itemId);
//       return;
//     }
    
//     setIsUpdatingCart(true);
    
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = { 'Content-Type': 'application/json' };
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       const response = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
//         method: 'PUT',
//         headers,
//         body: JSON.stringify({ quantity: newQuantity })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         setCart(data.data);
//         window.dispatchEvent(new Event('cart-update'));
//         toast.success('Quantity updated');
//       } else {
//         toast.error(data.error || 'Failed to update quantity');
//         fetchCart();
//       }
//     } catch (error) {
//       console.error('Update quantity error:', error);
//       toast.error('Failed to update quantity');
//       fetchCart();
//     } finally {
//       setIsUpdatingCart(false);
//     }
//   };

//   // Remove item from cart
//   const removeCartItem = async (itemId) => {
//     setIsUpdatingCart(true);
    
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = {};
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       const response = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
//         method: 'DELETE',
//         headers
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         setCart(data.data);
//         window.dispatchEvent(new Event('cart-update'));
//         toast.success('Item removed');
//       } else {
//         toast.error(data.error || 'Failed to remove item');
//         fetchCart();
//       }
//     } catch (error) {
//       console.error('Remove item error:', error);
//       toast.error('Failed to remove item');
//       fetchCart();
//     } finally {
//       setIsUpdatingCart(false);
//     }
//   };

//   // Handle cart update events from sidebar
//   useEffect(() => {
//     const handleCartUpdate = () => {
//       if (!isPlacingOrder.current) {
//         fetchCart();
//       }
//     };
    
//     window.addEventListener('cart-update', handleCartUpdate);
//     return () => window.removeEventListener('cart-update', handleCartUpdate);
//   }, []);

//   const validateBangladeshPhone = (phone) => {
//     const cleaned = phone.replace(/\D/g, '');
//     const bdPhoneRegex = /^(?:01|8801)\d{9}$/;
    
//     if (!bdPhoneRegex.test(cleaned)) {
//       return { valid: false, message: 'Please enter a valid Bangladeshi phone number (01XXXXXXXXX)' };
//     }
    
//     const prefix = cleaned.slice(0, 3);
//     const validPrefixes = ['013', '014', '015', '016', '017', '018', '019'];
    
//     if (!validPrefixes.includes(prefix)) {
//       return { valid: false, message: 'Please enter a valid Bangladeshi mobile number' };
//     }
    
//     return { valid: true, formatted: cleaned };
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    
//     // If division changes, reset city, zone, area
//     if (name === 'division') {
//       setFormData(prev => ({ ...prev, city: '', zone: '', area: '' }));
//       setZones([]);
//       setAreas([]);
//     }
    
//     // If city changes, reset zone, area
//     if (name === 'city') {
//       setFormData(prev => ({ ...prev, zone: '', area: '' }));
//       setAreas([]);
//     }
    
//     // If zone changes, reset area
//     if (name === 'zone') {
//       setFormData(prev => ({ ...prev, area: '' }));
//     }
    
//     if (name === 'phone' && value) {
//       const validation = validateBangladeshPhone(value);
//       if (!validation.valid) {
//         setErrors(prev => ({ ...prev, phone: validation.message }));
//       } else {
//         setErrors(prev => ({ ...prev, phone: '' }));
//       }
//     }
//   };

//   const handleQuantityInputChange = (itemId, value) => {
//     setQuantityInputs(prev => ({ ...prev, [itemId]: value }));
//   };

//   const handleQuantityInputBlur = (itemId, currentQuantity, stockQuantity) => {
//     const value = quantityInputs[itemId];
//     if (value === undefined || value === '') {
//       setQuantityInputs(prev => ({ ...prev, [itemId]: currentQuantity.toString() }));
//       return;
//     }
    
//     const val = parseInt(value);
//     if (isNaN(val) || val < 1) {
//       updateCartQuantity(itemId, currentQuantity);
//       setQuantityInputs(prev => ({ ...prev, [itemId]: currentQuantity.toString() }));
//     } else if (val > stockQuantity) {
//       updateCartQuantity(itemId, stockQuantity);
//       setQuantityInputs(prev => ({ ...prev, [itemId]: stockQuantity.toString() }));
//     } else {
//       updateCartQuantity(itemId, val);
//       setQuantityInputs(prev => ({ ...prev, [itemId]: val.toString() }));
//     }
//   };

//   // const validateForm = () => {
//   //   const newErrors = {};
    
//   //   if (!formData.fullName?.trim()) newErrors.fullName = 'Full name is required';
    
//   //   // Email is optional - only validate if provided
//   //   if (formData.email?.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
//   //     newErrors.email = 'Email is invalid';
//   //   }
    
//   //   if (!formData.phone?.trim()) newErrors.phone = 'Phone number is required';
//   //   else {
//   //     const validation = validateBangladeshPhone(formData.phone);
//   //     if (!validation.valid) newErrors.phone = validation.message;
//   //   }
    
//   //   if (!formData.division?.trim()) newErrors.division = 'Please select a division';
//   //   if (!formData.address?.trim()) newErrors.address = 'Address is required';
//   //   if (!formData.city?.trim()) newErrors.city = 'Please select a district/city';
//   //   if (!formData.zone?.trim()) newErrors.zone = 'Please select an upazila/thana';
    
//   //   setErrors(newErrors);
//   //   return Object.keys(newErrors).length === 0;
//   // };

//   const validateForm = () => {
//   const errors = {};
  
//   if (!formData.fullName?.trim()) {
//     errors.fullName = 'Full name is required';
//   }
  
//   // Email is optional - only validate if provided
//   if (formData.email?.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
//     errors.email = 'Email is invalid';
//   }
  
//   if (!formData.phone?.trim()) {
//     errors.phone = 'Phone number is required';
//   } else {
//     const validation = validateBangladeshPhone(formData.phone);
//     if (!validation.valid) {
//       errors.phone = validation.message;
//     }
//   }
  
//   if (!formData.division?.trim()) {
//     errors.division = 'Please select a division';
//   }
  
//   if (!formData.address?.trim()) {
//     errors.address = 'Address is required';
//   }
  
//   if (!formData.city?.trim()) {
//     errors.city = 'Please select a district/city';
//   }
  
//   if (!formData.zone?.trim()) {
//     errors.zone = 'Please select an upazila/thana';
//   }
  
//   setErrors(errors);
//   return errors;
// };

//   const calculateSubtotal = () => cart?.subtotal || 0;
//   const calculateTotal = () => calculateSubtotal() + shippingCost;
//   const isLoggedIn = !!user;
//   const isAdminOrModerator = user && (user.role === 'admin' || user.role === 'moderator');

//   const handleCODOrder = async () => {
//     if (isAdminOrModerator) {
//       toast.error('Admins and Moderators cannot place orders');
//       return;
//     }
    
//     if (navigating) return;
//     setNavigating(true);
//     setSubmitting(true);
//     isPlacingOrder.current = true;
    
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = { 'Content-Type': 'application/json' };
//       if (token) headers['Authorization'] = `Bearer ${token}`;
//       else if (sessionId) headers['x-session-id'] = sessionId;
      
//       const orderData = {
//         items: cart.items.map(item => ({
//           productId: item.productId || item._id,
//           productName: item.productName,
//           productSlug: item.productSlug || '',
//           image: item.image || '',
//           regularPrice: item.regularPrice,
//           discountPrice: item.discountPrice || 0,
//           quantity: item.quantity,
//           stockQuantity: item.stockQuantity || 0,
//           unit: item.unit || 'pcs'
//         })),
//         subtotal: calculateSubtotal(),
//         shippingCost,
//         discount: 0,
//         total: calculateTotal(),
//         paymentMethod: 'cod',
//         customerInfo: {
//           fullName: formData.fullName,
//           email: formData.email,
//           phone: formData.phone,
//           division: formData.division,
//           address: formData.address,
//           city: formData.city,
//           zone: formData.zone,
//           area: formData.area || '',
//           zipCode: formData.zipCode || '',
//           country: formData.country || 'Bangladesh',
//           note: formData.note || ''
//         },
//         couponCode: null,
//         couponDiscount: 0,
//         freeShipping: false
//       };
      
//       const response = await fetch('http://localhost:5000/api/orders', {
//         method: 'POST',
//         headers,
//         body: JSON.stringify(orderData)
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         await fetch('http://localhost:5000/api/cart', { method: 'DELETE', headers });
//         window.dispatchEvent(new Event('cart-update'));
//         const orderId = data.orderId || data.data?._id || data.data?.id;
        
//         setCart({ items: [], totalItems: 0, subtotal: 0 });
        
//         if (isLoggedIn) {
//           toast.success('Order placed successfully!');
//           window.location.href = '/customer/orders';
//         } else {
//           setShowOrderSuccessModal(true);
//           setLastOrderId(orderId);
//           setNavigating(false);
//           toast.success('Order placed successfully!');
//         }
//       } else {
//         toast.error(data.error || 'Failed to place order');
//         setNavigating(false);
//       }
//     } catch (error) {
//       console.error('COD order error:', error);
//       toast.error('Network error. Please try again.');
//       setNavigating(false);
//     } finally {
//       setSubmitting(false);
//       isPlacingOrder.current = false;
//     }
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
    
//   //   if (isAdminOrModerator) {
//   //     toast.error('Admins and Moderators cannot place orders');
//   //     return;
//   //   }
    
//   //   if (!validateForm()) {
//   //     toast.error('Please fix all errors before proceeding');
//   //     return;
//   //   }
    
//   //   if (!cart?.items?.length) {
//   //     toast.error('Your cart is empty');
//   //     return;
//   //   }
    
//   //   await handleCODOrder();
//   // };

// const handleSubmit = async (e) => {
//   e.preventDefault();
  
//   if (isAdminOrModerator) {
//     toast.error('Admins and Moderators cannot place orders');
//     return;
//   }
  
//   // Validate form and get errors
//   const validationErrors = validateForm();
  
//   if (Object.keys(validationErrors).length > 0) {
//     // Show error summary in toast with more details
//     const errorMessages = Object.values(validationErrors);
    
//     // Show a more descriptive toast with multiple lines
//     toast.error(
//       <div className="space-y-1">
//         <p className="font-semibold">Please fix the following errors:</p>
//         <ul className="text-xs space-y-0.5 list-disc list-inside">
//           {errorMessages.slice(0, 3).map((msg, i) => (
//             <li key={i}>{msg}</li>
//           ))}
//           {errorMessages.length > 3 && (
//             <li>And {errorMessages.length - 3} more error(s)...</li>
//           )}
//         </ul>
//       </div>,
//       { duration: 5000 }
//     );
    
//     // Scroll to the first error field
//     const firstErrorField = document.querySelector('.border-red-500');
//     if (firstErrorField) {
//       firstErrorField.scrollIntoView({ 
//         behavior: 'smooth', 
//         block: 'center' 
//       });
//       // Focus on the first error field
//       const input = firstErrorField.querySelector('input, textarea, select');
//       if (input) {
//         setTimeout(() => input.focus(), 500);
//       }
//     }
    
//     // Also scroll to the error summary if it exists
//     const errorSummary = document.getElementById('error-summary');
//     if (errorSummary) {
//       errorSummary.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }
    
//     return;
//   }
  
//   if (!cart?.items?.length) {
//     toast.error('Your cart is empty');
//     return;
//   }
  
//   await handleCODOrder();
// };



//   if (loading || locationLoading) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-gray-50 pt-20">
//           <div className="container mx-auto px-4 max-w-6xl">
//             <div className="flex items-center justify-center py-20">
//               <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   if (!cart?.items?.length) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-gray-50 py-16">
//           <div className="container mx-auto px-4 max-w-3xl text-center">
//             <div className="bg-white rounded-2xl shadow-sm p-12">
//               <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
//                 <FaShoppingBag className="w-10 h-10 text-gray-400" />
//               </div>
//               <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
//               <p className="text-gray-500 mb-6">Add some products to your cart and come back to checkout.</p>
//               <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors">
//                 <FaArrowLeft className="w-4 h-4" />
//                 Continue Shopping
//               </Link>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   const subtotal = calculateSubtotal();
//   const total = calculateTotal();

//   return (
//     <>
//       <Navbar />
      
//       <div className="min-h-screen bg-gray-50 py-8">
//         <div className="container mx-auto px-4 max-w-6xl">
//           {/* Header */}
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
//                 <FaShoppingBag className="w-5 h-5 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
//                 <p className="text-sm text-gray-500">Complete your order securely</p>
//               </div>
//             </div>
//             <Link href="/cart" className="flex items-center gap-2 text-sm text-black hover:text-gray-600 transition-colors font-medium">
//               <FaArrowLeft className="w-4 h-4" />
//               Back to Cart
//             </Link>
//           </div>

          

//           {isAdminOrModerator && (
//             <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl">
//               <div className="flex items-center gap-3">
//                 <FaShieldAlt className="w-5 h-5 text-yellow-600" />
//                 <div>
//                   <p className="text-sm text-yellow-700 font-medium">Checkout Disabled for Admin/Moderator Accounts</p>
//                   <p className="text-xs text-yellow-600">You are logged in as {user?.role}. Please switch to a customer account to place orders.</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Left Column - Forms */}
//             <div className="lg:col-span-2 space-y-5">
//               {/* Personal Information */}
//               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//                 <div className="flex items-center justify-between mb-5">
//                   <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
//                     <FaUser className="w-5 h-5 text-black" />
//                     Personal Information
//                   </h2>
//                   {isLoggedIn && (
//                     <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-1 font-medium">
//                       <FaCheckCircle className="w-3 h-3" />
//                       Verified
//                     </span>
//                   )}
//                 </div>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                       Full Name <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//                       <input
//                         type="text"
//                         name="fullName"
//                         value={formData.fullName}
//                         onChange={handleInputChange}
//                         className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition text-sm ${
//                           isLoggedIn ? 'bg-gray-50 text-gray-600' : 'bg-white'
//                         } ${errors.fullName ? 'border-red-500' : 'border-gray-200'}`}
//                         placeholder="Enter your full name"
//                         disabled={isLoggedIn}
//                       />
//                     </div>
//                     {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                       Email <span className="text-gray-400 text-xs">(Optional)</span>
//                     </label>
//                     <div className="relative">
//                       <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition text-sm ${
//                           isLoggedIn ? 'bg-gray-50 text-gray-600' : 'bg-white'
//                         } ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
//                         placeholder="your@email.com (optional)"
//                         disabled={isLoggedIn}
//                       />
//                     </div>
//                     {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                       Phone Number <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition text-sm ${
//                           errors.phone ? 'border-red-500' : 'border-gray-200'
//                         }`}
//                         placeholder="01XXXXXXXXX"
//                       />
//                     </div>
//                     {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
//                     <p className="text-[10px] text-gray-400 mt-1">Enter a valid Bangladeshi mobile number</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Delivery Address */}
//               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//                 <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-5">
//                   <FaMapMarkerAlt className="w-5 h-5 text-black" />
//                   Delivery Address
//                 </h2>
                
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                       Full Address <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <FaHome className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
//                       <textarea
//                         name="address"
//                         value={formData.address}
//                         onChange={handleInputChange}
//                         rows="2"
//                         className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition bg-white text-sm resize-none ${
//                           errors.address ? 'border-red-500' : 'border-gray-200'
//                         }`}
//                         placeholder="House #, Road #, Area, City, Zip Code"
//                       />
//                     </div>
//                     {isLoggedIn && user?.address && (
//                       <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
//                         <FaCheckCircle className="w-3 h-3" />
//                         Your saved address has been pre-filled
//                       </p>
//                     )}
//                     {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {/* Division */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         Division <span className="text-red-500">*</span>
//                       </label>
//                       <SearchableSelect
//                         name="division"
//                         value={formData.division}
//                         onChange={handleInputChange}
//                         options={divisionList}
//                         placeholder="Select Division"
//                         required
//                         disabled={false}
//                         error={errors.division}
//                       />
//                       {errors.division && <p className="text-xs text-red-500 mt-1">{errors.division}</p>}
//                     </div>
                    
//                     {/* District/City */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         District/City <span className="text-red-500">*</span>
//                       </label>
//                       <SearchableSelect
//                         name="city"
//                         value={formData.city}
//                         onChange={handleInputChange}
//                         options={citiesByDivision}
//                         placeholder={formData.division ? "Select District" : "Select Division First"}
//                         required
//                         disabled={!formData.division}
//                         error={errors.city}
//                       />
//                       {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
//                     </div>
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {/* Upazila/Thana */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         Upazila/Thana <span className="text-red-500">*</span>
//                       </label>
//                       <SearchableSelect
//                         name="zone"
//                         value={formData.zone}
//                         onChange={handleInputChange}
//                         options={zones}
//                         placeholder={formData.city ? "Select Upazila/Thana" : "Select District First"}
//                         required
//                         disabled={!formData.city}
//                         error={errors.zone}
//                       />
//                       {errors.zone && <p className="text-xs text-red-500 mt-1">{errors.zone}</p>}
//                     </div>
                    
//                     {/* Union/Area */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                         Union/Area
//                       </label>
//                       <SearchableSelect
//                         name="area"
//                         value={formData.area}
//                         onChange={handleInputChange}
//                         options={areas}
//                         placeholder={formData.zone ? "Select Union/Area" : "Select Upazila First"}
//                         disabled={!formData.zone}
//                         error={errors.area}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Order Notes */}
//               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//                 <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
//                   <FaFileAlt className="w-5 h-5 text-black" />
//                   Order Notes <span className="text-sm font-normal text-gray-400">(Optional)</span>
//                 </h2>
//                 <textarea
//                   name="note"
//                   value={formData.note}
//                   onChange={handleInputChange}
//                   rows="2"
//                   className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition text-sm resize-none"
//                   placeholder="Special instructions for delivery, gift message, etc."
//                 />
//               </div>
//             </div>

//             {/* Right Column - Order Summary */}
//             <div className="lg:col-span-1">
//               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
//                 <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
//                   <FaShoppingBag className="w-5 h-5 text-black" />
//                   Order Summary
//                 </h2>
                
//                 {/* Items List with Quantity Controls */}
//                 <div className="space-y-3 max-h-60 overflow-y-auto mb-4 pr-1">
//                   {cart.items.map((item) => {
//                     const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
//                     const totalPrice = price * item.quantity;
//                     return (
//                       <div key={item._id} className="flex flex-col gap-2 pb-3 border-b border-gray-100">
//                         <div className="flex gap-3">
//                           <img 
//                             src={item.image || 'https://via.placeholder.com/50'} 
//                             alt={item.productName} 
//                             className="w-12 h-12 rounded-lg object-cover border border-gray-200 flex-shrink-0"
//                             onError={(e) => { e.target.src = 'https://via.placeholder.com/50?text=Product'; }}
//                           />
//                           <div className="flex-1 min-w-0">
//                             <p className="text-sm font-medium text-gray-800 truncate">{item.productName}</p>
//                             <p className="text-sm font-bold text-black">৳{totalPrice.toFixed(2)}</p>
//                           </div>
//                         </div>
                        
//                         {/* Quantity Controls */}
//                         <div className="flex items-center justify-between ml-14">
//                           <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
//                             <button
//                               onClick={() => {
//                                 const newQty = item.quantity - 1;
//                                 if (newQty >= 1) {
//                                   updateCartQuantity(item._id, newQty);
//                                   setQuantityInputs(prev => ({ ...prev, [item._id]: newQty.toString() }));
//                                 }
//                               }}
//                               disabled={isUpdatingCart || item.quantity <= 1}
//                               className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 transition-colors"
//                             >
//                               <FaMinus className="w-3 h-3 text-gray-600" />
//                             </button>
                            
//                             <input
//                               type="number"
//                               min="1"
//                               max={item.stockQuantity}
//                               value={quantityInputs[item._id] !== undefined ? quantityInputs[item._id] : item.quantity}
//                               onChange={(e) => {
//                                 const value = e.target.value;
//                                 if (value === '' || /^\d+$/.test(value)) {
//                                   handleQuantityInputChange(item._id, value);
//                                 }
//                               }}
//                               onBlur={() => handleQuantityInputBlur(item._id, item.quantity, item.stockQuantity)}
//                               onKeyDown={(e) => {
//                                 if (e.key === 'Enter') {
//                                   e.target.blur();
//                                 }
//                               }}
//                               className="w-10 text-center text-sm font-medium text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-black py-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
//                               disabled={isUpdatingCart}
//                             />
                            
//                             <button
//                               onClick={() => {
//                                 const newQty = item.quantity + 1;
//                                 if (newQty <= item.stockQuantity) {
//                                   updateCartQuantity(item._id, newQty);
//                                   setQuantityInputs(prev => ({ ...prev, [item._id]: newQty.toString() }));
//                                 }
//                               }}
//                               disabled={isUpdatingCart || item.quantity >= item.stockQuantity}
//                               className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 transition-colors"
//                             >
//                               <FaPlus className="w-3 h-3 text-gray-600" />
//                             </button>
//                           </div>
                          
//                           <button
//                             onClick={() => removeCartItem(item._id)}
//                             disabled={isUpdatingCart}
//                             className="text-red-400 hover:text-red-600 transition-colors p-1"
//                           >
//                             <FaTrash className="w-3.5 h-3.5" />
//                           </button>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
                
//                 {/* Totals */}
//                 <div className="space-y-2 border-t border-gray-200 pt-4">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-600">Subtotal</span>
//                     <span className="font-medium">৳{subtotal.toFixed(2)}</span>
//                   </div>
                  
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-600">Shipping</span>
//                     <span className="font-medium text-green-600">৳{shippingCost.toFixed(2)}</span>
//                   </div>
                  
//                   <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200">
//                     <span className="text-gray-900">Total</span>
//                     <span className="text-black">৳{total.toFixed(2)}</span>
//                   </div>
//                 </div>
                
//                 {/* Trust Badges */}
//                 <div className="mt-4 space-y-1.5 text-xs">
//                   <div className="flex items-center gap-2 text-gray-500">
//                     <FaShieldAlt className="w-4 h-4" />
//                     <span>Safe & Secure Shopping</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-gray-500">
//                     <FaClock className="w-4 h-4" />
//                     <span>7-Day Return Policy</span>
//                   </div>
//                 </div>
                
//                 {/* Payment & Place Order */}
//                 <div className="mt-5">
//                   <PaymentSelector
//                     onSubmit={handleSubmit}
//                     isSubmitting={submitting}
//                     disabled={isAdminOrModerator}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <OrderSuccessModal
//         isOpen={showOrderSuccessModal}
//         onClose={() => {
//           setShowOrderSuccessModal(false);
//         }}
//         orderId={lastOrderId}
//         isLoggedIn={isLoggedIn}
//         customerEmail={formData.email}
//       />
      
//       <Footer />
//     </>
//   );
// }


'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import { 
  FaChevronDown, 
  FaCheckCircle, 
  FaTimes, 
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFileAlt,
  FaMoneyBillWave,
  FaTruck,
  FaShoppingBag,
  FaClock,
  FaShieldAlt,
  FaArrowLeft,
  FaBox,
  FaShippingFast,
  FaCreditCard,
  FaStore,
  FaBuilding,
  FaSearch,
  FaHome,
  FaCity,
  FaMapPin,
  FaMinus,
  FaPlus,
  FaTrash,
  FaHeart,
  FaStar
} from 'react-icons/fa';
import { toast } from 'sonner';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';


// Searchable Select Component - Beauty Theme
const SearchableSelect = ({ name, value, onChange, options, placeholder, required, disabled, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (selectedValue) => {
    onChange({ target: { name, value: selectedValue } });
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = () => {
    onChange({ target: { name, value: '' } });
    setSearchTerm('');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = value && options.includes(value) ? value : '';

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl focus-within:ring-2 focus-within:ring-[#EE4275] focus-within:border-transparent cursor-pointer flex items-center justify-between transition-all ${
          disabled ? 'bg-[#FFF5F6] cursor-not-allowed' : 'bg-white'
        } ${error ? 'border-red-500' : 'border-[#FFD2DB]/50 hover:border-[#EE4275]/50'}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={`text-sm ${selectedOption ? 'text-[#2D1B2E] font-medium' : 'text-[#C4B5C5]'}`}>
          {selectedOption || placeholder}
        </span>
        <div className="flex items-center gap-2">
          {selectedOption && !disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="text-[#C4B5C5] hover:text-[#EE4275]"
            >
              <FaTimes className="w-3 h-3" />
            </button>
          )}
          <FaChevronDown className={`w-3 h-3 text-[#C4B5C5] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-[#FFD2DB]/50 rounded-xl shadow-lg max-h-60 overflow-hidden">
          <div className="p-2 border-b border-[#FFD2DB]/30">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C4B5C5] w-3.5 h-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-2 border border-[#FFD2DB]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE4275] text-sm"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
          <div className="overflow-y-auto max-h-48">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className="w-full px-4 py-2.5 text-left hover:bg-[#FFF5F6] transition-colors text-sm text-[#2D1B2E]"
                >
                  {option}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-[#C4B5C5] text-center">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
      {required && !disabled && (
        <input type="hidden" name={name} value={value} required={required} />
      )}
    </div>
  );
};

// Payment Selector - Beauty Theme
const PaymentSelector = ({ onSubmit, isSubmitting, disabled }) => {
  return (
    <div>
      <div className="bg-gradient-to-r from-[#FFF5F6] to-[#FFD2DB]/30 rounded-xl p-4 border-2 border-[#EE4275]/30">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#EE4275] to-[#FF6B9D] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#EE4275]/25">
            <FaMoneyBillWave className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-[#2D1B2E] text-sm" style={{ fontFamily: '"Playfair Display"' }}>
              Cash on Delivery
            </h4>
            <p className="text-xs text-[#8B7A8C]">Pay when you receive your order</p>
          </div>
        </div>
      </div>
      
      {disabled ? (
        <div className="w-full mt-4 bg-[#FFF5F6] text-[#8B7A8C] py-3 rounded-xl font-semibold text-center cursor-not-allowed flex items-center justify-center gap-2 text-sm border border-[#FFD2DB]/50">
          <FaShieldAlt className="w-4 h-4 text-[#EE4275]" />
          Checkout Disabled for Admin/Moderator
        </div>
      ) : (
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full mt-4 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-lg flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Placing Order...
            </>
          ) : (
            <>
              <FaHeart className="w-4 h-4" />
              Place Order
            </>
          )}
        </button>
      )}
    </div>
  );
};

// Order Success Modal - Beauty Theme
const OrderSuccessModal = ({ isOpen, onClose, orderId, isLoggedIn, customerEmail }) => {
  const router = useRouter();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-[#FFD2DB]/40"
          >
            <div className="p-6 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                <FaCheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold" style={{ fontFamily: '"Playfair Display"' }}>
                Order Placed Successfully! ✨
              </h2>
              <p className="text-sm text-white/80 mt-1">Your beauty order has been confirmed</p>
            </div>
            
            <div className="p-6 text-center">
              <p className="text-[#2D1B2E] mb-2" style={{ fontFamily: '"Playfair Display"' }}>
                Thank you for your order!
              </p>
              <p className="text-sm text-[#8B7A8C] mb-4">We'll notify you when it ships.</p>
              {orderId && (
                <div className="bg-[#FFF5F6] rounded-lg p-3 mb-4 border border-[#FFD2DB]/30">
                  <p className="text-xs text-[#8B7A8C]">Order Reference</p>
                  <p className="text-sm font-mono font-bold text-[#EE4275]">{orderId.slice(-8).toUpperCase()}</p>
                </div>
              )}
              {customerEmail ? (
                <div className="bg-[#FFF5F6] rounded-lg p-3 mb-4 flex items-start gap-2 text-left border border-[#FFD2DB]/30">
                  <FaCheckCircle className="w-4 h-4 text-[#EE4275] mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-[#2D1B2E]">A confirmation email has been sent to <span className="font-medium text-[#EE4275]">{customerEmail}</span></p>
                </div>
              ) : (
                <div className="bg-[#FFF5F6] rounded-lg p-3 mb-4 flex items-start gap-2 text-left border border-[#FFD2DB]/30">
                  <FaCheckCircle className="w-4 h-4 text-[#EE4275] mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-[#2D1B2E]">Order placed successfully! Check your phone for updates.</p>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-[#FFD2DB]/30 bg-[#FFF5F6] flex flex-col sm:flex-row gap-2">
              <button 
                onClick={() => {
                  onClose();
                  if (isLoggedIn) {
                    router.push('/customer/orders');
                  }
                }} 
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-xl hover:shadow-lg hover:shadow-[#EE4275]/25 transition-colors text-sm font-medium"
              >
                {isLoggedIn ? 'View My Orders' : 'Continue Shopping'}
              </button>
              <button 
                onClick={onClose}
                className="flex-1 px-4 py-2.5 border border-[#FFD2DB]/50 text-[#8B7A8C] rounded-xl hover:bg-white transition-colors text-sm font-medium"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function CheckoutClient() {
  const router = useRouter();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [showOrderSuccessModal, setShowOrderSuccessModal] = useState(false);
  const [lastOrderId, setLastOrderId] = useState(null);
  const [shippingCost, setShippingCost] = useState(0);
  const [isUpdatingCart, setIsUpdatingCart] = useState(false);
  const [navigating, setNavigating] = useState(false);
  const isPlacingOrder = useRef(false);

  const [shippingRates, setShippingRates] = useState({
    insideDhaka: 70,
    outsideDhaka: 150
  });

  const [locationData, setLocationData] = useState({});
  const [divisions, setDivisions] = useState({});
  const [divisionList, setDivisionList] = useState([]);
  const [citiesByDivision, setCitiesByDivision] = useState([]);
  const [cities, setCities] = useState([]);
  const [zones, setZones] = useState([]);
  const [areas, setAreas] = useState([]);
  const [locationLoading, setLocationLoading] = useState(true);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    division: '',
    address: '',
    city: '',
    zone: '',
    area: '',
    zipCode: '',
    country: 'Bangladesh',
    note: ''
  });

  const [errors, setErrors] = useState({});
  const [quantityInputs, setQuantityInputs] = useState({});

  // Fetch locations
useEffect(() => {
  const fetchLocations = async () => {
    try {
      const response = await fetch('/api/locations');
      const data = await response.json();
      setLocationData(data.locationData || {});
      
      const divisions = data.divisions || {};
      const filteredDivisions = {};
      const divisionKeys = [];
      
      Object.keys(divisions).forEach(key => {
        if (key !== 'Other') {
          filteredDivisions[key] = divisions[key];
          divisionKeys.push(key);
        }
      });
      
      setDivisions(filteredDivisions);
      setDivisionList(divisionKeys.sort());
      
      const cityList = data.locationData ? Object.keys(data.locationData) : [];
      setCities(cityList);
      setLocationLoading(false);
    } catch (error) {
      console.error('Failed to load location data:', error);
      setLocationLoading(false);
    }
  };
  fetchLocations();
}, []);

  // Update cities when division changes
  useEffect(() => {
    if (formData.division && divisions[formData.division]) {
      setCitiesByDivision(divisions[formData.division]);
      setFormData(prev => ({ ...prev, city: '', zone: '', area: '' }));
      setZones([]);
      setAreas([]);
    } else {
      setCitiesByDivision([]);
    }
  }, [formData.division, divisions]);

  // Update zones when city changes
  useEffect(() => {
    const selectedCity = formData.city;
    if (selectedCity && locationData[selectedCity]) {
      const availableZones = Object.keys(locationData[selectedCity].zones || {});
      setZones(availableZones);
      setFormData(prev => ({ ...prev, zone: '', area: '' }));
      setAreas([]);
      const isDhaka = selectedCity.toLowerCase() === 'dhaka';
      setShippingCost(isDhaka ? shippingRates.insideDhaka : shippingRates.outsideDhaka);
    } else {
      setZones([]);
      setAreas([]);
    }
  }, [formData.city, locationData, shippingRates]);

  // Update areas when zone changes
  useEffect(() => {
    const selectedCity = formData.city;
    const selectedZone = formData.zone;
    if (selectedCity && selectedZone && locationData[selectedCity]) {
      const availableAreas = locationData[selectedCity].zones[selectedZone] || [];
      setAreas(availableAreas);
      setFormData(prev => ({ ...prev, area: '' }));
    } else {
      setAreas([]);
    }
  }, [formData.zone, formData.city, locationData]);

  // Fetch cart, user, shipping rates on mount
  useEffect(() => {
    fetchCart();
    fetchUser();
    fetchShippingRates();
  }, []);

  // Autofill user data when user is loaded
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.contactPerson || user.companyName || user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        division: user.division || '',
        address: user.address || '',
        city: user.city || '',
        zone: user.zone || '',
        area: user.area || '',
        zipCode: user.zipCode || '',
        country: user.country || 'Bangladesh'
      }));
      
      if (user.division) {
        setFormData(prev => ({ ...prev, division: user.division }));
      }
      
      if (user.city) {
        setFormData(prev => ({ ...prev, city: user.city }));
      }
      
      if (user.zone) setFormData(prev => ({ ...prev, zone: user.zone }));
      if (user.area) setFormData(prev => ({ ...prev, area: user.area }));
    }
  }, [user]);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.success) setUser(data.user);
      }
    } catch (error) {
      console.error('Fetch user error:', error);
    }
  };

  const fetchShippingRates = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/delivery/settings');
      const data = await response.json();
      if (data.success) {
        setShippingRates({
          insideDhaka: data.data.insideDhaka,
          outsideDhaka: data.data.outsideDhaka
        });
      }
    } catch (error) {
      console.error('Error fetching shipping rates:', error);
    }
  };

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      else if (sessionId) headers['x-session-id'] = sessionId;
      
      const response = await fetch('http://localhost:5000/api/cart', { headers });
      const data = await response.json();
      
      if (data.success && data.data.items?.length > 0) {
        setCart(data.data);
      } else {
        setCart({ items: [], totalItems: 0, subtotal: 0 });
      }
    } catch (error) {
      console.error('Fetch cart error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update cart item quantity
  const updateCartQuantity = async (itemId, newQuantity) => {
    if (isUpdatingCart) return;
    
    if (newQuantity < 1) {
      removeCartItem(itemId);
      return;
    }
    
    setIsUpdatingCart(true);
    
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = { 'Content-Type': 'application/json' };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }
      
      const response = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ quantity: newQuantity })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCart(data.data);
        window.dispatchEvent(new Event('cart-update'));
        toast.success('Quantity updated');
      } else {
        toast.error(data.error || 'Failed to update quantity');
        fetchCart();
      }
    } catch (error) {
      console.error('Update quantity error:', error);
      toast.error('Failed to update quantity');
      fetchCart();
    } finally {
      setIsUpdatingCart(false);
    }
  };

  // Remove item from cart
  const removeCartItem = async (itemId) => {
    setIsUpdatingCart(true);
    
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }
      
      const response = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
        method: 'DELETE',
        headers
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCart(data.data);
        window.dispatchEvent(new Event('cart-update'));
        toast.success('Item removed');
      } else {
        toast.error(data.error || 'Failed to remove item');
        fetchCart();
      }
    } catch (error) {
      console.error('Remove item error:', error);
      toast.error('Failed to remove item');
      fetchCart();
    } finally {
      setIsUpdatingCart(false);
    }
  };

  // Handle cart update events from sidebar
  useEffect(() => {
    const handleCartUpdate = () => {
      if (!isPlacingOrder.current) {
        fetchCart();
      }
    };
    
    window.addEventListener('cart-update', handleCartUpdate);
    return () => window.removeEventListener('cart-update', handleCartUpdate);
  }, []);

  const validateBangladeshPhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    const bdPhoneRegex = /^(?:01|8801)\d{9}$/;
    
    if (!bdPhoneRegex.test(cleaned)) {
      return { valid: false, message: 'Please enter a valid Bangladeshi phone number (01XXXXXXXXX)' };
    }
    
    const prefix = cleaned.slice(0, 3);
    const validPrefixes = ['013', '014', '015', '016', '017', '018', '019'];
    
    if (!validPrefixes.includes(prefix)) {
      return { valid: false, message: 'Please enter a valid Bangladeshi mobile number' };
    }
    
    return { valid: true, formatted: cleaned };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    
    if (name === 'division') {
      setFormData(prev => ({ ...prev, city: '', zone: '', area: '' }));
      setZones([]);
      setAreas([]);
    }
    
    if (name === 'city') {
      setFormData(prev => ({ ...prev, zone: '', area: '' }));
      setAreas([]);
    }
    
    if (name === 'zone') {
      setFormData(prev => ({ ...prev, area: '' }));
    }
    
    if (name === 'phone' && value) {
      const validation = validateBangladeshPhone(value);
      if (!validation.valid) {
        setErrors(prev => ({ ...prev, phone: validation.message }));
      } else {
        setErrors(prev => ({ ...prev, phone: '' }));
      }
    }
  };

  const handleQuantityInputChange = (itemId, value) => {
    setQuantityInputs(prev => ({ ...prev, [itemId]: value }));
  };

  const handleQuantityInputBlur = (itemId, currentQuantity, stockQuantity) => {
    const value = quantityInputs[itemId];
    if (value === undefined || value === '') {
      setQuantityInputs(prev => ({ ...prev, [itemId]: currentQuantity.toString() }));
      return;
    }
    
    const val = parseInt(value);
    if (isNaN(val) || val < 1) {
      updateCartQuantity(itemId, currentQuantity);
      setQuantityInputs(prev => ({ ...prev, [itemId]: currentQuantity.toString() }));
    } else if (val > stockQuantity) {
      updateCartQuantity(itemId, stockQuantity);
      setQuantityInputs(prev => ({ ...prev, [itemId]: stockQuantity.toString() }));
    } else {
      updateCartQuantity(itemId, val);
      setQuantityInputs(prev => ({ ...prev, [itemId]: val.toString() }));
    }
  };

  const validateForm = () => {
  const errors = {};
  
  if (!formData.fullName?.trim()) {
    errors.fullName = 'Full name is required';
  }
  
  if (formData.email?.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Email is invalid';
  }
  
  if (!formData.phone?.trim()) {
    errors.phone = 'Phone number is required';
  } else {
    const validation = validateBangladeshPhone(formData.phone);
    if (!validation.valid) {
      errors.phone = validation.message;
    }
  }
  
  if (!formData.division?.trim()) {
    errors.division = 'Please select a division';
  }
  
  if (!formData.address?.trim()) {
    errors.address = 'Address is required';
  }
  
  if (!formData.city?.trim()) {
    errors.city = 'Please select a district/city';
  }
  
  if (!formData.zone?.trim()) {
    errors.zone = 'Please select an upazila/thana';
  }
  
  setErrors(errors);
  return errors;
};

  const calculateSubtotal = () => cart?.subtotal || 0;
  const calculateTotal = () => calculateSubtotal() + shippingCost;
  const isLoggedIn = !!user;
  const isAdminOrModerator = user && (user.role === 'admin' || user.role === 'moderator');

  // const handleCODOrder = async () => {
  //   if (isAdminOrModerator) {
  //     toast.error('Admins and Moderators cannot place orders');
  //     return;
  //   }
    
  //   if (navigating) return;
  //   setNavigating(true);
  //   setSubmitting(true);
  //   isPlacingOrder.current = true;
    
  //   try {
  //     const token = localStorage.getItem('token');
  //     const sessionId = localStorage.getItem('cartSessionId');
  //     const headers = { 'Content-Type': 'application/json' };
  //     if (token) headers['Authorization'] = `Bearer ${token}`;
  //     else if (sessionId) headers['x-session-id'] = sessionId;
      
  //     const orderData = {
  //       items: cart.items.map(item => ({
  //         productId: item.productId || item._id,
  //         productName: item.productName,
  //         productSlug: item.productSlug || '',
  //         image: item.image || '',
  //         regularPrice: item.regularPrice,
  //         discountPrice: item.discountPrice || 0,
  //         quantity: item.quantity,
  //         stockQuantity: item.stockQuantity || 0,
  //         unit: item.unit || 'pcs'
  //       })),
  //       subtotal: calculateSubtotal(),
  //       shippingCost,
  //       discount: 0,
  //       total: calculateTotal(),
  //       paymentMethod: 'cod',
  //       customerInfo: {
  //         fullName: formData.fullName,
  //         email: formData.email,
  //         phone: formData.phone,
  //         division: formData.division,
  //         address: formData.address,
  //         city: formData.city,
  //         zone: formData.zone,
  //         area: formData.area || '',
  //         zipCode: formData.zipCode || '',
  //         country: formData.country || 'Bangladesh',
  //         note: formData.note || ''
  //       },
  //       couponCode: null,
  //       couponDiscount: 0,
  //       freeShipping: false
  //     };
      
  //     const response = await fetch('http://localhost:5000/api/orders', {
  //       method: 'POST',
  //       headers,
  //       body: JSON.stringify(orderData)
  //     });
      
  //     const data = await response.json();
      
  //     if (data.success) {
  //       await fetch('http://localhost:5000/api/cart', { method: 'DELETE', headers });
  //       window.dispatchEvent(new Event('cart-update'));
  //       const orderId = data.orderId || data.data?._id || data.data?.id;
        
  //       setCart({ items: [], totalItems: 0, subtotal: 0 });
        
  //       if (isLoggedIn) {
  //         toast.success('Order placed successfully!');
  //         window.location.href = '/customer/orders';
  //       } else {
  //         setShowOrderSuccessModal(true);
  //         setLastOrderId(orderId);
  //         setNavigating(false);
  //         toast.success('Order placed successfully!');
  //       }
  //     } else {
  //       toast.error(data.error || 'Failed to place order');
  //       setNavigating(false);
  //     }
  //   } catch (error) {
  //     console.error('COD order error:', error);
  //     toast.error('Network error. Please try again.');
  //     setNavigating(false);
  //   } finally {
  //     setSubmitting(false);
  //     isPlacingOrder.current = false;
  //   }
  // };

  const handleCODOrder = async () => {
  if (isAdminOrModerator) {
    toast.error('Admins and Moderators cannot place orders');
    return;
  }
  
  if (navigating) return;
  setNavigating(true);
  setSubmitting(true);
  isPlacingOrder.current = true;
  
  try {
    const token = localStorage.getItem('token');
    const sessionId = localStorage.getItem('cartSessionId');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    else if (sessionId) headers['x-session-id'] = sessionId;
    
    const orderData = {
      items: cart.items.map(item => ({
        productId: item.productId || item._id,
        productName: item.productName,
        productSlug: item.productSlug || '',
        image: item.image || '',
        regularPrice: item.regularPrice,
        discountPrice: item.discountPrice || 0,
        quantity: item.quantity,
        stockQuantity: item.stockQuantity || 0,
        unit: item.unit || 'pcs'
      })),
      subtotal: calculateSubtotal(),
      shippingCost,
      discount: 0,
      total: calculateTotal(),
      paymentMethod: 'cod',
      customerInfo: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        division: formData.division,
        address: formData.address,
        city: formData.city,
        zone: formData.zone,
        area: formData.area || '',
        zipCode: formData.zipCode || '',
        country: formData.country || 'Bangladesh',
        note: formData.note || ''
      },
      couponCode: null,
      couponDiscount: 0,
      freeShipping: false
    };
    
    const response = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers,
      body: JSON.stringify(orderData)
    });
    
    const data = await response.json();
    
    if (data.success) {
      await fetch('http://localhost:5000/api/cart', { method: 'DELETE', headers });
      window.dispatchEvent(new Event('cart-update'));
      
      const orderId = data.orderId || data.data?._id || data.data?.id;
      
      setCart({ items: [], totalItems: 0, subtotal: 0 });
      
      if (isLoggedIn) {
        toast.success('Order placed successfully!');
        window.location.href = '/customer/orders';
      } else {
        // Redirect to thank you page for guest users
        toast.success('Order placed successfully!');
        router.push(`/thank-you?orderId=${orderId}`);
      }
    } else {
      toast.error(data.error || 'Failed to place order');
      setNavigating(false);
    }
  } catch (error) {
    console.error('COD order error:', error);
    toast.error('Network error. Please try again.');
    setNavigating(false);
  } finally {
    setSubmitting(false);
    isPlacingOrder.current = false;
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (isAdminOrModerator) {
    toast.error('Admins and Moderators cannot place orders');
    return;
  }
  
  const validationErrors = validateForm();
  
  if (Object.keys(validationErrors).length > 0) {
    const errorMessages = Object.values(validationErrors);
    
    toast.error(
      <div className="space-y-1">
        <p className="font-semibold text-[#2D1B2E]">Please fix the following errors:</p>
        <ul className="text-xs space-y-0.5 list-disc list-inside text-[#8B7A8C]">
          {errorMessages.slice(0, 3).map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
          {errorMessages.length > 3 && (
            <li>And {errorMessages.length - 3} more error(s)...</li>
          )}
        </ul>
      </div>,
      { duration: 5000 }
    );
    
    const firstErrorField = document.querySelector('.border-red-500');
    if (firstErrorField) {
      firstErrorField.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      const input = firstErrorField.querySelector('input, textarea, select');
      if (input) {
        setTimeout(() => input.focus(), 500);
      }
    }
    
    const errorSummary = document.getElementById('error-summary');
    if (errorSummary) {
      errorSummary.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    return;
  }
  
  if (!cart?.items?.length) {
    toast.error('Your cart is empty');
    return;
  }
  
  await handleCODOrder();
};

  if (loading || locationLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#FFF5F6]/20 pt-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-[#EE4275] border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!cart?.items?.length) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#FFF5F6]/20 py-16">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <div className="bg-white rounded-2xl shadow-sm border border-[#FFD2DB]/40 p-12">
              <div className="w-20 h-20 mx-auto mb-4 bg-[#FFF5F6] rounded-full flex items-center justify-center border border-[#FFD2DB]/30">
                <FaShoppingBag className="w-10 h-10 text-[#C4B5C5]" />
              </div>
              <h2 className="text-2xl font-bold text-[#2D1B2E] mb-2" style={{ fontFamily: '"Playfair Display"' }}>
                Your beauty cart is empty
              </h2>
              <p className="text-[#8B7A8C] mb-6">Add some products to your cart and come back to checkout.</p>
              <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-xl hover:shadow-lg hover:shadow-[#EE4275]/25 transition-colors">
                <FaArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const subtotal = calculateSubtotal();
  const total = calculateTotal();

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-[#FFF5F6]/20 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#EE4275] to-[#FF6B9D] rounded-xl flex items-center justify-center shadow-lg shadow-[#EE4275]/25">
                <FaShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#2D1B2E]" style={{ fontFamily: '"Playfair Display"' }}>
                  Checkout
                </h1>
                <p className="text-sm text-[#8B7A8C]">Complete your beauty order securely</p>
              </div>
            </div>
            <Link href="/cart" className="flex items-center gap-2 text-sm text-[#EE4275] hover:text-[#EE4275]/70 transition-colors font-medium">
              <FaArrowLeft className="w-4 h-4" />
              Back to Cart
            </Link>
          </div>

          {isAdminOrModerator && (
            <div className="mb-6 bg-[#FFF5F6] border-l-4 border-[#EE4275] p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <FaShieldAlt className="w-5 h-5 text-[#EE4275]" />
                <div>
                  <p className="text-sm text-[#2D1B2E] font-medium">Checkout Disabled for Admin/Moderator Accounts</p>
                  <p className="text-xs text-[#8B7A8C]">You are logged in as {user?.role}. Please switch to a customer account to place orders.</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-5">
              {/* Personal Information */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#FFD2DB]/40 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-[#2D1B2E] flex items-center gap-2" style={{ fontFamily: '"Playfair Display"' }}>
                    <FaUser className="w-5 h-5 text-[#EE4275]" />
                    Personal Information
                  </h2>
                  {isLoggedIn && (
                    <span className="text-xs bg-[#FFF5F6] text-[#EE4275] px-3 py-1 rounded-full flex items-center gap-1 font-medium border border-[#FFD2DB]/30">
                      <FaCheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2D1B2E] mb-1.5">
                      Full Name <span className="text-[#EE4275]">*</span>
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C4B5C5] w-4 h-4" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent outline-none transition text-sm ${
                          isLoggedIn ? 'bg-[#FFF5F6] text-[#39373a]' : 'bg-white text-[#2D1B2E]'
                        } ${errors.fullName ? 'border-red-500' : 'border-[#FFD2DB]/50'}`}
                        placeholder="Enter your full name"
                        disabled={isLoggedIn}
                        style={{ fontFamily: '"Playfair Display"' }}
                      />
                    </div>
                    {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#2D1B2E] mb-1.5">
                      Email <span className="text-[#C4B5C5] text-xs">(Optional)</span>
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C4B5C5] w-4 h-4" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent outline-none transition text-sm ${
                          isLoggedIn ? 'bg-[#FFF5F6] text-[#39373a]' : 'bg-white text-[#2D1B2E]'
                        } ${errors.email ? 'border-red-500' : 'border-[#FFD2DB]/50'}`}
                        placeholder="your@email.com (optional)"
                        disabled={isLoggedIn}
                        style={{ fontFamily: '"Playfair Display"' }}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#2D1B2E] mb-1.5">
                      Phone Number <span className="text-[#EE4275]">*</span>
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C4B5C5] w-4 h-4" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent outline-none transition text-sm ${
                          errors.phone ? 'border-red-500' : 'border-[#FFD2DB]/50'
                        }`}
                        placeholder="01XXXXXXXXX"
                        style={{ fontFamily: '"Playfair Display"' }}
                      />
                    </div>
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                    <p className="text-[10px] text-[#C4B5C5] mt-1">Enter a valid Bangladeshi mobile number</p>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#FFD2DB]/40 p-6">
                <h2 className="text-lg font-bold text-[#2D1B2E] flex items-center gap-2 mb-5" style={{ fontFamily: '"Playfair Display"' }}>
                  <FaMapMarkerAlt className="w-5 h-5 text-[#EE4275]" />
                  Delivery Address
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2D1B2E] mb-1.5">
                      Full Address <span className="text-[#EE4275]">*</span>
                    </label>
                    <div className="relative">
                      <FaHome className="absolute left-3 top-3 text-[#C4B5C5] w-4 h-4" />
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows="2"
                        className={`w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent outline-none transition bg-white text-[#2D1B2E] text-sm resize-none ${
                          errors.address ? 'border-red-500' : 'border-[#FFD2DB]/50'
                        }`}
                        placeholder="House #, Road #, Area, City, Zip Code"
                        style={{ fontFamily: '"Playfair Display"' }}
                      />
                    </div>
                    {isLoggedIn && user?.address && (
                      <p className="text-xs text-[#EE4275] mt-1 flex items-center gap-1">
                        <FaCheckCircle className="w-3 h-3" />
                        Your saved address has been pre-filled
                      </p>
                    )}
                    {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#2D1B2E] mb-1.5">
                        Division <span className="text-[#EE4275]">*</span>
                      </label>
                      <SearchableSelect
                        name="division"
                        value={formData.division}
                        onChange={handleInputChange}
                        options={divisionList}
                        placeholder="Select Division"
                        required
                        disabled={false}
                        error={errors.division}
                      />
                      {errors.division && <p className="text-xs text-red-500 mt-1">{errors.division}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#2D1B2E] mb-1.5">
                        District/City <span className="text-[#EE4275]">*</span>
                      </label>
                      <SearchableSelect
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        options={citiesByDivision}
                        placeholder={formData.division ? "Select District" : "Select Division First"}
                        required
                        disabled={!formData.division}
                        error={errors.city}
                      />
                      {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#2D1B2E] mb-1.5">
                        Upazila/Thana <span className="text-[#EE4275]">*</span>
                      </label>
                      <SearchableSelect
                        name="zone"
                        value={formData.zone}
                        onChange={handleInputChange}
                        options={zones}
                        placeholder={formData.city ? "Select Upazila/Thana" : "Select District First"}
                        required
                        disabled={!formData.city}
                        error={errors.zone}
                      />
                      {errors.zone && <p className="text-xs text-red-500 mt-1">{errors.zone}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#2D1B2E] mb-1.5">
                        Union/Area
                      </label>
                      <SearchableSelect
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        options={areas}
                        placeholder={formData.zone ? "Select Union/Area" : "Select Upazila First"}
                        disabled={!formData.zone}
                        error={errors.area}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Notes */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#FFD2DB]/40 p-6">
                <h2 className="text-lg font-bold text-[#2D1B2E] flex items-center gap-2 mb-4" style={{ fontFamily: '"Playfair Display"' }}>
                  <FaFileAlt className="w-5 h-5 text-[#EE4275]" />
                  Order Notes <span className="text-sm font-normal text-[#C4B5C5]">(Optional)</span>
                </h2>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-4 py-3 border border-[#FFD2DB]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent outline-none transition text-sm resize-none text-[#2D1B2E]"
                  placeholder="Special instructions for delivery, gift message, etc."
                  style={{ fontFamily: '"Playfair Display"' }}
                />
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-[#FFD2DB]/40 p-6 sticky top-24">
                <h2 className="text-lg font-bold text-[#2D1B2E] flex items-center gap-2 mb-4" style={{ fontFamily: '"Playfair Display"' }}>
                  <FaShoppingBag className="w-5 h-5 text-[#EE4275]" />
                  Order Summary
                </h2>
                
                {/* Items List with Quantity Controls */}
                <div className="space-y-3 max-h-60 overflow-y-auto mb-4 pr-1">
                  {cart.items.map((item) => {
                    const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
                    const totalPrice = price * item.quantity;
                    return (
                      <div key={item._id} className="flex flex-col gap-2 pb-3 border-b border-[#FFD2DB]/30">
                        <div className="flex gap-3">
                          <img 
                            src={item.image || 'https://via.placeholder.com/50'} 
                            alt={item.productName} 
                            className="w-12 h-12 rounded-lg object-cover border border-[#FFD2DB]/30 flex-shrink-0"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/50?text=Product'; }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[#2D1B2E] truncate" style={{ fontFamily: '"Playfair Display"' }}>{item.productName}</p>
                            <p className="text-sm font-bold text-[#EE4275]">৳{totalPrice.toFixed(2)}</p>
                          </div>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between ml-14">
                          <div className="flex items-center border border-[#FFD2DB]/50 rounded-full overflow-hidden bg-white">
                            <button
                              onClick={() => {
                                const newQty = item.quantity - 1;
                                if (newQty >= 1) {
                                  updateCartQuantity(item._id, newQty);
                                  setQuantityInputs(prev => ({ ...prev, [item._id]: newQty.toString() }));
                                }
                              }}
                              disabled={isUpdatingCart || item.quantity <= 1}
                              className="w-7 h-7 flex items-center justify-center hover:bg-[#FFF5F6] disabled:opacity-50 transition-colors"
                            >
                              <FaMinus className="w-3 h-3 text-[#8B7A8C]" />
                            </button>
                            
                            <input
                              type="number"
                              min="1"
                              max={item.stockQuantity}
                              value={quantityInputs[item._id] !== undefined ? quantityInputs[item._id] : item.quantity}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value === '' || /^\d+$/.test(value)) {
                                  handleQuantityInputChange(item._id, value);
                                }
                              }}
                              onBlur={() => handleQuantityInputBlur(item._id, item.quantity, item.stockQuantity)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.target.blur();
                                }
                              }}
                              className="w-10 text-center text-sm font-medium text-[#2D1B2E] bg-white focus:outline-none focus:ring-1 focus:ring-[#EE4275] py-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              disabled={isUpdatingCart}
                              style={{ fontFamily: '"Playfair Display"' }}
                            />
                            
                            <button
                              onClick={() => {
                                const newQty = item.quantity + 1;
                                if (newQty <= item.stockQuantity) {
                                  updateCartQuantity(item._id, newQty);
                                  setQuantityInputs(prev => ({ ...prev, [item._id]: newQty.toString() }));
                                }
                              }}
                              disabled={isUpdatingCart || item.quantity >= item.stockQuantity}
                              className="w-7 h-7 flex items-center justify-center hover:bg-[#FFF5F6] disabled:opacity-50 transition-colors"
                            >
                              <FaPlus className="w-3 h-3 text-[#8B7A8C]" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeCartItem(item._id)}
                            disabled={isUpdatingCart}
                            className="text-[#C4B5C5] hover:text-[#EE4275] transition-colors p-1"
                          >
                            <FaTrash className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Totals */}
                <div className="space-y-2 border-t border-[#FFD2DB]/30 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8B7A8C]">Subtotal</span>
                    <span className="font-medium text-[#2D1B2E]">৳{subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8B7A8C]">Shipping</span>
                    <span className="font-medium text-green-600">৳{shippingCost.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-lg font-bold pt-3 border-t border-[#FFD2DB]/30">
                    <span className="text-[#2D1B2E]">Total</span>
                    <span className="text-[#EE4275]">৳{total.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Trust Badges - Using FaStar instead of FiSparkles */}
                <div className="mt-4 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-[#8B7A8C]">
                    <FaShieldAlt className="w-4 h-4 text-[#EE4275]" />
                    <span>Safe & Secure Shopping</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#8B7A8C]">
                    <FaClock className="w-4 h-4 text-[#EE4275]" />
                    <span>7-Day Return Policy</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#8B7A8C]">
                    <FaStar className="w-4 h-4 text-[#EE4275]" />
                    <span>Premium Quality Guaranteed</span>
                  </div>
                </div>
                
                {/* Payment & Place Order */}
                <div className="mt-5">
                  <PaymentSelector
                    onSubmit={handleSubmit}
                    isSubmitting={submitting}
                    disabled={isAdminOrModerator}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <OrderSuccessModal
        isOpen={showOrderSuccessModal}
        onClose={() => {
          setShowOrderSuccessModal(false);
        }}
        orderId={lastOrderId}
        isLoggedIn={isLoggedIn}
        customerEmail={formData.email}
      />
      
      <Footer />
    </>
  );
}