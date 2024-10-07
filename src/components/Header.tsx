import React from "react";
import { Link } from "react-router-dom";

// Définition du composant Header
const Header: React.FC = () => {
  return (
    // Élément header avec un fond de couleur spécifique et du texte blanc
    <header className="bg-[#D3655A] text-white p-4">
      {/* Conteneur pour centrer et espacer le contenu */}
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/titre de l'application avec un lien vers la page d'accueil */}
        <Link to="/" className="text-2xl font-bold">
          Miam'Nipêdia
        </Link>
        {/* Navigation principale */}
        <nav>
          {/* Liste des liens de navigation */}
          <ul className="flex space-x-4">
            {/* Lien vers la page d'accueil */}
            <li>
              <Link to="/" className="hover:text-blue-200">
                Accueil
              </Link>
            </li>
            {/* Lien vers la page des favoris */}
            <li>
              <Link to="/favoris" className="hover:text-blue-200">
                Favoris
              </Link>
            </li>
            {/* Lien vers la page d'ajout de recette */}
            <li>
              <Link to="/ajouter" className="hover:text-blue-200">
                Ajouter une recette
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
