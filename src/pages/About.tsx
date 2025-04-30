
import { Check } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="title text-center mb-12">À propos de Cornerstone Briques</h1>
        
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <p className="text-cornerstone-gray mb-6 text-lg">
            Chez Cornerstone Briques, nous construisons plus que des murs – nous bâtissons des fondations solides pour des projets durables et inspirants.
          </p>
          
          <p className="text-cornerstone-gray mb-6">
            Depuis notre création, nous nous sommes engagés à fournir des briques de construction de haute qualité, conçues pour répondre aux exigences des professionnels du bâtiment tout en respectant les normes environnementales.
          </p>
          
          <p className="text-cornerstone-gray mb-8">
            Grâce à notre expertise, notre savoir-faire local et notre passion pour l'innovation, nous accompagnons nos clients à chaque étape de leurs projets.
          </p>
          
          <div className="mb-8">
            <h2 className="section-title border-b-2 border-cornerstone-orange pb-2">Notre mission</h2>
            <p className="text-cornerstone-gray mt-4">
              Offrir des matériaux fiables, résistants et esthétiques qui permettent aux constructeurs de bâtir l'avenir avec confiance.
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className="section-title border-b-2 border-cornerstone-orange pb-2">Nos valeurs</h2>
            <ul className="mt-4 space-y-2">
              <li className="flex items-baseline">
                <span className="text-cornerstone-orange font-bold mr-2">•</span>
                <span className="text-cornerstone-gray">
                  <span className="font-bold">Qualité :</span> Chaque brique est le fruit d'un contrôle rigoureux et d'un souci du détail.
                </span>
              </li>
              <li className="flex items-baseline">
                <span className="text-cornerstone-orange font-bold mr-2">•</span>
                <span className="text-cornerstone-gray">
                  <span className="font-bold">Engagement :</span> La satisfaction de nos clients et partenaires est au cœur de notre activité.
                </span>
              </li>
              <li className="flex items-baseline">
                <span className="text-cornerstone-orange font-bold mr-2">•</span>
                <span className="text-cornerstone-gray">
                  <span className="font-bold">Innovation :</span> Nous améliorons constamment nos procédés pour offrir des solutions plus performantes et durables.
                </span>
              </li>
              <li className="flex items-baseline">
                <span className="text-cornerstone-orange font-bold mr-2">•</span>
                <span className="text-cornerstone-gray">
                  <span className="font-bold">Responsabilité :</span> Nous veillons à minimiser notre impact environnemental grâce à une production raisonnée.
                </span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="section-title border-b-2 border-cornerstone-orange pb-2">Pourquoi nous choisir ?</h2>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center">
                <Check size={20} className="text-cornerstone-orange mr-2" />
                <span className="text-cornerstone-gray font-medium">Produits testés et certifiés</span>
              </li>
              <li className="flex items-center">
                <Check size={20} className="text-cornerstone-orange mr-2" />
                <span className="text-cornerstone-gray font-medium">Équipe réactive et à l'écoute</span>
              </li>
              <li className="flex items-center">
                <Check size={20} className="text-cornerstone-orange mr-2" />
                <span className="text-cornerstone-gray font-medium">Livraison fiable et rapide</span>
              </li>
              <li className="flex items-center">
                <Check size={20} className="text-cornerstone-orange mr-2" />
                <span className="text-cornerstone-gray font-medium">Service personnalisé selon vos besoins</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
