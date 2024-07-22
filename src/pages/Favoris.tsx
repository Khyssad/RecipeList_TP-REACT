import React, { useState, useEffect } from 'react';
import RecipeList from '../components/RecipeList';
import { Recette } from '../types/recette';

const Favoris: React.FC = () => {
  const [favorites, setFavorites] = useState<Recette[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const handleToggleFavorite = (recette: Recette) => {
    const newFavorites = favorites.filter(fav => fav.id !== recette.id);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="mb-6 text-3xl font-bold">Mes Recettes Favorites</h1>
      {favorites.length > 0 ? (
        <RecipeList
          recettes={favorites}
          favorites={favorites.map(fav => fav.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      ) : (
        <p className="text-center text-gray-600">Vous n'avez pas encore de recettes favorites.</p>
      )}
    </div>
  );
};

export default Favoris;