

// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { toast } from 'sonner';
// import { motion, AnimatePresence } from 'framer-motion';

// import { 
//   FaBox,
//   FaEye,
//   FaClock,
//   FaMoneyBillWave,
//   FaUser,
//   FaMapMarkerAlt,
//   FaCalendarAlt,
//   FaPrint,
//   FaChevronLeft,
//   FaChevronRight,
//   FaSpinner,
//   FaShippingFast,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaBan,
//   FaFileInvoice,
//   FaTruck,
//   FaCheckDouble,
//   FaCreditCard,
//   FaMobileAlt,
//   FaSearch,
//   FaFilter,
//   FaTimes,
//   FaShoppingBag,
//   FaArrowRight
// } from 'react-icons/fa';

// const ORDER_STATUSES = [
//   { value: 'placed', label: 'Placed', color: 'bg-blue-100 text-blue-700', icon: FaClock },
//   { value: 'confirmed', label: 'Confirmed', color: 'bg-cyan-100 text-cyan-700', icon: FaCheckCircle },
//   { value: 'processing', label: 'Processing', color: 'bg-purple-100 text-purple-700', icon: FaSpinner },
//   { value: 'shipped', label: 'Shipped', color: 'bg-indigo-100 text-indigo-700', icon: FaShippingFast },
//   { value: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-700', icon: FaCheckDouble },
//   { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-700', icon: FaBan }
// ];

// const PAYMENT_STATUSES = [
//   { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-700' },
//   { value: 'paid', label: 'Paid', color: 'bg-green-100 text-green-700' },
//   { value: 'failed', label: 'Failed', color: 'bg-red-100 text-red-700' },
//   { value: 'refunded', label: 'Refunded', color: 'bg-orange-100 text-orange-700' }
// ];

// // Cancel Order Modal
// const CancelOrderModal = ({ isOpen, onClose, order, onCancel }) => {
//   const [cancellationReason, setCancellationReason] = useState('');
//   const [loading, setLoading] = useState(false);

//   if (!isOpen) return null;

//   const handleSubmit = async () => {
//     if (!cancellationReason.trim()) {
//       toast.error('Please provide a cancellation reason');
//       return;
//     }

//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/orders/${order._id}/cancel`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ cancellationReason })
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success('Order cancelled successfully');
//         onCancel();
//         onClose();
//       } else {
//         toast.error(data.error || 'Failed to cancel order');
//       }
//     } catch (error) {
//       console.error('Cancel order error:', error);
//       toast.error('Network error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.9 }}
//         className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
//       >
//         <div className="p-4 bg-gradient-to-r from-red-600 to-red-500 text-white">
//           <div className="flex items-center gap-2">
//             <FaBan className="w-5 h-5" />
//             <h2 className="text-lg font-bold">Cancel Order</h2>
//           </div>
//         </div>

//         <div className="p-5">
//           <p className="text-gray-700 text-sm mb-3">
//             Are you sure you want to cancel this order?
//           </p>
//           <p className="text-xs text-gray-500 mb-4">
//             Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}
//           </p>
          
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">
//               Cancellation Reason <span className="text-red-500">*</span>
//             </label>
//             <textarea
//               value={cancellationReason}
//               onChange={(e) => setCancellationReason(e.target.value)}
//               rows="3"
//               placeholder="Please tell us why you're cancelling this order..."
//               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
//             />
//           </div>
//         </div>

//         <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-3">
//           <button onClick={onClose} className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
//             Close
//           </button>
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
//           >
//             {loading ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaBan className="w-3 h-3" />}
//             Confirm Cancel
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // Order Details Modal
// const OrderDetailsModal = ({ isOpen, onClose, order, onCancelOrder }) => {
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   if (!isOpen || !order) return null;

//   const statusInfo = ORDER_STATUSES.find(s => s.value === order.orderStatus);
//   const paymentInfo = PAYMENT_STATUSES.find(p => p.value === order.paymentStatus);
//   const isCancelled = order.orderStatus === 'cancelled';
//   const isDelivered = order.orderStatus === 'delivered';
//   const canCancel = order.orderStatus === 'placed' && order.paymentMethod === 'cod';

//   const formatDate = (date) => {
//     if (!date) return 'N/A';
//     const d = new Date(date);
//     return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
//   };

//   const formatDateLong = (date) => {
//     if (!date) return 'N/A';
//     const d = new Date(date);
//     return d.toLocaleDateString('en-BD', {
//       day: '2-digit',
//       month: 'long',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4">
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 20 }}
//         className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl my-8 overflow-hidden"
//       >
//         <div className="p-4 bg-black  text-white sticky top-0">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <FaFileInvoice className="w-5 h-5" />
//               <h2 className="text-lg font-bold">Order Details</h2>
//             </div>
//             <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
//               <FaTimesCircle className="w-4 h-4" />
//             </button>
//           </div>
//           <p className="text-xs text-white/80 mt-1">Order #{order.orderNumber || order._id.slice(-8).toUpperCase()}</p>
//         </div>

//         <div className="p-5 max-h-[60vh] overflow-y-auto">
//           {/* Order Status Badges */}
//           <div className="flex flex-wrap gap-2 mb-5">
//             <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusInfo?.color || 'bg-gray-100 text-gray-700'}`}>
//               {statusInfo?.icon && <statusInfo.icon className="w-3 h-3" />}
//               Order: {statusInfo?.label || order.orderStatus}
//             </div>
//             <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${paymentInfo?.color || 'bg-gray-100 text-gray-700'}`}>
//               <FaMoneyBillWave className="w-3 h-3" />
//               Payment: {paymentInfo?.label || order.paymentStatus}
//             </div>
//             {order.paymentMethod === 'cod' && (
//               <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
//                 <FaMoneyBillWave className="w-3 h-3" />
//                 Cash on Delivery
//               </div>
//             )}
//             {order.paymentMethod === 'online' && (
//               <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
//                 <FaCreditCard className="w-3 h-3" />
//                 Online Payment
//               </div>
//             )}
//           </div>

//           {/* Cancel Button */}
//           {canCancel && (
//             <div className="mb-5">
//               <button
//                 onClick={() => {
//                   onClose();
//                   onCancelOrder();
//                 }}
//                 className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
//               >
//                 <FaBan className="w-4 h-4" />
//                 Cancel Order
//               </button>
//             </div>
//           )}

