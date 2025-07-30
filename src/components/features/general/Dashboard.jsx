// ========================================
// 🎯 DASHBOARD COMPONENT WITH MODERN CARD LAYOUT
// ========================================

import { Header } from '@components';
import { MarketingSection, PipelineSection, CampaignSection, TaskSection, CalendarSection } from '@components';
import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Main Content */}
          <div className="col-span-8 space-y-6">
            {/* Pipeline Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <PipelineSection isAdmin={true} />
            </motion.div>

            {/* Marketing Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <MarketingSection />
            </motion.div>

            {/* Bottom Row - Two Cards */}
            <div className="grid grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Let's Connect</h3>
                  <button className="text-sm text-[#01818E] hover:underline">See all</button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-medium text-sm">RG</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">Randy Gouse</span>
                        <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs rounded-full">Senior</span>
                      </div>
                      <p className="text-sm text-gray-500">Cybersecurity specialist</p>
                    </div>
                    <button className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-gray-400 hover:bg-gray-50">
                      +
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">GS</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">Giana Schleifer</span>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full">Middle</span>
                      </div>
                      <p className="text-sm text-gray-500">UX/UI Designer</p>
                    </div>
                    <button className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-gray-400 hover:bg-gray-50">
                      +
                    </button>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Unlock Premium Features</h3>
                <p className="text-sm text-gray-600 mb-4">Get access to exclusive benefits and expand your freelancing opportunities</p>
                <button className="w-full bg-white text-gray-900 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Upgrade now →
                </button>
              </motion.div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="col-span-4 space-y-6">
            {/* Recent Projects */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Your Recent Projects</h3>
                <button className="text-sm text-[#01818E] hover:underline">See all Project</button>
              </div>
              
              <div className="space-y-4">
                <div className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <span className="text-orange-600 text-sm">🔧</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Web Development Project</h4>
                        <p className="text-sm text-gray-500">$10/hour</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-gray-900 text-white text-xs rounded-full">Paid</span>
                  </div>
                  <div className="flex gap-2 mb-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">Remote</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">Part-time</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">This project involves implementing both frontend and backend functionalities, as well as integrating with third-party APIs.</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>📍 Germany</span>
                    <span className="ml-4">2h ago</span>
                  </div>
                </div>

                <div className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 text-sm">©</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Copyright Project</h4>
                        <p className="text-sm text-gray-500">$10/hour</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">Not Paid</span>
                  </div>
                </div>

                <div className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 text-sm">🎨</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Web Design Project</h4>
                        <p className="text-sm text-gray-500">$10/hour</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-gray-900 text-white text-xs rounded-full">Paid</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Proposal Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Proposal Progress</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>📅</span>
                  <span>April 11, 2024</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">64</div>
                  <div className="text-sm text-gray-500 mb-2">Proposals sent</div>
                  <div className="h-12 flex items-end">
                    {Array.from({length: 12}).map((_, i) => (
                      <div key={i} className="flex-1 bg-gray-200 mx-0.5" style={{height: `${Math.random() * 100}%`}}></div>
                    ))}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">12</div>
                  <div className="text-sm text-gray-500 mb-2">Interviews</div>
                  <div className="h-12 flex items-end">
                    {Array.from({length: 12}).map((_, i) => (
                      <div key={i} className="flex-1 bg-orange-300 mx-0.5" style={{height: `${Math.random() * 100}%`}}></div>
                    ))}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">10</div>
                  <div className="text-sm text-gray-500 mb-2">Hires</div>
                  <div className="h-12 flex items-end">
                    {Array.from({length: 12}).map((_, i) => (
                      <div key={i} className="flex-1 bg-gray-900 mx-0.5" style={{height: `${Math.random() * 100}%`}}></div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;