import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon,
  ArrowTrendingUpIcon,
  EyeIcon,
  CursorArrowRaysIcon,
  DocumentArrowDownIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

const CampaignSection = () => {
  const [activePoint, setActivePoint] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const lineData = [
    { name: 'Jan', value: 30, conversions: 12 },
    { name: 'Feb', value: 45, conversions: 18 },
    { name: 'Mar', value: 60, conversions: 24 },
    { name: 'Apr', value: 75, conversions: 30 },
    { name: 'May', value: 90, conversions: 36 },
    { name: 'Jun', value: 110, conversions: 44 },
  ];

  const pieData = [
    { name: 'Facebook Ads', value: 158, color: '#3b82f6' },
    { name: 'Google Ads', value: 222, color: '#8b5cf6' },
    { name: 'Email Marketing', value: 291, color: '#10b981' },
    { name: 'Organic Search', value: 330, color: '#f59e0b' },
  ];

  const totalLeads = pieData.reduce((sum, item) => sum + item.value, 0);

  const campaignStats = [
    { label: 'Total Impressions', value: '2.4M', icon: EyeIcon, color: 'blue' },
    { label: 'Click Rate', value: '3.2%', icon: CursorArrowRaysIcon, color: 'emerald' },
    { label: 'Conversion Rate', value: '12.5%', icon: ArrowTrendingUpIcon, color: 'purple' },
    { label: 'Cost per Lead', value: '$24', icon: FunnelIcon, color: 'amber' },
  ];

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <div>
          <h2 className="admin-section-title flex items-center gap-3">
            <ChartBarIcon className="w-6 h-6 text-slate-600" />
            Campaign Performance
          </h2>
          <p className="admin-section-subtitle">Monitor your advertising campaigns and lead generation</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="admin-button-ghost">
            <DocumentArrowDownIcon className="w-4 h-4" />
            Export Report
          </button>
          <button className="admin-button-secondary">Campaign Settings</button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {campaignStats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`admin-card p-4 bg-${stat.color}-50/50 border-${stat.color}-200/60`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* LINE CHART */}
        <div className="xl:col-span-2 admin-chart-container">
          <div className="admin-chart-header">
            <div>
              <h3 className="admin-chart-title">Campaign Trends</h3>
              <p className="admin-chart-subtitle">Lead generation over time</p>
            </div>
            <div className="flex gap-2">
              <button className="admin-button-ghost text-xs">6M</button>
              <button className="admin-button-ghost text-xs bg-slate-100">1Y</button>
              <button className="admin-button-ghost text-xs">All</button>
            </div>
          </div>
          
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={lineData} 
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                onMouseMove={(e) => setActivePoint(e?.activePayload?.[0]?.payload?.name)}
              >
                <XAxis 
                  dataKey="name" 
                  stroke="#64748b" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    color: '#f1f5f9', 
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }} 
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, fill: '#1d4ed8' }}
                />
                <Line
                  type="monotone"
                  dataKey="conversions"
                  stroke="#10b981"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* DONUT CHART */}
        <div className="admin-chart-container">
          <div className="admin-chart-header">
            <div>
              <h3 className="admin-chart-title">Lead Sources</h3>
              <p className="admin-chart-subtitle">Distribution by channel</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-[280px] h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={2}
                    onMouseEnter={(_, i) => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="#fff"
                        strokeWidth={2}
                        style={{
                          filter: hoveredIndex === index ? 'brightness(1.1)' : 'none',
                          transform: hoveredIndex === index ? 'scale(1.02)' : 'scale(1)',
                          transformOrigin: 'center',
                          transition: 'all 0.2s ease',
                        }}
                      />
                    ))}
                  </Pie>
                  {/* Center Labels */}
                  <text
                    x="50%"
                    y="45%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-2xl font-bold fill-slate-900"
                  >
                    {totalLeads.toLocaleString()}
                  </text>
                  <text
                    x="50%"
                    y="55%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm fill-slate-500"
                  >
                    Total Leads
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Legend */}
            <div className="w-full mt-6 space-y-3">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm font-medium text-slate-700">{entry.name}</span>
                  </div>
                  <div className="text-sm font-semibold text-slate-900">
                    {entry.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignSection;