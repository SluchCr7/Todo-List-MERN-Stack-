'use client'
import React from 'react'
import Image from 'next/image'
import { useUser } from '../Context/UserContext'
import { motion } from 'framer-motion'
import { LogOut, CheckCircle, ListTodo, TrendingUp, Award } from 'lucide-react'

const UserProfile = () => {
  const { user, Logout } = useUser()

  if (!user || !Array.isArray(user?.tasks)) return null;

  const completedCount = user.tasks.filter(task => task?.isComplete)?.length || 0
  const totalCount = user.tasks.length || 0
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-full glass-strong rounded-3xl p-6 lg:p-8 shadow-2xl overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
        {/* Profile Image */}
        <div className="relative">
          <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl overflow-hidden border-2 border-purple-500/50 shadow-lg">
            <Image
              src={user?.profilePhoto?.url || '/default-avatar.png'}
              alt="Profile"
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
          </div>
          {/* Status Indicator */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full border-2 border-[#1e1e2e] flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl lg:text-3xl font-black text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {user?.name || 'User'}
          </h2>

          <p className="text-sm text-gray-400 mb-4">
            {user?.email || 'user@example.com'}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-300">{completedCount} Done</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30">
              <ListTodo className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-semibold text-blue-300">{totalCount} Total</span>
            </div>

            {totalCount > 0 && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-semibold text-purple-300">{completionRate}%</span>
              </div>
            )}
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={Logout}
          className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 font-medium transition-all duration-300"
        >
          <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>

      {/* Achievement Badge (if high completion rate) */}
      {completionRate >= 80 && totalCount >= 5 && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 shadow-lg"
        >
          <Award className="w-4 h-4 text-white" />
          <span className="text-xs font-bold text-white">High Achiever!</span>
        </motion.div>
      )}
    </motion.div>
  )
}

export default UserProfile
