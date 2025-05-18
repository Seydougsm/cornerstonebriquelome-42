
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { useCart } from '../contexts/CartContext';
import { cashPayService, PaymentRequest } from '../services/cashPayService';
import { Loader2 } from 'lucide-react';

const CashPayment = () => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  
  // Rediriger vers le panier si le panier est vide
  useEffect(() => {
    if (cart.length === 0) {
      toast({
        title: "Panier vide",
        description: "Votre panier est vide. Ajoutez des produits avant de procéder au paiement.",
        variant: "destructive"
      });
      navigate('/panier');
    }
  }, [cart, navigate, toast]);
  
  // Gérer les changements dans le formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Gérer la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Préparation de la demande de paiement
      const paymentRequest: PaymentRequest = {
        amount: getTotalPrice(),
        currency: "XOF",
        description: `Commande de briques - ${cart.reduce((acc, item) => acc + item.quantity, 0)} unités`,
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        customerEmail: customerInfo.email,
        reference: `BRICK-${Date.now()}`
      };
      
      // Initialisation du paiement
      const response = await cashPayService.initiatePayment(paymentRequest);
      
      if (response.success && response.paymentUrl) {
        // Stockage des infos de commande en session
        sessionStorage.setItem('pendingOrder', JSON.stringify({
          cart,
          customerInfo,
          transactionId: response.transactionId,
          totalAmount: getTotalPrice(),
          timestamp: Date.now()
        }));
        
        // Redirection vers la plateforme de paiement
        window.location.href = response.paymentUrl;
      } else {
        toast({
          title: "Erreur de paiement",
          description: response.error || "Une erreur est survenue lors de la préparation du paiement.",
          variant: "destructive"
        });
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Erreur lors du processus de paiement:", error);
      toast({
        title: "Erreur technique",
        description: "Une erreur technique est survenue. Veuillez réessayer ultérieurement.",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };
  
  // Validation du formulaire
  const validateForm = () => {
    // Validation du nom
    if (!customerInfo.name.trim()) {
      toast({
        title: "Champ requis",
        description: "Veuillez saisir votre nom complet.",
        variant: "destructive"
      });
      return false;
    }
    
    // Validation de l'email
    if (!customerInfo.email.trim() || !/^\S+@\S+\.\S+$/.test(customerInfo.email)) {
      toast({
        title: "Email invalide",
        description: "Veuillez saisir une adresse email valide.",
        variant: "destructive"
      });
      return false;
    }
    
    // Validation du téléphone
    if (!customerInfo.phone.trim() || !/^[+\d]{8,15}$/.test(customerInfo.phone.replace(/\s/g, ''))) {
      toast({
        title: "Téléphone invalide",
        description: "Veuillez saisir un numéro de téléphone valide.",
        variant: "destructive"
      });
      return false;
    }
    
    // Validation de l'adresse
    if (!customerInfo.address.trim()) {
      toast({
        title: "Champ requis",
        description: "Veuillez saisir votre adresse de livraison.",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };
  
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="title text-center mb-8">Finaliser votre commande</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire de paiement */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Informations client */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-bold text-cornerstone-blue mb-4">Informations de contact</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet</Label>
                    <Input 
                      id="name" 
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      required 
                      placeholder="Votre nom complet" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      required 
                      placeholder="Ex: +228 XX XX XX XX" 
                    />
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    required 
                    placeholder="votre@email.com" 
                  />
                </div>
                <div className="space-y-2 mt-4">
                  <Label htmlFor="address">Adresse de livraison</Label>
                  <Input 
                    id="address" 
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    required 
                    placeholder="Votre adresse complète" 
                  />
                </div>
              </div>
              
              {/* Section Paiement */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img src="/lovable-uploads/cd0cab15-50c6-4121-b56b-20d707033045.png" alt="Cash Pay" className="h-10 mr-2" />
                  <h2 className="text-lg font-bold text-cornerstone-blue">Paiement sécurisé via Cash Pay</h2>
                </div>
                
                <p className="text-cornerstone-gray mb-4">
                  En cliquant sur "Procéder au paiement", vous serez redirigé vers la plateforme de paiement sécurisée Cash Pay pour finaliser votre transaction.
                </p>
                
                <Button 
                  type="submit" 
                  disabled={isProcessing}
                  className="w-full bg-cornerstone-orange hover:bg-cornerstone-orange/90 text-white"
                >
                  {isProcessing ? (
                    <span className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Traitement en cours...
                    </span>
                  ) : (
                    "Procéder au paiement"
                  )}
                </Button>
              </div>
            </form>
          </div>
          
          {/* Récapitulatif de la commande */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-6">
              <h2 className="text-lg font-bold text-cornerstone-blue mb-4">Récapitulatif de la commande</h2>
              
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashPayment;
