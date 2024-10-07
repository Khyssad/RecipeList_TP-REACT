import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Recette } from "../types/recette";

// URL de l'API pour récupérer les détails d'une recette
const API_URL = "https://api-recette-26n5.onrender.com/recettes";

const RecipeDetail: React.FC = () => {
  // Récupération de l'ID de la recette depuis les paramètres de l'URL
  const { id } = useParams<{ id: string }>();
  // État pour stocker les détails de la recette
  const [recette, setRecette] = useState<Recette | null>(null);
  // État pour gérer l'affichage du chargement
  const [loading, setLoading] = useState(true);
  // État pour gérer l'affichage des erreurs
  const [error, setError] = useState<string | null>(null);

  // Effet pour charger les détails de la recette au montage du composant
  useEffect(() => {
    const fetchRecette = async () => {
      setLoading(true);
      try {
        // Appel à l'API pour récupérer les détails de la recette
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
          throw new Error("Recette non trouvée");
        }
        const data = await response.json();
        setRecette(data);
      } catch (err) {
        // Gestion des erreurs
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue",
        );
      } finally {
        // Fin du chargement
        setLoading(false);
      }
    };

    fetchRecette();
  }, [id]);

  // Affichage pendant le chargement
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-600">
        Chargement...
      </div>
    );
  }

  // Affichage en cas d'erreur
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-red-600">
        {error}
      </div>
    );
  }

  // Affichage si la recette n'est pas trouvée
  if (!recette) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-600">
        Recette non trouvée
      </div>
    );
  }

  // Affichage des détails de la recette
  return (
    <div className="max-w-3xl p-8 mx-auto space-y-8">
      {/* Carte principale avec les informations générales de la recette */}
      <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {/* Image de la recette (ici un placeholder) */}
        <img
          className="object-cover w-full h-64 rounded-t-lg"
          src={`https://placehold.co/800x300/f3f4f6/818cf8?text=${recette.nom}`}
          alt={recette.nom}
        />
        <div className="p-5">
          {/* Nom de la recette */}
          <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {recette.nom}
          </h5>
          {/* Description de la recette */}
          <p className="mb-3 text-lg font-normal text-gray-700 dark:text-gray-400">
            {recette.description}
          </p>
          {/* Informations supplémentaires */}
          <div className="grid grid-cols-2 gap-4 mb-3">
            <span className="text-sm text-gray-500">
              Préparation: {recette.temps_preparation} min
            </span>
            <span className="text-sm text-gray-500">
              Cuisson: {recette.temps_cuisson} min
            </span>
            <span className="text-sm text-gray-500">
              Difficulté: {recette.difficulte}
            </span>
            <span className="text-sm text-gray-500">
              Pour {recette.personnes} personnes
            </span>
          </div>
        </div>
      </div>

      {/* Carte pour les ingrédients */}
      <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="p-5">
          <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Ingrédients
          </h5>
          <ul className="space-y-2 font-normal text-gray-700 dark:text-gray-400">
            {recette.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2">•</span>
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Carte pour les étapes de préparation */}
      <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="p-5">
          <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Étapes de préparation
          </h5>
          <ol className="space-y-4 font-normal text-gray-700 dark:text-gray-400">
            {recette.etapes.map((etape, index) => (
              <li key={index} className="flex">
                <span className="mr-2 font-bold">{index + 1}.</span>
                <span>{etape}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
