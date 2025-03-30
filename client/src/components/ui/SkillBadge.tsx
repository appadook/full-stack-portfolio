
import React from 'react';
import { cn } from '@/lib/utils';
import { useInView } from '@/lib/animations';
import { type Skill } from '@/lib/data';

interface SkillBadgeProps {
  skill: Skill;
  index: number;
}

const SkillBadge = ({ skill, index }: SkillBadgeProps) => {
  const [ref, isInView] = useInView<HTMLDivElement>();
  
  // Different colors based on skill category
  const getBgColor = () => {
    switch (skill.category) {
      case 'language':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'framework':
        return 'bg-purple-50 text-purple-600 border-purple-200';
      case 'tool':
        return 'bg-green-50 text-green-600 border-green-200';
      case 'other':
        return 'bg-amber-50 text-amber-600 border-amber-200';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "px-4 py-2 rounded-md border text-sm font-medium transition-all duration-500 transform",
        getBgColor(),
        isInView ? "opacity-100 scale-100" : "opacity-0 scale-95",
        "hover:scale-105 transition-transform duration-300"
      )}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {skill.name}
    </div>
  );
};

export default SkillBadge;
