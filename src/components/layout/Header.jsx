// ========================================
// 🎯 HEADER COMPONENT WITH MODERN DESIGN
// ========================================

import { SearchBox, ProfileInfo } from '@components';
import RoleSwitcher from './RoleSwitcher';
import { motion } from 'framer-motion';
import { useRole } from '@context/RoleContext';

const Header = () => {
  const { currentRole } = useRole();
  const displayName = 'Demo User';

  return (
    <header className="w-full bg-white border-b border-gray-200 px-6 py-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between max-w-7xl mx-auto"
      >
        {/* Left: Logo + Navigation */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#01818E] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-xl font-bold text-gray-900">TWISTY</span>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-gray-900 font-medium hover:text-[#01818E] transition-colors">Home</a>
            <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">Messages</a>
            <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">Discover</a>
            <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">Wallet</a>
            <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">Projects</a>
          </nav>
        </div>

        {/* Right: Search + Role Switcher + Profile */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your search request..."
              className="w-80 px-4 py-2 bg-gray-100 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-[#01818E] text-sm"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </button>
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2L13 9l7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>
            </svg>
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z"/>
            </svg>
          </button>
          <RoleSwitcher />
          <ProfileInfo />
        </div>
      </motion.div>
    </header>
  );
};

export default Header;