import React, { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import AcademicJourneySlide from './AcademicJourneySlide';
import LeadershipSlide from './LeadershipSlide';
import PersonalSideSlide from './PersonalSideSlide';

const AboutCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Slide metadata for indicators
  const slides = [
    { id: 1, name: "Academic Journey" },
    { id: 2, name: "Leadership & Achievements" },
    { id: 3, name: "Personal Side" }
  ];
  
  return (
    <div className="mt-12 relative">
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full"
        onSelect={(api) => {
          const selectedIndex = api?.selectedScrollSnap();
          if (selectedIndex !== undefined) {
            setCurrentSlide(selectedIndex);
          }
        }}
      >
        <CarouselContent>
          <CarouselItem className="basis-full">
            <Card className="border bg-card/60 backdrop-blur-sm">
              <CardContent className="p-8">
                <AcademicJourneySlide />
              </CardContent>
            </Card>
          </CarouselItem>
          
          <CarouselItem className="basis-full">
            <Card className="border bg-card/60 backdrop-blur-sm">
              <CardContent className="p-8">
                <LeadershipSlide />
              </CardContent>
            </Card>
          </CarouselItem>
          
          <CarouselItem className="basis-full">
            <Card className="border bg-card/60 backdrop-blur-sm">
              <CardContent className="p-8">
                <PersonalSideSlide />
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
        
        <div className="flex items-center justify-between mt-6">
          <CarouselPrevious className="relative left-0 top-0 translate-y-0 h-10 w-10" />
          
          <div className="flex gap-1.5">
            {slides.map((slide, index) => (
              <Button 
                key={slide.id} 
                variant="ghost" 
                size="icon" 
                className={`w-2.5 h-2.5 rounded-full p-0 ${
                  currentSlide === index 
                    ? "bg-primary" 
                    : "bg-primary/20"
                }`}
                aria-label={`Go to ${slide.name}`}
              />
            ))}
          </div>
          
          <CarouselNext className="relative right-0 top-0 translate-y-0 h-10 w-10" />
        </div>
      </Carousel>
      
      <div className="flex justify-center mt-4">
        <p className="text-sm text-muted-foreground">
          Swipe or use arrows to navigate
        </p>
      </div>
    </div>
  );
};

export default AboutCarousel;