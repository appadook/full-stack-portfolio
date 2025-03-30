import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';

interface SkillCategory {
  name: string;
}

interface SkillsData {
  [category: string]: { name: string }[];
}

interface SkillsSectionProps {
  skills: SkillsData;
  containerVariants: any;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, containerVariants }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gradient text-center mb-6">Manage Skills</h2>
        <button className="btn-primary py-2.5 px-5 rounded-xl font-medium flex items-center gap-2 bg-gradient-to-r from-violet-800 to-purple-800 border border-violet-700/40 shadow-lg shadow-violet-900/10">
          <span className="text-lg">+</span>
          <span>New Category</span>
        </button>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-10"
      >
        {Object.entries(skills).map(([category, skillList], catIndex) => (
          <motion.div 
            key={category} 
            className="glass-card p-7 rounded-2xl shadow-xl border border-gray-800/60 backdrop-blur-sm bg-dark-surface/80"
            variants={containerVariants}
            custom={catIndex}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center">
                <span className="bg-gradient-to-r from-violet-900/40 to-purple-900/40 w-10 h-10 rounded-xl flex items-center justify-center mr-4 text-violet-200 text-sm font-medium shadow-md border border-violet-700/40">
                  {catIndex + 1}
                </span>
                <span>{category}</span>
              </h3>
              <div className="flex gap-3">
                <button className="text-sm bg-gradient-to-r from-violet-900/30 to-purple-900/30 text-violet-200 py-2 px-4 rounded-lg font-medium border border-violet-800/30 hover:from-violet-800/40 hover:to-purple-800/40 transition-colors shadow-md">
                  Edit Category
                </button>
                <button className="text-sm bg-gradient-to-r from-red-900/30 to-red-800/30 text-red-200 py-2 px-4 rounded-lg font-medium border border-red-800/30 hover:from-red-800/40 hover:to-red-700/40 transition-colors shadow-md">
                  Delete
                </button>
              </div>
            </div>
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              variants={containerVariants}
            >
              {skillList.map((skill, index) => (
                <Card
                  key={index}
                  type="skill"
                  title={skill.name}
                  actionButtons={
                    <>
                      <button className="text-violet-300 hover:text-violet-200 transition-colors bg-violet-900/20 hover:bg-violet-900/40 w-8 h-8 rounded-lg flex items-center justify-center">✏️</button>
                      <button className="text-red-300 hover:text-red-200 transition-colors bg-red-900/20 hover:bg-red-900/40 w-8 h-8 rounded-lg flex items-center justify-center">🗑️</button>
                    </>
                  }
                />
              ))}
              
              <Card 
                type="add" 
                title="Add Skill"
                className="p-4 h-[58px]"
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default SkillsSection;