
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from '@/components/ProductCard';

// Images à remplacer par les photos téléchargées
const productImages = {
  creuxImage: "/lovable-uploads/2a1a2ef8-7fd3-41a1-8af5-a4c0d7bfe543.png",
  pleinImage: "/lovable-uploads/c3390b5c-8932-4466-85fa-1952e2b7dabc.png",
  hourdisImage: "/lovable-uploads/579282be-70b9-4edb-b6ba-da8dc8ce2088.png",
  paveImage: "/lovable-uploads/37a4e285-3958-44f1-97be-220084e4c3de.png",
};

const Services = () => {
  const products = [
    {
      id: "creux-10",
      name: "Brique Creuse 10",
      description: "Brique creuse de dimensions 40cm x 20cm x 10cm, idéale pour les cloisons et murs non porteurs.",
      price: 250,
      image: productImages.creuxImage,
      type: "creux",
      size: "10cm"
    },
    {
      id: "creux-12",
      name: "Brique Creuse 12",
      description: "Brique creuse de dimensions 40cm x 20cm x 12cm, pour murs et cloisons de séparation.",
      price: 300,
      image: productImages.creuxImage,
      type: "creux",
      size: "12cm"
    },
    {
      id: "creux-15",
      name: "Brique Creuse 15",
      description: "Brique creuse de dimensions 40cm x 20cm x 15cm, adaptée pour les murs porteurs et isolation acoustique.",
      price: 380,
      image: productImages.creuxImage,
      type: "creux",
      size: "15cm"
    },
    {
      id: "creux-20",
      name: "Brique Creuse 20",
      description: "Brique creuse de dimensions 40cm x 20cm x 20cm, pour construction de murs porteurs et à forte isolation.",
      price: 500,
      image: productImages.creuxImage,
      type: "creux",
      size: "20cm"
    },
    {
      id: "plein-10",
      name: "Brique Pleine 10",
      description: "Brique pleine de dimensions 40cm x 20cm x 10cm, offrant une grande résistance pour les murs de soutènement.",
      price: 350,
      image: productImages.pleinImage,
      type: "plein",
      size: "10cm"
    },
    {
      id: "plein-12",
      name: "Brique Pleine 12",
      description: "Brique pleine de dimensions 40cm x 20cm x 12cm, idéale pour les murs porteurs nécessitant une grande solidité.",
      price: 460,
      image: productImages.pleinImage,
      type: "plein",
      size: "12cm"
    },
    {
      id: "plein-15",
      name: "Brique Pleine 15",
      description: "Brique pleine de dimensions 40cm x 20cm x 15cm, pour les constructions nécessitant une résistance maximale.",
      price: 500,
      image: productImages.pleinImage,
      type: "plein",
      size: "15cm"
    },
    {
      id: "hourdis-12",
      name: "Hourdis 12",
      description: "Hourdis de 12cm d'épaisseur, pour planchers intermédiaires et toitures-terrasses.",
      price: 500,
      image: productImages.hourdisImage,
      type: "hourdis",
      size: "12cm"
    },
    {
      id: "hourdis-15",
      name: "Hourdis 15",
      description: "Hourdis de 15cm d'épaisseur, pour planchers à portée importante et planchers terrasse.",
      price: 600,
      image: productImages.hourdisImage,
      type: "hourdis",
      size: "15cm"
    },
    {
      id: "pave",
      name: "Pavé",
      description: "Pavés décoratifs pour allées, terrasses et aménagements extérieurs.",
      price: 0,
      image: productImages.paveImage,
      type: "pave",
      size: "standard",
      isComingSoon: true
    }
  ];
  
  const [filter, setFilter] = useState('all');
  
  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(product => product.type === filter);

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="title text-center mb-6">Nos Services</h1>
        <p className="subtitle text-center mb-12">Découvrez notre gamme complète de produits de construction</p>
        
        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md font-bold transition-colors ${
              filter === 'all' 
                ? 'bg-cornerstone-orange text-white' 
                : 'bg-gray-100 text-cornerstone-gray hover:bg-gray-200'
            }`}
          >
            Tous les produits
          </button>
          <button 
            onClick={() => setFilter('creux')}
            className={`px-4 py-2 rounded-md font-bold transition-colors ${
              filter === 'creux' 
                ? 'bg-cornerstone-orange text-white' 
                : 'bg-gray-100 text-cornerstone-gray hover:bg-gray-200'
            }`}
          >
            Briques creuses
          </button>
          <button 
            onClick={() => setFilter('plein')}
            className={`px-4 py-2 rounded-md font-bold transition-colors ${
              filter === 'plein' 
                ? 'bg-cornerstone-orange text-white' 
                : 'bg-gray-100 text-cornerstone-gray hover:bg-gray-200'
            }`}
          >
            Briques pleines
          </button>
          <button 
            onClick={() => setFilter('hourdis')}
            className={`px-4 py-2 rounded-md font-bold transition-colors ${
              filter === 'hourdis' 
                ? 'bg-cornerstone-orange text-white' 
                : 'bg-gray-100 text-cornerstone-gray hover:bg-gray-200'
            }`}
          >
            Hourdis
          </button>
          <button 
            onClick={() => setFilter('pave')}
            className={`px-4 py-2 rounded-md font-bold transition-colors ${
              filter === 'pave' 
                ? 'bg-cornerstone-orange text-white' 
                : 'bg-gray-100 text-cornerstone-gray hover:bg-gray-200'
            }`}
          >
            Pavés
          </button>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
              type={product.type}
              size={product.size}
              isComingSoon={product.isComingSoon}
            />
          ))}
        </div>
        
        {/* Additional Services */}
        <div className="mt-16">
          <h2 className="section-title text-center mb-8">Services complémentaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white p-6 shadow-md">
              <CardContent className="p-0">
                <h3 className="font-bold text-xl text-cornerstone-blue mb-4">Livraison</h3>
                <p className="text-cornerstone-gray mb-4">
                  Nous assurons la livraison de nos produits sur toute l'étendue du territoire. 
                  Contactez-nous pour obtenir un devis personnalisé selon votre localisation.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white p-6 shadow-md">
              <CardContent className="p-0">
                <h3 className="font-bold text-xl text-cornerstone-blue mb-4">Conseil technique</h3>
                <p className="text-cornerstone-gray mb-4">
                  Notre équipe d'experts se tient à votre disposition pour vous accompagner 
                  dans le choix des matériaux adaptés à votre projet de construction.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
