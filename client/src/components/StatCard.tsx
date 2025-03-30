import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: number;
  description: string;
  icon: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, icon }) => {
  return (
    <motion.div 
      className="glass-card p-7 rounded-2xl shadow-xl border border-gray-800/60 
                hover:border-violet-800/50 transition-all duration-300 backdrop-blur-sm 
                bg-dark-surface/80 hover:shadow-violet-900/20"
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-900/40 to-purple-900/40 
                      flex items-center justify-center mr-4 text-violet-200 text-xl
                      shadow-lg shadow-violet-900/20 border border-violet-700/40">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
      </div>
      <p className="text-4xl font-bold text-gradient mb-3">{value}</p>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

export default StatCard;