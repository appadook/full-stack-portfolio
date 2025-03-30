import React from 'react';
import { cn } from '@/lib/utils';
import { useInView } from '@/lib/animations';
import { Github, ExternalLink } from 'lucide-react';
import { type Project } from '@/lib/data/Project';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Default GitHub profile URL
const DEFAULT_GITHUB_URL = "https://github.com/kurtixx";  // Replace with your actual GitHub profile URL

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [ref, isInView] = useInView<HTMLDivElement>();

  return (
    <Card
      ref={ref}
      className={cn(
        "flex flex-col h-full overflow-hidden group transition-all duration-700 transform border border-border",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Image */}
      <div className="relative w-full h-52 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {project.category && project.category.length > 0 && (
          <div className="absolute top-2 right-2 flex flex-wrap gap-1 justify-end z-20">
            {project.category.map((cat, i) => (
              <span 
                key={i} 
                className="px-2 py-1 text-xs font-medium bg-primary/80 text-primary-foreground rounded"
              >
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {/* Content */}
      <CardHeader className="pb-2">
        <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-muted-foreground mb-4 text-sm">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-2">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-4 border-t border-border">
        <div className="flex flex-wrap gap-3">
          {/* GitHub button that links to either project repo or default profile */}
          <a
            href={project.github || DEFAULT_GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={project.github ? "View project on GitHub" : "Visit my GitHub profile"}
            className="inline-flex items-center justify-center rounded-full bg-white text-gray-800 border border-gray-200 px-4 py-2 text-sm font-medium shadow-sm transition-all duration-300 hover:bg-black hover:text-white hover:border-black hover:scale-105 hover:shadow-md"
          >
            <Github className="h-5 w-5 mr-2 flex-shrink-0" aria-hidden="true" />
            <span>GitHub</span>
          </a>
          
          {project.link && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="gap-2 hover:bg-primary/10 hover:text-primary transition-colors duration-300"
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View live demo"
              >
                <ExternalLink size={16} className="text-muted-foreground mr-1" />
                <span>Live Demo</span>
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
