

// // components/CartSidebar.jsx
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   ShoppingCart,
//   Trash2,
//   Plus,
//   Minus,
//   X,
//   CreditCard,
//   ShieldCheck,
//   Loader2,
//   ChevronRight,
//   AlertCircle,
//   AlertTriangle,
//   ShoppingBag,
//   Scale
// } from 'lucide-react';
// import { toast } from 'sonner';

// // Helper function to get unit label
// const getUnitLabel = (unit) => {
//   const units = {
//     'pcs': 'pcs',
//     'ton': 'ton',
//     'other': 'unit'
//   };
//   return units[unit] || unit;
// };

// export default function CartSidebar({ isOpen, onClose }) {
//   const router = useRouter();
//   const [cart, setCart] = useState({ items: [], totalItems: 0, subtotal: 0 });
//   const [loading, setLoading] = useState(true);
//   const [updatingItems, setUpdatingItems] = useState({});
//   const [isClearing, setIsClearing] = useState(false);
//   const [editingQuantity, setEditingQuantity] = useState(null);
//   const [tempQuantity, setTempQuantity] = useState('');
//   const [showClearModal, setShowClearModal] = useState(false);
//   const inputRefs = useRef({});
//   const isMounted = useRef(true);

//   const fetchCart = async () => {
//     if (!isMounted.current) return;
    
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = {};
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       const response = await fetch('http://localhost:5000/api/cart', { headers });
//       const data = await response.json();
      
//       if (!isMounted.current) return;
      
//       if (data.success) {
//         setCart(data.data);
//       } else {
//         setCart({ items: [], totalItems: 0, subtotal: 0 });
//       }
//     } catch (error) {
//       console.error('Fetch cart error:', error);
//       if (isMounted.current) {
//         setCart({ items: [], totalItems: 0, subtotal: 0 });
//       }
//     } finally {
//       if (isMounted.current) {
//         setLoading(false);
//       }
//     }
//   };

//   // Cleanup on unmount
//   useEffect(() => {
//     isMounted.current = true;
//     return () => {
//       isMounted.current = false;
//     };
//   }, []);

//   // Fetch when sidebar opens
//   useEffect(() => {
//     if (isOpen) {
//       setLoading(true);
//       fetchCart();
//     }
//   }, [isOpen]);

//   // Listen for cart updates - this will work even when sidebar is already open
//   useEffect(() => {
//     const handleCartUpdate = () => {
//       // Only fetch if sidebar is open
//       if (isOpen) {
//         fetchCart();
//       }
//     };
    
//     window.addEventListener('cart-update', handleCartUpdate);
//     return () => window.removeEventListener('cart-update', handleCartUpdate);
//   }, [isOpen]); // Add isOpen as dependency so it knows when to fetch

//   // Also listen for storage changes (for cross-tab updates)
//   useEffect(() => {
//     const handleStorageChange = (e) => {
//       if (e.key === 'cartSessionId' || e.key === 'token') {
//         if (isOpen) {
//           fetchCart();
//         }
//       }
//     };
    
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, [isOpen]);

//   const updateQuantity = async (itemId, newQuantity) => {
//     // Validate quantity
//     if (isNaN(newQuantity) || newQuantity === null || newQuantity === '') {
//       return;
//     }
    
//     const parsedQuantity = parseInt(newQuantity, 10);
    
//     if (parsedQuantity < 1) {
//       removeItem(itemId);
//       return;
//     }
    
//     const currentItem = cart.items.find(item => item._id === itemId);
//     if (currentItem && parsedQuantity > currentItem.stockQuantity) {
//       toast.error(`Only ${currentItem.stockQuantity} items available`);
//       return;
//     }
    
//     setUpdatingItems(prev => ({ ...prev, [itemId]: true }));
    
//     const previousCart = { ...cart };
    
//     setCart(prevCart => {
//       const updatedItems = prevCart.items.map(item => {
//         if (item._id === itemId) {
//           return { ...item, quantity: parsedQuantity };
//         }
//         return item;
//       });
      
//       const newSubtotal = updatedItems.reduce((sum, item) => {
//         const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
//         return sum + (price * item.quantity);
//       }, 0);
      
