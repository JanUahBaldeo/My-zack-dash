// ========================================
// 🎯 PROFESSIONAL ADMIN DASHBOARD COMPONENT
// ========================================

import React from 'react';
import { Header, PipelineSection, TaskManagementSection, TaskColumn, DocumentChecklist, NotificationSection, CommunicationLog, QuickStats, Breadcrumb } from '@components';
import { PipelineProvider } from '@context/PipelineContext';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon,
  UsersIcon,
  CurrencyDollarIcon,
  TrendingUpIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  EyeIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  // Mock metrics data
  const metrics = [
    {
      title: 'Total Revenue',
      value: '$2,847,392',
      change: '+12.5%',
      changeType: 'positive',
      icon: CurrencyDollarIcon,
      color: 'emerald'
    },
    {
      title: 'Active Users',
      value: '14,892',
      change: '+8.2%',
      changeType: 'positive',
      icon: UsersIcon,
      color: 'blue'
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '-2.1%',
      changeType: 'negative',
      icon: TrendingUpIcon,
      color: 'purple'
    },
    {
      title: 'Page Views',
      value: '892,341',
      change: '+15.3%',
      changeType: 'positive',
      icon: EyeIcon,
      color: 'orange'
    }
  ];

  const taskColumns = [
    { title: 'Due today', color: 'red', items: [1, 2, 3] },
    { title: 'Follow-up', color: 'yellow', items: [1, 2] },
    { title: 'Pending', color: 'green', items: [1, 2] },
  ];

  const documentList = [
    { status: 'REQUIRED', name: 'Document 1', date: '06/01/2024' },
    { status: 'REQUIRED', name: 'Document 2', date: '06/03/2024' },
    { status: 'RECEIVED', name: 'Document 3', date: '06/05/2024', checked: true },
    { status: 'PENDING', name: 'Document 4', date: '06/10/2024' },
  ];

  return (
    <PipelineProvider>
      <div className="min-h-screen bg-slate-50">
        <Header />

        <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
              <p className="text-slate-600 mt-1">Welcome back, here's what's happening with your business today.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="admin-button-secondary">
                <ChartBarIcon className="w-4 h-4" />
                Export Report
              </button>
              <button className="admin-button-primary">
                <PlusIcon className="w-4 h-4" />
                Add New
              </button>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="admin-stats-grid">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="admin-metric-card group hover:scale-105 transition-transform duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-${metric.color}-50`}>
                    <metric.icon className={`w-6 h-6 text-${metric.color}-600`} />
                  </div>
                  <div className={`admin-metric-change ${metric.changeType}`}>
                    {metric.changeType === 'positive' ? (
                      <ArrowUpIcon className="w-4 h-4" />
                    ) : (
                      <ArrowDownIcon className="w-4 h-4" />
                    )}
                    {metric.change}
                  </div>
                </div>
                <div>
                  <div className="admin-metric-value">{metric.value}</div>
                  <div className="admin-metric-label">{metric.title}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pipeline Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="admin-section"
          >
            <div className="admin-section-header">
              <div>
                <h2 className="admin-section-title">Sales Pipeline</h2>
                <p className="admin-section-subtitle">Track your leads through the sales process</p>
              </div>
              <button className="admin-button-ghost">View All</button>
            </div>
            <div className="admin-card p-0 overflow-hidden">
              <PipelineSection isAdmin={true} />
            </div>
          </motion.section>

          {/* Task Management */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="admin-section"
          >
            <div className="admin-section-header">
              <div>
                <h2 className="admin-section-title">Task Management</h2>
                <p className="admin-section-subtitle">Manage your daily tasks and priorities</p>
              </div>
              <button className="admin-button-ghost">Manage Tasks</button>
            </div>
            <div className="admin-card p-0 overflow-hidden">
              <TaskManagementSection />
            </div>
          </motion.section>

          {/* Task Status & Documentation */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="admin-section"
          >
            <div className="admin-section-header">
              <div>
                <h2 className="admin-section-title">Task Status & Documentation</h2>
                <p className="admin-section-subtitle">Monitor task progress and document requirements</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {taskColumns.map((col, i) => (
                    <div key={i} className="min-w-[280px]">
                      <TaskColumn {...col} />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <DocumentChecklist documents={documentList} />
              </div>
            </div>
          </motion.section>

          {/* Notifications */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="admin-section"
          >
            <NotificationSection />
          </motion.section>

          {/* Communication & Stats */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="admin-section"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <CommunicationLog />
              </div>
              <div>
                <QuickStats />
              </div>
            </div>
          </motion.section>
        </main>
      </div>
    </PipelineProvider>
  );
};

export default AdminDashboard;