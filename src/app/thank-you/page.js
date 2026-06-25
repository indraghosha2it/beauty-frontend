
// // app/thank-you/page.js
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import {
//   FaCheckCircle,
//   FaPrint,
//   FaDownload,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaShoppingBag,
//   FaClock,
//   FaTruck,
//   FaFileInvoice,
//   FaHome,
//   FaStore,
//   FaUser,
//   FaSearch,
//   FaWhatsapp
// } from 'react-icons/fa';
// import { toast } from 'sonner';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';

// export default function ThankYouPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const orderId = searchParams.get('orderId');
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [pdfLoading, setPdfLoading] = useState(false);
//   const invoiceRef = useRef(null);

//   useEffect(() => {
//     if (orderId) {
//       fetchOrderDetails();
//     } else {
//       setError('No order ID provided');
//       setLoading(false);
//     }
//   }, [orderId]);

//   const fetchOrderDetails = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
//         headers: {
//           'x-session-id': localStorage.getItem('cartSessionId') || ''
//         }
//       });
//       const data = await response.json();
      
//       if (data.success) {
//         setOrder(data.data);
//       } else {
//         setError(data.error || 'Failed to load order details');
//       }
//     } catch (error) {
//       console.error('Fetch order error:', error);
//       setError('Failed to load order details');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadPDF = async () => {
//     if (!order || pdfLoading) return;

//     setPdfLoading(true);
//     try {
//       // Dynamically import jspdf
//       const { default: jsPDF } = await import('jspdf');
      
//       // Dynamically import jspdf-autotable
//       const { default: autoTable } = await import('jspdf-autotable');

//       const doc = new jsPDF('p', 'mm', 'a4');
//       const pageWidth = doc.internal.pageSize.getWidth();
//       const pageHeight = doc.internal.pageSize.getHeight();
      
//       // ========== HEADER ==========
//       doc.setFontSize(22);
//       doc.setTextColor(238, 66, 117);
//       doc.setFont('helvetica', 'bold');
//       doc.text('BeautyBoutique', pageWidth / 2, 20, { align: 'center' });
      
//       doc.setFontSize(14);
//       doc.setTextColor(45, 27, 46);
//       doc.text('Order Confirmation', pageWidth / 2, 30, { align: 'center' });

//       // ========== ORDER INFO ==========
//       doc.setFontSize(10);
//       doc.setTextColor(100);
//       doc.text(`Order #: ${order.orderNumber || order._id.slice(-8).toUpperCase()}`, 20, 45);
//       doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString('en-BD', {
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       })}`, 20, 52);
      
//       const statusColors = {
//         'placed': [255, 193, 7],
//         'confirmed': [33, 150, 243],
//         'processing': [156, 39, 176],
//         'shipped': [0, 150, 136],
//         'delivered': [76, 175, 80],
//         'cancelled': [244, 67, 54]
//       };
//       const statusColor = statusColors[order.orderStatus] || [100, 100, 100];
//       doc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
//       doc.text(`Status: ${order.orderStatus.toUpperCase()}`, 140, 45);
//       doc.setTextColor(100);
//       doc.text(`Payment: ${order.paymentMethod.toUpperCase()}`, 140, 52);

//       // ========== DIVIDER ==========
//       doc.setDrawColor(238, 66, 117);
//       doc.setLineWidth(0.5);
//       doc.line(20, 58, pageWidth - 20, 58);

//       // ========== CUSTOMER INFO ==========
//       doc.setFontSize(12);
//       doc.setTextColor(45, 27, 46);
//       doc.setFont('helvetica', 'bold');
//       doc.text('Customer Information', 20, 70);
      
//       doc.setFontSize(10);
//       doc.setFont('helvetica', 'normal');
//       doc.setTextColor(60);
//       doc.text(`Name: ${order.customerInfo.fullName}`, 20, 80);
//       if (order.customerInfo.email) {
//         doc.text(`Email: ${order.customerInfo.email}`, 20, 87);
//       }
//       doc.text(`Phone: ${order.customerInfo.phone}`, 20, 94);
//       doc.text(`Address: ${order.customerInfo.address}`, 20, 101);
//       doc.text(`${order.customerInfo.zone}, ${order.customerInfo.city}`, 20, 108);
//       doc.text(order.customerInfo.division, 20, 115);

//       // ========== ORDER ITEMS ==========
//       doc.setFontSize(12);
//       doc.setTextColor(45, 27, 46);
//       doc.setFont('helvetica', 'bold');
//       doc.text('Order Items', 20, 128);

//       // Table
//       const tableData = order.items.map((item, idx) => [
//         idx + 1,
//         item.productName,
//         item.quantity,
//         item.unit || 'pcs',
//         `৳${(item.discountPrice || item.regularPrice).toFixed(2)}`,
//         `৳${((item.discountPrice || item.regularPrice) * item.quantity).toFixed(2)}`
//       ]);

//       autoTable(doc, {
//         startY: 135,
//         head: [['#', 'Product', 'Qty', 'Unit', 'Price', 'Total']],
//         body: tableData,
//         theme: 'striped',
//         headStyles: {
//           fillColor: [238, 66, 117],
//           textColor: [255, 255, 255],
//           fontStyle: 'bold',
//           fontSize: 9
//         },
//         bodyStyles: {
//           fontSize: 9
//         },
//         columnStyles: {
//           0: { cellWidth: 10 },
//           1: { cellWidth: 75 },
//           2: { cellWidth: 15 },
//           3: { cellWidth: 20 },
//           4: { cellWidth: 25 },
//           5: { cellWidth: 30 }
//         },
//         margin: { left: 20, right: 20 }
//       });

//       // ========== TOTALS ==========
//       const finalY = doc.lastAutoTable.finalY + 10;
      
//       doc.setFontSize(10);
//       doc.setFont('helvetica', 'bold');
//       doc.setTextColor(60);
      
//       const rightX = pageWidth - 30;
//       let yPos = finalY;
      
//       doc.text('Subtotal:', rightX - 50, yPos);
//       doc.text(`৳${order.subtotal.toFixed(2)}`, rightX, yPos);
//       yPos += 7;
      
//       doc.text('Shipping:', rightX - 50, yPos);
//       doc.text(`৳${order.shippingCost.toFixed(2)}`, rightX, yPos);
//       yPos += 7;
      
//       if (order.discount > 0) {
//         doc.text('Discount:', rightX - 50, yPos);
//         doc.text(`-৳${order.discount.toFixed(2)}`, rightX, yPos);
//         yPos += 7;
//       }
      
//       doc.setDrawColor(238, 66, 117);
//       doc.setLineWidth(0.3);
//       doc.line(rightX - 55, yPos - 2, rightX + 10, yPos - 2);
      
//       doc.setFontSize(12);
//       doc.setTextColor(238, 66, 117);
//       doc.setFont('helvetica', 'bold');
//       doc.text('Total:', rightX - 50, yPos + 7);
//       doc.text(`৳${order.total.toFixed(2)}`, rightX, yPos + 7);

//       // ========== FOOTER ==========
//       const footerY = pageHeight - 20;
//       doc.setFontSize(8);
//       doc.setTextColor(128);
//       doc.text('Thank you for your order! For any queries, contact us at support@beautyboutique.com', pageWidth / 2, footerY, { align: 'center' });
//       doc.text('This is a system generated invoice.', pageWidth / 2, footerY + 5, { align: 'center' });

//       // Save PDF
//       doc.save(`Invoice_${order.orderNumber || order._id.slice(-8)}.pdf`);
//       toast.success('Invoice downloaded successfully!');
//     } catch (error) {
//       console.error('PDF generation error:', error);
//       toast.error('Failed to generate PDF. Please try again.');
//     } finally {
//       setPdfLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-[#FFF5F6]/20 pt-20 flex items-center justify-center">
//           <div className="w-8 h-8 border-4 border-[#EE4275] border-t-transparent rounded-full animate-spin"></div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   if (error || !order) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-[#FFF5F6]/20 pt-20">
//           <div className="container mx-auto px-4 max-w-3xl text-center py-16">
//             <div className="bg-white rounded-2xl shadow-sm border border-[#FFD2DB]/40 p-12">
//               <div className="w-20 h-20 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center border border-red-100">
//                 <FaCheckCircle className="w-10 h-10 text-red-500" />
//               </div>
//               <h2 className="text-2xl font-bold text-[#2D1B2E] mb-2" style={{ fontFamily: '"Playfair Display"' }}>
//                 Order Not Found
//               </h2>
//               <p className="text-[#8B7A8C] mb-6">{error || 'Unable to load order details'}</p>
//               <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-xl hover:shadow-lg hover:shadow-[#EE4275]/25 transition-colors">
//                 <FaHome className="w-4 h-4" />
//                 Return Home
//               </Link>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   const statusSteps = ['placed', 'confirmed', 'processing', 'shipped', 'delivered'];
//   const currentStepIndex = statusSteps.indexOf(order.orderStatus);
//   const isCancelled = order.orderStatus === 'cancelled';

//   return (
//     <>
//       <Navbar />
      
//       <div className="min-h-screen bg-[#FFF5F6]/20 py-8">
//         <div className="container mx-auto px-4 max-w-5xl">
//           {/* Success Header */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-center mb-8"
//           >
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 border-4 border-green-200">
//               <FaCheckCircle className="w-10 h-10 text-green-500" />
//             </div>
//             <h1 className="text-3xl font-bold text-[#2D1B2E]" style={{ fontFamily: '"Playfair Display"' }}>
//               Thank You for Your Order! ✨
//             </h1>
//             <p className="text-[#8B7A8C] mt-2">
//               Your beauty order has been placed successfully. We'll notify you when it ships.
//             </p>
//           </motion.div>

//           {/* Order Reference */}
//           <div className="bg-white rounded-2xl shadow-sm border border-[#FFD2DB]/40 p-6 mb-6">
//             <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//               <div>
//                 <p className="text-sm text-[#8B7A8C]">Order Reference</p>
//                 <p className="text-xl font-bold text-[#EE4275]" style={{ fontFamily: '"Playfair Display"' }}>
//                   #{order.orderNumber || order._id.slice(-8).toUpperCase()}
//                 </p>
//                 <p className="text-xs text-[#8B7A8C]">
//                   Placed on {new Date(order.createdAt).toLocaleDateString('en-BD', {
//                     day: '2-digit',
//                     month: 'short',
//                     year: 'numeric',
//                     hour: '2-digit',
//                     minute: '2-digit'
//                   })}
//                 </p>
//               </div>
//               <div className="flex gap-2 flex-wrap justify-center">
//                 <button
//                   onClick={downloadPDF}
//                   disabled={pdfLoading}
//                   className="flex items-center gap-2 px-4 py-2 bg-[#FFF5F6] text-[#EE4275] rounded-xl hover:bg-[#FFD2DB]/30 transition-colors border border-[#FFD2DB]/50 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {pdfLoading ? (
//                     <>
//                       <span className="w-4 h-4 border-2 border-[#EE4275] border-t-transparent rounded-full animate-spin"></span>
//                       Generating...
//                     </>
//                   ) : (
//                     <>
//                       <FaDownload className="w-4 h-4" />
//                       Download Invoice
//                     </>
//                   )}
//                 </button>
//                 <button
//                   onClick={() => window.print()}
//                   className="flex items-center gap-2 px-4 py-2 bg-[#FFF5F6] text-[#EE4275] rounded-xl hover:bg-[#FFD2DB]/30 transition-colors border border-[#FFD2DB]/50 text-sm"
//                 >
//                   <FaPrint className="w-4 h-4" />
//                   Print
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Tracking Section - Updated with link to track page */}
//           <div className="bg-white rounded-2xl shadow-sm border border-[#FFD2DB]/40 p-6 mb-6">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-[#EE4275] to-[#FF6B9D] rounded-full flex items-center justify-center flex-shrink-0">
//                 <FaTruck className="w-5 h-5 text-white" />
//               </div>
//               <div>
//                 <h2 className="text-sm font-bold text-[#2D1B2E]" style={{ fontFamily: '"Playfair Display"' }}>
//                   Track Your Order
//                 </h2>
//                 <p className="text-xs text-[#8B7A8C]">
//                   You can track your order status using your phone number
//                 </p>
//               </div>
//               <Link
//                 href="/track"
//                 className="ml-auto flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-xl hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all text-sm whitespace-nowrap"
//               >
//                 <FaSearch className="w-4 h-4" />
//                 Track Order
//               </Link>
//             </div>
//           </div>

//           {/* Order Details - Invoice */}
//           <div ref={invoiceRef} className="bg-white rounded-2xl shadow-sm border border-[#FFD2DB]/40 p-6 mb-6">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-lg font-bold text-[#2D1B2E] flex items-center gap-2" style={{ fontFamily: '"Playfair Display"' }}>
//                 <FaFileInvoice className="w-5 h-5 text-[#EE4275]" />
//                 Order Details
//               </h2>
//               <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                 isCancelled ? 'bg-red-100 text-red-600' :
//                 order.orderStatus === 'delivered' ? 'bg-green-100 text-green-600' :
//                 'bg-[#FFF5F6] text-[#EE4275] border border-[#FFD2DB]/30'
//               }`}>
//                 {order.orderStatus.toUpperCase()}
//               </span>
//             </div>

