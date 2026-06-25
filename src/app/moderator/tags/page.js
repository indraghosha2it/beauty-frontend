'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  X, 
  Trash2,
  Edit,
  Check,
  RefreshCw,
  Loader2,
  Image as ImageIcon,
  AlertCircle,
  Shield
} from 'lucide-react';
import { toast } from 'sonner';
import NextLink from 'next/link';

export default function TagsManagementPage() {
  const router = useRouter();
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTag, setEditingTag] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // User role state
  const [userRole, setUserRole] = useState(null);
  
  // Form state
  const [tagName, setTagName] = useState('');
  const [tagImage, setTagImage] = useState(null);
  const [tagImagePreview, setTagImagePreview] = useState('');
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [existingPublicId, setExistingPublicId] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isImageChanged, setIsImageChanged] = useState(false);

  // Check user role on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUserRole(user.role || 'moderator');
  }, []);

  const fetchTags = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/tags', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setTags(data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch tags');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const compressImageSmart = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          let quality = 0.4;
          if (file.size > 5 * 1024 * 1024) quality = 0.25;
          else if (file.size > 2 * 1024 * 1024) quality = 0.3;
          else if (file.size > 1 * 1024 * 1024) quality = 0.35;
          else if (file.size > 500 * 1024) quality = 0.45;
          else quality = 0.55;
          
          canvas.toBlob(
            (blob) => {
              const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.jpg'), {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            },
            'image/jpeg',
            quality
          );
        };
        img.onerror = () => reject(new Error('Failed to load image'));
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
    });
  };

  const uploadToCloudinary = async (file) => {
    const compressedFile = await compressImageSmart(file);
    
    const formData = new FormData();
    formData.append('file', compressedFile);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'beauty-bucket');
    
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      
      const data = await response.json();
      if (data.secure_url) {
        return {
          url: data.secure_url,
          publicId: data.public_id,
        };
      } else {
        throw new Error(data.error?.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw error;
    }
  };

  const handleImageSelect = (e) => {
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

    setTagImage(file);
    setTagImagePreview(URL.createObjectURL(file));
    setIsImageChanged(true);
  };

  const resetForm = () => {
    setTagName('');
    setTagImage(null);
    setTagImagePreview('');
    setExistingImageUrl('');
    setExistingPublicId('');
    setEditingTag(null);
    setIsUploading(false);
    setIsImageChanged(false);
  };

  const handleCreateTag = async () => {
    if (!tagName.trim()) {
      toast.error('Tag name is required');
      return;
    }

    if (!tagImage) {
      toast.error('Tag image is required');
      return;
    }

    setIsSubmitting(true);
    setIsUploading(true);

    try {
      const uploadResult = await uploadToCloudinary(tagImage);
      
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/tags', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: tagName.trim(),
          image: {
            url: uploadResult.url,
            publicId: uploadResult.publicId
          }
        })
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Tag created successfully');
        setShowCreateModal(false);
        resetForm();
        fetchTags();
      } else {
        toast.error(data.error || 'Failed to create tag');
      }
    } catch (error) {
      toast.error('Failed to create tag');
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  const handleEditClick = (tag) => {
    setEditingTag(tag);
    setTagName(tag.name);
    setExistingImageUrl(tag.image.url);
    setExistingPublicId(tag.image.publicId);
    setTagImagePreview(tag.image.url);
    setTagImage(null);
    setIsImageChanged(false);
    setShowEditModal(true);
  };

  const handleRemoveImage = () => {
    setTagImage(null);
    setTagImagePreview('');
    setIsImageChanged(true);
  };

  const handleUpdateTag = async () => {
    if (!tagName.trim()) {
      toast.error('Tag name is required');
      return;
    }

    setIsSubmitting(true);
    setIsUploading(true);

    try {
      let imageData;

      if (tagImagePreview === '' && !isImageChanged) {
        imageData = {
          url: existingImageUrl,
          publicId: existingPublicId
        };
      }
      else if (tagImage && isImageChanged) {
        const uploadResult = await uploadToCloudinary(tagImage);
        imageData = {
          url: uploadResult.url,
          publicId: uploadResult.publicId
        };
      }
      else {
        imageData = {
          url: existingImageUrl,
          publicId: existingPublicId
        };
      }

      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/tags/${editingTag._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: tagName.trim(),
          image: imageData
        })
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Tag updated successfully');
        setShowEditModal(false);
        resetForm();
        fetchTags();
      } else {
        toast.error(data.error || 'Failed to update tag');
      }
    } catch (error) {
      toast.error('Failed to update tag');
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  const handleToggleStatus = async (tagId, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/tags/${tagId}/toggle`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        toast.success(`Tag ${data.data.isActive ? 'activated' : 'deactivated'}`);
        fetchTags();
      }
    } catch (error) {
      toast.error('Failed to toggle tag status');
    }
  };

  const handleDeleteTag = async (tagId) => {
    // Check if user is admin before allowing delete
    if (userRole !== 'admin') {
      toast.error('Only admins can delete tags');
      return;
    }
    
    if (!confirm('Are you sure you want to delete this tag?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/tags/${tagId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Tag deleted successfully');
        fetchTags();
      }
    } catch (error) {
      toast.error('Failed to delete tag');
    }
  };

  // Check if user can delete (admin only)
  const canDelete = userRole === 'admin';

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">Product Tags</h1>
            {userRole === 'moderator' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                <Shield className="w-3.5 h-3.5" />
                Moderator
              </span>
            )}
            {userRole === 'admin' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                <Shield className="w-3.5 h-3.5" />
                Admin
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {userRole === 'admin' 
              ? 'Manage product tags for your store (Full Access)'
              : 'Manage product tags for your store (Create & Edit Only)'
            }
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Tag
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : tags.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">No tags created yet</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-3 text-blue-600 hover:text-blue-700 font-medium"
          >
            Create your first tag
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tags.map(tag => (
            <div key={tag._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <img 
                  src={tag.image.url} 
                  alt={tag.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{tag.name}</h3>
                  <p className="text-xs text-gray-500">
                    {tag.isActive ? 'Active' : 'Inactive'}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEditClick(tag)}
                    className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleToggleStatus(tag._id, tag.isActive)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      tag.isActive 
                        ? 'text-green-600 hover:bg-green-50' 
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                    title={tag.isActive ? 'Deactivate' : 'Activate'}
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  
                  {/* Delete button - Only visible to admins */}
                  {canDelete && (
                    <button
                      onClick={() => handleDeleteTag(tag._id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  
                  {/* Show lock icon for moderator (no delete permission) */}
                  {!canDelete && (
                    <div className="p-1.5 text-gray-300" title="Delete restricted to admins">
                      <Trash2 className="w-4 h-4 opacity-50" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Tag Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Create New Tag</h3>
              <button 
                onClick={() => {
                  setShowCreateModal(false);
                  resetForm();
                }} 
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tag Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  placeholder="e.g., Best Seller, Trending"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tag Image <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-3">
                  {tagImagePreview ? (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                      <img src={tagImagePreview} alt="Tag preview" className="w-full h-full object-cover" />
                      <button
                        onClick={() => {
                          setTagImage(null);
                          setTagImagePreview('');
                        }}
                        className="absolute -top-1 -right-1 p-0.5 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex items-center justify-center w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors bg-gray-50">
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleImageSelect}
                        className="hidden"
                      />
                      <ImageIcon className="w-5 h-5 text-gray-400" />
                    </label>
                  )}
                  {!tagImagePreview && (
                    <p className="text-xs text-gray-500">Click to upload image (JPG, PNG, WebP, max 5MB)</p>
                  )}
                </div>
              </div>
              
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTag}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Create Tag
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Tag Modal */}
      {showEditModal && editingTag && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Edit Tag</h3>
              <button 
                onClick={() => {
                  setShowEditModal(false);
                  resetForm();
                }} 
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tag Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  placeholder="e.g., Best Seller, Trending"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tag Image <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-3">
                  {tagImagePreview ? (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                      <img src={tagImagePreview} alt="Tag preview" className="w-full h-full object-cover" />
                      <button
                        onClick={handleRemoveImage}
                        className="absolute -top-1 -right-1 p-0.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        title="Remove image"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex items-center justify-center w-16 h-16 border-2 border-dashed border-red-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors bg-red-50">
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleImageSelect}
                        className="hidden"
                      />
                      <ImageIcon className="w-5 h-5 text-red-400" />
                    </label>
                  )}
                  <div className="flex-1">
                    {tagImagePreview && tagImagePreview === existingImageUrl && !isImageChanged && (
                      <p className="text-xs text-gray-500">Current image</p>
                    )}
                    {tagImagePreview && tagImagePreview !== existingImageUrl && isImageChanged && (
                      <p className="text-xs text-green-600">New image selected ✓</p>
                    )}
                    {!tagImagePreview && (
                      <p className="text-xs text-red-500">Please select a new image</p>
                    )}
                    {tagImagePreview && (
                      <button
                        onClick={() => {
                          document.getElementById('edit-image-input')?.click();
                        }}
                        className="text-xs text-blue-600 hover:text-blue-700 mt-1 block"
                      >
                        Change image
                      </button>
                    )}
                    <input
                      id="edit-image-input"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateTag}
                  disabled={isSubmitting || !tagImagePreview}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  Update Tag
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}