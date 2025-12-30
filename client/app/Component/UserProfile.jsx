'use client'
import React from 'react'
import Image from 'next/image'
import { useUser } from '../Context/UserContext'
import { motion } from 'framer-motion'
import { LogOut, CheckCircle2, TrendingUp, Trophy, Sparkles } from 'lucide-react'

const UserProfile = () => {
  const { user, Logout } = useUser()

  if (!user || !Array.isArray(user?.tasks)) return null;

  const completedCount = user.tasks.filter(task => task?.isComplete)?.length || 0
  const totalCount = user.tasks.length || 0
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative group w-full"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative overflow-hidden rounded-3xl md:rounded-[2rem] glass-strong border border-white/10 p-1">
        <div className="relative z-10 p-5 md:p-6 flex flex-col md:flex-row items-center gap-6">

          {/* Avatar Section */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden ring-4 ring-white/5 shadow-2xl">
              <Image
                src={user?.profilePhoto?.url || '/default-avatar.png'}
                alt="Profile"
                width={100}
                height={100}
                className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            {/* Level Badge */}
            <div className="absolute -bottom-2 -right-2 bg-[#0a0a0f] p-1 rounded-full">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center border border-white/10">
                <Trophy className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* User Details */}
          <div className="flex-1 text-center md:text-left space-y-2">
            <div>
              <motion.h2
                className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white"
                style={{ fontFamily: 'var(--font-space)' }}
              >
                {user?.name || 'Explorer'}
              </motion.h2>
              <p className="text-sm font-medium text-purple-200/60 font-mono tracking-wide">
                {user?.email}
              </p>
            </div>

            {/* Mini Stats Grid */}
            <div className="flex items-center justify-center md:justify-start gap-3 mt-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-100">{completedCount} Done</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-xs font-bold text-purple-100">{totalCount} Tasks</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-pink-500/10 border border-pink-500/20">
                <TrendingUp className="w-3.5 h-3.5 text-pink-400" />
                <span className="text-xs font-bold text-pink-100">{completionRate}%</span>
              </div>
            </div>
          </div>

          {/* Logout Action */}
          <button
            onClick={Logout}
            className="md:self-start p-3 rounded-full hover:bg-white/5 text-gray-400 hover:text-red-400 transition-all duration-300 group/btn"
            title="Logout"
          >
            <LogOut className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>
    </motion.div>
  )
}

export default UserProfile
