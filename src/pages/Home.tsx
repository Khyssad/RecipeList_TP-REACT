import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RecipeList from '../components/RecipeList';
import { Recette } from '../types/recette';
import logoImage from '../assets/logo.png';

const API_URL = 'https://api-recette-26n5.onrender.com/recettes';

const Home: React.FC = () => {
  const [recettes, setRecettes] = useState<Recette[]>([]);
  const [searchResults, setSearchResults] = useState<Recette[]>([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites.map((fav: Recette) => fav.id));
    fetchRecettes();
  }, []);

  const fetchRecettes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRecettes(data);
    } catch (err) {
      setError(`Une erreur est survenue lors du chargement des recettes: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = (recette: Recette) => {
    const newFavorites = favorites.includes(recette.id)
      ? favorites.filter(id => id !== recette.id)
      : [...favorites, recette.id];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(recettes.filter(r => newFavorites.includes(r.id))));
  };

  const searchRecette = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim().length < 3) {
      setError("Merci de taper un mot-clé de 3 caractères minimum");
      return;
    }

    setIsLoading(true);
    setError("");

    const filteredRecettes = recettes.filter((recette: Recette) => {
      const nomMatch = recette.nom && typeof recette.nom === 'string' && recette.nom.toLowerCase().includes(query.toLowerCase());
      const descriptionMatch = recette.description && typeof recette.description === 'string' && recette.description.toLowerCase().includes(query.toLowerCase());
      return nomMatch || descriptionMatch;
    });

    if (filteredRecettes.length === 0) {
      setSearchResults([]);
      setError("Aucune recette trouvée");
    } else {
      setSearchResults(filteredRecettes);
    }
    
    setHasSearched(true);
    setIsLoading(false);
  };

  return (
    <main className="container mx-auto mt-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-6"
      >
        <img 
          src={logoImage} 
          alt="Recette.com Logo" 
          className="max-w-xs w-full h-auto" // Ajustez ces classes selon vos besoins
        />
      </motion.div>
      <motion.div>
        <h3 className="mb-4 text-xl text-center">Trouvez les recettes de votre choix en 2 clics !</h3>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={searchRecette} className="mb-8">
          <div className="flex">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher une recette..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
            <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </button>
          </div>
        </form>
        {isLoading && <p className="text-center">Chargement...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
      </motion.div>

      {hasSearched && !isLoading && searchResults.length > 0 && (
        <RecipeList
          recettes={searchResults}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </main>
  );
};

export default Home;




