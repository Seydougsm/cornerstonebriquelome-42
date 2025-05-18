
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CallToAction from "./components/CallToAction";
import Services from "./pages/Services";
import About from "./pages/About";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import CashPayment from "./pages/CashPayment";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCallback from "./pages/PaymentCallback";
import { CartProvider } from "./contexts/CartContext";
import CommandButton from "./components/CommandButton";
import Tracking from "./pages/Tracking";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/galerie" element={<Gallery />} />
                <Route path="/avis" element={<Reviews />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/services" element={<Services />} />
                <Route path="/a-propos" element={<About />} />
                <Route path="/mon-compte" element={<Account />} />
                <Route path="/panier" element={<Cart />} />
                <Route path="/paiement" element={<CashPayment />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/payment-callback" element={<PaymentCallback />} />
                <Route path="/suivi" element={<Tracking />} />
                {/* Redirection de l'ancienne route de paiement (si elle existait) */}
                <Route path="/checkout" element={<Navigate to="/paiement" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <CommandButton />
            </main>
            <Footer />
            <CallToAction phoneNumber="+228 71014747" />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
