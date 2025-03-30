import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

// Define accepted types for the Card component
export type CardType = 'experience' | 'project' | 'skill' | 'add';

interface CardProps {
  type: CardType;
  title?: string;
  subtitle?: string;
  date?: string;
  description?: string | string[];
  image?: string;
  tags?: string[];
  categories?: string[];
  actionButtons?: ReactNode;
  onClick?: () => void;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  type,
  title,
  subtitle,
  date,
  description,
  image,
  tags,
  categories,
  actionButtons,
  onClick,
  className = '',
}) => {
  // Animation variants
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  // Base classes for all card types
  const baseClasses = `
    glass-card flex flex-col rounded-2xl shadow-xl 
    transition-all duration-300 border border-gray-800/60
    hover:shadow-violet-900/20 hover:border-violet-800/50
    backdrop-blur-sm bg-dark-surface/80 overflow-hidden
  `;

  // Specific classes based on card type
  const typeSpecificClasses = {
    experience: 'p-5',
    project: 'p-5',
    skill: 'p-4',
    add: 'p-5 border-dashed border-gray-700 hover:border-violet-600/80 cursor-pointer hover:bg-gray-800/40 items-center justify-center',
  };

  // Combined classes
  const cardClasses = `${baseClasses} ${typeSpecificClasses[type]} ${className}`;

  // For "add" card type, render a simplified card
  if (type === 'add') {
    return (
      <motion.div
        className={cardClasses}
        variants={itemVariants}
        whileHover={{ y: -5, scale: 1.02 }}
        onClick={onClick}
      >
        <div className="text-center w-full py-4">
          <div className="bg-gradient-to-r from-violet-800/50 to-purple-800/50 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg shadow-violet-900/20 border border-violet-700/40">
            <span className="text-2xl text-violet-200">+</span>
          </div>
          <p className="text-violet-200 font-semibold text-base">{title || 'Add New Item'}</p>
          {subtitle && <p className="text-gray-400 text-xs mt-2">{subtitle}</p>}
        </div>
      </motion.div>
    );
  }

  // For skill card type
  if (type === 'skill') {
    return (
      <motion.div
        className={cardClasses}
        variants={itemVariants}
        whileHover={{ y: -3, x: 0 }}
      >
        <div className="flex justify-between items-center w-full">
          <span className="text-gray-200 font-medium">{title}</span>
          {actionButtons && <div className="flex gap-2">{actionButtons}</div>}
        </div>
      </motion.div>
    );
  }

  // Function to render the image section
  const renderImage = () => {
    if (!image) return null;

    if (type === 'experience') {
      return (
        <div className="w-12 h-12 overflow-hidden rounded-lg mr-3 bg-gray-800/80 flex-shrink-0 flex items-center justify-center shadow-md border border-gray-700/50">
          <img
            src={image}
            alt={title || 'Image'}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/experience/placeholder.png";
            }}
          />
        </div>
      );
    } else if (type === 'project') {
      return (
        <div className="w-16 h-16 overflow-hidden rounded-lg float-right ml-3 mb-2 bg-gray-800/80 flex-shrink-0 shadow-md border border-gray-700/50">
          <img
            src={image.split('?')[0]} // Remove query params if any
            alt={title || 'Project'}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/project_images/placeholder.png";
            }}
          />
        </div>
      );
    }

    return null;
  };

  // Function to render description
  const renderDescription = () => {
    if (!description) return null;

    if (Array.isArray(description)) {
      return (
        <ul className="list-disc list-inside text-gray-300 space-y-1 pl-1">
          {description.slice(0, 1).map((item, idx) => (
            <li key={idx} className="text-xs leading-relaxed text-gray-300/90">
              {item.substring(0, 80)}...
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p className="text-gray-300 text-xs leading-relaxed line-clamp-2">
        {description}
      </p>
    );
  };

  // Function to render tags
  const renderTags = () => {
    if (!tags || tags.length === 0) return null;

    return (
      <div className="mb-3">
        <h4 className="text-violet-300 font-semibold mb-2 text-xs uppercase tracking-wider">
          {type === 'experience' ? 'Technologies' : 'Technologies'}
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="bg-gradient-to-r from-violet-900/30 to-purple-900/30 text-violet-200 px-2 py-1 rounded-full text-xs font-medium border border-violet-800/40 shadow-sm"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="text-gray-400 text-xs flex items-center font-medium">
              +{tags.length - 3} more
            </span>
          )}
        </div>
      </div>
    );
  };

  // Function to render categories
  const renderCategories = () => {
    if (!categories || categories.length === 0) return null;

    return (
      <div className="mb-3">
        <h4 className="text-violet-300 font-semibold mb-2 text-xs uppercase tracking-wider">
          Categories
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {categories.slice(0, 2).map((category, idx) => (
            <span
              key={idx}
              className="bg-gray-800/80 text-gray-300 px-2 py-1 rounded-full text-xs font-medium border border-gray-700/50 shadow-sm"
            >
              {category}
            </span>
          ))}
          {categories.length > 2 && (
            <span className="text-gray-400 text-xs flex items-center font-medium">
              +{categories.length - 2} more
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      className={cardClasses}
      variants={itemVariants}
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      {type === 'experience' ? (
        // Experience Card Layout
        <>
          <div className="flex items-start mb-3">
            {renderImage()}
            <div className="min-w-0">
              <h3 className="text-base font-bold text-white tracking-tight truncate">{title}</h3>
              {subtitle && <p className="text-gray-300 font-medium text-xs mt-0.5 truncate">{subtitle}</p>}
              {date && <p className="text-violet-300 text-xs font-semibold mt-1">{date}</p>}
            </div>
          </div>
          <div className="mb-3 flex-grow">
            <h4 className="text-violet-300 font-semibold mb-1.5 text-xs uppercase tracking-wider">
              Description
            </h4>
            {renderDescription()}
          </div>
          {renderTags()}
        </>
      ) : (
        // Project Card Layout
        <div className="p-4 flex flex-col h-full">
          {renderImage()}
          <div>
            <h3 className="text-base font-bold text-white tracking-tight mb-2">{title}</h3>
            <div className="mb-3">{renderDescription()}</div>
          </div>
          <div className="clear-both">
            {renderTags()}
            {renderCategories()}
          </div>
          {actionButtons && (
            <div className="mt-auto pt-2 border-t border-gray-800/50 flex justify-end gap-2">
              {actionButtons}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default Card;