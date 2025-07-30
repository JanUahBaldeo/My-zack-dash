// ========================================
// 🎯 PIPELINE CARD COMPONENT WITH ALIASED IMPORTS
// ========================================

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePipeline } from '@context/PipelineContext';
import { toast } from 'react-hot-toast';
import { FiUsers, FiClock, FiTrendingUp, FiTag } from 'react-icons/fi';
import { uiLogger } from '@utils/logger';

const PipelineCard = ({ stage, leads = [], metrics = {} }) => {
  const { getStageTags, updateLeadTags } = usePipeline();
  const [showTags, setShowTags] = useState(false);
  const [availableTags, setAvailableTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortedLeads, setSortedLeads] = useState([]);
  const [previousLeadsCount, setPreviousLeadsCount] = useState(0);

  // Sort leads by recency whenever leads prop changes
  useEffect(() => {
    const sorted = [...leads].sort((a, b) => 
      new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
    );
    setSortedLeads(sorted);
    
    // Check if new leads were added
    if (leads.length > previousLeadsCount) {
      uiLogger.info(`New lead added to ${stage.title}`, { 
        newLeadsCount: leads.length - previousLeadsCount 
      });
    }
    setPreviousLeadsCount(leads.length);
  }, [leads, stage.title, previousLeadsCount]);

  const {
    leads: totalLeads = leads.length,
    avgTime = '0:00',
    conversion = 0
  } = metrics;

  const loadStageTags = async () => {
    if (availableTags.length === 0) {
      setLoading(true);
      try {
        const tags = await getStageTags(stage.title);
        setAvailableTags(tags);
      } catch (error) {
        uiLogger.error('Error loading tags', error);
        toast.error('Failed to load tags');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleTagToggle = async (leadId, tag) => {
    try {
      const lead = leads.find(l => l.id === leadId);
      if (!lead) return;

      const currentTags = lead.tags || [];
      const newTags = currentTags.includes(tag)
        ? currentTags.filter(t => t !== tag)
        : [...currentTags, tag];

      await updateLeadTags(leadId, newTags);
    } catch (error) {
      uiLogger.error('Error updating tags', error);
      toast.error('Failed to update tags');
    }
  };

  const getStageIcon = (stageTitle) => {
    const iconMap = {
      'New Lead': '👤',
      'Contacted': '📞',
      'Application Started': '📝',
      'Pre-Approved': '✅',
      'In Underwriting': '🔍',
      'Closed': '🎯'
    };
    return iconMap[stageTitle] || '📊';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  const calculateTotalValue = () => {
    return leads.reduce((sum, lead) => sum + (lead.loanAmount || 0), 0);
  };

  return (
    <motion.div
      layout
      className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
    >
      {/* Header */}
      <div className="px-6 py-4 bg-[#01818E] text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{getStageIcon(stage.title)}</span>
            <h3 className="text-lg font-bold tracking-wide uppercase">
              {stage.title}
            </h3>
          </div>
          <span className="bg-white/20 rounded-full px-3 py-1 text-sm font-semibold text-white">
            {totalLeads}
          </span>
        </div>
      </div>
      {/* Metrics Section */}
      <div className="p-6 space-y-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FiUsers size={20} className="text-[#01818E]" />
            </div>
            <div className="text-xl font-bold text-[#01818E]">
              {totalLeads}
            </div>
            <div className="text-xs text-gray-600 font-medium">Leads</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FiClock size={20} className="text-[#01818E]" />
            </div>
            <div className="text-xl font-bold text-[#01818E]">
              {avgTime}
            </div>
            <div className="text-xs text-gray-600 font-medium">Avg Time</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FiTrendingUp size={20} className="text-[#01818E]" />
            </div>
            <div className="text-xl font-bold text-[#01818E]">
              {conversion}%
            </div>
            <div className="text-xs text-gray-600 font-medium">Conversion</div>
          </div>
        </div>
        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600 font-medium">Conversion Rate</span>
            <span className="text-gray-900 font-semibold">{conversion}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div 
              className="h-2 rounded-full bg-[#01818E]"
              initial={{ width: 0 }}
              animate={{ width: `${conversion}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>
        {/* Total Value */}
        {calculateTotalValue() > 0 && (
          <div className="text-center py-4 bg-gray-50 rounded-xl">
            <div className="text-sm text-gray-600 font-medium mb-1">Total Value</div>
            <div className="text-xl font-bold text-[#01818E]">
              {formatCurrency(calculateTotalValue())}
            </div>
          </div>
        )}
      </div>
      {/* Tags Section */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-gray-700 flex items-center">
            <FiTag size={14} className="mr-2" />
            Tags
          </div>
          <button
            onClick={() => {
              setShowTags(!showTags);
              if (!showTags) loadStageTags();
            }}
            className="text-sm text-[#01818E] hover:text-[#01818E]/80 font-medium transition-colors"
          >
            {showTags ? 'Hide' : 'Manage'}
          </button>
        </div>
        {/* Tag Summary */}
        <div className="mb-4">
          {(() => {
            const tagCounts = {};
            leads.forEach(lead => {
              lead.tags?.forEach(tag => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
              });
            });
            const uniqueTags = Object.keys(tagCounts).slice(0, 3);
            if (uniqueTags.length === 0) {
              return (
                <div className="text-sm text-gray-400 italic">
                  No tags assigned
                </div>
              );
            }
            return (
              <div className="flex flex-wrap gap-2">
                {uniqueTags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#01818E]/10 text-[#01818E] border border-[#01818E]/20"
                  >
                    <span className="truncate max-w-20">{tag}</span>
                    {tagCounts[tag] > 1 && (
                      <span className="ml-1 bg-[#01818E] text-white rounded-full px-1.5 py-0.5 text-xs font-bold">
                        {tagCounts[tag]}
                      </span>
                    )}
                  </span>
                ))}
                {Object.keys(tagCounts).length > 3 && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
                    +{Object.keys(tagCounts).length - 3} more
                  </span>
                )}
              </div>
            );
          })()}
        </div>
        {/* Tag Selection Modal */}
        <AnimatePresence>
          {showTags && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-50 rounded-xl p-4 border border-gray-200"
            >
              {loading ? (
                <div className="text-center py-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#01818E] mx-auto"></div>
                </div>
              ) : (
                <>
                  <div className="text-sm font-medium text-gray-700 mb-3">
                    Available Tags for {stage.title}:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => {
                          leads.forEach(lead => {
                            handleTagToggle(lead.id, tag);
                          });
                        }}
                        className="px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 bg-white text-gray-700 hover:bg-[#01818E]/10 hover:text-[#01818E] border border-gray-300 hover:border-[#01818E]/30"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Leads List */}
      <div className="px-6 pb-6">
        <div className="text-sm font-medium text-gray-700 mb-4 flex items-center justify-between">
          <span>All Leads ({leads.length})</span>
          {leads.length > previousLeadsCount && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-green-500 text-white text-xs px-2 py-1 rounded-full"
            >
              New!
            </motion.span>
          )}
        </div>
        <div className="space-y-3 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {sortedLeads.map((lead, index) => (
            <motion.div
              key={`${lead.id}-${leads.length}-${lead.updatedAt || lead.createdAt}`}
              initial={{ opacity: 0, x: -10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`text-sm p-3 rounded-xl border transition-all duration-300 ${
                index === 0 && leads.length > previousLeadsCount 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="font-semibold text-gray-900 mb-1">
                {lead.name || 'Unknown Lead'}
              </div>
              <div className="text-gray-600 mb-2">
                {lead.loanType} • {formatCurrency(lead.loanAmount)}
              </div>
              {lead.tags && lead.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {lead.tags.slice(0, 2).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-xs bg-[#01818E]/10 text-[#01818E] border border-[#01818E]/20 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                  {lead.tags.length > 2 && (
                    <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600 border border-gray-300">
                      +{lead.tags.length - 2}
                    </span>
                  )}
                </div>
              )}
            </motion.div>
          ))}
          {leads.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <div className="text-2xl mb-2">📭</div>
              <div className="text-sm font-medium">No leads yet</div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PipelineCard; 