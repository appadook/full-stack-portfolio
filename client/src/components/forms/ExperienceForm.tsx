import React, { useState, useEffect } from 'react';
import { ExperienceData } from '../../api';

interface ExperienceFormProps {
  initialData?: ExperienceData;
  onSubmit: (data: ExperienceData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting
}) => {
  const defaultData: ExperienceData = {
    title: '',
    company: '',
    duration: '',
    description: [],
    technologies: [],
    image: '',
  };

  const [formData, setFormData] = useState<ExperienceData>(initialData || defaultData);
  const [techInput, setTechInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
    if (formData.description.length === 0) newErrors.description = 'At least one description point is required';
    if (formData.technologies.length === 0) newErrors.technologies = 'At least one technology is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()]
      });
      setTechInput('');
    }
  };

  const handleRemoveTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter(t => t !== tech)
    });
  };

  const handleAddDescription = () => {
    if (descriptionInput.trim()) {
      setFormData({
        ...formData,
        description: [...formData.description, descriptionInput.trim()]
      });
      setDescriptionInput('');
    }
  };

  const handleRemoveDescription = (desc: string) => {
    setFormData({
      ...formData,
      description: formData.description.filter(d => d !== desc)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      await onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
          Title*
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full px-3 py-2 bg-gray-800 border ${errors.title ? 'border-red-500' : 'border-gray-700'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-600`}
          placeholder="Senior Developer"
        />
        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
          Company*
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className={`w-full px-3 py-2 bg-gray-800 border ${errors.company ? 'border-red-500' : 'border-gray-700'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-600`}
          placeholder="Awesome Company Inc."
        />
        {errors.company && <p className="mt-1 text-sm text-red-500">{errors.company}</p>}
      </div>

      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-1">
          Duration*
        </label>
        <input
          type="text"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className={`w-full px-3 py-2 bg-gray-800 border ${errors.duration ? 'border-red-500' : 'border-gray-700'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-600`}
          placeholder="Jan 2023 - Present"
        />
        {errors.duration && <p className="mt-1 text-sm text-red-500">{errors.duration}</p>}
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-1">
          Company Logo URL*
        </label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className={`w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-600`}
          placeholder="/experience/company_logo.webp"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Description Points*
        </label>
        <div className="flex">
          <input
            type="text"
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
            className={`flex-1 px-3 py-2 bg-gray-800 border ${errors.description ? 'border-red-500' : 'border-gray-700'} rounded-l-md text-white focus:outline-none focus:ring-2 focus:ring-purple-600`}
            placeholder="Add description point"
          />
          <button
            type="button"
            onClick={handleAddDescription}
            className="px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded-r-md text-white"
          >
            Add
          </button>
        </div>
        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
        
        <div className="mt-2 space-y-2">
          {formData.description.map((desc, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-800 p-2 rounded-md">
              <span className="text-sm text-gray-300 mr-2 flex-1">{desc}</span>
              <button
                type="button"
                onClick={() => handleRemoveDescription(desc)}
                className="text-red-400 hover:text-red-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Technologies*
        </label>
        <div className="flex">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            className={`flex-1 px-3 py-2 bg-gray-800 border ${errors.technologies ? 'border-red-500' : 'border-gray-700'} rounded-l-md text-white focus:outline-none focus:ring-2 focus:ring-purple-600`}
            placeholder="Add technology"
          />
          <button
            type="button"
            onClick={handleAddTechnology}
            className="px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded-r-md text-white"
          >
            Add
          </button>
        </div>
        {errors.technologies && <p className="mt-1 text-sm text-red-500">{errors.technologies}</p>}
        
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.technologies.map((tech, index) => (
            <div key={index} className="flex items-center bg-purple-900/30 text-purple-200 px-3 py-1 rounded-full text-sm">
              {tech}
              <button
                type="button"
                onClick={() => handleRemoveTechnology(tech)}
                className="ml-2 text-purple-300 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-violet-800 to-purple-800 hover:from-violet-700 hover:to-purple-700 text-white rounded-md flex items-center"
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {initialData ? 'Update Experience' : 'Create Experience'}
        </button>
      </div>
    </form>
  );
};

export default ExperienceForm;