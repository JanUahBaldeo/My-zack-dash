import { motion } from 'framer-motion';
import MetricCard from '@ui/MetricCard';
import { 
  ChartBarIcon,
  CursorArrowRaysIcon,
  UsersIcon,
  TrendingUpIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';

const metrics = [
  {
    title: 'Email Open Rate',
    value: '58%',
    trend: '+18%',
    delta: '+3.8k this week',
    bg: 'emerald',
    data: [{ value: 35 }, { value: 48 }, { value: 44 }, { value: 58 }, { value: 60 }, { value: 65 }, { value: 58 }],
  },
  {
    title: 'Click-Through Rate',
    value: '24%',
    trend: '+12%',
    delta: '+1.2k this week',
    bg: 'blue',
    data: [{ value: 18 }, { value: 20 }, { value: 22 }, { value: 26 }, { value: 28 }, { value: 24 }, { value: 27 }],
  },
  {
    title: 'Contact Growth',
    value: '1.5k',
    trend: '+9%',
    delta: '+140 this week',
    bg: 'purple',
    data: [{ value: 900 }, { value: 1000 }, { value: 1200 }, { value: 1300 }, { value: 1350 }, { value: 1400 }, { value: 1500 }],
  },
];

const MarketingSection = () => {
  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <div>
          <h2 className="admin-section-title flex items-center gap-3">
            <ChartBarIcon className="w-6 h-6 text-slate-600" />
            Marketing Analytics
          </h2>
          <p className="admin-section-subtitle">Track your marketing performance and growth metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="admin-button-ghost">
            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            Export Data
          </button>
          <button className="admin-button-secondary">View Details</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Metric Cards */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="admin-card hover:shadow-lg transition-all duration-300"
            >
              <MetricCard {...metric} />
            </motion.div>
          ))}
        </div>
        
        {/* Insights Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="admin-card bg-gradient-to-br from-slate-900 to-slate-800 text-white"
        >
          <div className="text-center">
            {/* Icon */}
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <TrendingUpIcon className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-xl font-bold mb-4">
              Marketing Insights
            </h3>
            
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Your campaigns are performing <span className="text-emerald-400 font-semibold">exceptionally well</span> this quarter. 
              Email engagement is up 18% and lead quality has improved significantly.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <CursorArrowRaysIcon className="w-5 h-5 text-blue-400" />
                <div className="text-left">
                  <p className="text-sm font-medium">Click Rate</p>
                  <p className="text-xs text-slate-400">Above industry avg</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <UsersIcon className="w-5 h-5 text-emerald-400" />
                <div className="text-left">
                  <p className="text-sm font-medium">Audience Growth</p>
                  <p className="text-xs text-slate-400">Steady increase</p>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 bg-white text-slate-900 py-3 px-4 rounded-xl font-medium hover:bg-slate-100 transition-colors duration-200">
              View Full Report
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MarketingSection;