
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  animation?: 'typewriter' | 'letter-by-letter' | 'word-by-word' | 'fade-in';
  speed?: number;
}

const AnimatedText = ({
  text,
  className,
  delay = 0,
  tag: Tag = 'p',
  animation = 'fade-in',
  speed = 50
}: AnimatedTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
      
      if (animation === 'typewriter') {
        let index = 0;
        const timer = setInterval(() => {
          if (index < text.length) {
            setDisplayText((prev) => prev + text.charAt(index));
            index++;
          } else {
            clearInterval(timer);
          }
        }, speed);
        
        return () => clearInterval(timer);
      } else if (animation === 'letter-by-letter') {
        const letters = text.split('');
        letters.forEach((letter, index) => {
          setTimeout(() => {
            setDisplayText((prev) => prev + letter);
          }, index * speed);
        });
      } else if (animation === 'word-by-word') {
        const words = text.split(' ');
        words.forEach((word, index) => {
          setTimeout(() => {
            setDisplayText((prev) => prev + (index === 0 ? '' : ' ') + word);
          }, index * speed * 4);
        });
      } else {
        setDisplayText(text);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, animation, delay, speed]);

  return (
    <Tag
      className={cn(
        animation === 'fade-in' ? "transition-opacity duration-1000" : "",
        animation === 'fade-in' && isVisible ? "opacity-100" : animation === 'fade-in' ? "opacity-0" : "",
        className
      )}
    >
      {displayText}
      {animation === 'typewriter' && <span className="inline-block w-1 h-6 ml-1 bg-primary animate-pulse"></span>}
    </Tag>
  );
};

export default AnimatedText;
