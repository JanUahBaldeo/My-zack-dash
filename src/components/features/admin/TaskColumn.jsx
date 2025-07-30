// === Professional Task Column Component ===

import { motion } from 'framer-motion';
import { 
  CalendarIcon,
  ClockIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

const TaskColumn = ({ title, color = 'gray', items = [] }) => {
  const colorConfig = {
    red: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-700',
      icon: 'text-red-600',
      badge: 'bg-red-100 text-red-700'
    },
    yellow: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-700',
      icon: 'text-amber-600',
      badge: 'bg-amber-100 text-amber-700'
    },
    green: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-700',
      icon: 'text-emerald-600',
      badge: 'bg-emerald-100 text-emerald-700'
    },
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      icon: 'text-blue-600',
      badge: 'bg-blue-100 text-blue-700'
    }
  };

  const config = colorConfig[color] || colorConfig.gray;

  const statusColorMap = {
    'On Track': 'admin-badge-success',
    'Pending': 'admin-badge-warning',
    'Overdue': 'admin-badge-error',
    'Completed': 'admin-badge-info'
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Overdue':
        return <ExclamationCircleIcon className="w-4 h-4" />;
      case 'Completed':
        return <CheckCircleIcon className="w-4 h-4" />;
      default:
        return <ClockIcon className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`admin-card ${config.bg} ${config.border} border-2 min-h-[400px]`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-white shadow-sm`}>
            <ClockIcon className={`w-5 h-5 ${config.icon}`} />
          </div>
          <div>
            <h3 className={`font-semibold ${config.text}`}>{title}</h3>
            <p className="text-sm text-slate-500">{items.length} tasks</p>
          </div>
        </div>
        <button className="p-2 hover:bg-white rounded-lg transition-colors duration-200">
          <PlusIcon className="w-4 h-4 text-slate-400 hover:text-slate-600" />
        </button>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
              <CheckCircleIcon className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-sm text-slate-500 font-medium">No tasks</p>
            <p className="text-xs text-slate-400">All caught up!</p>
          </div>
        ) : (
          items.map((task, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-slate-900 group-hover:text-slate-700 transition-colors">
                  {task.title || `Task ${i + 1}`}
                </h4>
                <div className="flex items-center gap-1">
                  {getStatusIcon(task.status)}
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                <CalendarIcon className="w-3 h-3" />
                <span>{task.dueDate || 'No due date'}</span>
              </div>

              {task.statuses?.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {task.statuses.map((status, idx) => (
                    <span
                      key={idx}
                      className={`${statusColorMap[status] || 'admin-badge-neutral'} text-xs`}
                    >
                      {status}
                    </span>
                  ))}
                </div>
              )}

              {/* Progress bar for visual appeal */}
              <div className="mt-3">
                <div className="admin-progress-bar h-1">
                  <div 
                    className={`admin-progress-fill bg-${color}-500`}
                    style={{ width: `${Math.random() * 100}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Footer */}
      {items.length > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-200">
          <button className="w-full text-sm text-slate-600 hover:text-slate-900 font-medium py-2 hover:bg-white rounded-lg transition-all duration-200">
            View all tasks
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default TaskColumn;