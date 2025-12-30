'use client'
import React, { useState } from 'react'
import { useNote } from '../Context/NoteContext'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Sparkles,
  Tag,
  Flag,
  Calendar,
  Clock,
  FileText,
  X,
  ChevronDown
} from 'lucide-react'

const InputAdd = () => {
  const { addNote } = useNote()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('personal')
  const [priority, setPriority] = useState('medium')
  const [reminder, setReminder] = useState('')
  const [reminderTime, setReminderTime] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    { value: 'work', label: 'Work', icon: '💼', color: 'from-purple-500 to-indigo-600' },
    { value: 'personal', label: 'Personal', icon: '👤', color: 'from-pink-500 to-rose-600' },
    { value: 'shopping', label: 'Shopping', icon: '🛒', color: 'from-cyan-500 to-blue-600' },
    { value: 'health', label: 'Health', icon: '💪', color: 'from-emerald-500 to-green-600' },
    { value: 'finance', label: 'Finance', icon: '💰', color: 'from-amber-500 to-orange-600' },
    { value: 'other', label: 'Other', icon: '📌', color: 'from-gray-500 to-slate-600' }
  ]

  const priorities = [
    { value: 'high', label: 'High', icon: '🔥', color: 'from-red-500 to-rose-600' },
    { value: 'medium', label: 'Medium', icon: '⚡', color: 'from-amber-500 to-orange-600' },
    { value: 'low', label: 'Low', icon: '🌿', color: 'from-emerald-500 to-green-600' }
  ]

  const handleAdd = async () => {
    if (!title.trim()) {
      setError("Task title is required")
      setTimeout(() => setError(''), 3000)
      return
    }

    setIsSubmitting(true)

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      reminder: reminder ? new Date(reminder + 'T' + (reminderTime || '09:00')).toISOString() : null,
      notes: notes.trim()
    }

    try {
      await addNote(taskData)

      // Reset form
      setTitle('')
      setDescription('')
      setCategory('personal')
      setPriority('medium')
      setReminder('')
      setReminderTime('')
      setNotes('')
      setError('')
      setShowAdvanced(false)
    } catch (err) {
      setError('Failed to add task. Please try again.')
      setTimeout(() => setError(''), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedCategory = categories.find(c => c.value === category)
  const selectedPriority = priorities.find(p => p.value === priority)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full glass-strong rounded-3xl p-6 lg:p-8 space-y-6 hover:shadow-2xl transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Plus className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-space)' }}>
            Create Task
          </h2>
          <p className="text-sm text-gray-400">Add a new task to your list</p>
        </div>
      </div>

      {/* Task Title */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
          <Sparkles className="w-4 h-4 text-purple-400" />
          Task Title
        </label>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-black/30 text-white placeholder-gray-500 px-4 py-3.5 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
          <FileText className="w-4 h-4 text-blue-400" />
          Description
        </label>
        <textarea
          rows="3"
          placeholder="Add more details..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-black/30 text-white placeholder-gray-500 px-4 py-3.5 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none"
        />
      </div>

      {/* Category & Priority */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Category */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
            <Tag className="w-4 h-4 text-cyan-400" />
            Category
          </label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-black/30 text-white px-4 py-3.5 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 appearance-none cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Priority */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
            <Flag className="w-4 h-4 text-orange-400" />
            Priority
          </label>
          <div className="relative">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full bg-black/30 text-white px-4 py-3.5 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 appearance-none cursor-pointer"
            >
              {priorities.map(pri => (
                <option key={pri.value} value={pri.value}>
                  {pri.icon} {pri.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Advanced Options Toggle */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group"
      >
        <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">
          Advanced Options
        </span>
        <motion.div
          animate={{ rotate: showAdvanced ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
        </motion.div>
      </button>

      {/* Advanced Options */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 overflow-hidden"
          >
            {/* Reminder */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  Reminder Date
                </label>
                <input
                  type="date"
                  value={reminder}
                  onChange={(e) => setReminder(e.target.value)}
                  className="w-full bg-black/30 text-white px-4 py-3.5 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  Reminder Time
                </label>
                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="w-full bg-black/30 text-white px-4 py-3.5 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
                />
              </div>
            </div>

            {/* Additional Notes */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                <FileText className="w-4 h-4 text-pink-400" />
                Additional Notes
              </label>
              <textarea
                rows="3"
                placeholder="Any extra information..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-black/30 text-white placeholder-gray-500 px-4 py-3.5 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all duration-300 resize-none"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 px-4 py-3 bg-red-500/20 border border-red-500/30 rounded-xl"
          >
            <X className="w-5 h-5 text-red-400" />
            <p className="text-sm font-medium text-red-300">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Button */}
      <button
        onClick={handleAdd}
        disabled={isSubmitting}
        className="w-full group relative px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-white shadow-lg hover:shadow-purple-500/50 transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              Add Task
            </>
          )}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>

      {/* Quick Stats */}
      <div className="flex items-center justify-center gap-4 pt-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5">
          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedCategory?.color}`} />
          <span className="text-xs font-medium text-gray-400">{selectedCategory?.label}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5">
          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedPriority?.color}`} />
          <span className="text-xs font-medium text-gray-400">{selectedPriority?.label} Priority</span>
        </div>
      </div>
    </motion.div>
  )
}

export default InputAdd
