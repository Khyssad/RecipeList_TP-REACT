import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-[#D3655A] text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Miam'Nipêdia</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-blue-200">Accueil</Link></li>
            <li><Link to="/favoris" className="hover:text-blue-200">Favoris</Link></li>
            <li><Link to="/ajouter" className="hover:text-blue-200">Ajouter une recette</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;