'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

const Alert = ({ notify, type = 'success', onClose }) => {
  return (
    <AnimatePresence>
      {notify && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed top-6 right-6 z-[1000] flex items-center gap-4 p-4 min-w-[320px] rounded-2xl glass-strong border border-white/10 shadow-2xl backdrop-blur-xl"
        >
          {/* Icon Container */}
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${type === 'error' ? 'from-red-500 to-rose-600' : 'from-emerald-500 to-green-600'
            } shadow-lg`}>
            {type === 'error' ? (
              <AlertCircle className="w-6 h-6 text-white" />
            ) : (
              <CheckCircle2 className="w-6 h-6 text-white" />
            )}
          </div>

          {/* Text Content */}
          <div className="flex-1">
            <h4 className={`text-sm font-bold ${type === 'error' ? 'text-red-400' : 'text-emerald-400'
              }`}>
              {type === 'error' ? 'Error' : 'Success'}
            </h4>
            <p className="text-sm text-gray-300 font-medium leading-tight">
              {notify}
            </p>
          </div>

          {/* Close Button (Optional) */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-400 hover:text-white" />
            </button>
          )}

          {/* Glow Effect */}
          <div className={`absolute inset-0 rounded-2xl opacity-20 bg-gradient-to-r ${type === 'error' ? 'from-red-500 to-rose-600' : 'from-emerald-500 to-green-600'
            } blur-xl -z-10`} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;
