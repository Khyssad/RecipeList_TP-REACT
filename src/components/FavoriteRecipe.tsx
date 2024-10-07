import React from "react";
import { Link } from "react-router-dom";
import { Recette } from "../types/recette";

// Définition des props attendues par le composant
interface FavoriteRecipeProps {
  recette: Recette; // L'objet recette à afficher
  isFavorite: boolean; // Indique si la recette est un favori
  onToggleFavorite: (recette: Recette) => void; // Fonction pour basculer l'état favori
}

// Définition du composant FavoriteRecipe
const FavoriteRecipe: React.FC<FavoriteRecipeProps> = ({
  recette,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    // Conteneur principal de la carte de recette
    <div className="flex flex-col h-full bg-white border border-gray-200 rounded-b-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {/* Section contenant les détails de la recette */}
      <div className="p-5 flex-grow">
        {/* Lien vers la page de détail de la recette */}
        <Link to={`/recette/${recette.id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {recette.nom}
          </h5>
        </Link>
        {/* Description de la recette */}
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {recette.description}
        </p>
        {/* Informations supplémentaires sur la recette */}
        <div className="mt-2 text-sm text-gray-600">
          <p>Préparation : {recette.temps_preparation} min</p>
          <p>Cuisson : {recette.temps_cuisson} min</p>
          <p>Difficulté : {recette.difficulte}</p>
          <p>Pour {recette.personnes} personnes</p>
        </div>
      </div>
      {/* Section pour les actions (voir détails et favoris) */}
      <div className="p-5 flex justify-between items-center mt-auto">
        {/* Lien pour voir les détails de la recette */}
        <Link
          to={`/recette/${recette.id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Voir détails
          {/* Icône de flèche */}
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
        {/* Bouton pour basculer l'état favori */}
        <button
          onClick={() => onToggleFavorite(recette)}
          className={`text-3xl ${isFavorite ? "text-yellow-500" : "text-gray-300"}`}
        >
          ★
        </button>
      </div>
    </div>
  );
};

export default FavoriteRecipe;
