'use client'
import React, { useState } from 'react'
import { useNote } from '../Context/NoteContext'

const InputAdd = () => {
  const { addNote } = useNote()
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  const handleAdd = () => {
    if (!title.trim()) {
      setError("Title is required")
      return
    }

    addNote(title)
    setTitle('')
    setError('')
  }

  return (
    <div className="w-full bg-[#2C2C3A] p-6 rounded-2xl shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-[#F1F1F5] mb-2">📝 Add New Task</h2>

      <input
        type="text"
        placeholder="Enter task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-[#1E1E2F] text-[#F1F1F5] placeholder-gray-400 px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#7048E8] transition-all duration-200"
      />

      {error && <p className="text-[#FF6B6B] font-medium">{error}</p>}

      <button
        onClick={handleAdd}
        className="w-full bg-[#7048E8] hover:bg-[#5f3bc6] text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
      >
        ➕ Add Task
      </button>
    </div>
  )
}

export default InputAdd
