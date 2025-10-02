import { useState, useEffect, useCallback } from 'react';

interface UseTestimonialRotationProps {
  totalTestimonials: number;
  rotationInterval: number;
  isPaused: boolean;
}

export function useTestimonialRotation({
  totalTestimonials,
  rotationInterval,
  isPaused,
}: UseTestimonialRotationProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isPaused || totalTestimonials <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalTestimonials);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [isPaused, totalTestimonials, rotationInterval]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalTestimonials);
  }, [totalTestimonials]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalTestimonials) % totalTestimonials);
  }, [totalTestimonials]);

  const goToIndex = useCallback((index: number) => {
    if (index >= 0 && index < totalTestimonials) {
      setCurrentIndex(index);
    }
  }, [totalTestimonials]);

  return {
    currentIndex,
    goToNext,
    goToPrevious,
    goToIndex,
  };
}