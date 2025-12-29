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
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, Clock, TrendingUp } from "lucide-react";

const sampleTasks = [];

export default function Home() {
  const {
    user,
    isAuthChecked,
    isLogin,
    showLoginMenu,
    setShowLoginMenu,
    showRegisterMenu,
    setShowRegisterMenu
  } = useUser();

  useEffect(() => {
    console.log(user)
  }, [user])

  const tasks = Array.isArray(user?.tasks) ? user.tasks : sampleTasks;
  const priorityOrder = { high: 1, medium: 2, low: 3 };

  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    priority: 'all',
    category: 'all'
  });

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.isComplete).length;
  const pendingTasks = totalTasks - completedTasks;
  const highPriorityTasks = tasks.filter(task => task.priority === 'high' && !task.isComplete).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Category statistics
  const categoryStats = tasks.reduce((acc, task) => {
    const cat = task.category || 'other';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const filterTasks = tasks
    .filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(filters.search.toLowerCase())) ||
        (task.notes && task.notes.toLowerCase().includes(filters.search.toLowerCase()));
      const matchesStatus =
        filters.status === 'all' ||
        (filters.status === 'complete' && task.isComplete) ||
        (filters.status === 'incomplete' && !task.isComplete);
      const matchesPriority =
        filters.priority === 'all' ||
        task.priority === filters.priority;
      const matchesCategory =
        filters.category === 'all' ||
        (task.category || 'other') === filters.category;

      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    })
    .sort((a, b) => {
      // Sort by completion status first (incomplete first)
      if (a.isComplete !== b.isComplete) {
        return a.isComplete ? 1 : -1;
      }
      // Then by priority
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  if (!isAuthChecked)
    return (
      <div className="min-h-screen animated-bg flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-strong p-8 rounded-3xl text-center"
        >
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold gradient-text">Loading your workspace...</p>
        </motion.div>
      </div>
    );

  if (!isLogin) {
    return (
      <main className="min-h-screen animated-bg relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8 max-w-4xl"
          >
            {/* Logo/Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-24 h-24 glass-strong rounded-3xl mb-4"
            >
              <Sparkles className="w-12 h-12 text-purple-400" />
            </motion.div>

            {/* Heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <span className="gradient-text">TaskFlow</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
              >
                Your intelligent task management companion. Organize, prioritize, and achieve more with elegance.
              </motion.p>
            </div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 mb-8"
            >
              {[
                { icon: CheckCircle2, text: "Smart Organization", color: "from-emerald-400 to-cyan-400" },
                { icon: Clock, text: "Time Management", color: "from-purple-400 to-pink-400" },
                { icon: TrendingUp, text: "Track Progress", color: "from-orange-400 to-rose-400" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="glass p-6 rounded-2xl hover:scale-105 transition-transform duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 mx-auto`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-gray-300 font-medium">{feature.text}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8"
            >
              <button
                onClick={() => setShowLoginMenu(true)}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl font-bold text-lg text-white shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 overflow-hidden min-w-[200px]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Sign In
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button
                onClick={() => setShowRegisterMenu(true)}
                className="px-8 py-4 glass-strong rounded-2xl font-bold text-lg text-white hover:bg-white/10 transition-all duration-300 min-w-[200px] border-2 border-purple-500/30 hover:border-purple-500/60"
              >
                Create Account
              </button>
            </motion.div>

            {/* Additional Info */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-sm text-gray-500 mt-8"
            >
              Join thousands of productive users worldwide
            </motion.p>
          </motion.div>
        </div>

        {showLoginMenu && <Login onClose={() => setShowLoginMenu(false)} />}
        {showRegisterMenu && <Register onClose={() => setShowRegisterMenu(false)} />}
      </main>
    );
  }

  return (
    <main className="min-h-screen animated-bg relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 lg:mb-12"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <span className="gradient-text">My Workspace</span>
              </h1>
              <p className="text-lg text-gray-400">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            <UserProfile />
          </div>

          {/* Statistics Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          >
            {[
              { label: "Total Tasks", value: totalTasks, icon: Sparkles, color: "from-purple-500 to-pink-500", bg: "bg-purple-500/10" },
              { label: "Completed", value: completedTasks, icon: CheckCircle2, color: "from-emerald-500 to-cyan-500", bg: "bg-emerald-500/10" },
              { label: "In Progress", value: pendingTasks, icon: Clock, color: "from-blue-500 to-indigo-500", bg: "bg-blue-500/10" },
              { label: "High Priority", value: highPriorityTasks, icon: TrendingUp, color: "from-orange-500 to-red-500", bg: "bg-orange-500/10" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="glass-strong p-6 rounded-2xl hover:scale-105 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <stat.icon className={`w-6 h-6 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', backgroundImage: `linear-gradient(to bottom right, ${stat.color})` }} />
                  </div>
                </div>
                <div className="text-3xl lg:text-4xl font-black mb-1 gradient-text">{stat.value}</div>
                <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Progress Bar */}
          {totalTasks > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-6 glass-strong p-6 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-300">Overall Progress</span>
                <span className="text-2xl font-black gradient-text">{completionRate}%</span>
              </div>
              <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${completionRate}%` }}
                  transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full"
                />
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Add Task & Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="xl:col-span-1 space-y-6"
          >
            <InputAdd />
            <Filters onFilterChange={setFilters} />
          </motion.div>

          {/* Right Column - Tasks Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="xl:col-span-2"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                {filters.status === 'complete' ? 'Completed Tasks' :
                  filters.status === 'incomplete' ? 'Pending Tasks' :
                    'All Tasks'}
                <span className="ml-3 text-lg text-gray-400">({filterTasks.length})</span>
              </h2>
            </div>

            {filterTasks.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {filterTasks.map((note, index) => (
                  <motion.div
                    key={note._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                  >
                    <Note note={note} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="glass-strong p-12 rounded-3xl text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-12 h-12 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No tasks found</h3>
                <p className="text-gray-400 text-lg">
                  {filters.search || filters.status !== 'all' || filters.priority !== 'all'
                    ? "Try adjusting your filters"
                    : "Create your first task to get started"}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
