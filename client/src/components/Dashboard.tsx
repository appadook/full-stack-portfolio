import React from 'react';
import { motion } from 'framer-motion';
import StatCard from './StatCard';

interface DashboardProps {
  experienceCount: number;
  projectCount: number;
  skillCount: number;
  containerVariants: any;
  onNavigate: (section: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  experienceCount, 
  projectCount, 
  skillCount, 
  containerVariants,
  onNavigate
}) => {
  return (
    <>
      <h2 className="text-3xl font-bold mb-8 text-gradient text-center">Admin Dashboard</h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          variants={containerVariants}
        >
          <StatCard 
            title="Experiences"
            value={experienceCount}
            description="Work & Research Experience Items"
            icon="💼"
          />
          <StatCard 
            title="Projects"
            value={projectCount}
            description="Portfolio Projects"
            icon="🚀"
          />
          <StatCard 
            title="Skills"
            value={skillCount}
            description="Technical Skills"
            icon="🔧"
          />
        </motion.div>
        
        <motion.div 
          className="glass-card p-7 mb-10 rounded-2xl shadow-xl border border-gray-800/60 backdrop-blur-sm bg-dark-surface/80"
          variants={containerVariants}
        >
          <h3 className="text-xl font-bold text-white tracking-tight mb-6 text-center">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <button 
              className="btn-primary py-4 px-5 rounded-xl font-medium flex items-center justify-center gap-3 shadow-lg shadow-violet-900/10 hover:shadow-violet-900/20 transition-all bg-gradient-to-r from-violet-800 to-purple-800 border border-violet-700/40"
              onClick={() => onNavigate('experiences')}
            >
              <span className="text-xl">💼</span>
              <span>Add Experience</span>
            </button>
            <button 
              className="btn-primary py-4 px-5 rounded-xl font-medium flex items-center justify-center gap-3 shadow-lg shadow-violet-900/10 hover:shadow-violet-900/20 transition-all bg-gradient-to-r from-violet-800 to-purple-800 border border-violet-700/40"
              onClick={() => onNavigate('projects')}
            >
              <span className="text-xl">🚀</span>
              <span>Add Project</span>
            </button>
            <button 
              className="btn-primary py-4 px-5 rounded-xl font-medium flex items-center justify-center gap-3 shadow-lg shadow-violet-900/10 hover:shadow-violet-900/20 transition-all bg-gradient-to-r from-violet-800 to-purple-800 border border-violet-700/40"
              onClick={() => onNavigate('skills')}
            >
              <span className="text-xl">🔧</span>
              <span>Add Skill</span>
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          className="glass-card p-7 rounded-2xl shadow-xl border border-gray-800/60 backdrop-blur-sm bg-dark-surface/80"
          variants={containerVariants}
        >
          <h3 className="text-xl font-bold text-white tracking-tight mb-6 text-center">Recent Updates</h3>
          <div className="space-y-5">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-900/40 to-purple-900/40 flex items-center justify-center mr-4 text-violet-200 text-xl flex-shrink-0 shadow-lg shadow-violet-900/10 border border-violet-700/40">
                  🔄
                </div>
                <div>
                  <p className="text-gray-200 font-medium">System synced with server</p>
                  <p className="text-gray-400 text-sm mt-1">Just now</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-900/40 to-purple-900/40 flex items-center justify-center mr-4 text-violet-200 text-xl flex-shrink-0 shadow-lg shadow-violet-900/10 border border-violet-700/40">
                  📊
                </div>
                <div>
                  <p className="text-gray-200 font-medium">Loaded {experienceCount} experiences and {projectCount} projects</p>
                  <p className="text-gray-400 text-sm mt-1">A few minutes ago</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Dashboard;