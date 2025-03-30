import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ProfilePictureProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  withAnimation?: boolean;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  src = "/headhsot.jpg",  // Fixed typo in image path
  alt = "Profile picture",
  size = 'lg',
  className,
  withAnimation = true,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setLoaded(true);
      setTimeout(() => {
        setShowPlaceholder(false);
      }, 300);
    };
  }, [src]);
  
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40',
    '2xl': 'w-64 h-64',  // Added larger size option
  };
  
  return (
    <div className={cn(
      'relative group mt-8', // Added mt-8 for margin-top
      sizeClasses[size],
      className
    )}>
      {withAnimation && <div className="profile-glow"></div>}
      
      <div className={cn(
        'relative z-10 w-full h-full rounded-full overflow-hidden',
        'bg-white',
        'ring-4 ring-white/80',
        withAnimation && 'transition duration-300',
        withAnimation && !loaded && 'animate-pulse-soft'
      )}>
        {showPlaceholder && (
          <div className={cn(
            'absolute inset-0 bg-gray-200 shimmer-effect',
            loaded && 'opacity-0 transition-opacity duration-300'
          )} />
        )}
        
        <img
          src={src}
          alt={alt}
          className={cn(
            'w-full h-full object-cover',
            !loaded && 'opacity-0',
            loaded && 'opacity-100 transition-opacity duration-300'
          )}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
};

export default ProfilePicture;
