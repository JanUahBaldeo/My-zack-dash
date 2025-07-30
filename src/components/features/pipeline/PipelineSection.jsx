import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePipeline } from '@context/PipelineContext';
import PipelineCard from './PipelineCard';
import { toast } from 'react-hot-toast';
import { FiRefreshCw, FiPlus, FiFilter, FiTrendingUp } from 'react-icons/fi';
import { uiLogger } from '@utils/logger';

const PipelineSection = ({ isAdmin = false }) => {
  const { 
    leadsByStage, 
    metrics, 
    loading, 
    error, 
    stages,
    manualRefresh,
    addLead,
    updateLead,
    moveLead
  } = usePipeline();

  const [filterStage, setFilterStage] = useState('All');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showMetrics, setShowMetrics] = useState(true);

  useEffect(() => {
    setLastUpdated(new Date().toLocaleTimeString());
  }, [leadsByStage]);

  const handleFilterChange = (stage) => {
    setFilterStage(stage);
  };

  const handleManualRefresh = async () => {
    setRefreshing(true);
    try {
      await manualRefresh();
      toast.success('✅ Pipeline data refreshed!');
    } catch (error) {
      toast.error('❌ Failed to refresh data');
    } finally {
      setRefreshing(false);
    }
  };

  const handleAddLead = async (stageTitle, newLead) => {
    try {
      await addLead(stageTitle, newLead);
      toast.success('✅ Lead added successfully!');
    } catch (error) {
      uiLogger.error('Error adding lead', error);
      toast.error('Failed to add lead');
    }
  };

  const handleUpdateLead = async (leadId, updates) => {
    try {
      await updateLead(leadId, updates);
      toast.success('✅ Lead updated successfully!');
    } catch (error) {
      uiLogger.error('Error updating lead', error);
      toast.error('Failed to update lead');
    }
  };

  const handleMoveLead = async (leadId, fromStage, toStage) => {
    try {
      await moveLead(leadId, fromStage, toStage);
      toast.success('✅ Lead moved successfully!');
    } catch (error) {
      uiLogger.error('Error moving lead', error);
      toast.error('Failed to move lead');
    }
  };

  // Add null check for stages
  const filteredStages = filterStage === 'All' 
    ? (stages || [])
    : (stages || []).filter(stage => stage.title === filterStage);

  if (loading) {
    return (
      <section className="w-full px-4 sm:px-6 md:px-10 py-10 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl dark:shadow-lg bg-white dark:bg-gray-900">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#01818E]"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full px-4 sm:px-6 md:px-10 py-10 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl dark:shadow-lg bg-white dark:bg-gray-900">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error loading pipeline data: {error}</p>
          <button
            onClick={handleManualRefresh}
            className="px-4 py-2 bg-[#01818E] text-white rounded-lg hover:bg-[#01818E]/80 transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative w-full px-6 sm:px-8 lg:px-12 py-12 rounded-2xl shadow-lg bg-white"
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
        <div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 flex items-center gap-3 mb-3">
            Pipeline Overview
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-[#01818E] to-cyan-400 rounded-full" />
        </div>
        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Filter Dropdown */}
          <div className="relative">
            <select
              value={filterStage}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="px-4 py-2.5 bg-white text-gray-700 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#01818E] focus:border-transparent shadow-sm transition-all"
            >
              <option value="All">All Stages</option>
              {(stages || []).map((stage) => (
                <option key={stage.title} value={stage.title}>
                  {stage.title}
                </option>
              ))}
            </select>
          </div>
          {/* Metrics Toggle */}
          <button
            onClick={() => setShowMetrics(!showMetrics)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white text-gray-700 rounded-full border border-gray-200 hover:bg-gray-50 transition-all shadow-sm"
          >
            <FiTrendingUp className="w-4 h-4" />
            {showMetrics ? 'Hide' : 'Show'} Metrics
          </button>
          {/* Last Updated and Refresh Button */}
          {lastUpdated && (
            <div className="text-sm text-gray-500">
              Last updated: {lastUpdated}
            </div>
          )}
          <button
            onClick={handleManualRefresh}
            disabled={refreshing || loading}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#01818E] text-white rounded-full hover:bg-[#01818E]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <FiRefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>
      {/* Metrics Summary */}
      {showMetrics && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-10 p-8 bg-gray-50 rounded-2xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#01818E] mb-2">
                {Object.values(leadsByStage || {}).reduce((total, leads) => total + (leads?.length || 0), 0)}
              </div>
              <div className="text-sm text-gray-600 font-medium">Total Leads</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {metrics?.conversionRate || 0}%
              </div>
              <div className="text-sm text-gray-600 font-medium">Conversion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {metrics?.avgTimeInPipeline || '0:00'}
              </div>
              <div className="text-sm text-gray-600 font-medium">Avg Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                ${(metrics?.totalValue || 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 font-medium">Total Value</div>
            </div>
          </div>
        </motion.div>
      )}
      {/* Pipeline Cards Grid */}
      <div className="flex gap-8 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <AnimatePresence>
          {filteredStages.map((stage) => (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="min-w-[360px] max-w-sm w-full"
            >
              <PipelineCard
                stage={stage}
                leads={(leadsByStage && leadsByStage[stage.title]) || []}
                metrics={metrics?.stages?.[stage.title] || {}}
                onAddLead={isAdmin ? (newLead) => handleAddLead(stage.title, newLead) : undefined}
                onUpdateLead={isAdmin ? handleUpdateLead : undefined}
                onMoveLead={isAdmin ? handleMoveLead : undefined}
                isAdmin={isAdmin}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {/* Empty State */}
      {filteredStages.length === 0 && (
        <div className="text-center py-16">
          <div className="text-gray-400 text-xl mb-3 font-medium">
            No pipeline stages found
          </div>
          <div className="text-gray-500 text-sm">
            Try adjusting your filter or check your pipeline configuration.
          </div>
        </div>
      )}
    </motion.section>
  );
};

export default PipelineSection; 