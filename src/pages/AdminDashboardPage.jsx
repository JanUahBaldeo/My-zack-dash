// ========================================
// 🎯 ADMIN DASHBOARD PAGE WITH ALIASED IMPORTS
// ========================================

import React from 'react';
import { Header, AdminDashboard } from '@components';
import { motion } from 'framer-motion';

const AdminDashboardPage = () => {

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <Header title="Admin Panel" />

      {/* 📍 Breadcrumb / Page Context */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto px-6 pt-6 pb-2"
      >
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Admin / Dashboard</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-teal-700 dark:text-teal-300 tracking-tight">
          Dashboard Overview
        </h1>
      </motion.div>

      {/* 🧩 Admin Dashboard Content */}
      <main className="max-w-7xl mx-auto px-6 py-6 space-y-10">
        <AdminDashboard />
      </main>
    </div>
  );
};

export default AdminDashboardPage;
