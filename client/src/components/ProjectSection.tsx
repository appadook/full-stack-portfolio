import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';

interface ProjectSectionProps {
  projects: any[];
  containerVariants: any;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ projects, containerVariants }) => {
  // Standard action buttons for cards
  const getActionButtons = () => (
    <>
      <button className="btn-primary text-sm py-2 px-4 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-violet-900/30 bg-gradient-to-r from-violet-800 to-purple-800 border border-violet-700/40">Edit</button>
      <button className="bg-gradient-to-r from-red-900/40 to-red-800/40 hover:from-red-800/60 hover:to-red-700/60 text-red-200 text-sm py-2 px-4 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-red-900/30 border border-red-800/30">Delete</button>
    </>
  );

  return (
    <>
      <div className="flex flex-col items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gradient text-center mb-6">Manage Projects</h2>
        <button className="btn-primary py-2.5 px-5 rounded-xl font-medium flex items-center gap-2 bg-gradient-to-r from-violet-800 to-purple-800 border border-violet-700/40 shadow-lg shadow-violet-900/10">
          <span className="text-lg">+</span>
          <span>New Project</span>
        </button>
      </div>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project) => (
          <Card
            key={project.id}
            type="project"
            title={project.title}
            description={project.description}
            image={project.image}
            tags={project.technologies}
            categories={project.category}
            actionButtons={getActionButtons()}
          />
        ))}
        
        <Card
          type="add"
          title="Add New Project"
          subtitle="Create a new portfolio project"
        />
      </motion.div>
    </>
  );
};

export default ProjectSection;