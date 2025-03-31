import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import Modal from './ui/Modal';
import ExperienceForm from './forms/ExperienceForm';
import { experienceAPI, ExperienceData } from '../api';

interface ExperienceSectionProps {
  experiences: ExperienceData[];
  containerVariants: any;
  onExperienceChange: () => void;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ 
  experiences, 
  containerVariants,
  onExperienceChange 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentExperience, setCurrentExperience] = useState<ExperienceData | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Open modal for creating new experience
  const handleAddClick = () => {
    setCurrentExperience(undefined);
    setIsModalOpen(true);
  };

  // Open modal for editing an experience
  const handleEditClick = (experience: ExperienceData) => {
    setCurrentExperience(experience);
    setIsModalOpen(true);
  };

  // Open delete confirmation modal
  const handleDeleteClick = (experience: ExperienceData) => {
    setCurrentExperience(experience);
    setIsDeleteModalOpen(true);
  };

  // Handle form submission for creating or updating experience
  const handleSubmit = async (data: ExperienceData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      if (currentExperience?.id) {
        // Update existing experience
        await experienceAPI.update(currentExperience.id, data);
      } else {
        // Create new experience
        await experienceAPI.create(data);
      }
      
      // Close modal and refresh experiences list
      setIsModalOpen(false);
      onExperienceChange();
    } catch (err) {
      console.error('Error saving experience:', err);
      setError('Failed to save experience. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle experience deletion
  const handleDelete = async () => {
    if (!currentExperience?.id) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      await experienceAPI.delete(currentExperience.id);
      setIsDeleteModalOpen(false);
      onExperienceChange();
    } catch (err) {
      console.error('Error deleting experience:', err);
      setError('Failed to delete experience. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Create action buttons for each card with proper handlers
  const getActionButtons = useCallback((experience: ExperienceData) => (
    <>
      <button 
        onClick={() => handleEditClick(experience)}
        className="btn-primary text-sm py-2 px-4 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-violet-900/30 bg-gradient-to-r from-violet-800 to-purple-800 border border-violet-700/40"
      >
        Edit
      </button>
      <button 
        onClick={() => handleDeleteClick(experience)}
        className="bg-gradient-to-r from-red-900/40 to-red-800/40 hover:from-red-800/60 hover:to-red-700/60 text-red-200 text-sm py-2 px-4 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-red-900/30 border border-red-800/30"
      >
        Delete
      </button>
    </>
  ), []);

  return (
    <>
      <div className="flex flex-col items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gradient text-center mb-6">Manage Experiences</h2>
        <button 
          onClick={handleAddClick}
          className="btn-primary py-2.5 px-5 rounded-xl font-medium flex items-center gap-2 bg-gradient-to-r from-violet-800 to-purple-800 border border-violet-700/40 shadow-lg shadow-violet-900/10"
        >
          <span className="text-lg">+</span>
          <span>New Experience</span>
        </button>
      </div>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {experiences.map((exp) => (
          <Card
            key={exp.id}
            type="experience"
            title={exp.title}
            subtitle={exp.company}
            date={exp.duration}
            description={exp.description}
            image={exp.image}
            tags={exp.technologies}
            actionButtons={getActionButtons(exp)}
          />
        ))}
        
        <Card
          type="add"
          title="Add New Experience"
          subtitle="Create a new work experience entry"
          onClick={handleAddClick}
        />
      </motion.div>

      {/* Add/Edit Experience Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={currentExperience ? "Edit Experience" : "Add New Experience"}
        size="lg"
      >
        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-800 text-red-200 rounded-md">
            {error}
          </div>
        )}
        <ExperienceForm 
          initialData={currentExperience}
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
          Are you sure you want to delete "{currentExperience?.title}" at {currentExperience?.company}? This action cannot be undone.
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
            Delete Experience
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ExperienceSection;