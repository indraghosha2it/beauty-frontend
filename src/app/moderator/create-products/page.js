
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import { 
  Plus, 
  X, 
  Save, 
  ArrowLeft,
  Image as ImageIcon,
  AlertCircle,
  Loader2,
  Trash2,
  Upload,
  Package,
  DollarSign,
  Tag,
  Info,
  Star,
  Search,
  Hash,
  Layers,
  Box,
  ChevronDown,
  GripVertical,
  Palette,
  TrendingUp,
  Zap,
  Clock,
  Flame,
  Gift,
  CheckCircle,
  RefreshCw,
  Building2
} from 'lucide-react';
import { toast } from 'sonner';
import { MantineProvider } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import TiptapLink from '@tiptap/extension-link';
import { SketchPicker } from 'react-color';

import '@mantine/tiptap/styles.css';
import '@mantine/core/styles.css';

// Unit options
const UNIT_OPTIONS = [
  { value: 'pcs', label: 'Pieces (pcs)' },
  { value: 'ton', label: 'Ton (ton)' },
  { value: 'other', label: 'Other' }
];



// Color presets
const COLOR_PRESETS = [
   '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', 
  '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
  '#008000', '#FFC0CB', '#A52A2A', '#808080', '#C0C0C0',
  '#4A90E2'
];

// Draft key for localStorage
const DRAFT_KEY = 'smart_gadget_moderator_product_draft';

// Restore Draft Modal Component
const RestoreDraftModal = ({ isOpen, onConfirm, onCancel, draftData }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
        <div className="flex items-center gap-3 text-amber-600 mb-4">
          <AlertCircle className="w-6 h-6" />
          <h3 className="text-lg font-semibold">Unsaved Draft Found</h3>
        </div>
        
        <p className="text-sm text-gray-600 mb-2">
          You have unsaved draft data from your last session.
        </p>
        <p className="text-xs text-gray-500 mb-4">
          Would you like to restore it? If you choose not to restore, the draft will be discarded.
        </p>
        
        {draftData && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs">
            <p className="font-medium text-gray-700 mb-1">Draft preview:</p>
            {draftData.productName && (
              <p className="text-gray-600">Product: {draftData.productName}</p>
            )}
            {draftData.brand && (
              <p className="text-gray-600">Brand: {draftData.brand}</p>
            )}
            <p className="text-gray-500 mt-1">
              Last saved: {new Date().toLocaleString()}
            </p>
          </div>
        )}
        
        <div className="flex items-center justify-end gap-3 mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Discard Draft
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Restore Draft
          </button>
        </div>
      </div>
    </div>
  );
};

