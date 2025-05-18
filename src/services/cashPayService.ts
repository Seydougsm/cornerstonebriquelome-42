
import { useToast } from "@/hooks/use-toast";

// Constantes de configuration de l'API Cash Pay
// Note: Dans un environnement de production, ces valeurs devraient être stockées dans des variables d'environnement
const API_CONFIG = {
  baseUrl: "https://api.semoa-payments.ovh/sandbox",
  clientId: "cashpay",
  clientSecret: "HpuNOm3sDOkAvd8v3UCIxiBu68634BBs",
  username: "api_cashpay.corner",
  password: "qH5VlCDCa4",
  apiKey: "TjpiCTZANOmeTSW7eFUHvcoJdtMAwbzrXWyA",
};

// Types pour l'API Cash Pay
export interface PaymentRequest {
  amount: number;
  currency: string;
  description: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  reference: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  paymentUrl?: string;
  message?: string;
  error?: string;
}

/**
 * Service pour l'intégration avec l'API Cash Pay
 */
export const cashPayService = {
  /**
   * Initie une demande de paiement via l'API Cash Pay
   */
  initiatePayment: async (request: PaymentRequest): Promise<PaymentResponse> => {
    try {
      // Obtention du jeton d'authentification
      const authToken = await getAuthToken();
      
      // Construction des en-têtes de la requête
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
        'X-API-Key': API_CONFIG.apiKey
      };
      
      // Construction du corps de la requête
      const payload = {
        amount: request.amount,
        currency: request.currency || "XOF",
        description: request.description,
        customer: {
          name: request.customerName,
          phone: request.customerPhone,
          email: request.customerEmail
        },
        reference: request.reference || generateReference(),
        callbackUrl: window.location.origin + "/payment-callback",
        returnUrl: window.location.origin + "/payment-success"
      };
      
      // Envoi de la requête à l'API
      const response = await fetch(`${API_CONFIG.baseUrl}/payments/initiate`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      });
      
      // Traitement de la réponse
      const data = await response.json();
      
      if (!response.ok) {
        console.error("Erreur de paiement:", data);
        return {
          success: false,
          error: data.message || "Une erreur est survenue lors de l'initialisation du paiement."
        };
      }
      
      // Succès - retourne l'URL de paiement et l'ID de transaction
      return {
        success: true,
        transactionId: data.transactionId,
        paymentUrl: data.paymentUrl,
        message: "Initialisation du paiement réussie"
      };
      
    } catch (error) {
      console.error("Exception lors de l'initialisation du paiement:", error);
      return {
        success: false,
        error: "Une erreur technique est survenue. Veuillez réessayer ou contacter le support."
      };
    }
  },
  
  /**
   * Vérifie le statut d'un paiement
   */
  checkPaymentStatus: async (transactionId: string): Promise<PaymentResponse> => {
    try {
      const authToken = await getAuthToken();
      
      const response = await fetch(`${API_CONFIG.baseUrl}/payments/status/${transactionId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'X-API-Key': API_CONFIG.apiKey
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return {
          success: false,
          error: data.message || "Impossible de vérifier le statut du paiement."
        };
      }
      
      return {
        success: true,
        message: `Statut du paiement: ${data.status}`,
        ...data
      };
      
    } catch (error) {
      console.error("Erreur lors de la vérification du statut:", error);
      return {
        success: false,
        error: "Une erreur technique est survenue lors de la vérification du statut du paiement."
      };
    }
  }
};

/**
 * Fonction interne pour obtenir un token d'authentification
 */
async function getAuthToken(): Promise<string> {
  try {
    const response = await fetch(`${API_CONFIG.baseUrl}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: API_CONFIG.clientId,
        client_secret: API_CONFIG.clientSecret,
        username: API_CONFIG.username,
        password: API_CONFIG.password,
        grant_type: 'password'
      })
    });
    
    const data = await response.json();
    
    if (!response.ok || !data.access_token) {
      console.error("Erreur d'authentification:", data);
      throw new Error("Échec de l'authentification à l'API");
    }
    
    return data.access_token;
    
  } catch (error) {
    console.error("Exception lors de l'authentification:", error);
    throw error;
  }
}

/**
 * Génère une référence unique pour la transaction
 */
function generateReference(): string {
  return `CB-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}
