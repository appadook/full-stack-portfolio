
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { scrollToSection } from '@/lib/animations';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { name: 'Home', href: 'hero' },
    { name: 'About', href: 'about' },
    { name: 'Projects', href: 'projects' },
    { name: 'Experience', href: 'experience' },
    { name: 'Skills', href: 'skills' },
    { name: 'Contact', href: 'contact' },
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    scrollToSection(sectionId);
  };
  
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "py-3 bg-background/80 backdrop-blur-lg shadow-sm" 
          : "py-6 bg-transparent"
      )}
    >
      <div className="container px-6 mx-auto flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#" 
          className="text-xl font-bold tracking-tight"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
        >
          Kurtik Appadoo
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={`#${item.href}`}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
            >
              {item.name}
            </a>
          ))}
        </nav>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <nav
        className={cn(
          "absolute top-full left-0 right-0 bg-background shadow-md transition-all duration-300 overflow-hidden md:hidden",
          mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container px-6 py-4 flex flex-col space-y-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={`#${item.href}`}
              className="text-base font-medium py-2 text-foreground border-b border-border"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
            >
              {item.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
