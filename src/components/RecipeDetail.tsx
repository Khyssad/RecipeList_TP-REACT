import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Recette } from '../types/recette';

const API_URL = 'https://api-recette-26n5.onrender.com/recettes';

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recette, setRecette] = useState<Recette | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecette = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
          throw new Error('Recette non trouvée');
        }
        const data = await response.json();
        setRecette(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchRecette();
  }, [id]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-600">Chargement...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-xl font-semibold text-red-600">{error}</div>;
  }

  if (!recette) {
    return <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-600">Recette non trouvée</div>;
  }

  return (
    <div className="max-w-3xl p-8 mx-auto space-y-8">
      <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img className="object-cover w-full h-64 rounded-t-lg" src={`https://placehold.co/800x300/f3f4f6/818cf8?text=${recette.nom}`} alt={recette.nom} />
        <div className="p-5">
          <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{recette.nom}</h5>
          <p className="mb-3 text-lg font-normal text-gray-700 dark:text-gray-400">{recette.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <span className="text-sm text-gray-500">Préparation: {recette.temps_preparation} min</span>
            <span className="text-sm text-gray-500">Cuisson: {recette.temps_cuisson} min</span>
            <span className="text-sm text-gray-500">Difficulté: {recette.difficulte}</span>
            <span className="text-sm text-gray-500">Pour {recette.personnes} personnes</span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="p-5">
          <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Ingrédients</h5>
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

      <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="p-5">
          <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Étapes de préparation</h5>
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