'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useUser } from '../Context/UserContext'
import { FiLogOut } from 'react-icons/fi' // أيقونة تسجيل الخروج

const UserProfile = () => {
  const { user, users, Logout } = useUser()
  const [selectUser, setSelectUser] = useState(null)

  useEffect(() => {
    const selectedUser = users.find(u => u._id === user._id)
    setSelectUser(selectedUser)
  }, [users, user])

  const completedCount = selectUser?.taskes?.filter(task => task?.isComplete)?.length || 0
  const totalCount = selectUser?.taskes?.length || 0

  return (
    <div className="relative w-full bg-gradient-to-r from-[#2C2C3A] to-[#1E1E2F] rounded-2xl p-6 shadow-lg flex flex-col sm:flex-row items-center gap-6">
      
      {/* زر تسجيل الخروج */}
      <button
        onClick={Logout}
        className="absolute top-4 right-4 text-sm text-[#FF6B6B] hover:text-white bg-[#FF6B6B]/10 hover:bg-[#FF6B6B]/20 px-3 py-1 rounded-full flex items-center gap-1 transition-all"
      >
        <FiLogOut className="text-base" />
        Logout
      </button>

      {/* صورة البروفايل */}
      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#7048E8] shadow-lg">
        <Image
          src={user?.profilePhoto?.url || '/default.png'}
          alt="Profile"
          width={96}
          height={96}
          className="object-cover w-full h-full"
        />
      </div>

      {/* بيانات المستخدم */}
      <div className="flex-1 text-center sm:text-left">
        <h2 className="text-2xl font-bold text-[#F1F1F5]">
          {user?.name || 'No Name'}
        </h2>

        {/* إحصائيات */}
        <div className="flex gap-4 justify-center sm:justify-start mt-4">
          <span className="text-sm bg-[#63E6BE]/10 text-[#63E6BE] px-3 py-1 rounded-full">
            ✅ {completedCount} Completed
          </span>
          <span className="text-sm bg-[#FFA94D]/10 text-[#FFA94D] px-3 py-1 rounded-full">
            📋 {totalCount} Total
          </span>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
