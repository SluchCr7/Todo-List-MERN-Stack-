'use client'
import React, { useState } from 'react'

const Filters = ({ onFilterChange }) => {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [priority, setPriority] = useState('all')

  const handleChange = () => {
    onFilterChange({ search, status, priority })
  }

  return (
    <div className='flex flex-col md:flex-row gap-4 w-full mb-6'>
      {/* 🔍 البحث */}
      <input
        type="search"
        placeholder="🔍 Search tasks..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          handleChange()
        }}
        className="w-full md:w-80 bg-[#1E1E2F] text-[#F1F1F5] placeholder-gray-400 px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#7048E8]"
      />

      {/* ✅ الفلترة حسب الحالة */}
      <select
        value={status}
        onChange={(e) => {
          setStatus(e.target.value)
          handleChange()
        }}
        className="bg-[#1E1E2F] text-[#F1F1F5] border border-gray-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7048E8]"
      >
        <option value="all">All Statuses</option>
        <option value="complete">✅ Completed</option>
        <option value="incomplete">🕒 Incomplete</option>
      </select>

      {/* 🧩 الفلترة حسب الأولوية */}
      <select
        value={priority}
        onChange={(e) => {
          setPriority(e.target.value)
          handleChange()
        }}
        className="bg-[#1E1E2F] text-[#F1F1F5] border border-gray-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7048E8]"
      >
        <option value="all">All Priorities</option>
        <option value="High">🔥 High</option>
        <option value="Medium">⚡ Medium</option>
        <option value="Low">🌿 Low</option>
      </select>
    </div>
  )
}

export default Filters
