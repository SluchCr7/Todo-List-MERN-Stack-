'use client'
import React from 'react'
import Image from 'next/image'

const UserProfile = () => {
  const user = {
    name: 'Ahmed Bekr',
    bio: 'MERN Stack Developer 💻 | Football Lover ⚽',
    avatar: '/avatar.jpg', // ضع صورتك في public/avatar.jpg أو استبدل برابط مباشر
    completedTasks: 15,
    totalTasks: 22,
  }

  return (
    <div className="w-full bg-gradient-to-r from-[#2C2C3A] to-[#1E1E2F] rounded-2xl p-6 shadow-lg flex flex-col sm:flex-row items-center gap-6">
      {/* صورة البروفايل */}
      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#7048E8] shadow-lg">
        <Image
          src={user.avatar}
          alt="Profile"
          width={96}
          height={96}
          className="object-cover w-full h-full"
        />
      </div>

      {/* بيانات المستخدم */}
      <div className="flex-1 text-center sm:text-left">
        <h2 className="text-2xl font-bold text-[#F1F1F5]">{user.name}</h2>
        <p className="text-[#A0A0B2] mt-1">{user.bio}</p>

        {/* إحصائيات */}
        <div className="flex gap-4 justify-center sm:justify-start mt-4">
          <span className="text-sm bg-[#63E6BE]/10 text-[#63E6BE] px-3 py-1 rounded-full">
            ✅ {user.completedTasks} Completed
          </span>
          <span className="text-sm bg-[#FFA94D]/10 text-[#FFA94D] px-3 py-1 rounded-full">
            📋 {user.totalTasks} Total
          </span>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
