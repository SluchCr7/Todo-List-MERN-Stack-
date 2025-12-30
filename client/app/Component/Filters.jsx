'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, X, Tag, Flag, CheckCircle2, RotateCcw, SlidersHorizontal } from 'lucide-react'

const Filters = ({ onFilterChange }) => {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [priority, setPriority] = useState('all')
  const [category, setCategory] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    onFilterChange({ search, status, priority, category })
  }, [search, status, priority, category])

  const handleReset = () => {
    setSearch('')
    setStatus('all')
    setPriority('all')
    setCategory('all')
  }

  const activeCount = [status !== 'all', priority !== 'all', category !== 'all'].filter(Boolean).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Search & Toggle Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-3.5 bg-[#1e1e2e]/50 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all backdrop-blur-sm"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-4 w-4 text-gray-500 hover:text-white transition-colors" />
            </button>
          )}
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 rounded-2xl border border-white/10 flex items-center gap-2 transition-all ${showFilters || activeCount > 0
              ? 'bg-purple-500/20 text-purple-200 border-purple-500/30'
              : 'bg-[#1e1e2e]/50 text-gray-400 hover:bg-white/5'
            }`}
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span className="hidden sm:inline font-medium">Filters</span>
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center font-bold">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Expandable Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-1"> {/* Padding for outline/shadows */}
              <div className="bg-[#1e1e2e]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-6 shadow-2xl">

                {/* Status Selection (Segmented Control style) */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Status</h4>
                  <div className="flex p-1 bg-black/20 rounded-xl">
                    {['all', 'incomplete', 'complete'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setStatus(opt)}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all capitalize ${status === opt
                            ? 'bg-purple-500 text-white shadow-lg'
                            : 'text-gray-400 hover:text-white'
                          }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Priority */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Priority</h4>
                    <div className="flex flex-wrap gap-2">
                      {['all', 'high', 'medium', 'low'].map((p) => (
                        <button
                          key={p}
                          onClick={() => setPriority(p)}
                          className={`px-3 py-1.5 rounded-lg text-sm border transition-all capitalize ${priority === p
                              ? 'bg-orange-500/20 border-orange-500/50 text-orange-200'
                              : 'bg-transparent border-white/10 text-gray-400 hover:border-white/20'
                            }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Category</h4>
                    <div className="flex flex-wrap gap-2">
                      {['all', 'work', 'personal', 'shopping', 'health', 'finance'].map((c) => (
                        <button
                          key={c}
                          onClick={() => setCategory(c)}
                          className={`px-3 py-1.5 rounded-lg text-sm border transition-all capitalize ${category === c
                              ? 'bg-blue-500/20 border-blue-500/50 text-blue-200'
                              : 'bg-transparent border-white/10 text-gray-400 hover:border-white/20'
                            }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Reset Action */}
                {activeCount > 0 && (
                  <div className="flex justify-end pt-2 border-t border-white/5">
                    <button
                      onClick={handleReset}
                      className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Filters
