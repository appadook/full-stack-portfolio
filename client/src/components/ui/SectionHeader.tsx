
import React from 'react';
import { useInView } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionHeader = ({ title, subtitle, className }: SectionHeaderProps) => {
  const [ref, isInView] = useInView<HTMLDivElement>();

  return (
    <div 
      ref={ref} 
      className={cn(
        "mb-12 text-center transition-opacity duration-700", 
        isInView ? "opacity-100" : "opacity-0",
        className
      )}
    >
      <div className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-primary uppercase bg-secondary rounded-full">
        {subtitle || title}
      </div>
      <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">{title}</h2>
      <div className="mt-4 mx-auto w-24 h-1 bg-primary rounded"></div>
    </div>
  );
};

export default SectionHeader;
