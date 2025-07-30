import { motion } from 'framer-motion';
import MetricCard from '@ui/MetricCard';

const metrics = [
  {
    title: 'Email Open Rate',
    value: '58%',
    trend: '+18%',
    delta: '+3.8k this week',
    bg: 'mint',
    data: [{ value: 35 }, { value: 48 }, { value: 44 }, { value: 58 }, { value: 60 }, { value: 65 }, { value: 58 }],
  },
  {
    title: 'Click-Through Rate',
    value: '24%',
    trend: '+12%',
    delta: '+1.2k this week',
    bg: 'lemon',
    data: [{ value: 18 }, { value: 20 }, { value: 22 }, { value: 26 }, { value: 28 }, { value: 24 }, { value: 27 }],
  },
  {
    title: 'Contact Growth Tracker',
    value: '1.5k',
    trend: '+9%',
    delta: '+140 this week',
    bg: 'sky',
    data: [{ value: 900 }, { value: 1000 }, { value: 1200 }, { value: 1300 }, { value: 1350 }, { value: 1400 }, { value: 1500 }],
  },
];

const MarketingSection = () => {
  return (
    <section className="relative px-6 sm:px-8 lg:px-12 py-12">
      <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="px-8 py-8 bg-gray-50">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-3">
            Marketing Overview
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-[#01818E] to-cyan-400 rounded-full" />
        </div>
        
        {/* Content */}
        <div className="px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Metric Cards */}
            <div className="col-span-1 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {metrics.map((m, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <MetricCard {...m} />
                </div>
              ))}
            </div>
            
            {/* Purpose Block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              whileHover={{ scale: 1.02 }}
              className="col-span-1 relative text-center bg-gray-50 rounded-xl p-8 border border-gray-200"
            >
              {/* Icon */}
              <div className="mb-6 mx-auto w-16 h-16 rounded-full flex items-center justify-center bg-[#01818E] text-white text-2xl">
                🎯
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Marketing Purpose
              </h3>
              
              <p className="mb-4 text-gray-700 text-sm leading-relaxed">
                The goal is to build a <strong className="text-[#01818E]">WORKDESK</strong> — a clean, intentional space where tasks and campaigns feel like progress, not clutter.
              </p>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                Every metric should be <span className="font-semibold text-[#01818E]">actionable</span>.
                This is your command center — not a report. Use the numbers to guide your next move with clarity and confidence.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingSection;