//             {/* Status Timeline */}
//             {!isCancelled && (
//               <div className="mb-6">
//                 <div className="relative">
//                   <div className="flex items-center justify-between">
//                     {statusSteps.map((step, index) => {
//                       const isCompleted = index <= currentStepIndex;
//                       const isCurrent = index === currentStepIndex;
//                       const labels = {
//                         'placed': 'Placed',
//                         'confirmed': 'Confirmed',
//                         'processing': 'Processing',
//                         'shipped': 'Shipped',
//                         'delivered': 'Delivered'
//                       };
                      
//                       return (
//                         <div key={step} className="flex flex-col items-center flex-1 relative">
//                           <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
//                             isCompleted ? 'bg-[#EE4275] text-white' : 'bg-[#FFF5F6] text-[#C4B5C5] border border-[#FFD2DB]/30'
//                           } ${isCurrent ? 'ring-4 ring-[#FFD2DB]/50' : ''}`}>
//                             {index + 1}
//                           </div>
//                           <span className="text-[10px] mt-1 text-[#8B7A8C]">{labels[step]}</span>
//                           {index < statusSteps.length - 1 && (
//                             <div className={`absolute top-4 left-[60%] w-[80%] h-0.5 ${
//                               index < currentStepIndex ? 'bg-[#EE4275]' : 'bg-[#FFD2DB]/50'
//                             }`} />
//                           )}
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Customer Info - Full Details */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-[#FFF5F6]/30 rounded-xl border border-[#FFD2DB]/20">
//               <div>
//                 <p className="text-xs text-[#8B7A8C] uppercase tracking-wider font-medium">Customer Information</p>
//                 <div className="mt-2 space-y-1">
//                   <p className="font-medium text-[#2D1B2E]">{order.customerInfo.fullName}</p>
//                   {order.customerInfo.email && (
//                     <p className="text-sm text-[#8B7A8C] flex items-center gap-2">
//                       <FaEnvelope className="w-3 h-3" />
//                       {order.customerInfo.email}
//                     </p>
//                   )}
//                   <p className="text-sm text-[#8B7A8C] flex items-center gap-2">
//                     <FaPhone className="w-3 h-3" />
//                     {order.customerInfo.phone}
//                   </p>
//                 </div>
//               </div>
//               <div>
//                 <p className="text-xs text-[#8B7A8C] uppercase tracking-wider font-medium">Delivery Address</p>
//                 <div className="mt-2 space-y-1">
//                   <p className="font-medium text-[#2D1B2E]">{order.customerInfo.address}</p>
//                   <p className="text-sm text-[#8B7A8C]">
//                     {order.customerInfo.zone}, {order.customerInfo.city}
//                   </p>
//                   <p className="text-sm text-[#8B7A8C]">
//                     {order.customerInfo.division}
//                   </p>
//                   {order.customerInfo.zipCode && (
//                     <p className="text-sm text-[#8B7A8C]">ZIP: {order.customerInfo.zipCode}</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Order ID and Details */}
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 p-3 bg-[#FFF5F6]/20 rounded-lg border border-[#FFD2DB]/10">
//               <div>
//                 <p className="text-[10px] text-[#8B7A8C] uppercase tracking-wider">Order ID</p>
//                 <p className="text-sm font-mono font-bold text-[#EE4275]">
//                   {order.orderNumber || order._id.slice(-8).toUpperCase()}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-[10px] text-[#8B7A8C] uppercase tracking-wider">Date</p>
//                 <p className="text-sm font-medium text-[#2D1B2E]">
//                   {new Date(order.createdAt).toLocaleDateString('en-BD')}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-[10px] text-[#8B7A8C] uppercase tracking-wider">Payment</p>
//                 <p className="text-sm font-medium text-[#2D1B2E] capitalize">{order.paymentMethod}</p>
//               </div>
//               <div>
//                 <p className="text-[10px] text-[#8B7A8C] uppercase tracking-wider">Status</p>
//                 <p className="text-sm font-medium text-[#2D1B2E] capitalize">{order.orderStatus}</p>
//               </div>
//             </div>

//             {/* Items Table with Unit */}
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm">
//                 <thead>
//                   <tr className="border-b border-[#FFD2DB]/30">
//                     <th className="text-left py-2 px-2 text-[#8B7A8C] font-medium">#</th>
//                     <th className="text-left py-2 px-2 text-[#8B7A8C] font-medium">Product</th>
//                     <th className="text-center py-2 px-2 text-[#8B7A8C] font-medium">Qty</th>
//                     <th className="text-center py-2 px-2 text-[#8B7A8C] font-medium">Unit</th>
//                     <th className="text-right py-2 px-2 text-[#8B7A8C] font-medium">Price</th>
//                     <th className="text-right py-2 px-2 text-[#8B7A8C] font-medium">Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {order.items.map((item, index) => {
//                     const price = item.discountPrice || item.regularPrice;
//                     return (
//                       <tr key={index} className="border-b border-[#FFD2DB]/20">
//                         <td className="py-2 px-2 text-[#8B7A8C]">{index + 1}</td>
//                         <td className="py-2 px-2 text-[#2D1B2E]">
//                           <div className="flex items-center gap-2">
//                             {item.image && (
//                               <img 
//                                 src={item.image} 
//                                 alt={item.productName}
//                                 className="w-8 h-8 rounded object-cover border border-[#FFD2DB]/30"
//                                 onError={(e) => { e.target.src = 'https://via.placeholder.com/32?text=Product'; }}
//                               />
//                             )}
//                             <span>{item.productName}</span>
//                           </div>
//                         </td>
//                         <td className="text-center py-2 px-2 text-[#2D1B2E]">{item.quantity}</td>
//                         <td className="text-center py-2 px-2 text-[#8B7A8C]">{item.unit || 'pcs'}</td>
//                         <td className="text-right py-2 px-2 text-[#2D1B2E]">৳{price.toFixed(2)}</td>
//                         <td className="text-right py-2 px-2 font-medium text-[#EE4275]">৳{(price * item.quantity).toFixed(2)}</td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//                 <tfoot>
//                   <tr className="border-t border-[#FFD2DB]/30">
//                     <td colSpan="4" className="py-2 px-2"></td>
//                     <td className="text-right py-2 px-2 text-[#8B7A8C]">Subtotal:</td>
//                     <td className="text-right py-2 px-2 font-medium">৳{order.subtotal.toFixed(2)}</td>
//                   </tr>
//                   <tr>
//                     <td colSpan="4" className="py-1 px-2"></td>
//                     <td className="text-right py-1 px-2 text-[#8B7A8C]">Shipping:</td>
//                     <td className="text-right py-1 px-2 font-medium">৳{order.shippingCost.toFixed(2)}</td>
//                   </tr>
//                   {order.discount > 0 && (
//                     <tr>
//                       <td colSpan="4" className="py-1 px-2"></td>
//                       <td className="text-right py-1 px-2 text-green-600">Discount:</td>
//                       <td className="text-right py-1 px-2 font-medium text-green-600">-৳{order.discount.toFixed(2)}</td>
//                     </tr>
//                   )}
//                   <tr className="border-t-2 border-[#EE4275]">
//                     <td colSpan="4" className="py-2 px-2"></td>
//                     <td className="text-right py-2 px-2 font-bold text-[#2D1B2E]">Total:</td>
//                     <td className="text-right py-2 px-2 font-bold text-[#EE4275] text-lg">৳{order.total.toFixed(2)}</td>
//                   </tr>
//                 </tfoot>
//               </table>
//             </div>

//             {/* Payment Info */}
//             <div className="mt-4 pt-4 border-t border-[#FFD2DB]/30 flex flex-col sm:flex-row justify-between text-sm">
//               <div>
//                 <span className="text-[#8B7A8C]">Payment Method: </span>
//                 <span className="font-medium text-[#2D1B2E] capitalize">{order.paymentMethod}</span>
//               </div>
//               <div>
//                 <span className="text-[#8B7A8C]">Payment Status: </span>
//                 <span className={`font-medium ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-[#EE4275]'}`}>
//                   {order.paymentStatus.toUpperCase()}
//                 </span>
//               </div>
//             </div>

//             {order.customerInfo.note && (
//               <div className="mt-4 p-3 bg-[#FFF5F6]/30 rounded-xl border border-[#FFD2DB]/20">
//                 <p className="text-xs text-[#8B7A8C]">Order Note</p>
//                 <p className="text-sm text-[#2D1B2E]">{order.customerInfo.note}</p>
//               </div>
//             )}
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link href="/" className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-xl hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all">
//               <FaHome className="w-4 h-4" />
//               Continue Shopping
//             </Link>
//             <Link href="/products" className="flex items-center justify-center gap-2 px-6 py-3 border border-[#FFD2DB]/50 text-[#8B7A8C] rounded-xl hover:bg-white transition-colors">
//               <FaStore className="w-4 h-4" />
//               Browse More Products
//             </Link>
//           </div>

//           {/* Support Info */}
//           <div className="mt-6 text-center text-sm text-[#8B7A8C]">
//             <p>Need help? Contact our support team</p>
//             <div className="flex items-center justify-center gap-4 mt-2">
//               <a href="tel:+880123456789" className="flex items-center gap-1 text-[#EE4275] hover:underline">
//                 <FaPhone className="w-3 h-3" />
//                 Call Us
//               </a>
//               <a href="mailto:support@beautyboutique.com" className="flex items-center gap-1 text-[#EE4275] hover:underline">
//                 <FaEnvelope className="w-3 h-3" />
//                 Email Us
//               </a>
//               <a href="https://wa.me/880123456789" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#EE4275] hover:underline">
//                 <FaWhatsapp className="w-3 h-3" />
//                 WhatsApp
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// }

// app/thank-you/page.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FaCheckCircle,
  FaPrint,
  FaDownload,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaShoppingBag,
  FaClock,
  FaTruck,
  FaFileInvoice,
  FaHome,
  FaStore,
  FaUser,
  FaSearch,
  FaWhatsapp,
  FaMapPin,
  FaCity,
  FaBuilding,
  FaLocationArrow
} from 'react-icons/fa';
import { toast } from 'sonner';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { generateInvoicePDF } from '@/utils/invoicePDF';


export default function ThankYouPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const invoiceRef = useRef(null);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    } else {
      setError('No order ID provided');
      setLoading(false);
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        headers: {
          'x-session-id': localStorage.getItem('cartSessionId') || ''
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setOrder(data.data);
      } else {
        setError(data.error || 'Failed to load order details');
      }
    } catch (error) {
      console.error('Fetch order error:', error);
      setError('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    if (!order || pdfLoading) return;

    setPdfLoading(true);
    try {
      await generateInvoicePDF(order);
      toast.success('Invoice downloaded successfully!');
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF. Please try again.');
    } finally {
      setPdfLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#FFF5F6]/20 pt-20 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#EE4275] border-t-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !order) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#FFF5F6]/20 pt-20">
          <div className="container mx-auto px-4 max-w-3xl text-center py-16">
            <div className="bg-white rounded-2xl shadow-sm border border-[#FFD2DB]/40 p-12">
              <div className="w-20 h-20 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center border border-red-100">
                <FaCheckCircle className="w-10 h-10 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-[#2D1B2E] mb-2" style={{ fontFamily: '"Playfair Display"' }}>
                Order Not Found
              </h2>
              <p className="text-[#8B7A8C] mb-6">{error || 'Unable to load order details'}</p>
              <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-xl hover:shadow-lg hover:shadow-[#EE4275]/25 transition-colors">
                <FaHome className="w-4 h-4" />
                Return Home
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const statusSteps = ['placed', 'confirmed', 'processing', 'shipped', 'delivered'];
  const currentStepIndex = statusSteps.indexOf(order.orderStatus);
  const isCancelled = order.orderStatus === 'cancelled';

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-[#FFF5F6]/20 py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Success Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 border-4 border-green-200">
              <FaCheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-[#2D1B2E]" style={{ fontFamily: '"Playfair Display"' }}>
              Thank You for Your Order! ✨
            </h1>
            <p className="text-[#8B7A8C] mt-2">
              Your beauty order has been placed successfully. We'll notify you when it ships.
            </p>
          </motion.div>

          {/* Order Reference */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#FFD2DB]/40 p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm text-[#8B7A8C]">Order Reference</p>
                <p className="text-xl font-bold text-[#EE4275]" style={{ fontFamily: '"Playfair Display"' }}>
                  #{order.orderNumber || order._id.slice(-8).toUpperCase()}
                </p>
                <p className="text-xs text-[#8B7A8C]">
                  Placed on {new Date(order.createdAt).toLocaleDateString('en-BD', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div className="flex gap-2 flex-wrap justify-center">
                <button
                  onClick={downloadPDF}
                  disabled={pdfLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-[#FFF5F6] text-[#EE4275] rounded-xl hover:bg-[#FFD2DB]/30 transition-colors border border-[#FFD2DB]/50 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {pdfLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#EE4275] border-t-transparent rounded-full animate-spin"></span>
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
            </div>
          </div>

          {/* Tracking Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#FFD2DB]/40 p-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#EE4275] to-[#FF6B9D] rounded-full flex items-center justify-center flex-shrink-0">
                <FaTruck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#2D1B2E]" style={{ fontFamily: '"Playfair Display"' }}>
                  Track Your Order
                </h2>
                <p className="text-xs text-[#8B7A8C]">
                  You can track your order status using your phone number
                </p>
              </div>
              <Link
                href="/track"
                className="ml-auto flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-xl hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all text-sm whitespace-nowrap"
              >
                <FaSearch className="w-4 h-4" />
                Track Order
              </Link>
            </div>
          </div>

          {/* Order Details - Invoice */}
          <div ref={invoiceRef} className="bg-white rounded-2xl shadow-sm border border-[#FFD2DB]/40 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-[#2D1B2E] flex items-center gap-2" style={{ fontFamily: '"Playfair Display"' }}>
                <FaFileInvoice className="w-5 h-5 text-[#EE4275]" />
                Order Details
              </h2>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                isCancelled ? 'bg-red-100 text-red-600' :
                order.orderStatus === 'delivered' ? 'bg-green-100 text-green-600' :
                'bg-[#FFF5F6] text-[#EE4275] border border-[#FFD2DB]/30'
              }`}>
                {order.orderStatus.toUpperCase()}
              </span>
            </div>

            {/* Status Timeline */}
            {!isCancelled && (
              <div className="mb-6">
                <div className="relative">
                  <div className="flex items-center justify-between">
                    {statusSteps.map((step, index) => {
                      const isCompleted = index <= currentStepIndex;
                      const isCurrent = index === currentStepIndex;
                      const labels = {
                        'placed': 'Placed',
                        'confirmed': 'Confirmed',
                        'processing': 'Processing',
                        'shipped': 'Shipped',
                        'delivered': 'Delivered'
                      };
                      
                      return (
                        <div key={step} className="flex flex-col items-center flex-1 relative">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                            isCompleted ? 'bg-[#EE4275] text-white' : 'bg-[#FFF5F6] text-[#C4B5C5] border border-[#FFD2DB]/30'
                          } ${isCurrent ? 'ring-4 ring-[#FFD2DB]/50' : ''}`}>
                            {index + 1}
                          </div>
                          <span className="text-[10px] mt-1 text-[#8B7A8C]">{labels[step]}</span>
                          {index < statusSteps.length - 1 && (
                            <div className={`absolute top-4 left-[60%] w-[80%] h-0.5 ${
                              index < currentStepIndex ? 'bg-[#EE4275]' : 'bg-[#FFD2DB]/50'
                            }`} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Customer & Delivery Info - Detailed */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Customer Info */}
              <div className="p-4 bg-[#FFF5F6]/50 rounded-xl border border-[#FFD2DB]/20">
                <p className="text-xs text-[#EE4275] uppercase tracking-wider font-bold mb-3">Customer Information</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-[#8B7A8C]">Full Name</p>
                    <p className="font-medium text-[#2D1B2E] text-sm">{order.customerInfo.fullName}</p>
                  </div>
                  {order.customerInfo.email && (
                    <div>
                      <p className="text-xs text-[#8B7A8C]">Email</p>
                      <p className="text-sm text-[#2D1B2E]">{order.customerInfo.email}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-[#8B7A8C]">Phone</p>
                    <p className="text-sm text-[#2D1B2E]">{order.customerInfo.phone}</p>
                  </div>
                    <div>
                    <p className="text-xs text-[#8B7A8C]">Full Address</p>
                    <p className="text-sm text-[#2D1B2E]">{order.customerInfo.address}</p>
                  </div>
                </div>
              </div>

              {/* Delivery Address - Detailed */}
              <div className="p-4 bg-[#FFF5F6]/50 rounded-xl border border-[#FFD2DB]/20">
                <p className="text-xs text-[#EE4275] uppercase tracking-wider font-bold mb-3">Delivery Address</p>
                <div className="space-y-2">
                
                  {order.customerInfo.area && (
                    <div>
                      <p className="text-xs text-[#8B7A8C]">Area/Union</p>
                      <p className="text-sm text-[#2D1B2E]">{order.customerInfo.area}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-[#8B7A8C]">Upazila/Thana</p>
                    <p className="text-sm text-[#2D1B2E]">{order.customerInfo.zone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#8B7A8C]">District/City</p>
                    <p className="text-sm text-[#2D1B2E]">{order.customerInfo.city}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#8B7A8C]">Division</p>
                    <p className="text-sm text-[#2D1B2E]">{order.customerInfo.division}</p>
                  </div>
                  {order.customerInfo.zipCode && (
                    <div>
                      <p className="text-xs text-[#8B7A8C]">Zip Code</p>
                      <p className="text-sm text-[#2D1B2E]">{order.customerInfo.zipCode}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 p-3 bg-[#FFF5F6]/20 rounded-lg border border-[#FFD2DB]/10">
              <div>
                <p className="text-[10px] text-[#8B7A8C] uppercase tracking-wider">Order ID</p>
                <p className="text-sm font-mono font-bold text-[#EE4275]">
                  {order.orderNumber || order._id.slice(-8).toUpperCase()}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-[#8B7A8C] uppercase tracking-wider">Date</p>
                <p className="text-sm font-medium text-[#2D1B2E]">
                  {new Date(order.createdAt).toLocaleDateString('en-BD')}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-[#8B7A8C] uppercase tracking-wider">Payment</p>
                <p className="text-sm font-medium text-[#2D1B2E] capitalize">{order.paymentMethod}</p>
              </div>
              <div>
                <p className="text-[10px] text-[#8B7A8C] uppercase tracking-wider">Status</p>
                <p className="text-sm font-medium text-[#2D1B2E] capitalize">{order.orderStatus}</p>
              </div>
            </div>

            {/* Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#FFD2DB]/30">
                    <th className="text-left py-2 px-2 text-[#8B7A8C] font-medium">#</th>
                    <th className="text-left py-2 px-2 text-[#8B7A8C] font-medium">Product</th>
                    <th className="text-center py-2 px-2 text-[#8B7A8C] font-medium">Qty</th>
                    <th className="text-center py-2 px-2 text-[#8B7A8C] font-medium">Unit</th>
                    <th className="text-right py-2 px-2 text-[#8B7A8C] font-medium">Price</th>
                    <th className="text-right py-2 px-2 text-[#8B7A8C] font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => {
                    const price = item.discountPrice || item.regularPrice;
                    return (
                      <tr key={index} className="border-b border-[#FFD2DB]/20">
                        <td className="py-2 px-2 text-[#8B7A8C]">{index + 1}</td>
                        <td className="py-2 px-2 text-[#2D1B2E]">
                          <div className="flex items-center gap-2">
                            {item.image && (
                              <img 
                                src={item.image} 
                                alt={item.productName}
                                className="w-8 h-8 rounded object-cover border border-[#FFD2DB]/30"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/32?text=Product'; }}
                              />
                            )}
                            <span>{item.productName}</span>
                          </div>
                        </td>
                        <td className="text-center py-2 px-2 text-[#2D1B2E]">{item.quantity}</td>
                        <td className="text-center py-2 px-2 text-[#8B7A8C]">{item.unit || 'pcs'}</td>
                        <td className="text-right py-2 px-2 text-[#2D1B2E]">৳{price.toFixed(2)}</td>
                        <td className="text-right py-2 px-2 font-medium text-[#EE4275]">৳{(price * item.quantity).toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t border-[#FFD2DB]/30">
                    <td colSpan="4" className="py-2 px-2"></td>
                    <td className="text-right py-2 px-2 text-[#8B7A8C]">Subtotal:</td>
                    <td className="text-right py-2 px-2 font-medium">৳{order.subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="py-1 px-2"></td>
                    <td className="text-right py-1 px-2 text-[#8B7A8C]">Shipping:</td>
                    <td className="text-right py-1 px-2 font-medium">৳{order.shippingCost.toFixed(2)}</td>
                  </tr>
                  {order.discount > 0 && (
                    <tr>
                      <td colSpan="4" className="py-1 px-2"></td>
                      <td className="text-right py-1 px-2 text-green-600">Discount:</td>
                      <td className="text-right py-1 px-2 font-medium text-green-600">-৳{order.discount.toFixed(2)}</td>
                    </tr>
                  )}
                  <tr className="border-t-2 border-[#EE4275]">
                    <td colSpan="4" className="py-2 px-2"></td>
                    <td className="text-right py-2 px-2 font-bold text-[#2D1B2E]">Total:</td>
                    <td className="text-right py-2 px-2 font-bold text-[#EE4275] text-lg">৳{order.total.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Payment Info */}
            <div className="mt-4 pt-4 border-t border-[#FFD2DB]/30 flex flex-col sm:flex-row justify-between text-sm">
              <div>
                <span className="text-[#8B7A8C]">Payment Method: </span>
                <span className="font-medium text-[#2D1B2E] capitalize">{order.paymentMethod}</span>
              </div>
              <div>
                <span className="text-[#8B7A8C]">Payment Status: </span>
                <span className={`font-medium ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-[#EE4275]'}`}>
                  {order.paymentStatus.toUpperCase()}
                </span>
              </div>
            </div>

            {order.customerInfo.note && (
              <div className="mt-4 p-3 bg-[#FFF5F6]/30 rounded-xl border border-[#FFD2DB]/20">
                <p className="text-xs text-[#8B7A8C]">Order Note</p>
                <p className="text-sm text-[#2D1B2E]">{order.customerInfo.note}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#EE4275] to-[#FF6B9D] text-white rounded-xl hover:shadow-lg hover:shadow-[#EE4275]/25 transition-all">
              <FaHome className="w-4 h-4" />
              Continue Shopping
            </Link>
            {/* <Link href="/products" className="flex items-center justify-center gap-2 px-6 py-3 border border-[#FFD2DB]/50 text-[#8B7A8C] rounded-xl hover:bg-white transition-colors">
              <FaStore className="w-4 h-4" />
              Browse More Products
            </Link> */}
          </div>

          {/* Support Info */}
          <div className="mt-6 text-center text-sm text-[#8B7A8C]">
            <p>Need help? Contact our support team</p>
            <div className="flex items-center justify-center gap-4 mt-2">
              <a href="tel:+8801305785685" className="flex items-center gap-1 text-[#EE4275] hover:underline">
                <FaPhone className="w-3 h-3" />
                Call Us
              </a>
              <a href="mailto:support@beautyboutique.com" className="flex items-center gap-1 text-[#EE4275] hover:underline">
                <FaEnvelope className="w-3 h-3" />
                Email Us
              </a>
              <a href="https://wa.me/8801305785685" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#EE4275] hover:underline">
                <FaWhatsapp className="w-3 h-3" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}