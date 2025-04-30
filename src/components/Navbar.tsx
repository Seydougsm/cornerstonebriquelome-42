
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { Badge } from "./ui/badge";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { getTotalItems } = useCart();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const isActive = (path: string) => {
    return location.pathname === path ? 
      "text-cornerstone-orange font-bold" : 
      "text-cornerstone-blue hover:text-cornerstone-orange transition-colors";
  };
  
  const links = [
    { name: "Accueil", path: "/" },
    { name: "Nos Services", path: "/services" },
    { name: "Galerie", path: "/galerie" },
    { name: "Avis", path: "/avis" },
    { name: "À propos", path: "/a-propos" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-cornerstone-blue">
            <span className="text-cornerstone-orange">CORNERSTONE</span> BRIQUES
          </h1>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {links.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`font-bold ${isActive(link.path)}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        {/* Cart and Account Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/mon-compte" className="text-cornerstone-blue hover:text-cornerstone-orange transition-colors">
            <User size={24} />
          </Link>
          <Link to="/panier" className="text-cornerstone-blue hover:text-cornerstone-orange transition-colors relative">
            <ShoppingCart size={24} />
            {getTotalItems() > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-cornerstone-orange text-xs">
                {getTotalItems()}
              </Badge>
            )}
          </Link>
        </div>
        
        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden items-center space-x-4">
          <Link to="/panier" className="text-cornerstone-blue hover:text-cornerstone-orange transition-colors relative">
            <ShoppingCart size={24} />
            {getTotalItems() > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-cornerstone-orange text-xs">
                {getTotalItems()}
              </Badge>
            )}
          </Link>
          <button 
            onClick={toggleMenu} 
            className="text-cornerstone-blue focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 animate-fade-in">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            {links.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`font-bold text-lg ${isActive(link.path)}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/mon-compte"
              className="font-bold text-lg text-cornerstone-blue hover:text-cornerstone-orange transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Mon Compte
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
