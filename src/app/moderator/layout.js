

// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import { 
//   LayoutDashboard, 
//   ShoppingBag, 
//   PackagePlus,
//   Users, 
//   BarChart3, 
//   Settings, 
//   LogOut,
//   Menu,
//   X,
//   Bell,
//   ChevronDown,
//   MessageSquare,
//   Home,
//   ChevronRight,
//   Image,
//   Eye,
//   FileEdit,
//   ClipboardList,
//   HelpCircle,
//   FolderPlus,
//   Newspaper,
//   Edit,
//   Star,
//   Sparkles,
//   Gift,
//   Rocket,
//   Award,
//   Ticket,
//   Truck,
//   QrCode,
//   ScanBarcode,
//   Cpu,
//   PanelTop,
//   LayoutTemplate,
//   Tag
// } from 'lucide-react';

// export default function ModeratorLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const pathname = usePathname();
//   const router = useRouter();

//   // Helper function to normalize pathname (remove trailing slash)
//   const normalizePath = (path) => {
//     if (path && path !== '/' && path.endsWith('/')) {
//       return path.slice(0, -1);
//     }
//     return path;
//   };

//   // Helper function to check if a route is active
//   const isActive = (href) => {
//     const currentPath = normalizePath(pathname);
    
//     // Dashboard
//     if (href === '/moderator/dashboard') {
//       return currentPath === '/moderator/dashboard';
//     }
    
//     // Create Categories
//     if (href === '/moderator/create-categories') {
//       return currentPath === '/moderator/create-categories' || 
//              currentPath === '/moderator/createCategory' ||
//              currentPath.startsWith('/moderator/create-categories/');
//     }
    
//     // Create Products
//     if (href === '/moderator/create-products') {
//       return currentPath === '/moderator/create-products' || 
//              currentPath === '/moderator/createProduct' ||
//              currentPath.startsWith('/moderator/create-products/');
//     }
    
//     // All Products
//     if (href === '/moderator/all-products') {
//       return currentPath === '/moderator/all-products' || 
//              currentPath === '/moderator/editProduct' ||
//              currentPath === '/moderator/viewProduct' ||
//              currentPath.startsWith('/moderator/all-products/') ||
//              currentPath.startsWith('/moderator/products/');
//     }
    
//     // Inquiries
//     if (href === '/moderator/orders') {
//       return currentPath === '/moderator/orders' || 
//              currentPath.startsWith('/moderator/orders/');
//     } 
//     if (href === '/moderator/tags') {
//       return currentPath === '/moderator/tags' || 
//              currentPath.startsWith('/moderator/tags/');
//     }
    
//     // if (href === '/moderator/barcodes') {
//     //   return currentPath === '/moderator/barcodes' || 
//     //          currentPath.startsWith('/moderator/barcodes/');
//     // } 
    
//     // if (href === '/moderator/barcode-scanner') {
//     //   return currentPath === '/moderator/barcode-scanner' || 
//     //          currentPath.startsWith('/moderator/barcode-scanner/');
//     // }

//     // if (href === '/moderator/coupon') {
//     //   const matches = ['/moderator/coupon', '/moderator/coupon'].some(route => currentPath === route);
//     //   if (matches) return true;
//     //   return false;
//     // } 
    
//     if (href === '/moderator/delivery-settings') {
//       return currentPath === '/moderator/delivery-settings' || 
//              currentPath.startsWith('/moderator/delivery-settings/');
//     } 
//     if (href === '/moderator/create-banner') {
//       return currentPath === '/moderator/create-banner' || 
//              currentPath.startsWith('/moderator/create-banner/');
//     }
//      if (href === '/moderator/banner-management') {
//       return currentPath === '/moderator/banner-management' || 
//              currentPath.startsWith('/moderator/banner-management/');
//     }
    
//     // Create Blog
//     if (href === '/moderator/create-blog') {
//       return currentPath === '/moderator/create-blog';
//     }
    
