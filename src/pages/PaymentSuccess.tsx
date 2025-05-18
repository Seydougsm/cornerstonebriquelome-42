
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { useCart } from '../contexts/CartContext';
import { cashPayService } from '../services/cashPayService';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface PendingOrder {
  cart: any[];
  customerInfo: any;
  transactionId: string;
  totalAmount: number;
  timestamp: number;
}

const PaymentSuccess = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [orderDetails, setOrderDetails] = useState<PendingOrder | null>(null);
  
  useEffect(() => {
    const verifyPayment = async () => {
      // Récupération des informations de commande
      const pendingOrderJson = sessionStorage.getItem('pendingOrder');
      if (!pendingOrderJson) {
        setStatus('error');
        toast({
          title: "Erreur",
          description: "Impossible de trouver les détails de la commande.",
          variant: "destructive"
        });
        return;
      }
      
      try {
        const pendingOrder: PendingOrder = JSON.parse(pendingOrderJson);
        setOrderDetails(pendingOrder);
        
        // Vérification du statut du paiement
        if (pendingOrder.transactionId) {
          const paymentStatus = await cashPayService.checkPaymentStatus(pendingOrder.transactionId);
          
          if (paymentStatus.success) {
            setStatus('success');
            clearCart();
            sessionStorage.removeItem('pendingOrder'); // Nettoyage après validation
            
            toast({
              title: "Paiement réussi",
              description: "Votre commande a été confirmée. Merci pour votre achat!",
            });
          } else {
            setStatus('error');
            toast({
              title: "Erreur de paiement",
              description: paymentStatus.error || "Une erreur est survenue lors de la vérification du paiement.",
              variant: "destructive"
            });
          }
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du paiement:", error);
        setStatus('error');
        toast({
          title: "Erreur technique",
          description: "Une erreur est survenue lors du traitement de votre paiement.",
          variant: "destructive"
        });
      }
    };
    
    verifyPayment();
  }, [clearCart, toast]);
  
  if (status === 'loading') {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cornerstone-orange mx-auto"></div>
          <h2 className="mt-4 text-xl font-bold text-cornerstone-blue">
            Vérification de votre paiement en cours...
          </h2>
          <p className="mt-2 text-cornerstone-gray">
            Veuillez patienter pendant que nous confirmons votre transaction.
          </p>
        </div>
      </div>
    );
  }
  
  if (status === 'error') {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-center mb-6">
              <AlertCircle size={64} className="text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-center text-cornerstone-blue mb-4">
              Problème de paiement
            </h1>
            <p className="text-cornerstone-gray mb-6 text-center">
              Nous avons rencontré un problème lors de la confirmation de votre paiement. Votre commande n'a pas pu être finalisée.
            </p>
            <div className="flex flex-col space-y-3">
              <Link to="/panier">
                <Button className="w-full bg-cornerstone-orange hover:bg-cornerstone-orange/90">
                  Retourner au panier
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="w-full">
                  Contacter le support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="flex justify-center mb-6">
            <CheckCircle size={64} className="text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-center text-cornerstone-blue mb-4">
            Commande confirmée
          </h1>
          <p className="text-cornerstone-gray mb-6 text-center">
            Votre paiement a été effectué avec succès. Merci pour votre achat!
          </p>
          
          {orderDetails && (
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h2 className="font-bold text-cornerstone-blue mb-2">Détails de la commande</h2>
              <p className="text-sm text-cornerstone-gray">Référence: {orderDetails.transactionId}</p>
              <p className="text-sm text-cornerstone-gray">Montant total: {orderDetails.totalAmount} FCFA</p>
              <p className="text-sm text-cornerstone-gray">Date: {new Date(orderDetails.timestamp).toLocaleString()}</p>
            </div>
          )}
          
          <div className="flex flex-col space-y-3">
            <Link to="/">
              <Button className="w-full bg-cornerstone-orange hover:bg-cornerstone-orange/90">
                Retourner à l'accueil
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" className="w-full">
                Continuer vos achats
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
