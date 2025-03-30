import React from 'react';
import { cn } from '@/lib/utils';
import { useInView } from '@/lib/animations';
import { CalendarDays, Briefcase, Building, ArrowRight } from 'lucide-react';
import { type Experience } from '@/lib/data/Experience';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface ExperienceItemProps {
  experience: Experience;
  index: number;
  isLeft: boolean;
}

const ExperienceItem = ({ experience, index, isLeft }: ExperienceItemProps) => {
  const [ref, isInView] = useInView<HTMLDivElement>();

  // Company logo or fallback
  const companyInitial = experience.company.charAt(0);
  
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex md:justify-between items-center",
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      )}
    >
      {/* Experience Card - will be on alternating sides on larger screens */}
      <div 
        className={cn(
          "w-full md:w-5/12 transition-all duration-700 transform",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          isLeft ? "md:mr-auto" : "md:ml-auto"
        )}
        style={{ transitionDelay: `${index * 150}ms` }}
      >
        <Card className="border border-border hover:border-primary/20 hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              {/* Company Logo */}
              <Avatar className="w-16 h-16 border-2 border-primary/20">
                {experience.Image ? (
                  <AvatarImage src={experience.Image} alt={experience.company} />
                ) : (
                  <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                    {companyInitial}
                  </AvatarFallback>
                )}
              </Avatar>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">{experience.title}</h3>
                
                <div className="flex items-center text-primary">
                  <Building size={16} className="mr-1" />
                  <span>{experience.company}</span>
                </div>
                
                <div className="flex items-center text-muted-foreground mt-2">
                  <CalendarDays size={16} className="mr-1" />
                  <span>{experience.duration}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <ul className="space-y-2 list-disc pl-6">
                {experience.description.map((item, i) => (
                  <li key={i} className="text-muted-foreground">{item}</li>
                ))}
              </ul>
              
              {experience.technologies && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {experience.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Connector arrow for desktop - visible only on desktop */}
      <div 
        className={cn(
          "hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2",
          "text-primary opacity-0 transition-opacity duration-700",
          isInView && "opacity-100"
        )}
        style={{ transitionDelay: `${(index * 150) + 300}ms` }}
      >
        <ArrowRight 
          size={20} 
          className={cn(
            isLeft ? "rotate-0" : "rotate-180"
          )} 
        />
      </div>
    </div>
  );
};

export default ExperienceItem;
