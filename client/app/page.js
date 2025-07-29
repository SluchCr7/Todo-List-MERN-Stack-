'use client'
import { useNote } from "./Context/NoteContext";
import Note from "./Component/Note";
import InputAdd from "./Component/InputAdd";
import Filters from "./Component/Filters";
import { useState } from "react";
import UserProfile from "./Component/UserProfile";
import { useUser } from "./Context/UserContext";
import Login from "./Component/Login"; // تأكد من وجوده
import Register from "./Component/Register"; // إن كنت ستستخدمه

const sampleTasks = [
  { _id: "1", title: "Buy groceries", description: "Milk, Bread, Cheese", priority: "High", complete: false },
  { _id: "2", title: "Finish project", description: "Finalize report for client", priority: "Medium", complete: true },
  { _id: "3", title: "Workout", description: "30-minute run + stretching", priority: "Low", complete: false },
  { _id: "4", title: "Read a book", description: "Continue reading 'Atomic Habits'", priority: "Low", complete: false },
  { _id: "5", title: "Team meeting", description: "Weekly sync with dev team", priority: "High", complete: true },
];

export default function Home() {
  const { notes } = useNote()
  const { showLoginMenu, setShowLoginMenu, isAuthChecked, isLogin ,setShowRegisterMenu, showRegisterMenu } = useUser()

  const tasks = notes.length ? sampleTasks : sampleTasks
  const priorityOrder = { High: 1, Medium: 2, Low: 3 }

  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    priority: 'all'
  })

  const filterTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = filters.status === 'all' ||
      (filters.status === 'complete' && task.complete) ||
      (filters.status === 'incomplete' && !task.complete);
    const matchesPriority =
      filters.priority === 'all' ||
      task.priority === filters.priority;

    return matchesSearch && matchesStatus && matchesPriority
  }).sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  // ✅ لو لم يتم التحقق بعد
  if (!isAuthChecked) return <div className="text-center text-white p-10">Checking authentication...</div>

  // ✅ لو المستخدم غير مسجل دخول
  if (!isLogin) {
    return (
      <main className="min-h-screen bg-[#1E1E2F] flex flex-col items-center justify-center text-[#F1F1F5] px-6 py-12">
        <div className="text-center space-y-6 max-w-xl">
          <h1 className="text-5xl font-extrabold tracking-tight">📋 Task Manager</h1>
          <p className="text-[#A0A0B2] text-lg">
            Organize your day and stay focused. log in to start managing your tasks effectively!
          </p>
          <button
            onClick={() => setShowLoginMenu(true)}
            className="bg-[#7048E8] hover:bg-[#5f3bc6] transition-all px-6 py-3 rounded-lg font-semibold text-white"
          >
            🚀 Login 
          </button>
        </div>

        {/* نافذة تسجيل الدخول */}
        {showLoginMenu && <Login onClose={() => setShowLoginMenu(false)} />}
      </main>
    )
  }

  // ✅ لو المستخدم مسجل دخول
  return (
    <main className="min-h-screen bg-[#1E1E2F] text-[#F1F1F5] px-6 py-12 sm:py-20 font-sans">
      <div className="max-w-6xl mx-auto">
        {showRegisterMenu && <Register onClose={() => setShowRegisterMenu(false)} />}
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-10 tracking-tight">
          📋 Task Manager
        </h1>
        <UserProfile />
        <Filters onFilterChange={setFilters} />
        <div className="mb-12">
          <InputAdd />
        </div>

        {filterTasks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filterTasks.map((note) => (
              <Note key={note._id} note={note} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-[#A0A0B2]">No Tasks Found</p>
        )}
      </div>
    </main>
  );
}
