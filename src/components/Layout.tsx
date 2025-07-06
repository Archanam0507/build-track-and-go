
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Home, 
  Camera, 
  FileText, 
  Package, 
  CreditCard, 
  Palette, 
  BarChart3, 
  Users, 
  LogOut,
  Menu,
  X,
  Warehouse
} from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userProfile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  // Navigation items based on role
  const getNavigationItems = () => {
    const baseItems = [
      { path: '/', label: 'Dashboard', icon: Home }
    ];

    const allItems = [
      { path: '/daily-updates', label: 'Daily Updates', icon: Camera },
      { path: '/blueprints', label: 'Blueprints', icon: FileText },
      { path: '/materials', label: 'Materials', icon: Package },
      { path: '/stock-tracker', label: 'Stock Tracker', icon: Warehouse },
      { path: '/payments', label: 'Payments', icon: CreditCard },
      { path: '/paint-picker', label: 'Paint Picker', icon: Palette },
      { path: '/progress-tracker', label: 'Progress Tracker', icon: BarChart3 },
      { path: '/contacts', label: 'Contacts', icon: Users }
    ];

    // All users can access all features, but with different permissions
    return [...baseItems, ...allItems];
  };

  const navItems = getNavigationItems();

  // Get role-specific header info
  const getRoleInfo = () => {
    if (!userProfile) return '';
    
    switch (userProfile.role) {
      case 'site_manager':
        return 'Full Platform Access';
      case 'owner':
        return userProfile.assigned_site ? `Site Owner: ${userProfile.assigned_site}` : 'No Site Assigned';
      default:
        return '';
    }
  };

  const getRoleName = () => {
    if (!userProfile) return '';
    return userProfile.role === 'site_manager' ? 'Site Manager' : 'Land Owner';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div className="flex-shrink-0 ml-2 md:ml-0">
                <h1 className="text-xl font-bold text-blue-600">Construction Tracker</h1>
                <p className="text-xs text-gray-500">Professional Site Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img
                  className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center"
                  src={`https://ui-avatars.com/api/?name=${userProfile?.name}&background=3b82f6&color=fff`}
                  alt={userProfile?.name}
                />
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{userProfile?.name}</p>
                  <p className="text-xs text-gray-500">{getRoleName()}</p>
                  <p className="text-xs text-blue-600">{getRoleInfo()}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md"
                title="Sign out"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block w-64 bg-white shadow-sm min-h-screen`}>
          <div className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
