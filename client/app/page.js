'use client'
import { useNote } from "./Context/NoteContext";
import { useUser } from "./Context/UserContext";
import Note from "./Component/Note";
import InputAdd from "./Component/InputAdd";
import Filters from "./Component/Filters";
import UserProfile from "./Component/UserProfile";
import Login from "./Component/Login";
import Register from "./Component/Register";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, Clock, TrendingUp, Calendar, Zap, LayoutGrid } from "lucide-react";

export default function Home() {
  const { user, isAuthChecked, isLogin, showLoginMenu, setShowLoginMenu, showRegisterMenu, setShowRegisterMenu } = useUser();

  const tasks = Array.isArray(user?.tasks) ? user.tasks : [];

  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    priority: 'all',
    category: 'all'
  });

  const priorityOrder = { high: 1, medium: 2, low: 3 };

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.isComplete).length;
  const pendingTasks = totalTasks - completedTasks;
  const highPriorityTasks = tasks.filter(task => task.priority === 'high' && !task.isComplete).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const filterTasks = tasks
    .filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(filters.search.toLowerCase()));
      const matchesStatus = filters.status === 'all' ||
        (filters.status === 'complete' && task.isComplete) ||
        (filters.status === 'incomplete' && !task.isComplete);
      const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
      const matchesCategory = filters.category === 'all' || (task.category || 'other') === filters.category;

      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    })
    .sort((a, b) => {
      if (a.isComplete !== b.isComplete) return a.isComplete ? 1 : -1;
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  if (!isAuthChecked) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 animate-pulse">Initializing Workspace...</p>
        </div>
      </div>
    );
  }

  if (!isLogin) {
    return (
      <main className="min-h-screen bg-[#0a0a0f] relative overflow-hidden flex items-center justify-center">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-2xl shadow-purple-500/30 mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-gray-400 tracking-tight" style={{ fontFamily: 'var(--font-space)' }}>
              TaskFlow
            </h1>

            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
              The premium workspace for high achievers. Organize your life with elegance, speed, and intelligence.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <button
                onClick={() => setShowLoginMenu(true)}
                className="px-8 py-4 bg-white text-black text-lg font-bold rounded-xl hover:scale-105 transition-transform shadow-xl shadow-white/10 w-full sm:w-auto"
              >
                Get Started
              </button>
              <button
                onClick={() => setShowRegisterMenu(true)}
                className="px-8 py-4 bg-white/5 text-white border border-white/10 text-lg font-bold rounded-xl hover:bg-white/10 transition-colors w-full sm:w-auto"
              >
                Create Account
              </button>
            </div>
          </motion.div>
        </div>

        {showLoginMenu && <Login onClose={() => setShowLoginMenu(false)} />}
        {showRegisterMenu && <Register onClose={() => setShowRegisterMenu(false)} />}
      </main>
    );
  }

  // Authenticated Dashboard
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white selection:bg-purple-500/30">
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      {/* Dynamic Background Blurs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 space-y-8">

        {/* Top Navigation / Branding */}
        <header className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-black tracking-tight flex items-center gap-2" style={{ fontFamily: 'var(--font-space)' }}>
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                <LayoutGrid className="w-5 h-5 text-white" />
              </span>
              TaskFlow
            </h1>
            <p className="text-gray-500 text-sm mt-1 ml-10">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="w-full md:w-auto">
            <UserProfile />
          </div>
        </header>

        {/* Stats Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="p-5 rounded-3xl bg-[#1e1e2e]/50 border border-white/5 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap className="w-16 h-16 text-yellow-500" />
            </div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Total Active</p>
            <h3 className="text-3xl font-black text-white">{totalTasks}</h3>
            <div className="mt-2 h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-500 w-full" />
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-[#1e1e2e]/50 border border-white/5 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <CheckCircle2 className="w-16 h-16 text-emerald-500" />
            </div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Completed</p>
            <h3 className="text-3xl font-black text-white">{completedTasks}</h3>
            <div className="mt-2 h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${completionRate}%` }} />
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-[#1e1e2e]/50 border border-white/5 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Clock className="w-16 h-16 text-blue-500" />
            </div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Pending</p>
            <h3 className="text-3xl font-black text-white">{pendingTasks}</h3>
            <div className="mt-2 text-xs text-blue-400 font-medium">Keep pushing!</div>
          </div>

          <div className="p-5 rounded-3xl bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-purple-500/20 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <TrendingUp className="w-16 h-16 text-purple-500" />
            </div>
            <p className="text-purple-300 text-xs font-bold uppercase tracking-wider mb-1">Productivity</p>
            <h3 className="text-3xl font-black text-white">{completionRate}%</h3>
            <div className="mt-2 text-xs text-purple-300 font-medium">
              {completionRate > 80 ? "🔥 You're on fire!" : "💪 Consistent effort"}
            </div>
          </div>
        </motion.div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Panel (Filters & Input) */}
          <div className="lg:col-span-4 space-y-6 sticky top-8">
            <InputAdd />
            <Filters onFilterChange={setFilters} />

            {/* Motivational Card (Optional filler) */}
            <div className="hidden lg:block p-6 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 text-center">
              <div className="w-12 h-12 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </div>
              <h4 className="text-white font-bold mb-2">Focus Mode</h4>
              <p className="text-sm text-gray-400">
                "Start by doing what's necessary; then do what's possible; and suddenly you are doing the impossible."
              </p>
            </div>
          </div>

          {/* Right Panel (Task List) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="w-2 h-8 bg-purple-500 rounded-full" />
                Tasks
                <span className="text-sm text-gray-500 font-normal ml-2">
                  ({filterTasks.length})
                </span>
              </h2>
            </div>

            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {filterTasks.length > 0 ? (
                  filterTasks.map((note) => (
                    <Note key={note._id} note={note} />
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-20 text-center rounded-[2rem] border border-dashed border-white/10 bg-white/5"
                  >
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-8 h-8 text-gray-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">All caught up!</h3>
                    <p className="text-gray-400">No tasks found matching your filters.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
