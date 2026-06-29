'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { FaTruck, FaSave, FaSpinner, FaMapMarkerAlt, FaUserShield } from 'react-icons/fa';
import { Sparkles, Heart, Store, Shield, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ModeratorDeliverySettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    insideDhaka: '',
    outsideDhaka: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState(null);
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    checkUserPermission();
    fetchSettings();
  }, []);

  const checkUserPermission = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      toast.error('Please login to access this page');
      router.push('/login');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Allow both admin and moderator to edit
      if (parsedUser.role === 'admin' || parsedUser.role === 'moderator') {
        setCanEdit(true);
      } else {
        // Regular users cannot access
        toast.error('Access denied. Admin or moderator privileges required.');
        router.push('/');
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/login');
    }
  };

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/delivery/settings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (result.success) {
        setSettings({
          insideDhaka: result.data.insideDhaka,
          outsideDhaka: result.data.outsideDhaka
        });
      } else {
        toast.error('Failed to load delivery settings');
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!canEdit) {
      toast.error('You do not have permission to edit delivery settings');
      return;
    }
    
    // Validate that both fields have values
    if (!settings.insideDhaka && !settings.outsideDhaka) {
      toast.error('Please enter delivery charges');
      return;
    }
    
    setSaving(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/delivery/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          insideDhaka: settings.insideDhaka || 0,
          outsideDhaka: settings.outsideDhaka || 0
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success('Delivery settings updated successfully');
      } else {
        toast.error(result.error || 'Failed to update settings');
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Network error');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    if (!canEdit) return;
    
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value === '' ? '' : parseInt(value)
    }));
  };

  const handleBlur = (e) => {
    if (!canEdit) return;
    
    const { name, value } = e.target;
    if (value === '' || value === null) {
      setSettings(prev => ({
        ...prev,
        [name]: 0
      }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-gradient-to-br from-pink-50/50 via-white to-rose-50/30">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading delivery settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/50 via-white to-rose-50/30 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header with Role Badge */}
        <div className="flex items-center justify-between mb-6 pt-2 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl shadow-md">
              <FaTruck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Delivery Charge Settings
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">Configure shipping costs for different zones</p>
            </div>
            <Sparkles className="w-5 h-5 text-pink-400 ml-auto" />
          </div>
          
          {/* Role Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-pink-50/50 to-rose-50/50 rounded-full border border-pink-200">
            <FaUserShield className="w-4 h-4 text-pink-500" />
            <span className="text-sm font-medium text-gray-700">
              Role: {user?.role === 'admin' ? 'Administrator' : 'Moderator'}
            </span>
            {canEdit && (
              <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full ml-2 border border-green-200">
                <CheckCircle className="w-3 h-3" />
                Can Edit
              </span>
            )}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-pink-100 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-pink-500 to-rose-500">
            <div>
              <h2 className="text-white text-lg font-semibold flex items-center gap-2">
                <FaTruck className="w-5 h-5" />
                Configure Shipping Costs
              </h2>
              <p className="text-white/80 text-sm mt-1">Set delivery charges for different zones</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Inside Dhaka */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <div className="p-1.5 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
                  <FaMapMarkerAlt className="w-4 h-4 text-green-600" />
                </div>
                Inside Dhaka City
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500 font-semibold">৳</span>
                <input
                  type="number"
                  name="insideDhaka"
                  value={settings.insideDhaka === 0 ? '' : settings.insideDhaka}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onWheel={(e) => e.target.blur()}
                  min="0"
                  step="10"
                  placeholder="Enter delivery charge for Dhaka"
                  className="w-full pl-8 pr-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all bg-pink-50/30 hover:bg-white"
                />
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-green-400"></span>
                Delivery charge for addresses within Dhaka city
              </p>
            </div>

            {/* Outside Dhaka */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <div className="p-1.5 bg-gradient-to-r from-orange-100 to-amber-100 rounded-lg">
                  <FaTruck className="w-4 h-4 text-orange-600" />
                </div>
                Outside Dhaka (Other Districts)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500 font-semibold">৳</span>
                <input
                  type="number"
                  name="outsideDhaka"
                  value={settings.outsideDhaka === 0 ? '' : settings.outsideDhaka}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onWheel={(e) => e.target.blur()}
                  min="0"
                  step="10"
                  placeholder="Enter delivery charge for outside Dhaka"
                  className="w-full pl-8 pr-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all bg-pink-50/30 hover:bg-white"
                />
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-orange-400"></span>
                Delivery charge for addresses outside Dhaka city
              </p>
            </div>

            {/* Preview Section */}
            <div className="bg-gradient-to-r from-pink-50/50 to-rose-50/50 rounded-lg p-4 border border-pink-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-pink-500" />
                Preview
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-white/50 rounded-lg border border-pink-100">
                  <span className="text-gray-600 flex items-center gap-2">
                    <FaMapMarkerAlt className="w-3.5 h-3.5 text-green-500" />
                    Inside Dhaka:
                  </span>
                  <span className="font-semibold text-green-600">৳{settings.insideDhaka || 0}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white/50 rounded-lg border border-pink-100">
                  <span className="text-gray-600 flex items-center gap-2">
                    <FaTruck className="w-3.5 h-3.5 text-orange-500" />
                    Outside Dhaka:
                  </span>
                  <span className="font-semibold text-orange-600">৳{settings.outsideDhaka || 0}</span>
                </div>
              </div>
            </div>

            {/* Last Updated Info */}
            <div className="text-xs text-gray-400 text-center flex items-center justify-center gap-1">
              <span className="w-1 h-1 rounded-full bg-pink-400"></span>
              Settings are applied to all new orders automatically
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:shadow-lg hover:shadow-pink-200/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md font-medium"
              >
                {saving ? (
                  <>
                    <FaSpinner className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave className="w-4 h-4" />
                    Save Settings
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}