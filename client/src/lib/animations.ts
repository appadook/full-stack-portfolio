
import { useEffect, useState, useRef, RefObject } from 'react';

// Intersection Observer hook for triggering animations when element is in view
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
      ...options
    });

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isInView];
}

// Typing effect hook
export function useTypewriter(text: string, speed: number = 70) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  useEffect(() => {
    if (!isTyping) return;
    
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, speed);
    
    return () => clearInterval(timer);
  }, [text, speed, isTyping]);
  
  return { displayText, isTyping };
}

// Smooth scroll to section
export function scrollToSection(sectionId: string) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}