//       return {
//         ...prevCart,
//         items: updatedItems,
//         totalItems: updatedItems.length,
//         subtotal: newSubtotal
//       };
//     });
    
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
//         body: JSON.stringify({ quantity: parsedQuantity })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         setCart(data.data);
//         // Dispatch event to update other components
//         window.dispatchEvent(new Event('cart-update'));
//       } else {
//         setCart(previousCart);
//         toast.error(data.error || 'Failed to update');
//       }
//     } catch (error) {
//       console.error('Update error:', error);
//       setCart(previousCart);
//       toast.error('Failed to update');
//     } finally {
//       setUpdatingItems(prev => ({ ...prev, [itemId]: false }));
//       setEditingQuantity(null);
//       setTempQuantity('');
//     }
//   };

//   const handleQuantityEdit = (itemId, currentQuantity) => {
//     setEditingQuantity(itemId);
//     setTempQuantity(currentQuantity.toString());
//     setTimeout(() => {
//       if (inputRefs.current[itemId]) {
//         inputRefs.current[itemId].focus();
//         inputRefs.current[itemId].select();
//       }
//     }, 0);
//   };

//   const handleQuantityChange = (e) => {
//     const value = e.target.value;
//     // Allow only numbers
//     if (value === '' || /^\d+$/.test(value)) {
//       setTempQuantity(value);
//     }
//   };

//   const handleQuantityKeyDown = (e, itemId) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       if (tempQuantity && parseInt(tempQuantity, 10) > 0) {
//         updateQuantity(itemId, parseInt(tempQuantity, 10));
//       } else {
//         setEditingQuantity(null);
//         setTempQuantity('');
//       }
//     } else if (e.key === 'Escape') {
//       setEditingQuantity(null);
//       setTempQuantity('');
//     }
//   };

//   const handleQuantityBlur = (itemId) => {
//     if (tempQuantity && parseInt(tempQuantity, 10) > 0) {
//       updateQuantity(itemId, parseInt(tempQuantity, 10));
//     } else {
//       setEditingQuantity(null);
//       setTempQuantity('');
//     }
//   };

//   const removeItem = async (itemId) => {
//     setUpdatingItems(prev => ({ ...prev, [itemId]: true }));
    
//     const previousCart = { ...cart };
    
//     setCart(prevCart => ({
//       ...prevCart,
//       items: prevCart.items.filter(item => item._id !== itemId),
//       totalItems: prevCart.totalItems - 1,
//       subtotal: prevCart.subtotal - (prevCart.items.find(item => item._id === itemId)?.quantity * 
//         (prevCart.items.find(item => item._id === itemId)?.discountPrice > 0 
//           ? prevCart.items.find(item => item._id === itemId)?.discountPrice 
//           : prevCart.items.find(item => item._id === itemId)?.regularPrice) || 0)
//     }));
    
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
//         setCart(previousCart);
//         toast.error(data.error || 'Failed to remove');
//       }
//     } catch (error) {
//       console.error('Remove error:', error);
//       setCart(previousCart);
//       toast.error('Failed to remove');
//     } finally {
//       setUpdatingItems(prev => ({ ...prev, [itemId]: false }));
//     }
//   };

