'use client'
import { useState } from 'react'
import { useNote } from '../Context/NoteContext'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Trash2,
  CheckCircle,
  Circle,
  Flag,
  Tag,
  Calendar,
  Clock,
  FileText,
  Edit3,
  Save,
  X,
  MoreVertical,
  Bell
} from 'lucide-react'

export default function Note({ note }) {
  const { deleteNote, updatePriority, makeTaskComplete, updateNote } = useNote()
  const [showMenu, setShowMenu] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(note.title)
  const [editDescription, setEditDescription] = useState(note.description || '')
  const [showDetails, setShowDetails] = useState(false)

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'high':
        return {
          color: 'from-red-500 to-rose-600',
          bg: 'bg-red-500/15',
          text: 'text-red-400',
          border: 'border-red-500/30',
          icon: '🔥'
        }
      case 'medium':
        return {
          color: 'from-amber-500 to-orange-600',
          bg: 'bg-amber-500/15',
          text: 'text-amber-400',
          border: 'border-amber-500/30',
          icon: '⚡'
        }
      case 'low':
        return {
          color: 'from-emerald-500 to-green-600',
          bg: 'bg-emerald-500/15',
          text: 'text-emerald-400',
          border: 'border-emerald-500/30',
          icon: '🌿'
        }
      default:
        return {
          color: 'from-gray-500 to-slate-600',
          bg: 'bg-gray-500/15',
          text: 'text-gray-400',
          border: 'border-gray-500/30',
          icon: '📌'
        }
    }
  }

  const getCategoryConfig = (category) => {
    const configs = {
      work: { icon: '💼', color: 'from-purple-500 to-indigo-600', label: 'Work' },
      personal: { icon: '👤', color: 'from-pink-500 to-rose-600', label: 'Personal' },
      shopping: { icon: '🛒', color: 'from-cyan-500 to-blue-600', label: 'Shopping' },
      health: { icon: '💪', color: 'from-emerald-500 to-green-600', label: 'Health' },
      finance: { icon: '💰', color: 'from-amber-500 to-orange-600', label: 'Finance' },
      other: { icon: '📌', color: 'from-gray-500 to-slate-600', label: 'Other' }
    }
    return configs[category] || configs.other
  }

  const handlePriorityChange = (newPriority) => {
    updatePriority(note._id, newPriority)
    setShowMenu(false)
  }

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      updateNote(note._id, {
        title: editTitle.trim(),
        description: editDescription.trim()
      })
      setIsEditing(false)
    }
  }

  const handleToggleComplete = () => {
    makeTaskComplete(note._id)
  }

  const priorityConfig = getPriorityConfig(note.priority)
  const categoryConfig = getCategoryConfig(note.category || 'other')

  const hasReminder = note.reminder && new Date(note.reminder) > new Date()
  const reminderDate = note.reminder ? new Date(note.reminder) : null

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`relative group glass-strong rounded-2xl p-5 hover:shadow-2xl transition-all duration-300 ${note.isComplete ? 'opacity-75' : ''
        }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        {/* Complete Button */}
        <button
          onClick={handleToggleComplete}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${note.isComplete
              ? 'bg-gradient-to-br from-emerald-500 to-green-600 border-emerald-500'
              : 'border-gray-600 hover:border-purple-500'
            }`}
        >
          {note.isComplete && <CheckCircle className="w-4 h-4 text-white" />}
        </button>

        {/* Title */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full bg-black/30 text-white px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              autoFocus
            />
          ) : (
            <h3
              className={`text-lg font-bold text-white mb-1 break-words ${note.isComplete ? 'line-through opacity-60' : ''
                }`}
            >
              {note.title}
            </h3>
          )}
        </div>

        {/* Actions Menu */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>

          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="absolute right-0 top-10 z-50 w-48 glass-strong rounded-xl p-2 shadow-2xl"
              >
                {!note.isComplete && (
                  <>
                    <button
                      onClick={() => {
                        setIsEditing(true)
                        setShowMenu(false)
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 text-left text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit Task
                    </button>

                    <div className="my-2 h-px bg-white/10" />

                    <div className="px-3 py-1 text-xs font-semibold text-gray-500">Change Priority</div>

                    {['high', 'medium', 'low'].map((priority) => {
                      const config = getPriorityConfig(priority)
                      return (
                        <button
                          key={priority}
                          onClick={() => handlePriorityChange(priority)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 text-left text-sm transition-colors ${note.priority === priority ? config.text : 'text-gray-400'
                            }`}
                        >
                          <span>{config.icon}</span>
                          <span className="capitalize">{priority}</span>
                        </button>
                      )
                    })}

                    <div className="my-2 h-px bg-white/10" />
                  </>
                )}

                <button
                  onClick={() => {
                    deleteNote(note._id)
                    setShowMenu(false)
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/20 text-left text-sm text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Task
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Description */}
      {isEditing ? (
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          placeholder="Add description..."
          rows="3"
          className="w-full bg-black/30 text-white placeholder-gray-500 px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none mb-3"
        />
      ) : (
        note.description && (
          <p className={`text-sm text-gray-400 mb-3 break-words ${note.isComplete ? 'line-through opacity-60' : ''}`}>
            {note.description}
          </p>
        )
      )}

      {/* Edit Actions */}
      {isEditing && (
        <div className="flex gap-2 mb-3">
          <button
            onClick={handleSaveEdit}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg text-white text-sm font-medium hover:shadow-lg transition-all"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
          <button
            onClick={() => {
              setIsEditing(false)
              setEditTitle(note.title)
              setEditDescription(note.description || '')
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-gray-300 text-sm font-medium hover:bg-white/20 transition-all"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        </div>
      )}

      {/* Metadata */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {/* Category Badge */}
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${categoryConfig.color} bg-opacity-20 border border-white/10`}>
          <span className="text-sm">{categoryConfig.icon}</span>
          <span className="text-xs font-semibold text-white">{categoryConfig.label}</span>
        </div>

        {/* Priority Badge */}
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${priorityConfig.bg} border ${priorityConfig.border}`}>
          <span className="text-sm">{priorityConfig.icon}</span>
          <span className={`text-xs font-semibold ${priorityConfig.text} capitalize`}>{note.priority}</span>
        </div>

        {/* Reminder Badge */}
        {hasReminder && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30">
            <Bell className="w-3 h-3 text-blue-400" />
            <span className="text-xs font-semibold text-blue-400">
              {reminderDate?.toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      {/* Additional Notes */}
      {note.notes && (
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors mb-2"
        >
          <FileText className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-medium text-gray-400">
            {showDetails ? 'Hide' : 'Show'} Additional Notes
          </span>
        </button>
      )}

      <AnimatePresence>
        {showDetails && note.notes && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="px-3 py-2 rounded-lg bg-black/30 border border-white/10 mb-2">
              <p className="text-sm text-gray-300">{note.notes}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completed Overlay */}
      {note.isComplete && (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-600/10 rounded-2xl pointer-events-none" />
      )}

      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${priorityConfig.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />
    </motion.div>
  )
}
