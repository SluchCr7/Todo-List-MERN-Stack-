'use client'
import { useState } from 'react'
import { useNote } from '../Context/NoteContext'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Trash2,
  CheckCircle2,
  Circle,
  MoreVertical,
  Calendar,
  Clock,
  Edit2,
  Save,
  X,
  ChevronDown
} from 'lucide-react'

export default function Note({ note }) {
  const { deleteNote, updatePriority, makeTaskComplete, updateNote } = useNote()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(note.title)
  const [editDescription, setEditDescription] = useState(note.description || '')

  const priorities = {
    high: { color: 'border-red-500', bg: 'from-red-500/20 to-pink-600/5', text: 'text-red-400', glow: 'shadow-red-500/20' },
    medium: { color: 'border-orange-500', bg: 'from-orange-500/20 to-amber-600/5', text: 'text-orange-400', glow: 'shadow-orange-500/20' },
    low: { color: 'border-emerald-500', bg: 'from-emerald-500/20 to-teal-600/5', text: 'text-emerald-400', glow: 'shadow-emerald-500/20' }
  }

  const theme = priorities[note.priority] || priorities.low

  const handleSave = () => {
    if (editTitle.trim()) {
      updateNote(note._id, {
        title: editTitle.trim(),
        description: editDescription.trim()
      })
      setIsEditing(false)
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`group relative overflow-hidden rounded-xl bg-[#1e1e2e]/40 backdrop-blur-md border hover:border-white/20 transition-all duration-300 ${note.isComplete ? 'opacity-60 border-white/5' : `border-l-4 ${theme.color} border-white/10 hover:shadow-lg ${theme.glow}`
        }`}
    >
      {/* Background Hover Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${theme.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

      <div className="relative p-4 flex gap-4 items-start">
        {/* Checkbox */}
        <button
          onClick={() => makeTaskComplete(note._id)}
          className={`mt-1 rounded-full transition-colors ${note.isComplete ? 'text-emerald-400' : 'text-gray-500 hover:text-purple-400'
            }`}
        >
          {note.isComplete ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="space-y-1 w-full mr-4">
              {isEditing ? (
                <input
                  autoFocus
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-transparent border-b border-purple-500 px-1 py-0.5 text-lg font-bold text-white focus:outline-none"
                />
              ) : (
                <h3
                  onClick={() => !isEditing && setIsExpanded(!isExpanded)}
                  className={`text-lg font-bold text-white cursor-pointer select-none ${note.isComplete ? 'line-through text-gray-500' : ''
                    }`}
                >
                  {note.title}
                </h3>
              )}

              {/* Quick Info Line */}
              {!isExpanded && (
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className={`uppercase font-bold ${theme.text}`}>{note.priority}</span>
                  {note.category && (
                    <>
                      <span>•</span>
                      <span className="capitalize">{note.category}</span>
                    </>
                  )}
                  {note.reminder && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(note.reminder).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 opacity-100 transition-opacity">
              {!note.isComplete && !isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => deleteNote(note._id)}
                className="p-2 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {(isExpanded || isEditing) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/5 bg-black/20"
          >
            <div className="p-4 pl-14 space-y-4">
              {isEditing ? (
                <div className="space-y-3">
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Add description..."
                    rows={3}
                    className="w-full bg-white/5 rounded-lg border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-purple-500/50"
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1.5 rounded-lg text-sm text-gray-400 hover:bg-white/10"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-3 py-1.5 rounded-lg text-sm bg-purple-500 text-white font-medium hover:bg-purple-600 flex items-center gap-1"
                    >
                      <Save className="w-3.5 h-3.5" /> Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {note.description && (
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {note.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 pt-2">
                    {/* Change Priority Chips */}
                    <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                      {['low', 'medium', 'high'].map(p => (
                        <button
                          key={p}
                          onClick={() => updatePriority(note._id, p)}
                          className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider transition-colors ${note.priority === p
                              ? 'bg-white/10 text-white'
                              : 'text-gray-500 hover:text-gray-300'
                            }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
