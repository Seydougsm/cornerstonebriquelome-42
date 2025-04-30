
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from '../contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Wallet, Check } from 'lucide-react';

const Checkout = () => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<string>('mobile');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
  if (cart.length === 0) {
    navigate('/panier');
    return null;
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      
      toast({
        title: "Paiement effectué avec succès",
        description: "Votre commande a été confirmée. Merci pour votre achat!",
      });
      
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="title text-center mb-8">Paiement</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-bold text-cornerstone-blue mb-4">Informations de contact</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input id="firstName" required placeholder="Votre prénom" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input id="lastName" required placeholder="Votre nom" />
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required placeholder="votre@email.com" />
                </div>
                <div className="space-y-2 mt-4">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" required placeholder="Votre numéro de téléphone" />
                </div>
              </div>
              
              {/* Shipping Information */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-bold text-cornerstone-blue mb-4">Adresse de livraison</h2>
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse complète</Label>
                  <Textarea id="address" required placeholder="Votre adresse de livraison" />
                </div>
                <div className="space-y-2 mt-4">
                  <Label htmlFor="notes">Instructions spéciales (facultatif)</Label>
                  <Textarea id="notes" placeholder="Instructions particulières pour la livraison" />
                </div>
              </div>
              
              {/* Payment Method */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-bold text-cornerstone-blue mb-4">Méthode de paiement</h2>
                <RadioGroup 
                  value={paymentMethod} 
                  onValueChange={setPaymentMethod}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2 border p-4 rounded-md cursor-pointer hover:border-cornerstone-orange">
                    <RadioGroupItem id="mobile" value="mobile" />
                    <Label htmlFor="mobile" className="flex items-center cursor-pointer flex-1">
                      <Wallet className="mr-2 text-cornerstone-orange" size={20} />
                      <div>
                        <p className="font-medium">Mobile Money</p>
                        <p className="text-xs text-cornerstone-gray">Paiement via T-Money, Flooz, etc.</p>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 border p-4 rounded-md cursor-pointer hover:border-cornerstone-orange">
                    <RadioGroupItem id="card" value="card" />
                    <Label htmlFor="card" className="flex items-center cursor-pointer flex-1">
                      <CreditCard className="mr-2 text-cornerstone-orange" size={20} />
                      <div>
                        <p className="font-medium">Carte bancaire</p>
                        <p className="text-xs text-cornerstone-gray">Paiement sécurisé par carte</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
                
                {paymentMethod === 'mobile' && (
                  <div className="mt-4 space-y-4 p-4 border border-dashed rounded-md">
                    <div className="space-y-2">
                      <Label htmlFor="mobileNumber">Numéro Mobile Money</Label>
                      <Input id="mobileNumber" placeholder="Ex: +228 XX XX XX XX" />
                    </div>
                    <p className="text-xs text-cornerstone-gray">
                      Vous recevrez une notification sur votre téléphone pour confirmer le paiement.
                    </p>
                  </div>
                )}
                
                {paymentMethod === 'card' && (
                  <div className="mt-4 space-y-4 p-4 border border-dashed rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Numéro de carte</Label>
                        <Input id="cardNumber" placeholder="XXXX XXXX XXXX XXXX" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Nom sur la carte</Label>
                        <Input id="cardName" placeholder="NOM ET PRÉNOM" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Date d'expiration</Label>
                        <Input id="expiry" placeholder="MM/AA" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="XXX" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <Button 
                type="submit" 
                disabled={isProcessing}
                className="w-full bg-cornerstone-orange hover:bg-cornerstone-orange/90 text-white"
              >
                {isProcessing ? (
                  <>Traitement en cours...</>
                ) : (
                  <>Confirmer la commande</>
                )}
              </Button>
            </form>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-6">
              <h2 className="text-lg font-bold text-cornerstone-blue mb-4">Résumé de la commande</h2>
              
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between border-b pb-3">
                    <div>
                      <p className="font-medium text-cornerstone-blue">
                        {item.name} <span className="text-cornerstone-gray">x {item.quantity}</span>
                      </p>
                      <p className="text-xs text-cornerstone-gray">{item.type} - {item.size}</p>
                    </div>
                    <span className="font-medium">{item.price * item.quantity} FCFA</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-cornerstone-gray">Sous-total:</span>
                  <span className="font-medium">{getTotalPrice()} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cornerstone-gray">Livraison:</span>
                  <span className="text-cornerstone-gray">À définir</span>
                </div>
              </div>
              
              <div className="flex justify-between font-bold border-t pt-2 mb-6">
                <span>Total TTC:</span>
                <span className="text-cornerstone-orange">{getTotalPrice()} FCFA</span>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-start">
                  <Check size={16} className="text-green-500 mt-1 mr-2" />
                  <p className="text-xs text-cornerstone-gray">
                    En passant commande, vous acceptez nos conditions générales de vente et reconnaissez avoir pris connaissance de notre politique de confidentialité.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
