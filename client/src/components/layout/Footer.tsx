
import React from 'react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { scrollToSection } from '@/lib/animations';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const navItems = [
    { name: 'Home', href: 'hero' },
    { name: 'About', href: 'about' },
    { name: 'Projects', href: 'projects' },
    { name: 'Experience', href: 'experience' },
    { name: 'Skills', href: 'skills' },
    { name: 'Contact', href: 'contact' },
  ];
  
  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
  };
  
  return (
    <footer className="bg-secondary py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <div className="text-xl font-bold mb-4">Kurtik Appadoo</div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Economics & Computer Science student Double Major passionate about building software and data analysis that makes a difference. Connect with me to discuss opportunities or collaborations.
            </p>
            <div className="flex space-x-4">
              <a href="http://github.com/appadook" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/kurtik-appadoo-863019244/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter size={20} />
              </a>
              <a href="mailto:appadook@union.edu" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={`#${item.href}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Union College</li>
              <li>Schenectady, NY</li>
              <li className="hover:text-foreground transition-colors">
                <a href="mailto:appadook@union.edu">appadook@union.edu</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
          <p>© {currentYear} Kurtik Appadoo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
