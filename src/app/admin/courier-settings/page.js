// // D:\Smart-Gadget\Gadget-frontend\src\components\dashboard\orders\CourierSettings.jsx

// "use client";

// import { useState, useEffect } from 'react';
// import { toast } from 'sonner';
// import { 
//   FaEdit, 
//   FaSave, 
//   FaCheckCircle, 
//   FaTimesCircle, 
//   FaSpinner, 
//   FaTruck,
//   FaTimes
// } from 'react-icons/fa';

// const CREDENTIAL_FIELDS = {
//   pathao: [
//     { name: 'clientId', label: 'Client ID', type: 'text' },
//     { name: 'clientSecret', label: 'Client Secret', type: 'password' },
//     { name: 'username', label: 'Username', type: 'text' },
//     { name: 'password', label: 'Password', type: 'password' },
//     { name: 'storeId', label: 'Store ID', type: 'text' }
//   ],
//   steadfast: [
//     { name: 'apiKey', label: 'API Key', type: 'text' },
//     { name: 'secretKey', label: 'Secret Key', type: 'password' },
//     { name: 'storeId', label: 'Store ID', type: 'text' }
//   ]
// };

// export default function CourierSettings() {
//   const [couriers, setCouriers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editingCourier, setEditingCourier] = useState(null);
//   const [credentials, setCredentials] = useState({});
//   const [storeConfig, setStoreConfig] = useState({});
//   const [apiEnabled, setApiEnabled] = useState(false);
//   const [testing, setTesting] = useState({});
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     fetchCouriers();
//   }, []);

//   const fetchCouriers = async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const token = localStorage.getItem('token');
//       console.log('🔑 Token:', token ? 'Present' : 'Missing');
      
//       if (!token) {
//         setError('Please login as admin to access courier settings');
//         setLoading(false);
//         return;
//       }

//       const response = await fetch('http://localhost:5000/api/admin/couriers', {
//         headers: { 
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       console.log('📡 Response status:', response.status);
      
//       const data = await response.json();
//       console.log('📦 Response data:', data);

//       if (response.status === 401) {
//         setError('Session expired. Please login again.');
//         setLoading(false);
//         return;
//       }

//       if (response.status === 403) {
//         setError('You need admin access to view courier settings.');
//         setLoading(false);
//         return;
//       }

//       if (data.success) {
//         console.log('✅ Couriers loaded:', data.data?.length || 0);
//         setCouriers(data.data || []);
//       } else {
//         setError(data.error || 'Failed to fetch couriers');
//         toast.error(data.error || 'Failed to fetch couriers');
//       }
//     } catch (error) {
//       console.error('❌ Fetch couriers error:', error);
//       setError('Network error. Please check your connection.');
//       toast.error('Network error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ HANDLE EDIT - This function was missing
//   const handleEdit = (courier) => {
//     setEditingCourier(courier);
//     setApiEnabled(courier.apiEnabled || false);
//     setCredentials({});
//     setStoreConfig(courier.storeConfig || {});
//   };

