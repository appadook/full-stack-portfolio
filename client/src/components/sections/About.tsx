import React from 'react';
import { useInView } from '@/lib/animations';
import SectionHeader from '@/components/ui/SectionHeader';
import AboutIntro from './about/AboutIntro';
import AboutCarousel from './about/AboutCarousel';

const About = () => {
  const [ref, isInView] = useInView<HTMLDivElement>();
  
  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <SectionHeader
          title="About Me"
          subtitle="Background"
        />
        
        <div 
          ref={ref}
          className={`transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <AboutIntro />
          <AboutCarousel />
        </div>
      </div>
    </section>
  );
};

export default About;
