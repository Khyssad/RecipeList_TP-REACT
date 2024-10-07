import React from "react";
import { useNavigate } from "react-router-dom";
import { Recette } from "../types/recette";
import FavoriteRecipe from "./FavoriteRecipe";

// Définition des props du composant
// Cette intearface décrit les données et les fonctions que le composant parent doit fournir
interface RecipeListProps {
  recettes: Recette[]; // Un tableau d'objets Recette à afficher
  favorites: number[]; // Un tableau d'IDs de recettes favorites
  onToggleFavorite: (recette: Recette) => void; // Une fonction pour basculer l'état favori d'une recette
}

// Définition du composant RecipeList
// Il s'agit d'un composant fonctionnel qui utilise la déstructuration pour extraire ses props
const RecipeList: React.FC<RecipeListProps> = ({
  recettes,
  favorites,
  onToggleFavorite,
}) => {
  // Utilisation du hook useNavigate pour la navigation programmatique
  const navigate = useNavigate();

  // Fonction pour gérer le clic sur l'image d'une recette
  // Cette fonction utilise navigate pour rediriger l'utilisateur vers la page de détail de la recette
  const handleImageClick = (recetteId: number) => {
    navigate(`/recette/${recetteId}`);
  };

  // Rendu du composant
  return (
    // La section utilise une grille CSS pour organiser les recettes
    // La grille s'adapte à différentes tailles d'écran grâce aux classes responsives
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {/* Utilisation de map pour créer un élément pour chaque recette */}
      {recettes.map((recette) => (
        // La clé unique est importante pour l'optimisation des performances de React
        <div key={recette.id} className="flex flex-col h-full">
          {/* Image de la recette */}
          {/* Utilisation d'un placeholder dynamique basé sur la catégorie de la recette */}
          <img
            src={`https://placehold.co/300x200/FCEAB9/35343C?text=${recette.categorie}`}
            className="w-full h-48 object-cover rounded-t-lg cursor-pointer"
            alt={recette.nom}
            onClick={() => handleImageClick(recette.id)}
          />
          {/* Composant FavoriteRecipe pour gérer l'état favori */}
          {/* Ce composant reçoit la recette, son état favori, et la fonction pour basculer cet état */}
          <FavoriteRecipe
            recette={recette}
            isFavorite={favorites.includes(recette.id)}
            onToggleFavorite={onToggleFavorite}
          />
        </div>
      ))}
    </section>
  );
};

export default RecipeList;