//   // ✅ HANDLE SAVE - This function was missing
//   const handleSave = async (courierId) => {
//     setSaving(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/admin/couriers/${courierId}/integration`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           apiEnabled,
//           credentials,
//           storeConfig
//         })
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success('Courier settings saved successfully');
//         setEditingCourier(null);
//         fetchCouriers();
//       } else {
//         toast.error(data.error || 'Failed to save settings');
//       }
//     } catch (error) {
//       console.error('Save courier error:', error);
//       toast.error('Network error');
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ✅ HANDLE TEST - This function was missing
//   const handleTest = async (courier) => {
//     setTesting(prev => ({ ...prev, [courier.slug]: true }));
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/admin/couriers/${courier._id}/test-connection`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success(data.message || 'Connection test successful');
//       } else {
//         toast.error(data.error || 'Connection test failed');
//       }
//       fetchCouriers();
//     } catch (error) {
//       console.error('Test courier error:', error);
//       toast.error('Network error');
//     } finally {
//       setTesting(prev => ({ ...prev, [courier.slug]: false }));
//     }
//   };

//   // ✅ HANDLE CANCEL EDIT
//   const handleCancelEdit = () => {
//     setEditingCourier(null);
//     setCredentials({});
//     setApiEnabled(false);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-20">
//         <FaSpinner className="w-8 h-8 animate-spin text-[#4A8A90]" />
//         <span className="ml-3 text-gray-500">Loading courier settings...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
//         <FaTimesCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
//         <h3 className="text-lg font-semibold text-red-700 mb-2">Error Loading Settings</h3>
//         <p className="text-red-600">{error}</p>
//         <button 
//           onClick={fetchCouriers}
//           className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   if (couriers.length === 0) {
//     return (
//       <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
//         <FaTruck className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
//         <h3 className="text-lg font-semibold text-yellow-700 mb-2">No Courier Services Found</h3>
//         <p className="text-yellow-600">Please run the courier seed script to add courier services.</p>
//         <button 
//           onClick={fetchCouriers}
//           className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
//         >
//           Refresh
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
//           <FaTruck className="text-[#4A8A90]" />
//           Courier Service Settings
//           <span className="text-sm font-normal text-gray-400 ml-2">
//             ({couriers.length} services)
//           </span>
//         </h2>
//         <button
//           onClick={fetchCouriers}
//           className="px-3 py-1 text-sm text-[#4A8A90] border border-[#4A8A90] rounded-lg hover:bg-[#4A8A90] hover:text-white transition-colors"
//         >
//           Refresh
//         </button>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {couriers.map((courier) => {
//           const isEditing = editingCourier?._id === courier._id;
//           const fields = CREDENTIAL_FIELDS[courier.slug] || [];
//           const isTesting = testing[courier.slug];

//           return (
//             <div key={courier._id} className="bg-white rounded-xl border-2 border-[#FFE0E6] p-5 shadow-md">
//               <div className="flex items-start justify-between mb-4">
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-900">{courier.name}</h3>
//                   <div className="flex items-center gap-2 mt-1 flex-wrap">
//                     <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
//                       courier.apiEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
//                     }`}>
//                       {courier.apiEnabled ? 'Active' : 'Inactive'}
//                     </span>
//                     {courier.integrationStatus?.lastTestOk ? (
//                       <span className="text-green-600 text-xs flex items-center gap-1">
//                         <FaCheckCircle className="w-3 h-3" /> Connected
//                       </span>
//                     ) : courier.integrationStatus?.lastTestedAt ? (
//                       <span className="text-red-600 text-xs flex items-center gap-1">
//                         <FaTimesCircle className="w-3 h-3" /> Failed
//                       </span>
//                     ) : null}
//                     {courier.configured ? (
//                       <span className="text-blue-600 text-xs flex items-center gap-1">
//                         <FaCheckCircle className="w-3 h-3" /> Configured
//                       </span>
//                     ) : (
//                       <span className="text-gray-400 text-xs">Not configured</span>
//                     )}
//                   </div>
//                 </div>
//                 {!isEditing && (
//                   <button
//                     onClick={() => handleEdit(courier)}
//                     className="p-2 text-gray-500 hover:text-[#4A8A90] hover:bg-gray-100 rounded-lg transition-colors"
//                     title="Edit settings"
//                   >
//                     <FaEdit className="w-4 h-4" />
//                   </button>
//                 )}
//               </div>

//               {isEditing ? (
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       id={`api-enabled-${courier.slug}`}
//                       checked={apiEnabled}
//                       onChange={(e) => setApiEnabled(e.target.checked)}
//                       className="w-4 h-4 rounded border-gray-300 text-[#4A8A90] focus:ring-[#4A8A90]"
//                     />
//                     <label htmlFor={`api-enabled-${courier.slug}`} className="text-sm font-medium text-gray-700">
//                       Enable API Integration
//                     </label>
//                   </div>

