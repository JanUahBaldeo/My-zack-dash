// ========================================
// 🎯 PROFESSIONAL PIPELINE CARD COMPONENT
// ========================================

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePipeline } from '@context/PipelineContext';
import { toast } from 'react-hot-toast';
import { 
  UsersIcon, 
  ClockIcon, 
  TrendingUpIcon, 
  TagIcon,
  PlusIcon,
  EllipsisVerticalIcon,
  BanknotesIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { uiLogger } from '@utils/logger';

const PipelineCard = ({ stage, leads = [], metrics = {} }) => {
  const { getStageTags, updateLeadTags } = usePipeline();
  const [showTags, setShowTags] = useState(false);
  const [availableTags, setAvailableTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortedLeads, setSortedLeads] = useState([]);
  const [previousLeadsCount, setPreviousLeadsCount] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

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

  const getStageColor = (stageTitle) => {
    const colorMap = {
      'New Lead': 'blue',
      'Contacted': 'amber',
      'Application Started': 'purple',
      'Pre-Approved': 'emerald',
      'In Underwriting': 'orange',
      'Closed': 'green'
    };
    return colorMap[stageTitle] || 'slate';
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

  const stageColor = getStageColor(stage.title);

  return (
    <motion.div
      layout
      className="admin-card hover:shadow-xl transition-all duration-300 min-h-[600px] flex flex-col"
    >
      {/* Header */}
      <div className={`p-4 rounded-t-2xl bg-${stageColor}-500 text-white -m-6 mb-6`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{getStageIcon(stage.title)}</span>
            <div>
              <h3 className="font-bold text-lg tracking-wide">
                {stage.title}
              </h3>
              <p className="text-white/80 text-sm">{totalLeads} leads</p>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <EllipsisVerticalIcon className="w-5 h-5" />
            </button>
            {showMenu && (
              <div className="admin-dropdown">
                <button className="admin-dropdown-item">
                  <PlusIcon className="w-4 h-4" />
                  Add Lead
                </button>
                <button className="admin-dropdown-item">
                  <TagIcon className="w-4 h-4" />
                  Manage Tags
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-slate-50 rounded-xl">
          <UsersIcon className="w-5 h-5 text-slate-600 mx-auto mb-2" />
          <div className="text-xl font-bold text-slate-900">{totalLeads}</div>
          <div className="text-xs text-slate-600 font-medium">Leads</div>
        </div>
        <div className="text-center p-3 bg-slate-50 rounded-xl">
          <ClockIcon className="w-5 h-5 text-slate-600 mx-auto mb-2" />
          <div className="text-xl font-bold text-slate-900">{avgTime}</div>
          <div className="text-xs text-slate-600 font-medium">Avg Time</div>
        </div>
        <div className="text-center p-3 bg-slate-50 rounded-xl">
          <TrendingUpIcon className="w-5 h-5 text-slate-600 mx-auto mb-2" />
          <div className="text-xl font-bold text-slate-900">{conversion}%</div>
          <div className="text-xs text-slate-600 font-medium">Conversion</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-600 font-medium">Progress</span>
          <span className="text-slate-900 font-semibold">{conversion}%</span>
        </div>
        <div className="admin-progress-bar">
          <motion.div 
            className={`admin-progress-fill bg-${stageColor}-500`}
            initial={{ width: 0 }}
            animate={{ width: `${conversion}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Total Value */}
      {calculateTotalValue() > 0 && (
        <div className="mb-6 p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <BanknotesIcon className="w-5 h-5 text-slate-600" />
            <span className="text-sm font-medium text-slate-600">Total Pipeline Value</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {formatCurrency(calculateTotalValue())}
          </div>
        </div>
      )}

      {/* Tags Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <TagIcon className="w-4 h-4" />
            Tags
          </div>
          <button
            onClick={() => {
              setShowTags(!showTags);
              if (!showTags) loadStageTags();
            }}
            className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
          >
            {showTags ? 'Hide' : 'Manage'}
          </button>
        </div>

        {/* Tag Summary */}
        <div className="mb-3">
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
                <div className="text-sm text-slate-400 italic">
                  No tags assigned
                </div>
              );
            }
            return (
              <div className="flex flex-wrap gap-2">
                {uniqueTags.map(tag => (
                  <span
                    key={tag}
                    className={`admin-badge-neutral text-xs`}
                  >
                    <span className="truncate max-w-20">{tag}</span>
                    {tagCounts[tag] > 1 && (
                      <span className={`ml-1 bg-${stageColor}-500 text-white rounded-full px-1.5 py-0.5 text-xs font-bold`}>
                        {tagCounts[tag]}
                      </span>
                    )}
                  </span>
                ))}
                {Object.keys(tagCounts).length > 3 && (
                  <span className="admin-badge-neutral text-xs">
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
              className="p-4 bg-slate-50 rounded-xl border border-slate-200"
            >
              {loading ? (
                <div className="text-center py-2">
                  <div className="admin-loading mx-auto"></div>
                </div>
              ) : (
                <>
                  <div className="text-sm font-medium text-slate-700 mb-3">
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
                        className="admin-button-ghost text-xs"
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
      <div className="flex-1">
        <div className="text-sm font-medium text-slate-700 mb-4 flex items-center justify-between">
          <span>Recent Leads</span>
          {leads.length > previousLeadsCount && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="admin-badge-success text-xs"
            >
              New!
            </motion.span>
          )}
        </div>
        
        <div className="space-y-3 max-h-64 overflow-y-auto admin-scrollbar">
          {sortedLeads.slice(0, 5).map((lead, index) => (
            <motion.div
              key={`${lead.id}-${leads.length}-${lead.updatedAt || lead.createdAt}`}
              initial={{ opacity: 0, x: -10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer hover:shadow-md ${
                index === 0 && leads.length > previousLeadsCount 
                  ? `bg-${stageColor}-50 border-${stageColor}-200` 
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-slate-900 text-sm">
                  {lead.name || 'Unknown Lead'}
                </h4>
                <div className="admin-avatar text-xs">
                  {(lead.name || 'U').charAt(0).toUpperCase()}
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-2">
                <div className="flex items-center gap-1">
                  <BanknotesIcon className="w-3 h-3" />
                  <span>{formatCurrency(lead.loanAmount)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarIcon className="w-3 h-3" />
                  <span>{lead.loanType}</span>
                </div>
              </div>

              {lead.tags && lead.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {lead.tags.slice(0, 2).map(tag => (
                    <span
                      key={tag}
                      className="admin-badge-neutral text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {lead.tags.length > 2 && (
                    <span className="admin-badge-neutral text-xs">
                      +{lead.tags.length - 2}
                    </span>
                  )}
                </div>
              )}
            </motion.div>
          ))}
          
          {leads.length === 0 && (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <UsersIcon className="w-6 h-6 text-slate-400" />
              </div>
              <div className="text-sm font-medium text-slate-500">No leads yet</div>
              <div className="text-xs text-slate-400">Leads will appear here when added</div>
            </div>
          )}
          
          {leads.length > 5 && (
            <button className="w-full text-sm text-slate-600 hover:text-slate-900 font-medium py-2 hover:bg-slate-50 rounded-lg transition-all duration-200">
              View all {leads.length} leads
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PipelineCard;