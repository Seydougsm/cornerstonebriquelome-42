
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Tag } from "lucide-react";
import { useCart, CartProduct } from '../contexts/CartContext';
import { Input } from './ui/input';
import { useToast } from '../hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export interface ProductProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  type: string;
  size: string;
  isComingSoon?: boolean;
}

const ProductCard = ({ id, name, description, price, image, type, size, isComingSoon = false }: ProductProps) => {
  const [quantity, setQuantity] = useState(0);
  const [showPrice, setShowPrice] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(value >= 0 ? value : 0);
    setShowPrice(value > 0);
  };

  const handleAddToCart = () => {
    if (quantity <= 0) {
      toast({
        title: "Quantité invalide",
        description: "Veuillez entrer une quantité valide.",
        variant: "destructive"
      });
      return;
    }
    
    const product: CartProduct = {
      id,
      name,
      price,
      quantity,
      image,
      type,
      size
    };
    
    addToCart(product);
    
    toast({
      title: "Produit ajouté au panier",
      description: `${quantity} ${name} ajouté${quantity > 1 ? 's' : ''} au panier.`,
    });
    
    navigate('/panier');
  };

  return (
    <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-lg">
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {isComingSoon && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-cornerstone-orange text-white font-bold">
              <Tag className="mr-1 h-4 w-4" /> À venir
            </Badge>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-cornerstone-blue text-xl">{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-cornerstone-gray mb-4">{description}</p>
        <div className="space-y-4">
          <div>
            <label htmlFor={`quantity-${id}`} className="block text-sm font-medium text-cornerstone-gray mb-1">
              Quantité
            </label>
            <Input
              id={`quantity-${id}`}
              type="number"
              min="0"
              value={quantity}
              onChange={handleQuantityChange}
              placeholder="Entrez la quantité"
              disabled={isComingSoon}
              className="w-full"
            />
          </div>
          
          {showPrice && !isComingSoon && (
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-medium text-cornerstone-gray">Prix unitaire:</span>
              <span className="font-bold text-cornerstone-blue">{price} FCFA</span>
            </div>
          )}
          
          {showPrice && !isComingSoon && (
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-bold text-cornerstone-gray">Total:</span>
              <span className="font-bold text-cornerstone-orange">{price * quantity} FCFA</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleAddToCart}
          disabled={isComingSoon || quantity <= 0}
          className="w-full bg-cornerstone-orange hover:bg-cornerstone-orange/90"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isComingSoon ? "Bientôt disponible" : "Ajouter au panier"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
