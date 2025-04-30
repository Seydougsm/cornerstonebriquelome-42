
import { Phone, Mail, MapPin } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Votre message a été envoyé avec succès!");
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="title text-center mb-12">Contactez-nous</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="section-title mb-8">Nos coordonnées</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-cornerstone-orange p-3 rounded-full mr-4">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-cornerstone-blue">Téléphone</h3>
                  <p className="text-cornerstone-gray">+228 71014747</p>
                  <p className="text-cornerstone-gray">+228 90 96 49 93 / 99 87 01 95</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-cornerstone-orange p-3 rounded-full mr-4">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-cornerstone-blue">Email</h3>
                  <p className="text-cornerstone-gray">contact@cornerstonebriques.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-cornerstone-orange p-3 rounded-full mr-4">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-cornerstone-blue">Adresse</h3>
                  <p className="text-cornerstone-gray">Lomé, Togo</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h2 className="section-title mb-4">Horaires d'ouverture</h2>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-bold text-cornerstone-blue">Lundi - Vendredi:</div>
                  <div className="text-cornerstone-gray">8h00 - 18h00</div>
                  
                  <div className="font-bold text-cornerstone-blue">Samedi:</div>
                  <div className="text-cornerstone-gray">9h00 - 16h00</div>
                  
                  <div className="font-bold text-cornerstone-blue">Dimanche:</div>
                  <div className="text-cornerstone-gray">Fermé</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <h2 className="section-title mb-8">Envoyez-nous un message</h2>
            
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <label htmlFor="name" className="block text-cornerstone-gray font-bold mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="Votre nom"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-cornerstone-gray font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="Votre email"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="phone" className="block text-cornerstone-gray font-bold mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="Votre numéro de téléphone"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block text-cornerstone-gray font-bold mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="Sujet de votre message"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-cornerstone-gray font-bold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  className="w-full p-3 border border-gray-300 rounded"
                  rows={5}
                  placeholder="Votre message..."
                  required
                />
              </div>
              
              <button type="submit" className="cta-button w-full">
                Envoyer le message
              </button>
            </form>
          </div>
        </div>
        
        {/* Map or Location Info */}
        <div className="mt-16">
          <div className="border-2 border-cornerstone-orange p-6 rounded-lg">
            <h2 className="section-title mb-4">Notre emplacement</h2>
            <p className="text-cornerstone-gray text-center">
              CORNERSTONE BRIQUES est situé à Lomé, Togo. Visitez-nous pour découvrir notre gamme complète de produits et consulter nos experts en construction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
