import React from 'react';
import { about } from '@/lib/data';

const AboutIntro = () => {
  return (
    <div className="mb-10">
      <h3 className="text-2xl font-bold mb-6">
        {about.title}
      </h3>
      
      <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none mb-6">
        <p className="text-muted-foreground">
          {about.longDescription}
        </p>
      </div>
    </div>
  );
};

export default AboutIntro;