
import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideshowProps {
  images?: string[];
  slogan?: string;
}

const Slideshow = ({ 
  images = [
    "/lovable-uploads/8e941bfc-d91b-4780-bafa-c010a8873913.png",
    "/lovable-uploads/c3390b5c-8932-4466-85fa-1952e2b7dabc.png",
    "/lovable-uploads/8422557d-5ec3-4cde-b548-a0dae3eba38b.png",
    "/lovable-uploads/579282be-70b9-4edb-b6ba-da8dc8ce2088.png",
    "/lovable-uploads/0f03497a-90ea-4042-aa11-20e4635b1346.png"
  ],
  slogan
}: SlideshowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const delay = 3000;

  // Take only 5 images from the array to ensure exactly 5 images are shown
  const limitedImages = images.slice(0, 5);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = window.setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === limitedImages.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex, limitedImages.length]);

  const goToPrevious = () => {
    resetTimeout();
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? limitedImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    resetTimeout();
    const isLastSlide = currentIndex === limitedImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden rounded-lg">
      <div
        className="h-full w-full transition-transform duration-500"
        style={{
          backgroundImage: `url(${limitedImages[currentIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      {slogan && (
        <div className="absolute bottom-20 left-0 right-0 text-center">
          <p className="bg-black/50 text-white py-4 px-6 inline-block text-xl font-italic rounded">
            {slogan}
          </p>
        </div>
      )}

      <Button
        onClick={goToPrevious}
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        onClick={goToNext}
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {limitedImages.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 w-2 rounded-full ${
              currentIndex === idx ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
