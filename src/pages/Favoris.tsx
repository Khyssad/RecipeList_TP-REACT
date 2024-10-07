import React, { useState, useEffect } from "react";
import RecipeList from "../components/RecipeList";
import { Recette } from "../types/recette";

const Favoris: React.FC = () => {
  // État pour stocker les recettes favorites
  const [favorites, setFavorites] = useState<Recette[]>([]);

  // Effet pour charger les favoris depuis le stockage local au montage du composant
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Fonction pour gérer le basculement de l'état favori d'une recette
  const handleToggleFavorite = (recette: Recette) => {
    // Filtrer la recette cliquée des favoris
    const newFavorites = favorites.filter((fav) => fav.id !== recette.id);
    // Mettre à jour l'état local
    setFavorites(newFavorites);
    // Persister les changements dans le stockage local
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  // Rendu du composant
  return (
    <div className="container mx-auto mt-8">
      <h1 className="mb-6 text-3xl font-bold">Mes Recettes Favorites</h1>
      {favorites.length > 0 ? (
        // Afficher la liste des recettes favorites si elle n'est pas vide
        <RecipeList
          recettes={favorites}
          favorites={favorites.map((fav) => fav.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      ) : (
        // Message affiché si aucune recette favorite n'est trouvée
        <p className="text-center text-gray-600">
          Vous n'avez pas encore de recettes favorites.
        </p>
      )}
    </div>
  );
};

export default Favoris;