//     // Manage Blogs
//     if (href === '/moderator/manage-blogs') {
//       return currentPath === '/moderator/manage-blogs' || 
//              currentPath === '/moderator/editBlog' ||
//              currentPath.startsWith('/moderator/manage-blogs/') ||
//              currentPath.startsWith('/moderator/allBlogs/');
//     }
    
//     // Manage Reviews
//     if (href === '/moderator/manage-reviews') {
//       return currentPath === '/moderator/manage-reviews' || 
//              currentPath.startsWith('/moderator/manage-reviews/');
//     }
    
//     // Settings
//     if (href === '/moderator/settings') {
//       return currentPath === '/moderator/settings' || 
//              currentPath.startsWith('/moderator/settings/');
//     }
    
//     return false;
//   };

//   useEffect(() => {
//     document.body.style.margin = '0';
//     document.body.style.padding = '0';
    
//     const token = localStorage.getItem('token');
//     const userData = localStorage.getItem('user');
    
//     if (!token || !userData) {
//       logout();
//       return;
//     }

//     try {
//       const parsedUser = JSON.parse(userData);
      
//       if (parsedUser.role !== 'moderator') {
//         logout();
//         return;
//       }

//       setUser(parsedUser);
//     } catch (error) {
//       console.error('Error parsing user data:', error);
//       logout();
//     } finally {
//       setIsLoading(false);
//     }
//   }, [router]);

//   const navigation = [
//     { name: 'Dashboard', href: '/moderator/dashboard', icon: LayoutDashboard },
//     { name: 'Create Categories', href: '/moderator/create-categories', icon: FolderPlus },
//         { name: 'Manage Tags', href: '/moderator/tags', icon: Tag },
//     { name: 'Create Products', href: '/moderator/create-products', icon: PackagePlus },
//     { name: 'All Products', href: '/moderator/all-products', icon: ShoppingBag },

//     { name: 'All Orders', href: '/moderator/orders', icon: MessageSquare },
//     // { name: 'All Barcodes', href: '/moderator/barcodes', icon: QrCode },
//     // { name: 'Barcodes Scan', href: '/moderator/barcode-scanner', icon: ScanBarcode },
//     // { name: 'Manage Coupon', href: '/moderator/coupon', icon: Ticket },
//     { name: 'Delivery Settings', href: '/moderator/delivery-settings', icon: Truck },
//     { name: 'Create Banner', href: '/moderator/create-banner', icon:  PanelTop },
//     { name: 'Manage Banners', href: '/moderator/banner-management', icon:   LayoutTemplate },

//     // { name: 'Create Blog', href: '/moderator/create-blog', icon: Newspaper },
//     // { name: 'Manage Blogs', href: '/moderator/manage-blogs', icon: Edit },
//     // { name: 'Manage Reviews', href: '/moderator/manage-reviews', icon: Star },
//     { name: 'Settings', href: '/moderator/settings', icon: Settings }
//   ];

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     router.push('/login');
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading Moderator Dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <style jsx global>{`
//         html, body {
//           margin: 0 !important;
//           padding: 0 !important;
//           overflow-x: hidden;
//           font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
//         }
//         * {
//           box-sizing: border-box;
//         }
//       `}</style>
      
//       <div className="min-h-screen bg-white" style={{ margin: 0, padding: 0 }}>
//         {/* Mobile sidebar backdrop */}
//         {sidebarOpen && (
//           <div 
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
//             onClick={() => setSidebarOpen(false)}
//           />
//         )}

