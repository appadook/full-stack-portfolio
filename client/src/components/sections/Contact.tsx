
import React, { useState } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import { useInView } from '@/lib/animations';
import { Send, Mail, MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [ref, isInView] = useInView<HTMLFormElement>();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully!', {
        description: 'I will get back to you soon.',
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <section id="contact" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <SectionHeader
          title="Get In Touch"
          subtitle="Contact"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="text-primary mt-1" />
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-muted-foreground">Union College, Schenectady, NY</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Mail className="text-primary mt-1" />
                <div>
                  <h4 className="font-medium">Email</h4>
                  <a 
                    href="mailto:appadook@union.edu" 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    appadook@union.edu
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Phone className="text-primary mt-1" />
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <a 
                    href="tel:+19293739126" 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    (929) 373-9126
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-card rounded-lg border border-border">
              <h4 className="font-medium mb-2">Open to Opportunities</h4>
              <p className="text-muted-foreground mb-4">
                I'm currently looking for internship and full-time opportunities in software engineering/ development, Data analysis, Business Intelligence & related fields.
              </p>
              <div className="text-primary font-medium">Available from June 2025</div>
            </div>
          </div>
          
          {/* Contact Form */}
          <form 
            ref={ref}
            onSubmit={handleSubmit}
            className={`space-y-6 transition-all duration-700 ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                placeholder="Your email"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
                placeholder="Your message"
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Sending...</span>
              ) : (
                <>
                  Send Message
                  <Send size={16} className="ml-2" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
