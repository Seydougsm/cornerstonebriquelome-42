
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentCallback = () => {
  const [message, setMessage] = useState("Traitement du paiement en cours...");
  const navigate = useNavigate();

  useEffect(() => {
    // Cette page est principalement destinée aux callbacks API
    // Pour une utilisation frontend, nous redirigeons vers la page de succès
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const transactionId = urlParams.get('transactionId');

    // Journalisation des paramètres de retour pour le débogage
    console.log("Callback params:", { status, transactionId });

    // Redirection après un court délai
    const timer = setTimeout(() => {
      navigate('/payment-success');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cornerstone-orange mx-auto"></div>
        <h1 className="mt-4 text-xl font-medium text-cornerstone-blue">{message}</h1>
        <p className="mt-2 text-cornerstone-gray">Vous allez être redirigé automatiquement...</p>
      </div>
    </div>
  );
};

export default PaymentCallback;