//           {/* Delivery Message */}
//           {isDelivered && order.deliveredAt && isClient && (
//             <div className="mb-5 bg-green-50 border-l-4 border-green-500 rounded-lg p-3">
//               <div className="flex items-start gap-2">
//                 <FaCheckDouble className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <h4 className="text-sm font-semibold text-green-700">Order Delivered</h4>
//                   <p className="text-xs text-green-600 mt-1">
//                     <span className="font-medium">Delivered on:</span> {formatDateLong(order.deliveredAt)}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Cancellation Message */}
//           {isCancelled && order.cancellationReason && (
//             <div className="mb-5 bg-red-50 border-l-4 border-red-500 rounded-lg p-3">
//               <div className="flex items-start gap-2">
//                 <FaBan className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <h4 className="text-sm font-semibold text-red-700">Order Cancelled</h4>
//                   <p className="text-xs text-red-600 mt-1">
//                     <span className="font-medium">Reason:</span> {order.cancellationReason}
//                   </p>
//                   {order.cancelledAt && (
//                     <p className="text-xs text-red-500 mt-1">
//                       <span className="font-medium">Cancelled on:</span> {formatDate(order.cancelledAt)}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Order Info Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
//             <div className="bg-gray-50 rounded-lg p-4">
//               <h3 className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-1.5">
//                 <FaUser className="w-3.5 h-3.5 text-blue-600" />
//                 Customer Information
//               </h3>
//               <div className="space-y-1 text-xs">
//                 <p><span className="text-gray-500">Name:</span> {order.customerInfo?.fullName}</p>
//                 <p><span className="text-gray-500">Email:</span> {order.customerInfo?.email}</p>
//                 <p><span className="text-gray-500">Phone:</span> {order.customerInfo?.phone}</p>
//                 {order.customerInfo?.whatsapp && (
//                   <p><span className="text-gray-500">WhatsApp:</span> {order.customerInfo.whatsapp}</p>
//                 )}
//               </div>
//             </div>

//            <div className="bg-gray-50 rounded-lg p-4">
//   <h3 className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-1.5">
//     <FaMapMarkerAlt className="w-3.5 h-3.5 text-blue-600" />
//     Delivery Information
//   </h3>
//   <div className="space-y-1 text-xs">
//     <p><span className="text-gray-500">Division:</span> <span className="font-medium">{order.customerInfo?.division || 'N/A'}</span></p>
//     <p><span className="text-gray-500">District/City:</span> <span className="font-medium">{order.customerInfo?.city || 'N/A'}</span></p>
//     <p><span className="text-gray-500">Upazila/Thana:</span> <span className="font-medium">{order.customerInfo?.zone || 'N/A'}</span></p>
//     {order.customerInfo?.area && (
//       <p><span className="text-gray-500">Union/Area:</span> <span className="font-medium">{order.customerInfo.area}</span></p>
//     )}
//     <p><span className="text-gray-500">Address:</span> {order.customerInfo?.address}</p>
//     {order.trackingNumber && (
//       <p><span className="text-gray-500">Tracking:</span> <span className="font-mono">{order.trackingNumber}</span></p>
//     )}
//   </div>
// </div>
//           </div>

//           {/* Order Items Table */}
//           <div className="mb-5">
//             <h3 className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-1.5">
//               <FaBox className="w-3.5 h-3.5 text-blue-600" />
//               Order Items
//             </h3>
//             <div className="overflow-x-auto">
//               <table className="w-full text-xs">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-3 py-2 text-left">Product</th>
//                     <th className="px-3 py-2 text-center">Qty</th>
//                     <th className="px-3 py-2 text-right">Price</th>
//                     <th className="px-3 py-2 text-right">Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {order.items?.map((item, idx) => (
//                     <tr key={idx} className="border-t border-gray-100">
//                       <td className="px-3 py-2">
//                         <div className="flex items-center gap-3">
//                           <img 
//                             src={item.image || 'https://via.placeholder.com/40'} 
//                             alt={item.productName}
//                             className="w-10 h-10 rounded-lg object-cover border border-gray-200"
//                             onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=Gadget'; }}
//                           />
//                           <div>
//                             <p className="font-medium text-sm">{item.productName}</p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-3 py-2 text-center">{item.quantity}</td>
//                       <td className="px-3 py-2 text-right">৳{(item.discountPrice || item.regularPrice).toFixed(2)}</td>
//                       <td className="px-3 py-2 text-right font-medium">৳{((item.discountPrice || item.regularPrice) * item.quantity).toFixed(2)}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//                 <tfoot className="border-t border-gray-200">
//                   <tr>
//                     <td colSpan="3" className="px-3 py-1.5 text-right font-medium">Subtotal:</td>
//                     <td className="px-3 py-1.5 text-right">৳{order.subtotal?.toFixed(2)}</td>
//                   </tr>
//                   <tr>
//                     <td colSpan="3" className="px-3 py-1.5 text-right font-medium">Shipping:</td>
//                     <td className="px-3 py-1.5 text-right">৳{order.shippingCost?.toFixed(2)}</td>
//                   </tr>
//                   {order.discount > 0 && (
//                     <tr>
//                       <td colSpan="3" className="px-3 py-1.5 text-right font-medium text-green-600">Discount:</td>
//                       <td className="px-3 py-1.5 text-right text-green-600">- ৳{order.discount.toFixed(2)}</td>
//                     </tr>
//                   )}
//                   <tr className="text-sm font-bold">
//                     <td colSpan="3" className="px-3 py-1.5 text-right">Total:</td>
//                     <td className="px-3 py-1.5 text-right text-blue-600">৳{order.total?.toFixed(2)}</td>
//                   </tr>
//                 </tfoot>
//               </table>
//             </div>
//           </div>

//           {/* Additional Info */}
//           {(order.couponCode || order.deliveryNote) && (
//             <div className="bg-gray-50 rounded-lg p-4">
//               <h3 className="font-semibold text-gray-900 text-sm mb-1.5">Additional Information</h3>
//               {order.couponCode && <p className="text-xs"><span className="text-gray-500">Coupon Applied:</span> {order.couponCode}</p>}
//               {order.deliveryNote && <p className="text-xs"><span className="text-gray-500">Delivery Note:</span> {order.deliveryNote}</p>}
//             </div>
//           )}
//         </div>