//                   <div className="space-y-3">
//                     {fields.map((field) => (
//                       <div key={field.name}>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           {field.label}
//                         </label>
//                         <input
//                           type={field.type}
//                           value={credentials[field.name] || ''}
//                           onChange={(e) => setCredentials(prev => ({
//                             ...prev,
//                             [field.name]: e.target.value
//                           }))}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
//                           placeholder={`Enter ${field.label}`}
//                         />
//                       </div>
//                     ))}
//                   </div>

//                   <div className="flex gap-2 pt-2">
//                     <button
//                       onClick={() => handleSave(courier._id)}
//                       disabled={saving}
//                       className="flex-1 px-4 py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] disabled:opacity-50 flex items-center justify-center gap-2"
//                     >
//                       {saving ? (
//                         <>
//                           <FaSpinner className="w-4 h-4 animate-spin" />
//                           Saving...
//                         </>
//                       ) : (
//                         <>
//                           <FaSave className="w-4 h-4" />
//                           Save
//                         </>
//                       )}
//                     </button>
//                     <button
//                       onClick={handleCancelEdit}
//                       className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
//                     >
//                       <FaTimes className="w-4 h-4" />
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div>
//                   <button
//                     onClick={() => handleTest(courier)}
//                     disabled={isTesting || !courier.configured}
//                     className="mt-3 px-4 py-2 border border-[#4A8A90] text-[#4A8A90] rounded-lg hover:bg-[#4A8A90] hover:text-white transition-colors disabled:opacity-50 flex items-center gap-2"
//                   >
//                     {isTesting ? (
//                       <>
//                         <FaSpinner className="w-4 h-4 animate-spin" />
//                         Testing...
//                       </>
//                     ) : (
//                       'Test Connection'
//                     )}
//                   </button>
                  
//                   {courier.integrationStatus?.lastTestedAt && (
//                     <p className="text-xs text-gray-400 mt-2">
//                       Last tested: {new Date(courier.integrationStatus.lastTestedAt).toLocaleString()}
//                       <br />
//                       Status: {courier.integrationStatus.lastTestMessage || 'Unknown'}
//                     </p>
//                   )}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// D:\Smart-Gadget\Gadget-frontend\src\app\admin\courier-settings\page.js

"use client";

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  FaEdit, 
  FaSave, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaSpinner, 
  FaTruck,
  FaTimes
} from 'react-icons/fa';

// ✅ CORRECT: Different credential fields for each courier
const CREDENTIAL_FIELDS = {
  pathao: [
    { name: 'clientId', label: 'Client ID', type: 'text' },
    { name: 'clientSecret', label: 'Client Secret', type: 'password' },
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'password', label: 'Password', type: 'password' },
  ],
  steadfast: [
    { name: 'apiKey', label: 'API Key', type: 'text' },
    { name: 'secretKey', label: 'Secret Key', type: 'password' },
  ],
  redx: [
    { name: 'phone', label: 'Phone', type: 'text' },
    { name: 'password', label: 'Password', type: 'password' },
  ]
};

