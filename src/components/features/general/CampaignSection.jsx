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

const CampaignSection = () => {
  const [activePoint, setActivePoint] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const lineData = [
    { name: 'Jan', value: 30 },
    { name: 'Feb', value: 45 },
    { name: 'Mar', value: 60 },
    { name: 'Apr', value: 75 },
    { name: 'May', value: 90 },
    { name: 'Jun', value: 110 },
  ];

  const pieData = [
    { name: 'Facebook ads', value: 158, color: '#f87171' },
    { name: 'Health and Careness', value: 222, color: '#a78bfa' },
    { name: 'Lorem ipsum', value: 291, color: '#60a5fa' },
    { name: 'Others', value: 330, color: '#facc15' },
  ];

  const totalLeads = pieData.reduce((sum, item) => sum + item.value, 0);

  useEffect(() => {
    const timer = setTimeout(() => setActivePoint(null), 3000);
    return () => clearTimeout(timer);
  }, [activePoint]);

  const axisColor = '#64748b';
  const tooltipBg = '#ffffff';
  const tooltipText = '#0f172a';

  return (
    <section className="px-6 sm:px-8 lg:px-12 py-12">
      <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="px-8 py-8 bg-gray-50">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-3">
            Campaign Analytics
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-[#01818E] to-cyan-400 rounded-full" />
        </div>
        
        {/* Content */}
        <div className="px-8 py-8">
          <div className="flex flex-col xl:flex-row gap-8">
            {/* LINE CHART */}
            <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Top Performing Campaigns
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => window.open('/api/export-campaigns/csv', '_blank')}
                    className="text-sm text-white bg-[#01818E] px-4 py-2 rounded-full hover:bg-[#01818E]/90 transition-all shadow-sm">
                    Export CSV
                  </button>
                  <button onClick={() => window.open('/api/export-campaigns/pdf', '_blank')}
                    className="text-sm text-white bg-pink-500 px-4 py-2 rounded-full hover:bg-pink-600 transition-all shadow-sm">
                    Export PDF
                  </button>
                  <button className="text-sm text-white bg-[#01818E] px-4 py-2 rounded-full hover:bg-[#01818E]/90 transition-all shadow-sm">
                    Filter ⚙️
                  </button>
                </div>
              </div>
              
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                    onMouseMove={(e) => setActivePoint(e?.activePayload?.[0]?.payload?.name)}>
                    <XAxis dataKey="name" stroke={axisColor} />
                    <YAxis stroke={axisColor} />
                    <Tooltip contentStyle={{ background: tooltipBg, color: tooltipText, borderRadius: '8px' }} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#01818E"
                      strokeWidth={3}
                      dot={({ cx, cy }) => (
                        <circle
                          key={`${cx}-${cy}`}
                          cx={cx}
                          cy={cy}
                          r={5}
                          fill="white"
                          stroke="#01818E"
                          strokeWidth={2}
                        />
                      )}
                      activeDot={{ r: 8 }}
                      isAnimationActive={true}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              {activePoint && (
                <div className="text-right text-sm text-[#01818E] mt-4 font-medium">
                  Hovering: {activePoint}
                </div>
              )}
            </div>
            
            {/* DONUT CHART */}
            <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">
                Lead Source Breakdown
              </h3>
              
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="relative w-full max-w-[300px] h-[300px] mx-auto">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <defs>
                        {pieData.map((entry, index) => (
                          <linearGradient id={`grad-${index}`} key={`grad-${index}`} x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor={entry.color} />
                            <stop offset="100%" stopColor={entry.color} stopOpacity={0.6} />
                          </linearGradient>
                        ))}
                      </defs>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        startAngle={90}
                        endAngle={-270}
                        paddingAngle={2}
                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                        onMouseEnter={(_, i) => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={`url(#grad-${index})`}
                            stroke="#fff"
                            strokeWidth={hoveredIndex === index ? 3 : 2}
                            style={{
                              transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                              filter: hoveredIndex === index ? 'drop-shadow(0 0 6px rgba(0,0,0,0.3))' : 'none',
                              transformOrigin: 'center',
                              transition: 'all 0.3s ease',
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
                        className="text-xl font-bold fill-[#01818E]"
                      >
                        {totalLeads}
                      </text>
                      <text
                        x="50%"
                        y="57%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-sm fill-[#01818E]"
                      >
                        Total Leads
                      </text>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Legend */}
                <ul className="text-sm text-gray-700 space-y-4">
                  {pieData.map((entry, index) => (
                    <li key={`legend-${index}`} className="flex items-center gap-3">
                      <span
                        className="w-4 h-4 rounded-full inline-block shadow-sm"
                        style={{
                          backgroundImage: `linear-gradient(135deg, ${entry.color}, ${entry.color}99)`
                        }}
                      ></span>
                      <span className="font-medium">{entry.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6 text-xs text-gray-500 text-right">
                Last updated: just now
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampaignSection;
