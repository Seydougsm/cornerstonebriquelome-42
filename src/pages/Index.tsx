
import { Button } from "@/components/ui/button";
import Slideshow from "@/components/Slideshow";
import { Link } from "react-router-dom";

const Index = () => {
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

  return (
    <div className="min-h-screen">
      {/* Hero Section with Slideshow */}
      <Slideshow 
        images={images} 
        slogan="« Votre partenaire de confiance pour des briques de qualité »"
      />
      
      {/* About Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="title mb-6">CORNERSTONE BRIQUES</h2>
          <p className="subtitle mb-8">
            Spécialiste des briques de qualité au Togo
          </p>
          <p className="text-cornerstone-gray mb-8">
            CORNERSTONE BRIQUES est votre partenaire de confiance pour la fabrication et la fourniture de briques de haute qualité pour tous vos projets de construction. Notre engagement envers l'excellence et la satisfaction client nous distingue comme leader dans l'industrie de la construction au Togo.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/galerie">
              <Button className="cta-button">Voir notre galerie</Button>
            </Link>
            <Link to="/contact">
              <Button className="cta-button">Contactez-nous</Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Products Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="title text-center mb-12">Nos Produits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="p-6">
                <h3 className="font-bold text-xl text-cornerstone-blue mb-4">Briques Creuses</h3>
                <ul className="list-disc list-inside text-cornerstone-gray space-y-2">
                  <li>10 Creux: 40cm x 20cm x 10cm</li>
                  <li>12 Creux: 40cm x 20cm x 12cm</li>
                  <li>15 Creux: 40cm x 20cm x 15cm</li>
                  <li>20 Creux: 40cm x 20cm x 20cm</li>
                </ul>
              </div>
            </div>
            
            {/* Product 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="p-6">
                <h3 className="font-bold text-xl text-cornerstone-blue mb-4">Briques Pleines</h3>
                <ul className="list-disc list-inside text-cornerstone-gray space-y-2">
                  <li>10 Plein: 40cm x 20cm x 10cm</li>
                  <li>12 Plein: 40cm x 20cm x 12cm</li>
                  <li>15 Plein: 40cm x 20cm x 15cm</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-cornerstone-blue">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Prêt à démarrer votre projet de construction?
          </h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour obtenir un devis personnalisé et bénéficier de notre expertise.
          </p>
          <Link to="/contact">
            <Button className="bg-cornerstone-orange text-white font-bold py-3 px-8 rounded-md text-lg hover:bg-opacity-90 transition-all">
              Contactez-nous
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
