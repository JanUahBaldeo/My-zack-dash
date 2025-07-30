import React, { useState } from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  TrendingUpIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import StatModal from './StatModal';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' },
  }),
};

const chartData = [
  [{ value: 68 }, { value: 72 }, { value: 75 }, { value: 78 }, { value: 82 }],
  [{ value: 5 }, { value: 8 }, { value: 6 }, { value: 4 }, { value: 7 }],
  [{ value: 12 }, { value: 10 }, { value: 8 }, { value: 9 }, { value: 7 }],
];

const QuickStats = () => {
  const [selectedStat, setSelectedStat] = useState(null);

  const stats = [
    {
      title: 'Loans on Schedule',
      icon: <ChartBarIcon className="w-5 h-5" />,
      value: <CountUp end={82} duration={2} suffix="%" />,
      valueText: '82%',
      trend: 'up',
      change: '+6%',
      badge: 'This week',
      chart: chartData[0],
      color: 'emerald',
    },
    {
      title: 'Overdue Files',
      icon: <ExclamationTriangleIcon className="w-5 h-5" />,
      value: <CountUp end={7} duration={2} />,
      valueText: '7',
      trend: 'down',
      change: '-3',
      badge: 'From last week',
      chart: chartData[1],
      color: 'amber',
    },
    {
      title: 'Avg Processing Days',
      icon: <ClockIcon className="w-5 h-5" />,
      value: <CountUp end={12} duration={2} />,
      valueText: '12',
      trend: 'up',
      change: '+2',
      badge: 'Days',
      chart: chartData[2],
      color: 'blue',
    },
  ];

  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <div>
          <h2 className="admin-card-title flex items-center gap-2">
            <TrendingUpIcon className="w-5 h-5 text-slate-600" />
            Quick Stats
          </h2>
          <p className="admin-card-subtitle">Key performance indicators</p>
        </div>
      </div>

      <div className="space-y-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedStat(stat)}
            className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:shadow-md bg-${stat.color}-50/50 border-${stat.color}-200/60 hover:border-${stat.color}-300`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                <div className={`text-${stat.color}-600`}>
                  {stat.icon}
                </div>
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? (
                  <ArrowUpIcon className="w-4 h-4" />
                ) : (
                  <ArrowDownIcon className="w-4 h-4" />
                )}
                {stat.change}
              </div>
            </div>

            <div className="mb-3">
              <div className="text-2xl font-bold text-slate-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-slate-600">
                {stat.title}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className={`text-xs px-2 py-1 rounded-full bg-${stat.color}-100 text-${stat.color}-700 font-medium`}>
                {stat.badge}
              </span>
              <div className="w-16 h-8">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stat.chart}>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '12px',
                        color: '#fff',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={stat.color === 'emerald' ? '#10b981' : stat.color === 'amber' ? '#f59e0b' : '#3b82f6'}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <StatModal
        open={!!selectedStat}
        onClose={() => setSelectedStat(null)}
        stat={selectedStat}
      />
    </div>
  );
};

export default QuickStats;