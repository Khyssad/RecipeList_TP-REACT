import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white p-6 shadow-md mt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p>&copy; 2024 Miam'Nipêdia.com. Tous droits réservés.</p>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/apropos" className="hover:text-gray-300 transition-colors duration-300">À propos</Link></li>
            <li><Link to="/contact" className="hover:text-gray-300 transition-colors duration-300">Contact</Link></li>
            <li><Link to="/mentions-legales" className="hover:text-gray-300 transition-colors duration-300">Mentions légales</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;