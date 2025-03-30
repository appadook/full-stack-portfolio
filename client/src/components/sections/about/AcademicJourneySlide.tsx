import React from 'react';
import { GraduationCap } from 'lucide-react';

const AcademicJourneySlide = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
        <div className="p-4 bg-primary/10 rounded-full hidden md:block">
          <GraduationCap className="w-10 h-10 text-primary" />
        </div>
        <div className="flex md:hidden items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-full">
            <GraduationCap className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-white">Academic Journey</h3>
        </div>
        <h3 className="text-3xl font-bold hidden md:block text-white">Academic Journey</h3>
      </div>
      
      <div className="md:pl-4 md:ml-4 md:border-l border-border">
        <div className="space-y-5 text-white">
          <p>
            Pursuing a double major in Economics and Computer Science with a current GPA of 3.5/4.0. 
            My unique combination of studies allows me to approach problems with both analytical and technical perspectives.
          </p>
          <h4 className="font-semibold text-lg text-white">Highlights</h4>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
              <span>Dean's List Student</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
              <span>Honors in both CS & Economics</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
              <span>Economics Honor Society Member</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
              <span>Undergraduate Research Symposium Presenter x2</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AcademicJourneySlide;