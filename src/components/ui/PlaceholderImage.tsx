import { useState } from 'react';
import Image from 'next/image';

interface PlaceholderImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
}

export function PlaceholderImage({
  src,
  alt,
  width,
  height,
  className = '',
  fill = false,
  sizes,
  priority = false,
}: PlaceholderImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Generate placeholder based on alt text
  const generatePlaceholder = () => {
    const initials = alt
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const colors = [
      'bg-blue-500',
      'bg-green-500', 
      'bg-purple-500',
      'bg-orange-500',
      'bg-red-500',
      'bg-indigo-500',
    ];
    
    const colorIndex = alt.length % colors.length;
    const bgColor = colors[colorIndex];

    return (
      <div className={`${className} ${bgColor} flex items-center justify-center text-white font-bold text-lg`}>
        {initials}
      </div>
    );
  };

  if (hasError) {
    return generatePlaceholder();
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className={`absolute inset-0 bg-gray-200 animate-pulse ${className}`} />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        sizes={sizes}
        priority={priority}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
      />
    </div>
  );
}