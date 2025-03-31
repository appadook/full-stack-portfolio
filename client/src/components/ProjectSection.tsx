import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import Modal from './ui/Modal';
import ProjectForm from './forms/ProjectForm';
import { projectAPI, ProjectData } from '../api';

interface ProjectSectionProps {
  projects: ProjectData[];
  containerVariants: any;
  onProjectChange: () => void;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ 
  projects, 
  containerVariants,
  onProjectChange 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<ProjectData | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Open modal for creating new project
  const handleAddClick = () => {
    setCurrentProject(undefined);
    setIsModalOpen(true);
  };

  // Open modal for editing a project
  const handleEditClick = (project: ProjectData) => {
    setCurrentProject(project);
    setIsModalOpen(true);
  };

  // Open delete confirmation modal
  const handleDeleteClick = (project: ProjectData) => {
    setCurrentProject(project);
    setIsDeleteModalOpen(true);
  };

  // Handle form submission for creating or updating project
  const handleSubmit = async (data: ProjectData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      if (currentProject?.id) {
        // Update existing project
        await projectAPI.update(currentProject.id, data);
      } else {
        // Create new project
        await projectAPI.create(data);
      }
      
      // Close modal and refresh projects list
      setIsModalOpen(false);
      onProjectChange();
    } catch (err) {
      console.error('Error saving project:', err);
      setError('Failed to save project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle project deletion
  const handleDelete = async () => {
    if (!currentProject?.id) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      await projectAPI.delete(currentProject.id);
      setIsDeleteModalOpen(false);
      onProjectChange();
    } catch (err) {
      console.error('Error deleting project:', err);
      setError('Failed to delete project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Create action buttons for each card with proper handlers
  const getActionButtons = useCallback((project: ProjectData) => (
    <>
      <button 
        onClick={() => handleEditClick(project)}
        className="btn-primary text-sm py-2 px-4 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-violet-900/30 bg-gradient-to-r from-violet-800 to-purple-800 border border-violet-700/40"
      >
        Edit
      </button>
      <button 
        onClick={() => handleDeleteClick(project)}
        className="bg-gradient-to-r from-red-900/40 to-red-800/40 hover:from-red-800/60 hover:to-red-700/60 text-red-200 text-sm py-2 px-4 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-red-900/30 border border-red-800/30"
      >
        Delete
      </button>
    </>
  ), []);

  return (
    <>
      <div className="flex flex-col items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gradient text-center mb-6">Manage Projects</h2>
        <button 
          onClick={handleAddClick}
          className="btn-primary py-2.5 px-5 rounded-xl font-medium flex items-center gap-2 bg-gradient-to-r from-violet-800 to-purple-800 border border-violet-700/40 shadow-lg shadow-violet-900/10"
        >
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
            actionButtons={getActionButtons(project)}
          />
        ))}
        
        <Card
          type="add"
          title="Add New Project"
          subtitle="Create a new portfolio project"
          onClick={handleAddClick}
        />
      </motion.div>

      {/* Add/Edit Project Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={currentProject ? "Edit Project" : "Add New Project"}
        size="lg"
      >
        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-800 text-red-200 rounded-md">
            {error}
          </div>
        )}
        <ProjectForm 
          initialData={currentProject}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
          isSubmitting={isSubmitting}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
        size="sm"
      >
        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-800 text-red-200 rounded-md">
            {error}
          </div>
        )}
        <p className="text-gray-300 mb-6">
          Are you sure you want to delete the project "{currentProject?.title}"? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-gradient-to-r from-red-800 to-red-700 hover:from-red-700 hover:to-red-600 text-white rounded-md flex items-center"
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            Delete Project
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ProjectSection;