//         {/* Sidebar - White background with black active state */}
//         <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
//           sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         }`}>
//           {/* Sidebar header with logo */}
//           <div className="h-20 flex items-center justify-center px-6 border-b border-gray-200 bg-white">
//             <div className="flex items-center justify-center w-full">
//               <Link href="/" className="flex items-center justify-center">
//                 <img 
//                   src="/logo.png" 
//                   alt="Smart Gadget Logo" 
//                   style={{ width: '120px', height: 'auto' }}
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.style.display = 'none';
//                     const parent = e.target.parentElement;
//                     const fallback = document.createElement('div');
//                     fallback.className = 'flex items-center gap-2';
//                     fallback.innerHTML = `
//                       <svg class="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//                         <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
//                         <circle cx="12" cy="12" r="3"/>
//                       </svg>
//                       <span class="text-xl font-bold text-gray-900">Smart Gadget</span>
//                     `;
//                     parent.appendChild(fallback);
//                   }}
//                 />
//               </Link>
//             </div>
//           </div>

//           {/* User info - In sidebar below header */}
//           {user && (
//             <div className="px-4 py-4 border-b border-gray-100 bg-gray-50">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold text-lg shadow-sm bg-black">
//                   {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-semibold text-gray-900 truncate">
//                     {user.contactPerson || 'Moderator User'}
//                   </p>
//                   <p className="text-xs text-gray-500 truncate mt-0.5">
//                     {user.email}
//                   </p>
//                   <div className="flex items-center gap-1.5 mt-1.5">
//                     <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
//                     <span className="text-xs font-medium text-blue-600">
//                       Moderator
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Navigation */}
//           <nav className="px-3 py-4 h-[calc(100vh-11rem)] overflow-y-auto pb-24 custom-scroll">
//             <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">MODERATOR MENU</p>
//             <div className="space-y-1">
//               {navigation.map((item) => {
//                 const active = isActive(item.href);
//                 return (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all ${
//                       active
//                         ? 'bg-black text-white shadow-md'
//                         : 'text-gray-700 hover:bg-gray-100'
//                     }`}
//                   >
//                     <div className="flex items-center gap-3">
//                       <item.icon className={`w-5 h-5 ${
//                         active ? 'text-white' : 'text-gray-400'
//                       }`} />
//                       <span>{item.name}</span>
//                     </div>
//                     {active && <ChevronRight className="w-4 h-4 text-white" />}
//                   </Link>
//                 );
//               })}
//             </div>
//           </nav>

//           {/* Logout button at bottom */}
//           <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
//             <button
//               onClick={logout}
//               className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-red-50 hover:text-red-600 w-full transition-all group"
//             >
//               <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-red-100 flex items-center justify-center">
//                 <LogOut className="w-4 h-4 text-gray-500 group-hover:text-red-600" />
//               </div>
//               <span>Logout</span>
//             </button>
//           </div>
//         </div>

//         {/* Main content */}
//         <div className="lg:ml-72 min-h-screen">
//           {/* Top header */}
//           <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm" style={{ margin: 0 }}>
//             <div className="px-4 sm:px-6 lg:px-8" style={{ margin: 0 }}>
//               <div className="flex items-center justify-between h-20" style={{ margin: 0 }}>
//                 {/* Left section */}
//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() => setSidebarOpen(true)}
//                     className="lg:hidden w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
//                   >
//                     <Menu className="w-5 h-5" />
//                   </button>
                  
//                   {/* Welcome Message */}
//                   {user && (
//                     <div>
//                       <span className="text-lg md:text-2xl font-bold text-gray-800">Welcome back,</span>
//                       <span className="text-lg md:text-2xl ml-2 text-blue-600">{user.contactPerson || 'Moderator'}</span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Right section */}
//                 <div className="flex items-center gap-3">
//                   <Link 
//                     href="/" 
//                     className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
//                     title="Go to Homepage"
//                   >
//                     <Home className="w-5 h-5" />
//                   </Link>

