// ========================================
// 🎯 TASK BOARD SECTION COMPONENT WITH ALIASED IMPORTS
// ========================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import TaskColumn from './TaskColumn';
import DocumentChecklist from './DocumentChecklist';

const TaskBoardSection = () => {
  // const { darkMode } = useTheme(); // Removed as per edit hint

  return (
    <section
      className={`space-y-0 rounded-xl pt-0 pr-6 pb-6 pl-6 shadow transition-colors duration-300 ${
        // darkMode // Removed as per edit hint
        //   ? 'bg-gradient-to-b from-[#0f172a] to-[#0d1a2f] text-white'
        //   : 'bg-white text-gray-800 border border-gray-200'
        // Added a placeholder for dark mode classes if useTheme is removed
        'bg-white text-gray-800 border border-gray-200'
      }`}
    >
      {/* Enhanced Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <span className="text-3xl">📋</span>
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Task Management
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage tasks across categories and ensure documents are complete.
            </p>
          </div>
        </div>
      </div>

      {/* Task Columns */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        <TaskColumn
          title="Due Today"
          color="red"
          items={[
            { title: 'Finalize contract', dueDate: '06/30/2024', statuses: ['Overdue'] },
            { title: 'Call supplier', dueDate: '06/30/2024', statuses: ['Pending'] },
            { title: 'Prepare pitch deck', dueDate: '06/30/2024', statuses: ['Pending'] },
          ]}
        />
        <TaskColumn
          title="Follow-up"
          color="yellow"
          items={[
            { title: 'Send reminder email', dueDate: '07/01/2024', statuses: ['Pending'] },
            { title: 'Review feedback', dueDate: '07/02/2024', statuses: ['On Track'] },
          ]}
        />
        <TaskColumn
          title="Pending"
          color="green"
          items={[
            { title: 'Schedule meeting', dueDate: '07/05/2024', statuses: ['On Track'] },
            { title: 'Upload assets', dueDate: '07/06/2024', statuses: ['Pending'] },
          ]}
        />
      </div>

      {/* Documentation Checklist */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          🗂 <span>Documentation Checklist</span>
        </h3>
        <DocumentChecklist
          documents={[
            { status: 'REQUIRED', name: 'Document 1', date: '06/01/2024' },
            { status: 'REQUIRED', name: 'Document 2', date: '06/03/2024' },
            { status: 'RECEIVED', name: 'Document 3', date: '06/05/2024', checked: true },
            { status: 'PENDING', name: 'Document 4', date: '06/10/2024' },
          ]}
        />
      </div>
    </section>
  );
};

export default TaskBoardSection;