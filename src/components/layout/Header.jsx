// ========================================
// 🎯 PROFESSIONAL ADMIN HEADER COMPONENT
// ========================================

import { SearchBox, ProfileInfo } from '@components';
import RoleSwitcher from './RoleSwitcher';
import { motion } from 'framer-motion';
import { useRole } from '@context/RoleContext';
import { 
  BellIcon, 
  Cog6ToothIcon, 
  MagnifyingGlassIcon,
  ChevronDownIcon,
  HomeIcon,
  ChartBarIcon,
  UsersIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const Header = () => {
  const { currentRole } = useRole();
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Mock user data
  const displayName = 'Sarah Johnson';
  const userRole = 'Senior Administrator';

  // Navigation items
  const navItems = [
    { name: 'Dashboard', icon: HomeIcon, href: '/', active: true },
    { name: 'Analytics', icon: ChartBarIcon, href: '/analytics' },
    { name: 'Users', icon: UsersIcon, href: '/users' },
    { name: 'Reports', icon: DocumentTextIcon, href: '/reports' },
  ];

  return (
    <header className="admin-header sticky top-0 z-30 backdrop-blur-sm bg-white/95">
      <div className="admin-header-content max-w-7xl mx-auto">
        {/* Left Section - Logo & Navigation */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-slate-900">AdminPro</h1>
              <p className="text-xs text-slate-500">Professional Dashboard</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  item.active
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Right Section - Search, Actions, Profile */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:block relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-64 pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200"
              >
                <BellIcon className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="admin-dropdown w-80 right-0"
                >
                  <div className="p-4 border-b border-slate-100">
                    <h3 className="font-semibold text-slate-900">Notifications</h3>
                    <p className="text-sm text-slate-500">You have 3 new notifications</p>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 border-b border-slate-50 hover:bg-slate-50">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <ChartBarIcon className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900">New report generated</p>
                            <p className="text-xs text-slate-500 mt-1">Monthly analytics report is ready</p>
                            <p className="text-xs text-slate-400 mt-1">2 minutes ago</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-slate-100">
                    <button className="w-full text-sm text-slate-600 hover:text-slate-900 font-medium">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Settings */}
            <button className="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200">
              <Cog6ToothIcon className="w-5 h-5" />
            </button>

            {/* Role Switcher */}
            <RoleSwitcher />
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-slate-900">{displayName}</p>
              <p className="text-xs text-slate-500">{userRole}</p>
            </div>
            <div className="admin-avatar-lg">
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face"
                alt={displayName}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <ChevronDownIcon className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;