// Add Brand Modal Component
const AddBrandModal = ({ isOpen, onClose, onBrandAdded }) => {
  const [brandName, setBrandName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!brandName.trim()) {
      toast.error('Please enter a brand name');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/brands', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: brandName.trim() })
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Brand added successfully');
        setBrandName('');
        onBrandAdded(data.data);
        onClose();
      } else {
        toast.error(data.error || 'Failed to add brand');
      }
    } catch (error) {
      console.error('Error adding brand:', error);
      toast.error('Failed to add brand');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            Add New Brand
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="e.g., Apple, Samsung, Sony"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
              autoFocus
            />
          </div>
          
          <div className="flex gap-3 mt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Add Brand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Color Picker Component with SketchPicker
const ColorPicker = ({ colors, onChange }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [currentColorIndex, setCurrentColorIndex] = useState(null);
  const colorPickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setShowColorPicker(false);
        setCurrentColorIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const addColor = () => {
    onChange([...colors, { code: '#000000' }]);
  };

  const removeColor = (index) => {
    const updatedColors = colors.filter((_, i) => i !== index);
    onChange(updatedColors);
  };

  const openColorPicker = (index, event) => {
    event.stopPropagation();
    setCurrentColorIndex(index);
    setShowColorPicker(true);
  };

  const handleColorChange = (index, color) => {
    const updatedColors = [...colors];
    updatedColors[index] = { code: color.hex };
    onChange(updatedColors);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {COLOR_PRESETS.map(color => (
          <button
            key={color}
            type="button"
            onClick={() => {
              if (colors.length === 0) {
                onChange([{ code: color }]);
              } else {
                const updatedColors = [...colors];
                updatedColors[0] = { code: color };
                onChange(updatedColors);
              }
            }}
            className="w-8 h-8 rounded-full border-2 border-gray-200 hover:scale-110 transition-transform shadow-sm"
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
      
      <div className="space-y-2">
        {colors.map((color, index) => (
          <div key={index} className="relative">
            <div className="flex items-center gap-2 w-full">
              <div 
                className="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg border border-gray-200 p-2 cursor-pointer hover:border-blue-600 transition-colors"
                onClick={(e) => openColorPicker(index, e)}
              >
                <div 
                  className="w-10 h-10 rounded-lg border-2 border-gray-200 flex-shrink-0"
                  style={{ backgroundColor: color.code }}
                />
                <div className="flex-1 font-mono text-sm text-gray-600">
                  {color.code}
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
              </div>
              
              <button
                type="button"
                onClick={() => removeColor(index)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                title="Remove Color"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {showColorPicker && currentColorIndex === index && (
              <div ref={colorPickerRef} className="absolute right-0 mt-2 z-50">
                <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-3">
                  <SketchPicker
                    color={color.code}
                    onChange={(newColor) => handleColorChange(index, newColor)}
                    presetColors={COLOR_PRESETS}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        
        <button
          type="button"
          onClick={addColor}
          className="w-full flex items-center justify-center gap-1 px-3 py-2 mt-2 text-xs font-medium text-blue-600 border border-dashed border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Color
        </button>
      </div>
    </div>
  );
};

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
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'smart-gadget');
  
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

export default function ModeratorCreateProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isGeneratingSku, setIsGeneratingSku] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [childSubcategories, setChildSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [showMeta, setShowMeta] = useState(false);
  const [showDeliveryInfo, setShowDeliveryInfo] = useState(false);
  const [showAddBrandModal, setShowAddBrandModal] = useState(false);
  const [keywordInput, setKeywordInput] = useState('');
  const [showCustomUnit, setShowCustomUnit] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [pendingDraft, setPendingDraft] = useState(null);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [isFullEditorReady, setIsFullEditorReady] = useState(false);
  const [isDeliveryEditorReady, setIsDeliveryEditorReady] = useState(false);
  const [productTags, setProductTags] = useState([]);
const [isLoadingTags, setIsLoadingTags] = useState(false);

  const fileInputRefs = useRef([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const autoSaveTimerRef = useRef(null);
  const isRestoringRef = useRef(false);

  const [formData, setFormData] = useState({
    productName: '',
    skuCode: '',
    shortDescription: '',
    fullDescription: '',
    category: '',
    subcategory: '',
    childSubcategory: '',
    brand: '',
    stockQuantity: '',
    stockAlertQuantity: '',
    regularPrice: '',
    costPerItem: '',
    discountPrice: '',
    unit: 'pcs',
    customUnit: '',
    colors: [],
    deliveryInfo: '',
    additionalInfo: [],
    tags: [],
    isFeatured: false,
    showOnBanner: false,
    metaSettings: {
      metaTitle: '',
      metaDescription: '',
      metaKeywords: []
    }
  });

  const [productImages, setProductImages] = useState([
    { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
    { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
    { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
    { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
    { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
    { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null }
  ]);

  const [errors, setErrors] = useState({});

  const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  const maxFileSize = 5 * 1024 * 1024;

  // Editor setup
  const shortDescEditor = useEditor({
    extensions: [StarterKit, TiptapLink.configure({ openOnClick: false }), TextAlign.configure({ types: ['heading', 'paragraph'] })],
    content: formData.shortDescription,
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, shortDescription: editor.getHTML() }));
      saveToLocalStorage();
    },
    onReady: () => setIsEditorReady(true),
    immediatelyRender: false,
  });

  const fullDescEditor = useEditor({
    extensions: [StarterKit, TiptapLink.configure({ openOnClick: false }), TextAlign.configure({ types: ['heading', 'paragraph'] })],
    content: formData.fullDescription,
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, fullDescription: editor.getHTML() }));
      saveToLocalStorage();
    },
    onReady: () => setIsFullEditorReady(true),
    immediatelyRender: false,
  });

  const deliveryInfoEditor = useEditor({
    extensions: [StarterKit, TiptapLink.configure({ openOnClick: false }), TextAlign.configure({ types: ['heading', 'paragraph'] })],
    content: formData.deliveryInfo,
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, deliveryInfo: editor.getHTML() }));
      saveToLocalStorage();
    },
    onReady: () => setIsDeliveryEditorReady(true),
    immediatelyRender: false,
  });

  // Save draft to localStorage
  const saveToLocalStorage = () => {
    if (isRestoringRef.current) return;
    
    try {
      const draft = {
        formData: {
          ...formData,
          shortDescription: shortDescEditor?.getHTML() || formData.shortDescription,
          fullDescription: fullDescEditor?.getHTML() || formData.fullDescription,
          deliveryInfo: deliveryInfoEditor?.getHTML() || formData.deliveryInfo,
          showOnBanner: formData.showOnBanner
        },
        productImages: productImages.map(img => ({
          ...img,
          preview: img.url || null,
          file: null,
          uploading: false
        })),
        lastSaved: new Date().toISOString()
      };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      setLastSaved(new Date());
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  };

  // Auto-save on form changes
  useEffect(() => {
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    autoSaveTimerRef.current = setTimeout(() => {
      const hasData = formData.productName || formData.shortDescription || formData.fullDescription || productImages.some(img => img.url);
      if (hasData && !isRestoringRef.current) saveToLocalStorage();
    }, 3000);
    return () => { if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current); };
  }, [formData, productImages, shortDescEditor?.getHTML(), fullDescEditor?.getHTML(), deliveryInfoEditor?.getHTML()]);

  // Load draft from localStorage on mount
  useEffect(() => {
    const loadDraft = () => {
      try {
        const savedDraft = localStorage.getItem(DRAFT_KEY);
        if (savedDraft) {
          const draft = JSON.parse(savedDraft);
          const hasData = (draft.formData?.productName && draft.formData.productName.trim() !== '') || 
                         (draft.formData?.shortDescription && draft.formData.shortDescription !== '<p></p>') ||
                         (draft.formData?.fullDescription && draft.formData.fullDescription !== '<p></p>') ||
                         (draft.productImages && draft.productImages.some(img => img.url));
          
          if (!hasData) {
            localStorage.removeItem(DRAFT_KEY);
            return;
          }
          
          const draftDiscarded = sessionStorage.getItem('draft_discarded_moderator');
          if (draftDiscarded === 'true') {
            sessionStorage.removeItem('draft_discarded_moderator');
            return;
          }
          
          setPendingDraft(draft);
          setShowRestoreModal(true);
        }
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    };
    loadDraft();
  }, []);

  const handleRestoreDraft = () => {
    if (pendingDraft) {
      isRestoringRef.current = true;
      
      try {
        // Restore form data
        if (pendingDraft.formData) {
          setFormData({
            ...pendingDraft.formData,
            showOnBanner: pendingDraft.formData.showOnBanner || false
          });
          
          // Restore editor contents after a short delay to ensure editors are ready
          setTimeout(() => {
            if (shortDescEditor && pendingDraft.formData.shortDescription) {
              shortDescEditor.commands.setContent(pendingDraft.formData.shortDescription);
            }
            if (fullDescEditor && pendingDraft.formData.fullDescription) {
              fullDescEditor.commands.setContent(pendingDraft.formData.fullDescription);
            }
            if (deliveryInfoEditor && pendingDraft.formData.deliveryInfo) {
              deliveryInfoEditor.commands.setContent(pendingDraft.formData.deliveryInfo);
            }
          }, 100);
        }
        
        // Restore images
        if (pendingDraft.productImages) {
          const restoredImages = productImages.map((img, idx) => {
            const savedImg = pendingDraft.productImages[idx];
            if (savedImg && savedImg.url) {
              return { 
                ...img, 
                url: savedImg.url, 
                publicId: savedImg.publicId, 
                preview: savedImg.url, 
                uploading: false, 
                uploadAborted: false 
              };
            }
            return img;
          });
          setProductImages(restoredImages);
        }
        
        if (pendingDraft.lastSaved) setLastSaved(new Date(pendingDraft.lastSaved));
        toast.success('Draft restored successfully');
        
        setTimeout(() => {
          isRestoringRef.current = false;
          saveToLocalStorage();
        }, 500);
        
      } catch (error) {
        console.error('Error restoring draft:', error);
        toast.error('Failed to restore draft');
        isRestoringRef.current = false;
      }
    }
    setShowRestoreModal(false);
    setPendingDraft(null);
  };

  const handleDiscardDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
    sessionStorage.setItem('draft_discarded_moderator', 'true');
    setPendingDraft(null);
    setShowRestoreModal(false);
    setLastSaved(null);
    toast.success('Draft discarded');
  };

  const handleClearDraft = () => {
    if (confirm('Are you sure you want to clear the draft? All unsaved data will be lost.')) {
      localStorage.removeItem(DRAFT_KEY);
      setFormData({
        productName: '', skuCode: '', shortDescription: '', fullDescription: '', category: '', subcategory: '', childSubcategory: '', brand: '',
        stockQuantity: '', stockAlertQuantity: '', regularPrice: '', costPerItem: '', discountPrice: '', unit: 'pcs', customUnit: '',
        colors: [], deliveryInfo: '', additionalInfo: [], tags: [], isFeatured: false, showOnBanner: false,
        metaSettings: { metaTitle: '', metaDescription: '', metaKeywords: [] }
      });
      
      // Clear editors
      if (shortDescEditor) shortDescEditor.commands.setContent('');
      if (fullDescEditor) fullDescEditor.commands.setContent('');
      if (deliveryInfoEditor) deliveryInfoEditor.commands.setContent('');
      
      setProductImages(productImages.map(img => ({ ...img, file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null })));
      setLastSaved(null);
      toast.success('Draft cleared');
    }
  };

  const handleSaveDraft = () => {
    setIsSavingDraft(true);
    saveToLocalStorage();
    setTimeout(() => { setIsSavingDraft(false); toast.success('Draft saved successfully!'); }, 500);
  };

  const generateSkuFromBackend = async () => {
    setIsGeneratingSku(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/products/generate-sku', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, skuCode: data.data.skuCode }));
        
      } else toast.error(data.error || 'Failed to generate SKU');
    } catch (error) { toast.error('Failed to generate SKU'); }
    finally { setIsGeneratingSku(false); }
  };

  const fetchBrands = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/brands', { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await response.json();
      if (data.success) setBrands(data.data);
    } catch (error) { console.error('Error fetching brands:', error); }
  };

  const handleBrandAdded = (newBrand) => {
    setBrands(prev => [...prev, newBrand]);
    setFormData(prev => ({ ...prev, brand: newBrand.name }));
  };

  useEffect(() => {
    generateSkuFromBackend();
    fetchBrands();
    fetchTags();
    fetchCategories();
    setIsMounted(true);
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/categories', { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await response.json();
      if (data.success) setCategories(data.data);
    } catch (error) { toast.error('Failed to fetch categories'); }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories`, { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await response.json();
      if (data.success) setSubcategories(data.data.subcategories);
      else setSubcategories([]);
    } catch (error) { setSubcategories([]); }
  };

  const fetchChildSubcategories = async (categoryId, subcategoryId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories/${subcategoryId}/children`, { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await response.json();
      if (data.success) setChildSubcategories(data.data.children);
      else setChildSubcategories([]);
    } catch (error) { setChildSubcategories([]); }
  };
  
  // Fetch tags from backend
const fetchTags = async () => {
  setIsLoadingTags(true);
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/tags?isActive=true', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (data.success) {
      setProductTags(data.data);
    }
  } catch (error) {
    console.error('Error fetching tags:', error);
    toast.error('Failed to fetch tags');
  } finally {
    setIsLoadingTags(false);
  }
};
  useEffect(() => {
    if (formData.category) fetchSubcategories(formData.category);
    else { setSubcategories([]); setFormData(prev => ({ ...prev, subcategory: '', childSubcategory: '' })); setChildSubcategories([]); }
  }, [formData.category]);

  useEffect(() => {
    if (formData.category && formData.subcategory) fetchChildSubcategories(formData.category, formData.subcategory);
    else { setChildSubcategories([]); setFormData(prev => ({ ...prev, childSubcategory: '' })); }
  }, [formData.subcategory]);

  const validateImageFile = (file) => {
    if (!allowedImageTypes.includes(file.type)) return { valid: false, message: `Invalid format. Allowed: JPG, PNG, WebP, GIF` };
    if (file.size > maxFileSize) return { valid: false, message: `File too large. Max: 5MB` };
    return { valid: true };
  };

  const handleImageChange = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    if (productImages[index].preview?.startsWith('blob:')) URL.revokeObjectURL(productImages[index].preview);

    const validation = validateImageFile(file);
    if (!validation.valid) {
      const updatedImages = [...productImages];
      updatedImages[index] = { ...updatedImages[index], error: validation.message };
      setProductImages(updatedImages);
      toast.error(`Image ${index + 1}: ${validation.message}`);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    const batchId = Date.now();
    
    setProductImages(prev => {
      const updated = [...prev];
      updated[index] = { file, preview: previewUrl, error: '', uploading: true, url: null, publicId: null, uploadAborted: false, uploadBatchId: batchId };
      return updated;
    });
    saveToLocalStorage();

    try {
      const { url, publicId } = await uploadToCloudinary(file);
      setProductImages(prev => {
        const updated = [...prev];
        if (updated[index] && updated[index].uploadBatchId === batchId && !updated[index].uploadAborted) {
          updated[index] = { ...updated[index], url, publicId, uploading: false };
        }
        return updated;
      });
      toast.success(`Image ${index + 1} uploaded successfully`);
      saveToLocalStorage();
    } catch (error) {
      setProductImages(prev => {
        const updated = [...prev];
        if (updated[index] && updated[index].uploadBatchId === batchId) {
          updated[index] = { ...updated[index], error: 'Failed to upload image', uploading: false, preview: null, file: null };
        }
        return updated;
      });
      toast.error(`Failed to upload image ${index + 1}`);
    }
  };

  const handleMultipleImageSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    const currentImagesCount = productImages.filter(img => img.url !== null || img.uploading).length;
    const availableSlots = 6 - currentImagesCount;
    if (files.length > availableSlots) {
      toast.error(`You can only upload ${availableSlots} more image(s). Maximum 6 images total.`);
      if (fileInputRefs.current['multiple']) fileInputRefs.current['multiple'].value = '';
      return;
    }
    
    const emptySlots = [];
    for (let i = 0; i < productImages.length; i++) {
      if (!productImages[i].url && !productImages[i].uploading && !productImages[i].preview) emptySlots.push(i);
    }
    
    if (files.length > emptySlots.length) {
      toast.error(`Only ${emptySlots.length} slots available. Please remove some images first.`);
      if (fileInputRefs.current['multiple']) fileInputRefs.current['multiple'].value = '';
      return;
    }
    
    const batchId = Date.now();
    for (let i = 0; i < files.length && i < emptySlots.length; i++) {
      const file = files[i];
      const slotIndex = emptySlots[i];
      
      const validation = validateImageFile(file);
      if (!validation.valid) {
        toast.error(`Image ${i + 1}: ${validation.message}`);
        continue;
      }
      
      const previewUrl = URL.createObjectURL(file);
      setProductImages(prev => {
        const updated = [...prev];
        updated[slotIndex] = { file, preview: previewUrl, error: '', uploading: true, url: null, publicId: null, uploadAborted: false, uploadBatchId: batchId };
        return updated;
      });
      saveToLocalStorage();
      
      (async () => {
        try {
          const { url, publicId } = await uploadToCloudinary(file);
          setProductImages(prev => {
            const updated = [...prev];
            if (updated[slotIndex] && updated[slotIndex].uploadBatchId === batchId && !updated[slotIndex].uploadAborted) {
              updated[slotIndex] = { ...updated[slotIndex], url, publicId, uploading: false };
            }
            return updated;
          });
          toast.success(`Image uploaded successfully`);
          saveToLocalStorage();
        } catch (error) {
          setProductImages(prev => {
            const updated = [...prev];
            if (updated[slotIndex] && updated[slotIndex].uploadBatchId === batchId) {
              updated[slotIndex] = { ...updated[slotIndex], error: 'Failed to upload image', uploading: false, preview: null, file: null };
            }
            return updated;
          });
        }
      })();
    }
    
    if (fileInputRefs.current['multiple']) fileInputRefs.current['multiple'].value = '';
  };

  const moveImage = (fromIndex, toIndex) => {
    const updatedImages = [...productImages];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    setProductImages(updatedImages);
    saveToLocalStorage();
  };

  const handleDragStart = (index) => {
    if (productImages[index].preview && !productImages[index].uploading) setDraggedIndex(index);
  };

  const handleDragOverWithFeedback = (event, index) => {
    event.preventDefault();
    if (productImages[index].preview && !productImages[index].uploading) setDragOverIndex(index);
  };

  const handleDragLeave = () => setDragOverIndex(null);

  const handleDropWithFeedback = (dropIndex) => {
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDragOverIndex(null);
      setDraggedIndex(null);
      return;
    }
    if (!productImages[draggedIndex]?.uploading && !productImages[dropIndex]?.uploading) moveImage(draggedIndex, dropIndex);
    else toast.error('Cannot reorder images while uploading');
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const removeImage = (index) => {
    const imageToRemove = productImages[index];
    setProductImages(prev => {
      const updated = [...prev];
      if (updated[index]) updated[index].uploadAborted = true;
      return updated;
    });
    if (imageToRemove.preview && imageToRemove.preview.startsWith('blob:')) URL.revokeObjectURL(imageToRemove.preview);
    const updatedImages = [...productImages];
    updatedImages[index] = { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null };
    setProductImages(updatedImages);
    if (fileInputRefs.current[index]) fileInputRefs.current[index].value = '';
    toast.success(`Image removed from slot ${index + 1}`);
    saveToLocalStorage();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    saveToLocalStorage();
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    if (value === '') {
      setFormData(prev => ({ ...prev, [name]: '' }));
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        setFormData(prev => ({ ...prev, [name]: numValue }));
      }
    }
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    saveToLocalStorage();
  };

  const handleUnitChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, unit: value }));
    setShowCustomUnit(value === 'other');
    if (value !== 'other') setFormData(prev => ({ ...prev, customUnit: '' }));
    saveToLocalStorage();
  };

