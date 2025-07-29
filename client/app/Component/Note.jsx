'use client'
import { FaTrash, FaCheckCircle, FaArrowCircleUp } from 'react-icons/fa';
import { useState } from 'react';
import { useNote } from '../Context/NoteContext';

export default function Note({ note }) {
  const { deleteNote, updatePriority, makeTaskComplete } = useNote();
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "High": return "bg-[#FF6B6B]/20 text-[#FF6B6B]";
      case "Medium": return "bg-[#FFA94D]/20 text-[#FFA94D]";
      case "Low": return "bg-[#63E6BE]/20 text-[#63E6BE]";
      default: return "bg-gray-400 text-white";
    }
  };

  const handlePriorityChange = (newPriority) => {
    updatePriority(note._id, newPriority);
    setShowPriorityMenu(false);
  };

  return (
    <div className={`relative rounded-2xl bg-[#2C2C3A] p-6 shadow-lg flex flex-col justify-between hover:scale-[1.01] transition-all w-full duration-300 ease-in-out`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-[#F1F1F5] mb-1">{note.title}</h2>
          {note.description && <p className="text-[#A0A0B2]">{note.description}</p>}
        </div>

        <div className="relative flex gap-3 items-start">
          {!note.complete && (
            <>
              <button onClick={() => makeTaskComplete(note._id)} title="Mark as Complete"
                className="text-green-400 hover:text-green-300 text-xl transition-all">
                <FaCheckCircle />
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowPriorityMenu((prev) => !prev)}
                  title="Change Priority"
                  className="text-yellow-400 hover:text-yellow-300 text-xl transition-all"
                >
                  <FaArrowCircleUp />
                </button>

                {showPriorityMenu && (
                  <div className="absolute top-8 right-0 z-10 bg-[#1E1E2F] border border-gray-600 rounded-lg shadow-lg w-36 text-sm">
                    <button onClick={() => handlePriorityChange('High')} className="w-full text-left px-4 py-2 hover:bg-[#FF6B6B]/20 text-[#FF6B6B]">🔥 High</button>
                    <button onClick={() => handlePriorityChange('Medium')} className="w-full text-left px-4 py-2 hover:bg-[#FFA94D]/20 text-[#FFA94D]">⚡ Medium</button>
                    <button onClick={() => handlePriorityChange('Low')} className="w-full text-left px-4 py-2 hover:bg-[#63E6BE]/20 text-[#63E6BE]">🌿 Low</button>
                  </div>
                )}
              </div>
            </>
          )}

          <button onClick={() => deleteNote(note._id)} title="Delete Task"
            className="text-red-500 hover:text-red-400 text-xl transition-all">
            <FaTrash />
          </button>
        </div>
      </div>

      {/* Priority Label */}
      <span className={`mt-4 inline-block w-fit px-4 py-1 rounded-full text-sm font-medium ${getPriorityStyle(note.priority)}`}>
        {note.priority} Priority
      </span>

      {/* Completed Overlay */}
      {note.complete && (
        <div className="absolute top-0 left-0 w-full h-full bg-[#1E1E2F]/90 rounded-2xl flex flex-col items-center justify-center gap-3 ">
          <span className="text-green-400 font-bold text-lg">Task Completed</span>
          <button onClick={() => deleteNote(note._id)} title="Delete Task"
            className="text-red-500 hover:text-red-300 text-xl transition-all">
            <FaTrash />
          </button>
        </div>
      )}
    </div>
  );
}
