
import { Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-cornerstone-blue text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">CORNERSTONE BRIQUES</h3>
            <p className="mb-2">
              « Votre partenaire de confiance pour des briques de qualité »
            </p>
            <div className="flex items-center mt-4">
              <Phone className="mr-2" size={18} />
              <span className="font-bold">+228 71014747</span>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-cornerstone-orange transition-colors">Accueil</Link></li>
              <li><Link to="/services" className="hover:text-cornerstone-orange transition-colors">Nos Services</Link></li>
              <li><Link to="/galerie" className="hover:text-cornerstone-orange transition-colors">Galerie</Link></li>
              <li><Link to="/avis" className="hover:text-cornerstone-orange transition-colors">Avis</Link></li>
              <li><Link to="/a-propos" className="hover:text-cornerstone-orange transition-colors">À propos</Link></li>
              <li><Link to="/contact" className="hover:text-cornerstone-orange transition-colors">Contact</Link></li>
              <li><Link to="/mon-compte" className="hover:text-cornerstone-orange transition-colors">Mon Compte</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contactez-nous</h3>
            <p className="mb-2">+228 71014747</p>
            <p className="mb-2">+228 90 96 49 93 / 99 87 01 95</p>
            <p>Lomé, Togo</p>
          </div>
        </div>
        
        <div className="border-t border-white border-opacity-20 mt-8 pt-4 text-center">
          <p>&copy; {new Date().getFullYear()} CORNERSTONE BRIQUES. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