const handleTagSelect = (tagId) => {
  setFormData(prev => ({ ...prev, tags: [tagId] }));
  saveToLocalStorage();
};

  const addAdditionalInfo = () => {
    setFormData(prev => ({ ...prev, additionalInfo: [...prev.additionalInfo, { fieldName: '', fieldValue: '' }] }));
    saveToLocalStorage();
  };

  const updateAdditionalInfo = (index, field, value) => {
    const updatedInfo = [...formData.additionalInfo];
    updatedInfo[index] = { ...updatedInfo[index], [field]: value };
    setFormData(prev => ({ ...prev, additionalInfo: updatedInfo }));
    saveToLocalStorage();
  };

  const removeAdditionalInfo = (index) => {
    const updatedInfo = formData.additionalInfo.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, additionalInfo: updatedInfo }));
    saveToLocalStorage();
  };

  const addKeyword = () => {
    if (!keywordInput.trim()) return;
    const keywordsToAdd = keywordInput.split(',').map(k => k.trim()).filter(k => k !== '');
    setFormData(prev => ({ ...prev, metaSettings: { ...prev.metaSettings, metaKeywords: [...(prev.metaSettings.metaKeywords || []), ...keywordsToAdd] } }));
    setKeywordInput('');
    saveToLocalStorage();
  };

  const removeKeyword = (indexToRemove) => {
    setFormData(prev => ({ ...prev, metaSettings: { ...prev.metaSettings, metaKeywords: prev.metaSettings.metaKeywords.filter((_, i) => i !== indexToRemove) } }));
    saveToLocalStorage();
  };

  const handleMetaChange = (field, value) => {
    setFormData(prev => ({ ...prev, metaSettings: { ...prev.metaSettings, [field]: value } }));
    saveToLocalStorage();
  };

  const validateForm = () => {
    const newErrors = {};

    console.log('Validating form data:', {
      productName: formData.productName,
      skuCode: formData.skuCode,
      fullDescription: formData.fullDescription,
      category: formData.category,
      brand: formData.brand,
      stockQuantity: formData.stockQuantity,
      regularPrice: formData.regularPrice,
      unit: formData.unit,
      tags: formData.tags,
      imagesCount: productImages.filter(img => img.url !== null).length
    });
    
    if (!formData.productName?.trim()) newErrors.productName = 'Product name is required';
    if (!formData.skuCode?.trim()) newErrors.skuCode = 'SKU code is required';
    if (!formData.fullDescription || formData.fullDescription === '<p></p>') newErrors.fullDescription = 'Full description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.brand) newErrors.brand = 'Brand is required';
    
    if (!formData.stockQuantity && formData.stockQuantity !== 0) {
      newErrors.stockQuantity = 'Stock quantity is required';
    } else if (formData.stockQuantity !== '' && Number(formData.stockQuantity) < 0) {
      newErrors.stockQuantity = 'Stock quantity cannot be negative';
    }
    
    if (!formData.regularPrice && formData.regularPrice !== 0) {
      newErrors.regularPrice = 'Regular price is required';
    } else if (formData.regularPrice !== '' && Number(formData.regularPrice) <= 0) {
      newErrors.regularPrice = 'Regular price must be greater than 0';
    }
    
    if (formData.discountPrice && Number(formData.discountPrice) > Number(formData.regularPrice)) {
      newErrors.discountPrice = 'Discount price cannot exceed regular price';
    }
    
    if (!formData.unit) {
      newErrors.unit = 'Unit is required';
    }
    
    if (formData.unit === 'other' && !formData.customUnit?.trim()) {
      newErrors.customUnit = 'Please specify the unit';
    }
    
    if (!formData.tags || formData.tags.length === 0) {
      newErrors.tags = 'Please select one product tag';
    }
    
    const hasImages = productImages.some(img => img.url !== null && !img.uploading);
    if (!hasImages) {
      newErrors.images = 'At least one product image is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const uploading = productImages.some(img => img.uploading);
    if (uploading) {
      toast.error('Please wait for all uploads to complete');
      return;
    }
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      const firstError = Object.keys(errors)[0];
      if (firstError) {
        const element = document.querySelector(`[name="${firstError}"]`);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const imageUrls = productImages.filter(img => img.url).map(img => img.url);
      const finalUnit = formData.unit === 'other' ? formData.customUnit : formData.unit;
      const colorStrings = formData.colors.map(color => color.code);
      
      const payload = {
        productName: formData.productName,
        skuCode: formData.skuCode,
        shortDescription: formData.shortDescription || '',
        fullDescription: formData.fullDescription,
        category: formData.category,
        subcategory: formData.subcategory || undefined,
        childSubcategory: formData.childSubcategory || undefined,
        brand: formData.brand,
        stockQuantity: formData.stockQuantity === '' ? 0 : Number(formData.stockQuantity),
        stockAlertQuantity: formData.stockAlertQuantity ? Number(formData.stockAlertQuantity) : 0,
        regularPrice: formData.regularPrice === '' ? 0 : Number(formData.regularPrice),
        costPerItem: formData.costPerItem ? Number(formData.costPerItem) : 0,
        discountPrice: formData.discountPrice ? Number(formData.discountPrice) : 0,
        unit: finalUnit,
        colors: colorStrings,
        deliveryInfo: formData.deliveryInfo || '',
        additionalInfo: formData.additionalInfo.filter(info => info.fieldName && info.fieldValue),
        tags: formData.tags,
        isFeatured: formData.isFeatured,
        showOnBanner: formData.showOnBanner,
        metaSettings: formData.metaSettings,
        images: imageUrls
      };

      console.log('Submitting payload:', payload);

      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Product created successfully!');
        localStorage.removeItem(DRAFT_KEY);
        router.push('/moderator/all-products');
      } else {
        toast.error(data.error || 'Failed to create product');
        if (data.error) {
          console.error('Server error:', data.error);
        }
      }
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MantineProvider>
      <div className="min-h-screen bg-gray-50">
        <RestoreDraftModal isOpen={showRestoreModal} onConfirm={handleRestoreDraft} onCancel={handleDiscardDraft} draftData={pendingDraft?.formData} />
        <AddBrandModal isOpen={showAddBrandModal} onClose={() => setShowAddBrandModal(false)} onBrandAdded={handleBrandAdded} />

        {/* Header */}
        <div className="bg-white border-b shadow-sm sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <NextLink href="/moderator/all-products" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </NextLink>
                <div>
                  <div className="flex items-center gap-2">
                    <Package className="w-6 h-6 text-blue-600" />
                    <h1 className="text-xl font-bold text-gray-900">Create New Product</h1>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Add a new product to your gadget collection</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {lastSaved && (
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Last saved: {lastSaved.toLocaleTimeString()}
                  </span>
                )}
                <button onClick={handleClearDraft} className="px-4 py-2 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                  Clear Draft
                </button>
                <button onClick={handleSaveDraft} disabled={isSavingDraft} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50">
                  {isSavingDraft ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Draft
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Information Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Package className="w-5 h-5 text-blue-600" />
                      Basic Information
                    </h2>
                  </div>
                  <div className="p-5 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product Name <span className="text-red-500">*</span></label>
                      <input type="text" name="productName" value={formData.productName} onChange={handleChange} className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition ${errors.productName ? 'border-red-500' : 'border-gray-300'}`} placeholder="e.g., Wireless Headphones, Smart Watch Pro" />
                      {errors.productName && <p className="text-xs text-red-600 mt-1">{errors.productName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">SKU Code <span className="text-red-500">*</span></label>
                      <div className="flex gap-2">
                        <input type="text" name="skuCode" value={formData.skuCode} onChange={handleChange} className={`flex-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition ${errors.skuCode ? 'border-red-500' : 'border-gray-300'}`} placeholder="Auto-generated SKU" readOnly />
                        <button type="button" onClick={generateSkuFromBackend} disabled={isGeneratingSku} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 flex items-center gap-2">
                          {isGeneratingSku ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                          Regenerate
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">SKU is auto-generated from backend. Click regenerate for a new one.</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Short Description <span className="text-gray-400 text-xs">(Optional)</span></label>
                      {isMounted && shortDescEditor && (
                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                          <RichTextEditor editor={shortDescEditor}>
                            <RichTextEditor.Toolbar>
                              <RichTextEditor.ControlsGroup><RichTextEditor.Bold /><RichTextEditor.Italic /></RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup><RichTextEditor.AlignLeft /><RichTextEditor.AlignCenter /><RichTextEditor.AlignRight /></RichTextEditor.ControlsGroup>
                            </RichTextEditor.Toolbar>
                            <RichTextEditor.Content />
                          </RichTextEditor>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Description <span className="text-red-500">*</span></label>
                      {isMounted && fullDescEditor && (
                        <div className={`border rounded-lg overflow-hidden ${errors.fullDescription ? 'border-red-500' : 'border-gray-300'}`}>
                          <RichTextEditor editor={fullDescEditor}>
                            <RichTextEditor.Toolbar>
                              <RichTextEditor.ControlsGroup><RichTextEditor.Bold /><RichTextEditor.Italic /><RichTextEditor.Underline /><RichTextEditor.Strikethrough /></RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup><RichTextEditor.H1 /><RichTextEditor.H2 /><RichTextEditor.H3 /></RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup><RichTextEditor.BulletList /><RichTextEditor.OrderedList /></RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup><RichTextEditor.AlignLeft /><RichTextEditor.AlignCenter /><RichTextEditor.AlignRight /></RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup><RichTextEditor.Link /><RichTextEditor.Unlink /></RichTextEditor.ControlsGroup>
                            </RichTextEditor.Toolbar>
                            <RichTextEditor.Content />
                          </RichTextEditor>
                        </div>
                      )}
                      {errors.fullDescription && <p className="text-xs text-red-600 mt-1">{errors.fullDescription}</p>}
                    </div>
                  </div>
                </div>

                {/* Categories Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-blue-600" />
                      Categories & Classification
                    </h2>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category <span className="text-red-500">*</span></label>
                        <select name="category" value={formData.category} onChange={handleChange} className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition ${errors.category ? 'border-red-500' : 'border-gray-300'}`}>
                          <option value="">Select Category</option>
                          {categories.map(cat => (<option key={cat._id} value={cat._id}>{cat.name}</option>))}
                        </select>
                        {errors.category && <p className="text-xs text-red-600 mt-1">{errors.category}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory <span className="text-gray-400 text-xs">(Optional)</span></label>
                        <select name="subcategory" value={formData.subcategory} onChange={handleChange} disabled={!formData.category || subcategories.length === 0} className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed border-gray-300">
                          <option value="">Select Subcategory</option>
                          {subcategories.map(sub => (<option key={sub._id} value={sub._id}>{sub.name}</option>))}
                        </select>
                      </div>

                      {childSubcategories.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Child Subcategory <span className="text-gray-400 text-xs">(Optional)</span></label>
                          <select name="childSubcategory" value={formData.childSubcategory} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition border-gray-300">
                            <option value="">Select Child Subcategory</option>
                            {childSubcategories.map(child => (<option key={child._id} value={child._id}>{child.name}</option>))}
                          </select>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Brand <span className="text-red-500">*</span></label>
                        <div className="flex gap-2">
                          <select name="brand" value={formData.brand} onChange={handleChange} className={`flex-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition ${errors.brand ? 'border-red-500' : 'border-gray-300'}`}>
                            <option value="">Select Brand</option>
                            {brands.map(brand => (<option key={brand._id} value={brand.name}>{brand.name}</option>))}
                          </select>
                          <button type="button" onClick={() => setShowAddBrandModal(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 whitespace-nowrap">
                            <Plus className="w-4 h-4" /> Add Brand
                          </button>
                        </div>
                        {errors.brand && <p className="text-xs text-red-600 mt-1">{errors.brand}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing & Inventory Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                      Pricing & Inventory
                    </h2>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity <span className="text-red-500">*</span></label>
                        <input type="number" name="stockQuantity" value={formData.stockQuantity} onChange={handleNumberChange} onWheel={(e) => e.target.blur()} min="0" step="1" className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition ${errors.stockQuantity ? 'border-red-500' : 'border-gray-300'}`} placeholder="0" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock Alert Quantity</label>
                        <input type="number" name="stockAlertQuantity" value={formData.stockAlertQuantity} onChange={handleNumberChange} onWheel={(e) => e.target.blur()} min="0" step="1" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition" placeholder="Notify when stock reaches this level" />
                        <p className="text-xs text-gray-500 mt-1">You'll be notified when stock reaches this level</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Regular Price (৳) <span className="text-red-500">*</span></label>
                        <input type="number" name="regularPrice" value={formData.regularPrice} onChange={handleNumberChange} onWheel={(e) => e.target.blur()} min="0" step="1" className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition ${errors.regularPrice ? 'border-red-500' : 'border-gray-300'}`} placeholder="0" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cost Per Item (৳) <span className="text-gray-400 text-xs">(Optional)</span></label>
                        <input type="number" name="costPerItem" value={formData.costPerItem} onChange={handleNumberChange} onWheel={(e) => e.target.blur()} min="0" step="1" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition" placeholder="0" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Discount Price (৳) <span className="text-gray-400 text-xs">(Optional)</span></label>
                        <input type="number" name="discountPrice" value={formData.discountPrice} onChange={handleNumberChange} onWheel={(e) => e.target.blur()} min="0" step="1" className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition ${errors.discountPrice ? 'border-red-500' : 'border-gray-300'}`} placeholder="0" />
                        {formData.discountPrice > 0 && formData.regularPrice && (
                          <p className="text-xs text-green-600 mt-1">Save: ৳{(formData.regularPrice - formData.discountPrice).toFixed(2)} ({Math.round(((formData.regularPrice - formData.discountPrice) / formData.regularPrice) * 100)}% off)</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Unit <span className="text-red-500">*</span></label>
                        <select name="unit" value={formData.unit} onChange={handleUnitChange} className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition ${errors.unit ? 'border-red-500' : 'border-gray-300'}`}>
                          {UNIT_OPTIONS.map(unit => (<option key={unit.value} value={unit.value}>{unit.label}</option>))}
                        </select>
                        {errors.unit && <p className="text-xs text-red-600 mt-1">{errors.unit}</p>}
                      </div>
                    </div>

                    {showCustomUnit && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Custom Unit <span className="text-red-500">*</span></label>
                        <input type="text" name="customUnit" value={formData.customUnit} onChange={(e) => setFormData(prev => ({ ...prev, customUnit: e.target.value }))} className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition ${errors.customUnit ? 'border-red-500' : 'border-gray-300'}`} placeholder="e.g., pair, set, dozen" />
                        {errors.customUnit && <p className="text-xs text-red-600 mt-1">{errors.customUnit}</p>}
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-5 border-b border-gray-200">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}>
                      <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2"><Info className="w-5 h-5 text-blue-600" /> Additional Information</h2>
                      <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showAdditionalInfo ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                  {showAdditionalInfo && (
                    <div className="p-5">
                      <div className="space-y-4">
                        {formData.additionalInfo.map((info, index) => (
                          <div key={index} className="flex gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <input type="text" placeholder="Field name" value={info.fieldName} onChange={(e) => updateAdditionalInfo(index, 'fieldName', e.target.value)} className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none" />
                            <input type="text" placeholder="Field value" value={info.fieldValue} onChange={(e) => updateAdditionalInfo(index, 'fieldValue', e.target.value)} className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none" />
                            <button type="button" onClick={() => removeAdditionalInfo(index)} className="p-2 text-gray-400 hover:text-red-500"><X className="w-5 h-5" /></button>
                          </div>
                        ))}
                        <button type="button" onClick={addAdditionalInfo} className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 border-2 border-dashed border-blue-300 rounded-lg hover:bg-blue-50"><Plus className="w-4 h-4" /> Add Additional Information</button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Delivery Details */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-5 border-b border-gray-200">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowDeliveryInfo(!showDeliveryInfo)}>
                      <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2"><Package className="w-5 h-5 text-blue-600" /> Delivery Details <span className="text-gray-400 text-xs">(Optional)</span></h2>
                      <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showDeliveryInfo ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                  {showDeliveryInfo && (
                    <div className="p-5">
                      {isMounted && deliveryInfoEditor && (
                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                          <RichTextEditor editor={deliveryInfoEditor}>
                            <RichTextEditor.Toolbar>
                              <RichTextEditor.ControlsGroup><RichTextEditor.Bold /><RichTextEditor.Italic /><RichTextEditor.Underline /></RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup><RichTextEditor.BulletList /><RichTextEditor.OrderedList /></RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup><RichTextEditor.AlignLeft /><RichTextEditor.AlignCenter /><RichTextEditor.AlignRight /></RichTextEditor.ControlsGroup>
                            </RichTextEditor.Toolbar>
                            <RichTextEditor.Content />
                          </RichTextEditor>
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-2">Include shipping information, delivery time, and other delivery-related details</p>
                    </div>
                  )}
                </div>

                {/* SEO & Meta Settings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-5 border-b border-gray-200">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowMeta(!showMeta)}>
                      <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2"><Search className="w-5 h-5 text-blue-600" /> SEO & Meta Settings</h2>
                      <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showMeta ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                  {showMeta && (
                    <div className="p-5">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title <span className="text-xs text-gray-400 ml-2">(70 characters max)</span></label>
                          <input type="text" value={formData.metaSettings.metaTitle} onChange={(e) => handleMetaChange('metaTitle', e.target.value)} maxLength="70" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition" placeholder="e.g., Buy Wireless Headphones Online | Smart Gadget" />
                          <div className="flex justify-end mt-1"><span className={`text-xs ${formData.metaSettings.metaTitle?.length > 70 ? 'text-red-500' : 'text-gray-400'}`}>{formData.metaSettings.metaTitle?.length || 0}/70</span></div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description <span className="text-xs text-gray-400 ml-2">(160 characters max)</span></label>
                          <textarea value={formData.metaSettings.metaDescription} onChange={(e) => handleMetaChange('metaDescription', e.target.value)} maxLength="160" rows="3" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition resize-none" placeholder="Write a compelling description that appears in search engine results..." />
                          <div className="flex justify-end mt-1"><span className={`text-xs ${formData.metaSettings.metaDescription?.length > 160 ? 'text-red-500' : 'text-gray-400'}`}>{formData.metaSettings.metaDescription?.length || 0}/160</span></div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords <span className="text-xs text-gray-400 ml-2">(Comma separated)</span></label>
                          <div className="flex gap-2">
                            <input type="text" value={keywordInput} onChange={(e) => setKeywordInput(e.target.value)} onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); addKeyword(); } }} className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition" placeholder="e.g., wireless headphones, bluetooth earphones" />
                            <button type="button" onClick={addKeyword} className="px-4 py-2 text-white rounded-lg bg-blue-600 hover:bg-blue-700"><Plus className="w-4 h-4" /> Add</button>
                          </div>
                          {formData.metaSettings.metaKeywords?.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {formData.metaSettings.metaKeywords.map((keyword, index) => (
                                <div key={index} className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                                  <span>{keyword}</span>
                                  <button type="button" onClick={() => removeKeyword(index)} className="hover:text-red-500"><X className="w-3 h-3" /></button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Product Images Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2"><ImageIcon className="w-5 h-5 text-blue-600" /> Product Images <span className="text-red-500">*</span></h2>
                    <p className="text-xs text-gray-500 mt-1">Upload up to 6 images (JPG, PNG, WebP, max 5MB each)</p>
                  </div>
                  <div className="p-5">
                    {errors.images && <p className="text-xs text-red-600 mb-4 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.images}</p>}
                    
                    <div className="mb-4">
                      <input type="file" id="multiple-images" className="hidden" accept="image/jpeg,image/jpg,image/png,image/webp" multiple onChange={handleMultipleImageSelect} ref={el => { if (el) fileInputRefs.current['multiple'] = el; }} />
                      <button type="button" onClick={() => fileInputRefs.current['multiple']?.click()} className="w-full flex items-center justify-center gap-2 px-4 py-3 font-medium rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 text-blue-600 hover:bg-blue-100"><Upload className="w-5 h-5" /> Select Multiple Images (Up to 6)</button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {productImages.map((img, index) => (
                        <div key={index} draggable={img.preview !== null && !img.uploading} onDragStart={() => handleDragStart(index)} onDragOver={(e) => handleDragOverWithFeedback(e, index)} onDragLeave={handleDragLeave} onDrop={() => handleDropWithFeedback(index)} onDragEnd={handleDragEnd} className={`transition-all duration-200 ${draggedIndex === index ? 'opacity-50 scale-95' : ''} ${dragOverIndex === index && draggedIndex !== index && draggedIndex !== null ? 'ring-2 ring-blue-600 ring-offset-2 rounded-lg' : ''}`}>
                          {img.preview ? (
                            <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 h-40 hover:border-blue-600 transition-colors cursor-grab active:cursor-grabbing bg-gray-100">
                              <div className="absolute top-1 left-1 bg-black/50 rounded px-1.5 py-0.5 z-10"><GripVertical className="w-3 h-3 text-white" /></div>
                              <img src={img.preview} alt={`Product ${index + 1}`} className="w-full h-full object-contain bg-gray-100" />
                              {img.uploading && <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"><Loader2 className="w-6 h-6 text-white animate-spin" /></div>}
                              <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 z-20"><X className="w-3 h-3" /></button>
                              <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black bg-opacity-60 text-white text-xs rounded z-10">{index + 1}</span>
                            </div>
                          ) : (
                            <div className={`border-2 border-dashed rounded-lg p-4 text-center h-40 flex flex-col items-center justify-center cursor-pointer transition-colors ${img.error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 hover:border-blue-600 hover:bg-blue-50'}`} onClick={() => fileInputRefs.current[index]?.click()}>
                              <input type="file" ref={el => fileInputRefs.current[index] = el} className="hidden" accept="image/jpeg,image/jpg,image/png,image/webp" onChange={(e) => handleImageChange(e, index)} />
                              <ImageIcon className={`w-8 h-8 mx-auto mb-2 ${img.error ? 'text-red-400' : 'text-gray-400'}`} />
                              <p className={`text-xs ${img.error ? 'text-red-600' : 'text-gray-600'}`}>Slot {index + 1}</p>
                              <p className="text-[10px] text-gray-400 mt-1">Click to upload</p>
                              {img.error && <p className="text-xs text-red-600 mt-1">{img.error}</p>}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-xs text-gray-500 text-center">{productImages.filter(img => img.url !== null && !img.uploading).length} of 6 images uploaded</div>
                  </div>
                </div>

                {/* Featured Product & Tags Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Star className="w-5 h-5 text-blue-600" />
                      Product Promotion
                    </h2>
                  </div>
                  <div className="p-5 space-y-4">
                    {/* Show on Banner Checkbox */}
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.showOnBanner} 
                        onChange={(e) => setFormData(prev => ({ ...prev, showOnBanner: e.target.checked }))} 
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-600" 
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-700">Show on Banner</span>
                        <p className="text-xs text-gray-500">Product will be displayed on the homepage banner</p>
                      </div>
                    </label>
                    
                    {/* Featured Product Checkbox */}
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.isFeatured} 
                        onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))} 
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-600" 
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-700">Mark as Featured Product</span>
                        <p className="text-xs text-gray-500">Featured products will appear in special sections</p>
                      </div>
                    </label>

                    {/* Product Tag Selection */}
                 {/* Product Tag Selection - Dynamic from backend */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Product Tag <span className="text-red-500">* (Select exactly one)</span>
  </label>
  {errors.tags && <p className="text-xs text-red-600 mb-2">{errors.tags}</p>}
  
  {isLoadingTags ? (
    <div className="flex justify-center py-4">
      <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
    </div>
  ) : productTags.length === 0 ? (
    <div className="text-center py-4 bg-gray-50 rounded-lg border border-gray-200">
      <p className="text-sm text-gray-500">No tags available. Please contact admin to create tags.</p>
    </div>
  ) : (
    <div className="grid grid-cols-2 gap-2">
      {productTags.map(tag => (
        <button 
          key={tag._id} 
          type="button" 
          onClick={() => handleTagSelect(tag._id)} 
          className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all text-sm ${
            formData.tags.includes(tag._id) 
              ? 'border-blue-600 bg-blue-50 text-blue-700' 
              : 'border-gray-200 hover:border-gray-300 text-gray-600'
          }`}
        >
          <img 
            src={tag.image.url} 
            alt={tag.name}
            className="w-5 h-5 rounded-full object-cover"
          />
          <span>{tag.name}</span>
        </button>
      ))}
    </div>
  )}
  
  {formData.tags.length > 0 && productTags.length > 0 && (
    <div className="mt-3 p-2 bg-green-50 rounded-lg border border-green-200">
      <p className="text-xs text-green-700 flex items-center gap-1">
        <CheckCircle className="w-3 h-3" /> 
        Selected tag: {productTags.find(t => t._id === formData.tags[0])?.name || 'Unknown'}
      </p>
    </div>
  )}
</div>
                  </div>
                </div>

                {/* Colors */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2"><Palette className="w-5 h-5 text-blue-600" /> Colors <span className="text-gray-400 text-xs">(Optional)</span></h2>
                  </div>
                  <div className="p-5">
                    <ColorPicker colors={formData.colors} onChange={(colors) => setFormData(prev => ({ ...prev, colors }))} />
                  </div>
                </div>

                {/* Status Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2"><Box className="w-5 h-5 text-blue-600" /> Product Status</h2>
                  </div>
                  <div className="p-5">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={true} disabled className="w-5 h-5 rounded border-gray-300 text-green-600" />
                      <div><span className="text-sm font-medium text-gray-700">Active Product</span><p className="text-xs text-gray-500">Product will be visible to customers</p></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Create Product Button at Bottom */}
            <div className="mt-8 flex justify-end">
              <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm shadow-md hover:shadow-lg">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isSubmitting ? 'Creating Product...' : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </MantineProvider>
  );
}