//                   {/* User Dropdown */}
//                   {user && (
//                     <div className="relative">
//                       <button
//                         onClick={() => setUserMenuOpen(!userMenuOpen)}
//                         className="flex items-center gap-3 pl-3 pr-2 py-2 rounded-lg hover:bg-gray-100 transition-colors"
//                       >
//                         <div className="text-right hidden md:block">
//                           <p className="text-sm font-medium text-gray-800">{user.contactPerson || 'Moderator'}</p>
//                           <p className="text-xs text-gray-500">{user.email}</p>
//                         </div>
//                         <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold text-sm bg-gradient-to-r from-blue-600 to-blue-500">
//                           {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
//                         </div>
//                         <ChevronDown className={`w-4 h-5 text-gray-500 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
//                       </button>

//                       {/* Dropdown Menu */}
//                       {userMenuOpen && (
//                         <>
//                           <div 
//                             className="fixed inset-0 z-40"
//                             onClick={() => setUserMenuOpen(false)}
//                           />
//                           <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
//                             <div className="px-4 py-3 border-b border-gray-100">
//                               <p className="text-sm font-semibold text-gray-900">{user.contactPerson || 'Moderator'}</p>
//                               <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
//                               <div className="flex items-center gap-2 mt-2">
//                                 <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-50 text-blue-600">
//                                   Moderator
//                                 </span>
//                               </div>
//                             </div>
                            
//                             <Link
//                               href="/moderator/settings"
//                               className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
//                               onClick={() => setUserMenuOpen(false)}
//                             >
//                               <Settings className="w-4 h-4 text-gray-500" />
//                               <span>Settings</span>
//                             </Link>
                            
//                             <button
//                               onClick={() => {
//                                 setUserMenuOpen(false);
//                                 logout();
//                               }}
//                               className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left border-t border-gray-100 mt-1 pt-2"
//                             >
//                               <LogOut className="w-4 h-4" />
//                               <span>Logout</span>
//                             </button>
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </header>

//           {/* Page content */}
//           <main className="" style={{ margin: 0, padding: 0 }}>
//             {children}
//           </main>
//         </div>
//       </div>

//       {/* Add custom scrollbar styles */}
//       <style jsx>{`
//         .custom-scroll::-webkit-scrollbar {
//           width: 5px;
//         }
//         .custom-scroll::-webkit-scrollbar-track {
//           background: #f1f1f1;
//           border-radius: 10px;
//         }
//         .custom-scroll::-webkit-scrollbar-thumb {
//           background: #3b82f6;
//           border-radius: 10px;
//         }
//         .custom-scroll::-webkit-scrollbar-thumb:hover {
//           background: #2563eb;
//         }
//       `}</style>
//     </>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  PackagePlus,
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  MessageSquare,
  Home,
  ChevronRight,
  Image,
  Eye,
  FileEdit,
  ClipboardList,
  HelpCircle,
  FolderPlus,
  Newspaper,
  Edit,
  Star,
  Sparkles,
  Gift,
  Rocket,
  Award,
  Ticket,
  Truck,
  QrCode,
  ScanBarcode,
  Cpu,
  PanelTop,
  LayoutTemplate,
  Tag,
  Heart,
  Store
} from 'lucide-react';

