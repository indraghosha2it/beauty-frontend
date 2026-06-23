// // services/bannerService.js
// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://gadget-backend.vercel.app/api';

// // Get all banners (admin)
// export const getBanners = async (params = {}) => {
//   const token = localStorage.getItem('token');
//   const queryString = new URLSearchParams(params).toString();
//   const response = await fetch(`${API_URL}/banners/admin/all?${queryString}`, {
//     headers: {
//       'Authorization': `Bearer ${token}`
//     }
//   });
//   const data = await response.json();
//   if (!data.success) throw new Error(data.error || 'Failed to fetch banners');
//   return data;
// };

// // Get active banners for homepage
// export const getActiveBanners = async (limit = 5) => {
//   const response = await fetch(`${API_URL}/banners/active?limit=${limit}`);
//   const data = await response.json();
//   if (!data.success) throw new Error(data.error || 'Failed to fetch active banners');
//   return data;
// };

// // Get banners for homepage carousel
// export const getHomepageBanners = async () => {
//   const response = await fetch(`${API_URL}/banners/homepage`);
//   const data = await response.json();
//   if (!data.success) throw new Error(data.error || 'Failed to fetch homepage banners');
//   return data;
// };

// // Get single banner
// export const getBannerById = async (id) => {
//   const response = await fetch(`${API_URL}/banners/${id}`);
//   const data = await response.json();
//   if (!data.success) throw new Error(data.error || 'Failed to fetch banner');
//   return data;
// };

// // Create banner
// export const createBanner = async (bannerData) => {
//   const token = localStorage.getItem('token');
//   const response = await fetch(`${API_URL}/banners`, {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(bannerData)
//   });
//   const data = await response.json();
//   if (!data.success) throw new Error(data.error || 'Failed to create banner');
//   return data;
// };

// // Update banner
// export const updateBanner = async (id, bannerData) => {
//   const token = localStorage.getItem('token');
//   const response = await fetch(`${API_URL}/banners/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(bannerData)
//   });
//   const data = await response.json();
//   if (!data.success) throw new Error(data.error || 'Failed to update banner');
//   return data;
// };

// // Delete banner
// export const deleteBanner = async (id) => {
//   const token = localStorage.getItem('token');
//   const response = await fetch(`${API_URL}/banners/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Authorization': `Bearer ${token}`
//     }
//   });
//   const data = await response.json();
//   if (!data.success) throw new Error(data.error || 'Failed to delete banner');
//   return data;
// };

// // Toggle banner status
// export const toggleBannerStatus = async (id) => {
//   const token = localStorage.getItem('token');
//   const response = await fetch(`${API_URL}/banners/${id}/toggle-status`, {
//     method: 'PUT',
//     headers: {
//       'Authorization': `Bearer ${token}`
//     }
//   });
//   const data = await response.json();
//   if (!data.success) throw new Error(data.error || 'Failed to toggle banner status');
//   return data;
// };

// // Toggle banner publish
// export const toggleBannerPublish = async (id) => {
//   const token = localStorage.getItem('token');
//   const response = await fetch(`${API_URL}/banners/${id}/toggle-publish`, {
//     method: 'PUT',
//     headers: {
//       'Authorization': `Bearer ${token}`
//     }
//   });
//   const data = await response.json();
//   if (!data.success) throw new Error(data.error || 'Failed to toggle banner publish');
//   return data;
// };

// // Reorder banners
// export const reorderBanners = async (banners) => {
//   const token = localStorage.getItem('token');
//   const response = await fetch(`${API_URL}/banners/reorder`, {
//     method: 'PUT',
//     headers: {
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ banners })
//   });
//   const data = await response.json();
//   if (!data.success) throw new Error(data.error || 'Failed to reorder banners');
//   return data;
// };

// // Get banner stats
// export const getBannerStats = async () => {
//   const token = localStorage.getItem('token');
//   const response = await fetch(`${API_URL}/banners/admin/stats`, {
//     headers: {
//       'Authorization': `Bearer ${token}`
//     }
//   });
//   const data = await response.json();
//   if (!data.success) throw new Error(data.error || 'Failed to fetch banner stats');
//   return data;
// };

// // Track banner click
// export const trackBannerClick = async (id) => {
//   const response = await fetch(`${API_URL}/banners/${id}/click`, {
//     method: 'POST'
//   });
//   const data = await response.json();
//   if (!data.success) throw new Error(data.error || 'Failed to track click');
//   return data;
// };