//         <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-2">
        
//           <button onClick={onClose} className="px-4 py-2 bg-black text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
//             Close
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // Main Customer Orders Page
// export default function CustomerOrdersPage() {
//   const router = useRouter();
//   const [isClient, setIsClient] = useState(false);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalOrders, setTotalOrders] = useState(0);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [showCancelModal, setShowCancelModal] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [paymentStatusFilter, setPaymentStatusFilter] = useState('');
//   const [paymentMethodFilter, setPaymentMethodFilter] = useState('');

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const fetchOrders = useCallback(async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         router.push('/login');
//         return;
//       }

//       const queryParams = new URLSearchParams({
//         page: currentPage,
//         limit: 10
//       });
//       if (searchTerm) queryParams.append('search', searchTerm);
//       if (statusFilter) queryParams.append('orderStatus', statusFilter);
//       if (paymentStatusFilter) queryParams.append('paymentStatus', paymentStatusFilter);
//       if (paymentMethodFilter) queryParams.append('paymentMethod', paymentMethodFilter);

//       const response = await fetch(`http://localhost:5000/api/orders?${queryParams}`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       const data = await response.json();
//       if (data.success) {
//         setOrders(data.data);
//         setTotalPages(data.pagination.pages);
//         setTotalOrders(data.pagination.total);
//       } else {
//         toast.error(data.error || 'Failed to fetch orders');
//       }
//     } catch (error) {
//       console.error('Fetch orders error:', error);
//       toast.error('Network error');
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, searchTerm, statusFilter, paymentStatusFilter, paymentMethodFilter, router]);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   const handleCancelOrder = () => {
//     fetchOrders();
//   };

//   const clearFilters = () => {
//     setSearchTerm('');
//     setStatusFilter('');
//     setPaymentStatusFilter('');
//     setPaymentMethodFilter('');
//     setCurrentPage(1);
//   };

//   const formatDate = (date) => {
//     if (!date) return 'N/A';
//     const d = new Date(date);
//     return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
//   };

//   const formatShortDate = (date) => {
//     if (!date) return 'N/A';
//     const d = new Date(date);
//     return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`;
//   };

//   const getStatusBadge = (status) => {
//     const statusInfo = ORDER_STATUSES.find(s => s.value === status);
//     if (!statusInfo) return <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700">{status}</span>;
//     return (
//       <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
//         <statusInfo.icon className="w-2.5 h-2.5" />
//         {statusInfo.label}
//       </span>
//     );
//   };

//   const getPaymentStatusBadge = (status) => {
//     const paymentInfo = PAYMENT_STATUSES.find(p => p.value === status);
//     return (
//       <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${paymentInfo?.color || 'bg-gray-100 text-gray-700'}`}>
//         <FaMoneyBillWave className="w-2.5 h-2.5" />
//         {paymentInfo?.label || status}
//       </span>
//     );
//   };

//   const getPaymentMethodBadge = (method) => {
//     const methods = {
//       'cod': { label: 'COD', color: 'bg-orange-100 text-orange-700' },
//       'online': { label: 'Online', color: 'bg-blue-100 text-blue-700' },
//       'bkash': { label: 'bKash', color: 'bg-pink-100 text-pink-700' },
//       'nagad': { label: 'Nagad', color: 'bg-purple-100 text-purple-700' }
//     };
    
//     const info = methods[method] || { label: method || 'Unknown', color: 'bg-gray-100 text-gray-700' };
    
//     return (
//       <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${info.color}`}>
//         {info.label}
//       </span>
//     );
//   };

//   const canCancelOrder = (order) => {
//     return order.orderStatus === 'placed' && order.paymentMethod === 'cod';
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gray-50 pb-12 pt-6">
//         <div className="container mx-auto px-4 max-w-7xl">
//           {/* Header */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//             <div>
//               <div className="flex items-center gap-3">
//                 <FaShoppingBag className="w-7 h-7 text-blue-600" />
//                 <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
//                   My Orders
//                 </h1>
//               </div>
//               <p className="text-sm text-gray-500 mt-1 ml-10">Track and manage all your orders</p>
//             </div>
//             <Link 
//               href="/products" 
//               className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium shadow-sm"
//             >
//               Continue Shopping
//               <FaArrowRight className="w-4 h-4" />
//             </Link>
//           </div>

//           {/* Search and Filters */}
//           <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
//             <div className="flex flex-col gap-4">
//               {/* Search Bar */}
//               <div className="relative">
//                 <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <input
//                   type="text"
//                   placeholder="Search by Order ID..."
//                   value={searchTerm}
//                   onChange={(e) => {
//                     setSearchTerm(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition"
//                 />
//                 {searchTerm && (
//                   <button
//                     onClick={() => {
//                       setSearchTerm('');
//                       setCurrentPage(1);
//                     }}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     <FaTimes className="w-4 h-4" />
//                   </button>
//                 )}
//               </div>

//               {/* Filter Row */}
//               <div className="flex flex-wrap gap-3 items-center">
//                 <div className="flex items-center gap-2">
//                   <FaFilter className="w-4 h-4 text-gray-400" />
//                   <span className="text-sm text-gray-600">Filters:</span>
//                 </div>
                
//                 {/* Order Status Filter */}
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => {
//                     setStatusFilter(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition"
//                 >
//                   <option value="">All Order Status</option>
//                   {ORDER_STATUSES.map(status => (
//                     <option key={status.value} value={status.value}>{status.label}</option>
//                   ))}
//                 </select>

//                 {/* Payment Status Filter */}
//                 <select
//                   value={paymentStatusFilter}
//                   onChange={(e) => {
//                     setPaymentStatusFilter(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition"
//                 >
//                   <option value="">All Payment Status</option>
//                   {PAYMENT_STATUSES.map(status => (
//                     <option key={status.value} value={status.value}>{status.label}</option>
//                   ))}
//                 </select>

           

//                 {/* Clear Filters Button */}
//                 {(searchTerm || statusFilter || paymentStatusFilter || paymentMethodFilter) && (
//                   <button
//                     onClick={clearFilters}
//                     className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1 font-medium"
//                   >
//                     <FaTimes className="w-3 h-3" />
//                     Clear Filters
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Orders Table */}
//           <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full min-w-[900px] lg:min-w-full">
//                 <thead className="bg-gray-50 border-b border-gray-200">
//                   <tr>
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order ID</th>
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
//                     <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
//                     <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Order Status</th>
//                     <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Payment</th>
//                     <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Method</th>
//                     <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {loading ? (
//                     <tr>
//                       <td colSpan="7" className="px-4 py-12 text-center">
//                         <div className="flex justify-center">
//                           <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//                         </div>
//                         <p className="text-sm text-gray-500 mt-2">Loading orders...</p>
//                       </td>
//                     </tr>
//                   ) : orders.length === 0 ? (
//                     <tr>
//                       <td colSpan="7" className="px-4 py-16 text-center">
//                         <div className="flex flex-col items-center gap-3">
//                           <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
//                             <FaBox className="w-8 h-8 text-gray-400" />
//                           </div>
//                           <p className="text-gray-500 text-sm font-medium">No orders found</p>
//                           <p className="text-xs text-gray-400">Start shopping to see your orders here</p>
//                           <Link href="/products" className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline">
//                             Start Shopping →
//                           </Link>
//                         </div>
//                       </td>
//                     </tr>
//                   ) : (
//                     orders.map((order) => (
//                       <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
//                         <td className="px-4 py-3 text-sm font-mono font-medium text-gray-900">
//                           {order.orderNumber || order._id.slice(-8).toUpperCase()}
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
//                           {isClient ? (
//                             order.orderStatus === 'delivered' && order.deliveredAt ? (
//                               <div className="flex flex-col gap-0.5">
//                                 <div><span className="text-gray-400 text-xs">Ordered:</span> {formatDate(order.createdAt)}</div>
//                                 <div className="text-green-600"><span className="text-green-500 text-xs">Delivered:</span> {formatShortDate(order.deliveredAt)}</div>
//                               </div>
//                             ) : order.orderStatus === 'cancelled' && order.cancelledAt ? (
//                               <div className="flex flex-col gap-0.5">
//                                 <div><span className="text-gray-400 text-xs">Ordered:</span> {formatDate(order.createdAt)}</div>
//                                 <div className="text-red-600"><span className="text-red-500 text-xs">Cancelled:</span> {formatShortDate(order.cancelledAt)}</div>
//                               </div>
//                             ) : (
//                               <div>{formatDate(order.createdAt)}</div>
//                             )
//                           ) : (
//                             <div>Loading...</div>
//                           )}
//                         </td>
//                         <td className="px-4 py-3 text-sm text-right font-bold text-blue-600">
//                           ৳{order.total?.toFixed(2)}
//                         </td>
//                         <td className="px-4 py-3 text-center">
//                           {getStatusBadge(order.orderStatus)}
//                         </td>
//                         <td className="px-4 py-3 text-center">
//                           {getPaymentStatusBadge(order.paymentStatus)}
//                         </td>
//                         <td className="px-4 py-3 text-center">
//                           {getPaymentMethodBadge(order.paymentMethod)}
//                         </td>
//                         <td className="px-4 py-3 text-center">
//                           <div className="flex items-center justify-center gap-2">
//                             <button
//                               onClick={() => {
//                                 setSelectedOrder(order);
//                                 setShowDetailsModal(true);
//                               }}
//                               className="inline-flex items-center gap-1.5 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
//                               title="View Details"
//                             >
//                               <FaEye className="w-3.5 h-3.5" />
//                               View
//                             </button>
//                             {canCancelOrder(order) && (
//                               <button
//                                 onClick={() => {
//                                   setSelectedOrder(order);
//                                   setShowCancelModal(true);
//                                 }}
//                                 className="inline-flex items-center gap-1.5 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
//                                 title="Cancel Order"
//                               >
//                                 <FaBan className="w-3.5 h-3.5" />
//                                 Cancel
//                               </button>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between bg-gray-50">
//                 <p className="text-sm text-gray-500">Showing {orders.length} of {totalOrders} orders</p>
//                 <div className="flex gap-1">
//                   <button
//                     onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                     disabled={currentPage === 1}
//                     className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition"
//                   >
//                     <FaChevronLeft className="w-3 h-3" />
//                   </button>
//                   <span className="px-3 py-1.5 text-sm font-medium text-gray-700">Page {currentPage} of {totalPages}</span>
//                   <button
//                     onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//                     disabled={currentPage === totalPages}
//                     className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition"
//                   >
//                     <FaChevronRight className="w-3 h-3" />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Order Details Modal */}
//       <OrderDetailsModal
//         isOpen={showDetailsModal}
//         onClose={() => setShowDetailsModal(false)}
//         order={selectedOrder}
//         onCancelOrder={() => {
//           setShowDetailsModal(false);
//           setShowCancelModal(true);
//         }}
//       />

//       {/* Cancel Order Modal */}
//       <CancelOrderModal
//         isOpen={showCancelModal}
//         onClose={() => setShowCancelModal(false)}
//         order={selectedOrder}
//         onCancel={handleCancelOrder}
//       />
//     </>
//   );
// }


'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

import { 
  FaBox,
  FaEye,
  FaClock,
  FaMoneyBillWave,
  FaUser,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaPrint,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner,
  FaShippingFast,
  FaCheckCircle,
  FaTimesCircle,
  FaBan,
  FaFileInvoice,
  FaTruck,
  FaCheckDouble,
  FaCreditCard,
  FaMobileAlt,
  FaSearch,
  FaFilter,
  FaTimes,
  FaShoppingBag,
  FaArrowRight,
  FaDownload,
  FaHeart,
  FaStar,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaHome,
  FaCity,
  FaMapPin,
  FaShieldAlt
} from 'react-icons/fa';
import { generateInvoicePDF } from '@/utils/invoicePDF';

const ORDER_STATUSES = [
  { value: 'placed', label: 'Placed', color: 'bg-[#FFF5F6] text-[#EE4275] border-[#FFD2DB]', icon: FaClock },
  { value: 'confirmed', label: 'Confirmed', color: 'bg-[#FFF5F6] text-[#EE4275] border-[#FFD2DB]', icon: FaCheckCircle },
  { value: 'processing', label: 'Processing', color: 'bg-[#FFF5F6] text-[#8B7A8C] border-[#FFD2DB]', icon: FaSpinner },
  { value: 'shipped', label: 'Shipped', color: 'bg-[#FFF5F6] text-[#EE4275] border-[#FFD2DB]', icon: FaShippingFast },
  { value: 'delivered', label: 'Delivered', color: 'bg-green-50 text-green-600 border-green-200', icon: FaCheckDouble },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-50 text-red-600 border-red-200', icon: FaBan }
];

const PAYMENT_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'bg-[#FFF5F6] text-[#FFC107] border-[#FFD2DB]' },
  { value: 'paid', label: 'Paid', color: 'bg-green-50 text-green-600 border-green-200' },
  { value: 'failed', label: 'Failed', color: 'bg-red-50 text-red-600 border-red-200' },
  { value: 'refunded', label: 'Refunded', color: 'bg-[#FFF5F6] text-[#8B7A8C] border-[#FFD2DB]' }
];

