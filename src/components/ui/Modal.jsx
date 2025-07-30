// ========================================
// 🎯 MODAL COMPONENT WITH ALIASED IMPORTS
// ========================================

import { useState, useContext, useEffect, useRef } from 'react';
import { TaskContext } from '@context/TaskContext';
import { motion, AnimatePresence } from 'framer-motion';
import TagInput from './TagInput';

const Modal = ({ isOpen, onClose, task = null, mode = 'edit' }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [date, setDate] = useState(task?.date || '');
  const [tags, setTags] = useState(
    task?.tags || [{ label: 'Internal', value: 'Internal' }]
  );
  const [actions, setActions] = useState(
    task?.actions || 'Follow up with client'
  );
  const [errors, setErrors] = useState({ title: false, date: false });

  const { updateTask, deleteTask } = useContext(TaskContext);
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (isOpen && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDate(task.date || '');
      setTags(task.tags || [{ label: 'Internal', value: 'Internal' }]);
      setActions(task.actions || 'Follow up with client');
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = { title: false, date: false };

    if (!title.trim()) newErrors.title = true;
    if (!date) newErrors.date = true;

    if (newErrors.title || newErrors.date) {
      setErrors(newErrors);
      return;
    }

    const taskData = {
      id: task?.id || Date.now(),
      title: title.trim(),
      date,
      tags,
      actions,
    };

    if (mode === 'edit' && task) {
      updateTask(taskData);
    }

    onClose();
    setTitle('');
    setDate('');
    setTags([{ label: 'Internal', value: 'Internal' }]);
    setActions('Follow up with client');
    setErrors({ title: false, date: false });
  };

  const handleDelete = () => {
    if (task) {
      deleteTask(task.id);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-700 animate-fade-in text-black cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              {mode === 'edit' ? 'Edit Task' : 'New Task'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-sm font-medium text-gray-700 block mb-1">Category</span>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
                value="Task"
                disabled
              >
                <option value="Task">Task</option>
              </select>
            </div>

            <div>
              <span className="text-sm font-medium text-gray-700">Title</span>
              <input
                ref={titleInputRef}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full border rounded px-3 py-2 mt-1 text-sm bg-white text-black focus:outline-none focus:ring-2
                ${errors.title ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-teal-500'}`}
                placeholder="Enter task title"
              />
            </div>

            <div>
              <span className="text-sm font-medium text-gray-700">Date</span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full border rounded px-3 py-2 mt-1 text-sm bg-white text-black focus:outline-none focus:ring-2
                ${errors.date ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-teal-500'}`}
              />
            </div>

            <div>
              <span className="text-sm font-medium text-gray-700">Tags</span>
              <TagInput
                value={tags}
                onChange={setTags}
                options={['Urgent', 'Client', 'Internal', 'Feature', 'Bug', 'Improvement']}
                max={5}
              />
            </div>

            <div>
              <span className="text-sm font-medium text-gray-700">Actions</span>
              <textarea
                value={actions}
                onChange={(e) => setActions(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 text-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
                rows={3}
                placeholder="Describe the task actions..."
              />
            </div>

            <div className="flex gap-2 pt-4">
              <button
                type="submit"
                className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
              >
                {mode === 'edit' ? 'Update Task' : 'Create Task'}
              </button>
              {mode === 'edit' && task && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
