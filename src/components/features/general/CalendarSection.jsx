import { useState, useEffect, useContext, useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import toast, { Toaster } from 'react-hot-toast';
import { TaskContext } from '@context/TaskContext';
import '@styles/Calendar.css';

const categoryColors = {
  Activity: '#01818E',
  Campaign: '#01818E',
  Email: '#01818E',
  Task: '#01818E',
};

const getNextWeekISO = (start, weeks) => {
  const d = new Date(start);
  d.setDate(d.getDate() + 7 * weeks);
  return d.toISOString().split('T')[0];
};

const CalendarSection = () => {
  const { tasksByCategory } = useContext(TaskContext);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ title: '', category: 'Activity', repeat: false });
  const [events, setEvents] = useState(() => {
    try {
      const stored = localStorage.getItem('calendarEvents');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const taskEvents = useMemo(() => {
    if (!tasksByCategory) return [];
    return Object.values(tasksByCategory).flatMap(({ items }) =>
      items.map((task) => ({
        id: `task-${task.id}`,
        title: task.title,
        start: task.date,
        category: 'Task',
        color: categoryColors.Task,
      }))
    );
  }, [tasksByCategory]);

  useEffect(() => {
    setEvents((prev) => {
      const nonTaskEvents = prev.filter((e) => !e.id?.startsWith('task-'));
      return [
        ...nonTaskEvents,
        ...taskEvents.filter((task) => !nonTaskEvents.some((e) => e.id === task.id))
      ];
    });
  }, [taskEvents]);

  const filteredEvents = useMemo(() => {
    return events.filter(
      (e) =>
        (filter === 'All' || e.category === filter) &&
        e.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [events, filter, search]);

  const openAddModal = (dateStr) => {
    setSelectedDate(dateStr);
    setForm({ title: '', category: 'Activity', repeat: false });
    setEditId(null);
    setModalOpen(true);
  };

  const openEditModal = ({ event, startStr }) => {
    setSelectedDate(startStr);
    setForm({
      title: event.title,
      category: event.extendedProps.category,
      repeat: false,
    });
    setEditId(event.id);
    setModalOpen(true);
  };

  const saveEvent = () => {
    if (!form.title || !selectedDate) return;

    const base = {
      title: form.title,
      category: form.category,
      color: categoryColors[form.category] || '#01818E',
    };

    if (editId) {
      setEvents((prev) =>
        prev.map((e) => (e.id === editId ? { ...e, ...base, start: selectedDate } : e))
      );
      toast.success('Event updated');
    } else {
      const id = Date.now().toString();
      const newEntries = form.repeat
        ? [...Array(4)].map((_, i) => ({
            ...base,
            id: `${id}-${i}`,
            start: getNextWeekISO(selectedDate, i),
          }))
        : [{ ...base, id, start: selectedDate }];
      setEvents((prev) => [...prev, ...newEntries]);
      toast.success(form.repeat ? 'Recurring events added!' : 'Event added');
    }

    setModalOpen(false);
  };

  const deleteEvent = () => {
    setEvents((prev) => prev.filter((e) => e.id !== editId));
    toast.success('Event deleted');
    setModalOpen(false);
  };

  return (
    <section className="px-6 sm:px-8 lg:px-12 py-12">
      <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="px-8 py-8 bg-gray-50">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Calendar
            </h2>
            <div className="flex flex-wrap gap-3 items-center">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events..."
                className="text-sm border border-gray-200 rounded-full px-4 py-2 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#01818E] focus:border-transparent"
              />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="text-sm border border-gray-200 rounded-full px-4 py-2 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#01818E] focus:border-transparent"
              >
                {['All', 'Activity', 'Campaign', 'Email', 'Task'].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-[#01818E] text-white hover:bg-[#01818E]/90 shadow-sm transition-all"
              >
                ➕ Add appointment
              </button>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="px-8 py-8">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            height="auto"
            editable
            selectable
            dateClick={(info) => openAddModal(info.dateStr)}
            eventClick={openEditModal}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek',
            }}
            events={filteredEvents}
          />
        </div>
      </div>
      
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-6 text-gray-900">
              {editId ? 'Edit Event' : 'Add Event'}
            </h3>
            
            <input
              type="text"
              className="w-full mb-4 p-3 border border-gray-200 rounded-xl bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#01818E] focus:border-transparent"
              placeholder="Event title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            
            <select
              className="w-full mb-4 p-3 border border-gray-200 rounded-xl bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#01818E] focus:border-transparent"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {['Activity', 'Campaign', 'Email'].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            
            {!editId && (
              <label className="flex items-center gap-3 mb-6 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={form.repeat}
                  onChange={(e) => setForm({ ...form, repeat: e.target.checked })}
                />
                Repeat weekly for 4 weeks
              </label>
            )}
            
            <div className="flex justify-end gap-3">
              {editId && (
                <button onClick={deleteEvent} className="px-4 py-2 bg-red-600 text-white rounded-full shadow-sm hover:bg-red-700 transition-all">
                  Delete
                </button>
              )}
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full shadow-sm hover:bg-gray-300 transition-all">
                Cancel
              </button>
              <button
                onClick={saveEvent}
                className="px-4 py-2 bg-[#01818E] text-white rounded-full shadow-sm hover:bg-[#01818E]/90 transition-all"
              >
                {editId ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CalendarSection;
