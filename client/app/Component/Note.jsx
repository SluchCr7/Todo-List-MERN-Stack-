'use client'
import { FaTrash, FaCheckCircle, FaArrowCircleUp } from 'react-icons/fa';
import { useNote } from '../Context/NoteContext';

export default function Note({ note }) {
  const { deleteNote, updatePriority, makeTaskComplete } = useNote();

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "High":
        return "bg-[#FF6B6B]/20 text-[#FF6B6B]";
      case "Medium":
        return "bg-[#FFA94D]/20 text-[#FFA94D]";
      case "Low":
        return "bg-[#63E6BE]/20 text-[#63E6BE]";
      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <div className={`relative rounded-2xl bg-[#2C2C3A] p-6 shadow-lg flex flex-col justify-between hover:scale-[1.01] transition-all duration-300 ease-in-out`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-[#F1F1F5] mb-1">{note.title}</h2>
          <p className="text-[#A0A0B2]">{note.description}</p>
        </div>

        <div className="flex gap-3 items-start">
          {!note.complete && (
            <>
              <button onClick={() => makeTaskComplete(note._id)} title="Mark as Complete" className="text-green-400 hover:text-green-300 text-xl transition-all">
                <FaCheckCircle />
              </button>
              <button onClick={() => updatePriority(note._id)} title="Change Priority" className="text-yellow-400 hover:text-yellow-300 text-xl transition-all">
                <FaArrowCircleUp />
              </button>
            </>
          )}
          <button onClick={() => deleteNote(note._id)} title="Delete Task" className="text-red-500 hover:text-red-400 text-xl transition-all">
            <FaTrash />
          </button>
        </div>
      </div>

      {/* Priority Label */}
      <span className={`mt-4 inline-block w-fit px-4 py-1 rounded-full text-sm font-medium ${getPriorityStyle(note.priority)}`}>
        {note.priority} Priority
      </span>

      {/* Complete Overlay */}
      {note.complete && (
        <div className="absolute top-0 left-0 w-full h-full bg-[#1E1E2F]/90 rounded-2xl flex flex-col items-center justify-center gap-3
                        animate-fade-in-scale">
          <span className="text-green-400 font-bold text-lg">✔️ Task Completed</span>
          <button onClick={() => deleteNote(note._id)} title="Delete Task"
            className="text-red-500 hover:text-red-300 text-xl transition-all">
            <FaTrash />
          </button>
        </div>
      )}
    </div>
  );
}
