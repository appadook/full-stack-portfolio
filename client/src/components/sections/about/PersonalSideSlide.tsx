import React from 'react';
import { Heart } from 'lucide-react';

const PersonalSideSlide = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
        <div className="p-4 bg-primary/10 rounded-full hidden md:block">
          <Heart className="w-10 h-10 text-primary" />
        </div>
        <div className="flex md:hidden items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-full">
            <Heart className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-white">Personal Side</h3>
        </div>
        <h3 className="text-3xl font-bold hidden md:block text-white">Personal Side</h3>
      </div>
      
      <div className="md:pl-4 md:ml-4 md:border-l border-border">
        <div className="space-y-5 text-white">
          <p>
            When I'm not coding or studying, you'll find me rock climbing, playing chess, 
            or contributing to open-source projects. I'm passionate about combining technology 
            with outdoor adventures and maintaining a healthy work-life balance.
          </p>
          <div className="grid grid-cols-2 gap-6 mt-4">
            <div>
              <h4 className="font-semibold text-lg text-white">Interests</h4>
              <ul className="space-y-2 mt-2">
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                  <span>Financial technology</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                  <span>Data analytics & visualization</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                  <span>Machine learning applications</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-white">Hobbies</h4>
              <ul className="space-y-2 mt-2">
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                  <span>Tennis</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                  <span>Health & Fitness</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                  <span>Building and sharing meaningful projects</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalSideSlide;