
import { useEffect, useRef, useState } from "react";

const Gallery = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  const images = [
    "/lovable-uploads/6ef192e3-5877-4867-a4ba-f694a291ffeb.png",
    "/lovable-uploads/60e0420e-09f2-4dd1-8075-472f6ffd19a2.png",
    "/lovable-uploads/7bdda587-b33f-46ff-bb67-05121bc22fb8.png",
    "/lovable-uploads/f84d0352-9184-4976-a414-b54cef2434f7.png",
    "/lovable-uploads/bcc3b505-4545-49c1-a562-ccd8cae646f6.png",
    "/lovable-uploads/47b9e39a-b9cb-48a4-9d80-0ebc000e3571.png",
    "/lovable-uploads/8422557d-5ec3-4cde-b548-a0dae3eba38b.png",
    "/lovable-uploads/8e941bfc-d91b-4780-bafa-c010a8873913.png",
    "/lovable-uploads/2cfdf9b7-5911-414b-90f6-d858eb388cdd.png",
    "/lovable-uploads/27bd9bd8-0ecf-4f39-aa70-9f3b0fa28cf8.png"
  ];

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = imagesRef.current.findIndex(
            (ref) => ref === entry.target
          );
          
          if (entry.isIntersecting && index !== -1) {
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );

    imagesRef.current.forEach((ref) => {
      if (ref) observerRef.current?.observe(ref);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="title mb-4">Notre Galerie</h1>
          <p className="subtitle max-w-2xl mx-auto">
            Découvrez nos travaux et projets de construction réalisés avec nos briques de qualité
          </p>
        </div>
        
        {/* Orange border divider */}
        <div className="border-b-2 border-cornerstone-orange mb-12"></div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              ref={(el) => (imagesRef.current[index] = el)}
              className={`overflow-hidden rounded-lg shadow-md transition-all duration-500 ${
                visibleItems.has(index) ? "animate-blur-to-clear" : "filter blur-sm"
              }`}
            >
              <div className="relative pb-[75%] overflow-hidden">
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="gallery-image absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Orange border divider */}
        <div className="border-b-2 border-cornerstone-orange my-12"></div>
        
        {/* Call to Action */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-cornerstone-blue mb-4">
            Vous souhaitez démarrer votre projet?
          </h2>
          <p className="text-cornerstone-gray mb-8 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour discuter de vos besoins en matière de construction et obtenir un devis personnalisé.
          </p>
          <a href="tel:+22871014747" className="cta-button inline-block">
            Appeler au +228 71014747
          </a>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
