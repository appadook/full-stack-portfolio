import React, { useState } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import { experiences } from '@/lib/data/Experience';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { CalendarDays, Building, MousePointer } from 'lucide-react';
import { useInView } from '@/lib/animations';
import { cn } from '@/lib/utils';

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="My Experience"
          subtitle="Career Path"
        />
        
        <div className="text-center mb-8 animate-pulse">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg border border-primary/30 shadow-sm">
            <MousePointer size={18} className="text-primary" />
            <span className="text-primary font-medium">Hover over experience for full description</span>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-purple-600/30 transform -translate-x-1/2 hidden md:block"></div>
            
            {/* Timeline Dots */}
            <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col justify-around items-center">
              {experiences.map((_, index) => (
                <div key={index} className="w-4 h-4 bg-purple-600 rounded-full z-10 shadow-[0_0_10px_rgba(139,92,246,0.6)]"></div>
              ))}
            </div>
            
            <div className="space-y-16 md:space-y-28">
              {experiences.map((experience, index) => {
                const isLeft = index % 2 === 0;
                const companyInitial = experience.company.charAt(0);
                const [ref, isInView] = useInView<HTMLDivElement>();
                const [isHovering, setIsHovering] = useState(false);
                
                return (
                  <div 
                    key={experience.id}
                    ref={ref}
                    className="relative md:grid md:grid-cols-[1fr_60px_1fr] items-start"
                  >
                    {/* LEFT COLUMN */}
                    <div className="w-full">
                      {/* Experience Card on Left side (for even indexes) */}
                      <div 
                        className={cn(
                          "transition-all duration-700 transform mb-6 md:mb-0 relative",
                          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                          isLeft ? "block" : "hidden"
                        )}
                        style={{ transitionDelay: `${index * 150}ms` }}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                      >
                        <Card className="border border-border hover:border-primary/20 hover:shadow-md transition-all duration-300 md:mr-6 w-full">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
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
                            
                            {/* Description appears on hover */}
                            <div className={cn(
                              "mt-4 transition-all duration-300 overflow-hidden", 
                              isHovering ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                            )}>
                              <ul className="space-y-2 list-disc pl-6 mt-2">
                                {experience.description.map((item, i) => (
                                  <li key={i} className="text-muted-foreground">{item}</li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Hidden the separate description card for left side when not hovering */}
                    </div>
                    
                    {/* CENTER COLUMN (Timeline) */}
                    <div className="hidden md:block"></div>
                    
                    {/* RIGHT COLUMN */}
                    <div className="w-full">
                      {/* Hidden the separate description card for right side when not hovering */}
                      
                      {/* Experience Card on Right side (for odd indexes) */}
                      <div 
                        className={cn(
                          "transition-all duration-700 transform relative",
                          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                          !isLeft ? "block" : "hidden"
                        )}
                        style={{ transitionDelay: `${index * 150}ms` }}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                      >
                        <Card className="border border-border hover:border-primary/20 hover:shadow-md transition-all duration-300 md:ml-6 w-full">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
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
                            
                            {/* Description appears on hover */}
                            <div className={cn(
                              "mt-4 transition-all duration-300 overflow-hidden", 
                              isHovering ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                            )}>
                              <ul className="space-y-2 list-disc pl-6 mt-2">
                                {experience.description.map((item, i) => (
                                  <li key={i} className="text-muted-foreground">{item}</li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