//   const clearCart = async () => {
//     setIsClearing(true);
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = {};
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       await fetch('http://localhost:5000/api/cart', {
//         method: 'DELETE',
//         headers
//       });
      
//       setCart({ items: [], totalItems: 0, subtotal: 0 });
//       window.dispatchEvent(new Event('cart-update'));
//       toast.success('Cart cleared successfully');
//       setShowClearModal(false);
//     } catch (error) {
//       toast.error('Failed to clear cart');
//     } finally {
//       setIsClearing(false);
//     }
//   };

//   const proceedToCheckout = () => {
//     if (!cart?.items?.length) {
//       toast.error('Your cart is empty');
//       return;
//     }
//     onClose();
//     router.push('/checkout');
//   };

//   const handleShopNow = () => {
//     onClose();
//     router.push('/products');
//   };

//   const total = cart.subtotal || 0;

//   return (
//     <>
//       {/* Overlay */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="fixed inset-0 bg-black/50 z-[9998]"
//           />
//         )}
//       </AnimatePresence>

//       {/* Cart Sidebar */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ x: '100%' }}
//             animate={{ x: 0 }}
//             exit={{ x: '100%' }}
//             transition={{ type: 'tween', duration: 0.3 }}
//             className="fixed right-0 top-0 h-full bg-white shadow-2xl z-[9999] flex flex-col w-[80%] sm:w-[400px] md:w-[450px] lg:w-[33.333%]"
//           >
//             {/* Header */}
//             <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 bg-white">
//               <div className="flex items-center gap-1.5 sm:gap-2">
//                 <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
//                 <h2 className="text-base sm:text-lg font-bold text-gray-900">My Cart</h2>
//                 {cart.totalItems > 0 && (
//                   <span className="bg-gray-200 text-gray-800 text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full">
//                     {cart.totalItems}
//                   </span>
//                 )}
//               </div>
//               <button
//                 onClick={onClose}
//                 className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
//               >
//                 <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
//               </button>
//             </div>

//             {/* Cart Items */}
//             <div className="flex-1 overflow-y-auto p-3 sm:p-4">
//               {loading ? (
//                 <div className="flex items-center justify-center py-20">
//                   <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 animate-spin" />
//                 </div>
//               ) : cart.items.length === 0 ? (
//                 <div className="text-center py-12">
//                   <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-gray-100 rounded-full flex items-center justify-center">
//                     <ShoppingCart className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
//                   </div>
//                   <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">Your cart is empty</p>
//                   <button
//                     onClick={handleShopNow}
//                     className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-gray-900 text-white text-sm sm:text-base rounded-lg hover:bg-gray-800 transition-all transform hover:scale-105"
//                   >
//                     <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
//                     Shop Now
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-2 sm:space-y-3">
//                   {cart.items.map((item) => {
//                     const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
//                     const totalPrice = price * item.quantity;
//                     const isLowStock = item.stockQuantity <= 10;
//                     const unitLabel = getUnitLabel(item.unit);
                    
//                     return (
//                       <div key={item._id} className="flex gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
//                         <Link href={`/productDetails?id=${item.productId}`} onClick={onClose}>
//                           <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
//                             <img
//                               src={item.image || 'https://via.placeholder.com/64'}
//                               alt={item.productName}
//                               className="w-full h-full object-contain p-0.5 sm:p-1"
//                               onError={(e) => {
//                                 e.target.src = 'https://via.placeholder.com/64?text=Product';
//                               }}
//                             />
//                           </div>
//                         </Link>
                        
//                         <div className="flex-1 min-w-0">
//                           <Link href={`/productDetails?id=${item.productId}`} onClick={onClose}>
//                             <h3 className="font-semibold text-xs sm:text-sm text-gray-900 hover:text-blue-600 transition-colors truncate">
//                               {item.productName}
//                             </h3>
//                           </Link>
                          
//                           <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1 flex-wrap">
//                             <span className="text-sm sm:text-base font-bold text-gray-900">
//                               ৳{price.toFixed(2)}
//                             </span>
//                             {item.discountPrice > 0 && (
//                               <span className="text-[10px] sm:text-xs text-gray-400 line-through">
//                                 ৳{item.regularPrice.toFixed(2)}
//                               </span>
//                             )}
//                             {/* Unit Display */}
//                             <span className="inline-flex items-center gap-0.5 text-[9px] sm:text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
//                               <Scale className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
//                               /{unitLabel}
//                             </span>
//                           </div>
                          
//                           {isLowStock && (
//                             <div className="flex items-center gap-0.5 sm:gap-1 mt-0.5 sm:mt-1">
//                               <AlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-orange-500 flex-shrink-0" />
//                               <span className="text-[8px] sm:text-[10px] text-orange-600">
//                                 Only {item.stockQuantity} left
//                               </span>
//                             </div>
//                           )}
                          
//                           <div className="flex items-center justify-between mt-1.5 sm:mt-2">
//                             <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
//                               <button
//                                 onClick={() => updateQuantity(item._id, item.quantity - 1)}
//                                 disabled={updatingItems[item._id] || item.quantity <= 1}
//                                 className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 transition-colors"
//                               >
//                                 <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//                               </button>
                              
//                               {editingQuantity === item._id ? (
//                                 <input
//                                   ref={el => inputRefs.current[item._id] = el}
//                                   type="text"
//                                   value={tempQuantity}
//                                   onChange={handleQuantityChange}
//                                   onKeyDown={(e) => handleQuantityKeyDown(e, item._id)}
//                                   onBlur={() => handleQuantityBlur(item._id)}
//                                   className="w-8 sm:w-10 text-center text-xs sm:text-sm font-medium py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-400"
//                                   disabled={updatingItems[item._id]}
//                                 />
//                               ) : (
//                                 <button
//                                   onClick={() => handleQuantityEdit(item._id, item.quantity)}
//                                   className="w-8 sm:w-10 text-center text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors py-0.5"
//                                   disabled={updatingItems[item._id]}
//                                 >
//                                   {updatingItems[item._id] ? (
//                                     <Loader2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 animate-spin mx-auto" />
//                                   ) : (
//                                     item.quantity
//                                   )}
//                                 </button>
//                               )}
                              
//                               <button
//                                 onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                                 disabled={updatingItems[item._id] || item.quantity >= item.stockQuantity}
//                                 className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 transition-colors"
//                               >
//                                 <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//                               </button>
//                             </div>
                            
//                             <button
//                               onClick={() => removeItem(item._id)}
//                               disabled={updatingItems[item._id]}
//                               className="text-red-400 hover:text-red-600 transition-colors p-0.5 sm:p-1"
//                             >
//                               <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
//                             </button>
//                           </div>
//                         </div>
                        
//                         <div className="text-right flex-shrink-0">
//                           <p className="font-bold text-gray-900 text-xs sm:text-sm">
//                             ৳{totalPrice.toFixed(2)}
//                           </p>
//                           <p className="text-[8px] sm:text-[9px] text-gray-400 mt-0.5">
//                             {item.quantity} × ৳{price.toFixed(2)}
//                           </p>
//                         </div>
//                       </div>
//                     );
//                   })}
                  
//                   <button
//                     onClick={() => setShowClearModal(true)}
//                     disabled={isClearing}
//                     className="text-red-500 text-xs sm:text-sm hover:text-red-600 transition-colors mt-2 block text-center w-full py-1.5 sm:py-2"
//                   >
//                     {isClearing ? (
//                       <span className="flex items-center justify-center gap-1.5 sm:gap-2">
//                         <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
//                         Clearing...
//                       </span>
//                     ) : (
//                       'Clear Cart'
//                     )}
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Order Summary - Only Total */}
//             {cart.items.length > 0 && (
//               <div className="border-t border-gray-200 p-3 sm:p-4 bg-white">
//                 <div className="flex justify-between items-center mb-4">
//                   <span className="font-bold text-gray-900 text-base sm:text-lg">Total Amount</span>
//                   <span className="font-bold text-xl sm:text-2xl text-gray-900">৳{total.toFixed(2)}</span>
//                 </div>
                
//                 <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
//                   <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-green-600">
//                     <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
//                     <span>Secure checkout & 7-day returns</span>
//                   </div>
//                 </div>
                
//                 <button
//                   onClick={proceedToCheckout}
//                   className="w-full mt-3 sm:mt-4 py-2 sm:py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base"
//                 >
//                   <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                   Proceed to Checkout
//                   <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                 </button>
//               </div>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Clear Cart Confirmation Modal */}
//       <AnimatePresence>
//         {showClearModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/60 z-[10000] flex items-center justify-center p-4"
//             onClick={() => setShowClearModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: 'spring', damping: 25, stiffness: 300 }}
//               className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="p-6">
//                 <div className="flex items-center justify-center mb-4">
//                   <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
//                     <AlertTriangle className="w-7 h-7 text-red-600" />
//                   </div>
//                 </div>
                
//                 <h3 className="text-xl font-bold text-center text-gray-900 mb-2">
//                   Clear Cart?
//                 </h3>
                
//                 <p className="text-gray-600 text-center mb-6">
//                   Are you sure you want to remove all items from your cart? This action cannot be undone.
//                 </p>
                
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => setShowClearModal(false)}
//                     className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={clearCart}
//                     disabled={isClearing}
//                     className="flex-1 px-4 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                   >
//                     {isClearing ? (
//                       <>
//                         <Loader2 className="w-4 h-4 animate-spin" />
//                         Clearing...
//                       </>
//                     ) : (
//                       'Yes, Clear Cart'
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }


'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  X,
  CreditCard,
  ShieldCheck,
  Loader2,
  ChevronRight,
  AlertCircle,
  AlertTriangle,
  ShoppingBag,
  Scale,
  Sparkles,
  Flower2,
  Heart
} from 'lucide-react';
import { toast } from 'sonner';

// Helper function to get unit label
const getUnitLabel = (unit) => {
  const units = {
    'pcs': 'pcs',
    'ton': 'ton',
    'other': 'unit'
  };
  return units[unit] || unit;
};

export default function CartSidebar({ isOpen, onClose }) {
  const router = useRouter();
  const [cart, setCart] = useState({ items: [], totalItems: 0, subtotal: 0 });
  const [loading, setLoading] = useState(true);
  const [updatingItems, setUpdatingItems] = useState({});
  const [isClearing, setIsClearing] = useState(false);
  const [editingQuantity, setEditingQuantity] = useState(null);
  const [tempQuantity, setTempQuantity] = useState('');
  const [showClearModal, setShowClearModal] = useState(false);
  const inputRefs = useRef({});
  const isMounted = useRef(true);

  const fetchCart = async () => {
    if (!isMounted.current) return;
    
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }
      
      const response = await fetch('http://localhost:5000/api/cart', { headers });
      const data = await response.json();
      
      if (!isMounted.current) return;
      
      if (data.success) {
        setCart(data.data);
      } else {
        setCart({ items: [], totalItems: 0, subtotal: 0 });
      }
    } catch (error) {
      console.error('Fetch cart error:', error);
      if (isMounted.current) {
        setCart({ items: [], totalItems: 0, subtotal: 0 });
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetchCart();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleCartUpdate = () => {
      if (isOpen) {
        fetchCart();
      }
    };
    
    window.addEventListener('cart-update', handleCartUpdate);
    return () => window.removeEventListener('cart-update', handleCartUpdate);
  }, [isOpen]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'cartSessionId' || e.key === 'token') {
        if (isOpen) {
          fetchCart();
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isOpen]);

  const updateQuantity = async (itemId, newQuantity) => {
    if (isNaN(newQuantity) || newQuantity === null || newQuantity === '') {
      return;
    }
    
    const parsedQuantity = parseInt(newQuantity, 10);
    
    if (parsedQuantity < 1) {
      removeItem(itemId);
      return;
    }
    
    const currentItem = cart.items.find(item => item._id === itemId);
    if (currentItem && parsedQuantity > currentItem.stockQuantity) {
      toast.error(`Only ${currentItem.stockQuantity} items available`);
      return;
    }
    
    setUpdatingItems(prev => ({ ...prev, [itemId]: true }));
    
    const previousCart = { ...cart };
    
    setCart(prevCart => {
      const updatedItems = prevCart.items.map(item => {
        if (item._id === itemId) {
          return { ...item, quantity: parsedQuantity };
        }
        return item;
      });
      
      const newSubtotal = updatedItems.reduce((sum, item) => {
        const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
        return sum + (price * item.quantity);
      }, 0);
      
      return {
        ...prevCart,
        items: updatedItems,
        totalItems: updatedItems.length,
        subtotal: newSubtotal
      };
    });
    
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
        body: JSON.stringify({ quantity: parsedQuantity })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCart(data.data);
        window.dispatchEvent(new Event('cart-update'));
      } else {
        setCart(previousCart);
        toast.error(data.error || 'Failed to update');
      }
    } catch (error) {
      console.error('Update error:', error);
      setCart(previousCart);
      toast.error('Failed to update');
    } finally {
      setUpdatingItems(prev => ({ ...prev, [itemId]: false }));
      setEditingQuantity(null);
      setTempQuantity('');
    }
  };

  const handleQuantityEdit = (itemId, currentQuantity) => {
    setEditingQuantity(itemId);
    setTempQuantity(currentQuantity.toString());
    setTimeout(() => {
      if (inputRefs.current[itemId]) {
        inputRefs.current[itemId].focus();
        inputRefs.current[itemId].select();
      }
    }, 0);
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setTempQuantity(value);
    }
  };

  const handleQuantityKeyDown = (e, itemId) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (tempQuantity && parseInt(tempQuantity, 10) > 0) {
        updateQuantity(itemId, parseInt(tempQuantity, 10));
      } else {
        setEditingQuantity(null);
        setTempQuantity('');
      }
    } else if (e.key === 'Escape') {
      setEditingQuantity(null);
      setTempQuantity('');
    }
  };

  const handleQuantityBlur = (itemId) => {
    if (tempQuantity && parseInt(tempQuantity, 10) > 0) {
      updateQuantity(itemId, parseInt(tempQuantity, 10));
    } else {
      setEditingQuantity(null);
      setTempQuantity('');
    }
  };

  const removeItem = async (itemId) => {
    setUpdatingItems(prev => ({ ...prev, [itemId]: true }));
    
    const previousCart = { ...cart };
    
    setCart(prevCart => ({
      ...prevCart,
      items: prevCart.items.filter(item => item._id !== itemId),
      totalItems: prevCart.totalItems - 1,
      subtotal: prevCart.subtotal - (prevCart.items.find(item => item._id === itemId)?.quantity * 
        (prevCart.items.find(item => item._id === itemId)?.discountPrice > 0 
          ? prevCart.items.find(item => item._id === itemId)?.discountPrice 
          : prevCart.items.find(item => item._id === itemId)?.regularPrice) || 0)
    }));
    
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
        setCart(previousCart);
        toast.error(data.error || 'Failed to remove');
      }
    } catch (error) {
      console.error('Remove error:', error);
      setCart(previousCart);
      toast.error('Failed to remove');
    } finally {
      setUpdatingItems(prev => ({ ...prev, [itemId]: false }));
    }
  };

  const clearCart = async () => {
    setIsClearing(true);
    try {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }
      
      await fetch('http://localhost:5000/api/cart', {
        method: 'DELETE',
        headers
      });
      
      setCart({ items: [], totalItems: 0, subtotal: 0 });
      window.dispatchEvent(new Event('cart-update'));
      toast.success('Cart cleared successfully');
      setShowClearModal(false);
    } catch (error) {
      toast.error('Failed to clear cart');
    } finally {
      setIsClearing(false);
    }
  };

  const proceedToCheckout = () => {
    if (!cart?.items?.length) {
      toast.error('Your cart is empty');
      return;
    }
    onClose();
    router.push('/checkout');
  };

  const handleShopNow = () => {
    onClose();
    router.push('/products');
  };

  const total = cart.subtotal || 0;

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]"
          />
        )}
      </AnimatePresence>

      {/* Cart Sidebar - Beauty Theme */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full bg-white shadow-2xl z-[9999] flex flex-col w-[80%] sm:w-[400px] md:w-[450px] lg:w-[33.333%]"
          >
            {/* Header - Beauty Theme */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-[#FFD2DB]/50 bg-gradient-to-r from-[#FFF5F6] to-white">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] rounded-full blur-sm opacity-30"></div>
                  <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#EE4275] to-[#FF6B9D] flex items-center justify-center shadow-lg shadow-[#EE4275]/25">
                    <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  </div>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-[#2D1B2E]" style={{ fontFamily: '"Playfair Display"' }}>
                  Beauty Cart
                </h2>
                {cart.totalItems > 0 && (
                  <span className="bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full shadow-sm">
                    {cart.totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 rounded-full hover:bg-[#FFF5F6] transition-colors"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B7A8C] hover:text-[#EE4275] transition-colors" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-[#FFF5F6]/20">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-[#EE4275] animate-spin" />
                </div>
              ) : cart.items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-[#FFD2DB]/30 to-[#FFF5F6] rounded-full flex items-center justify-center border border-[#FFD2DB]/40">
                    <ShoppingCart className="w-8 h-8 sm:w-10 sm:h-10 text-[#C4B5C5]" />
                  </div>
                  <p className="text-sm sm:text-base text-[#8B7A8C] mb-2">Your beauty cart is empty</p>
                  <p className="text-xs text-[#C4B5C5] mb-4 sm:mb-6">Time to add some glow to your routine!</p>
                  <button
                    onClick={handleShopNow}
                    className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white text-sm sm:text-base rounded-full hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all transform hover:scale-105"
                  >
                    <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {cart.items.map((item) => {
                    const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
                    const totalPrice = price * item.quantity;
                    const isLowStock = item.stockQuantity <= 10;
                    const unitLabel = getUnitLabel(item.unit);
                    
                    return (
                      <div key={item._id} className="flex gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-xl border border-[#FFD2DB]/30 hover:border-[#EE4275]/30 transition-all shadow-sm hover:shadow-md">
                        <Link href={`/productDetails?id=${item.productId}`} onClick={onClose}>
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FFF5F6] to-[#FFD2DB]/20 rounded-lg overflow-hidden border border-[#FFD2DB]/30 flex-shrink-0">
                            <img
                              src={item.image || 'https://via.placeholder.com/64'}
                              alt={item.productName}
                              className="w-full h-full object-contain p-0.5 sm:p-1"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/64?text=Beauty';
                              }}
                            />
                          </div>
                        </Link>
                        
                        <div className="flex-1 min-w-0">
                          <Link href={`/productDetails?id=${item.productId}`} onClick={onClose}>
                            <h3 className="font-semibold text-xs sm:text-sm text-[#2D1B2E] hover:text-[#EE4275] transition-colors truncate" style={{ fontFamily: '"Playfair Display"' }}>
                              {item.productName}
                            </h3>
                          </Link>
                          
                          <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1 flex-wrap">
                            <span className="text-sm sm:text-base font-bold text-[#EE4275]" style={{ fontFamily: '"Playfair Display"' }}>
                              &#2547;{price.toFixed(2)}
                            </span>
                            {item.discountPrice > 0 && (
                              <span className="text-[10px] sm:text-xs text-[#C4B5C5] line-through">
                                &#2547;{item.regularPrice.toFixed(2)}
                              </span>
                            )}
                            <span className="inline-flex items-center gap-0.5 text-[9px] sm:text-[10px] text-[#8B7A8C] bg-[#FFF5F6] px-1.5 py-0.5 rounded-full border border-[#FFD2DB]/30">
                              <Scale className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                              /{unitLabel}
                            </span>
                          </div>
                          
                          {isLowStock && (
                            <div className="flex items-center gap-0.5 sm:gap-1 mt-0.5 sm:mt-1">
                              <AlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#EE4275] flex-shrink-0" />
                              <span className="text-[8px] sm:text-[10px] text-[#EE4275]">
                                Only {item.stockQuantity} left
                              </span>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between mt-1.5 sm:mt-2">
                            <div className="flex items-center border border-[#FFD2DB]/50 rounded-full overflow-hidden bg-white">
                              <button
                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                disabled={updatingItems[item._id] || item.quantity <= 1}
                                className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-[#FFF5F6] disabled:opacity-50 transition-colors"
                              >
                                <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#8B7A8C]" />
                              </button>
                              
                              {editingQuantity === item._id ? (
                                <input
                                  ref={el => inputRefs.current[item._id] = el}
                                  type="text"
                                  value={tempQuantity}
                                  onChange={handleQuantityChange}
                                  onKeyDown={(e) => handleQuantityKeyDown(e, item._id)}
                                  onBlur={() => handleQuantityBlur(item._id)}
                                  className="w-8 sm:w-10 text-center text-xs sm:text-sm font-medium py-0.5 focus:outline-none focus:ring-1 focus:ring-[#EE4275] rounded"
                                  disabled={updatingItems[item._id]}
                                />
                              ) : (
                                <button
                                  onClick={() => handleQuantityEdit(item._id, item.quantity)}
                                  className="w-8 sm:w-10 text-center text-xs sm:text-sm font-medium hover:bg-[#FFF5F6] transition-colors py-0.5 text-[#2D1B2E]"
                                  disabled={updatingItems[item._id]}
                                >
                                  {updatingItems[item._id] ? (
                                    <Loader2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 animate-spin mx-auto text-[#EE4275]" />
                                  ) : (
                                    item.quantity
                                  )}
                                </button>
                              )}
                              
                              <button
                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                disabled={updatingItems[item._id] || item.quantity >= item.stockQuantity}
                                className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-[#FFF5F6] disabled:opacity-50 transition-colors"
                              >
                                <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#8B7A8C]" />
                              </button>
                            </div>
                            
                            <button
                              onClick={() => removeItem(item._id)}
                              disabled={updatingItems[item._id]}
                              className="text-[#C4B5C5] hover:text-[#EE4275] transition-colors p-0.5 sm:p-1"
                            >
                              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="text-right flex-shrink-0">
                          <p className="font-bold text-[#2D1B2E] text-xs sm:text-sm" style={{ fontFamily: '"Playfair Display"' }}>
                            &#2547;{totalPrice.toFixed(2)}
                          </p>
                          <p className="text-[8px] sm:text-[9px] text-[#C4B5C5] mt-0.5">
                            {item.quantity} × &#2547;{price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  
                  <button
                    onClick={() => setShowClearModal(true)}
                    disabled={isClearing}
                    className="text-[#C4B5C5] hover:text-[#EE4275] text-xs sm:text-sm transition-colors mt-2 block text-center w-full py-1.5 sm:py-2"
                  >
                    {isClearing ? (
                      <span className="flex items-center justify-center gap-1.5 sm:gap-2">
                        <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin text-[#EE4275]" />
                        Clearing...
                      </span>
                    ) : (
                      'Clear Cart'
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary - Beauty Theme */}
            {cart.items.length > 0 && (
              <div className="border-t border-[#FFD2DB]/50 p-3 sm:p-4 bg-white">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-[#2D1B2E] text-base sm:text-lg" style={{ fontFamily: '"Playfair Display"' }}>
                    Total Amount
                  </span>
                  <span className="font-bold text-xl sm:text-2xl text-[#EE4275]" style={{ fontFamily: '"Playfair Display"' }}>
                    &#2547;{total.toFixed(2)}
                  </span>
                </div>
                
                <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-green-600">
                    <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                    <span>Secure checkout &amp; premium quality guaranteed</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-[#EE4275]">
                    <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                    <span>Free shipping on orders over &#2547;3000</span>
                  </div>
                </div>
                
                <button
                  onClick={proceedToCheckout}
                  className="w-full mt-3 sm:mt-4 py-2 sm:py-3 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base"
                >
                  <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Proceed to Checkout
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clear Cart Confirmation Modal - Beauty Theme */}
      <AnimatePresence>
        {showClearModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000] flex items-center justify-center p-4"
            onClick={() => setShowClearModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden border border-[#FFD2DB]/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-14 h-14 bg-[#FFF5F6] rounded-full flex items-center justify-center border border-[#FFD2DB]/30">
                    <Heart className="w-7 h-7 text-[#EE4275]" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-center text-[#2D1B2E] mb-2" style={{ fontFamily: '"Playfair Display"' }}>
                  Clear Beauty Cart?
                </h3>
                
                <p className="text-[#8B7A8C] text-center mb-6 text-sm">
                  Are you sure you want to remove all items from your beauty cart? This action cannot be undone.
                </p>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowClearModal(false)}
                    className="flex-1 px-4 py-2.5 border border-[#FFD2DB]/50 text-[#8B7A8C] font-medium rounded-full hover:bg-[#FFF5F6] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={clearCart}
                    disabled={isClearing}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white font-medium rounded-full hover:shadow-lg hover:shadow-[#EE4275]/25 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isClearing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Clearing...
                      </>
                    ) : (
                      'Yes, Clear Cart'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}