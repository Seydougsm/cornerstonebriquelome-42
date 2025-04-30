
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
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
    { name: "Galerie", path: "/galerie" },
    { name: "Avis", path: "/avis" },
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
        <div className="hidden md:flex space-x-8">
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
        
        {/* Mobile Navigation Toggle */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden text-cornerstone-blue focus:outline-none"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
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
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
