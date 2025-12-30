'use client'
import React, { useState } from 'react'
import { useNote } from '../Context/NoteContext'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Sparkles,
  Zap,
  Tag,
  Flag,
  Calendar,
  Clock,
  Mic,
  ArrowRight
} from 'lucide-react'

const InputAdd = () => {
  const { addNote } = useNote()
  const [isExpanded, setIsExpanded] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('personal')
  const [priority, setPriority] = useState('medium')
  const [reminder, setReminder] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAdd = async () => {
    if (!title.trim()) return

    setIsSubmitting(true)
    const taskData = {
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      reminder: reminder ? new Date(reminder).toISOString() : null,
    }

    try {
      await addNote(taskData)
      setTitle('')
      setDescription('')
      setIsExpanded(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      layout
      className={`relative w-full z-20 transition-all duration-300 ${isExpanded ? 'mb-6' : 'mb-2'}`}
    >
      {/* Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur opacity-20 transition-opacity duration-500 ${isExpanded ? 'opacity-40' : 'opacity-20'}`} />

      <div className="relative glass-strong rounded-[1.5rem] border border-white/10 overflow-hidden shadow-2xl">
        <div className="p-2">
          {/* Top Input Bar */}
          <div className="flex items-center gap-3 p-2">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${title ? 'bg-purple-500 text-white' : 'bg-white/5 text-gray-500'}`}>
              {isSubmitting ? <Sparkles className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
            </div>

            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                if (!isExpanded) setIsExpanded(true)
              }}
              placeholder="What needs to be done?"
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              className="flex-1 bg-transparent text-lg font-medium text-white placeholder-gray-500 focus:outline-none"
            />

            {/* Quick Actions (Visible when not expanded or typing) */}
            <div className="flex gap-2">
              {!isExpanded && (
                <button onClick={() => setIsExpanded(true)} className="p-2 hover:bg-white/10 rounded-xl text-gray-400 text-xs font-bold border border-white/5">
                  CMD+K
                </button>
              )}
              {isExpanded && (
                <button
                  onClick={handleAdd}
                  disabled={!title.trim()}
                  className="p-2 bg-white text-black rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Expanded Controls */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-2 px-2 pb-2 space-y-4 border-t border-white/5 mt-2">

                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add details, notes, or subtasks..."
                    rows={2}
                    className="w-full bg-transparent text-sm text-gray-300 placeholder-gray-600 focus:outline-none resize-none mx-2 mb-2"
                  />

                  <div className="flex flex-wrap items-center gap-3">
                    {/* Priority Selector */}
                    <div className="flex bg-[#0a0a0f]/50 p-1 rounded-xl gap-1">
                      {['low', 'medium', 'high'].map(p => (
                        <button
                          key={p}
                          onClick={() => setPriority(p)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${priority === p ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'
                            }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>

                    <div className="w-px h-8 bg-white/10 mx-1" />

                    {/* Category Selector */}
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="bg-[#0a0a0f]/50 text-gray-300 text-sm px-3 py-1.5 rounded-xl border border-white/10 focus:outline-none cursor-pointer hover:bg-white/5"
                    >
                      <option value="personal">👤 Personal</option>
                      <option value="work">💼 Work</option>
                      <option value="shopping">🛒 Shopping</option>
                      <option value="health">💪 Health</option>
                      <option value="finance">💰 Finance</option>
                    </select>

                    {/* Date Picker */}
                    <div className="relative">
                      <input
                        type="datetime-local"
                        value={reminder}
                        onChange={(e) => setReminder(e.target.value)}
                        className="bg-[#0a0a0f]/50 text-gray-300 text-xs px-3 py-2 rounded-xl border border-white/10 focus:outline-none"
                      />
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export default InputAdd