export default function CourierSettingsPage() {
  const [couriers, setCouriers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCourier, setEditingCourier] = useState(null);
  const [credentials, setCredentials] = useState({});
  const [storeConfig, setStoreConfig] = useState({});
  const [apiEnabled, setApiEnabled] = useState(false);
  const [testing, setTesting] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCouriers();
  }, []);

  const fetchCouriers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Please login as admin to access courier settings');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:5000/api/admin/couriers', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.status === 401) {
        setError('Session expired. Please login again.');
        setLoading(false);
        return;
      }

      if (response.status === 403) {
        setError('You need admin access to view courier settings.');
        setLoading(false);
        return;
      }

      if (data.success) {
        setCouriers(data.data || []);
      } else {
        setError(data.error || 'Failed to fetch couriers');
        toast.error(data.error || 'Failed to fetch couriers');
      }
    } catch (error) {
      console.error('Fetch couriers error:', error);
      setError('Network error. Please check your connection.');
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (courier) => {
    setEditingCourier(courier);
    setApiEnabled(courier.apiEnabled || false);
    setCredentials({});
    setStoreConfig(courier.storeConfig || {});
  };

  const handleSave = async (courierId) => {
    const isPathao = editingCourier?.slug === 'pathao';
    
    // Validate based on courier type
    if (isPathao) {
      const requiredFields = ['clientId', 'clientSecret', 'username', 'password'];
      const missingFields = requiredFields.filter(field => !credentials[field]?.trim());
      
      if (missingFields.length > 0) {
        toast.error(`Please fill in: ${missingFields.join(', ')}`);
        return;
      }
      
      if (!storeConfig.pathaoStoreId) {
        toast.error('Please enter your Pathao Store ID');
        return;
      }
    }
    
    if (editingCourier?.slug === 'steadfast') {
      if (!credentials.apiKey?.trim() || !credentials.secretKey?.trim()) {
        toast.error('Please fill in both API Key and Secret Key');
        return;
      }
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      
      const payload = {
        apiEnabled,
        credentials,
        storeConfig: {},
      };

      if (isPathao) {
        payload.storeConfig = {
          pathaoStoreId: parseInt(storeConfig.pathaoStoreId) || null,
          pathaoStoreName: storeConfig.pathaoStoreName || '',
        };
      }

      const response = await fetch(`http://localhost:5000/api/admin/couriers/${courierId}/integration`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Courier settings saved successfully');
        setEditingCourier(null);
        fetchCouriers();
      } else {
        toast.error(data.error || 'Failed to save settings');
      }
    } catch (error) {
      console.error('Save courier error:', error);
      toast.error('Network error');
    } finally {
      setSaving(false);
    }
  };

  const handleTest = async (courier) => {
    setTesting(prev => ({ ...prev, [courier.slug]: true }));
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/couriers/${courier._id}/test-connection`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      if (data.success && data.data?.success) {
        toast.success(data.data?.message || 'Connection test successful');
      } else {
        toast.error(data.data?.message || data.message || 'Connection test failed');
      }
      fetchCouriers();
    } catch (error) {
      console.error('Test courier error:', error);
      toast.error('Network error');
    } finally {
      setTesting(prev => ({ ...prev, [courier.slug]: false }));
    }
  };

  const handleCancelEdit = () => {
    setEditingCourier(null);
    setCredentials({});
    setStoreConfig({});
    setApiEnabled(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <FaSpinner className="w-8 h-8 animate-spin text-[#4A8A90]" />
        <span className="ml-3 text-gray-500">Loading courier settings...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <FaTimesCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-red-700 mb-2">Error Loading Settings</h3>
        <p className="text-red-600">{error}</p>
        <button 
          onClick={fetchCouriers}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (couriers.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
        <FaTruck className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-yellow-700 mb-2">No Courier Services Found</h3>
        <p className="text-yellow-600">Please run the courier seed script to add courier services.</p>
        <button 
          onClick={fetchCouriers}
          className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <FaTruck className="text-[#4A8A90]" />
          Courier Service Settings
          <span className="text-sm font-normal text-gray-400 ml-2">
            ({couriers.length} services)
          </span>
        </h2>
        <button
          onClick={fetchCouriers}
          className="px-3 py-1 text-sm text-[#4A8A90] border border-[#4A8A90] rounded-lg hover:bg-[#4A8A90] hover:text-white transition-colors"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {couriers.map((courier) => {
          const isEditing = editingCourier?._id === courier._id;
          const fields = CREDENTIAL_FIELDS[courier.slug] || [];
          const isTesting = testing[courier.slug];
          const isPathao = courier.slug === 'pathao';
          const isSteadfast = courier.slug === 'steadfast';

          return (
            <div key={courier._id} className="bg-white rounded-xl border-2 border-[#FFE0E6] p-5 shadow-md">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{courier.name}</h3>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                      courier.apiEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {courier.apiEnabled ? 'Active' : 'Inactive'}
                    </span>
                    {courier.integrationStatus?.lastTestOk ? (
                      <span className="text-green-600 text-xs flex items-center gap-1">
                        <FaCheckCircle className="w-3 h-3" /> Connected
                      </span>
                    ) : courier.integrationStatus?.lastTestedAt ? (
                      <span className="text-red-600 text-xs flex items-center gap-1">
                        <FaTimesCircle className="w-3 h-3" /> Failed
                      </span>
                    ) : null}
                    {courier.configured ? (
                      <span className="text-blue-600 text-xs flex items-center gap-1">
                        <FaCheckCircle className="w-3 h-3" /> Configured
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">Not configured</span>
                    )}
                  </div>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => handleEdit(courier)}
                    className="p-2 text-gray-500 hover:text-[#4A8A90] hover:bg-gray-100 rounded-lg transition-colors"
                    title="Edit settings"
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`api-enabled-${courier.slug}`}
                      checked={apiEnabled}
                      onChange={(e) => setApiEnabled(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-[#4A8A90] focus:ring-[#4A8A90]"
                    />
                    <label htmlFor={`api-enabled-${courier.slug}`} className="text-sm font-medium text-gray-700">
                      Enable API Integration
                    </label>
                  </div>

                  <div className="space-y-3">
                    {fields.map((field) => (
                      <div key={field.name}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          value={credentials[field.name] || ''}
                          onChange={(e) => setCredentials(prev => ({
                            ...prev,
                            [field.name]: e.target.value
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
                          placeholder={`Enter ${field.label}`}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Store ID - ONLY for Pathao */}
                  {isPathao && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Store ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={storeConfig.pathaoStoreId || ''}
                        onChange={(e) => setStoreConfig(prev => ({
                          ...prev,
                          pathaoStoreId: e.target.value ? parseInt(e.target.value) : null
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent"
                        placeholder="Enter Pathao Store ID"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Required for Pathao. Find it in your Pathao merchant dashboard.
                      </p>
                    </div>
                  )}

                  {/* Info for Steadfast */}
                  {isSteadfast && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-xs text-blue-700">
                        <FaCheckCircle className="inline w-3 h-3 mr-1" />
                        Steadfast only requires API Key and Secret Key. No Store ID needed.
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => handleSave(courier._id)}
                      disabled={saving}
                      className="flex-1 px-4 py-2 bg-[#4A8A90] text-white rounded-lg hover:bg-[#3A7A80] disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {saving ? (
                        <>
                          <FaSpinner className="w-4 h-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <FaSave className="w-4 h-4" />
                          Save
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                    >
                      <FaTimes className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {courier.configured ? (
                    <div className="text-sm text-green-600 flex items-center gap-1">
                      <FaCheckCircle className="w-4 h-4" />
                      Credentials configured
                    </div>
                  ) : (
                    <div className="text-sm text-gray-400">Not configured</div>
                  )}
                  
                  <button
                    onClick={() => handleTest(courier)}
                    disabled={isTesting || !courier.configured}
                    className="mt-3 px-4 py-2 border border-[#4A8A90] text-[#4A8A90] rounded-lg hover:bg-[#4A8A90] hover:text-white transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isTesting ? (
                      <>
                        <FaSpinner className="w-4 h-4 animate-spin" />
                        Testing...
                      </>
                    ) : (
                      'Test Connection'
                    )}
                  </button>
                  
                  {courier.integrationStatus?.lastTestedAt && (
                    <p className="text-xs text-gray-400 mt-2">
                      Last tested: {new Date(courier.integrationStatus.lastTestedAt).toLocaleString()}
                      <br />
                      Status: {courier.integrationStatus.lastTestMessage || 'Unknown'}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}