// Cancel Order Modal - Beauty Theme
const CancelOrderModal = ({ isOpen, onClose, order, onCancel }) => {
  const [cancellationReason, setCancellationReason] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!cancellationReason.trim()) {
      toast.error('Please provide a cancellation reason');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/orders/${order._id}/cancel`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ cancellationReason })
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Order cancelled successfully');
        onCancel();
        onClose();
      } else {
        toast.error(data.error || 'Failed to cancel order');
      }
    } catch (error) {
      console.error('Cancel order error:', error);
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-[#FFD2DB]/30"
      >
        <div className="p-5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white">
          <div className="flex items-center gap-2">
            <FaBan className="w-5 h-5" />
            <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>Cancel Order</h2>
          </div>
        </div>

        <div className="p-5">
          <p className="text-[#2D1B2E] text-sm mb-3">
            Are you sure you want to cancel this order?
          </p>
          <p className="text-xs text-[#8B7A8C] mb-4">
            Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}
          </p>
          
          <div>
            <label className="block text-xs font-medium text-[#2D1B2E] mb-1">
              Cancellation Reason <span className="text-[#EE4275]">*</span>
            </label>
            <textarea
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              rows="3"
              placeholder="Please tell us why you're cancelling this order..."
              className="w-full px-3 py-2 text-sm border border-[#FFD2DB]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent bg-white text-[#2D1B2E] placeholder:text-[#C4B5C5]"
            />
          </div>
        </div>

        <div className="p-4 border-t border-[#FFD2DB]/30 bg-[#FFF5F6]/20 flex gap-3">
          <button onClick={onClose} className="flex-1 px-3 py-2 border border-[#FFD2DB]/50 text-[#8B7A8C] rounded-xl hover:bg-white transition-colors text-sm">
            Close
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 px-3 py-2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-xl hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
          >
            {loading ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaBan className="w-3 h-3" />}
            Confirm Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// Order Details Modal - Beauty Theme with Invoice Download
const OrderDetailsModal = ({ isOpen, onClose, order, onCancelOrder, onDownloadInvoice }) => {
  const [isClient, setIsClient] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isOpen || !order) return null;

  const statusInfo = ORDER_STATUSES.find(s => s.value === order.orderStatus);
  const paymentInfo = PAYMENT_STATUSES.find(p => p.value === order.paymentStatus);
  const isCancelled = order.orderStatus === 'cancelled';
  const isDelivered = order.orderStatus === 'delivered';
  const canCancel = order.orderStatus === 'placed' && order.paymentMethod === 'cod';

  const formatDate = (date) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  const formatDateLong = (date) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleDateString('en-BD', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await onDownloadInvoice(order);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 overflow-hidden border border-[#FFD2DB]/30"
      >
        <div className="p-5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white sticky top-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaFileInvoice className="w-5 h-5" />
              <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>Order Details</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
              <FaTimesCircle className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-white/80 mt-1">Order Id: {order.orderNumber || order._id.slice(-8).toUpperCase()}</p>
        </div>

        <div className="p-5 max-h-[60vh] overflow-y-auto">
          {/* Order Status Badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusInfo?.color || 'bg-[#FFF5F6] text-[#8B7A8C] border-[#FFD2DB]'}`}>
              {statusInfo?.icon && <statusInfo.icon className="w-3 h-3" />}
              {statusInfo?.label || order.orderStatus}
            </div>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${paymentInfo?.color || 'bg-[#FFF5F6] text-[#8B7A8C] border-[#FFD2DB]'}`}>
              <FaMoneyBillWave className="w-3 h-3" />
              {paymentInfo?.label || order.paymentStatus}
            </div>
            {order.paymentMethod === 'cod' && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-[#FFF5F6] text-[#EE4275] border-[#FFD2DB]">
                <FaMoneyBillWave className="w-3 h-3" />
                Cash on Delivery
              </div>
            )}
            {order.paymentMethod === 'online' && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-[#FFF5F6] text-[#EE4275] border-[#FFD2DB]">
                <FaCreditCard className="w-3 h-3" />
                Online Payment
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-5">
            {canCancel && (
              <button
                onClick={() => {
                  onClose();
                  onCancelOrder();
                }}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors text-sm font-medium"
              >
                <FaBan className="w-4 h-4" />
                Cancel Order
              </button>
            )}
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-xl hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all text-sm font-medium disabled:opacity-50"
            >
              {downloading ? (
                <>
                  <FaSpinner className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FaDownload className="w-4 h-4" />
                  Download Invoice
                </>
              )}
            </button>
          </div>

          {/* Delivery Message */}
          {isDelivered && order.deliveredAt && isClient && (
            <div className="mb-5 bg-green-50 border-l-4 border-green-500 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <FaCheckDouble className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-green-700">Order Delivered</h4>
                  <p className="text-xs text-green-600 mt-1">
                    <span className="font-medium">Delivered on:</span> {formatDateLong(order.deliveredAt)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Cancellation Message */}
          {isCancelled && order.cancellationReason && (
            <div className="mb-5 bg-red-50 border-l-4 border-red-500 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <FaBan className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-red-700">Order Cancelled</h4>
                  <p className="text-xs text-red-600 mt-1">
                    <span className="font-medium">Reason:</span> {order.cancellationReason}
                  </p>
                  {order.cancelledAt && (
                    <p className="text-xs text-red-500 mt-1">
                      <span className="font-medium">Cancelled on:</span> {formatDate(order.cancelledAt)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Order Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div className="bg-[#FFF5F6]/50 rounded-xl p-4 border border-[#FFD2DB]/20">
              <h3 className="font-semibold text-[#2D1B2E] text-sm mb-2 flex items-center gap-1.5">
                <FaUser className="w-3.5 h-3.5 text-[#EE4275]" />
                Customer Information
              </h3>
              <div className="space-y-1 text-xs">
                <p><span className="text-[#8B7A8C]">Name:</span> <span className="text-[#2D1B2E]">{order.customerInfo?.fullName}</span></p>
                <p><span className="text-[#8B7A8C]">Email:</span> <span className="text-[#2D1B2E]">{order.customerInfo?.email}</span></p>
                <p><span className="text-[#8B7A8C]">Phone:</span> <span className="text-[#2D1B2E]">{order.customerInfo?.phone}</span></p>
                 <p><span className="text-[#8B7A8C]">Address:</span> <span className="text-[#2D1B2E]">{order.customerInfo?.address}</span></p>

              </div>
            </div>

            <div className="bg-[#FFF5F6]/50 rounded-xl p-4 border border-[#FFD2DB]/20">
              <h3 className="font-semibold text-[#2D1B2E] text-sm mb-2 flex items-center gap-1.5">
                <FaMapMarkerAlt className="w-3.5 h-3.5 text-[#EE4275]" />
                Delivery Information
              </h3>
              <div className="space-y-1 text-xs">
                <p><span className="text-[#8B7A8C]">Division:</span> <span className="font-medium text-[#2D1B2E]">{order.customerInfo?.division || 'N/A'}</span></p>
                <p><span className="text-[#8B7A8C]">District/City:</span> <span className="font-medium text-[#2D1B2E]">{order.customerInfo?.city || 'N/A'}</span></p>
                <p><span className="text-[#8B7A8C]">Upazila/Thana:</span> <span className="font-medium text-[#2D1B2E]">{order.customerInfo?.zone || 'N/A'}</span></p>
                {order.customerInfo?.area && (
                  <p><span className="text-[#8B7A8C]">Union/Area:</span> <span className="font-medium text-[#2D1B2E]">{order.customerInfo.area}</span></p>
                )}
                {order.trackingNumber && (
                  <p><span className="text-[#8B7A8C]">Tracking:</span> <span className="font-mono text-[#EE4275]">{order.trackingNumber}</span></p>
                )}
              </div>
            </div>
          </div>

          {/* Order Items Table */}
          <div className="mb-5">
            <h3 className="font-semibold text-[#2D1B2E] text-sm mb-2 flex items-center gap-1.5">
              <FaBox className="w-3.5 h-3.5 text-[#EE4275]" />
              Order Items
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-[#FFF5F6]">
                  <tr>
                    <th className="px-3 py-2 text-left text-[#2D1B2E]">Product</th>
                    <th className="px-3 py-2 text-center text-[#2D1B2E]">Qty</th>
                    <th className="px-3 py-2 text-right text-[#2D1B2E]">Price</th>
                    <th className="px-3 py-2 text-right text-[#2D1B2E]">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items?.map((item, idx) => (
                    <tr key={idx} className="border-t border-[#FFD2DB]/20">
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-3">
                          <img 
                            src={item.image || 'https://via.placeholder.com/40'} 
                            alt={item.productName}
                            className="w-10 h-10 rounded-lg object-cover border border-[#FFD2DB]/30"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=Product'; }}
                          />
                          <div>
                            <p className="font-medium text-sm text-[#2D1B2E]">{item.productName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2 text-center text-[#2D1B2E]">{item.quantity}</td>
                      <td className="px-3 py-2 text-right text-[#2D1B2E]">৳{(item.discountPrice || item.regularPrice).toFixed(2)}</td>
                      <td className="px-3 py-2 text-right font-medium text-[#EE4275]">৳{((item.discountPrice || item.regularPrice) * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="border-t border-[#FFD2DB]/30">
                  <tr>
                    <td colSpan="3" className="px-3 py-1.5 text-right font-medium text-[#2D1B2E]">Subtotal:</td>
                    <td className="px-3 py-1.5 text-right text-[#2D1B2E]">৳{order.subtotal?.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="px-3 py-1.5 text-right font-medium text-[#2D1B2E]">Shipping:</td>
                    <td className="px-3 py-1.5 text-right text-[#2D1B2E]">৳{order.shippingCost?.toFixed(2)}</td>
                  </tr>
                  {order.discount > 0 && (
                    <tr>
                      <td colSpan="3" className="px-3 py-1.5 text-right font-medium text-green-600">Discount:</td>
                      <td className="px-3 py-1.5 text-right text-green-600">- ৳{order.discount.toFixed(2)}</td>
                    </tr>
                  )}
                  <tr className="text-sm font-bold">
                    <td colSpan="3" className="px-3 py-1.5 text-right text-[#2D1B2E]">Total:</td>
                    <td className="px-3 py-1.5 text-right text-[#EE4275]">৳{order.total?.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Additional Info */}
          {(order.couponCode || order.deliveryNote) && (
            <div className="bg-[#FFF5F6]/50 rounded-xl p-4 border border-[#FFD2DB]/20">
              <h3 className="font-semibold text-[#2D1B2E] text-sm mb-1.5">Additional Information</h3>
              {order.couponCode && <p className="text-xs"><span className="text-[#8B7A8C]">Coupon Applied:</span> <span className="text-[#EE4275] font-medium">{order.couponCode}</span></p>}
              {order.deliveryNote && <p className="text-xs"><span className="text-[#8B7A8C]">Delivery Note:</span> <span className="text-[#2D1B2E]">{order.deliveryNote}</span></p>}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-[#FFD2DB]/30 bg-[#FFF5F6]/20 flex justify-end gap-2">
          <button onClick={onClose} className="px-5 py-2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-xl hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all text-sm font-medium">
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// Main Customer Orders Page - Beauty Theme
export default function CustomerOrdersPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('');
  const [downloadingOrders, setDownloadingOrders] = useState({});

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: 10
      });
      if (searchTerm) queryParams.append('search', searchTerm);
      if (statusFilter) queryParams.append('orderStatus', statusFilter);
      if (paymentStatusFilter) queryParams.append('paymentStatus', paymentStatusFilter);
      if (paymentMethodFilter) queryParams.append('paymentMethod', paymentMethodFilter);

      const response = await fetch(`http://localhost:5000/api/orders?${queryParams}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
        setTotalPages(data.pagination.pages);
        setTotalOrders(data.pagination.total);
      } else {
        toast.error(data.error || 'Failed to fetch orders');
      }
    } catch (error) {
      console.error('Fetch orders error:', error);
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, statusFilter, paymentStatusFilter, paymentMethodFilter, router]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleCancelOrder = () => {
    fetchOrders();
  };

  const handleDownloadInvoice = async (order) => {
    setDownloadingOrders(prev => ({ ...prev, [order._id]: true }));
    try {
      await generateInvoicePDF(order);
      toast.success('Invoice downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download invoice');
    } finally {
      setDownloadingOrders(prev => ({ ...prev, [order._id]: false }));
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setPaymentStatusFilter('');
    setPaymentMethodFilter('');
    setCurrentPage(1);
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  const formatShortDate = (date) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`;
  };

  const getStatusBadge = (status) => {
    const statusInfo = ORDER_STATUSES.find(s => s.value === status);
    if (!statusInfo) return <span className="px-2 py-0.5 rounded-full text-xs bg-[#FFF5F6] text-[#8B7A8C] border border-[#FFD2DB]">{status}</span>;
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusInfo.color}`}>
        <statusInfo.icon className="w-2.5 h-2.5" />
        {statusInfo.label}
      </span>
    );
  };

  const getPaymentStatusBadge = (status) => {
    const paymentInfo = PAYMENT_STATUSES.find(p => p.value === status);
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${paymentInfo?.color || 'bg-[#FFF5F6] text-[#8B7A8C] border-[#FFD2DB]'}`}>
        <FaMoneyBillWave className="w-2.5 h-2.5" />
        {paymentInfo?.label || status}
      </span>
    );
  };

  const getPaymentMethodBadge = (method) => {
    const methods = {
      'cod': { label: 'COD', color: 'bg-[#FFF5F6] text-[#EE4275] border-[#FFD2DB]' },
      'online': { label: 'Online', color: 'bg-[#FFF5F6] text-[#EE4275] border-[#FFD2DB]' },
      'bkash': { label: 'bKash', color: 'bg-[#FFF5F6] text-[#EE4275] border-[#FFD2DB]' },
      'nagad': { label: 'Nagad', color: 'bg-[#FFF5F6] text-[#EE4275] border-[#FFD2DB]' }
    };
    
    const info = methods[method] || { label: method || 'Unknown', color: 'bg-[#FFF5F6] text-[#8B7A8C] border-[#FFD2DB]' };
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${info.color}`}>
        {info.label}
      </span>
    );
  };

  const canCancelOrder = (order) => {
    return order.orderStatus === 'placed' && order.paymentMethod === 'cod';
  };

  return (
    <>
      <div className="min-h-screen bg-[#FFF5F6]/20 pb-12 pt-6">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header - Beauty Theme */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#EE4275] to-[#FF6B9D] rounded-xl flex items-center justify-center shadow-lg shadow-[#EE4275]/25">
                  <FaShoppingBag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-[#2D1B2E]" style={{ fontFamily: '"Playfair Display"' }}>
                    My Orders
                  </h1>
                  <p className="text-sm text-[#8B7A8C] mt-0.5">Track and manage all your beauty orders</p>
                </div>
              </div>
            </div>
            <Link 
              href="/products" 
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-xl hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all text-sm font-medium shadow-sm"
            >
              Continue Shopping
              <FaArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Search and Filters - Beauty Theme */}
          <div className="bg-white rounded-2xl border border-[#FFD2DB]/40 p-4 mb-6 shadow-sm">
            <div className="flex flex-col gap-4">
              {/* Search Bar */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C4B5C5] w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by Order ID..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-10 py-2.5 border border-[#FFD2DB]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent bg-[#FFF5F6]/20 hover:bg-white transition text-[#2D1B2E] placeholder:text-[#C4B5C5]"
                />
                {searchTerm && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setCurrentPage(1);
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#C4B5C5] hover:text-[#EE4275]"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Filter Row */}
              <div className="flex flex-wrap gap-3 items-center">
                <div className="flex items-center gap-2">
                  <FaFilter className="w-4 h-4 text-[#8B7A8C]" />
                  <span className="text-sm text-[#8B7A8C]">Filters:</span>
                </div>
                
                {/* Order Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-1.5 text-sm border border-[#FFD2DB]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent bg-[#FFF5F6]/20 hover:bg-white transition text-[#2D1B2E]"
                >
                  <option value="">All Order Status</option>
                  {ORDER_STATUSES.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>

                {/* Payment Status Filter */}
                <select
                  value={paymentStatusFilter}
                  onChange={(e) => {
                    setPaymentStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-1.5 text-sm border border-[#FFD2DB]/50 rounded-xl focus:ring-2 focus:ring-[#EE4275] focus:border-transparent bg-[#FFF5F6]/20 hover:bg-white transition text-[#2D1B2E]"
                >
                  <option value="">All Payment Status</option>
                  {PAYMENT_STATUSES.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>

                {/* Clear Filters Button */}
                {(searchTerm || statusFilter || paymentStatusFilter || paymentMethodFilter) && (
                  <button
                    onClick={clearFilters}
                    className="px-3 py-1.5 text-sm text-[#EE4275] hover:bg-[#FFF5F6] rounded-xl transition-colors flex items-center gap-1 font-medium"
                  >
                    <FaTimes className="w-3 h-3" />
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </div>


          {/* Orders Table - Beauty Theme */}
          <div className="bg-white rounded-2xl border border-[#FFD2DB]/40 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] lg:min-w-full">
                <thead className="bg-[#FFF5F6]/50 border-b border-[#FFD2DB]/30">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#8B7A8C] uppercase tracking-wider">Order ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#8B7A8C] uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-[#8B7A8C] uppercase tracking-wider">Total</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-[#8B7A8C] uppercase tracking-wider">Order Status</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-[#8B7A8C] uppercase tracking-wider">Payment</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-[#8B7A8C] uppercase tracking-wider">Method</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-[#8B7A8C] uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="px-4 py-12 text-center">
                        <div className="flex justify-center">
                          <div className="w-8 h-8 border-3 border-[#EE4275] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <p className="text-sm text-[#8B7A8C] mt-2">Loading orders...</p>
                      </td>
                    </tr>
                  ) : orders.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-4 py-16 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-16 h-16 rounded-full bg-[#FFF5F6] flex items-center justify-center border border-[#FFD2DB]/30">
                            <FaBox className="w-8 h-8 text-[#C4B5C5]" />
                          </div>
                          <p className="text-[#2D1B2E] text-sm font-medium">No orders found</p>
                          <p className="text-xs text-[#8B7A8C]">Start shopping to see your orders here</p>
                          <Link href="/products" className="text-[#EE4275] hover:text-[#EE4275]/70 text-sm font-medium hover:underline">
                            Start Shopping →
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order._id} className="border-b border-[#FFD2DB]/20 hover:bg-[#FFF5F6]/30 transition-colors">
                        <td className="px-4 py-3 text-sm font-mono font-medium text-[#2D1B2E]">
                          {order.orderNumber || order._id.slice(-8).toUpperCase()}
                        </td>
                        <td className="px-4 py-3 text-sm text-[#8B7A8C] whitespace-nowrap">
                          {isClient ? (
                            order.orderStatus === 'delivered' && order.deliveredAt ? (
                              <div className="flex flex-col gap-0.5">
                                <div><span className="text-[#C4B5C5] text-xs">Ordered:</span> {formatDate(order.createdAt)}</div>
                                <div className="text-green-600"><span className="text-green-500 text-xs">Delivered:</span> {formatShortDate(order.deliveredAt)}</div>
                              </div>
                            ) : order.orderStatus === 'cancelled' && order.cancelledAt ? (
                              <div className="flex flex-col gap-0.5">
                                <div><span className="text-[#C4B5C5] text-xs">Ordered:</span> {formatDate(order.createdAt)}</div>
                                <div className="text-red-600"><span className="text-red-500 text-xs">Cancelled:</span> {formatShortDate(order.cancelledAt)}</div>
                              </div>
                            ) : (
                              <div>{formatDate(order.createdAt)}</div>
                            )
                          ) : (
                            <div>Loading...</div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-right font-bold text-[#EE4275]">
                          ৳{order.total?.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {getStatusBadge(order.orderStatus)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {getPaymentStatusBadge(order.paymentStatus)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {getPaymentMethodBadge(order.paymentMethod)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => {
                                setSelectedOrder(order);
                                setShowDetailsModal(true);
                              }}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[#EE4275] hover:bg-[#FFF5F6] rounded-lg transition-colors text-xs font-medium"
                              title="View Details"
                            >
                              <FaEye className="w-3.5 h-3.5" />
                              View
                            </button>
                            <button
                              onClick={() => handleDownloadInvoice(order)}
                              disabled={downloadingOrders[order._id]}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[#EE4275] hover:bg-[#FFF5F6] rounded-lg transition-colors text-xs font-medium disabled:opacity-50"
                              title="Download Invoice"
                            >
                              {downloadingOrders[order._id] ? (
                                <FaSpinner className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <FaDownload className="w-3.5 h-3.5" />
                              )}
                              Invoice
                            </button>
                            {canCancelOrder(order) && (
                              <button
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setShowCancelModal(true);
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-xs font-medium"
                                title="Cancel Order"
                              >
                                <FaBan className="w-3.5 h-3.5" />
                                Cancel
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination - Beauty Theme */}
            {totalPages > 1 && (
              <div className="px-4 py-3 border-t border-[#FFD2DB]/30 flex flex-wrap items-center justify-between gap-3 bg-[#FFF5F6]/20">
                <p className="text-sm text-[#8B7A8C]">Showing {orders.length} of {totalOrders} orders</p>
                <div className="flex gap-1">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 border border-[#FFD2DB]/50 rounded-xl hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition text-[#2D1B2E]"
                  >
                    <FaChevronLeft className="w-3 h-3" />
                  </button>
                  <span className="px-3 py-1.5 text-sm font-medium text-[#2D1B2E]">Page {currentPage} of {totalPages}</span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 border border-[#FFD2DB]/50 rounded-xl hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition text-[#2D1B2E]"
                  >
                    <FaChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Help Section - Beauty Theme */}
          <div className="mt-6 text-center">
            <p className="text-xs text-[#8B7A8C]">Need help with your orders?</p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
              <a href="tel:+8801712345678" className="text-sm text-[#EE4275] hover:text-[#EE4275]/70 transition-colors flex items-center gap-1">
                <FaPhone className="w-3 h-3" />
                +880 1XXXXXXXXX
              </a>
              <span className="text-[#FFD2DB] hidden sm:inline">|</span>
              <a href="mailto:support@beautybucket.com" className="text-sm text-[#EE4275] hover:text-[#EE4275]/70 transition-colors flex items-center gap-1">
                <FaEnvelope className="w-3 h-3" />
                support@beautybucket.com
              </a>
              <span className="text-[#FFD2DB] hidden sm:inline">|</span>
              <a href="https://wa.me/8801712345678" target="_blank" rel="noopener noreferrer" className="text-sm text-[#EE4275] hover:text-[#EE4275]/70 transition-colors flex items-center gap-1">
                <FaWhatsapp className="w-3 h-3" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        order={selectedOrder}
        onCancelOrder={() => {
          setShowDetailsModal(false);
          setShowCancelModal(true);
        }}
        onDownloadInvoice={handleDownloadInvoice}
      />

      {/* Cancel Order Modal */}
      <CancelOrderModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        order={selectedOrder}
        onCancel={handleCancelOrder}
      />
    </>
  );
}