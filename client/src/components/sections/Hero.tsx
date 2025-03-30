import React, { useEffect, useRef } from 'react';
import { ArrowDown, Download } from 'lucide-react';
import AnimatedText from '@/components/ui/AnimatedText';
import { scrollToSection } from '@/lib/animations';
import { about } from '@/lib/data';
import ThreeScene from '../ThreeScene';
import ProfilePicture from '../ProfilePicture';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Create particles first, before using them in resize
    const particleCount = Math.floor(width * 0.02);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.3 + 0.1 // Reduced opacity
    }));
    
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      particles.forEach(p => {
        p.x = Math.random() * width;
        p.y = Math.random() * height;
      });
    };
    
    window.addEventListener('resize', resize);
    resize();
    
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 100, 100, ${p.opacity})`;
        ctx.fill();
        
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Boundary checking
        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;
      });
      
      // Connect particles with lines if they're close enough
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 100, 100, ${0.05 * (1 - distance / 100)})`; // Reduced opacity
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);
  
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Render the Three.js scene component with higher z-index */}
      <div className="absolute inset-0 z-0">
        <ThreeScene />
      </div>

      {/* Semi-transparent overlay with reduced opacity */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background/40 z-[1]"></div>
      
      {/* Particle canvas with reduced opacity */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-[2] opacity-40"
      />

      <div className="container mx-auto px-6 py-16 z-10 relative mt-[-300px]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 page-transition">
          <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
            <div className="mb-4 inline-block px-3 py-1 text-xs font-medium tracking-wider text-primary uppercase bg-secondary/80 backdrop-blur-sm rounded-full">
              <AnimatedText text="Hello, I'm" animation="fade-in" delay={200} />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-5 tracking-tight">
              <AnimatedText
                text={about.name}
                tag="span"
                animation="letter-by-letter"
                speed={100}
                delay={500}
                className="block"
              />
            </h1>

            <h2 className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-6">
              <AnimatedText text={about.title} animation="fade-in" delay={1500} />
            </h2>

            <div className="max-w-2xl text-muted-foreground mb-8 bg-background/50 backdrop-blur-sm p-4 rounded-lg">
              <AnimatedText
                text={about.description}
                animation="fade-in"
                delay={2000}
              />
            </div>

            <div
              className="flex flex-col sm:flex-row gap-4 mt-2 opacity-0 animate-fade-in w-full max-w-md"
              style={{ animationDelay: '2.5s', animationFillMode: 'forwards' }}
            >
              <button
                className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                onClick={() => scrollToSection('projects')}
              >
                View My Projects
              </button>

              <button
                className="px-6 py-3 border border-border rounded-md hover:bg-secondary transition-colors"
                onClick={() => scrollToSection('contact')}
              >
                Get In Touch
              </button>
            </div>
            
            <div 
              className="mt-4 w-full max-w-md opacity-0 animate-fade-in"
              style={{ animationDelay: '2.7s', animationFillMode: 'forwards' }}
            >
              <a 
                href={about.resumeLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors w-full"
              >
                <Download size={18} />
                Download Resume
              </a>
            </div>
          </div>

          <div className="opacity-0 animate-fade-in mt-16"
               style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
            <ProfilePicture size="2xl" className="scale-110 hover:scale-125 transition-transform duration-300" />
          </div>
        </div>

        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
          onClick={() => scrollToSection('about')}
        >
          <ArrowDown className="text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default Hero;