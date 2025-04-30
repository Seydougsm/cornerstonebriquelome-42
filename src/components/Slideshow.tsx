
import { useState, useEffect, useCallback } from "react";

interface SlideshowProps {
  images: string[];
  interval?: number;
  slogan?: string;
}

const Slideshow = ({ images, interval = 5000, slogan = "« Votre partenaire de confiance pour des briques de qualité »" }: SlideshowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const goToNext = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setIsTransitioning(false);
    }, 500); // Match this with the CSS transition duration
  }, [images.length]);
  
  useEffect(() => {
    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [goToNext, interval]);
  
  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Slides */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
            currentIndex === index 
              ? isTransitioning ? "opacity-50" : "opacity-100" 
              : "opacity-0"
          }`}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      
      {/* Overlay with slogan */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h2 className="text-white text-3xl md:text-5xl font-bold text-center px-6 max-w-4xl">
          {slogan}
        </h2>
      </div>
      
      {/* Navigation dots */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentIndex === index ? "bg-cornerstone-orange" : "bg-white bg-opacity-50"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