export default function ModeratorLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // Helper function to normalize pathname (remove trailing slash)
  const normalizePath = (path) => {
    if (path && path !== '/' && path.endsWith('/')) {
      return path.slice(0, -1);
    }
    return path;
  };

  // Helper function to check if a route is active
  const isActive = (href) => {
    const currentPath = normalizePath(pathname);
    
    // Dashboard
    if (href === '/moderator/dashboard') {
      return currentPath === '/moderator/dashboard';
    }
    
    // Create Categories
    if (href === '/moderator/create-categories') {
      return currentPath === '/moderator/create-categories' || 
             currentPath === '/moderator/createCategory' ||
             currentPath.startsWith('/moderator/create-categories/');
    }
    
    // Create Products
    if (href === '/moderator/create-products') {
      return currentPath === '/moderator/create-products' || 
             currentPath === '/moderator/createProduct' ||
             currentPath.startsWith('/moderator/create-products/');
    }
    
    // All Products
    if (href === '/moderator/all-products') {
      return currentPath === '/moderator/all-products' || 
             currentPath === '/moderator/editProduct' ||
             currentPath === '/moderator/viewProduct' ||
             currentPath.startsWith('/moderator/all-products/') ||
             currentPath.startsWith('/moderator/products/');
    }
    
    // Inquiries
    if (href === '/moderator/orders') {
      return currentPath === '/moderator/orders' || 
             currentPath.startsWith('/moderator/orders/');
    } 
    if (href === '/moderator/tags') {
      return currentPath === '/moderator/tags' || 
             currentPath.startsWith('/moderator/tags/');
    }
    
    if (href === '/moderator/delivery-settings') {
      return currentPath === '/moderator/delivery-settings' || 
             currentPath.startsWith('/moderator/delivery-settings/');
    } 
    if (href === '/moderator/create-banner') {
      return currentPath === '/moderator/create-banner' || 
             currentPath.startsWith('/moderator/create-banner/');
    }
     if (href === '/moderator/banner-management') {
      return currentPath === '/moderator/banner-management' || 
             currentPath.startsWith('/moderator/banner-management/');
    }
    
    // Settings
    if (href === '/moderator/settings') {
      return currentPath === '/moderator/settings' || 
             currentPath.startsWith('/moderator/settings/');
    }
    
    return false;
  };

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      logout();
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      
      if (parsedUser.role !== 'moderator') {
        logout();
        return;
      }

      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const navigation = [
    { name: 'Dashboard', href: '/moderator/dashboard', icon: LayoutDashboard },
    { name: 'Create Categories', href: '/moderator/create-categories', icon: FolderPlus },
    { name: 'Manage Tags', href: '/moderator/tags', icon: Tag },
    { name: 'Create Products', href: '/moderator/create-products', icon: PackagePlus },
    { name: 'All Products', href: '/moderator/all-products', icon: ShoppingBag },
    { name: 'All Orders', href: '/moderator/orders', icon: MessageSquare },
    { name: 'Delivery Settings', href: '/moderator/delivery-settings', icon: Truck },
    { name: 'Create Banner', href: '/moderator/create-banner', icon: PanelTop },
    { name: 'Manage Banners', href: '/moderator/banner-management', icon: LayoutTemplate },
    { name: 'Settings', href: '/moderator/settings', icon: Settings }
  ];

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Moderator Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          overflow-x: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-pink-50/50 via-white to-rose-50/30" style={{ margin: 0, padding: 0 }}>
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Beauty theme */}
        <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-white via-pink-50/30 to-white shadow-2xl border-r border-pink-100 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {/* Sidebar header with logo */}
          <div className="h-20 flex items-center justify-center px-6 border-b border-pink-100 bg-gradient-to-r from-pink-50/50 to-rose-50/50">
            <div className="flex items-center justify-center w-full">
              <Link href="/">
                <img 
                  src="/logo.png" 
                  alt="BeautyBucket Logo" 
                  className="h-22 w-auto object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    const parent = e.target.parentElement;
                    const fallback = document.createElement('span');
                    fallback.className = 'text-2xl font-bold text-pink-600';
                    fallback.textContent = 'BB';
                    parent.appendChild(fallback);
                  }}
                />
              </Link>
            </div>
          </div>

          {/* User info - In sidebar below header */}
          {user && (
            <div className="px-4 py-4 border-b border-pink-100 bg-gradient-to-r from-pink-50/30 to-rose-50/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold text-lg shadow-lg bg-gradient-to-br from-pink-500 to-rose-500">
                  {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user.contactPerson || 'Moderator User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate mt-0.5">
                    {user.email}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                    <span className="text-xs font-medium text-pink-600">
                      Moderator
                    </span>
                    <Sparkles className="w-3 h-3 text-pink-400 ml-1" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="px-3 py-4 h-[calc(100vh-11rem)] overflow-y-auto pb-24 custom-scroll">
            <div className="flex items-center gap-2 px-3 mb-4">
              <Sparkles className="w-3 h-3 text-pink-400" />
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">MODERATOR MENU</p>
            </div>
            <div className="space-y-1">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      active
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-200/50'
                        : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-5 h-5 ${
                        active ? 'text-white' : 'text-gray-400 group-hover:text-pink-500'
                      }`} />
                      <span>{item.name}</span>
                    </div>
                    {active && <ChevronRight className="w-4 h-4 text-white" />}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Logout button at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-pink-100 bg-gradient-to-r from-pink-50/30 to-rose-50/30 backdrop-blur">
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-rose-50 hover:text-rose-600 w-full transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-pink-100 group-hover:bg-rose-100 flex items-center justify-center">
                <LogOut className="w-4 h-4 text-pink-500 group-hover:text-rose-600" />
              </div>
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:ml-72 min-h-screen">
          {/* Top header - Beauty theme */}
          <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-pink-100 shadow-sm" style={{ margin: 0 }}>
            <div className="px-4 sm:px-6 lg:px-8" style={{ margin: 0 }}>
              <div className="flex items-center justify-between h-20" style={{ margin: 0 }}>
                {/* Left section */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center text-pink-600 hover:bg-pink-100 transition-colors"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                  
                  {/* Welcome Message */}
                  {user && (
                    <div className="flex items-center gap-2">
                      <span className="text-lg md:text-2xl font-bold text-gray-800">Welcome back,</span>
                      <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">{user.contactPerson || 'Moderator'}</span>
                      <Sparkles className="w-5 h-5 text-pink-400 hidden md:block" />
                    </div>
                  )}
                </div>

                {/* Right section */}
                <div className="flex items-center gap-3">
                  <Link 
                    href="/" 
                    className="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center text-pink-600 hover:bg-pink-100 transition-colors group"
                    title="Go to Homepage"
                  >
                    <Store className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </Link>

                  {/* User Dropdown */}
                  {user && (
                    <div className="relative">
                      <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="flex items-center gap-3 pl-3 pr-2 py-2 rounded-lg hover:bg-pink-50 transition-colors"
                      >
                        <div className="text-right hidden md:block">
                          <p className="text-sm font-medium text-gray-800">{user.contactPerson || 'Moderator'}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold text-sm bg-gradient-to-br from-pink-500 to-rose-500 shadow-md">
                          {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
                        </div>
                        <ChevronDown className={`w-4 h-4 text-pink-500 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown Menu */}
                      {userMenuOpen && (
                        <>
                          <div 
                            className="fixed inset-0 z-40"
                            onClick={() => setUserMenuOpen(false)}
                          />
                          <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-pink-100 py-2 z-50">
                            <div className="px-4 py-3 border-b border-pink-100 bg-gradient-to-r from-pink-50/30 to-rose-50/30 rounded-t-2xl">
                              <p className="text-sm font-semibold text-gray-900">{user.contactPerson || 'Moderator'}</p>
                              <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gradient-to-r from-pink-100 to-rose-100 text-pink-600">
                                  Moderator
                                </span>
                                <Sparkles className="w-3 h-3 text-pink-400" />
                              </div>
                            </div>
                            
                            <Link
                              href="/moderator/settings"
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-pink-50 transition-colors"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              <Settings className="w-4 h-4 text-pink-500" />
                              <span>Settings</span>
                            </Link>
                            
                            <button
                              onClick={() => {
                                setUserMenuOpen(false);
                                logout();
                              }}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors w-full text-left border-t border-pink-100 mt-1 pt-2 rounded-b-2xl"
                            >
                              <LogOut className="w-4 h-4" />
                              <span>Logout</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="" style={{ margin: 0, padding: 0 }}>
            {children}
          </main>
        </div>
      </div>

      {/* Add custom scrollbar styles */}
      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #fdf2f8;
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #ec4899, #f43f5e);
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #db2777, #e11d48);
        }
      `}</style>
    </>
  );
}