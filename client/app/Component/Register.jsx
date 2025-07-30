'use client'
import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useUser } from '../Context/UserContext'

const Register = ({onClose}) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const {showLoginMenu, setShowLoginMenu, registerNewUser , showRegisterMenu , setShowRegisterMenu } = useUser()

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("⚠️ All fields are required")
    } else {
      registerNewUser(name, email, password)
      setError("")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#2C2C3A] w-[90%] max-w-md p-8 rounded-2xl shadow-2xl text-[#F1F1F5] relative animate-fade-in">

        {/* زر إغلاق */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#A0A0B2] hover:text-red-400 text-xl transition"
            title="Close"
          >
            <IoMdClose />
          </button>
        )}

        <h2 className="text-3xl font-bold text-center mb-6">📝 Register</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#7048E8] placeholder-gray-400"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#7048E8] placeholder-gray-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#7048E8] placeholder-gray-400"
          />

          {/* رسالة الخطأ */}
          {error && (
            <p className="text-[#FF6B6B] text-sm font-medium">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            className="w-full mt-2 bg-[#7048E8] hover:bg-[#5f3bc6] text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Register
          </button>
        </div>

        <p className="mt-4 text-sm text-center text-gray-400">
            Already have an account?{" "}
            <button onClick={() => {
                setShowRegisterMenu(false);
                setShowLoginMenu(true)
            }} className="text-[#63E6BE] hover:underline">Login</button>
        </p>
      </div>
    </div>
  )
}

export default Register
