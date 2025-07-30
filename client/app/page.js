'use client'
import { useNote } from "./Context/NoteContext";
import { useUser } from "./Context/UserContext";
import Note from "./Component/Note";
import InputAdd from "./Component/InputAdd";
import Filters from "./Component/Filters";
import UserProfile from "./Component/UserProfile";
import Login from "./Component/Login";
import Register from "./Component/Register";
import { useState } from "react";

const sampleTasks = [
  { _id: "1", title: "Buy groceries", description: "Milk, Bread, Cheese", priority: "high", complete: false },
  { _id: "2", title: "Finish project", description: "Finalize report for client", priority: "medium", complete: true },
  { _id: "3", title: "Workout", description: "30-minute run + stretching", priority: "low", complete: false },
  { _id: "4", title: "Read a book", description: "Continue reading 'Atomic Habits'", priority: "low", complete: false },
  { _id: "5", title: "Team meeting", description: "Weekly sync with dev team", priority: "high", complete: true },
];

export default function Home() {
  const { notes } = useNote();
  const { user, users, Logout } = useUser()
  const [selectUser, setSelectUser] = useState(null)

  useEffect(() => {
    const selectedUser = users.find(u => u._id === user._id)
    setSelectUser(selectedUser)
  }, [users, user])
  const {
    showLoginMenu, setShowLoginMenu,
    setShowRegisterMenu, showRegisterMenu,
    isAuthChecked, isLogin
  } = useUser();

  // const tasks = user?.taskes.length ? user?.taskes : sampleTasks;
  const priorityOrder = { high: 1, medium: 2, low: 3 };

  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    priority: 'all'
  });
  const filterTasks = selectUser?.taskes
    .filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus =
        filters.status === 'all' ||
        (filters.status === 'complete' && task.isComplete) ||
        (filters.status === 'incomplete' && !task.isComplete);
      const matchesPriority =
        filters.priority === 'all' ||
        task.priority === filters.priority;

      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  if (!isAuthChecked)
    return <div className="text-center text-white p-10">Checking authentication...</div>;

  if (!isLogin) {
    return (
      <main className="min-h-screen bg-[#12121A] flex flex-col items-center justify-center text-[#E4E4E7] px-6 py-12">
        <div className="text-center space-y-6 max-w-xl">
          <h1 className="text-5xl font-extrabold tracking-tight">📋 Task Manager</h1>
          <p className="text-[#9CA3AF] text-lg">Organize your day and stay productive. Login to start managing tasks!</p>
          <div className="flex gap-4 items-center w-full justify-center">
            <button
              onClick={() => setShowLoginMenu(true)}
              className="bg-indigo-600 hover:bg-indigo-500 transition-all px-6 py-3 rounded-xl font-semibold text-white shadow-lg"
            >
              🚀 Login
            </button>
            <button
              onClick={() => setShowRegisterMenu(true)}
              className="bg-indigo-600 hover:bg-indigo-500 transition-all px-6 py-3 rounded-xl font-semibold text-white shadow-lg"
            >
              ✍️ Register
            </button>
          </div>
        </div>

        {showLoginMenu && <Login onClose={() => setShowLoginMenu(false)} />}
        {showRegisterMenu && <Register onClose={() => setShowRegisterMenu(false)} />}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-tr from-[#1A1A2E] to-[#1F2235] text-white px-4 sm:px-8 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* العنوان */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">📋 My Tasks</h1>
          <p className="text-[#9CA3AF]">Track, organize and complete your daily tasks efficiently.</p>
        </div>

        <UserProfile />

        {/* الفلاتر وإضافة مهمة */}
        <div className="flex items-start flex-col gap-6">
          <InputAdd />
          <Filters onFilterChange={setFilters} />
        </div>

        {/* المهام */}
        <section>
          {filterTasks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filterTasks.map((note) => (
                <Note key={note._id} note={note} />
              ))}
            </div>
          ) : (
            <div className="text-center text-[#9CA3AF] mt-10 text-lg">
              🔍 No tasks match your criteria.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