// src/app/services/bannerService.js
// Use the env variable but add /api to it
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://gadget-backend.vercel.app';
const API_URL = `${API_BASE}/api`;

console.log('🔧 API_URL configured as:', API_URL);

// Get all banners (admin)
export const getBanners = async (params = {}) => {
  const token = localStorage.getItem('token');
  console.log('🔑 Token:', token ? 'Present' : 'Missing');
  
  const queryString = new URLSearchParams(params).toString();
  const url = `${API_URL}/banners/admin/all?${queryString}`;
  
  console.log('📡 Fetching banners from:', url);
  
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('📥 Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('📦 Response data:', data);
    
    if (!data.success) throw new Error(data.error || 'Failed to fetch banners');
    return data;
  } catch (error) {
    console.error('❌ Error fetching banners:', error);
    throw error;
  }
};

// Get banner stats
export const getBannerStats = async () => {
  const token = localStorage.getItem('token');
  const url = `${API_URL}/banners/admin/stats`;
  
  console.log('📡 Fetching stats from:', url);
  
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('📥 Stats response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('📦 Stats data:', data);
    
    if (!data.success) throw new Error(data.error || 'Failed to fetch banner stats');
    return data;
  } catch (error) {
    console.error('❌ Error fetching stats:', error);
    throw error;
  }
};

// Get active banners for homepage
export const getActiveBanners = async (limit = 5) => {
  try {
    const response = await fetch(`${API_URL}/banners/active?limit=${limit}`);
    const data = await response.json();
    if (!data.success) throw new Error(data.error || 'Failed to fetch active banners');
    return data;
  } catch (error) {
    console.error('❌ Error fetching active banners:', error);
    throw error;
  }
};

// Get banners for homepage carousel
export const getHomepageBanners = async () => {
  try {
    const response = await fetch(`${API_URL}/banners/homepage`);
    const data = await response.json();
    if (!data.success) throw new Error(data.error || 'Failed to fetch homepage banners');
    return data;
  } catch (error) {
    console.error('❌ Error fetching homepage banners:', error);
    throw error;
  }
};

// Get single banner
export const getBannerById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/banners/${id}`);
    const data = await response.json();
    if (!data.success) throw new Error(data.error || 'Failed to fetch banner');
    return data;
  } catch (error) {
    console.error('❌ Error fetching banner:', error);
    throw error;
  }
};

// Create banner
export const createBanner = async (bannerData) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${API_URL}/banners`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bannerData)
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error || 'Failed to create banner');
    return data;
  } catch (error) {
    console.error('❌ Error creating banner:', error);
    throw error;
  }
};

// Update banner
export const updateBanner = async (id, bannerData) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${API_URL}/banners/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bannerData)
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error || 'Failed to update banner');
    return data;
  } catch (error) {
    console.error('❌ Error updating banner:', error);
    throw error;
  }
};

// Delete banner
export const deleteBanner = async (id) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${API_URL}/banners/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error || 'Failed to delete banner');
    return data;
  } catch (error) {
    console.error('❌ Error deleting banner:', error);
    throw error;
  }
};

// Toggle banner status (active/inactive)
export const toggleBannerStatus = async (id) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${API_URL}/banners/${id}/toggle-status`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error || 'Failed to toggle banner status');
    return data;
  } catch (error) {
    console.error('❌ Error toggling banner status:', error);
    throw error;
  }
};

// Toggle banner publish status
export const toggleBannerPublish = async (id) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${API_URL}/banners/${id}/toggle-publish`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error || 'Failed to toggle banner publish');
    return data;
  } catch (error) {
    console.error('❌ Error toggling banner publish:', error);
    throw error;
  }
};

// Reorder banners
export const reorderBanners = async (banners) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${API_URL}/banners/reorder`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ banners })
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error || 'Failed to reorder banners');
    return data;
  } catch (error) {
    console.error('❌ Error reordering banners:', error);
    throw error;
  }
};

// Track banner click
export const trackBannerClick = async (id) => {
  try {
    const response = await fetch(`${API_URL}/banners/${id}/click`, {
      method: 'POST'
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error || 'Failed to track click');
    return data;
  } catch (error) {
    console.error('❌ Error tracking click:', error);
    throw error;
  }
};