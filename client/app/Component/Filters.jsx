'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, X, Tag, Flag, CheckCircle, Circle, RotateCcw } from 'lucide-react'

const Filters = ({ onFilterChange }) => {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [priority, setPriority] = useState('all')
  const [category, setCategory] = useState('all')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    onFilterChange({ search, status, priority, category })
  }, [search, status, priority, category])

  const handleReset = () => {
    setSearch('')
    setStatus('all')
    setPriority('all')
    setCategory('all')
  }

  const activeFiltersCount = [
    status !== 'all',
    priority !== 'all',
    category !== 'all'
  ].filter(Boolean).length

  const categories = [
    { value: 'all', label: 'All Categories', icon: '📋' },
    { value: 'work', label: 'Work', icon: '💼' },
    { value: 'personal', label: 'Personal', icon: '👤' },
    { value: 'shopping', label: 'Shopping', icon: '🛒' },
    { value: 'health', label: 'Health', icon: '💪' },
    { value: 'finance', label: 'Finance', icon: '💰' },
    { value: 'other', label: 'Other', icon: '📌' }
  ]

  const priorities = [
    { value: 'all', label: 'All Priorities', icon: '⚡' },
    { value: 'high', label: 'High', icon: '🔥' },
    { value: 'medium', label: 'Medium', icon: '⚡' },
    { value: 'low', label: 'Low', icon: '🌿' }
  ]

  const statuses = [
    { value: 'all', label: 'All Tasks', icon: Circle },
    { value: 'incomplete', label: 'Pending', icon: Circle },
    { value: 'complete', label: 'Completed', icon: CheckCircle }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="w-full space-y-4"
    >
      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
        <input
          type="search"
          placeholder="Search tasks by title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-black/30 text-white placeholder-gray-500 pl-12 pr-12 py-4 rounded-2xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Filters Section */}
      <div className="glass-strong rounded-2xl p-5 space-y-4">
        {/* Filter Header */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="w-full flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold text-white">Filters</h3>
              <p className="text-xs text-gray-400">
                {activeFiltersCount > 0 ? `${activeFiltersCount} active filter${activeFiltersCount > 1 ? 's' : ''}` : 'No filters applied'}
              </p>
            </div>
          </div>

          <motion.div
            animate={{ rotate: isFilterOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </button>

        {/* Filter Options */}
        <motion.div
          initial={false}
          animate={{ height: isFilterOpen ? 'auto' : 0, opacity: isFilterOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="space-y-4 pt-2">
            {/* Status Filter */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Status
              </label>
              <div className="grid grid-cols-3 gap-2">
                {statuses.map((s) => {
                  const Icon = s.icon
                  return (
                    <button
                      key={s.value}
                      onClick={() => setStatus(s.value)}
                      className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${status === s.value
                          ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{s.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Priority Filter */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                <Flag className="w-4 h-4 text-orange-400" />
                Priority
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {priorities.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setPriority(p.value)}
                    className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${priority === p.value
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                      }`}
                  >
                    <span>{p.icon}</span>
                    <span className="hidden sm:inline">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                <Tag className="w-4 h-4 text-purple-400" />
                Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {categories.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setCategory(c.value)}
                    className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${category === c.value
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                      }`}
                  >
                    <span>{c.icon}</span>
                    <span className="hidden sm:inline">{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            {activeFiltersCount > 0 && (
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleReset}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white font-medium transition-all duration-300 group"
              >
                <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                Reset All Filters
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Active Filters Summary */}
      {(search || activeFiltersCount > 0) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center gap-2"
        >
          <span className="text-sm font-medium text-gray-400">Active:</span>

          {search && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30">
              <Search className="w-3 h-3 text-purple-400" />
              <span className="text-xs font-medium text-purple-300">"{search}"</span>
              <button onClick={() => setSearch('')} className="hover:bg-purple-500/30 rounded-full p-0.5 transition-colors">
                <X className="w-3 h-3 text-purple-400" />
              </button>
            </div>
          )}

          {status !== 'all' && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              <span className="text-xs font-medium text-emerald-300">{statuses.find(s => s.value === status)?.label}</span>
              <button onClick={() => setStatus('all')} className="hover:bg-emerald-500/30 rounded-full p-0.5 transition-colors">
                <X className="w-3 h-3 text-emerald-400" />
              </button>
            </div>
          )}

          {priority !== 'all' && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30">
              <Flag className="w-3 h-3 text-orange-400" />
              <span className="text-xs font-medium text-orange-300">{priorities.find(p => p.value === priority)?.label}</span>
              <button onClick={() => setPriority('all')} className="hover:bg-orange-500/30 rounded-full p-0.5 transition-colors">
                <X className="w-3 h-3 text-orange-400" />
              </button>
            </div>
          )}

          {category !== 'all' && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/20 border border-pink-500/30">
              <Tag className="w-3 h-3 text-pink-400" />
              <span className="text-xs font-medium text-pink-300">{categories.find(c => c.value === category)?.label}</span>
              <button onClick={() => setCategory('all')} className="hover:bg-pink-500/30 rounded-full p-0.5 transition-colors">
                <X className="w-3 h-3 text-pink-400" />
              </button>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}

export default Filters
