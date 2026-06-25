// app/track/page.js - Updated with Gadget Site Design

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, 
  FaPhone, 
  FaBox, 
  FaClock, 
  FaCheckCircle, 
  FaTruck, 
  FaMapMarkerAlt, 
  FaShoppingBag,
  FaChevronDown,
  FaChevronUp,
  FaMoneyBillWave,
  FaCreditCard,
  FaExclamationTriangle,
  FaShippingFast,
  FaCheckDouble,
  FaBan,
  FaSpinner,
  FaGift,
  FaUser,
  FaCalendarAlt
} from 'react-icons/fa';
import { toast } from 'sonner';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';


const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Status configuration with gadget theme
const STATUS_CONFIG = {
  'placed': { 
    label: 'Order Placed', 
    icon: FaBox, 
    color: 'bg-blue-500', 
    textColor: 'text-blue-600', 
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  'confirmed': { 
    label: 'Order Confirmed', 
    icon: FaCheckCircle, 
    color: 'bg-cyan-500', 
    textColor: 'text-cyan-600', 
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200'
  },
  'processing': { 
    label: 'Processing', 
    icon: FaSpinner, 
    color: 'bg-purple-500', 
    textColor: 'text-purple-600', 
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  'shipped': { 
    label: 'Shipped', 
    icon: FaShippingFast, 
    color: 'bg-indigo-500', 
    textColor: 'text-indigo-600', 
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200'
  },
  'out_for_delivery': { 
    label: 'Out for Delivery', 
    icon: FaTruck, 
    color: 'bg-orange-500', 
    textColor: 'text-orange-600', 
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  'delivered': { 
    label: 'Delivered', 
    icon: FaCheckDouble, 
    color: 'bg-green-500', 
    textColor: 'text-green-600', 
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  'cancelled': { 
    label: 'Cancelled', 
    icon: FaBan, 
    color: 'bg-red-500', 
    textColor: 'text-red-600', 
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  'refunded': { 
    label: 'Refunded', 
    icon: FaBan, 
    color: 'bg-yellow-500', 
    textColor: 'text-yellow-600', 
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200'
  },
  'failed': { 
    label: 'Failed', 
    icon: FaExclamationTriangle, 
    color: 'bg-red-500', 
    textColor: 'text-red-600', 
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  }
};

const STATUS_ORDER = ['placed', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered'];

// Payment method badge
const getPaymentMethodBadge = (method) => {
  const methods = {
    'cod': { label: 'Cash on Delivery', color: 'bg-orange-100 text-orange-700', icon: FaMoneyBillWave },
    'online': { label: 'Online Payment', color: 'bg-blue-100 text-blue-700', icon: FaCreditCard },
    'bkash': { label: 'bKash', color: 'bg-pink-100 text-pink-700', icon: FaMoneyBillWave },
    'nagad': { label: 'Nagad', color: 'bg-purple-100 text-purple-700', icon: FaMoneyBillWave }
  };
  const info = methods[method] || { label: method || 'Unknown', color: 'bg-gray-100 text-gray-700', icon: FaMoneyBillWave };
  const Icon = info.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${info.color}`}>
      <Icon className="w-3 h-3" />
      {info.label}
    </span>
  );
};

// Get status color for badge
const getStatusBadgeColor = (status) => {
  const colors = {
    'placed': 'text-blue-600 bg-blue-50 border-blue-200',
    'confirmed': 'text-cyan-600 bg-cyan-50 border-cyan-200',
    'processing': 'text-purple-600 bg-purple-50 border-purple-200',
    'shipped': 'text-indigo-600 bg-indigo-50 border-indigo-200',
    'out_for_delivery': 'text-orange-600 bg-orange-50 border-orange-200',
    'delivered': 'text-green-600 bg-green-50 border-green-200',
    'cancelled': 'text-red-600 bg-red-50 border-red-200',
    'refunded': 'text-yellow-600 bg-yellow-50 border-yellow-200',
    'failed': 'text-red-600 bg-red-50 border-red-200'
  };
  return colors[status] || 'text-gray-600 bg-gray-50 border-gray-200';
};

// Get status label
const getStatusLabel = (status) => {
  return STATUS_CONFIG[status]?.label || status;
};

// Order Card Component
const OrderCard = ({ order, index }) => {
  const [expanded, setExpanded] = useState(false);
  const statusInfo = STATUS_CONFIG[order.orderStatus] || STATUS_CONFIG['placed'];
  const StatusIcon = statusInfo.icon;

  // Calculate progress percentage
  const getProgress = () => {
    if (order.orderStatus === 'cancelled' || order.orderStatus === 'refunded') return 0;
    const currentIndex = STATUS_ORDER.indexOf(order.orderStatus);
    return ((currentIndex + 1) / STATUS_ORDER.length) * 100;
  };

  const isCancelled = order.orderStatus === 'cancelled' || order.orderStatus === 'refunded';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      {/* Order Header */}
      <div 
        className="p-4 sm:p-5 cursor-pointer hover:bg-gray-50/50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Left: Icon + Order Info */}
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-10 h-10 rounded-full ${statusInfo.bgColor} flex items-center justify-center flex-shrink-0`}>
              <StatusIcon className={`w-5 h-5 ${statusInfo.textColor}`} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500 font-mono truncate">#{order.orderNumber}</p>
              <p className="text-sm font-semibold text-gray-900">
                {new Date(order.createdAt).toLocaleDateString('en-BD', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
          
          {/* Right: Price + Status + Toggle */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="text-right">
              <p className="text-sm font-bold text-blue-600">৳{order.total?.toFixed(2)}</p>
              <p className="text-[10px] text-gray-400">{order.items?.length || 0} items</p>
            </div>
            <div className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(order.orderStatus)}`}>
              {getStatusLabel(order.orderStatus)}
            </div>
            {expanded ? (
              <FaChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
            ) : (
              <FaChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
            )}
          </div>
        </div>

        {/* Progress Bar - Active orders only */}
        {!isCancelled && (
          <div className="mt-3">
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-700"
                style={{ width: `${getProgress()}%` }}
              />
            </div>
            <div className="flex justify-between mt-0.5">
              <span className="text-[8px] text-gray-400">Placed</span>
              <span className="text-[8px] text-gray-400">Delivered</span>
            </div>
          </div>
        )}

        {/* Cancelled/Refunded badge */}
        {isCancelled && (
          <div className="mt-2">
            <span className="text-[10px] text-red-500 font-medium">
              {order.orderStatus === 'cancelled' ? '❌ Order Cancelled' : '↩️ Order Refunded'}
            </span>
          </div>
        )}
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 border-t border-gray-100 space-y-4">
              {/* Payment & Tracking Info */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Payment:</span>
                  {getPaymentMethodBadge(order.paymentMethod)}
                </div>
                {order.trackingNumber && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Tracking:</span>
                    <span className="text-xs font-mono text-blue-600">{order.trackingNumber}</span>
                  </div>
                )}
              </div>

              {/* Order Items */}
              <div>
                <h4 className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-2">
                  <FaShoppingBag className="w-3 h-3 text-blue-500" />
                  Order Items ({order.items?.length || 0})
                </h4>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 py-1.5 border-b border-gray-100 last:border-0">
                      <img 
                        src={item.image || 'https://via.placeholder.com/40'} 
                        alt={item.name}
                        className="w-8 h-8 rounded-lg object-cover flex-shrink-0 bg-gray-100"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=Toy'; }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-800 truncate">{item.name}</p>
                        <p className="text-[10px] text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-xs font-bold text-blue-600">৳{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                
                {/* Order Summary */}
                <div className="mt-2 pt-2 border-t border-gray-200 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span>৳{order.subtotal?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    <span>৳{order.shippingCost?.toFixed(2)}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>- ৳{order.discount?.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-blue-600 pt-1 border-t border-gray-200 mt-1">
                    <span>Total</span>
                    <span>৳{order.total?.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              {order.timeline && order.timeline.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-2">
                    <FaClock className="w-3 h-3 text-blue-500" />
                    Status History
                  </h4>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto pr-2">
                    {order.timeline.map((entry, idx) => {
                      const entryStatusInfo = STATUS_CONFIG[entry.status] || STATUS_CONFIG['placed'];
                      const EntryIcon = entryStatusInfo.icon;
                      const isCurrent = entry.status === order.orderStatus;
                      
                      return (
                        <div key={idx} className="flex items-start gap-2.5">
                          <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                            isCurrent ? 'bg-blue-500 ring-2 ring-blue-200' : 'bg-gray-300'
                          }`} />
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className={`text-xs font-medium ${isCurrent ? 'text-blue-600' : 'text-gray-700'}`}>
                                {entry.label || entry.status}
                              </span>
                              <span className="text-[9px] text-gray-400">{entry.formattedDate}</span>
                            </div>
                            {entry.note && (
                              <p className="text-[10px] text-gray-500">{entry.note}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function TrackPage() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [trackingData, setTrackingData] = useState(null);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!phone.trim()) {
      toast.error('Please enter a phone number');
      return;
    }
    
    const phoneRegex = /^01[3-9]\d{8}$/;
    if (!phoneRegex.test(phone.trim())) {
      toast.error('Please enter a valid Bangladesh phone number (01XXXXXXXXX)');
      return;
    }
    
    setLoading(true);
    setError(null);
    setSearched(true);
    
    try {
      const response = await fetch(`${API_URL}/api/orders/track/${phone.trim()}`);
      const data = await response.json();
      
      if (data.success) {
        setTrackingData(data.data);
        toast.success(`Found ${data.data.totalOrders} order(s)`);
      } else {
        setError(data.error || 'No orders found for this phone number');
        setTrackingData(null);
      }
    } catch (error) {
      console.error('Track error:', error);
      setError('Network error. Please try again.');
      setTrackingData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50 pt-12 lg:pt-10 pb-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full mb-3 shadow-lg">
              <FaTruck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Track Your Orders
            </h1>
            <p className="text-sm text-gray-500 mt-1">Enter your phone number to see all your orders</p>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm mb-6 sm:mb-8">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number (01XXXXXXXXX)"
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm sm:text-base"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base shadow-sm"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <FaSearch className="w-4 h-4" />
                    Track Orders
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaExclamationTriangle className="w-4 h-4 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-red-700 font-medium">No Orders Found</p>
                  <p className="text-xs text-red-600">{error}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results */}
          {trackingData && (
            <div className="space-y-4">
              {/* Summary Banner */}
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-4 text-white shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-white/80">Phone Number</p>
                    <p className="text-lg font-bold">{trackingData.phone}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/80">Total Orders</p>
                    <p className="text-2xl font-bold">{trackingData.totalOrders}</p>
                  </div>
                </div>
              </div>

              {/* Order Cards */}
              <div className="space-y-3">
                {trackingData.orders.map((order, index) => (
                  <OrderCard key={order.orderNumber || index} order={order} index={index} />
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="text-center pt-4">
                <Link href="/products" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium">
                  <span>←</span> Continue Shopping
                </Link>
              </div>
            </div>
          )}

          {/* Not Found / Initial State */}
          {!trackingData && !error && !loading && searched && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl border border-gray-200 p-8 sm:p-12 text-center shadow-sm"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <FaSearch className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Orders Found</h3>
              <p className="text-sm text-gray-500">We couldn't find any orders with this phone number.</p>
              <p className="text-xs text-gray-400 mt-2">Please check the number and try again.</p>
            </motion.div>
          )}

          {/* Help Section */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-xs text-gray-400">Need help? Contact our support team</p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
              <a href="tel:+8801712345678" className="text-sm text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1">
                📞 +880 1XXXXXXXXX
              </a>
              <span className="text-gray-300 hidden sm:inline">|</span>
              <a href="mailto:support@gadgetshop.com" className="text-sm text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1">
                ✉️ support@smartproductbuy.com
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />

    </>
  );
}